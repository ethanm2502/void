<?php
require($_SERVER['DOCUMENT_ROOT']."/config/includes.php");
$names = array(
'Image' => 1,
'TShirt' => 2,
'Audio' => 3,
'Mesh' => 4,
'Lua' => 5,
'Hat' => 8,
'Place' => 9,
'Model' => 10,
'Shirt' => 11,
'Pants' => 12,
'Decal' => 13,
'Head' => 17,
'Face' => 18,
'Gear' => 19,
'Badge' => 21,
'Animation' => 24,
'Torso' => 27,
'RightArm' => 28,
'LeftArm' => 29,
'LeftLeg' => 30,
'RightLeg' => 31,
'Package' => 32,
'Gamepass' => 34,
'Plugin' => 38,
'Video' => 62
);
try {
$usr = getUserData($con);
$userID = $usr['id'];
$stmt = $con->prepare("SELECT * FROM avataritems WHERE userID = :userID");
$stmt->bindParam(':userID', $userID, PDO::PARAM_INT);
$stmt->execute();
$data = [];
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
$stmt2 = $con->prepare("SELECT * FROM library WHERE fileid = :id");
$stmt2->bindParam(':id', $row['itemid'], PDO::PARAM_INT);
$stmt2->execute();
$item = $stmt2->fetch(PDO::FETCH_ASSOC);
foreach ($names as $name => $number) {
if ($name == $item['type2']) {
$assetTypeId = $number;
break;
}
}
$itemData = [
'id' => $item['id'],
'name' => $item['name'],
'type' => "Asset",
'assetType' => [
'id' => $assetTypeId,
'name' => $item['type2'],
],
'isEditable' => false,
];
$data[] = $itemData;
}
$response = [
'data' => $data,
'total' => count($data),
];
header('Content-Type: application/json');
echo json_encode($response);
} catch (PDOException $e) {
header('HTTP/1.1 500 Internal Server Error');
echo json_encode(['error' => 'Internal Server Error']);
}
?>