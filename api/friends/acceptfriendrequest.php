<?php header("Content-Type: application/json; charset=UTF-8");
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$data = json_decode(file_get_contents('php://input'), true);
if($data['targetUserID']){
$requesterUserId = (int)$data['targetUserID'];
$ROBLOSEC = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSEC");
$usrquery->execute(['ROBLOSEC' => $ROBLOSEC]);
$usr = $usrquery->fetch();
if(!is_array($usr)){
header("Location: https://www.voidrev.us/newlogin/");
}
if($usr['banned'] != 0){
echo json_encode(array('success' => false));
die(http_response_code(403));
}
$uID = $usr['id'];
$sql = "UPDATE `friends` SET `status` = '2' WHERE `fromid` = :requesterUserId AND `toid` = :uID";
$stmt = $con->prepare($sql);
$stmt->bindValue(':requesterUserId', $requesterUserId, PDO::PARAM_INT);
$stmt->bindValue(':uID', $uID, PDO::PARAM_INT);
$stmt->execute();
?>
{
"success": true,
"message": "Success"
}
<?php exit(); }
if($_POST['targetUserID']) {
$requesterUserId = (int)$_POST['targetUserID'];
$ROBLOSEC = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSEC");
$usrquery->execute(['ROBLOSEC' => $ROBLOSEC]);
$usr = $usrquery->fetch();
if(!is_array($usr)){
header("Location: https://www.voidrev.us/newlogin/");
}
$uID = $usr['id'];
$sql = "UPDATE `friends` SET `status` = '2' WHERE `fromid` = :requesterUserId AND `toid` = :uID";
$stmt = $con->prepare($sql);
$stmt->bindValue(':requesterUserId', $requesterUserId, PDO::PARAM_INT);
$stmt->bindValue(':uID', $uID, PDO::PARAM_INT);
$stmt->execute();
?>
{
"success": true,
"message": "Success"
}
<?php exit(); }
