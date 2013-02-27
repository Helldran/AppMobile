var Id;
var Name;

// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {

	Name = extractUrlParams ("nom");
	console.log(Name);
	var options = new ContactFindOptions();
	options.filter= Name;
	options.multiple = true;
	var fields = ["displayName", "photos", "phoneNumbers", "id"];
	navigator.contacts.find(fields, onSuccessContact, onError, options);
	
}

function onSuccessContact(contacts) {

	if (contacts[0].photos && contacts[0].photos[0].type == "url") {
		code = '<img src="'+contacts[0].photos[0].value+'" class="photo_contact">';
					}
	else {
		code = '<img src="img/photo.jpg" class="photo_contact">';
				 	
	}
	if (contacts[0].phoneNumbers) 
	{
		code = code + contacts[0].displayName + '<br>'
		  		 	+ '<a href="tel:' + contacts[0].phoneNumbers[0].value + '"  data-role="button" data-inline="true">Appeler</a>';
	}
	else 
	{
		code = code + contacts[0].displayName + '<br>';
	}
	
	$("#info_contact").append(code);
	
	Id = contacts[0].id;
	searchAllObject (Id.valueOf(), function getInfos(results)
	{
		var length = results.rows.length;
		for (var i = 0 ; i < length ; i++)
		{
			code = '<li data-icon="delete" onclick = javascript:remObject("' + results.rows.item(i).nomObjet + '",' + Id.valueOf() + ')>'
					+ '<a href=""><img src="img/photo.jpg" class="photo">' + results.rows.item(i).nomObjet + '</a></li>';
			console.log(code);
			$("#liste_objet").append(code);
		}
		$('#liste_objet').listview('refresh');
	});
    
}

// onError: Failed to get the contacts

function onError(contactError) {
    alert('onError!');
}

function addObject()
{
	window.location = "add_object.html?id=" + Id + "&nom=" + Name;
}

function remObject (ObjectName, IdUser)
{
	console.log(ObjectName + IdUser);
	removeObject(IdUser, ObjectName);
	window.location = "contact.html?nom=" + Name;
}
