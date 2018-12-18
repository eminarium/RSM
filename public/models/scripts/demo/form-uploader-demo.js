$( function(){
	'use strict';

	// DROPZONE
    $('form[data-input="dropzone"]').each(function(){
        var $this = $(this),
            url = $this.attr('action');

        $this.dropzone({ url: url });
    });
    // END DROPZONE
});