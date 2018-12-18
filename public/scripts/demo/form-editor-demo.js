$(function(){
	'use strict';

	// summernote
	$('#summernote').summernote({
		height: 300,
		toolbar: [
			['style', ['style']],
			['font', ['bold', 'italic', 'underline', 'clear']],
			['fontname', ['fontname']],
			['fontsize', ['fontsize']], // Still buggy
			['color', ['color']],
			['para', ['ul', 'ol', 'paragraph']],
			['height', ['height']],
			['table', ['table']],
			['insert', ['link', 'picture', 'video']],
			['view', ['fullscreen', 'codeview']],
			['help', ['help']]
		]
	});

	$( '#summernote-panel' ).on( 'wrapkit.panel.set.color', function(e, color){
		color = ( color === 'none' ) ? 'default' : color;

		$( '#summernoteSave' ).setClass( 'btn btn-' + color );
	}).on( 'wrapkit.panel.refresh', function(e, args){

		// just demo to reload content editor
	    var $this = $( this );
		if ( args ) {
			// hide panel loader state
			setTimeout( function(){
				$this.wrapkitPanel( 'refresh', false );

				$('#summernote').code( '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Soluta, qui, consectetur voluptatibus unde tempore vitae reprehenderit incidunt voluptatum ratione deserunt delectus eius dolor dicta officiis debitis accusantium quod enim possimus.</p>' );
			}, 3000 );
		}
	});



	// epiceditor
	var opts = {
		container: 'epiceditor',			// container id
		textarea: 'epiceditor-edit-area',	// textarea id
		basePath: '',						// bash path to take source
		theme: {
		    base: 'styles/epiceditor/base/epiceditor.css',
		    preview: 'styles/wrapkit.css',
		    editor: 'styles/epiceditor/editor/epic-dark.css'
		},
		autogrow: {
			minHeight: 500,
			maxHeight: 500
		}
	},
	epicEditor = new EpicEditor( opts ).load();

	// Change fullscreen
	$( '#epicFull' ).on( 'click', function(e){
		e.preventDefault();

		if (! epicEditor.is('loaded') ) { return; }
		epicEditor.enterFullscreen();
	});
	
	// get content
	$( '#epiceditorGetText' ).on( 'click', function(){
		var text = $( '#epiceditor-edit-area' ).val();	// Returns the editor's text

		$( '#markdown-result' ).val( text );
	});
	$( '#epiceditorGetHtml' ).on( 'click', function(){
		var previewer = epicEditor.getElement('previewer').body,
			html = $( previewer ).children('div').html();	// Returns the editor's html

		$( '#markdown-result' ).val( html );
	});


	// epicEditor2
	var opts2 = {
		container: 'epiceditor2',			// container id
		textarea: 'epiceditor-edit-area2',	// textarea id
		basePath: '',						// bash path to take source
		theme: {
		    base: 'styles/epiceditor/base/epiceditor.css',
		    preview: 'styles/epiceditor/preview/github.css',
		    editor: 'styles/epiceditor/editor/epic-light.css'
		},
		autogrow: {
			minHeight: 500,
			maxHeight: 500
		}
	},
	epicEditor2 = new EpicEditor( opts2 ).load();

	// Change fullscreen
	$( '#epicFull2' ).on( 'click', function(e){
		e.preventDefault();

		if (! epicEditor2.is('loaded') ) { return; }
		epicEditor2.enterFullscreen();
	});
	
	// get content
	$( '#epiceditorGetText2' ).on( 'click', function(){
		var text = $( '#epiceditor-edit-area2' ).val();	// Returns the editor's text

		$( '#markdown-result' ).val( text );
	});
	$( '#epiceditorGetHtml2' ).on( 'click', function(){
		var previewer = epicEditor2.getElement('previewer').body,
			html = $( previewer ).children('div').html();	// Returns the editor's html

		$( '#markdown-result' ).val( html );
	});

	// select result
	$( '#select-result' ).on( 'click', function(e){
		e.preventDefault();
		$( '#markdown-result' ).select();
	});
});