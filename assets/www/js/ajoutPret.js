var Id;
var Name;

// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {

	Id = extractUrlParams ("id");
	Name = extractUrlParams ("nom");
	console.log(Name);
	
}

function addNew()
{
	addObject (Id.valueOf(), document.getElementById('type').value,document.getElementById('name').value, $('#photo_jeu').attr("src") );
	alert ("Ajout objet OK");
	window.location = 'contact.html?nom=' + Name;
}