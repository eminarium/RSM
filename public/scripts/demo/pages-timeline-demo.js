$( function(){
	'use strict';

	// Markers
	var map = new GMaps({
		div: '#map1',
		lat: -12.042,
		lng: -77.028333
	});
	map.addMarker({
		lat: -12.042,
		lng: -77.028333,
		title: 'Lesehan Sego Megono',
		infoWindow: {
			content: '<p>Lesehan Sego Megono</p>'
		}
	});
	map.addMapType('osm', {
		getTileUrl: function(coord, zoom) {
			return 'http://tile.openstreetmap.org/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
		},
		tileSize: new google.maps.Size(256, 256),
		name: 'OpenStreetMap',
		maxZoom: 18
	});
	map.addMapType('cloudmade', {
		getTileUrl: function(coord, zoom) {
			return 'http://b.tile.cloudmade.com/8ee2a50541944fb9bcedded5165f09d9/1/256/' + zoom + '/' + coord.x + '/' + coord.y + '.png';
		},
		tileSize: new google.maps.Size(256, 256),
		name: 'CloudMade',
		maxZoom: 18
	});
	map.setMapTypeId('osm');
});