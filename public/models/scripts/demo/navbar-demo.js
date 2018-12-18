$( function(){
	'use strict';

	$( '.navbar-demo-color a' ).on( 'click', function(e){
		e.preventDefault();

		var $this = $( this ),
			data = $this.data();

		$( '#navbar-demo' ).setClass( 'navbar navbar-' + data.navbar );
	});
});