//Création de la base de donnée
function createDatabase()
{
	var db = window.openDatabase("Database", "1.0", "Base Objet", 200000);
	db.transaction(createDB, errorCreateDB);
}

// Création de la base de donnée
function createDB(tx)
{
    tx.executeSql('CREATE TABLE IF NOT EXISTS OBJECT (idObject integer primary key autoincrement, idContact, typeObjet, nomObjet, photoObjet)');
}

// Erreur à la connexion de la base de donnée
function errorCreateDB(err)
{
    alert("Error processing SQL: "+err);
}


//Ajout d'un élément dans la base de donnée
function addObject(idContact, typeObjet, nomObjet, photoObjet)
{
	var functionAddObject = function(tx)
	{
		console.log("Id = " + idContact + "      Type = " + typeObjet + "      nom = " + nomObjet);
		addObjectInDB(tx,idContact, typeObjet, nomObjet, photoObjet);
	};
	
	var db = window.openDatabase("Database", "1.0", "Base Objet", 200000);
	
	db.transaction(functionAddObject, errorAddObjectInDB);
}


// Ajout d'un objet
function addObjectInDB(tx, idContact, typeObjet, nomObjet, photoObjet)
{
     tx.executeSql('INSERT INTO OBJECT (idContact, typeObjet, nomObjet, photoObjet)'+
     				'VALUES (' + idContact + ',"' + typeObjet + '","' + nomObjet + '","' + photoObjet + '")');
}

// Erreur à l'ajout d'un objet
function errorAddObjectInDB(err)
{
    alert("Error processing SQL: "+err);
}


//Retrait d'un élément dans la base de donnée
function removeObject(idContact, nomObjet)
{
	console.log ("Debut remove");
	var functionRemoveObject = function(tx)
	{
		removeObjectInDB(tx, idContact, nomObjet);
	};
	
	var db = window.openDatabase("Database", "1.0", "Base Objet", 200000);
	
	db.transaction(functionRemoveObject, errorRemoveObjectInDB);
}


// Ajout d'un objet
function removeObjectInDB(tx, idContact, nomObjet)
{
     tx.executeSql('DELETE FROM OBJECT WHERE  idContact=' + idContact + ' AND nomObjet="' + nomObjet + '"');
}

// Erreur à l'éxecution du retrait de l'objet
function errorRemoveObjectInDB(err)
{
    alert("Error processing SQL: "+err);
}



//Recherche d'un élément dans la base de donnée en fonction d'un utilisateur
function searchAllObject(idContact, callbackFunction)
{
	var db = window.openDatabase("Database", "1.0", "Base Objet", 200000);
	
	db.transaction(function(tx)
	{
		var retour = searchAllObjectInDB(tx, idContact, callbackFunction);
	}, errorSearchAllObjectInDB);
}

// Erreur à l'éxecution du retrait de l'objet
function errorSearchAllObjectInDB(err)
{
    alert("Error processing SQL: "+err);
}

// Recherche d'un objet
function searchAllObjectInDB(tx, idContact, callbackFunction)
{
	var succesForSearch = function(tx, results)
	{
		succesSearch(results, callbackFunction);
	}
    tx.executeSql('SELECT * FROM OBJECT WHERE  idContact=' + idContact, [], succesForSearch, errorSearch);
}

// Erreur à l'éxecution du retrait de l'objet
function errorSearch(err)
{
    alert("Error processing SQL: "+err);
}

//Fonction envoyant les résultat à la fonction de calllback
function succesSearch(results, callbackFunction)
{
	callbackFunction(results);
}
