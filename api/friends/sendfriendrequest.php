<?php require ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$logged = false;
if($_COOKIE['_ROBLOSECURITY']){
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
if($usr != 0){
$logged = true;
}
}else{
header("Location: https://www.voidrev.us/newlogin/");
}
if($usr['banned'] != 0){
echo json_encode(array('success' => false));
die(http_response_code(403));
}
$timey = time();
$uID = $usr['id'];
$post = file_get_contents('php://input');
$json = json_decode($post, true);
$friendId = (int)$json['targetUserID'];
$usrquery = $con->prepare("SELECT * FROM `friends` WHERE `toid` = :toid AND `fromid` = :fromid OR `toid` = :toiduid AND `fromid` = :fromidget");
$usrquery->execute(['toid' => $friendId, 'fromid' => $uID, 'toiduid' => $uID, 'fromidget' => $friendId]);
$friends = $usrquery->fetch();
if(!is_array($friends)){
$sql = "INSERT INTO `friends` (`status`, `toid`, `fromid`) VALUES ('1', :friendId, :uID)";
$stmt = $con->prepare($sql);
$stmt->bindValue(':friendId', $friendId, PDO::PARAM_INT);
$stmt->bindValue(':uID', $uID, PDO::PARAM_INT);
$stmt->execute();
$data = array('success' => 'true', 'message' => 'Success');
echo json_encode($data);
}else{
$data = array('success' => 'false', 'message' => 'Error');
echo json_encode($data);
}
?>
