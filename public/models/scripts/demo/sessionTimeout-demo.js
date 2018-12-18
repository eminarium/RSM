$( function(){
	'use strict';

	$.sessionTimeout({
        warnAfter: 5000,
        redirAfter: 20000,
        keepAliveUrl: 'extras-session-timeout.html',
        redirUrl: 'pages-locked.html',
        logoutUrl: 'pages-signin.html'
    });
});