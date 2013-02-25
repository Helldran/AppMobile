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


function extractUrlParams (name) {
	console.log("Debut de la fonction getparam");
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( window.location.href );
    if( results == null )
        return "";
    else
        return results[1];
}

function onSuccessContact(contacts) {

	console.log("Le contact est :" + contacts[0] );
	if (contacts[0].photos && contacts[0].photos[0].type == "url") {
		code = '<img src="'+contacts[0].photos[0].value+'" class="photo_contact">';
					}
	else {
		code = '<img src="img/photo.jpg" class="photo_contact">';
				 	
	}
	if (contacts[0].phoneNumbers) 
	{
		code = code + contacts[0].displayName + '<br>'
		  		 	+ '<a href="' + contacts[0].phoneNumbers[0].value + '"  data-role="button" data-mini="true" data-inline="true">Appeler</a>';
	}
	else 
	{
		code = code + contacts[0].displayName + '<br>';
	}
	
	$("#info_contact").append(code);
    
}

// onError: Failed to get the contacts

function onError(contactError) {
    alert('onError!');
}