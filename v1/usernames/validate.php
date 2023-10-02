<?php
include($_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php');
use Snipe\BanBuilder\CensorWords;
$censor = new CensorWords;
include($_SERVER['DOCUMENT_ROOT'] . '/config/includes.php');
header("Content-Type: application/json");
$username = $_REQUEST['username'] ?? '';
if (empty($username)) {
$data = array('code' => '2', 'message' => 'Username not provided');
echo json_encode($data);
} else {
$username = urldecode($username);
$censored = $censor->censorString($username)['clean'];
$checkquery = $con->prepare("SELECT * FROM `users` WHERE `username`= :username");
$checkquery->execute(['username' => $username]);
$check = $checkquery->fetch();
if (strpos($censored, '#') !== false) {
$data = array('code' => 2, 'message' => 'Username not appropriate for Limbo');
echo json_encode($data);
} else {
if (is_array($check)) {
http_response_code(403);
$data = array('code' => 1, 'message' => 'Username is already in use');
echo json_encode($data);
} else {
$data = array('code' => 0, 'message' => 'Username is valid');
echo json_encode($data);
}
}
}
?>
