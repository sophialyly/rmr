(function ($) {
    "use strict";
 
    ///////////////////////////////////////////////////// Your
    // var venueAddress = "Grand Place, 1000, Brussels"; // Venue
    
    /////////////////////////////////////////////////// Adress
    var token = null;

    var mainRtuDataTable;


    var fn = {

        
 
        // Launch Functions
        Launch: function () {
            fn.GetToken();
            fn.MainRtuDataTable();
            fn.MainRtuDataTable_click_handler();
            fn.Apps();
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
                        orderData: [ 8 ]
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
	console.log('MainRtuDataTable_click_handler');

    $('#mainRtuDataTable tbody').on('click', 'tr a', function () {

      var data = mainRtuDataTable.row($(this).closest('tr')).data();
      console.log(data);
      console.log( 'You clicked on ' + data.id+'\'s row' );
      console.log( 'You clicked on rtu_dm :  ' + data.dm );
      
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

}

    };
 
    $(document).ready(function () {
        fn.Launch();
    });
 
})(jQuery);

