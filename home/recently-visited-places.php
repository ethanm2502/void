<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
header("Content-Type: application/json");
if (isset($_COOKIE['password']) || isset($_COOKIE['_ROBLOSECURITY'])) {
$password = urldecode($_COOKIE['password']);
$roblosec = urldecode($_COOKIE['_ROBLOSECURITY']);
$stmt = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :roblosec");
$stmt->bindParam(':password', $password);
$stmt->bindParam(':roblosec', $roblosec);
$stmt->execute();
$usr = $stmt->fetch(PDO::FETCH_ASSOC);
if ($usr) {
$logged = true;
$uID = $usr['id'];
}else{
$logged = false;
http_response_code(403);
exit();
}
}else{
http_response_code(403);
exit();
}
$stmt = $con->prepare("SELECT * from `recentlyplayed` WHERE `playerid` = '$uID' ORDER BY id DESC LIMIT 6");
// okay we setup category shit so now execute!
$stmt->execute();
$itemcount = $stmt->rowCount();
/*
{"IsValid":true,"Data":{"GameDisplayModels":[{"CreatorID":0,"CreatorName":"Roblox","CreatorAbsoluteUrl":"https://www.roblox.com/users/1/profile/","Plays":9279353,"Price":0,"ProductID":0,"IsOwned":false,"IsVotingEnabled":true,"TotalUpVotes":48149,"TotalDownVotes":7221,"TotalBought":0,"UniverseID":13058,"HasErrorOcurred":false,"Favorites":0,"Description":null,"HideGameCardInfo":false,"GameDetailReferralUrl":"https://www.roblox.com/games/refer?SortFilter=5\u0026PlaceId=1818\u0026Position=1\u0026PageType=Home","Thumbnail":{"Final":true,"Url":"https://tr.rbxcdn.com/884238a6cd05e1e9962c1059e92f5ae7/150/150/Image/Jpeg","RetryUrl":null,"UserId":0,"EndpointType":"Avatar"},"UseDataSrc":false,"IsAsyncThumbnailEnabled":false,"GamePageResources":null,"Name":"Classic: Crossroads","PlaceID":1818,"PlayerCount":14,"ImageId":0}],"GamePageResources":null,"LabelPlayingPhraseJs":"{playerCount} Visiting","LabelCreatorByJs":"By {creatorLink}","HideGameCardInfo":false}}
*/
// create an empty array to hold the items
$items = array();
$data = array(
"ShowSmallGameIcon" => true,
"LabelCreatorByJs" => "By {creatorLink}",
"LabelPlayingPhraseJs" => "{playerCount} Playing",
"Data" => array(
"GameDisplayModels" => array(
),
)
);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
foreach ($rows as $row) {
$game = $con->prepare("SELECT id,name,icon,visits,creatorid,description FROM games WHERE `id` = :id");
$game->execute(['id' => $row['gameid']]);
$gamerow = $game->fetch();
$likequerycount = $con->prepare("SELECT * FROM `liked` WHERE `assetId` = :assetId AND `type` = 'like'");
$likequerycount->execute(['assetId' => $gamerow['id']]);
$likes = $likequerycount->rowCount();
$dislikequerycount = $con->prepare("SELECT * FROM `liked` WHERE `assetId` = :assetId AND `type` = 'dislike'");
$dislikequerycount->execute(['assetId' => $gamerow['id']]);
$dislikes = $dislikequerycount->rowCount();
$favequerycount = $con->prepare("SELECT * FROM `faves` WHERE `assetID` = :assetId AND `userID` = '$uID'");
$favequerycount->execute(['assetId' => $gamerow['id']]);
$faves = $favequerycount->rowCount();
$icon = $gamerow['icon'];
$creatorquery = $con->prepare("SELECT * FROM users WHERE `id` = :id");
$creatorquery->execute(['id' => $gamerow['creatorid']]);
$creator = $creatorquery->fetch();
$icondir = $_SERVER['DOCUMENT_ROOT']."/img/games/".$icon."s.png";
if (!file_exists($icondir)) {
$icon = 0;
}
$playingquery = $con->prepare("SELECT * FROM `jobs` WHERE `placeId`= :placeId");
$playingquery->execute(['placeId' => $gamerow['id']]);
$playercount = 0;
while($playingarray = $playingquery->fetch()) {
$dbplayercount = $playercount + $playingarray['playercount'];
$timediff = time() - $playingarray['lastpingtime'];
$jobid = $playingarray['id'];
if($timediff < 60){
// Do nothing, server is fine.
} else {
$sql = "DELETE FROM `jobs` WHERE `id` = '$jobid'";
$con->exec($sql);
if($playingarray['type'] == 2016){
rccStop($serviceport);
}else{
rccStop2018($serviceport);
}
$dbplayercount = 0;
}
if(is_array($playingarray)){
$playercount = $dbplayercount;
}else{
$playercount = 0;
}
}
$item = array(
"CreatorID" => $gamerow['creatorid'],
"CreatorName" => $creator['username'],
"CreatorAbsoluteUrl" => "https://www.voidrev.us/users/".$gamerow['creatorid']."/profile/",
"Plays" => $gamerow['visits'],
"Price" => 0,
"ProductID" => 0,
"IsOwned" => false,
"IsVotingEnabled" => true,
"TotalUpVotes" => $likes,
"TotalDownVotes" => $dislikes,
"TotalBought" => 0,
"UniverseID" => $gamerow['id'],
"HasErrorOcurred" => false,
"Favorites" => $faves,
"Description" => $gamerow['description'],
"HideGameCardInfo" => false,
"GameDetailReferralUrl" => "https://www.voidrev.us/games/".$gamerow['id']."/",
"Thumbnail" => array(
"Final" => true,
"Url" => "https://www.voidrev.us/img/games/".$icon."s.png",
"RetryUrl" => null,
"UserId" => 1,
"EndpointType" => "Avatar"
),
"UseDataSrc" => false,
"IsAsyncThumbnailEnabled" => false,
"GamePageResources" => null,
"Name" => $gamerow['name'],
"PlaceID" => $gamerow['id'],
"PlayerCount" => $playercount,
"ImageId" => 0
);
array_push($data['Data']['GameDisplayModels'], $item);
}
// encode the $data array into JSON and output it
$json = json_encode($data);
echo $json;
