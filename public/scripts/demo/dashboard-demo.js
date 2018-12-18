$( function(){
	'use strict';

	// DASHBOARD RANGE (DATE RANGE PICKER)
	$('#dashboardRange').on('click', function(e){
		e.preventDefault();
	})
	.daterangepicker({
		applyClass: 'btn-primary',
		ranges: {
			'Today': [moment(), moment()],
			'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
			'Last 7 Days': [moment().subtract('days', 6), moment()],
			'Last 30 Days': [moment().subtract('days', 29), moment()],
			'This Month': [moment().startOf('month'), moment().endOf('month')],
			'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')]
		},
		startDate: moment().subtract('days', 29),
		endDate: moment()
	},
	function(start, end) {
		$('#dashboardRange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
	})
	.find('span').html(moment().format('MMMM D, YYYY') + ' - ' + moment().format('MMMM D, YYYY'));
	// END DASHBOARD RANGE
	


	// PIE CHART
	$('.easyPieChart').each(function(){
        var $this = $(this),
            barColor = $this.data('barcolor'),
            trackColor = $this.data('trackcolor'),
            scaleColor = $this.data('scalecolor'),
            lineWidth = $this.data('linewidth'),
            size = $this.data('size'),
            rotate = $this.data('rotate');

        // default for undefined
        barColor = (barColor === undefined) ? '#20638f' : barColor ;        // primary
        trackColor = (trackColor === undefined) ? '#ecf0f1' : trackColor ;  // gray-light
        scaleColor = (scaleColor === undefined) ? '#bdc3c7' : scaleColor ;  // gray-lighter
        lineWidth = (lineWidth === undefined) ? 3 : parseInt(lineWidth) ;
        size = (size === undefined) ? 110 : parseInt(size) ;
        rotate = (rotate === undefined) ? 0 : parseInt(rotate) ;

        trackColor = (trackColor === 'false' || trackColor === '') ? false : trackColor ;
        scaleColor = (scaleColor === 'false' || scaleColor === '') ? false : scaleColor ;

        // initilize easy pie chart
        $this.easyPieChart({
            barColor: barColor,
            trackColor: trackColor,
            scaleColor: scaleColor,
            lineWidth: lineWidth,
            size: size,
            rotate: rotate
        });
    });
	// END PIE CHART
	


	// MORRIS JS CHART
	$( '#chart-tabs > a' ).click( function(e){
		e.preventDefault();
		$( this ).tab( 'show' );
	});
	$( '#chart-tabs > a' ).on( 'shown.bs.tab', function () {
		var $this = $( this ),
			types = $this.attr( 'data-chart' ),
			typesArray = types.split( ',' );

	    $.each( typesArray, function (key, value) {
			eval( value + '.redraw()' );
	    });
	    
	    $this.parent().children('a').removeClass( 'active' );
	    $this.addClass( 'active' );
	});

	var chartBar = Morris.Bar({
		element: 'chart-visitor',
		data: [
			{day: 'Sun', visitors: 936},
			{day: 'Mon', visitors: 1137},
			{day: 'Tue', visitors: 1475},
			{day: 'Wed', visitors: 1680},
			{day: 'Thu', visitors: 1955},
			{day: 'Fri', visitors: 2724},
			{day: 'Sat', visitors: 3262}
		],
		xkey: 'day',
		ykeys: ['visitors'],
		labels: ['Visitors'],
		barRatio: 0.4,
		hideHover: 'auto',
		barColors: ['#107360'],
		gridTextColor: '#32475c',
		gridLineColor: '#c6d3e0',
		resize: true
	});
	var chartArea = Morris.Area({
		element: 'chart-order',
		parseTime: false,
		lineColors: [ '#20638F', '#55A5D9' ],
		fillOpacity: 0.8,
		lineWidth: 0,
		data: [
			{ y: 'Sun', a: 7, b: 4 },
			{ y: 'Mon', a: 6.5,  b: 4.5 },
			{ y: 'Tue', a: 10,  b: 7 },
			{ y: 'Wed', a: 7,  b: 4.5 },
			{ y: 'Thu', a: 12,  b: 6 },
			{ y: 'Fri', a: 8,  b: 4 },
			{ y: 'Sat', a: 7, b: 3 }
		],
		xkey: 'y',
		ykeys: ['a', 'b'],
		labels: ['Current Week', 'Last Week'],
		pointSize: 2,
		hideHover: true,
		resize: true
	});
	var chartArea2 = Morris.Line({
		element: 'chart-revenue',
		parseTime: false,
		lineColors: [ '#703688', '#E08E0B' ],
		lineWidth: 1,
		data: [
			{ y: 'Sun', a: 65, b: 55 },
		    { y: 'Mon', a: 75,  b: 65 },
		    { y: 'Tue', a: 50,  b: 40 },
		    { y: 'Wed', a: 75,  b: 65 },
		    { y: 'Thu', a: 50,  b: 40 },
		    { y: 'Fri', a: 75,  b: 65 },
		    { y: 'Sat', a: 90, b: 80 }
		],
		xkey: 'y',
		ykeys: ['a', 'b'],
		labels: ['Current Week', 'Last Week'],
		hideHover: true,
		resize: true
	});
	// END MORRIS JS CHART
	




	// TODO SETUP
	// sortable
	$( '#todo-lists' ).sortable({
		items: '.kit-todo',
		placeholder: 'kit-todo-placeholder ui-state-highlight',
		revert: 'invalid',
		opacity: 0.8,
		cancel: '.kit-todo-actions, .kit-todo-hover, .label, a , button'
	});
    $( '#todo-lists' ).disableSelection();
    // todo datetimepicker
    $( '#todoDate' ).datetimepicker({
		dateFormat: 'M dd,',
		timeFormat: 'hh:mm tt'
    });

    // todo datetimepicker btn
    $( document ).on( 'click', '#todoDateBtn', function(e){
		e.preventDefault();
		$( '#todoDate' ).toggleClass( 'hide' );
    })

    // select todo
    .on( 'change', '#selectAllTodo', function(){
		var checked = $(this).is(':checked'),
			$checkboxs = $( '.kit-todo' ).find( 'input[type="checkbox"]' ).not(':disabled');

		$checkboxs.prop( 'checked', checked );
    })
    .on( 'change', '.kit-todo input[type="checkbox"]', function(){
		var checked = $(this).is(':checked');

		if(! checked ){
			$( '#selectAllTodo' ).prop( 'checked', false );
		}
    })

    // add Todo
    .on( 'submit', '#addTodo', function(){
		var todoText = $( '#todoText' ).val(),
			todoDate = $( '#todoDate' ).val(),
			todoID = $('#todo-lists .kit-todo').length + 1,
			template = '<div class="kit-todo">'+
                '    <div class="kit-todo-actions pull-right">'+
                '        <a data-toggle="todo-remove" rel="tooltip" title="remove" data-container="body" href="#"><i class="fa fa-times"></i></a>'+
                '    </div>'+
                '    <div class="kit-todo-hover pull-right">'+
                '        <span class="label label-info"><i class="fa fa-clock-o fa-fw"></i> '+ todoDate +'</span>'+
                '        <a data-toggle="todo-complete" rel="tooltip" title="toggle complete" data-container="body" href="#"><i class="fa fa-check"></i></a>'+
                '    </div>'+
                '    <div class="nice-checkbox nice-checkbox-inline">'+
                '        <input type="checkbox" id="'+ todoID +'">'+
                '        <label for="'+ todoID +'">'+ todoText +'</label>'+
                '    </div>'+
                '</div>';

        if ( $.trim(todoText) === '' || $.trim(todoDate) === '' ) {
			bootbox.alert( 'All field is required!' );
        } else{
			$( '#todo-lists .scroll-wrapper' ).prepend( template );
			$('#todo-lists .kit-todo:first-child').find('[rel="tooltip"]').tooltip();
			toastr.info( 'Successfully create a new todo' );
        }

        $( '#todoDate' ).addClass( 'hide' );
        $( '#todoText' ).val('');
        $( '#todoDate' ).val('');

		return false;
    })
    
    // toggle complete todo
    .on( 'click', '[data-toggle="todo-complete"]', function(e){
		e.preventDefault();

		var $todo = $(this).closest( '.kit-todo' ),
			$label = $todo.find( '.label' ),
			$checkbox = $todo.find( 'input[type="checkbox"]' );

		$todo.toggleClass( 'disabled' );
		$label.toggleClass( 'hide' );
		$checkbox.prop( 'disabled', $todo.hasClass( 'disabled' ) );
    })

    // remove all todo
    .on( 'click', '#removeAllTodo', function(e){
		e.preventDefault();

		var $todos = $( '.kit-todo input[type="checkbox"]:checked' ).closest( '.kit-todo' );

		if ( $todos.length > 0 ) {
			bootbox.confirm( 'Are you sure want to remove todos?', function( result ) {
				if ( result ) {
					$todos.remove();
					toastr.info( 'Successfully delete '+ $todos.length +' todos' );
					$( '#selectAllTodo' ).prop( 'checked', false );
				}
			});
		} else{
			bootbox.alert( 'Please select todo to delete!' );
		}
    })
    
    // remove todo
    .on( 'click', '[data-toggle="todo-remove"]', function(e){
		e.preventDefault();

		var $todo = $(this).closest( '.kit-todo' );

		bootbox.confirm( 'Are you sure want to remove this todo?', function( result ) {
			if ( result ) {
				$todo.remove();
				toastr.info( 'Successfully delete a todo' );
			}
		});

    });
	// END TODO SETUP
});