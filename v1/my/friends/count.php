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
}
$uID = $usr['id'];
$friendamquery = $con->prepare("SELECT * FROM `friends` WHERE `status`='2' AND (`toid` = '$uID' OR `fromid` = '$uID')");
$friendamquery->execute();
$count = $friendamquery->rowCount();
echo json_encode(['count' => $count]);
?>