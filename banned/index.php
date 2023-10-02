<?php
$maincss = true;
include ($_SERVER['DOCUMENT_ROOT'].'/global.php');
?>
<script src=https://www.voidrev.us/js/3a25d0eb48bed7aea3692d1ddbca637b.js></script>
<div class="container-main">
<noscript><div&gt;<div class="alert-info" role="alert"&gt;Please enable Javascript to use all the features on this site.</div&gt;</div&gt;</noscript>
<?php
$banreason = $usr['banreason'];
$canappeal = $usr['canappeal'];
$currentTimestamp = time();
$targetDateTimestamp = $usr['bantime'];
$timeDifference = $targetDateTimestamp - $currentTimestamp;
$daysAway = floor($timeDifference / (24 * 60 * 60)) + 1; // hacky fix for 2 6 and 13 day bans
if ($usr['banned'] == 0) {
header('Location: /index.php');
} elseif ($usr['banned'] == 1) {
?>
<head id="ctl00_Head" data-machine-id="WEB">
<meta http-equiv="content-type" content="text/html; charset=UTF-8"><title>
Limbo | Warning
</title>
<link rel="stylesheet" type="text/css" href="/css/MainCSS.css">
</head><body class="">
<form name="aspnetForm" id="aspnetForm" class="nav-container no-gutter-ads">
<div id="navContent" class="nav-content">
<div class="nav-content-inner">
<div id="Container">
<div style="clear: both"></div>
<div id="Body" class="simple-body">
<div style="border: solid 1px #000; margin: 0 auto; padding: 30px; max-width: 500px;">
<h2 style="text-align: center;">Warning</h2>
<p>Our content monitors have determined that your behavior at Limbo has been in violation of our Terms of Service. </p>
<div id="ctl00_cphRoblox_ModeratorNotePanel">
<p>Moderator Note: <span style="font-weight: bold"><span id="ctl00_cphRoblox_Label4" mode="Encode"><?php echo$banreason?></span></span></p>
</div>
<p>Click Activate to Login.</p>
<p>There is no need to appeal.</p>
<p style="text-align: center;">
<a href="/banned/unban.php">Activate</a>
</p>
</div>
</div>
</div></div></div>
</form>
</body></html>
<?php
}elseif ($usr['banned'] == 2) {
?>
<head id="ctl00_Head" data-machine-id="WEB">
<meta http-equiv="content-type" content="text/html; charset=UTF-8"><title>
Limbo | Banned For <?=$daysAway;?> Days
</title>
<link rel="stylesheet" type="text/css" href="/css/MainCSS.css">
</head><body class="">
<form name="aspnetForm" id="aspnetForm" class="nav-container no-gutter-ads">
<div id="navContent" class="nav-content">
<div class="nav-content-inner">
<div id="Container">
<div style="clear: both"></div>
<div id="Body" class="simple-body">
<div style="border: solid 1px #000; margin: 0 auto; padding: 30px; max-width: 500px;">
<h2 style="text-align: center;">Banned For <?=$daysAway;?> Days</h2>
<p>Our content monitors have determined that your behavior at Limbo has been in violation of our Terms of Service. </p>
<div id="ctl00_cphRoblox_ModeratorNotePanel">
<p>Moderator Note: <span style="font-weight: bold"><span id="ctl00_cphRoblox_Label4" mode="Encode"><?php echo$banreason?></span></span></p>
</div>
<p>Click Activate to Login.</p>
<?php
if($canappeal == 1){echo'
<p>If you think the ban was unfair then go here and appeal: https://discord.gg/P3pdVX2A</p>
';
}else{
echo'<p>This ban is not appealable, do not attempt to appeal.</p>';
}?>
<p style="text-align: center;">
<?php if ($daysAway <= 0) {echo'<a href="/banned/unban.php">Activate</a>';}?>
</p>
</div>
</div>
</div></div></div>
</form>
</body></html>
<?php
}elseif ($usr['banned'] == 3) {
?>
<head id="ctl00_Head" data-machine-id="WEB">
<meta http-equiv="content-type" content="text/html; charset=UTF-8"><title>
Limbo | Banned For <?=$daysAway;?> Days
</title>
<link rel="stylesheet" type="text/css" href="/css/MainCSS.css">
</head><body class="">
<form name="aspnetForm" id="aspnetForm" class="nav-container no-gutter-ads">
<div id="navContent" class="nav-content">
<div class="nav-content-inner">
<div id="Container">
<div style="clear: both"></div>
<div id="Body" class="simple-body">
<div style="border: solid 1px #000; margin: 0 auto; padding: 30px; max-width: 500px;">
<h2 style="text-align: center;">Banned For <?=$daysAway;?> Days</h2>
<p>Our content monitors have determined that your behavior at Limbo has been in violation of our Terms of Service. </p>
<div id="ctl00_cphRoblox_ModeratorNotePanel">
<p>Moderator Note: <span style="font-weight: bold"><span id="ctl00_cphRoblox_Label4" mode="Encode"><?php echo$banreason?></span></span></p>
</div>
<p>Click Activate to Login.</p>
<?php
if($canappeal == 1){echo'
<p>If you think the ban was unfair then go here and appeal: https://discord.gg/P3pdVX2A</p>
';
}else{
echo'<p>This ban is not appealable, do not attempt to appeal.</p>';
}?>
<p style="text-align: center;">
<?php if ($daysAway <= 0) {echo'<a href="/banned/unban.php">Activate</a>';}?>
</p>
</div>
</div>
</div></div></div>
</form>
</body></html>
<?php
}elseif ($usr['banned'] == 4) {
?>
<head id="ctl00_Head" data-machine-id="WEB">
<meta http-equiv="content-type" content="text/html; charset=UTF-8"><title>
Limbo | Account Deleted
</title>
<link rel="stylesheet" type="text/css" href="/css/MainCSS.css">
</head><body class="">
<form name="aspnetForm" id="aspnetForm" class="nav-container no-gutter-ads">
<div id="navContent" class="nav-content">
<div class="nav-content-inner">
<div id="Container">
<div style="clear: both"></div>
<div id="Body" class="simple-body">
<div style="border: solid 1px #000; margin: 0 auto; padding: 30px; max-width: 500px;">
<h2 style="text-align: center;">Account Deleted</h2>
<p>Our content monitors have determined that your behavior at Limbo has been in violation of our Terms of Service. </p>
<div id="ctl00_cphRoblox_ModeratorNotePanel">
<p>Moderator Note: <span style="font-weight: bold"><span id="ctl00_cphRoblox_Label4" mode="Encode"><?php echo$banreason?></span></span></p>
</div>
<?php
if($canappeal == 1){echo'
<p>If you think the ban was unfair then go here and appeal: https://discord.gg/P3pdVX2A</p>
';
}else{
echo'<p>This ban is not appealable, do not attempt to appeal.</p>';
}?>
<p style="text-align: center;">
</p>
</div>
</div>
</div></div></div>
</form>
</body></html>
<?php
}
?>