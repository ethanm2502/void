<?php
header("Content-Type: application/json");
$jsonArray = array(
"Url" => "ws://213.170.135.202:8443",
"ConnectionToken" => "token",
"ConnectionId" => "1",
"KeepAliveTimeout" => 20.0,
"DisconnectTimeout" => 30.0,
"ConnectionTimeout" => 110.0,
"TryWebSockets" => true,
"ProtocolVersion" => "1.4",
"TransportConnectTimeout" => 5.0,
"LongPollDelay" => 0.0
);
$jsonString = json_encode($jsonArray, JSON_PRETTY_PRINT);
echo $jsonString;
?>
