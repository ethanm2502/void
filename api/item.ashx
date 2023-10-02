<?php require ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
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
$uID = $usr['id'];
if($usr['activated'] == 0){
header("Content-Type: application/json");
http_response_code(403);
die(json_encode([
"title" => "Error",
"errorMsg" => "Your account is not activated.",
"showDivID" => "TransactionFailureView"
]));
}
if($usr['banned'] != 0){
header("Content-Type: application/json");
http_response_code(403);
die(json_encode([
"title" => "Error",
"errorMsg" => $usr['banreason'],
"showDivID" => "TransactionFailureView"
]));
}
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
echo "nice try baiting friends lmao";
exit();
}
$Robux = $usr['Robux'];
$rqtype = filter_var($_GET['rqtype'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$productID = (int)$_GET['productID'];
$expectedCurrency = (int)$_GET['expectedCurrency'];
$expectedPrice = (int)$_GET['expectedPrice'];
$expectedSellerID = (int)$_GET['expectedSellerID'];
$userAssetID = $uID;
$ownquery = $con->prepare("SELECT count(*) FROM `owneditems` WHERE `userid` = :userid AND `itemid` = :itemid");
$ownquery->execute(['userid' => $userAssetID, 'itemid' => $productID]);
$number_of_rows = $ownquery->fetchColumn();
if($number_of_rows < 1){
if($expectedPrice > $Robux){
http_response_code(403);
die(json_encode([
"title" => "Insufficient Funds",
"errorMsg" => "You don't have enough Robux for this request.",
"showDivID" => "TransactionFailureView"
]));
}
$catquery = $con->prepare("SELECT * FROM `library` WHERE `id` = :id");
$catquery->execute(['id' => $productID]);
$cat = $catquery->fetch();
$creatorid = $cat['creatorid'];
$creatoruserquery = $con->prepare("SELECT * FROM `users` WHERE `id`= :id");
$creatoruserquery->execute(['id' => $creatorid]);
$creatoruser = $creatoruserquery->fetch();
if($cat['offsale'] == 1){
http_response_code(403);
die(json_encode([
"title" => "Offsale",
"errorMsg" => "This item is offsale.",
"showDivID" => "TransactionFailureView"
]));
}
if($cat['type2'] == "Badge"){
http_response_code(403);
die(json_encode([
"title" => "Error",
"errorMsg" => "Sorry, an error occurred. Please try again later.",
"showDivID" => "TransactionFailureView"
]));
}
$creatorrobux = $creatoruser['Robux'];
if($expectedPrice != $cat['Robux']){
http_response_code(403);
die(json_encode([
"title" => "Item Price Has Changed",
"errorMsg" => "While you were shopping, the price of this item had changed.",
"showDivID" => "TransactionFailureView"
]));
}
$soldcount = $cat['sold'];
$type = $cat['type2'];
$sql = "INSERT INTO `owneditems` (`userid`, `itemid`, `item`) VALUES (:userAssetID, :productID, :type)";
$stmt = $con->prepare($sql);
$stmt->execute(array(':userAssetID' => $userAssetID, ':productID' => $productID, ':type' => $type));
if($expectedPrice <= 0) {
$expectedPrice = 0;
}
if($usr['id'] !== $creatorid) {
$FinalRobuxTakeAway = $usr['Robux'] - $expectedPrice;
$FinalRobuxToAdd = $creatorrobux + $expectedPrice;
}
/*
if($expectedPrice > 0){
$FinalRobuxToAdd = $FinalRobuxToAdd * 0.7;
}
*/
$sql = "UPDATE `users` SET `Robux` = :finalRobuxTakeAway WHERE `id` = :uID";
$stmt = $con->prepare($sql);
$stmt->bindValue(':finalRobuxTakeAway', $FinalRobuxTakeAway, PDO::PARAM_INT);
$stmt->bindValue(':uID', $uID, PDO::PARAM_INT);
$stmt->execute();
$sql = "UPDATE `users` SET `Robux` = :finalRobuxToAdd WHERE `id` = :creatorid";
$stmt = $con->prepare($sql);
$stmt->bindValue(':finalRobuxToAdd', $FinalRobuxToAdd, PDO::PARAM_INT);
$stmt->bindValue(':creatorid', $creatorid, PDO::PARAM_INT);
$stmt->execute();
$sql = "UPDATE `library` SET `sold` = :soldcount WHERE `id` = :productID";
$stmt = $con->prepare($sql);
$stmt->bindValue(':soldcount', $soldcount + 1, PDO::PARAM_INT);
$stmt->bindValue(':productID', $productID, PDO::PARAM_INT);
$stmt->execute();
if($cat['type2'] == "Gamepass"){
$IsForGameId = $cat['IsForGameId'];
$gamequery = $con->prepare("SELECT * FROM `games` WHERE `id` = :id");
$gamequery->execute(['id' => $IsForGameId]);
$game = $gamequery->fetch();
$currencyearned = $game['currencyearned'] + $expectedPrice;
$sql = "UPDATE `games` SET `currencyearned` = :currencyearned WHERE `id` = :IsForGameId";
$stmt = $con->prepare($sql);
$stmt->bindValue(':currencyearned', $currencyearned, PDO::PARAM_INT);
$stmt->bindValue(':IsForGameId', $IsForGameId, PDO::PARAM_INT);
$stmt->execute();
}else{
$currencyearned = $cat['currencyearned'] + $expectedPrice;
$sql = "UPDATE `library` SET `currencyearned` = :currencyearned WHERE `id` = :productID";
$stmt = $con->prepare($sql);
$stmt->bindValue(':currencyearned', $currencyearned, PDO::PARAM_INT);
$stmt->bindValue(':productID', $productID, PDO::PARAM_INT);
$stmt->execute();
}
header("Content-Type: application/json");
die(json_encode([
"TransactionVerb" => "purchased",
"AssetName" => $cat['name'],
"AssetType" => $cat['type2'],
"Price" => $cat['Robux'],
"Currency" => 1,
"SellerName" => $cat['creatorname'],
"AssetID" => $productID,
"expectedCurrency" => 1,
"currentCurrency" => 1,
]));
}else{
header("Content-Type: application/json");
http_response_code(403);
die(json_encode([
"title" => "Error",
"errorMsg" => "You already own this item.",
"showDivID" => "TransactionFailureView"
]));
}
