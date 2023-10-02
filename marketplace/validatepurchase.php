<?php
try {
require ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
header('Content-Type: application/json; charset=UTF-8; X-Robots-Tag: noindex');
$roblosec = filter_var($_COOKIE["_ROBLOSECURITY"], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$userquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY`= :ROBLOSECURITY");
$userquery->execute(['ROBLOSECURITY' => $roblosec]);
$user = $userquery->fetch();
if(!is_array($user)){
http_response_code(403);
exit();
}
$receiptid = filter_var($_GET['receipt'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$playerId = $user['id'];
$placeId = (int)$_SERVER['HTTP_ROBLOX_PLACE_ID'];
$receiptquery = $con->prepare("SELECT * FROM `devproduct` WHERE `receipt` = :receipt AND `PlayerId` = :PlayerId AND `placeId` = :placeId");
$receiptquery->execute(['receipt' => $receiptid, 'PlayerId' => $playerId, 'placeId' => $placeId]);
$receipt = $receiptquery->fetch();
if(is_array($receipt)){
$data = array('playerId' => $playerId, 'placeId' => $placeId, 'isValid' => true, 'productId' => $productId);
echo json_encode($data);
}else{
$data = array('playerId' => null, 'placeId' => null, 'isValid' => false, 'productId' => null);
echo json_encode($data);
}
}catch(Throwable $e) {
$data = array('playerId' => null, 'placeId' => null, 'isValid' => false, 'productId' => null);
echo json_encode($data);
}
?>