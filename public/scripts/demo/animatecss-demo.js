$( function(){
	'use strict';

	var testAnim = function( x ) {
		var $sandbox = ( $('#useHtmlToAnimated').is(':checked') ) ? $('html') : $('#animationSandbox') ;

		$sandbox.removeClass()
		.addClass(x + ' animated')
		.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			$(this).removeClass();
		});
	};

	$( '#animateIt' ).on( 'click', function(){
		var anim = $( 'select[name="list-animations"]' ).val();
		testAnim(anim);
	});

	$( 'select[name="list-animations"]' ).on( 'change', function(){
		var anim = $(this).val();
		testAnim(anim);
	});
});