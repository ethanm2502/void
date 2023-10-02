<?php
require($_SERVER['DOCUMENT_ROOT']."/config/includes.php");
$usr = getUserData($con);
$userId = $usr['id'];
header('Content-Type: application/json; charset=UTF-8; X-Robots-Tag: noindex');
$json = json_decode(file_get_contents("php://input"),true);
$conversationId = $json['conversationId'];
$isTyping = $json['isTyping'];

$chatquery = $con->prepare("SELECT * FROM `chats` WHERE `id` = :id");
$chatquery->execute(['id' => $conversationId]);
$chat = $chatquery->fetch();

$toid = $chat['toid'];

if($isTyping){
if($toid != $userId){
$timequery = $con->prepare('UPDATE `chats` SET `totyping`=1 WHERE id = :conversationId');
$timequery->execute([
':conversationId' => $conversationId
]);
}else{
$timequery = $con->prepare('UPDATE `chats` SET `fromtyping`=1 WHERE id = :conversationId');
$timequery->execute([
':conversationId' => $conversationId
]);
}
}else{
$timequery = $con->prepare('UPDATE `chats` SET `totyping`=0 WHERE id = :conversationId');
$timequery->execute([
':conversationId' => $conversationId
]);
$timequery = $con->prepare('UPDATE `chats` SET `fromtyping`=0 WHERE id = :conversationId');
$timequery->execute([
':conversationId' => $conversationId
]);    
}
?>
{
  "resultType": "Success",
  "statusMessage": null
}