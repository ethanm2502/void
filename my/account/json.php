<?php
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
header('Content-Type: application/json; charset=UTF-8; X-Robots-Tag: noindex');
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
$uID = $usr['id'];
$username = $usr['username'];
$robux = $usr['Robux'];
$MembType = $usr['membership'];
if($MembType == "None"){$MembValue = 0;}elseif($MembType == "BuildersClub"){$MembValue = 1;}elseif($MembType == "TurboBuildersClub"){$MembValue = 2;}elseif($MembType == "OutrageousBuildersClub"){$MembValue = 3;}
?>
{"UserId":<?=$uID;?>,"Username":"<?=$username;?>","DisplayName":"<?=$username;?>","HasPasswordSet":true,"Email":null,"AgeBracket":0,"Roles":[],"MembershipType":<?=$MembValue;?>,"RobuxBalance":<?=$robux;?>,"NotificationCount":0,"EmailNotificationEnabled":false,"PasswordNotificationEnabled":false}
