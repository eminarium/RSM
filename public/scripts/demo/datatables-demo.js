$( function(){
	'use strict';

	// init datatables
	var datatables1 = $( '#datatables1' ).dataTable({
		'sDom': 'rt<"table-footer"<"pull-right"i>p>',
		'sPaginationType': 'bs_normal',
		'oLanguage': {
			'sInfoFiltered': '<span class="label label-info"><i class="fa fa-filter"></i> filtering from _MAX_ records</span>',
		},
		'sAjaxSource': '_sample-data/data-source.json',
		'fnInitComplete': function(oSettings, json) {
			var aoData = oSettings.aoData;

			// adding uniquen id to TR
			$.each( aoData, function(i, val){
				var $ntr = $( val.nTr );

				$ntr.attr( 'data-id', 'datatables1_' + i );
			});

			var $nTable = $(oSettings.nTable);
			$nTable.closest( '.dataTables_wrapper' ).find( '.dataTables_paginate' ).children( '.pagination' )
				.addClass( 'pagination-rounded' );
		}
	});

	// simple validate to form add and edit datatables1
	$('#formAddDatatables1').validate({
		errorElement: 'small',
		errorClass: 'help-block text-danger',
		errorPlacement: function(error, element) {
			var $errorPlacement = $(element).parent();

			if ( $(element).is( 'select' ) ) {
				$errorPlacement = $errorPlacement.parent();
			}
			error.appendTo( $errorPlacement );
		},
		highlight: function(element, errorClass, validClass){
			var $errorContainer = $(element).parent();

			if ( $(element).is( 'select' ) ) {
				$errorContainer.parent().addClass( 'has-error' );
			} else{
				$errorContainer.addClass( 'has-error' );
			}
		},
		unhighlight: function(element, errorClass, validClass){
			var $errorContainer = $(element).parent();

			if ( $(element).is( 'select' ) ) {
				$errorContainer.parent().removeClass( 'has-error' );
			} else{
				$errorContainer.removeClass( 'has-error' );
			}
		}
	});
	$('#formEditDatatables1').validate({
		errorElement: 'small',
		errorClass: 'help-block text-danger',
		errorPlacement: function(error, element) {
			var $errorPlacement = $(element).parent();

			if ( $(element).is( 'select' ) ) {
				$errorPlacement = $errorPlacement.parent();
			}
			error.appendTo( $errorPlacement );
		},
		highlight: function(element, errorClass, validClass){
			var $errorContainer = $(element).parent();

			if ( $(element).is( 'select' ) ) {
				$errorContainer.parent().addClass( 'has-error' );
			} else{
				$errorContainer.addClass( 'has-error' );
			}
		},
		unhighlight: function(element, errorClass, validClass){
			var $errorContainer = $(element).parent();

			if ( $(element).is( 'select' ) ) {
				$errorContainer.parent().removeClass( 'has-error' );
			} else{
				$errorContainer.removeClass( 'has-error' );
			}
		}
	});

	// custom filtering
    $( '#filterDatatables1' ).on( 'keyup', function(){
		var value = $( this ).val();

		datatables1.fnFilter( value );
    });
    // selectable datatables ( control with single or multiple select )
    $( document ).on( 'change', '#allowMultipleSelect', function(){
		// remove all selected row
		datatables1.$( 'tr.selected' ).removeClass( 'selected' );
		// disable actions edit & delete
		$( '.datatables1-actions' ).addClass( 'disabled' );
    })
    // selectable rule
    .on( 'click', '#datatables1 tbody tr', function(){
		var $tr = $( this ),
			allowMultipleSelect = $( '#allowMultipleSelect' ).is(':checked');
		
		if ( allowMultipleSelect ) {	// multiple select
			$tr.toggleClass( 'selected' );
		}
		else{	// single select
			if ( $tr.hasClass( 'selected' ) ) {
				$tr.removeClass( 'selected' );
	        }
	        else {
				datatables1.$( 'tr.selected' ).removeClass( 'selected' );
				$tr.addClass( 'selected' );
			}
		}

		// control the event buttons
		var selected = datatables1.$( 'tr.selected' ).length;

		if ( selected > 1 ) {
			$( '.datatables1-actions' ).addClass( 'disabled' );
			$( '#delete-datatables1' ).removeClass( 'disabled' );
		}
		else if( selected === 1 ){
			$( '.datatables1-actions' ).removeClass( 'disabled' );
		}
		else{
			$( '.datatables1-actions' ).addClass( 'disabled' );
			// hide form edit
			$( '#editFormContainer' ).addClass( 'hide' );
		}

		// control form edit
		// get data from selected row
		getDataSelected();
    });

    // delete rule
    $( document ).on( 'click', '#delete-datatables1', function(){
		var deletes = confirm( 'Are you sure want to delete(s) this data?' );

		if( deletes ){

			var dataSelected = datatables1.$( 'tr.selected' ),
				deleteCount = dataSelected.length;
			
			if ( deleteCount !== 0 ) {

				// process it one by one
				dataSelected.each( function( i, $elem ){

					// do server action here ( ajax )
					// ...
					
					// deleting selected data
					datatables1.fnDeleteRow( $elem );
				});
			}

			// disabled button
			$( '.datatables1-actions' ).addClass( 'disabled' );
        }
    })
    // add rule
    .on( 'click', '#add-datatables1, #hideAddDatatables1', function(e){
		e.preventDefault();
		$( '#addFormContainer' ).toggleClass( 'hide' );
		$( '#formAddDatatables1' )[0].reset();
    })
    .on( 'submit', '#formAddDatatables1', function(){

		var $this = $( this ),
			datas = $this.serializeArray(); // or use $this.serialize()

		// do server action to save change here ( ajax )
		// ...
		// just simple rule after ajax is done (demo)
		$.each( datas, function( i, data ){
			console.log( data.name + ' = ' + data.value );
		});

		// add new row to datatables using datatables plugin fnAddDataAndDisplay([ 1,2,3,... ]) ( see scripts/demo/datatables-plugins.js )
		// or you can just use fnAddData([ 1,2,3,... ]) - without any datatables plugin
		var addData = datatables1.fnAddDataAndDisplay([
				datas[0].value,
				datas[1].value,
				datas[2].value,
				datas[3].value,
				datas[4].value
			]),
			newRow = addData.nTr,
			newID = datatables1.fnGetData().length; // just sample id (on real case: get it from server callback)

		// adding data-id to new row
		// then make it selected and enable to delete or edit
		datatables1.$( 'tr.selected' ).removeClass( 'selected' );
		$( newRow ).attr( 'data-id', 'datatables1_' + newID )
			.addClass( 'selected' );
		// activate actions edit & delete
		$( '.datatables1-actions' ).removeClass( 'disabled' );
		// reset form
		$( '#formAddDatatables1' )[0].reset();

		return false;
    })
	// edit rule
    .on( 'click', '#edit-datatables1, #hideEditDatatables1', function(e){
		e.preventDefault();
		$( '#editFormContainer' ).toggleClass( 'hide' );
		// get data selecter row
		getDataSelected();
    })
    .on( 'submit', '#formEditDatatables1', function(){

		var $this = $( this ),
			datas = $this.serializeArray(); // or use $this.serialize()

		// do server action to save change here ( ajax )
		// ...
		// just simple rule after ajax is done to demo
		$.each( datas, function( i, data ){
			console.log( data.name + ' = ' + data.value );
		});

		// change data selected row datatables
		// get data from selected row
		var dataSelected = datatables1.$( 'tr.selected' ),
			node = getSelectedNode( datatables1 ),
			dataUpdate = [ datas[1].value, datas[2].value, datas[3].value, datas[4].value, datas[5].value ];

		dataSelected.data( 'id', datas[0].value );
		datatables1.fnUpdate( dataUpdate, node );

		// keep display on changed row
		datatables1.fnDisplayRow( node );

		// hide form edit
		$( '#editFormContainer' ).addClass( 'hide' );

		return false;
    });
	// simple fn to get a single node of selected row
	var getSelectedNode = function ( datatables ){
		var node,
			nodes = datatables.fnGetNodes();
		
		for ( var i=0 ; i < nodes.length ; i++ ){
			if ( $( nodes[i] ).hasClass( 'selected' ) )
			{
				node =  nodes[i];
			}
		}

		return node;
	},
	// get data from selected row
	getDataSelected = function(){
		var dataSelected = datatables1.$( 'tr.selected' ),
			datatables1ID = dataSelected.data( 'id' ),
			engineRender = dataSelected.children( 'td:eq(0)' ).text(),
			browser = dataSelected.children( 'td:eq(1)' ).text(),
			platform = dataSelected.children( 'td:eq(2)' ).text(),
			engineVersion = dataSelected.children( 'td:eq(3)' ).text(),
			cssGrade = dataSelected.children( 'td:eq(4)' ).text();

		// set data form edit
		$( '#datatables1ID' ).val( datatables1ID );
		$( '#editEngine' ).val( engineRender );
		$( '#editBrowser' ).val( browser );
		$( '#editPlatform' ).val( platform );
		$( '#editVersion' ).val( engineVersion );

		// set data on input select
		$( '#editGrade' ).val( cssGrade );
	};





	// Table Tools
	$( '#datatables2' ).dataTable({
		'sDom': '<"TTT_btn-group-wrapper tt-actions-demo"T><"row"<"col-sm-12"<"pull-right"f><"pull-left"l>r<"clearfix">>>t<"row"<"col-sm-12"<"pull-left"i><"pull-right"p><"clearfix">>>',
        'sPaginationType': 'bs_normal',
		'oLanguage': {
			'sInfoFiltered': '<span class="label label-info"><i class="fa fa-filter"></i> filtering from _MAX_ records</span>',
		},
        'sAjaxSource': '_sample-data/data-source.json',
		'oTableTools': {
            'aButtons': [
                'copy',
                'print',
                {
                    'sExtends':    'collection',
                    'sButtonText': 'Save as <i class="fa fa-angle-down"></i>',
                    'aButtons': [
                        'xls',
                        'csv',
                        'pdf'
                    ]
                }
            ],
            'sSwfPath': 'scripts/swf/copy_csv_xls_pdf.swf'
        },
		'fnInitComplete': function(oSettings, json) {
			var $wrapperTable = $(oSettings.nTable).closest( '.dataTables_wrapper' );
			$wrapperTable.find( '.dataTables_paginate' ).children( '.pagination' )
				.addClass( 'pagination-split' );

			// replace select
			$wrapperTable.find('.dataTables_length select').wrap( '<label class="select select-inline select-sm"></label>' );

			// place tableTools buttons to panel-actions
			$( '.tt-actions-demo' ).prependTo( '#tt-actions' );

			// update sidebar height
			$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
		}
	});
	
	$( '#panel-datatableTools' ).on( 'wrapkit.panel.refresh', function(e, args){

		var $this = $( this );
		if ( args ) {
			// just for demo (usually use on ajax done/success)
			setTimeout( function(){
				$this.wrapkitPanel( 'refresh', false );
			}, 3000 );
		}
	});



	

    // adding custom styles to all .datatables
	$('.datatables').each(function(){
		var datatables = $( this );
		// SEARCH - Add the placeholder for Search and Turn this into in-line form control
		var searchInput = datatables.closest('.dataTables_wrapper').find('div[id$=_filter] input');
		searchInput.attr('placeholder', 'Search');
		searchInput.addClass('form-control input-sm');
		// LENGTH - Inline-Form control
		var lengthSel = datatables.closest('.dataTables_wrapper').find('div[id$=_length] select');
		lengthSel.addClass('form-control input-sm');
		// lengthSel.wrap( '<label class="select select-sm"></label>' );
		// Paginations
        var paginations = datatables.closest( '.dataTables_wrapper' ).find( '.dataTables_paginate' ).children( '.pagination' );

		paginations.addClass( 'pagination-sm' );
	}).on( 'draw.dt', function () {
	    // update sidebar height
		$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
	});

});