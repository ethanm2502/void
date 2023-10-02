<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
header("Content-Type: text/plain");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
if (isset($_COOKIE['password']) || isset($_COOKIE['_ROBLOSECURITY'])) {
$password = filter_input(INPUT_COOKIE, 'password', FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_input(INPUT_COOKIE, '_ROBLOSECURITY', FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$stmt = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :roblosec");
$stmt->bindParam(':password', $password);
$stmt->bindParam(':roblosec', $roblosec);
$stmt->execute();
$ticket = $stmt->fetch(PDO::FETCH_ASSOC);
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
header("rbx-authentication-ticket: ".$ticket['randomGuestId']);
echo "{}";
exit();
}else{
header("rbx-authentication-ticket: ".$ticket['randomGuestId']);
echo "{}";
exit();
}
}else{
http_response_code(403);
die("no user");
}
}else{
http_response_code(403);
die("missing cookies");
}
?>
