$( function(){
	'use strict';

	// just demo email
	// activate/disabled email-btn
	var toggleActiveBtnEmail = function(){
		var isAnyChecked = $('input[name="selectedEmail"]:checked').length;
		if ( isAnyChecked ) {
			$( '.email-toolbar .toggle-disabled' ).removeClass( 'disabled' );
			$( '#toggleAllEmail' ).focus();
		} else{
			$( '.email-toolbar .toggle-disabled' ).addClass( 'disabled' );
		}
	};

	// simple search email
	$( '#findEmail' ).on( 'submit', function(){
		return false;
	});
	$( '#emailSearch' ).on( 'keyup', function(){
		var txt = $(this).val();

		// start condition
		$( '.email-item' ).addClass( 'hide' );
		$( '.email-group' ).unhighlight();

		// cancel all available to fire event on email item
		$( '#toggleAllEmail, input[name="selectedEmail"]' ).prop( 'checked', false );
		$( '.email-item' ).removeClass( 'selected' );
		// activate/disabled email-btn
		toggleActiveBtnEmail();

		if( txt === '' ){
			$( '.email-item' ).removeClass( 'hide' );
		} else{
			$( '.email-item:containsNC('+ txt +')' ).removeClass( 'hide' );
			$( '.email-group' ).highlight( txt );
		}
	});

	// toggle selected individual email
	$( document ).on( 'click', '.email-item', function(e){
		e.preventDefault();

		$( '.email-item' ).removeClass( 'active' );
		$( this ).addClass( 'active' );
	})
	.on( 'change', 'input[name="selectedEmail"]', function(){
		var $emailItem = $(this).closest( '.email-item' );

		$emailItem.toggleClass( 'selected' );

		// activate/disabled email-btn
		toggleActiveBtnEmail();
	})
	// toggle select all email
	.on( 'change', '#toggleAllEmail', function(e){
		e.preventDefault();
		var checked = $(this).prop( 'checked' ),
			$emailItems = $( '.email-item' );

		$( 'input[name="selectedEmail"]' ).prop( 'checked', checked );

		if ( checked ) {
			$emailItems.addClass( 'selected' );
		} else{
			$emailItems.removeClass( 'selected' );
		}

		// activate/disabled email-btn
		toggleActiveBtnEmail();
	})
	// select all email
	.on( 'click', '#selectAllEmail', function(e){
		e.preventDefault();
		var $emailItems = $( '.email-item' );

		$( 'input[name="selectedEmail"], #toggleAllEmail' ).prop( 'checked', true );
		$emailItems.addClass( 'selected' );

		// activate/disabled email-btn
		toggleActiveBtnEmail();
	})
	// unselect all email
	.on( 'click', '#unselectAllEmail', function(e){
		e.preventDefault();
		var $emailItems = $( '.email-item' );

		$( 'input[name="selectedEmail"], #toggleAllEmail' ).prop( 'checked', false );
		$emailItems.removeClass( 'selected' );

		// activate/disabled email-btn
		toggleActiveBtnEmail();
	})
	// select only read email
	.on( 'click', '#selectReadEmail', function(e){
		e.preventDefault();
		var $emailItems = $( '.email-item' ).not( '.unread' );

		// refresh to normal
		$( 'input[name="selectedEmail"]' ).prop( 'checked', false );
		$( '.email-item' ).removeClass( 'selected' );

		// add selected to target
		$emailItems.find( 'input[name="selectedEmail"]' ).prop( 'checked', true );
		$emailItems.addClass( 'selected' );

		// activate/disabled email-btn
		toggleActiveBtnEmail();
	})
	// select only unread email
	.on( 'click', '#selectUnreadEmail', function(e){
		e.preventDefault();
		var $emailItems = $( '.email-item.unread' );

		// refresh to normal
		$( 'input[name="selectedEmail"]' ).prop( 'checked', false );
		$( '.email-item' ).removeClass( 'selected' );

		// add selected to target
		$emailItems.find( 'input[name="selectedEmail"]' ).prop( 'checked', true );
		$emailItems.addClass( 'selected' );

		// activate/disabled email-btn
		toggleActiveBtnEmail();
	})
	// select only stared email
	.on( 'click', '#selectStaredEmail', function(e){
		e.preventDefault();
		var $emailItems = $( '.email-item.stared' );

		// refresh to normal
		$( 'input[name="selectedEmail"]' ).prop( 'checked', false );
		$( '.email-item' ).removeClass( 'selected' );

		// add selected to target
		$emailItems.find( 'input[name="selectedEmail"]' ).prop( 'checked', true );
		$emailItems.addClass( 'selected' );

		// activate/disabled email-btn
		toggleActiveBtnEmail();
	})
	// select only unstared email
	.on( 'click', '#selectUnstaredEmail', function(e){
		e.preventDefault();
		var $emailItems = $( '.email-item' ).not( '.stared' );

		// refresh to normal
		$( 'input[name="selectedEmail"]' ).prop( 'checked', false );
		$( '.email-item' ).removeClass( 'selected' );

		// add selected to target
		$emailItems.find( 'input[name="selectedEmail"]' ).prop( 'checked', true );
		$emailItems.addClass( 'selected' );

		// activate/disabled email-btn
		toggleActiveBtnEmail();
	})
	// toggle stared individual email
	.on( 'click', '.email-star', function(e){
		e.preventDefault();
		var $emailItem = $(this).closest( '.email-item' );

		$emailItem.toggleClass( 'stared' );
	})
	.on( 'click', '#refreshEmailLists', function(e){
		e.preventDefault();

		var $this = $( this ),
			$icon = $this.children( '.fa' );

		$icon.addClass( 'fa-spin' );

		// stop spin after action is done
		setTimeout( function(){
			$icon.removeClass( 'fa-spin' );
		}, 3000);
	});

	// cancel events if user fire on nice-checkbox
	$( '.nice-checkbox' ).on( 'click', function(e){
		e.stopPropagation();
	});




	// email preview
	$( document ).on( 'click', '.ep-item-sender', function(){
		$(this).closest( '.ep-item' )
		.toggleClass( 'ep-item-collapse' );
	});


	// view rule on screen md
	$( document ).on( 'click', '.email-item', function(){
		var emailLists = $( '.email-lists' ),
			emailPreview = $( '.email-preview' );

		emailLists.removeClass( 'active' );
		emailPreview.addClass( 'active' );

		// refresh niceScroll
		$( '.nice-scroll' ).getNiceScroll().resize();
	}).on( 'click', '.back-to-email-lists', function(e){
		e.preventDefault();

		var emailPreview = $( '.email-preview' ),
			emailLists = $( '.email-lists' );

		emailPreview.removeClass( 'active' )
		.find( '.ep-item:not(:last)' ).addClass( 'ep-item-collapse' );

		emailLists.addClass( 'active' )
		.find( '.email-item' ).removeClass( 'active' );

		// refresh niceScroll
		$( '.nice-scroll' ).getNiceScroll().resize();
	});


	// compose
	$( document ).on( 'click', '#composeEmail:not(.compose-mode)', function(e){
		e.preventDefault();

		$('#compose-editor').summernote({
			focus: true,
			height: 600,
			toolbar: [
				['style', ['style']],
				['font', ['bold', 'italic', 'underline', 'clear']],
				['fontname', ['fontname']],
				['fontsize', ['fontsize']], // Still buggy
				['color', ['color']],
				['para', ['ul', 'ol', 'paragraph']],
				['insert', ['link', 'picture', 'video']]
			]
		});

		$( this ).addClass( 'compose-mode' );
		$( '.email-compose' ).removeClass( 'hide' );
		$( '.email-preview, .email-lists' ).addClass( 'hide' );
	})
	.on( 'click', '#destroy-compose', function(e){
		e.preventDefault();

		$( '#composeEmail' ).removeClass( 'compose-mode' );
		$( '#formComposeEmail .form-control' ).val('');
		$('#compose-editor').destroy().empty();

		$( '.email-compose' ).addClass( 'hide' );
		$( '.email-preview, .email-lists' ).removeClass( 'hide' );
		$( '.email-preview' ).removeClass( 'active' );
		$( '.email-lists' ).addClass( 'active' );

	})
	.on( 'click', '#showComposeCC', function(e){
		e.preventDefault();

		$( '#ccComposeGroup' ).removeClass( 'hide' );
	})
	.on( 'click', '#showComposeBCC', function(e){
		e.preventDefault();

		$( '#bccComposeGroup' ).removeClass( 'hide' );
	})
	.on( 'click', '#hideComposeCC', function(e){
		e.preventDefault();

		$( '#ccComposeGroup' ).addClass( 'hide' );
	})
	.on( 'click', '#hideComposeBCC', function(e){
		e.preventDefault();

		$( '#bccComposeGroup' ).addClass( 'hide' );
	})
	.on( 'submit', '#formComposeEmail', function(){
		$( '.email-compose' ).addClass( 'hide' );
		$( '.email-preview, .email-lists' ).removeClass( 'hide' );

		alert( 'Send email and dont forget to make a notification!' );

		return false;
	});


	// reply email
	// email form demo with summernote
	// or you can use your favorite editor
	// emailID can be replace with database ID
	$( document ).on( 'click', '.ep-form:not(.mode-edit)', function(){
		$(this).addClass( 'mode-edit' );
		$( '#panel-ep-form-emailID .ep-form-heading, #panel-ep-form-emailID .panel-footer' ).removeClass( 'hide' );
		$( '#panel-ep-form-emailID .ep-form-placeholder' ).addClass( 'hide' );

		$('#reply-to-emailID').show().summernote({
			focus: true,
			height: 200,
			toolbar: [
				['style', ['style']],
				['font', ['bold', 'italic', 'underline', 'clear']],
				['fontname', ['fontname']],
				['fontsize', ['fontsize']], // Still buggy
				['color', ['color']],
				['para', ['ul', 'ol', 'paragraph']],
				['insert', ['link', 'picture', 'video']]
			]
		});
	})
	.on( 'click', '#destroy-ep-form-emailID', function(e){
		e.preventDefault();

		$('#reply-to-emailID').destroy().hide();

		$( '.ep-form' ).removeClass( 'mode-edit' );
		$( '#panel-ep-form-emailID .ep-form-heading, #panel-ep-form-emailID .panel-footer' ).addClass( 'hide' );
		$( '#panel-ep-form-emailID .ep-form-placeholder' ).removeClass( 'hide' );
	})
	.on( 'click', '#showReplyCC', function(e){
		e.preventDefault();
		$( '#ccReplyGroup' ).removeClass( 'hide' );
	})
	.on( 'click', '#showReplyBCC', function(e){
		e.preventDefault();
		$( '#bccReplyGroup' ).removeClass( 'hide' );
	})
	.on( 'click', '#hideReplyCC', function(e){
		e.preventDefault();
		$( '#ccReplyGroup' ).addClass( 'hide' );
	})
	.on( 'click', '#hideReplyBCC', function(e){
		e.preventDefault();
		$( '#bccReplyGroup' ).addClass( 'hide' );
	});
	
});