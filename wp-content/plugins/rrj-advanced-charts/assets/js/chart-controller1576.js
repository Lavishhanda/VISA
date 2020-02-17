;(function($){
	var charts = {};
	function maybeDrawChart( chartdata ) {
		if ( 'undefined' != typeof chartdata ) {
			
		} else {
			// IE9+
			var Y = window.pageYOffset + window.innerHeight;
			for ( var i in charts ) {
				var C = charts[i];
				if ( false === C.s ) {
					// chart not yet created
					if ( false === C.d ) {
						// delayed chart creation (custom JS chart data)
						continue;
					}
					
					if ( Y > C.e.offset().top + 20 ) {
						// initialize only if the chart container is about to enter the viewport
						
						if ( C.t ) {
							// tooltip format
							
							C.d.options.tooltips.callbacks = {};
							C.d.options.tooltipsFormat = C.t;
							if ( 'bubble' == C.d.type ) {
								C.d.options.tooltips.callbacks.label = function( item, data ){
									var format = data.datasets[0]._meta[Object.keys( data.datasets[0]._meta )[0]].controller.chart.options.tooltipsFormat[item.datasetIndex];
									
									/**
									 *  replace all placeholders
									 */
									format = format.replace( 
										/\{y\}/gi,
										data.datasets[item.datasetIndex]['data'][item.index]['y']
									).replace(
										/\{x\}/gi,
										data.datasets[item.datasetIndex]['data'][item.index]['x']
									).replace(
										/\{r\}/gi,
										data.datasets[item.datasetIndex]['data'][item.index]['r']
									);
									
									/**
									 *  split into array for new lines
									 */
									format = format.split( '{n}' );
									return format;
								}
							} else {
								C.d.options.tooltips.callbacks.label = function( item, data ){
									if ( 'string' != typeof item.yLabel && isNaN( item.yLabel ) ) {
										return '';
									} else {
										
										/**
										 *  replace all placeholders
										 */
										var format = data.datasets[0]._meta[Object.keys( data.datasets[0]._meta )[0]].controller.chart.options.tooltipsFormat[item.datasetIndex];
										return format.replace( /\{y\}/gi, item.yLabel ).replace( /\{x\}/gi, item.xLabel );
									}
								};
							}
						}
						if ( 'undefined' !== typeof rrjChartOptions ) {
							// merge custom options into the current chart options
							$.extend( true, C.d.options, rrjChartOptions[C.id] );
						}
						
						// remove the preloader image
						C.c.siblings( '.rrj-preload-wrap' ).css( 'display', 'none' );
						
						// then construct the chart
						new rrjChart( C.c, C.d );
						C.s = true;
					}
				}
			}
		}
	}
	
	$( window ).on( 'scroll', function(){maybeDrawChart()} );
	
	$( document ).on( 'rrjDelayedChart', function(ev, id, data){
		charts[id]['d'] = data;
		maybeDrawChart();
	} )
	
	// on DOM loaded
	$(function(){
		$( '.rrj-chart' ).each(function(){
			var $el = $( this );
			var dataString = $el.find( '.chart-data' ).html();
			var data = false;
			var tooltips = false;
			var hasTooltipsFormats = $el.find( '.tooltips-data' ).length;
			try {
				data = JSON.parse( dataString );
				if ( hasTooltipsFormats ) {
					tooltips = JSON.parse( $el.find( '.tooltips-data' ).html() );
				}
			} catch( ex ) {}
			if ( data ) {
				var id = $el.find( '.chart-data' ).attr( 'data-id' );
				var $canvas = $el.find( 'canvas' );
				if ( 'undefined' != typeof rrjChartData && 'function' == typeof rrjChartData[id] ) {
					data = rrjChartData[id].call({id:id,data:data,$canvas:$canvas},$);
				}
				charts[id] = {
					e: $el,
					d: data,
					c: $canvas,
					t: tooltips,
					s: false,
					id: id,
				};
			}
		});
		maybeDrawChart();
	})
	
})(window.jQuery)