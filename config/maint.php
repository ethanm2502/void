<?php
$offline = false;
if($offline){
if($_COOKIE['BypassMaintenance'] != "lois"){
header("Location: https://www.voidrev.us/maintenance");
exit;
}
}
?>
