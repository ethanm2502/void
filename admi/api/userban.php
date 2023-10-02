<?php
require ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$logged = false;
if($_COOKIE['password'] || $_COOKIE['_ROBLOSECURITY']){
$password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['password' => $password, 'ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
if(is_array($usr)){
$logged = true;
}else{
die("no.");
}
}else{
die("bro where are your cookies");
}
$username = $usr['username'];
$uID = $usr['id'];
if ($usr['banned'] > 0) {
header('Location: /banned');
exit();
}
if ($usr['Admin'] != 1) {
header('HTTP/1.0 403 Forbidden', true, 403);
http_response_code(403);
die("Bad Request");
}
if (isset($_POST['UserId'], $_POST['Type'])) {
$UserId = (int)$_POST['UserId'];
$Type = filter_var($_POST['Type'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$Reason = filter_var($_POST['Reason'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$date = time();
if($_POST['AppealType'] == "Yes"){
$appeal = 1;
}else{
$appeal = 0;
}
if ($Type == "Revert") {
$sql = "UPDATE `users` SET `banned`='0', `banreason`=:Reason, `bantime`=:Time, `canappeal`=:CanAppeal WHERE `id`=:UserId";
} elseif ($Type == "Warning") {
$sql = "UPDATE `users` SET `banned`='1', `banreason`=:Reason, `bantime`=:Time, `canappeal`=:CanAppeal WHERE `id`=:UserId";
} elseif ($Type == "3 Days") {
$sql = "UPDATE `users` SET `banned`='2', `banreason`=:Reason, `bantime`=:Time, `canappeal`=:CanAppeal WHERE `id`=:UserId";
$date = $date + 259200;
} elseif ($Type == "14 Days") {
$sql = "UPDATE `users` SET `banned`='3', `banreason`=:Reason, `bantime`=:Time, `canappeal`=:CanAppeal WHERE `id`=:UserId";
$date = $date + 1209600;
} elseif ($Type == "Deleted") {
$sql = "UPDATE `users` SET `banned`='4', `banreason`=:Reason, `bantime`=:Time, `canappeal`=:CanAppeal WHERE `id`=:UserId";
$date = 2147483647;
} else {
die("Bad Request");
}
$stmt = $con->prepare($sql);
$stmt->bindValue(':UserId', $UserId, PDO::PARAM_INT);
$stmt->bindValue(':Reason', $Reason, PDO::PARAM_STR);
$stmt->bindValue(':Time', $date, PDO::PARAM_INT);
$stmt->bindValue(':CanAppeal', $appeal, PDO::PARAM_INT);
$stmt->execute();
$sqlInsert = "INSERT INTO `banhistory` (`date`, `reason`, `bannedby`, `bannedid`) VALUES (:Date, :Reason, :BannedBy, :BannedId)";
$stmtInsert = $con->prepare($sqlInsert);
$stmtInsert->bindValue(':Date', $date, PDO::PARAM_INT);
$stmtInsert->bindValue(':Reason', $Reason, PDO::PARAM_STR);
$stmtInsert->bindValue(':BannedBy', $uID, PDO::PARAM_INT);
$stmtInsert->bindValue(':BannedId', $UserId, PDO::PARAM_INT);
$stmtInsert->execute();
header("Location: https://www.voidrev.us/admi/?tab=Moderation&item=Users");
die("Success, returning");
} else {
die("Bad Request");
}