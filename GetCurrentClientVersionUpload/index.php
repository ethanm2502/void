<?php header("Content-Type: application/json; charset=utf-8");
if($_GET['binaryType'] == "MacPlayer"){
echo'"version-b2f1201a7be44bd2"';
}else{
if($_GET['binaryType'] == "WindowsStudio"){
echo'"version-phqw6fselwuqtrvr"';
}else{
echo'"version-d30b938ea76a153e"';
}
}