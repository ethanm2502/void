<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
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
if($usr['banned'] != 0){
echo json_encode(array('success' => false));
die(http_response_code(403));
}
header("Content-Type: application/json");
if(isset($_POST['description'])){
$aboutinput = filter_var($_POST['description'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$profileid = $usr['id'];
$aboutdecoded = urldecode($aboutinput);
if(strlen($aboutdecoded) < 1000){
$stmt = $con->prepare("UPDATE `users` SET `about` = :aboutdecoded WHERE `id` = :profileid");
$stmt->execute(['aboutdecoded' => $aboutdecoded, 'profileid' => $profileid]);
$data = array('success' => 'true');
echo json_encode($data);
}else{
$data = array('success' => 'false');
echo json_encode($data);
}
}else{
$data = array('success' => 'false');
echo json_encode($data);
}