<?php
include ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
$headers = getallheaders();
header('Content-Type: application/json; charset=UTF-8; X-Robots-Tag: noindex');

if($_POST["username"] && $_POST["password"]){
        $username = (urldecode(NoXSSPlz(filter_var($_POST['username'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES))));
        $con->quote($username);
        $password = (urldecode(NoXSSPlz(filter_var($_POST['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES))));
        $con->quote($password);
  
    if($username && $password){
        $checkquery = $con->prepare("SELECT * FROM `users` WHERE `username`= :username");
        $checkquery->execute(['username' => $username]);
        $check = $checkquery->fetch();
        $hash = $check['password'];
        if (password_verify($password, $hash)) {
        $checkquery2 = $con->prepare("SELECT * FROM `users` WHERE `password`= :hash");
        $checkquery2->execute(['hash' => $hash]);
        $check2 = $checkquery2->fetch();  
		$password = $hash;
        }

          if(!$check){
            echo("[]");
          }elseif(!$check2){
            echo("[]");
            
          }else{
              $roblosec = $check['ROBLOSECURITY'];
              $uID = $check['id'];
              $banvalue = $check['banned'];
              if($banvalue > 0)
              {$isbanned = true;
                }else{$isbanned = false;}
               setcookie("username", $username, time() + (460800* 30), "/", '.voidrev.us');
                    setcookie("password", $password, time() + (460800* 30), "/", '.voidrev.us');
                                  setcookie(".ROBLOSECURITY", $roblosec, time() + (460800* 30), "/", '.voidrev.us');
                                  setcookie("access", "yes", time() + 24 * 60 * 60, "/", '.voidrev.us');
                                  setcookie(".RBXID", $roblosec, time() + (460800* 30), "/", '.voidrev.us');
if (strpos($headers['User-Agent'], "Android") !== false || strpos($headers['User-Agent'], "iPhone") !== false) {
?>
{"membershipType":4,"username":"<?echo NoXSSPlz($username);?>","isUnder13":true,"countryCode":"US","userId":<?=$uID;?>,"displayName":"<?echo NoXSSPlz($username);?>"}
<?
exit();
}
?>
{"user":{"id":<?=$uID;?>,"name":"<?echo NoXSSPlz($username);?>","displayName":"<?echo NoXSSPlz($username);?>"},"isBanned":false}
<?php }}exit();}
  
$data = json_decode(file_get_contents('php://input'), true);  
if($data["cvalue"] && $data["password"]){
        $username = (urldecode(NoXSSPlz(filter_var($data['cvalue'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES))));
        $con->quote($username);
        $password = (urldecode(NoXSSPlz(filter_var($data['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES))));
        $con->quote($password);
  
    if($username && $password){
        $checkquery = $con->prepare("SELECT * FROM `users` WHERE `username`= :username");
        $checkquery->execute(['username' => $username]);
        $check = $checkquery->fetch();
        $hash = $check['password'];
        if (password_verify($password, $hash)) {
        $checkquery2 = $con->prepare("SELECT * FROM `users` WHERE `password`= :hash");
        $checkquery2->execute(['hash' => $hash]);
        $check2 = $checkquery2->fetch();  
		$password = $hash;
        }

          if(!$check){
            echo("[]");
          }elseif(!$check2){
            echo("[]");
            
          }else{
              $roblosec = $check['ROBLOSECURITY'];
              $uID = $check['id'];
              $banvalue = $check['banned'];
              if($banvalue > 0)
              {$isbanned = true;
                }else{$isbanned = false;}
               setcookie("username", $username, time() + (460800* 30), "/", '.voidrev.us');
                    setcookie("password", $password, time() + (460800* 30), "/", '.voidrev.us');
                                  setcookie(".ROBLOSECURITY", $roblosec, time() + (460800* 30), "/", '.voidrev.us');
                                  setcookie("access", "yes", time() + 24 * 60 * 60, "/", '.voidrev.us');
                                  setcookie(".RBXID", $roblosec, time() + (460800* 30), "/", '.voidrev.us');
setcookie(".RBXID", $roblosec, time() + 24 * 60 * 60, "/");
if (strpos($headers['User-Agent'], "Android") !== false || strpos($headers['User-Agent'], "iPhone") !== false) {
?>
{"membershipType":4,"username":"<?echo NoXSSPlz($username);?>","isUnder13":true,"countryCode":"US","userId":<?=$uID;?>,"displayName":"<?echo NoXSSPlz($username);?>"}
<?
exit();
}
?>
{"user":{"id":<?=$uID;?>,"name":"<?echo NoXSSPlz($username);?>","displayName":"<?echo NoXSSPlz($username);?>"},"isBanned":false}
<?php }}exit();}else{}

$data = json_decode(file_get_contents('php://input'), true);  
if($data["username"] && $data["password"]){
        $username = (urldecode(NoXSSPlz(filter_var($data['username'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES))));
        $con->quote($username);
        $password = (urldecode(NoXSSPlz(filter_var($data['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES))));
        $con->quote($password);
  
    if($username && $password){
        $checkquery = $con->prepare("SELECT * FROM `users` WHERE `username`= :username");
        $checkquery->execute(['username' => $username]);
        $check = $checkquery->fetch();
        $hash = $check['password'];
        if (password_verify($password, $hash)) {
        $checkquery2 = $con->prepare("SELECT * FROM `users` WHERE `password`= :hash");
        $checkquery2->execute(['hash' => $hash]);
        $check2 = $checkquery2->fetch();  
		$password = $hash;
        }
          if(!$check){
            echo("[]");
          }elseif(!$check2){
            echo("[]");
            
          }else{
              $roblosec = $check['ROBLOSECURITY'];
              $uID = $check['id'];
              $banvalue = $check['banned'];
              if($banvalue > 0)
              {$isbanned = true;
                }else{$isbanned = false;}
               setcookie("username", $username, time() + (460800* 30), "/", '.voidrev.us');
                    setcookie("password", $password, time() + (460800* 30), "/", '.voidrev.us');
                                  setcookie(".ROBLOSECURITY", $roblosec, time() + (460800* 30), "/", '.voidrev.us');
                                  setcookie("access", "yes", time() + 24 * 60 * 60, "/", '.voidrev.us');
                                  setcookie(".RBXID", $roblosec, time() + (460800* 30), "/", '.voidrev.us');
if (strpos($headers['User-Agent'], "Android") !== false || strpos($headers['User-Agent'], "iPhone") !== false) {
?>
{"membershipType":4,"username":"<?echo NoXSSPlz($username);?>","isUnder13":true,"countryCode":"US","userId":<?=$uID;?>,"displayName":"<?echo NoXSSPlz($username);?>"}
<?
exit();
}
?>
{"user":{"id":<?=$uID;?>,"name":"<?echo NoXSSPlz($username);?>","displayName":"<?echo NoXSSPlz($username);?>"},"isBanned":false}
<? }}exit();}else{} ?>