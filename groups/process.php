<?php
$url = $_SERVER['REQUEST_URI'];
$url = substr($url,7);
$exploded = explode("/", $url);
$groupid = $exploded[0];
include ($_SERVER['DOCUMENT_ROOT'].'/groups/group.php');
?>