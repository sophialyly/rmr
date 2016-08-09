(function ($) {
    "use strict";

    var token = null;

    // Map Object
    var map = null;
    // Leaflet Layers control
    var layerControl = false;
    // Leaflet Layers
    var rtuGroup = false;
    var rtuGeojsonLayer = false;
    // Leaflet Info Box
    var infobox = false;
    var draggable = false;

    var searchBox = false;

    var rtuEditingMarker = null;
    var rtuNormalMarker = null;

    var rtuRedMarker = null;
    var rtuYellowMarker = null;
    var rtuGreenMarker = null;



    /////////////////////////////////////////////////// Adress

    var fn = {

        // Launch Functions
        Launch: function () {
            fn.Leaflet();
            fn.Leaflet_ExtraMarkers();

            fn.GetToken();
            fn.Apps();
        },

        // Leaflet
        Leaflet: function () {
    // console.log('Leaflet');

    
    
	// L.Icon.Default.imagePath = '../../../../../../bower_components/leaflet/images/'
    L.Icon.Default.imagePath = '../../../../../images/rmr/leaflet/images/'
 
    // Using multiple tile layers on your map
    var osmLink = 'OpenStreetMap', 
    	thunLink = 'Thunderforest';
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
		osmAttrib = '&copy; ' + osmLink + ' Contributors',
		landUrl = 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png', 
		thunAttrib = '&copy; ' + osmLink+' Contributors & '+thunLink;

	var osmMap = L.tileLayer(osmUrl, {attribution: osmAttrib, minZoom: 0, maxZoom: 18}),
		landMap = L.tileLayer(landUrl, {attribution: thunAttrib, minZoom: 0, maxZoom: 16});

    var googleRoadmapLayer = new L.Google('ROADMAP', {attribution: 'กองพัฒนาระบบงานผลิตและวิศวกรรมฯ', minZoom: 12, maxZoom: 20});
    // map.addLayer(googleRoadmapLayer);

    var googleSatelliteLayer = new L.Google('SATELLITE', {attribution: 'กองพัฒนาระบบงานผลิตและวิศวกรรมฯ', minZoom: 12, maxZoom: 20});
    // map.addLayer(googleSatelliteLayer);

    var googleHybridLayer = new L.Google('HYBRID', {attribution: 'กองพัฒนาระบบงานผลิตและวิศวกรรมฯ', minZoom: 12, maxZoom: 20});
    // map.addLayer(googleHybridLayer);

	map = L.map('map', {
                            fullscreenControl: true,
							layers: [googleRoadmapLayer] // only add one! 
						})
			.setView([13.708189, 100.599608], 14);

    var baseMaps = {
    	"ROADMAP": googleRoadmapLayer,
    	"SATELLITE" : googleSatelliteLayer,
    	"HYBRID" : googleHybridLayer,
    	// "OSM Mapnik": osmMap,
        // "Landscape": landMap
    };


    var rtu = L.marker([13.708189, 100.599608])
		       // .addTo(map)
		       .bindPopup("I’m here!")
		       .openPopup();

    var rtus = L.layerGroup([rtu]);

    var overlayMaps = {
    	"RTU": rtus
    };

    // L.control.layers(baseMaps, overlayMaps).addTo(map);
    if(layerControl === false) {  // var layerControl set to false in init phase; 
        // layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);
        layerControl = L.control.layers(baseMaps).addTo(map);
    }

    var zoomLev;
    map.on("zoomend", function(){
    	zoomLev = map.getZoom();
    	// console.log(zoomLev);
    	if (zoomLev < 14){
    		// map.removeLayer(lariac);
    		// $('#zoom').val(zoomLev);
    	} else {
    		// $('#zoom').val(zoomLev);
    		// map.addLayer(lariac);
    	}
    });

    // map.dragging.disable();

    map.on('click', function(){
        // console.log('on click');

        // fn.ResetMarkerToDefault();
        // fn.ToggleFormInfo();
    });


    

    fn.Leaflet_AddRtuLayer();
    // fn.Leaflet_AddInfoBox();
    // // fn.Leaflet_ZoomBox();
    // // fn.Leaflet_SearchInfoBox();
    // fn.Leaflet_DrawControl();
    // // fn.Leaflet_AddDMALayer();
    // fn.Leaflet_AddWMSLayer();
    


},
        Leaflet_AddRtuLayer: function () {
    // console.log('Leaflet_AddRtuLayer');

    $.ajax({
        url: '../../../../api/rtuManager/rtuLocationGeoJSON/',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {
            // console.log(response);

            rtuGeojsonLayer = L.geoJson(response, {

                onEachFeature: function (feature, layer) {
                    layer.on({
                        'click': function (e) {

                            // currentMarker = e.target;
                            // fn.HighlightMarkerToEdit();
                            // fn.ToggleFormInfo();

                            // e.target.openPopup();
                            // map.panTo(e.target.getLatLng());

                            // fn.Leaflet_ShowRTUInformation(currentMarker);

                        },
                        'dragstart': function(e) {
                            // console.log("dragstart");
                            // Disable drag and zoom handlers.

                            // map.dragging.disable();
                            // map.touchZoom.disable();
                            // map.doubleClickZoom.disable();
                            // map.scrollWheelZoom.disable();
                            // map.keyboard.disable();
                        },
                        'drag': function(e) {
                            // console.log("drag");
                            // Disable drag and zoom handlers.

                            // map.dragging.disable();
                            // map.touchZoom.disable();
                            // map.doubleClickZoom.disable();
                            // map.scrollWheelZoom.disable();
                            // map.keyboard.disable();
                        },
                        'dragend': function(e) {
                            // console.log("dragend");
                            // console.log(e.target.feature.properties.dm);

                            // dragging = true;

                            // currentMarker = e.target;
                            // fn.HighlightMarkerToEdit();
                            // fn.ToggleFormInfo();

                            // fn.Leaflet_ShowRTUInformation(currentMarker);

                            // // Enable drag and zoom handlers.
                            // map.dragging.enable();
                            // map.touchZoom.enable();
                            // map.doubleClickZoom.enable();
                            // map.scrollWheelZoom.enable();
                            // map.keyboard.enable();
                        }
                    });

                    if (feature.properties.zone == "01") {

                        layer.setIcon(rtuRedMarker);
                        layer.bindPopup(feature.properties.dm);
                        layer.options.draggable = false;

                    } else if (feature.properties.zone == "02") {

                        layer.setIcon(rtuYellowMarker);
                        layer.bindPopup(feature.properties.dm);
                        layer.options.draggable = false;

                    } else {

                        layer.setIcon(rtuGreenMarker);
                        layer.bindPopup(feature.properties.dm);
                        layer.options.draggable = false;
                    }

                }
            }).addTo(map);

            // console.log(rtuGeojsonLayer);

            rtuGroup = L.layerGroup()
                        .addLayer(rtuGeojsonLayer);
            map.addLayer(rtuGroup);   
            layerControl.addOverlay(rtuGroup , "ตำแหน่ง RTU");
        },
        error: function(jqXHR, textStatus, errorThrown){
            // alert('init error: ' + textStatus);
          var url = '../../../Login/';
          $(location).attr('href',url);
        }
    });
    
	



},
        Leaflet_ExtraMarkers: function () {
    // console.log('Leaflet_ExtraMarkers');

	// Creates a red marker with the coffee icon
  rtuGreenMarker = L.ExtraMarkers.icon({
    icon: 'fa-floppy-o',
    markerColor: 'green-light',
    shape: 'circle',
    prefix: 'fa',
    // innerHTML: 'RTU'
  });

 // L.marker([51.941196,4.512291], {icon: rtuEditingMarker,}).addTo(map);

  rtuRedMarker = L.ExtraMarkers.icon({
          icon: 'fa-pencil-square-o',
          markerColor: 'red',
          shape: 'circle',
          prefix: 'fa'
        });
    

  rtuYellowMarker = L.ExtraMarkers.icon({
          icon: 'fa-pencil-square-o',
          markerColor: 'yellow',
          shape: 'circle',
          prefix: 'fa'
        });


},
        // Get Token
        GetToken: function () {
	// console.log('GetToken');

    $.ajax({
      	url: '../../../../api/loginManager/getJWT/',
      	type: 'GET',
      	contentType: 'application/json',
      	dataType: 'json',
      	cache: false,
        //async: false,
        success: function(data) {
            //console.log(data);

            fn.token = data.jwt;
            //console.log(fn.token);

        },
        error: function(jqXHR, textStatus, errorThrown){
        	// alert('init error: ' + textStatus);
          var url = '../../../Login/';
          $(location).attr('href',url);
        }
    });
    
},
        // Logout
        Logout: function () {
	// console.log('Logout');

    $.ajax({
      	url: '../../../../api/loginManager/logout/',
      	type: 'POST',
      	contentType: 'application/json',
      	dataType: 'json',
      	cache: false,
        //async: false,
        success: function(data) {
            //console.log(data);

            //window.location.href = '../Admin/';
            var url = '../../../Login/';
            $(location).attr('href',url);

            //console.log(window.location.pathname);

        },
        error: function(jqXHR, textStatus, errorThrown){
        	alert('init error: ' + textStatus);
        }
    });
    
},
        // Apps
                Apps: function () {
        	// console.log('Apps');

            $('#button-logout').bind('click', function(){
            	fn.Logout();
            });

        }

    };

    $(document).ready(function () {
        fn.Launch();
    });

})(jQuery);
