<?php
session_start(); //start session.
?>

<!DOCTYPE html>
<html>
    <head>
        <base href="/rmr/build/src/desktop/Home/REPORT/">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Home - Report System</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link href="../../../../stylesheets/stylesheet-rmr-home-report.css" rel="stylesheet" type="text/css" />

        <link rel="shortcut icon" href="../../../../images/rmr/favicon.ico">
    </head>
    <body>

        <?php

            if(isset($_SESSION['userName']) && $_SESSION['userName'] != "") {
                    //Task to do
            } else {

                header('Location: ../../../../Login/index.php'); //redirect URL
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
                    WLMA-Admin
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
                        <img class="nav-user-photo" src="../../../../images/images-flaty_theme/img/demo/avatar/avatar_kapook.jpg" alt="Kapook's Photo" />
                        <span class="hhh" id="user_info">
                            Kapook
                        </span>
                        <i class="fa fa-caret-down"></i>
                    </a>

                    <!-- BEGIN User Dropdown -->
                    <ul class="dropdown-menu dropdown-navbar" id="user_menu">
                        <li class="nav-header">
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


			    <!-- BEGIN Content -->
			    <div id="main-content" >


			    	<!-- Home - Container - MainContent - pageTitle  -->
			    	                <!-- BEGIN Page Title -->
                <div class="page-title">
                    <div>
                        <h1><i class="fa fa-file-o"></i>   REPORT Manager</h1>
                        <h4>You can start your customization from this one!</h4>
                    </div>
                </div>
                <!-- END Page Title -->
			    	<!-- Home - Container - MainContent - breadCrumbs  -->
			    	                <!-- BEGIN Breadcrumb -->
                <div>
                    <ul class="breadcrumb">
                        <li>
                        	<i class="fa fa-home"></i> 
                        	<a href="../">Home</a>
                            <span class="divider"><i class="fa fa-angle-right"></i></span>
                        </li>
                        <li class="active">Report Manager</li>
                    </ul>
                </div>
                <!-- END Breadcrumb -->



					
					<!-- Home - Container - MainContent - menuTile - First Row  -->
			    	                


                <!-- BEGIN First Row -->
                <div class="row">
                    <div class="col-md-3">
                        <div class="row">
                            <div  class="col-md-12">
                                <a href="./WLMA-1125/" class="tile tile-light-blue" id="ReportLogoID">
                                    <div class="img">
                                        <!-- <i class="fa fa-calendar"></i> -->
                                        <img  src="../../../../images/rmr/home-menuTile-report-tileLogo.png"/>
                                    </div>
                                    <div class="content">
                                        <p class="big">WLMA-1125</p>
                                        <p class="title">ติดตามสถานะการรับส่งข้อมูล</p>
                                    </div>
                                </a>
                            </div>

                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="row">
                            <div  class="col-md-12">
                                <div class="tile tile-light-blue" id="ReportLogoID">
                                    <div class="img">
                                        <!-- <i class="fa fa-calendar"></i> -->
                                        <img  src="../../../../images/rmr/home-menuTile-report-tileLogo.png"/>
                                    </div>
                                    <div class="content">
                                        <p class="big">WLMA-RTU</p>
                                        <p class="title">รายงานผลการ FTP</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="row">
                            <div  class="col-md-12">
                                <div class="tile tile-light-blue" id="ReportLogoID">
                                    <div class="img">
                                        <!-- <i class="fa fa-calendar"></i> -->
                                        <img  src="../../../../images/rmr/home-menuTile-report-tileLogo.png"/>
                                    </div>
                                    <div class="content">
                                        <p class="big">WLMA-CRM</p>
                                        <p class="title">รายงานผลการเชื่อมโยงกับ CRM</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="col-md-3">
                        <div class="row">
                            <div class="col-md-12 tile-active">
                                <div class="tile tile-magenta" data-stop="4000" style="top: 0px;">
                                    <div class="img img-center">
                                        <i class="fa fa-gear"></i>
                                    </div>
                                    <p class="title text-center">SERVER Monitoring</p>
                                </div>
                                <div class="tile tile-pink" data-stop="5000" style="top: 0px;">
                                    <p>ติดตามสถานะการทำงานของเครื่องแม่ข่าย</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- END First Row -->




			    	<!-- Home - Container - MainContent - menuTile - Second Row  -->
			    	                


                <!-- BEGIN First Row -->
                <div class="row">
                    <div class="col-md-3">
                        <div class="row">
                            <div  class="col-md-12">
                                <div class="tile tile-light-blue" id="ReportLogoID">
                                    <div class="img">
                                        <!-- <i class="fa fa-calendar"></i> -->
                                        <img  src="../../../../images/rmr/home-menuTile-report-tileLogo.png"/>
                                    </div>
                                    <div class="content">
                                        <p class="big">WLMA-GIS</p>
                                        <p class="title">แผนที่แสดงจุดรั่ว</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <!-- END First Row -->



					
			    	
			    	

			        <footer>
			            <p>Copyright © 2015 MWA. All rights reserved.</p>
			        </footer>
			        <a id="btn-scrollup" class="btn btn-circle btn-lg" href="#"><i class="fa fa-chevron-up"></i></a>
			    </div>
			    <!-- END Content -->
        </div>
        <!-- END Container -->

        <script src="../../../../javascripts/javascript-rmr-home-report.js" type="text/javascript"></script>

    </body>
</html>