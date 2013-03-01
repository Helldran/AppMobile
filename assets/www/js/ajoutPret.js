var Id;
var Name;

// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {

	Id = extractUrlParams ("id");
	Name = extractUrlParams ("nom");
	
	HeightScreen = screen.height;
	HeightContact = Math.floor((0.85*HeightScreen)/6);
	HeightTitle = Math.floor((0.07*HeightScreen));
	
	codeHeader = '<a id="btnBack" href="#" onclick="javascript:pageChange()" data-icon="back" class="ui-btn-left">Retour</a>'
			   + '<h1 style="height:'+ HeightTitle + ' px;text-align:center;">Ajouter un objet</h1>'
			   + '<a id="btnAdd" href="#" onclick="javascript:addNew()" data-icon="plus" class="ui-btn-right">Ajouter</a>';
	console.log(codeHeader);
	$("#header").append(codeHeader);
	$("#btnBack").button();
	$("#btnAdd").button();
}

function addNew()
{
	addObject (Id.valueOf(), document.getElementById('type').value,document.getElementById('name').value, $('#photo_jeu').attr("src") );
	alert ("Ajout objet OK");
	window.location = 'contact.html?nom=' + Name;
}

function pageChange()
{
	window.location = 'contact.html?nom=' + Name;
}