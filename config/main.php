<?php
require_once($_SERVER['DOCUMENT_ROOT']."/SOAP.php");
if (isset($_SERVER['HTTP_CF_CONNECTING_IP'])) $_SERVER['REMOTE_ADDR'] = $_SERVER['HTTP_CF_CONNECTING_IP'];
if(!function_exists('getLocale')){
function getLocale($countrycodeonly = false,$gameid = 0) {
$countryToLanguage = array(
'US' => 'en_us',
'CA' => 'en_us',
'FR' => 'fr_us',
'SL' => 'sl_sl', // Slovenian
'HU' => 'hu_hu', // Hungarian
'TR' => 'tr_tr', // Turkish
'DK' => 'da_dk', // Danish
'IT' => 'it_it', // Italian
'LV' => 'lv_lv', // Latvian
'BD' => 'bn_bd', // Bengali
'LT' => 'lt_lt', // Lithuanian
'ID' => 'id_id', // Indonesian
'MM' => 'my_mm', // Burmese
'FR' => 'fr_fr', // French
'EE' => 'et_ee', // Estonian
'BA' => 'bs_ba', // Bosnian
'LK' => 'si_lk', // Sinhala
'BR' => 'pt_br', // Portuguese (Brazil)
'CZ' => 'cs_cz', // Czech
'JP' => 'ja_jp', // Japanese
'AR' => 'ar_001', // Arabic
'MY' => 'ms_my', // Malay
'NO' => 'nb_no', // Bokmal
'DE' => 'de_de', // German
'TW' => 'zh_tw', // Chinese (Traditional)
'US' => 'en_us', // English(US)
'TH' => 'th_th', // Thai
'KH' => 'km_kh', // Khmer
'RU' => 'ru_ru', // Russian
'FI' => 'fi_fi', // Finnish
'SK' => 'sk_sk', // Slovak
'GR' => 'el_gr', // Greek
'ES' => 'es_es', // Spanish(Spain)
'PL' => 'pl_pl', // Polish
'KZ' => 'kk_kz', // Kazakh
'RS' => 'sr_rs', // Serbian
'GE' => 'ka_ge', // Georgian
'CN' => 'zh_cn', // Chinese (Simplified)
'KR' => 'ko_kr', // Korean
'HR' => 'hr_hr', // Croatian
'IN' => 'hi_in', // Hindi
'AL' => 'sq_al', // Albanian
'VN' => 'vi_vn', // Vietnamese
'UA' => 'uk_ua', // Ukrainian
'SE' => 'sv_se', // Swedish
'BG' => 'bg_bg', // Bulgarian
);
$ipAddress = $_SERVER['REMOTE_ADDR'];
$ipInfoUrl = "http://ip-api.com/json/$ipAddress";
$response = file_get_contents($ipInfoUrl);
if ($response !== false) {
$data = json_decode($response, true);
$countryCode = $data['countryCode'];
if($countrycodeonly == false){
if (isset($countryToLanguage[$countryCode])) {
$locale = $countryToLanguage[$countryCode];
} else {
$locale = 'en_us';
}
} else {
$locale = $countryCode;
}
if($gameid == 6){
$locale = 'ja_jp';
}
}else{
if (isset($countryToLanguage[$countryCode])) {
$locale = $data['countryCode'];
}else{
$locale = 'en_us';
}
}
return $locale;
}
}
if(!function_exists('getUserData')){
function getUserData($con) {
$password = urldecode($_COOKIE['password']);
$roblosec = urldecode($_COOKIE['_ROBLOSECURITY']);
$stmt = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :roblosec");
$stmt->bindParam(':password', $password, PDO::PARAM_STR);
$stmt->bindParam(':roblosec', $roblosec, PDO::PARAM_STR);
$stmt->execute();
$usr = $stmt->fetch(PDO::FETCH_ASSOC);
return $usr;
}
}
if(!function_exists('getUserDataFromUsername')){
function getUserDataFromUsername($con,$username) {
$stmt = $con->prepare("SELECT * FROM `users` WHERE `username` = :username");
$stmt->bindParam(':username', $username);
$stmt->execute();
$usr = $stmt->fetch(PDO::FETCH_ASSOC);
return $usr;
}
}
if(!function_exists('getUserDataFromId')){
function getUserDataFromId($con,$id) {
$stmt = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
$stmt->bindParam(':id', $id);
$stmt->execute();
$usr = $stmt->fetch(PDO::FETCH_ASSOC);
return $usr;
}
}
if(!function_exists('getUsernameFromId')){
function getUsernameFromId($con,$id) {
$stmt = $con->prepare("SELECT username FROM `users` WHERE `id` = :id");
$stmt->bindParam(':id', $id);
$stmt->execute();
$usr = $stmt->fetch(PDO::FETCH_ASSOC);
return $usr['username'];
}
}
if(!function_exists('checkDiscordIdUsed')){
function checkDiscordIdUsed($con,$id) {
$stmt = $con->prepare("SELECT discordid FROM `users` WHERE `discordid` = :id");
$stmt->bindParam(':id', $id);
$stmt->execute();
$usr = $stmt->fetch(PDO::FETCH_ASSOC);
if(is_array($usr)){
return true;
}else{
return false;
}
}
}
if(!function_exists('chatUnreadCount')){
function chatUnreadCount($uID) {
global $con;
$query = $con->prepare('SELECT * FROM chats WHERE toid=:id');
$query->bindParam(':id', $uID);
$query->execute();
$data = $query->fetchAll();
$final = 0;
foreach($data as $record){
$query = $con->prepare('SELECT * FROM chatdata WHERE conversationid=:id AND readmes=0');
$query->bindParam(':id', $record['id']);
$query->execute();
$data2 = $query->fetch();
if(is_array($data2)){
$final = $final + 1;
}
}
return $final;
}
}
if(!function_exists('getUserThumbnail')){
function getUserThumbnail($con,$getid) {
$userquery = $con->prepare("SELECT id,fullthumbnailhash FROM `users` WHERE `id` = :id");
$userquery->execute(['id' => $getid]);
$user = $userquery->fetch();
if(is_array($user)){
$thumb = $user['fullthumbnailhash'];
$userid = $user['id'];
if(!file_exists($_SERVER['DOCUMENT_ROOT']."/thumbnails/".$thumb.".png")) {
execInBackground('php "C:\wamp64\www\thumbs\avatar.ashx" '.$userid);
$thumb = "/img/pending.png";
}else{
$thumb = "/thumbnails/".$thumb.".png";
}
}else{
$thumb = "/img/error.png";
}
return $thumb;
}
}
if(!function_exists('getUserHeadshotThumbnail')){
function getUserHeadshotThumbnail($con,$getid) {
$userquery = $con->prepare("SELECT id,headshotthumbnailhash FROM `users` WHERE `id` = :id");
$userquery->execute(['id' => $getid]);
$user = $userquery->fetch();
if(is_array($user)){
$thumb = $user['headshotthumbnailhash'];
$userid = $user['id'];
if(!file_exists($_SERVER['DOCUMENT_ROOT']."/thumbnails/".$thumb.".png")) {
execInBackground('php "C:\wamp64\www\thumbs\headshot.ashx" '.$userid);
$thumb = "/img/pending.png";
}else{
$thumb = "/thumbnails/".$thumb.".png";
}
}else{
$thumb = "/img/error.png";
}
return $thumb;
}
}
if(!function_exists('getModelThumbnail')){
function getModelThumbnail($con,$id,$fileid = false) {
if($fileid){
$libquery = $con->prepare("SELECT id,thumbnailhash,type2,realfileid,banned FROM `library` WHERE `fileid` = :id");
$libquery->execute(['id' => $id]);
}else{
$libquery = $con->prepare("SELECT id,thumbnailhash,type2,realfileid,banned FROM `library` WHERE `id` = :id");
$libquery->execute(['id' => $id]);
}
$lib = $libquery->fetch();
if(is_array($lib)){
$thumb = $lib['thumbnailhash'];
if($lib['type2'] == "Face"){
$thumb = "/asset/?id=".$lib['realfileid'];
}elseif($lib['type2'] == "Sound"){
$thumb = "/img/audio.png";
}elseif($lib['type2'] == "Decal"){
$thumb = "/asset/?id=".$lib['realfileid'];
}elseif($lib['type2'] == "Badge"){
$thumb = "/asset/?id=".$lib['realfileid'];
}elseif($lib['type2'] == "Video"){
$thumb = "/img/video.png";
}else{
if(!file_exists($_SERVER['DOCUMENT_ROOT']."/thumbnails/".$thumb.".png")) {
execInBackground('php "C:\wamp64\www\model-thumbnails.php"' .$id);
$thumb = "/img/pending.png";
}else{
$thumb = "/thumbnails/".$thumb.".png";
}
}
}else{
$thumb = "/img/error.png";
}
if($lib['banned'] != 0){
$thumb = "/img/error.png";
}
return $thumb;
}
}
if(!function_exists('getPlaceThumbnail1')){
function getPlaceThumbnail1($con,$getid) {
$placequery = $con->prepare("SELECT id,thumbnail1,generatedthumbnailhash FROM `games` WHERE `id` = :id");
$placequery->execute(['id' => $getid]);
$place = $placequery->fetch();
if(is_array($place)){
$thumb = $place['thumbnail1'];
$hash = $place['generatedthumbnailhash'];
$getid = $place['id'];
if(!file_exists($_SERVER['DOCUMENT_ROOT']."/img/games/thumb1for".$getid.".png")) {
if($thumb == 0){
if($hash == NULL || !file_exists($_SERVER['DOCUMENT_ROOT']."/thumbnails/".$hash.".png")){
execInBackground('php "C:\wamp64\www\place-thumbnails.php" '.$getid);
$thumb = "/img/pending.png";
}else{
$thumb = "/thumbnails/".$hash.".png";
}
}
}else{
$thumb = "/img/games/thumb1for".$getid.".png";
}
}else{
$thumb = "/img/error.png";
}
return $thumb;
}
}
if(!function_exists('getPlaceThumbnail2')){
function getPlaceThumbnail2($con,$getid) {
$placequery = $con->prepare("SELECT id,thumbnail2 FROM `games` WHERE `id` = :id");
$placequery->execute(['id' => $getid]);
$place = $placequery->fetch();
$thumb = $place['thumbnail2'];
$getid = $place['id'];
$thumb = "/img/games/thumb2for".$getid.".png";
return $thumb;
}
}
if(!function_exists('getPlaceThumbnail3')){
function getPlaceThumbnail3($con,$getid) {
$placequery = $con->prepare("SELECT id,thumbnail3 FROM `games` WHERE `id` = :id");
$placequery->execute(['id' => $getid]);
$place = $placequery->fetch();
$thumb = $place['thumbnail3'];
$getid = $place['id'];
$thumb = "/img/games/thumb3for".$getid.".png";
return $thumb;
}
}
if(!function_exists('getPlaceIcon')){
function getPlaceIcon($con,$getid,$idonly = false) {
$placequery = $con->prepare("SELECT id,icon FROM `games` WHERE `id` = :id");
$placequery->execute(['id' => $getid]);
$place = $placequery->fetch();
$thumb = $place['icon'];
if(!file_exists($_SERVER['DOCUMENT_ROOT']."/img/games/".$thumb."s.png")){
$thumb = 0;
}
if($idonly){
// leave it as is
}else{
$thumb = "/img/games/".$thumb."s.png";
}
return $thumb;
}
}
if(!function_exists('containsLink')){
function containsLink($input) {
// Regular expression to match URLs (this is a simplified version)
$pattern = '/\b(?:https?|ftp):\/\/[^\s]+/';
// Check if the input contains a link
if (preg_match($pattern, $input)) {
return true;
} else {
return false;
}
}
}
if(!function_exists('getPlayerCount')){
function getPlayerCount($gameid){
global $con;
$playingquery = $con->prepare("SELECT * FROM `jobs` WHERE `placeId`= :placeId");
$playingquery->execute(['placeId' => $gameid]);
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
$dbplayercount = 0;
}
if(is_array($playingarray)){
$playercount = $dbplayercount;
}else{
$playercount = 0;
}
}
return $playercount;
}
}
if(!function_exists('getMaxPlayerCount')){
function getMaxPlayerCount($gameid){
global $con;
$placequery = $con->prepare("SELECT MaxPlayers FROM `games` WHERE `id` = :id");
$placequery->execute(['id' => $gameid]);
$place = $placequery->fetch();
return $place['MaxPlayers'];
}
}
?>