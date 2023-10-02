<?php require ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
if(!is_array($usr)){
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
$friendId = (int)$json['targetUserId'];
$sql = "DELETE FROM `following` WHERE `toid` = :friendId AND `fromid` = :uID";
$stmt = $con->prepare($sql);
$stmt->bindValue(':friendId', $friendId, PDO::PARAM_INT);
$stmt->bindValue(':uID', $uID, PDO::PARAM_INT);
$stmt->execute();
$data = array('success' => 'true');
echo json_encode($data)
?>
