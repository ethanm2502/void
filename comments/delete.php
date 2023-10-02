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
$timey = time();
$assetId = (int)$_POST['commentId'];
if($usr['Admin'] == 1){
$sql = "DELETE FROM `comments` WHERE `commentId` = :assetId";
$stmt = $con->prepare($sql);
$stmt->bindValue(':assetId', $assetId, PDO::PARAM_INT);
$stmt->execute();
$data = array('success' => 'true');
header('Content-type: text/plain');
echo json_encode($data);
}else{
$data = array('success' => 'false');
header('Content-type: text/plain');
echo json_encode($data);
}
?>