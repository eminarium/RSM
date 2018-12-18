$( function(){
	'use strict';

	// jquery ui widgets demo
	// Accordion
	$( '#accordion' ).accordion({
		heightStyle: 'content',
		header: '> div > h3'
	}).sortable({
		axis: 'y',
		handle: 'h3',
		stop: function( event, ui ) {
			// IE doesn't register the blur when sorting
			// so trigger focusout handlers to remove .ui-state-focus
			ui.item.children( 'h3' ).triggerHandler( 'focusout' );
		}
	});

	// Tabs
	var tabSort = $( '#tabs' ).tabs();
	tabSort.find( '.ui-tabs-nav' ).sortable({
		axis: 'x',
		stop: function() {
			tabSort.tabs( 'refresh' );
		}
	});

	// Dialog
	$( '#dialog-opener' ).click(function() {
		$( '#dialog' ).dialog( 'open' );
		return false;
	});
	$( '#dialog' ).dialog({
		autoOpen: false,
		modal: true,
		show: {
			effect: 'blind',
			duration: 300
		},
		hide: {
			effect: 'explode',
			duration: 300
		},
        buttons: {
			Close: function() {
				$( this ).dialog( 'close' );
			}
		}
	});

	// button
    $( '.jui-button' )
	.button().click(function( e ) {
		e.preventDefault();
	});
    $( '.jui-button-set' ).buttonset();

    // autocomplete
	var availableTags = [
		'ActionScript',
		'AppleScript',
		'Asp',
		'BASIC',
		'C',
		'C++',
		'Clojure',
		'COBOL',
		'ColdFusion',
		'Erlang',
		'Fortran',
		'Groovy',
		'Haskell',
		'Java',
		'JavaScript',
		'Lisp',
		'Perl',
		'PHP',
		'Python',
		'Ruby',
		'Scala',
		'Scheme'
	];
	$( '.jui-autocomplete' ).autocomplete({
		source: availableTags
	});

	// spinner
	$( '.jui-spinner' ).spinner();

	// sliders
	// setup master volume
	$( '#slider-horizontal > span' ).each(function() {
		// read initial values from markup and remove that
		var value = parseInt( $( this ).text(), 10 ),
			startRange = $.randomNumber(5,20);
		$( this ).empty().slider({
			values: [startRange, value],
			orientation: 'horizontal',
			range: true,
			animate: true,
			slide: function( event, ui ) {
				$( '#slideResult' ).val( '$' + ui.values[ 0 ] + ' - $' + ui.values[ 1 ] );
			}
		});
	});
	// setup graphic EQ
	$( '#slider-vertical > span' ).each(function() {
		// read initial values from markup and remove that
		var value = parseInt( $( this ).text(), 10 );
		$( this ).empty().slider({
			value: value,
			range: 'min',
			animate: true,
			orientation: 'vertical'
		});
	});

	// datepicker
	$( '#datepicker' ).datepicker({
		showOtherMonths: true,
		numberOfMonths: 2,
		changeYear: true
	});

	// menu
	$( '#menu' ).menu();
});