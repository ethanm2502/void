<?php
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
header("Content-Type: application/json");
$url = $_SERVER['REQUEST_URI'];
preg_match_all('/userIds=(\d+)/', $url, $matches);
$userIds = isset($matches[1]) ? $matches[1] : array();
$newData = array();
foreach ($userIds as $userId) {
$userId = (int)$userId;
$hash = getUserHeadshotThumbnail($con,$userId);
$newData[] = array(
"targetId" => $userId,
"state" => "Completed",
"imageUrl" => "https://www.voidrev.us".$hash
);
}
$response = array(
"data" => $newData
);
echo json_encode($response, JSON_PRETTY_PRINT);
?>
