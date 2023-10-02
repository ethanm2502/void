<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Content-Type: text/plain");
$guestid = urldecode(filter_input(INPUT_GET, 'suggest', FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES));
if(isset($_GET['suggest'])){
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `randomGuestId` = :guestid");
$usrquery->execute(['guestid' => $guestid]);
$usr = $usrquery->fetch();
if(!is_array($usr)){
http_response_code(401);
exit();
}
if($usr['activated'] == 0){
http_response_code(401);
exit();
}
$roblosec = $usr['ROBLOSECURITY'];
$username = $usr['username'];
$password = $usr['password'];
$uID = $usr['id'];
$options = [
'cost' => 10,
];
$analyticsdata = password_hash("BJ@ynVL+ZP2xT-h8rXTPv@9yCbfS8Z%rb_TkCE^T=SUycJVjh6gaf8=92W7nvFtU", PASSWORD_BCRYPT, $options);
setcookie("browserTrackerIds", $analyticsdata, time() + (460800* 30), "/", '.voidrev.us');
setcookie("username", $username, time() + (460800* 30), "/", '.voidrev.us');
setcookie("password", $password, time() + (460800* 30), "/", '.voidrev.us');
setcookie(".ROBLOSECURITY", $roblosec, time() + (460800* 30), "/", '.voidrev.us');
setcookie("RBXEventTrackerV2", "CreateDate=".date('n/j/Y g:i:s A')."&rbxid=".$uID."&browserid=".$uID."", time() + 24 * 60 * 60, "/", '.voidrev.us');
$sql = "UPDATE `users` SET `usedrandomGuestId` = '1' WHERE `randomGuestId` = :guestid";
$stmt = $con->prepare($sql);
$stmt->bindParam(':guestid', $guestid);
$stmt->execute();
echo $roblosec;
exit();
}else{
http_response_code(401);
exit();
}
?>