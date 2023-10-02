<?php
require($_SERVER['DOCUMENT_ROOT']."/config/includes.php");
$usr = getUserData($con);
$roblosec = $usr['ROBLOSECURITY'];
$placeId = (int)$_GET['placeId'];
header("Content-Type: text/plain");
$data = array(
"jobId" => "Test",
"status" => 2,
"joinScriptUrl" => "http://www.voidrev.us/game/join2020.ashx?serverPort=53640&gameid=".$placeId."&jobid=Test",
"authenticationUrl" => "http://www.voidrev.us/Login/Negotiate.ashx",
"authenticationTicket" => $roblosec,
"message" => null
);
$jsonData = json_encode($data);
echo $jsonData;
?>