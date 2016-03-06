<?php
session_start(); //start session.
?>
<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
        <title>RMR - RTU Maintenance Records</title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
        <link href="../../../stylesheets/stylesheet-flaty_login.css" rel="stylesheet" type="text/css" />

        <link rel="shortcut icon" href="../../../images/rmr/favicon.ico">
    </head>
    <body id="page-top" data-spy="scroll" data-target=".navbar-custom">

            <nav class="navbar navbar-custom navbar-fixed-top">
        <div class="container">
            <div class="navbar-header page-scroll">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <!-- <a class="navbar-brand" href="index.php">Digital Agency</a> -->
                <a class="navbar-brand logo-nav " href="index.php"><img style="height: 60px" src="../../../images/rmr/logo.png"></a>
            </div>
            <div id="navbar" class="collapse navbar-collapse navbar-right navbar-main-collapse">
                <ul class="nav navbar-nav">
                    <!-- <li class="active"><a href="index.html">Home</a></li>
                    <li><a href="about.html">About</a></li>
                    <li><a href="contact.html">Contact</a></li> -->

                    <!-- <li class="hidden">
                        <a href="#page-top"></a>
                    </li>
                    <li class="page-scroll">
                        <a href="#why">Why Us?</a>
                    </li>
                    <li class="page-scroll">
                        <a href="#who">API</a>
                    </li>
                    <li class="page-scroll">
                        <a href="#clients">Who are we?</a>
                    </li>
                    <li class="page-scroll">
                        <a href="#contact">Contact</a>
                    </li> -->
                </ul>
            </div><!--/.nav-collapse -->
        </div>
    </nav>

 



    <section class="login-section">
        <div class="login-body">
            <div class="container">
                <div class="row login-page">
                    <div class="col-md-3">

                    </div>
                    <div class="col-md-6">

                        <!-- BEGIN Main Content -->
                        <div class="login-wrapper">

                            <!-- Login - Login Form  -->
                                        <!-- BEGIN Login Form -->
            <!-- <form id="form-login" action="../Admin/" method="get"> -->
            <form id="form-login" action="#">
                <h3>Login - WLMA Extension</h3>
                <hr/>
                <div class="form-group">
                    <div class="controls">
                        <input type="text" placeholder="Username" id="username" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="controls">
                        <input type="password" placeholder="Password" id="password" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="controls">
                        <label class="checkbox">
                            <input type="checkbox" value="remember" /> Remember me
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="controls">
                        <button type="submit" class="btn btn-primary form-control" id="button-login">Log In</button>
                    </div>
                </div>
                <hr/>
                <!-- <p class="clearfix">
                    <a href="#" class="goto-forgot pull-left">Forgot Password?</a>
                    <a href="#" class="goto-register pull-right">Sign up now</a>
                </p> -->
            </form>
            <!-- END Login Form -->

                            <!-- Login - Forgot Password Form  -->
                                        <!-- BEGIN Forgot Password Form -->
            <form id="form-forgot" action="../Admin/" method="get" style="display:none">
                <h3>Get back your password</h3>
                <hr/>
                <div class="form-group">
                    <div class="controls">
                        <input type="text" placeholder="Email" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="controls">
                        <button type="submit" class="btn btn-primary form-control">Recover</button>
                    </div>
                </div>
                <hr/>
                <p class="clearfix">
                    <a href="#" class="goto-login pull-left">← Back to login form</a>
                </p>
            </form>
            <!-- END Forgot Password Form -->

                            <!-- Login - Register Form  -->
                                        <!-- BEGIN Register Form -->
            <form id="form-register" action="../Admin/" method="get" style="display:none">
                <h3>Sign up</h3>
                <hr/>
                <div class="form-group">
                    <div class="controls">
                        <input type="text" placeholder="Email" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="controls">
                        <input type="text" placeholder="Username" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="controls">
                        <input type="password" placeholder="Password" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="controls">
                        <input type="password" placeholder="Repeat Password" class="form-control" />
                    </div>
                </div>
                <div class="form-group">
                    <div class="controls">
                        <label class="checkbox">
                            <input type="checkbox" value="remember" /> I accept the <a href="#">user aggrement</a>
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <div class="controls">
                        <button type="submit" class="btn btn-primary form-control">Sign up</button>
                    </div>
                </div>
                <hr/>
                <p class="clearfix">
                    <a href="#" class="goto-login pull-left">← Back to login form</a>
                </p>
            </form>
            <!-- END Register Form -->

                        </div>
                        <!-- END Main Content -->

                    </div>
                    <div class="col-md-3">
                    </div>
                </div>
            </div>
        </div>
    </section>


    

    <!-- <section id="why" class="container content-section">
    <h2 class="text-center"> Why Choose Us?</h2>
    <p class="text-center">Here are just a few reason to choose <strong>Digital Agency</strong> for all of my digital marketing needs.</p>
    <br/>
    <div class="row">
        <div class="col-md-4">
            <div class="block block-icon-left">
                <div class="icon">
                    <i class="fa fa-briefcase fa-5x"></i>
                </div>
                <div class="icon-content">
                    <h3>Professional</h3>
                    <p>Lorem ipsum sit amet, consectatur apdipiscing elit.</p>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="block block-icon-left">
                <div class="icon">
                    <i class="fa fa-money fa-5x"></i>
                </div>
                <div class="icon-content">
                    <h3>Low Cost</h3>
                    <p>Lorem ipsum sit amet, consectatur apdipiscing elit.</p>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="block block-icon-left">
                <div class="icon">
                    <i class="fa fa-dashboard fa-5x"></i>
                </div>
                <div class="icon-content">
                    <h3>Faster</h3>
                    <p>Lorem ipsum sit amet, consectatur apdipiscing elit.</p>
                </div>
            </div>
        </div>



        <div class="col-md-4">
            <div class="block block-icon-left">
                <div class="icon">
                    <i class="fa fa-gear fa-5x"></i>
                </div>
                <div class="icon-content">
                    <h3>Resources & Tools </h3>
                    <p>Lorem ipsum sit amet, consectatur apdipiscing elit.</p>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="block block-icon-left">
                <div class="icon">
                    <i class="fa fa-users fa-5x"></i>
                </div>
                <div class="icon-content">
                    <h3>Large Community</h3>
                    <p>Lorem ipsum sit amet, consectatur apdipiscing elit.</p>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="block block-icon-left">
                <div class="icon">
                    <i class="fa fa-book fa-5x"></i>
                </div>
                <div class="icon-content">
                    <h3>Online Course</h3>
                    <p>Lorem ipsum sit amet, consectatur apdipiscing elit.</p>
                </div>
            </div>
        </div>

    </div>
</section> -->

    

        <script src="../../../javascripts/javascript-flaty_login.js" type="text/javascript"></script>

    </body>
</html>