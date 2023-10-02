<?php
require ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
$apikey = "9dCxc5Lr5A5G1a6Zhn2xQvqYrMf2m5KuY354DT0bYetknjAMRFpkAoydAuV4rqMYD";
$checkget = urldecode($_GET['apikey']);
if($checkget == $apikey){
$placeId = (int)$_GET['PlaceId'];
$PlayerCount = (int)$_GET['PlayerCount'];
$fps = (int)$_GET['FPS'];
$JobId = filter_var($_GET['JobId'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$players = urldecode(filter_var($_GET['players'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES));
$jobsquery = $con->prepare("SELECT * FROM `jobs` WHERE `placeId` = :placeId AND `id` = :id");
$jobsquery->execute(['placeId' => $placeId, 'id' => $JobId]);
$jobs = $jobsquery->fetch();
$serviceport = $jobs['serviceport'];
$timediff = time() - $jobs['lastpingtime'];
$now = time();
$sql = "UPDATE `jobs` SET `playercount` = :playercount WHERE `placeId` = :placeid AND `id` = :jobid";
$stmt = $con->prepare($sql);
$sql2 = "UPDATE `jobs` SET `players` = :players WHERE `placeId` = :placeid AND `id` = :jobid";
$stmt2 = $con->prepare($sql2);
$sql3 = "UPDATE `jobs` SET `FPS` = :fps WHERE `placeId` = :placeid AND `id` = :jobid";
$stmt3 = $con->prepare($sql3);
$sql4 = "UPDATE `jobs` SET `lastpingtime` = :now WHERE `placeId` = :placeid AND `id` = :jobid";
$stmt4 = $con->prepare($sql4);
$stmt->execute(array(':playercount' => $PlayerCount, ':placeid' => $placeId, ':jobid' => $JobId));
$stmt2->execute(array(':players' => $players, ':placeid' => $placeId, ':jobid' => $JobId));
$stmt3->execute(array(':fps' => $fps, ':placeid' => $placeId, ':jobid' => $JobId));
$stmt4->execute(array(':now' => $now, ':placeid' => $placeId, ':jobid' => $JobId));
$jobsquery = $con->prepare("SELECT * FROM `jobs` WHERE `placeId` = :placeId AND `id` = :id");
$jobsquery->execute(['placeId' => $placeId, 'id' => $JobId]);
$jobs = $jobsquery->fetch();
$timediff = time() - $jobs['lastpingtime'];
echo json_encode(['success' => true, "time" => time()]);
// Seems to cause issues.
/*
if($timediff > 60){
if($_GET['Type'] == 2018){
echo placeStop($JobId,$serviceport);
}else{
echo placeStop($JobId,$serviceport);
}
}
*/
}else{
header('HTTP/1.0 401 Unauthorized', true, 401);
http_response_code(401);
exit();
}
?>