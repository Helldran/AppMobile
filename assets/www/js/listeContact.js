

// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {

	var options = new ContactFindOptions();
	options.filter="";
	options.multiple = true;
	var fields = ["displayName", "photos"];
	navigator.contacts.find(fields, onSuccess, onError, options);
	
}

// onSuccess: Get a snapshot of the current contacts

function onSuccess(contacts) {
	HeightScreen = screen.height;
	HeightContact = Math.floor((0.85*HeightScreen)/6);
	HeightTitle = Math.floor((0.07*HeightScreen));
	HeightFilter = Math.floor((0.08*HeightScreen));
	
	codeHeader = '<h1 style="height:'+ HeightTitle + ' px;text-align:center;" >Liste des contacts</h1>';
	$("#header").append(codeHeader);
	
    for (var i=0; i<contacts.length; i++)
    {
    	if (contacts[i].photos && contacts[i].photos[0].type == "url") {
    		codeContact = '<li style="height:'+ HeightContact + ' px;" >'
    					 	+ '<a href="#">'
    					 	+ '<img src="'+contacts[i].photos[0].value+'" class="photo">'
    					 	+ '<p>' + contacts[i].displayName + '</p></a>'
    					 	+ '<a "contact.html?nom='+ contacts[i].displayName +'" rel="external">'
    					 	+ '</li>';
    	}
    	else {
    		codeContact = '<li style="height:'+ HeightContact + 'px;" >'
    						+ '<a href="#">'
    						+ '<img src="img/photo.jpg" class="photo">'
    						+ '<p>' + contacts[i].displayName + '</p></a>'
    						+ '<a style="width:80px;" href="contact.html?nom='+ contacts[i].displayName +'" rel="external">'
    						+ '</li>';
    	}
    	
    	$("#liste_contact").append(codeContact);
    }
	$('#liste_contact').listview('refresh');
}

// onError: Failed to get the contacts

function onError(contactError) {
    alert('onError!');
}