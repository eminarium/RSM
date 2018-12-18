$( function(){
	'use strict';

	// remove exist tooltip error on tabs change
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		var target = $(e.target).attr( 'href' ); // activated tab

		if ( target === '#signin' ) {
			$( '#signup .form-control-feedback' ).tooltip( 'destroy' );
		}
	});

	// backgrounds slideshow
	$.vegas.defaults.background.fade = 3000;
	$.vegas('slideshow', {
		delay: 15000,
		loading: false,
		backgrounds: [
			{
				src: 'images/dummy/trianglify1.svg'
			}, {
				src: 'images/dummy/trianglify2.svg'
			}, {
				src: 'images/dummy/trianglify3.svg'
			}, {
				src: 'images/dummy/trianglify4.svg'
			}, {
				src: 'images/dummy/trianglify5.svg'
			}, {
				src: 'images/dummy/trianglify6.svg'
			},

		],
	})('overlay', {
		src:'images/vegas/overlays/02.png',
		opacity: 0.001
	});

	// typeahead
	// Typeahead Prefetches
    var countries = new Bloodhound({
		datumTokenizer: Bloodhound.tokenizers.obj.whitespace('name'),
		queryTokenizer: Bloodhound.tokenizers.whitespace,
		limit: 10,
		prefetch: {
			url: '_sample-data/countries.json',
			filter: function(list) {
				return $.map(list, function(country) { return { name: country }; });
			}
		}
	});

	// kicks off the loading/processing of `local` and `prefetch`
	countries.initialize();

	// passing in `null` for the `options` arguments will result in the default
	// options being used
	$('#country').typeahead(null, {
		name: 'countries',
		displayKey: 'name',
		// `ttAdapter` wraps the suggestion engine in an adapter that
		// is compatible with the typeahead jQuery plugin
		source: countries.ttAdapter()
	});


	// form validate
	// signin
	$( '#signinForm' ).validate({
		rules: {
			username:{
				required: true
			},
			passwd:{
				required: true
			}
		},
		messages: {
			username: {
				required: 'Please enter your username!'
			},
			passwd: {
				required: 'Please enter your password!'
			}
		},
		errorElement: 'small',
		errorClass: 'help-block',
		errorPlacement: function(error, element) {
			var $formGroup = element.closest( '.form-group' );
			error.appendTo( $formGroup );
		},
		highlight: function(element, errorClass, validClass){
			var $formGroup = $(element).closest( '.form-group' );

			$formGroup.addClass( 'has-error' );
		},
		unhighlight: function(element, errorClass, validClass){
			var $formGroup = $(element).closest( '.form-group' );

			$formGroup.removeClass( 'has-error' );
		},
		submitHandler: function() {
			var btnText = $( '#btnSignin' ).html();
			$( '#btnSignin' ).html( '<i class="fa fa-spin fa-spinner"></i> Loading...' );

			setTimeout( function(){
				$( '#btnSignin' ).html( btnText ); // reset to default text
				window.location.href = 'index.html';
			}, 3000);
		}
	});

	// recover
	$( '#recoverForm' ).validate({
		rules: {
			recoverEmail:{
				required: true,
				email: true
			}
		},
		messages: {
			recoverEmail: {
				required: 'Please enter your email address!'
			}
		},
		errorClass: 'help-block',
		errorPlacement: function(error, element) {
			var $formGroup = element.closest( '.form-group' );
			error.appendTo( $formGroup );
		},
		highlight: function(element, errorClass, validClass){
			var $formGroup = $(element).closest( '.form-group' );

			$formGroup.addClass( 'has-error' )
				.removeClass( 'has-success' );
		},
		unhighlight: function(element, errorClass, validClass){
			var $formGroup = $(element).closest( '.form-group' );

			$formGroup.removeClass( 'has-error' )
				.addClass( 'has-success' );
		}
	});
	
	// signup
	$( '#signupForm' ).validate({
		rules: {
			fullName:{
				required: true,
				minlength: 4
			},
			email:{
				required: true,
				email: true
			},
			address:{
				required: true,
				minlength: 4
			},
			city:{
				required: true
			},
			country:{
				required: true
			},
			gender:{
				required: true
			},
			usrName:{
				required: true,
				minlength: 4
			},
			password:{
				required: true,
				minlength: 6
			},
			cpassword:{
				required: true,
				minlength: 6,
				equalTo: '#password'
			}
		},
		showErrors: function(errorMap, errorList) {
			var $form = $( this.currentForm ),
				errors = this.numberOfInvalids();

			if( errors ){
				// disable submit button
				$form.find('[type="submit"]').attr('disabled', true);
			} else{
				// enable submit button
				$form.find('[type="submit"]').attr('disabled', false);
			}
			
			// Clean up any tooltips for valid elements
			$.each( this.validElements(), function ( i, elem ) {
				var $elem = $( elem ),
					$formGroup = $elem.closest( '.form-group' ),
					$targetTip = $formGroup.find( '.form-control-feedback' );	// targeting the tooltip on addon input

				// remove error state
				$formGroup.removeClass( 'has-error' )
					.addClass( 'has-success' );
				$formGroup.find( '.form-control-feedback' )
					.attr( 'class', 'fa fa-check form-control-feedback' );

				// remove tooltip
				$targetTip.tooltip( 'destroy' );
			});

			// Create new tooltips for invalid elements
			$.each(errorList, function( i, error ){
				var $elem = $( error.element ),
					$formGroup = $elem.closest( '.form-group' ),
					$targetTip = $formGroup.find( '.form-control-feedback' ),	// targeting the tooltip on addon input
					data = {};

				// adding error state
				$formGroup.removeClass( 'has-success' )
				.addClass( 'has-error' );
				$formGroup.find( '.form-control-feedback' )
					.attr( 'class', 'fa fa-times form-control-feedback' );

				// tooltip options
				data.template = '<div class="tooltip tooltip-danger"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>';
				data.placement = 'top';
				data.container = 'body';
				data.title = error.message;
				data.trigger = 'focus';		// use focus, so tooltip still available until element is valid

				// destroy existing tooltip
				$targetTip.tooltip( 'destroy' );

				// create a new tooltip
				$targetTip.tooltip( data )
					.tooltip( 'show' );
			});
		}
	});
});