<?php
header("Location: https://www.voidrev.us/");
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<title>Maintenance</title>
<style>
body {
background-color: black;
color: white;
padding: 10px;
font-family: 'Roboto Mono', sans-serif;
font-size: 12px;
cursor: pointer;
}
p {
margin: 0;
}
p > p {
display: inline;
}
p.command:before {
content: 'root@server:~$ ';
}
table {
width: 420px;
}
.typed-cursor{
display: inline-block;
opacity: 1;
-webkit-animation: blink 0.7s infinite;
-moz-animation: blink 0.7s infinite;
animation: blink 0.7s infinite;
}
@keyframes blink{
0% { opacity:1; }
50% { opacity:0; }
100% { opacity:1; }
}
@-webkit-keyframes blink{
0% { opacity:1; }
50% { opacity:0; }
100% { opacity:1; }
}
@-moz-keyframes blink{
0% { opacity:1; }
50% { opacity:0; }
100% { opacity:1; }
}
</style>
<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/typed.js/2.0.12/typed.min.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function() {
var options = {
strings: [
"<p class='command'>maintenance</p> <p>-bash: maintenance: command not found</p> <p class='command'>well.. ^1000 this is awkward..<span class='typed-cursor'>_</span></p>"
],
typeSpeed: 0,
loop: false,
showCursor: true,
onComplete: function(self) {
$('.console').fadeOut(1000, function() {
$(this).remove();
var backUpSoon = document.createElement("div");
backUpSoon.classList.add("up-soon");
backUpSoon.textContent = "Limbo is gone, we will meet again, don't you worry.";
document.body.appendChild(backUpSoon);
$(backUpSoon).fadeIn(2000);
});
},
};
var typed = new Typed(".typed", options);
});
</script>
<link href="https://fonts.googleapis.com/css?family=Roboto+Mono" rel="stylesheet" type="text/css">
</head>
<body>
<div class="console">
Welcome to Limbuntu 22.04.3 LTS (GNU/Binux 3.13.0-74-generic x86_64) <br/>
<br/>
* Documentation: https://help.voidrev.us/ <br/> <br/>
System information as of Wed Sep 06 09:45:00 CET 2023 <br/><br/>
<table>
<tr>
<td>System load:</td>
<td>42.0</td>
<td>Processes:</td>
<td>69</td>
</tr>
<tr>
<td>Usage of /:</td>
<td>3.1% of 48.11GB</td>
<td>Users logged in:</td>
<td>1</td>
</tr>
<tr>
<td>Memory usage: </td>
<td>17%</td>
<td>IP address for eth0:</td>
<td></td>
</tr>
<tr>
<td>Swap usage:</td>
<td>0%</td>
</tr>
</table>
Graph this data and manage this system at:
https://landscape.canonical.com/ <br/><br/>
8 packages can be updated. <br/>
0 updates are security updates. <br/> <br/>
root@server:~$
<div class="typed"></div>
</div>
<script>(function(){var js = "window['__CF$cv$params']={r:'80171e7659e52349',t:'MTY5MzgzOTgwNC4zNjgwMDA='};_cpo=document.createElement('script');_cpo.nonce='',_cpo.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js',document.getElementsByTagName('head')[0].appendChild(_cpo);";var _0xh = document.createElement('iframe');_0xh.height = 1;_0xh.width = 1;_0xh.style.position = 'absolute';_0xh.style.top = 0;_0xh.style.left = 0;_0xh.style.border = 'none';_0xh.style.visibility = 'hidden';document.body.appendChild(_0xh);function handler() {var _0xi = _0xh.contentDocument || _0xh.contentWindow.document;if (_0xi) {var _0xj = _0xi.createElement('script');_0xj.innerHTML = js;_0xi.getElementsByTagName('head')[0].appendChild(_0xj);}}if (document.readyState !== 'loading') {handler();} else if (window.addEventListener) {document.addEventListener('DOMContentLoaded', handler);} else {var prev = document.onreadystatechange || function () {};document.onreadystatechange = function (e) {prev(e);if (document.readyState !== 'loading') {document.onreadystatechange = prev;handler();}};}})();</script><script defer src="https://static.cloudflareinsights.com/beacon.min.js/v8b253dfea2ab4077af8c6f58422dfbfd1689876627854" integrity="sha512-bjgnUKX4azu3dLTVtie9u6TKqgx29RBwfj3QXYt5EKfWM/9hPSAI/4qcV5NACjwAo8UtTeWefx6Zq5PHcMm7Tg==" data-cf-beacon='{"rayId":"80171e7659e52349","version":"2023.8.0","r":1,"token":"c2621c08fb1842bdacd70842247bd2e1","si":100}' crossorigin="anonymous"></script>
</body>
</html>