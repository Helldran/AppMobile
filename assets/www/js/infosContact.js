// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {

	// find all contacts with 'Bob' in any name field
	console.log("Debut javascript");
	var options = new ContactFindOptions();
	options.filter="";
	options.multiple = true;
	var fields = ["displayName", "photos"];
	navigator.contacts.find(fields, onSuccess, onError, options);
	
}


function extractUrlParams () {
	var t = location.search.substring(1).split('&');
	var f = [];
	for (var i=0; i<t.length; i++)
	{
		var x = t[ i ].split('=');
		f[x[0]]=f[1];
	}
	return f;
}