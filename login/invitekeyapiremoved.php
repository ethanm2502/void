<?php 
session_start();
include($_SERVER['DOCUMENT_ROOT'] . '/Classes/ratelimiter.php');
function getUserIP()
{
// Get real visitor IP behind CloudFlare network
if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
$_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
$_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
}
$client = @$_SERVER['HTTP_CLIENT_IP'];
$forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
$remote = $_SERVER['REMOTE_ADDR'];
if (filter_var($client, FILTER_VALIDATE_IP)) {
$ip = $client;
} elseif (filter_var($forward, FILTER_VALIDATE_IP)) {
$ip = $forward;
} else {
$ip = $remote;
}
return $ip;
}
// in this sample, we are using the originating IP, but you can modify to use API keys, or tokens or what-have-you.
$rateLimiter = new RateLimiter(getUserIP());
$limit = 5; // number of connections to limit user to per $minutes
$minutes = 1; // number of $minutes to check for.
$seconds = floor($minutes * 60); // retry after $minutes in seconds.
try {
$rateLimiter->limitRequestsInMinutes($limit, $minutes);
} catch (RateExceededException $e) {
header("HTTP/1.1 429 Too Many Requests");
header(sprintf("Retry-After: %d", $seconds));
$data = "Rate Limit Exceeded, please wait for 60 seconds.";
die($data);
}
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$logged = false;
if($_COOKIE['password'] || $_COOKIE['_ROBLOSECURITY']){
$password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['password' => $password, 'ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
if($usr != 0){
$logged = true;
}
}else{
die();
}
$uID = $usr['id'];
if(isset($_POST['username'])){
$keypost = filter_var($_POST['username'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$keyquery = $con->prepare("SELECT * FROM `invitekeys` WHERE `invitekey` = :invitekey");
$keyquery->execute(['invitekey' => $keypost]);
$key = $keyquery->fetch();
if(is_array($key)){
if($key['usedById'] == 0){
$sql = "UPDATE `users` SET `activated` = '1' WHERE `ROBLOSECURITY` = :roblosec";
$stmt = $con->prepare($sql);
$stmt->bindParam(':roblosec', $roblosec);
$stmt->execute();
$sql2 = "UPDATE `invitekeys` SET `usedById` = :uID WHERE `invitekey` = :keypost";
$stmt2 = $con->prepare($sql2);
$stmt2->bindParam(':uID', $uID);
$stmt2->bindParam(':keypost', $keypost);
$stmt2->execute();
die('{"success":true}');
}else{
die('{"success":false}');
}
}else{
die('{"success":false}');
}
}
?>