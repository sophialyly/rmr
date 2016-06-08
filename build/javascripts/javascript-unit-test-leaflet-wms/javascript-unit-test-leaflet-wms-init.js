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
            fn.LeafLet();
        },

        // Leaflet
        LeafLet: function () {
    console.log('LeafLet');

    L.Icon.Default.imagePath = '../../../../bower_components/leaflet/images/'


    // Using multiple tile layers on your map
    var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>', 
    	thunLink = '<a href="http://thunderforest.com/">Thunderforest</a>';
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		osmAttrib = '&copy; ' + osmLink + ' Contributors',
		landUrl = 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', 
		thunAttrib = '&copy; '+osmLink+' Contributors & '+thunLink;

	var osmMap = L.tileLayer(osmUrl, {attribution: osmAttrib, minZoom: 0, maxZoom: 18}),
		landMap = L.tileLayer(landUrl, {attribution: thunAttrib, minZoom: 0, maxZoom: 16});



    var googleRoadmapLayer = new L.Google('ROADMAP', {attribution: 'การประปานครหลวง', minZoom: 0, maxZoom: 20});
    // map.addLayer(googleRoadmapLayer);

    var googleSatelliteLayer = new L.Google('SATELLITE', {attribution: 'การประปานครหลวง', minZoom: 0, maxZoom: 20});
    // map.addLayer(googleSatelliteLayer);

    var googleHybridLayer = new L.Google('HYBRID', {attribution: 'การประปานครหลวง', minZoom: 0, maxZoom: 20});
    // map.addLayer(googleHybridLayer);


	map = L.map('map', {
							layers: [googleRoadmapLayer] // only add one! 
						})
			.setView([13.708189, 100.599608], 14);


    // map = L.map('map', {
    //                         layers: [googleRoadmapLayer] // only add one! 
    //                     })
    //         .setView([55.67, 12.60], 11);







    var baseMaps = {
    	"ROADMAP": googleRoadmapLayer,
    	"SATELLITE" : googleSatelliteLayer,
    	"HYBRID" : googleHybridLayer,
    	"OSM Mapnik": osmMap,
        "Landscape": landMap
    };




	var rtu = L.marker([13.708189, 100.599608], {draggable: true}) 
			  // .addTo(map)
              .bindPopup("<b>MWA</b><br>I’m here!")
              .openPopup();

        rtu.on('dragend',function(ev){
        	var chagedPos = ev.target.getLatLng();
        	console.log("dragend" + chagedPos);

        	
        	var coord=ev.target.getLatLng().toString().split(',');
        	var lat=coord[0].split('(');
        	var long=coord[1].split(')');
        	console.log("you clicked the map at LAT: "+ lat[1]+" and LONG:"+long[0])
        });

        rtu.on('click', function(ev) {
        	var chagedPos = ev.target.getLatLng();
        	console.log("click" + chagedPos);
        });


    var rtus = L.layerGroup([rtu]);



	var planesArr = [];
	var planes = [ ["7C6B07", 13.708310, 100.599614],
	                ["7C6B38", 13.708349, 100.599464],
	                ["7C6CA1", 13.708698, 100.598831],
	                ["7C6CA2", 13.709435, 100.598874],
	                ["C81D9D", 13.710139, 100.599475]
	             ];

	var tmpMarker;
	for (var i = 0; i < planes.length; i++) {
			tmpMarker = new L.marker([planes[i][1],planes[i][2]])
	                      .bindPopup(planes[i][0])
	                      // .addTo(map);
	        planesArr.push(tmpMarker)
	}

	var planes_group = L.layerGroup(planesArr);

    map.addLayer(planes_group);
    // map.addLayer(rtus);



var mywms = L.tileLayer.wms("http://wfs-kbhkort.kk.dk/k101/wms", {
    layers: 'k101:theme-startkort',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    attribution: "myattribution"
});
// mywms.addTo(map);

// map.addLayer(mywms);

var mwaWMS = L.tileLayer.wms("http://gismapservice.mwa.co.th/arcgis/services/wmsservice/MapServer/WMSServer", {
    layers: '47,48',
    format: 'image/png',
    transparent: true
});

var mwaWMS_47 = L.tileLayer.wms("http://gismapservice.mwa.co.th/arcgis/services/wmsservice/MapServer/WMSServer", {
    layers: '47',
    format: 'image/png',
    transparent: true
});

var mwaWMS_48 = L.tileLayer.wms("http://gismapservice.mwa.co.th/arcgis/services/wmsservice/MapServer/WMSServer", {
    layers: '48',
    format: 'image/png',
    transparent: true
});


var tileMWA = L.tileLayer.wms('http://gisonline.mwa.co.th:2558/arcgis/rest/services/mobileCache/mobileCache/MapServer/WMTS', {
    format: 'img/png',
    transparent: true,
    layers: 0
});

var tileMWA = L.tileLayer.wms('http://gisonline.mwa.co.th:2558/arcgis/rest/services/mobileCache/mobileCache/MapServer/WMTS', {
    layers: 'mobileCache_mobileCache'
}).addTo(map);




    var overlayMaps = {
    	"RTU": rtus,
    	"Plane": planes_group,
        "wms": mywms,
        "ท่อประธาน": mwaWMS_47,
        "ท่อจ่าย": mwaWMS_48,
        "tileMWA": tileMWA
    };

    L.control.layers(baseMaps, overlayMaps).addTo(map);



    var zoomLev;
    map.on("zoomend", function(){
    	zoomLev = map.getZoom();
    	console.log(zoomLev);
    	if (zoomLev < 14){
    		// map.removeLayer(lariac);
    		// $('#zoom').val(zoomLev);
    	} else{
    		// $('#zoom').val(zoomLev);
    		// map.addLayer(lariac);
    	}
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
