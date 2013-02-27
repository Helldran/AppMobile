var Id;

// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {

	Name = extractUrlParams ("nom");
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
	console.log("Avant la recherche");
	searchAllObject (Id.valueOf(), function getInfos(results)
	{
		var length = results.rows.length;
		console.log("la longueur de la table est : " + length);
		for (var i = 0 ; i < length ; i++)
		{
			code = '<li data-icon="delete"><a href=""><img src="img/photo.jpg" class="photo">' + results.rows.item(i).nomObjet + '</a></li>';
			$("#liste_objet").append(code);
		}
	});
    
}

// onError: Failed to get the contacts

function onError(contactError) {
    alert('onError!');
}

function addObject()
{
	window.location = "add_object.html?id=" + Id;
}

