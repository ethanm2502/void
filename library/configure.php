<?php require ($_SERVER['DOCUMENT_ROOT'].'/global.php');
include($_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php');
use Snipe\BanBuilder\CensorWords;
$censor = new CensorWords;
$getid = isset($_GET['id']) ? intval($_GET['id']) : 0;
if ($getid <= 0) {
header("Location: https://www.voidrev.us/develop/");
exit();
}
$libraryquery = $con->prepare("SELECT * FROM `library` WHERE `id` = :id AND `creatorid` = :creatorid");
$libraryquery->execute(['id' => $getid, 'creatorid' => $uID]);
$library = $libraryquery->fetch();
if (!$library) {
header("Location: https://www.voidrev.us/develop/");
exit();
}
if ($usr['hatcreator'] == 0 && ($library['type2'] == "Hat" || $library['type2'] == "Gear" || $library['type2'] == "Package" || $library['type2'] == "Face")) {
    header("Location: https://www.voidrev.us/develop/");
    exit();
}
$creatorid = $library['creatorid'];
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
$usrquery->execute(['id' => $creatorid]);
$usr = $usrquery->fetch();
$creatorname = $usr['username'];
$version = $library['version'];
$icon = $library['icon'];
if($uID !== $creatorid){
header("Location: https://www.voidrev.us/develop/");
exit();
}
if($library['banned'] > 0){
header("Location: https://www.voidrev.us/develop/");
exit();
}
if($_POST){
if($_POST["Name"] || $_POST["Description"] || $_POST["Robux"]){
$name = filter_var($_POST['Name'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$updatedescript = filter_var($_POST['Description'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$Robux = (int)$_POST['Robux'];
if ($Robux <= 0) {
$Robux = 0;
}
$Robux = max(0, $Robux);
if($library['type2'] != "Hat"){
$name = $censor->censorString($name)['clean'];
$updatedescript = $censor->censorString($updatedescript)['clean'];
}
$userid = $usr['id'];
if($name == ""){
}else{
$date = time();
if(isset($_POST["Name"])){
$nameupdate = $con->prepare("UPDATE `library` SET `name` = :name WHERE `id`= :id");
$nameupdate->execute(['name' => $name, 'id' => $getid]);
}
if(!empty($_POST["Description"])){
$updatedesc = $con->prepare("UPDATE `library` SET `description` = :description WHERE `id`= :id");
$updatedesc->execute(['description' => $updatedescript, 'id' => $getid]);
}
if(isset($_POST["Robux"])){
$updatedesc = $con->prepare("UPDATE `library` SET `Robux` = :robux WHERE `id`= :id");
$updatedesc->execute(['robux' => $Robux, 'id' => $getid]);
}
$updatedate = "UPDATE `library` SET `updated` = '$date' WHERE `id`='$getid'";
$con->exec($updatedate);
$updatethumb = "UPDATE `library` SET `refreshthumbnail` = '1' WHERE `id`='$getid'";
$con->exec($updatethumb);
header("Location: ".$_SERVER['REQUEST_URI']);
exit();
}
}
}
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" xmlns:fb="http://www.facebook.com/2008/fbml">
<head data-machine-id="WEB1269">
<!-- MachineID: WEB1269 -->
<title>Configure Item - Void</title>
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' href='https://www.voidrev.us/css/MainCSS.css' />
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' href='https://www.voidrev.us/css/universepage.css' />
<script type='text/javascript' src='//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.1.min.js'></script>
<script type='text/javascript'>window.jQuery || document.write("<script type='text/javascript' src='/js/jquery/jquery-1.11.1.js'><\/script>")</script>
<script type='text/javascript' src='//ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.2.1.min.js'></script>
<script type='text/javascript'>window.jQuery || document.write("<script type='text/javascript' src='/js/jquery/jquery-migrate-1.2.1.js'><\/script>")</script>
<script type='text/javascript' src='https://www.voidrev.us/js/86411e39f51e0ef39c7fa2f1f92fe7b3.js'></script>
<script type='text/javascript' src='https://www.voidrev.us/js/54b73269bcd426ec956755cb8cac7033.js'></script>
<script type='text/javascript'>Roblox.config.externalResources = [];Roblox.config.paths['Pages.Catalog'] = 'https://www.voidrev.us/js/109d883fe3988fca757e26e341ed0fe8.js';Roblox.config.paths['Pages.CatalogShared'] = 'https://www.voidrev.us/js/33126cd3e259a404a2563594f55a3f06.js';Roblox.config.paths['Widgets.AvatarImage'] = 'https://www.voidrev.us/js/7d49ac94271bd506077acc9d0130eebb.js';Roblox.config.paths['Widgets.DropdownMenu'] = 'https://www.voidrev.us/js/da553e6b77b3d79bec37441b5fb317e7.js';Roblox.config.paths['Widgets.HierarchicalDropdown'] = 'https://www.voidrev.us/js/4a0af9989732810851e9e12809aeb8ad.js';Roblox.config.paths['Widgets.ItemImage'] = 'https://www.voidrev.us/js/61a0490ba23afa17f9ecca2a079a6a57.js';Roblox.config.paths['Widgets.PlaceImage'] = 'https://www.voidrev.us/js/a6df74a754523e097cab747621643c98.js';</script>
<script type='text/javascript' src='https://www.voidrev.us/js/f0a2acc861db87466c6ecf755ce236d0.js'></script>
<script type='text/javascript' src='https://www.voidrev.us/js/c6b47ce9ee4cd0423d35c985917d2b4e.js'></script>
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.UpsellAdModal = Roblox.UpsellAdModal || {};
Roblox.UpsellAdModal.Resources = {
title: "Remove Ads Like This",
body: "Builders Club members do not see external ads like these.",
accept: "Upgrade Now",
decline: "No, thanks"
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
if (typeof(Roblox) === "undefined") { Roblox = {}; }
Roblox.Endpoints = Roblox.Endpoints || {};
Roblox.Endpoints.Urls = Roblox.Endpoints.Urls || {};
</script>
<script>
Roblox = Roblox || {};
Roblox.AbuseReportPVMeta = {
desktopEnabled: true,
phoneEnabled: false,
inAppEnabled: false
};
</script>
</head>
<body id="rbx-body"
class=""
data-performance-relative-value="0.000"
data-internal-page-name=""
data-send-event-percentage="0.00">
<div id="roblox-linkify" data-enabled="true" data-regex="(https?\:\/\/)?(?:www\.)?([a-z0-9\-]{2,}\.)*(((m|de|www|web|api|blog|wiki|help|corp|polls|bloxcon|developer|devforum|forum)\.idk16\.cf|robloxlabs\.com)|(www\.shoproblox\.com))((\/[A-Za-z0-9-+&amp;@#\/%?=~_|!:,.;]*)|(\b|\s))" data-regex-flags="gm" data-as-http-regex="((blog|wiki|[^.]help|corp|polls|bloxcon|developer|devforum)\.roblox\.com|robloxlabs\.com)"></div>
<div id="image-retry-data"
data-image-retry-max-times="10"
data-image-retry-timer="1500">
</div>
<div id="http-retry-data"
data-http-retry-max-timeout="0"
data-http-retry-base-timeout="0">
</div>
<div ng-modules="pageTemplateApp">
<!-- Template bundle: page -->
</div>
<div id="fb-root"></div>
<div id="modal-confirmation" class="modal-confirmation" data-modal-type="confirmation">
<div id="modal-dialog" class="modal-dialog">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal">
<span aria-hidden="true"><span class="icon-close"></span></span><span class="sr-only">Close</span>
</button>
<h5 class="modal-title"></h5>
</div>
<div class="modal-body">
<div class="modal-top-body">
<div class="modal-message"></div>
<div class="modal-image-container roblox-item-image" data-image-size="medium" data-no-overlays data-no-click>
<img class="modal-thumb" alt="generic image"/>
</div>
<div class="modal-checkbox checkbox">
<input id="modal-checkbox-input" type="checkbox"/>
<label for="modal-checkbox-input"></label>
</div>
</div>
<div class="modal-btns">
<a href id="confirm-btn"><span></span></a>
<a href id="decline-btn"><span></span></a>
</div>
<div class="loading modal-processing">
<img class="loading-default" src='https://www.voidrev.us/img//4bed93c91f909002b1f17f05c0ce13d1.gif' alt="Processing..." />
</div>
</div>
</div>
</div>
</div>
<div class="nav-container no-gutter-ads">
<div id="navContent" class="nav-content
logged-out">
<div id="MasterContainer">
<script type="text/javascript">
if (top.location != self.location) {
top.location = self.location.href;
}
</script>
<div>
<noscript><div class="alert-info">Please enable Javascript to use all the features on this site.</div></noscript>
<div id="BodyWrapper" class="">
<div id="RepositionBody">
<div id="Body" class="body-width">
<h1>Configure Item</h1>
<span class="back-button"><a href="/develop">Back</a></span>
<div>
<div id="navbar" class="nav-bar">
<div class="verticaltab selected" data-maindiv="basicSettings">
<a href="#">Basic Settings</a>
</div>
</div>
<div id="universe-configure" class="universe-content divider-left"
data-universeid="<?=$getid;?>"
data-addplaceurl="/library/addplace"
data-removeplaceurl="/library/removeplace"
data-configureplaceurl="/library/configure-universe-places"
data-loadmoreplacesurl="/library/get-universe-places">
<form id="configureUniverseForm" method="post" action="">
<input id="Id" name="Id" type="hidden" value="<?=$getid;?>" />
<input name="__RequestVerificationToken" type="hidden" value="1" />
<div id="basicSettings" class="configure-tab">
<div class="headline">
<h2>Basic Settings</h2>
</div>
<div class="universe-form-label ">
<label class="form-label" for="Name">Name</label>:
</div>
<div class="name-field-container">
<input autofocus="" class="text-box text-box-medium universe-input" id="Name" maxlength="50" name="Name" type="text" value="<?echo NoXSSPlz($library['name']);?>" />
<div class="tool-tip warning-text name-error" style="display: none">
Name cannot be empty
<img src="https://www.voidrev.us/img//77c4414271016f8257c136305b7888b4.png" class="right">
</div>
</div>
<div class="universe-form-label ">
<label class="form-label" for="Description">Description</label>:
</div>
<div class="description-field-container">
<textarea class="text-box text-area-medium" cols="51" id="Description" maxlength="1000" name="Description" value="<?echo NoXSSPlz($library['description']);?>" placeholder="<?echo NoXSSPlz($library['description']);?>" rows="3"></textarea>
</div>
<br />
<?php
if ($library['type'] == "item"){ ?>
<div class="universe-form-label ">
<label class="form-label" for="Description">Robux</label>:
</div>
<div class="robux-field-container">
<textarea class="text-box text-area-medium" id="Robux" maxlength="50" name="Robux" value="<?echo NoXSSPlz($library['Robux']);?>" placeholder="<?echo NoXSSPlz($library['Robux']);?>"></textarea>
</div>
<br />
<? } ?>
<div class="universe-buttons">
<a class="btn-medium btn-neutral configure-save-button" id="okButton">Save</a>
<!-- <input class="btn-medium btn-neutral configure-save-button" id="okButton" type="submit" value="Save" name="wot" class="btn"> -->
<a href="https://www.voidrev.us/develop/library" class="btn-medium btn-negative" id="cancelButton">Cancel</a>
</div>
</div>
</form>
<form action="../itemfileUploadScript" method="post" enctype="multipart/form-data">
Update a File:
<input type="file" name="the_file" accept=".rbxm, .rbxmx, .png, .mp3, .ogg" id="fileToUpload">
<input type="submit" name="submit" value="Start Upload">
<input type="hidden" name="assetId" value="<?=$getid;?>">
</form>
<div class="clear"></div>
</div>
<div id="places" class="configure-tab" style="display: none">
<div id="configure-places" class="configure-places-container">
<div id="universe-error" style="display: none" class="error-message"></div>
<div id="set-startplace-container" class="start-place-container divider-bottom">
<div class="configure-places-title">
<h3>Start Place </h3><span class="universe-configure-tooltip info-tool-tip tooltip-top" title="This place will be the starting point for your Game"></span>
</div>
<div id="startplace-container" class="start-place">
<div class="universe-place-container">
<div class="universe-place-thumb">
<a href="https://www.voidrev.us/games/place.php?id=<?=$getid;?>" class="universe-place" ><img class='universe-place-image' src='/img/games/<?=$icon;?>s.png'/></a>
</div>
<div class="universe-detail">
<a href="https://www.voidrev.us/games/place.php?id=<?=$getid;?>"><?echo NoXSSPlz($library['name']);?></a>
</div>
<div class="clear"></div>
</div>
</div>
</div>
<div class="configure-places-title">
<h3>Other Places </h3><span class="universe-configure-tooltip info-tool-tip tooltip-top" title="Add more places to your Game"></span>
</div>
<div id="add-universe-places" class="add-places-container">
<a class="btn-small btn-primary add-place-button" id="add-place-modal-button">Add Place</a>
<div class="universe-places-paged" data-isuniversecreation="false">
<div id="current-places" data-startrow="0" data-universeid="<?=$getid;?>" data-totalcount="0">
</div>
<div class="universe-place-container" style=display:none>
<div class="universe-place-thumb">
<a href="https://www.voidrev.us/games/<?=$getid;?>" class="universe-place" ><img class='universe-place-image' src=''/></a>
</div>
<div class="universe-detail">
<a href="https://www.voidrev.us/games/<?=$getid;?>"><?echo NoXSSPlz($library['name']);?></a>
</div>
<div class="clear"></div>
</div>
<div class="missing-start-place blank-box">
<span>You can add more places to your Game.</span>
</div>
</div>
</div>
<div class="clear"></div>
</div>
<div class="PlaceSelectorModal modalPopup unifiedModal" style="display:none;">
<div class="Title">Select Place</div>
<div class="GenericModalBody text">
<div class="place-selector-modal" data-place-loader-url="/universes/get-places-by-context?creationContext=NonGameCreation&amp;universeId=<?=$getid;?>">
<div class="place-selector-container">
<div id="PlaceSelectorItemContainer" class="place-selector-item-container"></div>
<div id="PlaceSelectorPagerContainer" class="place-selector-pager-container"></div>
</div>
<div class="place-selector selectable template" title="Place" style="display: none">
<div class="place-image" data-retry-url-template="https://thumbnails.roblox.com/v1/assets?size=160x100&amp;format=jpeg&amp;returnPolicy=AutoGenerated">
<img alt="^_^" class="item-image" src="https://www.voidrev.us/img//ec5c01d220bf1b73403fa51519267742.gif"/>
</div>
<div class="InfoContainer">
<div class="place-name"></div>
<div class="game-name"><span class="form-label">Game: </span><span class="game-name-text"></span></div>
<div class="root-place" style="display: none"><span>Cannot choose start places</span></div>
</div>
<div style="clear:both;"></div>
</div>
</div>
</div>
</div>
</div>
<div id="createdPlaces" class="configure-tab" style="display: none">
<div id="configure-places" class="configure-places-container">
<div id="universe-error" style="display: none" class="error-message"></div>
<div class="configure-places-title">
<h3>Created Places </h3><span class="universe-configure-tooltip info-tool-tip tooltip-top" title="These places were created using your Game."></span>
</div>
<div class="universe-places-paged" data-isuniversecreation="true" >
<div id="current-places" data-startrow="0" data-universeid="<?=$getid;?>" data-totalcount="0">
</div>
<div class="missing-start-place blank-box">
<span>You can use the <a href="https://developer.roblox.com/en-us/api-reference/function/AssetService/CreatePlaceAsync" target="blank">Create and Save Place API</a> for creating Places. Check the
<a href="https://developer.roblox.com/en-us/articles/games-and-places" target="blank">Roblox DevHub</a> for more information.</span>
</div>
</div>
<div class="clear"></div>
</div>
</div>
</div>
<div id="gameUpdate" class="configure-tab" style="display: none">
</div>
<div id="ProcessingView" style="display: none">
<div class="ProcessingModalBody">
<p class="processing-indicator"><img src='https://www.voidrev.us/img//ec4e85b0c4396cf753a06fade0a8d8af.gif' alt="Saving the Item..."/>
</p>
<p class="processing-text">Saving the Item...</p>
</div>
</div>
<script type="text/javascript">
if (typeof Roblox === "undefined") {
Roblox = {};
}
if (typeof Roblox.UniverseConfigurePage === "undefined") {
Roblox.UniverseConfigurePage = {};
}
</script>
<div style="clear: both"></div>
</div>
</div>
</div>
<script type="text/javascript">function urchinTracker() {}</script>
<div id="PlaceLauncherStatusPanel" style="display:none;width:300px"
data-new-plugin-events-enabled="True"
data-event-stream-for-plugin-enabled="True"
data-event-stream-for-protocol-enabled="True"
data-is-game-launch-interface-enabled="True"
data-is-protocol-handler-launch-enabled="True"
data-is-user-logged-in="True"
data-os-name="Windows"
data-protocol-name-for-client="limb16-player"
data-protocol-name-for-studio="roblox-studio-lim2016"
data-protocol-url-includes-launchtime="true"
data-protocol-detection-enabled="true">
<div class="modalPopup blueAndWhite PlaceLauncherModal" style="min-height: 160px">
<div id="Spinner" class="Spinner" style="padding:20px 0;">
<img data-delaysrc="https://www.voidrev.us/img//e998fb4c03e8c2e30792f2f3436e9416.gif" height="32" width="32" alt="Progress" />
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
<img data-delaysrc="https://www.voidrev.us/img//e060b59b57fdcc7874c820d13fdcee71.svg" width="90" height="90" alt="R" />
</div>
<div class="ph-areyouinstalleddialog-content">
<p class="larger-font-size">
ROBLOX is now loading. Get ready to play!
</p>
<div class="ph-startingdialog-spinner-row">
<img data-delaysrc="https://www.voidrev.us/img//4bed93c91f909002b1f17f05c0ce13d1.gif" width="82" height="24" />
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
<img data-delaysrc="https://www.voidrev.us/img//e060b59b57fdcc7874c820d13fdcee71.svg" width="90" height="90" alt="R" />
</div>
<div class="ph-areyouinstalleddialog-content">
<p class="larger-font-size">
You're moments away from getting into the game!
</p>
<div>
<button type="button" class="btn btn-primary-md" id="ProtocolHandlerInstallButton" >
Download and Install ROBLOX
</button>
</div>
<div class="small">
<a href="https://help.voidrev.us/hc/en-us/articles/204473560" class="text-name" target="_blank">Click here for help</a>
</div>
</div>
</div>
</div>
<div id="ProtocolHandlerClickAlwaysAllowed" class="ph-clickalwaysallowed" style="display:none;">
<p class="larger-font-size">
<span class="icon-moreinfo"></span>
Check <b>Remember my choice</b> and click
<img data-delaysrc="https://www.voidrev.us/img//7c8d7a39b4335931221857cca2b5430b.png" alt="Launch Application" />
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
<div class="VisitButtonsGuestCharacter VisitButtonBoyGuest" style="float:left; margin-left:45px;"></div>
<div class="VisitButtonsGuestCharacter VisitButtonGirlGuest" style="float:right; margin-right:45px;"></div>
</div>
<div style="clear:both; height:25px;"></div>
<div class="RevisedFooter">
<div style="width:200px;margin:10px auto 0 auto;">
<a href="https://www.voidrev.us"><div class="RevisedCharacterSelectSignup"></div></a>
<a class="HaveAccount" href="https://www.voidrev.us/newlogin">I have an account</a>
</div>
</div>
</div>
</div>
<script type="text/javascript">
function checkRobloxInstall() {
window.location = 'https://www.voidrev.us/install/unsupported.aspx?osx=10.5'; return false;
}
</script>
<div id="InstallationInstructions" class="" style="display:none;">
<div class="ph-installinstructions">
<div class="ph-modal-header">
<span class="icon-close simplemodal-close"></span>
<h3 class="title">Thanks for playing ROBLOX</h3>
</div>
<div class="modal-content-container">
<div class="ph-installinstructions-body ">
<div class="ph-install-step ph-installinstructions-step1-of4">
<h1>1</h1>
<p class="larger-font-size">Click <strong>RobloxPlayer.exe</strong> to run the ROBLOX installer, which just downloaded via your web browser.</p>
<img width="230" height="180" data-delaysrc="https://www.voidrev.us/img//8b0052e4ff81d8e14f19faff2a22fcf7.png" />
</div>
<div class="ph-install-step ph-installinstructions-step2-of4">
<h1>2</h1>
<p class="larger-font-size">Click <strong>Run</strong> when prompted by your computer to begin the installation process.</p>
<img width="230" height="180" data-delaysrc="https://www.voidrev.us/img//4a3f96d30df0f7879abde4ed837446c6.png" />
</div>
<div class="ph-install-step ph-installinstructions-step3-of4">
<h1>3</h1>
<p class="larger-font-size">Click <strong>Ok</strong> once you've successfully installed ROBLOX.</p>
<img width="230" height="180" data-delaysrc="https://www.voidrev.us/img//6e23e4971ee146e719fb1abcb1d67d59.png" />
</div>
<div class="ph-install-step ph-installinstructions-step4-of4">
<h1>4</h1>
<p class="larger-font-size">After installation, click <strong>Play</strong> below to join the action!</p>
<div class="VisitButton VisitButtonContinueGLI">
<a class="btn btn-primary-lg disabled">Play</a>
</div>
</div>
</div>
</div>
<div class="xsmall">
The ROBLOX installer should download shortly. If it doesn’t, start the <a href="#" class="text-link" onclick="Roblox.ProtocolHandlerClientInterface.startDownload(); return false;">download now.</a>
</div>
</div>
</div>
<div class="InstallInstructionsImage" data-modalwidth="970" style="display:none;"></div>
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
Roblox.Client._installSuccess = function() {
if(GoogleAnalyticsEvents){
GoogleAnalyticsEvents.ViewVirtual('InstallSuccess');
GoogleAnalyticsEvents.FireEvent(['Plugin','Install Success']);
if (Roblox.Client._eventStreamLoggingEnabled && typeof Roblox.GamePlayEvents != "undefined") {
Roblox.GamePlayEvents.SendInstallSuccess(Roblox.Client._launchMode, play_placeId);
}
}
}
if ((window.chrome || window.safari) && window.location.hash == '#chromeInstall') {
window.location.hash = '';
var continuation = '(' + $.cookie('chromeInstall') + ')';
play_placeId = $.cookie('chromeInstallPlaceId');
Roblox.GamePlayEvents.lastContext = $.cookie('chromeInstallLaunchMode');
$.cookie('chromeInstallPlaceId', null);
$.cookie('chromeInstallLaunchMode', null);
$.cookie('chromeInstall', null);
RobloxLaunch._GoogleAnalyticsCallback = function() { var isInsideRobloxIDE = 'website'; if (Roblox && Roblox.Client && Roblox.Client.isIDE && Roblox.Client.isIDE()) { isInsideRobloxIDE = 'Studio'; };GoogleAnalyticsEvents.FireEvent(['Plugin Location', 'Launch Attempt', isInsideRobloxIDE]);GoogleAnalyticsEvents.FireEvent(['Plugin', 'Launch Attempt', 'Play']);EventTracker.fireEvent('GameLaunchAttempt_Unknown', 'GameLaunchAttempt_Unknown_Plugin'); if (typeof Roblox.GamePlayEvents != 'undefined') { Roblox.GamePlayEvents.SendClientStartAttempt(null, play_placeId); } };
Roblox.Client.ResumeTimer(eval(continuation));
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
