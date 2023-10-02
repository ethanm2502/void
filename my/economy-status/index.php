<?php
header('Content-Type: application/json; charset=utf-8');
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$ROBLOSEC= filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$logged = false;
if(isset($_GET['userId'])) {
    $uID = (int)$_GET['userId'];
                                    $usrquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
                                    $usrquery->execute(['id' => $uID]);
                                    $usr = $usrquery->fetch();
                        if($usr != 0){
                              $logged = true;
                               }
$Tix = $usr['Tickets'];
$Robux= $usr['Robux'];
?>
{"robux":<?php echo$Robux?>,"tickets":0,"isMarketplaceEnabled":true,"isDeveloperProductPurchaseEnabled":true,"areInAppPurchasesEnabled":true}
<?php
exit();
}
if(isset($_POST['userId'])) {
    $uID = (int)$_POST['userId'];
                                    $usrquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
                                    $usrquery->execute(['id' => $uID]);
                                    $usr = $usrquery->fetch();
                        if($usr != 0){
                              $logged = true;
                               }
$Tix = $usr['Tickets'];
$Robux= $usr['Robux'];
?>
{"robux":<?php echo$Robux?>,"tickets":0,"isMarketplaceEnabled":true,"isDeveloperProductPurchaseEnabled":true,"areInAppPurchasesEnabled":true}
<?php
exit();
}
                                    $usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSECURITY");
                                    $usrquery->execute(['ROBLOSECURITY' => $ROBLOSEC]);
                                    $usr = $usrquery->fetch();
                        if($usr != 0){
                              $logged = true;
                               }
$Tix = $usr['Tickets'];
$Robux= $usr['Robux'];

if($logged) { 
?>
{"robux":<?php echo$Robux?>,"tickets":0,"isMarketplaceEnabled":true,"isDeveloperProductPurchaseEnabled":true,"areInAppPurchasesEnabled":true}
<?php } if(!$logged) {
exit();
}
?>	