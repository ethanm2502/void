<?php
header("Content-Type: application/json; charset=utf-8");
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
if($_COOKIE['password'] || $_COOKIE['_ROBLOSECURITY']){
$password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['password' => $password, 'ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
if($usr != 0){
$logged = true;
}
}
$userId = $usr['id'];
$url = $_SERVER['REQUEST_URI'];
if (strpos($url, "roles") !== false) {
$testurl = str_replace("/v2/users/","",$url);
$testurl = str_replace("/groups/roles","",$testurl);
$assetId = (int)$testurl;
$checkquery = $con->prepare("SELECT * FROM `users` WHERE id = :id");
$checkquery->execute(['id' => $assetId]);
$check = $checkquery->fetch();
if($check['Admin'] == 1){
$data = [
[
"group" => [
"id" => 1200769,
"name" => "Official Group of Roblox",
"memberCount" => 2273,
"hasVerifiedBadge" => true
],
"role" => [
"id" => 41221804,
"name" => "Team Member",
"rank" => 20
]
]
];
}else{
$data = [];
}
echo json_encode(["data" => $data], JSON_PRETTY_PRINT);
}elseif(strpos($url, "inventory") !== false){
try {
$testurl = str_replace("/v2/users/","",$url);
$testurl = str_replace("/inventory", "", strstr($testurl, "/inventory"));
$userSelectedId = (int)$testurl;
$limit = isset($_REQUEST['limit']) ? (int)$_REQUEST['limit'] : 25;
$assetTypes = isset($_REQUEST['assetTypes']) ? $_REQUEST['assetTypes'] : 'All';
if($assetTypes == "All"){
$stmt = $con->prepare("SELECT * FROM owneditems WHERE userid = :uID LIMIT :limit");
$stmt->bindParam(':uID', $userSelectedId, PDO::PARAM_INT);
$stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
}else{
$stmt = $con->prepare("SELECT * FROM owneditems WHERE userid = :uID AND type2 = :item LIMIT :limit");
$stmt->bindParam(':uID', $userSelectedId, PDO::PARAM_INT);
$stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
$stmt->bindParam(':item', $assetTypes, PDO::PARAM_STR);
}
$stmt->execute();
$result = array();
while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
$libraryStmt = $con->prepare("SELECT * FROM library WHERE id = :id");
$libraryStmt->bindParam(':id', $row['id'], PDO::PARAM_INT);
$libraryStmt->execute();
$libraryRow = $libraryStmt->fetch(PDO::FETCH_ASSOC);
$item = array(
"assetId" => $row['itemid'],
"name" => $libraryRow['name'],
"assetType" => $libraryRow['type2'],
"created" => date('Y-m-d\TH:i:s.u\Z', $libraryRow['created'])
);
$result[] = $item;
}
$jsonResult = array(
"previousPageCursor" => null,
"nextPageCursor" => null,
"data" => $result
);
echo json_encode($jsonResult, JSON_PRETTY_PRINT);
} catch (PDOException $e) {
http_response_code(500);
echo "Error: " . $e->getMessage();
}
}
?>