<?php
try{
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
if (isset($_COOKIE['password']) || isset($_COOKIE['_ROBLOSECURITY'])) {
$password = filter_input(INPUT_COOKIE, 'password', FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_input(INPUT_COOKIE, '_ROBLOSECURITY', FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
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
die();
}
}else{
http_response_code(403);
die();
}
if($usr['banned'] != 0){
echo json_encode(array('success' => false));
die(http_response_code(403));
}
header("Content-Type: application/json");
$now = time();
$timefromdatabase = $usr['time'];
$dif = time() - $timefromdatabase;
$Robux = $usr['Robux'];
if ($dif > 43200) {
$newtime = $now + 43200;
if($usr['membership'] == "None"){
$RobuxToAdd = 15;
}else if($usr['membership'] == "BuildersClub"){
$RobuxToAdd = 50;
}else if($usr['membership'] == "TurboBuildersClub"){
$RobuxToAdd = 125;
}else if($usr['membership'] == "OutrageousBuildersClub"){
$RobuxToAdd = 200;
}else if($usr['membership'] == "Premium"){
$RobuxToAdd = 300;
}else{
$RobuxToAdd = 15;
}
$Total = $Robux + $RobuxToAdd;
$sql = "UPDATE `users` SET `Robux` = :total WHERE `ROBLOSECURITY` = :roblosec";
$stmt = $con->prepare($sql);
$stmt->execute(array(':total' => $Total, ':roblosec' => $roblosec));
$sql2 = "UPDATE `users` SET `time` = :newtime WHERE `ROBLOSECURITY` = :roblosec";
$stmt2 = $con->prepare($sql2);
$stmt2->execute(array(':newtime' => $newtime, ':roblosec' => $roblosec));
}
if(!function_exists('robux_custom_number_format')){
function robux_custom_number_format($number, $precision = 1) {
if ($number >= 1000000000) {
return number_format($number/1000000000, 1) . 'B';
} elseif ($number >= 1000000) {
return number_format(floor($number/1000)/1000, 1) . 'M';
} elseif ($number >= 1000) {
return number_format(floor($number/100)/10, 1) . 'K';
} else {
return number_format($number);
}
}
}
$Robux_Format = robux_custom_number_format($Robux);
$notificationvalue = 0;
$friendamquery = $con->prepare("SELECT count(*) FROM `friends` WHERE `status`='1' AND toid= :toid");
$friendamquery->execute(['toid' => $uID]);
$friendreqcount = $friendamquery->fetchColumn();
$messageamquery = $con->prepare("SELECT messageid,toid FROM `messages` WHERE `toid`= :toid AND `messageread` = '0'");
$messageamquery->execute(['toid' => $uID]);
$messagescount = $messageamquery->rowCount();
$notificationvalue = $friendreqcount + $messagescount;
if($friendreqcount > 0){
$friendsnotifcation = "true";
}else{
$friendsnotifcation = "false";
}
if($messagescount > 0){
$messagenotifcation = "true";
}else{
$messagenotifcation = "false";
}
}catch(Exception $e){
die(http_response_code(500));
}
?>
{
"FriendUserDataModel": {
"Url": "https://www.voidrev.us/users/friends/?id=<?=$uID;?>",
"TotalCount": <?=$friendreqcount;?>,
"DiaplayCount": <?=$friendreqcount;?>
},
"MessageUserDataModel": {
"Url": "https://www.voidrev.us/my/messages",
"TotalCount": <?=$messagescount;?>,
"DiaplayCount": <?=$messagescount;?>
},
"CurrencyBalancesDisplay": {
"HasError": false,
"RobuxText": "<?=$Robux_Format;?>",
"RobuxMessage": "<?=$Robux;?> Robux"
}
}
