$( function(){
	'use strict';

	// basic
	$('#jcrop1').Jcrop();

	// event handler
	var showCoords = function(c){
		$('#x1').val(c.x);
		$('#y1').val(c.y);
		$('#x2').val(c.x2);
		$('#y2').val(c.y2);
		$('#w').val(c.w);
		$('#h').val(c.h);
	};

	$('#jcrop2').Jcrop({
		setSelect: [160, 90, 425, 250],
		onChange: showCoords,
		onSelect: showCoords
	});

	// placeholder
	var showPreview = function(coords){
		var rx = 180 / coords.w;
		var ry = 120 / coords.h;

		$('#jcrop-placeholder').css({
			width: Math.round(rx * 600) + 'px',
			height: Math.round(ry * 400) + 'px',
			marginLeft: '-' + Math.round(rx * coords.x) + 'px',
			marginTop: '-' + Math.round(ry * coords.y) + 'px'
		});
	};

	$('#jcrop3').Jcrop({
		setSelect: [160, 90, 425, 250],
		onChange: showPreview,
		onSelect: showPreview,
		aspectRatio: 4/3
	});


	// advance
	var jcropApi,
		colors = [ '#ffffff', '#7f8c8d', '#2c3e50' ,'#16a085' ,'#27ae60' ,'#2980b9' ,'#8e44ad' ,'#f39c12' ,'#d35400' ,'#c0392b' ];
	
	function initJcrop(){

		jcropApi = $.Jcrop('#jcrop4', {setSelect: [160, 90, 425, 250]});

		$('#can_click,#can_move,#can_size')
			.attr('checked','checked');

		$('#ar_lock,#size_lock,#bg_swap').attr('checked',false);

	}
	initJcrop();

	// A handler to kill the action
	// Probably not necessary, but I like it
	function nothing(e){
		e.stopPropagation();
		e.preventDefault();
		return false;
	}

	// Use the API to find cropping dimensions
	// Then generate a random selection
	// This function is used by setSelect and animateTo buttons
	// Mainly for demonstration purposes
	function getRandom() {
		var dim = jcropApi.getBounds();
		return [
			Math.round(Math.random() * dim[0]),
			Math.round(Math.random() * dim[1]),
			Math.round(Math.random() * dim[0]),
			Math.round(Math.random() * dim[1])
		];
	}

	// Attach interface buttons
	// This may appear to be a lot of code but it's simple stuff

	$('#setSelect').click(function() {
		// Sets a random selection
		jcropApi.setSelect(getRandom());
	});

	$('#animateTo').click(function() {
		// Animates to a random selection
		jcropApi.animateTo(getRandom());
	});

	$('#release').click(function() {
		// Release method clears the selection
		jcropApi.release();
	});

	$('#changebg').click(function() {
		jcropApi.setOptions({
			bgColor: colors[$.randomNumber(0,9)]
		});
	});

	$('#disable').click(function() {
		jcropApi.disable();

		$('#disable').hide();
		$('#enable').show();
		$('.requiresjcrop').hide();
	});

	$('#enable').click(function() {
		jcropApi.enable();

		$('#disable').show();
		$('#enable').hide();
		$('.requiresjcrop').show();
	});

	$('#rehook').click(function(e) {
		initJcrop();
		$('#rehook,#enable').hide();
		$('#unhook,#disable,.requiresjcrop').show();
		return nothing(e);
	});

	$('#unhook').click(function(e) {
		jcropApi.destroy();

		$('#unhook,#enable,#disable,.requiresjcrop').hide();
		$('#rehook').show();
		return nothing(e);
	});

	// opacity slider
	$('#changeOpacity').slider({
		range: 'min',
		value: 0.6,
		min: 0,
		max: 1,
		step: 0.1,
		slide: function( event, ui ) {
			jcropApi.setOptions({
				bgOpacity: ui.value
			});
		}
	});

	// The checkboxes simply set options based on it's checked value
	// Options are changed by passing a new options object

	// Also, to prevent strange behavior, they are initially checked
	// This matches the default initial state of Jcrop

	$('#can_click').change(function() {
		jcropApi.setOptions({ allowSelect: !!this.checked });
		jcropApi.focus();
	});

	$('#can_move').change(function() {
		jcropApi.setOptions({ allowMove: !!this.checked });
		jcropApi.focus();
	});

	$('#can_size').change(function() {
		jcropApi.setOptions({ allowResize: !!this.checked });
		jcropApi.focus();
	});

	$('#ar_lock').change(function() {
		jcropApi.setOptions(this.checked? { aspectRatio: 4/3 }: { aspectRatio: 0 });
		jcropApi.focus();
	});
	$('#size_lock').change(function() {
		jcropApi.setOptions(this.checked? {
			minSize: [ 80, 80 ],
			maxSize: [ 350, 350 ]
		}: {
			minSize: [ 0, 0 ],
			maxSize: [ 0, 0 ]
		});
		jcropApi.focus();
	});
	$('#bg_swap').change(function() {
		$('#changebg').toggle();

		jcropApi.setOptions( this.checked? {
			outerImage: 'images/dummy/flower-gray.jpg',
			bgOpacity: 1
		}: {
			outerImage: 'images/dummy/flower.jpg',
			bgOpacity: 0.6
		});
		jcropApi.release();
	});
});