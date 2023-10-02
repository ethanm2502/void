<?php
require ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$headers = getallheaders();
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
if (isset($headers['Content-Encoding']) && strtolower($headers['Content-Encoding']) === 'gzip') {
$json = gzdecode(file_get_contents('php://input'));
}else{
$json = file_get_contents('php://input');
}
$decoded = json_decode($json);
if ($decoded !== null) {
$response = array('data' => array());
for ($i = 0; $i < count($decoded); $i++) {
$obj = $decoded[$i];
if($obj->type == "Avatar"){
$imageurl = "https://www.voidrev.us".getUserThumbnail($con,$obj->targetId);
}elseif($obj->type == "AvatarHeadShot"){
$imageurl = "https://www.voidrev.us".getUserHeadshotThumbnail($con,$obj->targetId);
}elseif($obj->type == "Asset"){
$userAgent = $_SERVER['HTTP_USER_AGENT'];
$isRoblox = stripos($userAgent, 'Roblox') !== false;
$imageUrl = "https://www.voidrev.us" . getModelThumbnail($con, $obj->targetId, $isRoblox);
}elseif($obj->type == "PlaceIcon"){
$imageurl = "https://www.voidrev.us".getPlaceIcon($con,$obj->targetId);
}elseif($obj->type == "GameIcon"){
$imageurl = "https://www.voidrev.us".getPlaceIcon($con,$obj->targetId);
}else{
die(json_encode(['message' => "Sorry, that type doesn't exist."]));
}
$responseData = array(
'requestId' => $obj->requestId,
'errorCode' => 0,
'errorMessage' => '',
'targetId' => $obj->targetId,
'state' => 'Completed',
'imageUrl' => $imageurl
);
$response['data'][] = $responseData;
}
echo json_encode($response);
} else {
echo 'Error: Unable to decode JSON object.';
}
}else{
die(http_response_code(405));
}