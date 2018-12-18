$( function(){
	'use strict';

	$.idleTimeout('#modalIdle', '#keepWorking', {
		idleAfter: 5,
		pollingInterval: 2,
		keepAliveURL: 'extras-session-idle.html',
		serverResponseEquals: 'OK',
		onTimeout: function(){
			window.location = 'pages-locked.html';
		},
		onIdle: function(){
			$( '#modalIdle' ).modal( 'show' );
		},
		onCountdown: function( counter ){
			$( '#idleCounter' ).html( counter );
		},
		onResume: function(){
			$( '#modalIdle' ).modal( 'hide' );
		}
	});
	$( '#idleLogoff' ).on( 'click', function(){
		$.idleTimeout.options.onTimeout.call(this);
	});
});