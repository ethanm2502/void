<?php
/*
require ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
//=======================================================================================================
// Create new webhook in your Discord channel settings and copy&paste URL
//=======================================================================================================
//=======================================================================================================
// Compose message. You can use Markdown
// Message Formatting -- https://discordapp.com/developers/docs/reference#message-formatting
//========================================================================================================
function sendMessage($type,$placeid,$uID,$con){
$webhookurl = "https://discord.com/api/webhooks/1058798758382542959/4I5trPgCBXlGtjh5SSG0eelxkKX7HTpX4d6DHfZUffNDtGYYfnIsGzf6UiP6t3VUBYgR";
if($type == "StartingServer"){
$userquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
$userquery->execute(['id' => $uID]);
$users = $userquery->fetch();
$username = $users['username'];
$gamequery = $con->prepare("SELECT id,name,icon,version FROM `games` WHERE `id` = :id");
$gamequery->execute(['id' => $placeid]);
$games = $gamequery->fetch();
$placename = $games['name'];
$icon = $games['icon'];
$version = $games['version'];
if(file_exists($_SERVER['DOCUMENT_ROOT']."/img/games/".$icon."b.png")){
$image = "https://www.voidrev.us/img/games/".$icon."b.png";
}else{
$image = "https://www.voidrev.us/place-thumbnails?placeId=".$placeid."";
}
$timestamp = date("c", strtotime("now"));
$json_data = json_encode([
// Message
"content" => "",
// Username
"username" => "Limbo Servers (Deprecated)",
// Avatar URL.
// Uncoment to replace image set in webhook
"avatar_url" => "https://www.voidrev.us/img/logo/logo_r.png",
// Text-to-speech
"tts" => false,
// File upload
// "file" => "",
// Embeds Array
"embeds" => [
[
// Embed Title
"title" => "rest in piss Server",
// Embed Type
"type" => "rich",
// Embed Description
"description" => "never forget limbo servers bot",
// URL of title link
"url" => "https://www.voidrev.us/games/place?id=".$placeid."",
// Timestamp of embed must be formatted as ISO8601
"timestamp" => $timestamp,
// Embed left border color in HEX
"color" => hexdec( "800000" ),
// Image to send
"image" => [
"url" => $image
],
]
]
], JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE );
$ch = curl_init( $webhookurl );
curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-type: application/json'));
curl_setopt( $ch, CURLOPT_POST, 1);
curl_setopt( $ch, CURLOPT_POSTFIELDS, $json_data);
curl_setopt( $ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt( $ch, CURLOPT_HEADER, 0);
curl_setopt( $ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1);
$response = curl_exec( $ch );
// If you need to debug, or find out why you can't send message uncomment line below, and execute script.
return $response;
curl_close( $ch );
}
}
*/
?>