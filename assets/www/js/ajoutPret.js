var Id;

// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {

	Id = extractUrlParams ("id");
	
}

function addNew()
{
	addObject (Id, $("#type").value, $("#name").value, "" );
}