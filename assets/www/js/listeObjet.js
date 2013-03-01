
// Wait for Cordova to load
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready
function onDeviceReady()
{
	searchAllObject(function objectFound(results)
	{
		var length = results.rows.length;
		console.log("Longueur des enregistrements d'objets " + length);
		if(length > 0)
		{
			var typeActuel = results.rows.item(0).typeObjet;
			var code = '<div data-role="collapsible-set" data-theme="b" data-content-theme="d">'
					 + '<div data-role="collapsible">'
					 + '<h2>' + typeActuel + '</h2>'
					 + '<ul data-role="listview" data-filter="true" data-filter-theme="c" data-divider-theme="d">';
			for (var i = 0 ; i < length ; i++)
			{
				if(typeActuel == results.rows.item(i).typeObjet)
				{
					code = code + '<li><a href="object.html?object=' + results.rows.item(i).nomObjet + '">' + results.rows.item(i).nomObjet + '</a></li>';
				}
				else
				{
					typeActuel = results.rows.item(i).typeObjet;
					code = code + '</ul>'
								+ '<ul data-role="listview" data-filter-theme="c" data-divider-theme="d">'
								+ '<h2>' + typeActuel + '</h2>'
								+ '<li><a href="object.html?object=' + results.rows.item(i).nomObjet + '">' + results.rows.item(i).nomObjet + '</a></li>';
				}
				if(i == (length - 1))
				{
					code = code + '</ul>'
								+ '</div>';
				}
			}
			$("#liste_objet").append(code);
		}
		else
		{
			code = "<h2>Aucun objet n'est actuellement en pr&ecirc;t</h2>";
			$("#liste_objet").append(code);
		}
		$('#liste_objet').listview('refresh');
	});
}