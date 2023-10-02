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
if($usr['banned'] != 0){
echo json_encode(array('success' => false));
die(http_response_code(403));
}
$userId = $usr['id'];
$url = $_SERVER['REQUEST_URI'];
if (strpos($url, "game-thumbnails") !== false) {
header("Content-Type: application/json");
$usr = getUserData($con);
$uID = $usr['id'];
$queryString = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
$placeIds = array();
$parameters = explode('&', $queryString);
foreach ($parameters as $parameter) {
list($key, $value) = explode('=', $parameter);
if ($key === 'imageTokens') {
$placeIds[] = $value;
}
}
$gameData = [];
foreach ($placeIds as $placeId) {
// Assuming you have the necessary columns in your 'games' table
$decodedplaceId = urldecode($placeId);
$gameid = str_replace("s.png","",$decodedplaceId);
$gameid = (int)str_replace("/img/games/","",$gameid);
if(!file_exists($_SERVER['DOCUMENT_ROOT'].$decodedplaceId)){
$placeId = "/img/games/0s.png";
}
$gameItem = [
"final" => true,
"url" => "https://www.voidrev.us/v1/games/game-thumbnail?imageToken={$placeId}&height=50&width=50",
"cdnUrl" => "https://www.voidrev.us/img/games/{$gameid}s.png",
"retryToken" => null,
"universeId" => $gameid,
"placeId" => $gameid
];
$gameData[] = $gameItem;
}
echo json_encode($gameData, JSON_PRETTY_PRINT);
}elseif(strpos($url, "game-thumbnail") !== false){
$imageToken = urldecode($_GET['imageToken']);
header("Location: https://www.voidrev.us".$imageToken);
exit();
}elseif(strpos($url, "icons") !== false){
// yes i didnt rename shit im lazy ok
header("Content-Type: application/json");
$usr = getUserData($con);
$uID = $usr['id'];
if (strpos($_GET['universeIds'], ',') !== false) {
// Method 1: ?universeIds=1,2,3,4,5,6
$placeIds = explode(',', $_GET['universeIds']);
}else{
$queryString = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
$placeIds = array();
$parameters = explode('&', $queryString);
foreach ($parameters as $parameter) {
list($key, $value) = explode('=', $parameter);
if ($key === 'universeIds') {
$placeIds[] = $value;
}
}
}
$gameData = ["data" => []];
foreach ($placeIds as $placeId) {
$gameItem = [
"targetId" => (int)$placeId,
"state" => "Completed",
"imageUrl" => "https://www.voidrev.us".getPlaceIcon($con,$placeId),
];
$gameData["data"][] = $gameItem;
}
echo json_encode($gameData);

}elseif(strpos($url, "social-links") !== false){ 
    
echo json_encode(["data" => []]);
exit();

}elseif(strpos($url, "list") !== false){
header("Content-Type: application/json");
$maxRows = isset($_GET['maxRows']) ? $_GET['maxRows'] : 40;
$contextCountryRegionId = isset($_GET['contextCountryRegionId']) ? $_GET['contextCountryRegionId'] : 2;
$startRows = isset($_GET['startRows']) ? $_GET['startRows'] : 0;
$sortToken = isset($_GET['sortToken']) ? $_GET['sortToken'] : 0;
$sortPosition = isset($_GET['sortPosition']) ? $_GET['sortPosition'] : 0;
$usr = getUserData($con);
$uID = $usr['id'];
if($_GET['keyword']){
$keyword = filter_var($_GET['Keyword'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$gamequery = $con->prepare("SELECT id,name,version,creatorid,icon,description FROM `games` WHERE `name` LIKE :keyword LIMIT :limit");
$gamequery->execute(['keyword' => '%'.$keyword.'%', ':limit' => $maxRows]);
$games = $gamequery->fetchAll(PDO::FETCH_ASSOC);
}else{
if($sortToken == 0){
$stmt = $con->prepare("SELECT g.id, g.name, g.version, g.creatorid, g.icon, g.description, COALESCE(SUM(j.playercount), 0) as total_players, g.visits
FROM games g
LEFT JOIN jobs j ON g.id = j.placeId
GROUP BY g.id
ORDER BY total_players DESC, g.visits DESC
LIMIT :start,:limit");
$stmt->bindParam(':start', $startRows, PDO::PARAM_INT);
$stmt->bindParam(':limit', $maxRows, PDO::PARAM_INT);
}elseif($sortToken == 999){
$stmt = $con->prepare("SELECT * from `recentlyplayed` WHERE `playerid` = '$uID' ORDER BY id DESC LIMIT :start,:limit");
$stmt->bindParam(':start', $startRows, PDO::PARAM_INT);
$stmt->bindParam(':limit', $maxRows, PDO::PARAM_INT);
$stmt->execute();
}else{
$stmt = $con->prepare("SELECT id,name,version,creatorid,icon,description FROM `games` ORDER BY visits LIMIT :start,:limit");
$stmt->bindParam(':start', $startRows, PDO::PARAM_INT);
$stmt->bindParam(':limit', $maxRows, PDO::PARAM_INT);
$stmt->execute();
}
}
$games = $stmt->fetchAll(PDO::FETCH_ASSOC);
$response = [
"games" => [],
"suggestedKeyword" => $keyword,
"correctedKeyword" => $keyword,
"filteredKeyword" => $keyword,
"hasMoreRows" => true,
"nextPageExclusiveStartId" => 0,
"featuredSearchUniverseId" => 0,
"emphasis" => false,
"cutOffIndex" => 0,
"algorithm" => "string",
"algorithmQueryType" => "string",
"suggestionAlgorithm" => "string",
"relatedGames" => [],
"esDebugInfo" => []
];
foreach ($games as $game) {
if($sortToken == 999){
$stmt = $con->prepare("SELECT id,name,version,creatorid,icon,description FROM `games` WHERE id = :id");
$stmt->bindParam(':id', $game['gameid'], PDO::PARAM_INT);
$stmt->execute();
$game = $stmt->fetch(PDO::FETCH_ASSOC);
}
$gameid = $game['id'];
$creatorid = $game['creatorid'];
$creatorquery = $con->prepare("SELECT * FROM `users` WHERE `id`= :id");
$creatorquery->execute(['id' => $creatorid]);
$creator = $creatorquery->fetch();
$likequerycount = $con->prepare("SELECT * FROM `liked` WHERE `assetId` = :assetId AND `type` = 'like'");
$likequerycount->execute(['assetId' => $gameid]);
$likes = $likequerycount->rowCount();
$dislikequerycount = $con->prepare("SELECT * FROM `liked` WHERE `assetId` = :assetId AND `type` = 'dislike'");
$dislikequerycount->execute(['assetId' => $gameid]);
$dislikes = $dislikequerycount->rowCount();
$creatorname = $creator['username'];
$formatlikes = number_format($likes);
$formatdislikes = number_format($dislikes);
$icon = $game['icon'];
if (!file_exists($_SERVER['DOCUMENT_ROOT']."/img/games/".$icon."s.png")) {
$icon = 0;
}
$icondir = "/img/games/".$icon."s.png";
if($creator['Admin'] == 1){
$verified = true;
}else{
$verified = false;
}
if($game['featured'] == 1){
$featured = true;
}else{
$featured = false;
}
$response["games"][] = [
"creatorId" => $game['creatorid'],
"creatorName" => $creatorname,
"creatorType" => "User",
"creatorHasVerifiedBadge" => $verified,
"totalUpVotes" => $likes,
"totalDownVotes" => $dislikes,
"universeId" => $game['id'],
"name" => $game['name'],
"placeId" => $game['id'],
"playerCount" => getPlayerCount($gameid),
"imageToken" => $icondir,
"isSponsored" => $featured,
"nativeAdData" => "string",
"isShowSponsoredLabel" => $featured,
"price" => $game['price'],
"analyticsIdentifier" => "string",
"gameDescription" => $game['description'],
"genre" => "All",
"minimumAge" => 0,
"ageRecommendationDisplayName" => "string"
];
}
echo json_encode($response, JSON_PRETTY_PRINT);
}elseif(strpos($url, "multiget-place-details") !== false){
header("Content-Type: application/json");
$usr = getUserData($con);
$uID = $usr['id'];
$queryString = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
$placeIds = array();
$parameters = explode('&', $queryString);
foreach ($parameters as $parameter) {
list($key, $value) = explode('=', $parameter);
if ($key === 'placeIds') {
$placeIds[] = $value;
}
}
$gameData = [];
foreach ($placeIds as $placeId) {
$stmt = $con->prepare("SELECT id,creatorid,name,description,featured,price,active,icon FROM `games` WHERE `id` = :id");
$stmt->execute(['id' => $placeId]);
$game = $stmt->fetch(PDO::FETCH_ASSOC);
$stmt = $con->prepare("SELECT username FROM `users` WHERE `id` = :id");
$stmt->execute(['id' => $game['creatorid']]);
$user = $stmt->fetch(PDO::FETCH_ASSOC);
$creatorname = $user['username'];
$gameItem = [
"placeId" => $game['id'],
"name" => $game['name'],
"description" => $game['description'],
"sourceName" => $game['name'],
"sourceDescription" => $game['description'],
"url" => "https://www.voidrev.us/games/{$game['id']}/",
"builder" => $creatorname,
"builderId" => $game['creatorid'],
"hasVerifiedBadge" => ($game['featured'] == 1),
"isPlayable" => ($game['active'] == 1),
"reasonProhibited" => "None",
"universeId" => $game['id'],
"universeRootPlaceId" => $game['id'],
"price" => $game['price'],
"imageToken" => "/img/games/{$game['id']}s.png"
];
$gameData[] = $gameItem;
}
echo json_encode($gameData, JSON_PRETTY_PRINT);
}elseif(strpos($url, "multiget-playability-status") !== false){
header("Content-Type: application/json");
$queryString = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
$placeIds = array();
$parameters = explode('&', $queryString);
foreach ($parameters as $parameter) {
list($key, $value) = explode('=', $parameter);
if ($key === 'universeIds') {
$placeIds[] = $value;
}
}
$data = [];
foreach ($placeIds as $placeId) {
$placeId = (int)$placeId;
$stmt = $con->prepare("SELECT id,active FROM `games` WHERE `id` = :id");
$stmt->execute(['id' => $placeId]);
$game = $stmt->fetch(PDO::FETCH_ASSOC);
if($game['active'] == 0){
$status = "UniverseRootPlaceIsPrivate";
$playable = false;
}else{
$status = "Playable";
$playable = true;
}
$data[] = [
"playabilityStatus" => $status,
"isPlayable" => $playable,
"universeId" => $placeId
];
}
echo json_encode($data);
}elseif(strpos($url, "votes") !== false){
if(strpos($url, "user") !== false){
echo json_encode(["canVote" => false, "userVote" => null, "reasonForNotVoteable" => "AssetNotVoteable"]);
}
$decodedplaceId = urldecode($url);
$gameid = str_replace("/v1/games/","",$decodedplaceId);
$gameid = (int)str_replace("/votes","",$gameid);
$likequerycount = $con->prepare("SELECT * FROM `liked` WHERE `assetId` = :assetId AND `type` = 'like'");
$likequerycount->execute(['assetId' => $gameid]);
$likes = $likequerycount->rowCount();
$dislikequerycount = $con->prepare("SELECT * FROM `liked` WHERE `assetId` = :assetId AND `type` = 'dislike'");
$dislikequerycount->execute(['assetId' => $gameid]);
$dislikes = $dislikequerycount->rowCount();
echo json_encode(["id" => $gameid, "upVotes" => $likes, "downVotes" => $dislikes]);
}elseif(strpos($url, "favorites") !== false){
echo json_encode(["isFavorited" => false]);

}elseif(strpos($url, "recommendations") !== false){
    
echo json_encode(["games" => []]);
    
}elseif(strpos($url, "game-passes") !== false){
$json = [
    "previousPageCursor" => null,
    "nextPageCursor" => null,
    "data" => [],
];
echo json_encode($json);
}elseif(strpos($url, "sorts") !== false){
header("Content-Type: application/json");
if($_GET['gameSortsContext'] != "HomeSorts"){
echo'
{
"sorts": [
{
"token": "0",
"name": "Popular",
"displayName": "Popular",
"gameSetTypeId": 1,
"gameSetTargetId": null,
"timeOptionsAvailable": false,
"genreOptionsAvailable": true,
"numberOfRows": 1,
"numberOfGames": 0,
"isDefaultSort": false,
"contextUniverseId": null,
"contextCountryRegionId": 2,
"tokenExpiryInSeconds": 3600
},
{
"token": "1",
"name": "MyFavorite",
"displayName": "My Favorites",
"gameSetTypeId": 5,
"gameSetTargetId": null,
"timeOptionsAvailable": false,
"genreOptionsAvailable": false,
"numberOfRows": 1,
"numberOfGames": 0,
"isDefaultSort": false,
"contextUniverseId": null,
"contextCountryRegionId": 2,
"tokenExpiryInSeconds": 3600
},
{
"token": "2",
"name": "FriendActivity",
"displayName": "Friend Activity",
"gameSetTypeId": 17,
"gameSetTargetId": null,
"timeOptionsAvailable": false,
"genreOptionsAvailable": false,
"numberOfRows": 1,
"numberOfGames": 0,
"isDefaultSort": false,
"contextUniverseId": null,
"contextCountryRegionId": 2,
"tokenExpiryInSeconds": 3600
}
],
"timeFilters": [
{
"token": "0",
"name": "Now",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "PastDay",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "PastWeek",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "PastMonth",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "AllTime",
"tokenExpiryInSeconds": 3600
}
],
"genreFilters": [
{
"token": "0",
"name": "All",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Building",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Horror",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Town and City",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Military",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Comedy",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Medieval",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Adventure",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Sci-Fi",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Naval",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "FPS",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "RPG",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Sports",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Fighting",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Western",
"tokenExpiryInSeconds": 3600
}
],
"gameFilters": [
{
"token": "0",
"name": "Any",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Classic",
"tokenExpiryInSeconds": 3600
}
],
"pageContext": {
"pageId": "0",
"isSeeAllPage": null
},
"gameSortStyle": null
}';
}else{
echo'
{
"sorts": [
{
"token": "999",
"name": "MyRecent",
"displayName": "Recently Played",
"gameSetTypeId": 6,
"gameSetTargetId": null,
"timeOptionsAvailable": false,
"genreOptionsAvailable": false,
"numberOfRows": 1,
"numberOfGames": 0,
"isDefaultSort": false,
"contextUniverseId": null,
"contextCountryRegionId": 2,
"tokenExpiryInSeconds": 3600
}
],
"timeFilters": [
{
"token": "0",
"name": "Now",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "PastDay",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "PastWeek",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "PastMonth",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "AllTime",
"tokenExpiryInSeconds": 3600
}
],
"genreFilters": [
{
"token": "0",
"name": "All",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Building",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Horror",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Town and City",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Military",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Comedy",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Medieval",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Adventure",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Sci-Fi",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Naval",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "FPS",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "RPG",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Sports",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Fighting",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Western",
"tokenExpiryInSeconds": 3600
}
],
"gameFilters": [
{
"token": "0",
"name": "Any",
"tokenExpiryInSeconds": 3600
},
{
"token": "0",
"name": "Classic",
"tokenExpiryInSeconds": 3600
}
],
"pageContext": {
"pageId": "0",
"isSeeAllPage": null
},
"gameSortStyle": null
}';
}
}else{
header("Content-Type: application/json");
$universeId = (int)$_GET['universeIds'];
$usr = getUserData($con);
$uID = $usr['id'];
$stmt = $con->prepare("SELECT id, name, version, creatorid, icon, description, price, MaxPlayers, AvatarType, visits FROM `games` WHERE id = :id");
$stmt->bindParam(':id', $universeId, PDO::PARAM_INT);
$stmt->execute();
$games = $stmt->fetchAll(PDO::FETCH_ASSOC);
$response = [
"data" => []
];
foreach ($games as $game) {
$gameid = $game['id'];
$creatorid = $game['creatorid'];
$creatorquery = $con->prepare("SELECT * FROM `users` WHERE `id`= :id");
$creatorquery->execute(['id' => $creatorid]);
$creator = $creatorquery->fetch();
$likequerycount = $con->prepare("SELECT * FROM `liked` WHERE `assetId` = :assetId AND `type` = 'like'");
$likequerycount->execute(['assetId' => $gameid]);
$likes = $likequerycount->rowCount();
$dislikequerycount = $con->prepare("SELECT * FROM `liked` WHERE `assetId` = :assetId AND `type` = 'dislike'");
$dislikequerycount->execute(['assetId' => $gameid]);
$dislikes = $dislikequerycount->rowCount();
$creatorname = $creator['username'];
$formatlikes = number_format($likes);
$formatdislikes = number_format($dislikes);
$icon = $game['icon'];
if (!file_exists($_SERVER['DOCUMENT_ROOT']."/img/games/".$icon."s.png")) {
$icon = 0;
}
$icondir = "/img/games/".$icon."s.png";
if($creator['Admin'] == 1){
$verified = true;
}else{
$verified = false;
}
if($game['featured'] == 1){
$featured = true;
}else{
$featured = false;
}
$isFavorited = false;
$favoritedCount = 0;
$response["data"][] = [
"id" => $game['id'],
"rootPlaceId" => $game['id'],
"name" => $game['name'],
"description" => $game['description'],
"sourceName" => $game['name'],
"sourceDescription" => $game['description'],
"creator" => ["id" => $creatorid, "name" => $creatorname, "type" => "User", "isRNVAccount" => false],
"price" => $game['price'],
"allowedGearGenres" => [],
"allowedGearCategories" => [],
"isGenreEnforced" => true,
"copyingAllowed" => false,
"playing" => getPlayerCount($gameid),
"visits" => $game['visits'],
"maxPlayers" => $game['MaxPlayers'],
"created" => date('Y-m-d\TH:i:s.u\Z', $game['created']),
"updated" => date('Y-m-d\TH:i:s.u\Z', $game['updated']),
"studioAccessToApisAllowed" => true,
"createVipServersAllowed" => true,
"universeAvatarType" => $game['AvatarType'],
"Genre" => "All",
"isAllGenre" => true,
"isFavoritedByUser" => $isFavorited,
"favoritedCount" => $favoritedCount
];
}
echo json_encode($response, JSON_PRETTY_PRINT);
}