(function ($) {
    "use strict";

    ///////////////////////////////////////////////////// Your
    // var venueAddress = "Grand Place, 1000, Brussels"; // Venue

    // Map Object
    var map = null;
    var layerControl = false;
    var myMarkers_group = false;



    /////////////////////////////////////////////////// Adress

    var fn = {

        // Launch Functions
        Launch: function () {
            fn.Apps();
            fn.LeafLet();
        },

        // LeafLet
        LeafLet: function () {
    console.log('LeafLet');

    L.Icon.Default.imagePath = '../../../../bower_components/leaflet/images/'

    // Add Multiple tile layer
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

    // Add Single Marker
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

    // Add Multiple Marker
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

    // Add Control
        var baseMaps = {
        "ROADMAP": googleRoadmapLayer,
        "SATELLITE" : googleSatelliteLayer,
        "HYBRID" : googleHybridLayer,
        "OSM Mapnik": osmMap,
        "Landscape": landMap
    };

    var overlayMaps = {
    	"RTU": rtus,
    	"Plane": planes_group
    };

    // L.control.layers(baseMaps, overlayMaps).addTo(map);

    if(layerControl === false) {  // var layerControl set to false in init phase; 
        layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
    }

    // Script for adding marker on map click
        // function onMapClick(e) {


        // }

        map.on('click', function(e) {
            fn.LeafLet_onMapClick(e)
        });

},

        // LeafLet, adding marker on map click
        LeafLet_onMapClick: function (e) {
    // console.log('LeafLet_onMapClick');

    var marker = L.marker(e.latlng, {
                    draggable: true,
                    title: "Resource location",
                    alt: "Resource Location",
                    riseOnHover: true
                    })
                .addTo(map)
                .bindPopup(e.latlng.toString()).openPopup();

    // Update marker on changing it's position
    marker.on("dragend", function (ev) {
        var chagedPos = ev.target.getLatLng();
        this.bindPopup(chagedPos.toString()).openPopup();
    });


    if(myMarkers_group === false) {
        myMarkers_group = L.layerGroup()
                           .addLayer(marker);
        map.addLayer(myMarkers_group);          // checked in controls
    } else {
        myMarkers_group.addLayer(marker);
    }


    if(layerControl === false) {  // var layerControl set to false in init phase; 
        layerControl = L.control.layers().addTo(map);
    }

    layerControl.addOverlay(myMarkers_group , "มาร์คเกอร์");

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
