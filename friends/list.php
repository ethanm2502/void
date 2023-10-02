<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
header("Content-Type: application/json");
$logged = false;
if($_COOKIE['username'] && $_COOKIE['password']){
$username = filter_var($_COOKIE['username'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `username` = :username AND `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['username' => $username, 'password' => $password, 'ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
if($usr != 0){
$logged = true;
}
}
$timey = time();
$uID = $usr['id'];
$id = (int)$_GET['userId'];
$isfriendquery = $con->prepare("SELECT * FROM `friends` WHERE `status`='2' AND (`toid` = '$id' OR `fromid` = '$id')");
$isfriendquery->execute();
$friendamquery = $con->prepare("SELECT count(*) FROM `friends` WHERE `status`='2' AND (`toid` = '$id' OR `fromid` = '$id')");
$friendamquery->execute();
$origamount = $friendamquery->fetchColumn();
$amount = 0;
?>
{"UserId":<?=$id;?>,"TotalFriends":<?=$origamount;?>,"StartIndex":0,"PageSize":50,"TotalPages":2,"Friends":[<?php while($friends = $isfriendquery->fetch()){$amount = $amount + 1;$friendid = $friends['toid']; if($friendid == $id){ $friendid = $friends['fromid'];} $frienduquery= $con->prepare("SELECT * FROM `users` WHERE `id` = :id"); $frienduquery->execute(['id' => $friendid]); $friendu = $frienduquery->fetch(); if(!is_array($friendu)){$sql = "DELETE FROM `friends` WHERE `toid`='$friendid' AND `fromid`='$uID' OR `toid`='$uID' AND `fromid`='$friendid'";$con->exec($sql);} $timefromdatabase = $friendu['onlinetime']; $dif = time() - $timefromdatabase; if ($dif < 120) {$onlinestat = "online";}else{$onlinestat = "offline";}?>{"Id":<?=$friendu['id'];?>,"Username":"<?echo NoXSSPlz($friendu['username']);?>","UserProfileLink":"https://www.voidrev.us/users/<?=$friendu['id'];?>/profile"}<?if($amount < $origamount){echo",
";}}?>]}