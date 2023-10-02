<?php
header('Content-Type: application/json; charset=utf-8');
include ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
include ($_SERVER['DOCUMENT_ROOT'].'/config/main.php');
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
if($usr['banned'] != 0){
echo json_encode(array('success' => false));
die(http_response_code(403));
}
$uID = $usr['id'];
$username = $usr['username'];
$url = $_SERVER['REQUEST_URI'];
$testurl = preg_replace('/[^0-9,.]+/', ',', $url);
$testurl = substr($testurl, 1);
$json = explode(",", $testurl);
$userId = (int)$json[0];
$assetId = (int)$json[1];
$canquery = $con->prepare("SELECT id,creatorid,teamcreate FROM `games` WHERE `id` = :assetId");
$canquery->execute(['assetId' => $assetId]);
$canman = $canquery->fetch();
$assetCreatorId = $canman['creatorid'];
if (strpos($url,'canmanage') !== false) {
if($assetCreatorId == $userId || $userId == 1 || $userId == 2) {
echo '{"Success":true,"CanManage":true}';
}else{
echo '{"Success":true,"CanManage":false}';
}
$pattern = "@campaign/([^/\?]+)@";
preg_match($pattern, $url, $matches);
}else{
if (strpos($url,'cloudeditenabled') !== false) {
$placeId = str_replace("/universes/","",$url);
$placeId = str_replace("/cloudeditenabled","",$placeId);
$placeId = (int)$placeId;
$teamquery = $con->prepare("SELECT id,creatorid,teamcreate FROM `games` WHERE `id` = :assetId");
$teamquery->execute(['assetId' => $placeId]);
$teams = $teamquery->fetch();
if($teams['teamcreate'] == 1){
$teamcreate = "true";
}else{
$teamcreate = "false";
}
echo'{"enabled":'.$teamcreate.'}';
exit();
}
if (strpos($url,'enablecloudedit') !== false) {
try{
$placeId = str_replace("/universes/","",$url);
$placeId = str_replace("/enablecloudedit","",$placeId);
$placeId = (int)$placeId;
$teamquery = $con->prepare("SELECT id,creatorid,teamcreate FROM `games` WHERE `id` = :assetId");
$teamquery->execute(['assetId' => $placeId]);
$teams = $teamquery->fetch();
if(!is_array($teams)){
http_response_code(403);
exit();
}
//$teamupdate = $con->prepare("UPDATE `games` SET `teamcreate` = '1' WHERE `id`= :id");
//$teamupdate->execute(['id' => $placeId]);
echo"{}";
}catch(Throwable $e){
http_response_code(403);
exit();
}
exit();
}
if (strpos($url,'account-info') !== false) {
header("Content-Type: application/json");
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
if(!is_array($usr)){
http_response_code(403);
exit();
}
$uID = $usr['id'];
$username = $usr['username'];
$robux = $usr['Robux'];
$MembType = $usr['membership'];
if($usr['displayname'] == NULL){
$displayname = $username;
}else{
$displayname = $usr['displayname'];
}
if(!empty($usr['Roles'])){
$Roles = json_encode(explode(",",$usr['Roles']));
}else{
$Roles = "[]";
}
if($MembType == "None"){$MembValue = 0;}elseif($MembType == "BuildersClub"){$MembValue = 1;}elseif($MembType == "TurboBuildersClub"){$MembValue = 2;}elseif($MembType == "OutrageousBuildersClub"){$MembValue = 3;}elseif($MembType == "Premium"){$MembValue = 4;}
?>
{"UserId":<?=$uID;?>,"Username":"<?echo NoXSSPlz($username);?>","DisplayName":"<?echo NoXSSPlz($displayname);?>","HasPasswordSet":true,"Email":null,"AgeBracket":0,"Roles":<?=$Roles;?>,"MembershipType":<?=$MembValue;?>,"RobuxBalance":<?=$robux;?>,"NotificationCount":0,"EmailNotificationEnabled":false,"PasswordNotificationEnabled":false}
<?php
exit();
}
if (strpos($url, '/users/') !== false && strpos($url, '/friends') !== false) {
$urlParts = explode('/', $url);
$userId = (int) $urlParts[count($urlParts) - 2]; // Get the user ID from the URL
$headers = getallheaders();
if (strpos($headers['User-Agent'], "Android") !== false || strpos($headers['User-Agent'], "iPhone") !== false) {
header("Location: https://www.voidrev.us/users/friends");
exit();
}
$friendDataArray = [];
$isFriendQuery = $con->prepare("
SELECT f.*, u.*
FROM `friends` AS f
JOIN `users` AS u ON (f.fromid = u.id OR f.toid = u.id) AND u.id != :uID
WHERE f.`status` = '2' AND (f.toid = :toid OR f.fromid = :fromid)
ORDER BY u.onlinetime DESC
");
$isFriendQuery->execute(['uID' => $userId, 'toid' => $userId, 'fromid' => $userId]);
$friendAmountQuery = $con->prepare("SELECT count(*) FROM `friends` WHERE `status`='2' AND (`toid` = :toid OR `fromid` = :fromid AND `status`='2')");
$friendAmountQuery->execute(['toid' => $userId, 'fromid' => $userId]);
$origAmount = $friendAmountQuery->fetchColumn();
$amount = 0;
while ($friends = $isFriendQuery->fetch()) {
$amount = $amount + 1;
$friendId = ($friends['fromid'] == $userId) ? $friends['toid'] : $friends['fromid'];
$friendQuery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
$friendQuery->execute(['id' => $friendId]);
$friendData = $friendQuery->fetch();
$timeFromDatabase = $friendData['onlinetime'];
$timeDifference = time() - $timeFromDatabase;
$onlineStatus = ($timeDifference < 120) ? true : false;
$friendDataArray[] = [
"Id" => $friendId,
"Username" => $friendData['username'],
"AvatarUri" => "https://www.voidrev.us" . getUserHeadshotThumbnail($con, $friendId),
"AvatarFinal" => true,
"IsOnline" => $onlineStatus
];
if ($amount >= $origAmount) {
break;
}
}
header("Content-Type: application/json");
echo json_encode($friendDataArray, JSON_PRETTY_PRINT);
exit();
}
if (strpos($url,'profile') !== false) {
$testurl = preg_replace('#[^0-9-./]#', '', $url);
$testurl = substr($testurl, 2);
preg_match_all('#/([^/]*)#', $testurl, $matches);
$getid = (int)$testurl;
header("Content-Type: text/html");
require ($_SERVER['DOCUMENT_ROOT'].'/users/profile/index.php');
}else{
if(strpos($url,'universe-containing') !== false){
if(isset($_GET['placeid'])) {
$gameid = (int)($_GET["placeid"]);
header('Content-Type: application/json; charset=utf-8');
$data = array('UniverseId' => $gameid);
echo json_encode($data);
}
if(isset($_GET['placeId'])) {
$gameid = (int)($_GET["placeId"]);
header('Content-Type: application/json; charset=utf-8');
$data = array('UniverseId' => $gameid);
echo json_encode($data);
}
}else{
if (strpos($url,'validate') !== false) {
$assetId = (int)$_GET['destinationPlaceId'];
$existquery = $con->prepare("SELECT id,banned FROM `games` WHERE `id` = :assetId");
$existquery->execute(['assetId' => $assetId]);
$exist = $existquery->fetch();
if(is_array($exist)){
if($exist['banned'] > 0){
echo "false";
exit();
}
echo"true";
exit();
}else{
echo"false";
exit();
}
}else{
if (strpos($url,'game-start-info') !== false) {
$universeId = (int)$_GET['universeId'];
$gamequery = $con->prepare("SELECT id,AvatarType FROM `games` WHERE `id` = :id");
$gamequery->execute(['id' => $universeId]);
$game = $gamequery->fetch();
$AvatarType = $game['AvatarType'];
echo'{"gameAvatarType":"'.$AvatarType.'","allowCustomAnimations":"True","universeAvatarCollisionType":"OuterBox","universeAvatarBodyType":"Standard","jointPositioningType":"ArtistIntent","message":"","universeAvatarMinScales":{"height":0.90,"width":0.70,"head":0.95,"depth":0.0,"proportion":0.00,"bodyType":0.00},"universeAvatarMaxScales":{"height":1.05,"width":1.00,"head":1.00,"depth":0.0,"proportion":0.00,"bodyType":0.00},"universeAvatarAssetOverrides":[],"moderationStatus":null}';
}else{
if (strpos($url,'get-aliases') !== false) {
?>
{
"FinalPage": true,
"Aliases": [],
"PageSize": 50
}
<?
}else{
if (strpos($url,'get-universe-places') !== false) {
$gameid = $_GET['universeId'];
$existquery = $con->prepare("SELECT id,name FROM `games` WHERE `id` = :assetId");
$existquery->execute(['assetId' => $gameid]);
$exist = $existquery->fetch();
$gamename = $exist['name'];
$data = array(
"FinalPage" => true,
"RootPlace" => $gameid,
"Places" => array(
array(
"PlaceId" => $gameid,
"Name" => NoXSSPlz($gamename)
)
),
"PageSize" => 50
);
$json = json_encode($data);
echo $json;
}else{
$cleanedUrl = preg_replace('#[^0-9-./]#', '', $url);
$userId = (int)substr($cleanedUrl, 2);
$userquery = $con->prepare("SELECT id,username FROM `users` WHERE `id` = :userId");
$userquery->execute(['userId' => $userId]);
$userprof = $userquery->fetch();
$profileusername = $userprof['username'];
echo json_encode(['Id' => $userId, 'Username' => $profileusername]);
}
}
}
}
}
}
}
?>