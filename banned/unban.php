<?php
header("Content-Type: application/json");
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$logged = false;
if($_COOKIE['username'] && $_COOKIE['password'] || $_COOKIE['_ROBLOSECURITY']){
$username = filter_var($_COOKIE['username'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `username` = :username AND `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['username' => $username, 'password' => $password, 'ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
if($usr != 0){
$logged = true;
}
}else{
if(!strpos($_SERVER['REQUEST_URI'], "login")) {
header("Location: https://www.voidrev.us");
}
}
$timey = time();
if ($usr['banned'] > 0) {
header('Location: /banned/');
}
if (!(isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] == 'on' ||
$_SERVER['HTTPS'] == 1) ||
isset($_SERVER['HTTP_X_FORWARDED_PROTO']) &&
$_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https'))
{
$redirect = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
header('Location: ' . $redirect);
exit();
}
$uID = $usr['id'];

if($usr['banned'] == 0){
$sql = "UPDATE `users` SET `banned`='0' WHERE `id`=:uID";
$stmt = $con->prepare($sql);
$stmt->bindValue(':uID', $uID, PDO::PARAM_INT);
$stmt->execute();
    echo'{"message":"OK"}';
    header("Content-Type: text/html; charset=UTF-8");
    die("<META http-equiv=refresh content=1;URL=/>");
}
if($usr['banned'] == 1){
$sql = "UPDATE `users` SET `banned`='0' WHERE `id`=:uID";
$stmt = $con->prepare($sql);
$stmt->bindValue(':uID', $uID, PDO::PARAM_INT);
$stmt->execute();

    die("<META http-equiv=refresh content=1;URL=/>");
}
if($usr['banned'] == 2){
    $now = time();
    $timefromdatabase = $usr['bantime'];
    $dif = time() - $timefromdatabase;
    if ($dif > 259200) {
$sql = "UPDATE `users` SET `banned`='0' WHERE `id`=:uID";
$stmt = $con->prepare($sql);
$stmt->bindValue(':uID', $uID, PDO::PARAM_INT);
$stmt->execute();

    header("Content-Type: text/html; charset=UTF-8");
    die("<META http-equiv=refresh content=1;URL=/>");
    }else{
    echo'{"errors":[{"code":500,"message":"InternalServerError"}]}';
    exit();
    }
}
if($usr['banned'] == 3){
    $now = time();
    $timefromdatabase = $usr['bantime'];
    $dif = time() - $timefromdatabase;
    if ($dif > 1209600) {
$sql = "UPDATE `users` SET `banned`='0' WHERE `id`=:uID";
$stmt = $con->prepare($sql);
$stmt->bindValue(':uID', $uID, PDO::PARAM_INT);
$stmt->execute();

    header("Content-Type: text/html; charset=UTF-8");
    die("<META http-equiv=refresh content=1;URL=/>");
    }else{
    echo'{"errors":[{"code":500,"message":"InternalServerError"}]}';
    exit();
    }
}
if($usr['banned'] == 4){
    echo'{"errors":[{"code":403,"message":"Forbidden"}]}';
    exit();
}