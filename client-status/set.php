<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
header("Content-Type: application/json");
$usr = getUserData($con);
$uID = $usr['id'];
$status = filter_var($_REQUEST['status'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$statupdate = "UPDATE `users` SET `clientstatus` = :status WHERE `id`=:uID";
$stmt = $con->prepare($statupdate);
$stmt->execute(array(':status' => $status, ':uID' => $uID));

$statupdate = "UPDATE `users` SET `onlinetime` = :time WHERE `id`=:uID";
$stmt = $con->prepare($statupdate);
$stmt->execute(array(':time' => time(), ':uID' => $uID));

$statupdate = "UPDATE `users` SET `gametime` = :time WHERE `id`=:uID";
$stmt = $con->prepare($statupdate);
$stmt->execute(array(':time' => time(), ':uID' => $uID));

echo time();
?>