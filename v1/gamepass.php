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
if($usr['banned'] != 0){
echo json_encode(array('success' => false));
die(http_response_code(403));
}
$userId = $usr['id'];
$uID = $usr['id'];
$url = $_SERVER['REQUEST_URI'];
if (strpos($url, "gamepass") !== false) {
$testurl = str_replace("/v1/users/","",$url);
$testurl = str_replace("/items/gamepass","",$testurl);
$testurl = explode("/",$testurl);
$userId = $testurl[0];
$assetId = $testurl[1];
$gamepassquery = $con->prepare("SELECT * FROM `gameowneditems` WHERE `userId` = :userId AND `assetId` = :assetId");
$gamepassquery->execute(['userId' => $userId, 'assetId' => $assetId]);
$gamepass = $gamepassquery->fetchAll(PDO::FETCH_ASSOC);
$data = array(
"previousPageCursor" => null,
"nextPageCursor" => null,
"data" => array()
);
foreach ($gamepass as $row) {
$libquery = $con->prepare("SELECT * FROM `library` WHERE `id` = :id");
$libquery->execute(['id' => $assetId]);
$lib = $libquery->fetch();
$data["data"][] = array(
"type" => "GamePass",
"id" => $lib["id"],
"name" => $lib["name"],
"instanceId" => null
);
}
$json = json_encode($data);
echo $json;
exit();
}
if (strpos($url, "authenticated") !== false) {
echo'{"id":'.$userId.',"name":"'.$usr['username'].'","displayName":"'.$usr['username'].'"}';
exit();
}
if (strpos($url, "currency") !== false) {
echo'{"robux":'.$usr['Robux'].'}';
exit();
}
if (strpos($url, "roles") !== false) {
header("Content-Type: application/json; charset=utf-8");
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$testurl = str_replace("/v1/users/","",$url);
$testurl = str_replace("/groups/roles","",$testurl);
$assetId = (int)$testurl;
$groupquery = $con->prepare("SELECT * FROM `groups` WHERE `id` = :groupid");
$groupquery->execute(['groupid' => $assetId]);
$group = $groupquery->fetchAll();
$jsonArray = [
"data" => []
];
foreach ($group as $row) {
$groupownerquery = $con->prepare("SELECT id,username,Admin,displayname FROM `users` WHERE `id` = :id");
$groupownerquery->execute(['id' => $userId]);
$groupowner = $groupownerquery->fetch();
$ownerid = $groupowner['id'];
$ownername = $groupowner['username'];
if($groupowner['displayname'] == NULL){
$ownerdisplayname = $ownername;
}else{
$ownerdisplayname = $groupowner['displayname'];
}
if($groupowner['Admin'] == 1){
$ownerverified = true;
}else{
$ownerverified = false;
}
$userrankquery = $con->prepare("SELECT * FROM `groupmembers` WHERE `userid` = :id AND `groupid` = :groupid");
$userrankquery->execute(['id' => $userId, 'groupid' => $assetId]);
$userrank = $userrankquery->fetch();
$rolerank = $userrank['rank'];
$rolequery = $con->prepare("SELECT * FROM `grouproles` WHERE `groupid` = :groupid");
$rolequery->execute(['groupid' => $assetId]);
$role = $rolequery->fetch();
$roleid = $role['id'];
$rolename = $role['name'];
$jsonArray["data"][] = [
"group" => [
"id" => $row["id"],
"name" => $row["name"],
"description" => $row["description"],
"owner" => [
"hasVerifiedBadge" => $ownerverified,
"userId" => $ownerid,
"username" => $ownername,
"displayName" => $ownerdisplayname
],
"shout" => $row["shout"],
"memberCount" => $membercount,
"isBuildersClubOnly" => false,
"publicEntryAllowed" => $public,
"hasVerifiedBadge" => $verified
],
"role" => [
"id" => $roleid,
"name" => $rolename,
"rank" => $rolerank
]
];
}
// Convert the array to JSON
$jsonString = json_encode($jsonArray, JSON_PRETTY_PRINT);
// Output the JSON
echo $jsonString;
exit();
}
if (strpos($url, "status") !== false) {
echo'{
"IsFollowing": false,
"FollowingCountByType": 3,
"FollowingLimitByType": 5
}
';
}
if (strpos($url, "friends") !== false) {
$testurl = str_replace("/v1/users/","",$url);
$testurl = str_replace("/friends","",$testurl);
$userId = (int)$testurl;
$isfriendquery = $con->prepare("SELECT f.*, u.*
FROM `friends` AS f
JOIN `users` AS u ON (f.fromid = u.id OR f.toid = u.id) AND u.id != :uID
WHERE f.`status` = '2' AND (f.toid = :toid OR f.fromid = :fromid)
ORDER BY u.onlinetime DESC
");
$isfriendquery->execute(['uID' => $uID, 'toid' => $userId, 'fromid' => $userId]);
$fetchResult = $isfriendquery->fetchAll();
$data = [];
// Populate the array using fetched data
foreach ($fetchResult as $item) {
$friendid = ($item['fromid'] == $uID) ? $item['toid'] : $item['fromid'];
$isfriendquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
$isfriendquery->execute(['id' => $friendid]);
$item = $isfriendquery->fetch();
$dif = time() - $item['onlinetime'];
if ($dif < 120) {
$isOnline = true;
}else{
$isOnline = false;
}
if ($item['banned'] != 0){
$isBanned = true;
}else{
$isBanned = false;
}
$friendFrequentScore = 0;
$friendFrequentRank = 1;
if($item['admin'] == 1){
$VerifiedBadge = true;
}else{
$VerifiedBadge = false;
}
$created = "0001-01-01T06:00:00Z";
$data["data"][] = [
"isOnline" => $isOnline,
"isDeleted" => $isBanned,
"friendFrequentScore" => $friendFrequentScore,
"friendFrequentRank" => $friendFrequentRank,
"hasVerifiedBadge" => $VerifiedBadge,
"description" => $item["about"],
"created" => $created,
"isBanned" => $isBanned,
"externalAppDisplayName" => $item["username"],
"id" => $item["id"],
"name" => $item["username"],
"displayName" => $item["username"],
];
}
echo json_encode($data);
exit();
}
if (strpos($url, "avatar-headshot") !== false) {
if (strpos($_GET['userIds'], ',') !== false) {
// Method 1: ?userIds=1,2,3,4,5,6
$userIds = explode(',', $_GET['userIds']);
} else {
// Method 2: ?userIds=1&userIds=2&userIds=3
$queryString = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
$userIds = array();
$parameters = explode('&', $queryString);
foreach ($parameters as $parameter) {
list($key, $value) = explode('=', $parameter);
if ($key === 'userIds') {
$userIds[] = $value;
}
}
}
$newData = array();
foreach ($userIds as $userId) {
$userId = (int)$userId;
$hash = getUserHeadshotThumbnail($con,$userId);
$newData[] = array(
"targetId" => $userId,
"state" => "Completed",
"imageUrl" => "https://www.voidrev.us".$hash
);
}
$response = array(
"data" => $newData
);
echo json_encode($response, JSON_PRETTY_PRINT);
}
if (strpos($url, "avatar-3d") !== false) {
require($_SERVER['DOCUMENT_ROOT']."/avatar-thumbnail-3d/index.php");
}

if (strpos($url, "outfits") !== false) {
$json = [
    "filteredCount" => 0,
    "data" => [
        []
    ],
    "total" => 0
];
echo json_encode($json);
}
?>