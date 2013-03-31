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
var nameArray = new Array('Oak_Pin', 'Unknown', 'Mountain_Ash_Oakleaf', 'Pine_Jack', 'Buckeye_Ohio', 'Juniper', 'Crabapple', 'Birch', 'Hemlock', 'Oak_Bur', 'Fir_Douglas', 'Walnut_Black', 'Cherry_Choke_Schubert', 'Hackberry', 'Magnolia', 'Locust_Honey', 'Maple_Black', 'Apple', 'Willow_Weeping', 'Spruce', 'Aspen_Columnar', 'Yew_Canada', 'Sycamore_American', 'Hickory_Bitternut', 'Fir_Balsam', 'Poplar_Lombardy', 'Serviceberry', 'Beech_American', 'Maple_Sugar', 'Birch_White', 'Horsechestnut_Common', 'Mulberry', 'Aspen_Largetooth', 'Amur_Corktree', 'Cedar_Eastern_White', 'Maple_Amur', 'Maple_Norway', 'Birch_Gray', 'Hawthorn', 'Spruce_Colorado', 'Hickory_Shagbark', 'Pine_Red', 'Pine_White', 'Katsura_tree', 'Basswood', 'Spruce_Norway', 'Pine', 'Redbud_Eastern', 'Maple_Freeman', 'Ash', 'Catalpa_northern', 'Cherry_Choke', 'Beech_European', 'Cherry', 'Cherry_Black', 'Pine_Scotch', 'Oak_Red', 'Elm_Rock', 'Ash_European', 'Willow', 'Willow_Black', 'Oak', 'Ash_Black', 'Mountain_Ash_', 'Lilac_Japanese', 'Fir_Colorado', 'Linden_Littleleaf', 'Ash_Green', 'Larch_Eastern', 'Other', 'Maple', 'Elm_American', 'Beech_Blue', 'Maple_Silver', 'Mountain_Ash_Showy', 'Spruce_White', 'Poplar_Balsam', 'Elm', 'Olive_Russian', 'Oak_English', 'Elm_Prospector', 'Spruce_Black', 'Beech', 'Hazel_Turkish', 'Ash_White', 'Ginkgo', 'Maple_Red', 'Oak_White', 'See_Notes', 'Ironwod', 'Pear', 'Cherry_Purple_Leaf', 'Spruce_Red', 'Various', 'Elm_Siberian', 'Fir', 'Coffeetree_Kentucky', 'Pine_Austrian', 'Maple_Manitoba', 'Butternut', 'Birch_Yellow', 'Poplar', 'Larch_European', 'Locust_Black', 'Birch_Weeping', 'Aspen_Trembling');

for (var i = 0; i < nameArray.length; i++) {
	treeLayerArray[nameArray[i]] = new google.maps.KmlLayer('http://www.ottrees.com/data/trees/' + nameArray[i] + '.xml?dummy=' + dummyValue, {suppressInfoWindows: false, preserveViewport: true});
}

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
	
	//toggleKML(treeLayer, map);

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
