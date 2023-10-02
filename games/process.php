<?php
$url = $_SERVER['REQUEST_URI'];
$url = substr($url,7);
$exploded = explode("/", $url);
$getid = $exploded[0];
include ($_SERVER['DOCUMENT_ROOT'].'/games/place');
?>