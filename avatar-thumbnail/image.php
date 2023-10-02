<?php
require ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$userId = (int)$_GET['userId'];
try{
header("Content-Type: image/png");
readfile($_SERVER['DOCUMENT_ROOT'].getUserThumbnail($con,$userId));
}catch(Throwable $e){
header("Content-Type: text/plain");
die($e);
}
?>