<?php
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$usr = getUserData($con);
$uID = $usr['id'];
$assetId = (int)$_REQUEST['assetId'];
$fileTmpName = $_FILES['the_file']['tmp_name'];
$errors = []; // Store errors here
$fileExtensionsAllowed = ['rbxm','rbxmx','png','mp3','wav']; // These will be the only file extensions allowed
$fileName = $_FILES['the_file']['name'];
$fileSize = $_FILES['the_file']['size'];
$fileExtension = strtolower(end(explode('.', $fileName)));
if (!in_array($fileExtension, $fileExtensionsAllowed)) {
$errors[] = "This file extension '".$fileExtension."' is not allowed.";
}
if ($fileSize > 31457280) {
$errors[] = "File exceeds maximum size (30MB)";
}
if (empty($errors)) {
try {
$libraryquery = $con->prepare("SELECT * FROM `library` WHERE `id` = :id AND `creatorid` = :creatorid");
$libraryquery->execute(['id' => $assetId, 'creatorid' => $uID]);
$library = $libraryquery->fetch();
if(is_array($library)){
if ($library['type2'] == "Hat" || $library['type2'] == "Package" || $library['type2'] == "Model" || $library['type2'] == "Badge" || $library['type2'] == "Mesh" || $library['type2'] == "Animation" || $library['type2'] == "Emote") {
    $uploadDirectory = $_SERVER['DOCUMENT_ROOT'].'/asset/assets/';
    $newFileName = $library['fileid'];
} else {
    $uploadDirectory = $_SERVER['DOCUMENT_ROOT'].'/asset/assets/';
    $newFileName = $library['realfileid'];
}

if (move_uploaded_file($fileTmpName, $uploadDirectory . $newFileName)) {
    // File uploaded successfully
} else {
    http_response_code(500);
    echo "Failed to move the uploaded file.";
    echo "<script>history.back()</script>";
}
}else{
echo "looks like jumbo forgot to add an item pls let me know ok thank";
}
echo "The file " . basename($fileName) . " has been uploaded";
echo "<script>history.back()</script>";
exit();
} catch (Throwable $e) {
echo "An error has occurred: " . $e;
}
} else {
foreach ($errors as $error) {
echo $error . "\n";
}
}
?>
