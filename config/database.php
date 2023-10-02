<?php
ob_start();
error_reporting(E_ERROR);
ini_set('display_errors', 0);
$servername = "127.0.0.1";
$dbusername = "root";
$dbpassword = "_G-gfJgPiif/@/h4";
try {
$con = new PDO("mysql:host=$servername;dbname=limbodb;charset=utf8mb4", $dbusername, $dbpassword);
$con->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
} catch(PDOException $e) {
echo "uh oh database problems, here's an error: " . $e->getMessage();
exit();
}
if(!function_exists('NoXSSPlz')){
function NoXSSPlz($input){
$input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');
return $input;
}
}
if (!function_exists('errorhandler')) {
function errorhandler()
{
$last_error = error_get_last();
if ($last_error && $last_error['type'] == E_ERROR) {
http_response_code(500);
$error_message = date('Y-m-d H:i:s') . ' - Error: ' . $last_error['message'] . ' in ' . $last_error['file'] . ' on line ' . $last_error['line'] . PHP_EOL;
error_log($error_message, 3, 'error.log');
}
}
}
register_shutdown_function('errorhandler');
$_SERVER['DOCUMENT_ROOT'] = "C:/wamp64/www/";