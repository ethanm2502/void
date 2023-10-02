<?php
// check if placeId is set, if not exit
if (!isset($_GET['placeId'])) {
$data = array('status' => 8, 'jobId' => null, 'joinScriptUrl' => null, 'authenticationUrl' => 'https://www.voidrev.us/Login/Negotiate.ashx', 'authenticationTicket' => null, 'message' => 'Place does not exist');
die(json_encode($data));
}
try {
// Setup error catching and includes.
require_once($_SERVER['DOCUMENT_ROOT'] . '/config/includes.php');
require_once($_SERVER['DOCUMENT_ROOT'] . '/SOAP.php');
header('Content-Type: application/json; charset=utf-8');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
$getid = (int)$_GET['placeId'];
$rbxsig = (int)$_GET['rbxsig'];
// To prevent some spam.
if (!isset($_GET['request'])) {
die("Bad Request");
}
// Authenticaion
$usr = getUserData($con);
$uID = $usr['id'];
if ($usr['activated'] == 0) {
die("Bad Request");
}
if($usr['banned'] != 0){
echo json_encode(array('success' => false));
die(http_response_code(403));
}
// Set version to the correct one, so we dont start the wrong RCC.
// SOAP.php also has a fallback to checking if the place exists, incase this fucks up.
$query = $con->prepare('SELECT id,version,approved,active,name,generatedthumbnailhash,thumbnail1,thumb1approved,thumbnail2,thumb2approved,thumbnail3,thumb3approved,video,refreshthumbnail,description,creatorid,created,updated,MaxPlayers,visits,currencyearned,banned,featured,AvatarType,likes,dislikes,placeversion FROM games WHERE id=:id');
$query->bindParam(':id', $getid);
$query->execute();
$exist = $query->fetch();
if (!is_array($exist)) {
$data = array('status' => 8, 'jobId' => null, 'joinScriptUrl' => null, 'authenticationUrl' => '{$http}://www.voidrev.us/Login/Negotiate.ashx', 'authenticationTicket' => null, 'message' => 'Place does not exist');
die(json_encode($data));
}
if ($exist['version'] == 2018) {
$type = 2018;
$rbxsig = 2;
}elseif($exist['version'] == 2020){
$type = 2020;
$rbxsig = 2;
}else{
$type = 2016;
$rbxsig = "";
}
if ($exist['version'] == 2016) {
$http = "http";
}elseif($exist['version'] == 2018){
$http = "https";
}elseif($exist['version'] == 2020){
$http = "https";
}
$MaxPlayerCount = $exist['MaxPlayers'];
//revisions to place
$placeversion = $exist['placeversion'];
$creatorid = $exist['creatorid'];
function startJob($getid, $uID, $con, $type, $MaxPlayers, $creatorid, $placeversion)
{
// okay theres no jobs for your placeid, maybe you got here from a failed start attempt or there is genuinely no job running.
$count = 0;
// probs should check if there is no job with the sameid, but this is probably unlikely soooo.
$jobid = vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex(random_bytes(16)), 4));
// check if place is 2016 or 2018, of course use the correct function or shit goes wrong
if ($type == 2016) {
if($_GET['request'] == "CloudEdit"){
$json = placeStart($jobid, $getid, $MaxPlayers, $creatorid, true, $placeversion);
}else{
$json = placeStart($jobid, $getid, $MaxPlayers, $creatorid, false, $placeversion);
}
}elseif($type == 2020){
if($_GET['request'] == "CloudEdit"){
$json = placeStart2020($jobid, $getid, $MaxPlayers, $creatorid, 3, $placeversion);
$message = "Debug: Team Create Matchmaking";
}else{
$json = placeStart2020($jobid, $getid, $MaxPlayers, $creatorid, 1, $placeversion);
}
}elseif($type == 2018){
if($_GET['request'] == "CloudEdit"){
$json = placeStart2018($jobid, $getid, $MaxPlayers, $creatorid, 3, $placeversion);
$message = "Debug: Team Create Matchmaking";
}else{
$json = placeStart2018($jobid, $getid, $MaxPlayers, $creatorid, 1, $placeversion);
}
}
$json = json_decode($json, true);
$port = $json['Value'];
$serviceport = $json['ServicePort'];
$success = $json['Success'];
// check if its successful and get the game port, and the soap port.
if ($success = true) {
// okay we're getting there, now the server is starting we can start with inserting the job and setting ping times
$isactive = 0;
$sql = "INSERT INTO `jobs` (`id`, `placeId`, `port`,`serviceport`, `type`, `active`) VALUES (:jobid, :getid, :port, :serviceport, :type, :isactive)";
$stmt = $con->prepare($sql);
$stmt->execute(array(':jobid' => $jobid, ':getid' => $getid, ':port' => $port, ':serviceport' => $serviceport, ':type' => $type, ':isactive' => $isactive));
$sql2 = "UPDATE `users` SET `InJobId` = :jobid WHERE `id` = :uID";
$stmt2 = $con->prepare($sql2);
$params2 = array(':jobid' => $jobid, ':uID' => $uID);
$stmt2->execute($params2);
$now = time();
$sql3 = "UPDATE `jobs` SET `lastplayerjointime` = :now WHERE `placeId` = :getid";
$stmt3 = $con->prepare($sql3);
$params3 = array(':now' => $now, ':getid' => $getid);
$stmt3->execute($params3);
$sql4 = "UPDATE `jobs` SET `lastpingtime` = :now WHERE `placeId` = :getid AND `id` = :jobid";
$stmt4 = $con->prepare($sql4);
$stmt4->execute(array(':now' => $now, ':getid' => $getid, ':jobid' => $jobid));
} else {
// ok it failed lmao, kill it.
rccStop($serviceport);
if ($type == 2018) {
rccStop2018($serviceport);
}
if ($type == 2020){
rccStop2020($serviceport);
}
}
return $jobid;
}
function JobDB($getid, $con)
{
$jobquery = $con->prepare("SELECT * FROM `jobs` WHERE `placeId` = :placeId AND `playercount` < (SELECT `MaxPlayers` FROM `games` WHERE `id` = :placeId2)");
$jobquery->execute(['placeId' => $getid, 'placeId2' => $getid]);
$jobdb = $jobquery->fetch();
return $jobdb;
}
function JobIDDB($jobid, $con)
{
$jobquery = $con->prepare("SELECT * FROM `jobs` WHERE `id` = :jobId");
$jobquery->execute(['jobId' => $jobid]);
$jobdb = $jobquery->fetch();
return $jobdb;
}
function updateJob($jobid, $uID, $con)
{
$sql2 = "UPDATE `users` SET `InJobId` = :jobid WHERE `id` = :uid";
$stmt = $con->prepare($sql2);
$stmt->execute([':jobid' => $jobid, ':uid' => $uID]);
}
function jobOffline($serviceport, $jobid, $con, $jobdb)
{
$timediff = time() - $jobdb['lastpingtime'];
if ($timediff < 60) {
// Do nothing, server is fine.
} else {
// oh shit its been more than 60 seconds uhh rcc probably shit itself, so delete the job, kill the process, and using crash__(); wont work sometimes.
$sql = "DELETE FROM `jobs` WHERE `id` = :jobid";
$stmt = $con->prepare($sql);
$stmt->execute(['jobid' => $jobid]);
// Using rccStop() instead of placeStop() because SOAP might be non functional, this has happened before.
rccStop($serviceport);
rccStop2018($serviceport);
}
}
$jobdb = JobDB($getid, $con);
$jobid = $jobdb['id'];
$port = $jobdb['port'];
$serviceport = $jobdb['serviceport'];
if (is_array($jobdb)) {
updateJob($jobid, $uID, $con);
// check ping time, if its less than 60 we're fine.
jobOffline($serviceport, $jobid, $con, $jobdb);
// okay thats done just rescan jobs.
$jobdb = JobDB($getid, $con);
$jobid = $jobdb['id'];
$port = $jobdb['port'];
$serviceport = $jobdb['serviceport'];
}
if (!is_array($jobdb)) {
startJob($getid, $uID, $con, $type, $MaxPlayerCount, $creatorid, $placeversion);
// Checks for job existance
$jobdb = JobDB($getid, $con);
$jobid = $jobdb['id'];
$port = $jobdb['port'];
$serviceport = $jobdb['serviceport'];
$isactive = $jobdb['active'];
$count = $jobdb['playercount'];
}
// check if game is banned, and if its active and get its creatorid, and maxplayer count
$userquery = $con->prepare('SELECT id,version,approved,active,name,generatedthumbnailhash,thumbnail1,thumb1approved,thumbnail2,thumb2approved,thumbnail3,thumb3approved,video,refreshthumbnail,description,creatorid,created,updated,MaxPlayers,visits,currencyearned,banned,featured,AvatarType,likes,dislikes FROM games WHERE id=:id');
$userquery->bindParam(':id', $getid);
$userquery->execute();
$user = $userquery->fetch();
$gameban = $user['banned'];
$creatorid = $user['creatorid'];
if ($user['active'] == 0) {
$gameactive = 0;
if ($uID == $creatorid) {
$gameactive = 1;
}
} else {
$gameactive = 1;
}
$MaxPlayerCount = $user['MaxPlayers'];
$urrid = $usr['id'];
$usrname = $usr['username'];
$count = $jobdb['playercount'];
$isactive = $jobdb['active'];
// requestgamejob is pressing join server on the server tab
if ($count >= $MaxPlayerCount && $_GET['request'] == 'RequestGameJob') {
$gamestatus = 6;
}
// self explanatory
if ($count >= $MaxPlayerCount && $_GET['request'] == 'RequestFollowUser') {
$gamestatus = 6;
}
// this is the same as what we just went through
if ($count >= $MaxPlayerCount && $_GET['request'] == 'RequestGame') {
$jobid = startJob($getid, $uID, $con, $type, $MaxPlayerCount, $creatorid, $placeversion);
$jobdb = JobIDDB($jobid, $con);
$port = $jobdb['port'];
$serviceport = $jobdb['serviceport'];
$isactive = $jobdb['active'];
$count = $jobdb['playercount'];
}
if (isset($_COOKIE["_ROBLOSECURITY"])) {
// okay cookie is set so we're good there, set InGameId.
$sql2 = "UPDATE `users` SET `InGameId` = '$getid' WHERE `id` = '$uID'";
$con->exec($sql2);
} else {
$gamestatus = 8;
}
// Is the game active? if not, set status to 0, which'll make the client wait (waiting for available server or server found, loading) if it is, when the client retries it'll let them through
if ($isactive == 1) {
$gamestatus = 2;
} else {
if ($type == 2018 || $type == 2020) {
$gamestatus = 1;
} else {
$gamestatus = 0;
}
}
// banned. game is disabled message, don't worry join.ashx refuses to give a response if you are banned.
if ($usr['banned'] > 0) {
$gamestatus = 3;
}
// game is banned, what did you do.
if ($gameban > 0) {
$gamestatus = 3;
}
// game is private, don't let them in, this needs to be implemented in logindata.php (contains validate-place-join)
if ($gameactive == 0) {
$gamestatus = 3;
}
if ($type == 2018 || $type == 2020) {
$type = "&type=" . $type;
}
$array = [
"jobId" => $jobid,
"status" => $gamestatus,
"joinScriptUrl" => "{$http}://www.voidrev.us/game/join.ashx?serverPort=" . $port . "&gameid=" . $getid . "&jobid=" . $jobid . "&rbxsig=" . $rbxsig . "&type" . $type,
"authenticationUrl" => "{$http}://www.voidrev.us/Login/Negotiate.ashx",
"authenticationTicket" => $roblosec,
"message" => $message
];
echo json_encode($array, JSON_PRETTY_PRINT);
} catch (Throwable $e) {
$array = [
"jobId" => $jobid,
"status" => 4,
"joinScriptUrl" => null,
"authenticationUrl" => "{$http}://www.voidrev.us/Login/Negotiate.ashx",
"authenticationTicket" => $roblosec,
"message" => $type . " Unknown Error " . $e
];
echo json_encode($array, JSON_PRETTY_PRINT);
// okay what the fuck some probably huge error happened, try and kill the rcc instances, that's our only huge concern, the site will remove
// any job that hasnt been pinged after 60 seconds when someone tries to view it anyway.
rccStop($serviceport);
rccStop2018($serviceport);
rccStop2020($serviceport);
exit();
}
