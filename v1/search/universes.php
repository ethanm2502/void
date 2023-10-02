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
if(empty($_GET['cursor'])){
$cursor = null;
$nextcursor = $limit."_"."1"."_".md5(random_bytes(16));
}else{
$cursor = $_GET['cursor'];
$nextcursor = $limit."_"."1"."_".md5(random_bytes(16));
}
$gamequery = $con->prepare("SELECT id,name,description,creatorid,active,created,updated FROM `games` WHERE `creatorid` = :creatorid ORDER BY updated DESC LIMIT $limit");
$gamequery->execute(['creatorid' => $uID]);
$countgamequery = $con->prepare("SELECT id,name,description,creatorid,active,created,updated FROM `games` WHERE `creatorid` = :creatorid ORDER BY updated DESC LIMIT $limit");
$countgamequery->execute(['creatorid' => $uID]);
$countgames = $countgamequery->rowCount();
header('Content-Type: application/json; charset=UTF-8; X-Robots-Tag: noindex');
$data = [];
while ($games = $gamequery->fetch()) {
if ($games['active'] == 1) {
$isActive = true;
$Active = "Public";
} else {
$isActive = false;
$Active = "Private";
}
$gameData = [
"id" => $games['id'],
"name" => $games['name'],
"description" => $games['description'],
"isArchived" => false,
"rootPlaceId" => $games['id'],
"isActive" => $isActive,
"privacyType" => $isActive,
"creatorType" => "User",
"creatorTargetId" => $games['creatorid'],
"creatorName" => $username,
"created" => date('Y-m-d\TH:i:s.u\Z', $games['created']),
"updated" => date('Y-m-d\TH:i:s.u\Z', $games['updated']),
];
$data[] = $gameData;
}
$jsonData = [
"previousPageCursor" => $cursor,
"nextPageCursor" => $nextcursor,
"data" => $data,
];
echo json_encode($jsonData);
?>
