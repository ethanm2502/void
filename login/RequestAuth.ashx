<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Content-Type: text/plain");
$ticket = getUserData($con);
if ($ticket) {
$logged = true;
$usrname = $ticket['username'];
if($ticket['usedRandomGuestId'] == 1){
$now = time();
$newtime = $now + 86400;
$options = [
'cost' => 11,
];
$bytes = bin2hex(random_bytes(32));
$randguestid = password_hash($bytes, PASSWORD_BCRYPT, $options);
$sql = "UPDATE `users` SET `usedrandomGuestId` = '0' WHERE `username` = :usrname";
$stmt = $con->prepare($sql);
$stmt->bindValue(':usrname', $usrname);
$stmt->execute();
$sql2 = "UPDATE `users` SET `randomGuestId` = :randguestid WHERE `username` = :usrname";
$stmt2 = $con->prepare($sql2);
$stmt2->bindValue(':randguestid', $randguestid);
$stmt2->bindValue(':usrname', $usrname);
$stmt2->execute();
}else{
$randguestid = $ticket['randomGuestId'];
}
$randguestid = urlencode($randguestid);
echo "http://www.voidrev.us/login/Negotiate.ashx?suggest=$randguestid";
}else{
http_response_code(401);
exit();
}
?>