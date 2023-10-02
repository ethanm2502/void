<?php
header('Content-Type: application/json; charset=utf-8');
include ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');

$url = $_SERVER['REQUEST_URI'];
$testurl = preg_replace('#[^0-9-./]#', '', $url);
$testurl = substr($testurl, 4);
  
preg_match_all('#/([^/]*)#', $testurl, $matches);

$testurl = rtrim($testurl, "/");

$usrquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
$usrquery->execute(['id' => $userId]);
$usr = $usrquery->fetch();
$uID = $usr['id'];
$username = $usr['username'];
$IsUnder13 = (int)$usr['IsUnder13'];
if ($IsUnder13 == 0) {
    $data = array('ChatFilter' => 'blacklist');
    echo json_encode($data);  
}else{
    $data = array('ChatFilter' => 'whitelist');
    echo json_encode($data);  
}
?>