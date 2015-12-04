<?php
session_start(); //start session.
?>

<?php
    date_default_timezone_set("Asia/Bangkok");

    require_once '../../packages/autoload.php';


    /* Connect Database Manager Partial */
        // /* เชื่อมต่อ DB2 */
    $driver_db2 = "{IBM DB2 ODBC DRIVER}";
    $database_db2 = "iWLMA";
    $hostname_db2 = "172.16.194.210";
    $port_db2 = 50000;
    $user_db2 = "db2admin";
    $password_db2 = "password";

    $conn_string_db2 = "DRIVER=$driver_db2;DATABASE=$database_db2;";
    $conn_string_db2 .= "HOSTNAME=$hostname_db2;PORT=$port_db2;PROTOCOL=TCPIP;";
    $conn_string_db2 .= "UID=$user_db2;PWD=$password_db2;";

    try {
        $conn_db2 = db2_connect($conn_string_db2, '', '');

        $client = db2_client_info($conn_db2);

        // if ($client) {
        //     echo var_dump($client->APPL_CODEPAGE);
        //     echo "DRIVER_NAME: ";           var_dump( $client->DRIVER_NAME );
        //     echo "DRIVER_VER: ";            var_dump( $client->DRIVER_VER );
        //     echo "DATA_SOURCE_NAME: ";      var_dump( $client->DATA_SOURCE_NAME );
        //     echo "DRIVER_ODBC_VER: ";       var_dump( $client->DRIVER_ODBC_VER );
        //     echo "ODBC_VER: ";              var_dump( $client->ODBC_VER );
        //     echo "ODBC_SQL_CONFORMANCE: ";  var_dump( $client->ODBC_SQL_CONFORMANCE );
        //     echo "APPL_CODEPAGE: ";         var_dump( $client->APPL_CODEPAGE );
        //     echo "CONN_CODEPAGE: ";         var_dump( $client->CONN_CODEPAGE );
        // } else {
        //     echo "Error";
        // }


        if(!$conn_db2) {
            echo db2_conn_errormsg();
        } else {
            //echo "Hello World, from the IBM_DB2 PHP extension!";
            //db2_close($conn_db2);
        }
    } 
    catch (Exception $e) {
        //echo $e;
    }
        $dsn = "mysql:dbname=rmr_db;host=localhost;charset=UTF8";
    $username = "root";
    $password = "";
    $pdo = new PDO($dsn, $username, $password);
    $db = new NotORM($pdo);
        // /* เชื่อมต่อ MySQL บนเครื่อง 172.16.194.210 (http://wlma-mt.wms.mwa/) */
    // $dsn = "mysql:dbname=rmr_db;host=localhost;charset=UTF8";
    // $username = "root";
    // $password = "P@ssw0rd";
    // $pdo = new PDO($dsn, $username, $password);
    // $db = new NotORM($pdo);






    /* Slim framework */
    $app = new \Slim\Slim();

    // $corsOptions = array(
    //     "origin" => "*",
    //     "exposeHeaders" => array("X-My-Custom-Header", "X-Another-Custom-Header"),
    //     "maxAge" => 1728000,
    //     "allowCredentials" => True,
    //     "allowMethods" => array("POST, GET"),
    //     "allowHeaders" => array("X-PINGOTHER")
    // );


    /* CorsSlim is added */
    // $app->add(new \CorsSlim\CorsSlim($corsOptions));



    /* Test Manager */
    $app->get('/testManager/getMsg/:name',function($name) use ($app) { getMsg($app, $name); });

    /* Login manager */
    $app->post('/loginManager/checkUserPassword/',function() use ($app, $pdo, $db) { checkUserPassword($app, $pdo, $db); });
    $app->post('/loginManager/logout/',function() use ($app, $pdo, $db) { logout($app, $pdo, $db); });


    /* WLMA manager */
    $app->post('/wlmaManager/checkUserPasswordFromWLMA/',function() use ($app, $pdo, $conn_db2) { checkUserPasswordFromWLMA($app, $pdo, $conn_db2); });

    // $corsOptions = array("origin" => "*");
    // $app->post('/loginManager/logout/',\CorsSlim\CorsSlim::routeMiddleware($corsOptions) ,function() use ($app, $pdo, $db) { 
    //     logout($app, $pdo, $db); 
    // });



    
	

	$app->run();

    /* Test Manager Partial */
        /**
     *
     * @apiName GetMsg
     * @apiGroup TEST Manager
     * @apiVersion 0.1.0
     *
     * @api {get} /testManager/getMsg/:name GET Msg (v 0.1.0)
     * @apiDescription คำอธิบาย : ทดสอบ GET - RESTful Web Service
     *
     *
     * @apiParam {String} name     New name of the user
     *
     * @apiSampleRequest /testManager/getMsg/:name
     *
     * @apiSuccess {String} msg แสดงข้อความทักทายผู้ใช้งาน
     *
     * @apiSuccessExample Example data on success:
     * {
     *   "msg": "Hello, anusorn"
     * }
     *
     * @apiError UserNotFound The <code>id</code> of the User was not found.
     * @apiErrorExample {json} Error-Response:
     *     HTTP/1.1 404 Not Found
     *     {
     *       "error": "UserNotFound"
     *     }
     *
     */

    function getMsg($app, $name) {

        //echo "สวัสดี, $name";
        $return_m = array("msg" => "สวัสดี, $name");

        $app->response()->header("Content-Type", "application/json");
        echo json_encode($return_m);
    });

    /* Login Manager Partial */
    	/**
	 *
	 * @apiName CheckUserPassword
	 * @apiGroup Login Manager
	 * @apiVersion 0.1.0
	 *
	 * @api {post} /loginManager/checkUserPassword/ Check User Password
	 * @apiDescription คำอธิบาย : ในส่วนนี้จะมีหน้าที่ตรวจสอบ User และ Password ก่อนเข้าใช้งานระบบ
	 *
	 *
	 * @apiSampleRequest /loginManager/checkUserPassword/
	 *
	 * @apiSuccess {String} msg แสดงข้อความทักทายผู้ใช้งาน
	 *
	 * @apiSuccessExample Example data on success:
	 * {
	 *   "msg": "Hello, anusorn"
	 * }
	 *
	 * @apiError UserNotFound The <code>id</code> of the User was not found.
	 * @apiErrorExample {json} Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "UserNotFound"
	 *     }
	 *
	 */
	 function checkUserPassword($app, $pdo, $db) {

	 	/* ************************* */
        /* เริ่มกระบวนการรับค่าพารามิเตอร์จากส่วนของ Payload ซึ่งอยู่ในรูปแบบ JSON */
        /* ************************* */
        $headers = $app->request->headers;
        $ContetnType = $app->request->headers->get('Content-Type');

        /**
        * apidoc @apiSampleRequest, iOS RESTKit use content-type is "application/json"
        * Web Form, Advance REST Client App use content-type is "application/x-www-form-urlencoded"
        */
        if ($ContetnType == "application/json") {

	        $request = $app->request();
	        $result = json_decode($request->getBody());

	        /* receive request */
	        $postUserName = $result->userName;
	        $postPassWord = $result->passWord;


		} else if ($ContetnType == "application/x-www-form-urlencoded"){

		    //$userID = $app->request()->params('userID_param');
		    //$userID = $app->request()->post('userID_param');
		}


	 	//$_SESSION['userName'] = $postUserName;

	 	$_SESSION['userName'] = "aaa";

	  	//$return_m = array("msg" => "Hello, Current PHP version: ". phpversion());
	  	$return_m = array("UserName" => $_SESSION['userName'], "PassWord" => $postPassWord);
	    echo json_encode($return_m);

	 }
	 
    	/**
	 *
	 * @apiName Logout
	 * @apiGroup Login Manager
	 * @apiVersion 0.1.0
	 *
	 * @api {post} /loginManager/logout/ Log Out
	 * @apiDescription คำอธิบาย : ในส่วนนี้จะมีหน้าที่ Log out เพื่อออกจากระบบ
	 *
	 *
	 * @apiSampleRequest /loginManager/logout/
	 *
	 * @apiSuccess {String} msg แสดงข้อความทักทายผู้ใช้งาน
	 *
	 * @apiSuccessExample Example data on success:
	 * {
	 *   "msg": "Hello, anusorn"
	 * }
	 *
	 * @apiError UserNotFound The <code>id</code> of the User was not found.
	 * @apiErrorExample {json} Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "UserNotFound"
	 *     }
	 *
	 */
	 function logout($app, $pdo, $db) {

	 	/* ************************* */
        /* เริ่มกระบวนการรับค่าพารามิเตอร์จากส่วนของ Payload ซึ่งอยู่ในรูปแบบ JSON */
        /* ************************* */
        $headers = $app->request->headers;
        $ContetnType = $app->request->headers->get('Content-Type');

        /**
        * apidoc @apiSampleRequest, iOS RESTKit use content-type is "application/json"
        * Web Form, Advance REST Client App use content-type is "application/x-www-form-urlencoded"
        */
        if ($ContetnType == "application/json") {

	        $request = $app->request();
	        $result = json_decode($request->getBody());

	        /* receive request */
	        // $postUserName = $result->userName;
	        // $postPassWord = $result->passWord;


		} else if ($ContetnType == "application/x-www-form-urlencoded"){

		    //$userID = $app->request()->params('userID_param');
		    //$userID = $app->request()->post('userID_param');
		}


	 	//$_SESSION = array();
	 	//session_unregister("userName"); // ลบบางตัวที่ใช้งาน
		session_destroy();					// ลบทั้งหมด

	  	$return_m = array("msg" => "Good bye - user logout.");
	  	
	  	$app->response()->header("Content-Type", "application/json");
	    echo json_encode($return_m);

	 }
	 

    /* WLMA Manager Partial */
    	/**
	 *
	 * @apiName CheckUserPasswordFromWLMA
	 * @apiGroup Wlma Manager
	 * @apiVersion 0.1.0
	 *
	 * @api {post} /wlmaManager/checkUserPasswordFromWLMA/ Check User Password from WLMA
	 * @apiDescription คำอธิบาย : ในส่วนนี้จะมีหน้าที่ตรวจสอบสิทธิ์การเข้าใช้งานระบบ โดยจะเป็นการส่งค่า User & Password ไปตรวจสอบที่ฐานข้อมูลในระบบ WLMA
	 *
	 *
	 * @apiSampleRequest /wlmaManager/checkUserPasswordFromWLMA/
	 *
	 * @apiSuccess {String} msg แสดงข้อความทักทายผู้ใช้งาน
	 *
	 * @apiSuccessExample Example data on success:
	 * {
	 *   "msg": "Hello, anusorn"
	 * }
	 *
	 * @apiError UserNotFound The <code>id</code> of the User was not found.
	 * @apiErrorExample {json} Error-Response:
	 *     HTTP/1.1 404 Not Found
	 *     {
	 *       "error": "UserNotFound"
	 *     }
	 *
	 */
	 function checkUserPasswordFromWLMA($app, $pdo, $conn_db2) {

	    /* ************************* */
        /* เริ่มกระบวนการเชื่อมต่อฐานข้อมูล DB2 ของ WLMA */
        /* ************************* */
        $reports = array();

        $sql = "select * from AUTH_USER_INFO order by USER_ID";

        if ($conn_db2) {
            # code...
            $stmt = db2_exec($conn_db2, $sql);

            while ($row = db2_fetch_array($stmt)) {
                
                $userID = iconv("TIS-620", "UTF-8",$row[0]);
                $name = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row[1]);

                $reports[] = array(
                	"USER_ID" => $userID,
                	"NAME" => $name
                );
            }
        }

        $rowCount = count($reports);

        /* ************************* */
        /* เริ่มกระบวนการส่งค่ากลับ */
        /* ************************* */
        $resultText = "success";

        $reportResult = array("result" =>  $resultText, "msg" => "สวัสดี, $name", "count" => $rowCount, "rows" => $reports);
        //$reportResult = array("result" =>  $resultText, "msg" => "สวัสดี, $name");
        //$reportResult = array("result" =>  $resultText);
        
        $app->response()->header("Content-Type", "application/json");
        echo json_encode($reportResult);

	 }
	 
    
?>