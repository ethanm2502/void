<?php
include($_SERVER['DOCUMENT_ROOT'] . "/config/includes.php");
header("Content-Type: application/json");

$requestData = json_decode(file_get_contents('php://input'), true);

function sendMessage($con, $fromId, $toId, $subject, $body) {

    $stmt = $con->prepare("INSERT INTO messages (fromid, toid, subtitle, content, created, updated) VALUES (:fromId, :toId, :subject, :body, UNIX_TIMESTAMP(), UNIX_TIMESTAMP())");
    $stmt->bindParam(':fromId', $fromId, PDO::PARAM_INT);
    $stmt->bindParam(':toId', $toId, PDO::PARAM_INT);
    $stmt->bindParam(':subject', $subject, PDO::PARAM_STR);
    $stmt->bindParam(':body', $body, PDO::PARAM_STR);
    $stmt->execute();
}

$usr = getUserData($con);
$fromId = $usr['id'];
$toId = $requestData['recipientId'];
$subject = $requestData['subject'];
$body = $requestData['body'];


sendMessage($con, $fromId, $toId, $subject, $body);

$response = [
    "success" => true,
    "shortMessage" => "Success",
    "message" => "Successfully sent message."
];
echo json_encode($response, JSON_PRETTY_PRINT);
?>
