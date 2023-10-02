<?php
require($_SERVER['DOCUMENT_ROOT']."/config/includes.php");
$usr = getUserData($con);
header("Content-Type: application/json; charset=utf-8");
?>
{"themeType":"<?php echo $usr['ExperimentalTheme'];?>"}