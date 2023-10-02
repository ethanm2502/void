<?php 
header('Content-Type: application/json; charset=utf-8');
try {
require ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
$uID = $usr['id'];
$productId = (int)$_REQUEST['productId'];
$requestPrice = (int)$_REQUEST['purchasePrice'];
$requestPlaceId = (int)$_REQUEST['placeId'];
$passquery = $con->prepare("SELECT * FROM `library` WHERE `id` = '$productId' OR `type2` = 'item2' AND `type` = 'Gamepass'");
$passquery->execute();
$pass = $passquery->fetch();
if(is_array($pass)){
$requestPrice = $pass['Robux'];
}else{
throw new Exception("No Pass");   
}
$Robux = $usr['Robux'];
$RobuxToTakeAway = $requestPrice;
$RobuxFinalValue = $Robux - $RobuxToTakeAway;
$gamequery = $con->prepare("SELECT id,creatorid,currencyearned FROM `games` WHERE `id` = :id");
$gamequery->execute(['id' => $requestPlaceId]);
$game = $gamequery->fetch();
if(!is_array($game)){
throw new Exception("No Game");
}
$creatorid = $game['creatorid'];
$creatorusrquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :creatorid");
$creatorusrquery->execute(['creatorid' => $creatorid]);
$creator = $creatorusrquery->fetch();
if(!is_array($creator)){
throw new Exception("No User");
}
$CreatorRobuxFinalValue = $creator['Robux'] + $requestPrice;
$stmt = $con->prepare("UPDATE `users` SET `Robux` = :robuxFinalValue WHERE `id` = :uID");
$stmt->bindParam(':robuxFinalValue', $RobuxFinalValue, PDO::PARAM_INT);
$stmt->bindParam(':uID', $uID, PDO::PARAM_INT);
$stmt->execute();
$stmt = $con->prepare("UPDATE `users` SET `Robux` = :creatorRobuxFinalValue WHERE `id` = :creatorID");
$stmt->bindParam(':creatorRobuxFinalValue', $CreatorRobuxFinalValue, PDO::PARAM_INT);
$stmt->bindParam(':creatorID', $creatorid, PDO::PARAM_INT);
$stmt->execute();
$currencyearned = $game['currencyearned'] + $requestPrice;
$sql = "UPDATE `games` SET `currencyearned` = '$currencyearned' WHERE `id`='$requestPlaceId'";
$con->exec($sql);
$sql2 = "INSERT INTO `gameowneditems` (`userId`, `assetId`) VALUES ('$uID', '$productId')";
$con->exec($sql2);
$data = array('success' => 'true', 'status' => 'Bought', 'receipt' => $productId);
header('Content-type: application/json');
echo json_encode($data);
}catch(Exception $e) {
$data = array('success' => 'false', 'status' => 'Error', 'receipt' => '', 'message' => $e);
header('Content-type: application/json');
echo json_encode($data);
}
?>
