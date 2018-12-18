$( function(){
	'use strict';

	// backgrounds slideshow
	$.vegas.defaults.background.fade = 3000;
	$.vegas('slideshow', {
		delay: 15000,
		loading: false,
		backgrounds: [
			{
				src: 'images/dummy/trianglify1.svg'
			}, {
				src: 'images/dummy/trianglify2.svg'
			}, {
				src: 'images/dummy/trianglify3.svg'
			}, {
				src: 'images/dummy/trianglify4.svg'
			}, {
				src: 'images/dummy/trianglify5.svg'
			}, {
				src: 'images/dummy/trianglify6.svg'
			},

		],
	})('overlay', {
		src:'images/vegas/overlays/02.png',
		opacity: 0.001
	});

	$( '#lockeForm' ).on( 'submit', function(){

		$( '#lockedInput' ).addClass( 'hide' );
		$( '#lockedLoader' ).removeClass( 'hide' );

		setTimeout( function(){
			window.location.href = 'index.html';
		}, 3000);
		return false;
	});
});