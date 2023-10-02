<?php
include($_SERVER['DOCUMENT_ROOT'] . "/config/includes.php");
header("Content-Type: application/json");
$usr = getUserData($con);
$uID = $usr['id'];
$itemsPerPage = (int)$_GET['pageSize'];
$pageNumber = isset($_GET['pageNumber']) ? intval($_GET['pageNumber']) : 0;
$offset = $pageNumber * $itemsPerPage;
$messageTab = (int)$_GET['messageTab'];
if($messageTab == 0){
$stmt = $con->prepare("SELECT * FROM messages WHERE toid = :uID AND archived=0 ORDER by updated DESC LIMIT :offset,:perpage");
$stmt->bindParam(':uID', $uID, PDO::PARAM_INT);
$stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
$stmt->bindParam(':perpage', $itemsPerPage, PDO::PARAM_INT);
$stmt->execute();
$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
}elseif($messageTab == 1){
$stmt = $con->prepare("SELECT * FROM messages WHERE fromid = :uID AND archived=0 ORDER by updated DESC LIMIT :offset,:perpage");
$stmt->bindParam(':uID', $uID, PDO::PARAM_INT);
$stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
$stmt->bindParam(':perpage', $itemsPerPage, PDO::PARAM_INT);
$stmt->execute();
$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
}elseif($messageTab == 3){
$stmt = $con->prepare("SELECT * FROM messages WHERE toid = :uID AND archived=1 ORDER by updated DESC LIMIT :offset,:perpage");
$stmt->bindParam(':uID', $uID, PDO::PARAM_INT);
$stmt->bindParam(':offset', $offset, PDO::PARAM_INT);
$stmt->bindParam(':perpage', $itemsPerPage, PDO::PARAM_INT);
$stmt->execute();
$messages = $stmt->fetchAll(PDO::FETCH_ASSOC);
}
$data = [
"Collection" => [],
"TotalCollectionSize" => count($messages),
"TotalPages" => 1,
"PageNumber" => (int)$_GET['pageNumber']
];
foreach ($messages as $message) {
$stmt = $con->prepare("SELECT * FROM users WHERE id = :uID");
$stmt->bindParam(':uID', $message['fromid'], PDO::PARAM_INT);
$stmt->execute();
$sender = $stmt->fetch(PDO::FETCH_ASSOC);
$stmt = $con->prepare("SELECT * FROM users WHERE id = :uID");
$stmt->bindParam(':uID', $message['toid'], PDO::PARAM_INT);
$stmt->execute();
$recipient = $stmt->fetch(PDO::FETCH_ASSOC);
if($sender['displayname'] == NULL){
$senderdisplayname = $sender['username'];
}else{
$senderdisplayname = $sender['displayname'];
}
if($recipient['displayname'] == NULL){
$recipientdisplayname = $recipient['username'];
}else{
$recipientdisplayname = $recipient['displayname'];
}
$data["Collection"][] = [
"Id" => $message["messageid"],
"Sender" => [
"HasVerifiedBadge" => (bool)$sender["Admin"],
"UserId" => $sender["id"],
"UserName" => $sender["username"],
"DisplayName" => $senderdisplayname,
"SenderAbsoluteUrl" => "https://www.voidrev.us/users/".$sender["id"]."/profile/"
],
"Recipient" => [
"HasVerifiedBadge" => (bool)$recipient["Admin"],
"UserId" => $recipient["id"],
"UserName" => $recipient["username"],
"DisplayName" => $recipientdisplayname,
"RecipientAbsoluteUrl" => "https://www.voidrev.us/users/".$recipient["id"]."/profile/"
],
"Subject" => $message["subtitle"],
"Body" => $message["content"],
"SenderThumbnail" => "https://www.voidrev.us".getUserHeadshotThumbnail($con,$sender["id"]),
"RecipientThumbnail" => "https://www.voidrev.us".getUserHeadshotThumbnail($con,$recipient["id"]),
"Created" => date('Y-m-d\TH:i:s.u\Z',$message["created"]),
"Updated" => date('Y-m-d\TH:i:s.u\Z',$message["updated"]),
"IsRead" => (bool) $message["messageread"],
"IsSystemMessage" => (bool) $message["system"],
"IsReportAbuseDisplayed" => (bool) !$message["system"],
];
}
echo json_encode($data, JSON_PRETTY_PRINT);
?>
