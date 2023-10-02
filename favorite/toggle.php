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
$limit = 4; //	number of connections to limit user to per $minutes
$minutes = 5; //	number of $minutes to check for.
$seconds = floor($minutes * 60);	//	retry after $minutes in seconds.
try {
$rateLimiter->limitRequestsInMinutes($limit, $minutes);
} catch (RateExceededException $e) {
die ('{"success":false,"message":"Rate Limit exceeded, check back in 5 minutes."}');
}

include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
header("Content-Type: application/json");
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :roblosec");
$usrquery->execute(['roblosec' => $roblosec]);
$usr = $usrquery->fetch();
$uID = $usr['id'];
if(!is_array($usr)){
header("Location: https://www.voidrev.us/newlogin/");
}
$assetId = (int)$_POST['assetID'];
$checkquery = $con->prepare("SELECT id FROM `games` WHERE `id`= :id");
$checkquery->execute(['id' => $assetId]);
$check = $checkquery->fetch();
$favequery = $con->prepare("SELECT * FROM `faves` WHERE `assetId` = :assetID AND `userID` = :userID");
$favequery->execute(['assetID' => $assetId, 'userID' => $uID]);
$fave = $favequery->fetch();
if(is_array($check)){
if(!is_array($fave)){
$sql = "INSERT INTO `faves` (`assetID`, `userID`) VALUES ('$assetId', '$uID')";
$con->exec($sql);
echo '{"success":true, "message":"Successfully favorited."}';
exit();
}else{
$sql = "DELETE FROM `faves` WHERE `assetID` = '$assetId' AND `userID` = '$uID'";
$con->exec($sql);
echo '{"success":true, "message":"Successfully removed favorite."}';
exit();
}
}
echo '{"success":false,"message":"uh oh"}';
exit();
?>