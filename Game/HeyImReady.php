<?php
require ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
$apikey = "9dCxc5Lr5A5G1a6Zhn2xQvqYrMf2m5KuY354DT0bYetknjAMRFpkAoydAuV4rqMYD";
$checkget = $_GET['apikey'];
if($checkget == $apikey){
$JobId = $_GET['JobId'];
$jobsquery = $con->prepare("SELECT * FROM `jobs` WHERE `id` = :id");
$jobsquery->execute(['id' => $JobId]);
$jobs = $jobsquery->fetch();
$sql = "UPDATE `jobs` SET `active` = '1' WHERE `id` = :jobId";
$stmt = $con->prepare($sql);
$stmt->execute(['jobId' => $JobId]);
echo json_encode(['success' => true, "time" => time()]);
}else{
header('HTTP/1.0 401 Unauthorized', true, 401);
http_response_code(401);
exit();
}
?>