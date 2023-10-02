<?php
/*
require ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
header('Content-Type: application/json; charset=utf-8');
$logged = false;
if($_COOKIE['_ROBLOSECURITY']){
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
if($usr != 0){
$logged = true;
$uID = $usr['id'];
}
}else{
$json = json_encode(['success' => false, 'message' => 'You need to be logged in to do this.']);
die($json);
}
if($usr['activated'] == 0){
$json = json_encode(['success' => false, 'message' => 'Your account is not activated.']);
die($json);
}
if($usr['banned'] > 0){
$json = json_encode(['success' => false, 'message' => 'Your account is not allowed.']);
die($json);
}
$invkeyquery = $con->prepare("SELECT * FROM `invitekeys` WHERE `keyCreatorId` = :keyCreatorId ORDER BY `time` DESC");
$invkeyquery->execute(['keyCreatorId' => $uID]);
$invkeys = $invkeyquery->fetch();
$time = time() - (int)$invkeys['time'];
$keyquery = $con->prepare("SELECT * FROM `invitekeys` WHERE `keyCreatorId` = :keyCreatorId");
$keyquery->execute(['keyCreatorId' => $uID]);
$keys = $keyquery->rowCount();
if($usr['Admin'] == 0){
// Skip these checks if User is an Admin
if((time() - (int)$usr['trn_date'] < 2628000)){
$json = json_encode(['success' => false, 'message' => 'Your account is too new for this, please wait.']);
die($json);
}
if($time < 3600){
$json = json_encode(['success' => false, 'message' => 'You can only make 1 Invite key every hour.']);
die($json);
}
if($keys > 100){
$json = json_encode(['success' => false, 'message' => 'You have reached the maximum amount of Invite keys you can make, to change this please contact an Administrator.']);
die($json);
}
}
try {
$randomkey = bin2hex(openssl_random_pseudo_bytes(16));
$sql = "INSERT INTO `invitekeys` (`invitekey`, `keyCreatorId`) VALUES (:randomkey, :uID)";
$stmt = $con->prepare($sql);
$stmt->execute(['randomkey' => $randomkey, 'uID' => $uID]);
$json = json_encode(['success' => true, 'key' => $randomkey]);
die($json);
}catch(Throwable $e) {
$json = json_encode(['success' => false, 'message' => 'An error has occured, here is the error: '.$e.'']);
die($json);
}
*/
header('Content-Type: application/json; charset=utf-8');
echo json_encode(['success' => false, 'message' => 'kitra here, invite generate will be gone, and got replaced with discord linking this is useless, we may change our mind reusing it again.']);