<?php
$_SERVER['DOCUMENT_ROOT'] = 'C:\wamp64\www';
try{
if (!isset($_GET['assetId']) && !isset($_GET['assetid']) && !isset($_GET['universeId'])) {
$getid = (int)$_SERVER['argv'][1];
} else {
$getid = isset($_GET['assetId']) ? (int)$_GET['assetId'] : (isset($_GET['assetid']) ? (int)$_GET['assetid'] : (int)$_GET['universeId']);
}
include_once($_SERVER['DOCUMENT_ROOT']."/SOAP.php");
$query = $con->prepare('SELECT * FROM library WHERE id=:id or fileid=:fileid');
$query->bindParam(':id', $getid);
$query->bindParam(':fileid', $getid);
$query->execute();
$game = $query->fetch();
if(is_array($game)){
header("Content-Type: image/png");
$thumb = $game['thumbnailhash'];
$getid = $game['fileid'];
if($game['type2'] == "Face"){
readfile($_SERVER['DOCUMENT_ROOT']."/asset/assets/".$game['realfileid']);
exit();
}
if($game['type2'] == "Sound"){
readfile($_SERVER['DOCUMENT_ROOT']."/img/catalog/3.png");
exit();
}
if($game['type2'] == "Decal"){
readfile($_SERVER['DOCUMENT_ROOT']."/asset/assets/".$game['realfileid']);
exit();
}
if($game['type2'] == "Gamepass"){
readfile($_SERVER['DOCUMENT_ROOT']."/asset/assets/".$game['fileid']);
exit();
}
if($game['type2'] == "Badge"){
readfile($_SERVER['DOCUMENT_ROOT']."/asset/assets/".$game['fileid']);
exit();
}
if(!file_exists($_SERVER['DOCUMENT_ROOT']."/thumbnails/".$thumb.".png")){
readfile($_SERVER['DOCUMENT_ROOT'].catthumbnail($getid,$game['type2']));
}else{
readfile($_SERVER['DOCUMENT_ROOT']."/thumbnails/".$thumb.".png");
}
}else{
$ch = curl_init();
$url = "https://thumbnails.roblox.com/v1/assets?assetIds=" . $getid . "&returnPolicy=PlaceHolder&size=512x512&format=Png&isCircular=false";
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$response = curl_exec($ch);
if (curl_errno($ch)) {
header("Content-Type: text/plain");
http_response_code(403);
echo 'Curl error: ' . curl_error($ch);
}
curl_close($ch);
$json = json_decode($response, true);
if(!isset($json['data'])){
header("Content-Type: text/plain");
http_response_code(500);
exit();
}
header("Location: " . $json['data'][0]['imageUrl']);
}
}catch(Exception $e){
header("Content-Type: text/plain");
http_response_code(500);
echo $e;
}