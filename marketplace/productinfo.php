<?php
require ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
if (isset($_GET['assetId']) || isset($_GET['AssetID']) || isset($_GET['assetid']) || isset($_GET['assetID'])) {
$value = $_GET['assetId'] ?? $_GET['AssetID'] ?? $_GET['assetid'] ?? $_GET['assetID'];
if (ctype_digit($value)) {
$id = (int)$value;
$fileid = $id;
$realfileid = $id;
}
$gamequery = $con->prepare("SELECT id,name,description,creatorid,created,updated FROM `games` WHERE `id`= :id");
$gamequery->execute(['id' => $id]);
$game = $gamequery->fetch();
$itemquery = $con->prepare("SELECT * FROM `library` WHERE `id` = :id OR `fileid` = :fileid OR `realfileid` = :realfileid LIMIT 1");
$itemquery->execute(['id' => $id, 'fileid' => $fileid, 'realfileid' => $realfileid]);
$item = $itemquery->fetch();
if ($game['id'] == $id) {
header("Content-Type: application/json");
$gamename = $game['name'];
$gamedescription = $game['description'];
$gamecreatorid = $game['creatorid'];
$creatorquery = $con->prepare("SELECT * FROM `users` WHERE `id`= :id");
$creatorquery->execute(['id' => $gamecreatorid]);
$creators = $creatorquery->fetch();
$gamecreator = $creators['username'];
$itemcreated = date('Y-m-d\TH:i:s.u\Z', $game['created']);
$itemupdated = date('Y-m-d\TH:i:s.u\Z', $game['updated']);
$itemrobux = $game['Robux'];
$itemtickets = $game['Tickets'];
$itemsale = 0;
if($game['offsale'] == 0){
$itemonsale = true;
}else{
$itemonsale = false;
}
if($game['limited'] == 1){
$itemlimited = true;
}else{
$itemlimited = false;
}
$data = array(
"TargetId" => $id,
"ProductType" => "User Product",
"AssetId" => $id,
"ProductId" => $id,
"Name" => $gamename,
"Description" => $gamedescription,
"AssetTypeId" => 9,
"Creator" => array(
"Id" => $gamecreatorid,
"Name" => $gamecreator,
"CreatorType" => "User",
"CreatorTargetId" => $gamecreatorid,
"HasVerifiedBadge" => true
),
"IconImageAssetId" => $id,
"Created" => $itemcreated,
"Updated" => $itemupdated,
"PriceInRobux" => $itemrobux,
"PriceInTickets" => $itemtickets,
"Sales" => $itemsale,
"IsNew" => false,
"IsForSale" => false,
"IsPublicDomain" => false,
"IsLimited" => $itemlimited,
"IsLimitedUnique" => false,
"Remaining" => null,
"MinimumMembershipLevel" => 0,
"ContentRatingTypeId" => 0,
"SaleAvailabilityLocations" => null,
"SaleLocation" => null,
"CollectibleItemId" => null
);
$json = json_encode($data);
echo $json;
exit();
}
if ($item['id'] == $id || $item['fileid'] == $fileid || $item['realfileid'] == $realfileid) {
header("Content-Type: application/json");
$itemname = $item['name'];
$itemdescription = $item['description'];
$itemcreator = $item['creatorname'];
$itemcreatorid = $item['creatorid'];
$itemcreated = date('Y-m-d\TH:i:s.u\Z', $item['created']);
$itemupdated = date('Y-m-d\TH:i:s.u\Z', $item['updated']);
$itemrobux = $item['Robux'];
$itemtickets = $item['Tickets'];
$itemsale = $item['sold'];
if($item['offsale'] == 0){
$itemonsale = true;
}else{
$itemonsale = false;
}
if($item['limited'] == 1){
$itemlimited = true;
}else{
$itemlimited = false;
}
$names = array(
'Image' => 1,
'TShirt' => 2,
'Audio' => 3,
'Mesh' => 4,
'Lua' => 5,
'Hat' => 8,
'Place' => 9,
'Model' => 10,
'Shirt' => 11,
'Pants' => 12,
'Decal' => 13,
'Head' => 17,
'Face' => 18,
'Gear' => 19,
'Badge' => 21,
'Animation' => 24,
'Torso' => 27,
'RightArm' => 28,
'LeftArm' => 29,
'LeftLeg' => 30,
'RightLeg' => 31,
'Package' => 32,
'Gamepass' => 34,
'Plugin' => 38,
'Video' => 62
);
foreach ($names as $name => $number) {
if ($name == $item['type2']) {
$assetTypeId = $number;
break;
}
}
$data = array(
"TargetId" => $id,
"ProductType" => "User Product",
"AssetId" => $id,
"ProductId" => $id,
"Name" => $itemname,
"Description" => $itemdescription,
"AssetTypeId" => $assetTypeId,
"Creator" => array(
"Id" => $itemcreatorid,
"Name" => $itemcreator,
"CreatorType" => "User",
"CreatorTargetId" => $itemcreatorid,
"HasVerifiedBadge" => true
),
"IconImageAssetId" => $itemcreatorid,
"Created" => $itemcreated,
"Updated" => $itemupdated,
"PriceInRobux" => $itemrobux,
"PriceInTickets" => $itemtickets,
"Sales" => $itemsale,
"IsNew" => false,
"IsForSale" => $itemonsale,
"IsPublicDomain" => true,
"IsLimited" => $itemlimited,
"IsLimitedUnique" => false,
"Remaining" => null,
"MinimumMembershipLevel" => 0,
"ContentRatingTypeId" => 0,
"SaleAvailabilityLocations" => null,
"SaleLocation" => null,
"CollectibleItemId" => null
);
$json = json_encode($data);
echo $json;
exit();
}else{
header('Location: https://economy.roblox.com/v2/assets/'.$id.'/details');
exit;
}}
?>