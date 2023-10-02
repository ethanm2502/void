<?php
include($_SERVER['DOCUMENT_ROOT'] . '/config/includes.php');
$logged = false;
if ($_COOKIE['password'] || $_COOKIE['_ROBLOSECURITY']) {
    $password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
    $roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
    $usrquery = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
    $usrquery->execute(['password' => $password, 'ROBLOSECURITY' => $roblosec]);
    $usr = $usrquery->fetch();
    if ($usr != 0) {
        $logged = true;
        $uID = $usr['id'];
    }else{
    die(http_response_code(401));
    }
}
if(isset($_POST['currentPassword'])){
if(password_verify(urldecode($_POST['currentPassword']),$usr['password'])){
$newPassword = filter_var($_POST['newPassword'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$options = [
'cost' => 11,
];
$newPassword = password_hash($newPassword, PASSWORD_BCRYPT, $options);
$nameupdate = $con->prepare("UPDATE `users` SET `password` = :password WHERE `id`= :id");
$nameupdate->execute(['password' => $newPassword, 'id' => $uID]);
setcookie("password", $newPassword, time() + (460800* 30), "/", '.voidrev.us');

$newPassword = password_hash($newPassword, PASSWORD_BCRYPT, $options);
$nameupdate = $con->prepare("UPDATE `users` SET `ROBLOSECURITY` = :ROBLOSECURITY WHERE `id`= :id");
$nameupdate->execute(['ROBLOSECURITY' => $newPassword, 'id' => $uID]);
setcookie(".ROBLOSECURITY", $newPassword, time() + (460800* 30), "/", '.voidrev.us');

echo"{}";
exit();
}else{
http_response_code(400);
echo "Invalid";
exit();
}
}else{
http_response_code(400);
exit();
}