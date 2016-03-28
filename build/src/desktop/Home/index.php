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

        <link rel="shortcut icon" href="../../../images/rmr/favicon.ico">
    </head>
    <body>

        <!-- PHP Script - Check JWT Sesstion -->
                <?php

            if(isset($_SESSION['jwt']) && $_SESSION['jwt'] != "") {
                    //Task to do
            } else {

                header('Location: ../Login/index.php'); //redirect URL
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
                        <h1><i class="fa fa-file-o"></i>   WLMA Extension</h1>
                        <h4>ระบบ WLMA Extension</h4>
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
                                    <p class="title">WLMA Extension</p>
                                    <hr/>
                                    <p><strong>ระบบ WLMA Extension</strong> คือ ระบบที่จัดทำขึ้นเพื่อเสริมศักยภาพ ระบบ WLMA ที่มีอยู่แล้วให้ดียิ่งขึ้นไป </p>
                                    <p>นอกจากนี้ ระบบ WLMA Extension เป็นระบบที่จะรองรับความต้องการใหม่ๆ จากผู้ใช้งาน WLMA เพื่อให้การบริหารการลดน้ำสูญเสียมีประสิทธิภาพมากขึ้น</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-4" id="home-rmr-menuTile">
                    
                        


                    </div>

                </div>
                <!-- END First Row -->

                
      

			    	
			    	

			        <footer>
			            <p>Copyright © 2016 MWA. All rights reserved.</p>
			        </footer>
			        <a id="btn-scrollup" class="btn btn-circle btn-lg" href="#"><i class="fa fa-chevron-up"></i></a>
			    </div>
			    <!-- END Content -->
        </div>
        <!-- END Container -->

        <script src="../../../javascripts/javascript-rmr-home.js" type="text/javascript"></script>

        <script id="home-rmr-template" type="text/x-handlebars-template">

  	<div class="row" style="display: {{displayRMR}}">
  		<div class="col-md-12 tile-active">
  			<a class="tile tile-lime" id="menuRmrID" href="./RMR/" data-stop="10000">
  				<div class="img">
  					<img  src="../../../images/rmr/Oval-rmr.png"/>
  				</div>
  				<div class="content">
  					<p class="big">RMR</p>
  					<p class="title hidden-xs ">RTU Maintenance Records</p>
  				</div>
  			</a>

  			<a class="tile tile-lime backgroundMenuTile" id="menuRmrID-backgroundMenuTile" href="./RMR/" data-stop="1000">
  				<p class="title" style="color:#4A4849">RMR System</p>
  				<p style="color:#4A4849">ระบบติดตามสถานะการบำรุงรักษา RTU</p>
  				<div class="img img-bottom">
  					<!--  <i class="fa fa-picture-o"></i> -->
  				</div>
  			</a>
  		</div>
  	</div>

  	<div class="row" style="display: {{displayRTU}}">
  		<div class="col-md-12 tile-active">
  			<a class="tile tile-lime" id="menuRtuInfoID" href="./RTU/" data-stop="11000">
  				<div class="img">
  					<img  src="../../../images/rmr/Oval.png"/>
  				</div>
  				<div class="content">
  					<p class="big">RTU</p>
  					<p class="title hidden-xs ">RTU Information</p>
  				</div>
  			</a>

  			<a class="tile tile-magenta backgroundMenuTile" id="menuRtuInfoID-backgroundMenuTile" href="./RTU/" data-stop="1000">
  				<p class="title" style="color:#4A4849">RTU Information</p>
  				<p style="color:#4A4849">ระบบจัดการข้อมูล RTU</p>
  				<div class="img img-bottom">
  					<!--  <i class="fa fa-picture-o"></i> -->
  				</div>
  			</a>
  		</div>
  	</div>

  	<div class="row" style="display: {{displayREPORT}}">
  		<div class="col-md-12 tile-active">
  			<a class="tile tile-lime" id="menuReportID" href="./REPORT/" data-stop="12000">
  				<div class="img">
  					<img  src="../../../images/rmr/home-menuTile-report.png"/>
  				</div>
  				<div class="content">
  					<p class="big">Report</p>
  					<p class="title hidden-xs ">WLMA Report</p>
  				</div>
  			</a>

  			<a class="tile tile-magenta " id="menuReportID-backgroundMenuTile" href="./REPORT/" data-stop="1000">
  				<p class="title" style="color:#4A4849">Report</p>
  				<p style="color:#4A4849">รายงานข้อมูลจากระบบ WLMA</p>
  				<div class="img img-bottom">
  					<!--  <i class="fa fa-picture-o"></i> -->
  				</div>
  			</a>
  		</div>
  	</div>


</script>

    </body>
</html>