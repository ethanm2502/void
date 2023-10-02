<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
if($_COOKIE['username'] && $_COOKIE['password']){
$username = filter_var($_COOKIE['username'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `username` = :username AND `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['username' => $username, 'password' => $password, 'ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
}
if($usr['banned'] != 0){
echo json_encode(array('success' => false));
die(http_response_code(403));
}
$Item = (int)$_GET['id'];
$uID = $usr['id'];
$full = $usr['fullthumbnailhash'];
$headshot = $usr['headshotthumbnailhash'];
$itemquery = $con->prepare("SELECT * FROM `owneditems` WHERE `itemid` = :itemid AND `userid` = :userid");
$itemquery->execute(['itemid' => $Item, 'userid' => $uID]);
$item = $itemquery->fetch();
$catquery = $con->prepare("SELECT * FROM `library` WHERE `id` = :id AND `type` = 'item'");
$catquery->execute(['id' => $Item]);
$cat = $catquery->fetch();
$Item = $cat['fileid'];
if(is_array($item)){
$type = $cat['type2'];
$existquery = $con->prepare("SELECT * FROM `avataritems` WHERE `userid` = :userid AND `itemid` = :itemid");
$existquery->execute(['userid' => $uID, 'itemid' => $Item]);
$exist = $existquery->fetch();
if(!is_array($exist)){
$itemexistquery = $con->prepare("SELECT * FROM `avataritems` WHERE `userid` = :userid AND `type` = :type");
$itemexistquery->execute(['userid' => $uID, 'type' => $type]);
$itemexist = $itemexistquery->fetch();
if(is_array($itemexist) && $type != "Hat"){
$existid = $itemexist['itemid'];
$sql = "DELETE FROM `avataritems` WHERE `userid` = '$uID' AND `itemid` = '$existid'";
$con->exec($sql);
}
$sql = "INSERT INTO `avataritems` (`itemid`, `userid`, `type`) VALUES ('$Item', '$uID', '$type')";
$con->exec($sql);
unlink($_SERVER['DOCUMENT_ROOT'].'/thumbnails/'.$full.'.png');
unlink($_SERVER['DOCUMENT_ROOT'].'/thumbnails/'.$headshot.'.png');
}else{
$sql = "DELETE FROM `avataritems` WHERE `userid` = '$uID' AND `itemid` = '$Item'";
$con->exec($sql);
unlink($_SERVER['DOCUMENT_ROOT'].'/thumbnails/'.$full.'.png');
unlink($_SERVER['DOCUMENT_ROOT'].'/thumbnails/'.$headshot.'.png');
}
}else{
echo "Bad Request, this item does not exist.";
}