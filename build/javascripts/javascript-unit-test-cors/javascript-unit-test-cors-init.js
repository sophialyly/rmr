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


        // Apps
                Apps: function () {
        	console.log('Apps');


                      // $.ajax({
                      //   url: 'http://localhost/wlma-extension-api/build/src/api/hello/josh',
                      //   type: 'GET',
                      //   // contentType: 'application/json',
                      //   // dataType: 'json',
                      //   cache: false,
                      //   //async: false,
                      //   success: function(data) {
                      //       console.log(data);



                      //   },
                      //   error: function(jqXHR, textStatus, errorThrown){
                      //           alert('init error: ' + textStatus);
                      //       }
                      //   });



                      $.ajax({
                        url: 'http://172.16.194.224/wlma-extension-api/build/src/api/wlmaManager/getFlowPressureWithLocation/',
                        type: 'POST',
                        contentType: 'application/json',
                        // dataType: 'json',
                        cache: false,
                        //async: false,
                        success: function(data) {
                            console.log(data);



                        },
                        error: function(jqXHR, textStatus, errorThrown){
                                alert('init error: ' + textStatus);
                            }
                        });


        }

    };

    $(document).ready(function () {
        fn.Launch();
    });

})(jQuery);
