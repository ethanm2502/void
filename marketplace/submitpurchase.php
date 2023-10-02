<?php header('Content-Type: application/json; charset=utf-8');
try {
require ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
$uID = $usr['id'];
$productId = (int)$_POST['productId'];
if(isset($_POST['purchasePrice'])){
$requestPrice = (int)$_POST['purchasePrice'];
}else{
$requestPrice = (int)$_POST['expectedUnitPrice'];
}
$requestPlaceId = (int)$_POST['placeId'];
$Robux = $usr['Robux'];
$RobuxFinalValue = $Robux - $requestPrice;
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
if($creatorid !== $uID) {
$sql = "UPDATE `users` SET `Robux` = '$RobuxFinalValue' WHERE `id` = '$uID'";
$con->exec($sql);
if($creatorid != $uID){
$sql = "UPDATE `users` SET `Robux` = '$CreatorRobuxFinalValue' WHERE `id` = '$creatorid'";
$con->exec($sql);
}
}
$currencyearned = $requestPrice + $game['currencyearned'];
$sql = "UPDATE `games` SET `currencyearned` = '$currencyearned' WHERE `id`='$requestPlaceId'";
$con->exec($sql);
$receipt = vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex(random_bytes(16)), 4));
$sql2 = "INSERT INTO `devproduct` (`PlayerId`, `productId`,`unitPrice`,`receipt`,`placeId`) VALUES ('$uID', '$productId','$requestPrice','$receipt','$requestPlaceId')";
$con->exec($sql2);
$data = array('success' => 'true', 'status' => 'Bought', 'receipt' => $receipt);
header('Content-type: application/json');
echo json_encode($data);
}catch(Throwable $e) {
$data = array('success' => 'false', 'status' => 'Error', 'receipt' => '', 'message' => $e);
header('Content-type: application/json');
echo json_encode($data);
}
?>
