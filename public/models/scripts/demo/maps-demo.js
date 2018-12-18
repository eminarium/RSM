$( function(){
	'use strict';

	// Markers
	var map1 = new GMaps({
		div: '#map1',
		lat: -12.043333,
		lng: -77.028333,
		mapTypeControlOptions: {
			mapTypeIds : ['hybrid', 'roadmap', 'satellite', 'terrain', 'osm', 'cloudmade']
        }
	});
	map1.addMarker({
		lat: -12.043333,
		lng: -77.03,
		title: 'Lima',
		details: {
			database_id: 42,
			author: 'HPNeo'
		},
		click: function(e){
			if(console.log){
				console.log(e);
			}
			alert('You clicked in this marker');
		}
	});
	map1.addMarker({
		lat: -12.042,
		lng: -77.028333,
		title: 'Marker with InfoWindow',
		infoWindow: {
			content: '<p>HTML Content</p>'
		}
	});
	map1.addMapType('osm', {
		getTileUrl: function(coord, zoom) {
			return 'http://tile.openstreetmap.org/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
		},
		tileSize: new google.maps.Size(256, 256),
		name: 'OpenStreetMap',
		maxZoom: 18
	});
	map1.addMapType('cloudmade', {
		getTileUrl: function(coord, zoom) {
			return 'http://b.tile.cloudmade.com/8ee2a50541944fb9bcedded5165f09d9/1/256/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
		},
		tileSize: new google.maps.Size(256, 256),
		name: 'CloudMade',
		maxZoom: 18
	});
	map1.setMapTypeId('osm');


	// Geocoding
	var map2 = new GMaps({
		div: '#map2',
		lat: -12.043333,
		lng: -77.028333
	});
	$('#geocoding_form').submit(function(e){
		e.preventDefault();
		GMaps.geocode({
			address: $('#address').val().trim(),
			callback: function(results, status){
				if(status === 'OK'){
					var latlng = results[0].geometry.location;
					map2.setCenter(latlng.lat(), latlng.lng());
					map2.addMarker({
						lat: latlng.lat(),
						lng: latlng.lng()
					});
				}
			}
		});
	});



	// Overlay
	var map3 = new GMaps({
		div: '#map3',
		lat: -12.043333,
		lng: -77.028333
	}),
	path = [
		[-12.040397656836609,-77.03373871559225],
		[-12.040248585302038,-77.03993927003302],
		[-12.050047116528843,-77.02448169303511],
		[-12.044804866577001,-77.02154422636042]
	],
	polygon = map3.drawPolygon({
		paths: path,
		strokeColor: '#2472a4',
		strokeOpacity: 1,
		strokeWeight: 3,
		fillColor: '#2472a4',
		fillOpacity: 0.6
	});



	// Routes
	var map4 = new GMaps({
		div: '#map4',
		lat: -12.043333,
		lng: -77.028333
	});
	$('#start_travel').click(function(e){
		e.preventDefault();
		$('#instructions').empty();

		map4.travelRoute({
			origin: [-12.044012922866312, -77.02470665341184],
			destination: [-12.090814532191756, -77.02271108990476],
			travelMode: 'driving',
			step: function(e){
				$('#instructions').append('<li class="list-group-item">'+e.instructions+'</li>');
				$('#instructions li:eq('+e.step_number+')').delay(450*e.step_number).fadeIn(200, function(){
					map4.setCenter(e.end_location.lat(), e.end_location.lng());
					map4.drawPolyline({
						path: e.path,
						strokeColor: '#131540',
						strokeOpacity: 0.6,
						strokeWeight: 6
					});
				});
				// update sidebar height
				$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
			}
		});
	});


	// static map
	var url = GMaps.staticMapURL({
		size: [800, 390],
		lat: -12.043333,
		lng: -77.028333,
		markers: [
			{lat: -12.043333, lng: -77.028333},
			{lat: -12.045333, lng: -77.034, size: 'small'},
			{lat: -12.045633, lng: -77.022, color: 'blue'}
		]
	});
	$('<img/>').attr('src', url).addClass('img-responsive').appendTo('#map5');


	// Street View Panoramas
	var panorama = GMaps.createPanorama({
		el: '#map6',
		lat : 42.3455,
		lng : -71.0983
	});
});