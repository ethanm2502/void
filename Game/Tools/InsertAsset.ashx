<?php
if(isset($_GET['nsets'])){
$nsets = $_GET['nsets'];
$type = $_GET['type'];
if($nsets == 10){
readfile("https://sets.pizzaboxer.xyz/Game/Tools/InsertAsset.ashx?nsets=$nsets&type=$type");
exit();
}
if($nsets == 20){
$nsets = $_GET['nsets'];
$type = $_GET['type'];
$userid = $_GET['userid'];
readfile("https://sets.pizzaboxer.xyz/Game/Tools/InsertAsset.ashx?nsets=$nsets&type=$type&userid=$userid");
exit();
}
}else{
if(isset($_GET['sid'])){
$sid = $_GET['sid'];
readfile("https://sets.pizzaboxer.xyz/Game/Tools/InsertAsset.ashx?sid=$sid");
exit();
}
}