var Id;
var Name;

// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady() {

	Id = extractUrlParams ("id");
	Name = extractUrlParams ("nom");
	
	HeightScreen = screen.height;
	HeightTitle = Math.floor((0.07*HeightScreen));
	
	codeHeader = '<a id="btnBack" href="#" onclick="javascript:pageChange()" data-icon="back" class="ui-btn-left">Retour</a>'
			   + '<h1 style="height:'+ HeightTitle + ' px;text-align:center;">Ajouter un objet</h1>'
			   + '<a id="btnAdd" href="#" onclick="javascript:addNew()" data-icon="plus" class="ui-btn-right">Ajouter</a>';
	$("#header").append(codeHeader);
	$("#btnBack").button();
	$("#btnAdd").button();
}

function addNew()
{
	addObject (Id.valueOf(), Name, document.getElementById('type').value,document.getElementById('name').value, $('#photo_jeu').attr("src") );
	alert ("Ajout objet OK");
	window.location = 'contact.html?nom=' + Name;
}

function pageChange()
{
	window.location = 'contact.html?nom=' + Name;
}

function choixType()
{
	searchAllObject(function objectFound(results)
	{
		var length = results.rows.length;
		if(length > 0)
		{
			var j = 1;
			var typeActuel = results.rows.item(0).typeObjet;
			var code = '<select name="select" id="select">'
						+ '<option value="' + typeActuel + '">' + typeActuel + '</option>';
			for (var i = 0 ; i < length ; i++)
			{
				if(typeActuel == results.rows.item(i).typeObjet)
				{
				}
				else
				{
					typeActuel = results.rows.item(i).typeObjet;
					code = code + '<option value="' + typeActuel + '">' + typeActuel + '</option>';
					j = j + 1;
				}
			}
			code = code + '</select>';
			$("#divAddPret").append(code);
			$("#select").selectmenu();
			$('select').change(addToText);
			
		}
	});
}

function addToText()
{
  	document.getElementById("type").value = $('#select').val();
}