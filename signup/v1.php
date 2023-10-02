<?php
header("Content-Type: application/json");
$frombrowserform = isset($_REQUEST['submit']) ? (bool)$_REQUEST['submit'] : false;
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$ip = $_SERVER['REMOTE_ADDR'];
$captcha = $_REQUEST['cf-turnstile-response'];
$secretKey = '0x4AAAAAAAKoHcOjITs-kgvYjkRu8yay9c8';
   $url_path = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';
   $data = array('secret' => $secretKey, 'response' => $captcha, 'remoteip' => $ip);
	
	$options = array(
		'http' => array(
		'method' => 'POST',
		'content' => http_build_query($data))
	);
	
	$stream = stream_context_create($options);
	
	$result = file_get_contents(
			$url_path, false, $stream);
	
	$response =  json_decode($result);
if ($response->success == true) {
// ok good
}else{
header('HTTP/1.0 403 Forbidden');
if($frombrowserform) {
die(header("Location: /"));
}
exit();
}
$data = json_decode(file_get_contents('php://input'), true);
if($_POST["username"] && $_POST["password"]){
$username = urldecode($_POST['username']);
$username = preg_replace('/[^a-zA-Z0-9-_\.]/','', $username);
$con->quote($username);
$password = urldecode($_POST['password']);
$con->quote($password);
if($username == "LocalPlayer"){
exit();
}
if(strlen($username) < 3){
exit();
}
if(strlen($username) > 19){
exit();
}
$usernamecheck = json_decode(file_get_contents("http://www.voidrev.us/usercheck/checkifinvalidusernameforsignup?username=".$username.""),true);
$usernamecheck = $usernamecheck['data'];
if($usernamecheck != 0){
echo"[]";
exit();
}
$options = [
'cost' => 11,
];
$password = password_hash($password, PASSWORD_BCRYPT, $options);
$bytes = password_hash($password, PASSWORD_BCRYPT, $options);
$date = time();
$gender = "Unknown";
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `username` = :username");
$usrquery->execute(['username' => $username]);
$usr = $usrquery->fetch();
$bytes2 = bin2hex(random_bytes(32));
$randguest = password_hash($bytes2, PASSWORD_BCRYPT, $options);
if(!is_array($usr)){
$sql = "INSERT INTO `users` (`username`, `password`, `ROBLOSECURITY`, `trn_date`, `email`, `verification`, `randomGuestId`, `time`, `gametime`, `InJobId`, `about`, `banreason`)
VALUES (:username, :password, :roblosecurity, :trn_date, :email, :verification, :randomGuestId, :time, :gametime, :inJobId, :about, :banreason)";
$stmt = $con->prepare($sql);
$stmt->execute([
'username' => $username,
'password' => $password,
'roblosecurity' => $bytes,
'trn_date' => $date,
'email' => 'N/A',
'verification' => 0,
'randomGuestId' => $randguest,
'time' => time(),
'gametime' => time(),
'inJobId' => '',
'about' => '',
'banreason' => ''
]);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `username` = :username");
$usrquery->execute(['username' => $username]);
$usr = $usrquery->fetch();
$uID = $usr['id'];
$roblosec = $usr['ROBLOSECURITY'];
setcookie("username", $username, time() + (460800* 30), "/", '.voidrev.us');
setcookie("password", $password, time() + (460800* 30), "/", '.voidrev.us');
setcookie(".ROBLOSECURITY", $roblosec, time() + (460800* 30), "/", '.voidrev.us');
setcookie("access", "yes", time() + 24 * 60 * 60, "/", '.voidrev.us');
setcookie(".RBXID", $roblosec, time() + (460800* 30), "/", '.voidrev.us');
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `username` = :username");
$usrquery->execute(['username' => $username]);
$usr = $usrquery->fetch();
$uID = $usr['id'];
}else{
header('HTTP/1.0 403 Forbidden');
http_response_code(403);
if($frombrowserform) {
die(header("Location: /"));
}
die('Forbidden, user already exists.');
}
if($frombrowserform) {
die(header("Location: /home?nl=true"));
}
echo json_encode([
"userId" => $uID ?? 0,
"starterPlaceId" => 0
]);
}else{
header('HTTP/1.0 403 Forbidden');
http_response_code(403);
if($frombrowserform) {
die(header("Location: /"));
}
die('Forbidden');
}
