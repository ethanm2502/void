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
$userId = $usr['id'];
$url = $_SERVER['REQUEST_URI'];
if (strpos($url, "permissions") !== false) {
$testurl = str_replace("/v1/universes/","",$url);
$testurl = str_replace("/permissions","",$testurl);
$assetId = (int)$testurl;
$canquery = $con->prepare("SELECT id,creatorid FROM `games` WHERE `id` = :assetId");
$canquery->execute(['assetId' => $assetId]);
$canman = $canquery->fetch();
$assetCreatorId = $canman['creatorid'];
if($assetCreatorId == $userId || $userId == 1 || $userId == 2) {
$data = array(
"canManage" => true,
"canCloudEdit" => true
);
$json = json_encode($data);
echo $json;
}else{
$data = array(
"canManage" => false,
"canCloudEdit" => false
);
$json = json_encode($data);
echo $json;
}
exit();
}elseif(strpos($url, "badges") !== false){
$testurl = str_replace("/v1/universes/","",$url);
$testurl = strstr($testurl, 'badges', true) . 'badges';
$placeId = (int)$testurl;
$stmt = $con->prepare("SELECT * FROM `library` WHERE `IsForGameId` = '$placeId' AND `type2` = 'Badge' AND `offsale` = '0'");
$stmt->execute();
$data = array();
foreach ($stmt->fetchAll() as $row) {
$id = $row['id'];
$gamestatement = $con->prepare("SELECT id,name,description,visits FROM `games` WHERE `id` = '$placeId'");
$gamestatement->execute();
$game = $gamestatement->fetch();
$visits = $game['visits'];
$badgecountquery = $con->prepare("SELECT * FROM `ownedbadges` WHERE `badgeId` = '$id'");
$badgecountquery->execute();
$wonever = $badgecountquery->rowCount();
$yesbadgecountquery = $con->prepare("SELECT * FROM `ownedbadges` WHERE `badgeId` = '$id' AND DATE(`timestamp`) = DATE(NOW() - INTERVAL 1 DAY);");
$yesbadgecountquery->execute();
$yeswon = $yesbadgecountquery->rowCount();
if ($yeswon !== 0) {
$rarityPercentage = ($wonever / $yeswon) * 100;
}else{
$rarityPercentage = 0;
}
$rarityPercentage = round($rarityPercentage, 2);
$fileid = $row['fileid'];
$name = $row['name'];
$description = $row['description'];
if($row['offsale'] == 0){
$enabled = true;
}else{
$enabled = false;
}
$created = $row['created'];
$updated = $row['updated'];
$statistics = array(
"pastDayAwardedCount" => $yeswon,
"awardedCount" => $wonever,
"winRatePercentage" => $rarityPercentage
);
$awardingUniverse = array(
"id" => (int) $placeId,
"name" => $game['name'],
"rootPlaceId" => $placeId,
);
$item = array(
"id" => (int) $id,
"name" => $name,
"description" => $description,
"enabled" => $enabled,
"iconImageId" => (int) $fileid,
"created" => $created,
"updated" => $updated,
"statistics" => $statistics,
"awardingUniverse" => $awardingUniverse
);
$data[] = $item;
}
$result = array(
"previousPageCursor" => null,
"nextPageCursor" => null,
"data" => $data
);
die(json_encode($result));
}elseif(strpos($url, "configuration") !== false){
$testurl = str_replace("/v1/universes/","",$url);
$testurl = str_replace("/configuration","",$testurl);
$placeId = (int)$testurl;
$gamestatement = $con->prepare("SELECT id,name,description,visits,AvatarType,active FROM `games` WHERE `id` = '$placeId'");
$gamestatement->execute();
$game = $gamestatement->fetch();
if($game['active'] == 1){
$public = "Public";
}else{
$public = "Private";
}
?>
{"allowPrivateServers":false,"privateServerPrice":null,"id":<?=$game['id'];?>,"name":"<?php echo strip_tags($game['name']);?>","universeAvatarType":"<?php echo $game['AvatarType'];?>","universeScaleType":"AllScales","universeAnimationType":"Standard","universeCollisionType":"OuterBox","universeBodyType":"Standard","universeJointPositioningType":"ArtistIntent","isArchived":false,"isFriendsOnly":false,"genre":"All","playableDevices":["Computer","Phone","Tablet"],"isForSale":false,"price":0,"isStudioAccessToApisAllowed":true,"privacyType":"<?=$public;?>"}
<?
}elseif(strpos($url, "places") !== false){
$testurl = str_replace("/v1/universes/","",$url);
$testurl = str_replace("/places","",$testurl);
$placeId = (int)$testurl;
$gamestatement = $con->prepare("SELECT id,name,description,visits,AvatarType,active FROM `games` WHERE `id` = '$placeId'");
$gamestatement->execute();
$game = $gamestatement->fetch();
if($game['active'] == 1){
$public = "Public";
}else{
$public = "Private";
}
?>
{"previousPageCursor":null,"nextPageCursor":null,"data":[{"id":<?=$placeId;?>,"universeId":<?=$placeId;?>,"name":"<?php echo strip_tags($game['name']);?>","description":"<?php echo strip_tags($game['description']);?>"}]}
<?
}else{
$testurl = str_replace("/v1/universes/","",$url);
$assetId = (int)$testurl;
$libquery = $con->prepare("SELECT id,name,description,creatorid,active FROM `games` WHERE `id` = :assetId");
$libquery->execute(['assetId' => $assetId]);
$libfinal = $libquery->fetch();
$name = $libfinal['name'];
$description = $libfinal['description'];
$creatorid = $libfinal['creatorid'];
$crequery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
$crequery->execute(['id' => $creatorid]);
$cre = $crequery->fetch();
$creatorname = $cre['username'];
if(!is_array($libfinal)){
$name = "N/A";
$description = "N/A";
$creatorid = 1;
$creatorname = "ripguests";
}
if($libfinal['active'] == 1){
$isActive = true;
$Active = "Public";
}else{
$isActive = false;
$Active = "Private";
}
$json = json_encode(array(
"id" => $assetId,
"name" => strip_tags($name),
"description" => strip_tags($description),
"isArchived" => false,
"rootPlaceId" => $assetId,
"isActive" => $isActive,
"privacyType" => $Active,
"creatorType" => "User",
"creatorTargetId" => $creatorid,
"creatorName" => strip_tags($creatorname),
"created" => "2013-10-31T19:25:17.82Z",
"updated" => "2019-04-03T00:03:38.88Z"
));
echo $json;
}