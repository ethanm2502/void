<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
header("Content-Type: text/plain");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
$ticket = getUserData($con);
if($ticket['activated'] == 0){
http_response_code(500);
die("Bad Request");
}
if(is_array($ticket)){
if($ticket['usedRandomGuestId'] == 1){
$now = time();
$usrname = $ticket['username'];
$newtime = $now + 86400;
$options = [
'cost' => 11,
];
$bytes = bin2hex(random_bytes(32));
$randguest = password_hash($bytes, PASSWORD_BCRYPT, $options);
$sql2 = "UPDATE `users` SET `randomGuestId` = '$randguest' WHERE `username` = '$usrname'";
$con->exec($sql2);
echo $randguest;
}else{
echo $ticket['randomGuestId'];
exit();
}
}else{
http_response_code(403);
die("no user");
}
?>
