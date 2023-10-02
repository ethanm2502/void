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
if ($usr['Admin'] === 0) {
header('HTTP/1.0 403 Forbidden', true, 403);
http_response_code(403);
exit();
}
if ($usr['SuperAdmin'] === 0) {
header('HTTP/1.0 403 Forbidden', true, 403);
http_response_code(403);
exit();
}
$JobId = filter_var($_GET['jobId'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$jobsquery = $con->prepare("SELECT * FROM `jobs` WHERE `id` = :id");
$jobsquery->execute(['id' => $JobId]);
$jobs = $jobsquery->fetch();
$port = $jobs['serviceport'];
$sql = "DELETE FROM `jobs` WHERE `id` = :jobId";
$stmt = $con->prepare($sql);
$stmt->execute(['jobId' => $JobId]);
// its jobstop idk why i named it as placestop
try{
placeStop($JobId,$port);
}catch(Throwable $e){
placeStop($JobId,$port);
}
header("Location: https://www.voidrev.us/admi/?tab=GameServers&item=GameJobs");
?>