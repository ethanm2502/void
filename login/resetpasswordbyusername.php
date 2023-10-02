<?php 

session_start();
include($_SERVER['DOCUMENT_ROOT'].'/Classes/ratelimiter.php');
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
if(filter_var($client, FILTER_VALIDATE_IP))
{
$ip = $client;
}
elseif(filter_var($forward, FILTER_VALIDATE_IP))
{
$ip = $forward;
}
else
{
$ip = $remote;
}
return $ip;
}
$rateLimiter = new RateLimiter(getUserIP());
$limit = 1; //	number of connections to limit user to per $minutes
$minutes = 10; //	number of $minutes to check for.
$seconds = floor($minutes * 60);	//	retry after $minutes in seconds.
try {
$rateLimiter->limitRequestsInMinutes($limit, $minutes);
} catch (RateExceededException $e) {
header('HTTP/1.0 403 Forbidden');
http_response_code(403);
die('{"success":false, "error":"Rate Limit"}'); 
}

include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');

if(isset($_POST['username'])){
$username = filter_var($_POST['username'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);

$usrquery = $con->prepare("SELECT * FROM `users` WHERE `username` = :username");
$usrquery->execute(['username' => $username]);
$usr = $usrquery->fetch();

if(is_array($usr)){
$email = $usr['email'];
if(empty($email)){
die('{"success":false}');    
}
try {
file_get_contents("https://www.voidrev.us/mail/?request=passwordreset&email=".$email."");
}catch(Throwable $e) {
die('{"success":false, "error":"'.$e.'"}'); 
}

die('{"success":true}');
}else{
die('{"success":false, "message":"no user"}');    
}
}else{
die('{"success":false}');
}
?>