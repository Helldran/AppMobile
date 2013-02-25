//Cration de la base de donn�e
function createDatabase()
{
	var db = window.openDatabase("Database", "1.0", "Base Objet", 200000);
	db.transaction(createDB, errorCreateDB, acceptCreateDB);
}

// Cr�ation de la base de donn�e
function createDB(tx)
{
	tx.executeSql('CREATE TABLE IF NOT EXISTS OBJECT (idObject integer primary key autoincrement, idContact, typeObjet, nomObjet, photoObjet)');
}

// Erreur � la connexion de la base de donn�e
function errorCreateDB(err)
{
    alert("Error processing SQL: "+err);
}

// Ouverture de la base de donn�e r�ussie
function acceptCreateDB()
{	
}

//Ajout d'un �l�ment dans la base de donn�e
function addObject(idContact, typeObjet, nomObjet, photoObjet)
{
	var functionAddObject = function(tx)
	{
		addObjectInDB(tx,idContact, typeObjet, nomObjet, photoObjet);
	}
	
	var db = window.openDatabase("Database", "1.0", "Base Objet", 200000);
	
	db.transaction(functionAddObject, errorAddObjectInDB, acceptAddObjectInDB);
}


// Ajout d'un objet
function addObjectInDB(tx, idContact, typeObjet, nomObjet, photoObjet)
{
     tx.executeSql('INSERT INTO OBJECT (idContact, typeObjet, nomObjet, photoObjet)'+
     				'VALUES (' + idContact + ',"' + typeObjet + '","' + nomObjet + '","' + photoObjet + '")');
}

// Erreur � l'ajout d'un objet
function errorAddObjectInDB(err)
{
    alert("Error processing SQL: "+err);
}

// Ajout d'un objet r�ussit
function acceptAddObjectInDB()
{	
}


//Retrait d'un �l�ment dans la base de donn�e
function removeObject(idContact, nomObjet)
{
	var functionRemoveObject = function(tx)
	{
		removeObjectInDB(tx, idContact, nomObjet);
	}
	
	var db = window.openDatabase("Database", "1.0", "Base Objet", 200000);
	
	db.transaction(functionRemoveObject, errorRemoveObjectInDB, acceptRemoveObjectInDB);
}


// Ajout d'un objet
function removeObjectInDB(tx, idContact, nomObjet)
{
     tx.executeSql('DELETE FROM OBJECT WHERE  idContact=' + idContact + ' AND nomObjet="' + nomObjet + '"');
}

// Erreur � l'�xecution du retrait de l'objet
function errorRemoveObjectInDB(err)
{
    alert("Error processing SQL: "+err);
}

// Retrait d'un objet r�ussit
function acceptRemoveObjectInDB()
{
	
}
