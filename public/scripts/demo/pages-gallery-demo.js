$( function(){
	'use strict';

	// fix height #gallery-form-place
	$( '#gallery-form-place' ).css({
		height: ($( '.gallery-sort' ).first().height() - 30)
	});
	$( window ).on( 'resize', function(){
		$( '#gallery-form-place' ).css({
			height: ($( '.gallery-sort' ).first().height() - 30)
		});
	});


	// allow sortable .gallery-sort
	$( '#gallery' ).sortable({
		connectWith: '#gallery',
		items: '.gallery-sort',
		containment: '.content-wrapper',
		handle: '.gallery-sort-handle',
		placeholder: 'col-md-4 col-sm-6',
		revert: 'invalid',
		opacity: 0.8,
		helper: 'clone',
		forcePlaceholderSize: true,
		start: function( event, ui ) {
			ui.placeholder.html('<div class="gallery-placeholder ui-corner-all"></div>');

			if( ui.placeholder.is(':last-child') ){
				ui.placeholder.find( '.gallery-placeholder' ).css({
					height: ui.placeholder.prev().height() - 30 + 'px'
				});
			} else{
				ui.placeholder.find( '.gallery-placeholder' ).css({
					height: ui.placeholder.next().height() - 30 + 'px'
				});
			}
		}
    });

});