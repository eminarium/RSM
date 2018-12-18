$( function(){
	'use strict';

	$( '#update-progressbar' ).on( 'click', function(){

		var $progress = $( '.progress' );

		$progress.each(function(){
			var progress = $( this ),
				progressBar = progress.children( '.progress-bar' ),
				stacked = ( progressBar.length > 1 ),
				valuenow = $.randomNumber( 33, 100 );

			if( stacked ){
				progressBar.each(function(){
					var valuenowStaked = $.randomNumber( 10, 33 );
					$( this ).css( 'width', valuenowStaked + '%' )
						.children( '.progress-text' ).text( valuenowStaked + '%' );
				});
			} else{
				progressBar.css( 'width', valuenow + '%' );
				progressBar.children( '.progress-text' ).text( valuenow + '%' );
			}

		});
	});


	var toggleSidebarLoader = function( sidebar, duration ){
	    sidebar.wrapkitSidebar( 'loader', true );
	    
	    // just demo to hide (use timeout)
	    setTimeout( function(){
	        sidebar.wrapkitSidebar( 'loader', false );
	    }, duration );
	};
	$( '#toggleSidebarLoader' ).on( 'click', function(e){
		e.preventDefault();

	    // set loader
	    $( '.sidebar' ).wrapkitSidebar( 'setLoader', 'fa fa-spin fa-spin-2x fa-refresh' );
	    // toggle loader
	    toggleSidebarLoader( $( '.sidebar' ), 2000 );
	});
});