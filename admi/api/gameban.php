<?php
require ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
error_reporting(E_ALL);
$logged = false;
if($_COOKIE['password'] || $_COOKIE['_ROBLOSECURITY']){
$password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['password' => $password, 'ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
if(is_array($usr)){
$logged = true;
}else{
die("no.");
}
}else{
die("bro where are your cookies");
}
$username = $usr['username'];
$uID = $usr['id'];
if ($usr['banned'] > 0) {
header('Location: /banned');
exit();
}
if ($usr['Admin'] != 1) {
header('HTTP/1.0 403 Forbidden', true, 403);
http_response_code(403);
die("Bad Request");
}
if (isset($_POST['GameId'], $_POST['Type'])) {
$GameId = (int) $_POST['GameId'];
$Type = filter_var($_POST['Type'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$date = time();
if ($Type == "Revert") {
$sql = "UPDATE `games` SET `banned`='0', `updated`=:date WHERE `id`=:GameId";
} elseif ($Type == "Under Review") {
$sql = "UPDATE `games` SET `banned`='1', `updated`=:date WHERE `id`=:GameId";
} elseif ($Type == "Deleted") {
$sql = "UPDATE `games` SET `banned`='2', `name`='[ Content Deleted ]', `description`='[ Content Deleted ]', `updated`=:date WHERE `id`=:GameId";
$gamefile = base64_encode(file_get_contents($_SERVER["DOCUMENT_ROOT"] . "/Asset/Baseplate.rbxl"));
$stmt = $con->prepare("UPDATE `games` SET `file` = :gamefile WHERE `id` = :GameId");
$stmt->bindParam(':gamefile', $gamefile);
$stmt->bindParam(':GameId', $GameId, PDO::PARAM_INT);
$stmt->execute();
$gamequery = $con->prepare("SELECT generatedthumbnailhash FROM `games` WHERE `id` = :id");
$gamequery->execute(['id' => $GameId]);
$game = $gamequery->fetch();
$thumbnailhash = $game['generatedthumbnailhash'];
$stmt = $con->prepare("UPDATE `games` SET `generatedthumbnailhash` = null WHERE `id` = :GameId");
$stmt->bindParam(':GameId', $GameId, PDO::PARAM_INT);
$stmt->execute();
unlink($_SERVER['DOCUMENT_ROOT']."/thumbnails/".$thumbnailhash.".png");
} else {
die("Bad Request");
}
$stmt = $con->prepare($sql);
$stmt->bindValue(':date', $date, PDO::PARAM_INT);
$stmt->bindValue(':GameId', $GameId, PDO::PARAM_INT);
$stmt->execute();
header("Location: https://www.voidrev.us/admi/?tab=Moderation&item=Games");
die("Success, returning");
}else{
die("Bad Request");
}