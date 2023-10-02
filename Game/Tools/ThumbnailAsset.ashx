<?php
$assetid = $_GET['aid'];
if(isset($_GET['aid'])){
$jsonData = json_decode(file_get_contents('https://thumbnails.roblox.com/v1/assets?assetids='.$assetid.'&size=700x700&format=Png&isCircular=false'));
foreach ($jsonData->data as $jsonData) {
        header("Location: $jsonData->imageUrl");
}
}
//die(file_get_contents($_SERVER["DOCUMENT_ROOT"] . '/Thumbs/assetunknown.png'));
?>








