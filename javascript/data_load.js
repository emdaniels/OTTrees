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
    
/* different marker sets */
var treeLayer 		          = new google.maps.KmlLayer('doc.kml?dummy=42', {suppressInfoWindows: true, preserveViewport: true});


/* map loading function */
function load() {
	var myOptions = {mapTypeId: google.maps.MapTypeId.ROADMAP, center: ottawa, disableDefaultUI: true};
    
	/* instanciate the map */
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
	
	calibrateSeason();
	
	addKMLListener(treeLayer);
	
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
      
function showSpringElements() {	
  document.getElementById("top_image").className = 'top_image_holder_sp';
  document.getElementById("left_image").className = 'left_image_holder_sp';
  document.getElementById("right_image").className = 'right_image_holder_sp';
  document.getElementById("bottom_image").className = 'bottom_image_holder_sp';
	
	toggleKML(rinkLayer, null);
	toggleKML(splashpadLayer, null);
	toggleKML(sleddinghillLayer, null);
	toggleKML(lawnbowlingLayer, map);
	toggleKML(volleyballcourtsLayer, map);
	toggleKML(tenniscourtsLayer, map);
	toggleKML(sportsfieldsLayer, map);
	toggleKML(basketballcourtsLayer, map);
	toggleKML(balldiamondsLayer, map);
	toggleKML(wadingpoolLayer, null);
}
      
function showSummerElements() {
  document.getElementById("top_image").className = 'top_image_holder_su';
  document.getElementById("left_image").className = 'left_image_holder_su';
  document.getElementById("right_image").className = 'right_image_holder_su';
  document.getElementById("bottom_image").className = 'bottom_image_holder_su';
	
	toggleKML(rinkLayer, null);
	toggleKML(splashpadLayer, map);
	toggleKML(sleddinghillLayer, null);
	toggleKML(lawnbowlingLayer, map);
	toggleKML(volleyballcourtsLayer, map);
	toggleKML(tenniscourtsLayer, map);
	toggleKML(sportsfieldsLayer, map);
	toggleKML(basketballcourtsLayer, map);
	toggleKML(balldiamondsLayer, map);
	toggleKML(wadingpoolLayer, map);
}
      
function showAutumnElements() {
	document.getElementById("top_image").className = 'top_image_holder_au';
  document.getElementById("left_image").className = 'left_image_holder_au';
  document.getElementById("right_image").className = 'right_image_holder_au';
  document.getElementById("bottom_image").className = 'bottom_image_holder_au';
	
	toggleKML(rinkLayer, null);
	toggleKML(splashpadLayer, null);
	toggleKML(sleddinghillLayer, null);
	toggleKML(lawnbowlingLayer, map);
	toggleKML(volleyballcourtsLayer, null);
	toggleKML(tenniscourtsLayer, map);
	toggleKML(sportsfieldsLayer, map);
	toggleKML(basketballcourtsLayer, map);
	toggleKML(balldiamondsLayer, map);
	toggleKML(wadingpoolLayer, null);
}
      
function showWinterElements() {
	document.getElementById("top_image").className = 'top_image_holder_wi';
  document.getElementById("left_image").className = 'left_image_holder_wi';
  document.getElementById("right_image").className = 'right_image_holder_wi';
  document.getElementById("bottom_image").className = 'bottom_image_holder_wi';
	
	toggleKML(rinkLayer, map);
	toggleKML(splashpadLayer, null);
	toggleKML(sleddinghillLayer, map);
	toggleKML(lawnbowlingLayer, null);
	toggleKML(volleyballcourtsLayer, null);
	toggleKML(tenniscourtsLayer, null);
	toggleKML(sportsfieldsLayer, null);
	toggleKML(basketballcourtsLayer, null);
	toggleKML(balldiamondsLayer, null);
	toggleKML(wadingpoolLayer, null);
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

function calibrateSeason() {

  var now = new Date();
  var month = now.getMonth() + 1;
  var date = now.getDate();
    
  if ((month == 12 && date > 20) || (month <= 2) || (month == 3 && date < 20)) {
    showWinterElements();
    season = 0;
  } else if ((month == 3 && date > 19) || (month > 3 && month < 6) || (month == 6 && date < 21)) {
    showSpringElements();
    season = 1;
  } else if ((month == 6 && date > 20) || (month > 6 && month < 9) || (month == 9 && date < 23)) {
    showSummerElements();
    season = 2;
  } else if ((month == 9 && date > 22) || (month > 9 && month < 12) || (month == 12 && date < 19)) {
    showAutumnElements();
    season = 3;
  }
}

function changeSeason() {
  if (season == 0) {
    season++;
    showSpringElements();
  } else if (season == 1) {

    season++;
    showSummerElements();
  } else if (season == 2) {
    season++;
    showAutumnElements();
  } else if (season == 3) {
    season = 0;
    showWinterElements();
  }
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

function toggleKML(kmlLayer, map) {
  if (kmlLayer.getMap() == null && map != null) {
    kmlLayer.setMap(map);
  } else if (kmlLayer.getMap() != null && map == null) {
    kmlLayer.setMap(null);
  }
}

