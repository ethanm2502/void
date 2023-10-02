<?php header("Content-Type: application/json");
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$logged = false;
if($_COOKIE['password'] || $_COOKIE['_ROBLOSECURITY']){
$password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['password' => $password, 'ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
if($usr != 0){
$logged = true;
}
}
$uID = $usr['id'];
$username = $usr['username'];
if(!empty(file_get_contents('php://input'))){
$data = json_decode(file_get_contents('php://input'), true);
if(!isset($data['participantUserId'])){
http_response_code(403);
exit();
}
$participantUserId = (int)$data['participantUserId'];
$parquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
$parquery->execute(['id' => $participantUserId]);
$par = $parquery->fetch();
$participantUsername = $par['username'];
}else{
http_response_code(403);
exit();
}
?>
{
"Conversation": {
"Id": "<?=$uID;?>",
"Name": "<?=$username;?>",
"isConversation": true,
"dialogType": "CHAT",
"ParticipantUsers": [
{
"Id": "<?=$participantUserId;?>",
"Name": "<?=$participantUsername;?>",
"UserProfileLink": "https://www.voidrev.us/users/profile/<?=$participantUserId;?>"
}
],
"ChatMessages": [],
"layoutId": "conv_12345"
}
}
