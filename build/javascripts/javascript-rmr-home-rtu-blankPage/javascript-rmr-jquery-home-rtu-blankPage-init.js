(function ($) {
    "use strict";

    

    var token = null;


    /////////////////////////////////////////////////// Adress

    var fn = {

        // Launch Functions
        Launch: function () {
            fn.GetToken();
            fn.Apps();
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
