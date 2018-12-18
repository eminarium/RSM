$( function(){
	'use strict';

	// jQuery interactions demo
	// Draggable
	$( '#draggable1' ).draggable({ axis: 'y', containment: 'parent' });
    $( '#draggable2' ).draggable({ axis: 'x', containment: 'parent' });
    $( '#draggable3' ).draggable({ containment: '#containment-wrapper', scroll: false });
    $( '#draggable5' ).draggable({ containment: 'parent' });
    $( '#modalDraggable .modal-content' ).draggable({
		containment: '#modalDraggable',
		handle: '.modal-title'
    });

    // Dropable
    $( '#draggable' ).draggable({ containment: 'parent' });
    $( '#droppable, #droppable-inner' ).droppable({
		accept: '#draggable',
		activeClass: 'ui-state-hover',
		hoverClass: 'ui-state-active',
		drop: function() {
			$( this ).addClass( 'ui-state-highlight' )
				.find( '> p' )
				.html( 'Dropped!' );
			return false;
		}
	});
	$( '#droppable2, #droppable2-inner' ).droppable({
		accept: '#draggable',
		greedy: true,
		activeClass: 'ui-state-hover',
		hoverClass: 'ui-state-active',
		drop: function() {
			$( this ).addClass( 'ui-state-highlight' )
				.find( '> p' )
				.html( 'Dropped!' );
		}
	});


	// Resizable
	$( '#resizable' ).resizable({
		animate: true,
		minHeight: 170,
		minWidth: 200,
		stop: function(){
			// update sidebar height on animate end
			$( this ).queue( function(){
				$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );

				$( this ).dequeue();
			});
		}
	}).on( 'wrapkit.panel.expand', function(e, args){

		if (args) {
			// expand mode: normalize w and h the destroy resizable
			$(this).css({
				'width': 'inherit',
				'height': 'inherit'
			}).resizable( 'destroy' );
		} else{
			// initial setting
			$(this).css({
				'width': '200px'
			}).resizable({
				animate: true,
				minHeight: 170,
				minWidth: 200
			});
		}
	}).on( 'wrapkit.panel.collapse', function(e, args){
		if( args ){
			$(this).css('height', 'initial');
		}
	});


	// Selectable
	$( '#selectable' ).selectable({
		stop: function() {
			var result = $( '#select-result' ).empty();
			$( '.ui-selected', this ).each(function() {
				var index = $( '#selectable li' ).index( this );
				result.append( ' #' + ( index + 1 ) );
			});
		}
	});


	// Sortable
	$( '[data-interaction="sortable"]' ).sortable({
		connectWith: '[data-interaction="sortable"]',
		containment: '.content-wrapper',
		items: '.sortable-item',
		handle: '.sortable-handle',
		placeholder: 'col-md-4 col-sm-6',
		revert: 'invalid',
		opacity: 0.8,
		forcePlaceholderSize: true,
		start: function( event, ui ) {
			ui.placeholder.html('<div class="sortable-placeholder ui-corner-all"></div>');

			if( ui.placeholder.is(':last-child') ){
				ui.placeholder.find( '.sortable-placeholder' ).css({
					height: ui.placeholder.prev().height() - 20 + 'px'
				});
			} else{
				ui.placeholder.find( '.sortable-placeholder' ).css({
					height: ui.placeholder.next().height() - 20 + 'px'
				});
			}
		}
    });
});