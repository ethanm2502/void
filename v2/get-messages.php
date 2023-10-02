<?php
include($_SERVER['DOCUMENT_ROOT']."/config/includes.php");
header('Content-Type: application/json; charset=UTF-8; X-Robots-Tag: noindex');
$usr = getUserData($con);
if($usr['banned'] != 0){
echo json_encode(array('success' => false));
die(http_response_code(403));
}
$userid = $usr['id'];
$conversationId = (int)$_GET['conversationId'];
$pageSize = (int)$_GET['pageSize'];
$exclusiveStartMessageId = (int)$_GET['exclusiveStartMessageId'];
$start = $exclusiveStartMessageId;
$end = $exclusiveStartMessageId + $pageSize;
$chatsquery = $con->prepare("SELECT * FROM `chatdata` WHERE `conversationid` = :id ORDER BY time DESC LIMIT $start,$end");
$chatsquery->execute(['id' => $conversationId]);
$chats = $chatsquery->fetchAll();
$data = [];
foreach ($chats as $chat) {
$chatid = $chat['id'];
$chatauthquery = $con->prepare("SELECT * FROM `chats` WHERE `id` = :id");
$chatauthquery->execute(['id' => $conversationId]);
$chatauth = $chatauthquery->fetch();
$toid = $chatauth['toid'];
$fromid2 = $chatauth['fromid'];
$sent = date("Y-m-d\TH:i:s\Z", $item['time']);
if($chat['readmes'] == 0){
$read = false;
}else{
$read = true;
}
$fromid = $chat['fromid'];
$content = $chat['text'];
$messageType = "PlainText";
if ($toid == $userid || $fromid2 == $userid) {
$data[] =
[
"id" => $chatid,
"senderType" => "User",
"sent" => $sent,
"read" => $read,
"messageType" => $messageType,
"decorators" => [
""
],
"senderTargetId" => $fromid,
"content" => $content
];
}
}
echo json_encode($data);
