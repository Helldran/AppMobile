function extractUrlParams (name) {

	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
    var regexS = "[\\?&]"+name+"=([^&#]*)";
    var regex = new RegExp( regexS );
    var results = regex.exec( decodeURIComponent(window.location.href) );
    if( results == null )
        return "";
    else
        return results[1];
        
}