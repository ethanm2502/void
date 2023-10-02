<?php
require ($_SERVER['DOCUMENT_ROOT'].'/global.php');
    setcookie("username", $username, time() - 24 * 60 * 60, "/");
	setcookie("password", $password, time() - 24 * 60 * 60, "/");
    setcookie(".ROBLOSECURITY", $roblosec, time() - 24 * 60 * 60, "/");
?>

<div style='margin:10px;padding:4px;color:#333333;'>Logged out! <META http-equiv=refresh content=1;URL=/index.php></div>