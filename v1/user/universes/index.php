<?php
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
$username = $usr['username'];
$limit = (int)$_GET['limit'];
$cursor = filter_var($_GET['cursor'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);


$gamequery = $con->prepare("SELECT id,name,description,creatorid FROM `games` WHERE `creatorid` = :creatorid ORDER BY updated DESC LIMIT $limit");
$gamequery->execute(['creatorid' => $uID]);

$countgamequery = $con->prepare("SELECT id,name,description,creatorid FROM `games` WHERE `creatorid` = :creatorid ORDER BY updated DESC LIMIT $limit");
$countgamequery->execute(['creatorid' => $uID]);
$countgames = $countgamequery->rowCount();
$count = 0;
header('Content-Type: application/json; charset=UTF-8; X-Robots-Tag: noindex');
?>
{"previousPageCursor":null,"nextPageCursor":"<?php echo NoXSSPlz($cursor);?>","data":[<?php while($games = $gamequery->fetch()) { $count = $count + 1;?>{"id":<?=$games['id'];?>,"name":"<?php echo NoXSSPlz($games['name']);?>","description":"<?php echo trim(preg_replace('/\s+/', ' ', $games['description']));?>","isArchived":false,"rootPlaceId":<?=$games['id'];?>,"isActive":true,"privacyType":"Public","creatorType":"User","creatorTargetId":<?=$games['creatorid'];?>,"creatorName":"<?php echo NoXSSPlz($username);?>","created":"2022-08-18T09:18:15.47Z","updated":"2022-08-18T09:18:19.43Z"}<?php if($count != $countgames){echo",";}}?>]}