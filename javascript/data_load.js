var initialLocation;
var ottawa = new google.maps.LatLng(45.420353,-75.695982);
var browserSupportFlag =  new Boolean();
var useGeolocation = true;
var map = null;
var zoomLevel = 15;
var geocoder;
var infowindow = new google.maps.InfoWindow({
	size: new google.maps.Size(50,50)
});
var season = 0;

var dummyValue = new Date().getTime();

var treeLayerArray = new Array();

/* different marker sets */
treeLayerArray['Oak'] = new google.maps.KmlLayer('http://www.ottrees.com/data/trees/Oak_Red.xml?dummy=' + dummyValue, {suppressInfoWindows: false, preserveViewport: true});

var treeLayer = treeLayerArray['Oak'];

/* map loading function */
function load() {
	var myOptions = {mapTypeId: google.maps.MapTypeId.ROADMAP, center: ottawa, disableDefaultUI: true};

	/* instantiate the map */
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	geocoder = new google.maps.Geocoder();

	/* geolocation section */
	if(navigator.geolocation && useGeolocation) { // Try W3C Geolocation (Preferred)
		browserSupportFlag = true;
		navigator.geolocation.getCurrentPosition(
				function(position) {
					initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
					map.setCenter(initialLocation);
					var marker = new google.maps.Marker({map: map, position: initialLocation});
				}, 
				function() {
					handleNoGeolocation(browserSupportFlag);
				}
		);
	} else if (google.gears && useGeolocation) { // Try Google Gears Geolocation
		browserSupportFlag = true;
		var geo = google.gears.factory.create('beta.geolocation');
		geo.getCurrentPosition(
				function(position) {
					initialLocation = new google.maps.LatLng(position.latitude,position.longitude);
					map.setCenter(initialLocation);
					var marker = new google.maps.Marker({map: map, position: initialLocation});
				}, 
				function() {
					handleNoGeoLocation(browserSupportFlag);
				}
		);
	} else { // Browser doesn't support Geolocation
		browserSupportFlag = false;
		handleNoGeolocation(browserSupportFlag);
	}

	/* default location assignment (if location not found) */
	function handleNoGeolocation(errorFlag) {
		if (errorFlag == true) {
			initialLocation = ottawa;
		} else {
			initialLocation = ottawa;
		}

		map.setCenter(initialLocation);
		var marker = new google.maps.Marker({map: map, position: initialLocation});
	}

	/* default zoom level of map */
	map.setZoom(zoomLevel);
	
	toggleKML(treeLayer, map);

	//addKMLListener(treeLayer);
	
	function addKMLListener(layer) {
		google.maps.event.addListener(layer, 'click', function(kmlEvent) {
			var name = kmlEvent.featureData.name;
			var location = kmlEvent.latLng;
			codeLatLng(name, location);
		});
	}

	function codeLatLng(name, location) {
		geocoder.geocode({'latLng': location}, function(results, status) {
			if (status == google.maps.GeocoderStatus.OK) {
				if (results[1]) {         
					infowindow.setContent("<div id='content'>&nbsp;<br /><strong>" + toTitleCase(name) + "</strong><br />" + results[1].formatted_address + "<br /><a href='http://maps.google.com/maps?saddr=" + initialLocation + "&daddr=" + location.toString() + "&dirflg=w' target='_new'>Directions</a></div>" );
					infowindow.setPosition(location);
					infowindow.open(map);
				}
			} else {
				alert("Geocoder failed due to: " + status);
			}
		});
	}
} 

function zoomIn() {
	zoomLevel = map.getZoom();
	zoomLevel++;
	map.setZoom(zoomLevel);
}

function zoomOut() {
	zoomLevel = map.getZoom();
	zoomLevel--;
	map.setZoom(zoomLevel);
}

function toTitleCase(str) {
	return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function toggleKML(kmlLayer, map) {
	if (kmlLayer.getMap() == null && map != null) {
		kmlLayer.setMap(map);
	} else if (kmlLayer.getMap() != null && map == null) {
		kmlLayer.setMap(null);
	}
}
