<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
if($_COOKIE['_ROBLOSECURITY'] || $_COOKIE['password']){
$password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['password' => $password, 'ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
$uID = $usr['id'];
}
if($usr['activated'] == 0){
if(basename($_SERVER['PHP_SELF']) != "invitekey.php" && $urlArray[0] != "newlogin" && $urlArray[0] != "forgotPasswordOrUsername"){
header("Location: https://www.voidrev.us/login/invitekey");
exit();
}
}
$gameid = (int)$_POST['gameId'];
$type = (int)$_POST['thumbnumber'];
$gamequery = $con->prepare("SELECT id,creatorid FROM `games` WHERE `creatorid` = :creatorid AND `id` = :gameid");
$gamequery->execute(['creatorid' => $uID, 'gameid' => $gameid]);
$game = $gamequery->fetch();
if(is_array($game)){
$fileTmpName = $_FILES['the_file']['tmp_name'];
$errors = []; // Store errors here
$fileExtensionsAllowed = ['png']; // These will be the only file extensions allowed
$fileName = $_FILES['the_file']['name'];
$fileSize = $_FILES['the_file']['size'];
$fileTmpName = $_FILES['the_file']['tmp_name'];
$fileType = $_FILES['the_file']['type'];
$fileExtension = strtolower(end(explode('.',$fileName)));
if (! in_array($fileExtension,$fileExtensionsAllowed)) {
$errors[] = "This file extension is not allowed. Please upload a PNG.";
}
if ($fileSize > 5000000) {
$errors[] = "File exceeds maximum size (5MB)";
}
try{
if($type == 1){
$image = (file_get_contents($fileTmpName));
$sql = $con->prepare("UPDATE `games` SET `thumb1approved`='0' WHERE `id`= :gameid");
$sql->execute(['gameid' => $gameid]);
$sql = $con->prepare("UPDATE `games` SET `thumbnail1`='1' WHERE `id`= :gameid");
$sql->execute(['gameid' => $gameid]);
try{
file_put_contents($_SERVER['DOCUMENT_ROOT']."/img/games/thumb1for".$gameid.".png",$image);
}catch(Throwable $e){
echo $e;
}
echo "The file " . basename($fileName) . " has been uploaded";
echo"<script>history.back()</script>";
exit();
}
if($type == 2){
$image = (file_get_contents($fileTmpName));
$sql = $con->prepare("UPDATE `games` SET `thumb2approved`='0' WHERE `id`= :gameid");
$sql->execute(['gameid' => $gameid]);
$sql = $con->prepare("UPDATE `games` SET `thumbnail2`='1' WHERE `id`= :gameid");
$sql->execute(['gameid' => $gameid]);
try{
file_put_contents($_SERVER['DOCUMENT_ROOT']."/img/games/thumb2for".$gameid.".png",$image);
}catch(Throwable $e){
echo $e;
}
echo "The file " . basename($fileName) . " has been uploaded";
echo"<script>history.back()</script>";
exit();
}
if($type == 3){
$image = (file_get_contents($fileTmpName));
$sql = $con->prepare("UPDATE `games` SET `thumb3approved`='0' WHERE `id`= :gameid");
$sql->execute(['gameid' => $gameid]);
$sql = $con->prepare("UPDATE `games` SET `thumbnail3`='1' WHERE `id`= :gameid");
$sql->execute(['gameid' => $gameid]);
try{
file_put_contents($_SERVER['DOCUMENT_ROOT']."/img/games/thumb3for".$gameid.".png",$image);
}catch(Throwable $e){
echo $e;
}
echo "The file " . basename($fileName) . " has been uploaded";
echo"<script>history.back()</script>";
exit();
}
}catch(Error $e){
echo "An error has occurred: ".$e."";
}
$currentDirectory = getcwd();
$uploadDirectory = "/img/games/";
$errors = []; // Store errors here
$fileExtensionsAllowed = ['png']; // These will be the only file extensions allowed
$fileName = $_FILES['the_file']['name'];
$fileSize = $_FILES['the_file']['size'];
$fileTmpName = $_FILES['the_file']['tmp_name'];
$fileType = $_FILES['the_file']['type'];
$fileExtension = strtolower(end(explode('.',$fileName)));
$uploadPath = $currentDirectory . $uploadDirectory . basename($gameid).'s.png';
if (isset($_POST['submit'])) {
if (! in_array($fileExtension,$fileExtensionsAllowed)) {
$errors[] = "This file extension is not allowed. Please upload a PNG.";
}
if ($fileSize > 5000000) {
$errors[] = "File exceeds maximum size (5MB)";
}
if (empty($errors)) {
$didUpload = move_uploaded_file($fileTmpName, $uploadPath);
if ($didUpload) {
echo "The file " . basename($fileName) . " has been uploaded";
$sql = "UPDATE `games` SET `icon`='-1' WHERE `id`='$gameid'";
$con->exec($sql);
$sql = "UPDATE `games` SET `approved`='0' WHERE `id`='$gameid'";
$con->exec($sql);
echo"<script>history.back()</script>";
} else {
echo "An error occurred. Please contact ripguests.";
}
} else {
foreach ($errors as $error) {
echo $error . "These are the errors" . "\n";
}
}
}
}
?>