<?php
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
error_reporting(E_ERROR);
if(!empty($_GET['UserId']))
{
    $userId = (int)$_GET['UserId'];
    $badgeId = (int)$_GET['BadgeId'];
    $badgequery = $con->prepare("SELECT * FROM `ownedbadges` WHERE `userId` = :userId AND `badgeId` = :badgeId");
    $badgequery->execute(['userId' => $userId, 'badgeId' => $badgeId]);
    $badge = $badgequery->fetch();
    if(!is_array($badge)){
    echo "0";
    }else{
    echo "1";
    }
}