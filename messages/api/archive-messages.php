<?php
include($_SERVER['DOCUMENT_ROOT'] . "/config/includes.php");
header("Content-Type: application/json");

$usr = getUserData($con);
$uID = $usr['id'];


$jsonData = file_get_contents("php://input");
if ($jsonData) {
    $requestData = json_decode($jsonData, true);


    if (isset($requestData['messageIds']) && is_array($requestData['messageIds'])) {

        $messageIds = $requestData['messageIds'];

        foreach ($messageIds as $messageId) {

            $updateStmt = $con->prepare("UPDATE messages SET archived = 1 WHERE messageid = :messageId AND toid = :uID");
            $updateStmt->bindValue(':messageId', $messageId, PDO::PARAM_INT);
            $updateStmt->bindValue(':uID', $uID, PDO::PARAM_INT);
            $updateStmt->execute();
        }
        
        $data = [
            "success" => true,
            "failedMessages" => [],
        ];
        echo json_encode($data, JSON_PRETTY_PRINT);
        exit();
    }
}

$data = [
    "success" => false,
    "error" => "Invalid JSON data or messageIds missing.",
];
echo json_encode($data, JSON_PRETTY_PRINT);
?>
