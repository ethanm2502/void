<?php
include($_SERVER['DOCUMENT_ROOT'] . "/config/includes.php");
header("Content-Type: application/json");
$usr = getUserData($con);
$uID = $usr['id'];
$stmt = $con->prepare("SELECT * FROM messages WHERE toid = :uID AND messageread=0");
$stmt->bindParam(':uID', $uID, PDO::PARAM_INT);
$stmt->execute();
$count = $stmt->rowCount();
$data = [
"count" => $count,
];
echo json_encode($data, JSON_PRETTY_PRINT);
?>
