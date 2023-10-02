<?php
header("Content-Type: application/json; charset=utf-8");
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
if($_COOKIE['password'] || $_COOKIE['_ROBLOSECURITY']){
$password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['password' => $password, 'ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
if($usr != 0){
$logged = true;
}
}

$placeId = (int)$_GET['placeId'];

$badgequery = $con->prepare("SELECT * FROM `library` WHERE `type2` = 'Badge' AND `IsForGameId` = '$placeId' AND `offsale` = '0'");
$badgequery->execute();
$badges = $badgequery->fetchAll();
$badgeId = $badges['id'];
$totalItems = $badgequery->rowCount();

// Create a new array to hold the JSON data
$json_data = array();

// Populate the array with the necessary fields
$json_data['PlaceId'] = $placeId;
$json_data['totalItems'] = $totalItems;
$json_data['IsViewerPlaceOwner'] = false;

// Populate the "data" field using the fetchAll() function
$data = array();
foreach ($badges as $row) {
    $data[] = array(
        "PassID" => $row['id'],
        "PassName" => $row['name'],
        "TotalSales" => $row['sold'],
        "PriceInRobux" => $row['Robux'],
        "PriceInTickets" => null,
        "Description" => $row['description'],
        "UserOwns" => false,
        "PassItemURL" => "https://www.voidrev.us/library/?id=".$row['id']."",
        "ProductID" => $row['id'],
        "TotalUpVotes" => $row['likes'],
        "TotalDownVotes" => $row['dislikes'],
        "UserVote" => null,
        "TotalFavorites" => $row['favorites'],
        "IsFavoritedByUser" => false,
        "PlaceOwnerId" => $row['creatorid'],
        "PlaceOwnerName" => $row['creatorname']
    );
}
$json_data['data'] = $data;

// Encode the array into JSON format
$json_string = json_encode($json_data);

// Output the JSON string
echo $json_string;
?>
