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
