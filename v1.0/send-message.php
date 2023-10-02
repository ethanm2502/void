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
$conversationId = (int)$data['conversationId'];
$message = filter_var($data['message'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
}else{
exit();
}
?>
{
  "content": "string",
  "filteredForReceivers": true,
  "messageId": "string",
  "sent": "2023-04-09T18:31:45.909Z",
  "messageType": "PlainText",
  "resultType": "Success",
  "statusMessage": "string"
}