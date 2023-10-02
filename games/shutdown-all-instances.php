<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
require_once ($_SERVER['DOCUMENT_ROOT'].'/SOAP.php');
if($_REQUEST['placeId']){
$placeId = (int)$_REQUEST['placeId'];
placeStopAll($placeId);
echo json_encode(['success' => true]);
}
?>