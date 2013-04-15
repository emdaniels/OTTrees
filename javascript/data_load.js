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
var nameArray = new Array('Amur_Corktree', 'Apple', 'Ash', 'Ash_Black', 'Ash_European', 'Ash_Green', 'Ash_White', 'Aspen_Columnar', 'Aspen_Largetooth', 'Aspen_Trembling', 'Basswood', 'Beech', 'Beech_American', 'Beech_Blue', 'Beech_European', 'Birch', 'Birch_Gray', 'Birch_Weeping', 'Birch_White', 'Birch_Yellow', 'Buckeye_Ohio', 'Butternut', 'Catalpa_northern', 'Cedar_Eastern_White', 'Cherry', 'Cherry_Black', 'Cherry_Choke', 'Cherry_Choke_Schubert', 'Cherry_Purple_Leaf', 'Coffeetree_Kentucky', 'Crabapple', 'Elm', 'Elm_American', 'Elm_Prospector', 'Elm_Rock', 'Elm_Siberian', 'Fir', 'Fir_Balsam', 'Fir_Colorado', 'Fir_Douglas', 'Ginkgo', 'Hackberry', 'Hawthorn', 'Hazel_Turkish', 'Hemlock', 'Hickory_Bitternut', 'Hickory_Shagbark', 'Horsechestnut_Common', 'Ironwood', 'Juniper', 'Katsura_Tree', 'Larch_Eastern', 'Larch_European', 'Lilac_Japanese', 'Linden_Littleleaf', 'Locust_Black', 'Locust_Honey', 'Magnolia', 'Maple', 'Maple_Amur', 'Maple_Black', 'Maple_Freeman', 'Maple_Manitoba', 'Maple_Norway', 'Maple_Red', 'Maple_Silver', 'Maple_Sugar', 'Mountain_Ash_Oakleaf', 'Mountain_Ash_Showy', 'Mulberry', 'Oak', 'Oak_Bur', 'Oak_English', 'Oak_Pin', 'Oak_Red', 'Oak_White', 'Olive_Russian', 'Pear', 'Pine', 'Pine_Austrian', 'Pine_Jack', 'Pine_Red', 'Pine_Scotch', 'Pine_White', 'Poplar', 'Poplar_Balsam', 'Poplar_Lombardy', 'Redbud_Eastern', 'Serviceberry', 'Spruce', 'Spruce_Black', 'Spruce_Colorado', 'Spruce_Norway', 'Spruce_Red', 'Spruce_White', 'Sycamore_American', 'Unknown', 'Walnut_Black', 'Willow', 'Willow_Black', 'Willow_Weeping', 'Yew_Canada');
var treeLayerArray = new Array();

function initialize() { 
	var myOptions = {
			zoom: 12,
			mapTypeId: google.maps.MapTypeId.ROADMAP, 
			center: ottawa, 
			disableDefaultUI: false
	};

	map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);
}

function toggleDataOn(treeName) {
	// Create a <script> tag and set the USGS URL as the source.
	var script = document.createElement('script');
	script.src = 'data/trees/json/' + treeName;
	script.id = treeName + 'script';
	document.getElementsByTagName('head')[0].appendChild(script);
}

function toggleDataOff(treeName) {
	var script = document.getElementById(treeName + 'script');
	document.getElementsByTagName('head')[0].removeChild(script);

	var markersArray = treeLayerArray[treeName];

	for (i in markersArray) {
		markersArray[i].setMap(null);
	}

	treeLayerArray[treeName] = null;
}

//Loop through the results array and place a marker for each set of coordinates.
window.tree_data = function(results) {
	var markersArray = new Array();

	for (var i = 0; i < results.Placemark.length; i++) {
		//alert(results.Placemark[i].description);
		var coords = results.Placemark[i].Point.coordinates.split(',');
		var latLng = new google.maps.LatLng(coords[1],coords[0]);
		var now = new Date();
		var month = now.getMonth() + 1;
		
		//early spring: April
		if (month == 4){
			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				icon: getCircleEarlySpring(parseInt(results.maxSpan) * (parseInt(results.Placemark[i].dbh) / parseInt(results.growthFactor)) / parseInt(results.matDBH), results.earlySpringColor) //estimatedSpan = maxSpan * (estimatedAge) / matDBH
			});
			markersArray.push(marker);
		}
		//late spring: May
		else if (month == 5){
			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				icon: getCircleLateSpring(parseInt(results.maxSpan) * (parseInt(results.Placemark[i].dbh) / parseInt(results.growthFactor)) / parseInt(results.matDBH), results.lateSpringColor) //estimatedSpan = maxSpan * (estimatedAge) / matDBH
			});
			markersArray.push(marker);
		}

		//summer: June-August
		else if (month == 6 || month == 7 || month == 8){
			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				icon: getCircleSummer(parseInt(results.maxSpan) * (parseInt(results.Placemark[i].dbh) / parseInt(results.growthFactor)) / parseInt(results.matDBH), results.summerColor) //estimatedSpan = maxSpan * (estimatedAge) / matDBH
			});
			markersArray.push(marker);
		}

		//early fall: September
		else if (month == 9){
			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				icon: getCircleEarlyFall(parseInt(results.maxSpan) * (parseInt(results.Placemark[i].dbh) / parseInt(results.growthFactor)) / parseInt(results.matDBH), results.earlyFallColor) //estimatedSpan = maxSpan * (estimatedAge) / matDBH
			});
			markersArray.push(marker);
		}

		//late fall: October
		else if (month == 10){
			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				icon: getCircleLateFall(parseInt(results.maxSpan) * (parseInt(results.Placemark[i].dbh) / parseInt(results.growthFactor)) / parseInt(results.matDBH), results.lateFallColor) //estimatedSpan = maxSpan * (estimatedAge) / matDBH
			});
			markersArray.push(marker);
		}

		//winter: November-March
		else {
			var marker = new google.maps.Marker({
				position: latLng,
				map: map,
				icon: getCircleWinter(parseInt(results.maxSpan) * (parseInt(results.Placemark[i].dbh) / parseInt(results.growthFactor)) / parseInt(results.matDBH), results.winterColor) //estimatedSpan = maxSpan * (estimatedAge) / matDBH
			});
			markersArray.push(marker);
		}
	}

	treeLayerArray[results.filename] = markersArray;
}

function getCircle(estimatedSpan) {
	return {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: 'green',
		fillOpacity: .2,
		scale: estimatedSpan,
		strokeColor: 'white',
		strokeWeight: .5
	};
}

function getCircleEarlySpring(estimatedSpan, earlySpringColor) {
	return {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: earlySpringColor,
		fillOpacity: .2,
		scale: estimatedSpan,
		strokeColor: 'white',
		strokeWeight: .5
	};
}

function getCircleLateSpring(estimatedSpan, lateSpringColor) {
	return {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: lateSpringColor,
		fillOpacity: .2,
		scale: estimatedSpan,
		strokeColor: 'white',
		strokeWeight: .5
	};
}

function getCircleSummer(estimatedSpan, summerColor) {
	return {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: summerColor,
		fillOpacity: .2,
		scale: estimatedSpan,
		strokeColor: 'white',
		strokeWeight: .5
	};
}

function getCircleEarlyFall(estimatedSpan, earlyFallColor) {
	return {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: earlyFallColor,
		fillOpacity: .2,
		scale: estimatedSpan,
		strokeColor: 'white',
		strokeWeight: .5
	};
}

function getCircleLateFall(estimatedSpan, lateFallColor) {
	return {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: lateFallColor,
		fillOpacity: .2,
		scale: estimatedSpan,
		strokeColor: 'white',
		strokeWeight: .5
	};
}

function getCircleWinter(estimatedSpan, winterColor) {
	return {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: winterColor,
		fillOpacity: .2,
		scale: estimatedSpan,
		strokeColor: 'white',
		strokeWeight: .5
	};
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
	return str.replace(/\w\S*/g, function(txt){
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

/* map loading function */
/*
var treeLayerArray = new Array();

for (var i = 0; i < nameArray.length; i++) {
	treeLayerArray[nameArray[i]] = new google.maps.KmlLayer('http://www.ottrees.com/data/trees/' + nameArray[i] + '.xml?dummy=' + dummyValue, {suppressInfoWindows: false, preserveViewport: true});
}

 function load() {
	var myOptions = {mapTypeId: google.maps.MapTypeId.ROADMAP, center: ottawa, disableDefaultUI: false};

	 instantiate the map 
	map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);

	geocoder = new google.maps.Geocoder();

	 geolocation section 
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

	 default location assignment (if location not found) 
	function handleNoGeolocation(errorFlag) {
		if (errorFlag == true) {
			initialLocation = ottawa;
		} else {
			initialLocation = ottawa;
		}

		map.setCenter(initialLocation);
		var marker = new google.maps.Marker({map: map, position: initialLocation});
	}

	 default zoom level of map 
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


	// Process for determining icon size and age of tree based on DBH and species
	//examines and extracts DBH of tree from KML file and extracts growthFactor, maxSpan and maxAge for that species from CSV file

	//returns estimated span for individual tree
	function estimateTreeSpan(){
		var DBH = (KML.value);
		var growthFactor = (CSV.value);
		var maxSpan = (CSV.value);
		var maxAge = (CSV value);
		var estimatedAge= DBH * growthFactor;
		var estimatedSpan = maxSpan * estimatedAge / maxAge;
		return estimatedSpan;
	}

	//returns estimated age for individual tree
	function estimateTreeAge(){
		var DBH = (KML value);
		var growthFactor = (CSV value);
		var estimatedAge= DBH * growthFactor;
		return estimatedAge;
	}

	//now have ability to add estimatedAge and estimatedSpan to tool-tip/info window for that tree
	//alternately, could add an estimatedSpan column in CSV for each species with DBH 0-5, 6-10, 11-15, 16-20, 21-25, 26-30...etc. but highest DBH is around 130 for some trees

	//adds estimatedSpan to symbol path for semi-accurate size on map
	var earlySpringDTree(estimatedSpan) {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: 'green',
		fillOpacity: .2,
		scale: estimatedSpan,
		strokeColor: 'white',
		strokeWeight: .5
	};

	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(45.420353,-75.695982),
		icon: earlySpringDTree,
		map: map
	});

	//for displaying icons for each tree in the KML file		
	for(var i = 0; i < latitudes.length; i++) {
		var latLng = new google.maps.LatLng(latitudes[i], longitudes[i])
		var newCircle = new google.maps.Marker({
			icon: earlySpringDTree,
			position: latLng
		});
		newCircle.setMap(map);
	}
} 

function toggleKML(kmlLayer, map) {
	if (kmlLayer.getMap() == null && map != null) {
		kmlLayer.setMap(map);
	} else if (kmlLayer.getMap() != null && map == null) {
		kmlLayer.setMap(null);
	}
}*/
