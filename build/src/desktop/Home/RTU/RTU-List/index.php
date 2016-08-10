<?php
session_start(); //start session.
?>

<!DOCTYPE html>
<html>
    <head>
        <base href="/rmr/build/src/desktop/Home/RTU/RTU-List/">
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>RTU Manager - RTU List</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->

        <link href="../../../../../stylesheets/stylesheet-rmr-home-rtu-rtuList.css" rel="stylesheet" type="text/css" />

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
                            <li class="active">
                                <a href="./">รายการข้อมูล RTU</a>
                            </li>
                            <li class="">
                                <a href="../smart-rtu/">SMART RTU</a>
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
                        <h1><i class="fa fa-dashboard"></i>   รายการข้อมูล RTU</h1>
                        <h4>แสดงรายละเอียด RTU ที่ใช้ใน กปน.</h4>
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
                        <li class="active breadcrumb-rtuLink-rtuList">
                            <span class="rtuLink"> รายการข้อมูล RTU </span>
                            <span class="divider breadcrumb-angleRight-rtuList" style="display:none">   
                                <i class="fa fa-angle-right"></i>
                            </span>
                        </li>
                        <li class="active breadcrumb-title-rtuList" style="display:none">
                            เพิ่มข้อมูล RTU / แก้ไขข้อมูล RTU
                        </li>
                    </ul>
                </div>
                <!-- END Breadcrumb -->






			    	<!-- Home - Container - MainContent - sampleBox  -->
			    	<div class="box canvas-rtuInformation" id="canvas-rtuInformation-default">
        <div class="box-title">
            <h3><i class="fa fa-file"></i> รายการข้อมูล RTU</h3>
            <div class="box-tool">
                <!-- <a data-action="collapse" href="#"><i class="fa fa-chevron-up"></i></a> -->
                <!-- <a data-action="close" href="#"><i class="fa fa-times"></i></a> -->
            </div>
        </div>
        <div class="box-content" >

            <div class="btn-toolbar pull-right clearfix">
                <!-- <div class="btn-group">
                    <a class="btn btn-circle show-tooltip" title="Add new record" href="#"><i class="fa fa-plus"></i></a>
                    <a class="btn btn-circle show-tooltip" title="Edit selected" href="#"><i class="fa fa-edit"></i></a>
                    <a class="btn btn-circle show-tooltip" title="Delete selected" href="#"><i class="fa fa-trash-o"></i></a>
                </div> -->
                <div class="btn-group">
                    <!-- <a class="btn btn-circle show-tooltip goto-addEvent" title="Add new record" href="#" id="rtuList-goto-add"> -->
                    <!-- <i class="fa fa-exchange"></i> -->
                    <a class="btn btn-circle" title="Sync Data" href="#" id="sync-data">
                    <span class="glyphicon glyphicon-transfer"></span>
                    </a>
                </div>
                <div class="btn-group">
                    <!-- <a class="btn btn-circle show-tooltip" title="Print" href="#"><i class="fa fa-print"></i></a> -->
                    
                    <!-- <a class="btn btn-circle show-tooltip" title="Export to PDF" href="#"><i class="fa fa-file-text-o"></i></a>
                    <a class="btn btn-circle show-tooltip" title="Export to Exel" href="#"><i class="fa fa-table"></i></a> -->
                </div>
                <div class="btn-group">
                    <a class="btn btn-circle show-tooltip" title="Refresh" id="refresh-data" href="#"><i class="fa fa-repeat"></i></a>
                </div>
            </div>

<br/><br/>
<div class="clearfix"></div>


            <div class="table-responsive" style="border:0">
                <table class="table table-advance" id="mainRtuDataTable" style="width: 100% !important;" >
                    <thead>
                        <tr>
                            <th class="text-center " style="vertical-align:middle">DM</th>
                            <th class="text-center hidden-xs hidden-sm" style="vertical-align:middle">BRANCH</th>
                            <th class="text-center hidden-xs hidden-sm" style="vertical-align:middle">ZONE</th>
                            <th class="text-center hidden-xs hidden-sm" style="vertical-align:middle">DMA</th>
                            <th class="text-center " style="vertical-align:middle">IP</th>
                            <th class="text-center hidden-xs hidden-sm" style="vertical-align:middle">COMM</th>
                            <th class="text-center hidden-xs hidden-sm" style="vertical-align:middle">(LAT, LNG)</th>
                            <th class="text-center hidden-xs hidden-sm" style="vertical-align:middle">LOCATION</th>
                            <th ></th>
                        </tr>
                    </thead>
                     
                    <tbody>
                     
                        <!-- <tr>
                            <th >DM-01-01-01-01</th>
                            <th >B01</th>
                            <th >10.202.68.253</th>
                            <th ></th>
                            <th ></th>
                        </tr> -->
                        
                    </tbody>       
                </table>
            </div>             
        </div>
</div>

                        
			    	<div class="row canvas-rtuInformation" id="canvas-rtuInformation-mapBox" style="display:none">
    <div class="col-md-12">
        <div class="box">
            <div class="box-title">
                <h3><i class="fa fa-bars"></i> แผนที่แสดงตำแหน่ง RTU</h3>
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
                        <div class="col-md-12" id="map"></div>
                        <!-- END Left Side -->
                    </div>
                </div>
                </form>
            </div>
        </div>
    </div>

    <div class="row" id="rtuSearchForm" style="display:none">
      <div class="col-sm-12">
              <form action="#" class="form-horizontal" id="formSearch" method="post">

                  <div class="form-group form-group-sm">
                     <label class="col-sm-3 control-label">ค้นหา:</label>
                     <div class="col-sm-9 controls">
                        <label class="radio-inline">
                            <input type="radio" name="optionsRadios2" value="option1" id="optionDatabase" /> ฐานข้อมูล
                        </label>
                        <label class="radio-inline">
                            <input type="radio" name="optionsRadios2" value="option2" id="optionGoogle" checked /> Google
                        </label> 
                     </div>
                  </div>

                  <div class="form-group form-group-sm">
                    <label class="col-sm-3 control-label"></label>
                      <div class="col-sm-9 controls">
                          <select class="form-control chosen" data-placeholder="เลือกรายการ" tabindex="1">
                              <option value=""> </option>
                              <option value="Category 1">Category 1</option>
                              <option value="Category 2">Category 2</option>
                              <option value="Category 3">Category 5</option>
                              <option value="Category 4">Category 4</option>
                          </select>
                      </div>
                  </div>

              </form>
      </div>
    </div>

    <div class="row" id="rtuAddForm" >
      <div class="col-sm-12">
              <form action="#" class="form-horizontal" id="formRTU_Information" method="post">
                  <div class="form-group form-group-sm">
                      <label class="col-sm-3 control-label" for="dm">DM:</label>
                      <div class="col-sm-9 controls">
                          <input type="text" name="dm" id="txtDM" class="form-control" disabled/>
                      </div>
                  </div>

                  <div class="form-group form-group-sm">
                      <label class="col-sm-3 control-label" for="dma">DMA:</label>
                      <div class="col-sm-9 controls">
                          <input type="text" name="dma" id="txtDMA" class="form-control" disabled/>
                      </div>
                  </div>

                  <div class="form-group form-group-sm">
                      <label class="col-sm-3 control-label" for="ip">IP:</label>
                      <div class="col-sm-9 controls">
                          <input type="text" name="ip" id="txtIP" class="form-control" disabled/>
                      </div>
                  </div> 

                  <div class="form-group form-group-sm">
                      <label class="col-sm-3 control-label" for="location">Location:</label>
                      <div class="col-sm-9 controls">
                          <textarea class="form-control" name="location" id="txtLocation" rows="2" disabled></textarea>
                      </div>
                  </div>

                  
                  <div class="form-group form-group-sm">
                      <label class="col-sm-3 control-label" for="dm">RPC:</label>
                      <div class="col-sm-9 controls">
                          <input type="text" name="rpc" id="txtRPC" class="form-control" disabled/>
                          <span class="help-inline">(RTU Pin Code, RPC-xxxx)</span>
                      </div>

                  </div>

                  <!-- <div class="form-group">
                  <label class="col-sm-3 control-label">RPC:</label>
                    <div class="col-sm-9 controls">
                      <div class="input-group">
                        <input class="form-control" type="text" name="rpc" id="txtRPC" placeholder="RPC-xxxx" >
                      </div>
                      <span class="help-inline">(RTU Pin Code, RPC-xxxx)</span>
                    </div>
                  </div> -->

                  <!-- <div class="form-group form-group-sm">
                      <label class="col-sm-3 control-label" for="lat_lng">ค่าพิกัด:</label>
                      <div class="col-sm-9 controls">
                          <input type="text" name="lat_lng" id="txtLatLng" class="form-control" data-mask="(0.0000000, 0.0000000)"/>
                          <span class="help-inline">(Latitude, Longitude)</span>
                      </div>
                  </div> -->

                  <div class="form-group">
                  <label class="col-sm-3 control-label">ค่าพิกัด:</label>
                    <div class="col-sm-9 controls">
                      <div class="input-group">
                        <input type="text" name="lat_lng" id="txtLatLng" placeholder="(Latitude, Longitude)" class="form-control">
                        <span class="input-group-btn">
                          <button class="btn btn-primary" type="button" id="btnSearchByLatLng"><i class="fa fa-search"></i></button>
                        </span>
                      </div>
                      <span class="help-inline">(Latitude, Longitude)</span>
                    </div>
                  </div>

                  <!-- <div class="form-group">
                    <label class="col-sm-3 control-label">ค่าพิกัด:</label>
                    <div class="col-sm-9 controls">
                      <div class="input-group">
                        <input type="text" placeholder="Search here..." class="form-control" />
                        <span class="input-group-addon"><i class="fa fa-search"></i></span>
                      </div>
                      <span class="help-inline">(Latitude, Longitude)</span>
                    </div>
                  </div> -->

                  <div class="form-group form-group-sm">
                      <label class="col-sm-3 control-label" for="remark">หมายเหตุ:</label>
                      <div class="col-sm-9 controls">
                          <textarea class="form-control" name="remark" id="txtRemark" rows="2"></textarea>
                      </div>
                  </div>

                  <div class="form-group">
                      <div class="col-sm-9 col-sm-offset-3">
                          <button type="button" id="formRTU_Information-btnSave" class="btn btn-primary col-sm-6">บันทึกข้อมูล</button>
                          <!-- <input type="submit" class="btn btn-primary col-sm-6" value="บันทึกข้อมูล"> -->
                          <!-- <button type="button btn-primary" class="btn">บันทึกข้อมูล</button> -->
                          <button type="button" id="formRTU_Information-btnCancel" class="btn btn-danger col-sm-6">ยกเลิก</button>
                      </div>
                  </div>

              </form>
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
        

        <script src="../../../../../javascripts/javascript-rmr-home-rtu-rtuList.js" type="text/javascript"></script>
        <script src="http://maps.google.com/maps/api/js?v=3.2&sensor=false"></script>
        <script src="http://matchingnotes.com/javascripts/leaflet-google.js"></script>
        <script src="https://cdn.jsdelivr.net/leaflet.esri/1.0.2/esri-leaflet.js"></script>
        

    </body>
</html>