var Id;
var Name;

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

	if (contacts[0].photos && contacts[0].photos[0].type == "url")
	{
		code = '<li<img src="'+contacts[0].photos[0].value+'" class="photo_contact">'
				+ '<h1 class="ui-li-static">' + contacts[0].displayName + '</h1><br>';
	}
	else 
	{
		code = '<img src="img/photo.jpg" class="photo_contact">'
				+ '<h1 class="ui-li-static">' + contacts[0].displayName + '</h1><br>';		 	
	}
		
	if (contacts[0].phoneNumbers) 
	{
		code = code + '<a id="btnCall" href="tel:' + contacts[0].phoneNumbers[0].value + '" data-icon="grid" data-role="button" data-inline="true">Appeler</a>';
	 	
	}
	
	$("#info_contact").append(code);
	
	if (contacts[0].phoneNumbers) 
	{
		$("#btnCall").button();	 	
	}
	
	Id = contacts[0].id;
	searchAllObject (Id.valueOf(), function getInfos(results)
	{
		var length = results.rows.length;
		for (var i = 0 ; i < length ; i++)
		{
			code = '<li>'
					+ '<a href=""><img src="img/appareil_photo.jpg" class="apercu_objet">'
					+ results.rows.item(i).nomObjet + '</a>'
					+ '<a href="#" onclick="javascript:switchDisplay()" data-icon="gear"></a>'
					+ '</li>'
					+ '<li id="lstMenu" style="display:none;">'
					+ '<a  id="btnRemove" onclick="javascript:remObject(' + Id.valueOf() + ',\'' + results.rows.item(i).nomObjet + '\')" href="#" data-icon="delete" data-role="button" data-inline="true" >Supprimer</a>'
					+ '</li>';
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

function remObject (IdUser, ObjectName)
{
	console.log("debut remobjet");
	removeObject(IdUser, ObjectName );
	window.location = "contact.html?nom=" + Name;
}

function returnToHome()
{
	window.location = "index.html";
}

function switchDisplay()
{
	if (document.getElementById("lstMenu").style.display == "block")
	{
		document.getElementById("lstMenu").style.display = "none";
	}
	else
	{
		document.getElementById("lstMenu").style.display = "block";
	}
	$('#btnRemove').button();
}