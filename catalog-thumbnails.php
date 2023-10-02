<?php 
/*
include ($_SERVER['DOCUMENT_ROOT'].'/SOAP.php');
$getid = (int)$_GET['assetId'];

$usrquery = $con->prepare("SELECT * FROM `library` WHERE `id` = :id AND `type` = 'item'");
$usrquery->execute(['id' => $getid]);
$usr = $usrquery->fetch();
  
$fileid = $usr['fileid'];
$type = $usr['type2'];

try {  
  
if($usr['refreshthumbnail'] == '1'){
unlink($_SERVER['DOCUMENT_ROOT']."/generatedimages/catalog/".$getid.".png");
$thumbupdate = "UPDATE `library` SET `refreshthumbnail` = '0' WHERE `id`='$getid'";
$con->exec($thumbupdate);
}
  
if (file_exists($_SERVER['DOCUMENT_ROOT']."/generatedimages/catalog/".$getid.".png")){
header("Content-Type: image/png");
readfile($_SERVER['DOCUMENT_ROOT']."/generatedimages/catalog/".$getid.".png");
}else{

$content = catthumbnail($fileid,$type);
  
file_put_contents($_SERVER['DOCUMENT_ROOT']."/generatedimages/catalog/".$getid.".png",$content);
header("Content-Type: image/png");
readfile($_SERVER['DOCUMENT_ROOT']."/generatedimages/catalog/".$getid.".png");
}
  
} 
catch(Error $e) {
killExeThumb($thumbnailServicePort);
header("Content-Type: image/png");
readfile($_SERVER['DOCUMENT_ROOT']."/img/errors/ThumbError.png");
exit();
}
*/ 
?>
dead