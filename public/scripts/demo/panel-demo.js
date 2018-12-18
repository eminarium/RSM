$( function(){
	'use strict';

	// code prettify
	prettyPrint();

	// panel demo
	$( 'input[name="panelNav"]' ).on( 'change', function(){
		$( '#panelNav' ).toggleClass( 'nan-tabs nav-pills' );
	});
	// close all panel (call out of panel)
	$( '[data-toggle="panel-close-all"]' ).on( 'click', function(){
		var closer = $( this ),
			data = closer.data();

		if( data.target ){
			$( data.target ).wrapkitPanel( 'close' );
		}
	});
	// show all panel (call out of panel)
	$( '[data-toggle="panel-show-all"]' ).on( 'click', function(){
		var closer = $( this ),
			data = closer.data();

		$( data.target ).wrapkitPanel( 'show' );
	});
	
	// on change color
	$( '.panel' ).on( 'wrapkit.panel.set.color', function(e, color){

		$(this).find( '.pagination .active > a' ).setClass( 'bg-'+ color + ' ' + 'border-' + color );
	})
	// hide the panel refresh indicator
	.on( 'wrapkit.panel.refresh', function(e, args){

		var $this = $( this );
		if ( args ) {
			// just for demo (usually use on ajax done/success)
			setTimeout( function(){
				$this.wrapkitPanel( 'refresh', false );
			}, 3000 );
		}
	});
	// toggle icon collapse on collapse
	$( '#panelEventDemo' ).on( 'wrapkit.panel.collapse', function(){
		
		$( this ).find('[data-toggle="panel-collapse"] > .fa').toggleClass( 'fa-minus fa-plus' );
	});
});