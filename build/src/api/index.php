<?php
session_start(); //start session.
?>

<?php
    date_default_timezone_set("Asia/Bangkok");

    require_once '../../packages/autoload.php';
    


    /* Connect Database Manager Partial : Localhost */
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
                "path" => ["/token", "/user", 
                           "/rtuManager/informationOnload/", 
                           "/loginManager/checkJWT/", 
                           "/rtuManager/syncRTUFromWLMA/"],
                "passthrough" => ["/user"]
            ]),
            new \Slim\Middleware\JwtAuthentication\RequestMethodRule([
                "passthrough" => ["OPTIONS"]
            ])
        ]
    ]));


    /* proj4php */
    // Use a PSR-4 autoloader for the `proj4php` root namespace.
    use proj4php\Proj4php;
    use proj4php\Proj;
    use proj4php\Point;

    // Initialise Proj4
    $proj4 = new Proj4php();
    // add it to proj4
    $proj4->addDef("EPSG:32647",'+proj=utm +zone=47 +ellps=WGS84 +datum=WGS84 +units=m +no_defs');
    $proj4->addDef("EPSG:24047", '+proj=utm +zone=47 +a=6377276.345 +b=6356075.41314024 +units=m +no_defs');




    /* NuSOAP */
    $client = new nusoap_client("http://58.137.5.126/epodws/service.asmx?wsdl", true);
    // $client->soap_defencoding = 'UTF-8';
    $endpoint = "http://58.137.5.126/epodws/service.asmx?wsdl";
    $client->forceEndpoint = $endpoint;

    $client->soap_defencoding = 'UTF-8';
    $client->decode_utf8 = false; // แก้ปัญหาตัวอักษรภาษาไทยแสดง ???????? (web service unicode characters dispaly as question marks)
    $client->encode_utf8 = true;



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
    $app->post('/testManager/transformToLatLng/',function() use ($app, $proj4) { transformToLatLng($app, $proj4); });
    $app->get('/testManager/simpleGeoJSON/',function() use ($app) { simpleGeoJSON($app); });
    $app->get('/testManager/callWebService/',function() use ($app, $client) { callWebService($app, $client); });

    /* Login manager */
    $app->post('/loginManager/checkUserPassword/',function() use ($app, $pdo, $db, $conn_db2, $key) { checkUserPassword($app, $pdo, $db, $conn_db2, $key); });
    $app->post('/loginManager/logout/',function() use ($app, $pdo, $db) { logout($app, $pdo, $db); });
    $app->get('/loginManager/getJWT/',function() use ($app) { getJWT($app); });
    $app->post('/loginManager/checkJWT/',function() use ($app, $key) { checkJWT($app, $key); });
    $app->post('/loginManager/checkPermission/',function() use ($app, $pdo, $db, $key) { checkPermission($app, $pdo, $db, $key); });

    /* WLMA manager */
    $app->post('/wlmaManager/checkUserPasswordFromWLMA/',function() use ($app, $pdo, $conn_db2) { checkUserPasswordFromWLMA($app, $pdo, $conn_db2); });
    $app->post('/wlmaManager/reportPressureAverage/',function() use ($app, $pdo, $conn_db2) { reportPressureAverage($app, $pdo, $conn_db2); });
    $app->post('/wlmaManager/reportWLMA1125/',function() use ($app, $pdo, $conn_db2) { reportWLMA1125($app, $pdo, $conn_db2); });
    $app->post('/wlmaManager/reportWaterLeakageByDMA/',function() use ($app, $pdo, $conn_db2) { reportWaterLeakageByDMA($app, $pdo, $conn_db2); });

    /* RTU manager */
    $app->get('/rtuManager/informationOnload/',function() use ($app, $pdo, $conn_db2, $key) { informationOnload($app, $pdo, $conn_db2, $key); });
    $app->get('/rtuManager/listRTUFromBranch/',function() use ($app, $pdo, $db, $conn_db2, $key) { listRTUFromBranch($app, $pdo, $db, $conn_db2, $key); });
    $app->get('/rtuManager/rtuDashboard/',function() use ($app, $pdo, $db, $conn_db2, $key) { rtuDashboard($app, $pdo, $db, $conn_db2, $key); });
    $app->post('/rtuManager/addNewRTU/',function() use ($app, $pdo, $db, $conn_db2, $key) { addNewRTU($app, $pdo, $db, $conn_db2, $key); });
    $app->post('/rtuManager/syncRTUFromWLMA/',function() use ($app, $pdo, $db, $conn_db2, $key) { syncRTUFromWLMA($app, $pdo, $db, $conn_db2, $key); });
    $app->post('/rtuManager/updateLatLngFromFile/',function() use ($app, $pdo, $db) { updateLatLngFromFile($app, $pdo, $db); });
    $app->get('/rtuManager/rtuLocationGeoJSON/',function() use ($app, $pdo, $db, $key) { rtuLocationGeoJSON($app, $pdo, $db, $key); });

    /* RMR manager */
    $app->post('/rmrManager/reportRMRFromYear/',function() use ($app, $pdo, $db) { reportRMRFromYear($app, $pdo, $db); });


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
        /**
     *
     * @apiName TransformToLatLng
     * @apiGroup TEST Manager
     * @apiVersion 0.1.0
     *
     * @api {post} /testManager/transformToLatLng Test Transform To LatLng
     * @apiDescription คำอธิบาย : ทดสอบแปลงค่าพิกัดใน WLMA 1.0 ให้เป็น LatLng
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

    function transformToLatLng($app, $proj4) {


        // J5812R00001 673510.9375, 1524469.5
        // J5812R00002 674006.5625, 1527902.5
        // J5812R00003 671971.0625, 1527002.625
        // J5812R00004 679441.5, 1529612.25
        // J5812R00005 673989.1875, 1527974.25
        // J5812R00006 672802.1875, 1525371.75


        // then Create your projections
        $proj32647 = new Proj('EPSG:32647',$proj4);
        $proj24047 = new Proj('EPSG:24047', $proj4);
        $projWGS84 = new Proj('EPSG:4326', $proj4);

 
        // Create a point.
        $pointSrc = new Point(674006.5625, 1527902.5, $proj32647);
        $tmpPointSrc = $pointSrc->toShortString();
        // echo "Source: " . $pointSrc->toShortString() . " in L93 <br>";

        // Transform the point between datums.
        $pointDest = $proj4->transform($projWGS84, $pointSrc);
        $tmpPointDesc = $pointDest->toShortString();
        // echo "Conversion: " . $pointDest->toShortString() . " in WGS84<br><br>";


        // // Create two different projections.
        // $projL93    = new Proj('EPSG:2154', $proj4);
        // $projWGS84  = new Proj('EPSG:4326', $proj4);

        // // Create a point.
        // $pointSrc = new Point(652709.401, 6859290.946, $projL93);
        // $tmpPointSrc = $pointSrc->toShortString();
        // // echo "Source: " . $pointSrc->toShortString() . " in L93 <br>";

        // // Transform the point between datums.
        // $pointDest = $proj4->transform($projWGS84, $pointSrc);
        // $tmpPointDesc = $pointDest->toShortString();
        // // echo "Conversion: " . $pointDest->toShortString() . " in WGS84<br><br>";


        $return_m = array("msg" => "ทดสอบแปลงค่าพิกัดจาก UTM (32647 หรือ 24047) เป็น LatLng", "pointSrc" => $tmpPointSrc, "pointDest" => $tmpPointDesc);

        

        $app->response()->header("Content-Type", "application/json");
        echo json_encode($return_m);
    };
        /**
     *
     * @apiName SimpleGeoJSON
     * @apiGroup TEST Manager
     * @apiVersion 0.1.0
     *
     * @api {get} /testManager/simpleGeoJSON/ Simple GeoJSON
     * @apiDescription คำอธิบาย : ทดสอบสร้าง GeoJSON
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

    function simpleGeoJSON($app) {

        // $point = new \GeoJson\Geometry\Point([1, 1]);
        // $multiPoint = new \GeoJson\Geometry\MultiPoint([ [100.0, 0.0], [101.0, 1.0] ]);
        // $json = json_encode($multiPoint);
        // echo $json;

        $features = array();

        $id1 = 1;
        $point1 = new \GeoJson\Geometry\Point([1, 1]);
        $properties1 = array("name" => "Belgium", "density"=>  "356.0", "population" => "10753080");
        $feature1 = new \GeoJson\Feature\Feature($point1, $properties1, $id1, null);

        $id2 = 2;
        $point2 = new \GeoJson\Geometry\Point([1, 1]);
        $properties2 = array("name" => "Belgium", "density"=>  "68.3", "population" => "7606551");
        $feature2 = new \GeoJson\Feature\Feature($point2, $properties2, $id2, null);

        $id3 = 3;
        $myMultiPolygon = [
                    [
                      [
                        [
                          3.370646,
                          51.375549
                        ],
                        [
                          3.363889,
                          51.313599
                        ],
                        [
                          3.439166,
                          51.244431
                        ],
                        [
                          3.524166,
                          51.250542
                        ],
                        [
                          3.524722,
                          51.288319
                        ],
                        [
                          3.793055,
                          51.261929
                        ],
                        [
                          3.806388,
                          51.216930
                        ],
                        [
                          3.957222,
                          51.216091
                        ],
                        [
                          4.214999,
                          51.330269
                        ],
                        [
                          4.230012,
                          51.357220
                        ],
                        [
                          4.293888,
                          51.306381
                        ],
                        [
                          4.236443,
                          51.368771
                        ],
                        [
                          4.239443,
                          51.374149
                        ],
                        [
                          4.413054,
                          51.358040
                        ],
                        [
                          4.437777,
                          51.375259
                        ],
                        [
                          4.396667,
                          51.416931
                        ],
                        [
                          4.411666,
                          51.456928
                        ],
                        [
                          4.549443,
                          51.482761
                        ],
                        [
                          4.541944,
                          51.426651
                        ],
                        [
                          4.671665,
                          51.427479
                        ],
                        [
                          4.769166,
                          51.502769
                        ],
                        [
                          4.825832,
                          51.492210
                        ],
                        [
                          4.844722,
                          51.461369
                        ],
                        [
                          4.816387,
                          51.425541
                        ],
                        [
                          4.782777,
                          51.414700
                        ],
                        [
                          4.940276,
                          51.401371
                        ],
                        [
                          5.041388,
                          51.486649
                        ],
                        [
                          5.104444,
                          51.434978
                        ],
                        [
                          5.077222,
                          51.395260
                        ],
                        [
                          5.143888,
                          51.318600
                        ],
                        [
                          5.237499,
                          51.308319
                        ],
                        [
                          5.238888,
                          51.262211
                        ],
                        [
                          5.457777,
                          51.280540
                        ],
                        [
                          5.855465,
                          51.147820
                        ],
                        [
                          5.802776,
                          51.093319
                        ],
                        [
                          5.775832,
                          51.021099
                        ],
                        [
                          5.722776,
                          50.965260
                        ],
                        [
                          5.759166,
                          50.949150
                        ],
                        [
                          5.683742,
                          50.882191
                        ],
                        [
                          5.698609,
                          50.757771
                        ],
                        [
                          6.008407,
                          50.756069
                        ],
                        [
                          6.028610,
                          50.715820
                        ],
                        [
                          6.108333,
                          50.723309
                        ],
                        [
                          6.171388,
                          50.623871
                        ],
                        [
                          6.268610,
                          50.623600
                        ],
                        [
                          6.200832,
                          50.516380
                        ],
                        [
                          6.366387,
                          50.452209
                        ],
                        [
                          6.400277,
                          50.329151
                        ],
                        [
                          6.173332,
                          50.232479
                        ],
                        [
                          6.131833,
                          50.125530
                        ],
                        [
                          6.106943,
                          50.167759
                        ],
                        [
                          5.980000,
                          50.172211
                        ],
                        [
                          5.819721,
                          50.009708
                        ],
                        [
                          5.808332,
                          49.961102
                        ],
                        [
                          5.731111,
                          49.894150
                        ],
                        [
                          5.753333,
                          49.849152
                        ],
                        [
                          5.746666,
                          49.795269
                        ],
                        [
                          5.820555,
                          49.749149
                        ],
                        [
                          5.899166,
                          49.662762
                        ],
                        [
                          5.839999,
                          49.552212
                        ],
                        [
                          5.783038,
                          49.527271
                        ],
                        [
                          5.705208,
                          49.535229
                        ],
                        [
                          5.473055,
                          49.506100
                        ],
                        [
                          5.423332,
                          49.609150
                        ],
                        [
                          5.307221,
                          49.630810
                        ],
                        [
                          5.329721,
                          49.659981
                        ],
                        [
                          5.276111,
                          49.698589
                        ],
                        [
                          5.216944,
                          49.690540
                        ],
                        [
                          5.097777,
                          49.768589
                        ],
                        [
                          4.858054,
                          49.796379
                        ],
                        [
                          4.881110,
                          49.914700
                        ],
                        [
                          4.800832,
                          49.977760
                        ],
                        [
                          4.851943,
                          50.079430
                        ],
                        [
                          4.876388,
                          50.154980
                        ],
                        [
                          4.757500,
                          50.129429
                        ],
                        [
                          4.673610,
                          49.996380
                        ],
                        [
                          4.458333,
                          49.938591
                        ],
                        [
                          4.168332,
                          49.981369
                        ],
                        [
                          4.150000,
                          49.986370
                        ],
                        [
                          4.226388,
                          50.081100
                        ],
                        [
                          4.137777,
                          50.137760
                        ],
                        [
                          4.216110,
                          50.265270
                        ],
                        [
                          4.090833,
                          50.314430
                        ],
                        [
                          3.763611,
                          50.351929
                        ],
                        [
                          3.725277,
                          50.313599
                        ],
                        [
                          3.671944,
                          50.346371
                        ],
                        [
                          3.668889,
                          50.444149
                        ],
                        [
                          3.602222,
                          50.497211
                        ],
                        [
                          3.367222,
                          50.495541
                        ],
                        [
                          3.280000,
                          50.538319
                        ],
                        [
                          3.281388,
                          50.594151
                        ],
                        [
                          3.193333,
                          50.741371
                        ],
                        [
                          3.113055,
                          50.793320
                        ],
                        [
                          3.035277,
                          50.773869
                        ],
                        [
                          2.901285,
                          50.697048
                        ],
                        [
                          2.781944,
                          50.755550
                        ],
                        [
                          2.629444,
                          50.824711
                        ],
                        [
                          2.612500,
                          50.887211
                        ],
                        [
                          2.541667,
                          51.091099
                        ],
                        [
                          2.971666,
                          51.257488
                        ],
                        [
                          3.370646,
                          51.375549
                        ]
                      ]
                    ]
                  ];

        $multiPolygon = new \GeoJson\Geometry\MultiPolygon($myMultiPolygon);
        $properties3 = array("name" => "Belgium", "density"=>  "68.3", "population" => "7606551");
        $feature3 = new \GeoJson\Feature\Feature($multiPolygon, $properties3, $id3, null);

        $features[] = $feature1;
        $features[] = $feature2;
        $features[] = $feature3;

        $featureCollection = new \GeoJson\Feature\FeatureCollection($features);
        $json = json_encode($featureCollection);
        echo $json;


        // $return_m = array("msg" => "สวัสดี");

        // $app->response()->header("Content-Type", "application/json");
        // echo json_encode($return_m);
    };
        /**
     *
     * @apiName CallWebService
     * @apiGroup TEST Manager
     * @apiVersion 0.1.0
     *
     * @api {get} /testManager/callWebService/ Call WebService
     * @apiDescription คำอธิบาย : ทดสอบ Call WebService
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

    function callWebService($app, $client) {

        $error = $client->getError();
        if ($error) {
            echo "<h2>Constructor error</h2><pre>" . $error . "</pre>";
        }

        /* ************************* */
        /* เริ่มกระบวนการเชื่อมต่อ Web Service */
        /* ************************* */
        $result = $client->call('getTruckManifestPOD', array("strJobNo" => "JHO160429090", "strEmpId" => ""));
        $mydata = json_decode($result["getTruckManifestPODResult"],true);

        $reports = array();

        for ($i=0; $i < count($mydata["array"]); $i++) { 

            $reports[] = array(
                    "doc_id" => $mydata["array"][$i]['doc_id'],
                    "recipient_addres" => $mydata["array"][$i]['recipient_addres']
                );

        }

        $rowCount = count($mydata["array"]);

        /* ************************* */
        /* เริ่มกระบวนการส่งค่ากลับ */
        /* ************************* */
        $resultText = "success";

        $reportResult = array("result" =>  $resultText, "count" => $rowCount, "rows" => $reports);
        $app->response()->header("Content-Type", "application/json");
        echo json_encode($reportResult);

        // $return_m = array("msg" => "สวัสดี");

        // $app->response()->header("Content-Type", "application/json");
        // echo json_encode($reports);
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
	 function checkUserPassword($app, $pdo, $db, $conn_db2, $key) {

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
        /* เริ่มกระบวนการเชื่อมต่อฐานข้อมูล DB2 ของ WLMA */
        /* ************************* */


	        // $tmpBranch_code = "B01";
	        // $tmpRole = "user";
	        // $rowCount = 1;

	        $tmpBranch_code = "ALL";
	        $tmpRole = "admin";
	        $rowCount = 1;


        /* ************************* */
        /* เริ่มกระบวนการส่งค่ากลับ */
        /* ************************* */
        if ($rowCount > 0) {
        			/* ************************* */
        /* เริ่มกระบวนการเชื่อมต่อฐานข้อมูล MySQL */
        /* ************************* */

            // $tmpPermissions = [  
				        //       "listRTU" => [ "path" => "", 
				        //       				  "permission" => ["read", "write", "delete", "update"]
				        //       			   ], 
				        //       "listRMR" => [ "path" => "", 
				        //       				  "permission" => ["read", "write", "delete", "update"]
				        //       			   ],
					       //    ];


		    $tmpPermissions = array();

		    // $sql_permissions = "SELECT * FROM permission_tb";
		    // $results_permissions = $db->permission_tb->order("id ASC");

		    $results_permissions = $db->permission_tb->select('DISTINCT page_name');

	        foreach ($results_permissions as $result) {

	        	$tmpPagePath = "";
	        	$tmp_features = array();
	        	$results_features = $db->permission_tb->where("page_name = ? and role = ?", $result["page_name"], $tmpRole);
	        	
	        	foreach ($results_features as $result_f) {

	        		$tmpPermissions_list = array();

if ($result_f["visible"] == "Y") {
	$tmpPermissions_list[] = "visible";
	// array_push($tmpPermissions_list, "visible");
}

if ($result_f["allow_read"] == "Y") {
	$tmpPermissions_list[] = "read";
	// array_push($tmpPermissions_list, "read");
}

if ($result_f["allow_write"] == "Y") {
	$tmpPermissions_list[] = "write";
	// array_push($tmpPermissions_list, "write");
}

if ($result_f["allow_update"] == "Y") {
	$tmpPermissions_list[] = "update";
	// array_push($tmpPermissions_list, "update");
}

if ($result_f["allow_delete"] == "Y") {
	$tmpPermissions_list[] = "delete";
	// array_push($tmpPermissions_list, "delete");
}

if ($result_f["print"] == "Y") {
	$tmpPermissions_list[] = "print";
	// array_push($tmpPermissions_list, "print");
}

if ($result_f["pdf"] == "Y") {
	$tmpPermissions_list[] = "pdf";
	// array_push($tmpPermissions_list, "pdf");
}

if ($result_f["excel"] == "Y") {
	$tmpPermissions_list[] = "excel";
	// array_push($tmpPermissions_list, "excel");
}


	        		$tmp_features[] = array(
	                	"feature_name" => $result_f["feature_name"],
	                	"feature_desc" => $result_f["feature_desc"],
	                	"permission" => $tmpPermissions_list,
	                	"remark" => $result_f["remark"]
	            	);

	            	$tmpPagePath = $result_f["page_path"];
	        	}

	            $tmpPermissions[] = array(
	                "page_name" => $result["page_name"],
	                "page_path" => $tmpPagePath,
	                "features" => $tmp_features
	            );
	        }


	      $tokenId    = base64_encode(mcrypt_create_iv(32));
	      $issuedAt   = time();
	      $notBefore  = $issuedAt + 1;             //Adding 1 seconds
	      $expire     = $notBefore + (3600*3);     // Adding 3600*3 seconds (3 hours)
	      $serverName = gethostname();             // Retrieve the server name from config file
	      /*
	       * Create the token as an array
	       */
	      $data = [
	          'iat'  => $issuedAt,         // Issued at: time when the token was generated
	          'jti'  => $tokenId,          // Json Token Id: an unique identifier for the token
	          'iss'  => $serverName,       // Issuer
	          'nbf'  => $notBefore,        // Not before
	          'exp'  => $expire,           // Expire
	          "users" => [
	          	   "user_id" => "1",
	          	   "user_name" => $postUserName
	          ],
	          "roles" => $tmpRole,
	          "permissions" => $tmpPermissions,
	          "information" => [   			  // Data related to the signer user
	              "branchCode" => $tmpBranch_code
	          ]
	      ];



	      $jwt = JWT::encode($data, $key);  // default algorithm: 'HS256'
	      // $jwt = JWT::encode($data, $key, 'HS512');


	      /*
	       * Create the session
	       */
	 	  // $_SESSION['userName'] = $postUserName;
	 	  $_SESSION['jwt'] = $jwt;

	 	  /*
	       * Create - redirect url
	       */
	      $tmpRedirectURL = "";

	 	  if ($tmpRole == "user") {
	 	  	$tmpRedirectURL = "../Home/";
	 	  } else if ($tmpRole == "admin") {
	 	  	$tmpRedirectURL = "../Home/";
	 	  } 

	 	  $resultText = "success";

	  	  $return_m = array("result" =>  $resultText,
	  	  					"redirectURL" => $tmpRedirectURL, 
	  					    "token" => $jwt);
        } else {
        	$tmpBranch_code = "";
$resultText = "fail";

$return_m = array("result" =>  $resultText);
        }
		
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
	 
    	/**
	 *
	 * @apiName CheckJWT
	 * @apiGroup Login Manager
	 * @apiVersion 0.1.0
	 *
	 * @api {post} /loginManager/checkJWT/ Check JSON Web Token (JWT)
	 * @apiDescription คำอธิบาย : ในส่วนนี้จะมีหน้าที่ตรวจสอบ JWT ที่เก็บไว้ในตัวแปร session กลับไป
	 *
	 *
	 * @apiSampleRequest /loginManager/checkJWT/
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
	 function checkJWT($app, $key) {


	  	/*** Extract the jwt from the Session ***/
		// if (!isset($_SESSION['jwt'])) {
		//  	$jwt = "";
		// } else {
		//  	$jwt = $_SESSION['jwt'];
		// }

		// $token = JWT::decode($jwt, $key, array('HS256'));
		// $role = $token->roles;
		// $myInformation = $token->information;

		// $app->response->headers->set('Content-Type', 'application/json');
		// echo json_encode(array("role" => $role, "information" => $myInformation));




	   /*** Extract the jwt from the Bearer ***/
       $request = $app->request();
       $authHeader = $request->headers('authorization');
       list($jwt) = sscanf( (string)$authHeader, 'Bearer %s');

       /*** iat ***/
       $myIatEpoch = $app->jwt->iat;				// Issued at: time when the token was generated

	   $dtIat = new DateTime("@$myIatEpoch");  // convert UNIX timestamp to PHP DateTime
	   $myIatHuman = $dtIat->format('Y-m-d H:i:s'); // output = 2012-08-15 00:00:00 

	   $TimeZoneNameFrom="UTC";
	   $TimeZoneNameTo="Asia/Bangkok";
	   $myIatHumanWithTimeZone = date_create($myIatHuman, new DateTimeZone($TimeZoneNameFrom))->setTimezone(new DateTimeZone($TimeZoneNameTo))->format("Y-m-d H:i:s");
	   /*********/

	   /*** iat ***/
	   $myJti = $app->jwt->jti;
	   /*********/

	   /*** iss ***/
	   $myIss = $app->jwt->iss;
	   /*********/

	   /*** nbf ***/
       $myNbfEpoch = $app->jwt->nbf;				// Not before

	   $dtNbf = new DateTime("@$myNbfEpoch");  // convert UNIX timestamp to PHP DateTime
	   $myNbfHuman = $dtNbf->format('Y-m-d H:i:s'); // output = 2012-08-15 00:00:00 

	   $TimeZoneNameFrom="UTC";
	   $TimeZoneNameTo="Asia/Bangkok";
	   $myNbfHumanWithTimeZone = date_create($myNbfHuman, new DateTimeZone($TimeZoneNameFrom))->setTimezone(new DateTimeZone($TimeZoneNameTo))->format("Y-m-d H:i:s");
	   /*********/

	   /*** exp ***/
       $myExpEpoch = $app->jwt->exp;				// Expire

	   $dtExp = new DateTime("@$myExpEpoch");  // convert UNIX timestamp to PHP DateTime
	   $myExpHuman = $dtExp->format('Y-m-d H:i:s'); // output = 2012-08-15 00:00:00 

	   $TimeZoneNameFrom="UTC";
	   $TimeZoneNameTo="Asia/Bangkok";
	   $myExpHumanWithTimeZone = date_create($myExpHuman, new DateTimeZone($TimeZoneNameFrom))->setTimezone(new DateTimeZone($TimeZoneNameTo))->format("Y-m-d H:i:s");
	   /*********/


       $myUsers = $app->jwt->users;
       $myRole = $app->jwt->roles;
       $myPermissions = $app->jwt->permissions;
       $myInformation = $app->jwt->information;

       $app->response->headers->set('Content-Type', 'application/json');
       echo json_encode(array("AuthHeader" => $authHeader, 
       						  "iat-epoch" => $myIatEpoch,
       						  "iat-human" => $myIatHuman,
       						  "iat-human-timezone" => $myIatHumanWithTimeZone,
       						  "jti" => $myJti,
       						  "iss" => $myIss,
       						  "nbf-epoch" => $myNbfEpoch,
       						  "nbf-human" => $myNbfHuman,
       						  "nbf-human-timezone" => $myNbfHumanWithTimeZone,
       						  "exp-epoch" => $myExpEpoch,
       						  "exp-human" => $myExpHuman,
       						  "exp-human-timezone" => $myExpHumanWithTimeZone,
       						  "users" => $myUsers,
       						  "role" => $myRole, 
       						  "permissions" => $myPermissions,
       						  "information" => $myInformation));
       
	 }
	 
    	/**
	 *
	 * @apiName CheckPermission
	 * @apiGroup Login Manager
	 * @apiVersion 0.1.0
	 *
	 * @api {post} /loginManager/checkPermission/ Check Permission
	 * @apiDescription คำอธิบาย : ในส่วนนี้จะมีหน้าที่ตรวจสอบสิทธิ์การเข้าใช้งานของผู้ใช้แต่ละระดับ (user, admin)
	 *
	 *
	 * @apiSampleRequest /loginManager/checkPermission/
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
	 function checkPermission($app, $pdo, $db, $key) {


	   	/*** Extract the jwt from the Session ***/
		if (!isset($_SESSION['jwt'])) {
		 	$jwt = "";
		} else {
		 	$jwt = $_SESSION['jwt'];
		}

		$token = JWT::decode($jwt, $key, array('HS256'));
		// $role = $token->roles;
		// $myInformation = $token->information;
		$myPermissions = $token->permissions;

		$app->response->headers->set('Content-Type', 'application/json');
		// echo json_encode(array("role" => $role, "information" => $myInformation, "permissions" => $myPermissions));
		echo json_encode(array("permissions" => $myPermissions));

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
	 
        /**
     *
     * @apiName ReportWaterLeakageByDMA
     * @apiGroup Wlma Manager
     * @apiVersion 0.1.0
     *
     * @api {post} /wlmaManager/reportWaterLeakageByDMA/ Report Water Leakage by DMA
     * @apiDescription คำอธิบาย : ในส่วนนี้จะมีหน้าที่แสดงรายงานปริมาณน้ำสูญเสียแยกตามแต่ละ DMA ในเดือนที่กำหนด
     *
     *
     * @apiParam {String} name     New name of the user
     *
     * @apiSampleRequest /wlmaManager/reportWaterLeakageByDMA/
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

    function reportWaterLeakageByDMA($app, $pdo, $conn_db2) {

        /* ************************* */
        /* เริ่มกระบวนการเชื่อมต่อฐานข้อมูล DB2 ของ WLMA */
        /* ************************* */
        $reports = array();

        $sql = "call P_WB_WL_REPORT2('201604', '01')";

        if ($conn_db2) {
            // # code...
            $stmt = db2_exec($conn_db2, $sql);

            while ($row = db2_fetch_array($stmt)) {
                
                $tmpAREA_CODE = iconv("TIS-620", "UTF-8",$row[0]);
                $tmpAREA_STATUS = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row[1]);
                $tmpAREA_WL = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row[2]);

                $reports[] = array(
                    "area_code" => $tmpAREA_CODE,
                    "area_status" => $tmpAREA_STATUS,
                    "area_wl" => $tmpAREA_WL
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

    };

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

    function listRTUFromBranch($app, $pdo, $db, $conn_db2, $key) {

        /* ************************* */
        /* เริ่มกระบวนการ Extract the jwt from the Session */
        /* ************************* */
        if (!isset($_SESSION['jwt'])) {
            $jwt = "";
        } else {
            $jwt = $_SESSION['jwt'];
        }

        $token = JWT::decode($jwt, $key, array('HS256'));
        $myBranchCode = $token->information->branchCode;


        /* ************************* */
        /* เริ่มกระบวนการเชื่อมต่อฐานข้อมูล MySQL */
        /* ************************* */
        $reports = array();

        if ($myBranchCode != "ALL") {
            $results = $db->rtu_main_tb->where("branch_code = ? and rtu_status = 1", $myBranchCode)->order("dm_code ASC");
        } else {
            $results = $db->rtu_main_tb->where("rtu_status = 1")->order("dm_code ASC");
        }
        
        foreach ($results as $result) {

            $result_rtu_pin_code = $db->rtu_pin_code_tb->where("dm_code = ? and enable = 1", $result["dm_code"])->fetch();

            $reports[] = array(
                "id" => $result["id"],
                "dm" => $result["dm_code"],
                "dma" => $result["dma_code"],
                "branch" => $result["branch_code"],
                "zone" => $result["zone_code"],
                "ip_address" => $result["ip_address"],
                "logger_code" => $result["logger_code"],
                "comm_type" => $result["comm_type"],
                "status" => $result["rtu_status"],
                "remark" => $result["remark"],
                "rtu_pin_code" => $result_rtu_pin_code["rtu_pin_code"],
                "lat" => $result_rtu_pin_code["lat"],
                "lng" => $result_rtu_pin_code["lng"],
                "location" => $result_rtu_pin_code["location"]
                );

        }


        $rowCount = count($results);

        /* ************************* */
        /* เริ่มกระบวนการส่งค่ากลับ */
        /* ************************* */
        $resultText = "success";

        $reportResult = array("result" =>  $resultText, "count" => $rowCount, "rows" => $reports);
        
        $app->response()->header("Content-Type", "application/json");
        echo json_encode($reportResult);


    };
        /**
     *
     * @apiName RtuDashboard
     * @apiGroup RTU Manager
     * @apiVersion 0.1.0
     *
     * @api {get} /rtuManager/rtuDashboard/ RTU Dashboard
     * @apiDescription คำอธิบาย : ในส่วนนี้จะมีหน้าที่แสดงข้อมูลบนหน้าจอ Dashboard ของ RTU Manager
     *
     *
     *
     * @apiSampleRequest /rtuManager/rtuDashboard/
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

    function rtuDashboard($app, $pdo, $db, $conn_db2, $key) {

        $reports = array();



        /*** Extract the jwt from the Session ***/
        if (!isset($_SESSION['jwt'])) {
            $jwt = "";
        } else {
            $jwt = $_SESSION['jwt'];
        }

        $token = JWT::decode($jwt, $key, array('HS256'));
        // $role = $token->roles;
        $myBranchCode = $token->information->branchCode;
        //$myPermissions = $token->permissions;


        // $myNumDM = 99;
        // $myNumDMA = 55;

        /* ************************* */
        /* เริ่มกระบวนการเชื่อมต่อฐานข้อมูล MySQL */
        /* ************************* */



        if ($myBranchCode == "ALL") {
            $myNumDM = $db->rtu_main_tb->select("DISTINCT dm_code")->where("rtu_status = 1")->count();
            $myNumDMA = $db->rtu_main_tb->select("DISTINCT dma_code")->where("rtu_status = 1")->count();
        } else {
            $myNumDM = $db->rtu_main_tb->select("DISTINCT dm_code")->where("branch_code = ? and rtu_status = 1", $myBranchCode)->count();
            $myNumDMA = $db->rtu_main_tb->select("DISTINCT dma_code")->where("branch_code = ? and rtu_status = 1", $myBranchCode)->count();
        }

        



        $reports = array("branchCode" => $myBranchCode,
                                "numDM" => $myNumDM,
                               "numDMA" => $myNumDMA);

        /* ************************* */
        /* เริ่มกระบวนการส่งค่ากลับ */
        /* ************************* */
        $resultText = "success";


        $reportResult = array("result" =>  $resultText, "info" => $reports);

        $app->response->headers->set('Content-Type', 'application/json');
        echo json_encode($reportResult);



    };
        /**
     *
     * @apiName AddNewRTU
     * @apiGroup RTU Manager
     * @apiVersion 0.1.0
     *
     * @api {post} /rtuManager/addNewRTU/ Add New RTU
     * @apiDescription คำอธิบาย : ในส่วนนี้ทำหน้าที่เพิ่มข้อมูล RTU ตัวใหม่เข้าไปในระบบ
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

    function addNewRTU($app, $pdo, $db, $conn_db2, $key) {

        //$name = $request->getAttribute('name');
        //echo "สวัสดี, $name";
        $return_m = array("msg" => "สวัสดี, $name");

        //$response->getBody()->write("Hello, $name");
        // $response->header("Content-Type", "application/json");
        // $response->getBody()->write($return_m);

        $app->response()->header("Content-Type", "application/json");
        echo json_encode($return_m);
    };
        /**
     *
     * @apiName SyncRTUFromWLMA
     * @apiGroup RTU Manager
     * @apiVersion 0.1.0
     *
     * @api {post} /rtuManager/syncRTUFromWLMA/ Sync RTU from WLMA
     * @apiDescription คำอธิบาย : ในส่วนนี้ทำหน้าที่ Sync ข้อมูล RTU จากระบบ WLMA
     *
     *
     * @apiParam {String} name     New name of the user
     *
     * @apiSampleRequest /rtuManager/syncRTUFromWLMA/
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
             
    function syncRTUFromWLMA($app, $pdo, $db, $conn_db2, $key) {

        $myBranchCode = "";

        /* ************************* */
        /* เริ่มกระบวนการ Extract the jwt from the Header or Session */
        /* ************************* */
        if (!isset($_SESSION['jwt'])) {
            // $jwt = "";

            /*** Extract the jwt from the Bearer ***/
            $request = $app->request();
            $authHeader = $request->headers('authorization');
            list($jwt) = sscanf( (string)$authHeader, 'Bearer %s');

            $myBranchCode = $app->jwt->information->branchCode;

        } else {
            /*** Extract the jwt from Session ***/
            $jwt = $_SESSION['jwt'];

            $token = JWT::decode($jwt, $key, array('HS256'));
            $myBranchCode = $token->information->branchCode;
        }

        /* ************************* */
        /* เริ่มกระบวนการเชื่อมต่อฐานข้อมูล MySQL */
        /* ************************* */

        



        /* ************************* */
        /* เริ่มกระบวนการเชื่อมต่อฐานข้อมูล DB2 ของ WLMA */
        /* ************************* */
        $reports = array();

        if($myBranchCode != "") {

            $tmpBranchCode = substr($myBranchCode,1,2);

            if ($myBranchCode == "ALL") {
                //$sql = "select * from IIM_EQUIP";
                $sql = "SELECT  EQUIP_CODE,
                                GIS_X,
                                GIS_Y,
                                EQUIP_ADDR,
                                STATUS,
                                BRANCH_CODE,
                                IP_ADDRESS,
                                LOGGER_CODE FROM IIM_EQUIP WHERE ( EQUIP_CODE LIKE 'DM-%')";
            } else {
                //$sql = "select * from IIM_EQUIP where BRANCH_CODE = ".$tmpBranchCode;
                $sql = "SELECT  EQUIP_CODE,
                                GIS_X,
                                GIS_Y,
                                EQUIP_ADDR,
                                STATUS,
                                BRANCH_CODE,
                                IP_ADDRESS,
                                LOGGER_CODE FROM IIM_EQUIP WHERE ( BRANCH_CODE = ".$tmpBranchCode." AND EQUIP_CODE LIKE 'DM-%')";
            }
        } 

        if ($conn_db2) {
            // # code...
            $stmt = db2_exec($conn_db2, $sql);

            $flag_set_rtu_status = 1;
            $flag_set_sync_flag = 1;
            

            while ($row = db2_fetch_both($stmt)) {

                $tmp_rtu_pin_code = 0;

                $tmpEQUIP_CODE = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row["EQUIP_CODE"]);
                $tmpGIS_X = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row["GIS_X"]);
                $tmpGIS_Y = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row["GIS_Y"]);
                $tmpEQUIP_ADDR = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row["EQUIP_ADDR"]);
                $tmpSTATUS = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row["STATUS"]);
                $tmpBRANCH_CODE = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row["BRANCH_CODE"]);
                $tmpIP_ADDRESS = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row["IP_ADDRESS"]);
                $tmpLOGGER_CODE = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row['LOGGER_CODE']); 

                if ($tmpLOGGER_CODE == "X20-2") {
                    $tmpLOGGER_CODE = "X20";
                } else if ($tmpLOGGER_CODE == "MOXA-2") {
                    $tmpLOGGER_CODE = "MOXA";
                } else if ($tmpLOGGER_CODE == "AC500-2") {
                    $tmpLOGGER_CODE = "AC500";
                } else if ($tmpLOGGER_CODE == "CTU800-SFTP") {
                    $tmpLOGGER_CODE = "CTU800";
                } 

                                    $sql_insertRTUMain = "select * from CORE_AREA_METER where METER_CODE = '".$tmpEQUIP_CODE."'";
                    $tmpDMA_CODE = "";
                    $tmpZONE_CODE = "";

                    if ($conn_db2) {
                        // # code...
                        $stmt_insertRTUMain = db2_exec($conn_db2, $sql_insertRTUMain);
                        
                        while ($row_insertRTUMain = db2_fetch_both($stmt_insertRTUMain)) {

                            $tmpDMA_checkAreaCode = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row_insertRTUMain['AREA_CODE']);
                            $tmpMETER_INOUT = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row_insertRTUMain['METER_INOUT']); 

                            if (($tmpMETER_INOUT == "I") and (strlen($tmpDMA_checkAreaCode) == 8)) {

                                $sql_checkAreaCode = "select * from CORE_AREA where AREA_CODE = '".$tmpDMA_checkAreaCode."'";
                                $stmt_checkAreaCode = db2_exec($conn_db2, $sql_checkAreaCode);

                                while ($row_checkAreaCode = db2_fetch_both($stmt_checkAreaCode)) {
                                
                                if ($row_checkAreaCode) {
                                    $tmpAREA_STATUS = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row_checkAreaCode['AREA_STATUS']); 

                                    if ($tmpAREA_STATUS == "A") {
                                        $tmpDMA_CODE = iconv("TIS-620//IGNORE", "UTF-8//IGNORE",$row_checkAreaCode['AREA_CODE']); 
                                        $tmpZONE_CODE = substr($tmpDMA_CODE,3,2);
                                    } else {
                                        $tmpDMA_CODE = "";
                                    } 
                                }
                              }

                            }

                        }
                        
                    }

                if ($tmpDMA_CODE != "") {

                    /* ****************************************************** */
                    /* ตรวจสอบข้อมูล DM จากตารางข้อมูล IIM_EQUIP กับ rtu_main_tb */
                    /* ****************************************************** */
                     
                    if ($flag_set_rtu_status) {
                                        if ($flag_set_rtu_status) {

                    $rtu_main_dbdata = array(
                        "rtu_status" => 0
                    );

                    // $rtu_main = $db->rtu_main_tb->where("dm_code = '".$tmpEQUIP_CODE."'")->fetch();
                    $rtu_main = $db->rtu_main_tb;

                    if ($rtu_main !== false) {
                        $result_rtu_pin_code = $rtu_main->update($rtu_main_dbdata);
                    } else {
                        //TODO;
                    }

                    $flag_set_rtu_status = 0;
                }
                        $flag_set_rtu_status = 0;
                    }
                    

                    $rtuMain_compare_iimEquip = $db->rtu_main_tb->where("dm_code = '".$tmpEQUIP_CODE."'")->fetch();

                    if ($rtuMain_compare_iimEquip !== false) {
                                            






                    if (substr($tmpIP_ADDRESS,0,2) == "10") {
                        $tmpCommType = "GPRS";
                    } else {
                        $tmpCommType = "PSTN";
                    }
                
                    $rtuMain_compare_iimEquip_dbdata = array(
                        "branch_code" => "B".$tmpBRANCH_CODE,
                        "zone_code" => $tmpZONE_CODE,
                        "dma_code" => "DMA-".$tmpDMA_CODE,
                        "dm_code" => $tmpEQUIP_CODE,
                        "ip_address" => $tmpIP_ADDRESS,
                        "comm_type" => $tmpCommType,
                        "logger_code" => $tmpLOGGER_CODE,
                        "rtu_status" => 1
                    );

                    $result_rtuMain_compare_iimEquip = $rtuMain_compare_iimEquip->update($rtuMain_compare_iimEquip_dbdata);
                    } else {
                                            if (substr($tmpIP_ADDRESS,0,2) == "10") {
                        $tmpCommType = "GPRS";
                    } else {
                        $tmpCommType = "PSTN";
                    }
                
                    $rtuMain_compare_iimEquip_dbdata = array(
                        "branch_code" => "B".$tmpBRANCH_CODE,
                        "zone_code" => $tmpZONE_CODE,
                        "dma_code" => "DMA-".$tmpDMA_CODE,
                        "dm_code" => $tmpEQUIP_CODE,
                        "ip_address" => $tmpIP_ADDRESS,
                        "comm_type" => $tmpCommType,
                        "logger_code" => $tmpLOGGER_CODE,
                        "rtu_status" => 1
                    );

                    $rtuMain_compare_iimEquip = $db->rtu_main_tb;
                    $result_rtuMain_compare_iimEquip = $rtuMain_compare_iimEquip->insert($rtuMain_compare_iimEquip_dbdata);

                    
                    }


                    /* ********************************************************** */
                    /* ตรวจสอบข้อมูล DM จากตารางข้อมูล IIM_EQUIP กับ rtu_pin_code_tb */
                    /* ********************************************************** */

                    if ($flag_set_sync_flag) {
                                $dbdata = array(
            "sync_flag" => ""
        );

        // $rtu_pin_code = $db->rtu_pin_code_tb->where("enable = 1")->fetch();
        // $rtu_pin_code = $db->rtu_pin_code_tb->where("enable = 1");
        $rtu_pin_code = $db->rtu_pin_code_tb;

        if ($rtu_pin_code !== false) {
            $result_rtu_pin_code = $rtu_pin_code->update($dbdata);
            // echo $result;
        } else {
            //TODO;
        }
                        $flag_set_sync_flag = 0;
                    }

                    $rtuPinCode_compare_iimEquip = $db->rtu_pin_code_tb->where("dm_code = '".$tmpEQUIP_CODE."' and enable = 1")->fetch();

                    if ($rtuPinCode_compare_iimEquip !== false) {
                                            $rtuPinCode_compare_iimEquip_dbdata = array(
                        "location" => $tmpEQUIP_ADDR,
                        "sync_flag" => 1
                    );

                    $rtuPinCode_update = $db->rtu_pin_code_tb->where("dm_code = '".$tmpEQUIP_CODE."' and enable = 1");
                    $result_rtuPinCode_compare_iimEquip = $rtuPinCode_update->update($rtuPinCode_compare_iimEquip_dbdata);
                    } else {
                                            $tmp_rtu_pin_code = $db->rtu_pin_code_tb->max("id");
                    $tmp_rtu_pin_code = (int)$tmp_rtu_pin_code + 1;
                    $tmp_rtu_pin_code = "RPC-".$tmp_rtu_pin_code;

                    $tmp_dm_code = $tmpEQUIP_CODE;
                    $tmp_location = $tmpEQUIP_ADDR;
                
                    $rtuPinCode_compare_iimEquip_dbdata = array(
                        "rtu_pin_code_dm_code" =>  $tmp_rtu_pin_code."_".$tmp_dm_code,
                        "rtu_pin_code" => $tmp_rtu_pin_code,
                        "dm_code" => $tmp_dm_code,
                        "location" => $tmp_location,
                        "lat" => 0.0000000,
                        "lng" => 0.0000000,
                        "enable" => 1,
                        "sync_flag" => 1
                    );

                    $rtuPinCode_compare_iimEquip = $db->rtu_pin_code_tb;
                    $result_rtuPinCode_compare_iimEquip = $rtuPinCode_compare_iimEquip->insert($rtuPinCode_compare_iimEquip_dbdata);
                    }

                }



                $reports[] = array(
                    "dm_name" => $tmpEQUIP_CODE,
                    "lat" => $tmpGIS_X,
                    "lng" => $tmpGIS_Y,
                    "address" => $tmpEQUIP_ADDR,
                    "status" => $tmpSTATUS,
                    "branch_code" => "B".$tmpBRANCH_CODE,
                    "ip_address" => $tmpIP_ADDRESS,
                    "logger_code" => $tmpLOGGER_CODE,
                    "DMA" => $tmpDMA_CODE,
                    "ZONE" => $tmpZONE_CODE
                );
            }
        }







        /* ************************* */
        /* เริ่มกระบวนการส่งค่ากลับ */
        /* ************************* */
        if ($myBranchCode) {
            $resultText = "success";
        } else {
            $resultText = "fail";
        }

        $reportResult = array("result" =>  $resultText, "sql" => $sql, "result" => $reports);


        $app->response()->header("Content-Type", "application/json");
        echo json_encode($reportResult);
    };
        /**
     *
     * @apiName GetMsg
     * @apiGroup TEST Manager
     * @apiVersion 0.1.0
     *
     * @api {post} /rtuManager/updateLatLngFromFile/ Update Lat,Lng from CSV file
     * @apiDescription คำอธิบาย : ในส่วนนี้จะมีหน้าที่อัพเดทข้อมูลพิกัด RTU
     *
     *
     * @apiParam {String} name     New name of the user
     *
     * @apiSampleRequest /rtuManager/updateLatLngFromFile/
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

    function updateLatLngFromFile($app, $pdo, $db) {

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
            $postFileName = $result->filename;
            $postStartRow = $result->start_row;


        } else if ($ContetnType == "application/x-www-form-urlencoded"){

            //$userID = $app->request()->params('userID_param');
            //$userID = $app->request()->post('userID_param');
        }

        /* ************************* */
        /* เริ่มกระบวนการเชื่อมต่อฐานข้อมูล MySQL ของ RMR */
        /* ************************* */
        $csv = array();
        $i = 0;

        $file = fopen($postFileName,"r", ",");  // http://www.w3schools.com/php/func_filesystem_fgetcsv.asp
        while(! feof($file)) {
          // $csv[] = fgetcsv($file);
          $tmpRow = fgetcsv($file);

          if ($i >= $postStartRow) {

            $result_rtu_pin_code = $db->rtu_pin_code_tb->where("dm_code = ? and enable = 1", $tmpRow[0])->fetch();

            if ($result_rtu_pin_code !== false) {

                // $latString = $tmpRow[1];
                // $lngString = $tmpRow[2];
                // $findStr   = '.';
                // $posLatString = strpos($latString, $findStr);
                // $posLngString = strpos($lngString, $findStr);

               $rtu_pin_code_update = array(
                    "lat" => $tmpRow[1],
                    "lng" => $tmpRow[2]
                );

               $result_update_rtu_pin_code = $result_rtu_pin_code->update($rtu_pin_code_update);
            }

            $csv[] = array(
                    "DM" => $tmpRow[0],
                    "Lat" => $tmpRow[1],
                    "Lng" => $tmpRow[2],
                    "result" => $result_rtu_pin_code
                );
          }
          $i++;
        }
        fclose($file);

        /* ************************* */
        /* เริ่มกระบวนการส่งค่ากลับ */
        /* ************************* */
        $resultText = "success";
        $reportResult = array("result" =>  $resultText, "count" => count($csv), "rows" => $csv);

        $app->response()->header("Content-Type", "application/json");
        echo json_encode($reportResult);

    };
        /**
     *
     * @apiName RtuLocationGeoJSON
     * @apiGroup TEST Manager
     * @apiVersion 0.1.0
     *
     * @api {get} /rtuManager/rtuLocationGeoJSON/ RTU Location GeoJSON
     * @apiDescription คำอธิบาย : ในส่วนนี้ทำหน้าที่แสดงรายการตำแหน่ง RTU ในรูปแบบ GeoJSON
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

    function rtuLocationGeoJSON($app, $pdo, $db, $key) {


        $myBranchCode = "";

        /* ************************* */
        /* เริ่มกระบวนการ Extract the jwt from the Header or Session */
        /* ************************* */
        if (!isset($_SESSION['jwt'])) {
            // $jwt = "";

            /*** Extract the jwt from the Bearer ***/
            $request = $app->request();
            $authHeader = $request->headers('authorization');
            list($jwt) = sscanf( (string)$authHeader, 'Bearer %s');

            $myBranchCode = $app->jwt->information->branchCode;

        } else {
            /*** Extract the jwt from Session ***/
            $jwt = $_SESSION['jwt'];

            $token = JWT::decode($jwt, $key, array('HS256'));
            $myBranchCode = $token->information->branchCode;
        }


        /* ************************* */
        /* เริ่มกระบวนการเชื่อมต่อฐานข้อมูล MySQL */
        /* ************************* */
        $features = array();

        if ($myBranchCode != "ALL") {
            $results = $db->rtu_main_tb->where("branch_code = ? and rtu_status = 1", $myBranchCode)->order("dm_code ASC");
        } else {
            $results = $db->rtu_main_tb->where("rtu_status = 1")->order("dm_code ASC");
        }
        
        foreach ($results as $result) {

            $result_rtu_pin_code = $db->rtu_pin_code_tb->where("dm_code = ? and enable = 1", $result["dm_code"])->fetch();


            $tmpID = $result["id"];
            $tmpPoint = new \GeoJson\Geometry\Point([ floatval($result_rtu_pin_code["lng"]), floatval($result_rtu_pin_code["lat"])]);
            $tmpProperties = array("dm" => $result["dm_code"], 
                                   "dma"=>  $result["dma_code"], 
                                   "branch" => $result["branch_code"],
                                   "zone" => $result["zone_code"],
                                   "ip_address" => $result["ip_address"],
                                   "logger_code" => $result["logger_code"],
                                   "rtu_pin_code" => $result_rtu_pin_code["rtu_pin_code"],
                                   "location" => $result_rtu_pin_code["location"],
                                   "remark" => $result["remark"]);
            $tmpFeature = new \GeoJson\Feature\Feature($tmpPoint, $tmpProperties, $tmpID, null);

            $features[] = $tmpFeature;

        }

        /* ************************* */
        /* เริ่มกระบวนการส่งค่ากลับ */
        /* ************************* */

        $featureCollection = new \GeoJson\Feature\FeatureCollection($features);
        $app->response()->header("Content-Type", "application/json");
        echo json_encode($featureCollection);


    };

    /* RMR Manager Partial */
        /**
     *
     * @apiName ReportRMRFromYear
     * @apiGroup RMR Manager
     * @apiVersion 0.1.0
     *
     * @api {post} /rmrManager/reportRMRFromYear Report RMR From Year
     * @apiDescription คำอธิบาย : ส่วนนี้เป็นส่วนค้นหารายการ RMR แยกแต่ละปี
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

    function reportRMRFromYear($app, $pdo, $db) {

        /* ************************* */
        /* เริ่มกระบวนการรับค่าพารามิเตอร์จากส่วนของ Payload ซึ่งอยู่ในรูปแบบ JSON */
        /* ************************* */
        $headers = $app->request->headers;
        $ContetnType = $app->request->headers->get('Content-Type');

        /**
        * apidoc @apiSampleRequest, iOS RESTKit use content-type is "application/json"
        * Web Form, Advance REST Client App use content-type is "application/x-www-form-urlencoded"
        */
        if (($ContetnType == "application/json") || ($ContetnType == "application/json; charset=utf-8")) {

            $request = $app->request();
            $result = json_decode($request->getBody());

            /* receive request */
            $postYear = $result->year;


        } else if ($ContetnType == "application/x-www-form-urlencoded"){

            //$userID = $app->request()->params('userID_param');
            //$userID = $app->request()->post('userID_param');
        }



        /* ************************* */
        /* เริ่มกระบวนการเชื่อมต่อฐานข้อมูล MySQL */
        /* ************************* */
        $reports = array();
        $reports_cost = array();
        $reports_cause = array();
        $shortYear = substr($postYear, -2);
        $tmpTotalPrice = 0;

        // $results = $db->collect_data_all_tb;
        // $results = $db->collect_data_all_tb->where("mn_code like 'MN-".$shortYear."%'");
        // $results = $db->collect_data_all_tb->where("mn_code like 'MN-".$shortYear."%'")->order("mn_date ASC");
        $results = $db->collect_data_all_tb->where("mn_code like 'MN-".$shortYear."%'")->order("mn_code, mn_date ASC");
        
        foreach ($results as $result) {



                  $results_cost = $db->collect_data_cost_tb->where("mn_code ='".$result["mn_code"]."'");
                  foreach ($results_cost as $result_cost) {

                      
                      
                      $tmpCostSubGroupCode = $result_cost["cost_sub_group_code"];
                      $tmpCostSubGroupCode = str_replace(array('.', ' ', "\n", "\t", "\r"), '', $tmpCostSubGroupCode);
                      $results_cost_sub_group = $db->cost_sub_group_tb->where("cost_sub_group_code = '".$tmpCostSubGroupCode."'")->fetch();

                      $tmpCostMainGroupCode = substr($tmpCostSubGroupCode,0,-3);
                      $results_cost_main_group = $db->cost_main_group_tb->where("cost_main_group_code = '".$tmpCostMainGroupCode."'")->fetch();

                      $reports_cost[] = array(
                          "cost_main_group_code" => $tmpCostMainGroupCode,
                          "cost_main_group_desc" => $results_cost_main_group["cost_main_group_desc"],
                          "cost_sub_group_code" => $result_cost["cost_sub_group_code"],
                          "cost_sub_group_desc" => $results_cost_sub_group["cost_sub_group_desc"],
                          "cost_sub_price" => $results_cost_sub_group["cost_sub_price"],
                          "unit_desc" => $results_cost_sub_group["unit_desc"]
                      );

                      $tmpTotalPrice = $tmpTotalPrice + (int)str_replace(' ', '', $results_cost_sub_group["cost_sub_price"]);
                  }

                  $results_cause = $db->collect_data_cause_tb->where("mn_code ='".$result["mn_code"]."'");
                  foreach ($results_cause as $result_cause) {

                    
                    $tmpCauseSubGroupCode = $result_cause["cause_sub_group_code"];
                    $tmpCauseSubGroupCode = str_replace(array('.', ' ', "\n", "\t", "\r"), '', $tmpCauseSubGroupCode);
                    $results_cause_sub_group = $db->cause_sub_group_tb->where("cause_sub_group_code = '".$tmpCauseSubGroupCode."'")->fetch();

                    // $results_cause_main_group = $db->cause_main_group_tb->where("cause_main_group_code = 'cause-01'")->fetch();
                    $tmpCauseMainGroupCode = $results_cause_sub_group["cause_main_group_code"];
                    $tmpCauseMainGroupCode = str_replace(array('.', ' ', "\n", "\t", "\r"), '', $tmpCauseMainGroupCode);
                    $results_cause_main_group = $db->cause_main_group_tb->where("cause_main_group_code = '".$tmpCauseMainGroupCode."'")->fetch();

                    $tmpFixCode = $result_cause["fix_code"];
                    $tmpFixCode = str_replace(array('.', ' ', "\n", "\t", "\r"), '', $tmpFixCode);
                    $results_fix_type = $db->fix_type_tb->where("fix_code = '".$tmpFixCode."'")->fetch();

                    $reports_cause[] = array(
                          "cause_main_group_code" => $results_cause_sub_group["cause_main_group_code"],
                          "cause_main_group_desc" => $results_cause_main_group["cause_main_group_desc"],
                          "cause_sub_group_code" => $result_cause["cause_sub_group_code"],
                          "cause_sub_group_desc" => $results_cause_sub_group["cause_sub_group_desc"],
                          "fix_code" => $result_cause["fix_code"],
                          "fix_desc" => $results_fix_type["fix_desc"]
                      );

                  }

            $reports[] = array(
                "id" => $result["id"],
                "mn_code" => $result["mn_code"],
                "dm_code" => $result["dm_code"],
                "mn_date" => $result["mn_date"],
                "taketime" => $result["taketime"],
                "total_price" => $tmpTotalPrice,
                "cost" => $reports_cost,
                "cause" => $reports_cause
            );

            $reports_cost = array();
            $reports_cause = array();

            $tmpTotalPrice = 0;

        }

        $rowCount = count($results);


        /* ************************* */
        /* เริ่มกระบวนการส่งค่ากลับ */
        /* ************************* */
        $resultText = "success";
        $return_m = array("params" => $postYear);
        $reportResult = array("result" =>  $resultText, 
                              "count" => $rowCount, 
                              "postYear" => $postYear, 
                              "rows" => $reports);

        $app->response()->header("Content-Type", "application/json");
        echo json_encode($reportResult);
    };
    
    
?>