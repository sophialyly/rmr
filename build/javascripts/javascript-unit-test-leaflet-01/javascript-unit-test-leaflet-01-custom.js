$(function() {

    //Handel user layout settings using cookie
    function handleUserLayoutSetting() {
        if (typeof cookie_not_handle_user_settings != 'undefined' && cookie_not_handle_user_settings == true) {
            return;
        }
        //Collapsed sidebar
        if ($.cookie('sidebar-collapsed') == 'true') {
            $('#sidebar').addClass('sidebar-collapsed');
        }

        //Fixed sidebar
        if ($.cookie('sidebar-fixed') == 'true') {
            $('#sidebar').addClass('sidebar-fixed');
        }

        //Fixed navbar
        if ($.cookie('navbar-fixed') == 'true') {
            $('#navbar').addClass('navbar-fixed');
        }

        var color_skin = $.cookie('skin-color');
        var color_sidebar = $.cookie('sidebar-color');
        var color_navbar = $.cookie('navbar-color');

        //Skin color
        if (color_skin !== undefined) {
            $('body').addClass('skin-' + color_skin);
        }

        //Sidebar color
        if (color_sidebar !== undefined) {
            $('#main-container').addClass('sidebar-' + color_sidebar);
        }

        //Navbar color
        if (color_navbar !== undefined) {
            $('#navbar').addClass('navbar-' + color_navbar);
        }
    }
    //If you want to handle skin color by server-side code, don't forget to comment next line  
    handleUserLayoutSetting();

    //Disable certain links
    $('a[href^=#]').click(function (e) {
        e.preventDefault()
    });

    //slimScroll to fixed height tags
    $('.nice-scroll, .slimScroll').slimScroll({touchScrollStep: 30});

    //Add animation to notification and messages icon, if they have any new item
    var badge = $('.flaty-nav .dropdown-toggle > .fa-bell + .badge')
    if ($(badge).length > 0 && parseInt($(badge).html()) > 0) {
        $('.flaty-nav .dropdown-toggle > .fa-bell').addClass('anim-swing');
    }
    badge = $('.flaty-nav .dropdown-toggle > .fa-envelope + .badge')
    if ($(badge).length > 0 && parseInt($(badge).html()) > 0) {
        $('.flaty-nav .dropdown-toggle > .fa-envelope').addClass('anim-top-down');
    }

    //---------------- Tooltip & Popover --------------------//
    $('.show-tooltip').tooltip({container: 'body', delay: {show:500}});
    $('.show-popover').popover();

    //---------------- Syntax Highlighter --------------------//
    window.prettyPrint && prettyPrint();

    //---------------- Sidebar -------------------------------//
    //Scrollable fixed sidebar
    var scrollableSidebar = function() {
        if ($('#sidebar.sidebar-fixed').size() == 0) {
            $('#sidebar .nav').css('height', 'auto');
            return;
        }
        if ($('#sidebar.sidebar-fixed.sidebar-collapsed').size() > 0) {
            $('#sidebar .nav').css('height', 'auto');
            return;
        }
        var winHeight = $(window).height() - 90;
        $('#sidebar.sidebar-fixed .nav').slimScroll({height: winHeight + 'px', position: 'left'});
    }
    scrollableSidebar();
    //Submenu dropdown
    $('#sidebar a.dropdown-toggle').click(function() {
        var submenu = $(this).next('.submenu');
        var arrow = $(this).children('.arrow');
        if (arrow.hasClass('fa-angle-right')) {
            arrow.addClass('anim-turn90');
        }
        else {
            arrow.addClass('anim-turn-90');
        }
        submenu.slideToggle(400, function(){
            if($(this).is(":hidden")) {
                arrow.attr('class', 'arrow fa fa-angle-right');
            } else {
                arrow.attr('class', 'arrow fa fa-angle-down');
            }
            arrow.removeClass('anim-turn90').removeClass('anim-turn-90');
        });
    });

    //Collapse button
    $('#sidebar.sidebar-collapsed #sidebar-collapse > i').attr('class', 'fa fa-angle-double-right');
    $('#sidebar-collapse').click(function(){
        $('#sidebar').toggleClass('sidebar-collapsed');
        if ($('#sidebar').hasClass('sidebar-collapsed')) {
            $('#sidebar-collapse > i').attr('class', 'fa fa-angle-double-right');
            $.cookie('sidebar-collapsed', 'true');
            $("#sidebar ul.nav-list").parent('.slimScrollDiv').replaceWith($("#sidebar ul.nav-list"));
        } else {
            $('#sidebar-collapse > i').attr('class', 'fa fa-angle-double-left');
            $.cookie('sidebar-collapsed', 'false');
            scrollableSidebar();
        }
    });

    $('#sidebar').on('show.bs.collapse', function () {
        if ($(this).hasClass('sidebar-collapsed')) {
            $(this).removeClass('sidebar-collapsed');
        }
    });

    //Search Form
    $('#sidebar .search-form').click(function(){
        $('#sidebar .search-form input[type="text"]').focus();
    });
    $('#sidebar .nav > li.active > a > .arrow').removeClass('fa-angle-right').addClass('fa-angle-down');

    //---------------- Horizontal Menu -------------------------------//
    if ($('#nav-horizontal')) {
        var horizontalNavHandler = function() {
            var w = $(window).width();
            if (w > 979) {
                $('#nav-horizontal').removeClass('nav-xs');
                $('#nav-horizontal .arrow').removeClass('fa-angle-right').removeClass('fa-angle-down').addClass('fa-caret-down');
            }
            else {
                $('#nav-horizontal').addClass('nav-xs');
                $('#nav-horizontal .arrow').removeClass('fa-caret-down').addClass('fa-angle-right');
            }
        }
        $(window).resize(function(){
            horizontalNavHandler();
        });
        horizontalNavHandler();
    }

    //Horizontal menu dropdown
    $('#nav-horizontal a.dropdown-toggle').click(function() {
        var submenu = $(this).next('.dropdown-menu');
        var arrow = $(this).children('.arrow');
        if ($('#nav-horizontal.nav-xs').size() > 0) {
            if (arrow.hasClass('fa-angle-right')) {
                arrow.addClass('anim-turn90');
            }
            else {
                arrow.addClass('anim-turn-90');
            }
        }
        if ($('#nav-horizontal.nav-xs').size() == 0) {
            $('#nav-horizontal > li > .dropdown-menu').not(submenu).slideUp(400);
        }
        submenu.slideToggle(400, function(){
            if ($('#nav-horizontal.nav-xs').size() > 0) {
                if($(this).is(":hidden")) {
                    arrow.attr('class', 'arrow fa fa-angle-right');
                } else {
                    arrow.attr('class', 'arrow fa fa-angle-down');
                }
                arrow.removeClass('anim-turn90').removeClass('anim-turn-90');
            }
        });
    });

    //------------------ Theme Setting --------------------//
    //Toggle showing theme setting box
    $('#theme-setting > a').click(function(){
        $(this).next().animate({width:'toggle'}, 500, function(){
            if($(this).is(":hidden")) {
                $('#theme-setting > a > i').attr('class', 'fa fa-gears fa-2x');
            } else {
                $('#theme-setting > a > i').attr('class', 'fa fa-times fa-2x');
            }
        });
        $(this).next().css('display', 'inline-block');
    });
    //Change skin and colors
    $('#theme-setting ul.colors a').click(function(){
        var parent_li = $(this).parent().get(0);
        var parent_ul = $(parent_li).parent().get(0);
        var target = $(parent_ul).data('target');
        var prefix = $(parent_ul).data('prefix');
        var color = $(this).attr('class');
        var regx = new RegExp('\\b' + prefix + '.*\\b', 'g');
        $(parent_ul).children('li').removeClass('active');
        $(parent_li).addClass('active');
        //Remove current skin class if it has
        if ($(target).attr('class') != undefined) {
            $(target).attr('class', $(target).attr('class').replace(regx, '').trim());
        }
        $(target).addClass(prefix + color)
        if (target == 'body') {
            var parent_ul_li = $(parent_ul).parent().get(0);
            var next_li = $(parent_ul_li).nextAll('li:lt(2)');
            $(next_li).find('li.active').removeClass('active');
            $(next_li).find('a.' + color).parent().addClass('active');
            //Remove static color class from Navbar & Sidebar 
            $('#navbar').attr('class', $('#navbar').attr('class').replace(/\bnavbar-.*\b/g, '').trim());
            $('#main-container').attr('class', $('#main-container').attr('class').replace(/\bsidebar-.*\b/g, '').trim());
        }
        $.cookie(prefix + 'color', color);
    });
    //Handel selected color
    var theme_colors = ["blue", "red", "green", "orange", "yellow", "pink", "magenta", "gray", "black"];
    $.each(theme_colors, function(k, v) {
        if ($('body').hasClass('skin-' + v)) {
            $('#theme-setting ul.colors > li').removeClass('active');
            $('#theme-setting ul.colors > li:has(a.'+ v +')').addClass('active');
        }
    });

    $.each(theme_colors, function(k, v) {
        if ($('#navbar').hasClass('navbar-' + v)) {
            $('#theme-setting ul[data-prefix="navbar-"] > li').removeClass('active');
            $('#theme-setting ul[data-prefix="navbar-"] > li:has(a.'+ v +')').addClass('active');
        }

        if ($('#main-container').hasClass('sidebar-' + v)) {
            $('#theme-setting ul[data-prefix="sidebar-"] > li').removeClass('active');
            $('#theme-setting ul[data-prefix="sidebar-"] > li:has(a.'+ v +')').addClass('active');
        }
    });
    //Handle fixed navbar & sidebar
    if ($('#sidebar').hasClass('sidebar-fixed')) {
        $('#theme-setting > ul > li > a[data-target="sidebar"] > i').attr('class', 'fa fa-check-square-o green')
    }
    if ($('#navbar').hasClass('navbar-fixed')) {
        $('#theme-setting > ul > li > a[data-target="navbar"] > i').attr('class', 'fa fa-check-square-o green')
    }
    $('#theme-setting > ul > li > a').click(function(){
        var target = $(this).data('target');
        var check = $(this).children('i');
        if (check.hasClass('fa-square-o')) {
            check.attr('class', 'fa fa-check-square-o green');
            $('#' + target).addClass(target + '-fixed');
            $.cookie(target + '-fixed', 'true');
        } else {
            check.attr('class', 'fa fa-square-o');
            $('#' + target).removeClass(target + '-fixed');
            $.cookie(target + '-fixed', 'false');
        }
        if (target == "sidebar") {
            if (check.hasClass('fa-square-o')) {
                $("#sidebar ul.nav-list").parent('.slimScrollDiv').replaceWith($("#sidebar ul.nav-list"));
            }
            scrollableSidebar();
        }
    });

    //-------------------------- Boxes -----------------------------//
    $('.box .box-tool > a').click(function(e) {
        if ($(this).data('action') == undefined) {
            return;
        }
        var action = $(this).data('action');
        var btn = $(this);
        switch (action) {
            case 'collapse':
                $(btn).children('i').addClass('anim-turn180');
                $(this).parents('.box').children('.box-content').slideToggle(500, function(){
                    if($(this).is(":hidden")) {
                        $(btn).children('i').attr('class', 'fa fa-chevron-down');
                    } else {
                        $(btn).children('i').attr('class', 'fa fa-chevron-up');
                    }
                });
                break;
            case 'close':
                $(this).parents('.box').fadeOut(500, function(){
                    $(this).parent().remove();
                })
                break;
            case 'config':
                $('#' + $(this).data('modal')).modal('show');
                break;
        }
        e.preventDefault();
    });

    //-------------------------- Mail Page -----------------------------//
    //Collapse and Uncollapse
    $('.mail-messages .msg-collapse > a').click(function(e){
        $(this).children('i').addClass('anim-turn180');
        $(this).parents('li').find('.mail-msg-container').slideToggle(500, function(){
            var i = $(this).parents('li').find('.msg-collapse > a').children('i');
            if($(this).is(':hidden')) {
                $(i).attr('class', 'fa fa-chevron-down');
            } else {
                $(i).attr('class', 'fa fa-chevron-up');
            }
        });
    });

    //Star and Unstar
    $('.mail-content i.fa-star').click(function(){
        $(this).toggleClass('starred');
    });

    //Check All and Uncheck All message in mail list
    $('.mail-toolbar > li:first-child > input[type="checkbox"]').change(function() {
        var check = false;
        if ($(this).is(':checked')) {
            check = true;
        }
        $(this).parents('.mail-content').find('.mail-list .ml-left > input[type="checkbox"]').prop('checked', check);
        var li = $(this).parents('.mail-content').find('.mail-list > li');
        if (check) {
            $(li).addClass('checked');
        }
        else {
            $(li).removeClass('checked');
        }
    });

    //Add .checked class to selected rows
    $('.mail-list .ml-left > input[type="checkbox"]').change(function(){
        if ($(this).is(':checked')) {
            $(this).parents('li').addClass('checked');
        }
        else {
            $(this).parents('li').removeClass('checked');
        }
    })

    //--------------------- Go Top Button ---------------------//
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('#btn-scrollup').fadeIn();
        } else {
            $('#btn-scrollup').fadeOut();
        }
    });
    $('#btn-scrollup').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });

    //---------------- Active Tile --------------------//
    if ($('.tile-active').size() > 0) {
        var tileMoveDuration = 1500;
        var tileDefaultStop = 5000;

        var tileGoUp = function(el, stop1, stop2, height) {
            $(el).children('.tile').animate({top: '-='+ height +'px'}, tileMoveDuration);
            setTimeout(function(){ tileGoDown(el, stop1, stop2, height); }, stop2 + tileMoveDuration);
        }

        var tileGoDown = function(el, stop1, stop2, height) {
            $(el).children('.tile').animate({top: '+='+ height +'px'}, tileMoveDuration);
            setTimeout(function(){ tileGoUp(el, stop1, stop2, height); }, stop1 + tileMoveDuration);
        }

        $('.tile-active').each(function(index, el){
            var tile1, tile2, stop1, stop2, height;

            tile1 = $(this).children('.tile').first();
            tile2 = $(this).children('.tile').last();
            stop1 = $(tile1).data('stop');
            stop2 = $(tile2).data('stop');
            height = $(tile1).outerHeight();

            if (stop1 == undefined) {
                stop1 = tileDefaultStop;
            }
            if (stop2 == undefined) {
                stop2 = tileDefaultStop;
            }

            setTimeout(function(){ tileGoUp(el, stop1, stop2, height); }, stop1);
        });
    }

    //------------------------- Table --------------------------//
    //Check all and uncheck all table rows
    $('.table > thead > tr > th:first-child > input[type="checkbox"]').change(function() {
        var check = false;
        if ($(this).is(':checked')) {
            check = true;
        }
        $(this).parents('thead').next().find('tr > td:first-child > input[type="checkbox"]').prop('checked', check);
    })

    $('.table > tbody > tr > td:first-child > input[type="checkbox"]').change(function() {
        var check = false;
        if ($(this).is(':checked')) {
            check = true;
        }
        if (!check) {
            $('.table > thead > tr > th:first-child > input[type="checkbox"]').prop('checked', false);
        }
    })

    //------------------------ Data Table -----------------------//
    
    if (jQuery().dataTable) {
        $('#table1').dataTable({
            "aLengthMenu": [
                [10, 15, 25, 50, 100, -1],
                [10, 15, 25, 50, 100, "All"]
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
            "aoColumnDefs": [{
                'bSortable': false,
                'aTargets': [0]
            }]
        });
    }

    //----------------------- Chosen Select ---------------------//
    if (jQuery().chosen) {
        $(".chosen").chosen({
            no_results_text: "Oops, nothing found!",
            width: "100%"
        });

        $(".chosen-with-diselect").chosen({
            allow_single_deselect: true,
            width: "100%"
        });
    }
    
    //--------------- Password Strength Indicator ----------------//
    if (jQuery().pwstrength) {
        $('input[data-action="pwindicator"]').pwstrength();
    }

    //----------------- Bootstrap Dual Listbox -------------------//
    if (jQuery().bootstrapDualListbox) {
        $('select[data-action="duallistbox"]').bootstrapDualListbox();
    }

    //----------------------- Colorpicker -------------------------//
    if (jQuery().colorpicker) {
        $('.colorpicker-default').colorpicker({
            format: 'hex'
        });
        $('.colorpicker-rgba').colorpicker();
    }

    //----------------------- Time Picker -------------------------//
    if (jQuery().timepicker) {
        $('.timepicker-default').timepicker();
        $('.timepicker-24').timepicker({
            minuteStep: 1,
            showSeconds: true,
            showMeridian: false
        });
    }
    
    //------------------------ Date Picker ------------------------//
    if (jQuery().datepicker) {
        $('.date-picker').datepicker();
    }

    //------------------------ Date Range Picker ------------------------//
    if (jQuery().daterangepicker) {
        //Date Range Picker
        $('.date-range').daterangepicker();
    }

    //------------------------ Bootstrap WYSIWYG Editor -----------------//
    if (jQuery().wysihtml5) {
        $('.wysihtml5').wysihtml5();
    }

    //------------------------------ Form validation --------------------------//
    if (jQuery().validate) {
        var removeSuccessClass = function(e) {
            $(e).closest('.form-group').removeClass('has-success');
        }
        var $validator = $('#validation-form').validate({
            errorElement: 'span', //default input error message container
            errorClass: 'help-block', // default input error message class
            errorPlacement: function(error, element) {
                if(element.parent('.input-group').length) {
                    error.insertAfter(element.parent());
                } else {
                    error.insertAfter(element);
                }
            },
            focusInvalid: false, // do not focus the last invalid input
            ignore: "",

            invalidHandler: function (event, validator) { //display error alert on form submit              
                
            },

            highlight: function (element) { // hightlight error inputs
                $(element).closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
            },

            unhighlight: function (element) { // revert the change dony by hightlight
                $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
                setTimeout(function(){removeSuccessClass(element);}, 3000);
            },

            success: function (label) {
                label.closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
            }
        });
    }

    //---------------------------- prettyPhoto -------------------------------//
    if (jQuery().prettyPhoto) {
        $(".gallery a[rel^='prettyPhoto']").prettyPhoto({social_tools:'', hideflash: true});
    }

});
$(function() {

    //---------------------- Gritter Notification --------------//
    $('#gritter-sticky').click(function () {
        var unique_id = $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'This is a sticky notice!',
            // (string | mandatory) the text inside the notification
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.',
            // (string | optional) the image to display on the left
            image: './img/demo/avatar/avatar1.jpg',
            // (bool | optional) if you want it to fade out on its own or just sit there
            sticky: true,
            // (int | optional) the time you want it to be alive for before fading out
            time: '',
            // (string | optional) the class name you want to apply to that specific message
            class_name: 'my-sticky-class'
        });
        return false;
    });

    $('#gritter-regular').click(function () {

        $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'This is a regular notice!',
            // (string | mandatory) the text inside the notification
            text: 'This will fade out after a certain amount of time. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.',
            // (string | optional) the image to display on the left
            image: './img/demo/avatar/avatar1.jpg',
            // (bool | optional) if you want it to fade out on its own or just sit there
            sticky: false,
            // (int | optional) the time you want it to be alive for before fading out
            time: ''
        });

        return false;

    });

    $('#gritter-max').click(function () {

        $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'This is a notice with a max of 3 on screen at one time!',
            // (string | mandatory) the text inside the notification
            text: 'This will fade out after a certain amount of time. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.',
            // (string | optional) the image to display on the left
            image: './img/demo/avatar/avatar1.jpg',
            // (bool | optional) if you want it to fade out on its own or just sit there
            sticky: false,
            // (function) before the gritter notice is opened
            before_open: function () {
                if ($('.gritter-item-wrapper').length == 3) {
                    // Returning false prevents a new gritter from opening
                    return false;
                }
            }
        });
        return false;
    });

    $('#gritter-without-image').click(function () {
        $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'This is a notice without an image!',
            // (string | mandatory) the text inside the notification
            text: 'This will fade out after a certain amount of time. Vivamus eget tincidunt velit. Cum sociis natoque penatibus et <a href="#" style="color:#ccc">magnis dis parturient</a> montes, nascetur ridiculus mus.'
        });

        return false;
    });

    $('#gritter-light').click(function () {

        $.gritter.add({
            // (string | mandatory) the heading of the notification
            title: 'This is a light notification',
            // (string | mandatory) the text inside the notification
            text: 'Just add a "gritter-light" class_name to your $.gritter.add or globally to $.gritter.options.class_name',
            class_name: 'gritter-light'
        });

        return false;
    });

    $("#gritter-remove-all").click(function () {

        $.gritter.removeAll();
        return false;

    });


    //------------------- Slider -------------------//
    if (jQuery().slider) {
        // basic
        $(".slider-basic").slider(); // basic sliders

        // snap inc
        $("#slider-snap-inc").slider({
            value: 100,
            min: 0,
            max: 1000,
            step: 100,
            slide: function (event, ui) {
                $("#slider-snap-inc-amount").text("$" + ui.value);
            }
        });

        $("#slider-snap-inc-amount").text("$" + $("#slider-snap-inc").slider("value"));

        // range slider
        $("#slider-range").slider({
            range: true,
            min: 0,
            max: 500,
            values: [75, 300],
            slide: function (event, ui) {
                $("#slider-range-amount").text("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });

        $("#slider-range-amount").text("$" + $("#slider-range").slider("values", 0) + " - $" + $("#slider-range").slider("values", 1));

        //range max

        $("#slider-range-max").slider({
            range: "max",
            min: 1,
            max: 10,
            value: 2,
            slide: function (event, ui) {
                $("#slider-range-max-amount").text(ui.value);
            }
        });

        $("#slider-range-max-amount").text($("#slider-range-max").slider("value"));

        // range min
        $("#slider-range-min").slider({
            range: "min",
            value: 37,
            min: 1,
            max: 700,
            slide: function (event, ui) {
                $("#slider-range-min-amount").text("$" + ui.value);
            }
        });

        $("#slider-range-min-amount").text("$" + $("#slider-range-min").slider("value"));

        // setup graphic EQ
        $("#slider-eq > span").each(function () {
            // read initial values from markup and remove that
            var value = parseInt($(this).text(), 10);
            $(this).empty().slider({
                value: value,
                range: "min",
                animate: true,
                orientation: "vertical"
            });
        });

        // vertical slider
        $("#slider-vertical").slider({
            orientation: "vertical",
            range: "min",
            min: 0,
            max: 100,
            value: 60,
            slide: function (event, ui) {
                $("#slider-vertical-amount").text(ui.value);
            }
        });
        $("#slider-vertical-amount").text($("#slider-vertical").slider("value"));

        // vertical range sliders
        $("#slider-range-vertical").slider({
            orientation: "vertical",
            range: true,
            values: [17, 67],
            slide: function (event, ui) {
                $("#slider-range-vertical-amount").text("$" + ui.values[0] + " - $" + ui.values[1]);
            }
        });

        $("#slider-range-vertical-amount").text("$" + $("#slider-range-vertical").slider("values", 0) + " - $" + $("#slider-range-vertical").slider("values", 1));

        // color preview
        $(".slider-color-preview").slider({
            range: "min",
            value: 106,
            min: 1,
            max: 700
        });
    }

    //--------------------- Knob ------------------------//
    if (jQuery().knob) {
        $(".knob").knob({
            'dynamicDraw': true,
            'thickness': 0.2,
            'tickColorizeValues': true,
            'skin': 'tron'
        });

        $(".circle-stats-item > input").knob({
            'readOnly': true,
            'width': 120,
            'height': 120,
            'dynamicDraw': true,
            'thickness': 0.2,
            'tickColorizeValues': true,
            'skin':'tron'
        });
    }

    //----------------------- Tags Input -------------------------//
    if (jQuery().tagsInput) {
        $('#tag-input-1').tagsInput({
            width: 'auto',
            'onAddTag': function (tag) {
                alert('New tag added: ' + tag);
            },
        });
        $('#tag-input-2').tagsInput({
            width: 240
        });
    }

    //------------------------ Date Range Picker ------------------------//
    if (jQuery().daterangepicker) {
        $('#form-date-range').daterangepicker({
            ranges: {
                'Today': ['today', 'today'],
                'Yesterday': ['yesterday', 'yesterday'],
                'Last 7 Days': [Date.today().add({
                    days: -6
                }), 'today'],
                'Last 30 Days': [Date.today().add({
                    days: -29
                }), 'today'],
                'This Month': [Date.today().moveToFirstDayOfMonth(), Date.today().moveToLastDayOfMonth()],
                'Last Month': [Date.today().moveToFirstDayOfMonth().add({
                    months: -1
                }), Date.today().moveToFirstDayOfMonth().add({
                    days: -1
                })]
            },
            opens: 'right',
            format: 'MM/dd/yyyy',
            separator: ' to ',
            startDate: Date.today().add({
                days: -29
            }),
            endDate: Date.today(),
            minDate: '01/01/2012',
            maxDate: '12/31/2014',
            locale: {
                applyLabel: 'Submit',
                fromLabel: 'From',
                toLabel: 'To',
                customRangeLabel: 'Custom Range',
                daysOfWeek: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                firstDay: 1
            },
            showWeekNumbers: true,
            buttonClasses: ['btn-danger']
        },

        function (start, end) {
            $('#form-date-range span').html(start.toString('MMMM d, yyyy') + ' - ' + end.toString('MMMM d, yyyy'));
        });

        $('#form-date-range span').html(Date.today().add({
            days: -29
        }).toString('MMMM d, yyyy') + ' - ' + Date.today().toString('MMMM d, yyyy'));
    }

    //-------------------------- Clock Face ------------------------------//
    if (jQuery().clockface) {
        $('#clockface_1').clockface();

        $('#clockface_2').clockface({
            format: 'HH:mm',
            trigger: 'manual'
        });

        $('#clockface_2_toggle-btn').click(function (e) {
            e.stopPropagation();
            $('#clockface_2').clockface('toggle');
        });

        $('#clockface_3').clockface({
            format: 'H:mm'
        }).clockface('show', '14:30');
    }

    //----------------------------- Form Wizard -------------------------//
    if (jQuery().bootstrapWizard) {
        $('#form-wizard-1').bootstrapWizard({
            'nextSelector': '.button-next',
            'previousSelector': '.button-previous',
            onTabClick: function (tab, navigation, index) {
                alert('on tab click disabled');
                return false;
            },
            onNext: function (tab, navigation, index) {
                var total = navigation.find('li').length;
                var current = index + 1;
                // set wizard title
                $('.step-title', $('#form-wizard-1')).text('Step ' + (index + 1) + ' of ' + total);
                // set done steps
                jQuery('li', $('#form-wizard-1')).removeClass("done");
                var li_list = navigation.find('li');
                for (var i = 0; i < index; i++) {
                    jQuery(li_list[i]).addClass("done");
                }

                if (current == 1) {
                    $('#form-wizard-1').find('.button-previous').hide();
                } else {
                    $('#form-wizard-1').find('.button-previous').show();
                }

                if (current >= total) {
                    $('#form-wizard-1').find('.button-next').hide();
                    $('#form-wizard-1').find('.button-submit').show();
                } else {
                    $('#form-wizard-1').find('.button-next').show();
                    $('#form-wizard-1').find('.button-submit').hide();
                }
                var $percent = (current / total) * 100;
                $('#form-wizard-1').find('.progress-bar').css('width', $percent+'%');

                $('html, body').animate({scrollTop: $("#form-wizard-1").offset().top}, 900);
            },
            onPrevious: function (tab, navigation, index) {
                var total = navigation.find('li').length;
                var current = index + 1;
                // set wizard title
                $('.step-title', $('#form-wizard-1')).text('Step ' + (index + 1) + ' of ' + total);
                // set done steps
                jQuery('li', $('#form-wizard-1')).removeClass("done");
                var li_list = navigation.find('li');
                for (var i = 0; i < index; i++) {
                    jQuery(li_list[i]).addClass("done");
                }

                if (current == 1) {
                    $('#form-wizard-1').find('.button-previous').hide();
                } else {
                    $('#form-wizard-1').find('.button-previous').show();
                }

                if (current >= total) {
                    $('#form-wizard-1').find('.button-next').hide();
                    $('#form-wizard-1').find('.button-submit').show();
                } else {
                    $('#form-wizard-1').find('.button-next').show();
                    $('#form-wizard-1').find('.button-submit').hide();
                }
                var $percent = (current / total) * 100;
                $('#form-wizard-1').find('.progress-bar').css('width', $percent+'%');

                $('html, body').animate({scrollTop: $("#form-wizard-1").offset().top}, 900);
            },
            onTabShow: function (tab, navigation, index) {
                var total = navigation.find('li').length;
                var current = index + 1;
                var $percent = (current / total) * 100;
                $('#form-wizard-1').find('.progress-bar').css({
                    width: $percent + '%'
                });
            }
        });

        $('#form-wizard-1').find('.button-previous').hide();
        $('#form-wizard-1 .button-submit').click(function () {
            alert('Finished!');
        }).hide();


        //Validation of wizard form
        if (jQuery().validate) {
            var removeSuccessClass = function(e) {
                $(e).closest('.form-group').removeClass('has-success');
            }
            var jq_validator = $('#wizard-validation').validate({
                errorElement: 'span', //default input error message container
                errorClass: 'help-block', // default input error message class
                errorPlacement: function(error, element) {
                    if(element.parent('.input-group').length) {
                        error.insertAfter(element.parent());
                    } else {
                        error.insertAfter(element);
                    }
                },
                focusInvalid: false, // do not focus the last invalid input

                invalidHandler: function (event, validator) { //display error alert on form submit              
                    
                },

                highlight: function (element) { // hightlight error inputs
                    $(element).closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
                },

                unhighlight: function (element) { // revert the change dony by hightlight
                    $(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
                    setTimeout(function(){removeSuccessClass(element);}, 3000);
                },

                success: function (label) {
                    label.closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
                }
            });
        }
        //Look at onNext function to see how add validation to wizard
        $('#form-wizard-2').bootstrapWizard({
            'nextSelector': '.button-next',
            'previousSelector': '.button-previous',
            onTabClick: function (tab, navigation, index) {
                alert('on tab click disabled');
                return false;
            },
            onNext: function (tab, navigation, index) {
                var valid = $("#wizard-validation").valid();
                if(!valid) {
                    jq_validator.focusInvalid();
                    return false;
                }

                var total = navigation.find('li').length;
                var current = index + 1;
                // set wizard title
                $('.step-title', $('#form-wizard-2')).text('Step ' + (index + 1) + ' of ' + total);
                // set done steps
                jQuery('li', $('#form-wizard-2')).removeClass("done");
                var li_list = navigation.find('li');
                for (var i = 0; i < index; i++) {
                    jQuery(li_list[i]).addClass("done");
                }

                if (current == 1) {
                    $('#form-wizard-2').find('.button-previous').hide();
                } else {
                    $('#form-wizard-2').find('.button-previous').show();
                }

                if (current >= total) {
                    $('#form-wizard-2').find('.button-next').hide();
                    $('#form-wizard-2').find('.button-submit').show();
                } else {
                    $('#form-wizard-2').find('.button-next').show();
                    $('#form-wizard-2').find('.button-submit').hide();
                }
                var $percent = (current / total) * 100;
                $('#form-wizard-2').find('.progress-bar').css('width', $percent+'%');

                $('html, body').animate({scrollTop: $("#form-wizard-2").offset().top}, 900);
            },
            onPrevious: function (tab, navigation, index) {
                var total = navigation.find('li').length;
                var current = index + 1;
                // set wizard title
                $('.step-title', $('#form-wizard-2')).text('Step ' + (index + 1) + ' of ' + total);
                // set done steps
                jQuery('li', $('#form-wizard-2')).removeClass("done");
                var li_list = navigation.find('li');
                for (var i = 0; i < index; i++) {
                    jQuery(li_list[i]).addClass("done");
                }

                if (current == 1) {
                    $('#form-wizard-2').find('.button-previous').hide();
                } else {
                    $('#form-wizard-2').find('.button-previous').show();
                }

                if (current >= total) {
                    $('#form-wizard-2').find('.button-next').hide();
                    $('#form-wizard-2').find('.button-submit').show();
                } else {
                    $('#form-wizard-2').find('.button-next').show();
                    $('#form-wizard-2').find('.button-submit').hide();
                }
                var $percent = (current / total) * 100;
                $('#form-wizard-2').find('.progress-bar').css('width', $percent+'%');

                $('html, body').animate({scrollTop: $("#form-wizard-2").offset().top}, 900);
            },
            onTabShow: function (tab, navigation, index) {
                var total = navigation.find('li').length;
                var current = index + 1;
                var $percent = (current / total) * 100;
                $('#form-wizard-2').find('.progress-bar').css({
                    width: $percent + '%'
                });
            }
        });

        $('#form-wizard-2').find('.button-previous').hide();
        $('#form-wizard-2 .button-submit').click(function () {
            alert('Finished!');
        }).hide();
    }

    //----------------------------- Charts -----------------------------------//
    if (jQuery().plot) {
        // used by plot functions
        var data = [];
        var totalPoints = 250;

        // random data generator for plot charts
        function getRandomData() {
            if (data.length > 0) data = data.slice(1);
            // do a random walk
            while (data.length < totalPoints) {
                var prev = data.length > 0 ? data[data.length - 1] : 50;
                var y = prev + Math.random() * 10 - 5;
                if (y < 0) y = 0;
                if (y > 100) y = 100;
                data.push(y);
            }
            // zip the generated y values with the x values
            var res = [];
            for (var i = 0; i < data.length; ++i) res.push([i, data[i]])
            return res;
        }

        //Basic Chart
        function chart1() {
            if ($("#chart_1").size() == 0) {
                return;
            }
            var d1 = [];
            for (var i = 0; i < Math.PI * 2; i += 0.25)
            d1.push([i, Math.sin(i)]);

            var d2 = [];
            for (var i = 0; i < Math.PI * 2; i += 0.25)
            d2.push([i, Math.cos(i)]);

            var d3 = [];
            for (var i = 0; i < Math.PI * 2; i += 0.1)
            d3.push([i, Math.tan(i)]);

            $.plot($("#chart_1"), [{
                label: "sin(x)",
                data: d1
            }, {
                label: "cos(x)",
                data: d2
            }, {
                label: "tan(x)",
                data: d3
            }], {
                series: {
                    lines: {
                        show: true
                    },
                    points: {
                        show: true
                    }
                },
                xaxis: {
                    ticks: [0, [Math.PI / 2, "\u03c0/2"],
                        [Math.PI, "\u03c0"],
                        [Math.PI * 3 / 2, "3\u03c0/2"],
                        [Math.PI * 2, "2\u03c0"]
                    ]
                },
                yaxis: {
                    ticks: 10,
                    min: -2,
                    max: 2
                },
                grid: {
                    backgroundColor: {
                        colors: ["#fff", "#eee"]
                    }
                }
            });

        }

        //Interactive Chart
        function chart2() {
            if ($("#chart_2").size() == 0) {
                return;
            }
            function randValue() {
                return (Math.floor(Math.random() * (1 + 40 - 20))) + 20;
            }
            var pageviews = [
                [1, randValue()],
                [2, randValue()],
                [3, 2 + randValue()],
                [4, 3 + randValue()],
                [5, 5 + randValue()],
                [6, 10 + randValue()],
                [7, 15 + randValue()],
                [8, 20 + randValue()],
                [9, 25 + randValue()],
                [10, 30 + randValue()],
                [11, 35 + randValue()],
                [12, 25 + randValue()],
                [13, 15 + randValue()],
                [14, 20 + randValue()],
                [15, 45 + randValue()],
                [16, 50 + randValue()],
                [17, 65 + randValue()],
                [18, 70 + randValue()],
                [19, 85 + randValue()],
                [20, 80 + randValue()],
                [21, 75 + randValue()],
                [22, 80 + randValue()],
                [23, 75 + randValue()],
                [24, 70 + randValue()],
                [25, 65 + randValue()],
                [26, 75 + randValue()],
                [27, 80 + randValue()],
                [28, 85 + randValue()],
                [29, 90 + randValue()],
                [30, 95 + randValue()]
            ];
            var visitors = [
                [1, randValue() - 5],
                [2, randValue() - 5],
                [3, randValue() - 5],
                [4, 6 + randValue()],
                [5, 5 + randValue()],
                [6, 20 + randValue()],
                [7, 25 + randValue()],
                [8, 36 + randValue()],
                [9, 26 + randValue()],
                [10, 38 + randValue()],
                [11, 39 + randValue()],
                [12, 50 + randValue()],
                [13, 51 + randValue()],
                [14, 12 + randValue()],
                [15, 13 + randValue()],
                [16, 14 + randValue()],
                [17, 15 + randValue()],
                [18, 15 + randValue()],
                [19, 16 + randValue()],
                [20, 17 + randValue()],
                [21, 18 + randValue()],
                [22, 19 + randValue()],
                [23, 20 + randValue()],
                [24, 21 + randValue()],
                [25, 14 + randValue()],
                [26, 24 + randValue()],
                [27, 25 + randValue()],
                [28, 26 + randValue()],
                [29, 27 + randValue()],
                [30, 31 + randValue()]
            ];

            var plot = $.plot($("#chart_2"), [{
                data: pageviews,
                label: "Unique Visits"
            }, {
                data: visitors,
                label: "Page Views"
            }], {
                series: {
                    lines: {
                        show: true,
                        lineWidth: 2,
                        fill: true,
                        fillColor: {
                            colors: [{
                                opacity: 0.05
                            }, {
                                opacity: 0.01
                            }]
                        }
                    },
                    points: {
                        show: true
                    },
                    shadowSize: 2
                },
                grid: {
                    hoverable: true,
                    clickable: true,
                    tickColor: "#eee",
                    borderWidth: 0
                },
                colors: ["#FCB322", "#A5D16C", "#52e136"],
                xaxis: {
                    ticks: 11,
                    tickDecimals: 0
                },
                yaxis: {
                    ticks: 11,
                    tickDecimals: 0
                }
            });


            function showTooltip(x, y, contents) {
                $('<div id="tooltip">' + contents + '</div>').css({
                    position: 'absolute',
                    display: 'none',
                    top: y + 5,
                    left: x + 15,
                    border: '1px solid #333',
                    padding: '4px',
                    color: '#fff',
                    'border-radius': '3px',
                    'background-color': '#333',
                    opacity: 0.80
                }).appendTo("body").fadeIn(200);
            }

            var previousPoint = null;
            $("#chart_2").bind("plothover", function (event, pos, item) {
                $("#x").text(pos.x.toFixed(2));
                $("#y").text(pos.y.toFixed(2));

                if (item) {
                    if (previousPoint != item.dataIndex) {
                        previousPoint = item.dataIndex;

                        $("#tooltip").remove();
                        var x = item.datapoint[0].toFixed(2),
                            y = item.datapoint[1].toFixed(2);

                        showTooltip(item.pageX, item.pageY, item.series.label + " of " + x + " = " + y);
                    }
                } else {
                    $("#tooltip").remove();
                    previousPoint = null;
                }
            });
        }

        //Tracking Curves
        function chart3() {
            if ($("#chart_3").size() == 0) {
                return;
            }
            //tracking curves:

            var sin = [],
                cos = [];
            for (var i = 0; i < 14; i += 0.1) {
                sin.push([i, Math.sin(i)]);
                cos.push([i, Math.cos(i)]);
            }

            plot = $.plot($("#chart_3"), [{
                data: sin,
                label: "sin(x) = -0.00"
            }, {
                data: cos,
                label: "cos(x) = -0.00"
            }], {
                series: {
                    lines: {
                        show: true
                    }
                },
                crosshair: {
                    mode: "x"
                },
                grid: {
                    hoverable: true,
                    autoHighlight: false
                },
                colors: ["#FCB322", "#A5D16C", "#52e136"],
                yaxis: {
                    min: -1.2,
                    max: 1.2
                }
            });

            var legends = $("#chart_3 .legendLabel");
            legends.each(function () {
                // fix the widths so they don't jump around
                $(this).css('width', $(this).width());
            });

            var updateLegendTimeout = null;
            var latestPosition = null;

            function updateLegend() {
                updateLegendTimeout = null;

                var pos = latestPosition;

                var axes = plot.getAxes();
                if (pos.x < axes.xaxis.min || pos.x > axes.xaxis.max || pos.y < axes.yaxis.min || pos.y > axes.yaxis.max) return;

                var i, j, dataset = plot.getData();
                for (i = 0; i < dataset.length; ++i) {
                    var series = dataset[i];

                    // find the nearest points, x-wise
                    for (j = 0; j < series.data.length; ++j)
                    if (series.data[j][0] > pos.x) break;

                    // now interpolate
                    var y, p1 = series.data[j - 1],
                        p2 = series.data[j];
                    if (p1 == null) y = p2[1];
                    else if (p2 == null) y = p1[1];
                    else y = p1[1] + (p2[1] - p1[1]) * (pos.x - p1[0]) / (p2[0] - p1[0]);

                    legends.eq(i).text(series.label.replace(/=.*/, "= " + y.toFixed(2)));
                }
            }

            $("#chart_3").bind("plothover", function (event, pos, item) {
                latestPosition = pos;
                if (!updateLegendTimeout) updateLegendTimeout = setTimeout(updateLegend, 50);
            });
        }

        //Dynamic Chart
        function chart4() {
            if ($("#chart_4").size() == 0) {
                return;
            }
            //server load
            var options = {
                series: {
                    shadowSize: 1
                },
                lines: {
                    show: true,
                    lineWidth: 0.5,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.1
                        }, {
                            opacity: 1
                        }]
                    }
                },
                yaxis: {
                    min: 0,
                    max: 100,
                    tickFormatter: function (v) {
                        return v + "%";
                    }
                },
                xaxis: {
                    show: false
                },
                colors: ["#6ef146"],
                grid: {
                    tickColor: "#a8a3a3",
                    borderWidth: 0
                }
            };

            var updateInterval = 30;
            var plot = $.plot($("#chart_4"), [getRandomData()], options);

            function update() {
                plot.setData([getRandomData()]);
                plot.draw();
                setTimeout(update, updateInterval);
            }
            update();
        }

        //bars with controls
        function chart5() {
            if ($("#chart_5").size() == 0) {
                return;
            }
            var d1 = [];
            for (var i = 0; i <= 10; i += 1)
            d1.push([i, parseInt(Math.random() * 30)]);

            var d2 = [];
            for (var i = 0; i <= 10; i += 1)
            d2.push([i, parseInt(Math.random() * 30)]);

            var d3 = [];
            for (var i = 0; i <= 10; i += 1)
            d3.push([i, parseInt(Math.random() * 30)]);

            var stack = 0,
                bars = true,
                lines = false,
                steps = false;

            function plotWithOptions() {
                $.plot($("#chart_5"), [d1, d2, d3], {
                    series: {
                        stack: stack,
                        lines: {
                            show: lines,
                            fill: true,
                            steps: steps
                        },
                        bars: {
                            show: bars,
                            barWidth: 0.6
                        }
                    }
                });
            }

            $(".stackControls input").click(function (e) {
                e.preventDefault();
                stack = $(this).val() == "With stacking" ? true : null;
                plotWithOptions();
            });
            $(".graphControls input").click(function (e) {
                e.preventDefault();
                bars = $(this).val().indexOf("Bars") != -1;
                lines = $(this).val().indexOf("Lines") != -1;
                steps = $(this).val().indexOf("steps") != -1;
                plotWithOptions();
            });

            plotWithOptions();
        }

        //graph
        function graphs() {
            if ($("#graph_1").size() == 0) {
                return;
            }

            var graphData = [];
            var series = Math.floor(Math.random() * 10) + 1;
            for (var i = 0; i < series; i++) {
                graphData[i] = {
                    label: "Series" + (i + 1),
                    data: Math.floor((Math.random() - 1) * 100) + 1
                }
            }

            $.plot($("#graph_1"), graphData, {
                series: {
                    pie: {
                        show: true,
                        radius: 1,
                        label: {
                            show: true,
                            radius: 1,
                            formatter: function (label, series) {
                                return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
                            },
                            background: {
                                opacity: 0.8
                            }
                        }
                    }
                },
                legend: {
                    show: false
                }
            });


            $.plot($("#graph_2"), graphData, {
                series: {
                    pie: {
                        show: true,
                        radius: 1,
                        label: {
                            show: true,
                            radius: 3 / 4,
                            formatter: function (label, series) {
                                return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">' + label + '<br/>' + Math.round(series.percent) + '%</div>';
                            },
                            background: {
                                opacity: 0.5
                            }
                        }
                    }
                },
                legend: {
                    show: false
                }
            });

            $.plot($("#graph_3"), graphData, {
                series: {
                    pie: {
                        show: true
                    }
                },
                grid: {
                    hoverable: true,
                    clickable: true
                }
            });
            $("#graph_3").bind("plothover", pieHover);
            $("#graph_3").bind("plotclick", pieClick);

            function pieHover(event, pos, obj) {
                if (!obj) return;
                percent = parseFloat(obj.series.percent).toFixed(2);
                $("#hover").html('<span style="font-weight: bold; color: ' + obj.series.color + '">' + obj.series.label + ' (' + percent + '%)</span>');
            }

            function pieClick(event, pos, obj) {
                if (!obj) return;
                percent = parseFloat(obj.series.percent).toFixed(2);
                alert('' + obj.series.label + ': ' + percent + '%');
            }

            $.plot($("#graph_4"), graphData, {
                series: {
                    pie: {
                        innerRadius: 0.5,
                        show: true
                    }
                }
            });
        }

        chart1();
        chart2();
        chart3();
        chart4();
        chart5();
        graphs();
    }

    //----------------------------- Calanedar --------------------------------//
    if (jQuery().fullCalendar) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        var h = {};

        if ($(window).width() <= 480) {
            h = {
                left: 'title, prev,next',
                center: '',
                right: 'month,agendaWeek,agendaDay'
            };
        } else {
            h = {
                left: 'title',
                center: '',
                right: 'prev,next,today,month,agendaWeek,agendaDay'
            };
        }

        var initDrag = function (el) {
            // create an Event Object (http://arshaw.com/fullcalendar/docs/event_data/Event_Object/)
            // it doesn't need to have a start or end
            var eventObject = {
                title: $.trim(el.text()) // use the element's text as the event title
            };
            // store the Event Object in the DOM element so we can get to it later
            el.data('eventObject', eventObject);
            // make the event draggable using jQuery UI
            el.draggable({
                zIndex: 999,
                revert: true, // will cause the event to go back to its
                revertDuration: 0 //  original position after the drag
            });
        }

        var addEvent = function (title, priority) {
            title = title.length == 0 ? "Untitled Event" : title;
            priority = priority.length == 0 ? "default" : priority;

            var html = $('<div data-class="label label-' + priority + '" class="external-event label label-' + priority + '">' + title + '</div>');
            jQuery('#event_box').append(html);
            initDrag(html);
        }

        $('#external-events div.external-event').each(function () {
            initDrag($(this))
        });

        $('#event_add').click(function () {
            var title = $('#event_title').val();
            var priority = $('#event_priority').val();
            addEvent(title, priority);
        });

        //modify chosen options
        var handleDropdown = function () {
            $('#event_priority_chzn .chzn-search').hide(); //hide search box
            $('#event_priority_chzn_o_1').html('<span class="label label-default">' + $('#event_priority_chzn_o_1').text() + '</span>');
            $('#event_priority_chzn_o_2').html('<span class="label label-success">' + $('#event_priority_chzn_o_2').text() + '</span>');
            $('#event_priority_chzn_o_3').html('<span class="label label-info">' + $('#event_priority_chzn_o_3').text() + '</span>');
            $('#event_priority_chzn_o_4').html('<span class="label label-warning">' + $('#event_priority_chzn_o_4').text() + '</span>');
            $('#event_priority_chzn_o_5').html('<span class="label label-important">' + $('#event_priority_chzn_o_5').text() + '</span>');
        }

        $('#event_priority_chzn').click(handleDropdown);

        //predefined events
        addEvent("My Event 1", "default");
        addEvent("My Event 2", "success");
        addEvent("My Event 3", "info");
        addEvent("My Event 4", "warning");
        addEvent("My Event 5", "important");
        addEvent("My Event 6", "success");
        addEvent("My Event 7", "info");
        addEvent("My Event 8", "warning");
        addEvent("My Event 9", "success");
        addEvent("My Event 10", "default");

        $('#calendar').fullCalendar({
            header: h,
            editable: true,
            droppable: true, // this allows things to be dropped onto the calendar !!!
            drop: function (date, allDay) { // this function is called when something is dropped

                // retrieve the dropped element's stored Event Object
                var originalEventObject = $(this).data('eventObject');
                // we need to copy it, so that multiple events don't have a reference to the same object
                var copiedEventObject = $.extend({}, originalEventObject);

                // assign it the date that was reported
                copiedEventObject.start = date;
                copiedEventObject.allDay = allDay;
                copiedEventObject.className = $(this).attr("data-class");

                // render the event on the calendar
                // the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
                $('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

                // is the "remove after drop" checkbox checked?
                if ($('#drop-remove').is(':checked')) {
                    // if so, remove the element from the "Draggable Events" list
                    $(this).remove();
                }
            },
            events: [{
                title: 'All Day Event',
                start: new Date(y, m, 1),
                className: 'label label-default',
            }, {
                title: 'Long Event',
                start: new Date(y, m, d - 5),
                end: new Date(y, m, d - 2),
                className: 'label label-success',
            }, {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d - 3, 16, 0),
                allDay: false,
                className: 'label label-default',
            }, {
                id: 999,
                title: 'Repeating Event',
                start: new Date(y, m, d + 4, 16, 0),
                allDay: false,
                className: 'label label-important',
            }, {
                title: 'Meeting',
                start: new Date(y, m, d, 10, 30),
                allDay: false,
                className: 'label label-info',
            }, {
                title: 'Lunch',
                start: new Date(y, m, d, 12, 0),
                end: new Date(y, m, d, 14, 0),
                allDay: false,
                className: 'label label-warning',
            }, {
                title: 'Birthday Party',
                start: new Date(y, m, d + 1, 19, 0),
                end: new Date(y, m, d + 1, 22, 30),
                allDay: false,
                className: 'label label-success',
            }, {
                title: 'Click for Google',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                url: 'http://google.com/',
                className: 'label label-warning',
            }]
        });
        //Replace buttons style
        $('.fc-button').addClass('btn');
    }

    //---------------------------- Dashboard Visitors Chart -------------------------//
    if (jQuery.plot) {
        //define placeholder class
        var placeholder = $("#visitors-chart");

        if ($(placeholder).size() == 0) {
            return;
        }
        //some data
        var d1 = [
            [1, 35],
            [2, 48],
            [3, 34],
            [4, 54],
            [5, 46],
            [6, 37],
            [7, 40],
            [8, 55],
            [9, 43],
            [10, 61],
            [11, 52],
            [12, 57],
            [13, 64],
            [14, 56],
            [15, 48],
            [16, 53],
            [17, 50],
            [18, 59],
            [19, 66],
            [20, 73],
            [21, 81],
            [22, 75],
            [23, 86],
            [24, 77],
            [25, 86],
            [26, 85],
            [27, 79],
            [28, 83],
            [29, 95],
            [30, 92]
        ];
        var d2 = [
            [1, 9],
            [2, 15],
            [3, 16],
            [4, 21],
            [5, 19],
            [6, 15],
            [7, 22],
            [8, 29],
            [9, 20],
            [10, 27],
            [11, 32],
            [12, 37],
            [13, 34],
            [14, 30],
            [15, 28],
            [16, 23],
            [17, 28],
            [18, 35],
            [19, 31],
            [20, 28],
            [21, 33],
            [22, 25],
            [23, 27],
            [24, 24],
            [25, 36],
            [26, 25],
            [27, 39],
            [28, 28],
            [29, 35],
            [30, 42]
        ];
        var chartColours = ['#88bbc8', '#ed7a53', '#9FC569', '#bbdce3', '#9a3b1b', '#5a8022', '#2c7282'];
        //graph options
        var options = {
                grid: {
                    show: true,
                    aboveData: true,
                    color: "#3f3f3f" ,
                    labelMargin: 5,
                    axisMargin: 0, 
                    borderWidth: 0,
                    borderColor:null,
                    minBorderMargin: 5 ,
                    clickable: true, 
                    hoverable: true,
                    autoHighlight: true,
                    mouseActiveRadius: 20
                },
                series: {
                    grow: {
                        active: false,
                        stepMode: "linear",
                        steps: 50,
                        stepDelay: true
                    },
                    lines: {
                        show: true,
                        fill: true,
                        lineWidth: 3,
                        steps: false
                        },
                    points: {
                        show:true,
                        radius: 4,
                        symbol: "circle",
                        fill: true,
                        borderColor: "#fff"
                    }
                },
                legend: { 
                    position: "ne", 
                    margin: [0,-25], 
                    noColumns: 0,
                    labelBoxBorderColor: null,
                    labelFormatter: function(label, series) {
                        // just add some space to labes
                        return label+'&nbsp;&nbsp;';
                     }
                },
                yaxis: { min: 0 },
                xaxis: {ticks:11, tickDecimals: 0},
                colors: chartColours,
                shadowSize:1,
                tooltip: true, //activate tooltip
                tooltipOpts: {
                    content: "%s : %y.0",
                    defaultTheme: false,
                    shifts: {
                        x: -30,
                        y: -50
                    }
                }
            };
            $.plot(placeholder, [
            {
                label: "Visits", 
                data: d1,
                lines: {fillColor: "#f2f7f9"},
                points: {fillColor: "#88bbc8"}
            }, 
            {
                label: "Unique Visits", 
                data: d2,
                lines: {fillColor: "#fff8f2"},
                points: {fillColor: "#ed7a53"}
            } 

        ], options);
    }

    //--------------------------- Sparkline --------------------------------//
    if (jQuery().sparkline) {
        $('.inline-sparkline').sparkline(
            'html',
            {
                width: '70px',
                height: '26px',
                lineWidth: 2,
                spotRadius: 3,
                lineColor: '#88bbc8',
                fillColor: '#f2f7f9',
                spotColor: '#14ae48',
                maxSpotColor: '#e72828',
                minSpotColor: '#f7941d'
            }
        );
    }


});
(function ($) {
    "use strict";

    ///////////////////////////////////////////////////// Your
    // var venueAddress = "Grand Place, 1000, Brussels"; // Venue

    // Map Object
    var map = null;
    var europe;
    // europe
    var europe = {
                'type': 'FeatureCollection',
                'features': [
						{ 'type': 'Feature', 'properties': { 'name': 'Belgium', 'density': '356.0', 'population': '10753080' }, 'geometry': { 'type': 'MultiPolygon', 'coordinates': [ [ [ [ 3.370646, 51.375549 ], [ 3.363889, 51.313599 ], [ 3.439166, 51.244431 ], [ 3.524166, 51.250542 ], [ 3.524722, 51.288319 ], [ 3.793055, 51.261929 ], [ 3.806388, 51.216930 ], [ 3.957222, 51.216091 ], [ 4.214999, 51.330269 ], [ 4.230012, 51.357220 ], [ 4.293888, 51.306381 ], [ 4.236443, 51.368771 ], [ 4.239443, 51.374149 ], [ 4.413054, 51.358040 ], [ 4.437777, 51.375259 ], [ 4.396667, 51.416931 ], [ 4.411666, 51.456928 ], [ 4.549443, 51.482761 ], [ 4.541944, 51.426651 ], [ 4.671665, 51.427479 ], [ 4.769166, 51.502769 ], [ 4.825832, 51.492210 ], [ 4.844722, 51.461369 ], [ 4.816387, 51.425541 ], [ 4.782777, 51.414700 ], [ 4.940276, 51.401371 ], [ 5.041388, 51.486649 ], [ 5.104444, 51.434978 ], [ 5.077222, 51.395260 ], [ 5.143888, 51.318600 ], [ 5.237499, 51.308319 ], [ 5.238888, 51.262211 ], [ 5.457777, 51.280540 ], [ 5.855465, 51.147820 ], [ 5.802776, 51.093319 ], [ 5.775832, 51.021099 ], [ 5.722776, 50.965260 ], [ 5.759166, 50.949150 ], [ 5.683742, 50.882191 ], [ 5.698609, 50.757771 ], [ 6.008407, 50.756069 ], [ 6.028610, 50.715820 ], [ 6.108333, 50.723309 ], [ 6.171388, 50.623871 ], [ 6.268610, 50.623600 ], [ 6.200832, 50.516380 ], [ 6.366387, 50.452209 ], [ 6.400277, 50.329151 ], [ 6.173332, 50.232479 ], [ 6.131833, 50.125530 ], [ 6.106943, 50.167759 ], [ 5.980000, 50.172211 ], [ 5.819721, 50.009708 ], [ 5.808332, 49.961102 ], [ 5.731111, 49.894150 ], [ 5.753333, 49.849152 ], [ 5.746666, 49.795269 ], [ 5.820555, 49.749149 ], [ 5.899166, 49.662762 ], [ 5.839999, 49.552212 ], [ 5.783038, 49.527271 ], [ 5.705208, 49.535229 ], [ 5.473055, 49.506100 ], [ 5.423332, 49.609150 ], [ 5.307221, 49.630810 ], [ 5.329721, 49.659981 ], [ 5.276111, 49.698589 ], [ 5.216944, 49.690540 ], [ 5.097777, 49.768589 ], [ 4.858054, 49.796379 ], [ 4.881110, 49.914700 ], [ 4.800832, 49.977760 ], [ 4.851943, 50.079430 ], [ 4.876388, 50.154980 ], [ 4.757500, 50.129429 ], [ 4.673610, 49.996380 ], [ 4.458333, 49.938591 ], [ 4.168332, 49.981369 ], [ 4.150000, 49.986370 ], [ 4.226388, 50.081100 ], [ 4.137777, 50.137760 ], [ 4.216110, 50.265270 ], [ 4.090833, 50.314430 ], [ 3.763611, 50.351929 ], [ 3.725277, 50.313599 ], [ 3.671944, 50.346371 ], [ 3.668889, 50.444149 ], [ 3.602222, 50.497211 ], [ 3.367222, 50.495541 ], [ 3.280000, 50.538319 ], [ 3.281388, 50.594151 ], [ 3.193333, 50.741371 ], [ 3.113055, 50.793320 ], [ 3.035277, 50.773869 ], [ 2.901285, 50.697048 ], [ 2.781944, 50.755550 ], [ 2.629444, 50.824711 ], [ 2.612500, 50.887211 ], [ 2.541667, 51.091099 ], [ 2.971666, 51.257488 ], [ 3.370646, 51.375549 ] ] ] ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Bulgaria:', 'density': '68.3', 'population': '7606551' }, 'geometry': { 'type': 'MultiPolygon', 'coordinates': [ [ [ [ 27.275551, 44.133041 ], [ 27.290550, 44.088039 ], [ 27.399990, 44.021931 ], [ 27.656099, 44.042488 ], [ 27.721661, 43.964710 ], [ 27.820271, 43.965820 ], [ 27.918880, 44.005550 ], [ 27.951660, 43.978870 ], [ 27.997210, 43.859150 ], [ 28.224991, 43.773041 ], [ 28.583839, 43.747761 ], [ 28.582911, 43.744831 ], [ 28.572769, 43.600819 ], [ 28.606380, 43.543880 ], [ 28.561380, 43.458321 ], [ 28.471380, 43.366379 ], [ 28.381941, 43.413319 ], [ 28.157221, 43.405540 ], [ 28.088051, 43.363602 ], [ 28.015829, 43.225819 ], [ 27.906940, 43.195820 ], [ 27.945000, 43.167210 ], [ 27.895269, 42.921379 ], [ 27.898331, 42.707211 ], [ 27.732771, 42.711380 ], [ 27.713881, 42.676659 ], [ 27.632500, 42.631649 ], [ 27.652220, 42.556660 ], [ 27.530830, 42.561939 ], [ 27.450550, 42.480820 ], [ 27.501940, 42.433319 ], [ 27.637211, 42.451931 ], [ 27.653330, 42.414150 ], [ 27.716940, 42.380821 ], [ 27.730000, 42.334709 ], [ 27.785830, 42.311378 ], [ 27.748051, 42.259708 ], [ 28.003599, 42.023880 ], [ 28.013050, 41.982201 ], [ 27.834721, 42.001930 ], [ 27.821659, 41.966648 ], [ 27.579720, 41.937481 ], [ 27.566660, 41.907761 ], [ 27.243601, 42.107208 ], [ 27.201660, 42.060539 ], [ 27.070271, 42.089981 ], [ 26.843330, 41.972210 ], [ 26.625271, 41.983318 ], [ 26.544991, 41.830818 ], [ 26.377489, 41.821930 ], [ 26.332769, 41.753040 ], [ 26.361879, 41.701550 ], [ 26.222771, 41.744431 ], [ 26.074440, 41.711929 ], [ 26.067490, 41.678871 ], [ 26.099720, 41.636650 ], [ 26.198050, 41.439419 ], [ 26.135269, 41.353870 ], [ 25.805830, 41.333870 ], [ 25.653049, 41.317760 ], [ 25.388050, 41.263050 ], [ 25.239429, 41.254429 ], [ 25.209990, 41.293880 ], [ 24.894711, 41.410542 ], [ 24.798880, 41.354710 ], [ 24.725269, 41.418049 ], [ 24.658600, 41.421101 ], [ 24.526100, 41.572208 ], [ 24.363880, 41.523602 ], [ 24.304710, 41.548599 ], [ 24.245541, 41.567760 ], [ 24.184719, 41.516651 ], [ 24.157221, 41.541100 ], [ 24.078609, 41.537209 ], [ 24.074989, 41.467201 ], [ 23.956100, 41.446091 ], [ 23.891100, 41.452770 ], [ 23.668051, 41.405819 ], [ 23.281111, 41.403309 ], [ 23.175819, 41.322762 ], [ 22.935949, 41.343300 ], [ 22.964991, 41.394428 ], [ 22.985550, 41.661369 ], [ 23.031389, 41.720539 ], [ 23.012770, 41.765270 ], [ 22.947491, 41.802479 ], [ 22.803329, 42.047771 ], [ 22.609440, 42.103321 ], [ 22.407770, 42.279430 ], [ 22.363609, 42.319981 ], [ 22.369419, 42.322933 ], [ 22.519440, 42.399151 ], [ 22.558050, 42.479149 ], [ 22.484989, 42.555820 ], [ 22.438601, 42.574711 ], [ 22.461941, 42.793880 ], [ 22.440830, 42.818600 ], [ 22.585831, 42.892761 ], [ 22.733330, 42.889709 ], [ 22.993330, 43.145260 ], [ 23.006941, 43.199989 ], [ 22.849720, 43.282200 ], [ 22.769711, 43.383598 ], [ 22.546391, 43.470261 ], [ 22.488600, 43.623310 ], [ 22.359440, 43.816929 ], [ 22.416929, 44.006939 ], [ 22.622499, 44.070820 ], [ 22.616659, 44.172760 ], [ 22.691931, 44.243061 ], [ 22.882771, 44.128868 ], [ 23.037220, 44.084431 ], [ 23.042770, 44.056648 ], [ 22.995819, 44.014149 ], [ 22.906940, 43.998871 ], [ 22.843330, 43.904980 ], [ 22.857491, 43.853321 ], [ 23.063610, 43.802212 ], [ 23.413050, 43.855820 ], [ 23.890551, 43.756378 ], [ 24.337219, 43.694431 ], [ 24.501659, 43.761379 ], [ 25.001381, 43.723591 ], [ 25.080549, 43.691090 ], [ 25.224710, 43.687481 ], [ 25.363050, 43.624699 ], [ 25.572929, 43.648281 ], [ 25.862770, 43.766380 ], [ 26.111660, 43.968319 ], [ 26.478600, 44.049431 ], [ 26.923321, 44.136650 ], [ 27.275551, 44.133041 ] ] ] ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Czech Republic', 'density': '135.8', 'population': '10467542' }, 'geometry': { 'type': 'MultiPolygon', 'coordinates': [ [ [ [ 12.093470, 50.324200 ], [ 12.260000, 50.261662 ], [ 12.280550, 50.186100 ], [ 12.329720, 50.169708 ], [ 12.364720, 50.279148 ], [ 12.486390, 50.351379 ], [ 12.785000, 50.446369 ], [ 12.903890, 50.423321 ], [ 12.994440, 50.423038 ], [ 13.033610, 50.502769 ], [ 13.191110, 50.503601 ], [ 13.239440, 50.579708 ], [ 13.320830, 50.581100 ], [ 13.380000, 50.641369 ], [ 13.470000, 50.603321 ], [ 13.566670, 50.711102 ], [ 13.861940, 50.725811 ], [ 13.907780, 50.790539 ], [ 14.046670, 50.806931 ], [ 14.393610, 50.894711 ], [ 14.403610, 50.932491 ], [ 14.260830, 50.996651 ], [ 14.472220, 51.031368 ], [ 14.598890, 50.977200 ], [ 14.569720, 50.916088 ], [ 14.650830, 50.924160 ], [ 14.625270, 50.854160 ], [ 14.801660, 50.818878 ], [ 14.828850, 50.866032 ], [ 15.005280, 50.867199 ], [ 15.019170, 50.953602 ], [ 14.990830, 51.006939 ], [ 15.051110, 51.008320 ], [ 15.172780, 51.018879 ], [ 15.277500, 50.969978 ], [ 15.270830, 50.921371 ], [ 15.310560, 50.858318 ], [ 15.493050, 50.785820 ], [ 15.818330, 50.747761 ], [ 15.870550, 50.669979 ], [ 15.920830, 50.683319 ], [ 15.997220, 50.679710 ], [ 16.009720, 50.602489 ], [ 16.062500, 50.619148 ], [ 16.221380, 50.636650 ], [ 16.237499, 50.670540 ], [ 16.347771, 50.657761 ], [ 16.449160, 50.575821 ], [ 16.396660, 50.518879 ], [ 16.310829, 50.504162 ], [ 16.210550, 50.419708 ], [ 16.458611, 50.303600 ], [ 16.590549, 50.138321 ], [ 16.725269, 50.099709 ], [ 16.821381, 50.186932 ], [ 17.028049, 50.234711 ], [ 16.867500, 50.410542 ], [ 16.890270, 50.439419 ], [ 17.004169, 50.424160 ], [ 17.246941, 50.336651 ], [ 17.353889, 50.322491 ], [ 17.352779, 50.276371 ], [ 17.665550, 50.274700 ], [ 17.696100, 50.321930 ], [ 17.733330, 50.312481 ], [ 17.762489, 50.205540 ], [ 17.597771, 50.158321 ], [ 17.625549, 50.135262 ], [ 17.750000, 50.102211 ], [ 17.798889, 50.013599 ], [ 17.887779, 49.976650 ], [ 18.007219, 50.010540 ], [ 18.047220, 50.058590 ], [ 18.091110, 50.029709 ], [ 18.160271, 49.992760 ], [ 18.447220, 49.919708 ], [ 18.546671, 49.913311 ], [ 18.632771, 49.722481 ], [ 18.811661, 49.672211 ], [ 18.853331, 49.517780 ], [ 18.844700, 49.515800 ], [ 18.814400, 49.518902 ], [ 18.798599, 49.516102 ], [ 18.779400, 49.505001 ], [ 18.763100, 49.491402 ], [ 18.744699, 49.483101 ], [ 18.730600, 49.485298 ], [ 18.705000, 49.496700 ], [ 18.681700, 49.495800 ], [ 18.655600, 49.504200 ], [ 18.648100, 49.503300 ], [ 18.630301, 49.494202 ], [ 18.623100, 49.492199 ], [ 18.605301, 49.491699 ], [ 18.586399, 49.497501 ], [ 18.581100, 49.497799 ], [ 18.562201, 49.493900 ], [ 18.551399, 49.486900 ], [ 18.548300, 49.481701 ], [ 18.548300, 49.463600 ], [ 18.546101, 49.457500 ], [ 18.535299, 49.450298 ], [ 18.517200, 49.444199 ], [ 18.496401, 49.434700 ], [ 18.482500, 49.423100 ], [ 18.475599, 49.413101 ], [ 18.469200, 49.407200 ], [ 18.443600, 49.392799 ], [ 18.436899, 49.390598 ], [ 18.428101, 49.390800 ], [ 18.414400, 49.396099 ], [ 18.405800, 49.396900 ], [ 18.404699, 49.394199 ], [ 18.406401, 49.389198 ], [ 18.417200, 49.378300 ], [ 18.420300, 49.374199 ], [ 18.420300, 49.371101 ], [ 18.408300, 49.361099 ], [ 18.386900, 49.335800 ], [ 18.379400, 49.330299 ], [ 18.366100, 49.325600 ], [ 18.350800, 49.323101 ], [ 18.333300, 49.317799 ], [ 18.317801, 49.307499 ], [ 18.307199, 49.303902 ], [ 18.281401, 49.301899 ], [ 18.252199, 49.294399 ], [ 18.219700, 49.290001 ], [ 18.212799, 49.288101 ], [ 18.208099, 49.284199 ], [ 18.174700, 49.241699 ], [ 18.184999, 49.234200 ], [ 18.188101, 49.229401 ], [ 18.188101, 49.226398 ], [ 18.184999, 49.221100 ], [ 18.174200, 49.210300 ], [ 18.166401, 49.196400 ], [ 18.158899, 49.165298 ], [ 18.145300, 49.145000 ], [ 18.145000, 49.139702 ], [ 18.150801, 49.130001 ], [ 18.151400, 49.124401 ], [ 18.147800, 49.115601 ], [ 18.130301, 49.102798 ], [ 18.121901, 49.082802 ], [ 18.099701, 49.069401 ], [ 18.075300, 49.041901 ], [ 18.065300, 49.035801 ], [ 18.030300, 49.025600 ], [ 18.017500, 49.024700 ], [ 17.990000, 49.028900 ], [ 17.967501, 49.027500 ], [ 17.940001, 49.022800 ], [ 17.928301, 49.016899 ], [ 17.911100, 48.985001 ], [ 17.912201, 48.969700 ], [ 17.910601, 48.963600 ], [ 17.900000, 48.952801 ], [ 17.897499, 48.947498 ], [ 17.896400, 48.934399 ], [ 17.890301, 48.926899 ], [ 17.884199, 48.924400 ], [ 17.850800, 48.928101 ], [ 17.813601, 48.927799 ], [ 17.806400, 48.926399 ], [ 17.801100, 48.922798 ], [ 17.793301, 48.913300 ], [ 17.782200, 48.906700 ], [ 17.775801, 48.900600 ], [ 17.767500, 48.884201 ], [ 17.763100, 48.879700 ], [ 17.754700, 48.875801 ], [ 17.736099, 48.871399 ], [ 17.712200, 48.856098 ], [ 17.694201, 48.857800 ], [ 17.686100, 48.856701 ], [ 17.673599, 48.851101 ], [ 17.645599, 48.851898 ], [ 17.633101, 48.846401 ], [ 17.606701, 48.840801 ], [ 17.597200, 48.833900 ], [ 17.573299, 48.829700 ], [ 17.549999, 48.817799 ], [ 17.529400, 48.815300 ], [ 17.522499, 48.817501 ], [ 17.509199, 48.832802 ], [ 17.493299, 48.846100 ], [ 17.476700, 48.852501 ], [ 17.459200, 48.851898 ], [ 17.445299, 48.843601 ], [ 17.433300, 48.833599 ], [ 17.418600, 48.826698 ], [ 17.403900, 48.822800 ], [ 17.390301, 48.822800 ], [ 17.376400, 48.827499 ], [ 17.343599, 48.848099 ], [ 17.306900, 48.852501 ], [ 17.252800, 48.870800 ], [ 17.230301, 48.873100 ], [ 17.205601, 48.869701 ], [ 17.188900, 48.869202 ], [ 17.162800, 48.849201 ], [ 17.146099, 48.842201 ], [ 17.126400, 48.837799 ], [ 17.113899, 48.833099 ], [ 17.108101, 48.826900 ], [ 17.100000, 48.803101 ], [ 17.092199, 48.792801 ], [ 17.068600, 48.786400 ], [ 17.055300, 48.776901 ], [ 17.043900, 48.771099 ], [ 17.038300, 48.764999 ], [ 17.034700, 48.758099 ], [ 17.026699, 48.750000 ], [ 17.010599, 48.721901 ], [ 17.004700, 48.716702 ], [ 17.003099, 48.708900 ], [ 17.005600, 48.698101 ], [ 17.003599, 48.694698 ], [ 16.993601, 48.687801 ], [ 16.988100, 48.681400 ], [ 16.975800, 48.639999 ], [ 16.970301, 48.634399 ], [ 16.952801, 48.628101 ], [ 16.944860, 48.616501 ], [ 16.886600, 48.730320 ], [ 16.773880, 48.723869 ], [ 16.655830, 48.787769 ], [ 16.527500, 48.810810 ], [ 16.370550, 48.733871 ], [ 16.060551, 48.760269 ], [ 15.954170, 48.828320 ], [ 15.785280, 48.877480 ], [ 15.340550, 48.985821 ], [ 15.159720, 48.944698 ], [ 15.152220, 49.001381 ], [ 14.994160, 49.015820 ], [ 14.961110, 48.766651 ], [ 14.812500, 48.781368 ], [ 14.700280, 48.581379 ], [ 14.458610, 48.648319 ], [ 14.381110, 48.575550 ], [ 14.041670, 48.615822 ], [ 14.045270, 48.676929 ], [ 13.814630, 48.787140 ], [ 13.740830, 48.881649 ], [ 13.661940, 48.896381 ], [ 13.584440, 48.968868 ], [ 13.516110, 48.977760 ], [ 13.501670, 48.944981 ], [ 13.401440, 49.007488 ], [ 13.395280, 49.050259 ], [ 13.203610, 49.119431 ], [ 13.151110, 49.177479 ], [ 13.026940, 49.298321 ], [ 12.935280, 49.340260 ], [ 12.878610, 49.328041 ], [ 12.661660, 49.433868 ], [ 12.525000, 49.637211 ], [ 12.441940, 49.700260 ], [ 12.403050, 49.759991 ], [ 12.499440, 49.832760 ], [ 12.542500, 49.920269 ], [ 12.474440, 49.943039 ], [ 12.492770, 49.974979 ], [ 12.428890, 49.984428 ], [ 12.228890, 50.096371 ], [ 12.205000, 50.174160 ], [ 12.096940, 50.249710 ], [ 12.135830, 50.278320 ], [ 12.093470, 50.324200 ] ] ] ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Denmark', 'density': '128.2', 'population': '5511451' }, 'geometry': { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'Polygon', 'coordinates': [ [ [ 9.956388, 54.858051 ], [ 9.875832, 54.880821 ], [ 9.897778, 54.899151 ], [ 9.760555, 54.956379 ], [ 9.842222, 54.939991 ], [ 9.836111, 54.976379 ], [ 9.634722, 55.044991 ], [ 9.639444, 55.058601 ], [ 9.754166, 55.084431 ], [ 10.030000, 54.950550 ], [ 10.073060, 54.880821 ], [ 9.956388, 54.858051 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 10.703610, 54.725552 ], [ 10.603330, 54.833881 ], [ 10.726660, 54.880550 ], [ 10.681110, 54.904991 ], [ 10.896390, 55.120270 ], [ 10.958890, 55.147770 ], [ 10.811670, 54.886101 ], [ 10.738330, 54.738880 ], [ 10.703610, 54.725552 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 11.461390, 54.618881 ], [ 11.089720, 54.744160 ], [ 10.995000, 54.782768 ], [ 11.021110, 54.813042 ], [ 11.078890, 54.806099 ], [ 11.107500, 54.822491 ], [ 11.015000, 54.884708 ], [ 11.057780, 54.934990 ], [ 11.231390, 54.956928 ], [ 11.588890, 54.808041 ], [ 11.566670, 54.840260 ], [ 11.643890, 54.906101 ], [ 11.782220, 54.827492 ], [ 11.861670, 54.746101 ], [ 11.805280, 54.707489 ], [ 11.858330, 54.689430 ], [ 11.798610, 54.645821 ], [ 11.461390, 54.618881 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 8.655277, 56.674160 ], [ 8.563889, 56.737209 ], [ 8.545277, 56.790539 ], [ 8.661110, 56.809711 ], [ 8.646666, 56.883881 ], [ 8.928333, 56.973598 ], [ 8.897778, 56.868320 ], [ 8.858332, 56.886929 ], [ 8.845554, 56.824429 ], [ 8.864166, 56.786930 ], [ 8.769999, 56.693600 ], [ 8.655277, 56.674160 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 10.610280, 55.611099 ], [ 10.744440, 55.496658 ], [ 10.666670, 55.451649 ], [ 10.763330, 55.388321 ], [ 10.834720, 55.293880 ], [ 10.781670, 55.301929 ], [ 10.788060, 55.140541 ], [ 10.758050, 55.101940 ], [ 10.740280, 55.067211 ], [ 10.509720, 55.028320 ], [ 10.070280, 55.085270 ], [ 10.154440, 55.126930 ], [ 10.108330, 55.186378 ], [ 9.998055, 55.191101 ], [ 9.908333, 55.226650 ], [ 9.873333, 55.324429 ], [ 9.781944, 55.374981 ], [ 9.842777, 55.395260 ], [ 9.678333, 55.494431 ], [ 9.805832, 55.544991 ], [ 9.883333, 55.505821 ], [ 10.298890, 55.616650 ], [ 10.535830, 55.526932 ], [ 10.476940, 55.529991 ], [ 10.490830, 55.493599 ], [ 10.422220, 55.464432 ], [ 10.425550, 55.438599 ], [ 10.600280, 55.482769 ], [ 10.610280, 55.611099 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 15.076670, 55.001099 ], [ 14.895280, 55.025539 ], [ 14.685830, 55.096100 ], [ 14.698890, 55.214989 ], [ 14.776390, 55.300270 ], [ 14.936670, 55.215820 ], [ 15.134160, 55.144161 ], [ 15.150000, 55.089161 ], [ 15.076670, 55.001099 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 11.741110, 55.915821 ], [ 11.674170, 55.914440 ], [ 11.668330, 55.895260 ], [ 11.730550, 55.835541 ], [ 11.725560, 55.814430 ], [ 11.664440, 55.811100 ], [ 11.623890, 55.775539 ], [ 11.736390, 55.793049 ], [ 11.770280, 55.718319 ], [ 11.794440, 55.661652 ], [ 11.837220, 55.718040 ], [ 11.956670, 55.846100 ], [ 11.918050, 55.901661 ], [ 11.920280, 55.929710 ], [ 11.992780, 55.901100 ], [ 12.028330, 55.822491 ], [ 12.050830, 55.724430 ], [ 11.929160, 55.674160 ], [ 11.999440, 55.695271 ], [ 12.057220, 55.653320 ], [ 12.093890, 55.711102 ], [ 12.064720, 55.813881 ], [ 12.007500, 55.959431 ], [ 11.876110, 55.936100 ], [ 11.853610, 55.963039 ], [ 12.111670, 56.075260 ], [ 12.301670, 56.128601 ], [ 12.518890, 56.086102 ], [ 12.618060, 56.033871 ], [ 12.534720, 55.953880 ], [ 12.600280, 55.704151 ], [ 12.512780, 55.635269 ], [ 12.383890, 55.611099 ], [ 12.242500, 55.541100 ], [ 12.191940, 55.460270 ], [ 12.227780, 55.426102 ], [ 12.376670, 55.395260 ], [ 12.452780, 55.333599 ], [ 12.443330, 55.272491 ], [ 12.068610, 55.173870 ], [ 12.015000, 55.161381 ], [ 12.061390, 55.131649 ], [ 12.173330, 55.122761 ], [ 12.168890, 55.089710 ], [ 12.123060, 55.081100 ], [ 12.173610, 55.004990 ], [ 12.071940, 54.968601 ], [ 11.913890, 55.004711 ], [ 11.877780, 54.944988 ], [ 11.904170, 54.919430 ], [ 11.963610, 54.942211 ], [ 12.000280, 54.902489 ], [ 12.110550, 54.887489 ], [ 12.169440, 54.839161 ], [ 11.976390, 54.706100 ], [ 11.958610, 54.663319 ], [ 11.980000, 54.570271 ], [ 11.929440, 54.572769 ], [ 11.871940, 54.651371 ], [ 11.883610, 54.749710 ], [ 11.742220, 54.891380 ], [ 11.708610, 54.936649 ], [ 11.750830, 54.960819 ], [ 11.856110, 54.954990 ], [ 11.883610, 54.973881 ], [ 11.847220, 55.020260 ], [ 11.618610, 55.083050 ], [ 11.823330, 55.046379 ], [ 11.779170, 55.081379 ], [ 11.723890, 55.108318 ], [ 11.766940, 55.131378 ], [ 11.773610, 55.154148 ], [ 11.720000, 55.152210 ], [ 11.741110, 55.198879 ], [ 11.246670, 55.199711 ], [ 11.236110, 55.231380 ], [ 11.241940, 55.268040 ], [ 11.170560, 55.349709 ], [ 11.110550, 55.330540 ], [ 11.104720, 55.363602 ], [ 11.214720, 55.388599 ], [ 11.178050, 55.488041 ], [ 11.130000, 55.522491 ], [ 11.080000, 55.509159 ], [ 11.150280, 55.549709 ], [ 11.119720, 55.603321 ], [ 10.927500, 55.660259 ], [ 11.085830, 55.658871 ], [ 10.873610, 55.732491 ], [ 11.153330, 55.747211 ], [ 11.122780, 55.731659 ], [ 11.168610, 55.702770 ], [ 11.343330, 55.747490 ], [ 11.374720, 55.804710 ], [ 11.486940, 55.841648 ], [ 11.515830, 55.891930 ], [ 11.507780, 55.918880 ], [ 11.278060, 55.975269 ], [ 11.320550, 55.978321 ], [ 11.606390, 55.936378 ], [ 11.763890, 55.964710 ], [ 11.757780, 55.939991 ], [ 11.741110, 55.915821 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 9.503124, 54.848251 ], [ 9.445169, 54.824780 ], [ 8.919998, 54.908039 ], [ 8.719442, 54.891102 ], [ 8.656296, 54.917400 ], [ 8.682220, 55.129990 ], [ 8.560276, 55.140820 ], [ 8.522221, 55.072208 ], [ 8.487499, 55.062771 ], [ 8.456944, 55.123878 ], [ 8.483055, 55.191101 ], [ 8.568054, 55.193321 ], [ 8.554443, 55.149712 ], [ 8.665457, 55.133591 ], [ 8.691387, 55.142208 ], [ 8.638054, 55.402760 ], [ 8.599442, 55.441101 ], [ 8.439999, 55.452209 ], [ 8.332499, 55.575550 ], [ 8.265276, 55.573601 ], [ 8.234722, 55.556660 ], [ 8.328609, 55.473320 ], [ 8.269444, 55.484150 ], [ 8.091389, 55.544708 ], [ 8.182220, 55.723049 ], [ 8.126110, 55.983051 ], [ 8.163055, 55.936939 ], [ 8.186388, 55.809990 ], [ 8.394165, 55.891930 ], [ 8.311110, 56.053051 ], [ 8.146111, 56.111099 ], [ 8.141943, 55.996380 ], [ 8.113888, 56.000820 ], [ 8.105555, 56.118038 ], [ 8.130833, 56.308319 ], [ 8.137220, 56.582760 ], [ 8.194721, 56.691380 ], [ 8.216665, 56.710541 ], [ 8.237778, 56.687771 ], [ 8.203888, 56.638050 ], [ 8.301943, 56.549160 ], [ 8.369444, 56.580269 ], [ 8.567221, 56.572769 ], [ 8.626665, 56.478600 ], [ 8.728333, 56.482208 ], [ 8.766109, 56.558601 ], [ 8.680832, 56.614159 ], [ 8.877222, 56.703320 ], [ 8.838333, 56.712490 ], [ 8.937498, 56.795551 ], [ 9.070000, 56.807770 ], [ 9.173332, 56.715260 ], [ 9.055277, 56.630550 ], [ 9.043888, 56.595829 ], [ 9.064165, 56.563042 ], [ 9.151943, 56.612492 ], [ 9.248888, 56.633320 ], [ 9.288055, 56.620541 ], [ 9.250832, 56.580269 ], [ 9.312498, 56.525539 ], [ 9.371111, 56.540821 ], [ 9.373888, 56.566929 ], [ 9.294167, 56.558601 ], [ 9.329721, 56.653049 ], [ 9.301943, 56.702209 ], [ 9.180832, 56.669430 ], [ 9.190554, 56.699162 ], [ 9.239443, 56.730549 ], [ 9.173332, 56.799431 ], [ 9.211943, 56.856930 ], [ 9.165552, 56.889431 ], [ 9.243610, 56.965820 ], [ 9.409721, 57.018318 ], [ 9.546665, 57.008041 ], [ 9.578888, 56.966648 ], [ 9.662498, 57.000271 ], [ 9.686110, 57.038601 ], [ 9.918055, 57.055538 ], [ 9.800833, 57.102489 ], [ 9.579443, 57.042759 ], [ 9.318054, 57.016380 ], [ 9.243889, 56.995541 ], [ 9.115555, 57.052761 ], [ 9.063332, 57.022491 ], [ 8.746944, 56.952770 ], [ 8.673332, 56.947208 ], [ 8.572498, 56.819439 ], [ 8.489166, 56.790272 ], [ 8.474722, 56.714432 ], [ 8.525555, 56.711651 ], [ 8.519722, 56.684711 ], [ 8.607222, 56.630550 ], [ 8.554998, 56.582489 ], [ 8.284443, 56.766651 ], [ 8.251472, 56.771881 ], [ 8.264721, 56.703602 ], [ 8.240276, 56.707211 ], [ 8.242222, 56.794430 ], [ 8.450554, 57.004990 ], [ 8.585554, 57.100819 ], [ 8.628611, 57.125271 ], [ 8.754166, 57.101101 ], [ 9.054708, 57.123859 ], [ 9.231388, 57.137211 ], [ 9.389999, 57.151100 ], [ 9.540833, 57.213871 ], [ 9.940002, 57.571129 ], [ 10.390550, 57.666100 ], [ 10.556670, 57.744160 ], [ 10.645000, 57.737492 ], [ 10.491390, 57.653881 ], [ 10.432500, 57.592209 ], [ 10.443050, 57.535259 ], [ 10.537220, 57.449989 ], [ 10.542020, 57.229519 ], [ 10.423890, 57.157211 ], [ 10.343890, 56.998600 ], [ 10.231520, 57.017429 ], [ 10.020830, 57.086929 ], [ 9.981363, 57.077869 ], [ 10.309720, 56.983879 ], [ 10.269170, 56.917210 ], [ 10.305280, 56.748051 ], [ 10.342500, 56.718040 ], [ 10.206390, 56.701382 ], [ 10.159440, 56.720539 ], [ 9.864443, 56.638321 ], [ 10.234720, 56.688599 ], [ 10.338610, 56.695271 ], [ 10.363610, 56.644989 ], [ 10.339820, 56.616779 ], [ 10.209440, 56.551380 ], [ 10.226110, 56.489159 ], [ 10.226940, 56.544430 ], [ 10.319170, 56.598881 ], [ 10.414720, 56.528049 ], [ 10.723330, 56.528599 ], [ 10.844170, 56.523880 ], [ 10.960830, 56.444988 ], [ 10.828610, 56.258881 ], [ 10.760560, 56.228600 ], [ 10.733060, 56.148602 ], [ 10.669440, 56.165539 ], [ 10.690550, 56.217770 ], [ 10.625560, 56.228321 ], [ 10.555280, 56.176929 ], [ 10.575550, 56.116650 ], [ 10.524170, 56.098598 ], [ 10.494160, 56.134991 ], [ 10.522780, 56.153599 ], [ 10.466390, 56.177761 ], [ 10.406670, 56.157211 ], [ 10.353050, 56.195271 ], [ 10.508330, 56.264992 ], [ 10.400550, 56.290821 ], [ 10.219170, 56.151661 ], [ 10.262500, 56.051102 ], [ 10.279720, 56.018879 ], [ 10.193050, 55.833050 ], [ 10.150550, 55.834991 ], [ 10.113050, 55.874710 ], [ 9.880554, 55.851650 ], [ 9.873888, 55.837769 ], [ 10.048610, 55.814430 ], [ 10.011670, 55.757210 ], [ 10.018330, 55.707760 ], [ 9.811666, 55.669430 ], [ 9.616665, 55.694988 ], [ 9.845276, 55.622761 ], [ 9.751389, 55.559711 ], [ 9.503054, 55.491940 ], [ 9.578888, 55.486931 ], [ 9.649721, 55.477211 ], [ 9.665833, 55.459709 ], [ 9.596943, 55.373322 ], [ 9.621111, 55.356380 ], [ 9.711111, 55.261101 ], [ 9.688610, 55.196930 ], [ 9.466110, 55.130550 ], [ 9.556389, 55.083599 ], [ 9.434444, 55.034710 ], [ 9.524721, 55.029430 ], [ 9.591665, 55.045551 ], [ 9.727499, 54.989429 ], [ 9.768055, 54.891102 ], [ 9.703609, 54.892208 ], [ 9.751944, 54.848049 ], [ 9.737221, 54.827770 ], [ 9.614166, 54.890541 ], [ 9.648054, 54.913879 ], [ 9.601944, 54.928600 ], [ 9.503124, 54.848251 ] ] ] } ] } ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Germany', 'density': '229.3', 'population': '82002356' }, 'geometry': { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'Polygon', 'coordinates': [ [ [ 14.225980, 53.928249 ], [ 14.203330, 53.909420 ], [ 14.217420, 53.868660 ], [ 14.187220, 53.874981 ], [ 13.939440, 53.843040 ], [ 13.825000, 53.858318 ], [ 13.940550, 53.912769 ], [ 13.903060, 53.988319 ], [ 14.048890, 53.941929 ], [ 14.052500, 53.997490 ], [ 13.976640, 54.042591 ], [ 13.920000, 54.062771 ], [ 13.890550, 54.007488 ], [ 13.775550, 54.021648 ], [ 13.817220, 54.100819 ], [ 13.775550, 54.133598 ], [ 13.911390, 54.084431 ], [ 14.225980, 53.928249 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 13.340830, 54.234989 ], [ 13.335550, 54.279430 ], [ 13.203610, 54.272491 ], [ 13.118330, 54.333881 ], [ 13.130830, 54.370819 ], [ 13.265280, 54.380260 ], [ 13.154720, 54.424431 ], [ 13.272220, 54.475819 ], [ 13.147220, 54.540821 ], [ 13.241660, 54.552761 ], [ 13.306940, 54.513321 ], [ 13.366110, 54.575260 ], [ 13.349720, 54.519428 ], [ 13.375280, 54.557770 ], [ 13.498610, 54.479431 ], [ 13.518330, 54.562481 ], [ 13.401670, 54.573040 ], [ 13.365280, 54.615261 ], [ 13.286390, 54.563320 ], [ 13.246110, 54.557770 ], [ 13.288890, 54.644711 ], [ 13.226660, 54.628601 ], [ 13.230550, 54.647770 ], [ 13.414440, 54.681931 ], [ 13.383050, 54.638882 ], [ 13.400280, 54.594151 ], [ 13.455000, 54.572769 ], [ 13.633890, 54.585819 ], [ 13.676670, 54.565269 ], [ 13.675280, 54.526371 ], [ 13.585280, 54.482769 ], [ 13.577780, 54.453880 ], [ 13.617500, 54.404148 ], [ 13.767780, 54.340820 ], [ 13.696390, 54.292759 ], [ 13.690550, 54.327209 ], [ 13.684440, 54.349152 ], [ 13.449720, 54.316380 ], [ 13.365000, 54.261379 ], [ 13.420000, 54.261379 ], [ 13.429440, 54.238041 ], [ 13.340830, 54.234989 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 9.445169, 54.824780 ], [ 9.503124, 54.848251 ], [ 9.451666, 54.806931 ], [ 9.576944, 54.861931 ], [ 9.578333, 54.825550 ], [ 9.916666, 54.791100 ], [ 10.015830, 54.695541 ], [ 9.930931, 54.667561 ], [ 10.037780, 54.668320 ], [ 10.027780, 54.551102 ], [ 9.865833, 54.477489 ], [ 10.126940, 54.489712 ], [ 10.202780, 54.458050 ], [ 10.198060, 54.395821 ], [ 10.151670, 54.363602 ], [ 10.238050, 54.417210 ], [ 10.372500, 54.434158 ], [ 10.665000, 54.324429 ], [ 10.780000, 54.307770 ], [ 10.848890, 54.341930 ], [ 11.122220, 54.392490 ], [ 11.129170, 54.375542 ], [ 11.064720, 54.349991 ], [ 11.093050, 54.197491 ], [ 10.873890, 54.087769 ], [ 10.802220, 54.095539 ], [ 10.756390, 54.034431 ], [ 10.790000, 53.997211 ], [ 10.870550, 53.991940 ], [ 10.902630, 53.959980 ], [ 11.045830, 54.006649 ], [ 11.192220, 54.010540 ], [ 11.242220, 53.944710 ], [ 11.276940, 53.931660 ], [ 11.338050, 53.957211 ], [ 11.454170, 53.901100 ], [ 11.471390, 53.967770 ], [ 11.586390, 54.042488 ], [ 11.624440, 54.110271 ], [ 12.020000, 54.179710 ], [ 12.100000, 54.181660 ], [ 12.343610, 54.297771 ], [ 12.487220, 54.454990 ], [ 12.911660, 54.439709 ], [ 12.917500, 54.419991 ], [ 12.775830, 54.416660 ], [ 12.605830, 54.406101 ], [ 12.460000, 54.392208 ], [ 12.369720, 54.264992 ], [ 12.418050, 54.260818 ], [ 12.420560, 54.285259 ], [ 12.461940, 54.302490 ], [ 12.712500, 54.409431 ], [ 12.747220, 54.379162 ], [ 12.816110, 54.346371 ], [ 12.998060, 54.434429 ], [ 13.092220, 54.369431 ], [ 13.078890, 54.331661 ], [ 13.160830, 54.262489 ], [ 13.388330, 54.147209 ], [ 13.499720, 54.086102 ], [ 13.711670, 54.171379 ], [ 13.808050, 54.096931 ], [ 13.750560, 54.028599 ], [ 13.913060, 53.917488 ], [ 13.807500, 53.855259 ], [ 13.903610, 53.802761 ], [ 14.140830, 53.738602 ], [ 14.236390, 53.759159 ], [ 14.257710, 53.743179 ], [ 14.237500, 53.698601 ], [ 14.277820, 53.693920 ], [ 14.286390, 53.669151 ], [ 14.375550, 53.423038 ], [ 14.445300, 53.272591 ], [ 14.408610, 53.215820 ], [ 14.390830, 53.141651 ], [ 14.342220, 53.044991 ], [ 14.164720, 52.968868 ], [ 14.133330, 52.833321 ], [ 14.257500, 52.790539 ], [ 14.551110, 52.628590 ], [ 14.641110, 52.566662 ], [ 14.534440, 52.394711 ], [ 14.566940, 52.328041 ], [ 14.713330, 52.239151 ], [ 14.693050, 52.104710 ], [ 14.763530, 52.070808 ], [ 14.747220, 52.056370 ], [ 14.716390, 51.941090 ], [ 14.616110, 51.853870 ], [ 14.601940, 51.813599 ], [ 14.757500, 51.659420 ], [ 14.717500, 51.552761 ], [ 14.910830, 51.483040 ], [ 15.038050, 51.268040 ], [ 14.975280, 51.106380 ], [ 14.828850, 50.866032 ], [ 14.801660, 50.818878 ], [ 14.625270, 50.854160 ], [ 14.650830, 50.924160 ], [ 14.569720, 50.916088 ], [ 14.598890, 50.977200 ], [ 14.472220, 51.031368 ], [ 14.260830, 50.996651 ], [ 14.403610, 50.932491 ], [ 14.393610, 50.894711 ], [ 14.046670, 50.806931 ], [ 13.907780, 50.790539 ], [ 13.861940, 50.725811 ], [ 13.566670, 50.711102 ], [ 13.470000, 50.603321 ], [ 13.380000, 50.641369 ], [ 13.320830, 50.581100 ], [ 13.239440, 50.579708 ], [ 13.191110, 50.503601 ], [ 13.033610, 50.502769 ], [ 12.994440, 50.423038 ], [ 12.903890, 50.423321 ], [ 12.785000, 50.446369 ], [ 12.486390, 50.351379 ], [ 12.364720, 50.279148 ], [ 12.329720, 50.169708 ], [ 12.280550, 50.186100 ], [ 12.260000, 50.261662 ], [ 12.093470, 50.324200 ], [ 12.135830, 50.278320 ], [ 12.096940, 50.249710 ], [ 12.205000, 50.174160 ], [ 12.228890, 50.096371 ], [ 12.428890, 49.984428 ], [ 12.492770, 49.974979 ], [ 12.474440, 49.943039 ], [ 12.542500, 49.920269 ], [ 12.499440, 49.832760 ], [ 12.403050, 49.759991 ], [ 12.441940, 49.700260 ], [ 12.525000, 49.637211 ], [ 12.661660, 49.433868 ], [ 12.878610, 49.328041 ], [ 12.935280, 49.340260 ], [ 13.026940, 49.298321 ], [ 13.151110, 49.177479 ], [ 13.203610, 49.119431 ], [ 13.395280, 49.050259 ], [ 13.401440, 49.007488 ], [ 13.501670, 48.944981 ], [ 13.516110, 48.977760 ], [ 13.584440, 48.968868 ], [ 13.661940, 48.896381 ], [ 13.740830, 48.881649 ], [ 13.814630, 48.787140 ], [ 13.793050, 48.726089 ], [ 13.833330, 48.698872 ], [ 13.726660, 48.517761 ], [ 13.505280, 48.583050 ], [ 13.448330, 48.568600 ], [ 13.433890, 48.419979 ], [ 13.368610, 48.351929 ], [ 12.929520, 48.209301 ], [ 12.756670, 48.120541 ], [ 13.008890, 47.854160 ], [ 12.939720, 47.784710 ], [ 12.917500, 47.715542 ], [ 13.058330, 47.706089 ], [ 13.100280, 47.640820 ], [ 13.074170, 47.616928 ], [ 13.053050, 47.496380 ], [ 13.005000, 47.469429 ], [ 12.809720, 47.552212 ], [ 12.787780, 47.589420 ], [ 12.830830, 47.618870 ], [ 12.773890, 47.674160 ], [ 12.505000, 47.637489 ], [ 12.441670, 47.698589 ], [ 12.243890, 47.694698 ], [ 12.257220, 47.743038 ], [ 12.177220, 47.701649 ], [ 12.206390, 47.641369 ], [ 12.196110, 47.609428 ], [ 11.878610, 47.606651 ], [ 11.633330, 47.595261 ], [ 11.574440, 47.519981 ], [ 11.421940, 47.508881 ], [ 11.405550, 47.453869 ], [ 11.227500, 47.400539 ], [ 11.236660, 47.433041 ], [ 11.203050, 47.435261 ], [ 11.106940, 47.396381 ], [ 10.973610, 47.400539 ], [ 10.950280, 47.460270 ], [ 10.865830, 47.493038 ], [ 10.909720, 47.521931 ], [ 10.848610, 47.536381 ], [ 10.685550, 47.558590 ], [ 10.554440, 47.536930 ], [ 10.465270, 47.558590 ], [ 10.482770, 47.590542 ], [ 10.426940, 47.576931 ], [ 10.473330, 47.435539 ], [ 10.274440, 47.288879 ], [ 10.169720, 47.281101 ], [ 10.214160, 47.315262 ], [ 10.211390, 47.386379 ], [ 10.154440, 47.369148 ], [ 10.087220, 47.387211 ], [ 10.104440, 47.428871 ], [ 10.084440, 47.460270 ], [ 10.003330, 47.483871 ], [ 9.963331, 47.547771 ], [ 9.854164, 47.538879 ], [ 9.813610, 47.593601 ], [ 9.763054, 47.584709 ], [ 9.727293, 47.536259 ], [ 9.605553, 47.529148 ], [ 9.567612, 47.543919 ], [ 9.261665, 47.663040 ], [ 8.878609, 47.655819 ], [ 8.799999, 47.735260 ], [ 8.797499, 47.683041 ], [ 8.724998, 47.697762 ], [ 8.726942, 47.764992 ], [ 8.559721, 47.806370 ], [ 8.406666, 47.703869 ], [ 8.413332, 47.671101 ], [ 8.621664, 47.660259 ], [ 8.618887, 47.639709 ], [ 8.508333, 47.628319 ], [ 8.493031, 47.584560 ], [ 8.340553, 47.574162 ], [ 8.205553, 47.621651 ], [ 7.943332, 47.553600 ], [ 7.819444, 47.588322 ], [ 7.697221, 47.543320 ], [ 7.618332, 47.561100 ], [ 7.674443, 47.606380 ], [ 7.588799, 47.584560 ], [ 7.513333, 47.686932 ], [ 7.615832, 48.002769 ], [ 7.571666, 48.037209 ], [ 7.604999, 48.156929 ], [ 7.750833, 48.336651 ], [ 7.771666, 48.491650 ], [ 7.807499, 48.513321 ], [ 7.801943, 48.592480 ], [ 7.921515, 48.690029 ], [ 8.133333, 48.885540 ], [ 8.227394, 48.963711 ], [ 8.192221, 48.968868 ], [ 7.938610, 49.048870 ], [ 7.741110, 49.041660 ], [ 7.539999, 49.088871 ], [ 7.486943, 49.164150 ], [ 7.375277, 49.171928 ], [ 7.361388, 49.147770 ], [ 7.088332, 49.125259 ], [ 7.038332, 49.118320 ], [ 7.026666, 49.188869 ], [ 6.847499, 49.215260 ], [ 6.838888, 49.154980 ], [ 6.787220, 49.162479 ], [ 6.589722, 49.320271 ], [ 6.594722, 49.363041 ], [ 6.493888, 49.447201 ], [ 6.362221, 49.459980 ], [ 6.372499, 49.590260 ], [ 6.510555, 49.706379 ], [ 6.522222, 49.811100 ], [ 6.326666, 49.839710 ], [ 6.139722, 49.996651 ], [ 6.131833, 50.125530 ], [ 6.173332, 50.232479 ], [ 6.400277, 50.329151 ], [ 6.366387, 50.452209 ], [ 6.200832, 50.516380 ], [ 6.268610, 50.623600 ], [ 6.171388, 50.623871 ], [ 6.108333, 50.723309 ], [ 6.028610, 50.715820 ], [ 6.008407, 50.756069 ], [ 5.981666, 50.802761 ], [ 6.084722, 50.873600 ], [ 6.010833, 50.943600 ], [ 6.028333, 50.976650 ], [ 5.965833, 50.978321 ], [ 5.869443, 51.018879 ], [ 5.873888, 51.050259 ], [ 5.952222, 51.036652 ], [ 6.167221, 51.162762 ], [ 6.079444, 51.175819 ], [ 6.073889, 51.220539 ], [ 6.222221, 51.361660 ], [ 6.217499, 51.476372 ], [ 6.093055, 51.607208 ], [ 6.116110, 51.651920 ], [ 6.029444, 51.678600 ], [ 6.039165, 51.716930 ], [ 5.954999, 51.738590 ], [ 5.968888, 51.791100 ], [ 5.961944, 51.830269 ], [ 6.169721, 51.841930 ], [ 6.137777, 51.876930 ], [ 6.159721, 51.905540 ], [ 6.380277, 51.829990 ], [ 6.548888, 51.885262 ], [ 6.727777, 51.899429 ], [ 6.830832, 51.971371 ], [ 6.800554, 52.007210 ], [ 6.688054, 52.038879 ], [ 6.697498, 52.069981 ], [ 6.860555, 52.120258 ], [ 6.879721, 52.153591 ], [ 7.052499, 52.235821 ], [ 7.065555, 52.385818 ], [ 6.987499, 52.461102 ], [ 6.946110, 52.434429 ], [ 6.705555, 52.485821 ], [ 6.690276, 52.551929 ], [ 6.760833, 52.567211 ], [ 6.720833, 52.629429 ], [ 6.781666, 52.654148 ], [ 7.035832, 52.632759 ], [ 7.055277, 52.651920 ], [ 7.069721, 52.814991 ], [ 7.198888, 52.967758 ], [ 7.209444, 53.242760 ], [ 7.211111, 53.244160 ], [ 7.252777, 53.316929 ], [ 7.050555, 53.339710 ], [ 7.015833, 53.383598 ], [ 7.035000, 53.487492 ], [ 7.147222, 53.537209 ], [ 7.088888, 53.571098 ], [ 7.096110, 53.591930 ], [ 7.252500, 53.673870 ], [ 7.390833, 53.686378 ], [ 7.848611, 53.714161 ], [ 8.026388, 53.703602 ], [ 8.050554, 53.632210 ], [ 8.159443, 53.562481 ], [ 8.163332, 53.520550 ], [ 8.061388, 53.500542 ], [ 8.080276, 53.458050 ], [ 8.223055, 53.400829 ], [ 8.284166, 53.418598 ], [ 8.313889, 53.459431 ], [ 8.311943, 53.524151 ], [ 8.231943, 53.522209 ], [ 8.243055, 53.586102 ], [ 8.283333, 53.613880 ], [ 8.341389, 53.613602 ], [ 8.548887, 53.529430 ], [ 8.488333, 53.479160 ], [ 8.485277, 53.406101 ], [ 8.502777, 53.408871 ], [ 8.568333, 53.533329 ], [ 8.519722, 53.603039 ], [ 8.487778, 53.701931 ], [ 8.604166, 53.879429 ], [ 8.680555, 53.894711 ], [ 8.728054, 53.857769 ], [ 8.907499, 53.828041 ], [ 9.128887, 53.866100 ], [ 9.295216, 53.835690 ], [ 9.359999, 53.786381 ], [ 9.582777, 53.586102 ], [ 9.802221, 53.534710 ], [ 9.824720, 53.550270 ], [ 9.674166, 53.574429 ], [ 9.546665, 53.633598 ], [ 9.529722, 53.707760 ], [ 9.437777, 53.739429 ], [ 9.376389, 53.831379 ], [ 8.961941, 53.898602 ], [ 8.856943, 54.002769 ], [ 8.857777, 54.042210 ], [ 9.003054, 54.028049 ], [ 9.017776, 54.091099 ], [ 8.970276, 54.145550 ], [ 8.844721, 54.133041 ], [ 8.823332, 54.207211 ], [ 8.916111, 54.270821 ], [ 8.958055, 54.316929 ], [ 8.793888, 54.284161 ], [ 8.631666, 54.279148 ], [ 8.599442, 54.327492 ], [ 8.609165, 54.345539 ], [ 8.693888, 54.357491 ], [ 8.654165, 54.375820 ], [ 8.901667, 54.419430 ], [ 9.014721, 54.480259 ], [ 8.974958, 54.514332 ], [ 8.850832, 54.620819 ], [ 8.805622, 54.685219 ], [ 8.676109, 54.779148 ], [ 8.642221, 54.826382 ], [ 8.656296, 54.917400 ], [ 8.719442, 54.891102 ], [ 8.919998, 54.908039 ], [ 9.445169, 54.824780 ] ] ] } ] } ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Estonia', 'density': '30.9', 'population': '1340415' }, 'geometry': { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'Polygon', 'coordinates': [ [ [ 22.051661, 57.909710 ], [ 22.000549, 57.916931 ], [ 21.963890, 57.981659 ], [ 21.996670, 57.979710 ], [ 22.082220, 58.076649 ], [ 22.197220, 58.137489 ], [ 21.884439, 58.252209 ], [ 21.856390, 58.301659 ], [ 21.910271, 58.297489 ], [ 21.873610, 58.332489 ], [ 21.899170, 58.342770 ], [ 21.957781, 58.314430 ], [ 21.961390, 58.349152 ], [ 22.007500, 58.353321 ], [ 21.916660, 58.457489 ], [ 21.831940, 58.504990 ], [ 22.000549, 58.514992 ], [ 22.078051, 58.420551 ], [ 22.095831, 58.421650 ], [ 22.098890, 58.480549 ], [ 22.198330, 58.549431 ], [ 22.240280, 58.499149 ], [ 22.286940, 58.520821 ], [ 22.278891, 58.556931 ], [ 22.551390, 58.631939 ], [ 22.723610, 58.581661 ], [ 22.871670, 58.617771 ], [ 23.009451, 58.589500 ], [ 23.278879, 58.460541 ], [ 23.267500, 58.429440 ], [ 23.156380, 58.479160 ], [ 23.028610, 58.357769 ], [ 22.949169, 58.381649 ], [ 22.929440, 58.326382 ], [ 22.825550, 58.270260 ], [ 22.710550, 58.260540 ], [ 22.756941, 58.240261 ], [ 22.734440, 58.216381 ], [ 22.394171, 58.223320 ], [ 22.279160, 58.183880 ], [ 22.202499, 57.986099 ], [ 22.051661, 57.909710 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 22.565269, 58.686649 ], [ 22.469721, 58.703602 ], [ 22.476391, 58.756939 ], [ 22.445551, 58.838039 ], [ 22.381941, 58.886929 ], [ 22.077499, 58.921379 ], [ 22.042219, 58.939991 ], [ 22.536390, 59.024712 ], [ 22.640499, 59.081791 ], [ 22.715830, 59.069149 ], [ 22.698601, 59.019989 ], [ 22.733891, 59.001381 ], [ 22.929720, 58.982491 ], [ 23.048050, 58.844440 ], [ 23.021660, 58.820541 ], [ 22.898890, 58.834431 ], [ 22.884439, 58.779709 ], [ 22.784439, 58.775829 ], [ 22.829170, 58.818321 ], [ 22.775829, 58.818600 ], [ 22.666941, 58.705269 ], [ 22.565269, 58.686649 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 28.006678, 59.481701 ], [ 28.170300, 59.397800 ], [ 28.193899, 59.375801 ], [ 28.189199, 59.352501 ], [ 28.007500, 59.336102 ], [ 28.097200, 59.308102 ], [ 27.896900, 59.286098 ], [ 27.880600, 59.276100 ], [ 27.886700, 59.254200 ], [ 27.863300, 59.228901 ], [ 27.844200, 59.159698 ], [ 27.792200, 59.063301 ], [ 27.725000, 58.987801 ], [ 27.493601, 58.881901 ], [ 27.423100, 58.801399 ], [ 27.542500, 58.413898 ], [ 27.539200, 58.361698 ], [ 27.464701, 58.297798 ], [ 27.474199, 58.213902 ], [ 27.554199, 58.132801 ], [ 27.673300, 58.078899 ], [ 27.676701, 58.050800 ], [ 27.642500, 58.027802 ], [ 27.670000, 58.009701 ], [ 27.698299, 57.996899 ], [ 27.683901, 57.926399 ], [ 27.805300, 57.891102 ], [ 27.821100, 57.865799 ], [ 27.735001, 57.835602 ], [ 27.545799, 57.817799 ], [ 27.572800, 57.802799 ], [ 27.516399, 57.773300 ], [ 27.526699, 57.722801 ], [ 27.413099, 57.690601 ], [ 27.390800, 57.658901 ], [ 27.415001, 57.636398 ], [ 27.405800, 57.613602 ], [ 27.348101, 57.595600 ], [ 27.371099, 57.536400 ], [ 27.338301, 57.522800 ], [ 27.245001, 57.549198 ], [ 27.087200, 57.562199 ], [ 27.018600, 57.611401 ], [ 26.910000, 57.619202 ], [ 26.890800, 57.633900 ], [ 26.864401, 57.625801 ], [ 26.829201, 57.582500 ], [ 26.760799, 57.571098 ], [ 26.719400, 57.581699 ], [ 26.635000, 57.555801 ], [ 26.608900, 57.526901 ], [ 26.561100, 57.536098 ], [ 26.517200, 57.524399 ], [ 26.460300, 57.570599 ], [ 26.299200, 57.611401 ], [ 26.180300, 57.721901 ], [ 26.037500, 57.784698 ], [ 26.028601, 57.802200 ], [ 26.046700, 57.840302 ], [ 26.031401, 57.849998 ], [ 25.801399, 57.865799 ], [ 25.749201, 57.931099 ], [ 25.622801, 57.916401 ], [ 25.577200, 57.942200 ], [ 25.576401, 57.966900 ], [ 25.461100, 57.994400 ], [ 25.421700, 58.035599 ], [ 25.348301, 58.036701 ], [ 25.301701, 58.083099 ], [ 25.263100, 58.069199 ], [ 25.296900, 58.038101 ], [ 25.294399, 58.007500 ], [ 25.232500, 57.992802 ], [ 25.206100, 58.031700 ], [ 25.170000, 58.074402 ], [ 25.091700, 58.071701 ], [ 24.968100, 58.014400 ], [ 24.885300, 58.007500 ], [ 24.827499, 57.980000 ], [ 24.754200, 58.000801 ], [ 24.717800, 57.958900 ], [ 24.553600, 57.954700 ], [ 24.453100, 57.913300 ], [ 24.420300, 57.874401 ], [ 24.310049, 57.870831 ], [ 24.460831, 58.069439 ], [ 24.472771, 58.247211 ], [ 24.542500, 58.284431 ], [ 24.559441, 58.320541 ], [ 24.517780, 58.353039 ], [ 24.419720, 58.386662 ], [ 24.326111, 58.384708 ], [ 24.238050, 58.271381 ], [ 24.146660, 58.270260 ], [ 24.110550, 58.232208 ], [ 23.937771, 58.325821 ], [ 23.731939, 58.346661 ], [ 23.671671, 58.536652 ], [ 23.500000, 58.559429 ], [ 23.495550, 58.694149 ], [ 23.538891, 58.746101 ], [ 23.808331, 58.729988 ], [ 23.791389, 58.800819 ], [ 23.429440, 58.762489 ], [ 23.527500, 58.823040 ], [ 23.416109, 58.910549 ], [ 23.431110, 58.939430 ], [ 23.637779, 58.970539 ], [ 23.611940, 59.010269 ], [ 23.540831, 58.967209 ], [ 23.407221, 59.018600 ], [ 23.433050, 59.059158 ], [ 23.499720, 59.084991 ], [ 23.526390, 59.106930 ], [ 23.464161, 59.206379 ], [ 23.510830, 59.228321 ], [ 23.738609, 59.232769 ], [ 23.742220, 59.278599 ], [ 24.090000, 59.275829 ], [ 24.100281, 59.303879 ], [ 24.020000, 59.362770 ], [ 24.037220, 59.390541 ], [ 24.081110, 59.392208 ], [ 24.199169, 59.342770 ], [ 24.223610, 59.358318 ], [ 24.167770, 59.412491 ], [ 24.246941, 59.398602 ], [ 24.318890, 59.425819 ], [ 24.329170, 59.464161 ], [ 24.394720, 59.474991 ], [ 24.650829, 59.436100 ], [ 24.622219, 59.467770 ], [ 24.689720, 59.489429 ], [ 24.730829, 59.447769 ], [ 24.783609, 59.448040 ], [ 24.816940, 59.488880 ], [ 24.787220, 59.514992 ], [ 24.790001, 59.566662 ], [ 25.404591, 59.490292 ], [ 25.545561, 59.533871 ], [ 25.469440, 59.648319 ], [ 25.492769, 59.664150 ], [ 25.642780, 59.565269 ], [ 25.700830, 59.568321 ], [ 25.715269, 59.588600 ], [ 25.684170, 59.627769 ], [ 25.694441, 59.668320 ], [ 25.774719, 59.635540 ], [ 25.793329, 59.578602 ], [ 25.847771, 59.574989 ], [ 25.885559, 59.625542 ], [ 25.951111, 59.586929 ], [ 25.992769, 59.629990 ], [ 26.096109, 59.582211 ], [ 26.650551, 59.553322 ], [ 26.964720, 59.444988 ], [ 27.880550, 59.407768 ], [ 27.961390, 59.430820 ], [ 28.006678, 59.481701 ] ] ] } ] } ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Ireland', 'density': '65.2', 'population': '4450030' }, 'geometry': { 'type': 'MultiPolygon', 'coordinates': [ [ [ [ -7.253056, 55.070541 ], [ -7.251112, 55.046101 ], [ -7.073611, 55.037769 ], [ -6.974723, 55.136662 ], [ -6.968056, 55.189709 ], [ -6.754445, 55.167210 ], [ -6.496945, 55.245270 ], [ -6.076945, 55.198040 ], [ -6.033611, 55.154991 ], [ -6.056667, 55.055538 ], [ -5.978612, 55.052212 ], [ -5.966111, 55.024151 ], [ -5.993334, 54.983051 ], [ -5.848056, 54.898602 ], [ -5.785278, 54.833050 ], [ -5.787223, 54.853321 ], [ -5.718334, 54.838039 ], [ -5.687222, 54.777489 ], [ -5.696667, 54.748878 ], [ -5.871389, 54.687481 ], [ -5.924167, 54.633881 ], [ -5.904723, 54.602211 ], [ -5.670279, 54.671101 ], [ -5.577223, 54.678051 ], [ -5.474723, 54.530270 ], [ -5.435556, 54.460541 ], [ -5.499167, 54.331928 ], [ -5.567500, 54.387489 ], [ -5.559723, 54.515820 ], [ -5.680556, 54.573040 ], [ -5.712778, 54.533871 ], [ -5.645278, 54.492489 ], [ -5.640000, 54.403599 ], [ -5.710556, 54.346931 ], [ -5.557778, 54.369709 ], [ -5.534167, 54.313320 ], [ -5.648056, 54.227211 ], [ -5.796667, 54.242489 ], [ -5.863890, 54.223881 ], [ -5.894444, 54.103039 ], [ -6.067779, 54.027760 ], [ -6.196667, 54.095268 ], [ -6.270145, 54.096870 ], [ -6.113890, 54.011662 ], [ -6.105278, 53.992210 ], [ -6.228333, 53.987770 ], [ -6.344445, 54.014431 ], [ -6.381111, 53.917210 ], [ -6.337223, 53.871929 ], [ -6.244722, 53.858601 ], [ -6.256111, 53.807209 ], [ -6.180556, 53.614429 ], [ -6.077778, 53.525829 ], [ -6.103333, 53.488319 ], [ -6.192500, 53.460270 ], [ -6.053334, 53.384430 ], [ -6.066668, 53.361660 ], [ -6.143612, 53.386662 ], [ -6.224723, 53.353870 ], [ -6.077223, 53.193600 ], [ -5.994722, 52.961102 ], [ -6.221667, 52.648041 ], [ -6.200556, 52.555271 ], [ -6.403025, 52.353649 ], [ -6.492500, 52.361370 ], [ -6.411945, 52.285820 ], [ -6.321667, 52.240261 ], [ -6.361389, 52.177490 ], [ -6.474167, 52.206661 ], [ -6.585834, 52.171101 ], [ -6.718889, 52.214161 ], [ -6.795279, 52.204990 ], [ -6.831667, 52.234440 ], [ -6.829167, 52.171940 ], [ -6.936389, 52.120541 ], [ -6.916112, 52.151371 ], [ -6.913334, 52.203041 ], [ -6.995001, 52.282768 ], [ -6.953889, 52.178322 ], [ -7.083611, 52.131378 ], [ -7.075001, 52.160549 ], [ -7.551945, 52.082489 ], [ -7.591111, 52.101379 ], [ -7.634167, 52.068321 ], [ -7.548334, 52.056381 ], [ -7.588334, 51.991650 ], [ -7.812222, 51.941662 ], [ -7.847501, 51.978039 ], [ -7.884167, 51.877769 ], [ -8.005001, 51.859150 ], [ -8.010279, 51.825260 ], [ -8.219168, 51.795818 ], [ -8.228889, 51.828041 ], [ -8.181112, 51.886101 ], [ -8.409445, 51.885818 ], [ -8.393057, 51.875542 ], [ -8.338612, 51.869709 ], [ -8.295834, 51.764431 ], [ -8.386112, 51.706100 ], [ -8.515001, 51.677490 ], [ -8.534168, 51.607491 ], [ -8.566389, 51.637211 ], [ -8.754168, 51.642208 ], [ -8.697779, 51.580540 ], [ -9.120279, 51.552212 ], [ -9.230001, 51.482208 ], [ -9.380001, 51.487209 ], [ -9.403057, 51.545818 ], [ -9.587778, 51.504711 ], [ -9.803335, 51.445820 ], [ -9.816389, 51.486660 ], [ -9.619167, 51.599152 ], [ -9.829723, 51.539989 ], [ -9.811390, 51.558041 ], [ -9.485001, 51.711380 ], [ -9.549446, 51.755260 ], [ -9.601946, 51.688320 ], [ -10.102220, 51.597210 ], [ -10.149440, 51.614990 ], [ -10.065560, 51.624439 ], [ -10.103610, 51.662769 ], [ -9.982779, 51.679150 ], [ -9.986113, 51.709709 ], [ -9.905834, 51.757771 ], [ -9.803612, 51.785549 ], [ -9.579445, 51.869991 ], [ -9.759167, 51.841381 ], [ -10.128060, 51.755550 ], [ -10.223890, 51.774990 ], [ -10.176110, 51.804440 ], [ -10.200560, 51.845829 ], [ -10.337920, 51.783649 ], [ -10.341670, 51.842209 ], [ -10.398060, 51.876659 ], [ -10.248890, 51.901932 ], [ -10.266110, 51.984711 ], [ -9.911112, 52.104160 ], [ -9.766390, 52.144161 ], [ -9.872501, 52.151371 ], [ -9.954723, 52.142490 ], [ -10.237780, 52.115551 ], [ -10.472780, 52.102489 ], [ -10.466950, 52.176659 ], [ -10.169720, 52.287491 ], [ -10.167780, 52.231659 ], [ -10.055830, 52.254990 ], [ -10.033330, 52.287209 ], [ -9.970556, 52.238041 ], [ -9.877501, 52.230549 ], [ -9.740835, 52.244709 ], [ -9.835001, 52.310551 ], [ -9.837778, 52.376381 ], [ -9.945557, 52.402489 ], [ -9.928335, 52.422489 ], [ -9.635279, 52.469440 ], [ -9.675835, 52.545269 ], [ -9.616945, 52.570820 ], [ -9.295000, 52.565540 ], [ -8.810556, 52.661098 ], [ -8.742224, 52.670818 ], [ -8.951668, 52.679710 ], [ -8.945557, 52.773880 ], [ -9.115835, 52.649712 ], [ -9.281668, 52.588329 ], [ -9.331945, 52.595829 ], [ -9.275278, 52.632488 ], [ -9.407223, 52.604988 ], [ -9.571112, 52.663052 ], [ -9.623335, 52.611099 ], [ -9.627779, 52.611660 ], [ -9.886112, 52.550270 ], [ -9.911390, 52.572491 ], [ -9.664446, 52.677761 ], [ -9.603334, 52.737209 ], [ -9.490278, 52.773319 ], [ -9.351946, 52.927490 ], [ -9.468056, 52.927490 ], [ -9.350834, 53.071098 ], [ -9.253056, 53.149151 ], [ -9.075556, 53.116379 ], [ -9.085556, 53.160820 ], [ -8.938334, 53.140541 ], [ -8.948891, 53.185551 ], [ -8.984446, 53.215549 ], [ -8.983334, 53.248322 ], [ -9.033056, 53.271648 ], [ -9.490002, 53.223598 ], [ -9.542778, 53.227772 ], [ -9.552778, 53.289711 ], [ -9.600279, 53.232208 ], [ -9.611668, 53.268600 ], [ -9.620001, 53.319439 ], [ -9.557779, 53.335541 ], [ -9.599445, 53.364429 ], [ -9.611113, 53.331661 ], [ -9.649723, 53.326649 ], [ -9.638334, 53.382771 ], [ -9.700001, 53.361370 ], [ -9.775278, 53.296940 ], [ -9.897223, 53.350269 ], [ -9.800556, 53.410259 ], [ -9.948057, 53.378601 ], [ -10.176110, 53.407768 ], [ -10.147780, 53.443878 ], [ -10.054450, 53.450821 ], [ -10.011390, 53.475819 ], [ -10.136110, 53.519711 ], [ -10.201950, 53.540821 ], [ -10.050280, 53.563320 ], [ -10.009720, 53.601940 ], [ -9.699446, 53.595829 ], [ -9.913334, 53.647491 ], [ -9.906389, 53.758598 ], [ -9.607224, 53.820541 ], [ -9.566946, 53.886379 ], [ -9.764723, 53.894428 ], [ -9.902779, 53.857769 ], [ -9.942780, 53.869991 ], [ -9.912779, 53.949429 ], [ -9.812223, 53.939709 ], [ -9.904167, 54.016380 ], [ -9.891668, 54.085270 ], [ -9.936111, 54.060822 ], [ -9.984446, 54.091930 ], [ -9.932501, 54.145550 ], [ -9.998611, 54.214432 ], [ -10.090560, 54.119431 ], [ -10.067220, 54.088600 ], [ -10.124440, 54.096371 ], [ -10.092780, 54.195820 ], [ -10.081670, 54.257210 ], [ -10.009170, 54.300819 ], [ -9.886112, 54.260818 ], [ -9.924168, 54.221371 ], [ -9.920279, 54.206928 ], [ -9.761391, 54.281380 ], [ -9.842224, 54.304989 ], [ -9.843613, 54.325550 ], [ -9.305002, 54.307209 ], [ -9.199722, 54.239712 ], [ -9.218334, 54.211651 ], [ -9.142223, 54.139149 ], [ -9.063612, 54.276100 ], [ -8.936945, 54.283600 ], [ -8.565834, 54.233601 ], [ -8.620001, 54.257210 ], [ -8.539167, 54.279991 ], [ -8.509167, 54.318321 ], [ -8.666389, 54.337769 ], [ -8.583889, 54.391102 ], [ -8.478889, 54.425270 ], [ -8.395834, 54.461929 ], [ -8.210556, 54.498051 ], [ -8.267223, 54.515820 ], [ -8.146112, 54.633598 ], [ -8.381945, 54.616379 ], [ -8.774445, 54.656651 ], [ -8.801111, 54.691662 ], [ -8.623890, 54.769428 ], [ -8.412500, 54.753601 ], [ -8.525278, 54.811378 ], [ -8.506945, 54.841648 ], [ -8.331945, 54.829151 ], [ -8.384167, 54.853600 ], [ -8.370001, 54.874439 ], [ -8.315834, 54.869709 ], [ -8.339445, 54.903599 ], [ -8.423056, 54.891102 ], [ -8.460001, 54.938320 ], [ -8.367224, 54.941380 ], [ -8.454723, 54.991650 ], [ -8.353889, 55.056931 ], [ -8.323612, 55.024151 ], [ -8.292501, 55.152489 ], [ -8.087778, 55.159431 ], [ -7.964723, 55.183041 ], [ -7.863890, 55.164440 ], [ -7.874167, 55.206379 ], [ -7.798889, 55.249439 ], [ -7.811111, 55.177212 ], [ -7.727778, 55.167210 ], [ -7.704167, 55.094151 ], [ -7.668056, 55.141930 ], [ -7.698611, 55.214161 ], [ -7.720556, 55.216648 ], [ -7.735001, 55.187771 ], [ -7.790556, 55.203320 ], [ -7.761111, 55.254429 ], [ -7.657778, 55.274429 ], [ -7.616945, 55.242771 ], [ -7.573611, 55.161381 ], [ -7.532223, 55.099152 ], [ -7.640000, 55.044430 ], [ -7.566945, 55.048038 ], [ -7.597222, 55.012489 ], [ -7.665001, 54.952492 ], [ -7.452500, 55.047489 ], [ -7.454722, 55.132210 ], [ -7.547501, 55.197208 ], [ -7.521111, 55.283600 ], [ -7.262778, 55.274712 ], [ -7.399167, 55.377209 ], [ -7.267654, 55.355061 ], [ -6.938612, 55.241100 ], [ -6.964445, 55.208881 ], [ -7.159445, 55.145821 ], [ -7.253056, 55.070541 ] ] ] ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Greece', 'density': '86.2', 'population': '11260402' }, 'geometry': { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'Polygon', 'coordinates': [ [ [ 20.794720, 38.063320 ], [ 20.721661, 38.064430 ], [ 20.627220, 38.117210 ], [ 20.517220, 38.102489 ], [ 20.468050, 38.184158 ], [ 20.450550, 38.273602 ], [ 20.434990, 38.168320 ], [ 20.361380, 38.168880 ], [ 20.354160, 38.242771 ], [ 20.418051, 38.349430 ], [ 20.500549, 38.317211 ], [ 20.546659, 38.361099 ], [ 20.571110, 38.468040 ], [ 20.628050, 38.335541 ], [ 20.609440, 38.284161 ], [ 20.636101, 38.251659 ], [ 20.687220, 38.264431 ], [ 20.811661, 38.121380 ], [ 20.794720, 38.063320 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 24.738050, 34.929989 ], [ 24.762770, 35.015820 ], [ 24.731380, 35.083321 ], [ 24.371941, 35.190269 ], [ 24.048880, 35.189991 ], [ 23.824160, 35.246658 ], [ 23.598330, 35.230549 ], [ 23.521111, 35.288052 ], [ 23.584721, 35.562481 ], [ 23.656940, 35.496380 ], [ 23.722219, 35.509430 ], [ 23.709440, 35.651932 ], [ 23.741659, 35.687771 ], [ 23.769440, 35.638882 ], [ 23.787491, 35.548321 ], [ 24.000271, 35.514149 ], [ 24.089720, 35.552212 ], [ 24.079161, 35.583599 ], [ 24.126110, 35.601940 ], [ 24.201660, 35.548321 ], [ 24.169439, 35.502769 ], [ 24.080830, 35.510540 ], [ 24.092489, 35.486931 ], [ 24.222500, 35.460541 ], [ 24.263330, 35.427761 ], [ 24.266109, 35.367210 ], [ 24.413330, 35.357769 ], [ 24.802771, 35.409161 ], [ 25.046379, 35.399151 ], [ 25.052219, 35.350269 ], [ 25.463329, 35.292488 ], [ 25.762211, 35.334431 ], [ 25.710270, 35.174431 ], [ 25.772499, 35.119431 ], [ 25.812220, 35.108879 ], [ 25.967770, 35.194988 ], [ 26.113050, 35.221100 ], [ 26.118610, 35.198040 ], [ 26.201941, 35.227211 ], [ 26.321110, 35.310551 ], [ 26.273880, 35.213039 ], [ 26.290550, 35.131100 ], [ 26.197220, 35.014431 ], [ 26.004160, 35.015270 ], [ 25.936380, 35.029430 ], [ 25.528879, 34.991650 ], [ 25.126110, 34.947208 ], [ 24.738050, 34.929989 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 24.966110, 37.689430 ], [ 24.778049, 37.853600 ], [ 24.692490, 37.944988 ], [ 24.740549, 37.988880 ], [ 24.793610, 37.989990 ], [ 24.876659, 37.903881 ], [ 24.952499, 37.901661 ], [ 24.966110, 37.689430 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 20.816660, 37.650269 ], [ 20.622770, 37.819149 ], [ 20.643330, 37.898319 ], [ 20.706390, 37.922489 ], [ 20.744160, 37.856930 ], [ 20.939720, 37.758881 ], [ 20.995550, 37.703880 ], [ 20.910271, 37.731930 ], [ 20.866940, 37.724152 ], [ 20.858330, 37.654991 ], [ 20.816660, 37.650269 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 26.014721, 38.149429 ], [ 25.864170, 38.238319 ], [ 25.873880, 38.269428 ], [ 25.991659, 38.343880 ], [ 25.945829, 38.455269 ], [ 25.829720, 38.533329 ], [ 25.848330, 38.575821 ], [ 26.055269, 38.592491 ], [ 26.124439, 38.558601 ], [ 26.160549, 38.538052 ], [ 26.143600, 38.347210 ], [ 26.160271, 38.301380 ], [ 26.106939, 38.274712 ], [ 26.117769, 38.226940 ], [ 26.014721, 38.149429 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 26.823050, 37.637211 ], [ 26.711380, 37.708321 ], [ 26.597219, 37.674992 ], [ 26.571659, 37.730549 ], [ 26.713051, 37.803322 ], [ 26.846939, 37.803600 ], [ 26.967220, 37.747490 ], [ 26.988609, 37.788879 ], [ 27.064720, 37.770821 ], [ 27.028879, 37.753319 ], [ 27.069441, 37.711929 ], [ 26.823050, 37.637211 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 20.079720, 39.368320 ], [ 19.880280, 39.446381 ], [ 19.769171, 39.609711 ], [ 19.627501, 39.747761 ], [ 19.744440, 39.794708 ], [ 19.855000, 39.818321 ], [ 19.946939, 39.783600 ], [ 19.929159, 39.731098 ], [ 19.842489, 39.702770 ], [ 19.862221, 39.641930 ], [ 19.911659, 39.600819 ], [ 19.926670, 39.480549 ], [ 20.022499, 39.433041 ], [ 20.071659, 39.453602 ], [ 20.121670, 39.377769 ], [ 20.079720, 39.368320 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 25.452770, 36.918320 ], [ 25.373051, 37.019161 ], [ 25.341110, 37.074989 ], [ 25.535271, 37.197769 ], [ 25.572220, 37.173599 ], [ 25.589991, 37.064709 ], [ 25.556660, 36.957760 ], [ 25.452770, 36.918320 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 26.418610, 38.960819 ], [ 26.089161, 39.072208 ], [ 26.286110, 39.167759 ], [ 26.289989, 39.186939 ], [ 26.216379, 39.201382 ], [ 26.123880, 39.139992 ], [ 26.084721, 39.089710 ], [ 25.955830, 39.105820 ], [ 25.843880, 39.222488 ], [ 25.907770, 39.286930 ], [ 26.061100, 39.288879 ], [ 26.208611, 39.379711 ], [ 26.358330, 39.375820 ], [ 26.419991, 39.325821 ], [ 26.377220, 39.273602 ], [ 26.565830, 39.111931 ], [ 26.618330, 39.026100 ], [ 26.556660, 39.011379 ], [ 26.510830, 39.048038 ], [ 26.526661, 39.074429 ], [ 26.492220, 39.111370 ], [ 26.448879, 39.106098 ], [ 26.512770, 39.028881 ], [ 26.544439, 38.986660 ], [ 26.418610, 38.960819 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 27.781380, 35.890270 ], [ 27.730270, 35.913319 ], [ 27.710831, 36.139431 ], [ 27.895830, 36.332211 ], [ 28.207220, 36.442490 ], [ 28.242220, 36.383320 ], [ 28.063610, 36.111931 ], [ 28.090830, 36.056381 ], [ 27.956659, 36.044991 ], [ 27.842770, 35.913601 ], [ 27.781380, 35.890270 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 24.509159, 37.953602 ], [ 24.397499, 38.007771 ], [ 24.387770, 37.964710 ], [ 24.317209, 38.017769 ], [ 24.291109, 38.082489 ], [ 24.183331, 38.125820 ], [ 24.209440, 38.164711 ], [ 24.166109, 38.227211 ], [ 24.121111, 38.216381 ], [ 24.158331, 38.270550 ], [ 24.109720, 38.304989 ], [ 24.050831, 38.362209 ], [ 24.000000, 38.401661 ], [ 23.738331, 38.401100 ], [ 23.629950, 38.460480 ], [ 23.632771, 38.521931 ], [ 23.559719, 38.580818 ], [ 23.515551, 38.585819 ], [ 23.325270, 38.758598 ], [ 22.978331, 38.884708 ], [ 22.993330, 38.853321 ], [ 22.833050, 38.823040 ], [ 22.879440, 38.873878 ], [ 23.112221, 38.988602 ], [ 23.299721, 39.038601 ], [ 23.429991, 38.947208 ], [ 23.443331, 38.878601 ], [ 23.570829, 38.784988 ], [ 23.659719, 38.754429 ], [ 23.714439, 38.764992 ], [ 23.854160, 38.674431 ], [ 24.113331, 38.665272 ], [ 24.156940, 38.648880 ], [ 24.125549, 38.627209 ], [ 24.124161, 38.597210 ], [ 24.230829, 38.524151 ], [ 24.183880, 38.444988 ], [ 24.257219, 38.217770 ], [ 24.455549, 38.139992 ], [ 24.590269, 38.155540 ], [ 24.564159, 37.987209 ], [ 24.509159, 37.953602 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 25.356939, 39.789989 ], [ 25.271379, 39.832489 ], [ 25.267771, 39.909988 ], [ 25.203051, 39.891930 ], [ 25.201660, 39.827492 ], [ 25.223049, 39.799431 ], [ 25.140270, 39.810551 ], [ 25.124439, 39.851650 ], [ 25.049999, 39.859711 ], [ 25.033331, 39.989429 ], [ 25.226660, 40.003040 ], [ 25.338329, 39.966381 ], [ 25.437771, 40.020550 ], [ 25.441660, 40.004711 ], [ 25.338051, 39.854710 ], [ 25.356939, 39.789989 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 24.643600, 40.570820 ], [ 24.513611, 40.636929 ], [ 24.533600, 40.714161 ], [ 24.654720, 40.796379 ], [ 24.777220, 40.746101 ], [ 24.776110, 40.610538 ], [ 24.643600, 40.570820 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 26.222771, 41.744431 ], [ 26.361879, 41.701550 ], [ 26.495819, 41.664429 ], [ 26.593611, 41.611099 ], [ 26.637211, 41.378590 ], [ 26.617769, 41.336929 ], [ 26.449440, 41.285259 ], [ 26.320829, 41.184711 ], [ 26.327221, 40.941929 ], [ 26.203600, 40.862759 ], [ 26.199989, 40.828869 ], [ 26.134159, 40.781368 ], [ 26.124710, 40.749989 ], [ 26.033310, 40.734890 ], [ 26.061110, 40.827209 ], [ 25.659439, 40.858879 ], [ 25.255831, 40.933601 ], [ 25.135269, 40.951931 ], [ 25.153049, 41.003319 ], [ 25.041380, 41.005260 ], [ 24.985001, 40.931660 ], [ 24.891109, 40.917210 ], [ 24.803329, 40.852489 ], [ 24.627489, 40.858601 ], [ 24.566660, 40.950550 ], [ 24.398050, 40.936939 ], [ 24.308331, 40.846100 ], [ 24.114441, 40.728039 ], [ 23.994440, 40.728321 ], [ 23.846100, 40.787209 ], [ 23.731661, 40.753040 ], [ 23.689159, 40.691929 ], [ 23.824989, 40.565819 ], [ 23.915270, 40.538319 ], [ 23.823050, 40.508320 ], [ 23.845831, 40.438881 ], [ 23.961109, 40.378601 ], [ 24.008881, 40.388050 ], [ 23.996111, 40.452209 ], [ 24.288330, 40.251930 ], [ 24.393049, 40.168598 ], [ 24.396660, 40.143318 ], [ 24.306110, 40.118881 ], [ 24.164709, 40.278320 ], [ 23.861940, 40.371929 ], [ 23.710831, 40.337212 ], [ 23.691099, 40.297771 ], [ 23.773880, 40.196098 ], [ 23.966940, 40.133320 ], [ 24.014721, 40.030540 ], [ 23.992769, 39.954990 ], [ 23.903049, 39.965820 ], [ 23.699440, 40.193600 ], [ 23.559441, 40.239990 ], [ 23.408331, 40.281651 ], [ 23.353609, 40.245270 ], [ 23.329990, 40.209431 ], [ 23.476660, 40.047771 ], [ 23.747770, 39.932770 ], [ 23.714439, 39.912769 ], [ 23.358330, 39.958599 ], [ 23.379721, 39.996929 ], [ 23.311100, 40.224152 ], [ 22.930000, 40.387489 ], [ 22.818890, 40.481930 ], [ 22.964720, 40.528320 ], [ 22.961380, 40.573601 ], [ 22.944441, 40.628040 ], [ 22.855551, 40.638599 ], [ 22.819441, 40.572491 ], [ 22.741940, 40.541660 ], [ 22.591110, 40.476650 ], [ 22.626381, 40.387760 ], [ 22.662220, 40.372490 ], [ 22.548889, 40.160549 ], [ 22.593330, 40.015270 ], [ 22.729441, 39.881100 ], [ 22.847500, 39.798870 ], [ 22.924440, 39.593601 ], [ 23.207491, 39.370541 ], [ 23.343330, 39.192760 ], [ 23.328051, 39.156940 ], [ 23.094440, 39.086380 ], [ 23.054440, 39.095829 ], [ 23.109989, 39.158039 ], [ 23.098330, 39.104160 ], [ 23.210831, 39.150829 ], [ 23.221100, 39.184990 ], [ 23.122770, 39.304150 ], [ 22.946110, 39.360538 ], [ 22.941099, 39.296650 ], [ 22.846100, 39.283871 ], [ 22.816940, 39.253880 ], [ 22.851940, 39.158329 ], [ 22.900551, 39.173038 ], [ 22.995001, 39.042759 ], [ 22.961109, 39.006939 ], [ 23.068050, 39.037491 ], [ 22.949711, 38.941101 ], [ 22.693880, 38.878880 ], [ 22.526939, 38.882488 ], [ 22.597219, 38.826931 ], [ 22.697500, 38.849152 ], [ 22.756660, 38.787491 ], [ 23.031940, 38.752769 ], [ 23.105829, 38.631378 ], [ 23.189159, 38.652760 ], [ 23.311661, 38.646648 ], [ 23.338329, 38.609989 ], [ 23.283051, 38.560261 ], [ 23.378880, 38.529991 ], [ 23.410830, 38.502769 ], [ 23.587219, 38.485538 ], [ 23.675550, 38.348598 ], [ 23.926661, 38.294991 ], [ 24.073879, 38.196930 ], [ 24.061939, 38.128319 ], [ 24.038050, 38.141102 ], [ 23.983879, 38.106098 ], [ 24.048330, 37.901932 ], [ 24.063881, 37.834709 ], [ 24.076111, 37.738602 ], [ 24.040831, 37.655819 ], [ 23.950830, 37.669708 ], [ 23.870270, 37.801102 ], [ 23.746660, 37.850819 ], [ 23.691380, 37.941929 ], [ 23.566940, 37.965260 ], [ 23.598330, 38.026932 ], [ 23.520269, 38.040821 ], [ 23.314440, 37.972759 ], [ 23.180550, 37.953320 ], [ 23.045271, 37.918320 ], [ 22.992220, 37.884159 ], [ 23.004721, 37.848881 ], [ 23.179720, 37.805820 ], [ 23.152491, 37.759430 ], [ 23.123600, 37.734711 ], [ 23.173611, 37.716099 ], [ 23.161381, 37.619991 ], [ 23.322769, 37.532490 ], [ 23.364990, 37.546379 ], [ 23.311100, 37.613319 ], [ 23.388330, 37.636662 ], [ 23.410549, 37.614159 ], [ 23.374161, 37.555271 ], [ 23.523609, 37.442211 ], [ 23.422220, 37.410259 ], [ 23.235550, 37.381939 ], [ 23.274990, 37.344711 ], [ 23.187771, 37.339161 ], [ 23.185551, 37.292210 ], [ 23.071659, 37.356930 ], [ 23.114990, 37.419430 ], [ 23.128880, 37.448040 ], [ 22.877489, 37.529430 ], [ 22.825270, 37.528320 ], [ 22.788050, 37.586380 ], [ 22.743610, 37.581928 ], [ 22.722771, 37.561378 ], [ 22.800270, 37.352489 ], [ 22.911390, 37.194149 ], [ 22.896111, 37.130550 ], [ 23.004160, 37.027489 ], [ 23.058880, 36.838600 ], [ 23.114161, 36.774712 ], [ 23.031940, 36.668598 ], [ 23.078890, 36.576649 ], [ 23.153330, 36.538601 ], [ 23.134991, 36.497490 ], [ 23.202770, 36.453041 ], [ 23.198330, 36.431931 ], [ 23.089991, 36.439991 ], [ 23.056660, 36.513321 ], [ 22.938049, 36.580269 ], [ 22.795549, 36.769711 ], [ 22.781940, 36.800541 ], [ 22.634159, 36.804440 ], [ 22.572769, 36.773880 ], [ 22.479441, 36.592770 ], [ 22.488890, 36.386101 ], [ 22.416660, 36.474991 ], [ 22.375271, 36.478039 ], [ 22.367220, 36.543049 ], [ 22.384720, 36.642490 ], [ 22.233049, 36.891102 ], [ 22.138889, 36.911652 ], [ 22.158880, 37.013321 ], [ 22.073059, 37.030819 ], [ 21.953609, 36.997490 ], [ 21.927219, 36.899712 ], [ 21.931391, 36.820541 ], [ 21.939159, 36.766651 ], [ 21.881380, 36.720268 ], [ 21.822220, 36.804989 ], [ 21.704439, 36.815269 ], [ 21.696110, 36.906651 ], [ 21.711941, 36.944439 ], [ 21.581381, 37.061378 ], [ 21.564159, 37.152489 ], [ 21.647499, 37.254429 ], [ 21.694719, 37.305271 ], [ 21.659719, 37.423870 ], [ 21.560829, 37.547211 ], [ 21.389999, 37.657211 ], [ 21.331110, 37.665272 ], [ 21.293610, 37.778599 ], [ 21.113050, 37.838329 ], [ 21.124161, 37.929440 ], [ 21.190550, 37.930271 ], [ 21.310280, 38.038052 ], [ 21.375271, 38.199989 ], [ 21.645269, 38.160259 ], [ 21.735830, 38.250542 ], [ 21.848881, 38.338329 ], [ 22.112221, 38.261662 ], [ 22.262770, 38.176929 ], [ 22.667770, 38.064709 ], [ 22.857491, 37.941101 ], [ 22.947220, 37.944439 ], [ 22.978889, 37.982208 ], [ 22.853880, 38.031380 ], [ 22.948330, 38.080269 ], [ 23.097771, 38.058601 ], [ 23.213600, 38.097488 ], [ 23.226101, 38.153049 ], [ 22.953609, 38.222210 ], [ 22.913601, 38.189159 ], [ 22.873051, 38.234150 ], [ 22.765551, 38.244431 ], [ 22.795549, 38.275539 ], [ 22.676109, 38.343601 ], [ 22.688049, 38.354160 ], [ 22.662491, 38.383320 ], [ 22.586380, 38.286652 ], [ 22.526100, 38.322491 ], [ 22.463881, 38.424709 ], [ 22.397499, 38.410259 ], [ 22.381941, 38.335819 ], [ 22.233601, 38.360271 ], [ 22.155550, 38.345539 ], [ 21.985550, 38.404148 ], [ 21.791109, 38.373322 ], [ 21.766109, 38.327492 ], [ 21.599991, 38.344440 ], [ 21.481661, 38.300541 ], [ 21.473610, 38.365551 ], [ 21.373880, 38.395821 ], [ 21.332220, 38.492771 ], [ 21.293880, 38.361931 ], [ 21.176109, 38.298870 ], [ 21.093330, 38.364159 ], [ 21.139721, 38.393040 ], [ 21.094990, 38.426929 ], [ 21.097219, 38.528320 ], [ 21.028330, 38.516102 ], [ 20.989441, 38.669991 ], [ 20.918329, 38.669991 ], [ 20.880280, 38.787769 ], [ 20.849159, 38.798321 ], [ 20.779160, 38.758041 ], [ 20.734440, 38.828602 ], [ 20.804991, 38.866940 ], [ 20.749720, 38.909710 ], [ 20.768560, 38.954479 ], [ 20.794439, 38.921379 ], [ 21.029720, 38.930538 ], [ 21.023609, 38.898319 ], [ 21.086941, 38.863880 ], [ 21.093880, 38.907490 ], [ 21.156111, 38.892769 ], [ 21.140829, 38.959709 ], [ 21.166109, 38.978870 ], [ 21.098610, 39.053051 ], [ 21.038879, 39.020260 ], [ 20.936100, 39.038879 ], [ 20.884439, 39.059158 ], [ 20.788330, 39.092770 ], [ 20.740280, 39.017208 ], [ 20.818050, 38.965820 ], [ 20.735830, 38.950821 ], [ 20.690550, 39.067490 ], [ 20.475830, 39.239990 ], [ 20.481110, 39.277210 ], [ 20.343330, 39.288601 ], [ 20.214161, 39.437771 ], [ 20.269720, 39.443050 ], [ 20.214991, 39.512760 ], [ 20.148609, 39.560822 ], [ 20.187771, 39.609440 ], [ 20.063330, 39.679989 ], [ 20.012300, 39.690231 ], [ 20.260559, 39.667759 ], [ 20.302490, 39.778320 ], [ 20.291380, 39.806648 ], [ 20.381380, 39.787209 ], [ 20.410549, 39.811932 ], [ 20.363050, 39.907490 ], [ 20.314720, 39.990261 ], [ 20.394159, 39.999149 ], [ 20.412769, 40.051090 ], [ 20.513611, 40.081379 ], [ 20.555830, 40.066380 ], [ 20.665270, 40.094151 ], [ 20.787220, 40.394711 ], [ 20.842220, 40.474979 ], [ 20.936939, 40.464432 ], [ 21.053049, 40.618591 ], [ 21.051941, 40.676651 ], [ 21.031469, 40.698250 ], [ 21.030411, 40.699360 ], [ 20.961941, 40.771648 ], [ 20.966810, 40.791180 ], [ 20.983250, 40.857021 ], [ 21.120010, 40.862679 ], [ 21.343050, 40.871929 ], [ 21.471661, 40.910542 ], [ 21.672489, 40.901920 ], [ 21.694441, 40.938030 ], [ 21.780270, 40.928871 ], [ 21.916109, 41.095261 ], [ 22.066660, 41.158321 ], [ 22.131100, 41.124981 ], [ 22.246941, 41.170540 ], [ 22.468880, 41.121651 ], [ 22.590269, 41.119980 ], [ 22.653879, 41.185261 ], [ 22.720551, 41.142761 ], [ 22.741171, 41.186020 ], [ 22.754709, 41.214432 ], [ 22.765289, 41.243839 ], [ 22.801380, 41.344151 ], [ 22.935949, 41.343300 ], [ 23.175819, 41.322762 ], [ 23.281111, 41.403309 ], [ 23.668051, 41.405819 ], [ 23.891100, 41.452770 ], [ 23.956100, 41.446091 ], [ 24.074989, 41.467201 ], [ 24.078609, 41.537209 ], [ 24.157221, 41.541100 ], [ 24.184719, 41.516651 ], [ 24.245541, 41.567760 ], [ 24.304710, 41.548599 ], [ 24.363880, 41.523602 ], [ 24.526100, 41.572208 ], [ 24.658600, 41.421101 ], [ 24.725269, 41.418049 ], [ 24.798880, 41.354710 ], [ 24.894711, 41.410542 ], [ 25.209990, 41.293880 ], [ 25.239429, 41.254429 ], [ 25.388050, 41.263050 ], [ 25.653049, 41.317760 ], [ 25.805830, 41.333870 ], [ 26.135269, 41.353870 ], [ 26.198050, 41.439419 ], [ 26.099720, 41.636650 ], [ 26.067490, 41.678871 ], [ 26.074440, 41.711929 ], [ 26.222771, 41.744431 ] ] ] } ] } ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Spain', 'density': '91.5', 'population': '45828172' }, 'geometry': { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'Polygon', 'coordinates': [ [ [ -14.333060, 28.044439 ], [ -14.473890, 28.068609 ], [ -14.494450, 28.099720 ], [ -14.309170, 28.142771 ], [ -14.209720, 28.228050 ], [ -14.202500, 28.294720 ], [ -14.087780, 28.499720 ], [ -14.027500, 28.623051 ], [ -13.972500, 28.729719 ], [ -13.865840, 28.747770 ], [ -13.820560, 28.577221 ], [ -13.855830, 28.478609 ], [ -13.844170, 28.402220 ], [ -13.950280, 28.224720 ], [ -14.140280, 28.183611 ], [ -14.333060, 28.044439 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 3.063611, 39.263599 ], [ 2.902222, 39.359711 ], [ 2.793056, 39.362492 ], [ 2.729167, 39.467770 ], [ 2.722500, 39.529991 ], [ 2.618889, 39.550270 ], [ 2.523611, 39.453041 ], [ 2.358055, 39.557491 ], [ 2.373055, 39.610821 ], [ 2.660833, 39.762760 ], [ 2.815833, 39.861660 ], [ 3.130833, 39.917488 ], [ 3.091944, 39.901371 ], [ 3.111944, 39.866379 ], [ 3.205277, 39.867489 ], [ 3.154444, 39.834709 ], [ 3.123888, 39.822491 ], [ 3.147222, 39.779430 ], [ 3.247777, 39.734711 ], [ 3.452777, 39.749989 ], [ 3.463611, 39.661381 ], [ 3.291944, 39.472488 ], [ 3.241944, 39.364429 ], [ 3.063611, 39.263599 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -15.590830, 27.734720 ], [ -15.785280, 27.837490 ], [ -15.817500, 27.938610 ], [ -15.708330, 28.074989 ], [ -15.705000, 28.165831 ], [ -15.466390, 28.126659 ], [ -15.430280, 28.149719 ], [ -15.371950, 27.859720 ], [ -15.590830, 27.734720 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -16.682501, 27.986940 ], [ -16.781389, 28.129990 ], [ -16.904169, 28.350830 ], [ -16.558331, 28.393600 ], [ -16.376110, 28.536940 ], [ -16.236670, 28.562220 ], [ -16.121950, 28.576941 ], [ -16.118610, 28.516380 ], [ -16.351110, 28.358061 ], [ -16.349449, 28.298880 ], [ -16.501390, 28.049160 ], [ -16.682501, 27.986940 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 1.383055, 38.836651 ], [ 1.277222, 38.879711 ], [ 1.222500, 38.874149 ], [ 1.242500, 38.968040 ], [ 1.292222, 39.005260 ], [ 1.357222, 39.069710 ], [ 1.519722, 39.118320 ], [ 1.600555, 39.096100 ], [ 1.585000, 39.002769 ], [ 1.412500, 38.890541 ], [ 1.383055, 38.836651 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -13.773060, 28.837770 ], [ -13.863890, 28.853880 ], [ -13.852220, 28.906380 ], [ -13.793610, 29.050831 ], [ -13.593890, 29.138050 ], [ -13.551390, 29.120270 ], [ -13.476390, 29.241940 ], [ -13.422500, 29.208050 ], [ -13.455560, 29.142771 ], [ -13.481670, 28.996941 ], [ -13.773060, 28.837770 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -17.861111, 28.476660 ], [ -17.970560, 28.716660 ], [ -17.995010, 28.778049 ], [ -17.904449, 28.849440 ], [ -17.781389, 28.838881 ], [ -17.716669, 28.740549 ], [ -17.756950, 28.673330 ], [ -17.739170, 28.607771 ], [ -17.783340, 28.529160 ], [ -17.815559, 28.480551 ], [ -17.861111, 28.476660 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 4.295278, 39.810551 ], [ 4.116388, 39.868320 ], [ 3.965555, 39.933601 ], [ 3.826666, 39.922489 ], [ 3.840555, 39.995819 ], [ 3.801944, 40.002209 ], [ 3.831388, 40.052761 ], [ 4.136666, 40.063599 ], [ 4.180833, 40.059429 ], [ 4.227777, 39.996101 ], [ 4.287499, 39.946659 ], [ 4.336666, 39.872490 ], [ 4.295278, 39.810551 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 1.435247, 42.597149 ], [ 1.446388, 42.572208 ], [ 1.448333, 42.450821 ], [ 1.533333, 42.436100 ], [ 1.710967, 42.473499 ], [ 1.787500, 42.490261 ], [ 1.953055, 42.437199 ], [ 1.976666, 42.374699 ], [ 2.086944, 42.363319 ], [ 2.254167, 42.434711 ], [ 2.476666, 42.351650 ], [ 2.671111, 42.338322 ], [ 2.678333, 42.401649 ], [ 3.038333, 42.474979 ], [ 3.150833, 42.433319 ], [ 3.176962, 42.437611 ], [ 3.187500, 42.348598 ], [ 3.317222, 42.324989 ], [ 3.222222, 42.234989 ], [ 3.158611, 42.262489 ], [ 3.110833, 42.196659 ], [ 3.133889, 42.118320 ], [ 3.202500, 42.078880 ], [ 3.179444, 41.874149 ], [ 2.819444, 41.685822 ], [ 2.495277, 41.548599 ], [ 2.249722, 41.448040 ], [ 2.126944, 41.295551 ], [ 1.666667, 41.199711 ], [ 1.213333, 41.104710 ], [ 1.088889, 41.063042 ], [ 0.993056, 41.048038 ], [ 0.704167, 40.813042 ], [ 0.723055, 40.775829 ], [ 0.895000, 40.728321 ], [ 0.851667, 40.676102 ], [ 0.635556, 40.623878 ], [ 0.546389, 40.573601 ], [ 0.261389, 40.208321 ], [ 0.186389, 40.165272 ], [ 0.131944, 40.070820 ], [ 0.048889, 40.036098 ], [ -0.061944, 39.863319 ], [ -0.179445, 39.736099 ], [ -0.337500, 39.440540 ], [ -0.275000, 39.271099 ], [ -0.108333, 38.945820 ], [ 0.008889, 38.862209 ], [ 0.188889, 38.808601 ], [ 0.236111, 38.744431 ], [ 0.033611, 38.629429 ], [ -0.050556, 38.595539 ], [ -0.065278, 38.545818 ], [ -0.399167, 38.408600 ], [ -0.476389, 38.338039 ], [ -0.517500, 38.294430 ], [ -0.509167, 38.211651 ], [ -0.612222, 38.178879 ], [ -0.658056, 38.051929 ], [ -0.683889, 37.968880 ], [ -0.759444, 37.861931 ], [ -0.747222, 37.790272 ], [ -0.787500, 37.813320 ], [ -0.860000, 37.716648 ], [ -0.740833, 37.630260 ], [ -0.751111, 37.776932 ], [ -0.690556, 37.631378 ], [ -0.816667, 37.573318 ], [ -1.269167, 37.555271 ], [ -1.384444, 37.525829 ], [ -1.769167, 37.245270 ], [ -1.821360, 37.267750 ], [ -1.786686, 37.246948 ], [ -1.897222, 36.946098 ], [ -1.998889, 36.884159 ], [ -2.025000, 36.828880 ], [ -2.174445, 36.720268 ], [ -2.298889, 36.829430 ], [ -2.555556, 36.814709 ], [ -2.696945, 36.681099 ], [ -2.859723, 36.695271 ], [ -2.928889, 36.749710 ], [ -3.529445, 36.715820 ], [ -3.713889, 36.731659 ], [ -3.906111, 36.741650 ], [ -4.398334, 36.722210 ], [ -4.677222, 36.501659 ], [ -5.165556, 36.415272 ], [ -5.311389, 36.233601 ], [ -5.344723, 36.149990 ], [ -5.381667, 36.178322 ], [ -5.432778, 36.174160 ], [ -5.422223, 36.075821 ], [ -5.605556, 35.999710 ], [ -5.773334, 36.077209 ], [ -6.151668, 36.296940 ], [ -6.263056, 36.481659 ], [ -6.233334, 36.461380 ], [ -6.172778, 36.512211 ], [ -6.250278, 36.508320 ], [ -6.230834, 36.574989 ], [ -6.392501, 36.626381 ], [ -6.443890, 36.718880 ], [ -6.355556, 36.787491 ], [ -6.339723, 36.889431 ], [ -6.358056, 36.794708 ], [ -6.420556, 36.856659 ], [ -6.573890, 37.015820 ], [ -6.904723, 37.165539 ], [ -6.937500, 37.193878 ], [ -6.972222, 37.285259 ], [ -6.953889, 37.172211 ], [ -7.174723, 37.227489 ], [ -7.384167, 37.169708 ], [ -7.418165, 37.173370 ], [ -7.514167, 37.573318 ], [ -7.297500, 37.848042 ], [ -7.254723, 37.987492 ], [ -7.146111, 38.005260 ], [ -7.006945, 38.028042 ], [ -6.944166, 38.162762 ], [ -6.948055, 38.218319 ], [ -7.087778, 38.174431 ], [ -7.144167, 38.270260 ], [ -7.307071, 38.425598 ], [ -7.329722, 38.447201 ], [ -7.301111, 38.524990 ], [ -7.292252, 38.570660 ], [ -7.265556, 38.708321 ], [ -7.155833, 38.790272 ], [ -6.953889, 39.026932 ], [ -6.961111, 39.056648 ], [ -7.040556, 39.122761 ], [ -7.115833, 39.104160 ], [ -7.154167, 39.122761 ], [ -7.140000, 39.173321 ], [ -7.243055, 39.213039 ], [ -7.235000, 39.276371 ], [ -7.313611, 39.344700 ], [ -7.293612, 39.467758 ], [ -7.442499, 39.551090 ], [ -7.533333, 39.668880 ], [ -7.407778, 39.648319 ], [ -7.017222, 39.674992 ], [ -6.863889, 40.015541 ], [ -7.014445, 40.146648 ], [ -7.006111, 40.230808 ], [ -6.960834, 40.240261 ], [ -6.787500, 40.341648 ], [ -6.848333, 40.443310 ], [ -6.791111, 40.518040 ], [ -6.839167, 40.574989 ], [ -6.797778, 40.657761 ], [ -6.829445, 40.755260 ], [ -6.799722, 40.856091 ], [ -6.891667, 40.974701 ], [ -6.924444, 41.031368 ], [ -6.808611, 41.040539 ], [ -6.681389, 41.215542 ], [ -6.598333, 41.244148 ], [ -6.433888, 41.322491 ], [ -6.318611, 41.387211 ], [ -6.329445, 41.415260 ], [ -6.217778, 41.529430 ], [ -6.194444, 41.593040 ], [ -6.355833, 41.677761 ], [ -6.497778, 41.657490 ], [ -6.539444, 41.679428 ], [ -6.562778, 41.745258 ], [ -6.508612, 41.873871 ], [ -6.568611, 41.887211 ], [ -6.545000, 41.937199 ], [ -6.581667, 41.967480 ], [ -6.628056, 41.941090 ], [ -6.809444, 41.990261 ], [ -6.837778, 41.947201 ], [ -7.152223, 41.988590 ], [ -7.200556, 41.883598 ], [ -7.427222, 41.812481 ], [ -7.456944, 41.864429 ], [ -7.524445, 41.840542 ], [ -7.611944, 41.834980 ], [ -7.591667, 41.879711 ], [ -7.706111, 41.904430 ], [ -7.880000, 41.852772 ], [ -7.886111, 41.923321 ], [ -7.912222, 41.889709 ], [ -7.981944, 41.866379 ], [ -8.140835, 41.809151 ], [ -8.218889, 41.913601 ], [ -8.082777, 42.025261 ], [ -8.090000, 42.068878 ], [ -8.185833, 42.064701 ], [ -8.201389, 42.152210 ], [ -8.621111, 42.053600 ], [ -8.812395, 41.904530 ], [ -8.871946, 41.875820 ], [ -8.898613, 42.108051 ], [ -8.778334, 42.207760 ], [ -8.612780, 42.315540 ], [ -8.625278, 42.353600 ], [ -8.683889, 42.279709 ], [ -8.857500, 42.247761 ], [ -8.853889, 42.307770 ], [ -8.813612, 42.279991 ], [ -8.830833, 42.342770 ], [ -8.767223, 42.340260 ], [ -8.656389, 42.427761 ], [ -8.841112, 42.391380 ], [ -8.942223, 42.466930 ], [ -8.871946, 42.500820 ], [ -8.869722, 42.453602 ], [ -8.807501, 42.504711 ], [ -8.827778, 42.574711 ], [ -8.730835, 42.661098 ], [ -8.825001, 42.665821 ], [ -8.856112, 42.607769 ], [ -8.886391, 42.639992 ], [ -9.017223, 42.521381 ], [ -9.035278, 42.568050 ], [ -9.085001, 42.576382 ], [ -8.933613, 42.772770 ], [ -8.856112, 42.819439 ], [ -8.903891, 42.828320 ], [ -8.953890, 42.775829 ], [ -9.068611, 42.754711 ], [ -9.135834, 42.791100 ], [ -9.101667, 42.823318 ], [ -9.141945, 42.861660 ], [ -9.185001, 42.952492 ], [ -9.181391, 42.915539 ], [ -9.245279, 42.921940 ], [ -9.293335, 42.922489 ], [ -9.274168, 43.024712 ], [ -9.145557, 43.193050 ], [ -9.025278, 43.213039 ], [ -8.934723, 43.229710 ], [ -8.981945, 43.276100 ], [ -8.837502, 43.345268 ], [ -8.724445, 43.291100 ], [ -8.539446, 43.309711 ], [ -8.405834, 43.384708 ], [ -8.386112, 43.339432 ], [ -8.335556, 43.373322 ], [ -8.329723, 43.403881 ], [ -8.215834, 43.330540 ], [ -8.216667, 43.398041 ], [ -8.285278, 43.432770 ], [ -8.241112, 43.490261 ], [ -8.339724, 43.456928 ], [ -8.319445, 43.562210 ], [ -8.253613, 43.558041 ], [ -8.089445, 43.661930 ], [ -7.865834, 43.772209 ], [ -7.850834, 43.714710 ], [ -7.899167, 43.670269 ], [ -7.854445, 43.668320 ], [ -7.790833, 43.734150 ], [ -7.685834, 43.774429 ], [ -7.693612, 43.730820 ], [ -7.605556, 43.713329 ], [ -7.570556, 43.711651 ], [ -7.484167, 43.727772 ], [ -7.248889, 43.579151 ], [ -7.038889, 43.557491 ], [ -7.045279, 43.489990 ], [ -6.943611, 43.577770 ], [ -6.349723, 43.558601 ], [ -6.163611, 43.572208 ], [ -5.954722, 43.580540 ], [ -5.851945, 43.652760 ], [ -5.529167, 43.548599 ], [ -5.398056, 43.552490 ], [ -5.381390, 43.526100 ], [ -5.288889, 43.533871 ], [ -5.214723, 43.479710 ], [ -4.692223, 43.417488 ], [ -4.216945, 43.393879 ], [ -4.051390, 43.442490 ], [ -3.823611, 43.448879 ], [ -3.797223, 43.412209 ], [ -3.654167, 43.491650 ], [ -3.515556, 43.490822 ], [ -3.430556, 43.464432 ], [ -3.460556, 43.442211 ], [ -3.429722, 43.411098 ], [ -3.231389, 43.398319 ], [ -3.118611, 43.350819 ], [ -3.009167, 43.381100 ], [ -2.941667, 43.435551 ], [ -2.728333, 43.425819 ], [ -2.295556, 43.296101 ], [ -1.880000, 43.344990 ], [ -1.810488, 43.385891 ], [ -1.655833, 43.309429 ], [ -1.620000, 43.256378 ], [ -1.409167, 43.273041 ], [ -1.381945, 43.196651 ], [ -1.472778, 43.091091 ], [ -1.440556, 43.048321 ], [ -1.360278, 43.031651 ], [ -1.288333, 43.106091 ], [ -1.300556, 43.071659 ], [ -0.818889, 42.946091 ], [ -0.746944, 42.965542 ], [ -0.656111, 42.863602 ], [ -0.519167, 42.790821 ], [ -0.500833, 42.822208 ], [ -0.392222, 42.796379 ], [ -0.306667, 42.849152 ], [ -0.187778, 42.785820 ], [ -0.123889, 42.757488 ], [ -0.057500, 42.694149 ], [ 0.261944, 42.717480 ], [ 0.291111, 42.675819 ], [ 0.412500, 42.695259 ], [ 0.676111, 42.689152 ], [ 0.668055, 42.748039 ], [ 0.667778, 42.839149 ], [ 0.815833, 42.841091 ], [ 1.383611, 42.689701 ], [ 1.435247, 42.597149 ] ] ] } ] } ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'France', 'density': '102.0', 'population': '64350226' }, 'geometry': { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'Polygon', 'coordinates': [ [ [ 9.219166, 41.366379 ], [ 9.097500, 41.392769 ], [ 9.080555, 41.474709 ], [ 8.882221, 41.506649 ], [ 8.779999, 41.588871 ], [ 8.794722, 41.632488 ], [ 8.913887, 41.676380 ], [ 8.878887, 41.698040 ], [ 8.680275, 41.751659 ], [ 8.724722, 41.776932 ], [ 8.802219, 41.894428 ], [ 8.754164, 41.931660 ], [ 8.614721, 41.897770 ], [ 8.589441, 41.966099 ], [ 8.658609, 41.978039 ], [ 8.726387, 42.040821 ], [ 8.696665, 42.109440 ], [ 8.561943, 42.148880 ], [ 8.572777, 42.214161 ], [ 8.641109, 42.254990 ], [ 8.688055, 42.270260 ], [ 8.612221, 42.349991 ], [ 8.555832, 42.376659 ], [ 8.672222, 42.461929 ], [ 8.663332, 42.507771 ], [ 8.937498, 42.636379 ], [ 9.053053, 42.658600 ], [ 9.083887, 42.710819 ], [ 9.210554, 42.730820 ], [ 9.290833, 42.673321 ], [ 9.341110, 42.734150 ], [ 9.320833, 42.894989 ], [ 9.346388, 42.958881 ], [ 9.344721, 43.000820 ], [ 9.430277, 43.005821 ], [ 9.465832, 42.927212 ], [ 9.489443, 42.814430 ], [ 9.459999, 42.603600 ], [ 9.502857, 42.566360 ], [ 9.497221, 42.600819 ], [ 9.543055, 42.429989 ], [ 9.508055, 42.065540 ], [ 9.406944, 41.906651 ], [ 9.348888, 41.618881 ], [ 9.282776, 41.607769 ], [ 9.355276, 41.593880 ], [ 9.250830, 41.411930 ], [ 9.219166, 41.366379 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 2.901285, 50.697048 ], [ 3.035277, 50.773869 ], [ 3.113055, 50.793320 ], [ 3.193333, 50.741371 ], [ 3.281388, 50.594151 ], [ 3.280000, 50.538319 ], [ 3.367222, 50.495541 ], [ 3.602222, 50.497211 ], [ 3.668889, 50.444149 ], [ 3.671944, 50.346371 ], [ 3.725277, 50.313599 ], [ 3.763611, 50.351929 ], [ 4.090833, 50.314430 ], [ 4.216110, 50.265270 ], [ 4.137777, 50.137760 ], [ 4.226388, 50.081100 ], [ 4.150000, 49.986370 ], [ 4.168332, 49.981369 ], [ 4.458333, 49.938591 ], [ 4.673610, 49.996380 ], [ 4.757500, 50.129429 ], [ 4.876388, 50.154980 ], [ 4.851943, 50.079430 ], [ 4.800832, 49.977760 ], [ 4.881110, 49.914700 ], [ 4.858054, 49.796379 ], [ 5.097777, 49.768589 ], [ 5.216944, 49.690540 ], [ 5.276111, 49.698589 ], [ 5.329721, 49.659981 ], [ 5.307221, 49.630810 ], [ 5.423332, 49.609150 ], [ 5.473055, 49.506100 ], [ 5.705208, 49.535229 ], [ 5.783038, 49.527271 ], [ 5.963333, 49.488319 ], [ 5.981388, 49.448318 ], [ 6.165277, 49.504711 ], [ 6.362221, 49.459980 ], [ 6.493888, 49.447201 ], [ 6.594722, 49.363041 ], [ 6.589722, 49.320271 ], [ 6.787220, 49.162479 ], [ 6.838888, 49.154980 ], [ 6.847499, 49.215260 ], [ 7.026666, 49.188869 ], [ 7.038332, 49.118320 ], [ 7.088332, 49.125259 ], [ 7.361388, 49.147770 ], [ 7.375277, 49.171928 ], [ 7.486943, 49.164150 ], [ 7.539999, 49.088871 ], [ 7.741110, 49.041660 ], [ 7.938610, 49.048870 ], [ 8.192221, 48.968868 ], [ 8.227394, 48.963711 ], [ 8.133333, 48.885540 ], [ 7.921515, 48.690029 ], [ 7.801943, 48.592480 ], [ 7.807499, 48.513321 ], [ 7.771666, 48.491650 ], [ 7.750833, 48.336651 ], [ 7.604999, 48.156929 ], [ 7.571666, 48.037209 ], [ 7.615832, 48.002769 ], [ 7.513333, 47.686932 ], [ 7.588799, 47.584560 ], [ 7.521388, 47.525822 ], [ 7.452777, 47.469978 ], [ 7.395610, 47.439671 ], [ 7.178332, 47.445820 ], [ 7.198054, 47.495258 ], [ 6.990555, 47.497211 ], [ 7.007777, 47.454990 ], [ 6.978333, 47.444149 ], [ 6.881110, 47.356930 ], [ 7.023055, 47.371651 ], [ 7.061665, 47.345539 ], [ 7.010833, 47.305260 ], [ 6.948332, 47.291931 ], [ 6.694443, 47.068321 ], [ 6.702777, 47.038601 ], [ 6.587221, 46.987759 ], [ 6.434721, 46.926929 ], [ 6.452777, 46.774429 ], [ 6.325022, 46.704479 ], [ 6.129999, 46.593319 ], [ 6.078055, 46.460819 ], [ 6.124443, 46.401920 ], [ 6.114444, 46.257771 ], [ 6.060832, 46.250542 ], [ 5.966110, 46.205261 ], [ 6.000000, 46.174160 ], [ 5.965833, 46.140270 ], [ 6.152222, 46.153591 ], [ 6.305554, 46.252491 ], [ 6.242221, 46.297771 ], [ 6.243931, 46.322392 ], [ 6.246387, 46.357769 ], [ 6.328333, 46.406929 ], [ 6.633611, 46.464149 ], [ 6.796110, 46.432491 ], [ 6.808887, 46.411091 ], [ 6.804937, 46.405499 ], [ 6.767499, 46.352489 ], [ 6.844443, 46.271370 ], [ 6.795277, 46.217758 ], [ 6.788054, 46.142208 ], [ 6.884444, 46.126091 ], [ 6.871387, 46.051929 ], [ 6.929166, 46.065262 ], [ 7.038747, 45.931721 ], [ 6.808887, 45.831379 ], [ 6.799166, 45.780819 ], [ 6.824166, 45.714989 ], [ 6.990832, 45.639980 ], [ 6.999443, 45.518318 ], [ 7.181388, 45.411652 ], [ 7.133054, 45.355549 ], [ 7.122776, 45.301929 ], [ 6.850277, 45.136101 ], [ 6.760833, 45.168320 ], [ 6.620172, 45.110661 ], [ 6.746666, 45.020260 ], [ 6.743332, 44.947762 ], [ 7.009999, 44.848591 ], [ 7.068889, 44.689152 ], [ 7.000833, 44.699150 ], [ 6.950832, 44.664700 ], [ 6.960278, 44.628868 ], [ 6.852777, 44.540821 ], [ 6.857222, 44.507771 ], [ 6.934999, 44.443039 ], [ 6.886110, 44.415821 ], [ 6.935832, 44.323318 ], [ 7.279444, 44.156651 ], [ 7.672776, 44.182758 ], [ 7.704166, 44.072208 ], [ 7.492221, 43.869431 ], [ 7.534765, 43.783451 ], [ 7.457388, 43.758652 ], [ 7.440700, 43.757824 ], [ 7.438300, 43.760300 ], [ 7.435800, 43.763100 ], [ 7.434200, 43.766102 ], [ 7.432500, 43.769199 ], [ 7.429400, 43.771400 ], [ 7.424700, 43.773102 ], [ 7.420000, 43.772499 ], [ 7.416100, 43.770599 ], [ 7.412800, 43.768299 ], [ 7.409700, 43.765800 ], [ 7.406400, 43.763599 ], [ 7.403100, 43.761398 ], [ 7.400300, 43.758598 ], [ 7.397200, 43.756100 ], [ 7.393900, 43.753899 ], [ 7.390600, 43.751400 ], [ 7.387800, 43.748600 ], [ 7.386400, 43.745602 ], [ 7.386400, 43.741901 ], [ 7.388300, 43.738899 ], [ 7.390000, 43.735802 ], [ 7.390800, 43.732201 ], [ 7.391187, 43.728031 ], [ 7.349536, 43.721825 ], [ 7.345833, 43.720539 ], [ 7.158610, 43.663052 ], [ 7.133888, 43.564159 ], [ 7.005278, 43.558319 ], [ 6.854444, 43.427212 ], [ 6.748055, 43.434711 ], [ 6.669722, 43.315540 ], [ 6.589444, 43.292210 ], [ 6.681389, 43.224430 ], [ 6.615000, 43.169430 ], [ 6.593888, 43.197491 ], [ 6.375278, 43.149712 ], [ 6.368055, 43.092770 ], [ 6.201943, 43.129990 ], [ 6.166666, 43.115551 ], [ 6.181110, 43.056381 ], [ 6.088611, 43.052490 ], [ 6.126943, 43.075550 ], [ 6.117499, 43.098049 ], [ 5.934722, 43.133598 ], [ 5.911111, 43.099991 ], [ 5.862222, 43.057491 ], [ 5.781111, 43.082489 ], [ 5.780555, 43.139149 ], [ 5.431944, 43.220829 ], [ 5.363610, 43.221931 ], [ 5.361666, 43.335270 ], [ 5.322222, 43.366650 ], [ 5.063611, 43.340820 ], [ 5.012777, 43.373600 ], [ 5.018332, 43.400829 ], [ 5.230555, 43.464161 ], [ 5.227221, 43.496101 ], [ 5.162222, 43.476940 ], [ 5.031388, 43.556660 ], [ 5.016109, 43.496658 ], [ 5.060833, 43.465549 ], [ 5.061110, 43.430538 ], [ 4.957777, 43.424992 ], [ 4.876111, 43.423870 ], [ 4.873610, 43.373322 ], [ 4.756944, 43.419430 ], [ 4.741666, 43.417488 ], [ 4.816388, 43.379990 ], [ 4.821666, 43.359989 ], [ 4.606944, 43.361931 ], [ 4.573333, 43.379990 ], [ 4.601666, 43.424992 ], [ 4.537837, 43.451408 ], [ 4.399444, 43.455818 ], [ 4.321111, 43.458321 ], [ 4.312499, 43.509708 ], [ 4.247222, 43.491940 ], [ 4.240555, 43.471661 ], [ 4.195276, 43.461380 ], [ 4.124722, 43.498322 ], [ 4.133055, 43.536652 ], [ 4.062222, 43.563320 ], [ 3.860555, 43.484711 ], [ 3.471389, 43.278599 ], [ 3.341111, 43.271099 ], [ 3.102222, 43.084148 ], [ 3.043333, 43.106930 ], [ 3.030278, 43.069149 ], [ 3.085278, 43.050270 ], [ 3.037777, 42.940269 ], [ 3.036944, 42.897209 ], [ 2.963889, 42.848320 ], [ 2.975277, 42.809429 ], [ 3.012222, 42.798038 ], [ 3.052499, 42.878601 ], [ 3.049444, 42.553879 ], [ 3.176962, 42.437611 ], [ 3.150833, 42.433319 ], [ 3.038333, 42.474979 ], [ 2.678333, 42.401649 ], [ 2.671111, 42.338322 ], [ 2.476666, 42.351650 ], [ 2.254167, 42.434711 ], [ 2.086944, 42.363319 ], [ 1.976666, 42.374699 ], [ 1.953055, 42.437199 ], [ 1.787500, 42.490261 ], [ 1.710967, 42.473499 ], [ 1.781667, 42.581661 ], [ 1.541111, 42.653870 ], [ 1.435247, 42.597149 ], [ 1.383611, 42.689701 ], [ 0.815833, 42.841091 ], [ 0.667778, 42.839149 ], [ 0.668055, 42.748039 ], [ 0.676111, 42.689152 ], [ 0.412500, 42.695259 ], [ 0.291111, 42.675819 ], [ 0.261944, 42.717480 ], [ -0.057500, 42.694149 ], [ -0.123889, 42.757488 ], [ -0.187778, 42.785820 ], [ -0.306667, 42.849152 ], [ -0.392222, 42.796379 ], [ -0.500833, 42.822208 ], [ -0.519167, 42.790821 ], [ -0.656111, 42.863602 ], [ -0.746944, 42.965542 ], [ -0.818889, 42.946091 ], [ -1.300556, 43.071659 ], [ -1.288333, 43.106091 ], [ -1.360278, 43.031651 ], [ -1.440556, 43.048321 ], [ -1.472778, 43.091091 ], [ -1.381945, 43.196651 ], [ -1.409167, 43.273041 ], [ -1.620000, 43.256378 ], [ -1.655833, 43.309429 ], [ -1.810488, 43.385891 ], [ -1.652223, 43.399429 ], [ -1.493333, 43.561378 ], [ -1.424445, 43.758881 ], [ -1.294167, 44.259708 ], [ -1.208611, 44.625820 ], [ -1.192222, 44.661930 ], [ -1.054445, 44.659988 ], [ -1.037222, 44.683041 ], [ -1.134444, 44.763599 ], [ -1.168889, 44.776100 ], [ -1.248889, 44.630821 ], [ -1.259167, 44.691929 ], [ -1.194722, 45.123600 ], [ -1.095278, 45.552761 ], [ -1.058333, 45.571381 ], [ -1.057778, 45.520821 ], [ -0.808333, 45.367210 ], [ -0.735833, 45.247490 ], [ -0.714722, 45.130550 ], [ -0.661667, 45.053600 ], [ -0.560556, 44.986660 ], [ -0.589167, 45.021648 ], [ -0.495000, 44.998878 ], [ -0.519445, 45.030819 ], [ -0.620000, 45.060261 ], [ -0.668333, 45.124149 ], [ -0.737778, 45.400269 ], [ -0.850000, 45.519161 ], [ -1.245326, 45.707790 ], [ -1.230834, 45.788052 ], [ -1.146111, 45.803322 ], [ -0.985278, 45.715260 ], [ -1.138056, 45.839989 ], [ -1.071944, 45.958881 ], [ -1.111389, 46.006649 ], [ -1.055556, 46.008598 ], [ -1.103889, 46.100269 ], [ -1.152222, 46.155270 ], [ -1.202500, 46.155270 ], [ -1.193889, 46.215260 ], [ -1.105834, 46.258598 ], [ -1.112222, 46.313599 ], [ -1.195000, 46.319149 ], [ -1.214445, 46.273319 ], [ -1.405556, 46.346661 ], [ -1.448611, 46.338039 ], [ -1.472222, 46.395821 ], [ -1.511945, 46.419159 ], [ -1.673889, 46.451931 ], [ -1.799445, 46.486931 ], [ -1.914167, 46.688599 ], [ -2.108056, 46.813599 ], [ -2.133890, 46.887211 ], [ -2.011049, 47.020031 ], [ -1.984445, 47.034431 ], [ -2.051667, 47.097210 ], [ -2.239722, 47.135818 ], [ -2.163611, 47.165272 ], [ -2.165556, 47.264992 ], [ -2.025000, 47.296940 ], [ -1.815834, 47.237209 ], [ -1.998889, 47.317490 ], [ -2.159445, 47.309990 ], [ -2.273334, 47.241650 ], [ -2.495833, 47.291370 ], [ -2.442500, 47.291100 ], [ -2.448612, 47.322491 ], [ -2.553611, 47.376930 ], [ -2.396111, 47.405270 ], [ -2.434167, 47.421101 ], [ -2.488889, 47.481380 ], [ -2.361389, 47.504162 ], [ -2.662222, 47.526100 ], [ -2.736111, 47.504162 ], [ -2.809722, 47.491650 ], [ -2.912222, 47.551659 ], [ -2.877223, 47.564709 ], [ -2.736945, 47.543880 ], [ -2.680556, 47.613041 ], [ -2.768611, 47.620541 ], [ -2.880000, 47.606098 ], [ -2.936667, 47.597210 ], [ -2.960556, 47.564430 ], [ -3.125278, 47.599430 ], [ -3.120278, 47.500542 ], [ -3.149167, 47.521381 ], [ -3.132223, 47.576649 ], [ -3.200556, 47.659431 ], [ -3.148056, 47.741379 ], [ -3.212778, 47.652489 ], [ -3.354445, 47.706661 ], [ -3.281389, 47.782490 ], [ -3.441389, 47.701382 ], [ -3.712778, 47.811939 ], [ -3.847778, 47.793598 ], [ -3.951111, 47.898880 ], [ -4.085556, 47.868320 ], [ -4.182778, 47.881378 ], [ -4.155556, 47.831928 ], [ -4.209723, 47.799431 ], [ -4.361945, 47.802761 ], [ -4.343889, 47.853600 ], [ -4.419723, 47.960819 ], [ -4.529445, 48.022491 ], [ -4.613056, 48.020821 ], [ -4.725613, 48.040989 ], [ -4.662223, 48.073601 ], [ -4.295000, 48.098881 ], [ -4.297501, 48.178322 ], [ -4.431390, 48.240551 ], [ -4.493056, 48.236099 ], [ -4.537223, 48.176102 ], [ -4.563612, 48.233601 ], [ -4.623889, 48.281940 ], [ -4.513056, 48.300270 ], [ -4.235001, 48.303879 ], [ -4.323611, 48.319988 ], [ -4.318334, 48.357769 ], [ -4.448611, 48.330540 ], [ -4.405556, 48.381939 ], [ -4.293334, 48.427212 ], [ -4.763889, 48.335270 ], [ -4.790556, 48.421379 ], [ -4.744167, 48.545818 ], [ -4.631945, 48.579708 ], [ -4.428334, 48.650539 ], [ -4.314167, 48.670818 ], [ -4.222778, 48.648319 ], [ -4.176667, 48.686100 ], [ -3.968056, 48.731930 ], [ -3.953333, 48.652210 ], [ -3.900278, 48.676380 ], [ -3.854167, 48.629162 ], [ -3.810833, 48.726101 ], [ -3.596111, 48.675819 ], [ -3.571111, 48.686100 ], [ -3.582778, 48.726650 ], [ -3.532222, 48.739159 ], [ -3.580834, 48.766930 ], [ -3.512778, 48.837212 ], [ -3.263056, 48.838600 ], [ -3.220834, 48.870541 ], [ -3.224167, 48.793880 ], [ -3.101667, 48.872211 ], [ -3.079167, 48.826931 ], [ -2.948611, 48.768879 ], [ -2.883611, 48.680820 ], [ -2.824722, 48.654991 ], [ -2.765556, 48.572208 ], [ -2.653334, 48.530540 ], [ -2.464723, 48.629990 ], [ -2.314336, 48.692600 ], [ -2.284445, 48.669159 ], [ -2.329167, 48.624710 ], [ -2.226389, 48.611370 ], [ -2.176389, 48.579430 ], [ -2.105834, 48.646099 ], [ -2.002500, 48.583050 ], [ -1.982500, 48.514149 ], [ -1.956944, 48.550819 ], [ -2.030000, 48.650829 ], [ -1.849167, 48.709148 ], [ -1.870000, 48.649990 ], [ -1.840556, 48.615551 ], [ -1.638056, 48.616650 ], [ -1.433889, 48.663601 ], [ -1.560833, 48.744709 ], [ -1.605834, 48.841099 ], [ -1.549167, 48.922771 ], [ -1.556667, 49.015820 ], [ -1.585278, 49.008881 ], [ -1.610278, 49.097759 ], [ -1.549445, 49.219711 ], [ -1.629445, 49.215549 ], [ -1.774167, 49.381649 ], [ -1.812500, 49.377769 ], [ -1.845834, 49.499710 ], [ -1.884444, 49.529148 ], [ -1.840000, 49.578320 ], [ -1.851944, 49.642769 ], [ -1.945833, 49.675541 ], [ -1.941945, 49.723881 ], [ -1.482778, 49.675541 ], [ -1.410833, 49.704990 ], [ -1.258333, 49.694439 ], [ -1.259722, 49.586102 ], [ -1.299445, 49.578880 ], [ -1.301667, 49.543880 ], [ -1.142222, 49.343880 ], [ -1.013889, 49.394711 ], [ -0.436389, 49.341099 ], [ -0.218333, 49.274712 ], [ 0.218333, 49.426659 ], [ 0.393055, 49.458881 ], [ 0.143611, 49.476940 ], [ 0.078056, 49.511662 ], [ 0.184444, 49.702770 ], [ 0.611944, 49.857491 ], [ 1.131111, 49.948879 ], [ 1.435555, 50.098320 ], [ 1.505555, 50.201931 ], [ 1.555000, 50.219440 ], [ 1.656944, 50.184158 ], [ 1.645000, 50.217209 ], [ 1.548055, 50.266651 ], [ 1.534167, 50.288601 ], [ 1.552778, 50.359989 ], [ 1.610278, 50.368320 ], [ 1.558889, 50.402489 ], [ 1.576944, 50.612209 ], [ 1.576111, 50.864429 ], [ 1.943333, 50.995270 ], [ 2.472777, 51.070541 ], [ 2.541667, 51.091099 ], [ 2.612500, 50.887211 ], [ 2.629444, 50.824711 ], [ 2.781944, 50.755550 ], [ 2.901285, 50.697048 ] ] ] } ] } ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Italy', 'density': '204.0', 'population': '60045068' }, 'geometry': { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'Polygon', 'coordinates': [ [ [ 15.090000, 36.650829 ], [ 14.900830, 36.724991 ], [ 14.706110, 36.713329 ], [ 14.461390, 36.813881 ], [ 14.397780, 36.936649 ], [ 14.268890, 37.048038 ], [ 14.109720, 37.108879 ], [ 13.894720, 37.097759 ], [ 13.561940, 37.279148 ], [ 13.431660, 37.300819 ], [ 13.121390, 37.490822 ], [ 13.019720, 37.493881 ], [ 12.973890, 37.550541 ], [ 12.825280, 37.578880 ], [ 12.674440, 37.554150 ], [ 12.468330, 37.699162 ], [ 12.460830, 37.834991 ], [ 12.551390, 38.054440 ], [ 12.713330, 38.114712 ], [ 12.719160, 38.181099 ], [ 12.786390, 38.138050 ], [ 12.856110, 38.050541 ], [ 12.896670, 38.023319 ], [ 13.048610, 38.071659 ], [ 13.073330, 38.093601 ], [ 13.078610, 38.171379 ], [ 13.311390, 38.218040 ], [ 13.375270, 38.153881 ], [ 13.363610, 38.124710 ], [ 13.437500, 38.095268 ], [ 13.536110, 38.109440 ], [ 13.537780, 38.061100 ], [ 13.711390, 37.976650 ], [ 13.882500, 37.997211 ], [ 14.024720, 38.045551 ], [ 14.289440, 38.012760 ], [ 14.628610, 38.071381 ], [ 14.740000, 38.165539 ], [ 15.131390, 38.138882 ], [ 15.200000, 38.175541 ], [ 15.228330, 38.265541 ], [ 15.249720, 38.208881 ], [ 15.366390, 38.221371 ], [ 15.523610, 38.295269 ], [ 15.623890, 38.256378 ], [ 15.572500, 38.233879 ], [ 15.443050, 38.016651 ], [ 15.215000, 37.758881 ], [ 15.178050, 37.575550 ], [ 15.091390, 37.489990 ], [ 15.091940, 37.349709 ], [ 15.156670, 37.295269 ], [ 15.261390, 37.246101 ], [ 15.188890, 37.218601 ], [ 15.203890, 37.157490 ], [ 15.303330, 37.102211 ], [ 15.338610, 37.011929 ], [ 15.158890, 36.920551 ], [ 15.095550, 36.783600 ], [ 15.136390, 36.681381 ], [ 15.090000, 36.650829 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 8.855555, 38.877491 ], [ 8.729166, 38.934711 ], [ 8.622776, 38.891651 ], [ 8.518610, 39.078320 ], [ 8.468054, 39.056099 ], [ 8.398611, 38.976101 ], [ 8.349722, 39.090549 ], [ 8.424444, 39.107769 ], [ 8.463333, 39.061649 ], [ 8.486109, 39.077770 ], [ 8.367777, 39.218319 ], [ 8.432777, 39.285259 ], [ 8.383333, 39.458599 ], [ 8.467499, 39.593040 ], [ 8.442778, 39.756649 ], [ 8.533054, 39.702770 ], [ 8.521109, 39.749439 ], [ 8.556944, 39.857491 ], [ 8.518055, 39.904991 ], [ 8.458887, 39.895260 ], [ 8.398611, 39.896648 ], [ 8.374722, 40.031940 ], [ 8.472776, 40.064430 ], [ 8.489166, 40.093601 ], [ 8.461388, 40.223881 ], [ 8.481386, 40.280819 ], [ 8.384443, 40.342491 ], [ 8.371666, 40.482491 ], [ 8.301109, 40.589161 ], [ 8.159441, 40.562771 ], [ 8.143608, 40.621658 ], [ 8.198610, 40.684711 ], [ 8.132500, 40.729988 ], [ 8.221666, 40.879711 ], [ 8.177776, 40.929710 ], [ 8.202776, 40.970539 ], [ 8.278055, 40.864429 ], [ 8.457499, 40.821930 ], [ 8.579721, 40.839989 ], [ 8.889442, 41.025829 ], [ 9.152222, 41.156101 ], [ 9.215832, 41.254162 ], [ 9.256388, 41.243320 ], [ 9.314720, 41.192211 ], [ 9.421387, 41.176102 ], [ 9.441666, 41.090260 ], [ 9.513332, 41.150269 ], [ 9.565554, 41.104710 ], [ 9.508610, 41.014431 ], [ 9.652498, 41.003319 ], [ 9.564442, 40.939991 ], [ 9.503611, 40.918049 ], [ 9.651110, 40.878040 ], [ 9.689444, 40.811939 ], [ 9.667776, 40.797489 ], [ 9.746944, 40.682491 ], [ 9.806389, 40.538052 ], [ 9.825554, 40.521648 ], [ 9.771942, 40.394711 ], [ 9.657221, 40.308319 ], [ 9.624166, 40.208321 ], [ 9.692499, 40.106930 ], [ 9.729166, 40.084431 ], [ 9.670277, 39.770260 ], [ 9.624166, 39.412209 ], [ 9.600275, 39.332760 ], [ 9.633333, 39.298599 ], [ 9.591663, 39.277210 ], [ 9.519444, 39.099430 ], [ 9.235554, 39.223598 ], [ 9.183887, 39.217770 ], [ 9.150276, 39.183319 ], [ 9.083611, 39.216648 ], [ 9.017500, 39.141930 ], [ 9.022221, 38.989712 ], [ 8.855555, 38.877491 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 10.463570, 46.869350 ], [ 10.560830, 46.848591 ], [ 10.672780, 46.874981 ], [ 10.764440, 46.834148 ], [ 10.735550, 46.798599 ], [ 11.014720, 46.772480 ], [ 11.164440, 46.962200 ], [ 11.339160, 46.995541 ], [ 11.411660, 46.972481 ], [ 11.615270, 47.013050 ], [ 11.755830, 46.977482 ], [ 12.211110, 47.090542 ], [ 12.204440, 47.039150 ], [ 12.131110, 47.016380 ], [ 12.144440, 46.915821 ], [ 12.295000, 46.863602 ], [ 12.283610, 46.791370 ], [ 12.355830, 46.777481 ], [ 12.433610, 46.695259 ], [ 12.895830, 46.612759 ], [ 13.412220, 46.574429 ], [ 13.718960, 46.525539 ], [ 13.692220, 46.450260 ], [ 13.481110, 46.369431 ], [ 13.383050, 46.297211 ], [ 13.443330, 46.230259 ], [ 13.550550, 46.218040 ], [ 13.664440, 46.183041 ], [ 13.645830, 46.142490 ], [ 13.479440, 46.013321 ], [ 13.542500, 45.967480 ], [ 13.590000, 45.993320 ], [ 13.635000, 45.988590 ], [ 13.623610, 45.922211 ], [ 13.577780, 45.854160 ], [ 13.598050, 45.810810 ], [ 13.821940, 45.726929 ], [ 13.919160, 45.637489 ], [ 13.859440, 45.587490 ], [ 13.717510, 45.597660 ], [ 13.804440, 45.609989 ], [ 13.632220, 45.769161 ], [ 13.550000, 45.787209 ], [ 13.523050, 45.746658 ], [ 13.433610, 45.678322 ], [ 13.341670, 45.740261 ], [ 13.131110, 45.771931 ], [ 13.070000, 45.714710 ], [ 13.075550, 45.693321 ], [ 13.150000, 45.695541 ], [ 13.086110, 45.635540 ], [ 12.868610, 45.596661 ], [ 12.456390, 45.446381 ], [ 12.414720, 45.431931 ], [ 12.453050, 45.493320 ], [ 12.564720, 45.528599 ], [ 12.480000, 45.565819 ], [ 12.450000, 45.509430 ], [ 12.260280, 45.456661 ], [ 12.218330, 45.308880 ], [ 12.158330, 45.313881 ], [ 12.161110, 45.263882 ], [ 12.199170, 45.267769 ], [ 12.230280, 45.199989 ], [ 12.284170, 45.205818 ], [ 12.326110, 45.108051 ], [ 12.293610, 45.091381 ], [ 12.434720, 45.021648 ], [ 12.510000, 44.919159 ], [ 12.449170, 44.818321 ], [ 12.440550, 44.894989 ], [ 12.391390, 44.872761 ], [ 12.425280, 44.818050 ], [ 12.387500, 44.786930 ], [ 12.279170, 44.816929 ], [ 12.245550, 44.715820 ], [ 12.318050, 44.353600 ], [ 12.503050, 44.121658 ], [ 12.574740, 44.082039 ], [ 12.678050, 43.993320 ], [ 13.075000, 43.821930 ], [ 13.421940, 43.624439 ], [ 13.599440, 43.569988 ], [ 13.759720, 43.261379 ], [ 13.891390, 42.926659 ], [ 14.058330, 42.619709 ], [ 14.303050, 42.414989 ], [ 14.624160, 42.199989 ], [ 14.715560, 42.171940 ], [ 14.722780, 42.100552 ], [ 14.888890, 42.021648 ], [ 15.346660, 41.910259 ], [ 15.831390, 41.923321 ], [ 16.018049, 41.947208 ], [ 16.176661, 41.888599 ], [ 16.191111, 41.784988 ], [ 15.889720, 41.571098 ], [ 15.920000, 41.493599 ], [ 16.033051, 41.418880 ], [ 16.439989, 41.266651 ], [ 16.866940, 41.130260 ], [ 17.282770, 40.973049 ], [ 17.475269, 40.827770 ], [ 17.894720, 40.682491 ], [ 17.952749, 40.644588 ], [ 18.011669, 40.644428 ], [ 18.039709, 40.553600 ], [ 18.359440, 40.342209 ], [ 18.510830, 40.138882 ], [ 18.481670, 40.048870 ], [ 18.419720, 39.995819 ], [ 18.390829, 39.814430 ], [ 18.349440, 39.791931 ], [ 18.052490, 39.926102 ], [ 17.994720, 39.994160 ], [ 18.022221, 40.013599 ], [ 17.894440, 40.260269 ], [ 17.684719, 40.303322 ], [ 17.398331, 40.329708 ], [ 17.204439, 40.407211 ], [ 17.229441, 40.474152 ], [ 17.269440, 40.485538 ], [ 17.089720, 40.520821 ], [ 16.947220, 40.470829 ], [ 16.758610, 40.262211 ], [ 16.695271, 40.152760 ], [ 16.612221, 40.093040 ], [ 16.607491, 40.005260 ], [ 16.633051, 39.962769 ], [ 16.498051, 39.820820 ], [ 16.490549, 39.749149 ], [ 16.543051, 39.650269 ], [ 16.933880, 39.511929 ], [ 17.161381, 39.400829 ], [ 17.109440, 39.267490 ], [ 17.145269, 39.195271 ], [ 17.134991, 39.068050 ], [ 17.204161, 39.028049 ], [ 17.103609, 38.895260 ], [ 17.061390, 38.920269 ], [ 16.836941, 38.917488 ], [ 16.621111, 38.821930 ], [ 16.538879, 38.722488 ], [ 16.576660, 38.471661 ], [ 16.571390, 38.431381 ], [ 16.490549, 38.358051 ], [ 16.326941, 38.296101 ], [ 16.165550, 38.139149 ], [ 16.116659, 37.979710 ], [ 16.062490, 37.924160 ], [ 16.000000, 37.918049 ], [ 15.775830, 37.916931 ], [ 15.675280, 37.952209 ], [ 15.632500, 38.008041 ], [ 15.628890, 38.228600 ], [ 15.793050, 38.280540 ], [ 15.901110, 38.462212 ], [ 15.925280, 38.541370 ], [ 15.828330, 38.620541 ], [ 15.853050, 38.660259 ], [ 15.994160, 38.722759 ], [ 16.129160, 38.715549 ], [ 16.181110, 38.747490 ], [ 16.219990, 38.843040 ], [ 16.221100, 38.922489 ], [ 16.106110, 39.014431 ], [ 16.023331, 39.362770 ], [ 15.906660, 39.531380 ], [ 15.839720, 39.626930 ], [ 15.739440, 39.934429 ], [ 15.630550, 40.070271 ], [ 15.519720, 40.073318 ], [ 15.416940, 39.990261 ], [ 15.265830, 40.027489 ], [ 15.274440, 40.061378 ], [ 15.121660, 40.169708 ], [ 14.966110, 40.219990 ], [ 14.909110, 40.237709 ], [ 14.989720, 40.358318 ], [ 14.990550, 40.399151 ], [ 14.779720, 40.669708 ], [ 14.597780, 40.632210 ], [ 14.531110, 40.607769 ], [ 14.448330, 40.618320 ], [ 14.331660, 40.572769 ], [ 14.339440, 40.619160 ], [ 14.470000, 40.695541 ], [ 14.458050, 40.742771 ], [ 14.285550, 40.836929 ], [ 14.083890, 40.782211 ], [ 14.044170, 40.794991 ], [ 14.037780, 40.881649 ], [ 13.826110, 41.162491 ], [ 13.713050, 41.251381 ], [ 13.620830, 41.257771 ], [ 13.562220, 41.234711 ], [ 13.503890, 41.221100 ], [ 13.323060, 41.292759 ], [ 13.211110, 41.282490 ], [ 13.094440, 41.220539 ], [ 13.039440, 41.225819 ], [ 12.951940, 41.353039 ], [ 12.855000, 41.409988 ], [ 12.624720, 41.446381 ], [ 12.360000, 41.689159 ], [ 12.227220, 41.739990 ], [ 12.175830, 41.871101 ], [ 11.926390, 42.029991 ], [ 11.777220, 42.089432 ], [ 11.635270, 42.292488 ], [ 11.374720, 42.404991 ], [ 11.211390, 42.414711 ], [ 11.150280, 42.363880 ], [ 11.085830, 42.421940 ], [ 11.168330, 42.447491 ], [ 11.189720, 42.506378 ], [ 11.080270, 42.632210 ], [ 10.750280, 42.807491 ], [ 10.779440, 42.887489 ], [ 10.761110, 42.914711 ], [ 10.673610, 42.948318 ], [ 10.499170, 42.932209 ], [ 10.480280, 42.983601 ], [ 10.525000, 43.025269 ], [ 10.542500, 43.154430 ], [ 10.519440, 43.256100 ], [ 10.296670, 43.536930 ], [ 10.214170, 43.906101 ], [ 10.090830, 44.018600 ], [ 9.840277, 44.108601 ], [ 9.839167, 44.072491 ], [ 9.839998, 44.035820 ], [ 9.496666, 44.219440 ], [ 9.233610, 44.346371 ], [ 9.213331, 44.300541 ], [ 8.871944, 44.409431 ], [ 8.761108, 44.429440 ], [ 8.468332, 44.300819 ], [ 8.399443, 44.178322 ], [ 8.284166, 44.147770 ], [ 8.158054, 43.994431 ], [ 8.121111, 43.927761 ], [ 7.828610, 43.819439 ], [ 7.534765, 43.783451 ], [ 7.492221, 43.869431 ], [ 7.704166, 44.072208 ], [ 7.672776, 44.182758 ], [ 7.279444, 44.156651 ], [ 6.935832, 44.323318 ], [ 6.886110, 44.415821 ], [ 6.934999, 44.443039 ], [ 6.857222, 44.507771 ], [ 6.852777, 44.540821 ], [ 6.960278, 44.628868 ], [ 6.950832, 44.664700 ], [ 7.000833, 44.699150 ], [ 7.068889, 44.689152 ], [ 7.009999, 44.848591 ], [ 6.743332, 44.947762 ], [ 6.746666, 45.020260 ], [ 6.620172, 45.110661 ], [ 6.760833, 45.168320 ], [ 6.850277, 45.136101 ], [ 7.122776, 45.301929 ], [ 7.133054, 45.355549 ], [ 7.181388, 45.411652 ], [ 6.999443, 45.518318 ], [ 6.990832, 45.639980 ], [ 6.824166, 45.714989 ], [ 6.799166, 45.780819 ], [ 6.808887, 45.831379 ], [ 7.038747, 45.931721 ], [ 7.099443, 45.883598 ], [ 7.393332, 45.916088 ], [ 7.578887, 45.983318 ], [ 7.677344, 45.961239 ], [ 7.852777, 45.919979 ], [ 7.902498, 45.991100 ], [ 7.998055, 46.002209 ], [ 8.158888, 46.176651 ], [ 8.090275, 46.260540 ], [ 8.401108, 46.456089 ], [ 8.451664, 46.459980 ], [ 8.459164, 46.338322 ], [ 8.444443, 46.248600 ], [ 8.691942, 46.101379 ], [ 8.711609, 46.101421 ], [ 8.761568, 46.101528 ], [ 8.813053, 46.101650 ], [ 8.850552, 46.072491 ], [ 8.785276, 45.989979 ], [ 8.895554, 45.955818 ], [ 8.897268, 45.952751 ], [ 8.907169, 45.935101 ], [ 8.907776, 45.932770 ], [ 8.917242, 45.917160 ], [ 8.963053, 45.835541 ], [ 9.031666, 45.823879 ], [ 9.085552, 45.899151 ], [ 8.996664, 45.973309 ], [ 9.006247, 45.989651 ], [ 9.019529, 46.012299 ], [ 9.083332, 46.121090 ], [ 9.291941, 46.323040 ], [ 9.272221, 46.484150 ], [ 9.360830, 46.508598 ], [ 9.401943, 46.473309 ], [ 9.454443, 46.509430 ], [ 9.512499, 46.331928 ], [ 9.619442, 46.293049 ], [ 9.708332, 46.298321 ], [ 9.737495, 46.357208 ], [ 9.949999, 46.379150 ], [ 9.996386, 46.318321 ], [ 10.063050, 46.222759 ], [ 10.159440, 46.247761 ], [ 10.177220, 46.272480 ], [ 10.110000, 46.326382 ], [ 10.163050, 46.411930 ], [ 10.050000, 46.479710 ], [ 10.068330, 46.554989 ], [ 10.105280, 46.611370 ], [ 10.233330, 46.639980 ], [ 10.301660, 46.555820 ], [ 10.449720, 46.539150 ], [ 10.485280, 46.590542 ], [ 10.473890, 46.633320 ], [ 10.405280, 46.644428 ], [ 10.385280, 46.689419 ], [ 10.447500, 46.763050 ], [ 10.463570, 46.869350 ] ], [ [ 12.407696, 43.913788 ], [ 12.408300, 43.912201 ], [ 12.410000, 43.909199 ], [ 12.412200, 43.906101 ], [ 12.416400, 43.904701 ], [ 12.421700, 43.905300 ], [ 12.425600, 43.906898 ], [ 12.430300, 43.908100 ], [ 12.434200, 43.909698 ], [ 12.439200, 43.909401 ], [ 12.442800, 43.907501 ], [ 12.445300, 43.904701 ], [ 12.447500, 43.901901 ], [ 12.450300, 43.899399 ], [ 12.454200, 43.897499 ], [ 12.459200, 43.896099 ], [ 12.464700, 43.895599 ], [ 12.469700, 43.896099 ], [ 12.474400, 43.897202 ], [ 12.477800, 43.899399 ], [ 12.481100, 43.901699 ], [ 12.484400, 43.903900 ], [ 12.487800, 43.905800 ], [ 12.490600, 43.908600 ], [ 12.492800, 43.911701 ], [ 12.495000, 43.914700 ], [ 12.496100, 43.918900 ], [ 12.496400, 43.923302 ], [ 12.495600, 43.927200 ], [ 12.496700, 43.931099 ], [ 12.499400, 43.933899 ], [ 12.503300, 43.935600 ], [ 12.507200, 43.937199 ], [ 12.510600, 43.939201 ], [ 12.511700, 43.943298 ], [ 12.510800, 43.946899 ], [ 12.509700, 43.950802 ], [ 12.508900, 43.954399 ], [ 12.507800, 43.958099 ], [ 12.506900, 43.961899 ], [ 12.506700, 43.966099 ], [ 12.507200, 43.970600 ], [ 12.507500, 43.975300 ], [ 12.508600, 43.979198 ], [ 12.510300, 43.982800 ], [ 12.510000, 43.986900 ], [ 12.505600, 43.988602 ], [ 12.499200, 43.988899 ], [ 12.492800, 43.989201 ], [ 12.487200, 43.988899 ], [ 12.481900, 43.988300 ], [ 12.476700, 43.987499 ], [ 12.471700, 43.986900 ], [ 12.466900, 43.985802 ], [ 12.462500, 43.984699 ], [ 12.458100, 43.983299 ], [ 12.453900, 43.981701 ], [ 12.450600, 43.979698 ], [ 12.447800, 43.976898 ], [ 12.445600, 43.973900 ], [ 12.443900, 43.970299 ], [ 12.441100, 43.967800 ], [ 12.437800, 43.965599 ], [ 12.434400, 43.963299 ], [ 12.430600, 43.961700 ], [ 12.425800, 43.960602 ], [ 12.421400, 43.959400 ], [ 12.416700, 43.958302 ], [ 12.412800, 43.956699 ], [ 12.408900, 43.955002 ], [ 12.406700, 43.951900 ], [ 12.405000, 43.948299 ], [ 12.404700, 43.943600 ], [ 12.405000, 43.939400 ], [ 12.403900, 43.935600 ], [ 12.403600, 43.930801 ], [ 12.403900, 43.926701 ], [ 12.404700, 43.923100 ], [ 12.405800, 43.919399 ], [ 12.407696, 43.913788 ] ] ] } ] } ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Cyprus', 'density': '86.8', 'population': '796875' }, 'geometry': { 'type': 'MultiPolygon', 'coordinates': [ [ [ [ 33.031101, 34.563320 ], [ 32.941380, 34.563599 ], [ 32.909988, 34.652210 ], [ 32.729431, 34.645260 ], [ 32.491940, 34.702209 ], [ 32.404148, 34.750820 ], [ 32.390541, 34.838039 ], [ 32.323040, 34.893040 ], [ 32.269161, 35.074429 ], [ 32.304710, 35.084148 ], [ 32.369160, 35.039711 ], [ 32.428051, 35.045269 ], [ 32.618599, 35.182491 ], [ 32.721931, 35.180820 ], [ 32.830540, 35.142208 ], [ 32.901932, 35.174160 ], [ 32.940269, 35.302761 ], [ 32.919708, 35.390541 ], [ 33.346931, 35.333321 ], [ 33.631649, 35.350269 ], [ 34.021931, 35.461102 ], [ 34.356659, 35.610538 ], [ 34.581661, 35.671650 ], [ 34.513050, 35.619160 ], [ 34.186378, 35.443050 ], [ 33.903881, 35.229160 ], [ 33.902489, 35.161652 ], [ 34.083321, 34.959431 ], [ 33.969440, 34.984711 ], [ 33.855259, 34.938881 ], [ 33.810261, 34.966930 ], [ 33.685261, 34.968040 ], [ 33.646099, 34.935551 ], [ 33.608601, 34.823318 ], [ 33.280270, 34.714710 ], [ 33.066662, 34.682209 ], [ 33.009708, 34.637489 ], [ 33.031101, 34.563320 ] ] ] ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Latvia', 'density': '36.3', 'population': '2261294' }, 'geometry': { 'type': 'MultiPolygon', 'coordinates': [ [ [ [ 24.297131, 57.736420 ], [ 24.294439, 57.850269 ], [ 24.310049, 57.870831 ], [ 24.420300, 57.874401 ], [ 24.453100, 57.913300 ], [ 24.553600, 57.954700 ], [ 24.717800, 57.958900 ], [ 24.754200, 58.000801 ], [ 24.827499, 57.980000 ], [ 24.885300, 58.007500 ], [ 24.968100, 58.014400 ], [ 25.091700, 58.071701 ], [ 25.170000, 58.074402 ], [ 25.206100, 58.031700 ], [ 25.232500, 57.992802 ], [ 25.294399, 58.007500 ], [ 25.296900, 58.038101 ], [ 25.263100, 58.069199 ], [ 25.301701, 58.083099 ], [ 25.348301, 58.036701 ], [ 25.421700, 58.035599 ], [ 25.461100, 57.994400 ], [ 25.576401, 57.966900 ], [ 25.577200, 57.942200 ], [ 25.622801, 57.916401 ], [ 25.749201, 57.931099 ], [ 25.801399, 57.865799 ], [ 26.031401, 57.849998 ], [ 26.046700, 57.840302 ], [ 26.028601, 57.802200 ], [ 26.037500, 57.784698 ], [ 26.180300, 57.721901 ], [ 26.299200, 57.611401 ], [ 26.460300, 57.570599 ], [ 26.517200, 57.524399 ], [ 26.561100, 57.536098 ], [ 26.608900, 57.526901 ], [ 26.635000, 57.555801 ], [ 26.719400, 57.581699 ], [ 26.760799, 57.571098 ], [ 26.829201, 57.582500 ], [ 26.864401, 57.625801 ], [ 26.890800, 57.633900 ], [ 26.910000, 57.619202 ], [ 27.018600, 57.611401 ], [ 27.087200, 57.562199 ], [ 27.245001, 57.549198 ], [ 27.338301, 57.522800 ], [ 27.371099, 57.536400 ], [ 27.547199, 57.536400 ], [ 27.545799, 57.472500 ], [ 27.525600, 57.445801 ], [ 27.538300, 57.430801 ], [ 27.660601, 57.397499 ], [ 27.862801, 57.298901 ], [ 27.840799, 57.163601 ], [ 27.701401, 57.119202 ], [ 27.777500, 57.065800 ], [ 27.742201, 57.006699 ], [ 27.743900, 56.979401 ], [ 27.701700, 56.914700 ], [ 27.663099, 56.894699 ], [ 27.639999, 56.848099 ], [ 27.807199, 56.878899 ], [ 27.860600, 56.868900 ], [ 27.935301, 56.827202 ], [ 27.933599, 56.801102 ], [ 27.886101, 56.766102 ], [ 27.886101, 56.747200 ], [ 28.004999, 56.691399 ], [ 28.010799, 56.624401 ], [ 28.032801, 56.593102 ], [ 28.152500, 56.554401 ], [ 28.113100, 56.505600 ], [ 28.189699, 56.440601 ], [ 28.184401, 56.374699 ], [ 28.237801, 56.271099 ], [ 28.202801, 56.229698 ], [ 28.195000, 56.177502 ], [ 28.166498, 56.150318 ], [ 28.118299, 56.167198 ], [ 28.058300, 56.136398 ], [ 27.929399, 56.113300 ], [ 27.893299, 56.065601 ], [ 27.795601, 56.025299 ], [ 27.791100, 55.988899 ], [ 27.647200, 55.924198 ], [ 27.632799, 55.840599 ], [ 27.601400, 55.791901 ], [ 27.400000, 55.803902 ], [ 27.350800, 55.826401 ], [ 27.282200, 55.787201 ], [ 27.156099, 55.846401 ], [ 26.990000, 55.834702 ], [ 26.908100, 55.778599 ], [ 26.850000, 55.710800 ], [ 26.745300, 55.686699 ], [ 26.661699, 55.705799 ], [ 26.614086, 55.676048 ], [ 26.510799, 55.683899 ], [ 26.338600, 55.726398 ], [ 26.268900, 55.769402 ], [ 26.198099, 55.862499 ], [ 26.002800, 55.958302 ], [ 25.715000, 56.090000 ], [ 25.684999, 56.151699 ], [ 25.593901, 56.148102 ], [ 25.546101, 56.172501 ], [ 25.495800, 56.156700 ], [ 25.327499, 56.169201 ], [ 25.096901, 56.201099 ], [ 25.047199, 56.270802 ], [ 25.000000, 56.295601 ], [ 24.922199, 56.439999 ], [ 24.899700, 56.450600 ], [ 24.872200, 56.443600 ], [ 24.864401, 56.412800 ], [ 24.726700, 56.397800 ], [ 24.653299, 56.365799 ], [ 24.558300, 56.288300 ], [ 24.473301, 56.269199 ], [ 24.339701, 56.310799 ], [ 24.147800, 56.261398 ], [ 23.948900, 56.332199 ], [ 23.746401, 56.335800 ], [ 23.741100, 56.360001 ], [ 23.651899, 56.360298 ], [ 23.596901, 56.362202 ], [ 23.525299, 56.334202 ], [ 23.296101, 56.380798 ], [ 23.171101, 56.361900 ], [ 23.180300, 56.345600 ], [ 23.096100, 56.305801 ], [ 23.037500, 56.328602 ], [ 22.992800, 56.393101 ], [ 22.941401, 56.423901 ], [ 22.827200, 56.379200 ], [ 22.691401, 56.356701 ], [ 22.623301, 56.386902 ], [ 22.519199, 56.404400 ], [ 22.248899, 56.397499 ], [ 22.154400, 56.424198 ], [ 22.067200, 56.419399 ], [ 21.709400, 56.315300 ], [ 21.591101, 56.318600 ], [ 21.562500, 56.293301 ], [ 21.427799, 56.241901 ], [ 21.354401, 56.240002 ], [ 21.244400, 56.168301 ], [ 21.218100, 56.090000 ], [ 21.049622, 56.076775 ], [ 21.039169, 56.127491 ], [ 20.986940, 56.197769 ], [ 21.005831, 56.482769 ], [ 21.028610, 56.508041 ], [ 21.060280, 56.384159 ], [ 21.081671, 56.398880 ], [ 21.057779, 56.510540 ], [ 20.991390, 56.538052 ], [ 21.060551, 56.841648 ], [ 21.359720, 56.988602 ], [ 21.415550, 57.069439 ], [ 21.420561, 57.289440 ], [ 21.624720, 57.478870 ], [ 21.754999, 57.583321 ], [ 21.953051, 57.591930 ], [ 22.491940, 57.742210 ], [ 22.614719, 57.749989 ], [ 22.584160, 57.676102 ], [ 22.612499, 57.616100 ], [ 22.860279, 57.488319 ], [ 23.137220, 57.363041 ], [ 23.259159, 57.098049 ], [ 23.580549, 56.978321 ], [ 23.683611, 56.965260 ], [ 23.894440, 56.995541 ], [ 24.333611, 57.197491 ], [ 24.413059, 57.272770 ], [ 24.387779, 57.421101 ], [ 24.376381, 57.620541 ], [ 24.297131, 57.736420 ] ] ] ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Lithuania', 'density': '53.3', 'population': '3349872' }, 'geometry': { 'type': 'MultiPolygon', 'coordinates': [ [ [ [ 22.782803, 54.366657 ], [ 22.770000, 54.359989 ], [ 22.074720, 54.334980 ], [ 21.353331, 54.328320 ], [ 20.641661, 54.366650 ], [ 19.990829, 54.420540 ], [ 19.811920, 54.446049 ], [ 19.939159, 54.496380 ], [ 19.996670, 54.573318 ], [ 20.063890, 54.550819 ], [ 20.405001, 54.682770 ], [ 20.238331, 54.691380 ], [ 20.074440, 54.652760 ], [ 20.011391, 54.720268 ], [ 19.954720, 54.699429 ], [ 19.944160, 54.659161 ], [ 19.961109, 54.634430 ], [ 19.665630, 54.466911 ], [ 19.636511, 54.471069 ], [ 19.864719, 54.629711 ], [ 19.961109, 54.776932 ], [ 19.919720, 54.871101 ], [ 19.936661, 54.921101 ], [ 19.985279, 54.961929 ], [ 20.427500, 54.949429 ], [ 20.698610, 55.079708 ], [ 20.932032, 55.290062 ], [ 21.004999, 55.355820 ], [ 21.092501, 55.531101 ], [ 21.086241, 55.706299 ], [ 21.111160, 55.668911 ], [ 21.101940, 55.414150 ], [ 20.968580, 55.280033 ], [ 20.867500, 55.179150 ], [ 20.544720, 54.974709 ], [ 20.566389, 54.937771 ], [ 20.918051, 54.900829 ], [ 21.222500, 54.931931 ], [ 21.246941, 54.954990 ], [ 21.196390, 55.114990 ], [ 21.189989, 55.206379 ], [ 21.260281, 55.200550 ], [ 21.274441, 55.228600 ], [ 21.271309, 55.249691 ], [ 21.251659, 55.368038 ], [ 21.182779, 55.344711 ], [ 21.247780, 55.459148 ], [ 21.058331, 55.781651 ], [ 21.067221, 55.991379 ], [ 21.049622, 56.076775 ], [ 21.218100, 56.090000 ], [ 21.244400, 56.168301 ], [ 21.354401, 56.240002 ], [ 21.427799, 56.241901 ], [ 21.562500, 56.293301 ], [ 21.591101, 56.318600 ], [ 21.709400, 56.315300 ], [ 22.067200, 56.419399 ], [ 22.154400, 56.424198 ], [ 22.248899, 56.397499 ], [ 22.519199, 56.404400 ], [ 22.623301, 56.386902 ], [ 22.691401, 56.356701 ], [ 22.827200, 56.379200 ], [ 22.941401, 56.423901 ], [ 22.992800, 56.393101 ], [ 23.037500, 56.328602 ], [ 23.096100, 56.305801 ], [ 23.180300, 56.345600 ], [ 23.171101, 56.361900 ], [ 23.296101, 56.380798 ], [ 23.525299, 56.334202 ], [ 23.596901, 56.362202 ], [ 23.651899, 56.360298 ], [ 23.741100, 56.360001 ], [ 23.746401, 56.335800 ], [ 23.948900, 56.332199 ], [ 24.147800, 56.261398 ], [ 24.339701, 56.310799 ], [ 24.473301, 56.269199 ], [ 24.558300, 56.288300 ], [ 24.653299, 56.365799 ], [ 24.726700, 56.397800 ], [ 24.864401, 56.412800 ], [ 24.872200, 56.443600 ], [ 24.899700, 56.450600 ], [ 24.922199, 56.439999 ], [ 25.000000, 56.295601 ], [ 25.047199, 56.270802 ], [ 25.096901, 56.201099 ], [ 25.327499, 56.169201 ], [ 25.495800, 56.156700 ], [ 25.546101, 56.172501 ], [ 25.593901, 56.148102 ], [ 25.684999, 56.151699 ], [ 25.715000, 56.090000 ], [ 26.002800, 55.958302 ], [ 26.198099, 55.862499 ], [ 26.268900, 55.769402 ], [ 26.338600, 55.726398 ], [ 26.510799, 55.683899 ], [ 26.614086, 55.676048 ], [ 26.626699, 55.593102 ], [ 26.545000, 55.511101 ], [ 26.569401, 55.468300 ], [ 26.523600, 55.443901 ], [ 26.502501, 55.389999 ], [ 26.455799, 55.341400 ], [ 26.554701, 55.313099 ], [ 26.631399, 55.331100 ], [ 26.766899, 55.313599 ], [ 26.819700, 55.281101 ], [ 26.775299, 55.250599 ], [ 26.713301, 55.243099 ], [ 26.668600, 55.218102 ], [ 26.641701, 55.190800 ], [ 26.641701, 55.142502 ], [ 26.615801, 55.124699 ], [ 26.481701, 55.154999 ], [ 26.450300, 55.132801 ], [ 26.284201, 55.148102 ], [ 26.253300, 55.123600 ], [ 26.248301, 55.071098 ], [ 26.219400, 55.029999 ], [ 26.160801, 54.977200 ], [ 25.881701, 54.944199 ], [ 25.862499, 54.910801 ], [ 25.788900, 54.870300 ], [ 25.803600, 54.813900 ], [ 25.736700, 54.789398 ], [ 25.749201, 54.728298 ], [ 25.727200, 54.666698 ], [ 25.764200, 54.579201 ], [ 25.648899, 54.517502 ], [ 25.633101, 54.477798 ], [ 25.636400, 54.427200 ], [ 25.557199, 54.366100 ], [ 25.547501, 54.328602 ], [ 25.611099, 54.311401 ], [ 25.714199, 54.331100 ], [ 25.727200, 54.290600 ], [ 25.770300, 54.287800 ], [ 25.807800, 54.248100 ], [ 25.787201, 54.218102 ], [ 25.785299, 54.160599 ], [ 25.700300, 54.154701 ], [ 25.669201, 54.136101 ], [ 25.534401, 54.146900 ], [ 25.504700, 54.183102 ], [ 25.547800, 54.203300 ], [ 25.518299, 54.225800 ], [ 25.577200, 54.240299 ], [ 25.492800, 54.305302 ], [ 25.451900, 54.299702 ], [ 25.391701, 54.255798 ], [ 25.217800, 54.264400 ], [ 25.209400, 54.230000 ], [ 25.161900, 54.172501 ], [ 25.071899, 54.134701 ], [ 25.024401, 54.131100 ], [ 24.968901, 54.158600 ], [ 24.840300, 54.142200 ], [ 24.835600, 54.113602 ], [ 24.795601, 54.101398 ], [ 24.840599, 54.034401 ], [ 24.820801, 53.977200 ], [ 24.727800, 53.968601 ], [ 24.691700, 54.001701 ], [ 24.612200, 53.992199 ], [ 24.386900, 53.888599 ], [ 24.332500, 53.906101 ], [ 24.277800, 53.899700 ], [ 24.231400, 53.953098 ], [ 24.175600, 53.967499 ], [ 24.088600, 53.937500 ], [ 23.986099, 53.938900 ], [ 23.934999, 53.955799 ], [ 23.833599, 53.925800 ], [ 23.787500, 53.938099 ], [ 23.779699, 53.917801 ], [ 23.719999, 53.926701 ], [ 23.644400, 53.904701 ], [ 23.579201, 53.936100 ], [ 23.503748, 53.947163 ], [ 23.474991, 53.995258 ], [ 23.517780, 54.030270 ], [ 23.484440, 54.138321 ], [ 23.341940, 54.243320 ], [ 23.066111, 54.308041 ], [ 23.000000, 54.383041 ], [ 22.863331, 54.408588 ], [ 22.782803, 54.366657 ] ] ] ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Luxembourg', 'density': '192.5', 'population': '493500' }, 'geometry': { 'type': 'MultiPolygon', 'coordinates': [ [ [ [ 5.783038, 49.527271 ], [ 5.839999, 49.552212 ], [ 5.899166, 49.662762 ], [ 5.820555, 49.749149 ], [ 5.746666, 49.795269 ], [ 5.753333, 49.849152 ], [ 5.731111, 49.894150 ], [ 5.808332, 49.961102 ], [ 5.819721, 50.009708 ], [ 5.980000, 50.172211 ], [ 6.106943, 50.167759 ], [ 6.131833, 50.125530 ], [ 6.139722, 49.996651 ], [ 6.326666, 49.839710 ], [ 6.522222, 49.811100 ], [ 6.510555, 49.706379 ], [ 6.372499, 49.590260 ], [ 6.362221, 49.459980 ], [ 6.165277, 49.504711 ], [ 5.981388, 49.448318 ], [ 5.963333, 49.488319 ], [ 5.783038, 49.527271 ] ] ] ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Hungary', 'density': '107.7', 'population': '10030975' }, 'geometry': { 'type': 'MultiPolygon', 'coordinates': [ [ [ [ 22.151449, 48.412060 ], [ 22.271379, 48.404148 ], [ 22.260269, 48.360821 ], [ 22.319441, 48.361660 ], [ 22.315830, 48.321098 ], [ 22.383329, 48.244148 ], [ 22.507771, 48.245258 ], [ 22.620461, 48.101810 ], [ 22.744160, 48.114712 ], [ 22.840950, 48.086769 ], [ 22.886940, 48.036652 ], [ 22.865271, 48.010540 ], [ 22.894859, 47.953300 ], [ 22.770830, 47.879429 ], [ 22.774441, 47.836369 ], [ 22.612209, 47.768589 ], [ 22.441660, 47.791100 ], [ 22.421379, 47.743870 ], [ 22.318880, 47.745819 ], [ 22.010281, 47.508598 ], [ 22.004709, 47.374981 ], [ 21.922501, 47.354431 ], [ 21.868879, 47.262211 ], [ 21.651661, 47.025539 ], [ 21.695820, 47.000820 ], [ 21.609159, 46.894989 ], [ 21.438320, 46.648602 ], [ 21.326660, 46.619980 ], [ 21.261660, 46.486931 ], [ 21.296101, 46.447479 ], [ 21.287500, 46.414429 ], [ 21.197210, 46.391369 ], [ 21.187220, 46.329990 ], [ 21.053610, 46.238880 ], [ 20.829720, 46.277210 ], [ 20.753330, 46.238880 ], [ 20.763050, 46.199150 ], [ 20.721661, 46.184429 ], [ 20.335550, 46.158039 ], [ 20.261141, 46.115330 ], [ 20.118320, 46.166931 ], [ 19.807220, 46.128040 ], [ 19.710819, 46.174992 ], [ 19.570551, 46.173599 ], [ 19.249710, 45.993320 ], [ 19.155270, 45.987209 ], [ 19.123880, 46.023602 ], [ 19.083891, 46.019428 ], [ 19.038191, 45.967602 ], [ 18.828100, 45.896675 ], [ 18.803049, 45.886650 ], [ 18.699160, 45.921101 ], [ 18.629160, 45.876091 ], [ 18.559441, 45.801651 ], [ 18.278971, 45.760349 ], [ 18.189159, 45.784431 ], [ 18.082491, 45.766651 ], [ 17.799440, 45.808880 ], [ 17.576660, 45.940540 ], [ 17.426100, 45.954700 ], [ 17.358610, 45.949989 ], [ 17.320551, 45.974430 ], [ 17.209721, 46.118320 ], [ 17.064159, 46.206650 ], [ 16.939159, 46.246090 ], [ 16.876381, 46.318600 ], [ 16.609236, 46.475174 ], [ 16.391661, 46.636379 ], [ 16.426661, 46.687759 ], [ 16.318331, 46.779709 ], [ 16.350550, 46.841091 ], [ 16.281670, 46.872478 ], [ 16.106701, 46.851391 ], [ 16.346939, 47.009991 ], [ 16.459160, 47.029430 ], [ 16.516939, 47.060810 ], [ 16.468050, 47.095261 ], [ 16.527769, 47.134430 ], [ 16.520550, 47.155258 ], [ 16.456100, 47.146931 ], [ 16.438610, 47.252769 ], [ 16.491659, 47.279980 ], [ 16.450550, 47.407200 ], [ 16.645550, 47.452770 ], [ 16.712490, 47.539989 ], [ 16.648880, 47.629711 ], [ 16.433880, 47.664429 ], [ 16.450550, 47.698040 ], [ 16.532490, 47.714710 ], [ 16.555830, 47.756100 ], [ 16.686661, 47.743870 ], [ 16.696449, 47.736240 ], [ 16.761940, 47.685261 ], [ 16.797300, 47.688000 ], [ 17.083611, 47.710270 ], [ 17.057501, 47.844429 ], [ 17.015829, 47.868038 ], [ 17.090549, 47.887760 ], [ 17.103600, 47.977200 ], [ 17.179899, 48.001820 ], [ 17.251659, 48.024990 ], [ 17.603331, 47.828041 ], [ 17.784161, 47.746929 ], [ 18.337500, 47.740822 ], [ 18.812500, 47.816662 ], [ 18.849409, 47.818439 ], [ 18.766939, 47.877762 ], [ 18.770281, 47.956089 ], [ 18.808331, 47.993870 ], [ 18.827499, 48.035820 ], [ 19.001249, 48.068779 ], [ 19.476379, 48.089149 ], [ 19.535000, 48.212200 ], [ 19.662210, 48.231930 ], [ 19.918600, 48.129978 ], [ 20.065550, 48.180271 ], [ 20.150270, 48.260269 ], [ 20.291941, 48.254711 ], [ 20.364719, 48.305820 ], [ 20.509991, 48.537769 ], [ 20.824711, 48.575821 ], [ 21.125549, 48.492489 ], [ 21.442770, 48.575260 ], [ 21.614161, 48.498322 ], [ 21.628050, 48.449421 ], [ 21.738041, 48.350819 ], [ 21.862770, 48.365540 ], [ 22.101660, 48.377201 ], [ 22.151449, 48.412060 ] ] ] ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Malta', 'density': '1310.1', 'population': '413609' }, 'geometry': { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'Polygon', 'coordinates': [ [ [ 14.267500, 36.011398 ], [ 14.259200, 36.011700 ], [ 14.251400, 36.011398 ], [ 14.243100, 36.011902 ], [ 14.237200, 36.012798 ], [ 14.230800, 36.014400 ], [ 14.225000, 36.016701 ], [ 14.219400, 36.018902 ], [ 14.212800, 36.020599 ], [ 14.204400, 36.021099 ], [ 14.196900, 36.021900 ], [ 14.191100, 36.024399 ], [ 14.188100, 36.028599 ], [ 14.185800, 36.033298 ], [ 14.188900, 36.038101 ], [ 14.190800, 36.043301 ], [ 14.187800, 36.047501 ], [ 14.183900, 36.051102 ], [ 14.180800, 36.055302 ], [ 14.181100, 36.060799 ], [ 14.185600, 36.063900 ], [ 14.190800, 36.066399 ], [ 14.196700, 36.068298 ], [ 14.202800, 36.070000 ], [ 14.208900, 36.071701 ], [ 14.215600, 36.072800 ], [ 14.222200, 36.073898 ], [ 14.229200, 36.075001 ], [ 14.237500, 36.074402 ], [ 14.245800, 36.074200 ], [ 14.253300, 36.073101 ], [ 14.259200, 36.070801 ], [ 14.264700, 36.068600 ], [ 14.269700, 36.065601 ], [ 14.274400, 36.062500 ], [ 14.280300, 36.060299 ], [ 14.285800, 36.058102 ], [ 14.291700, 36.055801 ], [ 14.299200, 36.054699 ], [ 14.307500, 36.054401 ], [ 14.315000, 36.053299 ], [ 14.320600, 36.051102 ], [ 14.324400, 36.047501 ], [ 14.328600, 36.043900 ], [ 14.333300, 36.040798 ], [ 14.337200, 36.037201 ], [ 14.341100, 36.033901 ], [ 14.340800, 36.029701 ], [ 14.335800, 36.027199 ], [ 14.323900, 36.025002 ], [ 14.315600, 36.025600 ], [ 14.307800, 36.025002 ], [ 14.301900, 36.023300 ], [ 14.296700, 36.020802 ], [ 14.291400, 36.018299 ], [ 14.286900, 36.015301 ], [ 14.281100, 36.013302 ], [ 14.275000, 36.011700 ], [ 14.267500, 36.011398 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 14.519700, 35.799999 ], [ 14.513100, 35.801701 ], [ 14.507500, 35.803299 ], [ 14.499700, 35.802799 ], [ 14.492200, 35.803902 ], [ 14.486700, 35.806099 ], [ 14.480000, 35.807800 ], [ 14.475300, 35.810799 ], [ 14.468600, 35.812500 ], [ 14.463100, 35.814701 ], [ 14.455600, 35.815800 ], [ 14.447200, 35.816399 ], [ 14.439700, 35.817200 ], [ 14.431400, 35.817799 ], [ 14.423900, 35.818600 ], [ 14.419200, 35.821701 ], [ 14.415300, 35.825298 ], [ 14.411100, 35.828899 ], [ 14.406400, 35.831699 ], [ 14.401700, 35.834702 ], [ 14.396700, 35.837799 ], [ 14.391100, 35.840000 ], [ 14.385300, 35.842201 ], [ 14.379700, 35.844398 ], [ 14.375000, 35.847500 ], [ 14.370800, 35.851101 ], [ 14.366900, 35.854698 ], [ 14.364700, 35.859402 ], [ 14.361700, 35.863899 ], [ 14.356900, 35.866699 ], [ 14.352200, 35.869701 ], [ 14.347200, 35.872501 ], [ 14.343300, 35.876099 ], [ 14.339400, 35.879700 ], [ 14.336400, 35.883900 ], [ 14.336100, 35.889999 ], [ 14.333100, 35.895000 ], [ 14.334200, 35.901100 ], [ 14.338100, 35.905602 ], [ 14.340800, 35.910301 ], [ 14.343600, 35.914700 ], [ 14.344200, 35.921700 ], [ 14.342800, 35.927200 ], [ 14.340600, 35.931900 ], [ 14.336700, 35.936100 ], [ 14.335600, 35.941700 ], [ 14.335000, 35.947800 ], [ 14.334700, 35.953899 ], [ 14.332500, 35.958900 ], [ 14.329400, 35.963100 ], [ 14.326400, 35.967201 ], [ 14.325000, 35.972801 ], [ 14.326400, 35.978901 ], [ 14.332500, 35.981098 ], [ 14.339200, 35.982201 ], [ 14.346900, 35.983299 ], [ 14.351900, 35.985802 ], [ 14.357200, 35.988098 ], [ 14.361700, 35.991402 ], [ 14.368300, 35.992500 ], [ 14.375000, 35.990799 ], [ 14.375600, 35.986099 ], [ 14.371100, 35.982800 ], [ 14.365300, 35.981098 ], [ 14.359200, 35.979198 ], [ 14.353900, 35.976898 ], [ 14.351900, 35.971401 ], [ 14.355800, 35.967800 ], [ 14.363300, 35.966900 ], [ 14.371700, 35.966400 ], [ 14.378300, 35.967499 ], [ 14.386100, 35.967800 ], [ 14.392500, 35.966099 ], [ 14.397500, 35.963299 ], [ 14.401400, 35.959702 ], [ 14.406100, 35.956699 ], [ 14.412800, 35.956402 ], [ 14.418100, 35.958900 ], [ 14.424200, 35.960602 ], [ 14.430000, 35.962502 ], [ 14.437500, 35.962799 ], [ 14.443300, 35.960300 ], [ 14.446400, 35.956100 ], [ 14.448600, 35.951401 ], [ 14.451700, 35.947201 ], [ 14.456400, 35.944199 ], [ 14.461100, 35.941101 ], [ 14.467800, 35.939400 ], [ 14.476100, 35.939201 ], [ 14.481900, 35.936901 ], [ 14.485800, 35.933300 ], [ 14.488900, 35.929199 ], [ 14.495600, 35.927502 ], [ 14.503100, 35.926399 ], [ 14.510300, 35.925301 ], [ 14.513300, 35.921101 ], [ 14.513100, 35.916901 ], [ 14.511100, 35.911701 ], [ 14.509700, 35.905602 ], [ 14.511100, 35.900299 ], [ 14.515000, 35.896702 ], [ 14.522500, 35.895599 ], [ 14.529200, 35.895302 ], [ 14.536700, 35.895599 ], [ 14.543300, 35.895302 ], [ 14.548300, 35.892200 ], [ 14.551400, 35.888100 ], [ 14.556100, 35.884998 ], [ 14.560000, 35.881401 ], [ 14.563900, 35.877800 ], [ 14.566900, 35.873600 ], [ 14.570000, 35.869400 ], [ 14.569700, 35.864201 ], [ 14.566700, 35.859402 ], [ 14.565600, 35.853298 ], [ 14.565800, 35.847198 ], [ 14.567200, 35.841702 ], [ 14.567500, 35.835602 ], [ 14.568100, 35.829399 ], [ 14.565800, 35.824200 ], [ 14.562200, 35.820301 ], [ 14.558300, 35.823898 ], [ 14.555300, 35.828098 ], [ 14.550300, 35.829700 ], [ 14.547500, 35.825001 ], [ 14.543900, 35.821098 ], [ 14.537200, 35.820000 ], [ 14.529700, 35.821098 ], [ 14.524400, 35.818600 ], [ 14.524700, 35.812500 ], [ 14.526900, 35.807800 ], [ 14.530000, 35.803600 ], [ 14.527200, 35.800301 ], [ 14.519700, 35.799999 ] ] ] } ] } ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Netherlands', 'density': '489.7', 'population': '16485787' }, 'geometry': { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'Polygon', 'coordinates': [ [ [ 4.230012, 51.357220 ], [ 4.214999, 51.330269 ], [ 3.957222, 51.216091 ], [ 3.806388, 51.216930 ], [ 3.793055, 51.261929 ], [ 3.524722, 51.288319 ], [ 3.524166, 51.250542 ], [ 3.439166, 51.244431 ], [ 3.363889, 51.313599 ], [ 3.370646, 51.375549 ], [ 3.443333, 51.392769 ], [ 3.601111, 51.391930 ], [ 3.832778, 51.341648 ], [ 3.961389, 51.369709 ], [ 3.981944, 51.407211 ], [ 4.210833, 51.372490 ], [ 4.230012, 51.357220 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 5.855465, 51.147820 ], [ 5.457777, 51.280540 ], [ 5.238888, 51.262211 ], [ 5.237499, 51.308319 ], [ 5.143888, 51.318600 ], [ 5.077222, 51.395260 ], [ 5.104444, 51.434978 ], [ 5.041388, 51.486649 ], [ 4.940276, 51.401371 ], [ 4.782777, 51.414700 ], [ 4.816387, 51.425541 ], [ 4.844722, 51.461369 ], [ 4.825832, 51.492210 ], [ 4.769166, 51.502769 ], [ 4.671665, 51.427479 ], [ 4.541944, 51.426651 ], [ 4.549443, 51.482761 ], [ 4.411666, 51.456928 ], [ 4.396667, 51.416931 ], [ 4.437777, 51.375259 ], [ 4.413054, 51.358040 ], [ 4.239443, 51.374149 ], [ 4.236443, 51.368771 ], [ 4.200277, 51.408039 ], [ 4.066388, 51.414150 ], [ 3.983611, 51.456379 ], [ 3.930277, 51.448601 ], [ 3.906666, 51.399990 ], [ 3.744166, 51.414711 ], [ 3.691389, 51.458599 ], [ 3.580277, 51.443600 ], [ 3.452500, 51.521099 ], [ 3.446389, 51.541931 ], [ 3.568889, 51.597210 ], [ 3.862500, 51.602211 ], [ 3.903611, 51.568878 ], [ 4.111111, 51.443600 ], [ 4.277222, 51.445271 ], [ 4.293611, 51.468319 ], [ 4.266944, 51.508320 ], [ 3.995555, 51.579430 ], [ 4.027499, 51.601101 ], [ 4.208611, 51.589989 ], [ 4.153889, 51.614429 ], [ 3.995555, 51.618038 ], [ 3.899167, 51.635269 ], [ 3.828611, 51.691380 ], [ 3.720555, 51.672489 ], [ 3.687778, 51.689430 ], [ 3.693611, 51.720829 ], [ 3.870236, 51.785900 ], [ 4.064166, 51.857491 ], [ 4.026111, 51.884159 ], [ 4.052221, 51.915272 ], [ 4.021111, 51.988041 ], [ 4.111111, 51.985538 ], [ 4.435833, 52.246658 ], [ 4.588611, 52.489429 ], [ 4.719444, 52.890820 ], [ 4.734166, 52.955540 ], [ 4.820555, 52.960819 ], [ 4.808611, 52.924160 ], [ 4.872499, 52.897209 ], [ 5.085833, 52.955269 ], [ 5.378611, 53.091648 ], [ 5.442499, 53.211929 ], [ 5.703610, 53.327492 ], [ 5.914997, 53.384151 ], [ 6.092500, 53.410820 ], [ 6.303611, 53.395821 ], [ 6.741944, 53.465820 ], [ 6.871388, 53.431931 ], [ 6.901667, 53.350269 ], [ 7.073889, 53.288052 ], [ 7.096389, 53.254711 ], [ 7.209444, 53.242760 ], [ 7.198888, 52.967758 ], [ 7.069721, 52.814991 ], [ 7.055277, 52.651920 ], [ 7.035832, 52.632759 ], [ 6.781666, 52.654148 ], [ 6.720833, 52.629429 ], [ 6.760833, 52.567211 ], [ 6.690276, 52.551929 ], [ 6.705555, 52.485821 ], [ 6.946110, 52.434429 ], [ 6.987499, 52.461102 ], [ 7.065555, 52.385818 ], [ 7.052499, 52.235821 ], [ 6.879721, 52.153591 ], [ 6.860555, 52.120258 ], [ 6.697498, 52.069981 ], [ 6.688054, 52.038879 ], [ 6.800554, 52.007210 ], [ 6.830832, 51.971371 ], [ 6.727777, 51.899429 ], [ 6.548888, 51.885262 ], [ 6.380277, 51.829990 ], [ 6.159721, 51.905540 ], [ 6.137777, 51.876930 ], [ 6.169721, 51.841930 ], [ 5.961944, 51.830269 ], [ 5.968888, 51.791100 ], [ 5.954999, 51.738590 ], [ 6.039165, 51.716930 ], [ 6.029444, 51.678600 ], [ 6.116110, 51.651920 ], [ 6.093055, 51.607208 ], [ 6.217499, 51.476372 ], [ 6.222221, 51.361660 ], [ 6.073889, 51.220539 ], [ 6.079444, 51.175819 ], [ 6.167221, 51.162762 ], [ 5.952222, 51.036652 ], [ 5.873888, 51.050259 ], [ 5.869443, 51.018879 ], [ 5.965833, 50.978321 ], [ 6.028333, 50.976650 ], [ 6.010833, 50.943600 ], [ 6.084722, 50.873600 ], [ 5.981666, 50.802761 ], [ 6.008407, 50.756069 ], [ 5.698609, 50.757771 ], [ 5.683742, 50.882191 ], [ 5.759166, 50.949150 ], [ 5.722776, 50.965260 ], [ 5.775832, 51.021099 ], [ 5.802776, 51.093319 ], [ 5.855465, 51.147820 ] ] ] } ] } ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Austria', 'density': '101.5', 'population': '8355260' }, 'geometry': { 'type': 'MultiPolygon', 'coordinates': [ [ [ [ 16.886600, 48.730320 ], [ 16.944860, 48.616501 ], [ 16.896391, 48.487209 ], [ 16.856110, 48.419151 ], [ 16.840830, 48.368591 ], [ 16.949720, 48.278042 ], [ 16.976681, 48.174179 ], [ 17.068100, 48.144150 ], [ 17.080830, 48.079990 ], [ 17.179899, 48.001820 ], [ 17.103600, 47.977200 ], [ 17.090549, 47.887760 ], [ 17.015829, 47.868038 ], [ 17.057501, 47.844429 ], [ 17.083611, 47.710270 ], [ 16.797300, 47.688000 ], [ 16.761940, 47.685261 ], [ 16.696449, 47.736240 ], [ 16.686661, 47.743870 ], [ 16.555830, 47.756100 ], [ 16.532490, 47.714710 ], [ 16.450550, 47.698040 ], [ 16.433880, 47.664429 ], [ 16.648880, 47.629711 ], [ 16.712490, 47.539989 ], [ 16.645550, 47.452770 ], [ 16.450550, 47.407200 ], [ 16.491659, 47.279980 ], [ 16.438610, 47.252769 ], [ 16.456100, 47.146931 ], [ 16.520550, 47.155258 ], [ 16.527769, 47.134430 ], [ 16.468050, 47.095261 ], [ 16.516939, 47.060810 ], [ 16.459160, 47.029430 ], [ 16.346939, 47.009991 ], [ 16.106701, 46.851391 ], [ 15.993610, 46.834709 ], [ 15.993330, 46.737209 ], [ 16.026939, 46.661369 ], [ 15.649440, 46.709709 ], [ 15.500830, 46.618038 ], [ 15.105270, 46.657200 ], [ 14.870550, 46.615822 ], [ 14.814720, 46.512760 ], [ 14.594160, 46.437481 ], [ 14.574440, 46.387489 ], [ 14.428330, 46.446369 ], [ 14.159440, 46.440819 ], [ 14.084720, 46.488590 ], [ 13.718960, 46.525539 ], [ 13.412220, 46.574429 ], [ 12.895830, 46.612759 ], [ 12.433610, 46.695259 ], [ 12.355830, 46.777481 ], [ 12.283610, 46.791370 ], [ 12.295000, 46.863602 ], [ 12.144440, 46.915821 ], [ 12.131110, 47.016380 ], [ 12.204440, 47.039150 ], [ 12.211110, 47.090542 ], [ 11.755830, 46.977482 ], [ 11.615270, 47.013050 ], [ 11.411660, 46.972481 ], [ 11.339160, 46.995541 ], [ 11.164440, 46.962200 ], [ 11.014720, 46.772480 ], [ 10.735550, 46.798599 ], [ 10.764440, 46.834148 ], [ 10.672780, 46.874981 ], [ 10.560830, 46.848591 ], [ 10.463570, 46.869350 ], [ 10.466240, 46.885422 ], [ 10.488610, 46.934978 ], [ 10.400830, 47.001099 ], [ 10.310830, 46.950539 ], [ 10.175280, 46.858601 ], [ 10.063330, 46.864990 ], [ 9.873608, 46.958599 ], [ 9.875551, 47.022480 ], [ 9.601834, 47.049644 ], [ 9.605424, 47.057774 ], [ 9.611240, 47.064690 ], [ 9.617394, 47.071007 ], [ 9.622896, 47.078316 ], [ 9.629284, 47.083153 ], [ 9.633314, 47.090279 ], [ 9.640949, 47.097168 ], [ 9.638332, 47.105957 ], [ 9.633127, 47.113422 ], [ 9.634874, 47.120762 ], [ 9.637633, 47.128601 ], [ 9.630499, 47.137081 ], [ 9.628130, 47.143059 ], [ 9.623453, 47.152031 ], [ 9.615295, 47.152386 ], [ 9.606725, 47.155319 ], [ 9.599722, 47.159332 ], [ 9.594024, 47.166775 ], [ 9.584888, 47.168568 ], [ 9.575861, 47.167278 ], [ 9.572474, 47.177116 ], [ 9.574854, 47.185555 ], [ 9.578425, 47.192017 ], [ 9.582762, 47.199009 ], [ 9.582921, 47.207710 ], [ 9.579283, 47.214993 ], [ 9.572601, 47.221859 ], [ 9.563335, 47.222412 ], [ 9.554022, 47.227009 ], [ 9.560170, 47.233093 ], [ 9.567129, 47.237228 ], [ 9.572620, 47.245594 ], [ 9.575019, 47.249538 ], [ 9.563164, 47.250389 ], [ 9.554480, 47.255569 ], [ 9.547038, 47.256908 ], [ 9.540410, 47.266975 ], [ 9.605276, 47.359989 ], [ 9.664999, 47.381371 ], [ 9.653610, 47.455540 ], [ 9.558254, 47.504070 ], [ 9.567612, 47.543919 ], [ 9.605553, 47.529148 ], [ 9.727293, 47.536259 ], [ 9.763054, 47.584709 ], [ 9.813610, 47.593601 ], [ 9.854164, 47.538879 ], [ 9.963331, 47.547771 ], [ 10.003330, 47.483871 ], [ 10.084440, 47.460270 ], [ 10.104440, 47.428871 ], [ 10.087220, 47.387211 ], [ 10.154440, 47.369148 ], [ 10.211390, 47.386379 ], [ 10.214160, 47.315262 ], [ 10.169720, 47.281101 ], [ 10.274440, 47.288879 ], [ 10.473330, 47.435539 ], [ 10.426940, 47.576931 ], [ 10.482770, 47.590542 ], [ 10.465270, 47.558590 ], [ 10.554440, 47.536930 ], [ 10.685550, 47.558590 ], [ 10.848610, 47.536381 ], [ 10.909720, 47.521931 ], [ 10.865830, 47.493038 ], [ 10.950280, 47.460270 ], [ 10.973610, 47.400539 ], [ 11.106940, 47.396381 ], [ 11.203050, 47.435261 ], [ 11.236660, 47.433041 ], [ 11.227500, 47.400539 ], [ 11.405550, 47.453869 ], [ 11.421940, 47.508881 ], [ 11.574440, 47.519981 ], [ 11.633330, 47.595261 ], [ 11.878610, 47.606651 ], [ 12.196110, 47.609428 ], [ 12.206390, 47.641369 ], [ 12.177220, 47.701649 ], [ 12.257220, 47.743038 ], [ 12.243890, 47.694698 ], [ 12.441670, 47.698589 ], [ 12.505000, 47.637489 ], [ 12.773890, 47.674160 ], [ 12.830830, 47.618870 ], [ 12.787780, 47.589420 ], [ 12.809720, 47.552212 ], [ 13.005000, 47.469429 ], [ 13.053050, 47.496380 ], [ 13.074170, 47.616928 ], [ 13.100280, 47.640820 ], [ 13.058330, 47.706089 ], [ 12.917500, 47.715542 ], [ 12.939720, 47.784710 ], [ 13.008890, 47.854160 ], [ 12.756670, 48.120541 ], [ 12.929520, 48.209301 ], [ 13.368610, 48.351929 ], [ 13.433890, 48.419979 ], [ 13.448330, 48.568600 ], [ 13.505280, 48.583050 ], [ 13.726660, 48.517761 ], [ 13.833330, 48.698872 ], [ 13.793050, 48.726089 ], [ 13.814630, 48.787140 ], [ 14.045270, 48.676929 ], [ 14.041670, 48.615822 ], [ 14.381110, 48.575550 ], [ 14.458610, 48.648319 ], [ 14.700280, 48.581379 ], [ 14.812500, 48.781368 ], [ 14.961110, 48.766651 ], [ 14.994160, 49.015820 ], [ 15.152220, 49.001381 ], [ 15.159720, 48.944698 ], [ 15.340550, 48.985821 ], [ 15.785280, 48.877480 ], [ 15.954170, 48.828320 ], [ 16.060551, 48.760269 ], [ 16.370550, 48.733871 ], [ 16.527500, 48.810810 ], [ 16.655830, 48.787769 ], [ 16.773880, 48.723869 ], [ 16.886600, 48.730320 ] ] ] ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Poland', 'density': '122.0', 'population': '38135876' }, 'geometry': { 'type': 'MultiPolygon', 'coordinates': [ [ [ [ 19.665630, 54.466911 ], [ 19.811920, 54.446049 ], [ 19.990829, 54.420540 ], [ 20.641661, 54.366650 ], [ 21.353331, 54.328320 ], [ 22.074720, 54.334980 ], [ 22.770000, 54.359989 ], [ 22.782803, 54.366657 ], [ 22.863331, 54.408588 ], [ 23.000000, 54.383041 ], [ 23.066111, 54.308041 ], [ 23.341940, 54.243320 ], [ 23.484440, 54.138321 ], [ 23.517780, 54.030270 ], [ 23.474991, 53.995258 ], [ 23.503748, 53.947163 ], [ 23.521111, 53.878590 ], [ 23.658051, 53.529709 ], [ 23.854160, 53.210819 ], [ 23.934990, 52.890541 ], [ 23.933880, 52.712200 ], [ 23.883881, 52.678040 ], [ 23.563610, 52.584980 ], [ 23.384159, 52.504162 ], [ 23.168880, 52.282200 ], [ 23.211380, 52.223869 ], [ 23.293880, 52.225811 ], [ 23.485830, 52.146931 ], [ 23.598330, 52.109428 ], [ 23.656380, 52.041660 ], [ 23.611660, 51.914150 ], [ 23.626381, 51.796940 ], [ 23.553890, 51.745819 ], [ 23.539169, 51.592758 ], [ 23.592085, 51.528278 ], [ 23.671379, 51.431660 ], [ 23.632219, 51.307758 ], [ 23.749439, 51.207489 ], [ 23.973049, 50.944149 ], [ 24.144711, 50.858040 ], [ 24.130550, 50.834980 ], [ 23.995819, 50.831100 ], [ 23.954720, 50.787209 ], [ 24.108330, 50.629978 ], [ 24.132771, 50.544430 ], [ 23.991659, 50.407200 ], [ 23.707769, 50.380539 ], [ 23.630831, 50.308880 ], [ 23.283331, 50.081379 ], [ 22.974710, 49.834980 ], [ 22.680830, 49.572491 ], [ 22.656099, 49.519711 ], [ 22.759991, 49.281929 ], [ 22.725550, 49.219978 ], [ 22.700270, 49.165531 ], [ 22.821659, 49.116100 ], [ 22.882610, 49.006351 ], [ 22.828329, 49.025822 ], [ 22.674160, 49.044151 ], [ 22.598049, 49.091091 ], [ 22.558001, 49.079418 ], [ 22.474991, 49.090820 ], [ 22.030270, 49.214989 ], [ 21.980270, 49.311649 ], [ 21.612770, 49.436932 ], [ 21.513050, 49.416370 ], [ 21.278879, 49.456650 ], [ 21.197491, 49.403870 ], [ 21.125830, 49.431660 ], [ 21.049440, 49.405258 ], [ 21.097500, 49.366379 ], [ 20.910830, 49.296101 ], [ 20.695000, 49.417488 ], [ 20.567221, 49.377762 ], [ 20.440830, 49.409149 ], [ 20.181660, 49.324429 ], [ 20.099440, 49.228031 ], [ 20.068880, 49.176380 ], [ 20.002600, 49.213772 ], [ 19.936380, 49.231091 ], [ 19.794439, 49.196369 ], [ 19.766109, 49.213039 ], [ 19.808889, 49.319710 ], [ 19.791660, 49.404430 ], [ 19.641109, 49.401920 ], [ 19.651939, 49.450539 ], [ 19.585270, 49.453602 ], [ 19.475550, 49.605259 ], [ 19.390270, 49.569710 ], [ 19.338610, 49.529430 ], [ 19.276390, 49.530540 ], [ 19.196939, 49.433868 ], [ 19.138889, 49.402210 ], [ 18.980551, 49.396099 ], [ 18.979441, 49.499989 ], [ 18.854160, 49.514709 ], [ 18.853331, 49.517780 ], [ 18.811661, 49.672211 ], [ 18.632771, 49.722481 ], [ 18.546671, 49.913311 ], [ 18.447220, 49.919708 ], [ 18.160271, 49.992760 ], [ 18.091110, 50.029709 ], [ 18.047220, 50.058590 ], [ 18.007219, 50.010540 ], [ 17.887779, 49.976650 ], [ 17.798889, 50.013599 ], [ 17.750000, 50.102211 ], [ 17.625549, 50.135262 ], [ 17.597771, 50.158321 ], [ 17.762489, 50.205540 ], [ 17.733330, 50.312481 ], [ 17.696100, 50.321930 ], [ 17.665550, 50.274700 ], [ 17.352779, 50.276371 ], [ 17.353889, 50.322491 ], [ 17.246941, 50.336651 ], [ 17.004169, 50.424160 ], [ 16.890270, 50.439419 ], [ 16.867500, 50.410542 ], [ 17.028049, 50.234711 ], [ 16.821381, 50.186932 ], [ 16.725269, 50.099709 ], [ 16.590549, 50.138321 ], [ 16.458611, 50.303600 ], [ 16.210550, 50.419708 ], [ 16.310829, 50.504162 ], [ 16.396660, 50.518879 ], [ 16.449160, 50.575821 ], [ 16.347771, 50.657761 ], [ 16.237499, 50.670540 ], [ 16.221380, 50.636650 ], [ 16.062500, 50.619148 ], [ 16.009720, 50.602489 ], [ 15.997220, 50.679710 ], [ 15.920830, 50.683319 ], [ 15.870550, 50.669979 ], [ 15.818330, 50.747761 ], [ 15.493050, 50.785820 ], [ 15.310560, 50.858318 ], [ 15.270830, 50.921371 ], [ 15.277500, 50.969978 ], [ 15.172780, 51.018879 ], [ 15.051110, 51.008320 ], [ 14.990830, 51.006939 ], [ 15.019170, 50.953602 ], [ 15.005280, 50.867199 ], [ 14.828850, 50.866032 ], [ 14.975280, 51.106380 ], [ 15.038050, 51.268040 ], [ 14.910830, 51.483040 ], [ 14.717500, 51.552761 ], [ 14.757500, 51.659420 ], [ 14.601940, 51.813599 ], [ 14.616110, 51.853870 ], [ 14.716390, 51.941090 ], [ 14.747220, 52.056370 ], [ 14.763530, 52.070808 ], [ 14.693050, 52.104710 ], [ 14.713330, 52.239151 ], [ 14.566940, 52.328041 ], [ 14.534440, 52.394711 ], [ 14.641110, 52.566662 ], [ 14.551110, 52.628590 ], [ 14.257500, 52.790539 ], [ 14.133330, 52.833321 ], [ 14.164720, 52.968868 ], [ 14.342220, 53.044991 ], [ 14.390830, 53.141651 ], [ 14.408610, 53.215820 ], [ 14.445300, 53.272591 ], [ 14.375550, 53.423038 ], [ 14.286390, 53.669151 ], [ 14.277820, 53.693920 ], [ 14.500830, 53.668049 ], [ 14.595550, 53.592491 ], [ 14.611670, 53.650829 ], [ 14.544440, 53.710541 ], [ 14.619440, 53.764431 ], [ 14.629170, 53.848881 ], [ 14.587780, 53.803322 ], [ 14.558330, 53.857208 ], [ 14.424720, 53.867489 ], [ 14.431110, 53.899712 ], [ 14.362500, 53.876099 ], [ 14.416390, 53.859440 ], [ 14.388890, 53.832760 ], [ 14.217420, 53.868660 ], [ 14.203330, 53.909420 ], [ 14.225980, 53.928249 ], [ 14.408610, 53.917488 ], [ 14.559440, 53.976650 ], [ 14.953890, 54.063320 ], [ 15.341110, 54.154430 ], [ 15.764170, 54.217209 ], [ 16.113050, 54.268879 ], [ 16.092220, 54.251930 ], [ 16.173330, 54.271648 ], [ 16.235001, 54.318050 ], [ 16.332781, 54.349430 ], [ 16.329720, 54.398319 ], [ 16.506390, 54.529148 ], [ 16.923050, 54.599991 ], [ 17.075279, 54.676102 ], [ 17.434170, 54.752769 ], [ 17.859720, 54.816380 ], [ 18.334999, 54.836651 ], [ 18.458050, 54.788052 ], [ 18.811939, 54.639992 ], [ 18.703070, 54.677292 ], [ 18.433050, 54.786381 ], [ 18.406111, 54.734440 ], [ 18.483610, 54.628880 ], [ 18.520830, 54.641930 ], [ 18.585279, 54.433319 ], [ 18.721939, 54.376381 ], [ 19.004021, 54.342628 ], [ 19.439211, 54.395809 ], [ 19.624470, 54.461491 ], [ 19.636511, 54.471069 ], [ 19.665630, 54.466911 ] ] ] ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Portugal', 'density': '115.5', 'population': '10627250' }, 'geometry': { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'Polygon', 'coordinates': [ [ [ -25.385000, 37.712212 ], [ -25.726950, 37.753319 ], [ -25.865000, 37.850552 ], [ -25.842501, 37.902210 ], [ -25.728889, 37.895260 ], [ -25.680840, 37.841648 ], [ -25.577499, 37.827209 ], [ -25.323330, 37.863880 ], [ -25.142220, 37.842770 ], [ -25.131950, 37.805271 ], [ -25.160561, 37.746380 ], [ -25.385000, 37.712212 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -28.056391, 38.394161 ], [ -28.419451, 38.410549 ], [ -28.526390, 38.445820 ], [ -28.549450, 38.527210 ], [ -28.494720, 38.554710 ], [ -28.379999, 38.549160 ], [ -28.037220, 38.418598 ], [ -28.056391, 38.394161 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -27.087219, 38.631378 ], [ -27.307220, 38.658039 ], [ -27.379999, 38.722759 ], [ -27.363890, 38.787769 ], [ -27.277229, 38.803051 ], [ -27.065830, 38.764149 ], [ -27.021111, 38.691101 ], [ -27.087219, 38.631378 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -16.943890, 32.637489 ], [ -17.206671, 32.737492 ], [ -17.254999, 32.814159 ], [ -17.184450, 32.871929 ], [ -17.102779, 32.823318 ], [ -16.996950, 32.822491 ], [ -16.899719, 32.836929 ], [ -16.846670, 32.791931 ], [ -16.674170, 32.758888 ], [ -16.821671, 32.644428 ], [ -16.943890, 32.637489 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -8.812395, 41.904530 ], [ -8.621111, 42.053600 ], [ -8.201389, 42.152210 ], [ -8.185833, 42.064701 ], [ -8.090000, 42.068878 ], [ -8.082777, 42.025261 ], [ -8.218889, 41.913601 ], [ -8.140835, 41.809151 ], [ -7.981944, 41.866379 ], [ -7.912222, 41.889709 ], [ -7.886111, 41.923321 ], [ -7.880000, 41.852772 ], [ -7.706111, 41.904430 ], [ -7.591667, 41.879711 ], [ -7.611944, 41.834980 ], [ -7.524445, 41.840542 ], [ -7.456944, 41.864429 ], [ -7.427222, 41.812481 ], [ -7.200556, 41.883598 ], [ -7.152223, 41.988590 ], [ -6.837778, 41.947201 ], [ -6.809444, 41.990261 ], [ -6.628056, 41.941090 ], [ -6.581667, 41.967480 ], [ -6.545000, 41.937199 ], [ -6.568611, 41.887211 ], [ -6.508612, 41.873871 ], [ -6.562778, 41.745258 ], [ -6.539444, 41.679428 ], [ -6.497778, 41.657490 ], [ -6.355833, 41.677761 ], [ -6.194444, 41.593040 ], [ -6.217778, 41.529430 ], [ -6.329445, 41.415260 ], [ -6.318611, 41.387211 ], [ -6.433888, 41.322491 ], [ -6.598333, 41.244148 ], [ -6.681389, 41.215542 ], [ -6.808611, 41.040539 ], [ -6.924444, 41.031368 ], [ -6.891667, 40.974701 ], [ -6.799722, 40.856091 ], [ -6.829445, 40.755260 ], [ -6.797778, 40.657761 ], [ -6.839167, 40.574989 ], [ -6.791111, 40.518040 ], [ -6.848333, 40.443310 ], [ -6.787500, 40.341648 ], [ -6.960834, 40.240261 ], [ -7.006111, 40.230808 ], [ -7.014445, 40.146648 ], [ -6.863889, 40.015541 ], [ -7.017222, 39.674992 ], [ -7.407778, 39.648319 ], [ -7.533333, 39.668880 ], [ -7.442499, 39.551090 ], [ -7.293612, 39.467758 ], [ -7.313611, 39.344700 ], [ -7.235000, 39.276371 ], [ -7.243055, 39.213039 ], [ -7.140000, 39.173321 ], [ -7.154167, 39.122761 ], [ -7.115833, 39.104160 ], [ -7.040556, 39.122761 ], [ -6.961111, 39.056648 ], [ -6.953889, 39.026932 ], [ -7.155833, 38.790272 ], [ -7.265556, 38.708321 ], [ -7.292252, 38.570660 ], [ -7.301111, 38.524990 ], [ -7.329722, 38.447201 ], [ -7.307071, 38.425598 ], [ -7.144167, 38.270260 ], [ -7.087778, 38.174431 ], [ -6.948055, 38.218319 ], [ -6.944166, 38.162762 ], [ -7.006945, 38.028042 ], [ -7.146111, 38.005260 ], [ -7.254723, 37.987492 ], [ -7.297500, 37.848042 ], [ -7.514167, 37.573318 ], [ -7.418165, 37.173370 ], [ -7.450834, 37.179150 ], [ -7.672501, 37.083599 ], [ -7.792237, 37.038898 ], [ -7.973056, 37.008320 ], [ -8.240835, 37.085819 ], [ -8.511112, 37.103039 ], [ -8.623890, 37.123878 ], [ -8.950279, 36.995541 ], [ -8.963335, 37.083050 ], [ -8.903612, 37.166660 ], [ -8.847778, 37.350552 ], [ -8.787224, 37.524151 ], [ -8.792778, 37.701649 ], [ -8.797501, 37.912769 ], [ -8.882502, 37.956379 ], [ -8.775278, 38.212212 ], [ -8.811390, 38.389992 ], [ -8.817780, 38.442760 ], [ -8.733057, 38.446098 ], [ -8.746946, 38.548599 ], [ -8.772779, 38.476940 ], [ -8.955002, 38.482491 ], [ -9.200556, 38.409710 ], [ -9.220278, 38.415539 ], [ -9.179445, 38.506649 ], [ -9.218889, 38.617210 ], [ -9.278891, 38.668598 ], [ -9.123335, 38.657768 ], [ -9.005001, 38.658600 ], [ -8.967224, 38.698879 ], [ -9.045279, 38.690819 ], [ -9.051111, 38.714161 ], [ -8.919445, 38.765270 ], [ -8.991667, 38.928600 ], [ -9.076668, 38.835541 ], [ -9.113890, 38.717491 ], [ -9.322224, 38.676659 ], [ -9.474167, 38.703041 ], [ -9.495001, 38.785259 ], [ -9.414446, 38.944149 ], [ -9.397501, 39.122761 ], [ -9.337223, 39.234440 ], [ -9.361946, 39.348320 ], [ -9.341667, 39.378040 ], [ -9.184446, 39.406940 ], [ -9.230001, 39.440269 ], [ -9.074722, 39.644989 ], [ -8.859167, 40.149712 ], [ -8.909723, 40.189991 ], [ -8.753056, 40.639431 ], [ -8.735834, 40.652210 ], [ -8.730556, 40.712490 ], [ -8.646112, 40.997211 ], [ -8.698891, 41.181931 ], [ -8.793335, 41.416370 ], [ -8.799723, 41.566662 ], [ -8.837778, 41.687481 ], [ -8.879168, 41.828880 ], [ -8.812395, 41.904530 ] ] ] } ] } ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Romania', 'density': '93.4', 'population': '21498616' }, 'geometry': { 'type': 'MultiPolygon', 'coordinates': [ [ [ [ 26.316380, 48.186371 ], [ 26.635000, 48.240871 ], [ 26.707769, 48.253319 ], [ 26.894440, 48.204700 ], [ 27.000549, 48.155540 ], [ 27.164440, 47.967758 ], [ 27.238331, 47.785259 ], [ 27.289440, 47.723591 ], [ 27.321939, 47.641651 ], [ 27.466379, 47.523869 ], [ 27.469709, 47.488590 ], [ 27.579439, 47.454700 ], [ 27.572220, 47.371090 ], [ 27.806940, 47.163601 ], [ 27.992491, 47.028591 ], [ 28.071110, 46.991100 ], [ 28.213881, 46.684429 ], [ 28.247210, 46.608318 ], [ 28.209431, 46.502491 ], [ 28.251940, 46.439419 ], [ 28.135550, 46.169151 ], [ 28.084440, 46.011662 ], [ 28.129721, 45.867489 ], [ 28.107491, 45.835819 ], [ 28.161381, 45.639431 ], [ 28.061939, 45.589981 ], [ 28.165001, 45.533600 ], [ 28.212019, 45.448200 ], [ 28.276100, 45.433319 ], [ 28.316660, 45.337490 ], [ 28.558611, 45.246090 ], [ 28.748600, 45.224979 ], [ 28.799721, 45.237759 ], [ 28.756941, 45.265541 ], [ 28.784439, 45.320820 ], [ 29.004440, 45.321098 ], [ 29.314159, 45.437759 ], [ 29.561939, 45.395260 ], [ 29.636940, 45.350269 ], [ 29.670830, 45.287491 ], [ 29.661770, 45.210239 ], [ 29.623890, 45.213039 ], [ 29.649990, 45.163319 ], [ 29.701111, 45.158871 ], [ 29.660271, 45.112770 ], [ 29.610830, 44.848320 ], [ 29.141939, 44.777760 ], [ 28.996380, 44.689991 ], [ 28.977489, 44.745819 ], [ 29.133610, 44.791100 ], [ 29.141939, 44.829708 ], [ 29.099720, 44.835270 ], [ 29.049999, 44.845539 ], [ 29.040831, 44.924431 ], [ 29.109720, 44.971661 ], [ 29.041660, 45.003601 ], [ 28.902220, 44.966930 ], [ 28.862499, 44.915821 ], [ 28.949711, 44.824711 ], [ 28.939720, 44.797211 ], [ 28.798330, 44.719440 ], [ 28.779720, 44.669430 ], [ 28.792770, 44.639992 ], [ 28.851660, 44.648602 ], [ 28.904160, 44.709991 ], [ 28.993891, 44.676929 ], [ 28.946939, 44.627769 ], [ 28.834040, 44.623772 ], [ 28.737780, 44.572769 ], [ 28.749720, 44.464161 ], [ 28.834160, 44.484989 ], [ 28.645269, 44.331379 ], [ 28.631100, 44.253880 ], [ 28.668880, 44.166100 ], [ 28.637489, 44.164711 ], [ 28.643049, 43.935261 ], [ 28.583839, 43.747761 ], [ 28.224991, 43.773041 ], [ 27.997210, 43.859150 ], [ 27.951660, 43.978870 ], [ 27.918880, 44.005550 ], [ 27.820271, 43.965820 ], [ 27.721661, 43.964710 ], [ 27.656099, 44.042488 ], [ 27.399990, 44.021931 ], [ 27.290550, 44.088039 ], [ 27.275551, 44.133041 ], [ 26.923321, 44.136650 ], [ 26.478600, 44.049431 ], [ 26.111660, 43.968319 ], [ 25.862770, 43.766380 ], [ 25.572929, 43.648281 ], [ 25.363050, 43.624699 ], [ 25.224710, 43.687481 ], [ 25.080549, 43.691090 ], [ 25.001381, 43.723591 ], [ 24.501659, 43.761379 ], [ 24.337219, 43.694431 ], [ 23.890551, 43.756378 ], [ 23.413050, 43.855820 ], [ 23.063610, 43.802212 ], [ 22.857491, 43.853321 ], [ 22.843330, 43.904980 ], [ 22.906940, 43.998871 ], [ 22.995819, 44.014149 ], [ 23.042770, 44.056648 ], [ 23.037220, 44.084431 ], [ 22.882771, 44.128868 ], [ 22.691931, 44.243061 ], [ 22.536940, 44.336369 ], [ 22.459990, 44.482201 ], [ 22.609440, 44.552212 ], [ 22.699440, 44.522480 ], [ 22.763611, 44.547489 ], [ 22.753599, 44.569149 ], [ 22.436380, 44.714432 ], [ 22.313610, 44.664150 ], [ 22.206659, 44.524990 ], [ 22.146379, 44.479149 ], [ 22.084440, 44.503040 ], [ 21.988880, 44.636929 ], [ 21.622770, 44.672211 ], [ 21.600269, 44.753601 ], [ 21.565550, 44.771648 ], [ 21.400270, 44.780819 ], [ 21.360979, 44.822609 ], [ 21.366100, 44.864429 ], [ 21.552771, 44.890820 ], [ 21.551390, 44.928040 ], [ 21.377399, 44.994968 ], [ 21.512770, 45.123310 ], [ 21.485270, 45.180820 ], [ 21.094990, 45.308319 ], [ 20.986660, 45.345821 ], [ 20.783051, 45.484711 ], [ 20.823879, 45.537209 ], [ 20.767220, 45.605820 ], [ 20.804720, 45.744148 ], [ 20.795830, 45.769150 ], [ 20.721661, 45.740540 ], [ 20.591660, 45.894150 ], [ 20.378050, 45.978031 ], [ 20.261141, 46.115330 ], [ 20.335550, 46.158039 ], [ 20.721661, 46.184429 ], [ 20.763050, 46.199150 ], [ 20.753330, 46.238880 ], [ 20.829720, 46.277210 ], [ 21.053610, 46.238880 ], [ 21.187220, 46.329990 ], [ 21.197210, 46.391369 ], [ 21.287500, 46.414429 ], [ 21.296101, 46.447479 ], [ 21.261660, 46.486931 ], [ 21.326660, 46.619980 ], [ 21.438320, 46.648602 ], [ 21.609159, 46.894989 ], [ 21.695820, 47.000820 ], [ 21.651661, 47.025539 ], [ 21.868879, 47.262211 ], [ 21.922501, 47.354431 ], [ 22.004709, 47.374981 ], [ 22.010281, 47.508598 ], [ 22.318880, 47.745819 ], [ 22.421379, 47.743870 ], [ 22.441660, 47.791100 ], [ 22.612209, 47.768589 ], [ 22.774441, 47.836369 ], [ 22.770830, 47.879429 ], [ 22.894859, 47.953300 ], [ 22.937220, 47.964989 ], [ 22.934160, 48.008881 ], [ 23.034161, 47.989979 ], [ 23.091101, 48.015820 ], [ 23.123880, 48.088322 ], [ 23.174160, 48.108601 ], [ 23.480551, 47.977482 ], [ 23.544991, 48.008430 ], [ 23.641380, 47.992760 ], [ 23.874161, 47.928600 ], [ 23.975550, 47.960541 ], [ 24.131109, 47.910809 ], [ 24.168591, 47.923340 ], [ 24.238050, 47.903309 ], [ 24.531111, 47.952770 ], [ 24.660271, 47.906368 ], [ 24.676100, 47.860271 ], [ 24.816389, 47.813042 ], [ 24.897490, 47.716091 ], [ 25.029720, 47.728870 ], [ 25.123880, 47.763882 ], [ 25.230270, 47.881371 ], [ 25.468330, 47.929710 ], [ 26.011101, 47.979420 ], [ 26.159161, 47.984989 ], [ 26.272221, 48.076099 ], [ 26.316380, 48.186371 ] ] ] ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Slovenia', 'density': '101.3', 'population': '2032362' }, 'geometry': { 'type': 'MultiPolygon', 'coordinates': [ [ [ [ 16.026939, 46.661369 ], [ 15.993330, 46.737209 ], [ 15.993610, 46.834709 ], [ 16.106701, 46.851391 ], [ 16.281670, 46.872478 ], [ 16.350550, 46.841091 ], [ 16.318331, 46.779709 ], [ 16.426661, 46.687759 ], [ 16.391661, 46.636379 ], [ 16.609236, 46.475174 ], [ 16.577200, 46.469398 ], [ 16.397800, 46.540798 ], [ 16.300703, 46.531738 ], [ 16.251400, 46.498299 ], [ 16.268900, 46.411900 ], [ 16.303900, 46.385799 ], [ 16.293900, 46.374401 ], [ 16.263100, 46.388901 ], [ 16.192499, 46.384701 ], [ 16.144699, 46.406101 ], [ 16.078300, 46.379700 ], [ 16.081100, 46.331100 ], [ 16.017200, 46.298100 ], [ 15.821700, 46.258301 ], [ 15.781100, 46.212502 ], [ 15.676700, 46.226700 ], [ 15.651900, 46.216702 ], [ 15.599700, 46.142502 ], [ 15.629400, 46.086899 ], [ 15.718300, 46.047199 ], [ 15.700000, 46.020000 ], [ 15.723600, 45.934700 ], [ 15.690600, 45.902802 ], [ 15.679400, 45.861900 ], [ 15.697800, 45.844200 ], [ 15.656700, 45.823299 ], [ 15.609400, 45.848598 ], [ 15.538300, 45.826401 ], [ 15.499400, 45.835800 ], [ 15.482200, 45.802200 ], [ 15.444700, 45.815800 ], [ 15.322500, 45.761398 ], [ 15.291900, 45.731098 ], [ 15.283300, 45.694698 ], [ 15.302800, 45.690800 ], [ 15.308600, 45.719398 ], [ 15.335800, 45.697498 ], [ 15.358600, 45.714401 ], [ 15.368100, 45.702801 ], [ 15.347200, 45.674999 ], [ 15.391900, 45.646702 ], [ 15.348100, 45.649200 ], [ 15.283100, 45.608101 ], [ 15.303900, 45.537800 ], [ 15.336100, 45.510300 ], [ 15.323300, 45.482201 ], [ 15.335300, 45.456402 ], [ 15.272200, 45.461700 ], [ 15.224200, 45.431099 ], [ 15.188100, 45.439400 ], [ 15.168600, 45.425598 ], [ 15.084700, 45.486099 ], [ 15.021100, 45.489399 ], [ 14.929200, 45.524399 ], [ 14.907200, 45.476398 ], [ 14.817800, 45.465801 ], [ 14.797200, 45.501400 ], [ 14.703100, 45.532799 ], [ 14.686900, 45.536701 ], [ 14.685300, 45.574200 ], [ 14.613600, 45.619999 ], [ 14.601400, 45.675301 ], [ 14.565000, 45.665001 ], [ 14.554400, 45.631100 ], [ 14.509700, 45.598099 ], [ 14.485800, 45.529701 ], [ 14.392800, 45.486099 ], [ 14.320600, 45.484200 ], [ 14.238300, 45.505600 ], [ 14.131400, 45.474400 ], [ 13.989400, 45.522202 ], [ 13.978300, 45.507801 ], [ 13.997200, 45.480000 ], [ 13.986700, 45.459999 ], [ 13.906900, 45.453300 ], [ 13.858600, 45.478100 ], [ 13.691400, 45.444401 ], [ 13.615300, 45.464401 ], [ 13.569667, 45.507072 ], [ 13.749440, 45.546940 ], [ 13.717510, 45.597660 ], [ 13.859440, 45.587490 ], [ 13.919160, 45.637489 ], [ 13.821940, 45.726929 ], [ 13.598050, 45.810810 ], [ 13.577780, 45.854160 ], [ 13.623610, 45.922211 ], [ 13.635000, 45.988590 ], [ 13.590000, 45.993320 ], [ 13.542500, 45.967480 ], [ 13.479440, 46.013321 ], [ 13.645830, 46.142490 ], [ 13.664440, 46.183041 ], [ 13.550550, 46.218040 ], [ 13.443330, 46.230259 ], [ 13.383050, 46.297211 ], [ 13.481110, 46.369431 ], [ 13.692220, 46.450260 ], [ 13.718960, 46.525539 ], [ 14.084720, 46.488590 ], [ 14.159440, 46.440819 ], [ 14.428330, 46.446369 ], [ 14.574440, 46.387489 ], [ 14.594160, 46.437481 ], [ 14.814720, 46.512760 ], [ 14.870550, 46.615822 ], [ 15.105270, 46.657200 ], [ 15.500830, 46.618038 ], [ 15.649440, 46.709709 ], [ 16.026939, 46.661369 ] ] ] ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Slovakia', 'density': '110.5', 'population': '5412254' }, 'geometry': { 'type': 'MultiPolygon', 'coordinates': [ [ [ [ 16.944860, 48.616501 ], [ 16.952801, 48.628101 ], [ 16.970301, 48.634399 ], [ 16.975800, 48.639999 ], [ 16.988100, 48.681400 ], [ 16.993601, 48.687801 ], [ 17.003599, 48.694698 ], [ 17.005600, 48.698101 ], [ 17.003099, 48.708900 ], [ 17.004700, 48.716702 ], [ 17.010599, 48.721901 ], [ 17.026699, 48.750000 ], [ 17.034700, 48.758099 ], [ 17.038300, 48.764999 ], [ 17.043900, 48.771099 ], [ 17.055300, 48.776901 ], [ 17.068600, 48.786400 ], [ 17.092199, 48.792801 ], [ 17.100000, 48.803101 ], [ 17.108101, 48.826900 ], [ 17.113899, 48.833099 ], [ 17.126400, 48.837799 ], [ 17.146099, 48.842201 ], [ 17.162800, 48.849201 ], [ 17.188900, 48.869202 ], [ 17.205601, 48.869701 ], [ 17.230301, 48.873100 ], [ 17.252800, 48.870800 ], [ 17.306900, 48.852501 ], [ 17.343599, 48.848099 ], [ 17.376400, 48.827499 ], [ 17.390301, 48.822800 ], [ 17.403900, 48.822800 ], [ 17.418600, 48.826698 ], [ 17.433300, 48.833599 ], [ 17.445299, 48.843601 ], [ 17.459200, 48.851898 ], [ 17.476700, 48.852501 ], [ 17.493299, 48.846100 ], [ 17.509199, 48.832802 ], [ 17.522499, 48.817501 ], [ 17.529400, 48.815300 ], [ 17.549999, 48.817799 ], [ 17.573299, 48.829700 ], [ 17.597200, 48.833900 ], [ 17.606701, 48.840801 ], [ 17.633101, 48.846401 ], [ 17.645599, 48.851898 ], [ 17.673599, 48.851101 ], [ 17.686100, 48.856701 ], [ 17.694201, 48.857800 ], [ 17.712200, 48.856098 ], [ 17.736099, 48.871399 ], [ 17.754700, 48.875801 ], [ 17.763100, 48.879700 ], [ 17.767500, 48.884201 ], [ 17.775801, 48.900600 ], [ 17.782200, 48.906700 ], [ 17.793301, 48.913300 ], [ 17.801100, 48.922798 ], [ 17.806400, 48.926399 ], [ 17.813601, 48.927799 ], [ 17.850800, 48.928101 ], [ 17.884199, 48.924400 ], [ 17.890301, 48.926899 ], [ 17.896400, 48.934399 ], [ 17.897499, 48.947498 ], [ 17.900000, 48.952801 ], [ 17.910601, 48.963600 ], [ 17.912201, 48.969700 ], [ 17.911100, 48.985001 ], [ 17.928301, 49.016899 ], [ 17.940001, 49.022800 ], [ 17.967501, 49.027500 ], [ 17.990000, 49.028900 ], [ 18.017500, 49.024700 ], [ 18.030300, 49.025600 ], [ 18.065300, 49.035801 ], [ 18.075300, 49.041901 ], [ 18.099701, 49.069401 ], [ 18.121901, 49.082802 ], [ 18.130301, 49.102798 ], [ 18.147800, 49.115601 ], [ 18.151400, 49.124401 ], [ 18.150801, 49.130001 ], [ 18.145000, 49.139702 ], [ 18.145300, 49.145000 ], [ 18.158899, 49.165298 ], [ 18.166401, 49.196400 ], [ 18.174200, 49.210300 ], [ 18.184999, 49.221100 ], [ 18.188101, 49.226398 ], [ 18.188101, 49.229401 ], [ 18.184999, 49.234200 ], [ 18.174700, 49.241699 ], [ 18.208099, 49.284199 ], [ 18.212799, 49.288101 ], [ 18.219700, 49.290001 ], [ 18.252199, 49.294399 ], [ 18.281401, 49.301899 ], [ 18.307199, 49.303902 ], [ 18.317801, 49.307499 ], [ 18.333300, 49.317799 ], [ 18.350800, 49.323101 ], [ 18.366100, 49.325600 ], [ 18.379400, 49.330299 ], [ 18.386900, 49.335800 ], [ 18.408300, 49.361099 ], [ 18.420300, 49.371101 ], [ 18.420300, 49.374199 ], [ 18.417200, 49.378300 ], [ 18.406401, 49.389198 ], [ 18.404699, 49.394199 ], [ 18.405800, 49.396900 ], [ 18.414400, 49.396099 ], [ 18.428101, 49.390800 ], [ 18.436899, 49.390598 ], [ 18.443600, 49.392799 ], [ 18.469200, 49.407200 ], [ 18.475599, 49.413101 ], [ 18.482500, 49.423100 ], [ 18.496401, 49.434700 ], [ 18.517200, 49.444199 ], [ 18.535299, 49.450298 ], [ 18.546101, 49.457500 ], [ 18.548300, 49.463600 ], [ 18.548300, 49.481701 ], [ 18.551399, 49.486900 ], [ 18.562201, 49.493900 ], [ 18.581100, 49.497799 ], [ 18.586399, 49.497501 ], [ 18.605301, 49.491699 ], [ 18.623100, 49.492199 ], [ 18.630301, 49.494202 ], [ 18.648100, 49.503300 ], [ 18.655600, 49.504200 ], [ 18.681700, 49.495800 ], [ 18.705000, 49.496700 ], [ 18.730600, 49.485298 ], [ 18.744699, 49.483101 ], [ 18.763100, 49.491402 ], [ 18.779400, 49.505001 ], [ 18.798599, 49.516102 ], [ 18.814400, 49.518902 ], [ 18.844700, 49.515800 ], [ 18.853331, 49.517780 ], [ 18.854160, 49.514709 ], [ 18.979441, 49.499989 ], [ 18.980551, 49.396099 ], [ 19.138889, 49.402210 ], [ 19.196939, 49.433868 ], [ 19.276390, 49.530540 ], [ 19.338610, 49.529430 ], [ 19.390270, 49.569710 ], [ 19.475550, 49.605259 ], [ 19.585270, 49.453602 ], [ 19.651939, 49.450539 ], [ 19.641109, 49.401920 ], [ 19.791660, 49.404430 ], [ 19.808889, 49.319710 ], [ 19.766109, 49.213039 ], [ 19.794439, 49.196369 ], [ 19.936380, 49.231091 ], [ 20.002600, 49.213772 ], [ 20.068880, 49.176380 ], [ 20.099440, 49.228031 ], [ 20.181660, 49.324429 ], [ 20.440830, 49.409149 ], [ 20.567221, 49.377762 ], [ 20.695000, 49.417488 ], [ 20.910830, 49.296101 ], [ 21.097500, 49.366379 ], [ 21.049440, 49.405258 ], [ 21.125830, 49.431660 ], [ 21.197491, 49.403870 ], [ 21.278879, 49.456650 ], [ 21.513050, 49.416370 ], [ 21.612770, 49.436932 ], [ 21.980270, 49.311649 ], [ 22.030270, 49.214989 ], [ 22.474991, 49.090820 ], [ 22.558001, 49.079418 ], [ 22.547489, 49.032200 ], [ 22.465269, 48.975540 ], [ 22.326389, 48.683868 ], [ 22.157221, 48.576649 ], [ 22.151449, 48.412060 ], [ 22.101660, 48.377201 ], [ 21.862770, 48.365540 ], [ 21.738041, 48.350819 ], [ 21.628050, 48.449421 ], [ 21.614161, 48.498322 ], [ 21.442770, 48.575260 ], [ 21.125549, 48.492489 ], [ 20.824711, 48.575821 ], [ 20.509991, 48.537769 ], [ 20.364719, 48.305820 ], [ 20.291941, 48.254711 ], [ 20.150270, 48.260269 ], [ 20.065550, 48.180271 ], [ 19.918600, 48.129978 ], [ 19.662210, 48.231930 ], [ 19.535000, 48.212200 ], [ 19.476379, 48.089149 ], [ 19.001249, 48.068779 ], [ 18.827499, 48.035820 ], [ 18.808331, 47.993870 ], [ 18.770281, 47.956089 ], [ 18.766939, 47.877762 ], [ 18.849409, 47.818439 ], [ 18.812500, 47.816662 ], [ 18.337500, 47.740822 ], [ 17.784161, 47.746929 ], [ 17.603331, 47.828041 ], [ 17.251659, 48.024990 ], [ 17.179899, 48.001820 ], [ 17.080830, 48.079990 ], [ 17.068100, 48.144150 ], [ 16.976681, 48.174179 ], [ 16.949720, 48.278042 ], [ 16.840830, 48.368591 ], [ 16.856110, 48.419151 ], [ 16.896391, 48.487209 ], [ 16.944860, 48.616501 ] ] ] ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Finland', 'density': '17.6', 'population': '5326314' }, 'geometry': { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'Polygon', 'coordinates': [ [ [ 19.761391, 60.072208 ], [ 19.648331, 60.256649 ], [ 19.685280, 60.263882 ], [ 19.786381, 60.299709 ], [ 19.792500, 60.191380 ], [ 19.821110, 60.193878 ], [ 19.935280, 60.282768 ], [ 19.898609, 60.339710 ], [ 19.850830, 60.312481 ], [ 19.780001, 60.349152 ], [ 19.905830, 60.399990 ], [ 19.927500, 60.349991 ], [ 20.141390, 60.330540 ], [ 20.277500, 60.274151 ], [ 20.171671, 60.163879 ], [ 20.085550, 60.174160 ], [ 20.105829, 60.221371 ], [ 20.089161, 60.227772 ], [ 20.055000, 60.188881 ], [ 20.037220, 60.298321 ], [ 20.021111, 60.263321 ], [ 19.972219, 60.268600 ], [ 20.016390, 60.181381 ], [ 19.921671, 60.220539 ], [ 19.945829, 60.180820 ], [ 20.044170, 60.171940 ], [ 20.050831, 60.089710 ], [ 19.957781, 60.089432 ], [ 19.761391, 60.072208 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 22.472771, 59.996929 ], [ 22.424160, 60.108318 ], [ 22.597771, 60.131649 ], [ 22.421671, 60.143879 ], [ 22.443609, 60.213329 ], [ 22.451660, 60.184711 ], [ 22.815550, 60.224991 ], [ 22.953609, 60.287769 ], [ 22.835550, 60.138050 ], [ 22.839161, 60.096371 ], [ 22.736111, 60.003040 ], [ 22.576941, 60.004429 ], [ 22.472771, 59.996929 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 28.015240, 70.069366 ], [ 28.094160, 69.938568 ], [ 28.379721, 69.827469 ], [ 29.098881, 69.708023 ], [ 29.294720, 69.495239 ], [ 29.285549, 69.463593 ], [ 28.826941, 69.238022 ], [ 28.781670, 69.149696 ], [ 28.786940, 69.119133 ], [ 28.964769, 69.051910 ], [ 28.456940, 68.918297 ], [ 28.432220, 68.886368 ], [ 28.737770, 68.875793 ], [ 28.805830, 68.821373 ], [ 28.759159, 68.751923 ], [ 28.458611, 68.534698 ], [ 28.696659, 68.193298 ], [ 29.356939, 68.082474 ], [ 29.691660, 67.815247 ], [ 30.028610, 67.694687 ], [ 29.986380, 67.615250 ], [ 29.977770, 67.572479 ], [ 29.932770, 67.513870 ], [ 29.406111, 67.209137 ], [ 29.134159, 67.013603 ], [ 29.087780, 66.969971 ], [ 29.075001, 66.879959 ], [ 29.159439, 66.799133 ], [ 29.350269, 66.682457 ], [ 29.387131, 66.624847 ], [ 29.548330, 66.495506 ], [ 29.618330, 66.345810 ], [ 29.948330, 66.049698 ], [ 30.134159, 65.719131 ], [ 30.123890, 65.664978 ], [ 30.024441, 65.691071 ], [ 29.728880, 65.642197 ], [ 29.745831, 65.621078 ], [ 29.855270, 65.576080 ], [ 29.845551, 65.554138 ], [ 29.746111, 65.514420 ], [ 29.749439, 65.347748 ], [ 29.598881, 65.259697 ], [ 29.609440, 65.235237 ], [ 29.843050, 65.219971 ], [ 29.858610, 65.175522 ], [ 29.823330, 65.148857 ], [ 29.874439, 65.125793 ], [ 29.637220, 65.068314 ], [ 29.606380, 65.007202 ], [ 29.645000, 64.913857 ], [ 29.794161, 64.797203 ], [ 30.087780, 64.791641 ], [ 30.130280, 64.753036 ], [ 30.131390, 64.721626 ], [ 30.209160, 64.672737 ], [ 30.178881, 64.631638 ], [ 29.980829, 64.585800 ], [ 30.002769, 64.517754 ], [ 30.087219, 64.483032 ], [ 30.051661, 64.405533 ], [ 30.156111, 64.354141 ], [ 30.359440, 64.319702 ], [ 30.560829, 64.244423 ], [ 30.558050, 64.200256 ], [ 30.559441, 64.156082 ], [ 30.614441, 64.086639 ], [ 30.595280, 64.046921 ], [ 30.255831, 63.817760 ], [ 30.004721, 63.752769 ], [ 30.027500, 63.718040 ], [ 30.481661, 63.478588 ], [ 30.904160, 63.357491 ], [ 30.962490, 63.309711 ], [ 31.196110, 63.234150 ], [ 31.250549, 63.191650 ], [ 31.275000, 63.117760 ], [ 31.587299, 62.913830 ], [ 31.430000, 62.758881 ], [ 31.264721, 62.512760 ], [ 30.545830, 62.107491 ], [ 30.152981, 61.857121 ], [ 30.039761, 61.784969 ], [ 29.839720, 61.657490 ], [ 29.734440, 61.565262 ], [ 29.002501, 61.177212 ], [ 28.712219, 61.041660 ], [ 28.638880, 60.966091 ], [ 28.428049, 60.905540 ], [ 27.794769, 60.547562 ], [ 27.774719, 60.573879 ], [ 27.735001, 60.551659 ], [ 27.751659, 60.500542 ], [ 27.648609, 60.488041 ], [ 27.683331, 60.517490 ], [ 27.606670, 60.506100 ], [ 27.626110, 60.466648 ], [ 27.487221, 60.506939 ], [ 27.473049, 60.476379 ], [ 27.446390, 60.461380 ], [ 27.214439, 60.554710 ], [ 27.145830, 60.521648 ], [ 27.040279, 60.541660 ], [ 26.967489, 60.445271 ], [ 26.794720, 60.484150 ], [ 26.699711, 60.413601 ], [ 26.576111, 60.450260 ], [ 26.514441, 60.440269 ], [ 26.480040, 60.474522 ], [ 26.594999, 60.598049 ], [ 26.753889, 60.571659 ], [ 26.695271, 60.640820 ], [ 26.615549, 60.640270 ], [ 26.461941, 60.507488 ], [ 26.482220, 60.436939 ], [ 26.346380, 60.372761 ], [ 26.188330, 60.409988 ], [ 26.061110, 60.423870 ], [ 25.936939, 60.483051 ], [ 25.940830, 60.466648 ], [ 26.046671, 60.415821 ], [ 26.003330, 60.391930 ], [ 26.111660, 60.330269 ], [ 26.083050, 60.294991 ], [ 25.996111, 60.344711 ], [ 25.838051, 60.401100 ], [ 25.915279, 60.355820 ], [ 25.902220, 60.285549 ], [ 25.928610, 60.248600 ], [ 25.887501, 60.241650 ], [ 25.763611, 60.311649 ], [ 25.780279, 60.272209 ], [ 25.783890, 60.238041 ], [ 25.653610, 60.291660 ], [ 25.705000, 60.338871 ], [ 25.672501, 60.362770 ], [ 25.526939, 60.323879 ], [ 25.518890, 60.255550 ], [ 25.378330, 60.239990 ], [ 25.204439, 60.242210 ], [ 25.195271, 60.186378 ], [ 25.031111, 60.144989 ], [ 25.016390, 60.171940 ], [ 25.024441, 60.201382 ], [ 24.982500, 60.200260 ], [ 24.965000, 60.141380 ], [ 24.850830, 60.136662 ], [ 24.857780, 60.154430 ], [ 24.842779, 60.192211 ], [ 24.671391, 60.100552 ], [ 24.553890, 60.154430 ], [ 24.587500, 60.128880 ], [ 24.602501, 60.117489 ], [ 24.482220, 59.991379 ], [ 24.413330, 59.991100 ], [ 24.460550, 60.045269 ], [ 24.323330, 59.992489 ], [ 24.344999, 60.025829 ], [ 24.366659, 60.068050 ], [ 24.161110, 60.043049 ], [ 24.014999, 60.004162 ], [ 24.014999, 60.037491 ], [ 23.701941, 59.954430 ], [ 23.434441, 59.950550 ], [ 23.479441, 60.007210 ], [ 23.546110, 60.067211 ], [ 23.457781, 60.027489 ], [ 23.346939, 59.927761 ], [ 23.213890, 59.884159 ], [ 23.253050, 59.843601 ], [ 22.909719, 59.804989 ], [ 22.934719, 59.840549 ], [ 23.165550, 59.886101 ], [ 23.159161, 59.917210 ], [ 23.257219, 59.919430 ], [ 23.338329, 60.019989 ], [ 23.319441, 60.024990 ], [ 23.224970, 59.924999 ], [ 23.150551, 59.933319 ], [ 23.107780, 59.968319 ], [ 23.224720, 60.003319 ], [ 23.250000, 60.038601 ], [ 23.049440, 60.036098 ], [ 22.972219, 60.091930 ], [ 22.879440, 60.150829 ], [ 23.062220, 60.331928 ], [ 23.055830, 60.353321 ], [ 22.642220, 60.220268 ], [ 22.590269, 60.229988 ], [ 22.447220, 60.244431 ], [ 22.631390, 60.381100 ], [ 22.566940, 60.365551 ], [ 22.476669, 60.400269 ], [ 22.285271, 60.371380 ], [ 22.175831, 60.431381 ], [ 22.031670, 60.442211 ], [ 21.937500, 60.521381 ], [ 21.837500, 60.518318 ], [ 21.874161, 60.472759 ], [ 21.783609, 60.481659 ], [ 21.799999, 60.566929 ], [ 21.844999, 60.587212 ], [ 21.831940, 60.622761 ], [ 21.670280, 60.543320 ], [ 21.628611, 60.488602 ], [ 21.559441, 60.484711 ], [ 21.583330, 60.516102 ], [ 21.410830, 60.582211 ], [ 21.465830, 60.605820 ], [ 21.395281, 60.636929 ], [ 21.355000, 60.683601 ], [ 21.441669, 60.696930 ], [ 21.389441, 60.746101 ], [ 21.319719, 60.863041 ], [ 21.423330, 60.863880 ], [ 21.424160, 60.906101 ], [ 21.296730, 61.057281 ], [ 21.482780, 61.059711 ], [ 21.434719, 61.139149 ], [ 21.559441, 61.203880 ], [ 21.477501, 61.247761 ], [ 21.544439, 61.276371 ], [ 21.527220, 61.374439 ], [ 21.445271, 61.401661 ], [ 21.531670, 61.405270 ], [ 21.559999, 61.427212 ], [ 21.423889, 61.483879 ], [ 21.586660, 61.477211 ], [ 21.585831, 61.492489 ], [ 21.486940, 61.539440 ], [ 21.493330, 61.573879 ], [ 21.716391, 61.520550 ], [ 21.610550, 61.587490 ], [ 21.543051, 61.675270 ], [ 21.493891, 61.734711 ], [ 21.378611, 61.934711 ], [ 21.309170, 61.933319 ], [ 21.248329, 61.999989 ], [ 21.389999, 62.203602 ], [ 21.327770, 62.352211 ], [ 21.277500, 62.336102 ], [ 21.269171, 62.406101 ], [ 21.192221, 62.333321 ], [ 21.187500, 62.391930 ], [ 21.125000, 62.406101 ], [ 21.125271, 62.547489 ], [ 21.206940, 62.590260 ], [ 21.064159, 62.596371 ], [ 21.080549, 62.671940 ], [ 21.125830, 62.684429 ], [ 21.128611, 62.730549 ], [ 21.112499, 62.774429 ], [ 21.184999, 62.784988 ], [ 21.240000, 62.868599 ], [ 21.370831, 62.859150 ], [ 21.462500, 62.949429 ], [ 21.439159, 63.042488 ], [ 21.519720, 63.066101 ], [ 21.620001, 63.018600 ], [ 21.682779, 63.029709 ], [ 21.628050, 63.054989 ], [ 21.495831, 63.187210 ], [ 21.497780, 63.209991 ], [ 21.542770, 63.231930 ], [ 21.647221, 63.191929 ], [ 21.703051, 63.223320 ], [ 21.890829, 63.253319 ], [ 21.881660, 63.175270 ], [ 21.982500, 63.140541 ], [ 21.959160, 63.179150 ], [ 22.045561, 63.240551 ], [ 22.165550, 63.221931 ], [ 22.280001, 63.295269 ], [ 22.318050, 63.269161 ], [ 22.347500, 63.286098 ], [ 22.354441, 63.344990 ], [ 22.198059, 63.421379 ], [ 22.197781, 63.465549 ], [ 22.400829, 63.416370 ], [ 22.264441, 63.500820 ], [ 22.283890, 63.524151 ], [ 22.337780, 63.518318 ], [ 22.408051, 63.452209 ], [ 22.493050, 63.570820 ], [ 22.502781, 63.623878 ], [ 22.592501, 63.663319 ], [ 22.586941, 63.705818 ], [ 22.680550, 63.697769 ], [ 22.740829, 63.617771 ], [ 22.824440, 63.641380 ], [ 22.931391, 63.755821 ], [ 22.909161, 63.772491 ], [ 22.923330, 63.801102 ], [ 23.004169, 63.756939 ], [ 22.991110, 63.808601 ], [ 23.043051, 63.838871 ], [ 23.243891, 63.886379 ], [ 23.416660, 63.921650 ], [ 23.367500, 63.996929 ], [ 23.395830, 64.049973 ], [ 23.610001, 64.024139 ], [ 23.624161, 64.047470 ], [ 23.567499, 64.099136 ], [ 23.637220, 64.116638 ], [ 23.831390, 64.224136 ], [ 23.856390, 64.260529 ], [ 23.945551, 64.246094 ], [ 23.999439, 64.385803 ], [ 24.209160, 64.450813 ], [ 24.560551, 64.768311 ], [ 24.674999, 64.784698 ], [ 24.680830, 64.829147 ], [ 25.112780, 64.909416 ], [ 25.260830, 64.813583 ], [ 25.364161, 64.831917 ], [ 25.360830, 64.906647 ], [ 25.303049, 64.903870 ], [ 25.188330, 64.966087 ], [ 25.218611, 64.989151 ], [ 25.420830, 64.944138 ], [ 25.448601, 64.960533 ], [ 25.408331, 65.038589 ], [ 25.213051, 65.124687 ], [ 25.299721, 65.237473 ], [ 25.318890, 65.314423 ], [ 25.266390, 65.377197 ], [ 25.355270, 65.410812 ], [ 25.342220, 65.484421 ], [ 25.004440, 65.622482 ], [ 24.670561, 65.633324 ], [ 24.554720, 65.732483 ], [ 24.556391, 65.786926 ], [ 24.648050, 65.881638 ], [ 24.517220, 65.791092 ], [ 24.236660, 65.816360 ], [ 24.247219, 65.776093 ], [ 24.214439, 65.774979 ], [ 24.167070, 65.812843 ], [ 24.004999, 66.052750 ], [ 23.719160, 66.204971 ], [ 23.657770, 66.406921 ], [ 23.658890, 66.460533 ], [ 23.887501, 66.569977 ], [ 23.900000, 66.754700 ], [ 24.007771, 66.800522 ], [ 23.935829, 66.884140 ], [ 23.725830, 67.012756 ], [ 23.573891, 67.167740 ], [ 23.611389, 67.207199 ], [ 23.584440, 67.223862 ], [ 23.614441, 67.263313 ], [ 23.741659, 67.284698 ], [ 23.781940, 67.326370 ], [ 23.761940, 67.420242 ], [ 23.549160, 67.453308 ], [ 23.500549, 67.436363 ], [ 23.431110, 67.465530 ], [ 23.438881, 67.498581 ], [ 23.553610, 67.587479 ], [ 23.477221, 67.774979 ], [ 23.492491, 67.875793 ], [ 23.665550, 67.929962 ], [ 23.656940, 67.950813 ], [ 23.542219, 67.978027 ], [ 23.294439, 68.142197 ], [ 23.147770, 68.127457 ], [ 23.159439, 68.178848 ], [ 23.119720, 68.241913 ], [ 22.673889, 68.420807 ], [ 22.050550, 68.479141 ], [ 21.897221, 68.569977 ], [ 21.757500, 68.576920 ], [ 21.668610, 68.630798 ], [ 21.207769, 68.819702 ], [ 20.895281, 68.893593 ], [ 20.891380, 68.926849 ], [ 20.931110, 68.946350 ], [ 20.866659, 69.004967 ], [ 20.586090, 69.063141 ], [ 20.738331, 69.096359 ], [ 21.067499, 69.039139 ], [ 21.113050, 69.108017 ], [ 21.066111, 69.126358 ], [ 21.039721, 69.182457 ], [ 21.055000, 69.228577 ], [ 21.320829, 69.326080 ], [ 21.681940, 69.284698 ], [ 22.348610, 68.842468 ], [ 22.398331, 68.711090 ], [ 23.063881, 68.695511 ], [ 23.204161, 68.628571 ], [ 23.703609, 68.715263 ], [ 23.856380, 68.832474 ], [ 24.044720, 68.823868 ], [ 24.131390, 68.779968 ], [ 24.690269, 68.676361 ], [ 24.797779, 68.640808 ], [ 24.881390, 68.558578 ], [ 24.918329, 68.561897 ], [ 24.935551, 68.593857 ], [ 25.095831, 68.629143 ], [ 25.166660, 68.785797 ], [ 25.384720, 68.880524 ], [ 25.612221, 68.881348 ], [ 25.809160, 69.011368 ], [ 25.708611, 69.206627 ], [ 25.751110, 69.336090 ], [ 25.830549, 69.378304 ], [ 25.853050, 69.546921 ], [ 25.934441, 69.566360 ], [ 25.975830, 69.630249 ], [ 25.942221, 69.667473 ], [ 25.988880, 69.706627 ], [ 26.369720, 69.849983 ], [ 26.460550, 69.931923 ], [ 26.807770, 69.951920 ], [ 27.038610, 69.908310 ], [ 27.292500, 69.950531 ], [ 27.377220, 70.002762 ], [ 27.806660, 70.079422 ], [ 28.015240, 70.069366 ] ] ] } ] } ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Sweden', 'density': '22.7', 'population': '9256347' }, 'geometry': { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'Polygon', 'coordinates': [ [ [ 11.465000, 58.066101 ], [ 11.401110, 58.130260 ], [ 11.576110, 58.225269 ], [ 11.655280, 58.231380 ], [ 11.671640, 58.276211 ], [ 11.736670, 58.281651 ], [ 11.814720, 58.177490 ], [ 11.806390, 58.120541 ], [ 11.465000, 58.066101 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 16.437220, 56.211380 ], [ 16.403330, 56.274151 ], [ 16.393330, 56.529148 ], [ 16.611940, 56.868320 ], [ 16.727779, 56.891930 ], [ 16.973330, 57.305271 ], [ 17.056660, 57.359150 ], [ 17.110279, 57.338039 ], [ 16.858330, 56.891102 ], [ 16.806391, 56.818878 ], [ 16.699169, 56.648602 ], [ 16.506660, 56.258320 ], [ 16.437220, 56.211380 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 18.147779, 56.911930 ], [ 18.202770, 57.015270 ], [ 18.262501, 57.036381 ], [ 18.289440, 57.090820 ], [ 18.217501, 57.057770 ], [ 18.156670, 57.228039 ], [ 18.098890, 57.253040 ], [ 18.101391, 57.282211 ], [ 18.176941, 57.375542 ], [ 18.115280, 57.480820 ], [ 18.111389, 57.519428 ], [ 18.461390, 57.807770 ], [ 18.716110, 57.921101 ], [ 18.771940, 57.886929 ], [ 18.788059, 57.830818 ], [ 18.849159, 57.873051 ], [ 18.840830, 57.908871 ], [ 18.914169, 57.917488 ], [ 18.899719, 57.886929 ], [ 19.003889, 57.898880 ], [ 19.082781, 57.830269 ], [ 18.944160, 57.781651 ], [ 18.899719, 57.713329 ], [ 18.814440, 57.734711 ], [ 18.762220, 57.615261 ], [ 18.808050, 57.600552 ], [ 18.768049, 57.478039 ], [ 18.808889, 57.439159 ], [ 18.896660, 57.441380 ], [ 18.929159, 57.418049 ], [ 18.907499, 57.380550 ], [ 18.788891, 57.370541 ], [ 18.671940, 57.302212 ], [ 18.666380, 57.278881 ], [ 18.714439, 57.246929 ], [ 18.417219, 57.144161 ], [ 18.413059, 57.125820 ], [ 18.335550, 57.023319 ], [ 18.358610, 56.987770 ], [ 18.230551, 56.918049 ], [ 18.147779, 56.911930 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 20.586090, 69.063141 ], [ 20.866659, 69.004967 ], [ 20.931110, 68.946350 ], [ 20.891380, 68.926849 ], [ 20.895281, 68.893593 ], [ 21.207769, 68.819702 ], [ 21.668610, 68.630798 ], [ 21.757500, 68.576920 ], [ 21.897221, 68.569977 ], [ 22.050550, 68.479141 ], [ 22.673889, 68.420807 ], [ 23.119720, 68.241913 ], [ 23.159439, 68.178848 ], [ 23.147770, 68.127457 ], [ 23.294439, 68.142197 ], [ 23.542219, 67.978027 ], [ 23.656940, 67.950813 ], [ 23.665550, 67.929962 ], [ 23.492491, 67.875793 ], [ 23.477221, 67.774979 ], [ 23.553610, 67.587479 ], [ 23.438881, 67.498581 ], [ 23.431110, 67.465530 ], [ 23.500549, 67.436363 ], [ 23.549160, 67.453308 ], [ 23.761940, 67.420242 ], [ 23.781940, 67.326370 ], [ 23.741659, 67.284698 ], [ 23.614441, 67.263313 ], [ 23.584440, 67.223862 ], [ 23.611389, 67.207199 ], [ 23.573891, 67.167740 ], [ 23.725830, 67.012756 ], [ 23.935829, 66.884140 ], [ 24.007771, 66.800522 ], [ 23.900000, 66.754700 ], [ 23.887501, 66.569977 ], [ 23.658890, 66.460533 ], [ 23.657770, 66.406921 ], [ 23.719160, 66.204971 ], [ 24.004999, 66.052750 ], [ 24.167070, 65.812843 ], [ 24.012501, 65.788040 ], [ 23.696390, 65.825813 ], [ 23.649441, 65.801086 ], [ 23.459721, 65.826920 ], [ 23.434719, 65.760529 ], [ 23.188890, 65.819702 ], [ 23.234440, 65.763603 ], [ 23.081110, 65.698868 ], [ 23.072781, 65.739700 ], [ 23.000271, 65.752762 ], [ 22.782780, 65.860260 ], [ 22.637220, 65.902763 ], [ 22.704720, 65.807480 ], [ 22.648609, 65.750526 ], [ 22.608610, 65.796921 ], [ 22.508051, 65.773857 ], [ 22.527769, 65.810806 ], [ 22.491940, 65.830811 ], [ 22.363890, 65.859154 ], [ 22.321110, 65.798309 ], [ 22.356390, 65.752197 ], [ 22.315001, 65.732193 ], [ 22.240829, 65.754700 ], [ 22.238890, 65.731087 ], [ 22.373329, 65.711906 ], [ 22.385830, 65.670532 ], [ 22.341660, 65.663040 ], [ 22.307220, 65.698593 ], [ 22.257771, 65.691093 ], [ 22.276110, 65.624687 ], [ 22.186661, 65.621643 ], [ 22.309441, 65.613312 ], [ 22.316669, 65.634697 ], [ 22.426390, 65.548576 ], [ 22.405830, 65.535248 ], [ 21.955000, 65.645813 ], [ 22.162220, 65.549149 ], [ 22.164169, 65.533043 ], [ 21.852501, 65.529984 ], [ 22.031670, 65.457199 ], [ 21.998051, 65.423309 ], [ 21.943050, 65.449692 ], [ 21.929440, 65.398033 ], [ 21.814440, 65.396637 ], [ 21.586941, 65.416367 ], [ 21.471939, 65.376083 ], [ 21.648050, 65.306923 ], [ 21.685829, 65.261093 ], [ 21.553610, 65.234703 ], [ 21.489441, 65.308594 ], [ 21.324440, 65.371918 ], [ 21.266109, 65.333313 ], [ 21.400829, 65.321640 ], [ 21.620550, 65.153030 ], [ 21.613331, 65.138031 ], [ 21.547220, 65.136368 ], [ 21.549721, 65.091370 ], [ 21.468330, 65.050537 ], [ 21.502781, 65.019699 ], [ 21.424160, 65.009407 ], [ 21.386940, 64.958862 ], [ 21.243891, 64.947746 ], [ 21.183050, 64.829971 ], [ 21.097500, 64.823303 ], [ 21.073059, 64.856369 ], [ 21.036940, 64.835823 ], [ 21.054440, 64.811920 ], [ 21.258329, 64.777481 ], [ 21.310829, 64.750809 ], [ 21.229719, 64.743027 ], [ 21.303890, 64.687187 ], [ 21.210550, 64.695251 ], [ 21.105000, 64.722748 ], [ 21.118891, 64.681374 ], [ 21.361940, 64.566360 ], [ 21.373329, 64.605263 ], [ 21.542770, 64.525528 ], [ 21.376390, 64.526367 ], [ 21.481939, 64.510246 ], [ 21.481670, 64.449142 ], [ 21.575550, 64.464417 ], [ 21.330000, 64.314148 ], [ 21.276110, 64.295807 ], [ 21.242769, 64.310257 ], [ 20.954170, 64.134140 ], [ 20.910830, 64.018593 ], [ 20.675831, 63.821659 ], [ 20.679440, 63.788879 ], [ 20.614170, 63.816380 ], [ 20.543329, 63.768600 ], [ 20.499720, 63.822769 ], [ 20.458611, 63.775539 ], [ 20.413610, 63.691101 ], [ 20.362780, 63.679440 ], [ 20.343050, 63.746101 ], [ 20.314720, 63.736660 ], [ 20.325550, 63.694710 ], [ 20.289440, 63.649712 ], [ 20.254440, 63.704708 ], [ 20.240829, 63.646381 ], [ 20.057220, 63.659431 ], [ 20.011940, 63.635818 ], [ 20.033051, 63.601650 ], [ 19.937771, 63.616650 ], [ 19.775280, 63.533329 ], [ 19.773050, 63.457489 ], [ 19.660830, 63.435261 ], [ 19.639721, 63.474709 ], [ 19.463610, 63.561100 ], [ 19.422779, 63.545818 ], [ 19.482220, 63.467491 ], [ 19.473610, 63.453041 ], [ 19.514160, 63.408329 ], [ 19.336390, 63.482491 ], [ 19.365829, 63.434990 ], [ 19.296671, 63.463600 ], [ 19.274441, 63.441929 ], [ 19.261940, 63.321098 ], [ 19.139999, 63.310261 ], [ 19.116110, 63.232769 ], [ 19.045561, 63.244431 ], [ 19.049721, 63.218319 ], [ 19.110279, 63.208321 ], [ 19.036940, 63.176380 ], [ 18.946659, 63.248600 ], [ 18.803049, 63.256939 ], [ 18.739719, 63.242210 ], [ 18.915270, 63.206661 ], [ 18.789440, 63.167759 ], [ 18.751940, 63.201649 ], [ 18.816389, 63.215820 ], [ 18.703890, 63.220539 ], [ 18.753889, 63.154709 ], [ 18.628611, 63.146648 ], [ 18.644720, 63.104431 ], [ 18.558889, 63.114159 ], [ 18.481670, 63.018318 ], [ 18.375271, 63.047211 ], [ 18.423611, 63.009430 ], [ 18.344999, 63.034431 ], [ 18.258610, 62.989990 ], [ 18.539721, 62.984440 ], [ 18.576660, 62.965820 ], [ 18.565001, 62.950260 ], [ 18.414160, 62.965549 ], [ 18.400829, 62.938042 ], [ 18.525551, 62.923321 ], [ 18.473610, 62.879429 ], [ 18.466940, 62.858318 ], [ 18.362221, 62.833881 ], [ 18.309719, 62.858051 ], [ 18.207500, 62.861660 ], [ 18.280279, 62.840820 ], [ 18.264721, 62.811378 ], [ 18.199440, 62.776100 ], [ 18.186110, 62.812210 ], [ 18.148050, 62.769711 ], [ 18.008051, 62.797771 ], [ 18.145000, 62.816662 ], [ 18.047779, 62.849991 ], [ 17.973890, 62.800819 ], [ 17.923630, 62.820061 ], [ 17.923050, 62.864429 ], [ 17.828329, 62.969440 ], [ 17.696659, 62.991940 ], [ 17.801109, 62.946930 ], [ 17.885830, 62.864159 ], [ 17.994720, 62.730549 ], [ 17.991390, 62.653049 ], [ 17.917770, 62.665272 ], [ 17.885281, 62.656101 ], [ 18.045561, 62.623600 ], [ 18.055830, 62.589989 ], [ 17.950830, 62.562481 ], [ 17.954439, 62.608051 ], [ 17.931110, 62.610821 ], [ 17.910830, 62.544159 ], [ 17.835550, 62.483879 ], [ 17.693331, 62.493599 ], [ 17.654160, 62.467209 ], [ 17.698610, 62.434158 ], [ 17.564159, 62.440269 ], [ 17.409161, 62.538052 ], [ 17.325550, 62.480259 ], [ 17.379169, 62.415272 ], [ 17.341110, 62.393879 ], [ 17.466391, 62.310822 ], [ 17.465269, 62.265541 ], [ 17.654720, 62.231098 ], [ 17.600000, 62.209431 ], [ 17.538610, 62.211102 ], [ 17.483061, 62.129429 ], [ 17.463610, 62.006378 ], [ 17.349720, 61.945271 ], [ 17.341940, 61.813881 ], [ 17.407221, 61.816101 ], [ 17.393610, 61.716381 ], [ 17.494720, 61.728039 ], [ 17.523609, 61.696098 ], [ 17.477221, 61.624710 ], [ 17.257771, 61.719151 ], [ 17.140270, 61.719711 ], [ 17.220270, 61.703320 ], [ 17.263050, 61.671101 ], [ 17.126390, 61.614429 ], [ 17.144720, 61.593601 ], [ 17.073330, 61.548870 ], [ 17.179159, 61.487492 ], [ 17.157780, 61.458050 ], [ 17.139721, 61.431660 ], [ 17.110279, 61.387489 ], [ 17.274879, 61.311749 ], [ 17.128611, 61.301102 ], [ 17.211390, 61.223598 ], [ 17.148890, 61.209148 ], [ 17.181391, 61.080818 ], [ 17.188330, 61.032768 ], [ 17.165831, 60.993599 ], [ 17.150551, 60.944988 ], [ 17.334160, 60.756378 ], [ 17.188610, 60.688320 ], [ 17.332500, 60.653320 ], [ 17.578329, 60.639992 ], [ 17.656940, 60.601940 ], [ 17.602501, 60.574989 ], [ 17.634720, 60.518318 ], [ 17.740549, 60.493599 ], [ 17.725559, 60.534710 ], [ 17.773050, 60.571098 ], [ 17.949720, 60.597210 ], [ 17.975830, 60.570820 ], [ 18.228050, 60.369160 ], [ 18.234440, 60.326649 ], [ 18.440281, 60.340820 ], [ 18.445271, 60.310261 ], [ 18.582500, 60.246929 ], [ 18.580000, 60.224430 ], [ 18.448891, 60.239712 ], [ 18.340830, 60.298038 ], [ 18.317221, 60.296940 ], [ 18.449169, 60.211380 ], [ 18.421671, 60.187210 ], [ 18.542219, 60.151932 ], [ 18.587219, 60.073318 ], [ 18.579170, 60.137211 ], [ 18.626110, 60.145821 ], [ 18.736389, 60.118599 ], [ 18.744720, 60.047211 ], [ 18.753050, 60.081100 ], [ 18.760830, 60.104988 ], [ 18.822500, 60.114159 ], [ 18.816389, 60.073879 ], [ 18.909719, 59.935822 ], [ 19.070551, 59.889709 ], [ 19.050550, 59.822769 ], [ 18.924440, 59.889149 ], [ 18.931110, 59.857208 ], [ 18.857220, 59.794708 ], [ 18.765829, 59.786652 ], [ 18.739161, 59.758598 ], [ 18.851669, 59.777760 ], [ 19.080549, 59.770550 ], [ 19.070000, 59.735821 ], [ 18.953609, 59.719990 ], [ 18.912220, 59.749439 ], [ 18.694441, 59.645260 ], [ 18.744720, 59.642490 ], [ 18.668051, 59.620270 ], [ 18.645550, 59.580540 ], [ 18.250000, 59.443600 ], [ 18.312771, 59.406101 ], [ 18.322220, 59.390820 ], [ 18.165001, 59.408039 ], [ 18.208330, 59.420551 ], [ 18.195829, 59.455269 ], [ 18.115549, 59.453041 ], [ 18.081671, 59.399151 ], [ 18.011110, 59.405540 ], [ 18.136391, 59.332489 ], [ 17.816111, 59.371101 ], [ 17.757771, 59.409988 ], [ 17.770000, 59.445820 ], [ 17.845280, 59.533039 ], [ 17.718330, 59.699162 ], [ 17.710550, 59.618881 ], [ 17.592220, 59.656101 ], [ 17.686390, 59.736099 ], [ 17.636110, 59.754711 ], [ 17.587780, 59.804710 ], [ 17.496111, 59.729988 ], [ 17.444719, 59.676102 ], [ 17.487780, 59.632210 ], [ 17.521391, 59.616940 ], [ 17.527500, 59.713039 ], [ 17.537500, 59.732208 ], [ 17.620279, 59.726379 ], [ 17.560829, 59.666931 ], [ 17.586670, 59.640541 ], [ 17.757219, 59.583881 ], [ 17.785000, 59.529430 ], [ 17.719999, 59.442760 ], [ 17.520281, 59.507210 ], [ 17.541660, 59.557491 ], [ 17.490280, 59.542488 ], [ 17.370550, 59.619709 ], [ 17.407499, 59.500542 ], [ 17.398890, 59.469151 ], [ 17.110279, 59.551380 ], [ 17.059999, 59.604431 ], [ 17.011391, 59.588600 ], [ 17.048889, 59.560551 ], [ 17.031389, 59.536381 ], [ 16.800831, 59.591099 ], [ 16.783051, 59.552761 ], [ 16.721390, 59.525829 ], [ 16.647499, 59.560822 ], [ 16.541941, 59.609440 ], [ 16.497499, 59.586929 ], [ 16.547501, 59.556931 ], [ 16.538330, 59.538879 ], [ 16.465000, 59.515820 ], [ 16.472500, 59.497490 ], [ 16.389441, 59.510818 ], [ 16.348890, 59.479988 ], [ 16.022221, 59.489712 ], [ 16.072781, 59.454430 ], [ 16.181391, 59.439430 ], [ 16.670000, 59.473049 ], [ 16.746389, 59.428879 ], [ 16.693331, 59.476101 ], [ 16.828890, 59.491379 ], [ 16.924440, 59.453320 ], [ 17.040001, 59.359440 ], [ 17.310551, 59.348881 ], [ 17.311939, 59.327492 ], [ 17.243610, 59.313599 ], [ 17.280001, 59.274151 ], [ 17.213329, 59.257210 ], [ 17.398050, 59.247761 ], [ 17.355000, 59.297211 ], [ 17.361940, 59.324711 ], [ 17.503889, 59.284161 ], [ 17.594999, 59.223049 ], [ 17.593889, 59.284710 ], [ 17.847219, 59.264431 ], [ 17.888050, 59.226940 ], [ 17.889721, 59.284710 ], [ 17.984440, 59.333881 ], [ 18.163891, 59.320541 ], [ 18.272221, 59.364429 ], [ 18.360001, 59.371380 ], [ 18.454720, 59.331100 ], [ 18.478331, 59.345829 ], [ 18.441111, 59.412769 ], [ 18.434441, 59.433601 ], [ 18.529720, 59.417488 ], [ 18.650280, 59.319149 ], [ 18.630550, 59.307491 ], [ 18.353609, 59.305538 ], [ 18.339439, 59.327770 ], [ 18.276939, 59.307209 ], [ 18.338329, 59.229710 ], [ 18.309999, 59.219711 ], [ 18.403330, 59.163601 ], [ 18.044720, 59.053879 ], [ 17.995279, 59.000542 ], [ 17.966660, 58.920818 ], [ 17.895830, 58.909710 ], [ 17.894720, 58.858879 ], [ 17.837780, 58.923038 ], [ 17.800280, 58.906380 ], [ 17.781940, 58.875542 ], [ 17.740549, 58.931931 ], [ 17.761940, 58.997211 ], [ 17.759159, 59.126659 ], [ 17.706671, 59.050541 ], [ 17.666660, 59.083321 ], [ 17.690550, 59.132771 ], [ 17.663891, 59.168320 ], [ 17.613609, 58.974709 ], [ 17.613890, 58.917488 ], [ 17.613050, 58.894428 ], [ 17.537500, 58.896381 ], [ 17.589439, 58.857208 ], [ 17.446939, 58.892490 ], [ 17.480551, 58.789711 ], [ 17.340000, 58.804150 ], [ 17.371389, 58.745541 ], [ 17.254999, 58.724709 ], [ 17.083330, 58.763599 ], [ 17.086660, 58.733879 ], [ 17.059999, 58.703041 ], [ 17.145550, 58.700260 ], [ 17.094721, 58.651100 ], [ 17.033890, 58.673870 ], [ 17.012779, 58.662209 ], [ 17.024719, 58.636101 ], [ 16.677780, 58.636929 ], [ 16.231939, 58.658871 ], [ 16.401939, 58.592491 ], [ 16.436661, 58.641380 ], [ 16.788891, 58.602772 ], [ 16.786110, 58.567211 ], [ 16.938610, 58.484150 ], [ 16.742769, 58.424431 ], [ 16.540550, 58.461380 ], [ 16.709999, 58.403599 ], [ 16.733610, 58.363041 ], [ 16.764441, 58.337769 ], [ 16.630831, 58.348049 ], [ 16.731110, 58.315540 ], [ 16.803329, 58.312210 ], [ 16.709160, 58.268879 ], [ 16.801670, 58.243320 ], [ 16.802219, 58.138599 ], [ 16.752781, 58.125542 ], [ 16.682501, 58.171379 ], [ 16.618050, 58.192760 ], [ 16.660271, 58.136662 ], [ 16.728050, 58.100819 ], [ 16.734171, 58.047489 ], [ 16.750271, 58.012760 ], [ 16.713881, 58.017490 ], [ 16.690281, 57.999149 ], [ 16.651939, 58.044991 ], [ 16.638050, 58.004429 ], [ 16.740000, 57.961929 ], [ 16.770550, 57.884430 ], [ 16.724720, 57.875820 ], [ 16.692499, 57.916660 ], [ 16.659161, 57.883320 ], [ 16.558331, 57.976940 ], [ 16.494440, 57.979431 ], [ 16.584160, 57.926929 ], [ 16.461941, 57.892490 ], [ 16.702351, 57.742260 ], [ 16.618891, 57.771381 ], [ 16.712500, 57.699989 ], [ 16.574169, 57.703320 ], [ 16.625549, 57.619709 ], [ 16.557220, 57.589161 ], [ 16.553610, 57.622211 ], [ 16.518330, 57.584431 ], [ 16.632500, 57.552212 ], [ 16.693331, 57.469151 ], [ 16.627781, 57.436378 ], [ 16.664721, 57.407490 ], [ 16.555000, 57.383598 ], [ 16.537781, 57.364159 ], [ 16.568890, 57.334709 ], [ 16.472219, 57.290272 ], [ 16.460279, 57.167488 ], [ 16.564440, 57.081661 ], [ 16.441940, 57.044991 ], [ 16.414440, 56.786098 ], [ 16.451941, 56.790272 ], [ 16.465269, 56.764992 ], [ 16.356390, 56.757771 ], [ 16.377501, 56.697491 ], [ 16.360830, 56.653320 ], [ 16.272499, 56.656651 ], [ 16.216110, 56.607208 ], [ 16.215000, 56.544159 ], [ 16.171671, 56.527489 ], [ 16.088051, 56.389709 ], [ 15.853050, 56.075550 ], [ 15.785550, 56.106098 ], [ 15.820280, 56.161098 ], [ 15.737500, 56.160549 ], [ 15.587500, 56.160259 ], [ 15.581390, 56.203602 ], [ 15.301940, 56.136379 ], [ 14.690550, 56.157768 ], [ 14.681940, 56.115551 ], [ 14.750830, 56.059711 ], [ 14.760560, 56.026661 ], [ 14.668050, 56.002769 ], [ 14.620830, 56.029430 ], [ 14.544170, 56.052490 ], [ 14.330280, 55.936939 ], [ 14.207780, 55.812481 ], [ 14.196110, 55.715820 ], [ 14.351940, 55.564991 ], [ 14.365550, 55.526661 ], [ 14.196940, 55.386929 ], [ 14.110550, 55.380821 ], [ 13.935830, 55.431381 ], [ 13.782500, 55.421379 ], [ 13.781390, 55.421650 ], [ 13.364720, 55.339710 ], [ 13.227780, 55.359150 ], [ 12.827500, 55.387211 ], [ 12.867500, 55.438599 ], [ 12.935560, 55.415539 ], [ 12.962500, 55.433880 ], [ 12.916390, 55.544159 ], [ 12.925280, 55.577209 ], [ 13.045000, 55.632488 ], [ 13.054720, 55.697769 ], [ 12.912220, 55.757771 ], [ 12.765830, 55.964989 ], [ 12.556630, 56.179409 ], [ 12.481390, 56.281380 ], [ 12.473890, 56.297211 ], [ 12.708890, 56.218601 ], [ 12.813330, 56.232769 ], [ 12.833050, 56.269161 ], [ 12.622780, 56.399990 ], [ 12.631940, 56.436939 ], [ 12.679720, 56.466381 ], [ 12.868610, 56.441380 ], [ 12.910830, 56.466930 ], [ 12.936940, 56.532490 ], [ 12.869170, 56.648880 ], [ 12.725280, 56.639709 ], [ 12.635280, 56.725819 ], [ 12.593330, 56.817490 ], [ 12.350280, 56.914440 ], [ 12.334440, 57.016380 ], [ 12.237780, 57.059711 ], [ 12.196660, 57.182209 ], [ 12.099720, 57.232491 ], [ 12.111940, 57.259430 ], [ 12.141940, 57.313599 ], [ 12.043890, 57.336929 ], [ 12.095000, 57.426929 ], [ 12.043890, 57.459709 ], [ 12.007780, 57.428879 ], [ 11.986110, 57.341381 ], [ 11.931940, 57.354710 ], [ 11.906390, 57.623322 ], [ 11.864720, 57.602772 ], [ 11.831670, 57.675819 ], [ 11.917220, 57.696659 ], [ 11.741390, 57.688599 ], [ 11.699720, 57.715820 ], [ 11.811670, 57.781940 ], [ 11.662220, 57.841648 ], [ 11.757220, 57.897209 ], [ 11.801390, 58.032490 ], [ 11.776670, 58.059429 ], [ 11.886110, 58.211929 ], [ 11.806940, 58.275539 ], [ 11.857500, 58.341930 ], [ 11.572220, 58.246929 ], [ 11.490830, 58.240551 ], [ 11.513890, 58.299709 ], [ 11.621390, 58.385818 ], [ 11.555560, 58.410549 ], [ 11.492220, 58.301929 ], [ 11.398610, 58.259159 ], [ 11.388330, 58.301659 ], [ 11.392500, 58.330269 ], [ 11.447780, 58.332760 ], [ 11.419720, 58.385269 ], [ 11.386390, 58.353600 ], [ 11.345280, 58.348049 ], [ 11.426110, 58.438042 ], [ 11.228330, 58.336651 ], [ 11.206110, 58.404148 ], [ 11.256940, 58.419991 ], [ 11.248610, 58.480259 ], [ 11.256670, 58.522491 ], [ 11.252220, 58.653049 ], [ 11.178050, 58.713871 ], [ 11.210830, 58.755550 ], [ 11.194170, 58.917488 ], [ 11.106940, 58.949989 ], [ 11.115000, 58.991940 ], [ 11.119170, 59.015820 ], [ 11.179440, 59.071930 ], [ 11.315000, 59.101379 ], [ 11.350000, 59.084431 ], [ 11.420290, 58.995998 ], [ 11.427780, 58.893040 ], [ 11.463050, 58.883598 ], [ 11.626660, 58.909149 ], [ 11.751110, 59.090260 ], [ 11.739720, 59.128590 ], [ 11.787480, 59.223660 ], [ 11.798330, 59.245258 ], [ 11.790830, 59.303310 ], [ 11.787180, 59.311871 ], [ 11.666110, 59.595821 ], [ 11.902780, 59.707760 ], [ 11.891110, 59.794708 ], [ 11.815280, 59.845821 ], [ 11.956940, 59.896931 ], [ 12.163050, 59.896931 ], [ 12.476940, 60.076382 ], [ 12.491110, 60.301380 ], [ 12.589720, 60.399151 ], [ 12.608050, 60.468590 ], [ 12.587500, 60.526649 ], [ 12.229160, 60.985260 ], [ 12.294160, 61.029430 ], [ 12.655000, 61.062481 ], [ 12.856110, 61.362492 ], [ 12.530000, 61.566090 ], [ 12.406670, 61.573318 ], [ 12.124440, 61.728588 ], [ 12.295830, 62.261662 ], [ 12.210000, 62.389980 ], [ 12.011940, 62.601379 ], [ 12.089440, 62.749432 ], [ 12.028890, 62.892490 ], [ 12.168610, 63.015820 ], [ 11.936390, 63.272209 ], [ 12.195000, 63.485260 ], [ 12.139440, 63.584148 ], [ 12.324720, 63.709431 ], [ 12.675000, 63.965542 ], [ 12.836660, 64.023033 ], [ 13.230000, 64.093033 ], [ 13.981660, 64.013031 ], [ 14.040500, 64.071747 ], [ 14.048930, 64.080170 ], [ 14.154720, 64.185791 ], [ 14.116390, 64.470520 ], [ 13.682220, 64.571091 ], [ 13.696940, 64.629410 ], [ 14.319440, 65.129959 ], [ 14.368890, 65.246628 ], [ 14.493050, 65.313583 ], [ 14.503890, 65.593307 ], [ 14.634720, 65.826920 ], [ 14.505000, 66.132462 ], [ 15.025280, 66.149979 ], [ 15.468050, 66.283859 ], [ 15.362780, 66.479973 ], [ 15.625830, 66.605797 ], [ 16.010000, 66.890808 ], [ 16.353889, 67.017754 ], [ 16.399160, 67.177750 ], [ 16.085831, 67.411636 ], [ 16.192221, 67.499977 ], [ 16.382500, 67.515533 ], [ 16.570271, 67.656921 ], [ 16.726940, 67.899139 ], [ 17.188330, 68.030258 ], [ 17.273609, 68.090530 ], [ 17.884159, 67.945511 ], [ 18.155270, 68.166077 ], [ 18.045830, 68.409409 ], [ 18.090830, 68.507751 ], [ 18.358049, 68.539139 ], [ 18.611940, 68.475250 ], [ 18.952221, 68.487747 ], [ 19.937771, 68.337479 ], [ 20.175831, 68.448013 ], [ 20.211109, 68.482193 ], [ 19.956381, 68.543854 ], [ 20.202499, 68.662193 ], [ 20.350269, 68.786636 ], [ 20.314720, 68.928299 ], [ 20.096939, 69.042191 ], [ 20.586090, 69.063141 ] ] ] } ] } ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'United Kingdom', 'density': '254.2', 'population': '61595091' }, 'geometry': { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'Polygon', 'coordinates': [ [ [ -6.265000, 56.258881 ], [ -6.361389, 56.302761 ], [ -6.363890, 56.329990 ], [ -6.290833, 56.339989 ], [ -6.174723, 56.331100 ], [ -6.018889, 56.369709 ], [ -6.095834, 56.366650 ], [ -6.185278, 56.356659 ], [ -6.203056, 56.378040 ], [ -6.010000, 56.470268 ], [ -6.032223, 56.492489 ], [ -6.126390, 56.473881 ], [ -6.317779, 56.585819 ], [ -6.269167, 56.611660 ], [ -6.116945, 56.650269 ], [ -6.006111, 56.591099 ], [ -5.962778, 56.522770 ], [ -5.723056, 56.483318 ], [ -5.651389, 56.451099 ], [ -5.663334, 56.395550 ], [ -5.787223, 56.367771 ], [ -5.703334, 56.375542 ], [ -5.702223, 56.359150 ], [ -5.840556, 56.308880 ], [ -5.860278, 56.351940 ], [ -6.265000, 56.258881 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -4.402223, 53.125820 ], [ -4.385279, 53.182770 ], [ -4.490834, 53.174992 ], [ -4.572779, 53.319710 ], [ -4.567223, 53.391380 ], [ -4.416389, 53.424992 ], [ -4.292778, 53.407490 ], [ -4.204167, 53.291931 ], [ -4.053334, 53.304710 ], [ -4.090000, 53.254990 ], [ -4.402223, 53.125820 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -5.154445, 55.432770 ], [ -5.273056, 55.443878 ], [ -5.357500, 55.504162 ], [ -5.351667, 55.551929 ], [ -5.400278, 55.600552 ], [ -5.381390, 55.668598 ], [ -5.265556, 55.717209 ], [ -5.168334, 55.684158 ], [ -5.129723, 55.613319 ], [ -5.075001, 55.463329 ], [ -5.154445, 55.432770 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -6.965834, 57.725552 ], [ -7.120001, 57.814159 ], [ -7.125556, 57.837769 ], [ -7.009167, 57.839710 ], [ -6.840834, 57.925270 ], [ -7.063612, 58.005821 ], [ -6.936111, 58.046101 ], [ -7.073611, 58.058601 ], [ -7.126945, 58.123322 ], [ -7.108890, 58.180538 ], [ -7.020556, 58.186649 ], [ -7.058056, 58.200550 ], [ -7.040833, 58.233318 ], [ -6.908334, 58.212769 ], [ -6.861945, 58.111370 ], [ -6.873889, 58.178322 ], [ -6.813612, 58.196098 ], [ -6.728889, 58.169430 ], [ -6.757223, 58.223320 ], [ -6.808056, 58.259708 ], [ -6.797778, 58.302212 ], [ -6.330833, 58.471661 ], [ -6.244722, 58.508598 ], [ -6.166389, 58.425270 ], [ -6.212778, 58.364990 ], [ -6.168334, 58.342770 ], [ -6.365834, 58.230820 ], [ -6.287223, 58.204708 ], [ -6.168056, 58.260540 ], [ -6.158334, 58.218319 ], [ -6.242778, 58.180271 ], [ -6.394167, 58.209431 ], [ -6.375000, 58.135540 ], [ -6.620278, 58.081928 ], [ -6.402500, 58.105820 ], [ -6.367223, 58.052761 ], [ -6.392778, 58.003880 ], [ -6.553334, 58.009159 ], [ -6.464445, 57.986099 ], [ -6.474167, 57.940269 ], [ -6.577500, 57.910820 ], [ -6.688612, 57.955269 ], [ -6.706944, 57.998878 ], [ -6.659445, 58.046650 ], [ -6.761390, 57.998322 ], [ -6.660556, 57.884708 ], [ -6.803334, 57.878319 ], [ -6.760834, 57.824162 ], [ -6.815556, 57.805538 ], [ -6.878889, 57.789150 ], [ -6.965834, 57.725552 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -6.012222, 57.022209 ], [ -6.035001, 57.054710 ], [ -5.944723, 57.147209 ], [ -6.033334, 57.224709 ], [ -6.073611, 57.126381 ], [ -6.111112, 57.170818 ], [ -6.221390, 57.173321 ], [ -6.314723, 57.157490 ], [ -6.279167, 57.198318 ], [ -6.353889, 57.189430 ], [ -6.353889, 57.225269 ], [ -6.476389, 57.297211 ], [ -6.421945, 57.334709 ], [ -6.482779, 57.397770 ], [ -6.570278, 57.386101 ], [ -6.567500, 57.337490 ], [ -6.700278, 57.363880 ], [ -6.786112, 57.446098 ], [ -6.715834, 57.511929 ], [ -6.611945, 57.438042 ], [ -6.629723, 57.497211 ], [ -6.561667, 57.499439 ], [ -6.623889, 57.544159 ], [ -6.641389, 57.602489 ], [ -6.586667, 57.588600 ], [ -6.463612, 57.508881 ], [ -6.439445, 57.476379 ], [ -6.394444, 57.522209 ], [ -6.357779, 57.583050 ], [ -6.420279, 57.634708 ], [ -6.323056, 57.694988 ], [ -6.163334, 57.597210 ], [ -6.131945, 57.474152 ], [ -6.190001, 57.396381 ], [ -6.128056, 57.401100 ], [ -6.101111, 57.321381 ], [ -6.039722, 57.305820 ], [ -5.899445, 57.241940 ], [ -5.654167, 57.261662 ], [ -5.664167, 57.204990 ], [ -5.928334, 57.038601 ], [ -6.012222, 57.022209 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -2.911111, 58.889431 ], [ -3.041945, 58.936378 ], [ -3.188612, 58.909988 ], [ -3.238889, 58.967491 ], [ -3.220834, 59.024712 ], [ -3.271111, 58.987209 ], [ -3.290833, 58.946930 ], [ -3.361389, 58.992210 ], [ -3.321389, 59.126381 ], [ -3.218889, 59.148602 ], [ -3.011111, 59.076931 ], [ -3.019167, 59.042759 ], [ -3.134167, 59.000820 ], [ -2.782778, 58.989429 ], [ -2.809722, 58.963039 ], [ -2.823889, 58.928051 ], [ -2.778889, 58.924160 ], [ -2.793334, 58.951382 ], [ -2.708611, 58.968880 ], [ -2.708333, 58.917210 ], [ -2.911111, 58.889431 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -7.315001, 57.504162 ], [ -7.418612, 57.573318 ], [ -7.519167, 57.581100 ], [ -7.500278, 57.636929 ], [ -7.396111, 57.661098 ], [ -7.313612, 57.653320 ], [ -7.184723, 57.684429 ], [ -7.186667, 57.648319 ], [ -7.075556, 57.642208 ], [ -7.095834, 57.608051 ], [ -7.201667, 57.638050 ], [ -7.180000, 57.608601 ], [ -7.106945, 57.586380 ], [ -7.138056, 57.556099 ], [ -7.154167, 57.509430 ], [ -7.315001, 57.504162 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -6.267222, 55.573040 ], [ -6.322779, 55.610821 ], [ -6.245001, 55.653599 ], [ -6.326112, 55.718601 ], [ -6.251112, 55.767208 ], [ -6.325556, 55.781380 ], [ -6.462778, 55.673870 ], [ -6.501390, 55.673321 ], [ -6.495278, 55.733601 ], [ -6.454445, 55.766651 ], [ -6.450001, 55.848598 ], [ -6.322500, 55.888599 ], [ -6.317500, 55.826099 ], [ -6.266389, 55.879711 ], [ -6.119445, 55.917210 ], [ -6.097778, 55.796650 ], [ -6.026112, 55.684990 ], [ -6.140000, 55.626659 ], [ -6.267222, 55.573040 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -5.972222, 55.788319 ], [ -6.063334, 55.803879 ], [ -6.088334, 55.877491 ], [ -6.022779, 55.938042 ], [ -5.890000, 55.966648 ], [ -5.995001, 55.972759 ], [ -5.968334, 56.023602 ], [ -5.696389, 56.142208 ], [ -5.686389, 56.113041 ], [ -5.950556, 55.818878 ], [ -5.972222, 55.788319 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -1.282778, 50.578880 ], [ -1.569445, 50.657490 ], [ -1.432500, 50.726379 ], [ -1.275278, 50.768600 ], [ -1.073611, 50.677761 ], [ -1.153333, 50.648880 ], [ -1.168334, 50.601940 ], [ -1.282778, 50.578880 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -7.349723, 57.099430 ], [ -7.386945, 57.114712 ], [ -7.422778, 57.278320 ], [ -7.391945, 57.303879 ], [ -7.425279, 57.382210 ], [ -7.349723, 57.406101 ], [ -7.224723, 57.341648 ], [ -7.252501, 57.326649 ], [ -7.384167, 57.383320 ], [ -7.353612, 57.351379 ], [ -7.200556, 57.302761 ], [ -7.259167, 57.226101 ], [ -7.259167, 57.152489 ], [ -7.244722, 57.121658 ], [ -7.349723, 57.099430 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -1.268889, 59.851101 ], [ -1.378056, 59.906380 ], [ -1.263056, 60.106930 ], [ -1.273611, 60.187481 ], [ -1.331667, 60.201099 ], [ -1.350278, 60.243320 ], [ -1.393611, 60.243320 ], [ -1.358333, 60.192490 ], [ -1.453889, 60.152489 ], [ -1.526945, 60.194439 ], [ -1.469722, 60.215820 ], [ -1.631389, 60.214432 ], [ -1.691667, 60.288319 ], [ -1.628334, 60.307209 ], [ -1.557778, 60.286930 ], [ -1.413056, 60.320820 ], [ -1.361667, 60.283329 ], [ -1.345834, 60.339989 ], [ -1.259167, 60.350819 ], [ -1.434167, 60.423321 ], [ -1.443889, 60.484711 ], [ -1.610000, 60.474152 ], [ -1.601944, 60.492489 ], [ -1.511111, 60.554150 ], [ -1.438611, 60.502769 ], [ -1.386945, 60.509991 ], [ -1.476389, 60.541370 ], [ -1.329722, 60.616940 ], [ -1.294445, 60.631100 ], [ -1.317222, 60.527489 ], [ -1.355454, 60.407070 ], [ -1.236945, 60.439159 ], [ -1.294445, 60.464989 ], [ -1.211111, 60.493599 ], [ -1.190556, 60.466099 ], [ -1.154722, 60.421101 ], [ -1.231945, 60.405270 ], [ -1.095834, 60.416370 ], [ -1.121667, 60.384430 ], [ -1.061111, 60.385818 ], [ -1.090000, 60.346100 ], [ -1.170556, 60.347488 ], [ -1.090833, 60.310822 ], [ -1.127778, 60.271381 ], [ -1.200556, 60.263321 ], [ -1.180556, 60.228039 ], [ -1.195000, 60.175541 ], [ -1.141667, 60.185822 ], [ -1.172500, 60.134159 ], [ -1.202500, 59.979431 ], [ -1.248333, 59.993038 ], [ -1.268889, 59.851101 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ -5.263056, 57.971100 ], [ -5.444445, 58.064430 ], [ -5.443056, 58.093880 ], [ -5.311111, 58.063881 ], [ -5.283334, 58.106380 ], [ -5.300000, 58.161652 ], [ -5.396389, 58.242489 ], [ -5.386667, 58.261101 ], [ -5.176667, 58.249149 ], [ -5.115556, 58.269989 ], [ -4.946389, 58.223049 ], [ -4.929445, 58.261662 ], [ -5.121667, 58.285820 ], [ -5.168334, 58.361099 ], [ -5.146111, 58.409710 ], [ -5.089723, 58.419430 ], [ -5.073334, 58.450821 ], [ -5.109723, 58.508320 ], [ -5.028611, 58.538319 ], [ -5.005000, 58.623322 ], [ -4.829722, 58.600819 ], [ -4.817500, 58.521931 ], [ -4.767501, 58.578320 ], [ -4.660001, 58.552212 ], [ -4.764723, 58.443321 ], [ -4.611389, 58.518040 ], [ -4.588889, 58.570820 ], [ -4.440834, 58.551380 ], [ -4.428334, 58.521381 ], [ -4.495001, 58.445271 ], [ -4.360001, 58.533871 ], [ -4.041112, 58.588871 ], [ -3.857500, 58.560551 ], [ -3.571111, 58.622490 ], [ -3.365278, 58.595268 ], [ -3.410278, 58.649429 ], [ -3.374167, 58.672489 ], [ -3.308889, 58.644428 ], [ -3.025556, 58.647491 ], [ -3.030000, 58.600269 ], [ -3.126389, 58.519989 ], [ -3.123333, 58.482208 ], [ -3.055556, 58.477772 ], [ -3.121945, 58.369431 ], [ -3.331389, 58.277760 ], [ -3.471389, 58.195541 ], [ -3.902223, 57.983601 ], [ -3.979445, 57.960541 ], [ -4.057222, 57.948040 ], [ -4.011111, 57.861099 ], [ -4.234723, 57.852772 ], [ -3.936389, 57.804440 ], [ -3.788611, 57.861099 ], [ -3.799445, 57.826931 ], [ -3.968889, 57.702492 ], [ -4.029167, 57.694149 ], [ -4.019444, 57.728039 ], [ -4.329445, 57.646381 ], [ -4.430556, 57.582211 ], [ -4.415001, 57.572769 ], [ -4.249445, 57.659431 ], [ -4.011111, 57.682209 ], [ -4.020000, 57.657768 ], [ -4.248889, 57.495270 ], [ -4.118056, 57.517490 ], [ -4.038611, 57.557209 ], [ -4.081944, 57.579708 ], [ -3.606945, 57.653599 ], [ -3.527223, 57.661098 ], [ -3.414444, 57.716648 ], [ -3.198056, 57.686378 ], [ -3.041945, 57.662209 ], [ -2.790833, 57.702492 ], [ -2.341111, 57.669708 ], [ -2.246389, 57.684158 ], [ -1.930000, 57.677761 ], [ -1.799445, 57.543320 ], [ -1.763056, 57.466648 ], [ -2.045556, 57.229160 ], [ -2.075278, 57.151371 ], [ -2.049445, 57.113319 ], [ -2.309445, 56.804710 ], [ -2.415556, 56.758598 ], [ -2.524723, 56.581100 ], [ -2.734167, 56.458599 ], [ -2.910278, 56.463871 ], [ -3.081111, 56.448601 ], [ -3.325278, 56.359989 ], [ -3.265000, 56.346100 ], [ -2.828889, 56.439430 ], [ -2.799445, 56.418598 ], [ -2.838056, 56.363602 ], [ -2.585834, 56.283871 ], [ -2.583056, 56.268040 ], [ -2.788333, 56.187481 ], [ -2.945000, 56.204151 ], [ -3.135834, 56.113602 ], [ -3.158334, 56.059990 ], [ -3.523056, 56.033600 ], [ -3.820556, 56.111370 ], [ -3.810556, 56.097210 ], [ -3.666389, 56.007210 ], [ -3.053334, 55.943600 ], [ -2.861111, 56.005821 ], [ -2.794445, 56.060261 ], [ -2.650278, 56.058601 ], [ -2.571389, 56.019161 ], [ -2.164167, 55.912209 ], [ -2.030556, 55.816662 ], [ -1.819722, 55.634159 ], [ -1.751111, 55.627209 ], [ -1.630000, 55.558880 ], [ -1.573889, 55.423599 ], [ -1.581389, 55.346371 ], [ -1.445556, 55.045551 ], [ -1.303889, 54.804150 ], [ -1.256945, 54.732491 ], [ -1.184956, 54.674931 ], [ -1.168611, 54.638599 ], [ -0.777222, 54.556381 ], [ -0.480833, 54.403320 ], [ -0.381945, 54.255550 ], [ -0.078611, 54.116650 ], [ -0.202778, 54.054710 ], [ -0.216389, 54.022491 ], [ -0.134444, 53.873051 ], [ 0.154167, 53.600819 ], [ -0.207778, 53.699429 ], [ -0.266667, 53.734440 ], [ -0.653333, 53.702770 ], [ -0.259747, 53.683620 ], [ -0.117500, 53.581928 ], [ 0.235555, 53.399429 ], [ 0.351111, 53.193878 ], [ 0.341667, 53.095829 ], [ 0.010833, 52.891651 ], [ 0.383611, 52.793049 ], [ 0.537222, 52.962490 ], [ 0.927778, 52.951931 ], [ 1.274722, 52.928051 ], [ 1.645278, 52.771099 ], [ 1.742500, 52.630550 ], [ 1.733055, 52.393040 ], [ 1.639722, 52.276371 ], [ 1.588611, 52.085541 ], [ 1.333889, 51.929150 ], [ 1.175000, 52.023880 ], [ 1.158611, 52.019711 ], [ 1.259863, 51.964802 ], [ 1.248333, 51.955818 ], [ 1.076667, 51.951099 ], [ 1.156389, 51.939709 ], [ 1.290833, 51.939159 ], [ 1.201111, 51.874439 ], [ 1.293611, 51.877491 ], [ 1.223611, 51.808880 ], [ 1.111666, 51.773319 ], [ 1.004444, 51.805538 ], [ 0.936667, 51.807770 ], [ 0.850000, 51.737492 ], [ 0.704167, 51.722210 ], [ 0.758611, 51.691380 ], [ 0.918889, 51.740551 ], [ 0.953056, 51.676929 ], [ 0.953889, 51.609989 ], [ 0.803889, 51.528320 ], [ 0.465000, 51.503040 ], [ 0.382778, 51.450550 ], [ 0.683889, 51.472759 ], [ 0.725278, 51.455269 ], [ 0.714444, 51.436939 ], [ 0.558056, 51.411098 ], [ 0.611667, 51.378601 ], [ 0.719167, 51.416100 ], [ 0.767778, 51.357208 ], [ 1.174722, 51.376099 ], [ 1.424166, 51.392208 ], [ 1.442213, 51.347111 ], [ 1.376667, 51.319988 ], [ 1.411111, 51.201099 ], [ 1.368889, 51.135818 ], [ 1.095556, 51.072208 ], [ 0.994444, 51.016380 ], [ 0.968611, 50.972488 ], [ 0.978611, 50.917488 ], [ 0.781389, 50.935551 ], [ 0.571944, 50.849152 ], [ 0.311389, 50.782211 ], [ 0.253889, 50.738602 ], [ -0.297500, 50.818878 ], [ -0.780833, 50.727489 ], [ -0.907222, 50.770260 ], [ -0.863889, 50.800819 ], [ -0.927222, 50.839432 ], [ -1.025000, 50.840260 ], [ -1.039167, 50.791370 ], [ -1.087778, 50.778320 ], [ -1.091111, 50.822208 ], [ -1.148056, 50.844440 ], [ -1.115834, 50.805271 ], [ -1.137222, 50.779430 ], [ -1.380278, 50.857491 ], [ -1.313056, 50.816662 ], [ -1.331667, 50.791370 ], [ -1.527222, 50.754429 ], [ -1.561111, 50.710819 ], [ -1.678056, 50.738880 ], [ -1.996111, 50.713871 ], [ -2.061389, 50.717491 ], [ -1.938056, 50.643040 ], [ -1.958611, 50.598598 ], [ -2.170000, 50.619431 ], [ -2.394167, 50.641651 ], [ -2.464723, 50.598320 ], [ -2.423334, 50.552761 ], [ -2.458056, 50.523319 ], [ -2.479722, 50.583881 ], [ -2.762222, 50.705540 ], [ -2.907222, 50.733318 ], [ -3.381945, 50.612770 ], [ -3.460278, 50.675541 ], [ -3.437500, 50.604988 ], [ -3.498889, 50.538879 ], [ -3.553334, 50.425541 ], [ -3.495000, 50.386662 ], [ -3.638056, 50.302212 ], [ -3.648334, 50.224430 ], [ -3.789444, 50.212212 ], [ -3.940834, 50.312481 ], [ -4.092501, 50.322769 ], [ -4.194167, 50.405540 ], [ -4.158890, 50.457211 ], [ -4.233334, 50.434990 ], [ -4.216390, 50.411098 ], [ -4.195556, 50.321659 ], [ -4.337501, 50.366100 ], [ -4.773056, 50.286381 ], [ -4.786945, 50.235271 ], [ -5.005000, 50.143040 ], [ -5.035002, 50.197208 ], [ -5.065556, 50.159710 ], [ -5.072500, 50.134430 ], [ -5.123334, 50.095829 ], [ -5.055000, 50.061939 ], [ -5.094167, 50.009159 ], [ -5.171390, 49.988602 ], [ -5.193056, 49.955269 ], [ -5.269167, 50.042759 ], [ -5.381945, 50.103039 ], [ -5.489445, 50.127209 ], [ -5.537500, 50.113319 ], [ -5.551945, 50.059429 ], [ -5.660001, 50.035820 ], [ -5.712778, 50.053600 ], [ -5.697779, 50.149429 ], [ -5.501390, 50.216381 ], [ -5.432778, 50.192760 ], [ -5.154167, 50.342491 ], [ -5.113611, 50.410549 ], [ -5.052222, 50.422211 ], [ -4.956667, 50.556381 ], [ -4.849723, 50.512489 ], [ -4.921945, 50.582489 ], [ -4.785833, 50.592770 ], [ -4.608890, 50.756378 ], [ -4.553612, 50.785259 ], [ -4.527223, 51.009991 ], [ -4.474723, 51.014149 ], [ -4.351389, 50.989429 ], [ -4.211945, 51.070541 ], [ -4.230000, 51.186378 ], [ -3.777223, 51.243038 ], [ -3.238889, 51.188320 ], [ -3.025278, 51.190819 ], [ -3.006389, 51.247211 ], [ -2.989722, 51.346371 ], [ -2.793056, 51.480820 ], [ -2.681389, 51.523041 ], [ -2.475000, 51.721931 ], [ -2.478889, 51.740261 ], [ -2.706667, 51.584991 ], [ -2.886945, 51.539150 ], [ -3.041389, 51.520260 ], [ -3.164444, 51.454708 ], [ -3.164167, 51.409710 ], [ -3.334167, 51.379711 ], [ -3.542778, 51.397770 ], [ -3.825556, 51.595829 ], [ -3.935833, 51.612492 ], [ -3.996112, 51.596931 ], [ -4.017222, 51.552212 ], [ -4.111945, 51.564991 ], [ -4.211667, 51.531651 ], [ -4.295279, 51.556931 ], [ -4.242778, 51.637760 ], [ -4.078056, 51.646099 ], [ -4.356112, 51.735271 ], [ -4.363334, 51.783039 ], [ -4.634167, 51.727772 ], [ -4.690834, 51.687481 ], [ -4.783334, 51.631939 ], [ -4.856668, 51.641930 ], [ -4.993890, 51.606659 ], [ -5.115834, 51.673321 ], [ -4.843889, 51.706928 ], [ -4.886111, 51.751099 ], [ -4.967223, 51.701649 ], [ -5.212778, 51.731098 ], [ -5.104445, 51.770821 ], [ -5.120001, 51.845539 ], [ -5.252501, 51.869709 ], [ -5.309445, 51.861660 ], [ -5.228889, 51.923599 ], [ -5.076945, 51.996101 ], [ -5.076389, 52.021648 ], [ -4.837778, 52.014149 ], [ -4.722778, 52.113041 ], [ -4.441389, 52.164711 ], [ -4.150278, 52.315269 ], [ -4.061389, 52.476650 ], [ -4.057501, 52.523880 ], [ -3.966667, 52.536381 ], [ -3.974722, 52.551102 ], [ -4.055556, 52.540821 ], [ -4.126390, 52.601650 ], [ -4.059445, 52.699711 ], [ -3.989167, 52.731659 ], [ -4.098333, 52.756100 ], [ -4.148334, 52.798321 ], [ -4.065556, 52.915539 ], [ -4.395000, 52.890541 ], [ -4.500556, 52.829430 ], [ -4.493056, 52.796379 ], [ -4.525278, 52.778881 ], [ -4.591945, 52.815269 ], [ -4.761880, 52.788712 ], [ -4.615001, 52.916370 ], [ -4.373056, 53.022209 ], [ -4.196667, 53.206100 ], [ -3.833889, 53.282490 ], [ -3.877500, 53.331100 ], [ -3.613334, 53.279148 ], [ -3.376112, 53.344990 ], [ -3.315278, 53.346661 ], [ -3.087500, 53.230259 ], [ -3.120000, 53.315540 ], [ -3.190556, 53.381100 ], [ -3.072778, 53.425270 ], [ -3.027223, 53.423321 ], [ -2.942500, 53.310551 ], [ -2.786389, 53.289989 ], [ -2.702500, 53.346371 ], [ -2.765278, 53.341099 ], [ -2.833611, 53.320541 ], [ -2.954167, 53.360271 ], [ -3.107778, 53.551659 ], [ -2.946111, 53.706100 ], [ -2.897778, 53.726650 ], [ -3.021667, 53.739712 ], [ -3.058056, 53.780819 ], [ -3.052500, 53.909431 ], [ -2.871389, 53.998878 ], [ -2.920278, 54.025269 ], [ -2.799445, 54.114712 ], [ -2.857778, 54.186100 ], [ -2.803611, 54.243599 ], [ -2.926667, 54.155270 ], [ -2.985000, 54.148602 ], [ -3.037500, 54.224430 ], [ -3.138611, 54.067211 ], [ -3.230834, 54.100819 ], [ -3.248889, 54.164989 ], [ -3.208611, 54.199711 ], [ -3.208611, 54.261101 ], [ -3.244167, 54.192490 ], [ -3.316667, 54.191380 ], [ -3.409445, 54.276661 ], [ -3.412222, 54.341648 ], [ -3.627223, 54.502769 ], [ -3.509167, 54.712769 ], [ -3.438612, 54.759159 ], [ -3.391945, 54.876381 ], [ -3.339723, 54.901661 ], [ -3.292222, 54.873600 ], [ -3.259167, 54.898880 ], [ -3.316667, 54.913601 ], [ -3.208611, 54.949429 ], [ -3.087778, 54.951382 ], [ -3.041389, 54.978870 ], [ -3.575556, 54.978321 ], [ -3.569445, 54.891102 ], [ -3.812500, 54.848881 ], [ -3.953889, 54.767490 ], [ -4.043191, 54.768539 ], [ -4.066389, 54.831100 ], [ -4.089168, 54.768318 ], [ -4.196667, 54.804710 ], [ -4.204722, 54.863041 ], [ -4.261945, 54.836380 ], [ -4.376112, 54.879162 ], [ -4.393333, 54.908039 ], [ -4.429445, 54.872211 ], [ -4.411389, 54.825821 ], [ -4.340279, 54.800819 ], [ -4.348056, 54.699162 ], [ -4.376112, 54.676659 ], [ -4.549445, 54.732491 ], [ -4.695556, 54.809711 ], [ -4.852222, 54.868599 ], [ -4.955278, 54.808601 ], [ -4.900278, 54.701099 ], [ -4.856945, 54.634430 ], [ -4.922501, 54.640541 ], [ -4.963612, 54.680271 ], [ -5.005279, 54.766930 ], [ -5.164446, 54.884991 ], [ -5.178612, 54.984711 ], [ -5.105278, 55.023880 ], [ -5.057501, 54.921379 ], [ -5.013612, 54.905540 ], [ -4.991389, 54.925541 ], [ -5.051390, 55.023041 ], [ -5.013612, 55.131649 ], [ -4.841667, 55.275269 ], [ -4.819723, 55.330540 ], [ -4.613890, 55.486370 ], [ -4.646111, 55.534431 ], [ -4.695001, 55.604431 ], [ -4.908334, 55.691929 ], [ -4.917223, 55.704708 ], [ -4.859445, 55.746380 ], [ -4.881390, 55.932209 ], [ -4.786667, 55.959709 ], [ -4.525278, 55.929989 ], [ -4.765000, 56.007210 ], [ -4.833334, 56.080818 ], [ -4.825278, 56.027760 ], [ -4.775834, 55.979710 ], [ -4.848889, 55.982491 ], [ -4.873889, 56.049431 ], [ -4.746112, 56.199711 ], [ -4.819445, 56.147209 ], [ -4.858890, 56.107491 ], [ -4.886111, 56.116940 ], [ -4.891111, 56.169159 ], [ -4.918334, 56.164440 ], [ -4.895834, 55.986099 ], [ -4.978889, 55.866100 ], [ -5.040833, 55.874981 ], [ -5.124752, 55.978230 ], [ -5.077500, 55.913601 ], [ -5.091667, 55.899429 ], [ -5.184445, 55.965549 ], [ -5.238890, 55.893040 ], [ -5.202778, 55.833599 ], [ -5.303334, 55.850552 ], [ -5.335279, 55.989712 ], [ -5.202778, 56.117210 ], [ -4.975834, 56.245270 ], [ -5.286112, 56.084991 ], [ -5.377224, 56.005821 ], [ -5.445556, 56.022770 ], [ -5.421390, 55.914150 ], [ -5.318611, 55.786652 ], [ -5.383889, 55.747761 ], [ -5.486667, 55.643040 ], [ -5.509723, 55.484711 ], [ -5.587223, 55.417488 ], [ -5.518889, 55.368038 ], [ -5.567223, 55.316662 ], [ -5.752778, 55.291931 ], [ -5.786112, 55.301380 ], [ -5.795279, 55.386101 ], [ -5.721111, 55.436649 ], [ -5.680556, 55.673038 ], [ -5.536667, 55.786098 ], [ -5.632778, 55.779709 ], [ -5.670000, 55.838871 ], [ -5.573890, 55.928322 ], [ -5.676667, 55.883041 ], [ -5.690834, 55.924160 ], [ -5.570834, 56.037209 ], [ -5.669445, 55.981380 ], [ -5.694445, 55.933319 ], [ -5.710556, 55.960819 ], [ -5.584445, 56.087490 ], [ -5.511945, 56.181660 ], [ -5.554445, 56.171940 ], [ -5.557222, 56.230820 ], [ -5.492778, 56.253880 ], [ -5.538889, 56.259991 ], [ -5.593889, 56.249439 ], [ -5.569445, 56.331928 ], [ -5.446667, 56.446381 ], [ -5.220834, 56.435822 ], [ -5.069029, 56.557079 ], [ -5.203056, 56.454151 ], [ -5.396667, 56.455269 ], [ -5.414445, 56.500542 ], [ -5.458056, 56.468319 ], [ -5.428334, 56.528599 ], [ -5.282500, 56.544159 ], [ -5.411389, 56.543880 ], [ -5.303056, 56.664440 ], [ -4.994445, 56.710270 ], [ -5.210556, 56.701382 ], [ -5.226111, 56.732491 ], [ -5.121945, 56.812771 ], [ -5.481945, 56.610821 ], [ -5.650556, 56.502769 ], [ -5.768333, 56.531940 ], [ -5.930556, 56.569710 ], [ -6.009445, 56.621929 ], [ -5.993056, 56.647491 ], [ -5.567500, 56.694149 ], [ -6.147223, 56.680820 ], [ -6.209167, 56.684158 ], [ -6.235001, 56.710270 ], [ -6.152223, 56.755821 ], [ -5.785556, 56.790821 ], [ -5.856668, 56.813042 ], [ -5.793056, 56.838039 ], [ -5.738890, 56.888882 ], [ -5.876112, 56.911098 ], [ -5.829722, 57.000820 ], [ -5.732779, 57.019428 ], [ -5.649167, 56.972759 ], [ -5.675834, 57.035549 ], [ -5.784445, 57.049431 ], [ -5.781389, 57.074989 ], [ -5.654167, 57.123051 ], [ -5.400001, 57.105820 ], [ -5.667500, 57.142769 ], [ -5.675556, 57.171101 ], [ -5.637222, 57.244431 ], [ -5.536945, 57.269989 ], [ -5.450001, 57.221371 ], [ -5.475834, 57.258598 ], [ -5.508612, 57.272770 ], [ -5.457500, 57.319710 ], [ -5.702500, 57.280819 ], [ -5.690556, 57.340549 ], [ -5.520834, 57.359150 ], [ -5.452778, 57.396099 ], [ -5.458056, 57.421650 ], [ -5.553612, 57.357769 ], [ -5.636111, 57.369431 ], [ -5.606668, 57.388050 ], [ -5.620278, 57.414989 ], [ -5.740834, 57.346661 ], [ -5.783611, 57.341930 ], [ -5.825278, 57.383041 ], [ -5.851945, 57.538879 ], [ -5.839723, 57.572769 ], [ -5.706667, 57.539989 ], [ -5.635834, 57.525829 ], [ -5.511945, 57.531651 ], [ -5.521667, 57.549431 ], [ -5.715000, 57.578880 ], [ -5.810556, 57.637760 ], [ -5.785278, 57.695271 ], [ -5.688056, 57.687481 ], [ -5.708056, 57.728039 ], [ -5.805556, 57.743320 ], [ -5.805556, 57.848320 ], [ -5.716945, 57.869431 ], [ -5.668889, 57.825550 ], [ -5.661945, 57.786098 ], [ -5.585279, 57.781101 ], [ -5.580833, 57.829990 ], [ -5.650556, 57.888321 ], [ -5.611389, 57.923599 ], [ -5.472778, 57.848598 ], [ -5.425279, 57.902489 ], [ -5.222222, 57.843880 ], [ -5.338889, 57.920818 ], [ -5.077500, 57.828602 ], [ -5.135556, 57.885269 ], [ -5.220000, 57.919159 ], [ -5.186389, 57.941101 ], [ -5.263056, 57.971100 ] ] ] } ] } ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Iceland', 'density': '3.2', 'population': '319368' }, 'geometry': { 'type': 'MultiPolygon', 'coordinates': [ [ [ [ -21.380270, 65.956009 ], [ -21.279169, 65.894974 ], [ -21.288610, 65.839706 ], [ -21.350281, 65.789978 ], [ -21.475000, 65.764977 ], [ -21.339729, 65.739700 ], [ -21.438061, 65.688026 ], [ -21.589451, 65.688026 ], [ -21.670280, 65.760529 ], [ -21.770840, 65.767471 ], [ -21.664721, 65.676933 ], [ -21.648331, 65.651093 ], [ -21.406389, 65.632202 ], [ -21.436390, 65.592758 ], [ -21.475000, 65.556923 ], [ -21.333340, 65.599983 ], [ -21.299450, 65.582199 ], [ -21.303061, 65.530807 ], [ -21.478889, 65.444138 ], [ -21.212219, 65.437187 ], [ -21.144171, 65.238037 ], [ -21.098890, 65.162483 ], [ -21.069731, 65.194702 ], [ -21.105829, 65.285248 ], [ -21.068890, 65.338867 ], [ -21.097231, 65.436653 ], [ -21.081671, 65.456093 ], [ -20.916389, 65.341637 ], [ -20.988890, 65.468307 ], [ -20.945841, 65.574142 ], [ -20.682501, 65.691650 ], [ -20.626110, 65.676361 ], [ -20.645559, 65.546921 ], [ -20.613060, 65.584976 ], [ -20.569450, 65.576103 ], [ -20.547501, 65.510803 ], [ -20.493059, 65.487473 ], [ -20.446671, 65.494980 ], [ -20.430559, 65.542763 ], [ -20.527229, 65.570251 ], [ -20.410839, 65.592484 ], [ -20.395281, 65.524139 ], [ -20.323610, 65.648857 ], [ -20.263060, 65.723587 ], [ -20.316111, 65.808868 ], [ -20.309170, 65.856087 ], [ -20.446951, 66.024139 ], [ -20.420830, 66.085823 ], [ -20.094999, 66.124687 ], [ -19.869450, 65.891922 ], [ -19.705000, 65.864433 ], [ -19.647779, 65.756088 ], [ -19.559450, 65.733307 ], [ -19.548889, 65.762482 ], [ -19.451950, 65.725807 ], [ -19.398060, 65.785248 ], [ -19.391109, 65.836357 ], [ -19.513060, 65.951920 ], [ -19.418329, 65.999153 ], [ -19.456390, 66.048859 ], [ -19.344721, 66.083862 ], [ -19.055559, 66.066650 ], [ -19.108330, 66.106644 ], [ -19.069731, 66.159973 ], [ -18.958611, 66.189148 ], [ -18.910280, 66.182480 ], [ -18.916950, 66.145248 ], [ -18.865841, 66.199982 ], [ -18.784451, 66.191093 ], [ -18.805559, 66.139420 ], [ -18.698610, 66.167480 ], [ -18.626110, 66.132477 ], [ -18.662220, 66.086639 ], [ -18.567780, 66.091919 ], [ -18.521111, 66.028030 ], [ -18.540279, 65.972748 ], [ -18.289450, 65.910812 ], [ -18.180559, 65.784416 ], [ -18.133610, 65.704697 ], [ -18.069450, 65.643311 ], [ -18.062780, 65.686081 ], [ -18.103889, 65.758873 ], [ -18.070280, 65.838318 ], [ -18.145281, 65.922760 ], [ -18.205561, 65.921921 ], [ -18.315559, 66.056641 ], [ -18.333059, 66.151917 ], [ -18.210560, 66.173027 ], [ -17.820841, 66.112198 ], [ -17.559719, 65.950813 ], [ -17.551941, 65.973038 ], [ -17.438339, 65.996368 ], [ -17.412220, 65.957748 ], [ -17.358330, 66.094704 ], [ -17.259171, 66.127472 ], [ -17.271391, 66.160538 ], [ -17.103609, 66.212753 ], [ -16.968889, 66.185532 ], [ -16.918329, 66.118874 ], [ -16.724171, 66.146362 ], [ -16.638340, 66.100250 ], [ -16.688610, 66.159416 ], [ -16.520559, 66.183029 ], [ -16.428341, 66.143044 ], [ -16.486389, 66.178864 ], [ -16.416950, 66.270813 ], [ -16.577499, 66.474983 ], [ -16.555559, 66.500809 ], [ -16.203060, 66.504433 ], [ -16.178341, 66.534416 ], [ -15.935280, 66.498032 ], [ -15.937780, 66.420532 ], [ -15.693330, 66.365807 ], [ -15.686110, 66.334137 ], [ -15.773060, 66.287750 ], [ -15.625280, 66.223862 ], [ -15.458610, 66.188309 ], [ -15.381940, 66.142761 ], [ -15.340830, 66.175537 ], [ -15.342220, 66.252762 ], [ -15.071670, 66.298859 ], [ -14.943890, 66.378860 ], [ -14.557530, 66.383331 ], [ -15.001110, 66.277206 ], [ -14.936390, 66.211639 ], [ -14.976950, 66.169693 ], [ -15.149170, 66.136093 ], [ -15.154170, 66.099136 ], [ -15.065560, 66.096077 ], [ -15.052500, 66.069977 ], [ -14.899720, 66.028870 ], [ -14.730830, 66.066093 ], [ -14.663330, 66.043587 ], [ -14.605830, 65.958038 ], [ -14.646950, 65.889420 ], [ -14.892220, 65.759140 ], [ -14.817780, 65.721359 ], [ -14.381940, 65.790817 ], [ -14.336940, 65.783043 ], [ -14.398060, 65.716919 ], [ -14.274720, 65.671371 ], [ -14.531110, 65.540817 ], [ -14.463060, 65.554138 ], [ -14.324320, 65.632782 ], [ -14.241950, 65.658310 ], [ -14.000280, 65.598862 ], [ -13.870280, 65.612198 ], [ -13.810830, 65.525253 ], [ -13.658330, 65.531647 ], [ -13.611670, 65.509979 ], [ -13.675560, 65.373032 ], [ -13.833610, 65.363586 ], [ -13.726950, 65.334427 ], [ -13.745000, 65.312187 ], [ -13.968060, 65.276642 ], [ -13.698610, 65.303040 ], [ -13.568610, 65.266647 ], [ -13.639450, 65.219421 ], [ -14.035000, 65.193039 ], [ -13.622220, 65.192467 ], [ -13.665280, 65.151367 ], [ -13.684720, 65.115250 ], [ -13.625000, 65.096649 ], [ -13.535280, 65.162750 ], [ -13.512220, 65.159698 ], [ -13.497780, 65.073029 ], [ -13.616110, 64.992477 ], [ -13.779170, 64.987762 ], [ -14.010280, 65.073029 ], [ -14.009450, 65.057480 ], [ -14.097780, 65.030533 ], [ -14.217220, 65.021927 ], [ -13.922500, 65.012756 ], [ -13.708060, 64.932747 ], [ -13.741950, 64.912483 ], [ -14.051110, 64.933868 ], [ -13.942220, 64.903870 ], [ -13.802780, 64.882202 ], [ -13.765280, 64.861359 ], [ -13.826950, 64.823593 ], [ -13.955000, 64.839706 ], [ -13.900560, 64.818588 ], [ -13.833610, 64.799698 ], [ -14.030000, 64.789978 ], [ -14.019170, 64.757477 ], [ -14.014170, 64.726357 ], [ -14.243060, 64.688873 ], [ -14.388060, 64.758591 ], [ -14.480000, 64.791641 ], [ -14.341110, 64.683594 ], [ -14.271110, 64.672470 ], [ -14.280830, 64.645813 ], [ -14.449450, 64.642761 ], [ -14.405000, 64.627197 ], [ -14.433060, 64.593872 ], [ -14.557500, 64.567200 ], [ -14.496950, 64.546654 ], [ -14.345280, 64.605530 ], [ -14.539450, 64.406082 ], [ -14.746110, 64.383034 ], [ -14.568330, 64.411926 ], [ -14.701950, 64.429428 ], [ -14.906390, 64.315262 ], [ -14.943890, 64.323029 ], [ -14.952780, 64.301933 ], [ -14.891670, 64.301651 ], [ -14.913330, 64.272476 ], [ -15.001670, 64.257202 ], [ -15.166390, 64.282761 ], [ -15.220830, 64.261368 ], [ -15.273060, 64.326370 ], [ -15.278330, 64.295532 ], [ -15.330830, 64.303589 ], [ -15.371950, 64.363037 ], [ -15.383890, 64.277481 ], [ -15.709720, 64.183029 ], [ -15.991110, 64.141083 ], [ -15.990840, 64.126083 ], [ -16.149170, 64.056374 ], [ -16.443609, 63.912769 ], [ -16.781950, 63.841648 ], [ -16.783609, 63.802761 ], [ -16.885281, 63.864990 ], [ -16.911390, 63.796650 ], [ -16.966949, 63.784710 ], [ -16.940559, 63.891102 ], [ -16.966669, 63.917210 ], [ -17.017220, 63.827209 ], [ -16.986111, 63.794708 ], [ -17.565830, 63.760818 ], [ -17.626110, 63.745541 ], [ -17.716669, 63.773880 ], [ -17.723061, 63.746929 ], [ -17.870001, 63.731930 ], [ -17.930559, 63.661652 ], [ -17.798059, 63.669708 ], [ -17.821671, 63.638882 ], [ -17.962780, 63.624710 ], [ -17.857220, 63.605259 ], [ -17.928341, 63.530819 ], [ -18.164450, 63.470829 ], [ -18.219999, 63.469990 ], [ -18.178890, 63.505821 ], [ -18.307501, 63.546101 ], [ -18.262220, 63.457211 ], [ -18.868059, 63.402760 ], [ -19.521669, 63.484989 ], [ -19.893330, 63.538052 ], [ -20.170561, 63.536381 ], [ -20.338890, 63.613880 ], [ -20.446110, 63.667759 ], [ -20.501949, 63.702209 ], [ -20.436390, 63.640820 ], [ -20.539021, 63.731579 ], [ -20.493580, 63.777020 ], [ -20.311110, 63.729710 ], [ -20.443609, 63.783329 ], [ -20.402229, 63.823040 ], [ -20.561390, 63.751099 ], [ -20.564720, 63.708050 ], [ -20.769171, 63.767769 ], [ -20.686390, 63.798870 ], [ -20.672779, 63.842491 ], [ -20.714729, 63.829430 ], [ -20.746389, 63.798870 ], [ -20.978889, 63.826649 ], [ -21.174721, 63.875271 ], [ -21.194450, 63.922771 ], [ -21.046391, 63.939709 ], [ -21.195000, 63.954708 ], [ -21.300560, 63.918049 ], [ -21.206949, 63.886101 ], [ -21.365561, 63.849152 ], [ -21.639721, 63.822769 ], [ -21.762779, 63.869709 ], [ -22.282499, 63.850269 ], [ -22.683611, 63.803600 ], [ -22.698610, 63.854710 ], [ -22.703060, 63.910820 ], [ -22.631390, 63.948040 ], [ -22.728340, 63.968319 ], [ -22.725830, 64.063873 ], [ -22.688610, 64.084137 ], [ -22.589729, 64.044418 ], [ -22.547501, 63.977772 ], [ -21.976669, 64.066650 ], [ -22.047501, 64.097473 ], [ -21.973061, 64.111359 ], [ -21.947500, 64.098312 ], [ -21.919720, 64.123871 ], [ -22.039169, 64.152206 ], [ -21.930281, 64.156921 ], [ -21.716110, 64.176361 ], [ -21.775000, 64.212753 ], [ -21.926109, 64.228867 ], [ -21.754721, 64.342758 ], [ -21.454170, 64.394150 ], [ -21.732780, 64.386917 ], [ -21.931950, 64.306091 ], [ -22.092501, 64.309418 ], [ -22.033340, 64.344704 ], [ -21.984449, 64.378036 ], [ -22.041109, 64.396362 ], [ -21.978889, 64.500809 ], [ -21.702499, 64.608032 ], [ -21.514170, 64.647476 ], [ -21.670280, 64.658859 ], [ -21.988609, 64.526642 ], [ -22.028891, 64.521088 ], [ -22.073610, 64.509140 ], [ -22.087780, 64.468582 ], [ -22.250561, 64.483871 ], [ -22.243059, 64.568314 ], [ -22.341669, 64.552750 ], [ -22.361670, 64.599983 ], [ -22.440830, 64.660248 ], [ -22.323610, 64.672203 ], [ -22.190001, 64.733582 ], [ -22.403891, 64.668587 ], [ -22.392220, 64.694427 ], [ -22.322781, 64.743874 ], [ -22.327499, 64.759140 ], [ -22.439720, 64.779694 ], [ -22.450560, 64.809418 ], [ -22.650280, 64.771637 ], [ -22.667500, 64.794983 ], [ -22.777229, 64.796654 ], [ -23.131950, 64.798027 ], [ -23.291389, 64.826370 ], [ -23.565559, 64.814148 ], [ -23.663891, 64.737762 ], [ -23.932501, 64.749420 ], [ -24.057831, 64.889221 ], [ -23.833891, 64.927200 ], [ -23.687780, 64.892212 ], [ -23.313610, 64.947746 ], [ -23.263340, 64.922203 ], [ -23.222780, 64.943314 ], [ -23.239170, 64.990540 ], [ -23.190281, 65.015808 ], [ -23.083611, 65.005249 ], [ -23.160280, 64.951920 ], [ -23.110001, 64.918030 ], [ -23.111950, 64.958862 ], [ -22.698610, 65.059982 ], [ -22.674170, 64.998871 ], [ -22.577499, 64.975807 ], [ -22.625561, 65.007751 ], [ -22.529449, 65.050812 ], [ -21.791109, 65.047470 ], [ -21.844999, 65.067467 ], [ -21.729450, 65.157471 ], [ -21.734171, 65.196091 ], [ -21.808611, 65.203308 ], [ -21.964729, 65.126373 ], [ -22.070841, 65.104713 ], [ -22.531389, 65.185806 ], [ -22.441669, 65.246643 ], [ -22.194170, 65.321091 ], [ -21.815001, 65.433594 ], [ -22.107780, 65.525253 ], [ -22.178061, 65.442467 ], [ -22.279720, 65.440262 ], [ -22.384171, 65.476929 ], [ -22.366949, 65.503311 ], [ -22.177500, 65.535248 ], [ -22.108891, 65.594971 ], [ -22.325560, 65.537201 ], [ -22.495001, 65.504150 ], [ -22.555000, 65.616638 ], [ -22.536110, 65.571640 ], [ -22.573891, 65.531082 ], [ -22.678341, 65.526642 ], [ -22.716949, 65.581917 ], [ -22.683611, 65.622482 ], [ -22.763340, 65.625809 ], [ -22.719999, 65.501083 ], [ -22.887220, 65.541367 ], [ -22.795280, 65.589142 ], [ -22.850830, 65.613037 ], [ -22.860001, 65.584702 ], [ -22.912500, 65.564697 ], [ -22.951111, 65.607483 ], [ -23.014170, 65.542213 ], [ -23.150280, 65.547760 ], [ -23.160839, 65.579422 ], [ -23.196671, 65.562187 ], [ -23.194450, 65.504150 ], [ -23.229170, 65.482758 ], [ -23.652229, 65.467758 ], [ -23.722780, 65.417213 ], [ -23.907499, 65.403030 ], [ -24.000000, 65.444427 ], [ -24.054449, 65.471359 ], [ -24.333611, 65.493027 ], [ -24.509171, 65.489433 ], [ -24.514999, 65.513603 ], [ -24.376110, 65.559418 ], [ -24.333059, 65.629967 ], [ -24.157499, 65.608032 ], [ -23.892220, 65.518044 ], [ -23.806669, 65.532471 ], [ -24.013060, 65.594704 ], [ -24.083611, 65.647202 ], [ -23.803341, 65.607758 ], [ -24.126110, 65.775818 ], [ -24.105829, 65.806641 ], [ -23.575001, 65.676361 ], [ -23.553341, 65.641647 ], [ -23.561951, 65.605797 ], [ -23.466949, 65.640533 ], [ -23.296949, 65.669418 ], [ -23.525280, 65.697197 ], [ -23.516109, 65.724983 ], [ -23.233891, 65.772476 ], [ -23.521950, 65.750809 ], [ -23.743610, 65.776093 ], [ -23.870001, 65.863037 ], [ -23.865841, 65.892471 ], [ -23.821671, 65.918869 ], [ -23.315559, 65.859154 ], [ -23.740280, 65.964706 ], [ -23.816111, 66.009407 ], [ -23.801109, 66.056641 ], [ -23.686670, 66.060806 ], [ -23.523890, 66.048309 ], [ -23.658340, 66.104141 ], [ -23.662220, 66.117477 ], [ -23.393610, 66.094704 ], [ -23.595840, 66.138313 ], [ -23.583891, 66.158859 ], [ -23.371389, 66.191933 ], [ -23.142220, 66.138313 ], [ -23.107780, 66.076103 ], [ -23.038891, 66.106644 ], [ -22.981390, 66.078583 ], [ -22.980829, 66.022751 ], [ -22.965281, 66.014420 ], [ -22.930559, 66.047203 ], [ -22.845560, 66.019150 ], [ -22.878059, 65.974701 ], [ -22.813610, 65.997757 ], [ -22.829720, 65.912201 ], [ -22.783340, 65.971649 ], [ -22.765280, 66.047203 ], [ -22.680281, 66.055252 ], [ -22.569450, 65.973312 ], [ -22.621389, 65.864433 ], [ -22.536390, 65.969971 ], [ -22.458611, 65.941650 ], [ -22.430000, 65.887192 ], [ -22.468060, 65.834137 ], [ -22.435841, 65.838867 ], [ -22.358610, 65.908043 ], [ -22.472780, 66.053307 ], [ -22.383341, 66.090813 ], [ -22.495001, 66.076370 ], [ -22.912220, 66.173576 ], [ -22.988890, 66.226639 ], [ -22.821951, 66.261093 ], [ -22.530560, 66.245796 ], [ -22.368340, 66.268311 ], [ -22.560841, 66.271927 ], [ -22.506390, 66.300537 ], [ -22.700560, 66.292480 ], [ -22.709169, 66.304703 ], [ -22.610001, 66.367203 ], [ -22.809719, 66.309418 ], [ -22.824450, 66.345261 ], [ -22.938610, 66.298576 ], [ -23.146111, 66.329697 ], [ -23.190281, 66.353317 ], [ -23.039450, 66.363586 ], [ -23.049721, 66.391083 ], [ -23.132231, 66.427200 ], [ -23.093889, 66.438873 ], [ -22.874170, 66.415817 ], [ -22.879999, 66.441650 ], [ -22.946390, 66.464981 ], [ -22.451670, 66.419144 ], [ -22.432501, 66.448029 ], [ -22.407780, 66.456650 ], [ -22.358061, 66.392761 ], [ -22.204439, 66.334976 ], [ -22.231951, 66.274406 ], [ -21.928341, 66.241638 ], [ -21.868059, 66.192467 ], [ -21.745001, 66.167480 ], [ -21.721670, 66.072479 ], [ -21.644171, 66.066650 ], [ -21.668610, 66.020248 ], [ -21.621950, 66.033859 ], [ -21.640280, 66.080544 ], [ -21.549999, 66.092758 ], [ -21.510830, 66.061371 ], [ -21.559170, 66.044693 ], [ -21.527781, 66.019150 ], [ -21.391670, 66.026093 ], [ -21.325001, 65.998032 ], [ -21.321671, 65.985527 ], [ -21.541389, 65.952187 ], [ -21.380270, 65.956009 ] ] ] ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Liechtenstein', 'density': '228.8', 'population': '35589' }, 'geometry': { 'type': 'MultiPolygon', 'coordinates': [ [ [ [ 9.475830, 47.058041 ], [ 9.511665, 47.096088 ], [ 9.484161, 47.192211 ], [ 9.540410, 47.266975 ], [ 9.547038, 47.256908 ], [ 9.554480, 47.255569 ], [ 9.563164, 47.250389 ], [ 9.575019, 47.249538 ], [ 9.572620, 47.245594 ], [ 9.567129, 47.237228 ], [ 9.560170, 47.233093 ], [ 9.554022, 47.227009 ], [ 9.563335, 47.222412 ], [ 9.572601, 47.221859 ], [ 9.579283, 47.214993 ], [ 9.582921, 47.207710 ], [ 9.582762, 47.199009 ], [ 9.578425, 47.192017 ], [ 9.574854, 47.185555 ], [ 9.572474, 47.177116 ], [ 9.575861, 47.167278 ], [ 9.584888, 47.168568 ], [ 9.594024, 47.166775 ], [ 9.599722, 47.159332 ], [ 9.606725, 47.155319 ], [ 9.615295, 47.152386 ], [ 9.623453, 47.152031 ], [ 9.628130, 47.143059 ], [ 9.630499, 47.137081 ], [ 9.637633, 47.128601 ], [ 9.634874, 47.120762 ], [ 9.633127, 47.113422 ], [ 9.638332, 47.105957 ], [ 9.640949, 47.097168 ], [ 9.633314, 47.090279 ], [ 9.629284, 47.083153 ], [ 9.622896, 47.078316 ], [ 9.617394, 47.071007 ], [ 9.611240, 47.064690 ], [ 9.605424, 47.057774 ], [ 9.601834, 47.049644 ], [ 9.475830, 47.058041 ] ] ] ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Norway', 'density': '15.8', 'population': '4799252' }, 'geometry': { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'Polygon', 'coordinates': [ [ [ 15.477780, 68.877762 ], [ 15.420280, 68.911087 ], [ 15.422780, 68.979424 ], [ 15.560280, 69.094704 ], [ 15.869440, 69.228317 ], [ 15.974720, 69.280807 ], [ 16.111940, 69.312759 ], [ 16.153891, 69.276093 ], [ 16.088610, 69.157761 ], [ 15.863890, 69.026093 ], [ 15.623890, 68.980530 ], [ 15.541940, 69.012192 ], [ 15.573060, 68.965813 ], [ 15.477780, 68.877762 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 19.901661, 70.053307 ], [ 19.770000, 70.065262 ], [ 19.680830, 70.193039 ], [ 19.581940, 70.256363 ], [ 19.673611, 70.287750 ], [ 19.803049, 70.173309 ], [ 19.838329, 70.168030 ], [ 19.868050, 70.210533 ], [ 19.939440, 70.189972 ], [ 19.929720, 70.164703 ], [ 20.154440, 70.114967 ], [ 19.901661, 70.053307 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 22.976110, 70.245796 ], [ 22.468611, 70.286636 ], [ 22.372499, 70.329697 ], [ 22.389441, 70.349983 ], [ 22.664440, 70.391373 ], [ 22.693331, 70.376648 ], [ 22.697781, 70.333862 ], [ 22.723610, 70.334137 ], [ 22.739170, 70.388870 ], [ 23.000549, 70.282761 ], [ 23.009159, 70.249420 ], [ 22.976110, 70.245796 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 8.319443, 63.660259 ], [ 8.269999, 63.678879 ], [ 8.786665, 63.811100 ], [ 8.826666, 63.716930 ], [ 8.774721, 63.692760 ], [ 8.319443, 63.660259 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 17.040831, 69.011368 ], [ 17.136110, 69.069702 ], [ 16.956110, 69.067749 ], [ 16.811661, 69.049698 ], [ 16.767500, 69.090263 ], [ 16.801390, 69.116364 ], [ 17.045280, 69.128860 ], [ 17.173889, 69.195824 ], [ 16.895550, 69.192467 ], [ 16.875830, 69.221359 ], [ 17.122780, 69.246368 ], [ 16.896660, 69.299698 ], [ 17.046671, 69.317467 ], [ 17.115829, 69.326103 ], [ 17.085550, 69.357193 ], [ 16.876110, 69.356087 ], [ 17.025551, 69.397751 ], [ 17.384720, 69.360809 ], [ 17.377769, 69.381088 ], [ 17.285271, 69.410812 ], [ 17.480829, 69.419693 ], [ 17.481670, 69.430252 ], [ 17.261110, 69.444427 ], [ 17.186939, 69.490807 ], [ 17.212780, 69.500259 ], [ 17.379721, 69.473587 ], [ 17.301670, 69.526093 ], [ 17.401939, 69.523033 ], [ 17.590000, 69.455261 ], [ 17.610830, 69.474701 ], [ 17.459440, 69.564697 ], [ 17.469170, 69.597748 ], [ 17.538610, 69.580811 ], [ 17.625549, 69.503036 ], [ 17.696390, 69.512756 ], [ 17.652220, 69.588593 ], [ 17.693050, 69.594971 ], [ 17.747780, 69.538589 ], [ 17.829439, 69.588028 ], [ 17.888611, 69.547470 ], [ 17.822500, 69.461357 ], [ 17.845551, 69.444702 ], [ 17.948330, 69.522751 ], [ 18.053049, 69.490807 ], [ 17.943050, 69.426086 ], [ 18.002781, 69.404984 ], [ 18.019720, 69.441650 ], [ 18.074169, 69.430817 ], [ 18.100830, 69.358032 ], [ 17.917500, 69.325531 ], [ 17.921110, 69.286636 ], [ 17.968611, 69.256638 ], [ 17.875830, 69.239700 ], [ 18.005550, 69.196373 ], [ 17.901390, 69.168030 ], [ 17.485279, 69.151093 ], [ 17.525829, 69.195534 ], [ 17.469440, 69.200256 ], [ 17.173330, 69.066650 ], [ 17.186939, 69.044693 ], [ 17.201389, 69.023857 ], [ 17.040831, 69.011368 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 13.489440, 68.043587 ], [ 13.449720, 68.067467 ], [ 13.587220, 68.154419 ], [ 13.483060, 68.181091 ], [ 13.633330, 68.211357 ], [ 13.514440, 68.234703 ], [ 13.659720, 68.286362 ], [ 14.094170, 68.258034 ], [ 14.119440, 68.224426 ], [ 13.919170, 68.164978 ], [ 13.775280, 68.153030 ], [ 13.847500, 68.126923 ], [ 13.844720, 68.108307 ], [ 13.685560, 68.061920 ], [ 13.594720, 68.121368 ], [ 13.555280, 68.083313 ], [ 13.489440, 68.043587 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 19.084440, 69.801086 ], [ 18.955280, 69.870247 ], [ 18.738050, 69.920807 ], [ 18.721109, 69.939972 ], [ 18.791389, 69.954422 ], [ 18.931110, 69.962753 ], [ 18.853331, 69.977203 ], [ 18.829170, 70.000259 ], [ 19.025551, 70.036926 ], [ 19.071390, 70.012482 ], [ 19.117220, 70.024139 ], [ 19.063610, 70.068314 ], [ 19.316389, 70.081917 ], [ 19.288891, 70.040817 ], [ 19.394171, 69.988861 ], [ 19.486940, 70.047760 ], [ 19.561661, 70.048027 ], [ 19.571659, 69.994141 ], [ 19.651939, 70.020248 ], [ 19.691940, 69.994713 ], [ 19.681391, 69.975807 ], [ 19.430000, 69.862762 ], [ 19.395000, 69.827759 ], [ 19.084440, 69.801086 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 20.593889, 70.043587 ], [ 20.593889, 70.098862 ], [ 20.467501, 70.059143 ], [ 20.398331, 70.079147 ], [ 20.401100, 70.146362 ], [ 20.430000, 70.184143 ], [ 20.577770, 70.231087 ], [ 20.752501, 70.234154 ], [ 20.823610, 70.208862 ], [ 20.825830, 70.181641 ], [ 20.770830, 70.116089 ], [ 20.794720, 70.059692 ], [ 20.593889, 70.043587 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 25.551941, 70.923859 ], [ 25.416660, 70.982193 ], [ 25.560829, 71.007202 ], [ 25.462780, 71.025253 ], [ 25.326111, 71.006638 ], [ 25.294439, 71.042213 ], [ 25.550280, 71.096916 ], [ 25.718611, 71.047760 ], [ 25.687500, 71.091370 ], [ 25.552219, 71.140259 ], [ 25.784719, 71.154694 ], [ 25.806660, 71.148323 ], [ 25.781940, 71.103317 ], [ 26.019440, 71.118317 ], [ 26.032221, 71.078873 ], [ 25.887501, 71.044983 ], [ 25.965830, 71.031082 ], [ 25.928329, 71.004433 ], [ 26.056110, 70.996643 ], [ 26.167500, 71.042763 ], [ 26.218889, 71.038589 ], [ 26.200279, 71.005249 ], [ 25.833330, 70.958313 ], [ 25.738331, 70.974983 ], [ 25.741110, 70.947746 ], [ 25.551941, 70.923859 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 22.175280, 70.466637 ], [ 22.138330, 70.477753 ], [ 22.238890, 70.577477 ], [ 22.330280, 70.610809 ], [ 22.022779, 70.629433 ], [ 21.951389, 70.640808 ], [ 21.960550, 70.657761 ], [ 22.231939, 70.632477 ], [ 22.240280, 70.664429 ], [ 22.412220, 70.624420 ], [ 22.373051, 70.690811 ], [ 22.399170, 70.711639 ], [ 22.481110, 70.672470 ], [ 22.520830, 70.711906 ], [ 22.656111, 70.683594 ], [ 22.592779, 70.644417 ], [ 22.805269, 70.640533 ], [ 22.762220, 70.706093 ], [ 22.717779, 70.736359 ], [ 22.805550, 70.760246 ], [ 22.963610, 70.658859 ], [ 23.174440, 70.728317 ], [ 23.070271, 70.803864 ], [ 23.163059, 70.822746 ], [ 23.282780, 70.771927 ], [ 23.348049, 70.789139 ], [ 23.314159, 70.853867 ], [ 23.431660, 70.831093 ], [ 23.481939, 70.791924 ], [ 23.390270, 70.781082 ], [ 23.454439, 70.764687 ], [ 23.252781, 70.691093 ], [ 23.060280, 70.624969 ], [ 23.116659, 70.603027 ], [ 23.077221, 70.578033 ], [ 22.992220, 70.599426 ], [ 23.009720, 70.573029 ], [ 22.784161, 70.519699 ], [ 22.656389, 70.563873 ], [ 22.572781, 70.498306 ], [ 22.505280, 70.528870 ], [ 22.340549, 70.490250 ], [ 22.290831, 70.499153 ], [ 22.310829, 70.529984 ], [ 22.269440, 70.529137 ], [ 22.175280, 70.466637 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 23.156389, 70.274406 ], [ 23.082781, 70.288857 ], [ 23.070271, 70.308868 ], [ 23.136391, 70.384140 ], [ 23.115549, 70.393593 ], [ 23.053890, 70.340813 ], [ 22.878611, 70.394150 ], [ 22.961670, 70.416092 ], [ 22.892500, 70.442200 ], [ 23.096390, 70.515533 ], [ 23.223049, 70.515533 ], [ 23.178610, 70.544693 ], [ 23.253889, 70.535812 ], [ 23.262779, 70.472473 ], [ 23.324169, 70.523857 ], [ 23.406670, 70.555252 ], [ 23.530001, 70.538040 ], [ 23.387779, 70.610260 ], [ 23.468330, 70.621643 ], [ 23.591940, 70.583038 ], [ 23.579170, 70.520248 ], [ 23.656940, 70.466370 ], [ 23.643890, 70.438309 ], [ 23.156389, 70.274406 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 8.307499, 63.438320 ], [ 8.282776, 63.446659 ], [ 8.287498, 63.489429 ], [ 8.431944, 63.556660 ], [ 8.716944, 63.560822 ], [ 8.547222, 63.597759 ], [ 8.801388, 63.639149 ], [ 8.971109, 63.653599 ], [ 8.974998, 63.590549 ], [ 9.167776, 63.567760 ], [ 9.143888, 63.550819 ], [ 8.786943, 63.476940 ], [ 8.307499, 63.438320 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 23.749439, 70.522202 ], [ 23.645830, 70.593582 ], [ 23.691389, 70.662483 ], [ 23.632771, 70.690536 ], [ 23.698059, 70.744713 ], [ 23.826389, 70.744141 ], [ 23.823330, 70.698303 ], [ 24.030830, 70.686081 ], [ 24.125830, 70.615250 ], [ 24.105551, 70.587196 ], [ 23.952770, 70.522476 ], [ 23.749439, 70.522202 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 8.093054, 63.327209 ], [ 7.970277, 63.337769 ], [ 7.778333, 63.405819 ], [ 7.988055, 63.466930 ], [ 8.091665, 63.466648 ], [ 8.183611, 63.386101 ], [ 8.093054, 63.327209 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 12.063060, 65.209976 ], [ 12.121670, 65.357483 ], [ 12.186670, 65.347198 ], [ 12.186110, 65.379967 ], [ 12.168890, 65.397751 ], [ 12.321660, 65.485260 ], [ 12.213890, 65.483307 ], [ 12.244720, 65.566933 ], [ 12.282500, 65.573868 ], [ 12.502780, 65.391922 ], [ 12.446660, 65.365540 ], [ 12.212500, 65.325531 ], [ 12.229440, 65.292480 ], [ 12.188060, 65.245529 ], [ 12.063060, 65.209976 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 14.210550, 68.166924 ], [ 14.201940, 68.200256 ], [ 14.330280, 68.260803 ], [ 14.295000, 68.281082 ], [ 14.317220, 68.315262 ], [ 14.483060, 68.295807 ], [ 14.483610, 68.328033 ], [ 14.383890, 68.367203 ], [ 14.639720, 68.425537 ], [ 14.695830, 68.374969 ], [ 14.706390, 68.422470 ], [ 14.785280, 68.424698 ], [ 14.828050, 68.400253 ], [ 14.752220, 68.351639 ], [ 14.878610, 68.373032 ], [ 14.895830, 68.428864 ], [ 15.158610, 68.452477 ], [ 15.114170, 68.411087 ], [ 14.781940, 68.260246 ], [ 14.721390, 68.251923 ], [ 14.738610, 68.331650 ], [ 14.696940, 68.316360 ], [ 14.692780, 68.281647 ], [ 14.624720, 68.258591 ], [ 14.669720, 68.246368 ], [ 14.383610, 68.179703 ], [ 14.210550, 68.166924 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 14.985000, 68.263031 ], [ 15.000000, 68.303040 ], [ 15.229440, 68.449692 ], [ 15.335830, 68.485260 ], [ 15.181670, 68.522202 ], [ 15.222780, 68.560532 ], [ 15.451940, 68.552467 ], [ 15.438060, 68.615807 ], [ 15.631940, 68.605797 ], [ 15.458330, 68.656921 ], [ 15.435560, 68.703873 ], [ 15.451670, 68.729980 ], [ 15.713610, 68.698593 ], [ 15.645550, 68.739151 ], [ 15.509160, 68.736359 ], [ 15.454720, 68.756927 ], [ 15.459440, 68.808296 ], [ 15.638610, 68.818039 ], [ 15.553610, 68.843033 ], [ 15.569170, 68.878036 ], [ 15.636110, 68.946640 ], [ 15.886940, 68.963593 ], [ 15.911660, 68.951920 ], [ 15.875830, 68.792213 ], [ 15.763330, 68.732758 ], [ 15.939720, 68.785538 ], [ 15.984440, 68.744980 ], [ 15.863890, 68.646927 ], [ 15.773610, 68.626373 ], [ 15.739440, 68.526093 ], [ 15.808610, 68.554428 ], [ 15.812500, 68.606644 ], [ 15.976390, 68.665817 ], [ 16.073330, 68.633591 ], [ 16.083050, 68.677467 ], [ 16.037781, 68.696373 ], [ 16.067221, 68.727753 ], [ 16.203609, 68.729980 ], [ 16.206390, 68.754967 ], [ 16.096390, 68.792763 ], [ 16.087219, 68.813873 ], [ 16.178890, 68.851639 ], [ 16.292770, 68.837479 ], [ 16.243050, 68.898590 ], [ 16.553329, 68.821640 ], [ 16.492500, 68.787750 ], [ 16.555830, 68.773857 ], [ 16.528610, 68.721077 ], [ 16.573610, 68.702187 ], [ 16.507500, 68.557480 ], [ 16.099440, 68.534149 ], [ 15.960280, 68.380814 ], [ 15.883330, 68.362198 ], [ 15.869720, 68.399406 ], [ 15.864440, 68.462196 ], [ 15.855550, 68.431923 ], [ 15.778610, 68.434418 ], [ 15.599720, 68.307480 ], [ 15.426110, 68.333588 ], [ 15.335000, 68.326103 ], [ 15.340830, 68.343872 ], [ 15.611390, 68.473312 ], [ 15.542220, 68.507477 ], [ 15.559170, 68.472198 ], [ 14.985000, 68.263031 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 5.549999, 60.431381 ], [ 5.490555, 60.438599 ], [ 5.331666, 60.537491 ], [ 5.689166, 60.674431 ], [ 5.681666, 60.472759 ], [ 5.549999, 60.431381 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 18.190550, 69.529984 ], [ 17.999439, 69.583313 ], [ 18.031940, 69.627762 ], [ 18.268610, 69.619141 ], [ 18.320000, 69.609154 ], [ 18.399719, 69.636093 ], [ 18.291941, 69.632751 ], [ 18.187771, 69.701370 ], [ 18.632219, 69.689697 ], [ 18.351669, 69.723312 ], [ 18.342501, 69.782761 ], [ 18.476940, 69.776917 ], [ 18.484440, 69.744423 ], [ 18.546391, 69.796921 ], [ 18.650000, 69.799423 ], [ 18.646391, 69.726357 ], [ 18.709721, 69.684143 ], [ 18.784439, 69.773590 ], [ 18.661940, 69.861076 ], [ 18.693050, 69.884407 ], [ 18.995831, 69.824982 ], [ 19.057779, 69.787201 ], [ 19.059719, 69.759407 ], [ 18.794170, 69.671921 ], [ 18.789721, 69.629433 ], [ 18.846390, 69.603867 ], [ 18.762220, 69.562759 ], [ 18.190550, 69.529984 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 15.059170, 68.572479 ], [ 14.810560, 68.616928 ], [ 14.965560, 68.661362 ], [ 15.157780, 68.694977 ], [ 15.150000, 68.749153 ], [ 14.996670, 68.761917 ], [ 15.066110, 68.743874 ], [ 14.996390, 68.698303 ], [ 14.678330, 68.707474 ], [ 14.620280, 68.622757 ], [ 14.448610, 68.604141 ], [ 14.408610, 68.635246 ], [ 14.371110, 68.683594 ], [ 14.539160, 68.731918 ], [ 14.438610, 68.753860 ], [ 14.520000, 68.801361 ], [ 14.551390, 68.798576 ], [ 14.562780, 68.748581 ], [ 14.642780, 68.784973 ], [ 14.607780, 68.799973 ], [ 14.621670, 68.823303 ], [ 14.676670, 68.825256 ], [ 14.673610, 68.758591 ], [ 14.902220, 68.754433 ], [ 14.950550, 68.806091 ], [ 14.905280, 68.841919 ], [ 14.951670, 68.860527 ], [ 15.001390, 68.796371 ], [ 15.039720, 68.847473 ], [ 15.148610, 68.812187 ], [ 15.119170, 68.855263 ], [ 15.011670, 68.941360 ], [ 15.011670, 68.970810 ], [ 15.087780, 69.008034 ], [ 15.144440, 69.008324 ], [ 15.238610, 68.908310 ], [ 15.293050, 68.912201 ], [ 15.237780, 68.823868 ], [ 15.375280, 68.849426 ], [ 15.356390, 68.803864 ], [ 15.273890, 68.758034 ], [ 15.368610, 68.740250 ], [ 15.401390, 68.718872 ], [ 15.395830, 68.676651 ], [ 15.059170, 68.572479 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 28.015240, 70.069366 ], [ 28.133610, 70.082474 ], [ 28.232220, 70.165527 ], [ 28.197220, 70.259979 ], [ 28.246111, 70.412201 ], [ 28.322500, 70.436371 ], [ 28.331940, 70.474136 ], [ 28.454439, 70.488861 ], [ 28.466110, 70.453873 ], [ 28.509159, 70.444138 ], [ 28.556660, 70.504967 ], [ 28.395000, 70.547470 ], [ 28.509159, 70.675262 ], [ 28.626110, 70.677467 ], [ 28.522221, 70.720810 ], [ 28.674440, 70.814972 ], [ 28.853889, 70.880539 ], [ 29.100559, 70.873306 ], [ 29.400551, 70.774979 ], [ 29.296659, 70.740540 ], [ 29.330000, 70.707474 ], [ 29.452221, 70.694427 ], [ 29.677219, 70.743027 ], [ 29.781660, 70.731644 ], [ 29.776661, 70.674149 ], [ 29.738890, 70.647476 ], [ 29.689440, 70.613586 ], [ 29.835550, 70.635529 ], [ 29.967220, 70.706360 ], [ 30.101940, 70.709137 ], [ 30.202770, 70.669983 ], [ 30.099440, 70.640533 ], [ 30.338329, 70.605530 ], [ 30.341660, 70.591370 ], [ 30.152769, 70.528587 ], [ 30.449440, 70.556374 ], [ 30.597219, 70.537750 ], [ 30.805269, 70.409416 ], [ 30.943890, 70.449692 ], [ 31.064159, 70.361649 ], [ 31.015551, 70.333038 ], [ 31.045561, 70.311081 ], [ 31.063330, 70.280258 ], [ 30.523050, 70.240540 ], [ 30.350000, 70.168030 ], [ 30.384720, 70.147476 ], [ 30.343611, 70.121643 ], [ 30.143610, 70.085533 ], [ 30.157499, 70.066360 ], [ 29.780550, 70.066933 ], [ 28.731939, 70.177467 ], [ 28.594721, 70.163857 ], [ 28.753889, 70.156372 ], [ 28.612499, 70.107758 ], [ 28.743891, 70.097748 ], [ 29.684170, 69.966919 ], [ 29.405270, 69.868027 ], [ 29.422779, 69.852753 ], [ 29.536390, 69.909416 ], [ 29.732220, 69.909698 ], [ 29.767460, 69.833023 ], [ 29.523890, 69.702187 ], [ 29.522499, 69.682213 ], [ 29.499720, 69.657204 ], [ 29.664721, 69.731644 ], [ 30.064159, 69.768044 ], [ 29.958879, 69.711639 ], [ 29.941669, 69.686653 ], [ 30.072220, 69.739151 ], [ 30.121111, 69.699982 ], [ 30.188890, 69.692467 ], [ 30.114441, 69.754967 ], [ 30.206940, 69.766083 ], [ 30.206390, 69.785812 ], [ 30.158051, 69.805252 ], [ 30.178049, 69.877197 ], [ 30.308611, 69.878593 ], [ 30.402769, 69.822479 ], [ 30.418329, 69.700531 ], [ 30.396660, 69.679138 ], [ 30.411390, 69.665527 ], [ 30.452221, 69.688583 ], [ 30.450550, 69.773033 ], [ 30.468330, 69.814423 ], [ 30.649719, 69.809982 ], [ 30.724440, 69.768044 ], [ 30.784550, 69.791367 ], [ 30.858959, 69.789658 ], [ 30.954720, 69.681351 ], [ 30.950270, 69.603577 ], [ 30.910000, 69.548859 ], [ 30.796940, 69.530258 ], [ 30.511391, 69.549133 ], [ 30.188330, 69.666924 ], [ 30.083891, 69.656357 ], [ 30.072769, 69.631073 ], [ 30.142771, 69.628304 ], [ 30.176380, 69.566071 ], [ 30.029160, 69.476639 ], [ 29.309999, 69.315247 ], [ 29.309940, 69.299423 ], [ 29.309740, 69.235382 ], [ 29.309719, 69.227188 ], [ 29.230551, 69.101913 ], [ 29.087500, 69.033859 ], [ 29.011110, 69.034409 ], [ 28.964769, 69.051910 ], [ 28.786940, 69.119133 ], [ 28.781670, 69.149696 ], [ 28.826941, 69.238022 ], [ 29.285549, 69.463593 ], [ 29.294720, 69.495239 ], [ 29.098881, 69.708023 ], [ 28.379721, 69.827469 ], [ 28.094160, 69.938568 ], [ 28.015240, 70.069366 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 10.904170, 63.894161 ], [ 11.026670, 63.875542 ], [ 11.077220, 63.837490 ], [ 10.955830, 63.753880 ], [ 10.047780, 63.496101 ], [ 9.919722, 63.506378 ], [ 9.792221, 63.668598 ], [ 10.046670, 63.737209 ], [ 10.086110, 63.763882 ], [ 9.539444, 63.662769 ], [ 9.558054, 63.723598 ], [ 9.778889, 63.770260 ], [ 9.543888, 63.763599 ], [ 9.582499, 63.787491 ], [ 10.151110, 63.939430 ], [ 9.994444, 63.925541 ], [ 9.952221, 63.926929 ], [ 10.084440, 63.956661 ], [ 10.120000, 63.985271 ], [ 9.934444, 63.956100 ], [ 9.994444, 64.013603 ], [ 9.995832, 64.101639 ], [ 10.030000, 64.111649 ], [ 10.103050, 64.086090 ], [ 10.220280, 64.116364 ], [ 10.108610, 64.121094 ], [ 10.175280, 64.164139 ], [ 10.180560, 64.197197 ], [ 10.376670, 64.191650 ], [ 10.251110, 64.241638 ], [ 10.491660, 64.293297 ], [ 10.447220, 64.324142 ], [ 10.505280, 64.367477 ], [ 10.603610, 64.340263 ], [ 10.651940, 64.358032 ], [ 10.460550, 64.403030 ], [ 10.512220, 64.428307 ], [ 10.631110, 64.393044 ], [ 10.620000, 64.445534 ], [ 10.762220, 64.379967 ], [ 10.853050, 64.372482 ], [ 10.791390, 64.438026 ], [ 10.682780, 64.434692 ], [ 10.668330, 64.452187 ], [ 10.839440, 64.465530 ], [ 10.814440, 64.507751 ], [ 10.897220, 64.469971 ], [ 10.966390, 64.503036 ], [ 10.915550, 64.578583 ], [ 10.972220, 64.601357 ], [ 11.186390, 64.473038 ], [ 11.163060, 64.443039 ], [ 11.257500, 64.452477 ], [ 11.337780, 64.429703 ], [ 11.328050, 64.398323 ], [ 11.235550, 64.330544 ], [ 11.408610, 64.446091 ], [ 11.655550, 64.473312 ], [ 11.438610, 64.464981 ], [ 11.470550, 64.511093 ], [ 11.567780, 64.533310 ], [ 11.768330, 64.594147 ], [ 11.635000, 64.582474 ], [ 11.614720, 64.621094 ], [ 11.554440, 64.598862 ], [ 11.595000, 64.583862 ], [ 11.546390, 64.563026 ], [ 11.501670, 64.575531 ], [ 11.392500, 64.673309 ], [ 11.403050, 64.707474 ], [ 11.618060, 64.734154 ], [ 11.551670, 64.761642 ], [ 11.631940, 64.773033 ], [ 11.838610, 64.796921 ], [ 11.671110, 64.834702 ], [ 11.658050, 64.844971 ], [ 12.095280, 64.958313 ], [ 12.190550, 64.933868 ], [ 12.205830, 64.949692 ], [ 12.073890, 64.972748 ], [ 11.893610, 64.939697 ], [ 11.375830, 64.745796 ], [ 11.235550, 64.734154 ], [ 11.353890, 64.764420 ], [ 11.422220, 64.811371 ], [ 11.257780, 64.812759 ], [ 11.257220, 64.832199 ], [ 11.649170, 64.888603 ], [ 11.691670, 64.908577 ], [ 11.246390, 64.855797 ], [ 11.306390, 64.886642 ], [ 11.562780, 64.899979 ], [ 11.833610, 64.982193 ], [ 11.810280, 65.011368 ], [ 11.975000, 65.065811 ], [ 12.155830, 65.035248 ], [ 12.174170, 64.992477 ], [ 12.207500, 65.003036 ], [ 12.192780, 65.047203 ], [ 12.626110, 65.123032 ], [ 12.875560, 65.279137 ], [ 12.688060, 65.198593 ], [ 12.465830, 65.133324 ], [ 12.366660, 65.153313 ], [ 12.496940, 65.193314 ], [ 12.408610, 65.229980 ], [ 12.704440, 65.252472 ], [ 12.423610, 65.272202 ], [ 12.271670, 65.227203 ], [ 12.262220, 65.243874 ], [ 12.461110, 65.317200 ], [ 12.415550, 65.329971 ], [ 12.508610, 65.365807 ], [ 12.658890, 65.320251 ], [ 12.686670, 65.332474 ], [ 12.645280, 65.355797 ], [ 12.562500, 65.358307 ], [ 12.481110, 65.443314 ], [ 12.565000, 65.443863 ], [ 12.567780, 65.414429 ], [ 12.658890, 65.407204 ], [ 12.648890, 65.444138 ], [ 12.774720, 65.458313 ], [ 12.589170, 65.482483 ], [ 12.565830, 65.515533 ], [ 12.618060, 65.525253 ], [ 12.568050, 65.586357 ], [ 12.531110, 65.516922 ], [ 12.425550, 65.526917 ], [ 12.389170, 65.551933 ], [ 12.416390, 65.590813 ], [ 12.355550, 65.590263 ], [ 12.374170, 65.656647 ], [ 12.525000, 65.728027 ], [ 12.585550, 65.704147 ], [ 12.615280, 65.646637 ], [ 12.716110, 65.636093 ], [ 12.789440, 65.642761 ], [ 12.661390, 65.661926 ], [ 12.553610, 65.755539 ], [ 12.623610, 65.798576 ], [ 12.715830, 65.786636 ], [ 12.691110, 65.838318 ], [ 12.620280, 65.821640 ], [ 12.609170, 65.842758 ], [ 12.699170, 65.933029 ], [ 12.841390, 65.966087 ], [ 13.133890, 65.865807 ], [ 13.177780, 65.855797 ], [ 13.121940, 65.940262 ], [ 12.931940, 65.974983 ], [ 12.926940, 65.989151 ], [ 13.040280, 66.078033 ], [ 12.728330, 66.038589 ], [ 12.673890, 66.066933 ], [ 12.778610, 66.107758 ], [ 12.990280, 66.135529 ], [ 13.311940, 66.220810 ], [ 13.573890, 66.230530 ], [ 13.580550, 66.179977 ], [ 13.537780, 66.138870 ], [ 13.549720, 66.100540 ], [ 13.642770, 66.154694 ], [ 13.781110, 66.155807 ], [ 13.635000, 66.181923 ], [ 13.679720, 66.231918 ], [ 13.994440, 66.243027 ], [ 14.145830, 66.327477 ], [ 14.107500, 66.335533 ], [ 13.900830, 66.266922 ], [ 13.748060, 66.291367 ], [ 13.719440, 66.252197 ], [ 13.600280, 66.240540 ], [ 13.594440, 66.264137 ], [ 13.577780, 66.281921 ], [ 13.049440, 66.176361 ], [ 13.029440, 66.196373 ], [ 13.216110, 66.274979 ], [ 13.505280, 66.295807 ], [ 13.533050, 66.308594 ], [ 13.300280, 66.371918 ], [ 13.326940, 66.318039 ], [ 13.192220, 66.293297 ], [ 13.023330, 66.322197 ], [ 13.000280, 66.351357 ], [ 13.171390, 66.406082 ], [ 13.146390, 66.439697 ], [ 12.970000, 66.518311 ], [ 13.087220, 66.536636 ], [ 13.213610, 66.507202 ], [ 13.227220, 66.449982 ], [ 13.266670, 66.461357 ], [ 13.261390, 66.517471 ], [ 13.346390, 66.536926 ], [ 13.668330, 66.511642 ], [ 13.481110, 66.553864 ], [ 13.580550, 66.598862 ], [ 13.277500, 66.539978 ], [ 13.203050, 66.559418 ], [ 13.247780, 66.609421 ], [ 13.404720, 66.619423 ], [ 13.197220, 66.640533 ], [ 13.195830, 66.663040 ], [ 13.476110, 66.647751 ], [ 13.265550, 66.700256 ], [ 13.279170, 66.721077 ], [ 13.461110, 66.709137 ], [ 13.758050, 66.710533 ], [ 13.887780, 66.733307 ], [ 13.562140, 66.715042 ], [ 13.539720, 66.736923 ], [ 13.565280, 66.755539 ], [ 13.754440, 66.756088 ], [ 13.568330, 66.771362 ], [ 13.990830, 66.786926 ], [ 13.793330, 66.809418 ], [ 13.693050, 66.856369 ], [ 13.542220, 66.894150 ], [ 13.555830, 66.930252 ], [ 13.948060, 66.992752 ], [ 13.970000, 66.982193 ], [ 13.890270, 66.950813 ], [ 13.956940, 66.920258 ], [ 14.047220, 66.983307 ], [ 14.017780, 67.021637 ], [ 14.066110, 67.053864 ], [ 14.122500, 66.980263 ], [ 14.131390, 66.948303 ], [ 14.226940, 66.978027 ], [ 14.257500, 67.057480 ], [ 14.539160, 67.042763 ], [ 14.553050, 67.011093 ], [ 14.596670, 67.035812 ], [ 14.574440, 67.053589 ], [ 14.456670, 67.061920 ], [ 14.303330, 67.091370 ], [ 14.321110, 67.141922 ], [ 14.448330, 67.164429 ], [ 14.428890, 67.137756 ], [ 14.428330, 67.105797 ], [ 14.481670, 67.150818 ], [ 14.753050, 67.138603 ], [ 14.712500, 67.163040 ], [ 14.555560, 67.174423 ], [ 14.574170, 67.194702 ], [ 14.980000, 67.209427 ], [ 14.891390, 67.146088 ], [ 14.960000, 67.105263 ], [ 15.008610, 67.101929 ], [ 14.944720, 67.155533 ], [ 15.076110, 67.210251 ], [ 15.393050, 67.150818 ], [ 15.381670, 67.092758 ], [ 15.495550, 67.065262 ], [ 15.440000, 67.093872 ], [ 15.471940, 67.160812 ], [ 15.384440, 67.191360 ], [ 15.390000, 67.205544 ], [ 15.472780, 67.204971 ], [ 15.063890, 67.248032 ], [ 15.134720, 67.266647 ], [ 15.151940, 67.308868 ], [ 14.782780, 67.264977 ], [ 14.815000, 67.245247 ], [ 14.618330, 67.211906 ], [ 14.693890, 67.237762 ], [ 14.693890, 67.275528 ], [ 14.622780, 67.255539 ], [ 14.328610, 67.240540 ], [ 14.616390, 67.383034 ], [ 14.573060, 67.395248 ], [ 14.670280, 67.423859 ], [ 14.815280, 67.399696 ], [ 14.828610, 67.374969 ], [ 15.048330, 67.440811 ], [ 14.834720, 67.440262 ], [ 14.727500, 67.493317 ], [ 14.922500, 67.556091 ], [ 15.050550, 67.570824 ], [ 15.133050, 67.552200 ], [ 15.140550, 67.527206 ], [ 14.986940, 67.549423 ], [ 15.030830, 67.519699 ], [ 15.006940, 67.486649 ], [ 14.832220, 67.472473 ], [ 14.990830, 67.464706 ], [ 15.185830, 67.518860 ], [ 15.195000, 67.479141 ], [ 15.310280, 67.483032 ], [ 15.460280, 67.465530 ], [ 15.640000, 67.266373 ], [ 15.701670, 67.304977 ], [ 15.516670, 67.425537 ], [ 15.558050, 67.460251 ], [ 15.590280, 67.501373 ], [ 15.894440, 67.563309 ], [ 15.722780, 67.558296 ], [ 15.531940, 67.504967 ], [ 15.233610, 67.529984 ], [ 15.228610, 67.564148 ], [ 15.459440, 67.581093 ], [ 15.391670, 67.628311 ], [ 15.211390, 67.605797 ], [ 15.180560, 67.621368 ], [ 15.268330, 67.667480 ], [ 15.655280, 67.678307 ], [ 15.453610, 67.705544 ], [ 15.414440, 67.739967 ], [ 15.615550, 67.746643 ], [ 15.829720, 67.673576 ], [ 15.769720, 67.730530 ], [ 15.589170, 67.766647 ], [ 15.410280, 67.796082 ], [ 15.453330, 67.832748 ], [ 15.435560, 67.852478 ], [ 15.357780, 67.849136 ], [ 15.379170, 67.797203 ], [ 15.282220, 67.756088 ], [ 14.905280, 67.647751 ], [ 14.736670, 67.648323 ], [ 14.739720, 67.662201 ], [ 15.109170, 67.742752 ], [ 14.839440, 67.771637 ], [ 14.785550, 67.782471 ], [ 14.755550, 67.799973 ], [ 14.802220, 67.823868 ], [ 15.032500, 67.839706 ], [ 15.099160, 67.854424 ], [ 14.849440, 67.844421 ], [ 14.992220, 67.893044 ], [ 15.225280, 67.872757 ], [ 15.216110, 67.862198 ], [ 15.198890, 67.828583 ], [ 15.335000, 67.898323 ], [ 15.548890, 67.916092 ], [ 15.521110, 67.877472 ], [ 15.566940, 67.904137 ], [ 15.781670, 67.947479 ], [ 15.861670, 67.898857 ], [ 15.965280, 67.989700 ], [ 15.847780, 68.052467 ], [ 15.599440, 68.032761 ], [ 15.526390, 68.075256 ], [ 15.410830, 68.008034 ], [ 15.413890, 67.989151 ], [ 15.321660, 67.998581 ], [ 15.283050, 68.035538 ], [ 15.358890, 68.080544 ], [ 15.501940, 68.131638 ], [ 15.530280, 68.089706 ], [ 15.598890, 68.123032 ], [ 15.726660, 68.140808 ], [ 15.734440, 68.089142 ], [ 15.617500, 68.088028 ], [ 15.654440, 68.044693 ], [ 15.922500, 68.130814 ], [ 15.873890, 68.182747 ], [ 15.954170, 68.188583 ], [ 15.953330, 68.238586 ], [ 16.005831, 68.244423 ], [ 16.050550, 68.226089 ], [ 16.032221, 68.165817 ], [ 16.103609, 68.166092 ], [ 16.092501, 68.068039 ], [ 16.040831, 68.028587 ], [ 16.204720, 67.969704 ], [ 16.217220, 67.888031 ], [ 16.414440, 67.814697 ], [ 16.509720, 67.802200 ], [ 16.251659, 67.896637 ], [ 16.277220, 67.949142 ], [ 16.207500, 68.001648 ], [ 16.273890, 68.006363 ], [ 16.417500, 67.903030 ], [ 16.466660, 67.903870 ], [ 16.327770, 67.995796 ], [ 16.348890, 68.006638 ], [ 16.460279, 67.958588 ], [ 16.458050, 67.981087 ], [ 16.499161, 68.010803 ], [ 16.372499, 68.025253 ], [ 16.368610, 68.041641 ], [ 16.462200, 68.068771 ], [ 16.684999, 68.049973 ], [ 16.675831, 68.073303 ], [ 16.294439, 68.083313 ], [ 16.250830, 68.129433 ], [ 16.413610, 68.134140 ], [ 16.419439, 68.184143 ], [ 16.162781, 68.197197 ], [ 16.171940, 68.220261 ], [ 16.340269, 68.224136 ], [ 16.331671, 68.252197 ], [ 16.251659, 68.247757 ], [ 16.103331, 68.276917 ], [ 16.190001, 68.316360 ], [ 16.543890, 68.239700 ], [ 16.566111, 68.193039 ], [ 16.797779, 68.127197 ], [ 16.750549, 68.152763 ], [ 16.578051, 68.265533 ], [ 16.245279, 68.330261 ], [ 16.479441, 68.390533 ], [ 16.838051, 68.375259 ], [ 16.834440, 68.318039 ], [ 17.151390, 68.363861 ], [ 17.329439, 68.250526 ], [ 17.315001, 68.164429 ], [ 17.366940, 68.184692 ], [ 17.354719, 68.226639 ], [ 17.400829, 68.230530 ], [ 17.399170, 68.258873 ], [ 17.267780, 68.307747 ], [ 17.200830, 68.366928 ], [ 17.258610, 68.401917 ], [ 17.448891, 68.372757 ], [ 17.578051, 68.362473 ], [ 17.370001, 68.406082 ], [ 17.375830, 68.415527 ], [ 17.594370, 68.423340 ], [ 17.696369, 68.404449 ], [ 17.763889, 68.393860 ], [ 17.465000, 68.450813 ], [ 17.552780, 68.523857 ], [ 17.519171, 68.525253 ], [ 17.225559, 68.444977 ], [ 17.010559, 68.437187 ], [ 17.080000, 68.456917 ], [ 17.095831, 68.476639 ], [ 16.991659, 68.504150 ], [ 16.843611, 68.448593 ], [ 16.498890, 68.437469 ], [ 16.484440, 68.484970 ], [ 16.481390, 68.522202 ], [ 16.637220, 68.543030 ], [ 16.564159, 68.571907 ], [ 16.566111, 68.604713 ], [ 16.640551, 68.643044 ], [ 16.999161, 68.700256 ], [ 17.154440, 68.629150 ], [ 17.184999, 68.644417 ], [ 17.094999, 68.679703 ], [ 17.112221, 68.695251 ], [ 17.257500, 68.720543 ], [ 17.628330, 68.660812 ], [ 17.670561, 68.663857 ], [ 17.468439, 68.690292 ], [ 17.423889, 68.735809 ], [ 17.290279, 68.732758 ], [ 17.243050, 68.759697 ], [ 17.475830, 68.808868 ], [ 17.767780, 68.754700 ], [ 17.469999, 68.830261 ], [ 17.715269, 68.889977 ], [ 17.828329, 68.863037 ], [ 17.848330, 68.875259 ], [ 17.685829, 68.929138 ], [ 17.465830, 68.900253 ], [ 17.431660, 68.910812 ], [ 17.538891, 68.962479 ], [ 17.487780, 68.989967 ], [ 17.680269, 69.089981 ], [ 17.648609, 69.108032 ], [ 18.152220, 69.152206 ], [ 18.068050, 69.171371 ], [ 18.097771, 69.230263 ], [ 17.989441, 69.231644 ], [ 18.016390, 69.303864 ], [ 18.172220, 69.386368 ], [ 18.151661, 69.455811 ], [ 18.285000, 69.488861 ], [ 18.356390, 69.458862 ], [ 18.386391, 69.415527 ], [ 18.358061, 69.388870 ], [ 18.431110, 69.393311 ], [ 18.499720, 69.368317 ], [ 18.506109, 69.256927 ], [ 18.541660, 69.322197 ], [ 18.571110, 69.355797 ], [ 18.689720, 69.257751 ], [ 18.707220, 69.279419 ], [ 18.667219, 69.304977 ], [ 18.687771, 69.317200 ], [ 18.885830, 69.317467 ], [ 18.453890, 69.449142 ], [ 18.471661, 69.514420 ], [ 18.841940, 69.552750 ], [ 18.867769, 69.529984 ], [ 18.847219, 69.501373 ], [ 19.117220, 69.355263 ], [ 19.348890, 69.334702 ], [ 19.381109, 69.307747 ], [ 19.345280, 69.283577 ], [ 19.187771, 69.273033 ], [ 19.266670, 69.263870 ], [ 19.251110, 69.236923 ], [ 19.311661, 69.221359 ], [ 19.506941, 69.223862 ], [ 19.444719, 69.255814 ], [ 19.449720, 69.321907 ], [ 19.352501, 69.374687 ], [ 19.124439, 69.381363 ], [ 18.995831, 69.467194 ], [ 19.029440, 69.513603 ], [ 19.261391, 69.526642 ], [ 19.213610, 69.566360 ], [ 19.000271, 69.534416 ], [ 18.946110, 69.573868 ], [ 18.956671, 69.624420 ], [ 19.103331, 69.699692 ], [ 19.106390, 69.739700 ], [ 19.579720, 69.801086 ], [ 19.780279, 69.803307 ], [ 19.772779, 69.780533 ], [ 19.676390, 69.668297 ], [ 19.723610, 69.655533 ], [ 19.714161, 69.603317 ], [ 19.531389, 69.393593 ], [ 19.686939, 69.434418 ], [ 19.741940, 69.607758 ], [ 19.796940, 69.613312 ], [ 20.115549, 69.581093 ], [ 19.851110, 69.630814 ], [ 19.821110, 69.697479 ], [ 19.997499, 69.839706 ], [ 19.972771, 69.784698 ], [ 20.025000, 69.775528 ], [ 20.166660, 69.935806 ], [ 20.165831, 69.885529 ], [ 20.217501, 69.852478 ], [ 20.200550, 69.921371 ], [ 20.281940, 69.973862 ], [ 20.318331, 69.959702 ], [ 20.424999, 69.869423 ], [ 20.321390, 69.663589 ], [ 20.387501, 69.621094 ], [ 20.372780, 69.584702 ], [ 20.271111, 69.559143 ], [ 20.303049, 69.537483 ], [ 20.190550, 69.402206 ], [ 19.981939, 69.335533 ], [ 19.918329, 69.260246 ], [ 19.968050, 69.262482 ], [ 20.040550, 69.315262 ], [ 20.288610, 69.388313 ], [ 20.484440, 69.576920 ], [ 20.639441, 69.523857 ], [ 20.853609, 69.494713 ], [ 20.709440, 69.527763 ], [ 20.481390, 69.638870 ], [ 20.538891, 69.682480 ], [ 20.541389, 69.721077 ], [ 20.479719, 69.759140 ], [ 20.803890, 69.803589 ], [ 20.826111, 69.835533 ], [ 20.791389, 69.873032 ], [ 20.922501, 69.911362 ], [ 21.091660, 69.940262 ], [ 20.893610, 69.849426 ], [ 21.000000, 69.784149 ], [ 21.051670, 69.791924 ], [ 20.994440, 69.819427 ], [ 21.106939, 69.867477 ], [ 21.188890, 69.856369 ], [ 21.126390, 69.809418 ], [ 21.162500, 69.810532 ], [ 21.226110, 69.849136 ], [ 21.211670, 69.900528 ], [ 21.328051, 69.905807 ], [ 21.206110, 69.938026 ], [ 21.253330, 70.003036 ], [ 21.319441, 70.022202 ], [ 21.442780, 70.017471 ], [ 22.068609, 69.731369 ], [ 22.100830, 69.751648 ], [ 21.914440, 69.833313 ], [ 21.997219, 69.833313 ], [ 22.017220, 69.853317 ], [ 21.926941, 69.880814 ], [ 21.915279, 69.949692 ], [ 22.014999, 69.982193 ], [ 22.067499, 69.940262 ], [ 22.050831, 70.010803 ], [ 22.115549, 70.028870 ], [ 21.836390, 70.018860 ], [ 21.811661, 70.042763 ], [ 22.031670, 70.064148 ], [ 22.096661, 70.113312 ], [ 21.932220, 70.079422 ], [ 21.481390, 70.095543 ], [ 21.433331, 70.141647 ], [ 21.487780, 70.172760 ], [ 21.309719, 70.161362 ], [ 21.208950, 70.207352 ], [ 21.438330, 70.268044 ], [ 21.446110, 70.231087 ], [ 21.499161, 70.209976 ], [ 21.516380, 70.303864 ], [ 21.573891, 70.318588 ], [ 21.613609, 70.265533 ], [ 21.730000, 70.237473 ], [ 21.870831, 70.142197 ], [ 21.882219, 70.174149 ], [ 21.805000, 70.241089 ], [ 21.821110, 70.263870 ], [ 22.003611, 70.320824 ], [ 22.009159, 70.298859 ], [ 21.996670, 70.278030 ], [ 22.084160, 70.304703 ], [ 22.112221, 70.291092 ], [ 22.106939, 70.240807 ], [ 22.146391, 70.240250 ], [ 22.153891, 70.283043 ], [ 22.310280, 70.280533 ], [ 22.299160, 70.252197 ], [ 22.277220, 70.195824 ], [ 22.237780, 70.134140 ], [ 22.553610, 70.127197 ], [ 22.327499, 70.165527 ], [ 22.377220, 70.249687 ], [ 22.699440, 70.222748 ], [ 22.977501, 70.194138 ], [ 22.950279, 70.171921 ], [ 22.367500, 70.059692 ], [ 23.016670, 70.141647 ], [ 22.991659, 70.088318 ], [ 23.030279, 70.024406 ], [ 23.121111, 70.040253 ], [ 23.148050, 69.969147 ], [ 23.101110, 69.946373 ], [ 23.321110, 69.992203 ], [ 23.323330, 69.943863 ], [ 23.532780, 70.021637 ], [ 23.248610, 70.052750 ], [ 23.181940, 70.093307 ], [ 23.365829, 70.106644 ], [ 23.403610, 70.139137 ], [ 23.305269, 70.168869 ], [ 23.419720, 70.188309 ], [ 23.283051, 70.198593 ], [ 23.253330, 70.218307 ], [ 23.513611, 70.236923 ], [ 23.406940, 70.245247 ], [ 23.612499, 70.298576 ], [ 23.465000, 70.311371 ], [ 23.518610, 70.363586 ], [ 23.854160, 70.495247 ], [ 24.030279, 70.507202 ], [ 24.355829, 70.453873 ], [ 24.303329, 70.488861 ], [ 24.118050, 70.531921 ], [ 24.106670, 70.546082 ], [ 24.203609, 70.579147 ], [ 24.287781, 70.662483 ], [ 24.363050, 70.688583 ], [ 24.530001, 70.654419 ], [ 24.719721, 70.617203 ], [ 24.737780, 70.642471 ], [ 24.699169, 70.673859 ], [ 24.245550, 70.777206 ], [ 24.265551, 70.836090 ], [ 24.401939, 70.865540 ], [ 24.634720, 70.775818 ], [ 24.645830, 70.792763 ], [ 24.608061, 70.856369 ], [ 24.721939, 70.867752 ], [ 24.583330, 70.919983 ], [ 24.591940, 70.963028 ], [ 24.707500, 70.973587 ], [ 24.813049, 70.944138 ], [ 24.985279, 70.911087 ], [ 24.988050, 70.974426 ], [ 25.063330, 70.954147 ], [ 25.070000, 70.933868 ], [ 24.924440, 70.863312 ], [ 25.067221, 70.852203 ], [ 25.088329, 70.891922 ], [ 25.161110, 70.915817 ], [ 25.253330, 70.844704 ], [ 25.252781, 70.786087 ], [ 25.346390, 70.809143 ], [ 25.392780, 70.892761 ], [ 25.343611, 70.938583 ], [ 25.347219, 70.965813 ], [ 25.393610, 70.967484 ], [ 25.534439, 70.914429 ], [ 25.532499, 70.892761 ], [ 25.445551, 70.862473 ], [ 25.466940, 70.836090 ], [ 25.691669, 70.888313 ], [ 25.855551, 70.893860 ], [ 25.907780, 70.886642 ], [ 25.913330, 70.852478 ], [ 25.629169, 70.757477 ], [ 25.655279, 70.729713 ], [ 25.630280, 70.713028 ], [ 25.143049, 70.529984 ], [ 25.084999, 70.496368 ], [ 25.258890, 70.520538 ], [ 25.269720, 70.492477 ], [ 25.058050, 70.479424 ], [ 25.283890, 70.459427 ], [ 25.256660, 70.387756 ], [ 25.167219, 70.397202 ], [ 25.091391, 70.350540 ], [ 25.203890, 70.326637 ], [ 25.199720, 70.294693 ], [ 24.988050, 70.228867 ], [ 24.962500, 70.188309 ], [ 24.948610, 70.083313 ], [ 25.034719, 70.059692 ], [ 25.047501, 70.079971 ], [ 25.004999, 70.110527 ], [ 25.016390, 70.131638 ], [ 25.092501, 70.147202 ], [ 25.083330, 70.104141 ], [ 25.143610, 70.076370 ], [ 25.264999, 70.102203 ], [ 25.277500, 70.136093 ], [ 25.513611, 70.264137 ], [ 25.535000, 70.303589 ], [ 25.423889, 70.322479 ], [ 25.460550, 70.354424 ], [ 26.007771, 70.608582 ], [ 26.072500, 70.710533 ], [ 26.545561, 70.933029 ], [ 26.693880, 70.952477 ], [ 26.726391, 70.921371 ], [ 26.669720, 70.822479 ], [ 26.743330, 70.822746 ], [ 26.627781, 70.701370 ], [ 26.420280, 70.665527 ], [ 26.351391, 70.636093 ], [ 26.544720, 70.658577 ], [ 26.653610, 70.634407 ], [ 26.504999, 70.363037 ], [ 26.561110, 70.349136 ], [ 26.801941, 70.448303 ], [ 26.798330, 70.477203 ], [ 27.100281, 70.467194 ], [ 26.962780, 70.531372 ], [ 27.058331, 70.610527 ], [ 27.268610, 70.583038 ], [ 27.093330, 70.641922 ], [ 27.136391, 70.664978 ], [ 27.097500, 70.691933 ], [ 27.139721, 70.742203 ], [ 27.342220, 70.753036 ], [ 27.280550, 70.768593 ], [ 27.319160, 70.824417 ], [ 27.626390, 70.799423 ], [ 27.475830, 70.824417 ], [ 27.536390, 70.839706 ], [ 27.497499, 70.864433 ], [ 27.258329, 70.883034 ], [ 27.128889, 70.915253 ], [ 27.156111, 70.967484 ], [ 27.349159, 70.943314 ], [ 27.218330, 71.013031 ], [ 27.273050, 71.030258 ], [ 27.475559, 71.003860 ], [ 27.544720, 70.948593 ], [ 27.573610, 70.968307 ], [ 27.525000, 71.034973 ], [ 27.531111, 71.081917 ], [ 27.647499, 71.091637 ], [ 27.652220, 71.122482 ], [ 27.735830, 71.093307 ], [ 27.696110, 71.059418 ], [ 27.886110, 71.032204 ], [ 28.165279, 71.075256 ], [ 28.235550, 71.073303 ], [ 28.261391, 71.045258 ], [ 28.198059, 71.016922 ], [ 28.486940, 70.991089 ], [ 28.550831, 70.968307 ], [ 28.443609, 70.860260 ], [ 28.271111, 70.813026 ], [ 28.252220, 70.787483 ], [ 28.137779, 70.780258 ], [ 27.993050, 70.811653 ], [ 27.764999, 70.779419 ], [ 28.113609, 70.737762 ], [ 28.075001, 70.703033 ], [ 27.875549, 70.671921 ], [ 27.663891, 70.602478 ], [ 27.836941, 70.615250 ], [ 28.212500, 70.700531 ], [ 28.297779, 70.708038 ], [ 28.288891, 70.654694 ], [ 28.241940, 70.618874 ], [ 27.851669, 70.478867 ], [ 27.881390, 70.425537 ], [ 27.970831, 70.491364 ], [ 28.182220, 70.497757 ], [ 28.041109, 70.447746 ], [ 28.065550, 70.435532 ], [ 28.231939, 70.505814 ], [ 28.335550, 70.505539 ], [ 28.153891, 70.369423 ], [ 28.156111, 70.244141 ], [ 28.185829, 70.159416 ], [ 28.149170, 70.118874 ], [ 28.015240, 70.069366 ], [ 27.806660, 70.079422 ], [ 27.377220, 70.002762 ], [ 27.292500, 69.950531 ], [ 27.038610, 69.908310 ], [ 26.807770, 69.951920 ], [ 26.460550, 69.931923 ], [ 26.369720, 69.849983 ], [ 25.988880, 69.706627 ], [ 25.942221, 69.667473 ], [ 25.975830, 69.630249 ], [ 25.934441, 69.566360 ], [ 25.853050, 69.546921 ], [ 25.830549, 69.378304 ], [ 25.751110, 69.336090 ], [ 25.708611, 69.206627 ], [ 25.809160, 69.011368 ], [ 25.612221, 68.881348 ], [ 25.384720, 68.880524 ], [ 25.166660, 68.785797 ], [ 25.095831, 68.629143 ], [ 24.935551, 68.593857 ], [ 24.918329, 68.561897 ], [ 24.881390, 68.558578 ], [ 24.797779, 68.640808 ], [ 24.690269, 68.676361 ], [ 24.131390, 68.779968 ], [ 24.044720, 68.823868 ], [ 23.856380, 68.832474 ], [ 23.703609, 68.715263 ], [ 23.204161, 68.628571 ], [ 23.063881, 68.695511 ], [ 22.398331, 68.711090 ], [ 22.348610, 68.842468 ], [ 21.681940, 69.284698 ], [ 21.320829, 69.326080 ], [ 21.055000, 69.228577 ], [ 21.039721, 69.182457 ], [ 21.066111, 69.126358 ], [ 21.113050, 69.108017 ], [ 21.067499, 69.039139 ], [ 20.738331, 69.096359 ], [ 20.586090, 69.063141 ], [ 20.096939, 69.042191 ], [ 20.314720, 68.928299 ], [ 20.350269, 68.786636 ], [ 20.202499, 68.662193 ], [ 19.956381, 68.543854 ], [ 20.211109, 68.482193 ], [ 20.175831, 68.448013 ], [ 19.937771, 68.337479 ], [ 18.952221, 68.487747 ], [ 18.611940, 68.475250 ], [ 18.358049, 68.539139 ], [ 18.090830, 68.507751 ], [ 18.045830, 68.409409 ], [ 18.155270, 68.166077 ], [ 17.884159, 67.945511 ], [ 17.273609, 68.090530 ], [ 17.188330, 68.030258 ], [ 16.726940, 67.899139 ], [ 16.570271, 67.656921 ], [ 16.382500, 67.515533 ], [ 16.192221, 67.499977 ], [ 16.085831, 67.411636 ], [ 16.399160, 67.177750 ], [ 16.353889, 67.017754 ], [ 16.010000, 66.890808 ], [ 15.625830, 66.605797 ], [ 15.362780, 66.479973 ], [ 15.468050, 66.283859 ], [ 15.025280, 66.149979 ], [ 14.505000, 66.132462 ], [ 14.634720, 65.826920 ], [ 14.503890, 65.593307 ], [ 14.493050, 65.313583 ], [ 14.368890, 65.246628 ], [ 14.319440, 65.129959 ], [ 13.696940, 64.629410 ], [ 13.682220, 64.571091 ], [ 14.116390, 64.470520 ], [ 14.154720, 64.185791 ], [ 14.048930, 64.080170 ], [ 14.040500, 64.071747 ], [ 13.981660, 64.013031 ], [ 13.230000, 64.093033 ], [ 12.836660, 64.023033 ], [ 12.675000, 63.965542 ], [ 12.324720, 63.709431 ], [ 12.139440, 63.584148 ], [ 12.195000, 63.485260 ], [ 11.936390, 63.272209 ], [ 12.168610, 63.015820 ], [ 12.028890, 62.892490 ], [ 12.089440, 62.749432 ], [ 12.011940, 62.601379 ], [ 12.210000, 62.389980 ], [ 12.295830, 62.261662 ], [ 12.124440, 61.728588 ], [ 12.406670, 61.573318 ], [ 12.530000, 61.566090 ], [ 12.856110, 61.362492 ], [ 12.655000, 61.062481 ], [ 12.294160, 61.029430 ], [ 12.229160, 60.985260 ], [ 12.587500, 60.526649 ], [ 12.608050, 60.468590 ], [ 12.589720, 60.399151 ], [ 12.491110, 60.301380 ], [ 12.476940, 60.076382 ], [ 12.163050, 59.896931 ], [ 11.956940, 59.896931 ], [ 11.815280, 59.845821 ], [ 11.891110, 59.794708 ], [ 11.902780, 59.707760 ], [ 11.666110, 59.595821 ], [ 11.787180, 59.311871 ], [ 11.790830, 59.303310 ], [ 11.798330, 59.245258 ], [ 11.787480, 59.223660 ], [ 11.739720, 59.128590 ], [ 11.751110, 59.090260 ], [ 11.626660, 58.909149 ], [ 11.463050, 58.883598 ], [ 11.427780, 58.893040 ], [ 11.420290, 58.995998 ], [ 11.356110, 59.107208 ], [ 11.171390, 59.124981 ], [ 11.173610, 59.193321 ], [ 11.150280, 59.153320 ], [ 11.097780, 59.132488 ], [ 11.064170, 59.116650 ], [ 10.941940, 59.186378 ], [ 10.938890, 59.134430 ], [ 10.906110, 59.138599 ], [ 10.903610, 59.195541 ], [ 10.825000, 59.149429 ], [ 10.782500, 59.208881 ], [ 10.729170, 59.235538 ], [ 10.780830, 59.309990 ], [ 10.667500, 59.319149 ], [ 10.663610, 59.359440 ], [ 10.585830, 59.427761 ], [ 10.653610, 59.495819 ], [ 10.676390, 59.436939 ], [ 10.691670, 59.483879 ], [ 10.557780, 59.728600 ], [ 10.584440, 59.789989 ], [ 10.640280, 59.856659 ], [ 10.671940, 59.839710 ], [ 10.716110, 59.735821 ], [ 10.759440, 59.841930 ], [ 10.725830, 59.896648 ], [ 10.571390, 59.886379 ], [ 10.471670, 59.843319 ], [ 10.496940, 59.721931 ], [ 10.604440, 59.629711 ], [ 10.606940, 59.582489 ], [ 10.558050, 59.543049 ], [ 10.458330, 59.513050 ], [ 10.419440, 59.528599 ], [ 10.428330, 59.596371 ], [ 10.374720, 59.702770 ], [ 10.228610, 59.731380 ], [ 10.231390, 59.718601 ], [ 10.375000, 59.662491 ], [ 10.389720, 59.631378 ], [ 10.390000, 59.566929 ], [ 10.358330, 59.523041 ], [ 10.263890, 59.552761 ], [ 10.246940, 59.537769 ], [ 10.485000, 59.409710 ], [ 10.449720, 59.344711 ], [ 10.513610, 59.298599 ], [ 10.447220, 59.239712 ], [ 10.363890, 59.265270 ], [ 10.321110, 59.159161 ], [ 10.263610, 59.106659 ], [ 10.262220, 59.033871 ], [ 10.227220, 59.112770 ], [ 10.220830, 59.016930 ], [ 10.130830, 58.997490 ], [ 10.130830, 59.016102 ], [ 10.163060, 59.046650 ], [ 10.019170, 59.028599 ], [ 10.025830, 58.971661 ], [ 9.996387, 58.959431 ], [ 9.813332, 58.961929 ], [ 9.842777, 59.000542 ], [ 9.755278, 59.031380 ], [ 9.691944, 59.090260 ], [ 9.686943, 59.045551 ], [ 9.654722, 59.052212 ], [ 9.633888, 59.128601 ], [ 9.544167, 59.104988 ], [ 9.712221, 59.018600 ], [ 9.351110, 58.857491 ], [ 9.299721, 58.875271 ], [ 9.280554, 58.830540 ], [ 9.409443, 58.841381 ], [ 9.448332, 58.821381 ], [ 9.339998, 58.750820 ], [ 9.067221, 58.736370 ], [ 9.224165, 58.714161 ], [ 9.167776, 58.682491 ], [ 9.197222, 58.662209 ], [ 8.951387, 58.579151 ], [ 8.931110, 58.547211 ], [ 8.544998, 58.306099 ], [ 8.248055, 58.201931 ], [ 8.211111, 58.115551 ], [ 8.163055, 58.142208 ], [ 8.118055, 58.095268 ], [ 8.031944, 58.129162 ], [ 8.077499, 58.154991 ], [ 8.026110, 58.221100 ], [ 8.028332, 58.174709 ], [ 7.934722, 58.079430 ], [ 7.829166, 58.069988 ], [ 7.654722, 58.040272 ], [ 7.362778, 58.012760 ], [ 7.241944, 58.054989 ], [ 7.049166, 57.996101 ], [ 6.998055, 58.003319 ], [ 7.101944, 58.080269 ], [ 6.960555, 58.060822 ], [ 6.986944, 58.106930 ], [ 6.903610, 58.051102 ], [ 6.892777, 58.092770 ], [ 6.990277, 58.135540 ], [ 6.774444, 58.174160 ], [ 6.813611, 58.117210 ], [ 6.752500, 58.116940 ], [ 6.691388, 58.119709 ], [ 6.749444, 58.089710 ], [ 6.777222, 58.058601 ], [ 6.597777, 58.070271 ], [ 6.530833, 58.114159 ], [ 6.849166, 58.270821 ], [ 6.665277, 58.225552 ], [ 6.645632, 58.288509 ], [ 6.705000, 58.314430 ], [ 6.647778, 58.318878 ], [ 6.607778, 58.237770 ], [ 6.326666, 58.274429 ], [ 5.983333, 58.398880 ], [ 5.956944, 58.471661 ], [ 5.757222, 58.486660 ], [ 5.620832, 58.559711 ], [ 5.456278, 58.750648 ], [ 5.575277, 58.892769 ], [ 5.550278, 58.913879 ], [ 5.548055, 58.952492 ], [ 5.610833, 58.904430 ], [ 5.626111, 58.930271 ], [ 5.525277, 58.985271 ], [ 5.563333, 59.031101 ], [ 5.714722, 58.970829 ], [ 5.712777, 58.865822 ], [ 5.819722, 58.933601 ], [ 5.874999, 58.956928 ], [ 6.130278, 58.833881 ], [ 6.230277, 58.838329 ], [ 6.088055, 58.865822 ], [ 6.059444, 58.902489 ], [ 6.123610, 58.959991 ], [ 6.381389, 59.015820 ], [ 6.146388, 58.991100 ], [ 6.027499, 58.901932 ], [ 5.974166, 58.962212 ], [ 6.023611, 58.991940 ], [ 6.015277, 59.015541 ], [ 5.928333, 59.015541 ], [ 5.866388, 59.072208 ], [ 5.887221, 59.096371 ], [ 6.127777, 59.145550 ], [ 6.009444, 59.143040 ], [ 6.007222, 59.164440 ], [ 6.111388, 59.228600 ], [ 6.455277, 59.324989 ], [ 6.115833, 59.260818 ], [ 6.090278, 59.304150 ], [ 6.184999, 59.308601 ], [ 6.179444, 59.320541 ], [ 5.995555, 59.329708 ], [ 6.044999, 59.381649 ], [ 6.185833, 59.428322 ], [ 6.235555, 59.504990 ], [ 6.468888, 59.555271 ], [ 6.246666, 59.520550 ], [ 6.247222, 59.540539 ], [ 6.147499, 59.450821 ], [ 6.011389, 59.398319 ], [ 5.985277, 59.425819 ], [ 5.988889, 59.374710 ], [ 5.926110, 59.352772 ], [ 5.876944, 59.408871 ], [ 5.896667, 59.447208 ], [ 6.080000, 59.466099 ], [ 6.139999, 59.484711 ], [ 5.884444, 59.478321 ], [ 5.805277, 59.532490 ], [ 5.650555, 59.399429 ], [ 5.789444, 59.428879 ], [ 5.861944, 59.376930 ], [ 5.856667, 59.345539 ], [ 5.622499, 59.287209 ], [ 5.610000, 59.299992 ], [ 5.648611, 59.327209 ], [ 5.582500, 59.394711 ], [ 5.572499, 59.319988 ], [ 5.511110, 59.274990 ], [ 5.438611, 59.293598 ], [ 5.439444, 59.398880 ], [ 5.415000, 59.393879 ], [ 5.406944, 59.321098 ], [ 5.379444, 59.296101 ], [ 5.338055, 59.417488 ], [ 5.326666, 59.368038 ], [ 5.300277, 59.339710 ], [ 5.194722, 59.436378 ], [ 5.179722, 59.514431 ], [ 5.273333, 59.591930 ], [ 5.383333, 59.646381 ], [ 5.407777, 59.590820 ], [ 5.434722, 59.623322 ], [ 5.392777, 59.663319 ], [ 5.491944, 59.730820 ], [ 5.495832, 59.568600 ], [ 5.414721, 59.538319 ], [ 5.410832, 59.503319 ], [ 5.502500, 59.530540 ], [ 5.541666, 59.580540 ], [ 5.524166, 59.617489 ], [ 5.555555, 59.671940 ], [ 5.593888, 59.675270 ], [ 5.761110, 59.606380 ], [ 5.771388, 59.646648 ], [ 5.878055, 59.651100 ], [ 5.755278, 59.664150 ], [ 5.745832, 59.682491 ], [ 5.840278, 59.731380 ], [ 6.066667, 59.743881 ], [ 6.313055, 59.852772 ], [ 5.973332, 59.753040 ], [ 5.932500, 59.786930 ], [ 5.963888, 59.813042 ], [ 5.952499, 59.855259 ], [ 5.919167, 59.788601 ], [ 5.818889, 59.770260 ], [ 5.669722, 59.849991 ], [ 5.743610, 59.911652 ], [ 5.959999, 59.951649 ], [ 5.984166, 59.974430 ], [ 5.953610, 60.002769 ], [ 6.034166, 60.066929 ], [ 6.243055, 60.111370 ], [ 6.258888, 60.158600 ], [ 6.113610, 60.102211 ], [ 6.078055, 60.163052 ], [ 6.079721, 60.195271 ], [ 6.155555, 60.219711 ], [ 6.204720, 60.295551 ], [ 6.536666, 60.429710 ], [ 6.640555, 60.410259 ], [ 6.579721, 60.341648 ], [ 6.504444, 60.113602 ], [ 6.524444, 60.081928 ], [ 6.577499, 60.271381 ], [ 6.702222, 60.400269 ], [ 6.833888, 60.473598 ], [ 7.021667, 60.474709 ], [ 7.104444, 60.499149 ], [ 6.899444, 60.506100 ], [ 7.013611, 60.587490 ], [ 6.952499, 60.570820 ], [ 6.849999, 60.489712 ], [ 6.620555, 60.429440 ], [ 6.591110, 60.454430 ], [ 6.631389, 60.476101 ], [ 6.686666, 60.517208 ], [ 6.475555, 60.444439 ], [ 6.236111, 60.371929 ], [ 6.118610, 60.368038 ], [ 6.187778, 60.347759 ], [ 6.143332, 60.306099 ], [ 6.160277, 60.280819 ], [ 6.121111, 60.236931 ], [ 6.003333, 60.268040 ], [ 5.957500, 60.206379 ], [ 5.852777, 60.153599 ], [ 5.878611, 60.041660 ], [ 5.756666, 59.985821 ], [ 5.704721, 60.006939 ], [ 5.690555, 60.066380 ], [ 5.768611, 60.059711 ], [ 5.794722, 60.088871 ], [ 5.707500, 60.088600 ], [ 5.724444, 60.139992 ], [ 5.789721, 60.207489 ], [ 5.579166, 60.140270 ], [ 5.544444, 60.156101 ], [ 5.707500, 60.234711 ], [ 5.602500, 60.258041 ], [ 5.568333, 60.246380 ], [ 5.669722, 60.345539 ], [ 5.665833, 60.366379 ], [ 5.581388, 60.288319 ], [ 5.401667, 60.131939 ], [ 5.316388, 60.196930 ], [ 5.338611, 60.217770 ], [ 5.222777, 60.203880 ], [ 5.309999, 60.263050 ], [ 5.168056, 60.277210 ], [ 5.166389, 60.311100 ], [ 5.225277, 60.318321 ], [ 5.148611, 60.336102 ], [ 5.145000, 60.366379 ], [ 5.203888, 60.392208 ], [ 5.296944, 60.389149 ], [ 5.252500, 60.428051 ], [ 5.235833, 60.490822 ], [ 5.292777, 60.524990 ], [ 5.320555, 60.519161 ], [ 5.494444, 60.419430 ], [ 5.633611, 60.415272 ], [ 5.713611, 60.469990 ], [ 5.702777, 60.553600 ], [ 5.742222, 60.652760 ], [ 5.661944, 60.703320 ], [ 5.681944, 60.755821 ], [ 5.592500, 60.695820 ], [ 5.530277, 60.691380 ], [ 5.516110, 60.619991 ], [ 5.261389, 60.553051 ], [ 5.198610, 60.577492 ], [ 5.093333, 60.660549 ], [ 5.222777, 60.622761 ], [ 4.967500, 60.783039 ], [ 4.997222, 60.804710 ], [ 5.298055, 60.711651 ], [ 5.314722, 60.668598 ], [ 5.373888, 60.634430 ], [ 5.365555, 60.674431 ], [ 5.405833, 60.701931 ], [ 5.243610, 60.758041 ], [ 5.248333, 60.781940 ], [ 5.520833, 60.872211 ], [ 5.483889, 60.907211 ], [ 5.145555, 60.807770 ], [ 5.035555, 60.851650 ], [ 4.992777, 60.960270 ], [ 5.084167, 60.944439 ], [ 5.077222, 60.885269 ], [ 5.097777, 60.874710 ], [ 5.103889, 60.924160 ], [ 5.081388, 60.966648 ], [ 5.002500, 60.997490 ], [ 5.024166, 61.049992 ], [ 5.115555, 61.072769 ], [ 5.411944, 61.022209 ], [ 5.483055, 61.056660 ], [ 5.893888, 61.124149 ], [ 6.372222, 61.061939 ], [ 6.351944, 61.032211 ], [ 6.372222, 61.008320 ], [ 6.421944, 61.073040 ], [ 6.546944, 61.094711 ], [ 6.608611, 61.170818 ], [ 6.855000, 61.128040 ], [ 6.867222, 61.087769 ], [ 6.953610, 61.083050 ], [ 6.982222, 61.049709 ], [ 6.999166, 60.993320 ], [ 6.870832, 60.933880 ], [ 7.025000, 60.974152 ], [ 7.128333, 60.927490 ], [ 7.113889, 60.860271 ], [ 7.162777, 60.899429 ], [ 7.167500, 60.944149 ], [ 7.071944, 60.974709 ], [ 6.996666, 61.085270 ], [ 7.020000, 61.100552 ], [ 7.382777, 61.111660 ], [ 7.358611, 61.153320 ], [ 7.614166, 61.196930 ], [ 7.693333, 61.227489 ], [ 7.580832, 61.205269 ], [ 7.362778, 61.202770 ], [ 7.303888, 61.294430 ], [ 7.364166, 61.364990 ], [ 7.519444, 61.450260 ], [ 7.343055, 61.388321 ], [ 7.313333, 61.351379 ], [ 7.240277, 61.290821 ], [ 7.307221, 61.215549 ], [ 7.360555, 61.186378 ], [ 7.292222, 61.158039 ], [ 7.223888, 61.181099 ], [ 7.148611, 61.142769 ], [ 6.926666, 61.116940 ], [ 6.918611, 61.144989 ], [ 7.004444, 61.177490 ], [ 6.694444, 61.183041 ], [ 6.559722, 61.229431 ], [ 6.696666, 61.345829 ], [ 6.703610, 61.401371 ], [ 6.664166, 61.337769 ], [ 6.493055, 61.260269 ], [ 6.538055, 61.203880 ], [ 6.461111, 61.207211 ], [ 6.510555, 61.151371 ], [ 6.476666, 61.127491 ], [ 6.248610, 61.133320 ], [ 6.176389, 61.179150 ], [ 5.885555, 61.157490 ], [ 5.383055, 61.068878 ], [ 5.061388, 61.156940 ], [ 5.084722, 61.188881 ], [ 5.223611, 61.168880 ], [ 5.189166, 61.208050 ], [ 4.988055, 61.219440 ], [ 4.986111, 61.255821 ], [ 4.996388, 61.279148 ], [ 5.235555, 61.334709 ], [ 5.293888, 61.307491 ], [ 5.311388, 61.255550 ], [ 5.338888, 61.259991 ], [ 5.320277, 61.318050 ], [ 5.254722, 61.341930 ], [ 5.331388, 61.349709 ], [ 5.383611, 61.374149 ], [ 5.040555, 61.317760 ], [ 4.999722, 61.352772 ], [ 5.005833, 61.382488 ], [ 5.043056, 61.399151 ], [ 4.948889, 61.412769 ], [ 5.189166, 61.470539 ], [ 5.527499, 61.428600 ], [ 5.550555, 61.445541 ], [ 5.804999, 61.452770 ], [ 5.667222, 61.494160 ], [ 5.544444, 61.457211 ], [ 5.171389, 61.504429 ], [ 5.137500, 61.536098 ], [ 5.355833, 61.554440 ], [ 5.223611, 61.569149 ], [ 5.160277, 61.594151 ], [ 5.342777, 61.575550 ], [ 5.424444, 61.583599 ], [ 5.219166, 61.627209 ], [ 4.963333, 61.638050 ], [ 4.965555, 61.719151 ], [ 5.060555, 61.746101 ], [ 5.131944, 61.706928 ], [ 5.154166, 61.731659 ], [ 5.072778, 61.755550 ], [ 5.105000, 61.777760 ], [ 5.293611, 61.863602 ], [ 5.410000, 61.911381 ], [ 5.595833, 61.895260 ], [ 5.744721, 61.842209 ], [ 5.683055, 61.837212 ], [ 5.626389, 61.808601 ], [ 5.885555, 61.848320 ], [ 5.947222, 61.835270 ], [ 5.921111, 61.761929 ], [ 5.973055, 61.830540 ], [ 6.016110, 61.822491 ], [ 6.102221, 61.767490 ], [ 6.181389, 61.771381 ], [ 6.061944, 61.830540 ], [ 6.376389, 61.806660 ], [ 6.518332, 61.808601 ], [ 6.586160, 61.849609 ], [ 6.658333, 61.869709 ], [ 6.758055, 61.846100 ], [ 6.815555, 61.872761 ], [ 6.674722, 61.894711 ], [ 6.476388, 61.825550 ], [ 6.016110, 61.866650 ], [ 5.824166, 61.864712 ], [ 5.960278, 61.909988 ], [ 5.519444, 61.927212 ], [ 5.277778, 61.906651 ], [ 5.125555, 61.906380 ], [ 5.149444, 61.974152 ], [ 5.401111, 62.021648 ], [ 5.228055, 62.085819 ], [ 5.124999, 62.128880 ], [ 5.073610, 62.153049 ], [ 5.086389, 62.186649 ], [ 5.193889, 62.201649 ], [ 5.281111, 62.124981 ], [ 5.400277, 62.083881 ], [ 5.473332, 62.008041 ], [ 5.528889, 62.073879 ], [ 5.565555, 62.072491 ], [ 5.422500, 62.104710 ], [ 5.384444, 62.128040 ], [ 5.415000, 62.175819 ], [ 5.483611, 62.184158 ], [ 5.672777, 62.137211 ], [ 5.672777, 62.170269 ], [ 5.858611, 62.198318 ], [ 5.921111, 62.172211 ], [ 5.919999, 62.113602 ], [ 5.849722, 62.041370 ], [ 5.878611, 62.035259 ], [ 5.964999, 62.138321 ], [ 6.046389, 62.094990 ], [ 6.365000, 62.058601 ], [ 6.098611, 62.101379 ], [ 5.925278, 62.198879 ], [ 5.923055, 62.220539 ], [ 5.990833, 62.217491 ], [ 5.951666, 62.256378 ], [ 6.051666, 62.306660 ], [ 6.323889, 62.365822 ], [ 6.588333, 62.129429 ], [ 6.572222, 62.167210 ], [ 6.418056, 62.304989 ], [ 6.386110, 62.363602 ], [ 6.411111, 62.387211 ], [ 6.508888, 62.394989 ], [ 6.567778, 62.354160 ], [ 6.553611, 62.409710 ], [ 6.696575, 62.441460 ], [ 6.883055, 62.411381 ], [ 7.000555, 62.254162 ], [ 6.989434, 62.176991 ], [ 6.942499, 62.140541 ], [ 6.978333, 62.088329 ], [ 7.176666, 62.102489 ], [ 7.010833, 62.098320 ], [ 6.967777, 62.119709 ], [ 7.037222, 62.272209 ], [ 7.326388, 62.272491 ], [ 6.975277, 62.309990 ], [ 6.923566, 62.361698 ], [ 6.954166, 62.385818 ], [ 6.799722, 62.457211 ], [ 6.380555, 62.418880 ], [ 6.293333, 62.452209 ], [ 6.675555, 62.491379 ], [ 6.621666, 62.514992 ], [ 6.263611, 62.521099 ], [ 6.246944, 62.574711 ], [ 6.325555, 62.607208 ], [ 6.565555, 62.608318 ], [ 6.612222, 62.560822 ], [ 6.622222, 62.617210 ], [ 6.769166, 62.651100 ], [ 6.924444, 62.577770 ], [ 6.912777, 62.647209 ], [ 7.095555, 62.643318 ], [ 7.036944, 62.610538 ], [ 7.099722, 62.608601 ], [ 7.128888, 62.527760 ], [ 7.160832, 62.627491 ], [ 7.515277, 62.539989 ], [ 7.539166, 62.499149 ], [ 7.765555, 62.577770 ], [ 7.474444, 62.566101 ], [ 7.418888, 62.595539 ], [ 7.414721, 62.627491 ], [ 7.488889, 62.632771 ], [ 7.503055, 62.605820 ], [ 7.506666, 62.660259 ], [ 7.630278, 62.699162 ], [ 7.905277, 62.731930 ], [ 8.115000, 62.697491 ], [ 8.139166, 62.706928 ], [ 8.046665, 62.747490 ], [ 8.063332, 62.774712 ], [ 7.445555, 62.683601 ], [ 7.408055, 62.713871 ], [ 7.367777, 62.726101 ], [ 7.640555, 62.783039 ], [ 7.625833, 62.795269 ], [ 7.384999, 62.751381 ], [ 6.950277, 62.725552 ], [ 6.975277, 62.799431 ], [ 7.099722, 62.824162 ], [ 7.003333, 62.838600 ], [ 6.881944, 62.915821 ], [ 7.098332, 62.986931 ], [ 7.298055, 63.001930 ], [ 7.448610, 62.912769 ], [ 7.520833, 62.917488 ], [ 7.648889, 62.969151 ], [ 7.760833, 62.975819 ], [ 7.784166, 62.960541 ], [ 7.739721, 62.939430 ], [ 7.676944, 62.908329 ], [ 7.977777, 62.973320 ], [ 8.081944, 62.942490 ], [ 8.175554, 62.802212 ], [ 8.570000, 62.672489 ], [ 8.552500, 62.716648 ], [ 8.178610, 62.844990 ], [ 8.171665, 62.890820 ], [ 8.208055, 62.907490 ], [ 7.970277, 63.026661 ], [ 7.900833, 62.994709 ], [ 7.879167, 63.010540 ], [ 8.063610, 63.108318 ], [ 8.117222, 63.091930 ], [ 8.138054, 63.035820 ], [ 8.339167, 62.961380 ], [ 8.332499, 62.874710 ], [ 8.530832, 62.841381 ], [ 8.541388, 62.856659 ], [ 8.500555, 62.872761 ], [ 8.699444, 62.819988 ], [ 8.663055, 62.850552 ], [ 8.482222, 62.897209 ], [ 8.423332, 62.956100 ], [ 8.656666, 62.966381 ], [ 8.653889, 62.984440 ], [ 8.374443, 62.971100 ], [ 8.321110, 62.995270 ], [ 8.371666, 63.005821 ], [ 8.464998, 63.023602 ], [ 8.226387, 63.027760 ], [ 8.159166, 63.120270 ], [ 8.228054, 63.129990 ], [ 8.283609, 63.074162 ], [ 8.324444, 63.088329 ], [ 8.240000, 63.145550 ], [ 8.365555, 63.137489 ], [ 8.570833, 63.139149 ], [ 8.631388, 63.182491 ], [ 8.941944, 63.209148 ], [ 8.615000, 63.200260 ], [ 8.477777, 63.293598 ], [ 8.763611, 63.345268 ], [ 8.636665, 63.390270 ], [ 8.652777, 63.409161 ], [ 8.831110, 63.427490 ], [ 8.880278, 63.394989 ], [ 8.961111, 63.434711 ], [ 9.015276, 63.464989 ], [ 9.146111, 63.374149 ], [ 9.099998, 63.345829 ], [ 9.091665, 63.292210 ], [ 9.296944, 63.364159 ], [ 9.478611, 63.403049 ], [ 9.214167, 63.367771 ], [ 9.162222, 63.391380 ], [ 9.189444, 63.431931 ], [ 9.304998, 63.444149 ], [ 9.332222, 63.461651 ], [ 9.257500, 63.496101 ], [ 9.291111, 63.457760 ], [ 9.215555, 63.452770 ], [ 9.150000, 63.479160 ], [ 9.163610, 63.499439 ], [ 9.385277, 63.560261 ], [ 9.374998, 63.521381 ], [ 9.409443, 63.508598 ], [ 9.423611, 63.537769 ], [ 9.535000, 63.569439 ], [ 9.571665, 63.538879 ], [ 9.538887, 63.606098 ], [ 9.720554, 63.636379 ], [ 9.961666, 63.430271 ], [ 9.943333, 63.393040 ], [ 9.884722, 63.348049 ], [ 9.845554, 63.320271 ], [ 10.255000, 63.321381 ], [ 10.274720, 63.277489 ], [ 10.257500, 63.337212 ], [ 10.101940, 63.352772 ], [ 10.041110, 63.387489 ], [ 10.064440, 63.419708 ], [ 10.157780, 63.445541 ], [ 10.471390, 63.452492 ], [ 10.804440, 63.416660 ], [ 10.914720, 63.461102 ], [ 10.781670, 63.480259 ], [ 10.776940, 63.531940 ], [ 10.914440, 63.561100 ], [ 10.666110, 63.553879 ], [ 10.984170, 63.703880 ], [ 11.084440, 63.698879 ], [ 11.253610, 63.767769 ], [ 11.455830, 63.787209 ], [ 11.462500, 63.804440 ], [ 11.415280, 63.846100 ], [ 11.115000, 63.843601 ], [ 11.096670, 63.889149 ], [ 11.264720, 63.960819 ], [ 11.435830, 63.978321 ], [ 11.492780, 64.019417 ], [ 11.254440, 64.028870 ], [ 11.245830, 64.060242 ], [ 11.356940, 64.106369 ], [ 11.305830, 64.116364 ], [ 11.180280, 64.008034 ], [ 10.621940, 63.825260 ], [ 10.589170, 63.802761 ], [ 10.904170, 63.894161 ] ] ] } ] } ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Switzerland', 'density': '193.6', 'population': '7701856' }, 'geometry': { 'type': 'MultiPolygon', 'coordinates': [ [ [ [ 9.540410, 47.266975 ], [ 9.484161, 47.192211 ], [ 9.511665, 47.096088 ], [ 9.475830, 47.058041 ], [ 9.601834, 47.049644 ], [ 9.875551, 47.022480 ], [ 9.873608, 46.958599 ], [ 10.063330, 46.864990 ], [ 10.175280, 46.858601 ], [ 10.310830, 46.950539 ], [ 10.400830, 47.001099 ], [ 10.488610, 46.934978 ], [ 10.466240, 46.885422 ], [ 10.463570, 46.869350 ], [ 10.447500, 46.763050 ], [ 10.385280, 46.689419 ], [ 10.405280, 46.644428 ], [ 10.473890, 46.633320 ], [ 10.485280, 46.590542 ], [ 10.449720, 46.539150 ], [ 10.301660, 46.555820 ], [ 10.233330, 46.639980 ], [ 10.105280, 46.611370 ], [ 10.068330, 46.554989 ], [ 10.050000, 46.479710 ], [ 10.163050, 46.411930 ], [ 10.110000, 46.326382 ], [ 10.177220, 46.272480 ], [ 10.159440, 46.247761 ], [ 10.063050, 46.222759 ], [ 9.996386, 46.318321 ], [ 9.949999, 46.379150 ], [ 9.737495, 46.357208 ], [ 9.708332, 46.298321 ], [ 9.619442, 46.293049 ], [ 9.512499, 46.331928 ], [ 9.454443, 46.509430 ], [ 9.401943, 46.473309 ], [ 9.360830, 46.508598 ], [ 9.272221, 46.484150 ], [ 9.291941, 46.323040 ], [ 9.083332, 46.121090 ], [ 9.019529, 46.012299 ], [ 9.006247, 45.989651 ], [ 8.996664, 45.973309 ], [ 9.085552, 45.899151 ], [ 9.031666, 45.823879 ], [ 8.963053, 45.835541 ], [ 8.917242, 45.917160 ], [ 8.907776, 45.932770 ], [ 8.907169, 45.935101 ], [ 8.897268, 45.952751 ], [ 8.895554, 45.955818 ], [ 8.785276, 45.989979 ], [ 8.850552, 46.072491 ], [ 8.813053, 46.101650 ], [ 8.761568, 46.101528 ], [ 8.711609, 46.101421 ], [ 8.691942, 46.101379 ], [ 8.444443, 46.248600 ], [ 8.459164, 46.338322 ], [ 8.451664, 46.459980 ], [ 8.401108, 46.456089 ], [ 8.090275, 46.260540 ], [ 8.158888, 46.176651 ], [ 7.998055, 46.002209 ], [ 7.902498, 45.991100 ], [ 7.852777, 45.919979 ], [ 7.677344, 45.961239 ], [ 7.578887, 45.983318 ], [ 7.393332, 45.916088 ], [ 7.099443, 45.883598 ], [ 7.038747, 45.931721 ], [ 6.929166, 46.065262 ], [ 6.871387, 46.051929 ], [ 6.884444, 46.126091 ], [ 6.788054, 46.142208 ], [ 6.795277, 46.217758 ], [ 6.844443, 46.271370 ], [ 6.767499, 46.352489 ], [ 6.804937, 46.405499 ], [ 6.808887, 46.411091 ], [ 6.796110, 46.432491 ], [ 6.633611, 46.464149 ], [ 6.328333, 46.406929 ], [ 6.246387, 46.357769 ], [ 6.243931, 46.322392 ], [ 6.242221, 46.297771 ], [ 6.305554, 46.252491 ], [ 6.152222, 46.153591 ], [ 5.965833, 46.140270 ], [ 6.000000, 46.174160 ], [ 5.966110, 46.205261 ], [ 6.060832, 46.250542 ], [ 6.114444, 46.257771 ], [ 6.124443, 46.401920 ], [ 6.078055, 46.460819 ], [ 6.129999, 46.593319 ], [ 6.325022, 46.704479 ], [ 6.452777, 46.774429 ], [ 6.434721, 46.926929 ], [ 6.587221, 46.987759 ], [ 6.702777, 47.038601 ], [ 6.694443, 47.068321 ], [ 6.948332, 47.291931 ], [ 7.010833, 47.305260 ], [ 7.061665, 47.345539 ], [ 7.023055, 47.371651 ], [ 6.881110, 47.356930 ], [ 6.978333, 47.444149 ], [ 7.007777, 47.454990 ], [ 6.990555, 47.497211 ], [ 7.198054, 47.495258 ], [ 7.178332, 47.445820 ], [ 7.395610, 47.439671 ], [ 7.452777, 47.469978 ], [ 7.521388, 47.525822 ], [ 7.588799, 47.584560 ], [ 7.674443, 47.606380 ], [ 7.618332, 47.561100 ], [ 7.697221, 47.543320 ], [ 7.819444, 47.588322 ], [ 7.943332, 47.553600 ], [ 8.205553, 47.621651 ], [ 8.340553, 47.574162 ], [ 8.493031, 47.584560 ], [ 8.508333, 47.628319 ], [ 8.618887, 47.639709 ], [ 8.621664, 47.660259 ], [ 8.413332, 47.671101 ], [ 8.406666, 47.703869 ], [ 8.559721, 47.806370 ], [ 8.726942, 47.764992 ], [ 8.724998, 47.697762 ], [ 8.797499, 47.683041 ], [ 8.799999, 47.735260 ], [ 8.878609, 47.655819 ], [ 9.261665, 47.663040 ], [ 9.567612, 47.543919 ], [ 9.558254, 47.504070 ], [ 9.653610, 47.455540 ], [ 9.664999, 47.381371 ], [ 9.605276, 47.359989 ], [ 9.540410, 47.266975 ] ] ] ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Montenegro', 'density': '45.1', 'population': '630142' }, 'geometry': { 'type': 'MultiPolygon', 'coordinates': [ [ [ [ 19.070000, 43.508598 ], [ 20.292581, 42.938147 ], [ 20.230553, 42.845105 ], [ 20.075483, 42.814091 ], [ 19.982441, 42.860612 ], [ 20.028962, 42.721049 ], [ 20.072723, 42.558441 ], [ 20.064159, 42.563042 ], [ 19.830271, 42.469700 ], [ 19.746660, 42.543049 ], [ 19.755831, 42.639709 ], [ 19.717489, 42.661369 ], [ 19.635830, 42.606091 ], [ 19.469709, 42.399990 ], [ 19.397320, 42.317070 ], [ 19.282490, 42.185539 ], [ 19.398331, 42.108318 ], [ 19.395090, 42.087891 ], [ 19.381100, 41.999432 ], [ 19.368460, 41.849319 ], [ 19.140270, 41.993599 ], [ 19.138611, 42.043320 ], [ 18.891661, 42.262760 ], [ 18.793329, 42.281380 ], [ 18.692490, 42.350819 ], [ 18.684160, 42.382771 ], [ 18.565830, 42.402760 ], [ 18.556110, 42.431381 ], [ 18.702499, 42.393318 ], [ 18.688881, 42.478321 ], [ 18.613050, 42.437771 ], [ 18.508610, 42.454708 ], [ 18.510256, 42.449402 ], [ 18.460300, 42.486900 ], [ 18.455290, 42.564522 ], [ 18.553900, 42.621101 ], [ 18.577499, 42.654999 ], [ 18.560301, 42.712200 ], [ 18.515800, 42.731098 ], [ 18.454700, 42.828602 ], [ 18.490801, 42.861698 ], [ 18.483900, 42.971901 ], [ 18.535601, 43.017200 ], [ 18.650000, 43.044201 ], [ 18.659201, 43.080299 ], [ 18.643900, 43.139198 ], [ 18.707500, 43.214401 ], [ 18.697800, 43.252499 ], [ 18.855801, 43.332802 ], [ 18.847500, 43.348900 ], [ 18.919399, 43.356899 ], [ 18.960300, 43.322800 ], [ 18.954201, 43.293301 ], [ 18.981400, 43.284199 ], [ 19.016701, 43.239201 ], [ 19.048100, 43.232498 ], [ 19.072201, 43.248100 ], [ 19.091101, 43.316399 ], [ 19.020599, 43.391899 ], [ 19.023100, 43.435600 ], [ 18.956699, 43.454399 ], [ 18.949400, 43.509399 ], [ 18.986900, 43.522202 ], [ 19.011700, 43.556099 ], [ 19.053900, 43.535599 ], [ 19.070000, 43.508598 ] ] ] ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Croatia', 'density': '78.3', 'population': '4435056' }, 'geometry': { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'Polygon', 'coordinates': [ [ [ 14.660830, 44.965549 ], [ 14.614720, 44.983879 ], [ 14.628330, 45.034988 ], [ 14.495830, 45.029991 ], [ 14.428890, 45.078320 ], [ 14.545000, 45.204151 ], [ 14.549170, 45.246101 ], [ 14.594440, 45.213871 ], [ 14.783890, 45.012489 ], [ 14.806670, 44.973049 ], [ 14.660830, 44.965549 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 14.503610, 44.616650 ], [ 14.443050, 44.638321 ], [ 14.298050, 44.921940 ], [ 14.392780, 44.906651 ], [ 14.375560, 44.992489 ], [ 14.273610, 45.114990 ], [ 14.311670, 45.172771 ], [ 14.357770, 45.165272 ], [ 14.376940, 45.052490 ], [ 14.471670, 44.977772 ], [ 14.462500, 44.728039 ], [ 14.503610, 44.616650 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 17.655542, 42.891289 ], [ 17.698099, 42.927200 ], [ 17.786400, 42.903900 ], [ 17.821400, 42.920300 ], [ 17.842501, 42.903599 ], [ 17.845301, 42.859699 ], [ 17.882799, 42.819199 ], [ 17.922501, 42.811100 ], [ 17.998899, 42.761398 ], [ 18.100300, 42.750801 ], [ 18.268600, 42.618301 ], [ 18.362499, 42.626701 ], [ 18.411900, 42.606400 ], [ 18.455290, 42.564522 ], [ 18.460300, 42.486900 ], [ 18.510256, 42.449402 ], [ 18.526100, 42.398319 ], [ 18.214720, 42.579430 ], [ 18.227489, 42.607769 ], [ 17.906389, 42.747490 ], [ 17.810829, 42.808601 ], [ 17.721380, 42.823879 ], [ 17.735270, 42.794991 ], [ 17.334160, 42.930538 ], [ 17.046940, 43.034710 ], [ 17.421379, 42.961380 ], [ 17.716940, 42.847759 ], [ 17.655542, 42.891289 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 16.609236, 46.475174 ], [ 16.876381, 46.318600 ], [ 16.939159, 46.246090 ], [ 17.064159, 46.206650 ], [ 17.209721, 46.118320 ], [ 17.320551, 45.974430 ], [ 17.358610, 45.949989 ], [ 17.426100, 45.954700 ], [ 17.576660, 45.940540 ], [ 17.799440, 45.808880 ], [ 18.082491, 45.766651 ], [ 18.189159, 45.784431 ], [ 18.278971, 45.760349 ], [ 18.559441, 45.801651 ], [ 18.629160, 45.876091 ], [ 18.699160, 45.921101 ], [ 18.803049, 45.886650 ], [ 18.828100, 45.896675 ], [ 18.859200, 45.847198 ], [ 18.924400, 45.811901 ], [ 18.933300, 45.782501 ], [ 18.958599, 45.778099 ], [ 18.956100, 45.736099 ], [ 18.909201, 45.713299 ], [ 18.968901, 45.667198 ], [ 18.908100, 45.616699 ], [ 18.901899, 45.570301 ], [ 18.948299, 45.537800 ], [ 19.024401, 45.560799 ], [ 19.034401, 45.542198 ], [ 19.100599, 45.512199 ], [ 19.083099, 45.487801 ], [ 18.999701, 45.490799 ], [ 18.994400, 45.451698 ], [ 19.035801, 45.410301 ], [ 18.981400, 45.396400 ], [ 18.982500, 45.375801 ], [ 19.038601, 45.348598 ], [ 19.085300, 45.347801 ], [ 19.100800, 45.308102 ], [ 19.128901, 45.290600 ], [ 19.195000, 45.268600 ], [ 19.253901, 45.273899 ], [ 19.260300, 45.247200 ], [ 19.417801, 45.235600 ], [ 19.423901, 45.184399 ], [ 19.411100, 45.174999 ], [ 19.328600, 45.175800 ], [ 19.318899, 45.199699 ], [ 19.298599, 45.203602 ], [ 19.261700, 45.180302 ], [ 19.223101, 45.208599 ], [ 19.163601, 45.212200 ], [ 19.180799, 45.173599 ], [ 19.160601, 45.145802 ], [ 19.138100, 45.129200 ], [ 19.081699, 45.126099 ], [ 19.104200, 45.096699 ], [ 19.115299, 45.036098 ], [ 19.105301, 44.983898 ], [ 19.142799, 44.982201 ], [ 19.145300, 44.951099 ], [ 19.076099, 44.909401 ], [ 19.036699, 44.932499 ], [ 19.013599, 44.916698 ], [ 19.004700, 44.900299 ], [ 19.038099, 44.860600 ], [ 18.840799, 44.863098 ], [ 18.767799, 44.915798 ], [ 18.763300, 44.944698 ], [ 18.800800, 44.949402 ], [ 18.793900, 44.996899 ], [ 18.731100, 44.999401 ], [ 18.731400, 45.021900 ], [ 18.669201, 45.061699 ], [ 18.686899, 45.077202 ], [ 18.675600, 45.094200 ], [ 18.660000, 45.087799 ], [ 18.655300, 45.057800 ], [ 18.612200, 45.062500 ], [ 18.638599, 45.094700 ], [ 18.609699, 45.084202 ], [ 18.573099, 45.094398 ], [ 18.574699, 45.068901 ], [ 18.535000, 45.095600 ], [ 18.549400, 45.076099 ], [ 18.527201, 45.047199 ], [ 18.473900, 45.064999 ], [ 18.429701, 45.106400 ], [ 18.323099, 45.103100 ], [ 18.251699, 45.138599 ], [ 18.216400, 45.129700 ], [ 18.205299, 45.084702 ], [ 18.119400, 45.083099 ], [ 18.069401, 45.104401 ], [ 18.070000, 45.139198 ], [ 18.032200, 45.128899 ], [ 18.001699, 45.152199 ], [ 17.963900, 45.112801 ], [ 17.933901, 45.108898 ], [ 17.932800, 45.080002 ], [ 17.851700, 45.049198 ], [ 17.670300, 45.136700 ], [ 17.596100, 45.108898 ], [ 17.555799, 45.110802 ], [ 17.549700, 45.131699 ], [ 17.528099, 45.111099 ], [ 17.483299, 45.110802 ], [ 17.494400, 45.136398 ], [ 17.450800, 45.128101 ], [ 17.449400, 45.159199 ], [ 17.422800, 45.141899 ], [ 17.372200, 45.140598 ], [ 17.267200, 45.186901 ], [ 17.240299, 45.148300 ], [ 17.176901, 45.148300 ], [ 17.070601, 45.188099 ], [ 17.035601, 45.226700 ], [ 17.008301, 45.216099 ], [ 17.010599, 45.239201 ], [ 16.990299, 45.226898 ], [ 16.972200, 45.249401 ], [ 16.968599, 45.233601 ], [ 16.932199, 45.234402 ], [ 16.939699, 45.265598 ], [ 16.913601, 45.273899 ], [ 16.823900, 45.187199 ], [ 16.594999, 45.230598 ], [ 16.525801, 45.224400 ], [ 16.476101, 45.185600 ], [ 16.459400, 45.144402 ], [ 16.395000, 45.118301 ], [ 16.400000, 45.090302 ], [ 16.353600, 45.005798 ], [ 16.292500, 45.000599 ], [ 16.209700, 45.034401 ], [ 16.160000, 45.085602 ], [ 16.120600, 45.095001 ], [ 16.111900, 45.128101 ], [ 16.051901, 45.159401 ], [ 16.023100, 45.215000 ], [ 15.951700, 45.215801 ], [ 15.936700, 45.228600 ], [ 15.834200, 45.211899 ], [ 15.781100, 45.161900 ], [ 15.784400, 45.120300 ], [ 15.764700, 45.073601 ], [ 15.787500, 44.995300 ], [ 15.769700, 44.919201 ], [ 15.798300, 44.855301 ], [ 15.736400, 44.816898 ], [ 15.767500, 44.776100 ], [ 15.854700, 44.714401 ], [ 15.956900, 44.700001 ], [ 16.042500, 44.553902 ], [ 16.121401, 44.504700 ], [ 16.159201, 44.393902 ], [ 16.225000, 44.335800 ], [ 16.183901, 44.305801 ], [ 16.178301, 44.214699 ], [ 16.143101, 44.199402 ], [ 16.249399, 44.196701 ], [ 16.302200, 44.157200 ], [ 16.354700, 44.081699 ], [ 16.438900, 44.031898 ], [ 16.537201, 44.013599 ], [ 16.701401, 43.850601 ], [ 16.722799, 43.786098 ], [ 16.840799, 43.719200 ], [ 16.976400, 43.586102 ], [ 17.098301, 43.513599 ], [ 17.261700, 43.459702 ], [ 17.271900, 43.444401 ], [ 17.256100, 43.414398 ], [ 17.298100, 43.280800 ], [ 17.394400, 43.230301 ], [ 17.453300, 43.161098 ], [ 17.630301, 43.076900 ], [ 17.684200, 42.982201 ], [ 17.676701, 42.963299 ], [ 17.579556, 42.944008 ], [ 17.476940, 42.985271 ], [ 17.424721, 43.059711 ], [ 17.354160, 43.087769 ], [ 17.016661, 43.291370 ], [ 16.884439, 43.403049 ], [ 16.623051, 43.447208 ], [ 16.528049, 43.508041 ], [ 16.394159, 43.510269 ], [ 16.473049, 43.531940 ], [ 16.353609, 43.551102 ], [ 16.039440, 43.481098 ], [ 15.923610, 43.588600 ], [ 15.917220, 43.630550 ], [ 15.950830, 43.647209 ], [ 15.903610, 43.695541 ], [ 15.656670, 43.824711 ], [ 15.375000, 43.997211 ], [ 15.140550, 44.238602 ], [ 15.113330, 44.260269 ], [ 15.133050, 44.282768 ], [ 15.179440, 44.245541 ], [ 15.206110, 44.258041 ], [ 15.191940, 44.299992 ], [ 15.284160, 44.246658 ], [ 15.295830, 44.294991 ], [ 15.271390, 44.330818 ], [ 15.466390, 44.260269 ], [ 15.526110, 44.269428 ], [ 15.276660, 44.364429 ], [ 14.975830, 44.596100 ], [ 14.886110, 44.771648 ], [ 14.890830, 44.881939 ], [ 14.920830, 44.962769 ], [ 14.842500, 45.111660 ], [ 14.611670, 45.225819 ], [ 14.482780, 45.311100 ], [ 14.329440, 45.354431 ], [ 14.259160, 45.242489 ], [ 14.216670, 45.123322 ], [ 14.143330, 45.055820 ], [ 14.170560, 44.988602 ], [ 14.071110, 44.944710 ], [ 14.056110, 45.025539 ], [ 14.042500, 44.931931 ], [ 13.975000, 44.825260 ], [ 13.880000, 44.811100 ], [ 13.832220, 44.869160 ], [ 13.628330, 45.098320 ], [ 13.623330, 45.127491 ], [ 13.595280, 45.239429 ], [ 13.575830, 45.300270 ], [ 13.496390, 45.490822 ], [ 13.569667, 45.507072 ], [ 13.615300, 45.464401 ], [ 13.691400, 45.444401 ], [ 13.858600, 45.478100 ], [ 13.906900, 45.453300 ], [ 13.986700, 45.459999 ], [ 13.997200, 45.480000 ], [ 13.978300, 45.507801 ], [ 13.989400, 45.522202 ], [ 14.131400, 45.474400 ], [ 14.238300, 45.505600 ], [ 14.320600, 45.484200 ], [ 14.392800, 45.486099 ], [ 14.485800, 45.529701 ], [ 14.509700, 45.598099 ], [ 14.554400, 45.631100 ], [ 14.565000, 45.665001 ], [ 14.601400, 45.675301 ], [ 14.613600, 45.619999 ], [ 14.685300, 45.574200 ], [ 14.686900, 45.536701 ], [ 14.703100, 45.532799 ], [ 14.797200, 45.501400 ], [ 14.817800, 45.465801 ], [ 14.907200, 45.476398 ], [ 14.929200, 45.524399 ], [ 15.021100, 45.489399 ], [ 15.084700, 45.486099 ], [ 15.168600, 45.425598 ], [ 15.188100, 45.439400 ], [ 15.224200, 45.431099 ], [ 15.272200, 45.461700 ], [ 15.335300, 45.456402 ], [ 15.323300, 45.482201 ], [ 15.336100, 45.510300 ], [ 15.303900, 45.537800 ], [ 15.283100, 45.608101 ], [ 15.348100, 45.649200 ], [ 15.391900, 45.646702 ], [ 15.347200, 45.674999 ], [ 15.368100, 45.702801 ], [ 15.358600, 45.714401 ], [ 15.335800, 45.697498 ], [ 15.308600, 45.719398 ], [ 15.302800, 45.690800 ], [ 15.283300, 45.694698 ], [ 15.291900, 45.731098 ], [ 15.322500, 45.761398 ], [ 15.444700, 45.815800 ], [ 15.482200, 45.802200 ], [ 15.499400, 45.835800 ], [ 15.538300, 45.826401 ], [ 15.609400, 45.848598 ], [ 15.656700, 45.823299 ], [ 15.697800, 45.844200 ], [ 15.679400, 45.861900 ], [ 15.690600, 45.902802 ], [ 15.723600, 45.934700 ], [ 15.700000, 46.020000 ], [ 15.718300, 46.047199 ], [ 15.629400, 46.086899 ], [ 15.599700, 46.142502 ], [ 15.651900, 46.216702 ], [ 15.676700, 46.226700 ], [ 15.781100, 46.212502 ], [ 15.821700, 46.258301 ], [ 16.017200, 46.298100 ], [ 16.081100, 46.331100 ], [ 16.078300, 46.379700 ], [ 16.144699, 46.406101 ], [ 16.192499, 46.384701 ], [ 16.263100, 46.388901 ], [ 16.293900, 46.374401 ], [ 16.303900, 46.385799 ], [ 16.268900, 46.411900 ], [ 16.251400, 46.498299 ], [ 16.300703, 46.531738 ], [ 16.397800, 46.540798 ], [ 16.577200, 46.469398 ], [ 16.609236, 46.475174 ] ] ] } ] } ] } },
						{ 'type': 'Feature', 'properties': { 'name': 'Turkey', 'density': '93.6', 'population': '71517100' }, 'geometry': { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'GeometryCollection', 'geometries': [ { 'type': 'Polygon', 'coordinates': [ [ [ 26.361879, 41.701550 ], [ 26.332769, 41.753040 ], [ 26.377489, 41.821930 ], [ 26.544991, 41.830818 ], [ 26.625271, 41.983318 ], [ 26.843330, 41.972210 ], [ 27.070271, 42.089981 ], [ 27.201660, 42.060539 ], [ 27.243601, 42.107208 ], [ 27.566660, 41.907761 ], [ 27.579720, 41.937481 ], [ 27.821659, 41.966648 ], [ 27.834721, 42.001930 ], [ 28.013050, 41.982201 ], [ 28.012489, 41.980549 ], [ 28.047489, 41.889431 ], [ 27.983879, 41.891380 ], [ 27.963329, 41.856659 ], [ 28.051109, 41.710270 ], [ 28.199711, 41.528881 ], [ 28.635550, 41.354988 ], [ 29.103609, 41.237770 ], [ 29.073050, 41.176659 ], [ 29.038330, 41.156940 ], [ 29.056660, 41.086102 ], [ 28.905830, 40.979710 ], [ 28.642771, 40.960541 ], [ 28.597500, 40.969151 ], [ 28.571381, 41.064430 ], [ 28.524990, 41.079151 ], [ 28.567770, 41.023041 ], [ 28.543051, 40.987209 ], [ 28.178600, 41.076382 ], [ 28.010830, 41.035549 ], [ 27.958050, 40.971931 ], [ 27.509720, 40.983601 ], [ 27.273609, 40.691662 ], [ 26.904720, 40.543598 ], [ 26.622490, 40.392490 ], [ 26.550831, 40.306381 ], [ 26.351379, 40.205818 ], [ 26.321939, 40.108601 ], [ 26.181110, 40.045269 ], [ 26.157221, 40.055271 ], [ 26.270830, 40.246380 ], [ 26.208330, 40.320271 ], [ 26.550831, 40.484711 ], [ 26.824440, 40.584148 ], [ 26.805269, 40.637489 ], [ 26.779160, 40.659431 ], [ 26.350550, 40.607208 ], [ 26.138330, 40.592770 ], [ 26.083050, 40.606659 ], [ 26.033310, 40.734890 ], [ 26.124710, 40.749989 ], [ 26.134159, 40.781368 ], [ 26.199989, 40.828869 ], [ 26.203600, 40.862759 ], [ 26.327221, 40.941929 ], [ 26.320829, 41.184711 ], [ 26.449440, 41.285259 ], [ 26.617769, 41.336929 ], [ 26.637211, 41.378590 ], [ 26.593611, 41.611099 ], [ 26.495819, 41.664429 ], [ 26.361879, 41.701550 ] ] ] }, { 'type': 'Polygon', 'coordinates': [ [ [ 41.531200, 41.523479 ], [ 41.833321, 41.428322 ], [ 41.954990, 41.516380 ], [ 42.366928, 41.460270 ], [ 42.506649, 41.441929 ], [ 42.588039, 41.576382 ], [ 42.726372, 41.591091 ], [ 42.831928, 41.583321 ], [ 42.786381, 41.510269 ], [ 42.847210, 41.473042 ], [ 42.888599, 41.508041 ], [ 43.160809, 41.312759 ], [ 43.207760, 41.306931 ], [ 43.123600, 41.255260 ], [ 43.199421, 41.255260 ], [ 43.233040, 41.178322 ], [ 43.375259, 41.202209 ], [ 43.473042, 41.143040 ], [ 43.473240, 41.106213 ], [ 43.473591, 41.041931 ], [ 43.554150, 40.998039 ], [ 43.606380, 40.988319 ], [ 43.735821, 40.782490 ], [ 43.753529, 40.675930 ], [ 43.592758, 40.440262 ], [ 43.618038, 40.395538 ], [ 43.594429, 40.337490 ], [ 43.721088, 40.167210 ], [ 43.652760, 40.134159 ], [ 43.657761, 40.108601 ], [ 44.016930, 40.008598 ], [ 44.280270, 40.046650 ], [ 44.540272, 39.919979 ], [ 44.625259, 39.814991 ], [ 44.778584, 39.706650 ], [ 44.789989, 39.698589 ], [ 44.810490, 39.642731 ], [ 44.794651, 39.650650 ], [ 44.605820, 39.780540 ], [ 44.471088, 39.698872 ], [ 44.416088, 39.425259 ], [ 44.307758, 39.386929 ], [ 44.070271, 39.411652 ], [ 44.034161, 39.379711 ], [ 44.080818, 39.306931 ], [ 44.216648, 39.129150 ], [ 44.159420, 39.002209 ], [ 44.210819, 38.891102 ], [ 44.291100, 38.859711 ], [ 44.304989, 38.815540 ], [ 44.260818, 38.721649 ], [ 44.317211, 38.613041 ], [ 44.303600, 38.430538 ], [ 44.325260, 38.378040 ], [ 44.440819, 38.393318 ], [ 44.477760, 38.323040 ], [ 44.222210, 37.906368 ], [ 44.245541, 37.883869 ], [ 44.344990, 37.880260 ], [ 44.419151, 37.817760 ], [ 44.538040, 37.780540 ], [ 44.618870, 37.716091 ], [ 44.558041, 37.648041 ], [ 44.592758, 37.436932 ], [ 44.801651, 37.321659 ], [ 44.821930, 37.271099 ], [ 44.773319, 37.227482 ], [ 44.794430, 37.163872 ], [ 44.786671, 37.148151 ], [ 44.638039, 37.187481 ], [ 44.529148, 37.120258 ], [ 44.351101, 37.048321 ], [ 44.317211, 36.970539 ], [ 44.255260, 36.986649 ], [ 44.197762, 37.111099 ], [ 44.267761, 37.167488 ], [ 44.261662, 37.241928 ], [ 44.231091, 37.276371 ], [ 44.116379, 37.316380 ], [ 44.003880, 37.314991 ], [ 43.903591, 37.221649 ], [ 43.623039, 37.229980 ], [ 43.345821, 37.331928 ], [ 43.306370, 37.309978 ], [ 43.144428, 37.378040 ], [ 42.950539, 37.322491 ], [ 42.786098, 37.384430 ], [ 42.726650, 37.355549 ], [ 42.601101, 37.186649 ], [ 42.366089, 37.110180 ], [ 42.345261, 37.238590 ], [ 42.249710, 37.278870 ], [ 42.207870, 37.322182 ], [ 42.063599, 37.196651 ], [ 41.840260, 37.129978 ], [ 41.400539, 37.076931 ], [ 41.141102, 37.094429 ], [ 40.775539, 37.118320 ], [ 40.400261, 36.990261 ], [ 40.048321, 36.835541 ], [ 39.809978, 36.751381 ], [ 39.439232, 36.698841 ], [ 39.205818, 36.665531 ], [ 38.860538, 36.697762 ], [ 38.726372, 36.702209 ], [ 38.390820, 36.896648 ], [ 38.181099, 36.905819 ], [ 37.818600, 36.760818 ], [ 37.505550, 36.659710 ], [ 37.442478, 36.639980 ], [ 37.127480, 36.659149 ], [ 37.076931, 36.621651 ], [ 37.024429, 36.658039 ], [ 37.043049, 36.714432 ], [ 36.955540, 36.771099 ], [ 36.660259, 36.833599 ], [ 36.553600, 36.498600 ], [ 36.580818, 36.400539 ], [ 36.618591, 36.357491 ], [ 36.690262, 36.286381 ], [ 36.692211, 36.239151 ], [ 36.554989, 36.223042 ], [ 36.493599, 36.230808 ], [ 36.440819, 36.206379 ], [ 36.382511, 36.222858 ], [ 36.373890, 36.013210 ], [ 36.219151, 35.960270 ], [ 36.174160, 35.821659 ], [ 36.017200, 35.878319 ], [ 36.005821, 35.930538 ], [ 35.923241, 35.926769 ], [ 35.980259, 35.995541 ], [ 35.833321, 36.245270 ], [ 35.783329, 36.296379 ], [ 35.818878, 36.354988 ], [ 36.110271, 36.564709 ], [ 36.211102, 36.640820 ], [ 36.205818, 36.770821 ], [ 36.071381, 36.908039 ], [ 36.016930, 36.926380 ], [ 35.797771, 36.767490 ], [ 35.576382, 36.710270 ], [ 35.631649, 36.694149 ], [ 35.691380, 36.719151 ], [ 35.635818, 36.626099 ], [ 35.609711, 36.593319 ], [ 35.556660, 36.579151 ], [ 35.498878, 36.611931 ], [ 35.496380, 36.587769 ], [ 35.339989, 36.539150 ], [ 34.990822, 36.716648 ], [ 34.777210, 36.808601 ], [ 34.603870, 36.785549 ], [ 34.289711, 36.591648 ], [ 34.080540, 36.408600 ], [ 34.076931, 36.319439 ], [ 34.005550, 36.289989 ], [ 33.964710, 36.215260 ], [ 33.941101, 36.262211 ], [ 33.883041, 36.312481 ], [ 33.705269, 36.179440 ], [ 33.689991, 36.133598 ], [ 33.654430, 36.187481 ], [ 33.606380, 36.181099 ], [ 33.542759, 36.131649 ], [ 33.456379, 36.155270 ], [ 33.094151, 36.074711 ], [ 32.938881, 36.097210 ], [ 32.805538, 36.021099 ], [ 32.428600, 36.143040 ], [ 32.270821, 36.295818 ], [ 32.023880, 36.539440 ], [ 31.657770, 36.655819 ], [ 31.310829, 36.811649 ], [ 30.838329, 36.849709 ], [ 30.682770, 36.885269 ], [ 30.585270, 36.802490 ], [ 30.553600, 36.615822 ], [ 30.586380, 36.571098 ], [ 30.477489, 36.404991 ], [ 30.484440, 36.287209 ], [ 30.406940, 36.203602 ], [ 30.357220, 36.266380 ], [ 30.221380, 36.303600 ], [ 30.145830, 36.289711 ], [ 30.095831, 36.236931 ], [ 29.893330, 36.203041 ], [ 29.670549, 36.131378 ], [ 29.618610, 36.199989 ], [ 29.415550, 36.228600 ], [ 29.394720, 36.263321 ], [ 29.320271, 36.246380 ], [ 29.124439, 36.414440 ], [ 29.104441, 36.548870 ], [ 29.019991, 36.541370 ], [ 29.074711, 36.639431 ], [ 29.116100, 36.628319 ], [ 29.046379, 36.685261 ], [ 28.929159, 36.752491 ], [ 28.876390, 36.639149 ], [ 28.868330, 36.600819 ], [ 28.835270, 36.591381 ], [ 28.794991, 36.669159 ], [ 28.639160, 36.719151 ], [ 28.622351, 36.698780 ], [ 28.562771, 36.823040 ], [ 28.466379, 36.810822 ], [ 28.458611, 36.880260 ], [ 28.376381, 36.847210 ], [ 28.418051, 36.815540 ], [ 28.398609, 36.781651 ], [ 28.303881, 36.828602 ], [ 28.267490, 36.847488 ], [ 28.234159, 36.800270 ], [ 28.284439, 36.722759 ], [ 28.223330, 36.695541 ], [ 28.116659, 36.613041 ], [ 27.988050, 36.554150 ], [ 27.958879, 36.596931 ], [ 28.050831, 36.597759 ], [ 28.086660, 36.638321 ], [ 28.044720, 36.687771 ], [ 27.981661, 36.685822 ], [ 28.121941, 36.719440 ], [ 28.104441, 36.765820 ], [ 28.123329, 36.794991 ], [ 28.076660, 36.788319 ], [ 27.964439, 36.746380 ], [ 27.731939, 36.756939 ], [ 27.674440, 36.699429 ], [ 27.671940, 36.658329 ], [ 27.511940, 36.674431 ], [ 27.405830, 36.661652 ], [ 27.358601, 36.703320 ], [ 27.672770, 36.794991 ], [ 27.759159, 36.781101 ], [ 27.898880, 36.809429 ], [ 28.050270, 36.799992 ], [ 28.020269, 36.855820 ], [ 28.042770, 36.889149 ], [ 28.041660, 36.933319 ], [ 28.184160, 36.937481 ], [ 28.267220, 37.014431 ], [ 28.327499, 37.025539 ], [ 28.323601, 37.044991 ], [ 27.933331, 37.024990 ], [ 27.558880, 36.990261 ], [ 27.338329, 36.995270 ], [ 27.272221, 36.955818 ], [ 27.225550, 37.051929 ], [ 27.325830, 37.154148 ], [ 27.468880, 37.078320 ], [ 27.543610, 37.164440 ], [ 27.563881, 37.204708 ], [ 27.613609, 37.263321 ], [ 27.563881, 37.273602 ], [ 27.468611, 37.248878 ], [ 27.496380, 37.324989 ], [ 27.417219, 37.300819 ], [ 27.385550, 37.339432 ], [ 27.434441, 37.389992 ], [ 27.414440, 37.410549 ], [ 27.324711, 37.369431 ], [ 27.201941, 37.348881 ], [ 27.202221, 37.473598 ], [ 27.194719, 37.601650 ], [ 27.005831, 37.655270 ], [ 27.043051, 37.683601 ], [ 27.213600, 37.708050 ], [ 27.248600, 37.739990 ], [ 27.269440, 37.947491 ], [ 27.211670, 37.984989 ], [ 27.078051, 38.010540 ], [ 26.985270, 38.065269 ], [ 26.871111, 38.030819 ], [ 26.772221, 38.208881 ], [ 26.643330, 38.202770 ], [ 26.610830, 38.103321 ], [ 26.514160, 38.158039 ], [ 26.301941, 38.248878 ], [ 26.233330, 38.267208 ], [ 26.319719, 38.342209 ], [ 26.369440, 38.306099 ], [ 26.473890, 38.365822 ], [ 26.510830, 38.428051 ], [ 26.429159, 38.470268 ], [ 26.369160, 38.547489 ], [ 26.347219, 38.629990 ], [ 26.407770, 38.673321 ], [ 26.524990, 38.644161 ], [ 26.634159, 38.505550 ], [ 26.605000, 38.465820 ], [ 26.644440, 38.337490 ], [ 26.682220, 38.307491 ], [ 26.679991, 38.407490 ], [ 26.738609, 38.416660 ], [ 26.789160, 38.354988 ], [ 27.161940, 38.443878 ], [ 26.908600, 38.460819 ], [ 26.917770, 38.472210 ], [ 26.834160, 38.551380 ], [ 26.846939, 38.595268 ], [ 26.723330, 38.648880 ], [ 26.732220, 38.730259 ], [ 26.931940, 38.753880 ], [ 26.898880, 38.814159 ], [ 27.059719, 38.868881 ], [ 27.055830, 38.926659 ], [ 26.802771, 38.954430 ], [ 26.797489, 39.024151 ], [ 26.885830, 39.069439 ], [ 26.820551, 39.151100 ], [ 26.731380, 39.203602 ], [ 26.726110, 39.249989 ], [ 26.613050, 39.268040 ], [ 26.636101, 39.298870 ], [ 26.689440, 39.309429 ], [ 26.858601, 39.470539 ], [ 26.936661, 39.482491 ], [ 26.951660, 39.552761 ], [ 26.928610, 39.581100 ], [ 26.489719, 39.523880 ], [ 26.133881, 39.453041 ], [ 26.073050, 39.470268 ], [ 26.101379, 39.581661 ], [ 26.154989, 39.632210 ], [ 26.169720, 39.969440 ], [ 26.200279, 40.005821 ], [ 26.316940, 40.016380 ], [ 26.403891, 40.154430 ], [ 26.408609, 40.193321 ], [ 26.510830, 40.214161 ], [ 26.789709, 40.398880 ], [ 27.026661, 40.391102 ], [ 27.084721, 40.446930 ], [ 27.277220, 40.472488 ], [ 27.326941, 40.412209 ], [ 27.305269, 40.386379 ], [ 27.508881, 40.305820 ], [ 27.777491, 40.313881 ], [ 27.879999, 40.373322 ], [ 27.688890, 40.482208 ], [ 27.720831, 40.521648 ], [ 27.778330, 40.527489 ], [ 28.014999, 40.491650 ], [ 28.030830, 40.467491 ], [ 27.898331, 40.395821 ], [ 27.917500, 40.366940 ], [ 28.388050, 40.392769 ], [ 28.747219, 40.388599 ], [ 29.040279, 40.363880 ], [ 29.146660, 40.429440 ], [ 29.084440, 40.476379 ], [ 28.794720, 40.516651 ], [ 28.795271, 40.551380 ], [ 28.986380, 40.641930 ], [ 29.412220, 40.686939 ], [ 29.510550, 40.732769 ], [ 29.551109, 40.686100 ], [ 29.923050, 40.761379 ], [ 29.466940, 40.774151 ], [ 29.356110, 40.758881 ], [ 29.330549, 40.813599 ], [ 29.072220, 40.962490 ], [ 29.017771, 41.007210 ], [ 29.124161, 41.203602 ], [ 29.245831, 41.235821 ], [ 29.720270, 41.158871 ], [ 30.198050, 41.153599 ], [ 30.280550, 41.211929 ], [ 30.730829, 41.099152 ], [ 30.879709, 41.076931 ], [ 31.276939, 41.108318 ], [ 31.402769, 41.196659 ], [ 31.395830, 41.306099 ], [ 31.779989, 41.456100 ], [ 32.149429, 41.604710 ], [ 32.282211, 41.722759 ], [ 32.656101, 41.832489 ], [ 33.070541, 41.938599 ], [ 33.517769, 42.006939 ], [ 34.056381, 41.977489 ], [ 34.474709, 41.962212 ], [ 34.715549, 41.942490 ], [ 34.832489, 41.968319 ], [ 35.022869, 42.088188 ], [ 35.066380, 42.029148 ], [ 35.211380, 42.020550 ], [ 35.101650, 41.972759 ], [ 35.093319, 41.923038 ], [ 35.265270, 41.725819 ], [ 35.576649, 41.627209 ], [ 35.944439, 41.710270 ], [ 35.973049, 41.732208 ], [ 36.130821, 41.599152 ], [ 36.116940, 41.489429 ], [ 36.273602, 41.338871 ], [ 36.429150, 41.242771 ], [ 36.485271, 41.244431 ], [ 36.612492, 41.347488 ], [ 36.781380, 41.356930 ], [ 36.918880, 41.321098 ], [ 37.023319, 41.267490 ], [ 37.040821, 41.178051 ], [ 37.232208, 41.141651 ], [ 37.472488, 41.067211 ], [ 37.531101, 41.028881 ], [ 37.638599, 41.085270 ], [ 37.683041, 41.136101 ], [ 37.804150, 41.039150 ], [ 38.071930, 40.965260 ], [ 38.489429, 40.918320 ], [ 38.865822, 41.013882 ], [ 39.163052, 41.082489 ], [ 39.263050, 41.049160 ], [ 39.421101, 41.109440 ], [ 39.816662, 40.984711 ], [ 39.854431, 40.957500 ], [ 39.996349, 40.974312 ], [ 40.110538, 40.916660 ], [ 40.187481, 40.931931 ], [ 40.398319, 41.020550 ], [ 40.543320, 41.029148 ], [ 40.779148, 41.168320 ], [ 40.931099, 41.187481 ], [ 41.101379, 41.274712 ], [ 41.391930, 41.376381 ], [ 41.531200, 41.523479 ] ] ] } ] } ] } },
						]
			};



    /////////////////////////////////////////////////// Adress

    var fn = {

        // Launch Functions
        Launch: function () {
            fn.Apps();
            fn.LeafLet();
        },

        // Leaflet
        LeafLet: function () {
    console.log('LeafLet');

    map = L.map('map', {
        center: [56.8, 10.4],
        zoom: 3
    });
    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    


    var infobox = L.control({
        position: 'bottomright'
    });
    infobox.onAdd = function (e) {
        this._div = L.DomUtil.create('div', 'info');
        this.refresh();
        return this._div;
    };
    infobox.refresh = function (properties) {
        this._div.innerHTML = '<h4>Europe Population Density 2009</h4>';
        if (typeof (properties) != 'undefined') {
            this._div.innerHTML += '<b>' + properties.name + '</b><br/>' + 'Population: ' + properties.population + '<br/>' + 'Density: ' + properties.density + '<br/>' + '<b>Click to zoom.</b>';
        } else {
            this._div.innerHTML += '<b>Hover a country.</b>';
        }
    };
    infobox.addTo(map);

    var densitythresholds = [
        [0, 'rgb(237, 248, 233)'],
        [40, 'rgb(186, 228, 179)'],
        [100, 'rgb(116, 196, 118)'],
        [200, 'rgb( 49, 163,  84)'],
        [300, 'rgb(  0, 109,  44)']
    ];
    var populationthresholds = [
        [0, 'rgb(239, 243, 255)'],
        [40000, 'rgb(189, 215, 231)'],
        [1000000, 'rgb(107, 174, 214)'],
        [10000000, 'rgb( 49, 130, 189)'],
        [50000000, 'rgb(  8,  81, 156)']
    ];

    var colorByThresholds = function (thresholds, value) {
        for (var i = 0; i < thresholds.length - 1; i++) {
            if (value < thresholds[i + 1][0])
                return thresholds[i][1];
        }
        return thresholds[thresholds.length - 1][1];
    };

    var legendbox = L.control({
        position: 'bottomleft'
    });
    legendbox.onAdd = function (e) {
        this._div = L.DomUtil.create('div', 'info legend');
        var innerHTML = '<table><tr>';
        innerHTML += '<td>Population:</td>';
        for (var i = 0; i < populationthresholds.length; i++) {
            innerHTML += '<td style="background: ' + colorByThresholds(populationthresholds, populationthresholds[i][0]) + '">' + populationthresholds[i][0] + (typeof (populationthresholds[i + 1]) != 'undefined' ? '-' + populationthresholds[i + 1][0] : '+') + '</td>';
        }
        innerHTML += '</tr><tr><td>Density:</td>';
        for (var i = 0; i < densitythresholds.length; i++) {
            innerHTML += '<td style="background: ' + colorByThresholds(densitythresholds, densitythresholds[i][0]) + '">' + densitythresholds[i][0] + (typeof (densitythresholds[i + 1]) != 'undefined' ? '-' + densitythresholds[i + 1][0] : '+') + '</td>';
        }
        innerHTML += '</tr></table>';
        this._div.innerHTML = innerHTML;
        return this._div;
    };
    legendbox.addTo(map);

    var densitylayer = L.geoJson(europe, {
        style: function (feature) {
            var density = feature.properties.density;
            return {
                fillColor: colorByThresholds(densitythresholds, density),
                fillOpacity: 0.75,
                weight: 1,
                color: 'black'
            };
        },
        onEachFeature: function (feature, layer) {
            layer.on({
                'mousemove': function (e) {
                    e.target.setStyle({
                        weight: 4
                    });
                    infobox.refresh(feature.properties);
                },
                'mouseout': function (e) {
                    densitylayer.resetStyle(e.target);
                    infobox.refresh();
                },
                'click': function (e) {
                    map.fitBounds(e.target.getBounds());
                }
            });
        }
    });

    var populationlayer = L.geoJson(europe, {
        style: function (feature) {
            var population = feature.properties.population;
            return {
                fillColor: colorByThresholds(populationthresholds, population),
                fillOpacity: 0.75,
                weight: 1,
                color: 'black'
            };
        },
        onEachFeature: function (feature, layer) {
            layer.on({
                'mousemove': function (e) {
                    e.target.setStyle({
                        weight: 4
                    });
                    infobox.refresh(feature.properties);
                },
                'mouseout': function (e) {
                    populationlayer.resetStyle(e.target);
                    infobox.refresh();
                },
                'click': function (e) {
                    map.fitBounds(e.target.getBounds());
                }
            });
        }
    }).addTo(map);
    L.control.layers({
        'Density': densitylayer,
        'Population': populationlayer
    }).addTo(map);

    map.attributionControl.addAttribution('&copy; <a href="http://epp.eurostat.ec.europa.eu/portal/page/portal/eurostat/home/">Eurostat</a>');

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



