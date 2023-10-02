<?php
$maincss = true;
include ($_SERVER['DOCUMENT_ROOT'].'/global.php');
if ($usr['Admin'] === 0) {
header('HTTP/1.0 403 Forbidden', true, 403);
http_response_code(403);
exit();
}
if(!isset($_GET['tab'])){
header("Location: https://www.voidrev.us/admi/?tab=Moderation&item=Users");
exit();
}
$CanSee2020 = $usr['CanSee2020'];
?>
<head>
<title>Administration - Void</title>
<link rel='stylesheet' href='https://www.voidrev.us/css/MainCSS.css' />
<link rel="stylesheet" href="https://www.voidrev.us/css/developpage.css">
<script type='text/javascript' src='//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.1.min.js'></script>
<script type='text/javascript'>
window.jQuery || document.write(" < script type = 'text/javascript'
src = '/js/jquery/jquery-1.11.1.js' > < \/script>")
</script>
<script type='text/javascript' src='//ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.2.1.min.js'></script>
<script type='text/javascript'>
window.jQuery || document.write(" < script type = 'text/javascript'
src = '/js/jquery/jquery-migrate-1.2.1.js' > < \/script>")
</script>
<script src=https://www.voidrev.us/js/3a25d0eb48bed7aea3692d1ddbca637b.js></script>
<script src=https://www.voidrev.us/js/7825498393db2b92524062e06460f88a.js></script>
<div ng-modules=baseTemplateApp>
<script src=https://www.voidrev.us/js/cbd9a121217c4887264ffe32686ecd52.js></script>
</div>
<div ng-modules=pageTemplateApp>
<script src=https://www.voidrev.us/js/289160c4f8099399d0ed5cb5023ca37d.js></script>
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
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
<script type="text/javascript">
$(function() {
Roblox.JSErrorTracker.initialize({
'suppressConsoleError': true
});
});
</script>
<!--[if lt IE 9]>
<script src="//oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="//oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
<script type="text/javascript">
var _gaq = _gaq || [];
window.GoogleAnalyticsDisableRoblox2 = true;
_gaq.push(['b._setAccount', 'UA-486632-1']);
_gaq.push(['b._setCampSourceKey', 'rbx_source']);
_gaq.push(['b._setCampMediumKey', 'rbx_medium']);
_gaq.push(['b._setCampContentKey', 'rbx_campaign']);
_gaq.push(['b._setDomainName', 'voidrev.us']);
_gaq.push(['b._setCustomVar', 1, 'Visitor', 'Member', 2]);
_gaq.push(['b._setPageGroup', 1, 'Games']);
_gaq.push(['b._trackPageview']);
_gaq.push(['c._setAccount', 'UA-26810151-2']);
_gaq.push(['c._setDomainName', 'voidrev.us']);
_gaq.push(['c._setPageGroup', 1, 'Games']);
(function() {
var ga = document.createElement('script');
ga.type = 'text/javascript';
ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'https://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);
})();
</script>
<script type="text/javascript">
if (Roblox && Roblox.PageHeartbeatEvent) {
Roblox.PageHeartbeatEvent.Init([2, 8, 20, 60]);
}
</script>
<script type="text/javascript">
$(function () {
RobloxEventManager.triggerEvent('rbx_evt_newuser', {});
});
</script>
<style>
.overlay-play-button {
/* Used to position the overlay */
position: relative;
}
.overlay-play-button__overlay {
/* Position */
left: 0;
position: absolute;
top: 0;
/* Take full size */
height: 100%;
width: 100%;
/* Center the content */
align-items: center;
display: flex;
justify-content: center;
/* Add a dark background */
background-color: rgba(0, 0, 0, 0.25);
}
.overlay-play-button__play {
border: 0.25rem solid #fff;
border-radius: 9999px;
height: 3rem;
width: 3rem;
/* Center the content */
align-items: center;
display: flex;
justify-content: center;
}
.play-button {
width: 18.5px;
height: 18.5px;
box-sizing: border-box;
border-style: solid;
border-width: 9.25px 0px 9.25px 18.5px;
border-color: transparent transparent transparent white;
}
.video-process {
max-width:250px;
}
.red-text {
color:red;
}
</style>
</head>
<body>
<div class="nav-container no-gutter-ads">
<div id="BodyWrapper" class="">
<div id="RepositionBody">
<div id="Body" class="body-width">
<div id="TosAgreementInfo" data-terms-check-needed="True">
</div>
<div class="col-xs-12 rbx-tabs-horizontal">
<ul id="horizontal-tabs" class="nav nav-tabs" role="tablist">
<li id="tab-Moderation" class="rbx-tab tab-Moderation <?php if($_GET['tab'] === 'Moderation'){echo'active';}?>" onclick="location.replace('https://www.voidrev.us/admi/?tab=Moderation&item=Users')">
<a class="rbx-tab-heading" href="https://www.voidrev.us/admi/?tab=Moderation&item=Games">
<span class="text-lead">Moderation</span>
</a>
</li>
<?php if($SuperAdmin === 1){ ?>
<li id="tab-GameServers" class="rbx-tab tab-GameServers <?php if($_GET['tab'] === 'GameServers'){echo'active';}?>" onclick="location.replace('https://www.voidrev.us/admi/?tab=GameServers&item=GameJobs')">
<a class="rbx-tab-heading" href="https://www.voidrev.us/admi/?tab=GameServers&item=GameJobs">
<span class="text-lead">Game Servers</span>
</a>
</li>
<li id="tab-leaderboards" class="rbx-tab tab-control <?php if($_GET['tab'] === 'WebsiteControl'){echo'active';}?>" onclick="location.replace('https://www.voidrev.us/admi/?tab=WebsiteControl&item=Alerts')">
<a class="rbx-tab-heading" href="https://www.voidrev.us/admi/?tab=WebsiteControl&item=Alerts">
<span class="text-lead">Website Control</span>
</a>
</li>
<? } ?>
<li id="tab-statistics" class="rbx-tab tab-statistics <?php if($_GET['tab'] === 'Statistics'){echo'active';}?>" onclick="location.replace('https://www.voidrev.us/admi/?tab=Statistics&item=Users')">
<a class="rbx-tab-heading" href="https://www.voidrev.us/admi/?tab=Statistics&item=Users">
<span class="text-lead">Statistics</span>
</a>
</li>
</ul>
</div>
<?php if($_GET['tab'] === "Moderation"){ ?>
<div class="BuildPageContent" data-groupid="">
<table id="build-page" data-asset-type-id="" data-edit-opens-studio="True">
<tbody>
<tr>
<td class="menu-area divider-right">
<a href="https://www.voidrev.us/admi/?tab=Moderation&item=Users" class="tab-item <?php if($_GET['item'] === 'Users'){echo'tab-item-selected';}?>">Users</a>
<a href="https://www.voidrev.us/admi/?tab=Moderation&item=Games" class="tab-item <?php if($_GET['item'] === 'Games'){echo'tab-item-selected';}?>">Games</a>
<a href="https://www.voidrev.us/admi/?tab=Moderation&item=Library" class="tab-item <?php if($_GET['item'] === 'Library'){echo'tab-item-selected';}?>">Library</a>
<a href="https://www.voidrev.us/admi/?tab=Moderation&item=Reports" class="tab-item <?php if($_GET['item'] === 'Reports'){echo'tab-item-selected';}?>">Reports</a>
<a href="https://www.voidrev.us/admi/?tab=Moderation&item=Approval" class="tab-item <?php if($_GET['item'] === 'Approval'){echo'tab-item-selected';}?>">Item Approval</a>
<?php if($_GET['item'] === "Users"){ ?>
<td class="content-area ">
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Users</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<table class="item-table">
</table>
<form action="https://www.voidrev.us/admi/?tab=Moderation&item=Users" method="POST">
<table class="item-table">
<td class="universe-name-col">
<table class="details-table">
<tbody>
<?php
if($_POST['search']){
if(is_numeric($_POST['search'])){
$SearchedUserId = (int)$_POST['search'];
$SearchQuery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
$SearchQuery->execute(["id" => $SearchedUserId]);
}else{
$SearchedUsername = $_POST['search'];
$SearchQuery = $con->prepare("SELECT * FROM `users` WHERE `username` = :username");
$SearchQuery->execute(["username" => $SearchedUsername]);
}
$SearchedUser = $SearchQuery->fetch();
if($SearchedUser['discordid'] != NULL){
$discordid = $SearchedUser['discordid'];
}else{
$discordid = "N/A";
}
?>
<td class="content-area">
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">User Profile</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container">
<table class="item-table">
<tr>
<td class="universe-name-col">
<a class="title">Profile</a>
<table class="details-table">
<tbody>
<tr>
<td>
<div>
<div>
<br>
<span class="form-label">Profile Picture:</span>
<img src="<?php echo getUserThumbnail($con,$SearchedUser['id']); ?>" style="max-width:250px;display:block;" alt="Profile Picture">
</div>
<div>
<span class="form-label">User ID:</span>
<span><?php echo $SearchedUser['id']; ?></span>
</div>
<div>
<br>
<span class="form-label">Username:</span>
<span><?php echo $SearchedUser['username']; ?></span>
</div>
<div>
<br>
<span class="form-label">Join Date:</span>
<span><?php echo date("M d, Y | h:i A (T)", $SearchedUser['trn_date']); ?></span>
</div>
<div>
<br>
<span class="form-label">Discord ID:</span>
<span><?php echo $discordid; ?></span>
</div>
<div>
<br>
<span class="form-label">Ban History:</span>
<ul>
<?php
// Fetch ban history for the user
$BanQuery = $con->prepare("SELECT * FROM `banhistory` WHERE `bannedid` = :id");
$BanQuery->execute(["id" => $SearchedUserId]);
while ($ban = $BanQuery->fetch()) {
$bandate = date("M d, Y | h:i A (T)", $ban['date']);
$banreason = $ban['reason'];
$BannerQuery = $con->prepare("SELECT id,username FROM `users` WHERE `id` = :id");
$BannerQuery->execute(["id" => $ban['bannedby']]);
$Banner = $BannerQuery->fetch();
$bannedby = $Banner['username'];
echo "<li>{$bandate} - {$banreason} By {$bannedby}</li>";
}
?>
</ul>
</div>
</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</table>
</form>
<div class="separator"></div>
<!-- Ban Form -->
<table class="item-table">
<tr>
<td class="universe-name-col">
<a class="title">Ban</a>
<table class="details-table">
<tbody>
<tr>
<td>
<div>
<form action="/admi/api/userban" method="POST">
<div>
<br>
<span class="form-label">User ID:</span>
<span><?php echo $SearchedUser['id']; ?></span>
<input type="hidden" name="UserId" value="<?php echo $SearchedUser['id']; ?>">
</div>
<div>
<br>
<span class="form-label">Ban Type:</span>
<select class="form-select no-margins" name="Type">
<option value="Revert">Revert</option>
<option value="Warning">Warning</option>
<option value="3 Days">3 Days</option>
<option value="14 Days">14 Days</option>
<option value="Deleted">Deleted</option>
</select>
</div>
<div>
<br>
<span class="form-label">Can Appeal:</span>
<select class="form-select no-margins" name="AppealType">
<option value="Yes">Yes</option>
<option value="No">No</option>
</select>
</div>
<div>
<br>
<span class="form-label">Ban Reason:</span>
<input name="Reason" type="text" class="text-box text-box-medium">
</div>
<div>
<br>
<button class="btn-medium btn-primary" type="submit">Ban User</button>
</div>
</form>
</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</table>
</div>
</td>
<?php
}else{
?>
<tr>
<td>
<div>
<span class="form-label">User ID/Username:</span>
<input name="search" type="text"class="text-box text-box-medium" tabindex="1">
</div>
<div>
<br>
<button class="btn-medium btn-primary">Search</button>
</div>
</td>
</tr>
<? } ?>
</tbody>
</table>
</form>
</td>
<? } ?>
<?php if($_GET['item'] === "Games"){ ?>
<td class="content-area ">
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Games</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<table class="item-table">
</table>
<form action="https://www.voidrev.us/admi/api/gameban" method="POST">
<table class="item-table">
<td class="universe-name-col">
<a class="title">Ban</a>
<table class="details-table">
<tbody>
<tr>
<td>
<div>
<div>
<br>
<span class="form-label">Game ID:</span>
<input name="GameId" type="text"class="text-box text-box-medium" tabindex="1">
</div>
<br>
<label class="form-label" for="Version">Ban Type:</label>
<select class="form-select no-margins" id="Type" name="Type">
<option>Revert</option>
<option>Under Review</option>
<option>Deleted</option>
</select>
</div>
<div>
<br>
<style>
.btn-primary {
color: #fff;
background-color: #fc0000;
border-color: #c00;
}
</style>
<button class="btn-medium btn-primary">Run</button>
</div>
</td>
</tr>
</tr>
</tbody>
</table>
</form>
</td>
<? } ?>
<?php if($_GET['item'] === "Library"){ ?>
<td class="content-area ">
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Library</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<table class="item-table">
</table>
<form action="https://www.voidrev.us/admi/api/libraryban" method="POST">
<table class="item-table">
<td class="universe-name-col">
<a class="title">Ban</a>
<table class="details-table">
<tbody>
<tr>
<td>
<div>
<div>
<br>
<span class="form-label">Library ID:</span>
<input name="LibraryId" type="text"class="text-box text-box-medium" tabindex="1">
</div>
<br>
<label class="form-label" for="Version">Ban Type:</label>
<select class="form-select no-margins" id="Type" name="Type">
<option>Revert</option>
<option>Deleted</option>
</select>
</div>
<div>
<br>
<style>
.btn-primary {
color: #fff;
background-color: #fc0000;
border-color: #c00;
}
</style>
<button class="btn-medium btn-primary">Run</button>
</div>
</td>
</tr>
</tr>
</tbody>
</table>
</form>
</td>
<? } ?>
<?php if($_GET['item'] === "Reports"){ ?>
<style>
th{
text-align:left;
}
</style>
<td class="content-area ">
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Reports</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<table class="item-table">
<thead>
<tr>
<th>Reporter </th>
<th>Place </th>
<th>Job ID </th>
<th>Abuser </th>
<th>Type </th>
<th>User Note </th>
<th>Messages </th>
<th>Created </th>
</tr>
</thead>
<tbody>
<?php
$reportquery = $con->prepare("SELECT * FROM `reports` ORDER BY created DESC");
$reportquery->execute();
while($reports = $reportquery->fetch()) {
$reporterid = $reports['userID'];
$placeid = $reports['placeID'];
$gameJobId = $reports['gameJobID'];
$abuserid = $reports['AbuserID'];
$type = filter_var($reports['Type'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$UserReport = filter_var($reports['UserReport'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$messages = filter_var($reports['messages'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$created = $reports['created'];
?>
<tr>
<td>
<?=$reporterid;?>ㅤ
</td>
<td>
<?=$placeid;?>ㅤ
</td>
<td>
<?=$gameJobId;?>ㅤ
</td>
<td>
<?=$abuserid;?>ㅤ
</td>
<td>
<?php echo NoXSSPlz($type); ?>ㅤ
</td>
<td>
<?php echo NoXSSPlz($UserReport); ?>ㅤ
</td>
<td>
<?php echo NoXSSPlz($messages); ?>ㅤ
</td>
<td>
<?=$created;?>ㅤ
</td>
</tr>
<? } ?>
</tbody>
</table>
</div>
</div>
</div>
</div>
<? } ?>
<?php if($_GET['item'] === "Approval"){ ?>
<td class="content-area ">
<table class="section-header">
<tbody>
<td class="content-title">
<div>
<h2 class="header-text">Item Approval</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<?php
$itemquery = $con->prepare("SELECT id,name,creatorname,creatorid,type2,fileid,realfileid FROM `library` WHERE `approved`='0' ORDER BY created DESC LIMIT 10");
$itemquery->execute();
while($items = $itemquery->fetch()) {
$name = $items['name'];
$creatorname = $items['creatorname'];
$creatorid = $items['creatorid'];
$itemid = $items['id'];
$creatorquery = $con->prepare("SELECT creationflagged FROM `users` WHERE `id`= :creatorid");
$creatorquery->execute(['creatorid' => $creatorid]);
$creatordata = $creatorquery->fetch();
$isflagged = $creatordata['creationflagged'];
?>
<form action="https://www.voidrev.us/admi/api/approval" method="POST">
<table class="item-table">
<tbody>
<tr>
<td class="image-col" title="<?php echo NoXSSPlz($name);?>" rowspan="3">
<a href="<?=$link;?>" class="item-image ad-image">
<?php if($items['type2'] == "Shirt" || $items['type2'] == "Pants" || $items['type2'] == "Decal" || $items['type2'] == "TShirt" || $items['type2'] == "Face"){ ?><img style="max-width:75px;max-height:75px;" src="https://www.voidrev.us/asset/?id=<?=$items['realfileid'];?>" <?php }elseif($items['type2'] == "Hat" || $items['type2'] == "Mesh" || $items['type2'] == "Gamepass" || $items['type2'] == "Badge"){?><img style="max-width:75px;max-height:75px;" src="https://www.voidrev.us/model-thumbnails?assetId=<?=$items['id'];?>&bypassadminpanel=true"<?}elseif($items['type2'] == "Sound"){?><audio style="max-width:250px;" controls preload="none">
<source src="http://www.voidrev.us/asset?id=<?=$items['realfileid'];?>">
Your browser does not support the audio element.
</audio><?}elseif($items['type2'] == "Video"){?>
<video src="https://www.voidrev.us/asset/?id=<?=$items['realfileid'];?>&adminpanel=true" controls preload="none" class="item-image video-process"></video>
<? } ?>
</a>
</td>
<td class="universe-name-col">
<a class="title" href="https://www.voidrev.us/library/?id=<?=$itemid;?>"><?php echo NoXSSPlz($name);?></a>
<table class="details-table">
<tbody>
<tr>
<h5><?php echo NOXSSPlz($items['type2']);?></h5>
</tr>
<td class="ad-activate-cell">
<a href="https://www.voidrev.us/users/<?=$creatorid;?>/profile"><?php echo NoXSSPlz($creatorname); if($isflagged == 1){echo'<h4 class="red-text">(!)</h4>';} ?></a>
</td>
</tbody>
</table>
</td>
<td class="edit-col">
<style>
.btn-primary{
background-image:none!important
}
</style>
<input type="hidden" name="itemid" value="<?=$itemid;?>"/>
<button class="btn-medium btn-primary" name="Approve" value="Approve" style="background-color:#0eac14; border-color:#0eac14;width:125;">Approve</button>
<button class="btn-medium btn-primary" name="Unapprove" value="Unapprove" style="background-color:#b52a2a; border-color:#b52a2a;">Unapprove</button>
</td>
<td class="menu-col">
</td>
</tr>
</tbody>
</table>
</form>
<? } ?>
<?php
$itemquery = $con->prepare("SELECT * FROM `ads` WHERE `approved`='0'ORDER BY id DESC LIMIT 10");
$itemquery->execute();
while($items = $itemquery->fetch()) {
$name = $items['name'];
$creatorid = $items['creatorid'];
$usernamequery = $con->prepare("SELECT id,username FROM `users` WHERE `id` = :id");
$usernamequery->execute(['id' => $creatorid]);
$usernamestuff = $usernamequery->fetch();
$creatorname = $usernamestuff['username'];
$itemid = $items['id'];
$image = $items['randident'];
$type = $items['assetType'];
if($type === "Game"){
$link = "https://www.voidrev.us/games/".$id."/";
}else{
$link = "https://www.voidrev.us/library/?id=".$id."";
}
?>
<form action="https://www.voidrev.us/admi/api/approval" method="POST">
<table class="item-table">
<tbody>
<tr>
<td class="image-col" title="<?php echo NoXSSPlz($name);?>" rowspan="3">
<a href="<?=$link;?>" class="item-image ad-image">
<img style="max-width:75px;max-height:75px;" src="https://www.voidrev.us/img/ads/<?=$image;?>.png">
</td>
</a>
</td>
<td class="universe-name-col">
<a class="title" href="<?=$link;?>"><?php echo NoXSSPlz($name);?></a>
<table class="details-table">
<tbody>
<tr>
</tr>
<td class="ad-activate-cell">
<a href="https://www.voidrev.us/users/<?=$creatorid;?>/profile"><?php echo NoXSSPlz($creatorname);?></a>
</td>
</tbody>
</table>
</td>
<td class="edit-col">
<style>
.btn-primary{
background-image:none!important
}
</style>
<input type="hidden" name="itemid" value="<?=$itemid;?>"/>
<input type="hidden" name="isadvert" value="true">
<button class="btn-medium btn-primary" name="Approve" value="Approve" style="background-color:#0eac14; border-color:#0eac14;width:125;">Approve</button>
<button class="btn-medium btn-primary" name="Unapprove" value="Unapprove" style="background-color:#b52a2a; border-color:#b52a2a;">Unapprove</button>
</td>
<td class="menu-col">
</td>
</tr>
</tbody>
</table>
</form>
<? } ?>
<?php
$itemquery = $con->prepare("SELECT * FROM `videoads` WHERE `approved`='0'ORDER BY id DESC LIMIT 10");
$itemquery->execute();
while($items = $itemquery->fetch()) {
$name = $items['name'];
$creatorid = $items['creatorid'];
$usernamequery = $con->prepare("SELECT id,username FROM `users` WHERE `id` = :id");
$usernamequery->execute(['id' => $creatorid]);
$usernamestuff = $usernamequery->fetch();
$creatorname = $usernamestuff['username'];
$itemid = $items['id'];
$image = $items['id'];
$type = $items['assetType'];
if($type === "Game"){
$link = "https://www.voidrev.us/games/".$itemid."/";
}else{
$link = "https://www.voidrev.us/library/?id=".$itemid."";
}
?>
<form action="https://www.voidrev.us/admi/api/approval" method="POST">
<table class="item-table">
<tbody>
<tr>
<td class="image-col" title="<?php echo NoXSSPlz($name);?>" rowspan="3">
<a href="https://www.voidrev.us/videos/<?=$image;?>.mp4" class="item-image ad-image">
<div class="overlay-play-button">
<video style="max-width:75px;max-height:75px;" src="https://www.voidrev.us/videos/<?=$image;?>.mp4"></video>
<div class="overlay-play-button__overlay">
<div class="overlay-play-button__play"><div class="play-button"></div></div>
</div>
</td>
</a>
</td>
<td class="universe-name-col">
<a class="title" href="<?=$link;?>"><?php echo NoXSSPlz($name);?></a>
<table class="details-table">
<tbody>
<tr>
</tr>
<td class="ad-activate-cell">
<a href="https://www.voidrev.us/users/<?=$creatorid;?>/profile"><?php echo NoXSSPlz($creatorname);?></a>
</td>
</tbody>
</table>
</td>
<td class="edit-col">
<style>
.btn-primary{
background-image:none!important
}
</style>
<input type="hidden" name="itemid" value="<?=$itemid;?>"/>
<input type="hidden" name="isvidadvert" value="true">
<button class="btn-medium btn-primary" name="Approve" value="Approve" style="background-color:#0eac14; border-color:#0eac14;width:125;">Approve</button>
<button class="btn-medium btn-primary" name="Unapprove" value="Unapprove" style="background-color:#b52a2a; border-color:#b52a2a;">Unapprove</button>
</td>
<td class="menu-col">
</td>
</tr>
</tbody>
</table>
</form>
<? } ?>
<?php
$itemquery = $con->prepare("SELECT id,name,version,creatorid,thumbnail1 FROM `games` WHERE `thumb1approved` = '0' ORDER BY created DESC LIMIT 10");
$itemquery->execute();
while($items = $itemquery->fetch()) {
if($items['thumbnail1'] != null){
$name = $items['name'];
$creatorid = $items['creatorid'];
$usernamequery = $con->prepare("SELECT id,username FROM `users` WHERE `id` = :id");
$usernamequery->execute(['id' => $creatorid]);
$usernamestuff = $usernamequery->fetch();
$creatorname = $usernamestuff['username'];
$itemid = $items['id'];
?>
<form action="https://www.voidrev.us/admi/api/approval" method="POST">
<table class="item-table">
<tbody>
<tr>
<td class="image-col" title="<?php echo NoXSSPlz($name);?>" rowspan="3">
<a href="https://www.voidrev.us/games/<?=$itemid;?>" class="item-image ad-image">
<img style="max-width:75px;max-height:75px;" src="https://www.voidrev.us/place-thumbnails?placeId=<?=$items['id'];?>&bypassadmin=true">
</td>
</a>
</td>
<td class="universe-name-col">
<a class="title" href="https://www.voidrev.us/games/<?=$itemid;?>"><?php echo NoXSSPlz($name);?></a>
<table class="details-table">
<tbody>
<tr>
</tr>
<td class="ad-activate-cell">
<a href="https://www.voidrev.us/users/<?=$creatorid;?>/profile"><?php echo NoXSSPlz($creatorname);?></a>
</td>
</tbody>
</table>
</td>
<td class="edit-col">
<style>
.btn-primary{
background-image:none!important
}
</style>
<input type="hidden" name="itemid" value="<?=$items['id'];?>"/>
<input type="hidden" name="isthumb1" value="true">
<button class="btn-medium btn-primary" name="Approve" value="Approve" style="background-color:#0eac14; border-color:#0eac14;width:125;">Approve</button>
<button class="btn-medium btn-primary" name="Unapprove" value="Unapprove" style="background-color:#b52a2a; border-color:#b52a2a;">Unapprove</button>
</td>
<td class="menu-col">
</td>
</tr>
</tbody>
</table>
</form>
<? }} ?>
<?php
$itemquery = $con->prepare("SELECT id,name,version,creatorid,thumbnail2 FROM `games` WHERE `thumb2approved` = '0' ORDER BY created DESC LIMIT 10");
$itemquery->execute();
while($items = $itemquery->fetch()) {
if($items['thumbnail2'] != null){
$name = $items['name'];
$creatorid = $items['creatorid'];
$usernamequery = $con->prepare("SELECT id,username FROM `users` WHERE `id` = :id");
$usernamequery->execute(['id' => $creatorid]);
$usernamestuff = $usernamequery->fetch();
$creatorname = $usernamestuff['username'];
$itemid = $items['id'];
?>
<form action="https://www.voidrev.us/admi/api/approval" method="POST">
<table class="item-table">
<tbody>
<tr>
<td class="image-col" title="<?php echo NoXSSPlz($name);?>" rowspan="3">
<a href="https://www.voidrev.us/games/<?=$itemid;?>" class="item-image ad-image">
<img style="max-width:75px;max-height:75px;" src="https://www.voidrev.us/place-thumbnails?placeId=<?=$items['id'];?>&bypassadmin=true&type=2">
</td>
</a>
</td>
<td class="universe-name-col">
<a class="title" href="https://www.voidrev.us/games/<?=$itemid;?>"><?php echo NoXSSPlz($name);?></a>
<table class="details-table">
<tbody>
<tr>
</tr>
<td class="ad-activate-cell">
<a href="https://www.voidrev.us/users/<?=$creatorid;?>/profile"><?php echo NoXSSPlz($creatorname);?></a>
</td>
</tbody>
</table>
</td>
<td class="edit-col">
<style>
.btn-primary{
background-image:none!important
}
</style>
<input type="hidden" name="itemid" value="<?=$items['id'];?>"/>
<input type="hidden" name="isthumb2" value="true">
<button class="btn-medium btn-primary" name="Approve" value="Approve" style="background-color:#0eac14; border-color:#0eac14;width:125;">Approve</button>
<button class="btn-medium btn-primary" name="Unapprove" value="Unapprove" style="background-color:#b52a2a; border-color:#b52a2a;">Unapprove</button>
</td>
<td class="menu-col">
</td>
</tr>
</tbody>
</table>
</form>
<? }} ?>
<?php
$itemquery = $con->prepare("SELECT id,name,version,creatorid,thumbnail3 FROM `games` WHERE `thumb3approved` = '0' ORDER BY created DESC LIMIT 10");
$itemquery->execute();
while($items = $itemquery->fetch()) {
if($items['thumbnail3'] != null){
$name = $items['name'];
$creatorid = $items['creatorid'];
$usernamequery = $con->prepare("SELECT id,username FROM `users` WHERE `id` = :id");
$usernamequery->execute(['id' => $creatorid]);
$usernamestuff = $usernamequery->fetch();
$creatorname = $usernamestuff['username'];
$itemid = $items['id'];
?>
<form action="https://www.voidrev.us/admi/api/approval" method="POST">
<table class="item-table">
<tbody>
<tr>
<td class="image-col" title="<?php echo NoXSSPlz($name);?>" rowspan="3">
<a href="https://www.voidrev.us/games/<?=$itemid;?>" class="item-image ad-image">
<img style="max-width:75px;max-height:75px;" src="https://www.voidrev.us/place-thumbnails?placeId=<?=$items['id'];?>&bypassadmin=true&type=3">
</td>
</a>
</td>
<td class="universe-name-col">
<a class="title" href="https://www.voidrev.us/games/<?=$itemid;?>"><?php echo NoXSSPlz($name);?></a>
<table class="details-table">
<tbody>
<tr>
</tr>
<td class="ad-activate-cell">
<a href="https://www.voidrev.us/users/<?=$creatorid;?>/profile"><?php echo NoXSSPlz($creatorname);?></a>
</td>
</tbody>
</table>
</td>
<td class="edit-col">
<style>
.btn-primary{
background-image:none!important
}
</style>
<input type="hidden" name="itemid" value="<?=$items['id'];?>"/>
<input type="hidden" name="isthumb3" value="true">
<button class="btn-medium btn-primary" name="Approve" value="Approve" style="background-color:#0eac14; border-color:#0eac14;width:125;">Approve</button>
<button class="btn-medium btn-primary" name="Unapprove" value="Unapprove" style="background-color:#b52a2a; border-color:#b52a2a;">Unapprove</button>
</td>
<td class="menu-col">
</td>
</tr>
</tbody>
</table>
</form>
<? }} ?>
<?php
$itemquery = $con->prepare("SELECT id,name,version,creatorid,icon FROM `games` WHERE `icon`='-1' AND `approved` = '0' ORDER BY updated DESC LIMIT 10");
$itemquery->execute();
while($items = $itemquery->fetch()) {
$name = $items['name'];
$creatorid = $items['creatorid'];
$usernamequery = $con->prepare("SELECT id,username FROM `users` WHERE `id` = :id");
$usernamequery->execute(['id' => $creatorid]);
$usernamestuff = $usernamequery->fetch();
$creatorname = $usernamestuff['username'];
$itemid = $items['id'];
?>
<form action="https://www.voidrev.us/admi/api/approval" method="POST">
<table class="item-table">
<tbody>
<tr>
<td class="image-col" title="<?php echo NoXSSPlz($name);?>" rowspan="3">
<a href="https://www.voidrev.us/games/<?=$itemid;?>" class="item-image ad-image">
<img style="max-width:75px;max-height:75px;" src="https://www.voidrev.us/img/games/<?=$items['id'];?>s.png">
</td>
</a>
</td>
<td class="universe-name-col">
<a class="title" href="https://www.voidrev.us/games/<?=$itemid;?>"><?php echo NoXSSPlz($name);?></a>
<table class="details-table">
<tbody>
<tr>
</tr>
<td class="ad-activate-cell">
<a href="https://www.voidrev.us/users/<?=$creatorid;?>/profile"><?php echo NoXSSPlz($creatorname);?></a>
</td>
</tbody>
</table>
</td>
<td class="edit-col">
<style>
.btn-primary{
background-image:none!important
}
</style>
<input type="hidden" name="itemid" value="<?=$items['id'];?>"/>
<input type="hidden" name="isgame" value="true">
<button class="btn-medium btn-primary" name="Approve" value="Approve" style="background-color:#0eac14; border-color:#0eac14;width:125;">Approve</button>
<button class="btn-medium btn-primary" name="Unapprove" value="Unapprove" style="background-color:#b52a2a; border-color:#b52a2a;">Unapprove</button>
</td>
<td class="menu-col">
</td>
</tr>
</tbody>
</table>
</form>
<? } ?>
<div class="separator"></div>
</div>
</td>
</tr>
</tr>
</tbody>
</table>
</form>
</td>
<? } ?>
</tr>
</tbody>
</table>
<div class="separator"></div>
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
</tr>
</tbody>
</table>
</div>
<? } ?>
<?php if($_GET['tab'] === "GameServers" && $SuperAdmin == 1){ ?>
<div class="BuildPageContent" data-groupid="">
<table id="build-page" data-asset-type-id="" data-edit-opens-studio="True">
<tbody>
<tr>
<td class="menu-area divider-right">
<a href="https://www.voidrev.us/admi/?tab=GameServers&item=GameJobs" class="tab-item <?php if($_GET['item'] === 'GameJobs'){echo'tab-item-selected';}?>">Game Jobs</a>
<?php if($_GET['item'] === "GameJobs"){ ?>
<style>
th{
text-align:left;
}
</style>
<td class="content-area ">
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Game Jobs</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<table class="item-table">
<thead>
<tr>
<th>Job ID </th>
<th>Status </th>
<th>Version </th>
<th>Place ID </th>
<th>Players </th>
<th>Port </th>
<th>Last Updated </th>
<th>Close Server </th>
</tr>
</thead>
<tbody>
<?php
if($CanSee2020 == 1){
$jobquery = $con->prepare("SELECT * FROM `jobs` ORDER BY lastpingtime DESC");
}else{
$jobquery = $con->prepare("SELECT * FROM `jobs` WHERE type != 2020 ORDER BY lastpingtime DESC");
}
$jobquery->execute();
while($jobs = $jobquery->fetch()) {
$jobId = $jobs['id'];
if($jobs['active'] == 0){
$status = "Starting";
}else{
$status = "Ready";
}
$timediff = time() - $jobs['lastpingtime'];
if($timediff > 60){
$status = "Failed";
}
$version = $jobs['type'];
$placeId = $jobs['placeId'];
$playercount = $jobs['playercount'];
$port = $jobs['port'];
$lastupdated = $timediff." seconds ago";
?>
<tr>
<td>
<?php echo $jobId;?>
</td>
<td>
<?php echo $status;?>
</td>
<td>
<?php echo $version;?>
</td>
<td>
<?php echo $placeId;?>
</td>
<td>
<?php echo $playercount;?>
</td>
<td>
<?php echo $port."ㅤ";?>
</td>
<td>
<?php echo $lastupdated;?>
</td>
<td>
<div class="btn-secondary-xs" onclick="location.replace('https://www.voidrev.us/admi/api/closejob?jobId=<?=$jobId;?>');">
Close
</div>
</td>
</tr>
<? } ?>
</tbody>
</table>
</div>
</div>
</div>
</div>
<? } ?>
<? } ?>
<?php if($_GET['tab'] === "WebsiteControl" && $SuperAdmin == 1){ ?>
<div class="BuildPageContent" data-groupid="">
<table id="build-page" data-asset-type-id="" data-edit-opens-studio="True">
<tbody>
<tr>
<td class="menu-area divider-right">
<a href="https://www.voidrev.us/admi/?tab=WebsiteControl&item=Alerts" class="tab-item <?php if($_GET['item'] === 'Alerts'){echo'tab-item-selected';}?>">Alerts</a>
<a href="https://www.voidrev.us/admi/?tab=WebsiteControl&item=Promocodes" class="tab-item <?php if($_GET['item'] === 'Promocodes'){echo'tab-item-selected';}?>">Promocodes</a>
<?php if($_GET['item'] === "Alerts"){ ?>
<style>
th{
text-align:left;
}
</style>
<td class="content-area ">
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Alerts</h2>
</div>
</td>
</tr>
</tbody>
</table>
<h5>To remove an alert, leave the text box blank.</h6>
<form action="https://www.voidrev.us/admi/api/alert" method="POST">
<table class="item-table">
<td class="universe-name-col">
<table class="details-table">
<tbody>
<tr>
<td>
<div>
<span class="form-label">Text:</span>
<input name="text" type="text" class="text-box text-box-medium" tabindex="1">
</div>
<div>
<br>
<style>
.btn-primary {
color: #fff;
background-color: #fc0000;
border-color: #c00;
}
</style>
<button class="btn-medium btn-primary">Run</button>
</div>
</td>
</tr>
</tr>
</tbody>
</table>
</form>
</div>
</div>
</div>
<? } ?>
<?php if($_GET['item'] === "Promocodes"){ ?>
<style>
th{
text-align:left;
}
</style>
<td class="content-area ">
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Promocodes</h2>
</div>
</td>
</tr>
</tbody>
</table>
<form action="https://www.voidrev.us/admi/api/promocodes" method="POST">
<table class="item-table">
<td class="universe-name-col">
<table class="details-table">
<tbody>
<tr>
<td>
<div>
<span class="form-label">Code:</span>
<input name="text" type="text" class="text-box text-box-medium" tabindex="1">
</div>
<br>
<div>
<span class="form-label">Item ID:</span>
<input name="text" type="text" class="text-box text-box-medium" tabindex="1">
</div>
<br>
<div>
<span class="form-label">Robux:</span>
<input name="text" type="text" class="text-box text-box-medium" tabindex="1">
</div>
<br>
<div>
<span class="form-label">Infinite Uses:</span>
<input type="checkbox" id="infuses" name="infuses">
</div>
<div>
<br>
<button class="btn-medium btn-primary">Add</button>
</div>
</td>
</tr>
</tr>
</tbody>
</table>
</form>
</div>
</div>
</div>
<? } ?>
<? } ?>
<?php if($_GET['tab'] === "Statistics"){ ?>
<div class="BuildPageContent" data-groupid="">
<table id="build-page" data-asset-type-id="" data-edit-opens-studio="True">
<tbody>
<tr>
<td class="menu-area divider-right">
<a href="https://www.voidrev.us/admi/?tab=Statistics&item=Users" class="tab-item <?php if($_GET['item'] === 'Users'){echo'tab-item-selected';}?>">Users</a>
<?php if($_GET['item'] === "Users"){ ?>
<style>
th{
text-align:left;
}
</style>
<td class="content-area ">
<table class="section-header">
<tbody>
<tr>
<td class="content-title">
<div>
<h2 class="header-text">Recently Joined</h2>
</div>
</td>
</tr>
</tbody>
</table>
<div class="items-container ">
<table class="item-table">
<thead>
<tr>
<th>Usernameㅤ</th>
<th>Roleㅤ</th>
<th>User IDㅤ</th>
<th>Activatedㅤ</th>
<th>Join Dateㅤ</th>
</tr>
</thead>
<tbody>
<?php
$userquery = $con->prepare("SELECT * FROM `users` ORDER BY trn_date DESC LIMIT 50");
$userquery->execute();
while($users = $userquery->fetch()) {
$usernameofuser = $users['username'];
if($users['Admin'] == 0){
$role = "Memberㅤ";
}elseif($users['Admin'] == 1){
$role = "Adminㅤ";
}
if($users['SuperAdmin'] == 1){
$role = "Super Adminㅤ";
}
$userId = $users['id'];
if($users['activated'] == 0){
$activated = "No";
}else{
$activated = "Yes";
}
$joindate = $users['trn_date'];
?>
<tr>
<td>
<?php echo NoXSSPlz($usernameofuser);?>
</td>
<td>
<?php echo NoXSSPlz($role);?>
</td>
<td>
<?php echo $userId;?>
</td>
<td>
<?php echo NoXSSPlz($activated);?>
</td>
<td>
<?php echo date("M d, Y | h:i A (T)", $joindate); ?>
</td>
</tr>
<? } ?>
</tbody>
</table>
</div>
</div>
</div>
</div>
<? } ?>
<? } ?>
</div>
</div>
<script type='text/javascript' src='https://www.voidrev.us/js/e20b65b5f3876e969af34b10d11a9b8d.js'></script>
<script type='text/javascript' src='https://www.voidrev.us/js/a3d0fc23f71b8d010b8bf64ed7d52da5.js'></script>
<script type='text/javascript'>Roblox.config.externalResources = [];Roblox.config.paths['Pages.Catalog'] = 'https://www.voidrev.us/js/165e89fea66b7c146c7a723c33ca7108.js';Roblox.config.paths['Pages.CatalogShared'] = 'https://www.voidrev.us/js/2c184f0c9c042d5309458c45dddf6d4e.js';Roblox.config.paths['Widgets.AvatarImage'] = 'https://www.voidrev.us/js/823c7d686e6b3d8321275740fe498f9d.js';Roblox.config.paths['Widgets.DropdownMenu'] = 'https://www.voidrev.us/js/5cf0eb71249768c86649bbf0c98591b0.js';Roblox.config.paths['Widgets.GroupImage'] = 'https://www.voidrev.us/js/556af22c86bce192fb12defcd4d2121c.js';Roblox.config.paths['Widgets.HierarchicalDropdown'] = 'https://www.voidrev.us/js/7689b2fd3f7467640cda2d19e5968409.js';Roblox.config.paths['Widgets.ItemImage'] = 'https://www.voidrev.us/js/8e3d1677fd9198849f05583bc0740555.js';Roblox.config.paths['Widgets.PlaceImage'] = 'https://www.voidrev.us/js/45d46dd8e2bd7f10c17b42f76795150d.js';Roblox.config.paths['Widgets.SurveyModal'] = 'https://www.voidrev.us/js/56ad7af86ee4f8bc82af94269ed50148.js';</script>
</body>
