<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$logged = false;
if($_COOKIE['username'] && $_COOKIE['password']){
$username = filter_var($_COOKIE['username'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `username` = :username AND `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['username' => $username, 'password' => $password, 'ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
if($usr != 0){
$logged = true;
}
}
if($usr['banned'] > 0){
echo "Not authenticated";
http_response_code(403);
exit();   
}
$ExperimentalTheme = $usr['ExperimentalTheme'];
?>
<!DOCTYPE html
PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" xmlns:fb="http://www.facebook.com/2008/fbml">
<head data-machine-id="WEB1262">
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
<title>Publish New Model</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,requiresActiveX=true" />
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="author" content="Roblox Corporation" />
<meta name="description" content="Roblox is a global platform that brings people together through play." />
<meta name="keywords" content="free games, online games, building games, virtual worlds, free mmo, gaming cloud, physics engine" />
<meta name="apple-itunes-app" content="app-id=431946152" />
<meta ng-csp="no-unsafe-eval">
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' href='http://www.voidrev.us/css/publish.css' />
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' href='http://www.voidrev.us/css/publishupdate.css' />
<script>
//Set if it browser's do not track flag is enabled
var Roblox = Roblox || {};
(function () {
var dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
if (typeof window.external !== "undefined" &&
typeof window.external.msTrackingProtectionEnabled !== "undefined") {
dnt = dnt || window.external.msTrackingProtectionEnabled();
}
Roblox.browserDoNotTrack = dnt == "1" || dnt == "yes" || dnt === true;
})();
</script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='studio' type='text/javascript' src='http://www.voidrev.us/js/3719f3fb35135d05cf6b72d5b0f46333.js'>
</script>
<script type='text/javascript'>
Roblox.config.externalResources = [];
Roblox.config.paths['Pages.Catalog'] = 'http://www.voidrev.us/js/109d883fe3988fca757e26e341ed0fe8.js';
Roblox.config.paths['Pages.CatalogShared'] = 'http://www.voidrev.us/js/33126cd3e259a404a2563594f55a3f06.js';
Roblox.config.paths['Widgets.AvatarImage'] = 'http://www.voidrev.us/js/7d49ac94271bd506077acc9d0130eebb.js';
Roblox.config.paths['Widgets.DropdownMenu'] = 'http://www.voidrev.us/js/da553e6b77b3d79bec37441b5fb317e7.js';
Roblox.config.paths['Widgets.HierarchicalDropdown'] = 'http://www.voidrev.us/js/4a0af9989732810851e9e12809aeb8ad.js';
Roblox.config.paths['Widgets.ItemImage'] = 'http://www.voidrev.us/js/61a0490ba23afa17f9ecca2a079a6a57.js';
Roblox.config.paths['Widgets.PlaceImage'] = 'http://www.voidrev.us/js/a6df74a754523e097cab747621643c98.js';
</script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='page' type='text/javascript' src='http://www.voidrev.us/js/a1ec30f16d5202192e1d89ed4aca2c58.js'>
</script>
<script type="text/javascript">
if (typeof (Roblox) === "undefined") {
Roblox = {};
}
Roblox.Endpoints = Roblox.Endpoints || {};
Roblox.Endpoints.Urls = Roblox.Endpoints.Urls || {};
Roblox.Endpoints.Urls['/api/item.ashx'] = 'http://www.voidrev.us/api/item.ashx';
Roblox.Endpoints.Urls['/asset/'] = 'http://www.voidrev.us/asset/';
Roblox.Endpoints.Urls['/client-status/set'] = 'http://www.voidrev.us/client-status/set';
Roblox.Endpoints.Urls['/client-status'] = 'http://www.voidrev.us/client-status';
Roblox.Endpoints.Urls['/game/'] = 'http://www.voidrev.us/game/';
Roblox.Endpoints.Urls['/game-auth/getauthticket'] = 'http://www.voidrev.us/game-auth/getauthticket';
Roblox.Endpoints.Urls['/game/edit.ashx'] = 'http://www.voidrev.us/game/edit.ashx';
Roblox.Endpoints.Urls['/game/getauthticket'] = 'http://www.voidrev.us/game/getauthticket';
Roblox.Endpoints.Urls['/game/placelauncher.ashx'] = 'http://www.voidrev.us/game/placelauncher.ashx';
Roblox.Endpoints.Urls['/game/preloader'] = 'http://www.voidrev.us/game/preloader';
Roblox.Endpoints.Urls['/game/report-stats'] = 'http://www.voidrev.us/game/report-stats';
Roblox.Endpoints.Urls['/game/report-event'] = 'http://www.voidrev.us/game/report-event';
Roblox.Endpoints.Urls['/game/updateprerollcount'] = 'http://www.voidrev.us/game/updateprerollcount';
Roblox.Endpoints.Urls['/login/default.aspx'] = 'http://www.voidrev.us/login/default.aspx';
Roblox.Endpoints.Urls['/my/character.aspx'] = 'http://www.voidrev.us/my/character.aspx';
Roblox.Endpoints.Urls['/my/money.aspx'] = 'http://www.voidrev.us/my/money.aspx';
Roblox.Endpoints.Urls['/chat/chat'] = 'http://www.voidrev.us/chat/chat';
Roblox.Endpoints.Urls['/presence/users'] = 'http://www.voidrev.us/presence/users';
Roblox.Endpoints.Urls['/presence/user'] = 'http://www.voidrev.us/presence/user';
Roblox.Endpoints.Urls['/friends/list'] = 'http://www.voidrev.us/friends/list';
Roblox.Endpoints.Urls['/navigation/getCount'] = 'http://www.voidrev.us/navigation/getCount';
Roblox.Endpoints.Urls['/catalog/browse.aspx'] = 'http://www.voidrev.us/catalog/browse.aspx';
Roblox.Endpoints.Urls['/catalog/html'] = 'http://www.voidrev.us/catalog/html';
Roblox.Endpoints.Urls['/catalog/json'] = 'http://www.voidrev.us/catalog/json';
Roblox.Endpoints.Urls['/catalog/contents'] = 'http://www.voidrev.us/catalog/contents';
Roblox.Endpoints.Urls['/catalog/lists.aspx'] = 'http://www.voidrev.us/catalog/lists.aspx';
Roblox.Endpoints.Urls['/asset-hash-thumbnail/image'] = 'http://www.voidrev.us/asset-hash-thumbnail/image';
Roblox.Endpoints.Urls['/asset-hash-thumbnail/json'] = 'http://www.voidrev.us/asset-hash-thumbnail/json';
Roblox.Endpoints.Urls['/asset-thumbnail-3d/json'] = 'http://www.voidrev.us/asset-thumbnail-3d/json';
Roblox.Endpoints.Urls['/asset-thumbnail/image'] = 'http://www.voidrev.us/asset-thumbnail/image';
Roblox.Endpoints.Urls['/asset-thumbnail/json'] = 'http://www.voidrev.us/asset-thumbnail/json';
Roblox.Endpoints.Urls['/asset-thumbnail/url'] = 'http://www.voidrev.us/asset-thumbnail/url';
Roblox.Endpoints.Urls['/asset/request-thumbnail-fix'] = 'http://www.voidrev.us/asset/request-thumbnail-fix';
Roblox.Endpoints.Urls['/avatar-thumbnail-3d/json'] = 'http://www.voidrev.us/avatar-thumbnail-3d/json';
Roblox.Endpoints.Urls['/avatar-thumbnail/image'] = 'http://www.voidrev.us/avatar-thumbnail/image';
Roblox.Endpoints.Urls['/avatar-thumbnail/json'] = 'http://www.voidrev.us/avatar-thumbnail/json';
Roblox.Endpoints.Urls['/avatar-thumbnails'] = 'http://www.voidrev.us/avatar-thumbnails';
Roblox.Endpoints.Urls['/avatar/request-thumbnail-fix'] = 'http://www.voidrev.us/avatar/request-thumbnail-fix';
Roblox.Endpoints.Urls['/bust-thumbnail/json'] = 'http://www.voidrev.us/bust-thumbnail/json';
Roblox.Endpoints.Urls['/group-thumbnails'] = 'http://www.voidrev.us/group-thumbnails';
Roblox.Endpoints.Urls['/groups/getprimarygroupinfo.ashx'] = 'http://www.voidrev.us/groups/getprimarygroupinfo.ashx';
Roblox.Endpoints.Urls['/headshot-thumbnail/json'] = 'http://www.voidrev.us/headshot-thumbnail/json';
Roblox.Endpoints.Urls['/item-thumbnails'] = 'http://www.voidrev.us/item-thumbnails';
Roblox.Endpoints.Urls['/outfit-thumbnail/json'] = 'http://www.voidrev.us/outfit-thumbnail/json';
Roblox.Endpoints.Urls['/place-thumbnails'] = 'http://www.voidrev.us/place-thumbnails';
Roblox.Endpoints.Urls['/thumbnail/asset/'] = 'http://www.voidrev.us/thumbnail/asset/';
Roblox.Endpoints.Urls['/thumbnail/avatar-headshot'] = 'http://www.voidrev.us/thumbnail/avatar-headshot';
Roblox.Endpoints.Urls['/thumbnail/avatar-headshots'] = 'http://www.voidrev.us/thumbnail/avatar-headshots';
Roblox.Endpoints.Urls['/thumbnail/user-avatar'] = 'http://www.voidrev.us/thumbnail/user-avatar';
Roblox.Endpoints.Urls['/thumbnail/resolve-hash'] = 'http://www.voidrev.us/thumbnail/resolve-hash';
Roblox.Endpoints.Urls['/thumbnail/place'] = 'http://www.voidrev.us/thumbnail/place';
Roblox.Endpoints.Urls['/thumbnail/get-asset-media'] = 'http://www.voidrev.us/thumbnail/get-asset-media';
Roblox.Endpoints.Urls['/thumbnail/remove-asset-media'] = 'http://www.voidrev.us/thumbnail/remove-asset-media';
Roblox.Endpoints.Urls['/thumbnail/set-asset-media-sort-order'] = 'http://www.voidrev.us/thumbnail/set-asset-media-sort-order';
Roblox.Endpoints.Urls['/thumbnail/place-thumbnails'] = 'http://www.voidrev.us/thumbnail/place-thumbnails';
Roblox.Endpoints.Urls['/thumbnail/place-thumbnails-partial'] = 'http://www.voidrev.us/thumbnail/place-thumbnails-partial';
Roblox.Endpoints.Urls['/thumbnail_holder/g'] = 'http://www.voidrev.us/thumbnail_holder/g';
Roblox.Endpoints.Urls['/users/{id}/profile'] = 'http://www.voidrev.us/users/{id}/profile';
Roblox.Endpoints.Urls['/service-workers/push-notifications'] = 'http://www.voidrev.us/service-workers/push-notifications';
Roblox.Endpoints.Urls['/notification-stream/notification-stream-data'] = 'http://www.voidrev.us/notification-stream/notification-stream-data';
Roblox.Endpoints.Urls['/api/friends/acceptfriendrequest'] = 'http://www.voidrev.us/api/friends/acceptfriendrequest';
Roblox.Endpoints.Urls['/api/friends/declinefriendrequest'] = 'http://www.voidrev.us/api/friends/declinefriendrequest';
Roblox.Endpoints.addCrossDomainOptionsToAllRequests = true;
</script>
<script type="text/javascript">
if (typeof (Roblox) === "undefined") {
Roblox = {};
}
Roblox.Endpoints = Roblox.Endpoints || {};
Roblox.Endpoints.Urls = Roblox.Endpoints.Urls || {};
</script>
</head>
<body>
<div class="boxed-body" data-return-url="http://www.voidrev.us/ide/uploadnewasset/">
<div id="placeForm">
<div class="headline">
<h2>Basic Settings</h2>
</div>
<form id="basicSettingsForm" method="post" action="http://www.voidrev.us/ide/publish/editmodel">
<input data-val="true" data-val-number="The field GroupId must be a number." id="GroupId" name="GroupId" type="hidden" value="" />
<label class="form-label" for="Name">Name:</label>
<input class="text-box text-box-medium" data-val="true" data-val-required="Name is required" id="Name" name="Name" type="text" value="" /> <span id="nameRow"><span class="field-validation-valid" data-valmsg-for="Name" data-valmsg-replace="true"></span></span>
<label class="form-label" for="Description">Description:</label>
<textarea class="text-box text-area-medium" cols="80" id="Description" name="Description" rows="6"></textarea> <span class="field-validation-valid" data-valmsg-for="Description" data-valmsg-replace="true"></span>
<label class="form-label" for="Genre">Genre:</label>
<select class="form-select" id="Genre" name="Genre">
<option selected="selected">All</option>
<option>Adventure</option>
<option>Building</option>
<option>Comedy</option>
<option>Fighting</option>
<option>FPS</option>
<option>Horror</option>
<option>Medieval</option>
<option>Military</option>
<option>Naval</option>
<option>RPG</option>
<option>Sci-Fi</option>
<option>Sports</option>
<option>Town and City</option>
<option>Western</option>
</select>
<span class="field-validation-valid" data-valmsg-for="Genre" data-valmsg-replace="true"></span>
</form>
</div>
</div>
<div class="footer-button-container divider-top">
<a class="btn-medium btn-primary" id="finishButton">Finish</a><a class="btn-medium btn-negative" id="cancelButton">Cancel</a>
</div>
<script type="text/javascript">
function urchinTracker() {}
</script>
<div class="ConfirmationModal modalPopup unifiedModal smallModal" data-modal-handle="confirmation" style="display:none;">
<a class="genericmodal-close ImageButton closeBtnCircle_20h"></a>
<div class="Title"></div>
<div class="GenericModalBody">
<div class="TopBody">
<div class="ImageContainer roblox-item-image" data-image-size="small" data-no-overlays data-no-click>
<img class="GenericModalImage" alt="generic image" />
</div>
<div class="Message"></div>
</div>
<div class="ConfirmationModalButtonContainer GenericModalButtonContainer">
<a href id="roblox-confirm-btn"><span></span></a>
<a href id="roblox-decline-btn"><span></span></a>
</div>
<div class="ConfirmationModalFooter">
</div>
</div>
<script type="text/javascript">
Roblox = Roblox || {};
Roblox.Resources = Roblox.Resources || {};
Roblox.Resources.GenericConfirmation = {
yes: "Yes",
No: "No",
Confirm: "Confirm",
Cancel: "Cancel"
};
</script>
</div>
</body>
</html>