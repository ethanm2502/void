<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
try{
if (isset($_COOKIE['password']) || isset($_COOKIE['_ROBLOSECURITY'])) {
$password = filter_input(INPUT_COOKIE, 'password', FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_input(INPUT_COOKIE, '_ROBLOSECURITY', FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$stmt = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :roblosec");
$stmt->bindParam(':password', $password);
$stmt->bindParam(':roblosec', $roblosec);
$stmt->execute();
$usr = $stmt->fetch(PDO::FETCH_ASSOC);
if (is_array($usr)) {
$logged = true;
$uID = $usr['id'];
}else{
throw new Exception("Not authenticated");
die();
}
}
if($usr['banned'] != 0){
echo json_encode(array('success' => false));
die(http_response_code(403));
}

$assetId = (int)$_GET['assetid'];
$type = filter_input(INPUT_GET, 'type', FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
if(isset($assetId)){
if($type == "Place"){
$gamequery = $con->prepare("SELECT id FROM `games` WHERE `id` = :id AND `creatorid` = :cid");
$gamequery->execute(['id' => $assetId, 'cid' => $uID]);
$game = $gamequery->fetch();
$post = base64_encode(gzdecode(file_get_contents('php://input')));
if(!is_array($game)){
throw new Exception("Missing Game Error");
}
$fileupdate = "UPDATE `games` SET `file` = :post WHERE `id` = :assetId";
$stmt = $con->prepare($fileupdate);
$stmt->execute(array(':post' => $post, ':assetId' => $assetId));
$date = time();
$updatedate = "UPDATE `games` SET `updated` = '$date' WHERE `id`='$assetId'";
$con->exec($updatedate);
$response = array("success"=>true);
echo json_encode($response);
exit();
}elseif($type == "Model"){
$libquery = $con->prepare("SELECT * FROM `library` WHERE `id` = :id AND `creatorid` = :cid");
$libquery->execute(['id' => $assetId, 'cid' => $uID]);
$lib = $libquery->fetch();
if(!is_array($lib)){
throw new Exception("Missing Lib Error");
}
$assetId = $lib['id'];
$fileid = $lib['fileid'];
$post = gzdecode(file_get_contents('php://input'));
$location = $_SERVER["DOCUMENT_ROOT"] . "/asset/assets/".$fileid;
file_put_contents($location,$post);
$date = time();
$updatedate = "UPDATE `library` SET `updated` = '$date' WHERE `id`='$assetId'";
$con->exec($updatedate);
$response = array("success"=>true);
echo json_encode($response);
exit();
}else{
$gamequery = $con->prepare("SELECT id FROM `games` WHERE `id` = :id AND `creatorid` = :cid");
$gamequery->execute(['id' => $assetId, 'cid' => $uID]);
$game = $gamequery->fetch();
$libquery = $con->prepare("SELECT * FROM `library` WHERE `id` = :id AND `creatorid` = :cid");
$libquery->execute(['id' => $assetId, 'cid' => $uID]);
$lib = $libquery->fetch();
if(is_array($game)){
$post = base64_encode(gzdecode(file_get_contents('php://input')));
$fileupdate = "UPDATE `games` SET `file` = :post WHERE `id` = :assetId";
$stmt = $con->prepare($fileupdate);
$stmt->execute(array(':post' => $post, ':assetId' => $assetId));
$date = time();
$updatedate = "UPDATE `games` SET `updated` = '$date' WHERE `id`='$assetId'";
$con->exec($updatedate);
$response = array("success"=>true);
echo json_encode($response);
exit();
}elseif(is_array($lib)){
$assetId = $lib['id'];
$fileid = $lib['fileid'];
$post = gzdecode(file_get_contents('php://input'));
$location = $_SERVER["DOCUMENT_ROOT"] . "/asset/assets/".$fileid;
file_put_contents($location,$post);
$date = time();
$updatedate = "UPDATE `library` SET `updated` = '$date' WHERE `id`='$assetId'";
$con->exec($updatedate);
$response = array("success"=>true);
echo json_encode($response);
exit();
}else{
throw new Exception("Type Error");
}
}
}
}catch (Throwable $e) {
http_response_code(403);
$response = array("success"=>false, "message"=>$e->getMessage());
echo json_encode($response);
exit();
}
?>