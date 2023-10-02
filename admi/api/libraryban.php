<?php
require ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
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
if (isset($_POST['LibraryId'], $_POST['Type'])) {
$LibraryId = (int) $_POST['LibraryId'];
$Type = filter_var($_POST['Type'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$date = time();
if ($Type == "Revert") {
$sql = "UPDATE `library` SET `banned`='0', `updated`=:date WHERE `id`=:LibraryId";
} elseif ($Type == "Deleted") {
$sql = "UPDATE `library` SET `banned`='2', `name`='[ Content Deleted ]', `description`='[ Content Deleted ]', `updated`=:date WHERE `id`=:LibraryId";
} else {
die("Bad Request");
}
$stmt = $con->prepare($sql);
$stmt->bindValue(':date', $date, PDO::PARAM_INT);
$stmt->bindValue(':LibraryId', $LibraryId, PDO::PARAM_INT);
$stmt->execute();
$libraryquery = $con->prepare("SELECT * FROM `library` WHERE `id` = :id");
$libraryquery->execute(['id' => $LibraryId]);
$library = $libraryquery->fetch();
$fileid = $library['fileid'];
$realfileid = $library['realfileid'];
unlink($_SERVER['DOCUMENT_ROOT']."/asset/assets/".$fileid);
unlink($_SERVER['DOCUMENT_ROOT']."/asset/assets/".$realfileid);
header("Location: https://www.voidrev.us/admi/?tab=Moderation&item=Library");
die("Success, returning");
} else {
die("Bad Request");
}