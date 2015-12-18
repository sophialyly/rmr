<?php
session_start(); //start session.
?>

<!DOCTYPE html>
<html>
    <head>
        <base href="/rmr/build/src/desktop/Home/RMR/">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Home - RMR System</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link href="../../../../stylesheets/stylesheet-rmr-home-rmr.css" rel="stylesheet" type="text/css" />

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
                                <input type="text" name="search" placeholder="Search ..." autocomplete="off" />
                            </span>
                        </form>
                    </li>
                    <!-- END Search Form -->

                        <!-- sidebar - Dashboard  -->
                                            <li class="active">
                        <a href="#">
                            <i class="fa fa-dashboard"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>

                        <!-- sidebar - RMR  -->
                                            <li class="">
                        <a href="#" class="dropdown-toggle">
                            <i class="fa fa-desktop"></i>
                            <span>RMR</span>
                            <b class="arrow fa fa-angle-right"></b>
                        </a>

                        <!-- BEGIN Submenu -->
                        <ul class="submenu">
                            <li class="">
                                <a href="">รายงานข้อมูล RTU ที่ใช้งาน</a>
                            </li>
                            <li class="">
                                <a href="">รายการอุปกรณ์เสีย/ชำรุด</a>
                            </li>
                            <li class="">
                                <a href="">รายงานงบประมาณ</a>
                            </li>
                            <li class="">
                                <a href="">สืบค้นข้อมูลแยกตามสาขา</a>
                            </li>
                            <li class="">
                                <a href="">แผนที่ DMA</a>
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
                        <h1><i class="fa fa-file-o"></i>   RMR System</h1>
                        <h4>You can start your customization from this one!</h4>
                    </div>
                </div>
                <!-- END Page Title -->
			    	<!-- Home - Container - MainContent - breadCrumbs  -->
			    	                <!-- BEGIN Breadcrumb -->
                <div>
                    <ul class="breadcrumb">
                        <li class="active"><i class="fa fa-home"></i> Home</li>
                        <!-- <li class="active"> &nbsp; </li> -->
                    </ul>
                </div>
                <!-- END Breadcrumb -->



					
					
			    	
			        <!-- Home - Container - MainContent - menuTile  -->
			    	                        <div class="box" >
                            <div class="box-title">
                                <h3><i class="fa fa-file"></i> Sample Box</h3>
                                <div class="box-tool">
                                    <a data-action="collapse" href="#"><i class="fa fa-chevron-up"></i></a>
                                    <a data-action="close" href="#"><i class="fa fa-times"></i></a>
                                </div>
                            </div>
                            <div class="box-content" style="height:400px;">
                                <!-- <p>Blank page</p> -->
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

        <script src="../../../../javascripts/javascript-rmr-home-rmr.js" type="text/javascript"></script>

    </body>
</html>