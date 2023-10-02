<?php
$maincss = true;
include ($_SERVER['DOCUMENT_ROOT'].'/global.php');
$admin = $usr['SuperAdmin'];
$hatcreator = $usr['hatcreator'];
if(!$_GET['Page']){
header("Location: ?Page=universes");
}
function getFreeId(){
global $con;
// Get the maximum value from the library table
$libraryQuery = $con->prepare("SELECT MAX(id) AS max_id FROM library");
$libraryQuery->execute();
$libraryMaxId = $libraryQuery->fetch(PDO::FETCH_ASSOC)['max_id'];
// Get the maximum value from the games table
$gamesQuery = $con->prepare("SELECT MAX(id) AS max_id FROM games");
$gamesQuery->execute();
$gamesMaxId = $gamesQuery->fetch(PDO::FETCH_ASSOC)['max_id'];
// Find the maximum of the two maximum values
$maxId = max($libraryMaxId, $gamesMaxId);
// Increment the maximum value until no rows exist in library or games with that id
$nextId = $maxId + 1;
while (true) {
$libraryCheckQuery = $con->prepare("SELECT COUNT(*) AS count FROM library WHERE id = :id OR fileid = :fileid OR realfileid = :realfileid");
$libraryCheckQuery->execute(array(':id' => $nextId, ':fileid' => $nextId, ':realfileid' => $nextId));
$libraryCount = $libraryCheckQuery->fetch(PDO::FETCH_ASSOC)['count'];
$gamesCheckQuery = $con->prepare("SELECT COUNT(*) AS count FROM games WHERE id = :id");
$gamesCheckQuery->execute(array(':id' => $nextId));
$gamesCount = $gamesCheckQuery->fetch(PDO::FETCH_ASSOC)['count'];
if ($libraryCount == 0 && $gamesCount == 0) {
// No rows found in both library and games, use $nextId as the new ID
break;
}
$nextId++;
}
return $nextId;
}
if($_GET['CreateGame'] == "true"){
// Check if user doesnt have more than 100 games, if they do, quit, if they have super admin continue anyway.
$gamequery = $con->prepare("SELECT count(id) FROM `games` WHERE `creatorid`= :creatorid");
$gamequery->execute(['creatorid' => $uID]);
$gamecount = $gamequery->fetchColumn();
$gamequery = $con->prepare("SELECT id, created FROM `games` WHERE `creatorid` = :creatorid ORDER BY created LIMIT 1");
$gamequery->execute(['creatorid' => $uID]);
$gamecreated = $gamequery->fetch();
if (($gamecount < 100 || $admin == 1) && $gamecreated['created'] < (time() - 86400)) {
$date = time();
$uID = $usr['id'];
// Insert into `games`
$sql2 = "INSERT INTO `games` (`name`, `icon`, `description`, `creatorid`, `visits`, `created`, `updated`) VALUES ('Baseplate', '-99', 'This is your very first Limbo creation. Check it out, then make it your own with Limbo Studio!', '$uID', '0', '$date', '$date')";
$con->exec($sql2);
$key = getFreeId();
$startquery = $con->prepare("SELECT id FROM `games` WHERE `creatorid` = :creatorid AND `icon` = '-99'");
$startquery->execute(['creatorid' => $uID]);
$start = $startquery->fetch();
$startPlaceId = $start['id'];
$placeId = $startPlaceId;
// Okay so we've got a bit further, now add the default map into `file` and set the icon value.
$gamefile = base64_encode(file_get_contents($_SERVER["DOCUMENT_ROOT"] . "/Asset/Baseplate.rbxl"));
$placeidupdate = "UPDATE `games` SET `file` = '$gamefile' WHERE `id`='$startPlaceId'";
$con->exec($placeidupdate);
$key = getFreeId();
$iconidupdate = "UPDATE `games` SET `icon` = '$key' WHERE `id`='$startPlaceId'";
$con->exec($iconidupdate);
$idupdate = "UPDATE `games` SET `id` = '$key' WHERE `id`='$startPlaceId'";
$con->exec($idupdate);
// Okay we're done, update the id and exit.
header("Location: https://www.voidrev.us/develop/?Page=universes");
exit();
}
}
if(isset($_GET['remove'])){
// Now we have a remove request, check if its userads, or universes
if($_GET['Page'] == "userads"){
// $_GET['remove'] contains the $adid, execeute a delete request with the $adid but for security purposes check with the $uID too.
$adid = (int)$_GET['remove'];
$adquery = $con->prepare("SELECT * FROM `ads` WHERE `id` = '$adid'");
$adquery->execute();
$adexist = $adquery->fetch();
$file = $adexist['randident'];
$adupdate = "DELETE FROM `ads` WHERE `id`='$adid' AND `creatorid` = '$uID'";
$con->exec($adupdate);
unlink($_SERVER['DOCUMENT_ROOT'].'/img/ads/'.$file.'.png');
header("Location: https://www.voidrev.us/develop/?Page=userads");
exit();
}elseif($_GET['Page'] == "videoads"){
// $_GET['remove'] contains the $adid, execeute a delete request with the $adid but for security purposes check with the $uID too.
$adid = (int)$_GET['remove'];
$adquery = $con->prepare("SELECT * FROM `videoads` WHERE `id` = '$adid'");
$adquery->execute();
$adexist = $adquery->fetch();
$file = $adexist['id'];
$adupdate = "DELETE FROM `videoads` WHERE `id`='$adid' AND `creatorid` = '$uID'";
$con->exec($adupdate);
unlink($_SERVER['DOCUMENT_ROOT'].'/videos/'.$file.'.mp4');
header("Location: https://www.voidrev.us/develop/?Page=videoads");
exit();
}
if($_GET['Page'] == "universes"){
// Remove is incorrect, but hey it works, it gets the gameid from $_GET['remove'], does a prepare checking for the and creatorid matching $uID
$gameid = (int)$_GET['remove'];
$gamequery = $con->prepare("SELECT id,creatorid,active FROM `games` WHERE `id` = '$gameid' AND `creatorid` = '$uID'");
$gamequery->execute();
$game = $gamequery->fetch();
if($game['active'] == 0){
$active = 1;
}else{
$active = 0;
}
// Update active and again check for gameid, and creatorid.
$gameupdate = "UPDATE `games` SET `active` = '$active' WHERE `id` = '$gameid' AND `creatorid` = '$uID'";
$con->exec($gameupdate);
header("Location: https://www.voidrev.us/develop/?Page=universes");
exit();
}
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" xmlns:fb="http://www.facebook.com/2008/fbml">
<head>
<title>Develop - Void</title>
<link rel='stylesheet' href='https://www.voidrev.us/css/MainCSS.css' />
<link rel='stylesheet' href='https://www.voidrev.us/css/developpage.css' />
<script type='text/javascript' src='/js/angular.js'></script>
<script type='text/javascript' src='/js/jquery-1.11.1.min.js'></script>
<script type='text/javascript'>
window.jQuery || document.write("<script type='text/javascript' src='/js/jquery/jquery-1.11.1.js'><\/script>")
</script>
<script type='text/javascript' src='/js/jquery-migrate-1.2.1.min.js'></script>
<script type='text/javascript'>
window.jQuery || document.write(
"<script type='text/javascript' src='/js/jquery-migrate-1.2.1.js'><\/script>")
</script>
<script type='text/javascript' src='/js/MicrosoftAjax.js'></script>
<script type='text/javascript'>
window.Sys || document.write("<script type='text/javascript' src='/js/Microsoft/MicrosoftAjax.js'><\/script>")
</script>
<script src=https://www.voidrev.us/js/3a25d0eb48bed7aea3692d1ddbca637b.js></script>
<script src=https://www.voidrev.us/js/7825498393db2b92524062e06460f88a.js></script>
<div ng-modules="baseTemplateApp">
<script type="text/javascript" src="https://www.voidrev.us/js/cbd9a121217c4887264ffe32686ecd52.js"></script>
</div>
<div ng-modules=pageTemplateApp>
<script src=https://www.voidrev.us/js/c595daa1054b8bc26de4dc26428a3eae.js></script>
</div>
<script src=https://www.voidrev.us/js/a1c1db9de0e1d721ba154d95aed2f861.js></script>
<script>
Roblox.config.externalResources = [];
Roblox.config.paths['Pages.Catalog'] = 'https://www.voidrev.us/js/8d6821a4eed971155a4829a1e43336f4.js';
Roblox.config.paths['Pages.CatalogShared'] = 'https://www.voidrev.us/js/5c0ac85bd60f40a577bfff7e323e3690.js';
Roblox.config.paths['Widgets.AvatarImage'] = 'https://www.voidrev.us/js/823c7d686e6b3d8321275740fe498f9d.js';
Roblox.config.paths['Widgets.DropdownMenu'] = 'https://www.voidrev.us/js/5cf0eb71249768c86649bbf0c98591b0.js';
Roblox.config.paths['Widgets.GroupImage'] = 'https://www.voidrev.us/js/556af22c86bce192fb12defcd4d2121c.js';
Roblox.config.paths['Widgets.HierarchicalDropdown'] = 'https://www.voidrev.us/js/7689b2fd3f7467640cda2d19e5968409.js';
Roblox.config.paths['Widgets.ItemImage'] = 'https://www.voidrev.us/js/c2aa2fcc2b1e8ec82e1bacfdb9dfffea.js';
Roblox.config.paths['Widgets.PlaceImage'] = 'https://www.voidrev.us/js/52ff803e77bb661839e8b2c93bb5ba27.js';
Roblox.config.paths['Widgets.SurveyModal'] = 'https://www.voidrev.us/js/56ad7af86ee4f8bc82af94269ed50148.js';
</script>
<script type='text/javascript' src='https://www.voidrev.us/js/3c677025192d35279b84591a1abe925b.js'></script>
<script type='text/javascript' src='https://www.voidrev.us/js/9964a42acdd8018a88782b0a21849eff1c04082e598c722c2cc27256864047ec.js'></script>
<script type="text/javascript">
$(function () {
Roblox.JSErrorTracker.initialize({
'suppressConsoleError': true
});
});
</script>
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.UpsellAdModal = Roblox.UpsellAdModal || {};
Roblox.UpsellAdModal.Resources = {
//<sl:translate>
title: "Remove Ads Like This",
body: "Builders Club members do not see external ads like these.",
accept: "Upgrade Now",
decline: "No, thanks"
//</sl:translate>
};
</script>
<script type="text/javascript">
Roblox.FixedUI.gutterAdsEnabled = false;
</script>
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.jsConsoleEnabled = false;
</script>
<script>
$(function () {
Roblox.DeveloperConsoleWarning.showWarning();
});
</script>
<script type="text/javascript">
if (typeof (Roblox) === "undefined") {
Roblox = {};
}
Roblox.Endpoints = Roblox.Endpoints || {};
Roblox.Endpoints.Urls = Roblox.Endpoints.Urls || {};
Roblox.Endpoints.Urls['/api/item.ashx'] = 'https://www.voidrev.us/api/item.ashx';
Roblox.Endpoints.Urls['/asset/'] = 'https://www.voidrev.us/asset/';
Roblox.Endpoints.Urls['/client-status/set'] = 'https://www.voidrev.us/client-status/set';
Roblox.Endpoints.Urls['/client-status'] = 'https://www.voidrev.us/client-status';
Roblox.Endpoints.Urls['/game/'] = 'https://www.voidrev.us/game/';
Roblox.Endpoints.Urls['/game-auth/getauthticket'] = 'https://www.voidrev.us/game/getauthticket';
Roblox.Endpoints.Urls['/game/edit.ashx'] = 'https://www.voidrev.us/game/edit.ashx';
Roblox.Endpoints.Urls['/game/getauthticket'] = 'https://www.voidrev.us/game/getauthticket';
Roblox.Endpoints.Urls['/game/placelauncher.ashx'] = 'https://www.voidrev.us/game/placelauncher.ashx';
Roblox.Endpoints.Urls['/game/preloader'] = 'https://www.voidrev.us/game/preloader';
Roblox.Endpoints.Urls['/game/report-stats'] = 'https://www.voidrev.us/game/report-stats';
Roblox.Endpoints.Urls['/game/report-event'] = 'https://www.voidrev.us/game/report-event';
Roblox.Endpoints.Urls['/game/updateprerollcount'] = 'https://www.voidrev.us/game/updateprerollcount';
Roblox.Endpoints.Urls['/login/default.aspx'] = 'https://www.voidrev.us/login/default.aspx';
Roblox.Endpoints.Urls['/my/character.aspx'] = 'https://www.voidrev.us/my/character.aspx';
Roblox.Endpoints.Urls['/my/money.aspx'] = 'https://www.voidrev.us/my/money.aspx';
Roblox.Endpoints.Urls['/chat/chat'] = 'https://www.voidrev.us/chat/chat';
Roblox.Endpoints.Urls['/presence/users'] = 'https://www.voidrev.us/presence/users';
Roblox.Endpoints.Urls['/presence/user'] = 'https://www.voidrev.us/presence/user';
Roblox.Endpoints.Urls['/friends/list'] = 'https://www.voidrev.us/friends/list';
Roblox.Endpoints.Urls['/navigation/getCount'] = 'https://www.voidrev.us/navigation/getCount';
Roblox.Endpoints.Urls['/catalog/browse.aspx'] = 'https://www.voidrev.us/catalog/browse.aspx';
Roblox.Endpoints.Urls['/catalog/html'] = 'https://www.voidrev.us/catalog/html';
Roblox.Endpoints.Urls['/catalog/json'] = 'https://www.voidrev.us/catalog/json';
Roblox.Endpoints.Urls['/catalog/contents'] = 'https://www.voidrev.us/catalog/contents';
Roblox.Endpoints.Urls['/catalog/lists.aspx'] = 'https://www.voidrev.us/catalog/lists.aspx';
Roblox.Endpoints.Urls['/asset-hash-thumbnail/image'] = 'https://www.voidrev.us/asset-hash-thumbnail/image';
Roblox.Endpoints.Urls['/asset-hash-thumbnail/json'] = 'https://www.voidrev.us/asset-hash-thumbnail/json';
Roblox.Endpoints.Urls['/asset-thumbnail-3d/json'] = 'https://www.voidrev.us/asset-thumbnail-3d/json';
Roblox.Endpoints.Urls['/asset-thumbnail/image'] = 'https://www.voidrev.us/asset-thumbnail/image';
Roblox.Endpoints.Urls['/asset-thumbnail/json'] = 'https://www.voidrev.us/asset-thumbnail/json';
Roblox.Endpoints.Urls['/asset-thumbnail/url'] = 'https://www.voidrev.us/asset-thumbnail/url';
Roblox.Endpoints.Urls['/asset/request-thumbnail-fix'] = 'https://www.voidrev.us/asset/request-thumbnail-fix';
Roblox.Endpoints.Urls['/avatar-thumbnail-3d/json'] = 'https://www.voidrev.us/avatar-thumbnail-3d/json';
Roblox.Endpoints.Urls['/avatar-thumbnail/image'] = 'https://www.voidrev.us/avatar-thumbnail/image';
Roblox.Endpoints.Urls['/avatar-thumbnail/json'] = 'https://www.voidrev.us/avatar-thumbnail/json';
Roblox.Endpoints.Urls['/avatar-thumbnails'] = 'https://www.voidrev.us/avatar-thumbnails';
Roblox.Endpoints.Urls['/avatar/request-thumbnail-fix'] = 'https://www.voidrev.us/avatar/request-thumbnail-fix';
Roblox.Endpoints.Urls['/bust-thumbnail/json'] = 'https://www.voidrev.us/bust-thumbnail/json';
Roblox.Endpoints.Urls['/group-thumbnails'] = 'https://www.voidrev.us/group-thumbnails';
Roblox.Endpoints.Urls['/groups/getprimarygroupinfo.ashx'] = 'https://www.voidrev.us/groups/getprimarygroupinfo.ashx';
Roblox.Endpoints.Urls['/headshot-thumbnail/json'] = 'https://www.voidrev.us/headshot-thumbnail/json';
Roblox.Endpoints.Urls['/item-thumbnails'] = 'https://www.voidrev.us/item-thumbnails';
Roblox.Endpoints.Urls['/outfit-thumbnail/json'] = 'https://www.voidrev.us/outfit-thumbnail/json';
Roblox.Endpoints.Urls['/place-thumbnails'] = 'https://www.voidrev.us/place-thumbnails';
Roblox.Endpoints.Urls['/thumbnail/asset/'] = 'https://www.voidrev.us/thumbnail/asset/';
Roblox.Endpoints.Urls['/thumbnail/avatar-headshot'] = 'https://www.voidrev.us/thumbnail/avatar-headshot';
Roblox.Endpoints.Urls['/thumbnail/avatar-headshots'] = 'https://www.voidrev.us/thumbnail/avatar-headshots';
Roblox.Endpoints.Urls['/thumbnail/user-avatar'] = 'https://www.voidrev.us/thumbnail/user-avatar';
Roblox.Endpoints.Urls['/thumbnail/resolve-hash'] = 'https://www.voidrev.us/thumbnail/resolve-hash';
Roblox.Endpoints.Urls['/thumbnail/place'] = 'https://www.voidrev.us/thumbnail/place';
Roblox.Endpoints.Urls['/thumbnail/get-asset-media'] = 'https://www.voidrev.us/thumbnail/get-asset-media';
Roblox.Endpoints.Urls['/thumbnail/remove-asset-media'] = 'https://www.voidrev.us/thumbnail/remove-asset-media';
Roblox.Endpoints.Urls['/thumbnail/set-asset-media-sort-order'] = 'https://www.voidrev.us/thumbnail/set-asset-media-sort-order';
Roblox.Endpoints.Urls['/thumbnail/place-thumbnails'] = 'https://www.voidrev.us/thumbnail/place-thumbnails';
Roblox.Endpoints.Urls['/thumbnail/place-thumbnails-partial'] = 'https://www.voidrev.us/thumbnail/place-thumbnails-partial';
Roblox.Endpoints.Urls['/thumbnail_holder/g'] = 'https://www.voidrev.us/thumbnail_holder/g';
Roblox.Endpoints.Urls['/users/{id}/profile'] = 'https://www.voidrev.us/users/{id}/profile';
Roblox.Endpoints.Urls['/service-workers/push-notifications'] = 'https://www.voidrev.us/service-workers/push-notifications';
Roblox.Endpoints.Urls['/notification-stream/notification-stream-data'] = 'https://www.voidrev.us/notification-stream/notification-stream-data';
Roblox.Endpoints.Urls['/api/friends/acceptfriendrequest'] = 'https://www.voidrev.us/api/friends/acceptfriendrequest';
Roblox.Endpoints.Urls['/api/friends/declinefriendrequest'] = 'https://www.voidrev.us/api/friends/declinefriendrequest';
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
<body id="rbx-body" class="" data-performance-relative-value="0.000" data-internal-page-name="" data-send-event-percentage="0.00">
<div id="roblox-linkify" data-enabled="true" data-regex="(https?\:\/\/)?(?:www\.)?([a-z0-9\-]{2,}\.)*(((m|de|www|web|api|blog|wiki|help|corp|polls|bloxcon|developer|devforum|forum)\.idk16\.cf|robloxlabs\.com)|(www\.shoproblox\.com))((\/[A-Za-z0-9-+&amp;@#\/%?=~_|!:,.;]*)|(\b|\s))" data-regex-flags="gm" data-as-http-regex="((blog|wiki|[^.]help|corp|polls|bloxcon|developer|devforum)\.roblox\.com|robloxlabs\.com)">
</div>
<div id="image-retry-data" data-image-retry-max-times="10" data-image-retry-timer="1500">
</div>
<div id="http-retry-data" data-http-retry-max-timeout="0" data-http-retry-base-timeout="0">
</div>
<div id="fb-root"></div>
<div class="nav-container no-gutter-ads">
<div id="AdvertisingLeaderboard">
<iframe name="Roblox_Catalog_Top_728x90" allowtransparency="true" frameborder="0" height="110" scrolling="no" src="https://www.voidrev.us/user-sponsorship/?id=3" width="728" data-js-adtype="iframead"></iframe>
</div>
<div id="BodyWrapper" class="">
<div id="RepositionBody">
<div id="Body" class="body-width">
<div id="TosAgreementInfo" data-terms-check-needed="True">
</div>
<div id="DevelopTabs" class="tab-container">
<div id="MyCreationsTabLink" class="tab-active" data-url="/develop">
My Creations
</div>
<div id="LibraryTabLink" onclick="window.location.href = 'https://www.voidrev.us/develop/library/'" class="">
Library
</div>
</div>
<div>
<div id="MyCreationsTab" class="tab-active">
<div class="BuildPageContent" data-groupid="">
<input id="assetTypeId" name="assetTypeId" type="hidden" value="">
<table id="build-page" data-asset-type-id="" data-edit-opens-studio="True">
<tbody>
<tr>
<td class="menu-area divider-right">
<a href="https://www.voidrev.us/develop?Page=universes" class="tab-item <?if($_GET['Page'] == 'universes'){echo'tab-item-selected';}?>">Games</a>
<a href="https://www.voidrev.us/develop?Page=models" class="tab-item <?if($_GET['Page'] == 'models'){echo'tab-item-selected';}?>">Models</a>
<a href="https://www.voidrev.us/develop?Page=decals" class="tab-item <?if($_GET['Page'] == 'decals'){echo'tab-item-selected';}?>">Decals</a>
<a href="https://www.voidrev.us/develop?Page=badges" class="tab-item <?if($_GET['Page'] == 'badges'){echo'tab-item-selected';}?>">Badges</a>
<a href="https://www.voidrev.us/develop?Page=game-passes" class="tab-item <?if($_GET['Page'] == 'game-passes'){echo'tab-item-selected';}?>">Passes</a>
<a href="https://www.voidrev.us/develop?Page=audios" class="tab-item <?if($_GET['Page'] == 'audios'){echo'tab-item-selected';}?>">Audio</a>
<?php
if($CanSee2020){
?>
<a href="https://www.voidrev.us/develop?Page=videos" class="tab-item <?if($_GET['Page'] == 'videos'){echo'tab-item-selected';}?>">Videos</a>
<?
}
?>
<a href="https://www.voidrev.us/develop?Page=meshes" class="tab-item <?if($_GET['Page'] == 'meshes'){echo'tab-item-selected';}?>">Meshes</a>
<a href="https://www.voidrev.us/develop?Page=userads" class="tab-item <?if($_GET['Page'] == 'userads'){echo'tab-item-selected';}?>">User Ads</a>
<a href="https://www.voidrev.us/develop?Page=shirts" class="tab-item <?if($_GET['Page'] == 'shirts'){echo'tab-item-selected';}?>">Shirts</a>
<a href="https://www.voidrev.us/develop?Page=tshirts" class="tab-item <?if($_GET['Page'] == 'tshirts'){echo'tab-item-selected';}?>">T-Shirts</a>
<a href="https://www.voidrev.us/develop?Page=pants" class="tab-item <?if($_GET['Page'] == 'pants'){echo'tab-item-selected';}?>">Pants</a>
<a href="https://www.voidrev.us/develop?Page=faces" class="tab-item <?if($_GET['Page'] == 'faces'){echo'tab-item-selected';}?>">Faces</a>
<?php if($hatcreator == 1){ ?>
<a href="https://www.voidrev.us/develop?Page=hats" class="tab-item <?if($_GET['Page'] == 'hats'){echo'tab-item-selected';}?>">Hats</a>
<a href="https://www.voidrev.us/develop?Page=gears" class="tab-item <?if($_GET['Page'] == 'gears'){echo'tab-item-selected';}?>">Gears</a>
<a href="https://www.voidrev.us/develop?Page=packages" class="tab-item <?if($_GET['Page'] == 'packages'){echo'tab-item-selected';}?>">Packages</a>
<a href="https://www.voidrev.us/develop?Page=animations" class="tab-item <?if($_GET['Page'] == 'animations'){echo'tab-item-selected';}?>">Animations</a>
<a href="https://www.voidrev.us/develop?Page=emotes" class="tab-item tab-item-disabled <?if($_GET['Page'] == 'emotes'){echo'tab-item-selected';}?>">Emotes</a>
<? } ?>
</td>
<?php if($_GET['Page'] == 'universes'){ ?>
<td class="content-area ">
<a id="CreatePlace" href="https://www.voidrev.us/develop/?Page=universes&CreateGame=true" role="button" class="create-new-button btn-medium btn-primary">Create New Game</a>
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Games</h2>
<span class="aside-text"></span>
<label class="checkbox-label active-only-checkbox"><input type="checkbox">Show Public
Only</label>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<?php
$gamequery = $con->prepare("SELECT id,name,icon,active FROM `games` WHERE `creatorid` = :creatorid ORDER BY updated DESC");
$gamequery->execute(['creatorid' => $uID]);
while($games = $gamequery->fetch()) {
$name = $games['name'];
$id = $games['id'];
$icon = getPlaceIcon($con,$id,true);
?>
<table class="item-table" data-item-id="<?=$id;?>" data-rootplace-id="<?=$id;?>" data-configure-url="https://www.voidrev.us/universes/configure?id=<?=$id;?>" data-configure-localization-url="https://www.voidrev.us/localization/games/<?=$id;?>/configure" data-create-badge-url="https://www.voidrev.us/develop?selectedPlaceId=<?=$id;?>&amp;View=21" data-create-gamepass-url="https://www.voidrev.us/develop?selectedPlaceId=<?=$id;?>&amp;View=34" data-developerstats-url="https://create.voidrev.us/creations/experiences/<?=$id;?>/stats" data-advertise-url="https://www.voidrev.us/user-ads/create?targetId=<?=$id;?>&amp;targetType=Asset" data-activate-universe-url="https://www.voidrev.us/v1/universes/<?=$id;?>/activate" data-deactivate-universe-url="https://www.voidrev.us/v1/universes/<?=$id;?>/deactivate" data-type="universes">
<tbody>
<tr>
<td class="image-col universe-image-col" style="text-align: center">
<a href="https://www.voidrev.us/games/<?=$id;?>/<?echo NoXSSPlz(str_replace(" ","-",$name));?>" class="game-image">
<img src="https://www.voidrev.us/img/games/<?=$icon;?>s.png" alt="<?echo NoXSSPlz($name);?>">
</a>
</td>
<td class="universe-name-col">
<a class="title" href="https://www.voidrev.us/games/<?=$id;?>/<?echo NoXSSPlz(str_replace(" ","-",$name));?>"><?echo NoXSSPlz($name);?></a>
<table class="details-table">
<tbody>
<tr>
</tr>
<tr class="activate-cell">
<td class="ad-activate-cell"><a class="place-<?php if($games['active'] == 1){echo"active";}else{echo"inactive";} ?> runnable" onclick="location.replace('https://www.voidrev.us/develop/?Page=universes&remove=<?=$id;?>');"><?php if($games['active'] == 1){echo"Public";}else{echo"Private";} ?></a></td>
</tr>
</tbody>
</table>
</td>
<td class="edit-col">
<a class="roblox-edit-button btn-control btn-control-large" href="javascript:;">Edit</a>
</td>
<td class="menu-col">
</td>
</tr>
</tbody>
</table>
<div class="separator"></div>
<? } ?>
<div class="GenericModal modalPopup unifiedModal smallModal" style="display: none;">
<div class="Title"></div>
<div class="GenericModalBody">
<div>
<div class="ImageContainer">
<img class="GenericModalImage" alt="generic image">
</div>
<div class="Message"></div>
</div>
<div class="GenericModalButtonContainer">
<a class="ImageButton btn-neutral btn-large roblox-ok">OK</a>
</div>
</div>
</div>
<script type="text/javascript">
Roblox = Roblox || {};
Roblox.BuildPage = Roblox.BuildPage || {};
Roblox.BuildPage.AlertURL =
"https://www.voidrev.us/43ac54175f3f3cd403536fedd9170c10.png";
</script>
</div>
</td>
<? } ?>
<?php if($_GET['Page'] == 'audios'){ ?>
<td class="content-area ">
<h2>Create a Audio</h2>
<iframe id="upload-iframe" class="place-specific-assets my-upload-iframe" src="/build/upload?assetTypeId=3&amp;GroupId=&amp;targetPlaceId=" frameborder="0" scrolling="no" data-target-universe-id=""></iframe>
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Audios</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<?php
$audioquery = $con->prepare("SELECT * FROM `library` WHERE `type`='item2' AND `type2`='Sound' AND `creatorid` = :creatorid ORDER BY updated DESC");
$audioquery->execute(['creatorid' => $uID]);
while($audios = $audioquery->fetch()) {
$name = $audios['name'];
$id = $audios['id'];
$sold = $audios['sold'];
$date = $audios['updated'];
?>
<table class="item-table" data-item-id="<?=$id;?>" data-type="image" style="">
<tbody>
<tr>
<td class="image-col">
<a href="https://www.voidrev.us/library?id=<?=$id;?>" class="item-image"><img class="" src="https://www.voidrev.us<?=getModelThumbnail($con,$id);?>"></a>
</td>
<td class="name-col">
<a class="title" href="https://www.voidrev.us/library?id=<?=$id;?>"><?echo NoXSSPlz($name);?></a>
<table class="details-table">
<tbody>
<tr>
<td class="item-date">
<span>Updated</span><?php echo date("m/d/Y", $date); ?>
</td>
</tr>
</tbody>
</table>
</td>
<td class="stats-col">
<div class="totals-label">Total Sales:
<span><?echo ($sold);?></span></div>
<div class="totals-label">Last 7 days:
<span>?</span></div>
</td>
<td class="menu-col">
<div class="gear-button-wrapper">
<a href="#" class="gear-button"></a>
</div>
</td>
</tr>
</tbody>
</table>
<? } ?>
</div>
<div class="build-loading-container" style="display: none;">
<div class="buildpage-loading-container">
<img alt="^_^" class="" src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif">
</div>
</div>
</td>
<? } ?>
<?php if($_GET['Page'] == 'userads'){ ?>
<td class="content-area ">
<h2>Create an Ad</h2>
<iframe id="upload-iframe" class="place-specific-assets my-upload-iframe" src="/build/upload?assetTypeId=1&amp;GroupId=&amp;targetPlaceId=" frameborder="0" scrolling="no" data-target-universe-id=""></iframe>
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">User Ads</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<?php
$adsquery = $con->prepare("SELECT * FROM `ads` WHERE `creatorid` = :creatorid ORDER BY id DESC");
$adsquery->execute(['creatorid' => $uID]);
while($ads = $adsquery->fetch()) {
$name = $ads['name'];
$id = $ads['id'];
$sold = $ads['robuxspent'];
$clicks = $ads['clicks'];
$type = $ads['assetType'];
$image = $ads['randident'];
$assetId = $ads['assetId'];
if($type == "Game"){
$link = "https://www.voidrev.us/games/".$id."/";
$gamesquery = $con->prepare("SELECT id,name FROM `games` WHERE `id` = :id");
$gamesquery->execute(['id' => $assetId]);
$games = $gamesquery->fetch();
$gamename = $games['name'];
}else{
$link = "https://www.voidrev.us/library/?id=".$id."";
$gamesquery = $con->prepare("SELECT * FROM `library` WHERE `id` = :id");
$gamesquery->execute(['id' => $assetId]);
$games = $gamesquery->fetch();
$gamename = $games['name'];
}
?>
<div class="items-container ">
<div id="dataHolder" data-minrobuxbid="15">
<table class="item-table" data-item-id="<?=$id;?>" data-type="image" data-runnable="True" data-cost-per-impression="0" data-ad-type="Banner">
<tbody><tr>
<td class="image-col" title="<?php echo NoXSSPlz($name);?>" rowspan="3">
<a href="<?=$link;?>" class="item-image ad-image"><img class="" src="/img/ads/<?=$image;?>.png"></a>
</td>
<span class="title"><?php echo NoXSSPlz($name);?></span>
(for <a class="title" href="<?=$link;?>"><?php echo NoXSSPlz($gamename);?></a>)
</td>
</tr>
<tr>
<td class="stats-col">
<div class="totals-label" title="Total Clicks">Total Clicks: <span>?</span></div>
</td>
<td class="stats-col">
<div class="totals-label" title="Total Bid">Total Bid: <span>?</span></div>
</td>
</tr>
<tr>
<td class="ad-activate-cell"><a class="place-<?php if($ads['active'] == 1){echo"active";}else{echo"inactive";} ?> runnable" onclick="location.replace('https://www.voidrev.us/develop/?Page=userads&remove=<?=$id;?>');"><?php if($ads['active'] == 1){echo"Running";}else{echo"Not running";} ?><?php if($ads['approved'] == 0){echo" but pending approval.";} ?></a></td>
</tr>
</tbody></table>
<div class="separator"></div>
</div>
<div class="build-loading-container" style="display: none">
<div class="buildpage-loading-container">
<img alt="^_^" class="" src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif">
</div>
</div>
</div>
<? } ?>
</div>
<div class="build-loading-container" style="display: none;">
<div class="buildpage-loading-container">
<img alt="^_^" class="" src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif">
</div>
</div>
</td>
<? } ?>
<?php if($_GET['Page'] == 'videoads'){ ?>
<td class="content-area ">
<h2>Create an Video Ad</h2>
<iframe id="upload-iframe" class="place-specific-assets my-upload-iframe" src="/build/upload?assetTypeId=62&amp;GroupId=&amp;targetPlaceId=" frameborder="0" scrolling="no" data-target-universe-id=""></iframe>
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Video Ads</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<?php
$adsquery = $con->prepare("SELECT * FROM `videoads` WHERE `creatorid` = :creatorid ORDER BY id DESC");
$adsquery->execute(['creatorid' => $uID]);
while($ads = $adsquery->fetch()) {
$name = $ads['name'];
$type = $ads['assetType'];
$id = $ads['id'];
$assetId = $ads['assetId'];
if($type == "Game"){
$link = "https://www.voidrev.us/games/".$assetId."/";
$gamesquery = $con->prepare("SELECT id,name FROM `games` WHERE `id` = :id");
$gamesquery->execute(['id' => $assetId]);
$games = $gamesquery->fetch();
$gamename = $games['name'];
}else{
$link = "https://www.voidrev.us/library/?id=".$assetId."";
$gamesquery = $con->prepare("SELECT * FROM `library` WHERE `id` = :id");
$gamesquery->execute(['id' => $assetId]);
$games = $gamesquery->fetch();
$gamename = $games['name'];
}
?>
<div class="items-container ">
<div id="dataHolder" data-minrobuxbid="15">
<table class="item-table" data-item-id="<?=$id;?>" data-type="image" data-runnable="True" data-cost-per-impression="0" data-ad-type="Banner">
<tbody><tr>
<td class="image-col" title="<?php echo NoXSSPlz($name);?>" rowspan="3">
<a href="<?=$link;?>" class="item-image ad-image"></a>
</td>
<span class="title"><?php echo NoXSSPlz($name);?></span>
(for <a class="title" href="<?=$link;?>"><?php echo NoXSSPlz($gamename);?></a>)
</td>
</tr>
<tr>
<td class="ad-activate-cell"><a class="place-<?php if($ads['active'] == 1){echo"active";}else{echo"inactive";} ?> runnable" onclick="location.replace('https://www.voidrev.us/develop/?Page=videoads&remove=<?=$id;?>');"><?php if($ads['active'] == 1){echo"Running";}else{echo"Not running";} ?><?php if($ads['approved'] == 0){echo" but pending approval.";} ?></a></td>
</tr>
</tbody></table>
<div class="separator"></div>
</div>
<div class="build-loading-container" style="display: none">
<div class="buildpage-loading-container">
<img alt="^_^" class="" src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif">
</div>
</div>
</div>
<? } ?>
</div>
<div class="build-loading-container" style="display: none;">
<div class="buildpage-loading-container">
<img alt="^_^" class="" src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif">
</div>
</div>
</td>
<? } ?>
<?php if($_GET['Page'] == 'models'){ ?>
<td class="content-area ">
<h2>Models</h2>
<table class="section-header">
<tbody>
<tr>
</tr>
</tbody>
</table>
<div class="items-container ">
<?php
$modelquery = $con->prepare("SELECT * FROM `library` WHERE `type`='item2' AND `type2`='Model' AND `creatorid` = :creatorid ORDER BY updated DESC");
$modelquery->execute(['creatorid' => $uID]);
while($models = $modelquery->fetch()) {
$name = $models['name'];
$id = $models['id'];
$sold = $models['sold'];
$date = $models['updated'];
?>
<table class="item-table" data-item-id="<?=$id;?>" data-type="image" style="">
<tbody>
<tr>
<td class="image-col">
<a href="https://www.voidrev.us/library?id=<?=$id;?>" class="item-image"><img class="" src="https://www.voidrev.us<?=getModelThumbnail($con,$id);?>"></a>
</td>
<td class="name-col">
<a class="title" href="https://www.voidrev.us/library?id=<?=$id;?>"><?echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8');?></a>
<table class="details-table">
<tbody>
<tr>
<td class="item-date">
<span>Updated</span><?php echo date("m/d/Y", $date); ?>
</td>
</tr>
</tbody>
</table>
</td>
<td class="stats-col">
<div class="totals-label">Total Sales:
<span><?echo ($sold);?></span></div>
<div class="totals-label">Last 7 days:
<span>?</span></div>
</td>
<td class="menu-col">
<div class="gear-button-wrapper">
<a href="#" class="gear-button"></a>
</div>
</td>
</tr>
</tbody>
</table>
<? } ?>
</div>
<div class="build-loading-container" style="display: none;">
<div class="buildpage-loading-container">
<img alt="^_^" class="" src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif">
</div>
</div>
</td>
<? } ?>
<? if($_GET['Page'] == "decals"){ ?>
<td class="content-area ">
<h2>Create a Decal</h2>
<iframe id="upload-iframe" class="place-specific-assets my-upload-iframe" src="/build/upload?assetTypeId=13&amp;GroupId=&amp;targetPlaceId=" frameborder="0" scrolling="no" data-target-universe-id=""></iframe>
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Decals</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
</div>
<?php
$decalquery = $con->prepare("SELECT * FROM `library` WHERE `type`='item2' AND `type2`='Decal' AND `creatorid` = :creatorid ORDER BY updated DESC");
$decalquery->execute(['creatorid' => $uID]);
while($decals = $decalquery->fetch()) {
$name = $decals['name'];
$id = $decals['id'];
$sold = $decals['sold'];
$date = $decals['updated'];
?>
<table class="item-table" data-item-id="<?=$id;?>" data-type="image" style="">
<tbody>
<tr>
<td class="image-col">
<a href="https://www.voidrev.us/library?id=<?=$id;?>" class="item-image"><img class="" src="https://www.voidrev.us<?=getModelThumbnail($con,$id);?>"></a>
</td>
<td class="name-col">
<a class="title" href="https://www.voidrev.us/library?id=<?=$id;?>"><?echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8');?></a>
<table class="details-table">
<tbody>
<tr>
<td class="item-date">
<span>Updated</span><?php echo date("m/d/Y", $date); ?>
</td>
</tr>
</tbody>
</table>
</td>
<td class="stats-col">
<div class="totals-label">Total Sales:
<span><?echo ($sold);?></span></div>
<div class="totals-label">Last 7 days:
<span>?</span></div>
</td>
<td class="menu-col">
<div class="gear-button-wrapper">
<a href="#" class="gear-button"></a>
</div>
</td>
</tr>
</tbody>
</table>
<? } ?>
<? } ?>
<? if($_GET['Page'] == "videos" && $CanSee2020){ ?>
<td class="content-area ">
<h2>Create a Video</h2>
<iframe id="upload-iframe" class="place-specific-assets my-upload-iframe" src="/build/upload?assetTypeId=63&amp;GroupId=&amp;targetPlaceId=" frameborder="0" scrolling="no" data-target-universe-id=""></iframe>
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Videos</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
</div>
<?php
$videoquery = $con->prepare("SELECT * FROM `library` WHERE `type`='item2' AND `type2`='Video' AND `creatorid` = :creatorid ORDER BY updated DESC");
$videoquery->execute(['creatorid' => $uID]);
while($videos = $videoquery->fetch()) {
$name = $videos['name'];
$id = $videos['id'];
$sold = $videos['sold'];
$date = $videos['updated'];
$realfileid = $videos['realfileid'];
?>
<table class="item-table" data-item-id="<?=$id;?>" data-type="image" style="">
<tbody>
<tr>
<td class="image-col">
<a href="https://www.voidrev.us/library?id=<?=$id;?>" class="item-image"><video style="max-width:100px;" src="https://www.voidrev.us/asset/?id=<?=$realfileid;?>" controls preload="none"></video></a>
</td>
<td class="name-col">
<a class="title" href="https://www.voidrev.us/library?id=<?=$id;?>"><?echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8');?></a>
<table class="details-table">
<tbody>
<tr>
<td class="item-date">
<span>Updated</span><?php echo date("m/d/Y", $date); ?>
</td>
</tr>
</tbody>
</table>
</td>
<td class="stats-col">
<div class="totals-label">Approval Status:
<span><?php if($videos['approved'] == 1){echo"Approved";}else{echo"Pending";};?></span></div>
</td>
<td class="menu-col">
<div class="gear-button-wrapper">
<a href="#" class="gear-button"></a>
</div>
</td>
</tr>
</tbody>
</table>
<? } ?>
<? } ?>
<?php if($_GET['Page'] == 'shirts'){ ?>
<td class="content-area ">
<h2>Create a Shirt</h2>
<iframe id="upload-iframe" class="place-specific-assets my-upload-iframe" src="/build/upload?assetTypeId=11&amp;GroupId=&amp;targetPlaceId=" frameborder="0" scrolling="no" data-target-universe-id=""></iframe>
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Shirts</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<?php
$shirtquery = $con->prepare("SELECT * FROM `library` WHERE `type`='item' AND `type2`='Shirt' AND `creatorid` = :creatorid ORDER BY updated DESC");
$shirtquery->execute(['creatorid' => $uID]);
while($shirts = $shirtquery->fetch()) {
$name = $shirts['name'];
$id = $shirts['id'];
$sold = $shirts['sold'];
$date = $shirts['updated'];
?>
<table class="item-table" data-item-id="<?=$id;?>" data-type="image" style="">
<tbody>
<tr>
<td class="image-col">
<a href="https://www.voidrev.us/library?id=<?=$id;?>" class="item-image"><img class="" src="https://www.voidrev.us<?=getModelThumbnail($con,$id);?>"></a>
</td>
<td class="name-col">
<a class="title" href="https://www.voidrev.us/library?id=<?=$id;?>"><?echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8');?></a>
<table class="details-table">
<tbody>
<tr>
<td class="item-date">
<span>Updated</span><?php echo date("m/d/Y", $date); ?>
</td>
</tr>
</tbody>
</table>
</td>
<td class="stats-col">
<div class="totals-label">Total Sales:
<span><?echo ($sold);?></span></div>
<div class="totals-label">Last 7 days:
<span>?</span></div>
</td>
<td class="menu-col">
<div class="gear-button-wrapper">
<a href="#" class="gear-button"></a>
</div>
</td>
</tr>
</tbody>
</table>
<?php }}
if($_GET['Page'] == 'tshirts'){ ?>
<td class="content-area ">
<h2>Create a T-Shirt</h2>
<iframe id="upload-iframe" class="place-specific-assets my-upload-iframe" src="/build/upload?assetTypeId=2&amp;GroupId=&amp;targetPlaceId=" frameborder="0" scrolling="no" data-target-universe-id=""></iframe>
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">T-Shirts</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<?php
$tshirtquery = $con->prepare("SELECT * FROM `library` WHERE `type`='item' AND `type2`='TShirt' AND `creatorid` = :creatorid ORDER BY updated DESC");
$tshirtquery->execute(['creatorid' => $uID]);
while($tshirts = $tshirtquery->fetch()) {
$name = $tshirts['name'];
$id = $tshirts['id'];
$sold = $tshirts['sold'];
$date = $tshirts['updated'];
?>
<table class="item-table" data-item-id="<?=$id;?>" data-type="image" style="">
<tbody>
<tr>
<td class="image-col">
<a href="https://www.voidrev.us/library?id=<?=$id;?>" class="item-image"><img class="" src="https://www.voidrev.us<?=getModelThumbnail($con,$id);?>"></a>
</td>
<td class="name-col">
<a class="title" href="https://www.voidrev.us/library?id=<?=$id;?>"><?echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8');?></a>
<table class="details-table">
<tbody>
<tr>
<td class="item-date">
<span>Updated</span><?php echo date("m/d/Y", $date); ?>
</td>
</tr>
</tbody>
</table>
</td>
<td class="stats-col">
<div class="totals-label">Total Sales:
<span><?echo ($sold);?></span></div>
<div class="totals-label">Last 7 days:
<span>?</span></div>
</td>
<td class="menu-col">
<div class="gear-button-wrapper">
<a href="#" class="gear-button"></a>
</div>
</td>
</tr>
</tbody>
</table>
<?php }}
if($_GET['Page'] == 'animations' && $hatcreator == 1){ ?>
<td class="content-area ">
<h2>Create an Animation</h2>
<iframe id="upload-iframe" class="place-specific-assets my-upload-iframe" src="/build/upload?assetTypeId=24&amp;GroupId=&amp;targetPlaceId=" frameborder="0" scrolling="no" data-target-universe-id=""></iframe>
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Animations</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<?php
$animationquery = $con->prepare("SELECT * FROM `library` WHERE `type`='item' AND `type2`='Animation' AND `creatorid` = :creatorid ORDER BY updated DESC");
$animationquery->execute(['creatorid' => $uID]);
while($animations = $animationquery->fetch()) {
$name = $animations['name'];
$id = $animations['id'];
$sold = $animations['sold'];
$date = $animations['updated'];
?>
<table class="item-table" data-item-id="<?=$id;?>" data-type="image" style="">
<tbody>
<tr>
<td class="image-col">
<a href="https://www.voidrev.us/library?id=<?=$id;?>" class="item-image"><img class="" src="https://www.voidrev.us<?=getModelThumbnail($con,$id);?>"></a>
</td>
<td class="name-col">
<a class="title" href="https://www.voidrev.us/library?id=<?=$id;?>"><?echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8');?></a>
<table class="details-table">
<tbody>
<tr>
<td class="item-date">
<span>Updated</span><?php echo date("m/d/Y", $date); ?>
</td>
</tr>
</tbody>
</table>
</td>
<td class="stats-col">
<div class="totals-label">Total Sales:
<span><?echo ($sold);?></span></div>
<div class="totals-label">Last 7 days:
<span>?</span></div>
</td>
<td class="menu-col">
<div class="gear-button-wrapper">
<a href="#" class="gear-button"></a>
</div>
</td>
</tr>
</tbody>
</table>
<?php }}
if($_GET['Page'] == 'meshes'){ ?>
<td class="content-area ">
<h2>Create a Mesh</h2>
<iframe id="upload-iframe" class="place-specific-assets my-upload-iframe" src="/build/upload?assetTypeId=4&amp;GroupId=&amp;targetPlaceId=" frameborder="0" scrolling="no" data-target-universe-id=""></iframe>
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Meshes</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<?php
$tshirtquery = $con->prepare("SELECT * FROM `library` WHERE `type`='item2' AND `type2`='Mesh' AND `creatorid` = :creatorid ORDER BY updated DESC");
$tshirtquery->execute(['creatorid' => $uID]);
while($tshirts = $tshirtquery->fetch()) {
$name = $tshirts['name'];
$id = $tshirts['id'];
$sold = $tshirts['sold'];
$date = $tshirts['updated'];
?>
<table class="item-table" data-item-id="<?=$id;?>" data-type="image" style="">
<tbody>
<tr>
<td class="image-col">
<a href="https://www.voidrev.us/library?id=<?=$id;?>" class="item-image"><img class="" src="https://www.voidrev.us<?=getModelThumbnail($con,$id);?>"></a>
</td>
<td class="name-col">
<a class="title" href="https://www.voidrev.us/library?id=<?=$id;?>"><?echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8');?></a>
<table class="details-table">
<tbody>
<tr>
<td class="item-date">
<span>Updated</span><?php echo date("m/d/Y", $date); ?>
</td>
</tr>
</tbody>
</table>
</td>
<td class="stats-col">
<div class="totals-label">Total Sales:
<span><?echo ($sold);?></span></div>
<div class="totals-label">Last 7 days:
<span>?</span></div>
</td>
<td class="menu-col">
<div class="gear-button-wrapper">
<a href="#" class="gear-button"></a>
</div>
</td>
</tr>
</tbody>
</table>
<?php }}
if($hatcreator == 1){
if($_GET['Page'] == 'hats'){ ?>
<td class="content-area ">
<h2>Create a Hat</h2>
<iframe id="upload-iframe" class="place-specific-assets my-upload-iframe" src="/build/upload?assetTypeId=8&amp;GroupId=&amp;targetPlaceId=" frameborder="0" scrolling="no" data-target-universe-id=""></iframe>
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Hats</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<?php
$hatquery = $con->prepare("SELECT * FROM `library` WHERE `type`='item' AND `type2`='Hat' AND `creatorid` = :creatorid ORDER BY updated DESC");
$hatquery->execute(['creatorid' => $uID]);
while($hats = $hatquery->fetch()) {
$name = $hats['name'];
$id = $hats['id'];
$sold = $hats['sold'];
$date = $hats['updated'];
?>
<table class="item-table" data-item-id="<?=$id;?>" data-type="image" style="">
<tbody>
<tr>
<td class="image-col">
<a href="https://www.voidrev.us/library?id=<?=$id;?>" class="item-image"><img class="" src="https://www.voidrev.us<?=getModelThumbnail($con,$id);?>"></a>
</td>
<td class="name-col">
<a class="title" href="https://www.voidrev.us/library?id=<?=$id;?>"><?echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8');?></a>
<table class="details-table">
<tbody>
<tr>
<td class="item-date">
<span>Updated</span><?php echo date("m/d/Y", $date); ?>
</td>
</tr>
</tbody>
</table>
</td>
<td class="stats-col">
<div class="totals-label">Total Sales:
<span><?echo ($sold);?></span></div>
<div class="totals-label">Last 7 days:
<span>?</span></div>
</td>
<td class="menu-col">
<div class="gear-button-wrapper">
<a href="#" class="gear-button"></a>
</div>
</td>
</tr>
</tbody>
</table>
<?php }}
if($_GET['Page'] == 'gears'){ ?>
<td class="content-area ">
<h2>Create a Gear</h2>
<iframe id="upload-iframe" class="place-specific-assets my-upload-iframe" src="/build/upload?assetTypeId=19&amp;GroupId=&amp;targetPlaceId=" frameborder="0" scrolling="no" data-target-universe-id=""></iframe>
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Gears</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<?php
$gearquery = $con->prepare("SELECT * FROM `library` WHERE `type`='item' AND `type2`='Gear' AND `creatorid` = :creatorid ORDER BY updated DESC");
$gearquery->execute(['creatorid' => $uID]);
while($gears = $gearquery->fetch()) {
$name = $gears['name'];
$id = $gears['id'];
$sold = $gears['sold'];
$date = $gears['updated'];
?>
<table class="item-table" data-item-id="<?=$id;?>" data-type="image" style="">
<tbody>
<tr>
<td class="image-col">
<a href="https://www.voidrev.us/library?id=<?=$id;?>" class="item-image"><img class="" src="https://www.voidrev.us<?=getModelThumbnail($con,$id);?>"></a>
</td>
<td class="name-col">
<a class="title" href="https://www.voidrev.us/library?id=<?=$id;?>"><?echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8');?></a>
<table class="details-table">
<tbody>
<tr>
<td class="item-date">
<span>Updated</span><?php echo date("m/d/Y", $date); ?>
</td>
</tr>
</tbody>
</table>
</td>
<td class="stats-col">
<div class="totals-label">Total Sales:
<span><?echo ($sold);?></span></div>
<div class="totals-label">Last 7 days:
<span>?</span></div>
</td>
<td class="menu-col">
<div class="gear-button-wrapper">
<a href="#" class="gear-button"></a>
</div>
</td>
</tr>
</tbody>
</table>
<?php }}
if($_GET['Page'] == 'packages'){ ?>
<td class="content-area ">
<h2>Create a Package</h2>
<iframe id="upload-iframe" class="place-specific-assets my-upload-iframe" src="/build/upload?assetTypeId=32&amp;GroupId=&amp;targetPlaceId=" frameborder="0" scrolling="no" data-target-universe-id=""></iframe>
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Package</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<?php
$packagequery = $con->prepare("SELECT * FROM `library` WHERE `type`='item' AND `type2`='Package' AND `creatorid` = :creatorid ORDER BY updated DESC");
$packagequery->execute(['creatorid' => $uID]);
while($packages = $packagequery->fetch()) {
$name = $packages['name'];
$id = $packages['id'];
$sold = $packages['sold'];
$date = $packages['updated'];
?>
<table class="item-table" data-item-id="<?=$id;?>" data-type="image" style="">
<tbody>
<tr>
<td class="image-col">
<a href="https://www.voidrev.us/library?id=<?=$id;?>" class="item-image"><img class="" src="https://www.voidrev.us<?=getModelThumbnail($con,$id);?>"></a>
</td>
<td class="name-col">
<a class="title" href="https://www.voidrev.us/library?id=<?=$id;?>"><?echo htmlspecialchars($name, ENT_QUOTES, 'UTF-8');?></a>
<table class="details-table">
<tbody>
<tr>
<td class="item-date">
<span>Updated</span><?php echo date("m/d/Y", $date); ?>
</td>
</tr>
</tbody>
</table>
</td>
<td class="stats-col">
<div class="totals-label">Total Sales:
<span><?echo ($sold);?></span></div>
<div class="totals-label">Last 7 days:
<span>?</span></div>
</td>
<td class="menu-col">
<div class="gear-button-wrapper">
<a href="#" class="gear-button"></a>
</div>
</td>
</tr>
</tbody>
</table>
<?php }}}
if($_GET['Page'] == 'pants'){ ?>
<td class="content-area ">
<h2>Create Pants</h2>
<iframe id="upload-iframe" class="place-specific-assets my-upload-iframe" src="/build/upload?assetTypeId=12&amp;GroupId=&amp;targetPlaceId=" frameborder="0" scrolling="no" data-target-universe-id=""></iframe>
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Pants</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<?php
$pantsquery = $con->prepare("SELECT * FROM `library` WHERE `type`='item' AND `type2`='Pants' AND `creatorid` = :creatorid ORDER BY updated DESC");
$pantsquery->execute(['creatorid' => $uID]);
while($pants = $pantsquery->fetch()) {
$name = $pants['name'];
$id = $pants['id'];
$sold = $pants['sold'];
$date = $pants['updated'];
?>
<table class="item-table" data-item-id="<?=$id;?>" data-type="image" style="">
<tbody>
<tr>
<td class="image-col">
<a href="https://www.voidrev.us/library?id=<?=$id;?>" class="item-image"><img class="" src="https://www.voidrev.us<?=getModelThumbnail($con,$id);?>"></a>
</td>
<td class="name-col">
<a class="title" href="https://www.voidrev.us/library?id=<?=$id;?>"><?echo NoXSSPlz($name);?></a>
<table class="details-table">
<tbody>
<tr>
<td class="item-date">
<span>Updated</span><?php echo date("m/d/Y", $date); ?>
</td>
</tr>
</tbody>
</table>
</td>
<td class="stats-col">
<div class="totals-label">Total Sales:
<span><?echo ($sold);?></span></div>
<div class="totals-label">Last 7 days:
<span>?</span></div>
</td>
<td class="menu-col">
<div class="gear-button-wrapper">
<a href="#" class="gear-button"></a>
</div>
</td>
</tr>
</tbody>
</table>
<? } ?>
</div>
<div class="build-loading-container" style="display: none;">
<div class="buildpage-loading-container">
<img alt="^_^" class="" src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif">
</div>
</div>
</td>
<? } ?>
<?php if($_GET['Page'] == 'faces'){ ?>
<td class="content-area ">
<h2>Create a Face</h2>
<iframe id="upload-iframe" class="place-specific-assets my-upload-iframe" src="/build/upload?assetTypeId=18&amp;GroupId=&amp;targetPlaceId=" frameborder="0" scrolling="no" data-target-universe-id=""></iframe>
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Faces</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<?php
$facequery = $con->prepare("SELECT * FROM `library` WHERE `type`='item' AND `type2`='Face' AND `creatorid` = :creatorid ORDER BY updated DESC");
$facequery->execute(['creatorid' => $uID]);
while($faces = $facequery->fetch()) {
$name = $faces['name'];
$id = $faces['id'];
$sold = $faces['sold'];
$date = $faces['updated'];
?>
<table class="item-table" data-item-id="<?=$id;?>" data-type="image" style="">
<tbody>
<tr>
<td class="image-col">
<a href="https://www.voidrev.us/library?id=<?=$id;?>" class="item-image"><img class="" src="https://www.voidrev.us<?=getModelThumbnail($con,$id);?>"></a>
</td>
<td class="name-col">
<a class="title" href="https://www.voidrev.us/library?id=<?=$id;?>"><?echo NoXSSPlz($name);?></a>
<table class="details-table">
<tbody>
<tr>
<td class="item-date">
<span>Updated</span><?php echo date("m/d/Y", $date); ?>
</td>
</tr>
</tbody>
</table>
</td>
<td class="stats-col">
<div class="totals-label">Total Sales:
<span><?echo ($sold);?></span></div>
<div class="totals-label">Last 7 days:
<span>?</span></div>
</td>
<td class="menu-col">
<div class="gear-button-wrapper">
<a href="#" class="gear-button"></a>
</div>
</td>
</tr>
</tbody>
</table>
<? }} ?>
<?php if($_GET['Page'] == 'game-passes'){ ?>
<td class="content-area ">
<h2>Create a Gamepass</h2>
<iframe id="upload-iframe" class="place-specific-assets my-upload-iframe" src="/build/upload?assetTypeId=34&amp;GroupId=&amp;targetPlaceId=" frameborder="0" scrolling="no" data-target-universe-id=""></iframe>
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Gamepass</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<?php
$passquery = $con->prepare("SELECT * FROM `library` WHERE `type`='item2' AND `type2`='Gamepass' AND `creatorid` = :creatorid ORDER BY updated DESC");
$passquery->execute(['creatorid' => $uID]);
while($passes = $passquery->fetch()) {
$name = $passes['name'];
$id = $passes['id'];
$sold = $passes['sold'];
$date = $passes['updated'];
?>
<table class="item-table" data-item-id="<?=$id;?>" data-type="image" style="">
<tbody>
<tr>
<td class="image-col">
<a href="https://www.voidrev.us/library?id=<?=$id;?>" class="item-image"><img class="" src="https://www.voidrev.us<?=getModelThumbnail($con,$id);?>"></a>
</td>
<td class="name-col">
<a class="title" href="https://www.voidrev.us/library?id=<?=$id;?>"><?echo NoXSSPlz($name);?></a>
<table class="details-table">
<tbody>
<tr>
<td class="item-date">
<span>Updated</span><?php echo date("m/d/Y", $date); ?>
</td>
</tr>
</tbody>
</table>
</td>
<td class="stats-col">
<div class="totals-label">Total Sales:
<span><?echo ($sold);?></span></div>
<div class="totals-label">Last 7 days:
<span>?</span></div>
</td>
<td class="menu-col">
<div class="gear-button-wrapper">
<a href="#" class="gear-button"></a>
</div>
</td>
</tr>
</tbody>
</table>
<?php
}}
if($_GET['Page'] == 'badges'){ ?>
<td class="content-area ">
<h2>Create a Badge</h2>
<iframe id="upload-iframe" class="place-specific-assets my-upload-iframe" src="/build/upload?assetTypeId=21&amp;GroupId=&amp;targetPlaceId=" frameborder="0" scrolling="no" data-target-universe-id=""></iframe>
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Badges</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<?php
$badgequery = $con->prepare("SELECT * FROM `library` WHERE `type2`='Badge' AND `creatorid` = :creatorid ORDER BY updated DESC");
$badgequery->execute(['creatorid' => $uID]);
while($badges = $badgequery->fetch()) {
$name = $badges['name'];
$id = $badges['id'];
$sold = $badges['sold'];
$date = $badges['updated'];
?>
<table class="item-table" data-item-id="<?=$id;?>" data-type="image" style="">
<tbody>
<tr>
<td class="image-col">
<a href="https://www.voidrev.us/library?id=<?=$id;?>" class="item-image"><img class="" src="https://www.voidrev.us<?=getModelThumbnail($con,$id);?>"></a>
</td>
<td class="name-col">
<a class="title" href="https://www.voidrev.us/library?id=<?=$id;?>"><?echo NoXSSPlz($name);?></a>
<table class="details-table">
<tbody>
<tr>
<td class="item-date">
<span>Updated</span><?php echo date("m/d/Y", $date); ?>
</td>
</tr>
</tbody>
</table>
</td>
<td class="stats-col">
<?php
$badgequery = $con->prepare("SELECT count(*) FROM `ownedbadges` WHERE `badgeId` = :badgeId");
$badgequery->execute(['badgeId' => $id]);
$badgecount = $badgequery->fetchColumn();
?>
<div class="totals-label">Total Won:
<span><?echo NoXSSPlz($badgecount);?></span></div>
<div class="totals-label">Yesterday:
<span>?</span></div>
</td>
<td class="menu-col">
<div class="gear-button-wrapper">
<a href="#" class="gear-button"></a>
</div>
</td>
</tr>
</tbody>
</table>
<?php }} ?>
</tr>
</tbody>
</table>
</div>
<div class="Ads_WideSkyscraper">
</div>
<script type="text/javascript">
if (typeof Roblox === "undefined") {
Roblox = {};
}
if (typeof Roblox.BuildPage === "undefined") {
Roblox.BuildPage = {};
}
Roblox.BuildPage.Resources = {
active: "Public",
inactive: "Private",
activatePlace: "Make Place Public",
editGame: "Edit Game",
ok: "OK",
robloxStudio: "Roblox Studio",
openIn: "To edit this game, open to this page in ",
placeInactive: "Make Place Private",
toBuileHere: "To build here, please activate this place by clicking the ",
inactiveButton: "Inactive button. ",
createModel: "Create Model",
toCreate: "To create models, please use ",
makeActive: "Make Public",
makeInactive: "Make Private",
purchaseComplete: "Purchase Complete!",
youHaveBid: "You have successfully bid ",
confirmBid: "Confirm the Bid",
placeBid: "Place Bid",
cancel: "Cancel",
errorOccurred: "Error Occurred",
adDeleted: "Ad Deleted",
theAdWasDeleted: "The Ad has been deleted.",
confirmDelete: "Confirm Deletion",
areYouSureDelete: "Are you sure you want to delete this Ad?",
bidRejected: "Your bid was Rejected",
bidRange: "Bid value must be a number between ",
bidRange2: "Bid value must be a number greater than ",
and: " and ",
yourRejected: "Your bid was Rejected",
estimatorExplanation: "This estimator uses data from ads run yesterday to guess how many impressions your ad will recieve.",
estimatedImpressions: "Estimated Impressions ",
makeAdBid: "Make Ad Bid",
wouldYouLikeToBid: "Would you like to bid ",
verify: "Verify",
emailVerifiedTitle: "Verify Your Email",
emailVerifiedMessage: "You must verify your email before you can work on your place. You can verify your email on the <a href='https://www.voidrev.us/my/account?confirmemail=1'>Account</a> page.",
continueText: "Continue",
profileRemoveTitle: "Remove from profile?",
profileRemoveMessage: "This game is private and listed on your profile, do you wish to remove it?",
profileAddTitle: "Add to profile?",
profileAddMessage: "This game is public, but not listed on your profile, do you wish to add it?",
deactivateTitle: "Make Game Private",
deactivateBody: "This will shut down any active servers <br /><br />Do you still want to make this game private?",
deactivateButton: "Make Private",
questionmarkImgUrl: "https://www.voidrev.us/img/Buttons/questionmark-12x12.png",
activationRequestFailed: "Request to make game public failed. Please retry in a few minutes!",
deactivationRequestFailed: "Request to make game private failed. Please retry in a few minutes!",
tooManyActiveMessage: "You have reached the maximum number of public places for your membership level. Make one of your existing places private before making this place public.",
activeSlotsMessage: "{0} of {1} public slots used"
};
</script>
</div>
<div id="AdPreviewModal" class="simplemodal-data" style="display: none;">
<div id="ConfirmationDialog" style="overflow: hidden">
<div id="AdPreviewContainer" style="overflow: hidden">
</div>
</div>
</div>
<div id="clothing-upload-fun-captcha-container">
<div id="clothing-upload-fun-captcha-backdrop"></div>
<div id="clothing-upload-fun-captcha-modal"></div>
</div>
<script type="text/javascript">
voidrev.usalogValues = voidrev.usalogValues || {};
voidrev.usalogValues.CatalogContentsUrl = "/develop/library/contents";
voidrev.usalogValues.CatalogContext = 2;
voidrev.usalogValues.CatalogContextDevelopOnly = 2;
voidrev.usalogValues.ContainerID = "LibraryTab";
$(function () {
if (Roblox && Roblox.AdsHelper && Roblox.AdsHelper
.AdRefresher) {
Roblox.AdsHelper.AdRefresher.globalCreateNewAdEnabled =
true;
Roblox.AdsHelper.AdRefresher.adRefreshRateInMilliseconds =
3000;
}
});
</script>
<div style="clear: both"></div>
</div>
</div>
</div>
</div>
</div>
<footer class="container-footer ">
<div class="footer">
<ul class="row footer-links">
<li class="footer-link">
<a href="http://www.voidrev.us" class="text-footer-nav roblox-interstitial" target="_blank">
About Us
</a>
</li>
<li class="footer-link">
<a href="https://www.voidrev.us/careers/" class="text-footer-nav roblox-interstitial" target="_blank">
Jobs
</a>
</li>
<li class=" footer-link">
<a href="https://www.voidrev.us" class="text-footer-nav" target="_blank">
Blog
</a>
</li>
<li class=" footer-link">
<a href="http://www.voidrev.us/parents" class="text-footer-nav roblox-interstitial" target="_blank">
Parents
</a>
</li>
<li class=" footer-link">
<a href="https://www.voidrev.us/help?locale=en_us" class="text-footer-nav roblox-interstitial" target="_blank">
Help
</a>
</li>
<li class=" footer-link">
<a href="https://www.voidrev.us/info/terms?locale=en_us" class="text-footer-nav" target="_blank">
Terms
</a>
</li>
<li class=" footer-link">
<a href="https://www.voidrev.us/info/privacy?locale=en_us" class="text-footer-nav privacy" target="_blank">
Privacy
</a>
</li>
</ul>
<!-- NOTE: "Roblox Corporation" is a healthcheck; be careful when updating! -->
<p class="text-footer footer-note">
&#169;2018 Roblox Corporation. Roblox, the Roblox logo, Robux, Bloxy, and Powering Imagination are among our registered and unregistered trademarks in the U.S. and other countries.
</p>
</div>
</footer>
</div>
</div>
</div>
</div>
</div>
<?php include ($_SERVER['DOCUMENT_ROOT'].'/chat.php'); ?>
<script type="text/javascript">
function urchinTracker() {}
</script>
<div id="PlaceLauncherStatusPanel" style="display:none;width:300px" data-new-plugin-events-enabled="True" data-event-stream-for-plugin-enabled="True" data-event-stream-for-protocol-enabled="True" data-is-game-launch-interface-enabled="True" data-is-protocol-handler-launch-enabled="True" data-is-user-logged-in="True" data-os-name="Windows" data-protocol-name-for-client="limb16-player" data-protocol-name-for-studio="limb16-player" data-protocol-url-includes-launchtime="true" data-protocol-detection-enabled="true">
<div class="modalPopup blueAndWhite PlaceLauncherModal" style="min-height: 160px">
<div id="Spinner" class="Spinner" style="padding:20px 0;">
<img data-delaysrc="https://www.voidrev.us/e998fb4c03e8c2e30792f2f3436e9416.gif" height="32" width="32" alt="Progress" />
</div>
<div id="status" style="min-height:40px;text-align:center;margin:5px 20px">
<div id="Starting" class="PlaceLauncherStatus MadStatusStarting" style="display:block">
Starting Roblox...
</div>
<div id="Waiting" class="PlaceLauncherStatus MadStatusField">Connecting to Players...</div>
<div id="StatusBackBuffer" class="PlaceLauncherStatus PlaceLauncherStatusBackBuffer MadStatusBackBuffer"></div>
</div>
<div style="text-align:center;margin-top:1em">
<input type="button" class="Button CancelPlaceLauncherButton translate" value="Cancel" />
</div>
</div>
</div>
<div id="ProtocolHandlerStartingDialog" style="display:none;">
<div class="modalPopup ph-modal-popup">
<div class="ph-modal-header">
</div>
<div class="ph-logo-row">
<img data-delaysrc="https://www.voidrev.us/e060b59b57fdcc7874c820d13fdcee71.svg" width="90" height="90" alt="R" />
</div>
<div class="ph-areyouinstalleddialog-content">
<p class="larger-font-size">
Limbo is now loading. Get ready to play!
</p>
<div class="ph-startingdialog-spinner-row">
<img data-delaysrc="https://www.voidrev.us/4bed93c91f909002b1f17f05c0ce13d1.gif" width="82" height="24" />
</div>
</div>
</div>
</div>
<div id="ProtocolHandlerAreYouInstalled" style="display:none;">
<div class="modalPopup ph-modal-popup">
<div class="ph-modal-header">
<span class="icon-close simplemodal-close"></span>
</div>
<div class="ph-logo-row">
<img data-delaysrc="https://www.voidrev.us/e060b59b57fdcc7874c820d13fdcee71.svg" width="90" height="90" alt="R" />
</div>
<div class="ph-areyouinstalleddialog-content">
<p class="larger-font-size">
You're moments away from getting into the game!
</p>
<div>
<button type="button" class="btn btn-primary-md" id="ProtocolHandlerInstallButton">
Download and Install Limbo
</button>
</div>
<div class="small">
<a href="https://help.voidrev.us/hc/en-us/articles/204473560" class="text-name" target="_blank">Click
here for help</a>
</div>
</div>
</div>
</div>
<div id="ProtocolHandlerClickAlwaysAllowed" class="ph-clickalwaysallowed" style="display:none;">
<p class="larger-font-size">
<span class="icon-moreinfo"></span>
Check <b>Remember my choice</b> and click
<img data-delaysrc="https://www.voidrev.us/7c8d7a39b4335931221857cca2b5430b.png" alt="Launch Application" />
in the dialog box above to join games faster in the future!
</p>
</div>
<div id="videoPrerollPanel" style="display:none">
<div id="videoPrerollTitleDiv">
Gameplay sponsored by:
</div>
<div id="content">
<video id="contentElement" style="width:0; height:0;" />
</div>
<div id="videoPrerollMainDiv"></div>
<div id="videoPrerollCompanionAd">
</div>
<div id="videoPrerollLoadingDiv">
Loading <span id="videoPrerollLoadingPercent">0%</span> - <span id="videoPrerollMadStatus" class="MadStatusField">Starting game...</span><span id="videoPrerollMadStatusBackBuffer" class="MadStatusBackBuffer"></span>
<div id="videoPrerollLoadingBar">
<div id="videoPrerollLoadingBarCompleted">
</div>
</div>
</div>
<div id="videoPrerollJoinBC">
<span>Get more with Builders Club!</span>
<a href="https://www.voidrev.us/premium/membership?ctx=preroll" target="_blank" class="btn-medium btn-primary" id="videoPrerollJoinBCButton">Join Builders Club</a>
</div>
</div>
<script type="text/javascript">
$(function () {
var videoPreRollDFP = Roblox.VideoPreRollDFP;
if (videoPreRollDFP) {
var customTargeting = Roblox.VideoPreRollDFP.customTargeting;
videoPreRollDFP.showVideoPreRoll = false;
videoPreRollDFP.loadingBarMaxTime = 33000;
videoPreRollDFP.videoLoadingTimeout = 11000;
videoPreRollDFP.videoPlayingTimeout = 41000;
videoPreRollDFP.videoLogNote = "Guest";
videoPreRollDFP.logsEnabled = true;
videoPreRollDFP.excludedPlaceIds = "32373412";
videoPreRollDFP.adUnit = "/1015347/VideoPrerollUnder13";
videoPreRollDFP.adTime = 15;
videoPreRollDFP.isSwfPreloaderEnabled = false;
videoPreRollDFP.isPrerollShownEveryXMinutesEnabled = true;
videoPreRollDFP.isAgeTargetingEnabled = true;
videoPreRollDFP.isAgeOrSegmentTargetingEnabled = true;
videoPreRollDFP.isCompanionAdRenderedByGoogleTag = true;
customTargeting.userAge = "Unknown";
customTargeting.userAgeOrSegment = "Unknown";
customTargeting.userGender = "Unknown";
customTargeting.gameGenres = "";
customTargeting.environment = "Production";
customTargeting.adTime = "15";
customTargeting.PLVU = false;
$(videoPreRollDFP.checkEligibility);
}
});
</script>
<div id="GuestModePrompt_BoyGirl" class="Revised GuestModePromptModal" style="display:none;">
<div class="simplemodal-close">
<a class="ImageButton closeBtnCircle_20h" style="cursor: pointer; margin-left:455px;top:7px; position:absolute;"></a>
</div>
<div class="Title">
Choose Your Avatar
</div>
<div style="min-height: 275px; background-color: white;">
<div style="clear:both; height:25px;"></div>
<div style="text-align: center;">
<div class="VisitButtonsGuestCharacter VisitButtonBoyGuest" style="float:left; margin-left:45px;">
</div>
<div class="VisitButtonsGuestCharacter VisitButtonGirlGuest" style="float:right; margin-right:45px;">
</div>
</div>
<div style="clear:both; height:25px;"></div>
<div class="RevisedFooter">
<div style="width:200px;margin:10px auto 0 auto;">
<a href="https://www.voidrev.us">
<div class="RevisedCharacterSelectSignup"></div>
</a>
<a class="HaveAccount" href="https://www.voidrev.us/newlogin">I have an account</a>
</div>
</div>
</div>
</div>
<script type="text/javascript">
function checkRobloxInstall() {
window.location = 'https://www.voidrev.us/install/unsupported.aspx?osx=10.5';
return false;
}
</script>
<style>
#win_firefox_install_img .activation {}
#win_firefox_install_img .installation {
width: 869px;
height: 331px;
}
#mac_firefox_install_img .activation {}
#mac_firefox_install_img .installation {
width: 250px;
}
#win_chrome_install_img .activation {}
#win_chrome_install_img .installation {}
#mac_chrome_install_img .activation {
width: 250px;
}
#mac_chrome_install_img .installation {}
</style>
<div id="InstallationInstructions" class="modalPopup blueAndWhite" style="display:none;overflow:hidden">
<a id="CancelButton2" onclick="return Roblox.Client._onCancel();" class="ImageButton closeBtnCircle_35h ABCloseCircle"></a>
<div style="padding-bottom:10px;text-align:center">
<br /><br />
</div>
</div>
<div id="pluginObjDiv" style="height:1px;width:1px;visibility:hidden;position: absolute;top: 0;"></div>
<iframe id="downloadInstallerIFrame" name="downloadInstallerIFrame" style="visibility:hidden;height:0;width:1px;position:absolute"></iframe>
<script type='text/javascript' src='https://www.voidrev.us/js/fbdb5b64583278a8513645a997a89a3c.js'></script>
<script type="text/javascript">
Roblox.Client._skip = '/install/unsupported.aspx';
Roblox.Client._CLSID = '';
Roblox.Client._installHost = '';
Roblox.Client.ImplementsProxy = false;
Roblox.Client._silentModeEnabled = false;
Roblox.Client._bringAppToFrontEnabled = false;
Roblox.Client._currentPluginVersion = '';
Roblox.Client._eventStreamLoggingEnabled = false;
Roblox.Client._installSuccess = function () {
if (GoogleAnalyticsEvents) {
GoogleAnalyticsEvents.ViewVirtual('InstallSuccess');
GoogleAnalyticsEvents.FireEvent(['Plugin', 'Install Success']);
if (Roblox.Client._eventStreamLoggingEnabled && typeof Roblox.GamePlayEvents != "undefined") {
Roblox.GamePlayEvents.SendInstallSuccess(Roblox.Client._launchMode, play_placeId);
}
}
}
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
<script type='text/javascript' src='https://www.voidrev.us/js/zoyb782en0g1d6i617ndgyhtoyyh00ze.js'></script>
</body>
</html>