<?php
$parameter = $_SERVER['QUERY_STRING'];
header("Location: https://realtime.roblox.com/notifications/signalr/negotiate?".$parameter."");
?>