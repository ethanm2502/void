<?php
include($_SERVER['DOCUMENT_ROOT']."/config/includes.php");
header('Content-Type: application/json; charset=UTF-8; X-Robots-Tag: noindex');
$jsonData = file_get_contents('php://input');
$data = json_decode($jsonData);
$toid = (int)$data->participantUserId;
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
$userId = $usr['id'];
if($usr['banned'] != 0){
echo json_encode(array('success' => false));
die(http_response_code(403));
}
$username = $usr['username'];
if($usr['Admin'] == 1){
$cadmin = true;
}else{
$cadmin = false;
}
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
$usrquery->execute(['id' => $toid]);
$tusr = $usrquery->fetch();
$tousername = $tusr['username'];
if($tusr['Admin'] == 1){
$tadmin = true;
}else{
$tadmin = false;
}
$chatquery = $con->prepare("SELECT * FROM `chats` WHERE `toid` = :toid AND `fromid` = :fromid");
$chatquery->execute(['toid' => $toid, 'fromid' => $userId]);
$existing = $chatquery->fetch();
if(!is_array($existing)){
$startquery = $con->prepare('INSERT INTO `chats`(`toid`, `fromid`, `time`) VALUES (:toid, :fromid, :time)');
$startquery->execute([
':toid' => $toid,
':fromid' => $usr['id'],
':time' => time()
]);
$newchat = $con->lastInsertId();
}else{
$newchat = $existing['id'];
}
$jsonArray = [
"conversation" => [
"id" => $newchat,
"title" => $tousername,
"initiator" => [
"type" => "User",
"targetId" => $userId,
"name" => $username,
"hasVerifiedBadge" => $cadmin
],
"hasUnreadMessages" => $hasunread,
"participants" => [
[
"type" => "User",
"targetId" => $userId,
"name" => $username,
"hasVerifiedBadge" => $cadmin
],
[
"type" => "User",
"targetId" => $toid,
"name" => $tousername,
"hasVerifiedBadge" => $tadmin
]
],
"conversationType" => "OneToOneConversation",
"conversationTitle" => [
"titleForViewer" => $tousername,
"isDefaultTitle" => true
],
"lastUpdated" => date('Y-m-d\TH:i:s.v\Z', time()),
"conversationUniverse" => null
],
"rejectedParticipants" => null,
"resultType" => "Success",
"statusMessage" => "Successfully started a new 1:1 conversation"
];
$jsonString = json_encode($jsonArray, JSON_PRETTY_PRINT);
echo $jsonString;
?>