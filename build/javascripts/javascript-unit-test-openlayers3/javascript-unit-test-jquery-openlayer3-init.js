(function ($) {
    "use strict";

    ///////////////////////////////////////////////////// Your
    // var venueAddress = "Grand Place, 1000, Brussels"; // Venue

    // Map Object
    var map = null;



    /////////////////////////////////////////////////// Adress

    var fn = {

        // Launch Functions
        Launch: function () {
            fn.Apps();
            fn.OpenLayers();
        },

        // Openlayers
        OpenLayers: function () {
    console.log('OpenLayers');

    // map = new ol.Map({
    // 	target: 'map',
    // 	layers: [
    // 	new ol.layer.Tile({
    // 		source: new ol.source.MapQuest({layer: 'sat'})
    // 	})
    // 	],
    // 	view: new ol.View({
    // 		center: ol.proj.fromLonLat([37.41, 8.82]),
    // 		zoom: 4
    // 	})
    // });

    map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.TileWMS({
            url: 'http://demo.opengeo.org/geoserver/wms',
            params: {LAYERS: 'nasa:bluemarble', VERSION: '1.1.1'}
          })
        })
      ],
      view: new ol.View({
        projection: 'EPSG:4326',
        center: [0, 0],
        zoom: 0,
        maxResolution: 0.703125
      })
    });

},
        // Apps
                Apps: function () {
        	console.log('Apps');

        }

    };

    $(document).ready(function () {
        fn.Launch();
    });

})(jQuery);
