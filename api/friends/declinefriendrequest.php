<?php
/*
This API is probably fucked cuz it serves 0 purpose, it's listed in the ROBLOX 2016 API docs but the thing is, I can't find ANYWHERE where this used.
So TLDR: Don't use this API.
EDIT: I FOUND FUCKING USE FOR IT, ITS IMPORTANT FUCK FUCK FUCK FUCKING
*/
require ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
$uID = $usr['id'];
if(!is_array($usr)){
header("Location: https://www.voidrev.us/newlogin/");
}
if($usr['banned'] != 0){
echo json_encode(array('success' => false));
die(http_response_code(403));
}
$post = file_get_contents('php://input');
$json = json_decode($post, true);
$friendId = (int)$json['targetUserID'];
$sql = "DELETE FROM `friends` WHERE (`toid` = :friendId1 AND `fromid` = :uID1) OR (`toid` = :uID2 AND `fromid` = :friendId2)";
$stmt = $con->prepare($sql);
$stmt->bindValue(':friendId1', $friendId, PDO::PARAM_INT);
$stmt->bindValue(':uID1', $uID, PDO::PARAM_INT);
$stmt->bindValue(':uID2', $uID, PDO::PARAM_INT);
$stmt->bindValue(':friendId2', $friendId, PDO::PARAM_INT);
$stmt->execute();
$data = array('success' => 'true');
echo json_encode($data)
?>
