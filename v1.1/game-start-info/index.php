<?php
require ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
header("Content-Type: application/json; charset=utf-8");
$universeId = (int)$_GET['universeId'];
$gamequery = $con->prepare("SELECT id,AvatarType FROM `games` WHERE `id` = :id");
$gamequery->execute(['id' => $universeId]);
$game = $gamequery->fetch();
$AvatarType = $game['AvatarType'];
?>
{"gameAvatarType":"<?=$AvatarType;?>","allowCustomAnimations":"True","universeAvatarCollisionType":"OuterBox","universeAvatarBodyType":"Standard","jointPositioningType":"ArtistIntent","message":"","universeAvatarMinScales":{"height":0.90,"width":0.70,"head":0.95,"depth":0.0,"proportion":0.00,"bodyType":0.00},"universeAvatarMaxScales":{"height":1.05,"width":1.00,"head":1.00,"depth":0.0,"proportion":0.00,"bodyType":0.00},"universeAvatarAssetOverrides":[],"moderationStatus":null}