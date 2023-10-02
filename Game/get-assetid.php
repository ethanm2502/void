<?php
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$getid = (int)$_GET['id'];
$userquery = $con->prepare("SELECT * FROM `library` WHERE `id` = :id");
$userquery->execute(['id' => $getid]);
$user = $userquery->fetch();
header("Content-Type: application/json");
echo json_encode(['fileid (rbxm)' => $user['fileid'], 'realfileid (the file you uploaded)' => $user['realfileid']]);
exit();
?>