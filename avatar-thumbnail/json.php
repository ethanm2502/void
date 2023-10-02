<?php
require ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$userId = (int)$_GET['userId'];
?>
{"Url":"https://www.voidrev.us<?php echo getUserThumbnail($con,$userId);?>","Final":true,"SubstitutionType":0}