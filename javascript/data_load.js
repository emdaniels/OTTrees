//var initialLocation;
var ottawa = new google.maps.LatLng(45.420353,-75.695982);
var browserSupportFlag =  new Boolean();
//var useGeolocation = true;
var map = null;
var zoomLevel = 13;
var maxTreeSpan;
var minTreeSpan;
//var geocoder;
bounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(0,180), new google.maps.LatLng(180,0));

/*var infowindow = new google.maps.InfoWindow({
	content: contentString,
	size: new google.maps.Size(50,50)
	});

var contentString = '<div id="content">'+
'<div id="siteNotice">'+
'</div>'+
'<h1 id="firstHeading" class="firstHeading">YES</h1>'+
'<div id="bodyContent">'+
'<p>Hello people of earth!</p>'+
'</div>'+
'</div>';*/

//Tree Name Arrays
var nameArray = new Array('Amur_Corktree', 'Apple', 'Ash', 'Ash_Black', 'Ash_European', 'Ash_Green', 'Ash_White', 'Aspen_Columnar', 'Aspen_Largetooth', 'Aspen_Trembling', 'Basswood', 'Beech', 'Beech_American', 'Beech_Blue', 'Beech_European', 'Birch', 'Birch_Gray', 'Birch_Weeping', 'Birch_White', 'Birch_Yellow', 'Buckeye_Ohio', 'Butternut', 'Catalpa_northern', 'Cedar_Eastern_White', 'Cherry', 'Cherry_Black', 'Cherry_Choke', 'Cherry_Choke_Schubert', 'Cherry_Purple_Leaf', 'Coffeetree_Kentucky', 'Crabapple', 'Elm', 'Elm_American', 'Elm_Prospector', 'Elm_Rock', 'Elm_Siberian', 'Fir', 'Fir_Balsam', 'Fir_Colorado', 'Fir_Douglas', 'Ginkgo', 'Hackberry', 'Hawthorn', 'Hazel_Turkish', 'Hemlock', 'Hickory_Bitternut', 'Hickory_Shagbark', 'Horsechestnut_Common', 'Ironwood', 'Juniper', 'Katsura_Tree', 'Larch_Eastern', 'Larch_European', 'Lilac_Japanese', 'Linden_Littleleaf', 'Locust_Black', 'Locust_Honey', 'Magnolia', 'Maple', 'Maple_Amur', 'Maple_Black', 'Maple_Freeman', 'Maple_Manitoba', 'Maple_Norway', 'Maple_Red', 'Maple_Silver', 'Maple_Sugar', 'Mountain_Ash_Oakleaf', 'Mountain_Ash_Showy', 'Mulberry', 'Oak', 'Oak_Bur', 'Oak_English', 'Oak_Pin', 'Oak_Red', 'Oak_White', 'Olive_Russian', 'Pear', 'Pine', 'Pine_Austrian', 'Pine_Jack', 'Pine_Red', 'Pine_Scotch', 'Pine_White', 'Poplar', 'Poplar_Balsam', 'Poplar_Lombardy', 'Redbud_Eastern', 'Serviceberry', 'Spruce', 'Spruce_Black', 'Spruce_Colorado', 'Spruce_Norway', 'Spruce_Red', 'Spruce_White', 'Sycamore_American', 'Unknown', 'Walnut_Black', 'Willow', 'Willow_Black', 'Willow_Weeping', 'Yew_Canada');
var treeLayerArray = new Array();

//Leaf Persistence Arrays
var coniferousArray = new Array('Cedar_Eastern_White', 'Fir', 'Fir_Balsam', 'Fir_Colorado', 'Fir_Douglas', 'Hemlock', 'Pine', 'Pine_Austrian', 'Pine_Jack', 'Pine_Red', 'Pine_Scotch', 'Pine_White', 'Spruce', 'Spruce_Black', 'Spruce_Colorado', 'Spruce_Norway', 'Spruce_Red', 'Spruce_White', 'Yew_Canada');
var marcescentArray = new Array('Beech', 'Beech_American', 'Beech_Blue', 'Beech_European', 'Oak', 'Oak_Bur', 'Oak_English', 'Oak_Pin', 'Oak_Red', 'Oak_White');
var deciduousArray = new Array('Amur_Corktree', 'Apple', 'Ash', 'Ash_Black', 'Ash_European', 'Ash_Green', 'Ash_White', 'Aspen_Columnar', 'Aspen_Largetooth', 'Aspen_Trembling', 'Basswood', 'Birch', 'Birch_Gray', 'Birch_Weeping', 'Birch_White', 'Birch_Yellow', 'Buckeye_Ohio', 'Butternut', 'Catalpa_northern', 'Cherry', 'Cherry_Black', 'Cherry_Choke', 'Cherry_Choke_Schubert', 'Cherry_Purple_Leaf', 'Coffeetree_Kentucky', 'Crabapple', 'Elm', 'Elm_American', 'Elm_Prospector', 'Elm_Rock', 'Elm_Siberian', 'Ginkgo', 'Hackberry', 'Hawthorn', 'Hazel_Turkish', 'Hemlock', 'Hickory_Bitternut', 'Hickory_Shagbark', 'Horsechestnut_Common', 'Ironwood', 'Katsura_Tree', 'Larch_Eastern', 'Larch_European', 'Lilac_Japanese', 'Linden_Littleleaf', 'Locust_Black', 'Locust_Honey', 'Magnolia', 'Maple', 'Maple_Amur', 'Maple_Black', 'Maple_Freeman', 'Maple_Manitoba', 'Maple_Norway', 'Maple_Red', 'Maple_Silver', 'Maple_Sugar', 'Mountain_Ash_Oakleaf', 'Mountain_Ash_Showy', 'Mulberry', 'Olive_Russian', 'Pear', 'Poplar', 'Poplar_Balsam', 'Poplar_Lombardy', 'Redbud_Eastern', 'Serviceberry', 'Sycamore_American', 'Unknown', 'Walnut_Black', 'Willow', 'Willow_Black', 'Willow_Weeping');

//Origin Arrays
var nativeArray = new Array('Apple', 'Ash', 'Ash_Black', 'Ash_Green', 'Ash_White', 'Aspen_Largetooth', 'Aspen_Trembling', 'Basswood', 'Beech', 'Beech_American', 'Beech_Blue', 'Beech_European', 'Birch', 'Birch_Gray', 'Birch_White', 'Birch_Yellow', 'Buckeye_Ohio', 'Butternut', 'Cedar_Eastern_White', 'Cherry', 'Cherry_Black', 'Cherry_Choke', 'Cherry_Choke_Schubert', 'Cherry_Purple_Leaf', 'Coffeetree_Kentucky', 'Elm', 'Elm_American', 'Elm_Rock', 'Fir', 'Fir_Balsam', 'Fir_Douglas', 'Hackberry', 'Hawthorn', 'Hemlock', 'Hickory_Bitternut', 'Hickory_Shagbark', 'Ironwood', 'Juniper', 'Larch_Eastern', 'Locust_Honey', 'Maple', 'Maple_Black', 'Maple_Freeman', 'Maple_Manitoba', 'Maple_Red', 'Maple_Silver', 'Maple_Sugar', 'Mountain_Ash_Oakleaf', 'Mountain_Ash_Showy', 'Mulberry', 'Oak', 'Oak_Bur', 'Oak_Pin', 'Oak_Red', 'Oak_White', 'Pear', 'Pine', 'Pine_Jack', 'Pine_Red', 'Pine_White', 'Poplar', 'Poplar_Balsam', 'Redbud_Eastern', 'Serviceberry', 'Spruce', 'Spruce_Black', 'Spruce_Red', 'Spruce_White', 'Sycamore_American', 'Unknown', 'Walnut_Black', 'Willow', 'Willow_Black', 'Yew_Canada');
var nonNativeArray = new Array('Amur_Corktree', 'Ash_European', 'Aspen_Columnar', 'Beech_European', 'Birch_Weeping', 'Catalpa_northern', 'Crabapple', 'Elm_Prospector', 'Elm_Siberian', 'Fir_Colorado', 'Ginkgo', 'Hazel_Turkish', 'Horsechestnut_Common', 'Katsura_Tree', 'Larch_European', 'Lilac_Japanese', 'Linden_Littleleaf', 'Locust_Black', 'Magnolia', 'Maple_Amur', 'Maple_Norway', 'Oak_English', 'Olive_Russian', 'Pine_Austrian', 'Pine_Scotch', 'Poplar_Lombardy', 'Spruce_Colorado', 'Spruce_Norway', 'Willow_Weeping');

//Allergen Arrays
var mildAllergenArray = new Array('Apple', 'Beech', 'Beech_American', 'Beech_European', 'Catalpa_northern', 'Cherry', 'Cherry_Black', 'Cherry_Choke', 'Cherry_Choke_Schubert', 'Cherry_Purple_Leaf', 'Coffeetree_Kentucky', 'Crabapple', 'Ginkgo', 'Hawthorn', 'Juniper', 'Katsura_Tree', 'Locust_Black', 'Locust_Honey', 'Magnolia', 'Mountain_Ash_Oakleaf', 'Mountain_Ash_Showy', 'Olive_Russian', 'Pear', 'Redbud_Eastern', 'Serviceberry');
var moderateAllergenArray = new Array('Ash', 'Aspen_Columnar', 'Aspen_Largetooth', 'Aspen_Trembling', 'Basswood', 'Beech_Blue', 'Birch', 'Birch_Gray', 'Birch_Weeping', 'Birch_White', 'Birch_Yellow', 'Cedar_Eastern_White', 'Elm', 'Elm_American', 'Elm_Prospector', 'Elm_Rock', 'Elm_Siberian', 'Hackberry', 'Hazel_Turkish', 'Ironwood', 'Linden_Littleleaf', 'Maple', 'Maple_Amur', 'Maple_Black', 'Maple_Freeman', 'Maple_Manitoba', 'Maple_Norway', 'Maple_Red', 'Maple_Silver', 'Maple_Sugar', 'Poplar', 'Poplar_Balsam', 'Poplar_Lombardy', 'Sycamore_American');
var severeAllergenArray = new Array('Ash', 'Ash_Black', 'Ash_European', 'Ash_Green', 'Ash_White', 'Butternut', 'Hickory_Bitternut', 'Hickory_Shagbark', 'Mulberry', 'Oak', 'Oak_Bur', 'Oak_English', 'Oak_Pin', 'Oak_Red', 'Oak_White', 'Walnut_Black', 'Willow', 'Willow_Black', 'Willow_Weeping');

//Food Bearing Arrays
var foodBearingArray = new Array('Apple', 'Butternut', 'Cherry', 'Cherry_Black', 'Cherry_Choke', 'Cherry_Choke_Schubert', 'Cherry_Purple_Leaf', 'Crabapple', 'Ginkgo', 'Hackberry', 'Hawthorn', 'Hazel_Turkish', 'Hickory_Shagbark', 'Mulberry', 'Olive_Russian', 'Pear', 'Serviceberry', 'Walnut_Black');
var nonFoodBearingArray = new Array('Amur_Corktree', 'Ash', 'Ash_Black', 'Ash_European', 'Ash_Green', 'Ash_White', 'Aspen_Columnar', 'Aspen_Largetooth', 'Aspen_Trembling', 'Basswood', 'Beech', 'Beech_American', 'Beech_Blue', 'Beech_European', 'Birch', 'Birch_Gray', 'Birch_Weeping', 'Birch_White', 'Birch_Yellow', 'Buckeye_Ohio', 'Catalpa_northern', 'Cedar_Eastern_White', 'Coffeetree_Kentucky', 'Elm', 'Elm_American', 'Elm_Prospector', 'Elm_Rock', 'Elm_Siberian', 'Fir', 'Fir_Balsam', 'Fir_Colorado', 'Fir_Douglas', 'Hemlock', 'Hickory_Bitternut', 'Horsechestnut_Common', 'Ironwood', 'Juniper', 'Katsura_Tree', 'Larch_Eastern', 'Larch_European', 'Lilac_Japanese', 'Linden_Littleleaf', 'Locust_Black', 'Locust_Honey', 'Magnolia', 'Maple', 'Maple_Amur', 'Maple_Black', 'Maple_Freeman', 'Maple_Manitoba', 'Maple_Norway', 'Maple_Red', 'Maple_Silver', 'Maple_Sugar', 'Mountain_Ash_Oakleaf', 'Mountain_Ash_Showy', 'Oak', 'Oak_Bur', 'Oak_English', 'Oak_Pin', 'Oak_Red', 'Oak_White', 'Pine', 'Pine_Austrian', 'Pine_Jack', 'Pine_Red', 'Pine_Scotch', 'Pine_White', 'Poplar', 'Poplar_Balsam', 'Poplar_Lombardy', 'Redbud_Eastern', 'Spruce', 'Spruce_Black', 'Spruce_Colorado', 'Spruce_Norway', 'Spruce_Red', 'Spruce_White', 'Sycamore_American', 'Unknown', 'Willow', 'Willow_Black', 'Willow_Weeping', 'Yew_Canada');

function initialize() { 
	var myOptions = {
			zoom: 13,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			mapTypeControl: true,
			mapTypeControlOptions: {style: google.maps.MapTypeControlStyle.DROPDOWN_MENU},
			navigationControl: true, 
			center: ottawa, 
			disableDefaultUI: false
	};

	map = new google.maps.Map(document.getElementById('map_canvas'), myOptions);

	rect = new google.maps.Rectangle({
		bounds: bounds,
		fillColor: "#000000",
		fillOpacity: 0.4,
		strokeWeight: 0,
		map: map
	});
	
	/*google.maps.event.addListener(marker, 'click', function() {
		  infowindow.open(map,marker);
		});*/
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

	if (script) {
		document.getElementsByTagName('head')[0].removeChild(script);

		var markersArray = treeLayerArray[treeName];

		for (i in markersArray) {
			markersArray[i].setMap(null);
		}

		treeLayerArray[treeName] = null;
	}
}

function toggleArray(treeArray, toggleState) {

	for (i in treeArray) {

		if (toggleState == 'on') {
			toggleDataOn(treeArray[i]);
		} else {
			toggleDataOff(treeArray[i]);
		}
	}
}

//Loops through results array and places a marker for each set of coordinates
window.tree_data = function(results) {
	var markersArray = new Array();
	var now = new Date();
	var month = now.getMonth() + 1;

	for (var i = 0; i < results.Placemark.length; i++) {
		var coords = results.Placemark[i].Point.coordinates.split(',');
		var latLng = new google.maps.LatLng(coords[1],coords[0]);
		if (month == 4){
			var marker = new google.maps.Marker({
				position: latLng,
				title: results.scientificName,
				map: map,
				//estimatedSpan = maxSpan * (estimatedAge) / matDBH
				icon: getCircleEarlySpring(parseInt(results.maxSpan) * (parseInt(results.Placemark[i].dbh) / parseInt(results.growthFactor)) / parseInt(results.matDBH) / zoomLevel, results.earlySpringColor)
			});
		}
		else if (month == 5){
			var marker = new google.maps.Marker({
				position: latLng,
				title: results.scientificName,
				map: map,
				icon: getCircleLateSpring(parseInt(results.maxSpan) * (parseInt(results.Placemark[i].dbh) / parseInt(results.growthFactor)) / parseInt(results.matDBH) / zoomLevel, results.lateSpringColor)
			});
		}
		else if ((month == 6) || (month == 7) || (month == 8)){
			var marker = new google.maps.Marker({
				position: latLng,
				title: results.scientificName,
				map: map,
				icon: getCircleSummer(parseInt(results.maxSpan) * (parseInt(results.Placemark[i].dbh) / parseInt(results.growthFactor)) / parseInt(results.matDBH) / zoomLevel, results.summerColor)
			});
		}
		else if (month == 9){
			var marker = new google.maps.Marker({
				position: latLng,
				title: results.scientificName,
				map: map,
				icon: getCircleEarlyFall(parseInt(results.maxSpan) * (parseInt(results.Placemark[i].dbh) / parseInt(results.growthFactor)) / parseInt(results.matDBH) / zoomLevel, results.earlyFallColor)
			});
		}
		else if (month == 10){
			var marker = new google.maps.Marker({
				position: latLng,
				title: results.scientificName,
				map: map,
				icon: getCircleLateFall(parseInt(results.maxSpan) * (parseInt(results.Placemark[i].dbh) / parseInt(results.growthFactor)) / parseInt(results.matDBH) / zoomLevel, results.lateFallColor)
			});
		}
		else if ((month == 11) || (month == 12) || (month == 1)){
			var marker = new google.maps.Marker({
				position: latLng,
				title: results.scientificName,
				map: map,
				icon: getCircleWinter(parseInt(results.maxSpan) * (parseInt(results.Placemark[i].dbh) / parseInt(results.growthFactor)) / parseInt(results.matDBH) / zoomLevel, results.winterColor)
			});
			markersArray.push(marker);

		}
	}

	treeLayerArray[results.filename] = markersArray;
}

function getCircleEarlySpring(estimatedSpan, earlySpringColor) {
	return {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: earlySpringColor,
		fillOpacity: .5,
		scale: estimatedSpan,
		strokeColor: earlySpringColor,
		strokeWeight: .3
	};
}

function getCircleLateSpring(estimatedSpan, lateSpringColor) {
	return {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: lateSpringColor,
		fillOpacity: .5,
		scale: estimatedSpan,
		strokeColor: lateSpringColor,
		strokeWeight: .3
	};
}

function getCircleSummer(estimatedSpan, summerColor) {
	return {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: summerColor,
		fillOpacity: .5,
		scale: estimatedSpan,
		strokeColor: summerColor,
		strokeWeight: .3
	};
}

function getCircleEarlyFall(estimatedSpan, earlyFallColor) {
	return {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: earlyFallColor,
		fillOpacity: .5,
		scale: estimatedSpan,
		strokeColor: earlyFallColor,
		strokeWeight: .3
	};
}

function getCircleLateFall(estimatedSpan, lateFallColor) {
	return {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: lateFallColor,
		fillOpacity: .5,
		scale: estimatedSpan,
		strokeColor: lateFallColor,
		strokeWeight: .3
	};
}

function getCircleWinter(estimatedSpan, winterColor) {
	return {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: winterColor,
		fillOpacity: .5,
		scale: estimatedSpan,
		strokeColor: winterColor,
		strokeWeight: .3
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
