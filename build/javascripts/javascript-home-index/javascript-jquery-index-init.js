$(function () {

        $('#highChartContainer').highcharts({

        chart: {
            type: 'column',
            animation: {
                duration: 1500,
                easing: 'easeOutBounce'
            }
        },

        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },

        series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }]

    });
    
	$('#jquery-button').click(function(){
		$('#jquery-content').toggle();
	})

                    $('#button-logout').bind('click', function(){

                      //alert('logout');


                      $.ajax({
                        url: '../../api/loginManager/logout/',
                        type: 'POST',
                        contentType: 'application/json',
                        dataType: 'json',
                        cache: false,
                        //async: false,
                        success: function(data) {
                            //console.log(data);

                            //window.location.href = '../Admin/';
                            var url = '../Login/';
                            $(location).attr('href',url);

                            console.log(window.location.pathname);

                        },
                        error: function(jqXHR, textStatus, errorThrown){
                                alert('init error: ' + textStatus);
                            }
                        });
                });

});
