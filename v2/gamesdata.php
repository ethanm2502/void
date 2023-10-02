<?php
header("Content-Type: application/json; charset=utf-8");
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
if($_COOKIE['password'] || $_COOKIE['_ROBLOSECURITY']){
$password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['password' => $password, 'ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
if($usr != 0){
$logged = true;
}
}
if($usr['banned'] != 0){
echo json_encode(array('success' => false));
die(http_response_code(403));
}
$userId = $usr['id'];
$url = $_SERVER['REQUEST_URI'];
if (strpos($url, "media") !== false) {
header("Content-Type: application/json; charset=utf-8");
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$testurl = str_replace("/v2/games/","",$url);
$testurl = str_replace("/media","",$testurl);
$gameId = (int)$testurl;
$data = [
"data" => [
[
"assetTypeId" => 1,
"assetType" => "Image",
"imageId" => getPlaceIcon($con,$gameId,true),
"videoHash" => null,
"videoTitle" => null,
"approved" => true,
"altText" => null
]
]
];
$json = json_encode($data, JSON_PRETTY_PRINT);
echo $json;
}