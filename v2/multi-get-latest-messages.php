<?php
include($_SERVER['DOCUMENT_ROOT']."/config/includes.php");
header('Content-Type: application/json; charset=UTF-8; X-Robots-Tag: noindex');
$userdata = getUserData($con);
if($userdata['banned'] != 0){
echo json_encode(array('success' => false));
die(http_response_code(403));
}
$userId = $userdata['id'];
$conversationIds = $_GET['conversationIds'];
$pageSize = (int)$_GET['pageSize'];
$exclusiveStartMessageId = (int)$_GET['exclusiveStartMessageId'];
$start = $exclusiveStartMessageId;
$end = $exclusiveStartMessageId + $pageSize;
$data = [];
if (!is_array($conversationIds)) {
$conversationIds = [$conversationIds];
}
foreach ($conversationIds as $conversationId) {
$conversationId = (int)$conversationId;
$chatsquery = $con->prepare("SELECT * FROM `chatdata` WHERE `conversationid` = :id ORDER BY time DESC LIMIT $start,$end");
$chatsquery->execute(['id' => $conversationId]);
$chats = $chatsquery->fetchAll();
foreach ($chats as $chat) {
$chatid = $chat['conversationid'];

$chatauthquery = $con->prepare("SELECT * FROM `chats` WHERE `id` = :id");
$chatauthquery->execute(['id' => $conversationId]);
$chatauth = $chatauthquery->fetch();
$toid = $chatauth['toid'];
$fromid2 = $chatauth['fromid'];

$data[] = [
"conversationId" => $chatid,
"chatMessages" => []
];
$sent = date("Y-m-d\TH:i:s\Z", $chat['time']);
$read = ($chat['readmes'] == 0) ? false : true;
$content = $chat['text'];
$messageid = $chat['id'];
$fromid = $chat['fromid'];
$messageType = "PlainText";
if ($toid == $userId || $fromid2 == $userId) {
$data[0]["chatMessages"][] = [
"id" => $messageid,
"senderType" => "User",
"sent" => $sent,
"read" => $read,
"messageType" => $messageType,
"decorators" => [""],
"senderTargetId" => $fromid,
"content" => $content
];
};
}
}
echo json_encode($data);
?>
