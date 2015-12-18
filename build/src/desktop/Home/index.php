<?php
session_start(); //start session.
?>

<!DOCTYPE html>
<html>
    <head>
        <base href="/rmr/build/src/desktop/Home/">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>Home - RMR System</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link href="../../../stylesheets/stylesheet-rmr-home.css" rel="stylesheet" type="text/css" />

        <link rel="shortcut icon" href="../../../images/images-flaty_theme/favicon/favicon.ico">
    </head>
    <body>

        <?php

            if(isset($_SESSION['userName']) && $_SESSION['userName'] != "") {
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
                        <img class="nav-user-photo" src="../../../images/images-flaty_theme/img/demo/avatar/avatar_kapook.jpg" alt="Kapook's Photo" />
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
                        <h1><i class="fa fa-file-o"></i>   WLMA-Admin</h1>
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
			    	

                <!-- BEGIN First Row -->
                <div class="row" id="home-menuTile">
                    
                    <br/>
                    
                    <div class="col-md-4  col-md-offset-2">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="tile tile-big">
                                    <p class="title">WLMA-Admin</p>
                                    <hr/>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4">
                    
 
                        
                        <div class="row">
                            <div class="col-md-12 tile-active">
                                <a class="tile tile-lime" id="menuRmrID" href="#">
                                    <div class="img">
                                        <img  src="../../../images/rmr/Oval-rmr.png"/>
                                    </div>
                                    <div class="content">
                                        <p class="big">RMR</p>
                                        <p class="title hidden-xs ">RTU Maintenance Records</p>
                                    </div>
                                </a>

                                <a class="tile tile-lime" href="#">
                                    <p class="title">RMR System</p>
                                    <p>ระบบติดตามสถานะการบำรุงรักษา RTU</p>
                                    <div class="img img-bottom">
                                       <!--  <i class="fa fa-picture-o"></i> -->
                                    </div>
                                </a>
                            </div>
                        </div>
                        
                        <div class="row">
                            <div class="col-md-12 tile-active">
                                <a class="tile tile-lime" id="menuRtuInfoID" href="./EventsManagement/">
                                    <div class="img">
                                        <img  src="../../../images/rmr/Oval.png"/>
                                    </div>
                                    <div class="content">
                                        <p class="big">RTU</p>
                                        <p class="title hidden-xs ">RTU Information</p>
                                    </div>
                                </a>

                                <a class="tile tile-magenta" href="./EventsManagement/">
                                    <p class="title">RTU Information</p>
                                    <p>ระบบจัดการข้อมูล RTU</p>
                                    <div class="img img-bottom">
                                       <!--  <i class="fa fa-picture-o"></i> -->
                                    </div>
                                </a>
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

        <script src="../../../javascripts/javascript-rmr-home.js" type="text/javascript"></script>

    </body>
</html>