<?php
session_start(); //start session.
?>

<!DOCTYPE html>
<html>
    <head>
        <base href="/rmr/build/src/desktop/Home/RTU/Information/">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>RTU Infomation - ข้อมูล RTU</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link href="../../../../../stylesheets/stylesheet-home-rtu-information.css" rel="stylesheet" type="text/css" />

        <link rel="shortcut icon" href="../../../../../images/images-flaty_theme/favicon/favicon.ico">
    </head>
    <body ng-app="rtuInformationModule">

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
                    WLMA-MIS
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
                        <img class="nav-user-photo" src="../../../../../images/images-flaty_theme/img/demo/avatar/avatar_kapook.jpg" alt="Kapook's Photo" />
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
                                            <li class="">
                        <a href="../../">
                            <i class="fa fa-dashboard"></i>
                            <span>Dashboard</span>
                        </a>
                    </li>
                        
                        <!-- sidebar - RTU Info  -->
                                            <li class="active">
                        <a href="../../RTU/Information/" class="dropdown-toggle">
                            <i class="fa fa-desktop"></i>
                            <span>RTU Information</span>
                            <b class="arrow fa fa-angle-right"></b>
                        </a>

                        <!-- BEGIN Submenu -->
                        <ul class="submenu" id="sideMenuRtuInfo">
                            <li class="">
                                <a ng-href="./#/B01" >บางกอกน้อย (B01)</a>
                                <ul>
                                    <li>
                                        <a ng-href="./#/B01/Map">
                                            <i class="fa fa-globe"></i><span> แผนที่</span>
                                        </a>
                                    </li>
                                </ul>
                            </li>
                            <li class="">
                                <a ng-href="./#/B02" >ตากสิน (B02)</a>
                            </li>
                            <li class="">
                                <a ng-href="./#/B03" >พญาไท (B03)</a>
                            </li>
                            <li class="">
                                <a ng-href="./#/B04" >นนทบุรี (B04)</a>
                            </li>
                            <li class="">
                                <a ng-href="./#/B05" >ทุ่งมหาเมฆ (B05)</a>
                            </li>
                            <li class="">
                                <a ng-href="./#/B06" >แม้นศรี (B06)</a>
                            </li>
                            <li class="">
                                <a ng-href="./#/B07" >สุขุมวิท (B07)</a>
                            </li>
                            <li class="">
                                <a ng-href="./#/B11" >ภาษีเจริญ (B11)</a>
                            </li>
                            <li class="">
                                <a ng-href="./#/B12" >ลาดพร้าว (B12)</a>
                            </li>
                            <li class="">
                                <a ng-href="./#/B13" >พระโขนง (B13)</a>
                            </li>
                            <li class="">
                                <a ng-href="./#/B14" >สุขสวัสดิ์ (B14)</a>
                            </li>
                            <li class="">
                                <a ng-href="./#/B15" >ประชาชื่น (B15)</a>
                            </li>
                            <li class="">
                                <a ng-href="./#/B16" >บางเขน (B16)</a>
                            </li>
                            <li class="">
                                <a ng-href="./#/B17" >สุมทรปราการ (B17)</a>
                            </li>
                            <li class="">
                                <a ng-href="./#/B53" >มีนบุรี (B53)</a>
                            </li>
                            <li class="">
                                <a ng-href="./#/B54" >บางบัวทอง (B54)</a>
                            </li>
                            <li class="">
                                <a ng-href="./#/B55" >สุวรรณภูมิ (B55)</a>
                            </li>
                            <li class="">
                                <a ng-href="./#/B56" >มหาสวัสดิ์ (B56)</a>
                            </li>
                        </ul>
                        <!-- END Submenu -->
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
                                <a href="../../RMR/ReportRTU/">รายงานข้อมูล RTU ที่ใช้งาน</a>
                            </li>
                            <li class="">
                                <a href="../../RMR/ReportDeviceRepair/">รายการอุปกรณ์เสีย/ชำรุด</a>
                            </li>
                            <li class="">
                                <a href="../../RMR/ReportCost/">รายงานงบประมาณ</a>
                            </li>
                            <li class="">
                                <a href="../../RMR/SearchRTU/">สืบค้นข้อมูลแยกตามสาขา</a>
                            </li>
                            <li class="">
                                <a href="../../RMR/MapDMA/">แผนที่ DMA</a>
                            </li>
                        </ul>
                        <!-- END Submenu -->
                    </li>

                        <!-- sidebar - USER  -->
                                            <li class="">
                        <a href="#" class="dropdown-toggle">
                            <i class="fa fa-desktop"></i>
                            <span>Administrator</span>
                            <b class="arrow fa fa-angle-right"></b>
                        </a>

                        <!-- BEGIN Submenu -->
                        <ul class="submenu">
                            <li class="">
                                <a href="../../Administrator/Member/">ผู้ใช้งานระบบ</a>
                            </li>
                            <li class="">
                                <a href="../../Administrator/AccessPolicy/">กำหนดสิทธิการใช้งาน</a>
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

            <!-- Home - Container - MainContent  -->
                        <!-- BEGIN Content -->
            <div id="main-content" >

<div style="width:100%; height:100%;" class="ng-view">55</div>
<div style="width:100%; height:500px; background-color:red" id="map" class="map">55</div>

            </div>
            <!-- END Content -->

            






        </div>
        <!-- END Container -->

        <script src="../../../../../javascripts/javascript-home-rtu-information.js" type="text/javascript"></script>

    </body>
</html>