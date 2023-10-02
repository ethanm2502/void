<?php
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$ROBLOSEC= filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['ROBLOSECURITY' => $ROBLOSEC]);
$usr = $usrquery->fetch();
$uID = $usr['id'];
 
if($_GET['part'] && $_GET['id']){

if($_GET['part'] == "leftleg"){

$id = (int)$_GET['id'];
  
$updateleftleg = "UPDATE `users` SET `LeftLegColor` = '$id' WHERE `id`='$uID'";
$con->exec($updateleftleg);
$updatethumb = "UPDATE `users` SET `refreshthumbnail` = '1' WHERE `id`='$uID'";
$con->exec($updatethumb);
unlink($_SERVER['DOCUMENT_ROOT'].'/generatedimages/players/'.$uID.'.png');
unlink($_SERVER['DOCUMENT_ROOT'].'/generatedimages/playersheadshots/'.$uID.'.png');
echo "Success";
  
}
  
if($_GET['part'] == "leftarm"){

$id = (int)$_GET['id'];
  
$updateleftarm = "UPDATE `users` SET `LeftArmColor` = '$id' WHERE `id`='$uID'";
$con->exec($updateleftarm);
$updatethumb = "UPDATE `users` SET `refreshthumbnail` = '1' WHERE `id`='$uID'";
$con->exec($updatethumb);
unlink($_SERVER['DOCUMENT_ROOT'].'/generatedimages/players/'.$uID.'.png');
unlink($_SERVER['DOCUMENT_ROOT'].'/generatedimages/playersheadshots/'.$uID.'.png');
echo "Success";
  
}
  
if($_GET['part'] == "rightleg"){

$id = (int)$_GET['id'];
  
$updaterightleg = "UPDATE `users` SET `RightLegColor` = '$id' WHERE `id`='$uID'";
$con->exec($updaterightleg);
$updatethumb = "UPDATE `users` SET `refreshthumbnail` = '1' WHERE `id`='$uID'";
$con->exec($updatethumb);
unlink($_SERVER['DOCUMENT_ROOT'].'/generatedimages/players/'.$uID.'.png');
unlink($_SERVER['DOCUMENT_ROOT'].'/generatedimages/playersheadshots/'.$uID.'.png');
echo "Success";
  
}
  
if($_GET['part'] == "torso"){

$id = (int)$_GET['id'];
  
$updatetorso = "UPDATE `users` SET `TorsoColor` = '$id' WHERE `id`='$uID'";
$con->exec($updatetorso);
$updatethumb = "UPDATE `users` SET `refreshthumbnail` = '1' WHERE `id`='$uID'";
$con->exec($updatethumb);
unlink($_SERVER['DOCUMENT_ROOT'].'/generatedimages/players/'.$uID.'.png');
unlink($_SERVER['DOCUMENT_ROOT'].'/generatedimages/playersheadshots/'.$uID.'.png');
echo "Success";
  
}  
  
if($_GET['part'] == "rightarm"){

$id = (int)$_GET['id'];
  
$updaterightarm = "UPDATE `users` SET `RightArmColor` = '$id' WHERE `id`='$uID'";
$con->exec($updaterightarm);
$updatethumb = "UPDATE `users` SET `refreshthumbnail` = '1' WHERE `id`='$uID'";
$con->exec($updatethumb);
unlink($_SERVER['DOCUMENT_ROOT'].'/generatedimages/players/'.$uID.'.png');
unlink($_SERVER['DOCUMENT_ROOT'].'/generatedimages/playersheadshots/'.$uID.'.png');
echo "Success";
  
} 
 
if($_GET['part'] == "head"){

$id = (int)$_GET['id'];
  
$updatehead = "UPDATE `users` SET `HeadColor` = '$id' WHERE `id`='$uID'";
$con->exec($updatehead);
$updatethumb = "UPDATE `users` SET `refreshthumbnail` = '1' WHERE `id`='$uID'";
$con->exec($updatethumb);
unlink($_SERVER['DOCUMENT_ROOT'].'/generatedimages/players/'.$uID.'.png');
unlink($_SERVER['DOCUMENT_ROOT'].'/generatedimages/playersheadshots/'.$uID.'.png');
echo "Success";
  
} 
  
}else{
echo "Bad Request";
}