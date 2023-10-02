<?php
require($_SERVER['DOCUMENT_ROOT']."/config/includes.php");
header("Content-Type: application/json");
$usr = getUserData($con);
$userId = $usr['id'];
if($usr['banned'] != 0){
echo json_encode(array('success' => false));
die(http_response_code(403));
}
$pageSize = isset($_GET['pageSize']) ? max(1, (int)$_GET['pageSize']) : 30; // Default to 30 if not provided
$pageNumber = isset($_GET['pageNumber']) ? max(1, (int)$_GET['pageNumber']) : 1; // Default to 1 if not provided
// Calculate the starting and ending indices for pagination
$start = ($pageNumber - 1) * $pageSize;
$end = $start + $pageSize;
$isfriendquery = $con->prepare("SELECT * FROM `chats` WHERE (`toid` = :toid OR `fromid` = :fromid) ORDER BY time DESC LIMIT :start, :end");
$isfriendquery->bindValue(':toid', $userId, PDO::PARAM_INT);
$isfriendquery->bindValue(':fromid', $userId, PDO::PARAM_INT);
$isfriendquery->bindValue(':start', $start, PDO::PARAM_INT);
$isfriendquery->bindValue(':end', $end, PDO::PARAM_INT);
$isfriendquery->execute();
$fetchResult = $isfriendquery->fetchAll();
$data = [];
// Populate the array using fetched data
foreach ($fetchResult as $item) {
$toid = $item['toid'];
if($toid == $userId){
$toid = $item['fromid'];
}
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
$usrquery->execute(['id' => $toid]);
$tousr = $usrquery->fetch();
$tousername = $tousr['username'];
if($tousr['Admin'] == 1){
$toverified = true;
}
$creatorid = $item['fromid'];
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
$usrquery->execute(['id' => $creatorid]);
$creatorusr = $usrquery->fetch();
$creatorname = $creatorusr['username'];
if($creatorusr['Admin'] == 1){
$creatorverified = true;
}else{
$creatorverified = false;
}
$title = $item['title'];
if($title == NULL){
$title = $tousername;
$defaulttitle = true;
}else{
$defaulttitle = false;
}
$conversationId = $item['id'];
$updated = date("Y-m-d\TH:i:s\Z", $item['time']);
$query = $con->prepare('SELECT * FROM chatdata WHERE conversationid=:id AND readmes=0');
$query->bindParam(':id', $conversationId);
$query->execute();
$data2 = $query->fetch();
if(is_array($data2)){
$unread = true;
}else{
$unread = false;
}
$data[] = array(
"id" => $conversationId,
"title" => $title,
"initiator" => array(
"type" => "User",
"targetId" => $creatorid,
"name" => $creatorname,
"displayName" => $creatorname,
"hasVerifiedBadge" => $creatorverified
),
"hasUnreadMessages" => $unread,
"participants" => array(
array(
"type" => "User",
"targetId" => $creatorid,
"name" => $creatorname,
"displayName" => $creatorname,
"hasVerifiedBadge" => $creatorverified
),
array(
"type" => "User",
"targetId" => $toid,
"name" => $tousername,
"displayName" => $tousername,
"hasVerifiedBadge" => $toverified
)
),
"conversationType" => "OneToOneConversation",
"conversationTitle" => array(
"titleForViewer" => $title,
"isDefaultTitle" => $defaulttitle
),
"lastUpdated" => $updated,
"conversationUniverse" => null
);
}
echo json_encode($data);
?>