<?php
// Init chat filter, and get visitor ip for rate limiting.
include($_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php');
use Snipe\BanBuilder\CensorWords;
$censor = new CensorWords;
session_start();
include($_SERVER['DOCUMENT_ROOT'] . '/Classes/ratelimiter.php');
function getUserIP()
{
// Get real visitor IP behind CloudFlare network
if (isset($_SERVER["HTTP_CF_CONNECTING_IP"])) {
$_SERVER['REMOTE_ADDR'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
$_SERVER['HTTP_CLIENT_IP'] = $_SERVER["HTTP_CF_CONNECTING_IP"];
}
$client = @$_SERVER['HTTP_CLIENT_IP'];
$forward = @$_SERVER['HTTP_X_FORWARDED_FOR'];
$remote = $_SERVER['REMOTE_ADDR'];
if (filter_var($client, FILTER_VALIDATE_IP)) {
$ip = $client;
} elseif (filter_var($forward, FILTER_VALIDATE_IP)) {
$ip = $forward;
} else {
$ip = $remote;
}
return $ip;
}
// in this sample, we are using the originating IP, but you can modify to use API keys, or tokens or what-have-you.
$rateLimiter = new RateLimiter(getUserIP());
$limit = 5; // number of connections to limit user to per $minutes
$minutes = 1; // number of $minutes to check for.
$seconds = floor($minutes * 60); // retry after $minutes in seconds.
try {
$rateLimiter->limitRequestsInMinutes($limit, $minutes);
} catch (RateExceededException $e) {
header("HTTP/1.1 429 Too Many Requests");
header(sprintf("Retry-After: %d", $seconds));
$data = "Rate Limit Exceeded, please wait for 60 seconds.";
die($data);
}
include($_SERVER['DOCUMENT_ROOT'] . '/config/includes.php');
$logged = false;
if ($_COOKIE['password'] || $_COOKIE['_ROBLOSECURITY']) {
$password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['password' => $password, 'ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
if ($usr != 0) {
$logged = true;
}
}
// Check if user is used an invite key
if ($usr['activated'] == 0) {
die("Bad Request");
}
if ($usr['banned'] != 0) {
http_response_code(403);
die("Bad Request");
}
function getFreeId(){
global $con;
// Get the maximum value from the library table
$libraryQuery = $con->prepare("SELECT MAX(id) AS max_id FROM library");
$libraryQuery->execute();
$libraryMaxId = $libraryQuery->fetch(PDO::FETCH_ASSOC)['max_id'];
// Get the maximum value from the games table
$gamesQuery = $con->prepare("SELECT MAX(id) AS max_id FROM games");
$gamesQuery->execute();
$gamesMaxId = $gamesQuery->fetch(PDO::FETCH_ASSOC)['max_id'];
// Find the maximum of the two maximum values
$maxId = max($libraryMaxId, $gamesMaxId);
// Increment the maximum value until no rows exist in library or games with that id
$nextId = $maxId + 1;
while (true) {
$libraryCheckQuery = $con->prepare("SELECT COUNT(*) AS count FROM library WHERE id = :id OR fileid = :fileid OR realfileid = :realfileid");
$libraryCheckQuery->execute(array(':id' => $nextId, ':fileid' => $nextId, ':realfileid' => $nextId));
$libraryCount = $libraryCheckQuery->fetch(PDO::FETCH_ASSOC)['count'];
$gamesCheckQuery = $con->prepare("SELECT COUNT(*) AS count FROM games WHERE id = :id");
$gamesCheckQuery->execute(array(':id' => $nextId));
$gamesCount = $gamesCheckQuery->fetch(PDO::FETCH_ASSOC)['count'];
if ($libraryCount == 0 && $gamesCount == 0) {
// No rows found in both library and games, use $nextId as the new ID
break;
}
$nextId++;
}
return $nextId;
}
$timey = time();
$uID = $usr['id'];
$username = $usr['username'];
$ExperimentalTheme = $usr['ExperimentalTheme'];
// Get name, description, asssetid, limited, file size etc, and any string being filtered.
$name = filter_var($_POST['name'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$name = $censor->censorString($name)['clean'];
$checkboxlim = filter_var($_POST['checkbox'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$assettypeid = (int)$_POST['assetTypeId'];
$imageFileType = strtolower(pathinfo($_FILES['file']['name'], PATHINFO_EXTENSION));
if ($_FILES["file"]["size"] > 31457280) {
echo "Sorry, your file is too large, the file size limit is 30MB.";
exit();
}
if ($_FILES['file']['error'] == 4 || ($_FILES['file']['size'] == 0 && $_FILES['file']['error'] == 0)) {
die("No file!");
}
if (empty($name)) {
die("Provide a name!");
}
if(strlen($_REQUEST['name']) >= 30){
die("Name too long");
}
if(strlen($_REQUEST['description']) >= 50){
die("Description too long");
}
if ($assettypeid == 1) {
$assettype = filter_var($_POST['game'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$name = filter_var($_POST['name'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$name = $censor->censorString($name)['clean'];
$imageType = (int)$_POST['imageType'];
$gamefile = file_get_contents($_FILES['file']['tmp_name']);
$assetId = (int)$_POST['assetId'];
if (empty($assetId)) {
die("Provide a id!");
}
if ($imageFileType != "png") {
echo "Sorry, only PNG files are allowed.";
exit();
}
$libquery = $con->prepare("SELECT * FROM `library` WHERE `id` = :id");
$libquery->execute(['id' => $assetId]);
$lib = $libquery->fetch();
$gamequery = $con->prepare("SELECT id FROM `games` WHERE `id` = :id");
$gamequery->execute(['id' => $assetId]);
$game = $gamequery->fetch();
if ($assettype == "true") {
$assettype = "Game";
} else {
$assettype = "Library";
}
if ($assettype == "Game") {
if (!is_array($game)) {
die("The asset does not exist!");
}
} elseif ($assettype == "Library") {
if (!is_array($lib)) {
die("The asset does not exist!");
} else {
die("The asset does not exist!");
}
} else {
die("Unknown Error");
}
$robux = (int)$_POST['robux'];
$robux = 15;
/*
if ($robux <= 0) {
$robux = 0;
}
$robux = max(0, $robux);
if($robux < 15){
die("You must put as a minimum 15 Robux!");
}
*/
if ($usr['Robux'] < $robux) {
die("You do not have enough Robux for this request.");
}
$date = time();
function guidv4($data = null)
{
// Generate 16 bytes (128 bits) of random data or use the data passed into the function.
$data = $data ?? random_bytes(16);
assert(strlen($data) == 16);
// Set version to 0100
$data[6] = chr(ord($data[6]) & 0x0f | 0x40);
// Set bits 6-7 to 10
$data[8] = chr(ord($data[8]) & 0x3f | 0x80);
// Output the 36 character UUID.
return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
}
$identifier = guidv4();
try {
$sql2 = "INSERT INTO `ads` (`name`, `creatorid`, `assetId`, `robuxspent`, `active`, `imageType`, `assetType`, `randident`) VALUES (:name, :creatorid, :assetId, :robuxspent, :active, :imageType, :assetType, :randident)";
$stmt = $con->prepare($sql2);
$stmt->execute(array(':name' => $name, ':creatorid' => $uID, ':assetId' => $assetId, ':robuxspent' => $robux, ':active' => 1, ':imageType' => $imageType, ':assetType' => $assettype, ':randident' => $identifier));
} catch (Throwable $e) {
echo $e;
exit();
}
$adquery = $con->prepare("SELECT * FROM `ads` WHERE `randident` = '$identifier' ORDER BY id DESC");
$adquery->execute();
$ads = $adquery->fetch();
$adId = $ads['id'];
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/img/ads/" . $identifier . ".png";
if (!file_exists($_SERVER["DOCUMENT_ROOT"] . "/img/ads/" . $identifier . "")) {
file_put_contents($FileToSave, $gamefile);
}
$FinalRobux = $usr['Robux'] - 15;
$userupdate = "UPDATE `users` SET `Robux` = :finalRobux WHERE `id` = :uID";
$stmt = $con->prepare($userupdate);
$stmt->bindValue(':finalRobux', $FinalRobux, PDO::PARAM_INT);
$stmt->bindValue(':uID', $uID, PDO::PARAM_INT);
$stmt->execute();
} else {
//echo"uh oh this shouldnt happen";
}
if ($assettypeid == 62) {
$assettype = filter_var($_POST['game'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$name = filter_var($_POST['name'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$name = $censor->censorString($name)['clean'];
$gamefile = file_get_contents($_FILES['file']['tmp_name']);
$assetId = (int)$_POST['assetId'];
if (empty($name)) {
die("Provide a name!");
}
if (empty($assetId)) {
die("Provide a name!");
}
if ($_FILES['file']['error'] == 4 || ($_FILES['file']['size'] == 0 && $_FILES['file']['error'] == 0)) {
die("No file!");
}
if ($imageFileType != "mp4") {
echo "Sorry, only mp4 files are allowed.";
exit();
}
$libquery = $con->prepare("SELECT * FROM `library` WHERE `id` = :id");
$libquery->execute(['id' => $assetId]);
$lib = $libquery->fetch();
$gamequery = $con->prepare("SELECT id FROM `games` WHERE `id` = :id");
$gamequery->execute(['id' => $assetId]);
$game = $gamequery->fetch();
if ($assettype == "true") {
$assettype = "Game";
} else {
$assettype = "Library";
}
if ($assettype == "Game") {
if (!is_array($game)) {
die("The asset does not exist!");
}
} elseif ($assettype == "Library") {
if (!is_array($lib)) {
die("The asset does not exist!");
} else {
die("The asset does not exist!");
}
} else {
die("Unknown Error");
}
$robux = (int)$_POST['robux'];
$robux = 15;
/*
if ($robux <= 0) {
$robux = 0;
}
$robux = max(0, $robux);
if($robux < 15){
die("You must put as a minimum 15 Robux!");
}
*/
if ($usr['Robux'] < $robux) {
die("You do not have enough Robux for this request.");
}
$date = time();
try {
$sql2 = "INSERT INTO `videoads` (`name`, `creatorid`, `assetId`, `active`, `assetType`) VALUES (:name, :creatorid, :assetId, :active, :assetType)";
$stmt = $con->prepare($sql2);
$stmt->execute(array(':name' => $name, ':creatorid' => $uID, ':assetId' => $assetId, ':active' => 1, ':assetType' => $assettype));
} catch (Throwable $e) {
echo $e;
exit();
}
$adquery = $con->prepare("SELECT * FROM `videoads` WHERE `creatorid` = '$uID' AND `active` = '1' AND `assetId` = '$assetId' ORDER BY id DESC");
$adquery->execute();
$ads = $adquery->fetch();
$adId = $ads['id'];
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/videos/" . $adId . ".mp4";
if (!file_exists($_SERVER["DOCUMENT_ROOT"] . "/videos/" . $adId . ".mp4")) {
file_put_contents($FileToSave, $gamefile);
}
$FinalRobux = $usr['Robux'] - 20;
$userupdate = "UPDATE `users` SET `Robux` = :finalRobux WHERE `id` = :uID";
$stmt = $con->prepare($userupdate);
$stmt->bindValue(':finalRobux', $FinalRobux, PDO::PARAM_INT);
$stmt->bindValue(':uID', $uID, PDO::PARAM_INT);
$stmt->execute();
} else {
//echo"uh oh this shouldnt happen";
}
if ($assettypeid == 13) {
$assettype = "Decal";
if ($imageFileType != "png") {
echo "Sorry, only PNG files are allowed.";
exit();
}
$date = time();
$key = getFreeId();
$sql = "INSERT INTO `library` (`type`, `type2`, `created`, `updated`, `approved`, `name`, `icon`, `port`, `description`, `creatorid`, `creatorname`, `ip`, `visits`, `robux`) VALUES (:type, :type2, :created, :updated, :approved, :name, :icon, :port, :description, :creatorid, :creatorname, :ip, :visits, :robux)";
$stmt = $con->prepare($sql);
$stmt->execute(array(
':type' => 'item2',
':type2' => $assettype,
':created' => $date,
':updated' => $date,
':approved' => '0',
':name' => $name,
':icon' => '-1',
':port' => '53640',
':description' => "A $assettype.",
':creatorid' => $uID,
':creatorname' => $username,
':ip' => 'localhost',
':visits' => '0',
':robux' => '0'
));
$startquery = $con->prepare("SELECT * FROM `library` WHERE `creatorid` = :creatorid AND `type` = 'item2' AND `approved` = '0' AND `name`= :name");
$startquery->execute(['creatorid' => $uID, 'name' => $name]);
$start = $startquery->fetch();
$notfinal = $start['id'];
$key = getFreeId();
$placeidupdate = "UPDATE `library` SET `id` = :key WHERE `id` = :notfinal";
$stmt = $con->prepare($placeidupdate);
$stmt->bindValue(':key', $key, PDO::PARAM_INT);
$stmt->bindValue(':notfinal', $notfinal, PDO::PARAM_INT);
$stmt->execute();
$startPlaceId = $key;
$audioId = getFreeId();
$sql = "INSERT INTO `owneditems` (`userid`, `itemid`, `item`) VALUES (:userid, :itemid, :item)";
$stmt = $con->prepare($sql);
$stmt->bindValue(':userid', $uID, PDO::PARAM_INT);
$stmt->bindValue(':itemid', $startPlaceId, PDO::PARAM_INT);
$stmt->bindValue(':item', 'Decal', PDO::PARAM_STR);
$stmt->execute();
$audioidupdate = "UPDATE `library` SET `fileid` = :fileid WHERE `id` = :id AND `type` = 'item2'";
$stmt = $con->prepare($audioidupdate);
$stmt->bindValue(':fileid', $audioId, PDO::PARAM_STR);
$stmt->bindValue(':id', $startPlaceId, PDO::PARAM_INT);
$stmt->execute();
$realaudioid = getFreeId();
$audioidupdate = "UPDATE `library` SET `realfileid` = :realfileid WHERE `id` = :id AND `type` = 'item2'";
$stmt = $con->prepare($audioidupdate);
$stmt->bindValue(':realfileid', $realaudioid, PDO::PARAM_STR);
$stmt->bindValue(':id', $startPlaceId, PDO::PARAM_INT);
$stmt->execute();
$gamefile = file_get_contents($_SERVER["DOCUMENT_ROOT"] . "/build/decal.rbxm");
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $audioId;
$gamefile = str_replace("REPLACEME", $realaudioid, $gamefile);
file_put_contents($FileToSave, $gamefile);
$gamefile = file_get_contents($_FILES['file']['tmp_name']);
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $realaudioid;
file_put_contents($FileToSave, $gamefile);
}
if ($assettypeid == 63) {
$assettype = "Video";
if ($imageFileType != "webm") {
echo "Sorry, only WEBM files are allowed.";
exit();
}
$date = time();
$key = getFreeId();
$description = filter_var($_POST['description'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$sql = "INSERT INTO `library` (`type`, `type2`, `created`, `updated`, `approved`, `name`, `icon`, `port`, `description`, `creatorid`, `creatorname`, `ip`, `visits`, `robux`) VALUES (:type, :type2, :created, :updated, :approved, :name, :icon, :port, :description, :creatorid, :creatorname, :ip, :visits, :robux)";
$stmt = $con->prepare($sql);
$stmt->execute(array(
':type' => 'item2',
':type2' => $assettype,
':created' => $date,
':updated' => $date,
':approved' => '0',
':name' => $name,
':icon' => '-1',
':port' => '53640',
':description' => $description,
':creatorid' => $uID,
':creatorname' => $username,
':ip' => 'localhost',
':visits' => '0',
':robux' => '0'
));
$startquery = $con->prepare("SELECT * FROM `library` WHERE `creatorid` = :creatorid AND `type` = 'item2' AND `approved` = '0' AND `name`= :name");
$startquery->execute(['creatorid' => $uID, 'name' => $name]);
$start = $startquery->fetch();
$notfinal = $start['id'];
$key = getFreeId();
$placeidupdate = "UPDATE `library` SET `id` = :key WHERE `id` = :notfinal";
$stmt = $con->prepare($placeidupdate);
$stmt->bindValue(':key', $key, PDO::PARAM_INT);
$stmt->bindValue(':notfinal', $notfinal, PDO::PARAM_INT);
$stmt->execute();
$startPlaceId = $key;
$audioId = getFreeId();
$sql = "INSERT INTO `owneditems` (`userid`, `itemid`, `item`) VALUES (:userid, :itemid, :item)";
$stmt = $con->prepare($sql);
$stmt->bindValue(':userid', $uID, PDO::PARAM_INT);
$stmt->bindValue(':itemid', $startPlaceId, PDO::PARAM_INT);
$stmt->bindValue(':item', 'Decal', PDO::PARAM_STR);
$stmt->execute();
$audioidupdate = "UPDATE `library` SET `fileid` = :fileid WHERE `id` = :id AND `type` = 'item2'";
$stmt = $con->prepare($audioidupdate);
$stmt->bindValue(':fileid', $audioId, PDO::PARAM_STR);
$stmt->bindValue(':id', $startPlaceId, PDO::PARAM_INT);
$stmt->execute();
$realaudioid = getFreeId();
$audioidupdate = "UPDATE `library` SET `realfileid` = :realfileid WHERE `id` = :id AND `type` = 'item2'";
$stmt = $con->prepare($audioidupdate);
$stmt->bindValue(':realfileid', $realaudioid, PDO::PARAM_STR);
$stmt->bindValue(':id', $startPlaceId, PDO::PARAM_INT);
$stmt->execute();
$gamefile = file_get_contents($_SERVER["DOCUMENT_ROOT"] . "/build/video.rbxm");
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $audioId;
$gamefile = str_replace("REPLACEME", $realaudioid, $gamefile);
file_put_contents($FileToSave, $gamefile);
$gamefile = file_get_contents($_FILES['file']['tmp_name']);
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $realaudioid;
file_put_contents($FileToSave, $gamefile);
}
if ($assettypeid == 8) {
if ($usr['hatcreator'] == 1) {
$assettype = "Hat";
if ($imageFileType != "rbxmx") {
echo "Sorry, only RBXMX files are allowed.";
exit();
}
$robux = (int)$_POST['robux'];
if ($robux <= 0) {
$robux = 0;
}
$robux = max(0, $robux);
$description = filter_var($_POST['description'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$date = time();
$key = getFreeId();
if ($checkboxlim == "true") {
$limited = 1;
} else {
$limited = 0;
}
$sql2 = "INSERT INTO `library` (`type`, `type2`, `created`, `updated`, `approved`, `name`, `icon`, `port`, `description`, `creatorid`, `creatorname`, `ip`, `visits`, `robux`, `limited`)
VALUES (:type, :type2, :created, :updated, :approved, :name, :icon, :port, :description, :creatorid, :creatorname, :ip, :visits, :robux, :limited)";
$stmt = $con->prepare($sql2);
$stmt->execute([
':type' => 'item',
':type2' => $assettype,
':created' => $date,
':updated' => $date,
':approved' => 0,
':name' => $name,
':icon' => '-5',
':port' => '53640',
':description' => $description,
':creatorid' => $uID,
':creatorname' => $username,
':ip' => 'localhost',
':visits' => 0,
':robux' => $robux,
':limited' => $limited
]);
$startquery = $con->prepare("SELECT * FROM `library` WHERE `creatorid` = :creatorid AND `type` = 'item' AND `name`= :name AND `icon` = '-5'");
$startquery->execute(['creatorid' => $uID, 'name' => $name]);
$start = $startquery->fetch();
$notfinal = $start['id'];
$key = getFreeId();
$placeidupdate = "UPDATE `library` SET `id` = :newid WHERE `id` = :oldid";
$stmt = $con->prepare($placeidupdate);
$stmt->bindValue(':newid', $key, PDO::PARAM_INT);
$stmt->bindValue(':oldid', $notfinal, PDO::PARAM_INT);
$stmt->execute();
$iconidupdate = "UPDATE `library` SET `icon` = '-1' WHERE `id` = :id";
$stmt = $con->prepare($iconidupdate);
$stmt->bindValue(':id', $notfinal, PDO::PARAM_INT);
$stmt->execute();
$startPlaceId = $key;
$audioId = getFreeId();
$gamefile = file_get_contents($_FILES['file']['tmp_name']);
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $audioId;
if (!file_exists($_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $audioId . "")) {
file_put_contents($FileToSave, $gamefile);
$sql = "INSERT INTO `owneditems` (`userid`, `itemid`, `item`) VALUES (:userid, :itemid, 'Hat')";
$stmt = $con->prepare($sql);
$stmt->bindValue(':userid', $uID, PDO::PARAM_INT);
$stmt->bindValue(':itemid', $startPlaceId, PDO::PARAM_INT);
$stmt->execute();
$audioidupdate = "UPDATE `library` SET `fileid` = :fileid WHERE `id` = :id AND `type` = 'item'";
$stmt = $con->prepare($audioidupdate);
$stmt->bindValue(':fileid', $audioId, PDO::PARAM_STR);
$stmt->bindValue(':id', $startPlaceId, PDO::PARAM_INT);
$stmt->execute();
$icoidupdate = "UPDATE `library` SET `icon` = '-1' WHERE `id` = :id AND `type` = 'item'";
$stmt = $con->prepare($icoidupdate);
$stmt->bindValue(':id', $startPlaceId, PDO::PARAM_INT);
$stmt->execute();
} else {
//echo"uh oh this shouldnt happen";
}
} else {
echo "nice try lmao";
exit();
}
}
if ($assettypeid == 32) {
if ($usr['hatcreator'] == 1) {
$assettype = "Package";
if ($imageFileType != "rbxmx") {
echo "Sorry, only RBXMX files are allowed.";
exit();
}
$robux = (int)$_POST['robux'];
if ($robux <= 0) {
$robux = 0;
}
$robux = max(0, $robux);
$description = filter_var($_POST['description'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$date = time();
$key = getFreeId();
$sql2 = "INSERT INTO `library` (`type`, `type2`, `created`, `updated`, `approved`, `name`, `icon`, `port`, `description`, `creatorid`, `creatorname`, `ip`, `visits`, `robux`) VALUES (:type, :type2, :created, :updated, :approved, :name, :icon, :port, :description, :creatorid, :creatorname, :ip, :visits, :robux)";
$stmt = $con->prepare($sql2);
$stmt->execute([
':type' => 'item',
':type2' => $assettype,
':created' => $date,
':updated' => $date,
':approved' => '0',
':name' => $name,
':icon' => '-5',
':port' => '53640',
':description' => $description,
':creatorid' => $uID,
':creatorname' => $username,
':ip' => 'localhost',
':visits' => '0',
':robux' => $robux
]);
$startquery = $con->prepare("SELECT * FROM `library` WHERE `creatorid` = :creatorid AND `type` = 'item' AND `name`= :name AND `icon` = '-5'");
$startquery->execute(['creatorid' => $uID, 'name' => $name]);
$start = $startquery->fetch();
$notfinal = $start['id'];
$key = getFreeId();
$placeidupdate = "UPDATE `library` SET `id` = '$key' WHERE `id`='$notfinal'";
$con->exec($placeidupdate);
$iconidupdate = "UPDATE `library` SET `icon` = '-1' WHERE `id`='$notfinal'";
$con->exec($iconidupdate);
$startPlaceId = $key;
$audioId = getFreeId();
$gamefile = file_get_contents($_FILES['file']['tmp_name']);
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $audioId;
if (!file_exists($_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $audioId . "")) {
file_put_contents($FileToSave, $gamefile);
$sql = "INSERT INTO `owneditems` (`userid`, `itemid`, `item`) VALUES ('$uID', '$startPlaceId', 'Package')";
$con->exec($sql);
$updateQuery = "UPDATE `library` SET `fileid` = :audioId WHERE `id` = :startPlaceId AND `type` = 'item'";
$updateStatement = $con->prepare($updateQuery);
$updateStatement->bindParam(':audioId', $audioId);
$updateStatement->bindParam(':startPlaceId', $startPlaceId);
$updateStatement->execute();
$icoidupdate = "UPDATE `library` SET `icon` = '-1' WHERE `id`='$startPlaceId' AND `type`='item'";
$con->exec($icoidupdate);
} else {
//echo"uh oh this shouldnt happen";
}
} else {
echo "nice try lmao";
exit();
}
}
if ($assettypeid == 19) {
if ($usr['hatcreator'] == 1) {
$assettype = "Gear";
if ($imageFileType != "rbxmx") {
echo "Sorry, only RBXMX files are allowed.";
exit();
}
$robux = (int)$_POST['robux'];
if ($robux <= 0) {
$robux = 0;
}
$robux = max(0, $robux);
$description = filter_var($_POST['description'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$Type = filter_var($_POST['Type'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$date = time();
$key = getFreeId();
if ($checkboxlim == "true") {
$limited = 1;
} else {
$limited = 0;
}
$sql2 = "INSERT INTO `library` (`type`, `type2`, `created`, `updated`, `approved`, `name`, `icon`, `port`, `description`, `creatorid`, `creatorname`, `ip`, `visits`, `robux`, `limited`, `GearType`) VALUES (:type, :type2, :created, :updated, :approved, :name, :icon, :port, :description, :creatorid, :creatorname, :ip, :visits, :robux, :limited, :gearType)";
$stmt = $con->prepare($sql2);
$stmt->execute(array(
':type' => 'item',
':type2' => $assettype,
':created' => $date,
':updated' => $date,
':approved' => 0,
':name' => $name,
':icon' => '-5',
':port' => '53640',
':description' => $description,
':creatorid' => $uID,
':creatorname' => $username,
':ip' => 'localhost',
':visits' => 0,
':robux' => $robux,
':limited' => $limited,
':gearType' => $Type
));
$startquery = $con->prepare("SELECT * FROM `library` WHERE `creatorid` = :creatorid AND `type` = 'item' AND `name`= :name AND `icon` = '-5'");
$startquery->execute(['creatorid' => $uID, 'name' => $name]);
$start = $startquery->fetch();
$notfinal = $start['id'];
$key = getFreeId();
$placeidupdate = "UPDATE `library` SET `id` = '$key' WHERE `id`='$notfinal'";
$con->exec($placeidupdate);
$iconidupdate = "UPDATE `library` SET `icon` = '-1' WHERE `id`='$notfinal'";
$con->exec($iconidupdate);
$startPlaceId = $key;
$audioId = getFreeId();
$gamefile = file_get_contents($_FILES['file']['tmp_name']);
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $audioId;
if (!file_exists($_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $audioId . "")) {
file_put_contents($FileToSave, $gamefile);
$sql = "INSERT INTO `owneditems` (`userid`, `itemid`, `item`) VALUES ('$uID', '$startPlaceId', 'Gear')";
$con->exec($sql);
$updateQuery = "UPDATE `library` SET `fileid` = :audioId WHERE `id` = :startPlaceId AND `type` = 'item'";
$updateStatement = $con->prepare($updateQuery);
$updateStatement->bindParam(':audioId', $audioId);
$updateStatement->bindParam(':startPlaceId', $startPlaceId);
$updateStatement->execute();
$icoidupdate = "UPDATE `library` SET `icon` = '-1' WHERE `id`='$startPlaceId' AND `type`='item'";
$con->exec($icoidupdate);
} else {
//echo"uh oh this shouldnt happen";
}
} else {
echo "nice try lmao";
exit();
}
}
if ($assettypeid == 18) {
if ($usr['hatcreator'] == 1) {
$assettype = "Face";
if ($imageFileType != "png") {
echo "Sorry, only PNG files are allowed.";
exit();
}
if ($usr['Robux'] < 20) {
echo "Sorry, you don't have enough Robux.";
exit();
}
$robux = (int)$_POST['robux'];
if ($robux <= 0) {
$robux = 0;
}
$robux = max(0, $robux);
$date = time();
$key = getFreeId();
$sql2 = "INSERT INTO `library` (`type`, `type2`, `created`, `updated`, `approved`, `name`, `icon`, `port`, `description`, `creatorid`, `creatorname`, `ip`, `visits`, `robux`)
VALUES (:type, :type2, :created, :updated, :approved, :name, :icon, :port, :description, :creatorid, :creatorname, :ip, :visits, :robux)";
$stmt = $con->prepare($sql2);
$stmt->execute([
':type' => 'item',
':type2' => $assettype,
':created' => $date,
':updated' => $date,
':approved' => '0',
':name' => $name,
':icon' => '-1',
':port' => '53640',
':description' => "A $assettype.",
':creatorid' => $uID,
':creatorname' => $username,
':ip' => 'localhost',
':visits' => '0',
':robux' => $robux
]);
$startquery = $con->prepare("SELECT * FROM `library` WHERE `creatorid` = :creatorid AND `type` = 'item' AND `approved` = '0' AND `name`= :name");
$startquery->execute(['creatorid' => $uID, 'name' => $name]);
$start = $startquery->fetch();
$notfinal = $start['id'];
$key = getFreeId();
$placeidupdate = "UPDATE `library` SET `id` = '$key' WHERE `id`='$notfinal'";
$con->exec($placeidupdate);
$startPlaceId = $key;
$sql = "INSERT INTO `owneditems` (`userid`, `itemid`, `item`) VALUES ('$uID', '$startPlaceId', 'Face')";
$con->exec($sql);
$audioId = getFreeId();
$updateQuery = "UPDATE `library` SET `fileid` = :audioId WHERE `id` = :startPlaceId AND `type` = 'item'";
$updateStatement = $con->prepare($updateQuery);
$updateStatement->bindParam(':audioId', $audioId);
$updateStatement->bindParam(':startPlaceId', $startPlaceId);
$updateStatement->execute();
// Generate a new 'realfileid' value
$realaudioid = getFreeId(); // You need to define or implement the getFreeId() function
// Update the 'realfileid' column
$updateQuery = "UPDATE `library` SET `realfileid` = :realaudioid WHERE `id` = :startPlaceId AND `type` = 'item'";
$updateStatement = $con->prepare($updateQuery);
$updateStatement->bindParam(':realaudioid', $realaudioid);
$updateStatement->bindParam(':startPlaceId', $startPlaceId);
$updateStatement->execute();
$FinalRobux = $usr['Robux'] - 20;
$userupdate = "UPDATE `users` SET `Robux` = '$FinalRobux' WHERE `id`='$uID'";
$con->exec($userupdate);
$gamefile = file_get_contents($_SERVER["DOCUMENT_ROOT"] . "/build/face.rbxm");
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $audioId;
$gamefile = str_replace("REPLACEME", $realaudioid, $gamefile);
file_put_contents($FileToSave, $gamefile);
$gamefile = file_get_contents($_FILES['file']['tmp_name']);
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $realaudioid;
file_put_contents($FileToSave, $gamefile);
} else {
die("no");
}
}
if ($assettypeid == 11) {
$assettype = "Shirt";
if ($imageFileType != "png") {
echo "Sorry, only PNG files are allowed.";
exit();
}
if ($usr['Robux'] < 20) {
echo "Sorry, you don't have enough Robux.";
exit();
}
$robux = (int)$_POST['robux'];
if ($robux <= 0) {
$robux = 0;
}
$robux = max(0, $robux);
$date = time();
$idquery = $con->prepare("SELECT id FROM `games` ORDER BY id DESC");
$idquery->execute();
$idexist = $idquery->fetch();
$key = getFreeId();
$sql2 = "INSERT INTO `library` (`type`, `type2`, `created`, `updated`, `approved`, `name`, `icon`, `port`, `description`, `creatorid`, `creatorname`, `ip`, `visits`, `robux`)
VALUES (:type, :type2, :created, :updated, :approved, :name, :icon, :port, :description, :creatorid, :creatorname, :ip, :visits, :robux)";
$stmt = $con->prepare($sql2);
$stmt->execute([
':type' => 'item',
':type2' => $assettype,
':created' => $date,
':updated' => $date,
':approved' => '0',
':name' => $name,
':icon' => '-1',
':port' => '53640',
':description' => "A $assettype.",
':creatorid' => $uID,
':creatorname' => $username,
':ip' => 'localhost',
':visits' => '0',
':robux' => $robux
]);
$startquery = $con->prepare("SELECT * FROM `library` WHERE `creatorid` = :creatorid AND `type` = 'item' AND `approved` = '0' AND `name`= :name");
$startquery->execute(['creatorid' => $uID, 'name' => $name]);
$start = $startquery->fetch();
$notfinal = $start['id'];
$key = getFreeId();
$placeidupdate = "UPDATE `library` SET `id` = '$key' WHERE `id`='$notfinal'";
$con->exec($placeidupdate);
$startPlaceId = $key;
$sql = "INSERT INTO `owneditems` (`userid`, `itemid`, `item`) VALUES ('$uID', '$startPlaceId', 'Shirt')";
$con->exec($sql);
$audioId = getFreeId();
$updateQuery = "UPDATE `library` SET `fileid` = :audioId WHERE `id` = :startPlaceId AND `type` = 'item'";
$updateStatement = $con->prepare($updateQuery);
$updateStatement->bindParam(':audioId', $audioId);
$updateStatement->bindParam(':startPlaceId', $startPlaceId);
$updateStatement->execute();
// Generate a new 'realfileid' value
$realaudioid = getFreeId(); // You need to define or implement the getFreeId() function
// Update the 'realfileid' column
$updateQuery = "UPDATE `library` SET `realfileid` = :realaudioid WHERE `id` = :startPlaceId AND `type` = 'item'";
$updateStatement = $con->prepare($updateQuery);
$updateStatement->bindParam(':realaudioid', $realaudioid);
$updateStatement->bindParam(':startPlaceId', $startPlaceId);
$updateStatement->execute();
$FinalRobux = $usr['Robux'] - 20;
$userupdate = "UPDATE `users` SET `Robux` = '$FinalRobux' WHERE `id`='$uID'";
$con->exec($userupdate);
$gamefile = file_get_contents($_SERVER["DOCUMENT_ROOT"] . "/build/shirt.rbxm");
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $audioId;
$gamefile = str_replace("REPLACEME", $realaudioid, $gamefile);
file_put_contents($FileToSave, $gamefile);
$gamefile = file_get_contents($_FILES['file']['tmp_name']);
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $realaudioid;
file_put_contents($FileToSave, $gamefile);
}
if ($assettypeid == 2) {
$assettype = "TShirt";
if ($imageFileType != "png" && $imageFileType != "jpg") {
echo "Sorry, only PNG or JPG files are allowed.";
exit();
}
$robux = (int)$_POST['robux'];
if ($robux <= 0) {
$robux = 0;
}
$robux = max(0, $robux);
$date = time();
$idquery = $con->prepare("SELECT id FROM `games` ORDER BY id DESC");
$idquery->execute();
$idexist = $idquery->fetch();
$key = getFreeId();
$sql2 = "INSERT INTO `library` (`type`, `type2`, `created`, `updated`, `approved`, `name`, `icon`, `port`, `description`, `creatorid`, `creatorname`, `ip`, `visits`, `robux`)
VALUES (:type, :type2, :created, :updated, :approved, :name, :icon, :port, :description, :creatorid, :creatorname, :ip, :visits, :robux)";
$stmt = $con->prepare($sql2);
$stmt->execute([
':type' => 'item',
':type2' => $assettype,
':created' => $date,
':updated' => $date,
':approved' => '0',
':name' => $name,
':icon' => '-1',
':port' => '53640',
':description' => "A $assettype.",
':creatorid' => $uID,
':creatorname' => $username,
':ip' => 'localhost',
':visits' => '0',
':robux' => $robux
]);
$startquery = $con->prepare("SELECT * FROM `library` WHERE `creatorid` = :creatorid AND `type` = 'item' AND `approved` = '0' AND `name`= :name");
$startquery->execute(['creatorid' => $uID, 'name' => $name]);
$start = $startquery->fetch();
if(!is_array($start)){
echo "something went wrong";
exit();
}
$notfinal = $start['id'];
$key = getFreeId();
$placeidupdate = "UPDATE `library` SET `id` = '$key' WHERE `id`='$notfinal'";
$con->exec($placeidupdate);
$startPlaceId = $key;
$sql = "INSERT INTO `owneditems` (`userid`, `itemid`, `item`) VALUES ('$uID', '$startPlaceId', 'TShirt')";
$con->exec($sql);
$audioId = getFreeId();
try{
$updateQuery = "UPDATE `library` SET `fileid` = :audioId WHERE `id` = :startPlaceId AND `type` = 'item'";
$updateStatement = $con->prepare($updateQuery);
$updateStatement->bindParam(':audioId', $audioId);
$updateStatement->bindParam(':startPlaceId', $startPlaceId);
$updateStatement->execute();
// Generate a new 'realfileid' value
$realaudioid = getFreeId(); // You need to define or implement the getFreeId() function
// Update the 'realfileid' column
$updateQuery = "UPDATE `library` SET `realfileid` = :realaudioid WHERE `id` = :startPlaceId AND `type` = 'item'";
$updateStatement = $con->prepare($updateQuery);
$updateStatement->bindParam(':realaudioid', $realaudioid);
$updateStatement->bindParam(':startPlaceId', $startPlaceId);
$updateStatement->execute();
}catch(PDOException $e){
echo "pdo err";
exit();
}
$gamefile = file_get_contents($_SERVER["DOCUMENT_ROOT"] . "/build/tshirt.rbxm");
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $audioId;
$gamefile = str_replace("REPLACEME", $realaudioid, $gamefile);
file_put_contents($FileToSave, $gamefile);
$gamefile = file_get_contents($_FILES['file']['tmp_name']);
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $realaudioid;
file_put_contents($FileToSave, $gamefile);
}
if ($assettypeid == 12) {
$assettype = "Pants";
if ($imageFileType != "png") {
echo "Sorry, only PNG files are allowed.";
exit();
}
if ($usr['Robux'] < 20) {
echo "Sorry, you don't have enough Robux.";
exit();
}
$robux = (int)$_POST['robux'];
if ($robux <= 0) {
$robux = 0;
}
$robux = max(0, $robux);
$date = time();
$key = getFreeId();
$sql2 = "INSERT INTO `library` (`type`, `type2`, `created`, `updated`, `approved`, `name`, `icon`, `port`, `description`, `creatorid`, `creatorname`, `ip`, `visits`, `robux`)
VALUES ('item', :assettype, :created, :updated, :approved, :name, :icon, :port, :description, :creatorid, :creatorname, :ip, :visits, :robux)";
$stmt = $con->prepare($sql2);
$stmt->execute([
'assettype' => $assettype,
'created' => $date,
'updated' => $date,
'approved' => 0,
'name' => $name,
'icon' => 0,
'port' => 53640,
'description' => "A $assettype.",
'creatorid' => $uID,
'creatorname' => $username,
'ip' => 'localhost',
'visits' => 0,
'robux' => $robux
]);
$startquery = $con->prepare("SELECT * FROM `library` WHERE `creatorid` = :creatorid AND `type` = 'item' AND `approved` = '0' AND `name`= :name");
$startquery->execute(['creatorid' => $uID, 'name' => $name]);
$start = $startquery->fetch();
if(!is_array($start)){
echo "something went wrong";
exit();
}
$notfinal = $start['id'];
$key = getFreeId();
$placeidupdate = "UPDATE `library` SET `id` = $key WHERE `id`=$notfinal";
$con->exec($placeidupdate);
$startPlaceId = $key;
$sql = "INSERT INTO `owneditems` (`userid`, `itemid`, `item`) VALUES ('$uID', '$startPlaceId', 'Pants')";
$con->exec($sql);
$audioId = getFreeId();
try{
$updateQuery = "UPDATE `library` SET `fileid` = :audioId WHERE `id` = :startPlaceId AND `type` = 'item'";
$updateStatement = $con->prepare($updateQuery);
$updateStatement->bindParam(':audioId', $audioId);
$updateStatement->bindParam(':startPlaceId', $startPlaceId);
$updateStatement->execute();
// Generate a new 'realfileid' value
$realaudioid = getFreeId(); // You need to define or implement the getFreeId() function
// Update the 'realfileid' column
$updateQuery = "UPDATE `library` SET `realfileid` = :realaudioid WHERE `id` = :startPlaceId AND `type` = 'item'";
$updateStatement = $con->prepare($updateQuery);
$updateStatement->bindParam(':realaudioid', $realaudioid);
$updateStatement->bindParam(':startPlaceId', $startPlaceId);
$updateStatement->execute();
}catch(PDOException $e){
echo "pdo err";
exit();
}
$FinalRobux = $usr['Robux'] - 20;
$userupdate = "UPDATE `users` SET `Robux` = '$FinalRobux' WHERE `id`='$uID'";
$con->exec($userupdate);
$gamefile = file_get_contents($_SERVER["DOCUMENT_ROOT"] . "/build/pant.rbxm");
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $audioId;
$gamefile = str_replace("REPLACEME", $realaudioid, $gamefile);
file_put_contents($FileToSave, $gamefile);
$gamefile = file_get_contents($_FILES['file']['tmp_name']);
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $realaudioid;
file_put_contents($FileToSave, $gamefile);
}
if ($assettypeid == 3) {
$assettype = "Sound";
if ($imageFileType != "ogg" && $imageFileType != "mp3" && $imageFileType != "wav") {
echo "Sorry, only OGG, MP3, and WAV files are allowed.";
exit();
}
$date = time();
$idquery = $con->prepare("SELECT id FROM `games` ORDER BY id DESC");
$idquery->execute();
$idexist = $idquery->fetch();
$key = getFreeId();
$sql2 = "INSERT INTO `library` (`type`, `type2`, `created`, `updated`, `approved`, `name`, `icon`, `port`, `description`, `creatorid`, `creatorname`, `ip`, `visits`, `robux`)
VALUES (:type, :type2, :created, :updated, :approved, :name, :icon, :port, :description, :creatorid, :creatorname, :ip, :visits, :robux)";
$stmt = $con->prepare($sql2);
$stmt->execute([
':type' => 'item2',
':type2' => $assettype,
':created' => $date,
':updated' => $date,
':approved' => '0',
':name' => $name,
':icon' => '-1',
':port' => '53640',
':description' => "A $assettype.",
':creatorid' => $uID,
':creatorname' => $username,
':ip' => 'localhost',
':visits' => '0',
':robux' => '0'
]);
$startquery = $con->prepare("SELECT * FROM `library` WHERE `creatorid` = :creatorid AND `type` = 'item2' AND `approved` = '0' AND `name`= :name");
$startquery->execute(['creatorid' => $uID, 'name' => $name]);
$start = $startquery->fetch();
$notfinal = $start['id'];
$key = getFreeId();
$placeidupdate = "UPDATE `library` SET `id` = '$key' WHERE `id`='$notfinal'";
$con->exec($placeidupdate);
$startPlaceId = $key;
$audioId = getFreeId();
$sql = "INSERT INTO `owneditems` (`userid`, `itemid`, `item`) VALUES ('$uID', '$startPlaceId', 'Sound')";
$con->exec($sql);
$updateQuery = "UPDATE `library` SET `fileid` = :audioId WHERE `id` = :startPlaceId AND `type` = 'item2'";
$updateStatement = $con->prepare($updateQuery);
$updateStatement->bindParam(':audioId', $audioId);
$updateStatement->bindParam(':startPlaceId', $startPlaceId);
$updateStatement->execute();
// Generate a new 'realfileid' value
$realaudioid = getFreeId(); // You need to define or implement the getFreeId() function
// Update the 'realfileid' column
$updateQuery = "UPDATE `library` SET `realfileid` = :realaudioid WHERE `id` = :startPlaceId AND `type` = 'item2'";
$updateStatement = $con->prepare($updateQuery);
$updateStatement->bindParam(':realaudioid', $realaudioid);
$updateStatement->bindParam(':startPlaceId', $startPlaceId);
$updateStatement->execute();
$gamefile = file_get_contents($_SERVER["DOCUMENT_ROOT"] . "/build/sound.rbxm");
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $audioId;
$gamefile = str_replace("REPLACEME", $realaudioid, $gamefile);
file_put_contents($FileToSave, $gamefile);
$gamefile = file_get_contents($_FILES['file']['tmp_name']);
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $realaudioid;
file_put_contents($FileToSave, $gamefile);
}
if ($assettypeid == 4) {
$assettype = "Mesh";
if ($imageFileType != "mesh") {
echo "Sorry, only MESH files are allowed.";
exit();
}
$description = filter_var($_POST['description'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$description = $censor->censorString($description)['clean'];
$date = time();
$idquery = $con->prepare("SELECT id FROM `games` ORDER BY id DESC");
$idquery->execute();
$idexist = $idquery->fetch();
$idis = $idexist['id'];
$key = getFreeId();
$sql2 = "INSERT INTO `library` (`type`, `type2`, `created`, `updated`, `approved`, `name`, `icon`, `port`, `description`, `creatorid`, `creatorname`, `ip`, `visits`, `robux`)
VALUES (:type, :type2, :created, :updated, :approved, :name, :icon, :port, :description, :creatorid, :creatorname, :ip, :visits, :robux)";
$stmt = $con->prepare($sql2);
$stmt->execute([
':type' => 'item2',
':type2' => $assettype,
':created' => $date,
':updated' => $date,
':approved' => '0',
':name' => $name,
':icon' => '-5',
':port' => '53640',
':description' => "A $assettype.",
':creatorid' => $uID,
':creatorname' => $username,
':ip' => 'localhost',
':visits' => '0',
':robux' => 0
]);
$startquery = $con->prepare("SELECT * FROM `library` WHERE `creatorid` = :creatorid AND `type` = 'item2' AND `name`= :name AND `icon` = '-5'");
$startquery->execute(['creatorid' => $uID, 'name' => $name]);
$start = $startquery->fetch();
$notfinal = $start['id'];
$existquery = $con->prepare("SELECT * FROM `library` WHERE `id` = '$key' OR `fileid` = '$key' OR `realfileid` = '$key'");
$existquery->execute();
$exist = $existquery->fetch();
$key = getFreeId();
$placeidupdate = "UPDATE `library` SET `id` = '$key' WHERE `id`='$notfinal'";
$con->exec($placeidupdate);
$iconidupdate = "UPDATE `library` SET `icon` = '-1' WHERE `id`='$notfinal'";
$con->exec($iconidupdate);
$startPlaceId = $key;
$audioId = getFreeId();
$gamefile = file_get_contents($_FILES['file']['tmp_name']);
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/Asset/assets/" . $audioId;
if (!file_exists($_SERVER["DOCUMENT_ROOT"] . "/Asset/assets/" . $audioId . "")) {
file_put_contents($FileToSave, $gamefile);
$sql = "INSERT INTO `owneditems` (`userid`, `itemid`, `item`) VALUES ('$uID', '$startPlaceId', 'Mesh')";
$con->exec($sql);
$updateQuery = "UPDATE `library` SET `fileid` = :audioId WHERE `id` = :startPlaceId AND `type` = 'item2'";
$updateStatement = $con->prepare($updateQuery);
$updateStatement->bindParam(':audioId', $audioId);
$updateStatement->bindParam(':startPlaceId', $startPlaceId);
$updateStatement->execute();
$icoidupdate = "UPDATE `library` SET `icon` = '-1' WHERE `id`='$startPlaceId' AND `type`='item2'";
$con->exec($icoidupdate);
} else {
//echo"uh oh this shouldnt happen";
//exit();
}
}
if ($assettypeid == 24 && $usr['hatcreator'] == 1) {
$assettype = "Animation";
if ($imageFileType != "rbxmx") {
echo "Sorry, only RBXMX files are allowed.";
exit();
}
$description = filter_var($_POST['description'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$description = $censor->censorString($description)['clean'];
$date = time();
$idquery = $con->prepare("SELECT id FROM `games` ORDER BY id DESC");
$idquery->execute();
$idexist = $idquery->fetch();
$idis = $idexist['id'];
$key = getFreeId();
$sql2 = "INSERT INTO `library` (`type`, `type2`, `created`, `updated`, `approved`, `name`, `icon`, `port`, `description`, `creatorid`, `creatorname`, `ip`, `visits`, `robux`)
VALUES (:type, :type2, :created, :updated, :approved, :name, :icon, :port, :description, :creatorid, :creatorname, :ip, :visits, :robux)";
$stmt = $con->prepare($sql2);
$stmt->execute([
':type' => 'item',
':type2' => $assettype,
':created' => $date,
':updated' => $date,
':approved' => '0',
':name' => $name,
':icon' => '-5',
':port' => '53640',
':description' => "A $assettype.",
':creatorid' => $uID,
':creatorname' => $username,
':ip' => 'localhost',
':visits' => '0',
':robux' => 0
]);
$startquery = $con->prepare("SELECT * FROM `library` WHERE `creatorid` = :creatorid AND `type` = 'item' AND `name`= :name AND `icon` = '-5'");
$startquery->execute(['creatorid' => $uID, 'name' => $name]);
$start = $startquery->fetch();
$notfinal = $start['id'];
$existquery = $con->prepare("SELECT * FROM `library` WHERE `id` = '$key' OR `fileid` = '$key' OR `realfileid` = '$key'");
$existquery->execute();
$exist = $existquery->fetch();
$key = getFreeId();
$placeidupdate = "UPDATE `library` SET `id` = '$key' WHERE `id`='$notfinal'";
$con->exec($placeidupdate);
$iconidupdate = "UPDATE `library` SET `icon` = '-1' WHERE `id`='$notfinal'";
$con->exec($iconidupdate);
$startPlaceId = $key;
$audioId = getFreeId();
$gamefile = file_get_contents($_FILES['file']['tmp_name']);
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/Asset/assets/" . $audioId;
if (!file_exists($_SERVER["DOCUMENT_ROOT"] . "/Asset/assets/" . $audioId . "")) {
file_put_contents($FileToSave, $gamefile);
$sql = "INSERT INTO `owneditems` (`userid`, `itemid`, `item`) VALUES ('$uID', '$startPlaceId', 'Animation')";
$con->exec($sql);
$updateQuery = "UPDATE `library` SET `fileid` = :audioId WHERE `id` = :startPlaceId AND `type` = 'item'";
$updateStatement = $con->prepare($updateQuery);
$updateStatement->bindParam(':audioId', $audioId);
$updateStatement->bindParam(':startPlaceId', $startPlaceId);
$updateStatement->execute();
$icoidupdate = "UPDATE `library` SET `icon` = '-1' WHERE `id`='$startPlaceId' AND `type`='item'";
$con->exec($icoidupdate);
} else {
//echo"uh oh this shouldnt happen";
//exit();
}
}
if ($assettypeid == 34) {
$assettype = "Gamepass";
if ($imageFileType != "png") {
echo "Sorry, only PNG files are allowed.";
exit();
}
$robux = (int)$_POST['robux'];
if ($robux <= 0) {
$robux = 0;
}
$robux = max(0, $robux);
$IsForGameId = (int)$_POST['GameID'];
$gameidquery = $con->prepare("SELECT id,creatorid FROM `games` WHERE `id` = '$IsForGameId' AND `creatorid` = '$uID'");
$gameidquery->execute();
$gameidexist = $gameidquery->fetch();
if(!is_array($gameidexist)){
die("Either you don't own this place, or it doesn't exist.");
}
$description = filter_var($_POST['description'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$description = $censor->censorString($description)['clean'];
$date = time();
$idquery = $con->prepare("SELECT id FROM `games` ORDER BY id DESC");
$idquery->execute();
$idexist = $idquery->fetch();
$key = getFreeId();
$sql2 = "INSERT INTO `library` (`type`, `type2`, `created`, `updated`, `approved`, `name`, `icon`, `port`, `description`, `creatorid`, `creatorname`, `ip`, `visits`, `robux`, `IsForGameId`)
VALUES ('item2', :assettype, :date, :date2, '0', :name, '-5', '53640', :description, :uID, :username, 'localhost', '0', :robux, :IsForGameId)";
$stmt = $con->prepare($sql2);
$stmt->execute([
'assettype' => $assettype,
'date' => $date,
'date2' => $date,
'name' => $name,
'description' => $description,
'uID' => $uID,
'username' => $username,
'robux' => $robux,
'IsForGameId' => $IsForGameId
]);
$startquery = $con->prepare("SELECT * FROM `library` WHERE `creatorid` = :creatorid AND `type` = 'item2' AND `name`= :name AND `icon` = '-5'");
$startquery->execute(['creatorid' => $uID, 'name' => $name]);
$start = $startquery->fetch();
$notfinal = $start['id'];
$key = getFreeId();
$placeidupdate = "UPDATE `library` SET `id` = '$key' WHERE `id`='$notfinal'";
$con->exec($placeidupdate);
$iconidupdate = "UPDATE `library` SET `icon` = '-1' WHERE `id`='$notfinal'";
$con->exec($iconidupdate);
$startPlaceId = $key;
$audioId = getFreeId();
$gamefile = file_get_contents($_FILES['file']['tmp_name']);
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/Asset/assets/" . $audioId;
if (!file_exists($_SERVER["DOCUMENT_ROOT"] . "/Asset/assets/" . $audioId . "")) {
file_put_contents($FileToSave, $gamefile);
$sql = "INSERT INTO `owneditems` (`userid`, `itemid`, `item`) VALUES ('$uID', '$startPlaceId', 'Gamepass')";
$con->exec($sql);
$sql = "INSERT INTO `gameowneditems` (`userId`, `assetId`) VALUES ('$uID', '$startPlaceId')";
$con->exec($sql);
$updateQuery = "UPDATE `library` SET `fileid` = :audioId WHERE `id` = :startPlaceId AND `type` = 'item2'";
$updateStatement = $con->prepare($updateQuery);
$updateStatement->bindParam(':audioId', $audioId);
$updateStatement->bindParam(':startPlaceId', $startPlaceId);
$updateStatement->execute();
$icoidupdate = "UPDATE `library` SET `icon` = '-1' WHERE `id`='$startPlaceId' AND `type`='item2'";
$con->exec($icoidupdate);
} else {
//echo"uh oh this shouldnt happen";
//exit();
}
}
if ($assettypeid == 21) {
$assettype = "Badge";
if ($imageFileType != "png") {
echo "Sorry, only PNG files are allowed.";
exit();
}
$IsForGameId = (int)$_POST['GameID'];
$gameidquery = $con->prepare("SELECT id,creatorid FROM `games` WHERE `id` = '$IsForGameId' AND `creatorid` = '$uID'");
$gameidquery->execute();
$gameidexist = $gameidquery->fetch();
if(!is_array($gameidexist)){
die("Either you don't own this place, or it doesn't exist.");
}
$description = filter_var($_POST['description'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$description = $censor->censorString($description)['clean'];
$date = time();
$idquery = $con->prepare("SELECT id FROM `games` ORDER BY id DESC");
$idquery->execute();
$idexist = $idquery->fetch();
$key = getFreeId();
$sql2 = "INSERT INTO `library` (`type`, `type2`, `created`, `updated`, `approved`, `name`, `icon`, `port`, `description`, `creatorid`, `creatorname`, `ip`, `visits`, `robux`, `IsForGameId`) VALUES ('item2', '$assettype', '$date', '$date', '0', '$name', '-5', '53640', '$description', '$uID', '$username', 'localhost', '0', '0', $IsForGameId)";
$con->exec($sql2);
$startquery = $con->prepare("SELECT * FROM `library` WHERE `creatorid` = :creatorid AND `type` = 'item2' AND `name`= :name AND `icon` = '-5'");
$startquery->execute(['creatorid' => $uID, 'name' => $name]);
$start = $startquery->fetch();
$notfinal = $start['id'];
$key = getFreeId();
$placeidupdate = "UPDATE `library` SET `id` = '$key' WHERE `id`='$notfinal'";
$con->exec($placeidupdate);
$iconidupdate = "UPDATE `library` SET `icon` = '-1' WHERE `id`='$notfinal'";
$con->exec($iconidupdate);
$startPlaceId = $key;
$audioId = getFreeId();
$gamefile = file_get_contents($_FILES['file']['tmp_name']);
$FileToSave = $_SERVER["DOCUMENT_ROOT"] . "/Asset/assets/" . $audioId;
if (!file_exists($_SERVER["DOCUMENT_ROOT"] . "/Asset/assets/" . $audioId . "")) {
file_put_contents($FileToSave, $gamefile);
$sql = "INSERT INTO `owneditems` (`userid`, `itemid`, `item`) VALUES ('$uID', '$startPlaceId', 'Badge')";
$con->exec($sql);
$sql = "INSERT INTO `ownedbadges` (`userId`, `badgeId`) VALUES ('$uID', '$startPlaceId')";
$con->exec($sql);
$updateQuery = "UPDATE `library` SET `fileid` = :audioId WHERE `id` = :startPlaceId AND `type` = 'item2'";
$updateStatement = $con->prepare($updateQuery);
$updateStatement->bindParam(':audioId', $audioId);
$updateStatement->bindParam(':startPlaceId', $startPlaceId);
$updateStatement->execute();
$icoidupdate = "UPDATE `library` SET `icon` = '-1' WHERE `id`='$startPlaceId' AND `type`='item2'";
$con->exec($icoidupdate);
} else {
//echo"uh oh this shouldnt happen";
//exit();
}
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" xmlns:fb="http://www.facebook.com/2008/fbml">
<head data-machine-id="CHI1-WEB9289">
<title>Limbo</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,requiresActiveX=true" />
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="author" content="Roblox Corporation" />
<meta name="description" content="Roblox is a global platform that brings people together through play." />
<meta name="keywords" content="free games, online games, building games, virtual worlds, free mmo, gaming cloud, physics engine" />
<meta name="apple-itunes-app" content="app-id=431946152" />
<meta ng-csp="no-unsafe-eval">
<meta name="environment-meta" data-is-testing-site="false" />
<meta name="page-meta" data-internal-page-name="" />
<style>
html {
background: none !important;
}
</style>
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' href='https://www.voidrev.us/css/MainCSS.css' />
<link rel="stylesheet" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-bundlename="LegacyStyleGuide" data-bundle-source="Main" href="https://www.voidrev.us/css/c0479e5458caa172745cb6518c4331dd872c84b3a09664a59179034fb3eb20c8.css" />
<link rel="stylesheet" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-bundlename="Navigation" data-bundle-source="Main" href="https://www.voidrev.us/css/953685b8b086c50ba2a02a85241e8278f5741978daed61ee5665c7cd0e1ccb36.css" />
<link rel="stylesheet" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-bundlename="CookieBannerV3" data-bundle-source="Main" href="https://www.voidrev.us/css/2c2a709240897ce382b7ff55be4347cd0994ab1e2d6ed3b56649e54b0e97e13a.css" />
<link rel="stylesheet" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-bundlename="Footer" data-bundle-source="Main" href="https://www.voidrev.us/css/6edb2191aa318f963253361b43d2657a04b3d16e9c28fe7b22d4a4d5686f1cb4.css" />
<link rel="stylesheet" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-bundlename="ConfigureWebApps" data-bundle-source="Main" href="https://www.voidrev.us/css/08def520152a575438e73a81aa9a310c2415c327df7b624a24aa6e794d24dba3.css" />
<link rel="stylesheet" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-bundlename="AccountSecurityPrompt" data-bundle-source="Main" href="https://www.voidrev.us/css/47e1c90bc25cab792e478c9ef77ac6128f9cf51f123ab43d51eac036fc601e0f.css" />
<link rel="stylesheet" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-bundlename="RobuxIcon" data-bundle-source="Main" href="https://www.voidrev.us/css/4fdd2f554b7d7bdd9491b4857be91acb07abfdf5514a73d93ea8f14ce78b6401.css" />
<link rel="stylesheet" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-bundlename="NotificationStream" data-bundle-source="Main" href="https://www.voidrev.us/css/e23cefa6556f24f14b0680dee9b9139a5a287b5d69b5cca74743bd186d1a8183.css" />
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' href='https://www.voidrev.us/css/page___3adeb392920c1d82846b566d88e118a8_m.css' />
<link rel="stylesheet" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-bundlename="Chat" data-bundle-source="Main" href="https://www.voidrev.us/css/9ff00644c2caa1890ea1e1bc39ba8258c850ed19ba4fece90c16c38c73569bed.css" />
<?php
if ($ExperimentalTheme == "Light") {
?>
<link rel="stylesheet" href="https://www.voidrev.us/css/main2.css" />
<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600" rel="stylesheet" type="text/css">
<?php
} elseif ($ExperimentalTheme == "2016E") {
?>
<link rel="stylesheet" href="https://www.voidrev.us/css/2016e.css" />
<?
} elseif ($ExperimentalTheme == "AprilFools") {
?>
<link rel="stylesheet" href="https://www.voidrev.us/css/aprilfools.css" />
<?
} elseif ($ExperimentalTheme == "newtheme") {
?>
<link rel="stylesheet" href="https://www.voidrev.us/css/newtheme.css" />
<?
} else {
?>
<link rel="stylesheet" href="https://www.voidrev.us/css/main2.css" />
<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600" rel="stylesheet" type="text/css">
<?
}
?>
<script>
//Set if it browser's do not track flag is enabled
var Roblox = Roblox || {};
(function() {
var dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
if (typeof window.external !== "undefined" &&
typeof window.external.msTrackingProtectionEnabled !== "undefined") {
dnt = dnt || window.external.msTrackingProtectionEnabled();
}
Roblox.browserDoNotTrack = dnt == "1" || dnt == "yes" || dnt === true;
})();
</script>
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.RealTimeSettings = Roblox.RealTimeSettings || {
NotificationsEndpoint: "https://www.voidrev.us",
MaxConnectionTime: "21600000",
IsEventPublishingEnabled: false,
IsDisconnectOnSlowConnectionDisabled: true,
IsSignalRClientTransportRestrictionEnabled: true,
IsLocalStorageInRealTimeEnabled: true,
IsDebuggerEnabled: "False"
}
</script>
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.EnvironmentUrls = Roblox.EnvironmentUrls || {};
Roblox.EnvironmentUrls = {
"abtestingApiSite": "https://abtesting.voidrev.us",
"accountInformationApi": "https://www.voidrev.us",
"accountSettingsApi": "https://accountsettings.voidrev.us",
"adConfigurationApi": "https://adconfiguration.voidrev.us",
"adsApi": "https://ads.voidrev.us",
"apiGatewayCdnUrl": "https://apis.voidrev.us",
"apiGatewayUrl": "https://apis.voidrev.us",
"apiProxyUrl": "https://www.voidrev.us",
"assetDeliveryApi": "https://assetdelivery.voidrev.us",
"authApi": "https://auth.voidrev.us",
"avatarApi": "https://avatar.voidrev.us",
"badgesApi": "https://badges.voidrev.us",
"billingApi": "https://billing.voidrev.us",
"captchaApi": "https://captcha.voidrev.us",
"catalogApi": "https://catalog.voidrev.us",
"chatApi": "https://www.voidrev.us",
"chatModerationApi": "https://chatmoderation.voidrev.us",
"contactsApi": "https://contacts.voidrev.us",
"contentStoreApi": "https://contentstore.voidrev.us",
"developApi": "https://develop.voidrev.us",
"domain": "voidrev.us",
"economyApi": "https://economy.voidrev.us",
"economycreatorstatsApi": "https://economycreatorstats.voidrev.us",
"engagementPayoutsApi": "https://engagementpayouts.voidrev.us",
"followingsApi": "https://followings.voidrev.us",
"friendsApi": "https://friends.voidrev.us",
"gameInternationalizationApi": "https://gameinternationalization.voidrev.us",
"gamesApi": "https://games.voidrev.us",
"groupsApi": "https://groups.voidrev.us",
"groupsModerationApi": "https://groupsmoderation.voidrev.us",
"helpSite": "http://help.voidrev.us",
"inventoryApi": "https://inventory.voidrev.us",
"itemConfigurationApi": "https://itemconfiguration.voidrev.us",
"localeApi": "https://locale.voidrev.us",
"localizationTablesApi": "https://localizationtables.voidrev.us",
"metricsApi": "https://www.voidrev.us",
"midasApi": "https://midas.voidrev.us",
"notificationApi": "https://www.voidrev.us",
"premiumFeaturesApi": "https://premiumfeatures.voidrev.us",
"presenceApi": "https://presence.voidrev.us",
"privateMessagesApi": "https://privatemessages.voidrev.us",
"publishApi": "https://publish.voidrev.us",
"restrictedHoursServiceApi": "https://apis.voidrev.us/restricted-hours-service",
"screenTimeApi": "https://apis.rcs.voidrev.us/screen-time-api",
"shareApi": "https://share.voidrev.us",
"thumbnailsApi": "https://thumbnails.voidrev.us",
"tradesApi": "https://trades.voidrev.us",
"translationRolesApi": "https://translationroles.voidrev.us",
"twoStepVerificationApi": "https://twostepverification.voidrev.us",
"universalAppConfigurationApi": "https://apis.voidrev.us/universal-app-configuration",
"userAgreementsServiceApi": "https://apis.voidrev.us/user-agreements",
"userModerationApi": "https://usermoderation.voidrev.us",
"usersApi": "https://users.voidrev.us",
"userSettingsApi": "https://apis.voidrev.us/user-settings-api",
"voiceApi": "https://voice.voidrev.us",
"websiteUrl": "https://www.voidrev.us"
};
for (var urlName in additionalUrls) {
Roblox.EnvironmentUrls[urlName] = additionalUrls[urlName];
}
</script>
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.GaEventSettings = {
gaDFPPreRollEnabled: "false" === "true",
gaLaunchAttemptAndLaunchSuccessEnabled: "false" === "true",
gaPerformanceEventEnabled: "false" === "true"
};
</script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='header' type='text/javascript' src='https://www.voidrev.us/js/2469d979b1ba0d936a57c243e7bb1b84.js'>
</script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="Polyfill" data-bundle-source="Main" src="https://www.voidrev.us/js/772034db167d3f4260047db4a7f2b8a58cf448709327013541e47c8962b6e556.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="XsrfProtection" data-bundle-source="Main" src="https://www.voidrev.us/js/4db2f741b7a3ec36d11fec999ce33f708ae85641cabfd27e11e0935928f7d9c4.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="HeaderScripts" data-bundle-source="Main" src="https://www.voidrev.us/js/97cb9ac7262155c329a259fce9f940f9bcfa852a6a1ccb44bd8a41c31e84e54b.js"></script>
<meta name="roblox-tracer-meta-data" data-access-token="S3EXjCZQQr6OixnmKu+hoa3OSfpvPP5qgU0esiWgwreFUUMBnPhEaoS5yIIrf9bdYlSgW0XKCb1So9Rhtj1eMzt/MJWcyKZ4TwIckHVj" data-service-name="Web" data-tracer-enabled="false" data-api-sites-request-allow-list="friends.voidrev.us,www.voidrev.us,thumbnails.voidrev.us,games.voidrev.us,gameinternationalization.voidrev.us,localizationtables.voidrev.us" data-sample-rate="5" data-is-instrument-page-performance-enabled="true" />
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="RobloxTracer" data-bundle-source="Main" src="https://www.voidrev.us/js/adeccc658a8d5ddc63fb224cc0bcd3e29b73d70db3847c0379426bfa128d9381.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="RealTime" data-bundle-source="Main" src="https://www.voidrev.us/js/89f30f6701e04efb9dad1b1fb75ebd7cfe55257af8c8cefbd609039c4d66d8a8.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="CrossTabCommunication" data-bundle-source="Main" src="https://www.voidrev.us/js/948f3bfc9bbd152f537592b51c1a7765cdc0dfc538d74b7e5fc696c476c8792b.js"></script>
<script type="text/javascript">
if (Roblox && Roblox.EventStream) {
Roblox.EventStream.Init("//ecsv2.roblox.com/www/e.png",
"//ecsv2.roblox.com/www/e.png",
"//ecsv2.roblox.com/pe?t=studio",
"//ecsv2.roblox.com/pe?t=diagnostic");
}
</script>
<script type="text/javascript">
if (Roblox && Roblox.PageHeartbeatEvent) {
Roblox.PageHeartbeatEvent.Init([2, 8, 20, 60]);
}
</script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='intl-polyfill' type='text/javascript' src='https://www.voidrev.us/js/d44520f7da5ec476cfb1704d91bab327.js'></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="InternationalCore" data-bundle-source="Main" src="https://www.voidrev.us/js/95044be3ff42e3dc429313faca1316cea62f328a39e29689ffeda9002f3a8bc6.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="TranslationResources" data-bundle-source="Main" src="https://www.voidrev.us/js/83d836a661ff433d5b7ce719c489e43af590ff75ab39ccc6d393546fe91b766a.js"></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='base' type='text/javascript' src='https://www.voidrev.us/js/50b3c7422dee83b54edb5b1e14604652.js'>
</script>
<script type='text/javascript'>
Roblox.config.externalResources = [];
Roblox.config.paths['Pages.Catalog'] = 'https://www.voidrev.us/js/109d883fe3988fca757e26e341ed0fe8.js';
Roblox.config.paths['Pages.CatalogShared'] = 'https://www.voidrev.us/js/33126cd3e259a404a2563594f55a3f06.js';
Roblox.config.paths['Widgets.AvatarImage'] = 'https://www.voidrev.us/js/7d49ac94271bd506077acc9d0130eebb.js';
Roblox.config.paths['Widgets.DropdownMenu'] = 'https://www.voidrev.us/js/da553e6b77b3d79bec37441b5fb317e7.js';
Roblox.config.paths['Widgets.HierarchicalDropdown'] =
'https://www.voidrev.us/js/4a0af9989732810851e9e12809aeb8ad.js';
Roblox.config.paths['Widgets.ItemImage'] = 'https://www.voidrev.us/js/61a0490ba23afa17f9ecca2a079a6a57.js';
Roblox.config.paths['Widgets.PlaceImage'] = 'https://www.voidrev.us/js/a6df74a754523e097cab747621643c98.js';
</script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="CoreUtilities" data-bundle-source="Main" src="https://www.voidrev.us/js/0d2e4a6cc70316faf0e4f869d9e0afa3dd3ef75da87d231bbe40b30b7021cf0c.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="CoreRobloxUtilities" data-bundle-source="Main" src="https://www.voidrev.us/js/76a4480b37d00df868cd2f72f045e279ab6525b49284e5486c28fd2c3fb8f562.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="React" data-bundle-source="Main" src="https://www.voidrev.us/js/b79589d3dfb2446936aac95605deaa507ce5bc3e09073bac7dd04872880694c2.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="ReactUtilities" data-bundle-source="Main" src="https://www.voidrev.us/js/cf340fb618d9a73913b30dfc624ae60d68b9e59723746e6c08d06d14ebdd6dca.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="ReactStyleGuide" data-bundle-source="Main" src="https://www.voidrev.us/js/0346acf635cbe0dc3b71af9a6be331830c5b9a2505bebc4dba6299d1f463de61.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="ConfigureWebApps" data-bundle-source="Main" src="https://www.voidrev.us/js/5259cfe8a3e36118bd61120693dbba3ba87f2c3641f84bb07e29f1d69fe87523.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="CookieBannerV3" data-bundle-source="Main" src="https://www.voidrev.us/js/7693d98990f875a88c91c0385e1b0542bb51913fb34b23f414b6890d90353c40.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_CommonUI.Messages" data-bundle-source="Unknown" src="https://www.voidrev.us/js/18dede93de3aac02225e1e6e9957d98d6983c39fc9e76eb0cdb05090e5551f95.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_CommonUI.Messages" data-bundle-source="Unknown" src="https://www.voidrev.us/js/5b148ca445e1fd4ef905bc3665b2e29d065ab357cc88fd68be95b519f6e2da0d.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.Tracking" data-bundle-source="Unknown" src="https://www.voidrev.us/js/ce6a4105a4d28cac59aa57a3d6615d56ba63526569ebfd88d49ac363d61caddb.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.Tracking" data-bundle-source="Unknown" src="https://www.voidrev.us/js/fb47e86d6d7deaf62c7c5c8a62d915361b3f9b47503976e24e4fdd44710a492e.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="Footer" data-bundle-source="Main" src="https://www.voidrev.us/js/bffafd994791f59d1efb67723313fc0f59b58fef8dec7cf83535c8f4d1d1ebd9.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Common.AlertsAndOptions" data-bundle-source="Unknown" src="https://www.voidrev.us/js/57d1b7776de993a3bf8ace38e6efd8f8ce5b9a294362c029990f0cf131548531.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Common.AlertsAndOptions" data-bundle-source="Unknown" src="https://www.voidrev.us/js/385a62cb16e1c8524da81c17728733d79e3ad9ccbc342d982fe79352f8785dba.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_CommonUI.Features" data-bundle-source="Unknown" src="https://www.voidrev.us/js/c629f6739d6903fec0d935d26a9cea02ff757856d4ed73a83fd1535affea0300.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_CommonUI.Features" data-bundle-source="Unknown" src="https://www.voidrev.us/js/5370e5e55fc9993ec53b0a4195e82290b8c1c5f95a1fb5cd11a2ec82d5d07809.js"></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='angular' type='text/javascript' src='https://www.voidrev.us/js/ae3d621886e736e52c97008e085fa286.js'></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="AngularJsUtilities" data-bundle-source="Main" src="https://www.voidrev.us/js/9052ba886c2369806824f9de29e8fe45bb358b002eb1fe0305e8ca2eba17a3f5.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="InternationalAngularJs" data-bundle-source="Main" src="https://www.voidrev.us/js/90f18784a43a70553e967191b948f70b0193df565f1605762c3c1e245ab4b55a.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="Thumbnails" data-bundle-source="Main" src="https://www.voidrev.us/js/d5ea02ab1f95cb8aefa0a3f4cd0151b4220841fc448c2072d3481d95017db6ab.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="PresenceStatus" data-bundle-source="Main" src="https://www.voidrev.us/js/bc21a1cb026cbbe9d57b77c1811f0925ca574a53a55a656c4ca4e216dda96eb3.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="VerificationUpsell" data-bundle-source="Main" src="https://www.voidrev.us/js/e7149e6667bdff394b3b50ca5c585e079f1408b0ee37efec0edf41fbbd6c6816.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.VerificationUpsell" data-bundle-source="Unknown" src="https://www.voidrev.us/js/a361fbd97babc6c604f9ae6a5537ef556a812e15eec9572cc6bd56c0c3055b98.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.VerificationUpsell" data-bundle-source="Unknown" src="https://www.voidrev.us/js/5e398ed4822068505e927f3060b178c71ef2936b8be8c526623c544057ac7202.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="Navigation" data-bundle-source="Main" src="https://www.voidrev.us/js/4e3074d46e9466cd6f66765760f98a3ef226249550e5ed4bd5ebe0558c5e5b8d.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.ShopDialog" data-bundle-source="Unknown" src="https://www.voidrev.us/js/95fdafe5af749e388de603b9ee7f67bb092c3c790badc572db4e2bca0c32b49a.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.ShopDialog" data-bundle-source="Unknown" src="https://www.voidrev.us/js/c0606e8d6eb4487cdc70d318e6de3d9aaeeb465ddb84acd95139011e56c5e5c6.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="LibraryMetrics" data-bundle-source="Main" src="https://www.voidrev.us/js/1e7d939970f357a887ee0a7ced31690d5e9b7dcc4e9aed3dc5065e03185c5f6d.js"></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='page' type='text/javascript' src='https://www.voidrev.us/js/6bd86b784e56e9423005f7ab56d69a92.js'>
</script>
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.UpsellAdModal = Roblox.UpsellAdModal || {};
Roblox.UpsellAdModal.Resources = {
title: "Remove Ads Like This",
body: "Builders Club members do not see external ads like these.",
accept: "Upgrade Now",
decline: "No, thanks"
};
</script>
<script type="text/javascript">
Roblox.FixedUI.gutterAdsEnabled = false;
</script>
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.jsConsoleEnabled = false;
</script>
<script type="text/javascript">
if (typeof(Roblox) === "undefined") {
Roblox = {};
}
Roblox.Endpoints = Roblox.Endpoints || {};
Roblox.Endpoints.Urls = Roblox.Endpoints.Urls || {};
Roblox.Endpoints.Urls['/api/item.ashx'] = 'https://www.voidrev.us/api/item.ashx';
Roblox.Endpoints.Urls['/asset/'] = 'https://www.voidrev.us/asset/';
Roblox.Endpoints.Urls['/client-status/set'] = 'https://www.voidrev.us/client-status/set';
Roblox.Endpoints.Urls['/client-status'] = 'https://www.voidrev.us/client-status';
Roblox.Endpoints.Urls['/game/'] = 'https://www.voidrev.us/game/';
Roblox.Endpoints.Urls['/game-auth/getauthticket'] = 'https://www.voidrev.us/game-auth/getauthticket';
Roblox.Endpoints.Urls['/game/edit.ashx'] = 'https://www.voidrev.us/game/edit.ashx';
Roblox.Endpoints.Urls['/game/getauthticket'] = 'https://www.voidrev.us/game/getauthticket';
Roblox.Endpoints.Urls['/game/placelauncher.ashx'] = 'https://www.voidrev.us/game/placelauncher.ashx';
Roblox.Endpoints.Urls['/game/preloader'] = 'https://www.voidrev.us/game/preloader';
Roblox.Endpoints.Urls['/game/report-stats'] = 'https://www.voidrev.us/game/report-stats';
Roblox.Endpoints.Urls['/game/report-event'] = 'https://www.voidrev.us/game/report-event';
Roblox.Endpoints.Urls['/game/updateprerollcount'] = 'https://www.voidrev.us/game/updateprerollcount';
Roblox.Endpoints.Urls['/login/default.aspx'] = 'https://www.voidrev.us/login/default.aspx';
Roblox.Endpoints.Urls['/my/character.aspx'] = 'https://www.voidrev.us/my/character.aspx';
Roblox.Endpoints.Urls['/my/money.aspx'] = 'https://www.voidrev.us/my/money.aspx';
Roblox.Endpoints.Urls['/chat/chat'] = 'https://www.voidrev.us/chat/chat';
Roblox.Endpoints.Urls['/presence/users'] = 'https://www.voidrev.us/presence/users';
Roblox.Endpoints.Urls['/presence/user'] = 'https://www.voidrev.us/presence/user';
Roblox.Endpoints.Urls['/friends/list'] = 'https://www.voidrev.us/friends/list';
Roblox.Endpoints.Urls['/navigation/getCount'] = 'https://www.voidrev.us/navigation/getCount';
Roblox.Endpoints.Urls['/catalog/browse.aspx'] = 'https://www.voidrev.us/catalog/browse.aspx';
Roblox.Endpoints.Urls['/catalog/html'] = 'https://www.voidrev.us/catalog/html';
Roblox.Endpoints.Urls['/catalog/json'] = 'https://www.voidrev.us/catalog/json';
Roblox.Endpoints.Urls['/catalog/contents'] = 'https://www.voidrev.us/catalog/contents';
Roblox.Endpoints.Urls['/catalog/lists.aspx'] = 'https://www.voidrev.us/catalog/lists.aspx';
Roblox.Endpoints.Urls['/asset-hash-thumbnail/image'] =
'https://www.voidrev.us/asset-hash-thumbnail/image';
Roblox.Endpoints.Urls['/asset-hash-thumbnail/json'] = 'https://www.voidrev.us/asset-hash-thumbnail/json';
Roblox.Endpoints.Urls['/asset-thumbnail-3d/json'] = 'https://www.voidrev.us/asset-thumbnail-3d/json';
Roblox.Endpoints.Urls['/asset-thumbnail/image'] = 'https://www.voidrev.us/asset-thumbnail/image';
Roblox.Endpoints.Urls['/asset-thumbnail/json'] = 'https://www.voidrev.us/asset-thumbnail/json';
Roblox.Endpoints.Urls['/asset-thumbnail/url'] = 'https://www.voidrev.us/asset-thumbnail/url';
Roblox.Endpoints.Urls['/asset/request-thumbnail-fix'] =
'https://www.voidrev.us/asset/request-thumbnail-fix';
Roblox.Endpoints.Urls['/avatar-thumbnail-3d/json'] = 'https://www.voidrev.us/avatar-thumbnail-3d/json';
Roblox.Endpoints.Urls['/avatar-thumbnail/image'] = 'https://www.voidrev.us/avatar-thumbnail/image';
Roblox.Endpoints.Urls['/avatar-thumbnail/json'] = 'https://www.voidrev.us/avatar-thumbnail/json';
Roblox.Endpoints.Urls['/avatar-thumbnails'] = 'https://www.voidrev.us/avatar-thumbnails';
Roblox.Endpoints.Urls['/avatar/request-thumbnail-fix'] = 'https://www.voidrev.us/avatar/request-thumbnail-fix';
Roblox.Endpoints.Urls['/bust-thumbnail/json'] = 'https://www.voidrev.us/bust-thumbnail/json';
Roblox.Endpoints.Urls['/group-thumbnails'] = 'https://www.voidrev.us/group-thumbnails';
Roblox.Endpoints.Urls['/groups/getprimarygroupinfo.ashx'] =
'https://www.voidrev.us/groups/getprimarygroupinfo.ashx';
Roblox.Endpoints.Urls['/headshot-thumbnail/json'] = 'https://www.voidrev.us/headshot-thumbnail/json';
Roblox.Endpoints.Urls['/item-thumbnails'] = 'https://www.voidrev.us/item-thumbnails';
Roblox.Endpoints.Urls['/outfit-thumbnail/json'] = 'https://www.voidrev.us/outfit-thumbnail/json';
Roblox.Endpoints.Urls['/place-thumbnails'] = 'https://www.voidrev.us/place-thumbnails';
Roblox.Endpoints.Urls['/thumbnail/asset/'] = 'https://www.voidrev.us/thumbnail/asset/';
Roblox.Endpoints.Urls['/thumbnail/avatar-headshot'] = 'https://www.voidrev.us/thumbnail/avatar-headshot';
Roblox.Endpoints.Urls['/thumbnail/avatar-headshots'] = 'https://www.voidrev.us/thumbnail/avatar-headshots';
Roblox.Endpoints.Urls['/thumbnail/user-avatar'] = 'https://www.voidrev.us/thumbnail/user-avatar';
Roblox.Endpoints.Urls['/thumbnail/resolve-hash'] = 'https://www.voidrev.us/thumbnail/resolve-hash';
Roblox.Endpoints.Urls['/thumbnail/place'] = 'https://www.voidrev.us/thumbnail/place';
Roblox.Endpoints.Urls['/thumbnail/get-asset-media'] = 'https://www.voidrev.us/thumbnail/get-asset-media';
Roblox.Endpoints.Urls['/thumbnail/remove-asset-media'] = 'https://www.voidrev.us/thumbnail/remove-asset-media';
Roblox.Endpoints.Urls['/thumbnail/set-asset-media-sort-order'] =
'https://www.voidrev.us/thumbnail/set-asset-media-sort-order';
Roblox.Endpoints.Urls['/thumbnail/place-thumbnails'] = 'https://www.voidrev.us/thumbnail/place-thumbnails';
Roblox.Endpoints.Urls['/thumbnail/place-thumbnails-partial'] =
'https://www.voidrev.us/thumbnail/place-thumbnails-partial';
Roblox.Endpoints.Urls['/thumbnail_holder/g'] = 'https://www.voidrev.us/thumbnail_holder/g';
Roblox.Endpoints.Urls['/users/{id}/profile'] = 'https://www.voidrev.us/users/{id}/profile';
Roblox.Endpoints.Urls['/service-workers/push-notifications'] =
'https://www.voidrev.us/service-workers/push-notifications';
Roblox.Endpoints.Urls['/notification-stream/notification-stream-data'] =
'https://www.voidrev.us/notification-stream/notification-stream-data';
Roblox.Endpoints.Urls['/api/friends/acceptfriendrequest'] =
'https://www.voidrev.us/api/friends/acceptfriendrequest';
Roblox.Endpoints.Urls['/api/friends/declinefriendrequest'] =
'https://www.voidrev.us/api/friends/declinefriendrequest';
Roblox.Endpoints.addCrossDomainOptionsToAllRequests = true;
</script>
<script type="text/javascript">
if (typeof(Roblox) === "undefined") {
Roblox = {};
}
Roblox.Endpoints = Roblox.Endpoints || {};
Roblox.Endpoints.Urls = Roblox.Endpoints.Urls || {};
</script>
<script>
Roblox = Roblox || {};
Roblox.AbuseReportPVMeta = {
desktopEnabled: true,
phoneEnabled: false,
inAppEnabled: false
};
</script>
<meta name="thumbnail-meta-data" data-is-webapp-cache-enabled="False" data-webapp-cache-expirations-timespan="00:01:00" data-request-min-cooldown="1000" data-request-max-cooldown="30000" data-request-max-retry-attempts="3" data-request-batch-size="100" data-thumbnail-metrics-sample-size="20" data-concurrent-thumbnail-request-count="4" />
</head>
<body id="rbx-body" class="<?php if($ExperimentalTheme == "Dark"){echo"dark-theme";}?>" data-performance-relative-value="0.005" data-internal-page-name="" data-send-event-percentage="0">
<meta name="csrf-token" data-token="nIGL7ec/+01r" />
<div id="roblox-linkify" data-enabled="true" data-regex="(https?\:\/\/)?(?:www\.)?([a-z0-9-]{2,}\.)*(((m|de|www|web|api|blog|wiki|corp|polls|bloxcon|developer|devforum|forum|status)\.roblox\.com|robloxlabs\.com)|(www\.shoproblox\.com)|(roblox\.status\.io)|(rblx\.co)|help\.roblox\.com(?![A-Za-z0-9\/.]*\/attachments\/))(?!\/[A-Za-z0-9-+&amp;@#\/=~_|!:,.;]*%)((\/[A-Za-z0-9-+&amp;@#\/%?=~_|!:,.;]*)|(?=\s|\b))" data-regex-flags="gm" data-as-http-regex="(([^.]help|polls)\.roblox\.com)"></div>
<div id="image-retry-data" data-image-retry-max-times="30" data-image-retry-timer="500" data-ga-logging-percent="10">
</div>
<div id="http-retry-data" data-http-retry-max-timeout="0" data-http-retry-base-timeout="0" data-http-retry-max-times="1">
</div>
<div ng-modules="baseTemplateApp">
<script type="text/javascript" src="https://www.voidrev.us/js/ffcc04436179c6b2a6668fdfcfbf62b1.js"></script>
</div>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="LegacyStyleGuide" data-bundle-source="Main" src="https://www.voidrev.us/js/9964a42acdd8018a88782b0a21849eff1c04082e598c722c2cc27256864047ec.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="AccountSecurityPrompt" data-bundle-source="Main" src="https://www.voidrev.us/js/07610e5441e23d0d6ac2b7f00b0adfd769238bd96f31e0bfa6ccc0f08aef38c4.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.AccountSecurityPrompt" data-bundle-source="Unknown" src="https://www.voidrev.us/js/f0d954fe2ab475b525394dc3ae13c6f0adc4387ef8fa07af6783684a0fb7088e.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.AccountSecurityPrompt" data-bundle-source="Unknown" src="https://www.voidrev.us/js/908b5624a45d4e3e3dfd17eca138e45942985094cdd5ca6051f3167ce48fc9e5.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="NotificationStream" data-bundle-source="Main" src="https://www.voidrev.us/js/a7e263b8e4c19403bad6b7ff92f6e80808a72642e9dbab9d0f8934c2e52513eb.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Notifications.NotificationStream" data-bundle-source="Unknown" src="https://www.voidrev.us/js/d6df2173824862b7856020b0d2acc5771d44d5504759ce7a66d68260f2b27f2e.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Notifications.NotificationStream" data-bundle-source="Unknown" src="https://www.voidrev.us/js/eab15b370b22fb6ff2fb67487cc3459f1cdeb238d5bbe85cc733c0647333773c.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="Contacts" data-bundle-source="Main" src="https://www.voidrev.us/js/6291b18e0d22b742564031e30914caa8a4326d2db7916b04ab8524c6b306f25a.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="Chat" data-bundle-source="Main" src="https://www.voidrev.us/js/28dea894f23f4a1c7f13629621df2873dd778b9e44685e7c85464c4a3944940b.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.Chat" data-bundle-source="Unknown" src="https://www.voidrev.us/js/c2e07c35f6b6f198f4cdd7617700e3fdc08a4950057b5d951e177cb3a799925f.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.Chat" data-bundle-source="Unknown" src="https://www.voidrev.us/js/fa72396066e6281487ac88403442eedb3f1fd2bfa5d7ce9d3f24555d47b07927.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="ItemPurchase" data-bundle-source="Main" src="https://www.voidrev.us/js/5804331763d8dd8d8fb671924b73023bd1feddd205229569f18413e6f0190f93.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.Item" data-bundle-source="Unknown" src="https://www.voidrev.us/js/0eb9f3bc4309642fdf241b8263d8987cbe07add49b9342084cdc23be4e042d93.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.Item" data-bundle-source="Unknown" src="https://www.voidrev.us/js/9cf047a292f5735b2ce9c1896e1951a873acc17e0d794deddde210b8bd91d6d4.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Purchasing.PurchaseDialog" data-bundle-source="Unknown" src="https://www.voidrev.us/js/7918ac8b721b946f2800652b084166ae795408706e447c98a9af8ca3e8a0cbc0.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Purchasing.PurchaseDialog" data-bundle-source="Unknown" src="https://www.voidrev.us/js/4e1037868737fa797b0e3248bc05479c925d8029ec146d6633aeebd9e0bb6c71.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.ItemModel" data-bundle-source="Unknown" src="https://www.voidrev.us/js/97b99d5ea1fd09bf3fa4aed595502676b5c6d366675698913916b7b0f1b33a30.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.ItemModel" data-bundle-source="Unknown" src="https://www.voidrev.us/js/8f8d451cbe04b730d167b5ce92019da934a5c2da928ca13d9b3eb15cbe2ff5d5.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="IdVerification" data-bundle-source="Main" src="https://www.voidrev.us/js/6fb6e995f12e838d8f66c5e1ab8a5b60557dc6e1cd355ecbcff835358590ab90.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Verification.Identity" data-bundle-source="Unknown" src="https://www.voidrev.us/js/34e63cca1aae541077c77eece3e7604888f5a7a041056b9a464c33381e5f3829.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Verification.Identity" data-bundle-source="Unknown" src="https://www.voidrev.us/js/c066d18ad754d4b672a46107920e8206d22093da36183e5c0c8048d1dbea82db.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_CommonUI.Controls" data-bundle-source="Unknown" src="https://www.voidrev.us/js/556d0c65739acf5c4b72d17c9433092f429d513d447d9ac2a918a21132fea0de.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_CommonUI.Controls" data-bundle-source="Unknown" src="https://www.voidrev.us/js/e4c74a5e7d87ef7c6ddb0ff25cd193f6f7495ad1566381290f0bbde36124a4d1.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="GameLaunch" data-bundle-source="Main" src="https://www.voidrev.us/js/c8a5a277ce6a0cbc4f7b673d7d59e93c63a62a2d86e68d32eac55af32a553945.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Common.VisitGame" data-bundle-source="Unknown" src="https://www.voidrev.us/js/f5964480d72a66fed298d36e9ad7c0a033020f0f488a49773b129905e4390e60.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Common.VisitGame" data-bundle-source="Unknown" src="https://www.voidrev.us/js/d720f5c5c32eb353fd76c5a101f47e529363a19bf44c18b01b501e0c648c81b4.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.GameLaunchGuestMode" data-bundle-source="Unknown" src="https://www.voidrev.us/js/f41ec06eeae79fa94e6ae9f435b0a1c6743085e898884eddb4d4025ca3af8a44.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.GameLaunchGuestMode" data-bundle-source="Unknown" src="https://www.voidrev.us/js/6852af8f7df15395ccb3d121a914ee7301a7162f5afb3395575c6075c617923f.js"></script>
<div ng-modules="pageTemplateApp">
<script type="text/javascript">
"use strict";
angular.module("pageTemplateApp", []).run(['$templateCache', function($templateCache) {}]);
</script>
<script>
document.addEventListener('DOMContentLoaded', () => {
// Your code here
const uploadButton = document.getElementById('upload-button');
const loadingContainer = document.getElementById('loading-container');
if (uploadButton && loadingContainer) {
uploadButton.addEventListener('click', () => {
loadingContainer.style.setProperty('display', 'block', 'important');
uploadButton.style.setProperty('display', 'none', 'important');
});
}
});
</script>
</div>
<?php
if ($assettypeid == 3) {
?>
<form action="/build/doverifiedupload" enctype="multipart/form-data" id="upload-form" method="post">
<input id="assetTypeId" name="assetTypeId" type="hidden" value="<?= $assettypeid; ?>" />
<input id="isOggUploadEnabled" name="isOggUploadEnabled" type="hidden" value="True" />
<input id="groupId" name="groupId" type="hidden" value="" />
<input id="onVerificationPage" name="onVerificationPage" type="hidden" value="False" />
<input id="captchaEnabled" name="captchaEnabled" type="hidden" value="False" />
<input id="captchaToken" name="captchaToken" type="hidden" value="" />
<input id="captchaProvider" name="captchaProvider" type="hidden" value="" />
<div id="container">
<div id="audio-bucket-data" data-max-audio-size="20480000" data-max-audio-length="420" data-audio-enabled="false" data-audio-size="8388608" data-audio-price="100" data-shortsoundeffect-enabled="true" data-shortsoundeffect-size="786432" data-shortsoundeffect-price="20" data-longsoundeffect-enabled="true" data-longsoundeffect-size="1835008" data-longsoundeffect-price="35" data-music-enabled="true" data-music-size="8388608" data-music-price="70" data-longmusic-enabled="true" data-longmusic-size="20480000" data-longmusic-price="350"></div>
<div class="form-row">Audio uploads must be smaller than 10 MB.</div>
<div class="form-row">
<label for="file">Find your .mp3 or .ogg file:</label>
<input id="file" type="file" accept="audio/mpeg,audio/wav,audio/ogg" name="file" tabindex="1">
<span id="file-error" class="error"></span>
</div>
<div class="form-row">
<label for="name">Audio Name:</label>
<input id="name" type="text" class="text-box text-box-medium" name="name" maxlength="50" tabindex="2">
<span id="name-error" class="error"></span>
</div>
<div class="form-row submit-buttons">
<a id="upload-button" class="btn-medium btn-primary btn-level-element " data-freeaudio-enabled="true" tabindex="4">Upload<span class=""></span></a>
<span id="loading-container"><img src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif"></span>
<div id="upload-fee-item-result-error" class="status-error btn-level-element hidden">">You cannot manage this place</div>
<div id="upload-fee-item-result-success" class="status-confirm btn-level-element ">
<div><a id="upload-fee-confirmation-link" target="_top">Audio</a> successfully created!</div>
</div>
</div>
</div>
</form>
<?php }
if ($assettypeid == 13) {
?>
<form action="/build/doverifiedupload" enctype="multipart/form-data" id="upload-form" method="post">
<input id="assetTypeId" name="assetTypeId" type="hidden" value="<?= $assettypeid; ?>" />
<input id="isOggUploadEnabled" name="isOggUploadEnabled" type="hidden" value="True" />
<input id="groupId" name="groupId" type="hidden" value="" />
<input id="onVerificationPage" name="onVerificationPage" type="hidden" value="False" />
<input id="captchaEnabled" name="captchaEnabled" type="hidden" value="False" />
<input id="captchaToken" name="captchaToken" type="hidden" value="" />
<input id="captchaProvider" name="captchaProvider" type="hidden" value="" />
<div id="container">
<div class="form-row">
<label for="file">Find your image:</label>
<input id="file" type="file" accept="image/png" name="file" tabindex="1">
<span id="file-error" class="error"></span>
</div>
<div class="form-row">
<label for="name">Decal Name:</label>
<input id="name" type="text" class="text-box text-box-medium" name="name" maxlength="50" tabindex="2">
<span id="name-error" class="error"></span>
</div>
<div class="form-row submit-buttons">
<a id="upload-button" class="btn-medium btn-level-element btn-primary" data-freeaudio-enabled="true" tabindex="4">Upload<span class=""></span></a>
<span id="loading-container"><img src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif"></span>
<div id="upload-fee-item-result-error" class="status-error btn-level-element hidden">">You cannot manage this place</div>
<div id="upload-fee-item-result-success" class="status-confirm btn-level-element ">
<div><a id="upload-fee-confirmation-link" target="_top">Decal</a> successfully created!</div>
</div>
</div>
</div>
</form>
<?php }
if($assettypeid == 63){
?>
<form action="/build/doverifiedupload" enctype="multipart/form-data" id="upload-form" method="post">
<input id="assetTypeId" name="assetTypeId" type="hidden" value="<?=$assettype;?>" />
<input id="isOggUploadEnabled" name="isOggUploadEnabled" type="hidden" value="True" />
<input id="groupId" name="groupId" type="hidden" value="" />
<input id="onVerificationPage" name="onVerificationPage" type="hidden" value="False" />
<input id="captchaEnabled" name="captchaEnabled" type="hidden" value="False" />
<input id="captchaToken" name="captchaToken" type="hidden" value="" />
<input id="captchaProvider" name="captchaProvider" type="hidden" value="" />
<div id="container">
<div class="form-row">
<label for="file">Find your video:</label>
<input id="file" type="file" accept=".webm" name="file" tabindex="1">
<span id="file-error" class="error"></span>
<label><h5>no you cant just rename a mp4 to webm it wont work</h5></label>
</div>
<div class="form-row">
<label for="name">Video Name:</label>
<input id="name" type="text" class="text-box text-box-medium" name="name" maxlength="50" tabindex="2">
<label for="name">Description:</label>
<input id="name" type="text" class="text-box text-box-medium" name="description" maxlength="50" tabindex="2">
<span id="name-error" class="error"></span>
</div>
<div class="form-row submit-buttons">
<a id="upload-button" class="btn-medium btn-level-element btn-primary" data-freeaudio-enabled="true" tabindex="4">Upload<span class=""></span></a>
<span id="loading-container"><img src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif"></span>
<div id="upload-fee-item-result-error" class="status-error btn-level-element hidden">">You cannot manage this place</div>
<div id="upload-fee-item-result-success" class="status-confirm btn-level-element ">
<div><a id="upload-fee-confirmation-link" target="_top">Video</a> successfully created!</div>
</div>
</div>
</div>
</form>
<?php }
if ($assettypeid == 11) { ?>
<form action="/build/doverifiedupload" enctype="multipart/form-data" id="upload-form" method="post">
<input id="assetTypeId" name="assetTypeId" type="hidden" value="<?= $assettypeid; ?>" />
<input id="isOggUploadEnabled" name="isOggUploadEnabled" type="hidden" value="True" />
<input id="groupId" name="groupId" type="hidden" value="" />
<input id="onVerificationPage" name="onVerificationPage" type="hidden" value="False" />
<input id="captchaEnabled" name="captchaEnabled" type="hidden" value="False" />
<input id="captchaToken" name="captchaToken" type="hidden" value="" />
<input id="captchaProvider" name="captchaProvider" type="hidden" value="" />
<div id="container">
<div class="form-row">Did you use the template? If not, <a target="_blank" href="https://www.voidrev.us/img/shirttemplate.png">download it here</a>.</div>
<div class="form-row">
<label for="file">Find your image:</label>
<input id="file" type="file" accept="image/png,image/jpeg,image/bmp" name="file" tabindex="1">
<span id="file-error" class="error"></span>
</div>
<div class="form-row">
<label for="name">Shirt Name:</label>
<input id="name" type="text" class="text-box text-box-medium" name="name" maxlength="50" tabindex="2">
<label for="robux">Cost:</label>
<input id="robux" type="text" class="text-box text-box-small" name="robux" maxlength="10" tabindex="2">
<span id="name-error" class="error"></span>
</div>
<div class="form-row submit-buttons">
<a id="upload-button" class="btn-medium btn-primary" data-freeaudio-enabled="true" tabindex="4">Upload for 20 Robux<span class=""></span></a>
<span id="loading-container"><img src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif"></span>
<div id="upload-fee-item-result-error" class="status-error hidden">">You cannot manage this place</div>
<div id="upload-fee-item-result-success" class="status-confirm">
<div><a id="upload-fee-confirmation-link" target="_top">Shirt</a> successfully created!</div>
</div>
</div>
</div>
</form>
<?php }
if ($assettypeid == 18) { ?>
<form action="/build/doverifiedupload" enctype="multipart/form-data" id="upload-form" method="post">
<input id="assetTypeId" name="assetTypeId" type="hidden" value="<?= $assettypeid; ?>" />
<input id="isOggUploadEnabled" name="isOggUploadEnabled" type="hidden" value="True" />
<input id="groupId" name="groupId" type="hidden" value="" />
<input id="onVerificationPage" name="onVerificationPage" type="hidden" value="False" />
<input id="captchaEnabled" name="captchaEnabled" type="hidden" value="False" />
<input id="captchaToken" name="captchaToken" type="hidden" value="" />
<input id="captchaProvider" name="captchaProvider" type="hidden" value="" />
<div id="container">
<div class="form-row">
<label for="file">Find your image:</label>
<input id="file" type="file" accept="image/png" name="file" tabindex="1">
<span id="file-error" class="error"></span>
</div>
<div class="form-row">
<label for="name">Face Name:</label>
<input id="name" type="text" class="text-box text-box-medium" name="name" maxlength="50" tabindex="2">
<label for="robux">Cost:</label>
<input id="robux" type="text" class="text-box text-box-small" name="robux" maxlength="10" tabindex="2">
<span id="name-error" class="error"></span>
</div>
<div class="form-row submit-buttons">
<a id="upload-button" class="btn-medium btn-primary" data-freeaudio-enabled="true" tabindex="4">Upload for 20 Robux<span class=""></span></a>
<span id="loading-container"><img src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif"></span>
<div id="upload-fee-item-result-error" class="status-error hidden">">You cannot manage this place</div>
<div id="upload-fee-item-result-success" class="status-confirm">
<div><a id="upload-fee-confirmation-link" target="_top">Face</a> successfully created!</div>
</div>
</div>
</div>
</form>
<?php }
if ($assettypeid == 12) { ?>
<form action="/build/doverifiedupload" enctype="multipart/form-data" id="upload-form" method="post">
<input id="assetTypeId" name="assetTypeId" type="hidden" value="<?= $assettypeid; ?>" />
<input id="isOggUploadEnabled" name="isOggUploadEnabled" type="hidden" value="True" />
<input id="groupId" name="groupId" type="hidden" value="" />
<input id="onVerificationPage" name="onVerificationPage" type="hidden" value="False" />
<input id="captchaEnabled" name="captchaEnabled" type="hidden" value="False" />
<input id="captchaToken" name="captchaToken" type="hidden" value="" />
<input id="captchaProvider" name="captchaProvider" type="hidden" value="" />
<div id="container">
<div class="form-row">Did you use the template? If not, <a target="_blank" href="https://www.voidrev.us/img/pantstemplate.png">download it here</a>.</div>
<div class="form-row">
<label for="file">Find your image:</label>
<input id="file" type="file" accept="image/png,image/jpeg,image/bmp" name="file" tabindex="1">
<span id="file-error" class="error"></span>
</div>
<div class="form-row">
<label for="name">Pants Name:</label>
<input id="name" type="text" class="text-box text-box-medium" name="name" maxlength="50" tabindex="2">
<label for="robux">Cost:</label>
<input id="robux" type="text" class="text-box text-box-small" name="robux" maxlength="10" tabindex="2">
<span id="name-error" class="error"></span>
</div>
<div class="form-row submit-buttons">
<a id="upload-button" class="btn-medium btn-primary" data-freeaudio-enabled="true" tabindex="4">Upload for 20 Robux<span class=""></span></a>
<span id="loading-container"><img src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif"></span>
<div id="upload-fee-item-result-error" class="status-error hidden">">You cannot manage this place</div>
<div id="upload-fee-item-result-success" class="status-confirm">
<div><a id="upload-fee-confirmation-link" target="_top">Pants</a> successfully created!</div>
</div>
</div>
</div>
</form>
<?php }
if ($assettypeid == 2) { ?>
<form action="/build/doverifiedupload" enctype="multipart/form-data" id="upload-form" method="post">
<input id="assetTypeId" name="assetTypeId" type="hidden" value="<?= $assettypeid; ?>" />
<input id="isOggUploadEnabled" name="isOggUploadEnabled" type="hidden" value="True" />
<input id="groupId" name="groupId" type="hidden" value="" />
<input id="onVerificationPage" name="onVerificationPage" type="hidden" value="False" />
<input id="captchaEnabled" name="captchaEnabled" type="hidden" value="False" />
<input id="captchaToken" name="captchaToken" type="hidden" value="" />
<input id="captchaProvider" name="captchaProvider" type="hidden" value="" />
<div id="container">
<div class="form-row">
<label for="file">Find your image:</label>
<input id="file" type="file" accept="image/png" name="file" tabindex="1">
<span id="file-error" class="error"></span>
</div>
<div class="form-row">
<label for="name">T-Shirt Name:</label>
<input id="name" type="text" class="text-box text-box-medium" name="name" maxlength="50" tabindex="2">
<label for="robux">Cost:</label>
<input id="robux" type="text" class="text-box text-box-small" name="robux" maxlength="10" tabindex="2">
<span id="name-error" class="error"></span>
</div>
<div class="form-row submit-buttons">
<a id="upload-button" class="btn-medium btn-primary" data-freeaudio-enabled="true" tabindex="4">Upload<span class=""></span></a>
<span id="loading-container"><img src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif"></span>
<div id="upload-fee-item-result-error" class="status-error hidden">">You cannot manage this place</div>
<div id="upload-fee-item-result-success" class="status-confirm">
<div><a id="upload-fee-confirmation-link" target="_top">T-Shirt</a> successfully created!</div>
</div>
</div>
</div>
</form>
<?php }
if($assettypeid == 24){ ?>
<form action="/build/doverifiedupload" enctype="multipart/form-data" id="upload-form" method="post">
<input id="assetTypeId" name="assetTypeId" type="hidden" value="<?=$assettype;?>" />
<input id="isOggUploadEnabled" name="isOggUploadEnabled" type="hidden" value="True" />
<input id="groupId" name="groupId" type="hidden" value="" />
<input id="onVerificationPage" name="onVerificationPage" type="hidden" value="False" />
<input id="captchaEnabled" name="captchaEnabled" type="hidden" value="False" />
<input id="captchaToken" name="captchaToken" type="hidden" value="" />
<input id="captchaProvider" name="captchaProvider" type="hidden" value="" />
<div id="container">
<div class="form-row">Did you use the template? If not, <a target="_blank" href="https://www.voidrev.us/assets/animationtemplate.rbxmx">download it here</a>.</div>
<div class="form-row">
<label for="file">Find your RBXMX:</label>
<input id="file" type="file" accept=".rbxmx" name="file" tabindex="1">
<span id="file-error" class="error"></span>
</div>
<div class="form-row">
<label for="name">Animation Name:</label>
<input id="name" type="text" class="text-box text-box-medium" name="name" maxlength="50" tabindex="2">
<label for="robux">Cost:</label>
<input id="robux" type="text" class="text-box text-box-small" name="robux" maxlength="10" tabindex="2">
<span id="name-error" class="error"></span>
</div>
<div class="form-row submit-buttons">
<a id="upload-button" class="btn-medium btn-primary" data-freeaudio-enabled="true" tabindex="4">Upload<span class=""></span></a>
<span id="loading-container"><img src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif"></span>
<div id="upload-fee-item-result-error" class="status-error hidden">">You cannot manage this place</div>
<div id="upload-fee-item-result-success" class="status-confirm">
<div><a id="upload-fee-confirmation-link" target="_top">Animation</a> successfully created!</div>
</div>
</div>
</div>
</form>
<?php }
if ($assettypeid == 8) { ?>
<form action="/build/doverifiedupload" enctype="multipart/form-data" id="upload-form" method="post">
<input id="assetTypeId" name="assetTypeId" type="hidden" value="<?= $assettypeid; ?>" />
<input id="isOggUploadEnabled" name="isOggUploadEnabled" type="hidden" value="True" />
<input id="groupId" name="groupId" type="hidden" value="" />
<input id="onVerificationPage" name="onVerificationPage" type="hidden" value="False" />
<input id="captchaEnabled" name="captchaEnabled" type="hidden" value="False" />
<input id="captchaToken" name="captchaToken" type="hidden" value="" />
<input id="captchaProvider" name="captchaProvider" type="hidden" value="" />
<div id="container">
<div class="form-row">
<label for="file">Find your RBXMX:</label>
<input id="file" type="file" name="file" tabindex="1">
<span id="file-error" class="error"></span>
</div>
<div class="form-row">
<label for="name">Hat Name:</label>
<input id="name" type="text" class="text-box text-box-medium" name="name" tabindex="2">
<div>
<label for="description">Description:</label>
<input id="description" type="text" class="text-box text-box-medium" name="description" tabindex="2">
</div>
<label for="robux">Cost:</label>
<input id="robux" type="text" class="text-box text-box-small" name="robux" maxlength="10" tabindex="2">
<div>
<label for="limited">Limited:</label>
<input type="checkbox" id="limited" name="limited" value="False" />
</div>
</div>
<div class="form-row submit-buttons">
<a id="upload-button" class="btn-medium btn-primary" data-freeaudio-enabled="true" tabindex="4">Upload<span class=""></span></a>
<span id="loading-container"><img src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif"></span>
<div id="upload-fee-item-result-error" class="status-error hidden">">You cannot manage this place</div>
<div id="upload-fee-item-result-success" class="status-confirm ">
<div><a id="upload-fee-confirmation-link" target="_top">Hat</a> successfully created!</div>
</div>
</div>
</div>
</form>
<?php }
if ($assettypeid == 19) { ?>
<form action="/build/doverifiedupload" enctype="multipart/form-data" id="upload-form" method="post">
<input id="assetTypeId" name="assetTypeId" type="hidden" value="<?= $assettypeid; ?>" />
<input id="isOggUploadEnabled" name="isOggUploadEnabled" type="hidden" value="True" />
<input id="groupId" name="groupId" type="hidden" value="" />
<input id="onVerificationPage" name="onVerificationPage" type="hidden" value="False" />
<input id="captchaEnabled" name="captchaEnabled" type="hidden" value="False" />
<input id="captchaToken" name="captchaToken" type="hidden" value="" />
<input id="captchaProvider" name="captchaProvider" type="hidden" value="" />
<div id="container">
<div class="form-row">
<label for="file">Find your RBXMX:</label>
<input id="file" type="file" name="file" tabindex="1">
<span id="file-error" class="error"></span>
</div>
<div class="form-row">
<label for="name">Gear Name:</label>
<input id="name" type="text" class="text-box text-box-medium" name="name" tabindex="2">
<div>
<label for="description">Description:</label>
<input id="description" type="text" class="text-box text-box-medium" name="description" tabindex="2">
</div>
<label for="robux">Cost:</label>
<input id="robux" type="text" class="text-box text-box-small" name="robux" maxlength="10" tabindex="2">
<div>
<label for="Type">Type:</label>
<select id="Type" name="Type">
<option>Melee</option>
<option>Power ups</option>
<option>Ranged</option>
<option>Navigation</option>
<option>Explosives</option>
<option>Musical</option>
<option>Social</option>
<option>Transport</option>
<option>Building</option>
</select>
</div>
<div>
<label for="limited">Limited:</label>
<input type="checkbox" id="limited" name="limited" value="False" />
</div>
</div>
<div class="form-row submit-buttons">
<a id="upload-button" class="btn-medium btn-primary" data-freeaudio-enabled="true" tabindex="4">Upload<span class=""></span></a>
<span id="loading-container"><img src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif"></span>
<div id="upload-fee-item-result-error" class="status-error hidden">">You cannot manage this place</div>
<div id="upload-fee-item-result-success" class="status-confirm ">
<div><a id="upload-fee-confirmation-link" target="_top">Gear</a> successfully created!</div>
</div>
</div>
</div>
</form>
<?php }
if ($assettypeid == 32) { ?>
<form action="/build/doverifiedupload" enctype="multipart/form-data" id="upload-form" method="post">
<input id="assetTypeId" name="assetTypeId" type="hidden" value="<?= $assettypeid; ?>" />
<input id="isOggUploadEnabled" name="isOggUploadEnabled" type="hidden" value="True" />
<input id="groupId" name="groupId" type="hidden" value="" />
<input id="onVerificationPage" name="onVerificationPage" type="hidden" value="False" />
<input id="captchaEnabled" name="captchaEnabled" type="hidden" value="False" />
<input id="captchaToken" name="captchaToken" type="hidden" value="" />
<input id="captchaProvider" name="captchaProvider" type="hidden" value="" />
<div id="container">
<div class="form-row">
<label for="file">Find your RBXMX:</label>
<input id="file" type="file" name="file" accept="rbxmx" tabindex="1">
<span id="file-error" class="error"></span>
</div>
<div class="form-row">
<label for="name">Package Name:</label>
<input id="name" type="text" class="text-box text-box-medium" name="name" tabindex="2">
<div>
<label for="description">Description:</label>
<input id="description" type="text" class="text-box text-box-medium" name="description" tabindex="2">
</div>
<label for="robux">Cost:</label>
<input id="robux" type="text" class="text-box text-box-small" name="robux" maxlength="10" tabindex="2">
</div>
<div class="form-row submit-buttons">
<a id="upload-button" class="btn-medium btn-primary" data-freeaudio-enabled="true" tabindex="4">Upload<span class=""></span></a>
<span id="loading-container"><img src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif"></span>
<div id="upload-fee-item-result-error" class="status-error hidden">">You cannot manage this place</div>
<div id="upload-fee-item-result-success" class="status-confirm">
<div><a id="upload-fee-confirmation-link" target="_top">Package</a> successfully created!</div>
</div>
</div>
</div>
</form>
<?php }
if ($assettypeid == 1) { ?>
<form action="/build/doverifiedupload" enctype="multipart/form-data" id="upload-form" method="post">
<input id="assetTypeId" name="assetTypeId" type="hidden" value="<?= $assettypeid; ?>" />
<input id="isOggUploadEnabled" name="isOggUploadEnabled" type="hidden" value="False" />
<input id="groupId" name="groupId" type="hidden" value="" />
<input id="onVerificationPage" name="onVerificationPage" type="hidden" value="False" />
<input id="captchaEnabled" name="captchaEnabled" type="hidden" value="False" />
<input id="captchaToken" name="captchaToken" type="hidden" value="" />
<input id="captchaProvider" name="captchaProvider" type="hidden" value="" />
<div id="container">
<div class="form-row">
<label for="file">Find your image:</label>
<input id="file" type="file" accept="image/png" name="file" tabindex="1">
<span id="file-error" class="error"></span>
</div>
<div class="form-row">
<label for="name"> Name:</label>
<input id="name" type="text" class="text-box text-box-medium" name="name" maxlength="50" tabindex="2">
<label for="assetId">Asset ID:</label>
<input id="assetId" type="text" class="text-box text-box-small" name="assetId" maxlength="10" tabindex="2">
<div>
<label for="game">Game:</label>
<input type="checkbox" id="game" name="game" value="true" />
</div>
<div <label for="imageType">Choose a type: </label>
<select name="imageType" id="imageType">
<option value="1">Vertical</option>
<option value="3">Horizontal</option>
<option value="2">Square</option>
</select>
</div>
<!--
<label for="robux">Cost:</label>
<input id="robux" type="text" class="text-box text-box-small" name="robux" maxlength="10" tabindex="2">
-->
<span id="name-error" class="error"></span>
</div>
<div class="form-row submit-buttons">
<a id="upload-button" class="btn-medium btn-primary" data-freeaudio-enabled="true" tabindex="4">Upload for 15 Robux<span class=""></span></a>
<span id="loading-container"><img src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif"></span>
<div id="upload-fee-item-result-error" class="status-error hidden">">You cannot manage this place</div>
<div id="upload-fee-item-result-success" class="status-confirm">
<div><a id="upload-fee-confirmation-link" target="_top">Ad</a> successfully created!</div>
</div>
</div>
</div>
</form>
<?php }
if ($assettypeid == 62) { ?>
<form action="/build/doverifiedupload" enctype="multipart/form-data" id="upload-form" method="post">
<input id="assetTypeId" name="assetTypeId" type="hidden" value="<?= $assettype; ?>" />
<input id="isOggUploadEnabled" name="isOggUploadEnabled" type="hidden" value="False" />
<input id="groupId" name="groupId" type="hidden" value="" />
<input id="onVerificationPage" name="onVerificationPage" type="hidden" value="False" />
<input id="captchaEnabled" name="captchaEnabled" type="hidden" value="False" />
<input id="captchaToken" name="captchaToken" type="hidden" value="" />
<input id="captchaProvider" name="captchaProvider" type="hidden" value="" />
<div id="container">
<div class="form-row">
<label for="file">Find your video:</label>
<input id="file" type="file" accept="video/mp4" name="file" tabindex="1">
<span id="file-error" class="error"></span>
</div>
<div class="form-row">
<label for="name"> Name:</label>
<input id="name" type="text" class="text-box text-box-medium" name="name" maxlength="50" tabindex="2">
<label for="assetId">Asset ID:</label>
<input id="assetId" type="text" class="text-box text-box-small" name="assetId" maxlength="10" tabindex="2">
<div>
<label for="game">Game:</label>
<input type="checkbox" id="game" name="game" value="true" />
</div>
<span id="name-error" class="error"></span>
</div>
<div class="form-row submit-buttons">
<a id="upload-button" class="btn-medium btn-primary" data-freeaudio-enabled="true" tabindex="4">Upload for 20 Robux<span class=""></span></a>
<span id="loading-container"><img src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif"></span>
<div id="upload-fee-item-result-error" class="status-error hidden">">You cannot manage this place</div>
<div id="upload-fee-item-result-success" class="status-confirm ">
<div><a id="upload-fee-confirmation-link" target="_top">Video Ad</a> successfully created!</div>
</div>
</div>
</div>
</form>
<?php }
if ($assettypeid == 4) { ?>
<form action="/build/doverifiedupload" enctype="multipart/form-data" id="upload-form" method="post">
<input id="assetTypeId" name="assetTypeId" type="hidden" value="<?= $assettypeid; ?>" />
<input id="isOggUploadEnabled" name="isOggUploadEnabled" type="hidden" value="False" />
<input id="groupId" name="groupId" type="hidden" value="" />
<input id="onVerificationPage" name="onVerificationPage" type="hidden" value="False" />
<input id="captchaEnabled" name="captchaEnabled" type="hidden" value="False" />
<input id="captchaToken" name="captchaToken" type="hidden" value="" />
<input id="captchaProvider" name="captchaProvider" type="hidden" value="" />
<div id="container">
<div class="form-row">
<label for="file">Find your mesh:</label>
<input id="file" type="file" accept=".mesh" name="file" tabindex="1">
<span id="file-error" class="error"></span>
</div>
<div class="form-row">
<label for="name"> Name:</label>
<input id="name" type="text" class="text-box text-box-medium" name="name" maxlength="50" tabindex="2">
<span id="name-error" class="error"></span>
</div>
<div class="form-row submit-buttons">
<a id="upload-button" class="btn-medium btn-primary" data-freeaudio-enabled="true" tabindex="4">Upload<span class=""></span></a>
<span id="loading-container"><img src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif"></span>
<div id="upload-fee-item-result-error" class="status-error hidden">">You cannot manage this place</div>
<div id="upload-fee-item-result-success" class="status-confirm">
<div><a id="upload-fee-confirmation-link" target="_top">Mesh</a> successfully created!</div>
</div>
</div>
</div>
</form>
<?php }
if ($assettypeid == 34) { ?>
<form action="/build/doverifiedupload" enctype="multipart/form-data" id="upload-form" method="post">
<input id="assetTypeId" name="assetTypeId" type="hidden" value="<?= $assettypeid; ?>" />
<input id="isOggUploadEnabled" name="isOggUploadEnabled" type="hidden" value="False" />
<input id="groupId" name="groupId" type="hidden" value="" />
<input id="onVerificationPage" name="onVerificationPage" type="hidden" value="False" />
<input id="captchaEnabled" name="captchaEnabled" type="hidden" value="False" />
<input id="captchaToken" name="captchaToken" type="hidden" value="" />
<input id="captchaProvider" name="captchaProvider" type="hidden" value="" />
<div id="container">
<div class="form-row">
<label for="file">Image:</label>
<input id="file" type="file" accept=".png" name="file" tabindex="1">
<span id="file-error" class="error"></span>
</div>
<div class="form-row">
<label for="name"> Name:</label>
<input id="name" type="text" class="text-box text-box-medium" name="name" maxlength="50" tabindex="2">
<span id="name-error" class="error"></span>
<div>
<label for="description">Description:</label>
<input id="description" type="text" class="text-box text-box-medium" name="description" maxlength="255" tabindex="2">
</div>
<div>
<label for="GameID">Game ID:</label>
<input id="GameID" type="text" class="text-box text-box-medium" name="GameID" maxlength="10" tabindex="2">
</div>
<label for="robux">Cost:</label>
<input id="robux" type="text" class="text-box text-box-small" name="robux" maxlength="10" tabindex="2">
</div>
<div class="form-row submit-buttons">
<a id="upload-button" class="btn-medium btn-primary" data-freeaudio-enabled="true" tabindex="4">Upload<span class=""></span></a>
<span id="loading-container"><img src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif"></span>
<div id="upload-fee-item-result-error" class="status-error hidden">">You cannot manage this place</div>
<div id="upload-fee-item-result-success" class="status-confirm">
<div><a id="upload-fee-confirmation-link" target="_top">Gamepass</a> successfully created!</div>
</div>
</div>
</div>
</form>
<?php }
if ($assettypeid == 21) { ?>
<form action="/build/doverifiedupload" enctype="multipart/form-data" id="upload-form" method="post">
<input id="assetTypeId" name="assetTypeId" type="hidden" value="<?= $assettypeid; ?>" />
<input id="isOggUploadEnabled" name="isOggUploadEnabled" type="hidden" value="False" />
<input id="groupId" name="groupId" type="hidden" value="" />
<input id="onVerificationPage" name="onVerificationPage" type="hidden" value="False" />
<input id="captchaEnabled" name="captchaEnabled" type="hidden" value="False" />
<input id="captchaToken" name="captchaToken" type="hidden" value="" />
<input id="captchaProvider" name="captchaProvider" type="hidden" value="" />
<div id="container">
<div class="form-row">
<label for="file">Image:</label>
<input id="file" type="file" accept=".png" name="file" tabindex="1">
<span id="file-error" class="error"></span>
</div>
<div class="form-row">
<label for="name"> Name:</label>
<input id="name" type="text" class="text-box text-box-medium" name="name" maxlength="50" tabindex="2">
<span id="name-error" class="error"></span>
<div>
<label for="description">Description:</label>
<input id="description" type="text" class="text-box text-box-medium" name="description" maxlength="255" tabindex="2">
</div>
<div>
<label for="GameID">Game ID:</label>
<input id="GameID" type="text" class="text-box text-box-medium" name="GameID" maxlength="10" tabindex="2">
</div>
</div>
<div class="form-row submit-buttons">
<a id="upload-button" class="btn-medium btn-primary" data-freeaudio-enabled="true" tabindex="4">Upload<span class=""></span></a>
<span id="loading-container"><img src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif"></span>
<div id="upload-fee-item-result-error" class="status-error hidden">">You cannot manage this place</div>
<div id="upload-fee-item-result-success" class="status-confirm ">
<div><a id="upload-fee-confirmation-link" target="_top">Badge</a> successfully created!</div>
</div>
</div>
</div>
</form>
<? } ?>
<script>
const btn = document.getElementById('upload-button');
const form = document.getElementById('upload-form');
btn.addEventListener('click', function(e) {
e.preventDefault();
form.submit();
});
const file = document.getElementById('file');
file.addEventListener('change', function(e) {
let fileName = e.target.files[0].name.split(".");
if (fileName.length > 1) {
fileName = fileName.splice(0, fileName.length - 1).join(".");
}
document.getElementById('name').setAttribute("value", fileName);
document.getElementById('name').focus();
});
</script>
<script type="text/javascript">
if (typeof Roblox === "undefined") {
Roblox = {};
}
if (typeof Roblox.EmbeddedUpload === 'undefined') {
Roblox.EmbeddedUpload = {};
}
Roblox.EmbeddedUpload.Resources = {
invalidImageFile: 'Must be a .png, .jpg, .tga, or .bmp file',
invalidMeshFile: 'Must be a .obj file',
invalidSoundFile: 'Must be a .mp3 or .ogg file',
invalidPluginFile: 'Must be an .rbxmx file',
noFile: 'You must select a file',
noName: 'You must specify a name',
noDescription: 'You must add a description',
longDescription: 'The description is too long',
fileIsEmpty: 'The file is empty',
fileTooLarge: 'The file is too large'
};
// Only disabled upload button for Badge and GamePass
Roblox.EmbeddedUpload.isInsufficientFunds = false;
Roblox.EmbeddedUpload.isPlaceSpecificAsset = true;
</script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='serviceworkerregistrar' type='text/javascript' src='https://www.voidrev.us/js/d5b67abc659e3430838dada0f185cb62.js'></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='pushnotifications' type='text/javascript' src='https://www.voidrev.us/js/b8bf1b02993521c61489cb2f1c4fb676.js'></script>
<div id="push-notification-registrar-settings" data-notificationshost="https://www.voidrev.us" data-reregistrationinterval="0" data-registrationpath="register-chrome" data-shoulddeliveryendpointbesentduringregistration="False" data-platformtype="ChromeOnDesktop">
</div>
<div id="push-notification-registration-ui-settings" data-noncontextualpromptallowed="true" data-promptonfriendrequestsentenabled="true" data-promptonprivatemessagesentenabled="false" data-promptintervals="[604800000,1209600000,2419200000]" data-notificationsdomain="https://www.voidrev.us" data-userid="1">
</div>
<script type="text/template" id="push-notifications-initial-global-prompt-template">
<div class="push-notifications-global-prompt">
<div class="alert-info push-notifications-global-prompt-site-wide-body">
<div class="push-notifications-prompt-content">
<h5>
<span class="push-notifications-prompt-text">
Can we send you notifications on this computer?
</span>
</h5>
</div>
<div class="push-notifications-prompt-actions">
<button type="button" class="btn-min-width btn-growth-xs push-notifications-prompt-accept">Notify Me</button>
<span class="icon-close push-notifications-dismiss-prompt"></span>
</div>
</div>
</div>
</script>
<script type="text/template" id="push-notifications-permissions-prompt-template">
<div class="modal fade" id="push-notifications-permissions-prompt-modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<div class="modal-dialog rbx-modal-dialog">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal">
<span aria-hidden="true">
<span class="icon-close"></span>
</span>
<span class="sr-only">Close</span>
</button>
<h5>Enable Desktop Push Notifications</h5>
</div>
<div class="modal-body">
<div>
Now just click <strong>Allow</strong> in your browser, and we'll start sending you push notifications!
</div>
<div class="push-notifications-permissions-prompt-instructional-image">
<img width="380" height="250" src="https://www.voidrev.us/images/Notifications/push-permission-prompt-chrome-windows-20160701.png" />
</div>
</div>
<div class="modal-footer">
</div>
</div>
</div>
</div>
</script>
<script type="text/template" id="push-notifications-permissions-disabled-instruction-template">
<div class="modal fade" id="push-notifications-permissions-disabled-instruction-modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<div class="modal-dialog rbx-modal-dialog">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal">
<span aria-hidden="true">
<span class="icon-close"></span>
</span>
<span class="sr-only">Close</span>
</button>
<h5>Turn Push Notifications Back On</h5>
</div>
<div class="instructions-body">
<div class="reenable-step reenable-step1-of3">
<h1>1</h1>
<p class="larger-font-size push-notifications-modal-step-instruction">Click the green lock next to the URL bar to open up your site permissions.</p>
<img width="270" height="139" src="https://www.voidrev.us/images/Notifications/push-permission-unblock-step1-chrome-20160701.png">
</div>
<div class="reenable-step reenable-step2-of3">
<h1>2</h1>
<p class="larger-font-size push-notifications-modal-step-instruction">Click the drop-down arrow next to Notifications in the <strong>Permissions</strong> tab.</p>
<img width="270" height="229" src="https://www.voidrev.us/images/Notifications/push-permission-unblock-step2-chrome-20160701.png">
</div>
<div class="reenable-step reenable-step3-of3">
<h1>3</h1>
<p class="larger-font-size push-notifications-modal-step-instruction">Select <strong>Always allow on this site</strong> to turn notifications back on.</p>
<img width="270" height="229" src="https://www.voidrev.us/images/Notifications/push-permission-unblock-step3-chrome-20160701.png">
</div>
</div>
<div class="modal-footer">
</div>
</div>
</div>
</div>
</script>
<script type="text/template" id="push-notifications-successfully-enabled-template">
<div class="push-notifications-global-prompt">
<div class="alert-system-feedback">
<div class="alert alert-success">
Push notifications have been enabled!
</div>
</div>
</div>
</script>
<script type="text/template" id="push-notifications-successfully-disabled-template">
<div class="push-notifications-global-prompt">
<div class="alert-system-feedback">
<div class="alert alert-success">
Push notifications have been disabled.
</div>
</div>
</div>
</script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='pageEnd' type='text/javascript' src='https://www.voidrev.us/js/22d766287cc20354eb31bbb83c0e73c2.js'></script>
</body>
</html>