$( function(){
	'use strict';

	// FULL CALENDAR DEMO
    var date = new Date(),
		d = date.getDate(),
		m = date.getMonth(),
		y = date.getFullYear(),
		$calendar = $( '#calendar' ),
		availEventClass = [ 'bg-silc', 'bg-ascon', 'bg-greentur', 'bg-nephem', 'bg-belpet', 'bg-wistam', 'bg-osun', 'bg-pumcar', 'bg-pomeal', 'bg-inverse' ];
	

    /* initialize the calendar
    -----------------------------------------------------------------*/
    var calendar = $calendar.fullCalendar({
        header: false,
        selectable: true,
        selectHelper: true,
        select: function(start, end, allDay) {
            var title = prompt('Event Title:');
            if (title) {
                calendar.fullCalendar('renderEvent',
                    {
                        title: title,
                        start: start,
                        end: end,
                        allDay: allDay,
                        eventClass: availEventClass[ $.randomNumber(0, 9) ]
                    },
                    true // make the event "stick"
                );
            }
            calendar.fullCalendar('unselect');
        },
        editable: true,
        events: [
            {
                title: 'All Day Event',
                start: new Date(y, m, 1),
                eventClass: 'bg-wistam'
            },
            {
                title: 'Long Event',
                start: new Date(y, m, d-5),
                end: new Date(y, m, d-2),
                eventClass: 'bg-inverse'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d-3, 16, 0),
                allDay: false,
                eventClass: 'bg-greentur'
            },
            {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d+4, 16, 0),
                allDay: false,
                eventClass: 'bg-pumcar'
            },
            {
                title: 'Meeting',
                start: new Date(y, m, d, 10, 30),
                allDay: false,
                eventClass: 'bg-wistam'
            },
            {
                title: 'Lunch',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false,
                eventClass: 'bg-osun'
            },
            {
                title: 'Birthday Party',
                start: new Date(y, m, d+1, 19, 0),
                end: new Date(y, m, d+1, 22, 30),
                allDay: false
            },
            {
                title: 'Click for Google',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                url: 'http://google.com/',
                eventClass: 'bg-pomeal'
            }
        ],
        eventRender: function(event, element) {
			element.addClass( event.eventClass );
		},
        droppable: true, // this allows things to be dropped onto the calendar !!!
        drop: function(date, allDay) { // this function is called when something is dropped
        
            // retrieve the dropped element's stored Event Object
            var originalEventObject = $(this).data('eventObject');
            
            // we need to copy it, so that multiple events don't have a reference to the same object
            var copiedEventObject = $.extend({}, originalEventObject);
            
            // assign it the date that was reported
            copiedEventObject.start = date;
            copiedEventObject.allDay = allDay;
            
            // render the event on the calendar
            // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
            $calendar.fullCalendar('renderEvent', copiedEventObject, true);
            
            // is the "remove after drop" checkbox checked?
            if ($('#drop-remove').is(':checked')) {
                // if so, remove the element from the "Draggable Events" list
                $(this).remove();
            }
        }
    });

    // Calendar control
    $('#calendar-viewtitle').text($calendar.fullCalendar('getView').title);
    
    $(document).on('click', '#calendar-viewmonth', function(){
        $calendar.fullCalendar( 'changeView', 'month' );

        $(this).parent().find('.btn').removeClass('active');
        $(this).addClass('active');
    })
    .on('click', '#calendar-viewweek', function(){
        $calendar.fullCalendar( 'changeView', 'agendaWeek' );

        if (! $.isMobile() ) {
            $calendar.find('.fc-agenda > div').children('div:last-child').niceScroll({
                cursorcolor: '#DCE4EC',
                background: '#F1F4F7',
                cursorwidth: '8px',
                cursorborder: '0 solid transparent',
                cursorborderradius: '0px'
            });
        }

        $(this).parent().find('.btn').removeClass('active');
        $(this).addClass('active');
    })
    .on('click', '#calendar-viewday', function(){
        $calendar.fullCalendar( 'changeView', 'agendaDay' );
        if (! $.isMobile() ) {
            $calendar.find('.fc-agenda > div').children('div:last-child').niceScroll({
                cursorcolor: '#DCE4EC',
                background: '#F1F4F7',
                cursorwidth: '8px',
                cursorborder: '0 solid transparent',
                cursorborderradius: '0px'
            });
        }

        $(this).parent().find('.btn').removeClass('active');
        $(this).addClass('active');
    })
    .on('click', '#calendar-viewtoday', function(){
        $calendar.fullCalendar( 'today' );
    })
    .on('click', '#calendar-viewnext', function(e){
        e.preventDefault();
        $calendar.fullCalendar('next');
    })
    .on('click', '#calendar-viewnextYear', function(e){
        e.preventDefault();
        $calendar.fullCalendar('nextYear');
    })
    .on('click', '#calendar-viewprev', function(e){
        e.preventDefault();
        $calendar.fullCalendar('prev');
    })
    .on('click', '#calendar-viewprevYear', function(e){
        e.preventDefault();
        $calendar.fullCalendar('prevYear');
    })
    .on('click', '#calendar-viewtoday, #calendar-viewmonth, #calendar-viewweek, #calendar-viewday, #calendar-viewnext, #calendar-viewprev, #calendar-viewnextYear, #calendar-viewprevYear', function(){
        var view = $calendar.fullCalendar('getView'),
            title = view.title;

        title = title.replace('&#8212;', 'to');
        $('#calendar-viewtitle').text(title);
    });

    /* initialize the external events
    -----------------------------------------------------------------*/
    $('#external-events div.external-event').each(function() {
    
        // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
        // it doesn't need to have a start or end
        var eventObject = {
            title: $.trim($(this).text()),		// use the element's text as the event title
            eventClass: $(this).data('color')	// use the element's data class to rendering color
        };
        
        // store the Event Object in the DOM element so we can get to it later
        $(this).data('eventObject', eventObject);
        
        // make the event draggable using jQuery UI
        $(this).draggable({
            zIndex: 1070,
            cursor: 'move',
            revert: true,
            revertDuration: 0,
            containment: '.content-wrapper'
        });
        
    });



    // addEvent Action
    $( '#addEvent' ).on( 'submit', function(){
		var title = $( '#eventTitle' ).val(),
			eventClass = availEventClass[$.randomNumber( 0, 9 )];

		title = $.trim( title );

		if ( title !== '' ) {
			var newEvent = '<div class="list-group-item external-event ' + eventClass + '" data-color="' + eventClass + '">' + title + '</div>';
			$( '#external-events' ).append( newEvent )
			.children( '.external-event' ).last()
			// store the Event Object in the DOM element so we can get to it later
			.data('eventObject', {
				title: title,			// use the element's text as the event title
				eventClass: eventClass	// use the element's data class to rendering color
			})
			// make new event draggable
			.draggable({
	            zIndex: 1070,
	            cursor: 'move',
	            revert: true,
	            revertDuration: 0,
                containment: '.content-wrapper'
	        });
		}

		$( '#eventTitle' ).val('');

		var needUpdateSidebar = ( $( '#external-events > .external-event' ).length > 24) ? true : false;

		if ( needUpdateSidebar ) {
			$( '.sidebar' ).wrapkitSidebar( 'updateHeight' );
		}

		return false;
    });
    // END FULL CALENDAR DEMO
});