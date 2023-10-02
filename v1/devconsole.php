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
if($usr['banned'] > 0){
echo "Not authenticated";
http_response_code(403);
exit();
}
$url = $_SERVER['REQUEST_URI'];
if (strpos($url, "is-admin-developer-console-enabled") !== false) {
$testurl = str_replace("/v1/user/","",$url);
$testurl = str_replace("/is-admin-developer-console-enabled","",$testurl);
$userId = (int)$testurl;

$assetId = (int)$_SERVER['Roblox-Place-Id'];

$canquery = $con->prepare("SELECT id,creatorid,teamcreate FROM `games` WHERE `id` = :assetId");
$canquery->execute(['assetId' => $assetId]);
$canman = $canquery->fetch();
$assetCreatorId = $canman['creatorid'];
if($assetCreatorId == $userId || $userId == 1 || $userId == 2) {
echo'{"isAdminDeveloperConsoleEnabled":true}';
}else{
echo'{"isAdminDeveloperConsoleEnabled":false}';
}
}