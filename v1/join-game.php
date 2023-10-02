<?php
$json = json_decode(file_get_contents("php://input"),true);
$placeId = (int)$json['placeId'];
$_GET['placeId'] = $placeId;
$_GET['request'] = "RequestGame";
require($_SERVER['DOCUMENT_ROOT']."/game/PlaceLauncher.ashx")
?>