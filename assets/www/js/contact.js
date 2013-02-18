
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
		
		$('#liste_contact').listview('refresh');
	}


// onSuccess: Get a snapshot of the current contacts

function onSuccess(contacts) {
console.log("Debut fonction success");
    for (var i=0; i<contacts.length; i++)
    {
    	if (contacts[i].photos && contacts[i].photos[0].type == "url") {
    		code = '<li><a href=""><img src="'+contacts[i].photos[0].value+'" class="photo">' + contacts[i].displayName + '</a></li>';
    	}
    	else {
    		code = '<li><a href=""><img src="img/photo.jpg" class="photo">' + contacts[i].displayName + '</a></li>';
    	}
    	
    	$("#liste_contact").html(
    		$("#liste_contact").html() + code
    	);
    	
    }
}

// onError: Failed to get the contacts

function onError(contactError) {
    alert('onError!');
}
