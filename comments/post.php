<?php
include($_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php');
use Snipe\BanBuilder\CensorWords;
$censor = new CensorWords;
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
$limit = 2; //	number of connections to limit user to per $minutes
$minutes = 5; //	number of $minutes to check for.
$seconds = floor($minutes * 60);	//	retry after $minutes in seconds.
try {
$rateLimiter->limitRequestsInMinutes($limit, $minutes);
} catch (RateExceededException $e) {
header("HTTP/1.1 429 Too Many Requests");
header(sprintf("Retry-After: %d", $seconds));
die ("429");
}
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$logged = false;
if($_COOKIE['username'] && $_COOKIE['password']){
$username = filter_var($_COOKIE['username'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `username` = :username AND `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['username' => $username, 'password' => $password, 'ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
if($usr != 0){
$logged = true;
}
}
$timey = time();
if(isset($_POST['text'])){
if(isset($_POST['assetId'])){
$posttext = urldecode(filter_var($_POST['text'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES));
$posttext = $censor->censorString($posttext)['clean'];
$assetId = (int)$_POST['assetId'];
$uID = $usr['id'];
/*
Roblox 2022 JSON Response:
{"Id":1887283402,"PostedDate":"Sep 6, 2022 | 3:26 PM","AuthorName":"ripguests","AuthorId":119052745,"Text":"hey peeta","ShowAuthorOwnsAsset":false,"AuthorThumbnail":{"AssetId":0,"AssetHash":null,"AssetTypeId":0,"Url":"https://tr.rbxcdn.com/a80796492288b163d29c86685bda795a/100/100/Avatar/Png","IsFinal":true},"HasVerifiedBadge":false}
*/
if($logged == false){
$data = array();
header('Content-type: application/json');
echo json_encode($data);
}
$sql = $con->prepare("INSERT INTO `comments` (`assetId`, `text`, `playerId`) VALUES (:assetId, :posttext, :uID)");
$sql->execute(['assetId' => $assetId, 'posttext' => $posttext, 'uID' => $uID]);
$comquery = $con->prepare("SELECT * FROM `comments` WHERE `assetId` = :assetId AND `playerId` = :playerId AND `text` = :text");
$comquery->execute(['assetId' => $assetId, 'playerId' => $uID, 'text' => $posttext]);
$comment = $comquery ->fetch();
header('Content-type: application/json');
if(is_array($comment)){
?>
{"Id":<?=$comment['commentId'];?>,"PostedDate":"<?echo htmlspecialchars($comment['timestamp']);?>","AuthorName":"<?echo htmlspecialchars($usr['username']);?>","AuthorId":<?=$uID;?>,"Text":"<?echo htmlspecialchars($comment['text']);?>","ShowAuthorOwnsAsset":false,"AuthorThumbnail":{"AssetId":0,"AssetHash":null,"AssetTypeId":0,"Url":"https://www.voidrev.us/headshot-thumbnails?userId=<?=$uID;?>","IsFinal":true},"HasVerifiedBadge":<?php if($usr['Admin'] == 1){echo"true";}else{echo"false";}?>}
<?php
}else{
$data = array();
header('Content-type: application/json');
echo json_encode($data);
}
}else{
$data = array();
header('Content-type: application/json');
echo json_encode($data);
}
}else{
$data = array();
header('Content-type: application/json');
echo json_encode($data);
} ?>