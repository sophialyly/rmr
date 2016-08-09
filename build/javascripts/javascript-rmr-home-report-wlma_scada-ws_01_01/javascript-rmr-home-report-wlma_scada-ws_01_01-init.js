(function ($) {
    "use strict";
 
    ///////////////////////////////////////////////////// Your
    // var venueAddress = "Grand Place, 1000, Brussels"; // Venue
    
    /////////////////////////////////////////////////// Adress
    var token = null;

    var mainRtuDataTable;
    var rowDataTableSelected;

    // Map Object
    var map = null;
    // Leaflet Layers control
    var layerControl = false;
    // Leaflet Layers
    var rtuGroup = false;
    var rtuGeojsonLayer = false;

    // Leaflet Info Box
    var infobox = false;

    var currentMarker = null;

    var fn = {

        
 
        // Launch Functions
        Launch: function () {
            fn.GetToken();
            fn.MainRtuDataTable();
            fn.MainRtuDataTable_click_handler();
            fn.Leaflet();
            fn.Apps();
        },
        // Leaflet
        Leaflet: function () {
    // console.log('Leaflet');

    
    
	// L.Icon.Default.imagePath = '../../../../../../bower_components/leaflet/images/'
    L.Icon.Default.imagePath = '../../../../../../images/rmr/leaflet/images/'
 
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
     //    "Landscape": landMap
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



    fn.Leaflet_AddRtuLayer();
    fn.Leaflet_AddInfoBox();


    


},


        Leaflet_AddRtuLayer: function () {
    // console.log('Leaflet_AddRtuLayer');

    $.ajax({
        url: '../../../../../api/rtuManager/rtuLocationGeoJSON/',
        type: 'GET',
        contentType: 'application/json',
        dataType: 'json',
        success: function (response) {

            rtuGeojsonLayer = L.geoJson(response, {
                onEachFeature: function (feature, layer) {

                    if (feature.properties && feature.properties.dm) {
                        layer.bindPopup(feature.properties.dm);
                    }

                    layer.on({
                        'click': function (e) {

                            // console.log(e.target);

                            currentMarker = e.target;

                            e.target.openPopup();
                            map.panTo(e.target.getLatLng());

                            e.stopPropagation();
                            e.preventDefault();
                            

                        }
                    });
                }
            }).addTo(map);


            rtuGroup = L.layerGroup()
                        .addLayer(rtuGeojsonLayer);
            map.addLayer(rtuGroup);   
            layerControl.addOverlay(rtuGroup , "ตำแหน่ง RTU");
        }
    });


},
           Leaflet_PanToLocation: function (rtuInfoDataTableSelected) {

    console.log("rtuInfoDataTableSelected.lat" + rtuInfoDataTableSelected.lat);

    if (rtuInfoDataTableSelected.lat != "0.0000000") {

        rtuGeojsonLayer.eachLayer(function(marker) {

            if (marker.feature.properties.dm == rtuInfoDataTableSelected.dm) {

                // console.log(myDM);
                console.log(marker);
                console.log(marker.getLatLng());

                // marker.openPopup();
                // map.panTo(marker.getLatLng(),{animate: true});
                // marker.openPopup();




                // var a = marker.getPopup();
                // var b = a._content.replace("<span></span>","<span>asdasdasda</span>");
                // marker.setPopupContent(b);
                // marker.openPopup();

                // map.panTo(marker.getLatLng(),{animate: true});
                map.setView(marker.getLatLng(), 18, {animation: true});
                marker.openPopup();

                // map.setView(new L.LatLng(40.737, -73.923), 8);

                return false;



            }
        });

    } else {
            // fn.Leaflet_ShowRTUInformation(currentMarker);
            
    }
    
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
            // this.hideControl();
            return this._div;
        };

        infobox.refresh = function (properties) {
            this._div.innerHTML = '<h4>RTU Information</h4>';
            this._div.innerHTML += '<hr/>';
        };

        infobox.showControl = function () {
            console.log('showControl');
            $(".info").show();
        };

        infobox.hideControl = function () {
            console.log('hideControl');
            $(".info").hide();
        };

        infobox.addTo(map);

 
},
        // Routers
                Routers: function (canvasID) {
            // console.log('Routers');

            if (canvasID != "default") {

                $("#main-content > .canvas-rtuInformation:visible").hide("slide", { direction: "left" }, 800, function(){
                    // $('#canvas-rtuInformation-' + canvasID).fadeIn(300);
                    // $('#canvas-rtuInformation-formWizard').fadeIn(300);
                    $('#canvas-rtuInformation-mapBox').fadeIn(300);

                    // fn.OpenLayers();
                    // fn.Leaflet();

                    //$('#map').height($('#map-form-content').height() - $('#map-form-submit-content').height() - 20);

                    // $('#map').height($('#main-content').height() - $('#main-content > .page-title').height() - $('#main-content > div > div > .breadcrumb').height() );

                    $('#map').height($(window).height() - $('#main-content > .page-title').height() - 200 );

                    // console.log($('#main-content > .page-title').height());

                    // if (canvasID == 'add') {
                    //     fn.BreadcrumbShow('เพิ่มข้อมูล RTU');
                    // } else if (canvasID == 'view') {
                    //     fn.BreadcrumbShow('ดูข้อมูล RTU');
                    // } else if (canvasID == 'edit') {
                    //     fn.BreadcrumbShow('แก้ไขข้อมูล RTU');
                    // } else if (canvasID == 'map') {
                    //     fn.BreadcrumbShow('แผนที่แสดงตำแหน่ง RTU');
                    // }

                    fn.SideMenuCollapse();
                    

                });
                
            } else {

                fn.SideMenuExpand();

                $("#main-content > .canvas-rtuInformation:visible").fadeOut(300, function(){
                    $('#canvas-rtuInformation-' + canvasID).show("slide", { direction: "left" }, 800, function(){});

                    // fn.BreadcrumbHide();
                    
                });

            }
        },
        // SideMenu Expand
        SideMenuExpand: function () {
	//console.log('SideMenuExpand');
	$("#sidebar").attr('class', 'navbar-collapse collapse sidebar-fixed');

	// if(map){
	// 	map.invalidateSize()
	// }

},
        // SideMenu Collapse
        SideMenuCollapse: function () {
	//console.log('SideMenuCollapse');
	$("#sidebar").attr('class', 'navbar-collapse collapse sidebar-fixed sidebar-collapsed');
	
	// if(map){
	// 	map.invalidateSize()
	// }

},
        // Main RTU DataTable
        MainRtuDataTable: function () {
    // console.log('MainRtuDataTable');

    //------------------------ mainRtuDataTable -----------------------//
    if (jQuery().dataTable) {

        mainRtuDataTable = $('#mainRtuDataTable').DataTable( {
            "processing": true,
            "ajax": {
                "url": "../../../../../api/reportManager/reportFlowPressureByDM/",
                "type": "POST",
                "dataSrc": "rows",
                "headers": {
                    'Authorization': 'Bearer ' + fn.token
                },
                // "success": function(data) {
                //     console.log(data);
                // },
                "error": function(jqXHR, textStatus, errorThrown){
                    // alert('init error: ' + textStatus);
                    var url = '../../../../Login/';
                    $(location).attr('href',url);
                }
            },
            "aLengthMenu": [
                    [5, 10, 15, 25, 50, 100, -1],
                    [5, 10, 15, 25, 50, 100, "All"]
                ],
            "iDisplayLength": 10,
            "oLanguage": {
                    "sLengthMenu": "_MENU_ Records per page",
                    "sInfo": "_START_ - _END_ of _TOTAL_",
                    "sInfoEmpty": "0 - 0 of 0",
                    "oPaginate": {
                        "sPrevious": "Prev",
                        "sNext": "Next"
                    }
            },
            "aoColumnDefs": [
                    {
                        'sWidth': '100px',
                        'bSortable': true,
                        'aTargets': [0, 4, 8]
                    },{
                        'sWidth': '90px',
                        'bSortable': true,
                        'aTargets': [3]
                    },{
                        'sWidth': '60px',
                        'bSortable': true,
                        'aTargets': [1, 2, 6, 7]
                    },{
                        'bSortable': true,
                        "bAutoWidth": true,
                        'aTargets': [8]
                    },{
                        'sWidth': '100px',
                        'bSortable': true,
                        'aTargets': [5]
                    },{
                        'sWidth': '50px',
                        'bSortable': false,
                        'aTargets': [9]
                    },{
                        // The `data` parameter refers to the data for the cell (defined by the
                        // `data` option, which defaults to the column being worked with, in
                        // this case `data: 0`.
                        "render": function ( data, type, row ) {
                            return row.dm;
                        },
                        "targets": 0
                    },{
                        "render": function ( data, type, row ) {
                            return row.branch;
                        },
                        "targets": 1
                    },{
                        "render": function ( data, type, row ) {
                            return row.zone;
                        },
                        "targets": 2
                    },{
                        "render": function ( data, type, row ) {
                            return row.dma;
                        },
                        "targets": 3
                    },{
                        "render": function ( data, type, row ) {
                            return row.ip_address;
                        },
                        "targets": 4
                    },{
                        "render": function ( data, type, row ) {

                            var tmpLatLng = "";

                            tmpLatLng += '<b>' + row.rtu_pin_code + '</b><br/>';
                            tmpLatLng += '(' + row.lat + ',' + row.lng + ')';

                            return tmpLatLng;
                        },
                        "targets": 5
                    },{
                        "render": function ( data, type, row ) {

                            var tmpFlow = "";

                            tmpFlow += '<b>' + parseFloat(row.flow_value).toFixed(2) + '</b><br/>';
                            // tmpFlow += '<b>' + row.flow_value + '</b><br/>';
                            // tmpFlow += '(' + row.flow_timestamp + ')';

                            return tmpFlow;
                        },
                        "targets": 6
                    },{
                        "render": function ( data, type, row ) {

                            var tmpPressure = "";

                            tmpPressure += '<b>' + parseFloat(row.pressure_value).toFixed(2) + '</b><br/>';
                            // tmpPressure += '<b>' + row.pressure_value + '</b><br/>';
                            // tmpPressure += '(' + row.pressure_timestamp + ')';

                            return tmpPressure;
                        },
                        "targets": 7
                    },{
                        "render": function ( data, type, row ) {

                            var tmpFlowTimestamp = moment(row.flow_timestamp); 
                            var tmpCurrentTimestamp = moment(); 

                            var ms = tmpCurrentTimestamp.diff(tmpFlowTimestamp);
                            var d = moment.duration(ms).format("d [วัน ] h [ชม.] m [นาที]");

                            return d;
                        },
                        "data": function ( data, type, row ) {

                            var tmpFlowTimestamp = moment(data.flow_timestamp); 
                            var tmpCurrentTimestamp = moment(); 

                            var ms = tmpCurrentTimestamp.diff(tmpFlowTimestamp);

                            return ms;
                        },
                        "targets": 8,
                        "orderData": [ 8 ]
                    },{
                        "render": function ( data, type, row ) {

                            var tmpListEventControls = "";
                            
                            tmpListEventControls += '<div class="btn-group">';
                            tmpListEventControls += '<a class="btn btn-sm show-tooltip" title="" href="javascript:;" data-original-title="Map"><i class="fa fa-globe"></i></a>';
                            tmpListEventControls += '</div>';

                            return tmpListEventControls;
                        },
                        "targets": 9
                    },{ 
                        "sClass": "MainRtuDataTable-common", 
                        "aTargets": [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] 
                    },{ 
                        "sClass": "MainRtuDataTable-col-07", 
                        "aTargets": [] 
                    }
            ],
            "order" : [] //disable default sorting, eg sorting on 1st column
            
        });

    }



},


        MainRtuDataTable_click_handler: function () {
	// console.log('MainRtuDataTable_click_handler');

    $('#mainRtuDataTable tbody').on('click', 'tr a', function () {

      var data = mainRtuDataTable.row($(this).closest('tr')).data();
      // console.log(data);
      // console.log( 'You clicked on ' + data.id+'\'s row' );
      // console.log( 'You clicked on rtu_dm :  ' + data.dm );
      // console.log( 'You clicked on lat :  ' + data.lat );
      // console.log( 'You clicked on lng :  ' + data.lng );
      

      if (rowDataTableSelected) {
        rowDataTableSelected = null;
      }
      
      rowDataTableSelected = data;


      if ($(this).attr('data-original-title') == 'Map') {
      	fn.Routers('map');
        fn.Leaflet_PanToLocation(rowDataTableSelected);
      }

    });




    
},
        // Get Token
        GetToken: function () {
	// console.log('GetToken');

    $.ajax({
      	url: '../../../../../api/loginManager/getJWT/',
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
          var url = '../../../../Login/';
          $(location).attr('href',url);
        }
    });
    
},
        // Logout
        Logout: function () {
	// console.log('Logout');

      $.ajax({
        url: '../../../../../api/loginManager/logout/',
        type: 'POST',
        contentType: 'application/json',
        dataType: 'json',
        cache: false,
        //async: false,
        success: function(data) {
            //console.log(data);

            //window.location.href = '../Admin/';
            var url = '../../../../Login/';
            $(location).attr('href',url);

            //console.log(window.location.pathname);

        },
        error: function(jqXHR, textStatus, errorThrown){
                alert('init error: ' + textStatus);
            }
        });
    
},

 		// Apps
        // Apps
Apps: function () {
	// console.log('Apps');

	$('#button-logout').bind('click', function(){
		fn.Logout();
	});

	$('#refresh-data').click(function () {
            // console.log('Refresh Data');
            mainRtuDataTable.ajax.reload();
    });


    $('body').on('click', '.goto-default', function () {
        fn.Routers('default');
    });

}

    };
 
    $(document).ready(function () {
        fn.Launch();
    });
 
})(jQuery);

