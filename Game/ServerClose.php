<?php
require_once ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
require_once ($_SERVER['DOCUMENT_ROOT'].'/SOAP.php');
$apikey = "9dCxc5Lr5A5G1a6Zhn2xQvqYrMf2m5KuY354DT0bYetknjAMRFpkAoydAuV4rqMYD";
$checkget = urldecode($_GET['apikey']);
if($checkget == $apikey){
$JobId = filter_var($_GET['JobId'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$jobsquery = $con->prepare("SELECT * FROM `jobs` WHERE `id` = :id");
$jobsquery->execute(['id' => $JobId]);
$jobs = $jobsquery->fetch();
$port = $jobs['serviceport'];
$sql = "DELETE FROM `jobs` WHERE `id` = :jobId";
$stmt = $con->prepare($sql);
$stmt->bindParam(':jobId', $JobId);
$stmt->execute();
// its jobstop idk why i named it as placestop
try{
echo placeStop($JobId,$port);
} catch (Throwable $e) {
echo json_encode(['success' => false, "message" => $e, "time" => $time()]);
echo placeStop($JobId,$port);
}
echo json_encode(['success' => true, "time" => time()]);
}else{
header('HTTP/1.0 401 Unauthorized', true, 401);
http_response_code(401);
exit();
}
?>