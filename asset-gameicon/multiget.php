<?php
require ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
header('Content-Type: application/json; charset=UTF-8');
header('X-Robots-Tag: noindex');
// Convert query string into an array of universe IDs
$queryString = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
$universeIds = array();
$parameters = explode('&', $queryString);
foreach ($parameters as $parameter) {
list($key, $value) = explode('=', $parameter);
if ($key === 'universeId') {
$universeIds[] = $value;
}
}
// Initialize an array for the JSON response
$jsonResponse = [];
// Loop through each universe ID
foreach ($universeIds as $universeId) {
// Build JSON object
$jsonObject = [
"targetId" => $universeId,
"state" => "Completed",
"imageUrl" => "https://www.voidrev.us".getPlaceIcon($con,$universeId)
];
// Add JSON object to the response array
$jsonResponse[] = $jsonObject;
}
// Output the JSON response
echo json_encode($jsonResponse, JSON_PRETTY_PRINT);
?>
