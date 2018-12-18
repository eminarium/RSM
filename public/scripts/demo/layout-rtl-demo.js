$( function(){
    'use strict';

    // Sidebar right & rtl
    $( '#sidebar-rtl' ).wrapkitSidebar({
        align: 'right',
        rtlMode: true
    });
    $( '[data-toggle="sidebar-size"]' ).click( function(e){
        e.preventDefault();
        $( '#sidebar-rtl' ).wrapkitSidebar( 'toggleSize' );
    });
    // header rtl
    $( '.header' ).wrapkitHeader({
        rtlMode: true
    });
    // content rtl
    $( '.content-wrapper' ).wrapkitContent({
        rtlMode: true
    });
    // footer rtl
    $( '.footer-wrapper' ).wrapkitFooter({
        rtlMode: true
    });





    // btn group events
    $( '#rtl-sidebar' ).on( 'change', function(){
        var $this = $(this);

        if( $this.is( ':checked' ) ){
            $( '#sidebar-rtl' ).wrapkitSidebar( 'rtlMode', true );
        } else{
            $( '#sidebar-rtl' ).wrapkitSidebar( 'rtlMode', false );
        }
    });
    $( '#rtl-header' ).on( 'change', function(){
        var $this = $(this);

        if( $this.is( ':checked' ) ){
            $( '.header' ).wrapkitHeader( 'rtlMode', true );
        } else{
            $( '.header' ).wrapkitHeader( 'rtlMode', false );
        }
    });
    $( '#rtl-content' ).on( 'change', function(){
        var $this = $(this);

        if( $this.is( ':checked' ) ){
            $( '.content-wrapper' ).wrapkitContent( 'rtlMode', true );
        } else{
            $( '.content-wrapper' ).wrapkitContent( 'rtlMode', false );
        }
    });
    $( '#rtl-footer' ).on( 'change', function(){
        var $this = $(this);

        if( $this.is( ':checked' ) ){
            $( '.footer-wrapper' ).wrapkitFooter( 'rtlMode', true );
        } else{
            $( '.footer-wrapper' ).wrapkitFooter( 'rtlMode', false );
        }
    });

});