<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
if (!(isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS'] == 'on' ||
$_SERVER['HTTPS'] == 1) ||
isset($_SERVER['HTTP_X_FORWARDED_PROTO']) &&
$_SERVER['HTTP_X_FORWARDED_PROTO'] == 'https'))
{
$redirect = 'https://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];;
header('Location: ' . $redirect);
exit();
}
if($_COOKIE['username'] && $_COOKIE['password']){
$username = filter_var($_COOKIE['username'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `username` = :username AND `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['username' => $username, 'password' => $password, 'ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
$uID = $usr['id'];
$ExperimentalTheme = $usr['ExperimentalTheme'];
if($usr['banned'] > 0){
echo "Not authenticated";
http_response_code(403);
exit();   
}
}
?>
<!DOCTYPE html>
<html><head>
<?php if($ExperimentalTheme == "Dark"){
?>
<link rel="stylesheet" href="https://www.voidrev.us/css/main.css"/>
<?php
}elseif($ExperimentalTheme == "Light"){
?>
<link rel="stylesheet" href="https://www.voidrev.us/css/main2.css"/>
<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600" rel="stylesheet" type="text/css">
<?php
}elseif($ExperimentalTheme == "2016E"){
?>
<link rel="stylesheet" href="https://www.voidrev.us/css/2016e.css"/>
<?
}elseif($ExperimentalTheme == "AprilFools"){
?>
<link rel="stylesheet" href="https://www.voidrev.us/css/aprilfools.css"/>
<?
}elseif($ExperimentalTheme == "newtheme"){
?>
<link rel="stylesheet" href="https://www.voidrev.us/css/newtheme.css"/>
<?
}else{
?>
<link rel="stylesheet" href="https://www.voidrev.us/css/main2.css"/>
<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600" rel="stylesheet" type="text/css">
<?
}
?>
<meta name="viewport" content="width=device-width">
<link rel="stylesheet" href="https://www.voidrev.us/css/toolbox.css">
<script type="text/javascript" src="https://www.voidrev.us/js/10187297c8cf0775450cf3effcb06699.js"></script>
<script type="text/javascript">
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-43420590-3']);
_gaq.push(['_setDomainName', 'voidrev.us']);
(function () {
var ga = document.createElement('script');
ga.type = 'text/javascript';
ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);
})();
</script>
</head>
<body ng-app="clientToolbox">
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.ClientToolboxLinks =
{
HeaderTemplateLink: "/viewapp/studio/toolbox/header.html",
SubnavTemplateLink: "/viewapp/studio/toolbox/subnav.html",
PaginationTemplateLink: "/viewapp/studio/toolbox/pagination.html",
AssetsTemplateLink: "/viewapp/studio/toolbox/assets.html",
ThumbnailTemplateLink: "/viewapp/studio/toolbox/thumbnail.html",
GetSetsByCreatorLink: "/sets/get-by-creator",
GetRobloxSetsLink: "/sets/get-roblox-sets",
GetSubscribedSetsLink: "/sets/get-subscribed",
GetAssetsLink: "/ide/toolbox/items",
GetSetItemsLink: "/sets/0/items",
VoteStudioLink: "/voting/studio/vote",
UnvoteStudioLink: "/voting/studio/unvote",
InsertAssetLink: "/ide/insertasset",
GetGroupsCanManageGamesInLink: "/groups/can-manage-games"
};
Roblox.AssetType = {
"10": "FreeModels",
"13": "FreeDecals",
"3": "FreeAudio",
};
Roblox.ClientToolboxModel = {
// type cast to boolean for javascript
IsUserAuthenticated: true,
ContentUrl: "http://www.voidrev.us/asset/",
UserId: "<?=$uID;?>",
ShowGroupCategories: false
};
Roblox.jsConsoleEnabled = true;
Roblox.EnableNewToolboxSearch = true;
</script>
<input name="__RequestVerificationToken" type="hidden" value="iNs1O7ZTEBMv02AupqRQk5RASY8tqrlrgCvea5pWGOxrZ_QR8yPC678Qv0jYKDWyU02YrceHTKwDNVZjZFU19nXda2I1">
<div roblox-toolbox="">
<div roblox-toolbox-header="" class="client-toolbox-header"></div>
<div ng-controller="RobloxReferralLink" ng-show="showReferralLinks()" class="client-toolbox-referral-links">
Try searching for:
<a href="https://www.voidrev.us/ide/clienttoolbox" ng-click="refer(&#39;NPC&#39;)">NPC</a>
<a href="https://www.voidrev.us/ide/clienttoolbox" ng-click="refer(&#39;Vehicle&#39;)">Vehicle</a>
<a href="https://www.voidrev.us/ide/clienttoolbox" ng-click="refer(&#39;Weapon&#39;)">Weapon</a>
<a href="https://www.voidrev.us/ide/clienttoolbox" ng-click="refer(&#39;Building&#39;)">Building</a>
<a href="https://www.voidrev.us/ide/clienttoolbox" ng-click="refer(&#39;Light&#39;)">Light</a>
</div>
<div roblox-toolbox-subnav="" class="client-toolbox-subnav">
</div>
<div roblox-toolbox-assets="" class="client-toolbox-content">
</div>
<div roblox-toolbox-pagination="" class="client-toolbox-subnav">
</div>
</div>
</body></html>