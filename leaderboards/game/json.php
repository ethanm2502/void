<?php header("Content-Type: application/json");
require ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$getid = (int)$_GET['distributorTargetId'];
$StartValue = (int)$_GET['startIndex'];
$MaxValue = (int)$_GET['max'];
?>
[<?php
$pointquery = $con->prepare("SELECT * FROM `points` WHERE `placeId`= :placeId ORDER BY amount DESC LIMIT $StartValue,$MaxValue");
$pointquery->execute(['placeId' => $getid]);
$gamecountquery = $con->prepare("SELECT * FROM `points` WHERE `placeId`= :placeId ORDER BY amount DESC LIMIT $StartValue,$MaxValue");
$gamecountquery->execute(['placeId' => $getid]);
$pointrowcount = $gamecountquery->rowCount();
$comma = 0;
$countedrank = 0;
while($points = $pointquery->fetch()) {
$countedrank = $countedrank + $StartValue + 1;
$pointcount = $points['amount']; $userId = $points['userId']; $comma = $comma + 1; $usrquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id"); $usrquery->execute(['id' => $userId]); $usr = $usrquery->fetch();
if ($pointcount < 10000) {
// Anything less than a thousand
$Point_Format = number_format($pointcount);
} elseif ($pointcount < 1000000) {
// Anything less than a million
$Point_Format = number_format($pointcount / 10000, 1) . 'K';
} else if ($pointcount < 1000000000) {
// Anything less than a billion
$Point_Format = number_format($pointcount / 1000000, 1) . 'M';
} else {
// At least a billion
$Point_Format = number_format($pointcount / 1000000000, 1) . 'B';
}
?>{"Rank":<?=$countedrank;?>,"DisplayRank":"<?=$countedrank;?>","FullRank":null,"WasRankTruncated":false,"Name":"<?echo NoXSSPlz($usr['username']);?>","UserId":<?=$usr['id'];?>,"TargetId":<?=$usr['id'];?>,"ProfileUri":"https://www.voidrev.us/users/<?=$usr['id'];?>/profile","ClanName":null,"ClanUri":null,"Points":<?=$pointcount;?>,"DisplayPoints":"<?=$Point_Format;?>","FullPoints":"<?=number_format($pointcount);?>","WasPointsTruncated":true,"ClanEmblemID":0,"UserImageUri":"https://www.voidrev.us/headshot-thumbnails?userId=<?=$usr['id'];?>","UserImageFinal":true,"ClanImageUri":"","ClanImageFinal":false}<?php if($comma != $pointrowcount){echo",";} } ?>]