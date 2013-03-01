//Cr�ation de la base de donn�e
function createDatabase()
{
	var db = window.openDatabase("Database", "1.0", "Base Objet", 200000);
	db.transaction(createDB, errorOnExecuteSQL);
}

// Cr�ation de la base de donn�e
function createDB(tx)
{
    tx.executeSql('CREATE TABLE IF NOT EXISTS OBJECT (idObject integer primary key autoincrement, idContact, typeObjet, nomObjet, photoObjet)');
}

// Erreur � la connexion de la base de donn�e
function errorOnExecuteSQL(err)
{
    alert("Error processing SQL: "+err);
}


//Ajout d'un �l�ment dans la base de donn�e
function addObject(idContact, typeObjet, nomObjet, photoObjet)
{
	var functionAddObject = function(tx)
	{
		console.log("Id = " + idContact + "      Type = " + typeObjet + "      nom = " + nomObjet);
		addObjectInDB(tx,idContact, typeObjet, nomObjet, photoObjet);
	};
	
	var db = window.openDatabase("Database", "1.0", "Base Objet", 200000);
	
	db.transaction(functionAddObject, errorOnExecuteSQL);
}


// Ajout d'un objet
function addObjectInDB(tx, idContact, typeObjet, nomObjet, photoObjet)
{
     tx.executeSql('INSERT INTO OBJECT (idContact, typeObjet, nomObjet, photoObjet)'+
     				'VALUES (' + idContact + ',"' + typeObjet + '","' + nomObjet + '","' + photoObjet + '")');
}


//Retrait d'un �l�ment dans la base de donn�e
function removeObject(idContact, nomObjet)
{
	console.log ("Debut remove");
	var functionRemoveObject = function(tx)
	{
		removeObjectInDB(tx, idContact, nomObjet);
	};
	
	var db = window.openDatabase("Database", "1.0", "Base Objet", 200000);
	
	db.transaction(functionRemoveObject, errorOnExecuteSQL);
}


// Ajout d'un objet
function removeObjectInDB(tx, idContact, nomObjet)
{
     tx.executeSql('DELETE FROM OBJECT WHERE  idContact=' + idContact + ' AND nomObjet="' + nomObjet + '"');
}



//Recherche d'un �l�ment dans la base de donn�e en fonction d'un utilisateur
function searchObjectByContactID(idContact, callbackFunction)
{
	var db = window.openDatabase("Database", "1.0", "Base Objet", 200000);
	
	db.transaction(function(tx)
	{
		searchObjectByContactIDInDB(tx, idContact, callbackFunction);
	}, errorOnExecuteSQL);
}

// Recherche d'un objet
function searchObjectByContactIDInDB(tx, idContact, callbackFunction)
{
	var succesForSearch = function(tx, results)
	{
		succesSearch(results, callbackFunction);
	}
    tx.executeSql('SELECT * FROM OBJECT WHERE  idContact=' + idContact, [], succesForSearch, errorOnExecuteSQL);
}

//Fonction envoyant les r�sultat � la fonction de calllback
function succesSearch(results, callbackFunction)
{
	callbackFunction(results);
}



//Recherche tout les �l�ments objets dans la base
function searchAllObject(callbackFunction)
{
	var db = window.openDatabase("Database", "1.0", "Base Objet", 200000);
	
	db.transaction(function(tx)
	{
		searchAllObjectInDB(tx, callbackFunction);
	}, errorOnExecuteSQL);
}


function searchAllObjectInDB(tx, callbackFunction)
{
	var succesForSearch = function(tx, results)
	{
		callbackFunction(results);
	}
    tx.executeSql('SELECT * FROM OBJECT ORDER BY typeObjet ASC', [], succesForSearch, errorOnExecuteSQL);
}