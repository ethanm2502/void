<?php
// unset cookies
if (isset($_SERVER['HTTP_COOKIE'])) {
$cookies = explode(';', $_SERVER['HTTP_COOKIE']);
foreach($cookies as $cookie) {
$parts = explode('=', $cookie);
$name = trim($parts[0]);
setcookie($name, '', - 24 * 60 * 60);
setcookie($name, '', - 24 * 60 * 60, '/');
setcookie($name, '', - 24 * 60 * 60, '/', '.voidrev.us');
}
}
setcookie("access", "yes", time() + 24 * 60 * 60, "/", '.voidrev.us');
header("Location: https://www.voidrev.us");
exit();
?>
