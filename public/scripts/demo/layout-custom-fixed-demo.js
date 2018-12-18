$( function(){
    'use strict';

    // use sidebar sm by default
    $( '#sidebar-fixed' ).wrapkitSidebar({
        size: 'sm',
        fixed: true
    });

    $( '#toggle-sidebar-size' ).on( 'click', function(){
        $( '#sidebar-fixed' ).wrapkitSidebar( 'toggleSize' );
    });
    $( '#toggle-sidebar-fixed' ).on( 'click', function(){
        var fixed = ( ! $( '#sidebar-fixed' ).wrapkitSidebar( 'option', 'fixed' ) );

        $( '#sidebar-fixed' ).wrapkitSidebar( 'fixed', fixed );
    });


    // Add some controll on sidebar ( on fixed w/ md or sm size );
    $( document ).on( 'mouseenter', '#sidebar-fixed', function(){

        var wrapkitSidebar = $( this ).wrapkitSidebar( 'option' );

        if( wrapkitSidebar.fixed && ( wrapkitSidebar.size === 'md' || wrapkitSidebar.size === 'sm' ) ){
            if( $.viewportWidth() < wrapkitSidebar.screenCollapseMax && wrapkitSidebar.collapseToNavbar ){
                return;
            }
            $( document ).data( 'sidebarPinSize', wrapkitSidebar.size );
            $( this ).wrapkitSidebar( 'resize', 'lg' )
                .find( 'li.open' ).removeClass( 'open' );
        }
    }).on( 'mouseleave', '#sidebar-fixed', function(){

        var wrapkitSidebar = $( this ).wrapkitSidebar( 'option' ),
            size = $( document ).data( 'sidebarPinSize' );

        if( wrapkitSidebar.fixed && ( size === 'md' || size === 'sm' ) ){
            if( $.viewportWidth() < wrapkitSidebar.screenCollapseMax && wrapkitSidebar.collapseToNavbar ){
                return;
            }
            
            if( wrapkitSidebar.size === 'lg' ){

                $( this ).wrapkitSidebar( 'resize', size );
            } else{
                $( document ).data( 'sidebarPinSize', wrapkitSidebar.size );
            }
        } else{
            $( document ).data( 'sidebarPinSize', wrapkitSidebar.size );
        }
    });
});