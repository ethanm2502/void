<?php include ($_SERVER['DOCUMENT_ROOT'].'/global.php');

$assetId = (int)$_GET['assetId'];

$itemquery = $con->prepare("SELECT * from `library` WHERE `id` = :id AND (`type` = 'item' OR `type` = 'item2') AND `creatorid` = :userId");
$itemquery->execute(['id' => $assetId, 'userId' => $uID]);
$items = $itemquery->fetch();
$offsale = $items['offsale'];

if($offsale == 0){
$sql = "UPDATE `library` SET `offsale` = '1' WHERE `id`='$assetId'";
$con->exec($sql);
header("Location: https://www.voidrev.us/library/?id=".$assetId."");
}else{
$sql = "UPDATE `library` SET `offsale` = '0' WHERE `id`='$assetId'";
$con->exec($sql);
header("Location: https://www.voidrev.us/library/?id=".$assetId."");
}
?>