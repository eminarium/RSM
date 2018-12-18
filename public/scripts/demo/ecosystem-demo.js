$( function(){
	'use strict';

	// code prettify
	prettyPrint();

	// Demo Wrapkit Layout
	$( '#wlDemoFullscreen' ).on( 'click', function(){
		$( '#wrapper' ).wrapkitLayout( 'fullscreen', true );
	});

	$( '#wlDemoExitFullscreen' ).on( 'click', function(){
		$( '#wrapper' ).wrapkitLayout( 'fullscreen', false );
	});

	$( '#wlDemoSetFluid' ).on( 'click', function(){
		$( '#wrapper' ).wrapkitLayout( 'setFluid' );
	});

	$( '#wlDemoSetBox' ).on( 'click', function(){
		$( '#wrapper' ).wrapkitLayout( 'setBox' );
	});

	$( '#wlDemoToggleLayout' ).on( 'click', function(){
		$( '#wrapper' ).wrapkitLayout( 'toggleLayout' );
	});



	// Demo Wrapkit Header
	$( '#whDemoSetSkin [data-toggle="header-skin"]' ).on('click', function(e){
		e.preventDefault();
		var $wrapkitHeader = $( '.header' );

		var skin = ( $( this ).data( 'skin' ) ) ? $( this ).data( 'skin' ) : 'midwet';

		$wrapkitHeader.wrapkitHeader( 'setSkin', skin );
	});

	$( '#whDemoFixed' ).on( 'click', function(){
		var $wrapkitHeader = $( '.header' ),
			fixed = ( ! $wrapkitHeader.wrapkitHeader( 'option', 'fixed' ) );
				
		$wrapkitHeader.wrapkitHeader( 'fixed', fixed );
	});

	$( '#whDemoFixedTop' ).on( 'click', function(){
		$( '.header' ).wrapkitHeader( 'fixedTop' );
	});

	$( '#whDemoFixedBottom' ).on( 'click', function(){
		$( '.header' ).wrapkitHeader( 'fixedBottom' );
	});

	$( '#whDemoRtlMode' ).on( 'click', function(){
		var $wrapkitHeader = $( '.header' ),
			rtl = ( ! $wrapkitHeader.wrapkitHeader( 'option', 'rtlMode' ) );
				
		$wrapkitHeader.wrapkitHeader( 'rtlMode', rtl );
	});




	// Demo Wrapkit Content
	$( '#wcDemoRtlMode' ).on( 'click', function(){
		var $wrapkitContent = $( '.content-wrapper' ),
			rtl = ( ! $wrapkitContent.wrapkitContent( 'option', 'rtlMode' ) );
				
	  	$wrapkitContent.wrapkitContent( 'rtlMode', rtl );
	});




	// wrapkitSidebar live demo
	// setSkin
	$( '#wsDemoChangeSidebarSkin [data-toggle="sidebar-skin"]' ).on('click', function(e){
		e.preventDefault();
		var $sidebar = $( '.sidebar' );

		var skin = ( $( this ).data( 'skin' ) ) ? $( this ).data( 'skin' ) : 'midwet';

		$sidebar.wrapkitSidebar( 'setSkin', skin );
	});
	// set variants
	$( '#wsDemoSidebarVariants [data-toggle="sidebar-variant"]' ).on('click', function(e){
		e.preventDefault();
		var $sidebar = $( '.sidebar' );

		var variant = ( $( this ).data( 'variant' ) ) ? $( this ).data( 'variant' ) : 'line';

		$sidebar.wrapkitSidebar( 'setVariant', variant );
	});
	// set context
	$( '#wsDemoSidebarContext [data-toggle="sidebar-context"]' ).on('click', function(e){
		e.preventDefault();
		var $sidebar = $( '.sidebar' );

		var context = ( $( this ).data( 'context' ) ) ? $( this ).data( 'context' ) : 'blue';

		$sidebar.wrapkitSidebar( 'setContext', context );
	});
	// toggle fixed
	$( '#wsDemoToggleFixed' ).on( 'click', function(){

		var $sidebar = $( '.sidebar' ),
			fixed = ( ! $sidebar.wrapkitSidebar( 'option', 'fixed' ) );

		$sidebar.wrapkitSidebar( 'fixed', fixed );
	});
	$( '.sidebar' ).on( 'wrapkit.sidebar.fixed', function( e, fixed ){

		if ( fixed ) {
			console.log( 'Sidebar is fixed!' );
		} else{
			console.log( 'Sidebar is not fixed!' );
		}
	});
	// resize to sm
	$( '#wsDemoResizeSM' ).on( 'click', function(){
		$( '.sidebar' ).wrapkitSidebar( 'resize', 'sm' );
	});
	$( '.sidebar' ).on( 'wrapkit.sidebar.resize', function( e, size ){
		console.log( 'Sidebar size is ' + size );
	});
	// toggle size
	$( '#wsDemoToggleSize' ).on( 'click', function(){
		$( '.sidebar' ).wrapkitSidebar( 'toggleSize' );
	});
	// collapse all
	$( '#wsDemoCollapseAll' ).on( 'click', function(){
		$( '.sidebar' ).wrapkitSidebar( 'collapseAll' );
	});
	// toggle show
	$( '#wsDemoLoader' ).on( 'click', function(){
		toggleSidebarLoader( $( '.sidebar' ), 2000);
	});
	// set loader & show
	$( '#wsDemoSetLoader' ).on( 'click', function(){

		$('.sidebar').wrapkitSidebar( 'setLoader', 'fa fa-spin fa-refresh' );
		toggleSidebarLoader( $( '.sidebar' ), 2000);
	});
	// toggle align
	$( '#wsDemoToggleAlign' ).on( 'click', function(){

		$('.sidebar').wrapkitSidebar( 'toggleAlign' );
	});
	// toggle rtlMode
	$( '#wsDemoToggleRtl' ).on( 'click', function(){

		var $sidebar = $('.sidebar'),
			rtl = ( ! $sidebar.wrapkitSidebar( 'option', 'rtlMode' ) );

		$sidebar.wrapkitSidebar( 'rtlMode', rtl );
	});
	// collapseToNavbar
	$( '#wsDemoCollapseToNavbar' ).on( 'click', function(){

		var $sidebar = $('.sidebar'),
			collapseToNavbar = ( ! $sidebar.wrapkitSidebar( 'option', 'collapseToNavbar' ) );

		$sidebar.wrapkitSidebar( 'collapseToNavbar', collapseToNavbar);
	});
	// live resize
	// disable
	$( '#wsDemoDisableLiveResize' ).on( 'click', function(){
		$('.sidebar').wrapkitSidebar( 'liveResizable', false );
	});
	// enable
	$( '#wsDemoEnableLiveResize' ).on( 'click', function(){
		$('.sidebar').wrapkitSidebar( 'liveResizable', true );
	});

	// show loader
	var toggleSidebarLoader = function( $sidebar, duration ){

		$sidebar.wrapkitSidebar( 'loader', true );

		setTimeout( function(){
			
			$sidebar.wrapkitSidebar( 'loader', false );
		}, duration );
	};




	// Demo Wrapkit Header
	$( '#wfDemoSetSkin [data-toggle="footer-skin"]' ).on('click', function(e){
		e.preventDefault();
		var $wrapkitFooter = $( '.footer-wrapper' );

		var skin = ( $( this ).data( 'skin' ) ) ? $( this ).data( 'skin' ) : 'midwet';

		$wrapkitFooter.wrapkitFooter( 'setSkin', skin );
	});

	$( '#wfDemoRtlMode' ).on( 'click', function(){
		var $wrapkitFooter = $( '.footer-wrapper' ),
			rtl = ( ! $wrapkitFooter.wrapkitFooter( 'option', 'rtlMode' ) );
				
		$wrapkitFooter.wrapkitFooter( 'rtlMode', rtl );
	});
});