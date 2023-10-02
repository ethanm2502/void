<?php
require ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$usr = getUserData($con);
header('Content-Type: application/json; charset=UTF-8; X-Robots-Tag: noindex');
$url = "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
preg_match_all("/userId=([\-\d]+)/", $url, $matches);
$userid = (int)$matches[1][0];
$placeid = (int)$_GET["placeId"];
if ($userid == 0) {
$userid = $usr['id'];
}
if($usr['banned'] != 0){
echo json_encode(array('success' => false));
die(http_response_code(403));
}
$names = array(
'Image' => 1,
'TShirt' => 2,
'Audio' => 3,
'Mesh' => 4,
'Lua' => 5,
'Hat' => 8,
'Place' => 9,
'Model' => 10,
'Shirt' => 11,
'Pants' => 12,
'Decal' => 13,
'Head' => 17,
'Face' => 18,
'Gear' => 19,
'Badge' => 21,
'Animation' => 24,
'Torso' => 27,
'RightArm' => 28,
'LeftArm' => 29,
'LeftLeg' => 30,
'RightLeg' => 31,
'Package' => 8, // should be 32 but its broken if it is..
'Gamepass' => 34,
'Plugin' => 38,
'Video' => 62
);
$userquery = $con->prepare("SELECT * FROM `avataritems` WHERE `userid` = :id AND `type` != 'Gear'");
$userquery->execute(['id' => $userid]);
$user = $userquery->fetchAll();
$accessories = [];
foreach ($user as $row) {
$itemquery = $con->prepare("SELECT * FROM `library` WHERE `fileid` = :id");
$itemquery->execute(['id' => $row['itemid']]);
$item = $itemquery->fetch();
foreach ($names as $name => $number) {
if ($name == $item['type2']) {
$assetTypeId = $number;
break;
}
}
$accessories[] = ["assetId" => $row['itemid'], "assetTypeId" => $assetTypeId];
}
if ($placeid == 0 && isset($_GET['placeId'])) {
$gearuserquery = $con->prepare("SELECT * FROM `avataritems` WHERE `userid` = :id AND `type` = 'Gear'");
$gearuserquery->execute(['id' => $userid]);
$gearuser = $gearuserquery->fetchAll();
$gearaccessories = [];
foreach ($gearuser as $gearrow) {
$gearaccessories[] = ["assetId" => $gearrow['itemid'], "assetTypeId" => 19];
}
$accessories = array_merge($accessories, $gearaccessories);
}else{
$gearaccessories = [];
}
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :userId");
$usrquery->execute(['userId' => $userid]);
$usr = $usrquery->fetch();
$head = $usr['HeadColor'];
$torso = $usr['TorsoColor'];
$leftarm = $usr['LeftArmColor'];
$rightarm = $usr['RightArmColor'];
$leftleg = $usr['LeftLegColor'];
$rightleg = $usr['RightLegColor'];
if($usr['R15'] == 0){
$AvatarType = "R6";
}else{
$AvatarType = "R15";
}
if ($item['type2'] == 'Emote') {
        $emotes[] = [
            'assetId' => $item['fileid'],
            'assetName' => $item['name'],
            'position' => count($emotes) + 1,
        ];
}

if(empty($emotes)){
$emotes = [];
}

$response = [
"resolvedAvatarType" => $AvatarType,
"equippedGearVersionIds" => $gearaccessories,
"backpackGearVersionIds" => $gearaccessories,
"assetAndAssetTypeIds" => $accessories,
"animationAssetIds" => [], // Assuming this value is static
"bodyColors" => [
"headColorId" => $head,
"torsoColorId" => $torso,
"leftArmColorId" => $leftarm,
"rightArmColorId" => $rightarm,
"leftLegColorId" => $leftleg,
"rightLegColorId" => $rightleg
],
"scales" => [
"height" => $usr['height'],
"width" => $usr['width'],
"head" => $usr['head'],
"depth" => $usr['depth'],
"proportion" => $usr['proportion'],
"bodyType" => $usr['bodytype']
],
"emotes" => $emotes
];
echo json_encode($response);
?>
