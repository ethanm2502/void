<?php
require($_SERVER['DOCUMENT_ROOT'] . '/config/includes.php');
$usr = getUserData($con);

header('Content-Type: application/json; charset=UTF-8; X-Robots-Tag: noindex');

$url = "https://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
preg_match_all("/userId=([\-\d]+)/", $url, $matches);
$userid = (int)$matches[1][0];
$placeid = (int)$_GET["placeId"];

if ($userid == 0) {
    $userid = $usr['id'];
}

$userquery = $con->prepare("SELECT * FROM `avataritems` WHERE `userid` = :id AND `type` != 'Gear'");
$userquery->execute(['id' => $userid]);
$user = $userquery->fetchAll();
$accessories = [];

foreach ($user as $row) {
    $accessories[] = $row['itemid'];
}

if ($placeid == 0) {
    $gearuserquery = $con->prepare("SELECT * FROM `avataritems` WHERE `userid` = :id AND `type` = 'Gear'");
    $gearuserquery->execute(['id' => $userid]);
    $gearuser = $gearuserquery->fetchAll();
    $gearaccessories = [];

    foreach ($gearuser as $gearrow) {
        $gearaccessories[] = $gearrow['itemid'];
    }
}

$usrquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :userId");
$usrquery->execute(['userId' => $userid]);
$usr = $usrquery->fetch();

if ($usr['banned'] != 0) {
    echo json_encode(['success' => false]);
    die(http_response_code(403));
}

$head = $usr['HeadColor'];
$leftarm = $usr['LeftArmColor'];
$leftleg = $usr['LeftLegColor'];
$rightarm = $usr['RightArmColor'];
$rightleg = $usr['RightLegColor'];
$torso = $usr['TorsoColor'];

$gamequery = $con->prepare("SELECT id,version,AvatarType FROM `games` WHERE `id` = :gameid");
$gamequery->execute(['gameid' => $placeid]);
$game = $gamequery->fetch();

$AvatarType = ($usr['R15'] == 0) ? "R6" : "R15";

if ($game['AvatarType'] == "MorphToR6") {
    $AvatarType = "R6";
} elseif ($game['AvatarType'] == "MorphToR15") {
    $AvatarType = "R15";
}

$response = [
    'resolvedAvatarType' => $AvatarType,
    'accessoryVersionIds' => $accessories,
    'equippedGearVersionIds' => $gearaccessories,
    'backpackGearVersionIds' => $gearaccessories,
    'bodyColors' => [
        'HeadColor' => $head,
        'LeftArmColor' => $leftarm,
        'LeftLegColor' => $leftleg,
        'RightArmColor' => $rightarm,
        'RightLegColor' => $rightleg,
        'TorsoColor' => $torso
    ],
    'animations' => [],
    'scales' => [
        'Width' => $usr['width'],
        'Height' => $usr['height'],
        'Head' => $usr['head'],
        'Depth' => $usr['depth'],
        'Proportion' => $usr['proportion'],
        'BodyType' => $usr['bodytype']
    ]
];

if ($game['version'] == 2018) {
    echo json_encode($response);
} else {
    $response['bodyColorsUrl'] = "https://www.voidrev.us/Asset/BodyColors.ashx?userId=$userid";
    $response['animations']['Run'] = 969731563;
    echo json_encode($response);
}
?>