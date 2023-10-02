<?php
try{
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
header("Content-Type: application/json");
if (isset($_COOKIE['password']) || isset($_COOKIE['_ROBLOSECURITY'])) {
$password = filter_input(INPUT_COOKIE, 'password', FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_input(INPUT_COOKIE, '_ROBLOSECURITY', FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$stmt = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :roblosec");
$stmt->bindParam(':password', $password);
$stmt->bindParam(':roblosec', $roblosec);
$stmt->execute();
$usr = $stmt->fetch(PDO::FETCH_ASSOC);
if ($usr) {
$logged = true;
$uID = $usr['id'];
}else{
$logged = false;
die(http_response_code(403));
}
}
if($usr['verified'] == 1){
die();
}
$email = filter_var($_POST['emailAddress'], FILTER_SANITIZE_EMAIL);
$data = file_get_contents("https://www.voidrev.us/mail/?userId=".$uID."&request=verifyemail&email=".$email."");
}catch(Exception $e){
http_response_code(500);
die(json_encode(["success" => false]));
}
?>
{
"verifiedUserHatAssetId": 102611803
}