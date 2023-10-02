<?php
require ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
header('Content-Type: application/json; charset=UTF-8; X-Robots-Tag: noindex');
$PlayerId = (int)$_GET['PlayerId'];
$PlaceId = (int)$_GET['PlaceId'];
$receiptquery = $con->prepare("SELECT * FROM `devproduct` WHERE `PlayerId` = :PlayerId AND `placeId` = :placeId");
$receiptquery->execute(['PlayerId' => $PlayerId, 'placeId' => $PlaceId]);
$receipt = $receiptquery->fetch();
if(!is_array($receipt)){
echo "[]";
exit();
}
$receiptid = $receipt['receipt'];
$productId = $receipt['productId'];
$unitPrice = $receipt['unitPrice'];
$devproductid = $receipt['id'];
$sql = "DELETE FROM `devproduct` WHERE `id` = :devproductid";
$stmt = $con->prepare($sql);
$stmt->bindParam(':devproductid', $devproductid);
$stmt->execute();
?>
[
{
"playerId":<?=$PlayerId;?>,
"placeId":<?=$PlayerId;?>,
"receipt":"<?=$receiptid;?>",
"actionArgs":[
{
"Key":"productId",
"Value":"<?=$productId;?>"
},
{
"Key":"currencyTypeId",
"Value":"1"
},
{
"Key":"unitPrice",
"Value":"<?=$unitPrice;?>"
}
]
}
]