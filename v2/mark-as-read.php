<?php
require($_SERVER['DOCUMENT_ROOT']."/config/includes.php");
$usr = getUserData($con);
$userId = $usr['id'];
header('Content-Type: application/json; charset=UTF-8; X-Robots-Tag: noindex');
$json = json_decode(file_get_contents("php://input"),true);
$conversationId = $json['conversationId'];
$endMessageId = $json['endMessageId'];
$chatquery = $con->prepare('UPDATE `chatdata` SET `readmes`=1 WHERE `conversationid` = :conversationId AND fromid != :userId');
$chatquery->execute([
':conversationId' => $conversationId,
':userId' => $userId
]);
?>
{
"resultType": "Success"
}
