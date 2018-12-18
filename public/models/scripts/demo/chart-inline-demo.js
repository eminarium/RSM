$( function(){
	'use strict';

	// easyPieChart
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
            rotate: rotate,
            onStep: function(from, to, currentValue) {
                $(this.el).find('span').text(currentValue.toFixed(0) +'%');
            }
        });
    });
	// update pie chart
    $(document).on('click', '#updatePieCharts', function(e) {
        e.preventDefault();
        $('.easyPieChart').each(function() {
            $(this).data('easyPieChart').update( $.randomNumber( 10, 100 ) );
        });
    });
	// end easyPieChart





	// SPARKLINE SETUP
    // Line charts taking their values from the tag
    $('.sparkline').sparkline();
    // Bar charts using inline values
    $('.sparkbar').sparkline('html', {type: 'bar'});
    // Composite line charts, the second using values supplied via javascript
    $('#compositeline').sparkline('html', { fillColor: false, changeRangeMin: 0, chartRangeMax: 10 });
    $('#compositeline').sparkline([4,1,5,7,9,9,8,7,6,6,4,7,8,4,3,2,2,5,6,7],
        { composite: true, fillColor: false, lineColor: '#d14233', changeRangeMin: 0, chartRangeMax: 10 });
    // Line charts with normal range marker
    $('#normalline').sparkline('html', { fillColor: false, normalRangeMin: -1, normalRangeMax: 8 });
    $('#normalExample').sparkline('html', { fillColor: false, normalRangeMin: 80, normalRangeMax: 95, normalRangeColor: '#229955' });
    // Bar + line composite charts
    $('#compositebar').sparkline('html', { type: 'bar', barColor: '#55a5d9' });
    $('#compositebar').sparkline([4,1,5,7,9,9,8,7,6,6,4,7,8,4,3,2,2,5,6,7], { composite: true, fillColor: false, lineColor: '#d14233' });
    // Discrete charts
    $('.discrete1').sparkline('html', { type: 'discrete', lineColor: '#1d5a83', xwidth: 18 });
    $('#discrete2').sparkline('html', { type: 'discrete', lineColor: '#1d5a83', thresholdColor: '#d14233', thresholdValue: 4 });
    // Customized line chart
    $('#linecustom').sparkline('html', {height: '1.5em', width: '8em', lineColor: '#d14233', fillColor: '#b97509', minSpotColor: false, maxSpotColor: false, spotColor: '#55a5d9', spotRadius: 3});
    // Tri-state charts using inline values
    $('.sparktristate').sparkline('html', {type: 'tristate'});
    $('.sparktristatecols').sparkline('html', {type: 'tristate', colorMap: {'-2': '#e08e0b', '2': '#229955'} });
    // Box plots
    $('.sparkboxplot').sparkline('html', { type: 'box'});
    $('.sparkboxplotraw').sparkline([ 1, 3, 5, 8, 10, 15, 18 ], {type:'box', raw: true, showOutliers:true, target: 6});
    // Bullet charts
    $('.sparkbullet').sparkline('html', { type: 'bullet' });

    // Pie charts
    $('.sparkpie').sparkline('html', { type: 'pie', height: '1.0em' });
    /**
    ** Draw the little mouse speed animated graph
    ** This just attaches a handler to the mousemove event to see
    ** (roughly) how far the mouse has moved
    ** and then updates the display a couple of times a second via
    ** setTimeout()
    **/
    var drawMouseSpeedDemo = function () {
        var mrefreshinterval = 500; // update display every 500ms
        var lastmousex=-1;
        var lastmousey=-1;
        var lastmousetime;
        var mousetravel = 0;
        var mpoints = [];
        var mpointsMax = 30;
        $('html').mousemove(function(e) {
            var mousex = e.pageX;
            var mousey = e.pageY;
            if (lastmousex > -1) {
                mousetravel += Math.max( Math.abs(mousex-lastmousex), Math.abs(mousey-lastmousey) );
            }
            lastmousex = mousex;
            lastmousey = mousey;
        });
        var mdraw = function() {
            var md = new Date();
            var timenow = md.getTime();
            if (lastmousetime && lastmousetime!==timenow) {
                var pps = Math.round(mousetravel / (timenow - lastmousetime) * 1000);
                mpoints.push(pps);
                if (mpoints.length > mpointsMax){
                    mpoints.splice(0,1);
                }
                mousetravel = 0;
                $('#mousespeed').sparkline(mpoints, { width: mpoints.length*2, tooltipSuffix: ' pixels per second' });
            }
            lastmousetime = timenow;
            setTimeout(mdraw, mrefreshinterval);
        };
        // We could use setInterval instead, but I prefer to do it this way
        setTimeout(mdraw, mrefreshinterval);
    };
    drawMouseSpeedDemo();
	// END SPARKLINE SETUP
});