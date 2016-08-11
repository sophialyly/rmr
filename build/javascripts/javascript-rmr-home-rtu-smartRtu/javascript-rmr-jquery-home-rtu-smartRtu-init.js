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

    var description_box = false;

    var searchBox = false;

    var rtuEditingMarker = null;
    var rtuNormalMarker = null;

    var rtuRedMarker = null;
    var rtuYellowMarker = null;
    var rtuGreenMarker = null;
    var rtuGrayMarker = null;
    var rtuBlackMarker = null;

    var autoUpdateToggle = false;
    var autoUpdateFlag = false;
    var autoUpdateRequest = null;
    var autoUpdateTimer = null;



    /////////////////////////////////////////////////// Adress

    var fn = {

        // Launch Functions
        Launch: function () {
            fn.Leaflet();
            fn.Leaflet_ExtraMarkers();

            fn.GetToken();
            fn.Apps();
        },

        // Timer
        AutoUpdate: function () {
	// console.log('AutoUpdate');

        /* if there is a previous ajax request, then we abort it and then set xhr to null */
        // if( autoUpdateRequest != null ) {
        //         autoUpdateRequest.abort();
        //         autoUpdateRequest = null;
        // }




          var tmpData = {
              "paramDM" : "DM-01-01-01-01"
          }

        /* and now we can safely make another ajax request since the previous one is aborted */
        autoUpdateRequest = $.ajax({
                type: "POST",
                url: "../../../../api/wlmaManager/getFlowPressureByDM/",
                dataType: "json",
                contentType: "application/json",
                data: JSON.stringify(tmpData),
                beforeSend: function() {
                    if( autoUpdateRequest != null ) {
                            autoUpdateRequest.abort();
                            autoUpdateRequest = null;
                    }
                    // if (autoUpdateTimer) {
                    //     clearInterval(autoUpdateTimer);
                    // }
                },
                success: function(result) {
                    /* handle the ajax response */
                    // console.log(result);

                    $('#txtFlow').val(result.rows[0].flow_value);
                    $('#txtPressure').val(result.rows[0].pressure_value);
                    
                }
        });
    
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
                            scrollWheelZoom: false,
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
    fn.Leaflet_AddInfoBox();
    fn.Leaflet_AddDescriptionBox();
    fn.Leaflet_FullScreen();
    // // fn.Leaflet_ZoomBox();
    // // fn.Leaflet_SearchInfoBox();
    // fn.Leaflet_DrawControl();
    // // fn.Leaflet_AddDMALayer();
    fn.Leaflet_AddWMSLayer();
    fn.Leaflet_AddEasyButton();
    


},
        Leaflet_AddRtuLayer: function () {
    // console.log('Leaflet_AddRtuLayer');




    $.ajax({
        url: '../../../../api/rtuManager/rtuInformationGeoJSON/',
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

                    // console.log(feature.properties.pressure_avg);

                    if (parseFloat(feature.properties.pressure_avg) < 2) {

                        layer.setIcon(rtuBlackMarker);
                        layer.bindPopup(feature.properties.dm);
                        layer.options.draggable = false;

                    } else if ((parseFloat(feature.properties.pressure_avg) >= 2) && (parseFloat(feature.properties.pressure_avg) < 6)) {

                        layer.setIcon(rtuRedMarker);
                        layer.bindPopup(feature.properties.dm);
                        layer.options.draggable = false;

                    }  else if ((parseFloat(feature.properties.pressure_avg) >= 6) && (parseFloat(feature.properties.pressure_avg) < 10)) {

                        layer.setIcon(rtuYellowMarker);
                        layer.bindPopup(feature.properties.dm);
                        layer.options.draggable = false;

                    } else if (parseFloat(feature.properties.pressure_avg) >= 10) {

                        layer.setIcon(rtuGreenMarker);
                        layer.bindPopup(feature.properties.dm);
                        layer.options.draggable = false;

                    } else {

                        layer.setIcon(rtuRedMarker);
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
            // console.log(textStatus);
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
    icon: 'fa-info-circle',
    markerColor: 'green-light',
    shape: 'circle',
    prefix: 'fa',
    // innerHTML: 'RTU'
  });

 // L.marker([51.941196,4.512291], {icon: rtuEditingMarker,}).addTo(map);

  rtuRedMarker = L.ExtraMarkers.icon({
          icon: 'fa-info-circle',
          markerColor: 'red',
          shape: 'circle',
          prefix: 'fa'
        });
    

  rtuYellowMarker = L.ExtraMarkers.icon({
          icon: 'fa-info-circle',
          markerColor: 'yellow',
          shape: 'circle',
          prefix: 'fa'
        });


  rtuGrayMarker = L.ExtraMarkers.icon({
          icon: 'fa-info-circle',
          markerColor: 'gray',
          shape: 'circle',
          prefix: 'fa'
        });

  rtuBlackMarker = L.ExtraMarkers.icon({
          icon: 'fa-info-circle',
          markerColor: 'black',
          shape: 'circle',
          prefix: 'fa'
        });

},
        Leaflet_FullScreen: function () {
    // console.log('Leaflet_FullScreen');

    L.Control.Fullscreen // A fullscreen button. Or use the `{fullscreenControl: true}` option when creating L.Map.

    // `fullscreenchange` Event that's fired when entering or exiting fullscreen.
	map.on('fullscreenchange', function () {
	    if (map.isFullscreen()) {
	        console.log('entered fullscreen');
	    } else {
	        console.log('exited fullscreen');
	    }
	});

	// map.isFullscreen() // Is the map fullscreen?
	// map.toggleFullscreen() // Either go fullscreen, or cancel the existing fullscreen.

    
},
        Leaflet_AddInfoBox: function () {
    // console.log('Leaflet_AddInfoBox');
        infobox = L.control({
            position: 'bottomright'
        });

        infobox.onAdd = function (e) {
            // this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
            this._div = L.DomUtil.create('div', 'row info'); // create a div with a class "row"
            this.refresh();
            this.showControl();
            this.hideControl();
            return this._div;
        };

        infobox.refresh = function (properties) {
            this._div.innerHTML = '<h4>RTU Information</h4>';
            this._div.innerHTML += '<hr/>';

            $("#rtu-info-box").show();
            $("#rtu-info-box").appendTo( $(this._div) );
      

        };

        infobox.showControl = function () {
            // console.log('showControl');
            // $("#rtuAddForm").show();
            // $("#rtuAddForm").appendTo( $(this._div) );
            
            // map.removeControl(infobox);
            $(".info").show();

        };

        infobox.hideControl = function () {
            // console.log('hideControl');

            $(".info").hide();

        };

        infobox.addTo(map);

        // Disable dragging when user's cursor enters the element
        infobox.getContainer().addEventListener('mouseover', function () {
            // Disable drag and zoom handlers.
            map.dragging.disable();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();
            map.keyboard.disable();

            map.boxZoom.disable();
            if (map.tap) map.tap.disable();
            document.getElementById('map').style.cursor='default';
        });

        // Re-enable dragging when user's cursor leaves the element
        infobox.getContainer().addEventListener('mouseout', function () {
            // Enable drag and zoom handlers.
            map.dragging.enable();
            map.touchZoom.enable();
            map.doubleClickZoom.enable();
            map.scrollWheelZoom.enable();
            map.keyboard.enable();

            map.boxZoom.enable();
            if (map.tap) map.tap.enable();
            document.getElementById('map').style.cursor='grab';
        });

        infobox.getContainer().addEventListener('click', function (event) {
            // console.log('infobox click');
            
            event.stopPropagation()
            event.preventDefault()
            return false
        });

        $(".info").draggable();
        // $(".info").hide();
},
        Leaflet_AddDescriptionBox: function () {
    // console.log('Leaflet_AddDescriptionBox');
        description_box = L.control({
            position: 'bottomleft'
        });

        description_box.onAdd = function (e) {
            // this._div = L.DomUtil.create('div', 'desc'); // create a div with a class "desc"
            this._div = L.DomUtil.create('div', 'row desc'); // create a div with a class "row"
            this.refresh();
            this.showControl();
            this.hideControl();
            return this._div;
        };

        description_box.refresh = function (properties) {
            // this._div.innerHTML = '<h4>Description</h4>';
            // this._div.innerHTML += '<hr/>';

            $("#pressure-range-desc-box").show();
            $("#pressure-range-desc-box").appendTo( $(this._div) );
      

        };

        description_box.showControl = function () {
            // console.log('showControl');
            // $("#rtuAddForm").show();
            // $("#rtuAddForm").appendTo( $(this._div) );
            
            // map.removeControl(description_box);
            $(".desc").show();

        };

        description_box.hideControl = function () {
            // console.log('hideControl');

            $(".desc").hide();

        };

        description_box.addTo(map);

        // Disable dragging when user's cursor enters the element
        description_box.getContainer().addEventListener('mouseover', function () {
            // Disable drag and zoom handlers.
            map.dragging.disable();
            map.touchZoom.disable();
            map.doubleClickZoom.disable();
            map.scrollWheelZoom.disable();
            map.keyboard.disable();

            map.boxZoom.disable();
            if (map.tap) map.tap.disable();
            document.getElementById('map').style.cursor='default';
        });

        // Re-enable dragging when user's cursor leaves the element
        description_box.getContainer().addEventListener('mouseout', function () {
            // Enable drag and zoom handlers.
            map.dragging.enable();
            map.touchZoom.enable();
            map.doubleClickZoom.enable();
            map.scrollWheelZoom.enable();
            map.keyboard.enable();

            map.boxZoom.enable();
            if (map.tap) map.tap.enable();
            document.getElementById('map').style.cursor='grab';
        });

        description_box.getContainer().addEventListener('click', function (event) {
            // console.log('description_box click');
            
            event.stopPropagation()
            event.preventDefault()
            return false
        });

        $(".desc").draggable();
        // $(".desc").hide();
},
        

Leaflet_AddWMSLayer: function () {


// var temperature = L.tileLayer.wms('http://gisonline.mwa.co.th:2558/arcgis/rest/services/mobileCache/mobileCache/MapServer/WMTS', {
//     format: 'img/png',
//     transparent: true,
//     layers: 0
// }).addTo(map);


    var mwaORG = L.tileLayer.wms("http://gismapservice.mwa.co.th/arcgis/services/wmsservice/MapServer/WMSServer", {
        layers: '207',
        format: 'image/png',
        transparent: true
    });

	var mwaORG_Group = L.layerGroup()
                        .addLayer(mwaORG);
    map.addLayer(mwaORG_Group);   
    layerControl.addOverlay(mwaORG_Group , "หน่วยงาน กปน.");



    var mwaPipe_Tunnel = L.tileLayer.wms("http://gismapservice.mwa.co.th/arcgis/services/wmsservice/MapServer/WMSServer", {
        layers: '46',
        format: 'image/png',
        transparent: true
    });

	var mwaPipe_TunnelGroup = L.layerGroup()
                        .addLayer(mwaPipe_Tunnel);
    map.addLayer(mwaPipe_TunnelGroup);   
    layerControl.addOverlay(mwaPipe_TunnelGroup , "ท่ออุโมงค์");



    var mwaWMS_47 = L.tileLayer.wms("http://gismapservice.mwa.co.th/arcgis/services/wmsservice/MapServer/WMSServer", {
        layers: '47',
        format: 'image/png',
        transparent: true
    });

	var mwaWMS_47Group = L.layerGroup()
                        .addLayer(mwaWMS_47);
    map.addLayer(mwaWMS_47Group);   
    layerControl.addOverlay(mwaWMS_47Group , "ท่อประธาน");



    var mwaWMS_48 = L.tileLayer.wms("http://gismapservice.mwa.co.th/arcgis/services/wmsservice/MapServer/WMSServer", {
        layers: '48',
        format: 'image/png',
        transparent: true
    });

    var mwaWMS_48Group = L.layerGroup()
                        .addLayer(mwaWMS_48);
    map.addLayer(mwaWMS_48Group);   
    layerControl.addOverlay(mwaWMS_48Group , "ท่อจ่าย");



    // var mwaPipe_Service = L.tileLayer.wms("http://gisonline.mwa.co.th:2558/arcgis/services/wmsservice/MapServer/WMSServer", {
    //     layers: '49',
    //     format: 'image/png',
    //     transparent: true
    // });

    // var mwaPipe_ServiceGroup = L.layerGroup()
    //                     .addLayer(mwaPipe_Service);
    // map.addLayer(mwaPipe_ServiceGroup);   
    // layerControl.addOverlay(mwaPipe_ServiceGroup , "ท่อบริการ");




    var mwaWMS_DMA_Boundary = L.tileLayer.wms("http://gismapservice.mwa.co.th/arcgis/services/dss/WLMA/MapServer/WMSServer", {
        layers: '0',
        format: 'image/png',
        transparent: true
    });

    var mwaWMS_DMA_Boundary_Group = L.layerGroup()
                        .addLayer(mwaWMS_DMA_Boundary);
    // map.addLayer(mwaWMS_DMA_Boundary_Group);   
    layerControl.addOverlay(mwaWMS_DMA_Boundary_Group , "ขอบเขต DMA");





    // var mwaWMS_DMA = L.tileLayer.wms("http://gisonline.mwa.co.th:2558/arcgis/services/wmsservice/MapServer/WMSServer", {
    //     layers: '38,39',
    //     format: 'image/png',
    //     transparent: true
    // });

    // var mwaWMS_DMAGroup = L.layerGroup()
    //                     .addLayer(mwaWMS_DMA);
    // map.addLayer(mwaWMS_DMAGroup);   
    // layerControl.addOverlay(mwaWMS_DMAGroup , "DMA");




    
},
        Leaflet_AddEasyButton: function () {
    // console.log('Leaflet_AddEasyButton');

    // L.easyButton('glyphicon-question-sign', function(btn, map){
    //     // helloPopup.setLatLng(map.getCenter()).openOn(map);
    //     // alert('you just clicked a font awesome icon');
    //     description_box.hideControl();
    // }).addTo(map); // probably just `map`





    var descriptionButtonToggle = L.easyButton({
    	id: 'animated-marker-toggle',
    	type: 'animate',
    	states: [{
    		stateName: 'add-markers',
    		icon: 'glyphicon-question-sign',
    		title: 'add some markers',
    		onClick: function(control) {
    			// map.addLayer(randomMarkers);
    			control.state('remove-markers');

    			description_box.hideControl();
    		}
    	}, {
    		stateName: 'remove-markers',
    		title: 'remove markers',
    		icon: 'glyphicon-question-sign',
    		onClick: function(control) {
    			// map.removeLayer(randomMarkers);
    			control.state('add-markers');

    			description_box.showControl();
    		}
    	}]
    });
    descriptionButtonToggle.addTo(map);






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





            $('#btn-auto-update').bind('click', function(){
            	// console.log("auto update");

            	if (autoUpdateToggle) {

                    $('#btn-auto-update').html('<i class="fa fa-clock-o"></i>');
                    
                    if (autoUpdateTimer) {
                        clearInterval(autoUpdateTimer);
                    }

            		autoUpdateToggle = false;

            	} else {
            		
                    $('#btn-auto-update').html('<i class="fa fa-spinner fa-pulse"></i>');
                    
                    // autoUpdateTimer = setInterval(fn.AutoUpdate(), 1000);
                    autoUpdateTimer = setInterval(function() {
                        // var d = new Date();
                    // document.getElementById("demo").innerHTML = d.toLocaleTimeString();
                    // console.log(d.toLocaleTimeString());
                        fn.AutoUpdate()
                    } ,1000);

            		autoUpdateToggle = true;
            	}

            });

        }

    };

    $(document).ready(function () {
        fn.Launch();
    });

})(jQuery);
