<?php
require($_SERVER['DOCUMENT_ROOT']."/config/includes.php");
header("Content-Type: application/json");
//rbxsig numba 2
$privatekey = "-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAr5CobJKCl5sFQi3jqwl5nOgVKwe232sI+Fno8cjcyLIePIHtiP7sTo45TEHT0aEd/LoKglpraEWjADsRVj0m00zQJ9ElC/WMkvRPOXrKaqDgNAM/LpC7ZuO1fF1PzfgXSkZEikGXBbzMN68El7OByQZUSPLRla56q673DlDUIrVNLe6SNxiBdaK/2c5Hepu+YfAjah51dTU3mK70Bhk9yiEenU9yUb6FfTJXFV7qb3jB1arQrqs0ue8lU9ZjKCBC3i8C9GU9/RLin1l9OEhMlwG6yicpUr3sRHWr4NU69grjLS+ipriQgim2RhMdCXvmfq5rjC1UeGpBTDxC+/c7+QIDAQABAoIBAAT+/9v/G1pHHhIxDh6K6XwOmrObx5d6C0pN/LQMvEO11ehw5hqU7pKZt4W1BdscU6cigDQPcKkJ+kaCZ87ldJpkwDOx3vUFKtfvveVr2iDIrTitsvmXQs39wudkHGZHHhqN/1tT3IFcSw92mpHamOHonTNqPY6d5X3HP96XbEIEjLl7Z5ed5NA3s5FiMu4tUuhVD9/truOzRnnbcyDh4lWZPARcodd8GVnNosxvYvEljBmcAqNk2u6ViH0N8e26iw6BHMGUIxYiCJ65PG9EEUUJcKyuOyYj5pGEDwQ0h99eCYnZIBCWEDb0zbeICcED32Ptmleomp8TeHbHijrNvhUCgYEA1v6WdUKnFFN6NG4wmtuyCIbQgkrkz2UgDm5SDKWg52eh5I8QbQ0lR1oWi1MO6+cab8WxIMV4+3kuU2veH24wTj5BtP9R2uyqgRgfrDRLuID9t7oCofUIP19Aw8/VLtZALUUBnoDKQ7X5ErpBQ3h+TucBmYrNuj9qd4WDG02yd5cCgYEA0QzfclS8lrWl5bq2eesPcl5afOKdVBAPXxe0eyqF5Z+jp6YcIJFWjebZ02+nPkm1UB6CpN/LXfrSPiC8990DM8KhxdUbiBa0mOEnidfbAx6Q4soDVXzcsuC6ZIeo34bj+veZgckfMZ3KsgziAg1ngWIBVrSDHaErxrjb4cP12u8CgYAmGznPzuCOWb1vTZiP2iDUIhETBvNHT0U/SY6Bb1n1qgin2jOvIIVbADy+tRoP9gZZiVC73kRzTidH4fac24r0U1SSIC8B/rC58OysORiyuyo9RlrxGd08XkW8bzn58z+sxm5jCbDQD5D2IM0wiEra8Vb3QAL24Aae6Ks0S7E2QQKBgQCnK9wj2Y9WFbyskTsLE+YuVzWVWMLnTlB8gsBZHhAlKBv/HN6xTIgiwdC/PDJJpTfQ8hUXM7+1T7aA6D01GRBOe/5R7bEuirmw55xupqcFP5QtR86Stl7mzL9BVRq+ZWg6cXXYS7UeQEivSY4ShhWXaYAYjhGryA7xwzJSwBoDEQKBgGHUgXxvwU3FohmRtiNrRnCbB4IOG+cPxLWQNGXfptT6Zmav36fu61bp+k/aN/0Lox1QBFVT8/2/Pf4P0tgSm3lpptQNzaGZwzrtOQCjlWE0RwTJp5dD9JM/6tCd1dK97fLPPmDxbJJZ6nkUH0921WM+CA8LaqqFDymVi3wDZ3Z7
-----END RSA PRIVATE KEY-----";
// and ofc 1
$privatekey1 = "-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQDOirFwxWKEiVdFMlqqAaIofFcG31hIdEtnoC0tx0Ykx9BpoA3fbStwQfUUv7usn49qCgGh25OWrS88jkr6Y2tce663lLVVEV9pymS9APcoy4quVYn9/FbaDQh/bQGyPUR8AdUKaiA74dPI9w1yVp+uzOHAxHko7ou/9YK/+l3EtQIDAQABAoGAVX9yLmV2/7g+qQVMJJ3ie3HlMJIZ4HxLjozuxsl7ztPsAR1hQMDXP3P+OOWZkb7HRjT4MgFMGg58xEt+3CF1mid0UEmRxIezvrd2X5+muYckj/qOG1LHcYhWcHsp6vO5kejbHdjfY/DEpOGeLmuH6hF3HM+aD5boAgru9SDfgs0CQQDyGyVe1jc5iPZVOaw2n01uvQD59azdnUy2WAb/nB2M+87+vUMrQ7z8Iat+jwSz/EAoL06b4FmEjt30ynWsuRkvAkEA2mUPw0aCnpDMCQHkzp/ASAOiIwHiTzrnPcI2af71eylXTBofD43uFbZKEIq7o6eFng1YGRNDt8kHwiWqvET/WwJAaCo/0ObvycRg39g5fSLbKOsO0XzfTFZSXB3RnQZpPHBW5gk+Lg4t8Hj4FTKpflroq6F2+9/yA/OIEbtOF+tnpwJAOgpLsyDlC9D9eJNZRJRuHHVivJz+kQHdfKtFnMvWX4HwIlh60r5sfLayXk0QawDVYNi5Bgj5oTk655ztEBXiKwJBAILWgqOVjICo4dfmM5cjmrmFydTL9QPuytmCzGNDKY2VO+8xRUgVTpDWfaQ/tGj+AxdAlae1w71DARe6fWItR34=
-----END RSA PRIVATE KEY-----";
$roblosec = filter_input(INPUT_COOKIE, '_ROBLOSECURITY', FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$stmt = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :roblosec");
$stmt->bindParam(':roblosec', $roblosec);
$stmt->execute();
$ticketcheck = $stmt->fetch(PDO::FETCH_ASSOC);
if ($ticketcheck['activated'] == 0) {
die("Bad Request");
}
if($ticketcheck['banned'] != 0){
die("Bad Request");
}
$authid = $ticketcheck['id'];
$authname = $ticketcheck['username'];
$authdisplayname = $ticketcheck['displayname'];
$membership = $ticketcheck['membership'];
$settingquery = $con->prepare("SELECT * FROM `settings`");
$settingquery->execute();
$settings = $settingquery->fetch();
$ip = $settings['serverip'];
if(isset($_GET['serverPort'])){
$port = (int)$_GET['serverPort'];
}else{
die("Missing data 2");
}
$gameid = (int)$_GET['gameid'];
if(isset($_GET['jobid'])){
$jobid = filter_var($_GET['jobid'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
}else{
die("Missing data 3");
}
if(!isset($_GET['gameid'])){
$gameid = (int)$_GET['universeId'];
}
if($authdisplayname == NULL){
$authdisplayname = $authname;
}
$gamequery = $con->prepare("SELECT id,creatorid FROM `games` WHERE id = :id");
$gamequery->execute(['id' => $gameid]);
$games = $gamequery->fetch();
$creatorid = $games['creatorid'];
$visitupdate = $con->prepare("UPDATE `games` SET `visits` = visits + 1 WHERE `id` = :gameid");
$visitupdate->execute([':gameid' => $gameid]);
$accountdays = floor((time() - $ticketcheck['trn_date']) / (24 * 60 * 60));
function sign($script, $key) {
$signature = "";
openssl_sign($script, $signature, $key, OPENSSL_ALGO_SHA1);
return base64_encode($signature);
}
$charapp = "http://www.voidrev.us/v1.1/avatar-fetch?userId=$authid&placeId=$gameid";
if($_GET['type'] == "2018"){
function authticket($id, $name, $charapp, $jobid, $privatekey) {
$ticket = $id . "\n" . $jobid . "\n" . date('n\/j\/Y\ g\:i\:s\ A');
openssl_sign($ticket, $sig, $privatekey, OPENSSL_ALGO_SHA1);
$sig = base64_encode($sig);
$ticket2 = $id . "\n" . $name . "\n" . 0 . "\n". $jobid . "\n" . date('n\/j\/Y\ g\:i\:s\ A');
openssl_sign($ticket2, $sig2, $privatekey, OPENSSL_ALGO_SHA1);
$sig2 = base64_encode($sig2);
$final = date('n\/j\/Y\ g\:i\:s\ A') . ";" . $sig2 . ";" . $sig . ";2";
return($final);
}
}elseif($_GET['type'] == 2020){
function authticket($id, $name, $charapp, $jobid, $privatekey) {
global $accountdays;
global $membership;
global $authdisplayname;
$time = date('n\/j\/Y\ g\:i\:s\ A');
$namecount = strlen($name);
$displaynamecount = strlen($authdisplayname);
$membcount = strlen($membership);
$ticket = $time."\n".$jobid."\n".$id."\n0\n0\n".$accountdays."\nf\n".$namecount."\n".$name."\n".$membcount."\n".$membership."\n0\n\n0\n\n".$displaynamecount."\n".$authdisplayname;
openssl_sign($ticket, $sig, $privatekey, OPENSSL_ALGO_SHA1);
$sig = base64_encode($sig);
$ticket2 = $id . "\n" . $name . "\n" . $charapp . "\n". $jobid . "\n" . $time;
openssl_sign($ticket2, $sig2, $privatekey, OPENSSL_ALGO_SHA1);
$sig2 = base64_encode($sig2);
$final = $time . ";" . $sig2 . ";" . $sig . ";4";
return($final);
}
}else{
function authticket($id, $name, $charapp, $jobid, $privatekey1) {
$ticket = $id . "\n" . $jobid . "\n" . date('n\/j\/Y\ g\:i\:s\ A');
openssl_sign($ticket, $sig, $privatekey1, OPENSSL_ALGO_SHA1);
$sig = base64_encode($sig);
$ticket2 = $id . "\n" . $name . "\n" . $charapp . "\n". $jobid . "\n" . date('n\/j\/Y\ g\:i\:s\ A');
openssl_sign($ticket2, $sig2, $privatekey1, OPENSSL_ALGO_SHA1);
$sig2 = base64_encode($sig2);
$final = date('n\/j\/Y\ g\:i\:s\ A') . ";" . $sig2 . ";" . $sig;
return($final);
}
}
if($_GET['type'] == 2018){
$authkey = $privatekey;
}elseif($_GET['type'] == 2020){
$authkey = $privatekey;
}else{
$authkey = $privatekey1;
}
$locale = getLocale(false,$gameid);
if($_SERVER['REMOTE_ADDR'] == $ip){
$ip = "127.0.0.1";
}
$joinscript = [
// useless
"ClientPort" => 0,
"MachineAddress" => $ip,
"ServerPort" => $port,
"ServerConnections" => [["Address" => $ip, "Port" => $port]],
"PingUrl" => "http://www.voidrev.us/Game/ClientPresence.ashx?PlaceID=".$gameid."&userID=".$authid,
// change this to ping more
"PingInterval" => 30,
"UserName" => $authname,
"DisplayName" => $authdisplayname,
// doesnt seem to change anything
"SeleniumTestMode" => false,
"UserId" => $authid,
// wumbo will change this
"RobloxLocale" => $locale,
"GameLocale" => $locale,
// guest shit
"SuperSafeChat" => false,
"CharacterAppearance" => "http://www.voidrev.us/v1.1/avatar-fetch?userId=".$authid."&placeId=".$gameid,
"ClientTicket" => authticket($authid, $authname, $charapp, $jobid, $authkey),
"GameId" => $jobid,
"PlaceId" => $gameid,
// analytics
"MeasurementUrl" => "",
// :shrug:
"WaitingForCharacterGuid" => "26eb3e21-aa80-475b-a777-b43c3ea5f7d2",
"BaseUrl" => "http://www.voidrev.us/",
// nobody likes anything else
"ChatStyle" => "ClassicAndBubble",
// device type
"VendorId" => "0",
// useless
"ScreenShotInfo" => "",
// useless
"VideoInfo" => "",
"CreatorId" => $creatorid,
// for group games and user
"CreatorTypeEnum" => "User",
"MembershipType" => $membership,
// broken lol
"AccountAge" => $accountdays,
// useless
"CookieStoreFirstTimePlayKey" => "rbx_evt_ftp",
"CookieStoreFiveMinutePlayKey" => "rbx_evt_fmp",
"CookieStoreEnabled" => true,
// doesnt seem to make any difference
"IsRobloxPlace" => false,
// teleport join is uhh
"GenerateTeleportJoin" => false,
// guest again
"IsUnknownOrUnder13" => false,
// probs useful
"SessionId" => "",
"DataCenterId" => 69420,
"UniverseId" => $gameid,
"BrowserTrackerId" => 0,
// eh
"UsePortraitMode" => false,
"FollowUserId" => 0
];
$data = json_encode($joinscript, JSON_UNESCAPED_SLASHES | JSON_NUMERIC_CHECK);
$stmt = $con->prepare("SELECT * FROM `recentlyplayed` WHERE `playerid` = :userId AND `gameid` = :gameId ORDER BY time DESC LIMIT 6");
$stmt->bindParam(':userId', $authid);
$stmt->bindParam(':gameId', $gameid);
$stmt->execute();
$recent = $stmt->fetch();
if(!is_array($recent)){
$query = $con->prepare('INSERT INTO recentlyplayed (`gameid`, `playerid`, `time`) VALUES (:gameid, :playerid, :time)');
$query->bindParam(':gameid', $gameid, PDO::PARAM_INT);
$query->bindParam(':playerid', $authid, PDO::PARAM_INT);
$query->bindParam(':time', time());
$query->execute();
}
if($_GET['type'] == 2018){
$signature = sign("\r\n" . $data, $privatekey);
exit("--rbxsig2%". $signature . "%\r\n" . $data);
}elseif($_GET['type'] == 2020){
$signature = sign("\r\n" . $data, $privatekey);
exit("--rbxsig2%". $signature . "%\r\n" . $data);
}else{
$signature = sign("\r\n" . $data, $privatekey1);
exit("--rbxsig%". $signature . "%\r\n" . $data);
}