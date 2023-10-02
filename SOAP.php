<?php
include_once($_SERVER['DOCUMENT_ROOT']."/config/database.php");
/*
hi this is some ported limbo 2018 site code, some of this will have blank functions as they may be completely incompatible and need rewriting.
*/
function load_model($class_name)
{
$path_to_file = $_SERVER["DOCUMENT_ROOT"].'/Assemblies/Roblox/Grid/Rcc/' . $class_name . '.php';
if (file_exists($path_to_file)) {
require $path_to_file;
}
}
load_model('RCCServiceSoap');
load_model('Job');
load_model('LuaValue');
load_model('LuaType');
load_model('ScriptExecution');
load_model('Status');
function execInBackground($cmd)
// for executing scripts in background, not used here, used elsewhere
{
pclose(popen("start /B ".$cmd, 'r'));
}
function execInBackgroundWindows($filePath, $workingDirectory, $arguments)
{
$cmd = "$filePath $arguments";
popen("start /B ".$cmd,"r");
}
// why are we doing (int) inside rccStop? it's to prevent a blank value being entered, possibly killing all instances.
function rccStop($port){
$port = (int)$port;
// define the name of the process to kill
$processName = 'test4.exe';
// define the argument string to look for
$argString = '-console '.$port.'';
// get the list of running processes and their command line arguments using wmic
exec("wmic process where name='$processName' get processid, commandline", $output);
// loop through the list of processes and kill any that match the argument string
foreach ($output as $line) {
if (strpos($line, $argString) !== false) {
// extract the PID from the command line and kill the process
preg_match('/(\d+)$/', $line, $matches);
$pid = $matches[1];
exec("taskkill /f /PID $pid");
}
}
}
function killExeThumb($port){
$port = (int)$port;
// define the name of the process to kill
$processName = 'ThumbServer.exe';
// define the argument string to look for
$argString = '-console '.$port.'';
// get the list of running processes and their command line arguments using wmic
exec("wmic process where name='$processName' get processid, commandline", $output);
// loop through the list of processes and kill any that match the argument string
foreach ($output as $line) {
if (strpos($line, $argString) !== false) {
// extract the PID from the command line and kill the process
preg_match('/(\d+)$/', $line, $matches);
$pid = $matches[1];
exec("taskkill /f /PID $pid");
}
}
}
function rccStop2018($port){
$port = (int)$port;
// define the name of the process to kill
$processName = 'RCCService.exe';
// define the argument string to look for
$argString = '-console '.$port.'';
// get the list of running processes and their command line arguments using wmic
exec("wmic process where name='$processName' get processid, commandline", $output);
// loop through the list of processes and kill any that match the argument string
foreach ($output as $line) {
if (strpos($line, $argString) !== false) {
// extract the PID from the command line and kill the process
preg_match('/(\d+)$/', $line, $matches);
$pid = $matches[1];
exec("taskkill /f /PID $pid");
}
}
}
function rccStop2020($port){
$port = (int)$port;
// define the name of the process to kill
$processName = 'NewRCCService.exe';
// define the argument string to look for
$argString = '-console '.$port.'';
// get the list of running processes and their command line arguments using wmic
exec("wmic process where name='$processName' get processid, commandline", $output);
// loop through the list of processes and kill any that match the argument string
foreach ($output as $line) {
if (strpos($line, $argString) !== false) {
// extract the PID from the command line and kill the process
preg_match('/(\d+)$/', $line, $matches);
$pid = $matches[1];
exec("taskkill /f /PID $pid");
}
}
}
function placeStop($jobId,$port){
// error catching, yes shit sometimes really gets that fucked up
try{
$RCCServiceSoap = new Roblox\Grid\Rcc\RCCServiceSoap("127.0.0.1",$port);
if ($RCCServiceSoap instanceof SoapFault) {
rccStop($port);
rccStop2018($port);
rccStop2020($port);
return true;
}
$value = $RCCServiceSoap->CloseJob($jobId);
sleep(5);
rccStop($port);
rccStop2018($port);
rccStop2020($port);
}catch(Exception $e){
// well it did get fucked up so were doing a force kill.
rccStop($port);
rccStop2018($port);
rccStop2020($port);
return true;
}
return true;
}
function placeStopAll($placeId){
// idk why i chose to do auth in here
require ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
if($_COOKIE['username'] && $_COOKIE['password']){
$password = urldecode($_COOKIE['password']);
$roblosec = urldecode($_COOKIE['_ROBLOSECURITY']);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['password' => $password, 'ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
}
$gamequery = $con->prepare("SELECT id,creatorid FROM `games` WHERE `id` = :id");
$gamequery->execute(['id' => $placeId]);
$games = $gamequery->fetch();
if($games['creatorid'] == $usr['id']){
// okay auth is done, do a while fetch on all the jobs with the placeId we have and run placeStop() on them all
$jobsquery = $con->prepare("SELECT * FROM `jobs` WHERE `placeId` = :placeId");
$jobsquery->execute(['placeId' => $placeId]);
while($jobs = $jobsquery->fetch()) {
$JobId = $jobs['id'];
$port = $jobs['serviceport'];
$sql = "DELETE FROM `jobs` WHERE `id` = :jobId";
$stmt = $con->prepare($sql);
$stmt->bindParam(':jobId', $JobId);
$stmt->execute();
placeStop($JobId,$port);
$value = json_encode(array('success' => true));
return $value;
}
}else{
$value = json_encode(array('success' => false));
return $value;
}
}
function getPlayersInJob($jobId,$port){
// If 2016 use the script, 2018 uses a different method for this.
$RCCServiceSoap = new Roblox\Grid\Rcc\RCCServiceSoap("127.0.0.1",$port);
include ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
$gamequery = $con->prepare("SELECT * FROM `jobs` WHERE `id`= :jobId");
$gamequery->execute(['jobId' => $jobId]);
$games = $gamequery->fetch();
if($games['type'] == 2016){
$scriptText = '
local players = ""
for i,v in pairs(game.Players:GetChildren()) do
if v:IsA("Player") then
players = players..","..v.Name
end
end
return players:sub(2)
';
$script = new Roblox\Grid\Rcc\ScriptExecution($jobId."-Script", $scriptText);
$value = $RCCServiceSoap->ExecuteEx($jobId, $script);
header("Content-Type: application/json");
$players = $value->LuaValue->value;
}elseif($games['type'] == 2018){
$players = $games['players'];
}
$json = array("Success"=>true,"Value"=>$players);
return json_encode($json);
}
function getServerFPS($jobId,$port){
// If 2016 use the script, 2018 uses a different method for this.
$RCCServiceSoap = new Roblox\Grid\Rcc\RCCServiceSoap("127.0.0.1",$port);
include ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
$gamequery = $con->prepare("SELECT * FROM `jobs` WHERE `id`= :jobId");
$gamequery->execute(['jobId' => $jobId]);
$games = $gamequery->fetch();
if($games['type'] == 2016){
$scriptText = '
local FPS = workspace:GetRealPhysicsFPS()
return FPS
';
$script = new Roblox\Grid\Rcc\ScriptExecution($jobId."-Script", $scriptText);
$value = $RCCServiceSoap->ExecuteEx($jobId, $script);
header("Content-Type: application/json");
$fps = $value->LuaValue->value;
}elseif($games['type'] == 2018){
$fps = $games['FPS'];
}
$json = array("Success"=>true,"Value"=>$fps);
return json_encode($json);
}
function PlayerCount($placeId,$port){
try {
include ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
$gamequery = $con->prepare("SELECT * FROM `jobs` WHERE `placeId`= :placeId");
$gamequery->execute(['placeId' => $placeId]);
$actualvalue = 0;
while($games = $gamequery->fetch()) {
$jobId = $games['id'];
$actualvalue = $actualvalue + $games['playercount'];
}
$json = array("Success"=>true,"Value"=>$actualvalue);
return json_encode($json);
}catch(Throwable $e){
$json = array("Success"=>false,"Value"=>0);
return json_encode($json);
die();
}
}
function gamethumbnail($placeId){
try{
include($_SERVER['DOCUMENT_ROOT']."/config/database.php");
class http {
public static function isUp($portToCheck) {
exec('netstat -an | find "' . $portToCheck . '"', $output);
if (!empty($output)) {
return false;
}else{
return true;
}
}
}
$randomport = rand(31501,33000);
while(http::isUp($randomport) == false)
{
$randomport = rand(31501,33000);
}
// switched to 2018
execInBackgroundWindows("C:\\RCC\\ThumbServer2020\\ThumbServer.exe","C:\\RCC\\ThumbServer2020\\","-console ".$randomport."");
$RCCServiceSoap = new Roblox\Grid\Rcc\RCCServiceSoap("127.0.0.1", $randomport);
if ($RCCServiceSoap instanceof SoapFault) { killExeThumb($randomport); return "/assets/img/1x1pending.png";}
$JobId = bin2hex(random_bytes(10));
$job = new Roblox\Grid\Rcc\Job($JobId);
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Place",
"PlaceId": '.$placeId.',
"UserId": 1,
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us/asset/?id='.$placeId.'", "PNG", 1280, 720, "https://www.voidrev.us", '.$placeId.']
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
$script = new Roblox\Grid\Rcc\ScriptExecution($JobId."-Script", $scriptText);
$value = $RCCServiceSoap->OpenJobEx($job, $script);
$value = base64_decode($value[0]);
$name = md5($value);
file_put_contents($_SERVER["DOCUMENT_ROOT"]."/thumbnails/".$name.".png",$value);
$query = $con->prepare('UPDATE games SET generatedthumbnailhash=:generatedthumbnailhash WHERE id=:id');
$query->bindParam(':id', $placeId, PDO::PARAM_INT);
$query->bindParam(':generatedthumbnailhash', $name);
$query->execute();
return "/thumbnails/".$name.".png";
die(killExeThumb($randomport));
}catch(Exception $e){
return "/assets/img/1x1pending.png";
die(killExeThumb($randomport));
}
}
function userthumbnail($userId){
try{
include($_SERVER['DOCUMENT_ROOT']."/config/database.php");
// check if port is in use
class http {
public static function isUp($portToCheck) {
exec('netstat -an | find "' . $portToCheck . '"', $output);
if (!empty($output)) {
return false;
}else{
return true;
}
}
}
$randomport = rand(31501,33000);
while(http::isUp($randomport) == false)
{
$randomport = rand(31501,33000);
}
// start rcc
execInBackgroundWindows("C:\\RCC\\ThumbServerNew\\ThumbServer.exe","C:\\RCC\\ThumbServerNew\\","-console ".$randomport."");
$RCCServiceSoap = new Roblox\Grid\Rcc\RCCServiceSoap("127.0.0.1", $randomport);
if ($RCCServiceSoap instanceof SoapFault) { killExeThumb($randomport); return "/assets/img/1x1pending.png";}
$job = new Roblox\Grid\Rcc\Job($JobId);
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Avatar_R15_Action",
"PlaceId": 0,
"UserId": '.$userId.',
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us", "https://www.voidrev.us/v1.1/avatar-fetch?userId='.$userId.'&placeId=0", "PNG", 768, 768]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
$script = new Roblox\Grid\Rcc\ScriptExecution($JobId."-Script", $scriptText);
$value = $RCCServiceSoap->OpenJobEx($job, $script);
$value = base64_decode($value[0]);
$name = md5($value);
file_put_contents($_SERVER["DOCUMENT_ROOT"]."/thumbnails/".$name.".png",$value);
$query = $con->prepare('UPDATE users SET fullthumbnailhash=:fullthumbnailhash WHERE id=:id');
$query->bindParam(':id', $userId, PDO::PARAM_INT);
$query->bindParam(':fullthumbnailhash', $name);
$query->execute();
killExeThumb($randomport);
return "/thumbnails/".$name.".png";
}catch(Exception $e){
return "/assets/img/1x1pending.png";
killExeThumb($randomport);
}
}
function headshotuserthumbnail($userId){
try{
include($_SERVER['DOCUMENT_ROOT']."/config/database.php");
// check port
class http {
public static function isUp($portToCheck) {
exec('netstat -an | find "' . $portToCheck . '"', $output);
if (!empty($output)) {
return false;
}else{
return true;
}
}
}
$randomport = rand(31501,33000);
while(http::isUp($randomport) == false)
{
$randomport = rand(31501,33000);
}
// start rcc
execInBackgroundWindows("C:\\RCC\\ThumbServerNew\\ThumbServer.exe","C:\\RCC\\ThumbServerNew\\","-console ".$randomport."");
$RCCServiceSoap = new Roblox\Grid\Rcc\RCCServiceSoap("127.0.0.1", $randomport);
if ($RCCServiceSoap instanceof SoapFault) { killExeThumb($randomport); return "/assets/img/1x1pending.png";}
$JobId = bin2hex(random_bytes(10));
$job = new Roblox\Grid\Rcc\Job($JobId);
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Closeup",
"PlaceId": 1,
"UserId": '.$userId.',
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us", "https://www.voidrev.us/v1.1/avatar-fetch?userId='.$userId.'&placeId=1", "PNG", 768, 768, true, 40, 100, 0, 0]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
$script = new Roblox\Grid\Rcc\ScriptExecution($JobId."-Script", $scriptText);
$value = $RCCServiceSoap->OpenJobEx($job, $script);
$value = base64_decode($value[0]);
$name = md5($value);
file_put_contents($_SERVER["DOCUMENT_ROOT"]."/thumbnails/".$name.".png",$value);
$query = $con->prepare('UPDATE users SET headshotthumbnailhash=:headshotthumbnailhash WHERE id=:id');
$query->bindParam(':id', $userId, PDO::PARAM_INT);
$query->bindParam(':headshotthumbnailhash', $name);
$query->execute();
return "/thumbnails/".$name.".png";
killExeThumb($randomport);
}catch(Exception $e){
return "/assets/img/1x1pending.png";
killExeThumb($randomport);
}
}
function threedeeuserthumbnail($userId){
// check port in use
class http {
public static function isUp($portToCheck) {
exec('netstat -an | find "' . $portToCheck . '"', $output);
if (!empty($output)) {
return false;
}else{
return true;
}
}
}
$randomport = rand(31501,33000);
while(http::isUp($randomport) == false)
{
$randomport = rand(31501,33000);
}
// start rcc
execInBackgroundWindows("C:\\RCC\\ThumbServerNew\\ThumbServer.exe","C:\\RCC\\ThumbServerNew\\","-console ".$randomport."");
$RCCServiceSoap = new Roblox\Grid\Rcc\RCCServiceSoap("127.0.0.1", $randomport);
if ($RCCServiceSoap instanceof SoapFault) { killExeThumb($randomport); return "/assets/img/1x1pending.png";}
$JobId = bin2hex(random_bytes(10));
$job = new Roblox\Grid\Rcc\Job($JobId);
// okay so threedee renders are similar to PNG renders, it returns a json which contains some base64, this is all decoded in the threedee api's
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Avatar_R15_Action",
"PlaceId": 0,
"UserId": '.$userId.',
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us", "https://www.voidrev.us/v1.1/avatar-fetch?userId='.$userId.'&placeId=0", "OBJ", 768, 768]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
$script = new Roblox\Grid\Rcc\ScriptExecution($JobId."-Script", $scriptText);
$value = $RCCServiceSoap->OpenJobEx($job, $script);
$value = $value[0];
$json = array("Success"=>true,"Value"=>$value,"ServicePort"=>$randomport);
return json_encode($json);
}
function threedeecatthumbnail($assetId,$type){
// check port in use
class http {
public static function isUp($portToCheck) {
exec('netstat -an | find "' . $portToCheck . '"', $output);
if (!empty($output)) {
return false;
}else{
return true;
}
}
}
$randomport = rand(31501,33000);
while(http::isUp($randomport) == false)
{
$randomport = rand(31501,33000);
}
// start rcc
execInBackgroundWindows("C:\\RCC\\ThumbServerNew\\ThumbServer.exe","C:\\RCC\\ThumbServerNew\\","-console ".$randomport."");
$RCCServiceSoap = new Roblox\Grid\Rcc\RCCServiceSoap("127.0.0.1", $randomport);
if ($RCCServiceSoap instanceof SoapFault) { killExeThumb($randomport); return "/assets/img/1x1pending.png";}
$JobId = bin2hex(random_bytes(10));
$job = new Roblox\Grid\Rcc\Job($JobId);
// check asset type
if($type == "Package"){
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Package",
"PlaceId": '.$assetId.',
"UserId": 1,
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us/asset/?id='.$assetId.'","https://www.voidrev.us/","OBJ", 720, 720, "https://www.voidrev.us/asset/?id=8246626421", ""]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
}
if($type == "Pants"){
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Pants",
"PlaceId": '.$assetId.',
"UserId": 1,
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us/asset/?id='.$assetId.'","OBJ", 720, 720, "https://www.voidrev.us/", 8246626421]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
}
if($type == "TShirt"){
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Shirt",
"PlaceId": '.$assetId.',
"UserId": 1,
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us/asset/?id='.$assetId.'","OBJ", 720, 720, "https://www.voidrev.us/", 8246626421]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
}
if($type == "Shirt"){
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Shirt",
"PlaceId": '.$assetId.',
"UserId": 1,
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us/asset/?id='.$assetId.'","OBJ", 720, 720, "https://www.voidrev.us/", 8246626421]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
}
if($type == "Hat"){
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Hat",
"PlaceId": '.$assetId.',
"UserId": 1,
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us/asset/?id='.$assetId.'","OBJ", 720, 720, "https://www.voidrev.us/"]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
}
if($type == "Gear"){
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Gear",
"PlaceId": 0,
"UserId": 1,
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us/asset/?id='.$assetId.'","OBJ", 720, 720, "https://www.voidrev.us/"]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
}
if($type == "Mesh"){
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Mesh",
"PlaceId": '.$assetId.',
"UserId": 1,
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us/asset/?id='.$assetId.'","OBJ", 720, 720, "https://www.voidrev.us/"]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
}
if($type == "Model"){
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Model",
"PlaceId": '.$assetId.',
"UserId": 1,
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us/asset/?id='.$assetId.'","OBJ", 720, 720, "https://www.voidrev.us/"]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
}else{
// fallback if the type isnt any of the above
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Model",
"PlaceId": '.$assetId.',
"UserId": 1,
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us/asset/?id='.$assetId.'","OBJ", 720, 720, "https://www.voidrev.us/"]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
}
$script = new Roblox\Grid\Rcc\ScriptExecution($JobId."-Script", $scriptText);
$value = $RCCServiceSoap->OpenJobEx($job, $script);
$value = $value[0];
$json = array("Success"=>true,"Value"=>$value,"ServicePort"=>$randomport);
return json_encode($json);
}
function catthumbnail($assetId,$type){
try{
include ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
// check port
class http {
public static function isUp($portToCheck) {
exec('netstat -an | find "' . $portToCheck . '"', $output);
if (!empty($output)) {
return false;
}else{
return true;
}
}
}
$randomport = rand(31501,33000);
while(http::isUp($randomport) == false)
{
$randomport = rand(31501,33000);
}
//start rcc
execInBackgroundWindows("C:\\RCC\\ThumbServerNew\\ThumbServer.exe","C:\\RCC\\ThumbServerNew\\","-console ".$randomport."");
$RCCServiceSoap = new Roblox\Grid\Rcc\RCCServiceSoap("127.0.0.1", $randomport);
if ($RCCServiceSoap instanceof SoapFault) {
killExeThumb($randomport);
return "/assets/img/1x1pending.png";
}
$JobId = bin2hex(random_bytes(10));
$job = new Roblox\Grid\Rcc\Job($JobId);
if(!empty($type)){
if($type == "Package"){
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Package",
"PlaceId": '.$assetId.',
"UserId": 1,
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us/asset/?id='.$assetId.'","https://www.voidrev.us/","PNG", 720, 720, "https://www.voidrev.us/asset/?id=235400037", ""]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
}
if($type == "Pants"){
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Pants",
"PlaceId": 1,
"UserId": 1,
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us/asset/?id='.$assetId.'","PNG", 720, 720, "https://www.voidrev.us/", 235400037]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
}
if($type == "TShirt"){
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Shirt",
"PlaceId": 1,
"UserId": 1,
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us/asset/?id='.$assetId.'","PNG", 720, 720, "https://www.voidrev.us/", 235400037]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
}
if($type == "Shirt"){
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Shirt",
"PlaceId": 1,
"UserId": 1,
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us/asset/?id='.$assetId.'","PNG", 720, 720, "https://www.voidrev.us/", 235400037]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
}
if($type == "Hat"){
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Hat",
"PlaceId": 1,
"UserId": 1,
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us/asset/?id='.$assetId.'","PNG", 720, 720, "https://www.voidrev.us/"]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
}
if($type == "Mesh"){
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Mesh",
"PlaceId": 7,
"UserId": 1,
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us/asset/?id='.$assetId.'","PNG", 720, 720, "https://www.voidrev.us/"]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
}
if($type == "Model"){
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Model",
"PlaceId": 1,
"UserId": 1,
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us/asset/?id='.$assetId.'","PNG", 720, 720, "https://www.voidrev.us/"]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
}
if($type == "Gear"){
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Gear",
"PlaceId": 1,
"UserId": 1,
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us/asset/?id='.$assetId.'","PNG", 720, 720, "https://www.voidrev.us/"]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
}
}else{
// well shit none of the types match
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Model",
"PlaceId": 1,
"UserId": 1,
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us/asset/?id='.$assetId.'","PNG", 720, 720, "https://www.voidrev.us/"]
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
}
$script = new Roblox\Grid\Rcc\ScriptExecution($JobId."-Script", $scriptText);
$value = $RCCServiceSoap->OpenJobEx($job, $script);
$value = base64_decode($value[0]);
$name = md5($value);
file_put_contents($_SERVER["DOCUMENT_ROOT"]."/thumbnails/".$name.".png",$value);
$query = $con->prepare('SELECT * FROM library WHERE fileid=:id');
$query->bindParam(':id', $assetId);
$query->execute();
$game = $query->fetch();
$assetId = $game['id'];
$query = $con->prepare('UPDATE library SET thumbnailhash=:thumbnailhash WHERE id=:id');
$query->bindParam(':id', $assetId, PDO::PARAM_INT);
$query->bindParam(':thumbnailhash', $name);
$query->execute();
return "/thumbnails/".$name.".png";
killExeThumb($randomport);
}catch(Exception $e){
return "/assets/img/1x1pending.png";
killExeThumb($randomport);
}
}
function placeStart($JobId,$placeId,$MaxPlayers,$creatorid,$teamcreate = false,$teamtest = false,$placeversion = 0){
include ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
try{
// setup error catching on start, and check port
class http {
public static function isUp($portToCheck) {
exec('netstat -an | find "' . $portToCheck . '"', $output);
if (!empty($output)) {
return false;
}else{
return true;
}
}
}
$randomport = rand(31501,33000);
while(http::isUp($randomport) == false)
{
$randomport = rand(31501,33000);
}
$gamerandomport = rand(30000,31500);
// start rcc
execInBackgroundWindows("C:\\RCC\\2016\\test4.exe","C:\\RCC\\2016\\","-console ".$randomport."");
} catch (Throwable $e) {
// if it failed kill process
$json = array("Success"=>false);
return json_encode($json);
rccStop($randomport);
die();
}
try{
if($teamcreate){
$addedteamcreate = 'ns:ConfigureAsCloudEditServer()';
}
if($teamtest){
$addedteamtest = 'local success, message = pcall(function() ns:ConfigureAsTeamTestServer() end)';
}
$RCCServiceSoap = new Roblox\Grid\Rcc\RCCServiceSoap("127.0.0.1", $randomport);
if ($RCCServiceSoap instanceof SoapFault) {
rccStop($randomport);
$json = array("Success" => false, "Error" => "SOAP fault occurred", "Value" => 0, "ServicePort" => $randomport);
return json_encode($json);
}
$job = new Roblox\Grid\Rcc\Job($JobId);
$scriptText = '
pcall(function() settings().Network.UseInstancePacketCache = true end)
pcall(function() settings().Network.UsePhysicsPacketCache = true end)
pcall(function() settings()["Task Scheduler"].PriorityMethod = Enum.PriorityMethod.AccumulatedError end)
settings().Network.PhysicsSend = Enum.PhysicsSendMethod.TopNErrors
settings().Network.ExperimentalPhysicsEnabled = true
settings().Network.WaitingForCharacterLogRate = 100
pcall(function() settings().Diagnostics:LegacyScriptMode() end)
local assetId = '.$placeId.'
local url = "https://www.voidrev.us/"
local scriptContext = game:GetService(\'ScriptContext\')
scriptContext.ScriptsDisabled = true
game:SetPlaceID('.$placeId.', true)
game:GetService("ChangeHistoryService"):SetEnabled(false)
local ns = game:GetService("NetworkServer")
'.$addedteamcreate.'
'.$addedteamtest.'
if url~=nil then
pcall(function() game:GetService("Players"):SetAbuseReportUrl(url .. "/AbuseReport/InGameChatHandler.ashx") end)
pcall(function() game:GetService("ScriptInformationProvider"):SetAssetUrl(url .. "/Asset/") end)
pcall(function() game:GetService("ContentProvider"):SetBaseUrl(url .. "") end)
pcall(function() game:GetService("Players"):SetChatFilterUrl(url .. "/Game/ChatFilter.ashx") end)
game:GetService("BadgeService"):SetPlaceId('.$placeId.')
game:GetService("BadgeService"):SetHasBadgeUrl(url .. "/game/Badge/HasBadge.ashx?UserID=%d&BadgeID=%d")
game:GetService("BadgeService"):SetIsBadgeLegalUrl("")
game:GetService("BadgeService"):SetAwardBadgeUrl(url .. "assets/award-badge?userId=%d&badgeId=%d&placeId=%d")
game:GetService("InsertService"):SetBaseSetsUrl(url .. "/game/Tools/InsertAsset.ashx?nsets=10&type=base")
game:GetService("InsertService"):SetUserSetsUrl(url .. "/game/Tools/InsertAsset.ashx?nsets=20&type=user&userid=%d")
game:GetService("InsertService"):SetCollectionUrl(url .. "/game/Tools/InsertAsset.ashx?sid=%d")
game:GetService("InsertService"):SetAssetUrl(url .. "/Asset/?id=%d")
game:GetService("InsertService"):SetAssetVersionUrl(url .. "/Asset/?assetversionid=%d")
pcall(function() game:GetService("SocialService"):SetFriendUrl(url .. "/game/LuaWebService/HandleSocialRequest.ashx?method=IsFriendsWith&playerid=%d&userid=%d") end)
pcall(function() game:GetService("SocialService"):SetBestFriendUrl(url .. "/game/LuaWebService/HandleSocialRequest.ashx?method=IsBestFriendsWith&playerid=%d&userid=%d") end)
pcall(function() game:GetService("SocialService"):SetGroupUrl(url .. "/game/LuaWebService/HandleSocialRequest.ashx?method=IsInGroup&playerid=%d&groupid=%d") end)
pcall(function() game:GetService("SocialService"):SetGroupRankUrl(url .. "/game/LuaWebService/HandleSocialRequest.ashx?method=GetGroupRank&playerid=%d&groupid=%d") end)
pcall(function() game:GetService("SocialService"):SetGroupRoleUrl(url .. "/game/LuaWebService/HandleSocialRequest.ashx?method=GetGroupRole&playerid=%d&groupid=%d") end)
pcall(function() game:GetService("GamePassService"):SetPlayerHasPassUrl(url .. "/game/GamePass/GamePassHandler.ashx?Action=HasPass&UserID=%d&PassID=%d") end)
pcall(function() game:GetService("MarketplaceService"):SetProductInfoUrl(url .. "/marketplace/productinfo?assetId=%d") end)
pcall(function() game:GetService("MarketplaceService"):SetDevProductInfoUrl(url .. "/marketplace/productDetails?productId=%d") end)
pcall(function() game:GetService("MarketplaceService"):SetPlayerOwnsAssetUrl(url .. "/ownership/hasasset?userId=%d&assetId=%d") end)
pcall(function() game:SetPlaceVersion('.$placeversion.') end)
pcall(function() game:SetVIPServerOwnerId(68816760) end)
pcall(function() game:SetCreatorID('.$creatorid.', Enum.CreatorType.User) end)
game:GetService("Players"):SetSysStatsUrl(url .. "/AbuseReport/sysstats")
pcall(function() game:GetService("NetworkServer"):SetIsPlayerAuthenticationRequired(true) end)
game:GetService("Players").MaxPlayersInternal = '.$MaxPlayers.'
local MaxCount = game:GetService("Players").MaxPlayers
end
settings().Diagnostics.LuaRamLimit = 0
game:Load(url .. "/asset/?id='.$placeId.'")
local port = '.$gamerandomport.'
ns:Start(port)
scriptContext:SetTimeout(0)
scriptContext.ScriptsDisabled = false
game:GetService("RunService"):Run()
return port
';
$script = new Roblox\Grid\Rcc\ScriptExecution($JobId."-Script", $scriptText);
$value = $RCCServiceSoap->OpenJobEx($job, $script);
$renew = $RCCServiceSoap->RenewLease($JobId, 9999999999999);
// okay these checks are essential, because the error catching doesnt always work here, if the port value is empty or equals 0 its probably failed.
// we dont want dead rcc's running, cuz it just eats ram.
$value = (int)$value;
if(empty($value)){
rccStop($randomport);
$json = array("Success"=>false,"Value"=>$value,"ServicePort"=>$randomport);
return json_encode($json);
}
if($value === 0){
rccStop($randomport);
$json = array("Success"=>false,"Value"=>$value,"ServicePort"=>$randomport);
return json_encode($json);
}
} catch (Throwable $e) {
rccStop($randomport);
$json = array("Success"=>false,"Value"=>$value,"ServicePort"=>$randomport);
return json_encode($json);
}
header("Content-Type: application/json");
$json = array("Success"=>true,"Value"=>$value,"ServicePort"=>$randomport);
return json_encode($json);
}
function placeStart2018($JobId,$placeId,$MaxPlayers,$creatorid,$matchmaking = 1,$placeversion = 0){
try{
class http {
public static function isUp($portToCheck) {
exec('netstat -an | find "' . $portToCheck . '"', $output);
if (!empty($output)) {
return false;
}else{
return true;
}
}
}
$randomport = rand(31501,33000);
while(http::isUp($randomport) == false)
{
$randomport = rand(31501,33000);
}
$gamerandomport = rand(30000,31500);
execInBackgroundWindows("C:\\RCC\\2018\\RCCService.exe","C:\\RCC\\2018\\","-console ".$randomport."");
} catch (Throwable $e) {
$json = array("Success"=>false);
return json_encode($json);
rccStop2018($randomport);
die();
}
$gamerandomport = rand(30000,31500);
try{
$RCCServiceSoap = new Roblox\Grid\Rcc\RCCServiceSoap("127.0.0.1",$randomport);
if ($RCCServiceSoap instanceof SoapFault) {
rccStop($randomport);
$json = array("Success" => false, "Error" => "SOAP fault occurred", "Value" => 0, "ServicePort" => $randomport);
return json_encode($json);
}
$job = new Roblox\Grid\Rcc\Job($JobId);
$scriptText = '
{
"Mode":"GameServer",
"GameId":"'.$JobId.'",
"Settings":{
"PlaceId":'.$placeId.',
"GameId":"'.$JobId.'",
"GsmInterval":5,
"MaxPlayers":'.$MaxPlayers.',
"MaxGameInstances":'.$MaxPlayers.',
"MachineAddress":"127.0.0.1",
"ApiKey":"21ee7df5-7d5b-4cef-83c9-36f92ea10aa5",
"PreferredPlayerCapacity":'.$MaxPlayers.',
"DataCenterId":"69420",
"PlaceVisitAccessKey":"21ee7df5-7d5b-4cef-83c9-36f92ea10aa5",
"UniverseId":'.$placeId.',
"MatchmakingContextId":'.$matchmaking.',
"CreatorId":'.$creatorid.',
"CreatorType":"User",
"PlaceVersion":'.$placeversion.',
"BaseUrl":"www.voidrev.us",
"JobId":"'.$JobId.'",
"PreferredPort":'.$gamerandomport.'
},
"Arguments":{}
}
';
$script = new Roblox\Grid\Rcc\ScriptExecution($JobId."-Script", $scriptText);
$value = $RCCServiceSoap->OpenJobEx($job, $script);
$renew = $RCCServiceSoap->RenewLease($JobId, 9999999999999);
// The port value check doesn't exist, this is done website side, 2016 does it client side, but 2018 json doesnt return anything
// so its harder to determine if it failed to start
} catch (Throwable $e) {
rccStop2018($randomport);
$json = array("Success"=>false,"Value"=>$gamerandomport,"ServicePort"=>$randomport);
return json_encode($json);
die();
}
header("Content-Type: application/json");
$json = array("Success"=>true,"Value"=>$gamerandomport,"ServicePort"=>$randomport);
return json_encode($json);
}
function placeStart2020($JobId,$placeId,$MaxPlayers,$creatorid,$matchmaking = 1,$placeversion = 0){
try{
class http {
public static function isUp($portToCheck) {
exec('netstat -an | find "' . $portToCheck . '"', $output);
if (!empty($output)) {
return false;
}else{
return true;
}
}
}
$randomport = rand(31501,33000);
while(http::isUp($randomport) == false)
{
$randomport = rand(31501,33000);
}
$gamerandomport = rand(30000,31500);
execInBackgroundWindows("C:\\RCC\\2020\\NewRCCService.exe","C:\\RCC\\2020\\","-console ".$randomport."");
} catch (Throwable $e) {
$json = array("Success"=>false, "error" => $e);
return json_encode($json);
rccStop2020($randomport);
die();
}
$gamerandomport = rand(30000,31500);
try{
$RCCServiceSoap = new Roblox\Grid\Rcc\RCCServiceSoap("127.0.0.1",$randomport);
if ($RCCServiceSoap instanceof SoapFault) {
rccStop($randomport);
$json = array("Success" => false, "Error" => "SOAP fault occurred", "Value" => 0, "ServicePort" => $randomport);
return json_encode($json);
}
$job = new Roblox\Grid\Rcc\Job($JobId);
$scriptText = '
{
"Mode":"GameServer",
"GameId":"'.$JobId.'",
"Settings":{
"PlaceId":'.$placeId.',
"GameId":"'.$JobId.'",
"GsmInterval":5,
"MaxPlayers":'.$MaxPlayers.',
"MaxGameInstances":'.$MaxPlayers.',
"MachineAddress":"127.0.0.1",
"ApiKey":"21ee7df5-7d5b-4cef-83c9-36f92ea10aa5",
"PreferredPlayerCapacity":'.$MaxPlayers.',
"DataCenterId":"69420",
"PlaceVisitAccessKey":"21ee7df5-7d5b-4cef-83c9-36f92ea10aa5",
"UniverseId":'.$placeId.',
"MatchmakingContextId":'.$matchmaking.',
"CreatorId":'.$creatorid.',
"CreatorType":"User",
"PlaceVersion":'.$placeversion.',
"BaseUrl":"www.voidrev.us",
"JobId":"'.$JobId.'",
"PreferredPort":'.$gamerandomport.',
"PlaceFetchUrl":"https://www.voidrev.us/asset/?id='.$placeId.'"
},
"Arguments":{}
}
';
$script = new Roblox\Grid\Rcc\ScriptExecution($JobId."-Script", $scriptText);
$value = $RCCServiceSoap->OpenJobEx($job, $script);
$renew = $RCCServiceSoap->RenewLease($JobId, 9999999999999);
// The port value check doesn't exist, this is done website side, 2016 does it client side, but 2020 json doesnt return anything
// so its harder to determine if it failed to start
} catch (Throwable $e) {
rccStop2018($randomport);
$json = array("Success"=>false,"Value"=>$gamerandomport,"ServicePort"=>$randomport);
return json_encode($json);
die();
}
header("Content-Type: application/json");
$json = array("Success"=>true,"Value"=>$gamerandomport,"ServicePort"=>$randomport);
return json_encode($json);
}
function changeableUserThumbnail($userId,$x = 768,$y = 768){
try{
include($_SERVER['DOCUMENT_ROOT']."/config/database.php");
// check if port is in use
class http {
public static function isUp($portToCheck) {
exec('netstat -an | find "' . $portToCheck . '"', $output);
if (!empty($output)) {
return false;
}else{
return true;
}
}
}
$randomport = rand(31501,33000);
while(http::isUp($randomport) == false)
{
$randomport = rand(31501,33000);
}
// start rcc
execInBackgroundWindows("C:\\RCC\\ThumbServerNew\\ThumbServer.exe","C:\\RCC\\ThumbServerNew\\","-console ".$randomport."");
$RCCServiceSoap = new Roblox\Grid\Rcc\RCCServiceSoap("127.0.0.1", $randomport);
if ($RCCServiceSoap instanceof SoapFault) { killExeThumb($randomport); return "/assets/img/1x1pending.png";}
$job = new Roblox\Grid\Rcc\Job($JobId);
$scriptText = '
{
"Mode": "Thumbnail",
"Settings": {
"Type": "Avatar_R15_Action",
"PlaceId": 0,
"UserId": '.$userId.',
"BaseUrl": "voidrev.us",
"MatchmakingContextId": 1,
"Arguments": ["https://www.voidrev.us", "https://www.voidrev.us/v1.1/avatar-fetch?userId='.$userId.'&placeId=0", "PNG", '.$x.', '.$y.']
},
"Arguments": {
"MachineAddress": "127.0.0.1"
}
}
';
$script = new Roblox\Grid\Rcc\ScriptExecution($JobId."-Script", $scriptText);
$value = $RCCServiceSoap->OpenJobEx($job, $script);
$value = base64_decode($value[0]);
return $value;
killExeThumb($randomport);
}catch(Exception $e){
return "error";
killExeThumb($randomport);
}
}
