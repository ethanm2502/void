<?php
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$usr = getUserData($con);
if ($usr['activated'] == 0) {
if (basename($_SERVER['PHP_SELF']) != "invitekey.php" && $urlArray[0] != "newlogin" && $urlArray[0] != "forgotPasswordOrUsername") {
header("Location: https://www.voidrev.us/login/invitekey");
exit();
}
}
if(!is_array($usr)){
die();
}
$uID = $usr['id'];
$gameid = (int)$_POST['gameId'];
$fileTmpName = $_FILES['the_file']['tmp_name'];
$errors = []; // Store errors here
$fileExtensionsAllowed = ['rbxl']; // These will be the only file extensions allowed
$fileName = $_FILES['the_file']['name'];
$fileSize = $_FILES['the_file']['size'];
$fileExtension = strtolower(end(explode('.', $fileName)));
if (!in_array($fileExtension, $fileExtensionsAllowed)) {
$errors[] = "This file extension is not allowed. Please upload a RBXL.";
}
if ($fileSize > 31457280) {
$errors[] = "File exceeds maximum size (30MB)";
}
if (empty($errors)) {
try {
$file = base64_encode(file_get_contents($fileTmpName));
// Update the games table with the file information
$gamequery = $con->prepare("SELECT generatedthumbnailhash FROM `games` WHERE `id` = :id AND `creatorid` = :cid");
$gamequery->execute(['id' => $gameid, 'cid' => $uID]);
$game = $gamequery->fetch();
if(!is_array($game)){
die("No game, or you don't own this game.");
}
$hash = $game['generatedthumbnailhash'];
$sql = $con->prepare("UPDATE `games` SET `file`=:gameFile WHERE `id`=:gameid");
$sql->execute(['gameFile' => $file, 'gameid' => $gameid]);
$sql = $con->prepare("UPDATE `games` SET `generatedthumbnailhash`=NULL WHERE `id`=:gameid");
$sql->execute(['gameid' => $gameid]);
unlink($_SERVER['DOCUMENT_ROOT']."/thumbnails/".$hash.".png");
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
