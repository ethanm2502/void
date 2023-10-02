<?php
include($_SERVER['DOCUMENT_ROOT'] . '/config/includes.php');
header("Content-Type: application/json");

$logged = false;

if (isset($_COOKIE['username']) && isset($_COOKIE['password'])) {
    $username = filter_var($_COOKIE['username'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
    $password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
    $roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);

    $usrquery = $con->prepare("SELECT * FROM `users` WHERE (`username` = :username AND `password` = :password) OR `ROBLOSECURITY` = :ROBLOSECURITY");
    $usrquery->execute(['username' => $username, 'password' => $password, 'ROBLOSECURITY' => $roblosec]);
    $usr = $usrquery->fetch();

    if ($usr) {
        $logged = true;
    }
}

$timey = time();
$IsAdmin = ($usr['Admin'] == 1) ? 'true' : 'false';

$id = (int)$_GET['assetId'];
$startindex = (int)$_GET['startindex'];
$endindex = $startindex + 12;

$commentquery = $con->prepare("SELECT * FROM `comments` WHERE `assetId` = :assetId ORDER BY timestamp DESC LIMIT $startindex, $endindex");
$commentquery->execute(['assetId' => $id]);

$output = [
    "IsUserModerator" => $IsAdmin,
    "Comments" => []
];

while ($comments = $commentquery->fetch()) {
    $playerId = $comments['playerId'];
    
    $commentuquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
    $commentuquery->execute(['id' => $playerId]);
    $commentu = $commentuquery->fetch();

    if (is_array($commentu)) {
        $commentData = [
            "Id" => $id,
            "PostedDate" => $comments['timestamp'],
            "AuthorName" => $commentu['username'],
            "AuthorId" => $commentu['id'],
            "Text" => $comments['text'],
            "ShowAuthorOwnsAsset" => true,
            "AuthorThumbnail" => [
                "AssetId" => 0,
                "AssetHash" => null,
                "AssetTypeId" => 0,
                "Url" => "https://www.voidrev.us".getUserHeadshotThumbnail($con,$playerId),
                "IsFinal" => true
            ]
        ];

        $output["Comments"][] = $commentData;
    }
}

$output["MaxRows"] = 12;

echo json_encode($output);
?>
