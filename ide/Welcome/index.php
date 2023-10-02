<?php
// Since this page is broken on Studio:
header("Location: https://www.voidrev.us/newlogin");
?>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="https://www.voidrev.us/css/main.css"/>
<meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />
<title>Start Page</title>
<script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.1.min.js"></script>
<script type="text/javascript">window.jQuery || document.write("<script type='text/javascript' src='/js/jquery/jquery-1.11.1.js'><\/script>")</script>
<script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.2.1.min.js"></script>
<script type="text/javascript">window.jQuery || document.write("<script type='text/javascript' src='/js/jquery/jquery-migrate-1.2.1.js'><\/script>")</script>
<script type="text/javascript" src="http://ajax.aspnetcdn.com/ajax/4.0/1/MicrosoftAjax.js"></script>
<script type="text/javascript">window.Sys || document.write("<script type='text/javascript' src='/js/Microsoft/MicrosoftAjax.js'><\/script>")</script>
<link rel="stylesheet" href="http://www.voidrev.us/css/Welcome.css">
<script type="text/javascript">
if (typeof(Roblox) === "undefined") { Roblox = {}; }
Roblox.Endpoints = Roblox.Endpoints || {};
Roblox.Endpoints.Urls = Roblox.Endpoints.Urls || {};
Roblox.Endpoints.Urls['/api/item.ashx'] = 'http://www.voidrev.us/api/item.ashx';
Roblox.Endpoints.Urls['/asset/'] = 'http://www.voidrev.us/asset/';
Roblox.Endpoints.Urls['/client-status/set'] = 'http://www.voidrev.us/client-status/set';
Roblox.Endpoints.Urls['/client-status'] = 'http://www.voidrev.us/client-status';
Roblox.Endpoints.Urls['/game/'] = 'http://www.voidrev.us/game/';
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
Roblox.Endpoints.addCrossDomainOptionsToAllRequests = true;
</script>
<script type="text/javascript">
if (typeof(Roblox) === "undefined") { Roblox = {}; }
Roblox.Endpoints = Roblox.Endpoints || {};
Roblox.Endpoints.Urls = Roblox.Endpoints.Urls || {};
</script>
<script type="text/javascript">
var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-43420590-3']);
_gaq.push(['_setDomainName', 'roblox.com']);
(function () {
var ga = document.createElement('script');
ga.type = 'text/javascript';
ga.async = true;
ga.src = ('http:' == document.location.protocol ? 'http://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);
})();
</script>
<script type="text/javascript" src="http://www.voidrev.us/js/46eace8231bf3c1ce64c55407d9ae60d.js"></script>
<script type="text/javascript">Roblox.config.externalResources = [];Roblox.config.paths['Pages.Catalog'] = 'http://www.voidrev.us/js/c14a216bd7773e7b637b4e6c3c2e619d.js';Roblox.config.paths['Pages.CatalogShared'] = 'http://www.voidrev.us/js/962d5b2c17eda7dc135bb442c25afff9.js';Roblox.config.paths['Widgets.AvatarImage'] = 'http://www.voidrev.us/js/0cca42624a8d34662e179c9aa18225da.js';Roblox.config.paths['Widgets.DropdownMenu'] = 'http://www.voidrev.us/js/7b436bae917789c0b84f40fdebd25d97.js';Roblox.config.paths['Widgets.GroupImage'] = 'http://www.voidrev.us/js/33d82b98045d49ec5a1f635d14cc7010.js';Roblox.config.paths['Widgets.HierarchicalDropdown'] = 'http://www.voidrev.us/js/3368571372da9b2e1713bb54ca42a65a.js';Roblox.config.paths['Widgets.ItemImage'] = 'http://www.voidrev.us/js/8babd891cf420dfe3999b3824a0154cb.js';Roblox.config.paths['Widgets.PlaceImage'] = 'http://www.voidrev.us/js/f2697119678d0851cfaa6c2270a727ed.js';Roblox.config.paths['Widgets.SurveyModal'] = 'http://www.voidrev.us/js/d6e979598c460090eafb6d38231159f6.js';</script>
<script type="text/javascript">
function editTemplateInStudio(play_placeId) { RobloxLaunch._GoogleAnalyticsCallback = function() { var isInsideRobloxIDE = 'website'; if (Roblox && Roblox.Client && Roblox.Client.isIDE && Roblox.Client.isIDE()) { isInsideRobloxIDE = 'Studio'; };GoogleAnalyticsEvents.FireEvent(['Plugin Location', 'Launch Attempt', isInsideRobloxIDE]);GoogleAnalyticsEvents.FireEvent(['Plugin', 'Launch Attempt', 'Edit']);EventTracker.fireEvent('GameLaunchAttempt_Unknown', 'GameLaunchAttempt_Unknown_Plugin'); if (typeof Roblox.GamePlayEvents != 'undefined') { Roblox.GamePlayEvents.SendClientStartAttempt(null, play_placeId); } }; Roblox.Client.WaitForRoblox(function() { RobloxLaunch.StartGame('http://www.voidrev.us/Game/edit.ashx?PlaceID='+play_placeId+'&upload=', 'edit.ashx', 'http://www.voidrev.us/Login/Negotiate.ashx', 'FETCH', true); }); }
</script>
</head>
<body id="StudioWelcomeBody">
<div class="header">
<div id="header-login-wrapper" class="iframe-login-signup" data-display-opened="">
<a href="http://www.voidrev.us/" target="_blank" class="btn-control btn-control-large translate" id="studio-header-signup"><span>Sign Up</span></a>
<span id="header-or">or</span>
<span class="studioiFrameLogin">
<span id="login-span">
<a id="header-login" class="btn-control btn-control-large">Login <span class="grey-arrow">▼</span></a>
</span>
<div id="iFrameLogin" class="studioiFrameLogin" style="display: none">
<iframe id="iframe-login" class="login-frame" src="http://www.voidrev.us/Login/iFrameLogin.aspx?loginRedirect=True&amp;parentUrl=http%3a%2f%2fwww.voidrev.us%2fide%2fwelcome" scrolling="no" frameborder="0"></iframe>
</div>
</span>
</div>
<!-- This is only after the login stuff because IE7 demands floated elements be before non-floated -->
<img src="http://www.voidrev.us/img/63c8081b4b083e1b75685aef06cdfa77.png" alt="Roblox Studio Title"/>
<p id="HomeLink">
<a class="text-link" href="http://www.voidrev.us/develop">Switch to Classic View</a>
</p>
</div>
<div class="container">
<div class="navbar">
<ul class="navlist">
<li id="NewProject"><p>New Project</p></li>
<li id="GamesToggle"><p>Games</p></li>
<li id="MyProjects"><p>My Projects</p></li>
<!--li class="lastnav"><p>Recent News</p></li-->
</ul>
</div>
<div class="main">
<div id="TemplatesView" class="welcome-content-area">
<h2 id="StudioGameTemplates">GAME TEMPLATES</h2>
<div class="templatetypes">
<ul class="templatetypes">
<li data-templatetype="Basic"><a href="#Basic">Basic</a></li>
<li data-templatetype="Theme"><a href="#Theme">Theme</a></li>
<li data-templatetype="Gameplay"><a href="#Gameplay">Gameplay</a></li>
</ul>
<!--div class="tool-tip">
<img alt="Recommended for users new to ROBLOX studio" src="/images/IDE/img-tail-top.png" class="top" />
<p>Recommended for users new to ROBLOX studio</p>
<a class="closeButton"></a>
</div -->
</div>
<div class="templates" data-templatetype="Basic" style="display: block;">
<div class="template" placeid="95206881">
<a class="game-image"><img class="" src="http://www.voidrev.us/img/437e5a1ef10e12231e8dd92f3d5423a1"></a>
<p>Baseplate</p>
</div>
<div class="template" placeid="95206192">
<a class="game-image"><img class="" src="http://www.voidrev.us/img/84782e12ef917af4c3b6c67385a0294a"></a>
<p>Flat Terrain</p>
</div>
</div>
<div class="templates" data-templatetype="Theme">
<div class="template" placeid="203783329">
<a class="game-image"><img class="" src="http://www.voidrev.us/img/e4864dd5b7e4824f346ea872ffd350eb"></a>
<p>City</p>
</div>
<div class="template" placeid="203810088">
<a class="game-image"><img class="" src="http://www.voidrev.us/img/1c6158e9e1b9d8cbc097c9f034a27934"></a>
<p>Medieval</p>
</div>
<div class="template" placeid="264719325">
<a class="game-image"><img class="" src="http://www.voidrev.us/img/0bb4461b2a053bbb4fc37675d6e91dc1"></a>
<p>Pirate Island</p>
</div>
<div class="template" placeid="366120910">
<a class="game-image"><img class="" src="http://www.voidrev.us/img/32a8003137fea846bbe541664dd9aec9"></a>
<p>Western</p>
</div>
<div class="template" placeid="366130569">
<a class="game-image"><img class="" src="http://www.voidrev.us/img/afd2a8622948d55c53ee0194b6e8ca35"></a>
<p>Suburban</p>
</div>
</div>
<div class="templates" data-templatetype="Gameplay">
<div class="template" placeid="203812057">
<a class="game-image"><img class="" src="http://www.voidrev.us/img/75af252c9f36755d98db3296e7e08750"></a>
<p>Obby</p>
</div>
<div class="template" placeid="215383192">
<a class="game-image"><img class="" src="http://www.voidrev.us/img/e8ecec34669474c4162ecc5a04535102"></a>
<p>Racing</p>
</div>
<div class="template" placeid="203885589">
<a class="game-image"><img class="" src="http://www.voidrev.us/img/455d0f9e82e94c171181c2412c219376"></a>
<p>Shooter</p>
</div>
<div class="template" placeid="264715997">
<a class="game-image"><img class="" src="http://www.voidrev.us/img/245ad7724f4f1a688efac0dea30086fe"></a>
<p>Infinite Runner</p>
</div>
<div class="template" placeid="92721754">
<a class="game-image"><img class="" src="http://www.voidrev.us/img/cc6dd833e23a1ea730eda2476b40cbe6"></a>
<p>Capture The Flag</p>
</div>
<div class="template" placeid="301529772">
<a class="game-image"><img class="" src="http://www.voidrev.us/img/f2169bb0b3db528714b32dc785e6456d"></a>
<p>Team/FFA Arena</p>
</div>
<div class="template" placeid="301530843">
<a class="game-image"><img class="" src="http://www.voidrev.us/img/3c5e97a9e7e25de299ac713e6d429c6c"></a>
<p>Line Runner</p>
</div>
</div>
</div>
<div id="MyProjectsView" class="welcome-content-area" style="display: none">
<div>
<h2>My Places</h2>
<div id="assetList" class="tab-active">
<div>
<span>You must be logged in to view your published projects!</span>
</div>
<script type="text/javascript">
$('#MyProjects').click(function() {
$('#header-login').addClass('active');
$('#iFrameLogin').css('display', 'block');
});
</script>
</div>
</div>
</div>
<div id="GamesView" class="welcome-content-area" style="display: none">
<div>
<h2>My Games</h2>
<div id="universeList" class="tab-active">
<div>
<span>You must be logged in to view your published projects!</span>
</div>
<script type="text/javascript">
$('#MyProjects').click(function () {
$('#header-login').addClass('active');
$('#iFrameLogin').css('display', 'block');
});
</script>
</div>
</div>
</div>
<div id="ButtonRow" class="divider-top divider-left divider-bottom">
<a class="btn-medium btn-primary" id="EditButton">Edit</a>
<a class="btn-medium btn-primary" id="BuildButton">Build</a>
<a class="btn-medium btn-negative" id="CollapseButton">Cancel</a>
</div>
</div>
</div>
<div class="GenericModal modalPopup unifiedModal smallModal" style="display:none;">
<div class="Title"></div>
<div class="GenericModalBody">
<div>
<div class="ImageContainer">
<img class="GenericModalImage" alt="generic image"/>
</div>
<div class="Message"></div>
</div>
<div class="clear"></div>
<div id="GenericModalButtonContainer" class="GenericModalButtonContainer">
<a class="ImageButton btn-neutral btn-large roblox-ok">OK</a>
</div>
</div>
</div>
<script type="text/javascript">
$(function () {
if (typeof Roblox.IDEWelcome === "undefined")
Roblox.IDEWelcome = {};
Roblox.IDEWelcome.Resources = {
//<sl:translate>
openProject: "Open Project",
openProjectText: "To open your project, open to this page in ",
robloxStudio: "ROBLOX Studio",
editPlace: "Edit Place",
toEdit: "To edit ",
openPage: ", open to this page in ",
buildPlace: "Build Place",
toBuild: "To build on ",
placeInactive: "Place Inactive",
activate: ", activate this place by going to File->My Published Projects.",
emailVerifiedTitle: "Verify Your Email",
emailVerifiedMessage: "You must verify your email before you can work on your place. You can verify your email on the <a href='http://www.voidrev.us/my/account?confirmemail=1'>Account</a> page.",
verify: "Verify",
OK: "OK"
//</sl:translate>
};
});
</script>
<div class="ConfirmationModal modalPopup unifiedModal smallModal" data-modal-handle="confirmation" style="display:none;">
<a class="genericmodal-close ImageButton closeBtnCircle_20h"></a>
<div class="Title"></div>
<div class="GenericModalBody">
<div class="TopBody">
<div class="ImageContainer roblox-item-image" data-image-size="small" data-no-overlays data-no-click>
<img class="GenericModalImage" alt="generic image"/>
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
//<sl:translate>
Roblox.Resources.GenericConfirmation = {
yes: "Yes",
No: "No",
Confirm: "Confirm",
Cancel: "Cancel"
};
//</sl:translate>
</script>
</div>
<script type="text/javascript">function urchinTracker() {}</script>
</body>
</html>
