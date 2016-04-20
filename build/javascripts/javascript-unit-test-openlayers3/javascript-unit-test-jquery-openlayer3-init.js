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



    // map = new ol.Map({
    //   target: 'map',
    //   view: new ol.View({
    //     projection: 'EPSG:4326',
    //     center: [100.599608, 13.708189],
    //     zoom: 20,
    //     maxResolution: 0.703125
    //   }),
    //   layers: [
    //     new ol.layer.Tile({
    //       source: new ol.source.TileWMS({
    //         url: 'http://demo.opengeo.org/geoserver/wms',
    //         params: {LAYERS: 'nasa:bluemarble', VERSION: '1.1.1'}
    //       })
    //     })
    //   ]
    // });


    // map = new ol.Map({
    //   target: 'map',
    //   view: new ol.View({
    //     center: [-15000, 6700000],
    //     zoom: 5
    //   }),
    //   layers: [
    //   new ol.layer.Tile({
    //     source: new ol.source.OSM()
    //   })
    //   ],
    //   controls: ol.control.defaults().extend([
    //     new ol.control.FullScreen()
    //     ])
    // });


    // map = new ol.Map({
    //   target: 'map',
    //   layers: [
    //   new ol.layer.Tile({
    //     source: new ol.source.OSM()
    //   })
    //   ],
    //   // view: new ol.View({
    //   //   center: [0, 0],
    //   //   zoom: 20
    //   // })
    //   view: new ol.View({
    //     center: ol.proj.transform(
    //       [100.599608, 13.708189], 'EPSG:4326', 'EPSG:3857'),
    //     zoom: 20 
    //   })
    // });
    //
    // var long = 100.599608;
    // var lat = 13.708189;
    // map.getView().setCenter(ol.proj.transform([long, lat], 'EPSG:4326', 'EPSG:3857'));
    // map.getView().setZoom(20);




    // var layers = [
    //   new ol.layer.Tile({
    //     style: 'Road',
    //     source: new ol.source.MapQuest({layer: 'osm'})
    //   }),
    //   new ol.layer.Tile({
    //     style: 'Aerial',
    //     visible: false,
    //     source: new ol.source.MapQuest({layer: 'sat'})
    //   }),
    //   new ol.layer.Group({
    //     style: 'AerialWithLabels',
    //     visible: false,
    //     layers: [
    //     new ol.layer.Tile({
    //       source: new ol.source.MapQuest({layer: 'sat'})
    //     }),
    //     new ol.layer.Tile({
    //       source: new ol.source.MapQuest({layer: 'hyb'})
    //     })
    //     ]
    //   })
    // ];

    // map = new ol.Map({
    //   layers: layers,
    //   target: 'map',
    //   view: new ol.View({
    //     center: ol.proj.transform(
    //       [100.599618, 13.706741], 'EPSG:4326', 'EPSG:3857'),
    //     zoom: 20 
    //   })
    // });


    var exampleLoc = ol.proj.transform(
      [100.599618, 13.706741], 'EPSG:4326', 'EPSG:3857');

    map = new ol.Map({
      target: 'map',
      view: new ol.View({
        projection: 'EPSG:3857',
        zoom: 20,
        center: exampleLoc
      }),
      layers: [
      new ol.layer.Tile({source: new ol.source.MapQuest({layer: 'osm'})})
      ]
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
