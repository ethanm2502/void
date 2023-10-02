<?php
include($_SERVER['DOCUMENT_ROOT']."/config/includes.php");
header('Content-Type: application/json; charset=UTF-8; X-Robots-Tag: noindex');
$id = getUserData($con)['id'];
?>
{
"count": <?php echo chatUnreadCount($id);?>
}