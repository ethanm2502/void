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
// in this sample, we are using the originating IP, but you can modify to use API keys, or tokens or what-have-you.
$rateLimiter = new RateLimiter(getUserIP());
$limit = 5; // number of connections to limit user to per $minutes
$minutes = 5; // number of $minutes to check for.
$seconds = floor($minutes * 60); // retry after $minutes in seconds.
try {
$rateLimiter->limitRequestsInMinutes($limit, $minutes);
} catch (RateExceededException $e) {
header("HTTP/1.1 429 Too Many Requests");
header(sprintf("Retry-After: %d", $seconds));
die ("429");
}
require ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
if(!is_array($usr)){
header("Location: https://www.voidrev.us/newlogin/");
exit();
}
if($usr['banned'] != 0){
echo json_encode(array('success' => false));
die(http_response_code(403));
}
$uID = $usr['id'];
if(isset($_POST['followedUserId'])){
$friendId = (int)$_POST['followedUserId'];
}else{
$json = json_decode(file_get_contents("php://input"), true);
$friendId = (int)$json['targetUserId'];
}
$followquery = $con->prepare("SELECT * FROM `following` WHERE `toid` = :toid AND `fromid` = :fromid");
$followquery->execute(['toid' => $friendId, 'fromid' => $uID]);
$follow = $followquery->fetch();
if(!is_array($follow)){
$sql = "INSERT INTO `following` (`toid`, `fromid`) VALUES (:friendId, :uID)";
$stmt = $con->prepare($sql);
$stmt->bindValue(':friendId', $friendId, PDO::PARAM_INT);
$stmt->bindValue(':uID', $uID, PDO::PARAM_INT);
$stmt->execute();
$data = array('success' => 'true');
echo json_encode($data);
}else{
$data = array('success' => 'false');
echo json_encode($data);
exit();
}
?>
