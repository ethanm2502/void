<?php
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
error_reporting(E_ERROR);
if(!empty($_GET['userId']))
{
$userId = (int)$_GET['userId'];
$badgeId = (int)$_GET['badgeId'];
$placeId = (int)$_GET['userId'];
$existbadgequery = $con->prepare("SELECT * FROM `library` WHERE `id` = :id");
$existbadgequery->execute(['id' => $badgeId]);
$existbadge = $existbadgequery->fetch();
if(!is_array($existbadge)){
// why rate limit a crucial api...
$jsonData = json_decode(file_get_contents('https://economy.roblox.com/v2/assets/'.$badgeId.'/details'));
$badgename = $jsonData->Name;
$badgecreator = $jsonData->Creator->Name;
}else{
$badgename = $existbadge['name'];
$badgecreator = $existbadge['creatorname'];
}
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
$usrquery->execute(['id' => $userId]);
$usr = $usrquery->fetch();
$username = $usr['username'];
$badgequery = $con->prepare("SELECT * FROM `ownedbadges` WHERE `userId` = :userId AND `badgeId` = :badgeId");
$badgequery->execute(['userId' => $userId, 'badgeId' => $badgeId]);
$badge = $badgequery->fetch();
if(!is_array($badge)){
$sql = "INSERT INTO `ownedbadges` (`userId`, `badgeId`) VALUES (:userId, :badgeId)";
$stmt = $con->prepare($sql);
$stmt->bindValue(':userId', $userId, PDO::PARAM_INT);
$stmt->bindValue(':badgeId', $badgeId, PDO::PARAM_INT);
$stmt->execute();
}
echo "$username won $badgecreator's '$badgename' award!";
}