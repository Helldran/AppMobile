// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {

	Object = extractUrlParams ("object");
	
	HeightScreen = screen.height;
	HeightTitle = Math.floor((0.07*HeightScreen));
	
	codeHeader = '<a id="btnBack" href="#" data-rel="back" data-icon="back" class="ui-btn-left" style="height:50px; font-size:20px; width:120px;">Retour</a>'
			   + '<h1 style="height:'+ HeightTitle + 'px;text-align:center;">Objet en Pr&ecirc;t</h1>';
	$("#header").append(codeHeader);
	$("#btnBack").button();
	
	searchObject('"' + Object + '"' , function objectFound(results)
	{
		Name = results.rows.item(0).nameContact;
		Type = results.rows.item(0).typeObjet;
		PhotoObject = results.rows.item(0).photoObjet;
				
		code = '<img src="'+ PhotoObject +'" class="photo_Objet">'
				+ '<h1 class="ui-li-static" style="text-align:center;">Type: ' + Type + '</h1>'
				+ '<h1 class="ui-li-static" style="text-align:center;">Nom: ' + Object + '</h1>'
				+ '<h1 class="ui-li-static" style="text-align:center;">Emprunteur: ' + Name + '</h1>';
		$("#info_ObjetPret").append(code);
	});
	
}

function onError(contactError) {
    alert('onError!');
}