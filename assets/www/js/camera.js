function getPhoto(imageId)
{
	navigator.camera.getPicture(
		function(imageData) {
			$(imageId).attr("src", "data:image/jpeg;base64," + imageData);
		},
		function(message) {
			alert('Impossible de prendre la photo : ' + message);
		},
		{ quality: 50, destinationType: Camera.DestinationType.DATA_URL}
	);
}
