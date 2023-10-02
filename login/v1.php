<?php
include ($_SERVER['DOCUMENT_ROOT'] . '/config/includes.php');
$headers = getallheaders();
if ($user_agent == 'RobloxStudio/WinInet') {
$options = [
'cost' => 10,
];
$analyticsdata = password_hash("BJ@ynVL+ZP2xT-h8rXTPv@9yCbfS8Z%rb_TkCE^T=SUycJVjh6gaf8=92W7nvFtU", PASSWORD_BCRYPT, $options);
setcookie("browserTrackerIds", $analyticsdata, time() + (460800 * 30), "/", '.voidrev.us');
}
header('Content-Type: application/json; charset=UTF-8; X-Robots-Tag: noindex');
function processLoginForm($username, $password, $con, $headers)
{
$username = urldecode($username);
$password = urldecode($password);
if ($username && $password) {
$checkquery = $con->prepare("SELECT * FROM `users` WHERE `username`= :username");
$checkquery->execute(['username' => $username]);
$check = $checkquery->fetch();
$hash = $check['password'];
if (password_verify($password, $hash)) {
$checkquery2 = $con->prepare("SELECT * FROM `users` WHERE `password`= :hash");
$checkquery2->execute(['hash' => $hash]);
$check2 = $checkquery2->fetch();
$password = $hash;
}
if (!$check) {
$errorMsg = [
"message" => "Incorrect username."
];
http_response_code(403);
echo json_encode($errorMsg);
exit();
} elseif (!$check2) {
$errorMsg = [
"message" => "Incorrect password. Please try again."
];
http_response_code(403);
echo json_encode($errorMsg);
exit();
} else {
$roblosec = $check['ROBLOSECURITY'];
$uID = $check['id'];
$banvalue = $check['banned'];
$isBanned = ($banvalue != 0) ? true : false;
setcookie("username", $username, time() + (460800 * 30), "/", '.voidrev.us');
setcookie("password", $password, time() + (460800 * 30), "/", '.voidrev.us');
setcookie(".ROBLOSECURITY", $roblosec, time() + (460800 * 30), "/", '.voidrev.us');
setcookie("access", "yes", time() + 24 * 60 * 60, "/", '.voidrev.us');
setcookie("RBXEventTrackerV2", "CreateDate=" . date('n/j/Y g:i:s A') . "&rbxid=" . $uID . "&browserid=" . $uID . "", time() + 24 * 60 * 60, "/", '.voidrev.us');
if (strpos($headers['User-Agent'], "Android") !== false || strpos($headers['User-Agent'], "iPhone") !== false) {
$response = [
"membershipType" => 4,
"username" => $username,
"isUnder13" => false,
"countryCode" => getLocale(true),
"userId" => $uID,
"displayName" => $username
];
if (isset($_REQUEST['form'])) {
die(header("Location: /home?nl=true"));
}
exit(json_encode($response));
}
$userResponse = [
"user" => [
"id" => $uID,
"name" => NoXSSPlz($username),
"displayName" => NoXSSPlz($username)
],
"isBanned" => $isBanned
];
if (isset($_REQUEST['form'])) {
die(header("Location: /home?nl=true"));
}
echo json_encode($userResponse);
}
}
exit();
}
$data = json_decode(file_get_contents('php://input'), true);
if (isset($data["cvalue"]) && isset($data["password"])) {
processLoginForm($data["cvalue"], $data["password"], $con, $headers);
}
if (isset($data["username"]) && isset($data["password"])) {
processLoginForm($data["username"], $data["password"], $con, $headers);
}
if (isset($_POST["username"]) && isset($_POST["password"])) {
processLoginForm($_POST["username"], $_POST["password"], $con, $headers);
}
if (isset($_REQUEST['form'])) {
die(header("Location: /home?nl=true"));
}
exit();
?>
