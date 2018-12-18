$( function(){
	'use strict';

	// on change color
	$( '.panel' ).on( 'wrapkit.panel.set.color', function(e, color){

		var btns = $(this).find( '.btn' );
		color = ( color === 'none' ) ? 'default' : color;

		btns.each( function(){
			var btn = $( this );

			if( btn.is('.active') ){
				btn.setClass( 'btn active ' + 'btn-' + color );
			} else{
				btn.setClass( 'btn ' + 'btn-' + color );
			}
		});
	});

	$( '[name="switch-nav1"]' ).on( 'change', function(){
		var val = $(this).val();

		if( val === 'tabs-alt' ){
			$( '#demo-tabs1' ).setClass( 'nav nav-tabs nav-' + val );
		} else{
			$( '#demo-tabs1' ).setClass( 'nav nav-' + val );
		}
	});

	$( '[name="switch-nav2"]' ).on( 'change', function(){
		var val = $(this).val();

		if( val === 'tabs-alt' ){
			$( '#demo-tabs2' ).setClass( 'nav nav-tabs nav-' + val );
		} else{
			$( '#demo-tabs2' ).setClass( 'nav nav-' + val );
		}
	});

	$( '[name="switch-nav3"]' ).on( 'change', function(){
		var val = $(this).val();

		$( '#demo-tabs3' ).setClass( 'nav nav-' + val );
	});


	$( '#accordion2' ).on( 'show.bs.collapse hide.bs.collapse', function(e){
		var target = $( e.target ).attr( 'id' ),
			caller = $( '[href="#' + target + '"]' ),
			icon = caller.children( '.fa' );

		icon.toggleClass( 'fa-minus fa-plus' );
	});
});