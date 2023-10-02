<?php
header("Content-Type: application/json");
$placeId = (int)$_GET['placeId'];
include_once ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
include_once ($_SERVER['DOCUMENT_ROOT'].'/SOAP.php');
$usr = getUserData($con);
$uID = $usr['id'];
$gamequery = $con->prepare("SELECT id FROM `games` WHERE `id` = :id");
$gamequery->execute(['id' => $placeId]);
$placegamequery = $con->prepare("SELECT id,creatorid,MaxPlayers FROM `games` WHERE `id` = :id");
$placegamequery->execute(['id' => $placeId]);
$placegames = $placegamequery->fetch();
$MaxPlayers = $placegames['MaxPlayers'];
$IsCreator = ($placegames['creatorid'] == $uID) ? true : false;
class Udp {
public static function isUp($p_host, $p_port_number) {
$starttime = microtime(true);
$socket = fsockopen("udp://" . trim($p_host), trim($p_port_number));
$stoptime = microtime(true);
if (!$socket) {
return false;
}
$status = ($stoptime - $starttime) * 1000;
return $status;
}
}
$settingquery = $con->prepare("SELECT * FROM `settings`");
$settingquery->execute();
$settings = $settingquery->fetch();
$serverip = $settings['serverip'];
$playingquery = $con->prepare("SELECT count(*) FROM `users` WHERE `InGameId`= :InGameId AND `clientstatus`='InGame' AND `online`='1'");
$playingquery->execute(['InGameId' => $placeId]);
$playercount = $playingquery->fetchColumn();
$jobsquery = $con->prepare("SELECT * FROM `jobs` WHERE `placeId` = :placeId AND `active` = '1'");
$jobsquery->execute(['placeId' => $placeId]);
$jobscountquery = $con->prepare("SELECT count(*) FROM `jobs` WHERE `placeId` = :placeId AND `active` = '1'");
$jobscountquery->execute(['placeId' => $placeId]);
$jobscount = $jobscountquery->fetchColumn();
$json = [
"PlaceId" => $placeId,
"ShowShutdownAllButton" => $IsCreator,
"Collection" => []
];
while($jobs = $jobsquery->fetch()) {
$serviceport = $jobs['serviceport'];
if (!empty($jobs['players'])) {
$users = explode(',', $jobs['players']);
} else {
$users = [];
}
$gameData = [
"Capacity" => $MaxPlayers,
"Ping" => Udp::isUp($serverip, $jobs['port']),
"Fps" => json_decode(getServerFPS($jobs['id'], $serviceport), true)['Value'],
"ShowSlowGameMessage" => ($jobs['FPS'] < 20),
"Guid" => "",
"PlaceId" => $placeId,
"CurrentPlayers" => []
];
foreach ($users as $username) {
$onlinequery = $con->prepare("SELECT * FROM `users` WHERE `username` = :username");
$onlinequery->execute(['username' => $username]);
$ingame = $onlinequery->fetch();
if (is_array($ingame)) {
$gameData["CurrentPlayers"][] = [
"Id" => $ingame['id'],
"Username" => NoXSSPlz($ingame['username']),
"Thumbnail" => [
"AssetId" => 0,
"AssetHash" => null,
"AssetTypeId" => 0,
"Url" => "https://www.voidrev.us".getUserThumbnail($con,$ingame['id']),
"IsFinal" => true
]
];
}
}
$json["Collection"][] = $gameData;
}
$json["TotalCollectionSize"] = 1;
echo json_encode($json);
?>