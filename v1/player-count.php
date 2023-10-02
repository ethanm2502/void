<?php header("Content-Type: application/json");
$placeId = (int)$_GET['placeId'];
include ($_SERVER['DOCUMENT_ROOT'].'/SOAP.php');
$playercount = json_decode(PlayerCount($placeId))->Value;
$jsondata = array('PlayerCount'=>$playercount);
echo json_encode($jsondata);