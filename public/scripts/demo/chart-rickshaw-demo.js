$( function(){
	'use strict';
	// Lines
	// set up our data series with 50 random data points
	var linesData = [ [], [] ],
		linesRandom = new Rickshaw.Fixtures.RandomData(12 * 60 * 60),
		$linesContainer = $( '#linesChart' ).parent();	// for responsive render

	for (var i = 0; i < 500; i++) {
		linesRandom.addData(linesData);
	}

	// instantiate our graph!
	var linesGraph = new Rickshaw.Graph({
		element: document.getElementById( 'linesChart' ),
		width: $linesContainer.width(),
		height: 300,
		renderer: 'line',
		series: [
			{
				color: '#2472a4',
				data: linesData[0],
				name: 'New York'
			}, {
				color: '#55a5d9',
				data: linesData[1],
				name: 'London'
			}
		]
	});

	var linesHoverDetail = new Rickshaw.Graph.HoverDetail({
			graph: linesGraph
		}),
		linesLegend = new Rickshaw.Graph.Legend( {
			graph: linesGraph,
			element: document.getElementById('linesLegend')

		}),
		linesShelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
			graph: linesGraph,
			legend: linesLegend
		}),
		linesAxes = new Rickshaw.Graph.Axis.Time( {
			graph: linesGraph
		});

	linesAxes.render();
	// render
	linesGraph.render();
	// responsive 
	$.rickshawResize( linesGraph, $linesContainer );




	// Bars
	// set up our data series with 50 random data points
	var barsData = [ [], [] ],
		barsRandom = new Rickshaw.Fixtures.RandomData(12 * 60 * 15),
		$barsContainer = $( '#barsChart' ).parent();	// for responsive render

	for ( i = 0; i < 365; i++) {
		barsRandom.addData(barsData);
	}

	// instantiate our graph!
	var barsGraph = new Rickshaw.Graph({
		element: document.getElementById( 'barsChart' ),
		width: $barsContainer.width(),
		height: 300,
		renderer: 'bar',
		series: [
			{
				color: '#138a72',
				data: barsData[0],
				name: 'New York'
			}, {
				color: '#87999a',
				data: barsData[1],
				name: 'London'
			}
		]
	});

	var BarsHoverDetail = Rickshaw.Class.create(Rickshaw.Graph.HoverDetail, {
			render: function(args) {

				barsLegend.innerHTML = args.formattedXValue;

				args.detail.sort(function(a, b) { return a.order - b.order; }).forEach( function(d) {

					var line = document.createElement('div');
					line.className = 'legend-line';

					var swatch = document.createElement('div');
					swatch.className = 'legend-swatch';
					swatch.style.backgroundColor = d.series.color;

					var label = document.createElement('div');
					label.className = 'legend-label';
					label.innerHTML = d.name + ': ' + d.formattedYValue;

					line.appendChild(swatch);
					line.appendChild(label);

					barsLegend.appendChild(line);

					var dot = document.createElement('div');
					dot.className = 'dot';
					dot.style.top = barsGraph.y(d.value.y0 + d.value.y) + 'px';
					dot.style.borderColor = d.series.color;

					this.element.appendChild(dot);

					dot.className = 'dot active';

					this.show();

				}, this );
		    }
		}),
		barsLegend = document.getElementById('barsLegend'),
		// barsShelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
		// 	graph: barsGraph,
		// 	legend: barsLegend
		// }),
		barsAxes = new Rickshaw.Graph.Axis.Time( {
			graph: barsGraph
		});

	barsAxes.render();
	// custom legend
	var hover = new BarsHoverDetail( { graph: barsGraph } );
	// render
	barsGraph.render();
	// responsive 
	$.rickshawResize( barsGraph, $barsContainer );

	// change renderer mode
	$( 'input[name="changeRenderer"]' ).on( 'change', function(){
		var mode = $(this).val();

		barsGraph.setRenderer( mode );
		barsGraph.offset = 'zero';
		// re-render
		barsGraph.render();
	});




	// Multi chart
	// set up our data series with 50 random data points
	var multiData = [ [], [], [], [], [] ],
		multiRandom = new Rickshaw.Fixtures.RandomData(50),
		$multiContainer = $( '#multiChart' ).parent();

	for ( i = 0; i < 75; i++) {
		multiRandom.addData(multiData);
	}

	var multiPalette = new Rickshaw.Color.Palette( { scheme: 'spectrum14' } );

	var multiGraph = new Rickshaw.Graph( {
		element: document.getElementById( 'multiChart' ),
		renderer: 'multi',
		width: $multiContainer.width(),
		height: 250,
		dotSize: 5,
		series: [
			{
				name: 'temperature',
				data: multiData.shift(),
				color: multiPalette.color(),
				renderer: 'stack'
			}, {
				name: 'heat index',
				data: multiData.shift(),
				color: multiPalette.color(),
				renderer: 'stack'
			}, {
				name: 'dewpoint',
				data: multiData.shift(),
				color: multiPalette.color(),
				renderer: 'scatterplot'
			}, {
				name: 'pop',
				data: multiData.shift().map(function(d) { return { x: d.x, y: d.y / 4 }; }),
				color: multiPalette.color(),
				renderer: 'bar'
			}, {
				name: 'humidity',
				data: multiData.shift().map(function(d) { return { x: d.x, y: d.y * 1.5 }; }),
				renderer: 'line',
				color: multiPalette.color(),
			}
		]
	});

	var multiSlider = new Rickshaw.Graph.RangeSlider.Preview({
			graph: multiGraph,
			element: document.querySelector('#multiSlider')
		}),
		multiDetail = new Rickshaw.Graph.HoverDetail({
			graph: multiGraph,
			formatter: function(series, x, y) {
				var date = '<span class="date">' + new Date(x * 1000).toUTCString() + '</span>';
				var swatch = '<span class="legend-swatch pull-right" style="background-color: ' + series.color + '"></span>';
				var content = swatch + series.name + ': ' + parseInt(y) + '<br>' + date;
				return content;
			}
		}),
		multiLegend = new Rickshaw.Graph.Legend({
			graph: multiGraph,
			element: document.querySelector('#multiLegend')
		}),
		multiHighlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
		    graph: multiGraph,
		    legend: multiLegend,
		    disabledColor: function() { return 'rgba(0, 0, 0, 0.2)'; }
		}),
		multiHighlighterToggle = new Rickshaw.Graph.Behavior.Series.Toggle({
		    graph: multiGraph,
		    legend: multiLegend
		});

	// render
	multiGraph.render();
	// responsive 
	$.rickshawResize( multiGraph, $multiContainer );
	// hide detail x_label by adding: (refer to demo.css)
	// #multiChart .detail .x_label{ display: none }



	// Realtime
	// set up our data series with 150 random data points
	var realtimeData = [ [], [], [], [], [], [], [], [], [] ],
		realtimeRandom = new Rickshaw.Fixtures.RandomData(150),
		$realtimeContainer = $( '#realtimeChart' ).parent();

	for ( i = 0; i < 150; i++) {
		realtimeRandom.addData(realtimeData);
	}

	var realtimePalette = new Rickshaw.Color.Palette( { scheme: 'spectrum2001' } );

	// instantiate our graph!
	var realtimeGraph = new Rickshaw.Graph( {
		element: document.getElementById( 'realtimeChart' ),
		width: $realtimeContainer.width(),
		height: 300,
		renderer: 'area',
		stroke: true,
		preserve: true,
		series: [
			{
				color: realtimePalette.color(),
				data: realtimeData[0],
				name: 'Moscow'
			}, {
				color: realtimePalette.color(),
				data: realtimeData[1],
				name: 'Shanghai'
			}, {
				color: realtimePalette.color(),
				data: realtimeData[2],
				name: 'Amsterdam'
			}, {
				color: realtimePalette.color(),
				data: realtimeData[3],
				name: 'Paris'
			}, {
				color: realtimePalette.color(),
				data: realtimeData[4],
				name: 'Tokyo'
			}, {
				color: realtimePalette.color(),
				data: realtimeData[5],
				name: 'London'
			}, {
				color: realtimePalette.color(),
				data: realtimeData[6],
				name: 'New York'
			}
		]
	});

	var realtimeHoverDetail = new Rickshaw.Graph.HoverDetail({
			graph: realtimeGraph,
			xFormatter: function(x) {
				return new Date(x * 1000).toString();
			}
		}),
		realtimeAnnotator = new Rickshaw.Graph.Annotate({
			graph: realtimeGraph,
			element: document.getElementById('realtimeTimeline')
		}),
		realtimeLegend = new Rickshaw.Graph.Legend({
			graph: realtimeGraph,
			element: document.getElementById('realtimeLegend')

		}),
		realtimeShelving = new Rickshaw.Graph.Behavior.Series.Toggle({
			graph: realtimeGraph,
			legend: realtimeLegend
		}),
		realtimeOrder = new Rickshaw.Graph.Behavior.Series.Order({
			graph: realtimeGraph,
			legend: realtimeLegend
		}),
		realtimeHighlighter = new Rickshaw.Graph.Behavior.Series.Highlight({
			graph: realtimeGraph,
			legend: realtimeLegend
		}),
		realtimeSmoother = new Rickshaw.Graph.Smoother({
			graph: realtimeGraph,
			element: document.querySelector('#realtimeSmoother')
		}),
		realtimeTicksTreatment = 'glow',
		realtimeXAxis = new Rickshaw.Graph.Axis.Time({
			graph: realtimeGraph,
			ticksTreatment: realtimeTicksTreatment,
			timeFixture: new Rickshaw.Fixtures.Time.Local()
		}),
		realtimeYAxis = new Rickshaw.Graph.Axis.Y({
			graph: realtimeGraph,
			tickFormat: Rickshaw.Fixtures.Number.formatKMBT,
			ticksTreatment: realtimeTicksTreatment
		});

	// axis render
	realtimeXAxis.render();
	realtimeYAxis.render();

	// add some data every so often
	var realtimeMessages = [
		'Changed home page welcome message',
		'Minified JS and CSS',
		'Changed button color from blue to green',
		'Refactored SQL query to use indexed columns',
		'Added additional logging for debugging',
		'Fixed typo',
		'Rewrite conditional logic for clarity',
		'Added documentation for new methods'
	];

	setInterval( function() {
		realtimeRandom.removeData(realtimeData);
		realtimeRandom.addData(realtimeData);
		realtimeGraph.update();
	}, 3000 );

	function addAnnotation(force) {
		if (realtimeMessages.length > 0 && (force || Math.random() >= 0.95)) {
			realtimeAnnotator.add(realtimeData[2][realtimeData[2].length-1].x, realtimeMessages.shift());
			realtimeAnnotator.update();
		}
	}

	addAnnotation(true);
	setTimeout( function() { setInterval( addAnnotation, 6000 ); }, 6000 );

	// render
	realtimeGraph.render();
	// responsive 
	$.rickshawResize( realtimeGraph, $realtimeContainer );
});