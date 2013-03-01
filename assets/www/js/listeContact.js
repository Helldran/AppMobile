

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
	
	codeHeader = '<h1 style="height:'+ HeightTitle + ' px;text-align:center;" >Liste des contacts</h1>';
	$("#header").append(codeHeader);
	
    for (var i=0; i<contacts.length; i++)
    {
    	if (contacts[i].photos && contacts[i].photos[0].type == "url")
    	{
    		codeContact = '<li style="height:' + HeightContact + 'px;">'
    					 	+ '<a href="#">'
    					 	+ '<img class="ui-li-thumb" style="width:' + (HeightContact - 20) + 'px; height:' + (HeightContact - 20) + 'px;" src="' + contacts[i].photos[0].value + '">'
    					 	+ '<h2 class="ui-li-static" >' + contacts[i].displayName + '</h2></a>'
    					 	+ '<a style="width:80px;" href="contact.html?nom=' + contacts[i].displayName + '" rel="external">'
    					 	+ '</li>';
    	}
    	else
    	{
    		codeContact = '<li style="height:'+ HeightContact + 'px;">'
    						+ '<a href="#">'
    						+ '<img class="ui-li-thumb" src="img/photo.jpg" style="width:' + (HeightContact - 20) + 'px; height:' + (HeightContact - 20) + 'px;">'
    						+ '<h2 class="ui-li-static" >' + contacts[i].displayName + '</h2></a>'
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