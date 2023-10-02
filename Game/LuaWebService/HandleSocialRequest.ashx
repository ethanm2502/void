<?php 
header("Content-Type: application/xml;charset=utf-8");
include ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
if ($_GET["method"] == "IsBestFriendsWith") {
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['ROBLOSECURITY' => $ROBLOSEC]);
$usr = $usrquery->fetch();
$uID = (int)$_GET['playerid'];
$friendId = (int)$_GET['userid'];
$usrquery = $con->prepare("SELECT * FROM `friends` WHERE `toid` = :toid AND `fromid` = :fromid OR `toid` = :toidUID AND `fromid` = :fromidfriendid");
$usrquery->execute(['toid' => $friendId, 'fromid' => $uID, 'toidUID' => $uID, 'fromidfriendid' => $friendId]);
$friends = $usrquery->fetch();
if(!is_array($friends)){
echo '<Value Type="boolean">false</Value>';
}else{
echo '<Value Type="boolean">true</Value>';
}
}
if ($_GET["method"] == "IsFriendsWith") {
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['ROBLOSECURITY' => $ROBLOSEC]);
$usr = $usrquery->fetch();
$uID = (int)$_GET['playerid'];
$friendId = (int)$_GET['userid'];
$usrquery = $con->prepare("SELECT * FROM `friends` WHERE `toid` = :toid AND `fromid` = :fromid OR `toid` = :toidUID AND `fromid` = :fromidfriendid");
$usrquery->execute(['toid' => $friendId, 'fromid' => $uID, 'toidUID' => $uID, 'fromidfriendid' => $friendId]);
$friends = $usrquery->fetch();
if(!is_array($friends)){
echo '<Value Type="boolean">false</Value>';
}else{
echo '<Value Type="boolean">true</Value>';
}
}
if ($_GET["method"] == "IsInGroup") {
if ($_GET['groupid'] == "1200769") {
$uID = (int)$_GET['playerid'];
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
$usrquery->execute(['id' => $uID]);
$usr = $usrquery->fetch();
if ($usr['Admin'] == 1) {
$value = 'true';
} else {
$value = 'false';
}
} else {
$value = 'false';
}
echo '<Value Type="boolean">'.$value.'</Value>';
}
if ($_GET["method"] == "GetGroupRole") {
echo 'Guest';
}
if ($_GET["method"] == "GetGroupRank") {
echo '<Value Type="integer">1</Value>';
}
?>
