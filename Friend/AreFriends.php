<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');

$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['ROBLOSECURITY' => $ROBLOSEC]);
$usr = $usrquery->fetch();
$uID = $usr['id'];
$friendId = (int)$_GET['userId'];
$usrquery = $con->prepare("SELECT * FROM `friends` WHERE `toid` = :toid AND `fromid` = '$uID' OR `toid` = :toidUID AND `fromid` = :fromid");
$usrquery->execute(['toid' => $friendId, 'toidUID' => $uID, 'fromid' => $friendId]);
$friends = $usrquery->fetch();
 
if(!is_array($friends)){
echo '<Value Type="boolean">false</Value>';
}else{
echo '<Value Type="boolean">true</Value>';
}
?>
