<?php
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
$PlaceID = (int)$_GET['PlaceID'];
$userID = (int)$_GET['userID'];

$usrquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
$usrquery->execute(['id' => $userID]);
$usrid = $usrquery->fetch();

$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();

if($usrid['ROBLOSECURITY'] == $usr['ROBLOSECURITY']){

$sql = "UPDATE `users` SET `InGameId` = '$PlaceID' WHERE `id` = '$userID'";
$con->exec($sql);
  
$now = time();
$timefromdatabase = $usr['onlinetime'];
$dif = time() - $timefromdatabase;
if ($dif > 100) {
$newtime = $now + 100;
$sql2 = "UPDATE `users` SET `onlinetime` = '$newtime' WHERE `id` = '$userID'";
$con->exec($sql2);
$sql4 = "UPDATE `users` SET `clientstatus` = 'InGame' WHERE `id` = '$userID'";
$con->exec($sql4);
$sql3 = "UPDATE `jobs` SET `lastplayerjointime` = '$now' WHERE `placeId` = '$PlaceID'";
$con->exec($sql3);  
echo"true";
echo time();
}else{
echo"false";
echo time();
exit();
}  
  
$now = time();
$timefromdatabase = $usr['gametime'];
$dif = time() - $timefromdatabase;
if ($dif > 100) {
$newtime = $now + 100;
$sql3 = "UPDATE `users` SET `gametime` = '$newtime' WHERE `id` = '$userID'";
$con->exec($sql3);
$sql4 = "UPDATE `users` SET `clientstatus` = 'InGame' WHERE `id` = '$userID'";
$con->exec($sql4);
$sql3 = "UPDATE `jobs` SET `lastplayerjointime` = '$now' WHERE `placeId` = '$PlaceID'";
$con->exec($sql3); 
echo"true";
echo time();
}else{
echo"false";
echo time();
exit();
}  
  
}else{
echo"userID does not match ROBLOSECURITY.";
exit();
}
?>