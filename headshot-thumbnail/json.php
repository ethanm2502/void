<?php
header("Content-Type: application/json");
require($_SERVER['DOCUMENT_ROOT']."/config/includes.php");
$userId = (int)$_GET['userId'];
echo json_encode(["Url" => "https://www.voidrev.us".getUserHeadshotThumbnail($con,$userId)]);
?>