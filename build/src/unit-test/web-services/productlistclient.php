<?php
require_once '../../packages/autoload.php';
// $client = new nusoap_client("http://localhost/rmr/build/src/web-services/");
// $client = new nusoap_client("http://localhost/rmr/build/src/web-services/index.php?wsdl");
$client = new nusoap_client("products.wsdl", true);

$error = $client->getError();
if ($error) {
    echo "<h2>Constructor error</h2><pre>" . $error . "</pre>";
}

$result = $client->call("getProd", array("category" => "books"));
$result_decode = json_decode($result);

if ($client->fault) {
    echo "<h2>Fault</h2><pre>";
    print_r($result);
    echo "</pre>";
} else {
    $error = $client->getError();
    if ($error) {
        echo "<h2>Error</h2><pre>" . $error . "</pre>";
    }
    else {
        echo "<h2>Books</h2><pre>";
        echo $result_decode->cmd;
        echo "<br/>";
        echo $result_decode->status;
        echo "<br/>";
        echo $result_decode->phone;
        echo "<br/>";
        echo $result_decode->session;
        echo "</pre>";
    }
}