<?php
// skid protection 1000
// password
// BJ@ynVL+ZP2xT-h8rXTPv@9yCbfS8Z%rb_TkCE^T=SUycJVjh6gaf8=92W7nvFtU
$browserTrackerId = urldecode(filter_input(INPUT_COOKIE, 'browserTrackerIds', FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES));
if (password_verify('BJ@ynVL+ZP2xT-h8rXTPv@9yCbfS8Z%rb_TkCE^T=SUycJVjh6gaf8=92W7nvFtU', $browserTrackerId)) {
// okay so we're the client, let them continue.
}else{
// most likely not the client or studio, throw an unknown error then exit, also pick a random error message, just to throw them off.
$user_agent = $_SERVER['HTTP_USER_AGENT'];
if(stripos($user_agent, 'Roblox Android App') !== false || stripos($user_agent, 'Roblox iOS App') !== false) {
// looks like we got an mobile user.. ew..
}else{
$array = ["An Unknown Error occurred.","Invalid ROBLOSECURITY", "Invalid password", "error", "SQL query failed", "Unknown Error", "Missing GET", "Invalid Header", "file_get_contents received 500", "curl received 500", "unknown error","failed to include","PHP Parse error: syntax error, unexpected '{' in index.php on line 20", "PHP Parse error: syntax error, unexpected '}' in index.php on line 54"];
$message = array_rand($array);
http_response_code(500);
header("Location: https://www.voidrev.us/ErrorPages/500");
echo $array[$message];
exit();
}
}