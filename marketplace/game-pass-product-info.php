<?php
require ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
if(!empty($_GET['gamePassId']))
{
$id = (int)$_GET['gamePassId'];
$itemquery = $con->prepare("SELECT * FROM `library` WHERE `id`= '$id' OR `fileid` = '$id' AND `type2` = 'Gamepass'");
$itemquery->execute();
$item = $itemquery->fetch();
if (is_array($item)) {
header("Content-Type: application/json");
$itemname = $item['name'];
$itemdescription = $item['description'];
$itemcreator = $item['creatorname'];
$itemcreatorid = $item['creatorid'];
$itemcreated = $item['created'];
$itemupdated = $item['updated'];
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
$data = array(
'TargetId' => $id,
'ProductType' => 'Game Pass',
'AssetId' => $id,
'ProductId' => $id,
'Name' => $itemanme,
'Description' => $itemdescription,
'AssetTypeId' => 34,
'Creator' => array(
'Id' => $itemcreatorid,
'Name' => $itemcreator,
'CreatorType' => 'User',
'CreatorTargetId' => $itemcreatorid
),
'IconImageAssetId' => $id,
'Created' => '2017-06-15T06:08:22.447Z',
'Updated' => '2017-06-15T06:08:22.447Z',
'PriceInRobux' => $itemrobux,
'PriceInTickets' => null,
'Sales' => $itemsale,
'IsNew' => false,
'IsForSale' => $itemonsale,
'IsPublicDomain' => true,
'IsLimited' => false,
'IsLimitedUnique' => false,
'Remaining' => null,
'MinimumMembershipLevel' => 0
);
$json = json_encode($data);
echo $json;
exit();
}else{
header('Location: https://economy.roblox.com/v2/assets/'.$id.'/details');
exit;
}}
?>