<?php
session_start(); //start session.
?>

                <!-- Home - Container - MainContent - PageTitle  -->
                                <!-- BEGIN Page Title -->
                <div class="page-title">
                    <div>
                        <h1><i class="fa fa-file-o"></i>  {{pageTitle}}</h1>
                        <h4> {{pageDescription}}</h4>
                    </div>
                </div>
                <!-- END Page Title -->


                <!-- Home - Container - MainContent - breadCrumbs  -->
                                <!-- BEGIN Breadcrumb -->
                <div>
                    <ul class="breadcrumb">
                        <li>
                            <i class="fa fa-home"></i>
                            <a href="../../index.php">Home</a>
                            <span class="divider"><i class="fa fa-angle-right"></i></span>
                        </li>
                        <li class="active">
                            RTU Information
                            <span class="divider"><i class="fa fa-angle-right"></i></span>
                        </li>
                        <li class="active">
                            {{breadCrumbs}}
                            <span class="divider" ng-show="showBreadCrumbsArrowLevel3"><i class="fa fa-angle-right" ></i></span>
                        </li>
                        <li class="active" ng-show="showBreadCrumbsArrowLevel3">{{breadCrumbsMap}}</li>
                    </ul>
                </div>
                <!-- END Breadcrumb -->







                <!-- BEGIN Main Content -->
                <div class="row" >
                    <div class="col-md-12" >

            
                        <!-- Home - Container - Blank - MainContent - sampleBox  -->
                                                <div class="box" >
                            <div class="box-title">
                                <h3><i class="fa fa-file"></i> Sample Box</h3>
                                <div class="box-tool">
                                    <a data-action="collapse" href="#"><i class="fa fa-chevron-up"></i></a>
                                    <a data-action="close" href="#"><i class="fa fa-times"></i></a>
                                </div>
                            </div>
                            <div class="box-content" style="height:400px;" >
                                <!-- <p>Blank page</p> -->

                                <p>This is your first angular expression: {{ 1 + 2 }}</p>

                                <!-- <ng-view></ng-view> -->
                                <!-- <div class="ng-view"></div> -->

                                
                                
                            </div>
                        </div>

                    </div>
                </div>
                
                <br><br><br><br><br><br><br><br><br><br><br><br>
                <br><br><br><br><br><br><br><br><br><br><br><br>
                
                <!-- END Main Content -->
                

     

                <a id="btn-scrollup" class="btn btn-circle btn-lg" href="#"><i class="fa fa-chevron-up"></i></a>



