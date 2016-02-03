<?php
session_start(); //start session.
?>

<?php
    date_default_timezone_set("Asia/Bangkok");

    require_once '../../packages/autoload.php';

    /* Connect Database Manager Partial */
    $conn_db2 = "";
        $dsn = "mysql:dbname=rmr_db;host=localhost;charset=UTF8";
    $username = "root";
    $password = "";
    $pdo = new PDO($dsn, $username, $password);
    $db = new NotORM($pdo);

    /* Secret Key */
    $key = "supersecretkeyyoushouldnotcommittogithub";

    /* Slim framework 2.x */
    $app = new \Slim\Slim();

    use \Firebase\JWT\JWT;
    $app->add(new \Slim\Middleware\JwtAuthentication([
         "secure" => false,
        "relaxed" => ["localhost"],
        "secret" => $key,
        //"path"=> "/user",
        "callback" => function ($options) use ($app) {
            $app->jwt = $options["decoded"];
        },
        "rules" => [
            new \Slim\Middleware\JwtAuthentication\RequestPathRule([
                "path" => ["/token", "/user", "/rtuManager/informationOnload/"],
                "passthrough" => ["/user"]
            ]),
            new \Slim\Middleware\JwtAuthentication\RequestMethodRule([
                "passthrough" => ["OPTIONS"]
            ])
        ]
    ]));


    /* Test Manager */
    $app->get('/testManager/getMsg/:name',function($name) use ($app) { getMsg($app, $name); });
        $app->get("/user/", function () use ($app) {

        // $app->response->headers->set('Content-Type', 'application/json');
        // echo json_encode(array("token" => $$app->jwt));

      $key = "supersecretkeyyoushouldnotcommittogithub";
      $token = array(
          "id" => "1",
          "exp" => time() + (60 * 10),
          "scope" => ["read", "write", "delete"]
          );
      $jwt = JWT::encode($token, $key);
      //$jwt = JWT::encode($token, $key, 'HS512');

      $_SESSION['userName'] = "aaa";

      $app->response->headers->set('Content-Type', 'application/json');
      echo json_encode(array("token" =>$jwt));

    });
        $app->get('/login/', function () use ($app) {

      // $params = $app->request()->getBody();
      // $key = "supersecretkeyyoushouldnotcommittogithub";
      // $token = array(
      //     "id" => "2",
      //     "exp" => time() + (60 * 60 * 24),
      //     "scope" => ["read", "write", "delete"]
      //     );
      // $jwt = JWT::encode($token, $key);
      // $app->response->headers->set('Content-Type', 'application/json');
      // echo json_encode(array("token" =>$jwt));


      $tokenId    = base64_encode(mcrypt_create_iv(32));
      $issuedAt   = time();
      $notBefore  = $issuedAt + 10;             //Adding 10 seconds
      $expire     = $notBefore + 60;            // Adding 60 seconds
      $serverName = gethostname();              // Retrieve the server name from config file
      
      /*
       * Create the token as an array
       */
      $data = [
          'iat'  => $issuedAt,         // Issued at: time when the token was generated
          'jti'  => $tokenId,          // Json Token Id: an unique identifier for the token
          'iss'  => $serverName,       // Issuer
          'nbf'  => $notBefore,        // Not before
          'exp'  => $expire,           // Expire
          'data' => [                  // Data related to the signer user
              'userId'   => '1234', // userid from the users table
              'userName' => 'josh', // User name
          ]
      ];


      /*
       * Code here...
       */

          /*
           * Extract the key, which is coming from the config file. 
           * 
           * Best suggestion is the key to be a binary string and 
           * store it in encoded in a config file. 
           *
           * Can be generated with base64_encode(openssl_random_pseudo_bytes(64));
           *
           * keep it secure! You'll need the exact key to verify the 
           * token later.
           */
          $secretKey = base64_decode('supersecretkeyyoushouldnotcommittogithub');
          
          /*
           * Encode the array to a JWT string.
           * Second parameter is the key to encode the token.
           * 
           * The output string can be validated at http://jwt.io/
           */
          $jwt = JWT::encode(
              $data,      //Data to be encoded in the JWT
              $secretKey, // The signing key
              'HS512'     // Algorithm used to sign the token, see https://tools.ietf.org/html/draft-ietf-jose-json-web-algorithms-40#section-3
              );
          
          $_SESSION['userName'] = "aaa";
          
          $unencodedArray = ['jwt' => $jwt];
          echo json_encode($unencodedArray);



      // $params = $app->request()->getBody();
      // $key = "supersecretkeyyoushouldnotcommittogithub";

      // $token = array(
      //     "id" => "2",
      //     "exp" => time() + (60 * 60 * 24),
      //     "scope" => ["read", "write", "delete"]
      //     );

      // $jwt = JWT::encode($token, $key);
      // $app->response->headers->set('Content-Type', 'application/json');
      // echo json_encode(array("token" =>$jwt));

    });
        $app->post("/token", function () use ($app) {

      /* Here generate and return JWT to the client. */
      // $key = "supersecretkeyyoushouldnotcommittogithub";
      // $token = array(
      //     "id" => "1",
      //     "exp" => time() + (60 * 60 * 24)
      //     );
      // $jwt = JWT::encode($token, $key);
      // $app->response->headers->set('Content-Type', 'application/json');
      // echo json_encode(array("token" =>$jwt));

       $secretKey = base64_decode("supersecretkeyyoushouldnotcommittogithub");


       /*** Extract the jwt from the Bearer ***/
       $request = $app->request();
       $authHeader = $request->headers('authorization');
       list($jwt) = sscanf( (string)$authHeader, 'Bearer %s');


       if (in_array("delete", $app->jwt->scope)) {
        /* Code for deleting item */
        $token = $app->jwt->id;
      } else {
        /* No scope so respond with 401 Unauthorized */
        $this->app->response->status(401);
      }

       echo json_encode(array("AuthHeader" => $authHeader, "Hash_Token" => $jwt, "token" => $token));
      //print_r($app->jwt);

    });

    /* Login manager */
    $app->post('/loginManager/checkUserPassword/',function() use ($app, $pdo, $db, $key) { checkUserPassword($app, $pdo, $db, $key); });
    $app->post('/loginManager/logout/',function() use ($app, $pdo, $db) { logout($app, $pdo, $db); });
    $app->get('/loginManager/getJWT/',function() use ($app) { getJWT($app); });

    /* WLMA manager */
    $app->post('/wlmaManager/checkUserPasswordFromWLMA/',function() use ($app, $pdo, $conn_db2) { checkUserPasswordFromWLMA($app, $pdo, $conn_db2); });
    $app->post('/wlmaManager/reportPressureAverage/',function() use ($app, $pdo, $conn_db2) { reportPressureAverage($app, $pdo, $conn_db2); });
    $app->post('/wlmaManager/reportWLMA1125/',function() use ($app, $pdo, $conn_db2) { reportWLMA1125($app, $pdo, $conn_db2); });

    /* RTU manager */
    $app->get('/rtuManager/informationOnload/',function() use ($app, $pdo, $conn_db2, $key) { informationOnload($app, $pdo, $conn_db2, $key); });
    $app->get('/rtuManager/listRTUFromBranch/',function() use ($app, $pdo, $conn_db2, $key) { listRTUFromBranch($app, $pdo, $conn_db2, $key); });

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

        //$name = $request->getAttribute('name');
        //echo "สวัสดี, $name";
        $return_m = array("msg" => "สวัสดี, $name");

        //$response->getBody()->write("Hello, $name");
        // $response->header("Content-Type", "application/json");
        // $response->getBody()->write($return_m);

        $app->response()->header("Content-Type", "application/json");
        echo json_encode($return_m);
    };

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
	 function checkUserPassword($app, $pdo, $db, $key) {

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



        /* ************************* */
        /* เริ่มกระบวนการส่งค่ากลับ */
        /* ************************* */
	      $tokenId    = base64_encode(mcrypt_create_iv(32));
	      $issuedAt   = time();
	      $notBefore  = $issuedAt + 1;             //Adding 1 seconds
	      $expire     = $notBefore + 60;            // Adding 60 seconds
	      $serverName = gethostname();              // Retrieve the server name from config file
	      /*
	       * Create the token as an array
	       */
	      $data = [
	          'iat'  => $issuedAt,         // Issued at: time when the token was generated
	          'jti'  => $tokenId,          // Json Token Id: an unique identifier for the token
	          'iss'  => $serverName,       // Issuer
	          'nbf'  => $notBefore,        // Not before
	          'exp'  => $expire,           // Expire
	          'data' => [                  // Data related to the signer user
	              'userId'   => '1234', // userid from the users table
	              'userName' => 'josh', // User name
	          ],
	          "scope" => ["read", "write", "delete"],
	          "id" => "1",
	          "userName" => $postUserName,
	          "branchCode" => "B01"
	      ];

	      $jwt = JWT::encode($data, $key);  // default algorithm: 'HS256'
	      // $jwt = JWT::encode($data, $key, 'HS512');



	      /*
	       * Create the session
	       */
	 	  $_SESSION['userName'] = $postUserName;
	 	  $_SESSION['jwt'] = $jwt;

	  	  $return_m = array("UserName" => $_SESSION['userName'], 
	  					    "PassWord" => $postPassWord,
	  					    "jwt" => $jwt);



	  	  $app->response->headers->set('Content-Type', 'application/json');
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
	 
    	/**
	 *
	 * @apiName GetJWT
	 * @apiGroup Login Manager
	 * @apiVersion 0.1.0
	 *
	 * @api {get} /loginManager/getJWT/ Get JSON Web Token (JWT)
	 * @apiDescription คำอธิบาย : ในส่วนนี้จะมีหน้าที่ส่งค่า JWT ที่เก็บไว้ในตัวแปร session กลับไป
	 *
	 *
	 * @apiSampleRequest /loginManager/getJWT/
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
	 function getJWT($app) {

	 		if (!isset($_SESSION['jwt'])) {
	 			$return_m = array("jwt" => "");
	 		} else {
	 			$return_m = array("jwt" => $_SESSION['jwt']);
	 		}
	  	  

	  	  $app->response->headers->set('Content-Type', 'application/json');
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
            // # code...
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
	 
    	/**
	 *
	 * @apiName ReportPressureAverage
	 * @apiGroup Wlma Manager
	 * @apiVersion 0.1.0
	 *
	 * @api {post} /wlmaManager/reportPressureAverage/ Report Pressure Average by DMA
	 * @apiDescription คำอธิบาย : ในส่วนนี้จะมีหน้าที่แสดงรายงานแรงดันเฉลี่ยแยกตามแต่ละ DMA ในช่วงวันที่กำหนด
	 *
	 *
	 * @apiSampleRequest /wlmaManager/reportPressureAverage/
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
	 function reportPressureAverage($app, $pdo, $conn_db2) {

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
	        $postStartDate = $result->startDate;
	        $postEndDate = $result->endDate;


		} else if ($ContetnType == "application/x-www-form-urlencoded"){

		    //$userID = $app->request()->params('userID_param');
		    //$userID = $app->request()->post('userID_param');
		}


	    /* ************************* */
        /* เริ่มกระบวนการเชื่อมต่อฐานข้อมูล DB2 ของ WLMA */
        /* ************************* */
        $reports = array();

        $sql = "select to_char(log_dt, 'YYYY-MM-DD') as Date, area_code, avg(p) as AveragePressure from core_area, meter_hist 
where meter_code in (select meter_code from core_area_meter where core_area_meter.area_code = core_area.area_code and meter_inout='I')
and log_dt between timestamp('".$postStartDate."') and timestamp('".$postEndDate." 23:59:00')
and to_char(log_dt, 'HH24') between '05' and '09'
and area_axis_code = 'D'
group by area_code, to_char(log_dt, 'YYYY-MM-DD')";

        if ($conn_db2) {
            // # code...
            $stmt = db2_exec($conn_db2, $sql);

            while ($row = db2_fetch_array($stmt)) {
                
                $tmpDate = iconv("TIS-620", "UTF-8",$row[0]);
                $tmpAreaCode = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row[1]);
                $tmpAveragePressure = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row[2]);

                $reports[] = array(
                	"date" => $tmpDate,
                	"area_code" => "DMA-".$tmpAreaCode,
                	"average_pressure" => $tmpAveragePressure
                );
            }
        }

        $rowCount = count($reports);

        /* ************************* */
        /* เริ่มกระบวนการส่งค่ากลับ */
        /* ************************* */
        $resultText = "success";

        $reportResult = array("result" =>  $resultText, "count" => $rowCount, "rows" => $reports);
        //$reportResult = array("result" =>  $resultText, "msg" => "สวัสดี, $name");
        //$reportResult = array("result" =>  $resultText);
        
        $app->response()->header("Content-Type", "application/json");
        echo json_encode($reportResult);

	 }
	 
    	/**
	 *
	 * @apiName ReportWLMA1125
	 * @apiGroup Wlma Manager
	 * @apiVersion 0.1.0
	 *
	 * @api {post} /wlmaManager/reportWLMA1125/ Report WLMA-1125
	 * @apiDescription คำอธิบาย : ในส่วนนี้จะมีหน้าที่แสดงรายงานสถานะการเชื่อมโยงระหว่าง WLMA กับ 1125
	 *
	 *
	 * @apiSampleRequest /wlmaManager/reportWLMA1125/
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
	 function reportWLMA1125($app, $pdo, $conn_db2) {

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
	        $postStartDate = $result->startDate;
	        $postEndDate = $result->endDate;


		} else if ($ContetnType == "application/x-www-form-urlencoded"){

		    //$userID = $app->request()->params('userID_param');
		    //$userID = $app->request()->post('userID_param');
		}


	    /* ************************* */
        /* เริ่มกระบวนการเชื่อมต่อฐานข้อมูล DB2 ของ WLMA */
        /* ************************* */
        $reports = array();

        // เปิดงาน
        $sql_open_only = "select 	JOB_code, 
        				BRANCH_CODE, 
        				AREA_CODE, 
        				JOB_OPEN_DT, 
        				JOB_CLOSE_DT, 
        				JOB_BEG_DT, 
        				JOB_END_DT, 
        				JOB_STATUS, 
        				CSS_CODE, 
        				REQUEST_CODE 
						from FSM_MAIN
						where job_open_dt between timestamp ('2015-11-01') and timestamp ('2015-11-30')";



        if ($conn_db2) {
            // OPEN Only
            $stmt_open_only = db2_exec($conn_db2, $sql_open_only);

            while ($row = db2_fetch_both($stmt_open_only)) {
           

                $tmpJOB_code = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row["JOB_CODE"]);
				$tmpBRANCH_CODE = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['BRANCH_CODE']); 
				$tmpAREA_CODE = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['AREA_CODE']); 
				$tmpJOB_OPEN_DT = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['JOB_OPEN_DT']); 
				$tmpJOB_CLOSE_DT = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['JOB_CLOSE_DT']); 
				$tmpJOB_BEG_DT = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['JOB_BEG_DT']); 
				$tmpJOB_END_DT = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['JOB_END_DT']); 
				$tmpJOB_STATUS = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['JOB_STATUS']); 
				$tmpCSS_CODE = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['CSS_CODE']); 
				$tmpREQUEST_CODE = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['REQUEST_CODE']);
				$tmpPIPE_SIZE_CODE = "";
				$tmpPIPE_MATERIAL_CODE = "";

                $reports[] = array(
                	"JOB_CODE" => $tmpJOB_code,
                  	"BRANCH_CODE" => $tmpBRANCH_CODE,
                  	"AREA_CODE" => $tmpAREA_CODE,
                  	"JOB_OPEN_DT" => $tmpJOB_OPEN_DT,
                  	"JOB_CLOSE_DT" => $tmpJOB_CLOSE_DT,
                  	"JOB_BEG_DT" => $tmpJOB_BEG_DT,
                  	"JOB_END_DT" => $tmpJOB_END_DT,
                  	"JOB_STATUS" => $tmpJOB_STATUS,
                  	"CSS_CODE" => $tmpCSS_CODE,
                  	"REQUEST_CODE" => $tmpREQUEST_CODE,
                  	"PIPE_SIZE_CODE" => $tmpPIPE_SIZE_CODE,
                  	"PIPE_MATERIAL_CODE" => $tmpPIPE_MATERIAL_CODE,
                  	"TYPE" => "OPEN"
                );
            }


        // Close Only
		$sql_close_only = "select FMH.JOB_code, 
						FMH.BRANCH_CODE, 
						FMH.AREA_CODE, 
						FMH.JOB_OPEN_DT, 
						FMH.JOB_CLOSE_DT, 
						FMH.JOB_BEG_DT, 
						FMH.JOB_END_DT, 
						FMH.JOB_STATUS, 
						FMH.CSS_CODE, 
						FMH.REQUEST_CODE, 
						LR.PIPE_SIZE_CODE, 
						LR.PIPE_MATERIAL_CODE
						from FSM_MAIN_HIST FMH, fsm_lr LR
						where FMH.JOB_code = LR.JOB_CODE and job_open_dt between timestamp ('2015-11-01') and timestamp ('2015-11-30')";

           
            $stmt_close_only = db2_exec($conn_db2, $sql_close_only);

            while ($row = db2_fetch_both($stmt_close_only)) {
           

                $tmpJOB_code = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row["JOB_CODE"]);
				$tmpBRANCH_CODE = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['BRANCH_CODE']); 
				$tmpAREA_CODE = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['AREA_CODE']); 
				$tmpJOB_OPEN_DT = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['JOB_OPEN_DT']); 
				$tmpJOB_CLOSE_DT = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['JOB_CLOSE_DT']); 
				$tmpJOB_BEG_DT = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['JOB_BEG_DT']); 
				$tmpJOB_END_DT = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['JOB_END_DT']); 
				$tmpJOB_STATUS = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['JOB_STATUS']); 
				$tmpCSS_CODE = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['CSS_CODE']); 
				$tmpREQUEST_CODE = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['REQUEST_CODE']);
				$tmpPIPE_SIZE_CODE = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['PIPE_SIZE_CODE']);
				$tmpPIPE_MATERIAL_CODE = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['PIPE_MATERIAL_CODE']);

                $reports[] = array(
                	"JOB_CODE" => $tmpJOB_code,
                  	"BRANCH_CODE" => $tmpBRANCH_CODE,
                  	"AREA_CODE" => $tmpAREA_CODE,
                  	"JOB_OPEN_DT" => $tmpJOB_OPEN_DT,
                  	"JOB_CLOSE_DT" => $tmpJOB_CLOSE_DT,
                  	"JOB_BEG_DT" => $tmpJOB_BEG_DT,
                  	"JOB_END_DT" => $tmpJOB_END_DT,
                  	"JOB_STATUS" => $tmpJOB_STATUS,
                  	"CSS_CODE" => $tmpCSS_CODE,
                  	"REQUEST_CODE" => $tmpREQUEST_CODE,
                  	"PIPE_SIZE_CODE" => $tmpPIPE_SIZE_CODE,
                  	"PIPE_MATERIAL_CODE" => $tmpPIPE_MATERIAL_CODE,
                  	"TYPE" => "CLOSED"
                );
            }
        }

        $rowCount = count($reports);

        /* ************************* */
        /* เริ่มกระบวนการส่งค่ากลับ */
        /* ************************* */
        $resultText = "success";

        $reportResult = array("result" =>  $resultText, "count" => $rowCount, "rows" => $reports);
        //$reportResult = array("result" =>  $resultText, "msg" => "สวัสดี, $name");
        //$reportResult = array("result" =>  $resultText);
        
        $app->response()->header("Content-Type", "application/json");
        echo json_encode($reportResult);

	 }
	 

    /* RTU Manager Partial */
        /**
     *
     * @apiName InformationOnload
     * @apiGroup RTU Manager
     * @apiVersion 0.1.0
     *
     * @api {get} /rtuManager/informationOnload/ Information Onload event
     * @apiDescription คำอธิบาย : ในส่วนนี้จะมีหน้าที่แสดงข้อมูลเบื้องต้นในหน้าจอที่เกี่ยวข้องกับ RTU โดยแยกสิทธ์ตามผู้ใช้งาน
     *
     *
     * @apiParam {String} name     New name of the user
     *
     * @apiSampleRequest /rtuManager/informationOnload/
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

    function informationOnload($app, $pdo, $conn_db2, $key) {

        /* *************************************** */
        /* เริ่มกระบวนการ ถอดรหัส JWT (Decode JWT)  */
        /* *************************************** */
        if ($key) {

            //$secretKey = base64_decode($key);
            /*** Extract the jwt from the Bearer ***/
            $request = $app->request();

            if ($request) {

                $authHeader = $request->headers('authorization');
                /*
                 * Look for the 'authorization' header
                 */
                if ($authHeader) {
                    
                    list($jwt) = sscanf( (string)$authHeader, 'Bearer %s');

                    if ($jwt) {

                        $token_jti = $app->jwt->jti;    // Json Token Id: an unique identifier for the token
                        $token_iss = $app->jwt->iss;    // Issuer

                        $epoch_exp = $app->jwt->exp + (7*60*60); 
                        $dt_exp = new DateTime("@$epoch_exp");  // convert UNIX timestamp to PHP DateTime
                        $token_exp = $dt_exp->format('Y-m-d H:i:s'); // output = 2012-08-15 00:00:00 

                        $epoch_nbf = $app->jwt->nbf + (7*60*60); 
                        $dt_nbf = new DateTime("@$epoch_nbf");  // convert UNIX timestamp to PHP DateTime
                        $token_nbf = $dt_nbf->format('Y-m-d H:i:s'); // output = 2012-08-15 00:00:00 

                        $epoch_iat = $app->jwt->iat + (7*60*60); 
                        $dt_iat = new DateTime("@$epoch_iat");  // convert UNIX timestamp to PHP DateTime
                        $token_iat = $dt_iat->format('Y-m-d H:i:s'); // output = 2012-08-15 00:00:00 


                        if (in_array("delete", $app->jwt->scope)) {
                            /* Code for deleting item */
                            $token_id = $app->jwt->id;
                        } else {
                            /* No scope so respond with 401 Unauthorized */
                            $this->app->response->status(401);
                        }

                        /* access parameter `data` : associative array */
                        $arr_data = $app->jwt->data;
                        $arr_data_info = [];
                        foreach ($arr_data as $key => $value){
                            $arr_data_info[] = array(
                                $key => $value
                            );
                        }

                        /* access parameter `scope` : array */
                        $arr_scope = $app->jwt->scope;
                        $arr_scope_info = [];
                        foreach ($arr_scope as $value) {
                            $arr_scope_info[] = $value;
                        }

                        /* access parameter `id` */
                        $data_id = $app->jwt->id;

                        /* access parameter `userName` */
                        $data_userName = $app->jwt->userName;

                        /* access parameter `branchCode` */
                        $data_branchCode = $app->jwt->branchCode;

                    } else {
                        /*
                         * No token was able to be extracted from the authorization header
                         */
                        // header('HTTP/1.0 400 Bad Request');
                        $this->app->response->status(400);
                    }

                } else {
                    /*
                     * The request lacks the authorization token
                     */
                    // header('HTTP/1.0 400 Bad Request');
                    $this->app->response->status(400);
                }

            } else {
                // header('HTTP/1.0 405 Method Not Allowed');
                $this->app->response->status(405);
            }
        } else {
            // header('HTTP/1.0 401 Unauthorized');
            $this->app->response->status(401);
        }



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





        /* ************************* */
        /* เริ่มกระบวนการส่งค่ากลับ */
        /* ************************* */

        $tokenRequestInformation = array(
            "jwt" => $jwt,
            "JsonTokenId" => $token_jti,
            "TokenIssuer" => $token_iss,
            "TokenGenerated" => $token_iat,
            "TokenNotBefore" => $token_nbf,
            "TokenExpire" => $token_exp,
            "Data" => $arr_data_info,
            "Scope" => $arr_scope_info,
            "id" => $data_id,
            "UserName" => $data_userName,
            "BranchCode" => $data_branchCode
        );

        $app->response->headers->set('Content-Type', 'application/json');
        echo json_encode(array("AuthHeader" => $authHeader, "tokenRequestInformation" => $tokenRequestInformation));

    };
        /**
     *
     * @apiName ListRTUFromBranch
     * @apiGroup RTU Manager
     * @apiVersion 0.1.0
     *
     * @api {get} /rtuManager/listRTUFromBranch/ List RTU From Branch
     * @apiDescription คำอธิบาย : ในส่วนนี้จะมีหน้าที่แสดงรายการข้อมูล RTU จำแนกตามประปาสาขา
     *
     *
     *
     * @apiSampleRequest /rtuManager/listRTUFromBranch/
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

    function listRTUFromBranch($app, $pdo, $conn_db2, $key) {

        /* ************************* */
        /* เริ่มกระบวนการเชื่อมต่อฐานข้อมูล DB2 ของ WLMA */
        /* ************************* */
        $reports = array();

        $sql = "SELECT  CORE_AREA_meter.area_code AS DMA, 
                        CORE_AREA_meter.meter_code AS DM, 
                        iim_equip.IP_ADDRESS AS IPaddress, 
                        iim_equip.LOGGER_CODE AS LoggerCode, 
                        iim_equip.STATUS AS Status, 
                        iim_equip.REMARK AS Remark
                FROM  CORE_AREA_meter, iim_equip
                WHERE CORE_AREA_meter.meter_code = iim_equip.equip_code";

        if ($conn_db2) {
            // # code...
            $stmt = db2_exec($conn_db2, $sql);

            while ($row = db2_fetch_array($stmt)) {
                
                $tmpDMA = iconv("TIS-620", "UTF-8",$row[0]);
                $tmpDM = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row[1]);
                $tmpIPaddress = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row[2]);
                $tmpLoggerCode = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row[3]);
                $tmpStatus = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row[4]);
                $tmpRemark = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row[5]);

                $tmpCommTypeStr = substr($tmpIPaddress, 0, 3);

                if ($tmpCommTypeStr == "192") {
                    $tmpCommType = "PSTN";
                } else {
                    $tmpCommType = "GPRS";
                }

                $reports[] = array(
                    "dma" => $tmpDMA,
                    "dm" => $tmpDM,
                    "ip_address" => $tmpIPaddress,
                    "logger_code" => $tmpLoggerCode,
                    "ip_address" => $tmpIPaddress,
                    "comm_type" => $tmpCommType,
                    "status" => $tmpStatus,
                    "remark" => $tmpRemark
                );
            }
        }
        $rowCount = count($reports);

        /* ************************* */
        /* เริ่มกระบวนการส่งค่ากลับ */
        /* ************************* */
        $resultText = "success";

        $reportResult = array("result" =>  $resultText, "count" => $rowCount, "rows" => $reports);
        //$reportResult = array("result" =>  $resultText, "msg" => "สวัสดี, $name");
        //$reportResult = array("result" =>  $resultText);
        
        $app->response()->header("Content-Type", "application/json");
        echo json_encode($reportResult);

        // $return_m = array("msg" => "สวัสดี");

        // $app->response()->header("Content-Type", "application/json");
        // echo json_encode($return_m);
    };
    
    
?>