(function ($) {
    "use strict";
 
    ///////////////////////////////////////////////////// Your
    // var venueAddress = "Grand Place, 1000, Brussels"; // Venue

    
    /////////////////////////////////////////////////// Adress
 
    var fn = {
 
        // Launch Functions
        Launch: function () {
            fn.Apps();
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

