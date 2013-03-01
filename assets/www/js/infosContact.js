var Id;
var Name;

// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {
	
	Name = extractUrlParams ("nom");
	console.log("Le nom est " + Name);
	var options = new ContactFindOptions();
	options.filter= Name;
	options.multiple = true;
	var fields = ["displayName", "photos", "phoneNumbers", "id"];
	navigator.contacts.find(fields, onSuccessContact, onError, options);
	
}

function onSuccessContact(contacts) {

	HeightScreen = screen.height;
	HeightContact = Math.floor((0.85*HeightScreen)/6);
	HeightTitle = Math.floor((0.07*HeightScreen));
	HeightFilter = Math.floor((0.08*HeightScreen));
	
	codeHeader = '<a id="btnHome" href="#" onclick="javascript:returnToHome()" data-icon="home" class="ui-btn-left">Accueil</a>'
					+ '<h1 style="height:'+ HeightTitle + ' px;text-align:center;">Contact</h1>'
					+ '<a id="btnAdd" href="#" onclick="javascript:addObject()" data-icon="plus" class="ui-btn-right" >Ajouter</a>';
					
	$("#header").append(codeHeader);
	$("#btnHome").button();
	$("#btnAdd").button();
	
	
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
	searchObjectByContactID(Id.valueOf(), function getInfos(results)
	{
		var length = results.rows.length;
		for (var i = 0 ; i < length ; i++)
		{
			code = '<li style="height:' + HeightContact + 'px;">'
					+ '<a href=""><img src="' + results.rows.item(i).photoObjet + '" style="width:' + (HeightContact - 20) + 'px; height:' + (HeightContact - 20) + 'px;">'
					+ '<h2 class="ui-li-static" >' + results.rows.item(i).nomObjet + '</h2></a>'
					+ '<a href="#" onclick="javascript:switchDisplay(' + i + ')" data-icon="gear"></a>'
					+ '</li>'
					+ '<li id="lstMenu' + i + '" style="display:none;">'
					+ '<a  id="btnRemove' + i + '" onclick="javascript:remObject(' + Id.valueOf() + ',\'' + results.rows.item(i).nomObjet + '\')" href="#" data-icon="delete" data-role="button" data-inline="true" >Supprimer</a>'
					+ '</li>';
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
	removeObject(IdUser, ObjectName );
	window.location = "contact.html?nom=" + Name;
}

function returnToHome()
{
	window.location = "index.html";
}

function switchDisplay(i)
{
	if (document.getElementById("lstMenu" + i).style.display == "block")
	{
		document.getElementById("lstMenu" + i).style.display = "none";
	}
	else
	{
		document.getElementById("lstMenu" + i).style.display = "block";
	}
	$('#btnRemove' + i).button();
}