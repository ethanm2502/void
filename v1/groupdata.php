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
$url = $_SERVER['REQUEST_URI'];
if (strpos($url, "membership") !== false) {
$testurl = str_replace("/v1/groups/","",$url);
$testurl = str_replace("/membership","",$testurl);
$assetId = (int)$testurl;
$groupquery = $con->prepare("SELECT * FROM `groups` WHERE `id` = :assetId");
$groupquery->execute(['assetId' => $assetId]);
$group = $groupquery->fetch();
$array = array(
"groupId" => $assetId,
"isPrimary" => false,
"isPendingJoin" => false,
"userRole" => array(
"user" => array(
"hasVerifiedBadge" => false,
"userId" => $usr['id'],
"username" => $usr['username'],
"displayName" => $usr['username']
),
"role" => array(
"id" => 1,
"name" => "Guest",
"rank" => 0,
"memberCount" => 0
)
),
"maxGroups" => 100,
"permissions" => array(
"groupPostsPermissions" => array(
"viewWall" => false,
"postToWall" => false,
"deleteFromWall" => false,
"viewStatus" => false,
"postToStatus" => false
),
"groupMembershipPermissions" => array(
"changeRank" => false,
"inviteMembers" => false,
"removeMembers" => false
),
"groupManagementPermissions" => array(
"manageRelationships" => false,
"manageClan" => false,
"viewAuditLogs" => false
),
"groupEconomyPermissions" => array(
"spendGroupFunds" => false,
"advertiseGroup" => false,
"createItems" => false,
"manageItems" => false,
"addGroupPlaces" => false,
"manageGroupGames" => false,
"viewGroupPayouts" => false
)
),
"areGroupGamesVisible" => true,
"areGroupFundsVisible" => false,
"areEnemiesAllowed" => false
);
echo json_encode($array);
}elseif(strpos($url, "metadata") !== false) {
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
$uID = $usr['id'];
$groupcountquery = $con->prepare("SELECT * FROM `groupmembers` WHERE `userid` = :userid");
$groupcountquery->execute(['userid' => $uID]);
$groupcount = $groupcountquery->rowCount();
?>
{"groupLimit":100,"currentGroupCount":<?=$groupcount;?>,"groupStatusMaxLength":255,"groupPostMaxLength":500,"areRefactorFeaturesEnabled":true,"isFunCaptchaEnabled":false}
<?php
}else{
$testurl = str_replace("/v1/groups/","",$url);
$assetId = (int)$testurl;
$groupquery = $con->prepare("SELECT * FROM `groups` WHERE `id` = :assetId");
$groupquery->execute(['assetId' => $assetId]);
$group = $groupquery->fetch();
$groupcountquery = $con->prepare("SELECT * FROM `groupmembers` WHERE `groupid` = :groupid");
$groupcountquery->execute(['groupid' => $assetId]);
$groupcount = $groupcountquery->rowCount();
$cuserquery = $con->prepare("SELECT username,membership FROM `users` WHERE `id` = :id");
$cuserquery->bindValue(':id', $group['creatorid'], PDO::PARAM_INT);
$cuserquery->execute();
$cuser = $cuserquery->fetch();
$creatorname = $cuser['username'];
$data = array(
"id" => $assetId,
"name" => $group['name'],
"description" => $group['description'],
"owner" => array(
"userId" => $group['creatorid'],
"username" => $creatorname,
"buildersClubMembershipType" => $cuser['membership']
),
"shout" => "test",
"memberCount" => $groupcount,
"isBuildersClubOnly" => false,
"hasClan" => false,
"publicEntryAllowed" => true
);
$json = json_encode($data);
echo $json;
exit();
}