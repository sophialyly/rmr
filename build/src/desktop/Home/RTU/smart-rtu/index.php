<?php
session_start(); //start session.
?>

<!DOCTYPE html>
<html>
    <head>
        <base href="/rmr/build/src/desktop/Home/RTU/smart-rtu/">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>RTU Manager - Smart RTU</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link href="../../../../../stylesheets/stylesheet-rmr-home-rtu-smartRtu.css" rel="stylesheet" type="text/css" />

        <link rel="shortcut icon" href="../../../../../images/rmr/favicon.ico">
    </head>
    <body>

        <!-- PHP Script - Check JWT Sesstion -->
                <?php

            if(isset($_SESSION['jwt']) && $_SESSION['jwt'] != "") {
                    //Task to do
            } else {

                header('Location: ../../../Login/index.php'); //redirect URL
            }
        ?>


                <!-- Admin - Navbar  -->
                <!-- BEGIN Navbar -->
        <!-- <div id="navbar" class="navbar"> -->
        <div id="navbar" class="navbar navbar-fixed navbar-blue">
            <button type="button" class="navbar-toggle navbar-btn collapsed" data-toggle="collapse" data-target="#sidebar">
                <span class="fa fa-bars"></span>
            </button>
            <a class="navbar-brand" href="#">
                <small>
                    <i class="fa fa-desktop"></i>
                    WLMA-Extension
                </small>
            </a>

            <!-- BEGIN Navbar Buttons -->
            <ul class="nav flaty-nav pull-right">

                        <!-- navbar - Button Task  -->

                        <!-- navbar - Button Notifications  -->

                        <!-- navbar - Button Messages  -->

                        <!-- navbar - Button User  -->
                                        <!-- BEGIN Button User -->
                <li class="user-profile">
                    <a data-toggle="dropdown" href="#" class="user-menu dropdown-toggle">
                        <img class="nav-user-photo" src="../../../../../images/images-flaty_theme/img/demo/avatar/avatar5.jpg" alt="User's Photo" />
                        <span class="hhh" id="user_info">
                            User
                        </span>
                        <i class="fa fa-caret-down"></i>
                    </a>

                    <!-- BEGIN User Dropdown -->
                    <ul class="dropdown-menu dropdown-navbar" id="user_menu">
                        <!-- <li class="nav-header">
                            <i class="fa fa-clock-o"></i>
                            Logined From 20:45
                        </li>

                        <li>
                            <a href="#">
                                <i class="fa fa-cog"></i>
                                Account Settings
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <i class="fa fa-user"></i>
                                Edit Profile
                            </a>
                        </li>

                        <li>
                            <a href="#">
                                <i class="fa fa-question"></i>
                                Help
                            </a>
                        </li>

                        <li class="divider visible-xs"></li>

                        <li class="visible-xs">
                            <a href="#">
                                <i class="fa fa-tasks"></i>
                                Tasks
                                <span class="badge badge-warning">4</span>
                            </a>
                        </li>
                        <li class="visible-xs">
                            <a href="#">
                                <i class="fa fa-bell"></i>
                                Notifications
                                <span class="badge badge-important">8</span>
                            </a>
                        </li>
                        <li class="visible-xs">
                            <a href="#">
                                <i class="fa fa-envelope"></i>
                                Messages
                                <span class="badge badge-success">5</span>
                            </a>
                        </li> -->
                        
                        <li class="nav-header">
                            <i class="fa fa-clock-o"></i>
                            WLMA Extension
                        </li>

                        <li>
                            <a href="#">
                                <i class="fa fa-question"></i>
                                Help
                            </a>
                        </li>

                        <li class="divider"></li>

                        <li>
                            <!-- <a href="../Login/index.php">
                                <i class="fa fa-off"></i>
                                Logout
                            </a> -->
                            <a href="#" id="button-logout">
                                <i class="fa fa-off"></i>
                                Logout
                            </a>
                        </li>
                    </ul>
                    <!-- BEGIN User Dropdown -->
                </li>
                <!-- END Button User -->

            </ul>
            <!-- END Navbar Buttons -->
        </div>
        <!-- END Navbar -->

        <!-- BEGIN Container -->
        <div class="container sidebar-blue" id="main-container">

        		<!-- Home - Container - Sidebar  -->
			                <!-- BEGIN Sidebar -->
            <!-- <div id="sidebar" class="navbar-collapse collapse"> -->
            <div id="sidebar" class="navbar-collapse collapse sidebar-fixed">
                <!-- BEGIN Navlist -->
                <ul class="nav nav-list">
                    <!-- BEGIN Search Form -->
                    <li>
                        <form target="#" method="GET" class="search-form">
                            <span class="search-pan">
                                <button type="submit">
                                    <i class="fa fa-search"></i>
                                </button>
                                <input type="text" name="search" placeholder="Search ..." autocomplete="off" disabled/>
                            </span>
                        </form>
                    </li>
                    <!-- END Search Form -->

                        <!-- sidebar - Dashboard  -->
                                            <li class="">
                        <a href="../">
                            <i class="fa fa-dashboard"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>




                    

                        <!-- sidebar - RMR  -->
                                            <li class="active">
                        <a href="#" class="dropdown-toggle">
                            <i class="fa fa-desktop"></i>
                            <span>RTU Manager</span>
                            <b class="arrow fa fa-angle-right"></b>
                        </a>

                        <!-- BEGIN Submenu -->
                        <ul class="submenu">
                            <li class="">
                                <a href="../RTU-List/">รายการข้อมูล RTU</a>
                            </li>
                            <li class="active">
                                <a href="./">SMART RTU</a>
                            </li>

                        </ul>
                        <!-- END Submenu -->
                    </li>

                   

                    
                </ul>
                <!-- END Navlist -->

                <!-- BEGIN Sidebar Collapse Button -->
                <div id="sidebar-collapse" class="visible-lg">
                    <i class="fa fa-angle-double-left"></i>
                </div>
                <!-- END Sidebar Collapse Button -->
            </div>
            <!-- END Sidebar -->

			    <!-- BEGIN Content -->
			    <div id="main-content" >


			    	<!-- Home - Container - MainContent - pageTitle  -->
			    	                <!-- BEGIN Page Title -->
                <div class="page-title">
                    <div>
                        <h1><i class="fa fa-dashboard"></i>   SMART RTU</h1>
                        <h4></h4>
                    </div>
                </div>
                <!-- END Page Title -->
			    	<!-- Home - Container - MainContent - breadCrumbs  -->
			    	                <!-- BEGIN Breadcrumb -->
                <div>
                    <ul class="breadcrumb">
                        <li>
                        	<i class="fa fa-home"></i> 
                        	<a href="../../">Home</a>
                            <span class="divider"><i class="fa fa-angle-right"></i></span>
                        </li>
                        <li class="active">
                            RTU Manager
                            <span class="divider"><i class="fa fa-angle-right"></i></span>
                        </li>
                        <!-- <li class="active">รายการข้อมูล RTU</li> -->
                        <li class="active breadcrumb-rtuLink-smartRtu">
                            <span class="rtuLink"> SMART RTU </span>
                        </li>
                    </ul>
                </div>
                <!-- END Breadcrumb -->






			    	<!-- Home - Container - MainContent - sampleBox  -->
			    	<div class="row canvas-rtuInformation" id="canvas-rtuInformation-mapBox" >
    <div class="col-md-12">
        <div class="box">
            <div class="box-title">
                <h3><i class="fa fa-bars"></i> แผนที่แสดงตำแหน่ง RTU (SMART RTU)</h3>
                <div class="box-tool">
                    <!-- <a data-action="collapse" href="#"><i class="fa fa-chevron-up"></i></a> -->
                    <!-- <a data-action="close" href="#"><i class="fa fa-times"></i></a> -->
                    <a class ="goto-default" href="#"><i class="fa fa-times"></i></a>
                </div>
            </div>
            <div class="box-content" >
                <form action="#" class="form-horizontal" >
                <div class="row">
                    <div class="col-md-12">
                        <!-- BEGIN Left Side -->
                        <div class="col-md-12" id="map" style="height:540px;">
                          
                        </div>
                        <!-- END Left Side -->
                    </div>


                    <div class="row" id="rtu-info-box" style="display: none">
                        <div class="col-sm-12">
                                <form action="#" class="form-horizontal" id="formRTU_Information" method="post">

                                    <div class="form-group">
                                    <label class="col-sm-7 control-label">Flow:</label>
                                      <div class="col-sm-5 controls">
                                        <div class="input-group">
                                          <input type="text" name="" id="txtFlow" placeholder="Flow" class="form-control" readonly="readonly" style="color: black;">
                                          <span class="input-group-addon">
                                              <i class="fa fa-circle fa-1x" style="color:lightgray"></i>
                                          </span>
                                        </div>
                                        <!-- <span class="help-inline">last update : </span> -->
                                      </div>
                                    </div>

                                    <div class="form-group">
                                    <label class="col-sm-7 control-label">Pressure:</label>
                                      <div class="col-sm-5 controls">
                                        <div class="input-group">
                                          <input type="text" name="" id="txtPressure" placeholder="Pressure" class="form-control" readonly="readonly" style="color: black;">
                                          <span class="input-group-addon">
                                              <i class="fa fa-circle fa-1x" style="color:lightgray"></i>
                                          </span>
                                        </div>
                                        <!-- <span class="help-inline">last update : </span> -->
                                      </div>
                                    </div>

                                    <div class="form-group">
                                    <label class="col-sm-7 control-label">Pressure Average:</label>
                                      <div class="col-sm-5 controls">
                                        <div class="input-group">
                                          <input type="text" name="" id="txtPressureAverage" placeholder="Pressure Average" class="form-control" readonly="readonly" style="color: black;">
                                        </div>
                                        <!-- <span class="help-inline">last update : </span> -->
                                      </div>
                                    </div>

                                    <div class="form-group">
                                      <label class="col-sm-5 control-label" for="dm">Auto Update:</label>

                                      <div class="col-sm-7 controls">
                                        <div id="auto-update-toggle-switch" class="label-toggle-switch make-switch">
                                          <input type="checkbox"  />
                                        </div>

                                        <!-- <i class="fa fa-clock-o"></i> -->
                                        <!-- <button  class="btn btn-circle btn-primary btn-lg"><i class="fa fa-clock-o fa-2x"></i></button> -->
                                        <!-- <button id="btn-auto-update" class="btn btn-circle btn-bordered thick btn-primary">
                                          <i class="fa fa-refresh fa-spin fa-2x fa-fw"></i>
                                        </button> -->
                                        <i id="auto-update-refresh-icon" class="fa fa-refresh fa-spin fa-1x fa-fw" aria-hidden="true" style="display:none"></i>
                                      </div>


                                      <!-- <span class="col-sm-2">
                                        <i class="fa fa-clock-o"></i>
                                      </span> -->

                                      <!-- <button class="btn" id="btn-auto-update"> -->
                                          <!-- <i class="fa fa-clock-o"></i> -->
                                          <!-- <i class="fa fa-spinner fa-pulse"></i> -->
                                      <!-- </button> -->
                                    </div>

                                    <!-- <div class="form-group">
                                        <div class="col-sm-9 col-sm-offset-9">
                                            <button type="button" id="btn-close-rtu-info-box col-sm-3" class="btn btn-danger">ปิด</button>
                                        </div>
                                    </div> -->

                                </form>
                        </div>
                    </div>


                    <div class="row" id="pressure-range-desc-box" style="display: none">
                        <div class="col-sm-12">
                            <div class="mail-page ">
                              <div class="mail-nav">
                                <ul>
                                    <li class="" style="color: black;">Range: </li>
                                    <li><a href="#"><i class="mail-flag-gray"></i> Error</a></li>
                                    <li><a href="#"><i class="mail-flag-black"></i> &lt; 2</a></li>
                                    <li><a href="#"><i class="mail-flag-red"></i> 2 - 6</a></li>
                                    <li><a href="#"><i class="mail-flag-orange"></i> 6 - 10</a></li>
                                    <li><a href="#"><i class="mail-flag-green"></i> &gt; 10</a></li>
                                </ul>
                              </div>
                            </div>


                              <!-- <ul class="iconic">
                                <li><i class="fa fa-map-marker gray   fa-2x"></i> Error</li>
                                <li><i class="fa fa-map-marker black  fa-2x"></i> &lt; 2</li>
                                <li><i class="fa fa-map-marker red    fa-2x"></i> 2 - 6</li>
                                <li><i class="fa fa-map-marker orange fa-2x"></i> 6 - 10</li>
                                <li><i class="fa fa-map-marker green  fa-2x"></i> &gt; 10</li>
                              </ul> -->

                        </div>
                    </div>


                </div>
                </form>
            </div>
        </div>
    </div>




</div>




			    	

			        <footer>
			            <p>Copyright © 2015 MWA. All rights reserved.</p>
			        </footer>
			        <a id="btn-scrollup" class="btn btn-circle btn-lg" href="#"><i class="fa fa-chevron-up"></i></a>
			    </div>
			    <!-- END Content -->
        </div>
        <!-- END Container -->
        

        <script src="../../../../../javascripts/javascript-rmr-home-rtu-smartRtu.js" type="text/javascript"></script>
        <script src="http://maps.google.com/maps/api/js?key=AIzaSyAttHidUVHWkhjblbzuUyERCeQN7trGA1w"></script>
        <script src="http://matchingnotes.com/javascripts/leaflet-google.js"></script>
        <script src="https://cdn.jsdelivr.net/leaflet.esri/1.0.2/esri-leaflet.js"></script>
        

    </body>
</html>