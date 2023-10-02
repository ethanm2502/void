<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
if($_COOKIE['username'] && $_COOKIE['password']){
$username = filter_var($_COOKIE['username'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `username` = :username AND `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['username' => $username, 'password' => $password, 'ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
}
$r15orr6 = $_GET['r15'];
$uID = $usr['id'];
if($r15orr6 == "true"){
$sql = "UPDATE `users` SET `R15` = '1' WHERE `id` = '$uID'";
$con->exec($sql);
}else{
$sql = "UPDATE `users` SET `R15` = '0' WHERE `id` = '$uID'";
$con->exec($sql);
}
unlink($_SERVER['DOCUMENT_ROOT'].'/thumbnails/'.$usr['fullthumbnailhash'].'.png');
unlink($_SERVER['DOCUMENT_ROOT'].'/thumbnails/'.$usr['headshotthumbnailhash'].'.png');