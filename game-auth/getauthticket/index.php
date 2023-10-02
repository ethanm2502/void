<?php
require($_SERVER['DOCUMENT_ROOT'] . '/game/getauthticket/index.php');

// Assuming you have a database connection established earlier in your code
// Replace 'your_db_connection' with your actual database connection code
// This code should fetch banned values from your database table
// Assume 'banned_values' is a column in your database table
$dbQuery = $con->prepare("SELECT banned FROM users WHERE id = :id");
$dbQuery->bindParam(':user_id', $uID);
$dbQuery->execute();
$result = $dbQuery->fetch(PDO::FETCH_ASSOC);

if ($result) {
    $bannedValues = explode(',', $result['banned']); // Split banned values into an array
    $bannedValues = array_map('trim', $bannedValues); // Remove leading/trailing spaces

    // Check if any of the banned values (1, 2, 3, 4) exist in the array
    if (array_intersect($bannedValues, ['1', '2', '3', '4'])) {
        // The user has banned values in their DB, so return a 403 Forbidden status
        http_response_code(403);
        exit("403 Forbidden - Access Denied");
    }
}

// Continue with the rest of your code if the user is not banned
require($_SERVER['DOCUMENT_ROOT'] . '/game/getauthticket/index.php');
?>
