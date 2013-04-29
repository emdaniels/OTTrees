var ottawa = new google.maps.LatLng(45.420353,-75.695982);
var browserSupportFlag =  new Boolean();
var map = null;
var season;
bounds = new google.maps.LatLngBounds(
		new google.maps.LatLng(0,180), new google.maps.LatLng(180,0));

//Age Array
var ages = new Array(true, true, true, true, true, true, true, true, true, true);

//Tree Name Arrays
var nameArray = new Array('Amur_Corktree', 'Apple', 'Ash', 'Ash_Black', 'Ash_European', 'Ash_Green', 'Ash_White', 'Aspen_Columnar', 'Aspen_Largetooth', 'Aspen_Trembling', 'Basswood', 'Beech', 'Beech_American', 'Beech_Blue', 'Beech_European', 'Birch', 'Birch_Gray', 'Birch_Weeping', 'Birch_White', 'Birch_Yellow', 'Buckeye_Ohio', 'Butternut', 'Catalpa_northern', 'Cedar_Eastern_White', 'Cherry', 'Cherry_Black', 'Cherry_Choke', 'Cherry_Choke_Schubert', 'Cherry_Purple_Leaf', 'Coffeetree_Kentucky', 'Crabapple', 'Elm', 'Elm_American', 'Elm_Prospector', 'Elm_Rock', 'Elm_Siberian', 'Fir', 'Fir_Balsam', 'Fir_Colorado', 'Fir_Douglas', 'Ginkgo', 'Hackberry', 'Hawthorn', 'Hazel_Turkish', 'Hemlock', 'Hickory_Bitternut', 'Hickory_Shagbark', 'Horsechestnut_Common', 'Ironwood', 'Juniper', 'Katsura_Tree', 'Larch_Eastern', 'Larch_European', 'Lilac_Japanese', 'Linden_Littleleaf', 'Locust_Black', 'Locust_Honey', 'Magnolia', 'Maple', 'Maple_Amur', 'Maple_Black', 'Maple_Freeman', 'Maple_Manitoba', 'Maple_Norway', 'Maple_Red', 'Maple_Silver', 'Maple_Sugar', 'Mountain_Ash_Oakleaf', 'Mountain_Ash_Showy', 'Mulberry', 'Oak', 'Oak_Bur', 'Oak_English', 'Oak_Pin', 'Oak_Red', 'Oak_White', 'Olive_Russian', 'Pear', 'Pine', 'Pine_Austrian', 'Pine_Jack', 'Pine_Red', 'Pine_Scotch', 'Pine_White', 'Poplar', 'Poplar_Balsam', 'Poplar_Lombardy', 'Redbud_Eastern', 'Serviceberry', 'Spruce', 'Spruce_Black', 'Spruce_Colorado', 'Spruce_Norway', 'Spruce_Red', 'Spruce_White', 'Sycamore_American', 'Unknown', 'Walnut_Black', 'Willow', 'Willow_Black', 'Willow_Weeping', 'Yew_Canada');
var treeLayerArray = new Array();
var seasonalTreeLayerArray = new Array();

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
			var marker = markersArray[i];
			if (marker) marker.setMap(null);
			delete markersArray[i];
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

function getSeason(){
	var now = new Date();
	var month = now.getMonth() + 1;

	if (month == 4){
		season = 1;
	}
	else if (month == 5){
		season = 2;
	}
	else if ((month == 6) || (month == 7) || (month == 8)){
		season = 3;
	}
	else if (month == 9){
		season = 4;
	}
	else if (month == 10){
		season = 5;
	}
	else if ((month == 11) || (month == 12) || (month == 1)){
		season = 6;
	}
}

getSeason();

function changeSeason(seasonNumber) {
	if (seasonNumber == 0) {
		getSeason();
	} else {
		season = seasonNumber;
	}
	for (treeLayer in treeLayerArray) {
		toggleDataOff(treeLayer);
		toggleDataOn(treeLayer);
	}
}

function setAge(index) {

	if (ages[index]) {
		ages[index] = false;
	} else {
		ages[index] = true;
	}
	
	for (treeLayer in treeLayerArray) {
		toggleDataOff(treeLayer);
		toggleDataOn(treeLayer);
	}
}

//Array to loop through called tree species and display the correct season and location
window.tree_data = function(results) {
	var markersArray = new Array();

	if (results.Placemark) {
		for (var i = 0; i < results.Placemark.length; i++) {
			var coords = results.Placemark[i].Point.coordinates.split(',');
			var latLng = new google.maps.LatLng(coords[1],coords[0]);
			var age = parseInt(results.Placemark[i].dbh) * parseInt(results.growthFactor);

			if ((age >= 0 && age <= 19 && ages[0])
					|| (age >= 20 && age <= 39 && ages[1])
					|| (age >= 40 && age <= 59 && ages[2])
					|| (age >= 60 && age <= 79 && ages[3])
					|| (age >= 80 && age <= 99 && ages[4])
					|| (age >= 100 && age <= 199 && ages[5])
					|| (age >= 200 && age <= 299 && ages[6])
					|| (age >= 300 && age <= 399 && ages[7])
					|| (age >= 400 && age <= 499 && ages[8])
					|| (age >= 500 && ages[9]))
					{

				var zoomLevel = map.getZoom();
				//estimatedSpan = maxSpan * (estimatedAge) / matDBH / zoomLevel
				var estimatedSpan = parseInt(results.maxSpan) * (parseInt(results.Placemark[i].dbh) * parseInt(results.growthFactor)) / parseInt(results.matDBH) / zoomLevel / 10;
				if (estimatedSpan > 50)
					estimatedSpan = 50;
				else if (estimatedSpan < 1)
					estimatedSpan = 1;
				var color = results.winterColor;

				switch(season)
				{
				case 1:
					color = results.earlySpringColor;
					break;
				case 2:
					color = results.lateSpringColor;
					break;
				case 3:
					color = results.summerColor;
					break;
				case 4:
					color = results.earlyFallColor;
					break;
				case 5:
					color = results.lateFallColor;
					break;
				}
				
				var contentString = '<div id="content">' +
				'<h4>' + results.scientificName + '</h4>' + results.name + ' <a href="' + results.enWiki + '">en.wiki</a><br/>'+ 
				results.frenchName + ' <a href="' + results.frWiki + '">fr.wiki</a><br/>' + (parseInt(results.Placemark[i].dbh) * parseInt(results.growthFactor)) + ' years old : '
				+ parseInt(results.Placemark[i].dbh) + ' d.b.h.' + '<br/>' + results.Placemark[i].description + '</div>';

				markersArray.push(createMarker(latLng, results.name, map, estimatedSpan, color, contentString));
			}
		}
	}
	treeLayerArray[results.filename] = markersArray;
}

function createMarker(latLng, name, map, estimatedSpan, color, contentString) {
	var marker = new google.maps.Marker({
		position: latLng,
		title: name,
		map: map,
		icon: getCircle(estimatedSpan, color),
		clickable: true,
		info: new google.maps.InfoWindow({
			content: contentString
		})
	});
	google.maps.event.addListener(marker, 'click', function() {
		marker.info.open(map, marker);
	});
	return marker;
}

function getCircle(estimatedSpan, color) {
	return {
		path: google.maps.SymbolPath.CIRCLE,
		fillColor: color,
		fillOpacity: .5,
		scale: estimatedSpan,
		strokeColor: color,
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
