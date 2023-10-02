<?php include($_SERVER['DOCUMENT_ROOT'] . '/global.php');
if (!$logged) {
header('Location: https://www.voidrev.us/');
}
?>
<!--[if IE 8]><html class=ie8 ng-app=robloxApp><![endif]--> <!--[if gt IE 8]><!-->
<html><!--<![endif]-->
<head data-machine-id=WEB1166>
<title>Home - Void</title>
<meta name=user-data data-userid=<?=$uID;?> data-name=<?php echo NoXSSPlz($username);?> data-isunder13=false>
<meta name=locale-data data-language-code=en_us data-language-name=English data-locale-api-url=https://www.voidrev.us>
<link rel=canonical href="https://www.voidrev.us/home?nl=true">
<link rel=stylesheet href=https://www.voidrev.us/css/leanbase.css>
<link rel=stylesheet href=https://www.voidrev.us/css/home.css>
<script src=//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.1.min.js></script>
<script>
window.jQuery || document.write("<script type='text/javascript' src='/js/jquery/jquery-1.11.1.js'><\/script>")
</script>
<script src=//ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.2.1.min.js></script>
<script>
window.jQuery || document.write("<script type='text/javascript' src='/js/jquery/jquery-migrate-1.2.1.js'><\/script>")
</script>
<script src=https://www.voidrev.us/js/274cdda5d1120633af7486a6f25b2019.js></script>
<script>
var Roblox = Roblox || {};
Roblox.RealTimeSettings = Roblox.RealTimeSettings || {
NotificationsEndpoint: "https://www.voidrev.us/",
NotificationsTestInterval: "5000",
MaxConnectionTime: "43200000",
IsStateTrackingEnabled: true,
IsEventPublishingEnabled: false,
IsDisconnectOnSlowConnectionDisabled: true,
IsSignalRClientTransportRestrictionEnabled: true,
IsLocalStorageInRealTimeEnabled: true,
UserId: "<?=$uID;?>"
}
</script>
<meta name=viewport content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
<div id="Skyscraper-Abp-Left" class="abp abp-container left-abp">
<iframe name="Roblox_GameDetail_Left_160x600" allowtransparency="true" frameborder="0" height="612" scrolling="no" data-src="" src="https://www.voidrev.us/user-sponsorship/?id=1" width="160" data-js-adtype="iframead" data-ad-slot="Roblox_GameDetail_Left_160x600"></iframe>
</div>
<div id=HomeContainer class="row home-container">
<div class="col-xs-12 home-header"><a href=https://www.voidrev.us/users/<?=$uID;?>/profile class="avatar avatar-headshot-lg"> <img alt=avatar src=<?=getUserHeadshotThumbnail($con,$uID);?> id=home-avatar-thumb class=avatar-card-image> </a>
<script>
$("img#home-avatar-thumb").on('load', function() {
if (Roblox && Roblox.Performance) {
Roblox.Performance.setPerformanceMark("head_avatar");
}
});
</script>
<div class="home-header-content non-bc">
<h1><a href=https://www.voidrev.us/users/<?=$uID;?>/profile> Hello, <?php echo NoXSSPlz($username);?>! </a>
</h1>
<?php
if($membership == "BuildersClub"){
echo'<span class="icon-bc"></span>';
}elseif($membership == "TurboBuildersClub"){
echo'<span class="icon-tbc"></span>';
}elseif($membership == "OutrageousBuildersClub"){
echo'<span class="icon-obc"></span>';
}else{
// no
}
?>
</div>
</div>
<div class="col-xs-12 section home-friends">
<div class=container-header>
<?php $friendcount = $con->prepare("SELECT * FROM `friends` WHERE `status`='2' AND (toid= :toid OR fromid= :fromid)");
$friendcount->execute(['toid' => $uID, 'fromid' => $uID]);
$number = $friendcount->rowCount(); ?>
<h3>Friends (<?=$number;?>)</h3><a href=https://www.voidrev.us/users/friends class="btn-secondary-xs btn-more btn-fixed-width">See All</a>
</div>
<div class=section-content>
<ul class="hlist friend-list">
<?php
$friendquery = $con->prepare("
SELECT f.*, u.*
FROM `friends` AS f
JOIN `users` AS u ON (f.fromid = u.id OR f.toid = u.id) AND u.id != :uID
WHERE f.`status` = '2' AND (f.toid = :toid OR f.fromid = :fromid)
ORDER BY u.onlinetime DESC
LIMIT 9
");
$friendquery->execute(['uID' => $uID, 'toid' => $uID, 'fromid' => $uID]);
while ($friends = $friendquery->fetch()) {
$friendid = ($friends['fromid'] == $uID) ? $friends['toid'] : $friends['fromid'];
$dif = time() - $friends['onlinetime'];
if ($dif < 120) {
$onlinestat = "online";
} else {
$onlinestat = "offline";
}
$clientstat = $friends['clientstatus'];
$friendsuser = $friends;
?>
<li id=friend_<?=$friendsuser['id'];?> class="list-item friend">
<div class=avatar-container><a href=https://www.voidrev.us/users/<?=$friendsuser['id'];?>/profile class="avatar avatar-card-fullbody friend-link" title=<?php echo NoXSSPlz($friendsuser['username']);?>> <span class="avatar-card-link friend-avatar" data-3d-url="/avatar-thumbnail-3d/json?userId=<?=$friendsuser['id'];?>" data-orig-retry-url="/avatar-thumbnail/json?userId=<?=$friendsuser['id'];?>&amp;width=100&amp;height=100&amp;format=png"><img alt=<?php echo NoXSSPlz($friendsuser['username']);?> class=avatar-card-image src="<?=getUserHeadshotThumbnail($con,$friendsuser['id']);?>"></span> <span class="text-overflow friend-name"><?php echo NoXSSPlz($friendsuser['username']);?></span> </a> <?php if($onlinestat == "online" && $clientstat != "InGame" && $clientstat != "AppStarted"){ ?></span>
<span class="avatar-status online friend-status icon-online" title="Website"></span>
<?php }else if($onlinestat != "online"){ ?>
<span class="avatar-status offline friend-status icon-offline" title="Offline"></span>
<?php }else if($clientstat == "InGame"){ ?>
<span class="avatar-status game friend-status icon-game" title="In Game"></span>
<?php }else if($clientstat == "AppStarted"){ ?>
<span class="avatar-status studio friend-status icon-studio" title="In Studio"></span>
</div>
</li>
<? } ?></div>
<? } ?>
</ul>
</div>
</div>
<div id=recently-visited-places class="col-xs-12 container-list home-games">
<div id=recently-visited-places-header class=container-header>
<h3>Recently Played</h3><a href="https://www.voidrev.us/games?sortFilter=6" class="btn-secondary-xs btn-more btn-fixed-width">See All</a>
</div>
<div id=recently-visited-places-list class=game-card-list>
<div id=recently-visited-places-content-spinner class="loading-animated game-card-list-spinner">
<div>
<div></div>
<div></div>
<div></div>
</div>
</div>
<div id=recently-visited-places-content></div>
</div>
</div>
<div id=my-favorites-games class="col-xs-12 container-list home-games">
<div id=my-favorites-games-header class=container-header>
<h3>My Favorites</h3><a href=https://www.voidrev.us/users/<?=$uID;?>/favorites#!/places class="btn-secondary-xs btn-more btn-fixed-width">See All</a>
</div>
<div id=my-favorites-games-list class=game-card-list>
<div id=my-favorites-games-content-spinner class="loading-animated game-card-list-spinner">
<div>
<div></div>
<div></div>
<div></div>
</div>
</div>
<div id=my-favorites-games-content></div>
</div>
</div>
<div id=game-item-card-template class=hidden>
<li class="list-item game-card">
<div class=game-card-container><a id=game-card-link href=gameCardLink class=game-card-link>
<div id=game-card-thumb-container class=game-card-thumb-container><img class=game-card-thumb alt=title thumbnail="" image-retry></div>
<div id=game-card-title class="text-overflow game-card-name" title=title></div>
<div id=game-card-name-secondary class=game-card-name-secondary></div>
<div class=game-card-vote>
<div class=vote-bar data-voting-processed=false>
<div class=vote-thumbs-up><span class=icon-like-gray-16x16></span></div>
<div id=vote-container class=vote-container data-upvotes=0 data-downvotes=0>
<div class=vote-background></div>
<div class=vote-percentage></div>
<div class=vote-mask>
<div class="segment seg-1"></div>
<div class="segment seg-2"></div>
<div class="segment seg-3"></div>
<div class="segment seg-4"></div>
</div>
</div>
<div class=vote-thumbs-down><span class=icon-dislike-gray-16x16></span></div>
</div>
<div class=vote-counts>
<div class=vote-down-count></div>
<div class=vote-up-count></div>
</div>
</div>
</a>
<div class=game-card-footer>
<div class=creator><span class="text-label xsmall text-overflow" id=game-card-creator-by></span></div>
</div>
</div>
</li>
</div>
<div id=friend-activity class="col-xs-12 container-list home-games">
<div class=container-header>
<h3>Friend Activity</h3><a href="https://www.voidrev.us/games?sortFilter=17" class="btn-secondary-xs btn-more btn-fixed-width">See All</a>
</div>
<ul class="hlist game-cards">
</ul>
</div>
<div class="col-xs-12 col-sm-6 home-right-col">
<div class=section>
<div class=section-header>
<h3>Blog News</h3><a href=https://www.voidrev.us class="btn-control-xs btn-more btn-fixed-width">See More</a>
</div>
<div class=section-content>
<ul class=blog-news>
</ul>
</div>
</div>
</div>
<div class="col-xs-12 col-sm-6 home-left-col">
<div class=section id=feed-container data-update-status-url=/home/updatestatus>
<div class=section-header>
<h3>My Feed</h3>
</div>
<div class=section-content>
<div class="form-horizontal flex-box" id=statusForm role=form>
<div class=form-group><input class="form-control input-field" id=txtStatusMessage maxlength=254 placeholder="What are you up to?">
<p class=form-control-label>Status update failed.
</div><a type=button class=btn-primary-md id=shareButton>Share</a> <img id=loadingImage class=share-login alt=Sharing... src=https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif height=17 width=48>
</div>
<ul class="vlist feeds">
<?php
// Assume $currentUser is the current user's ID
$feedquery = $con->prepare("SELECT * FROM `myfeed` ORDER BY timestamp DESC LIMIT 20");
$feedquery->execute();
while($feed = $feedquery->fetch()) {
$posterid = $feed['userid'];
$userquery = $con->prepare("SELECT * FROM `users` WHERE `id`= :id");
$userquery->execute(['id' => $posterid]);
$userfriends = $userquery->fetch();
?>
<li class=list-item><a href="https://www.voidrev.us/users/<?=$feed['userid'];?>/profile" class=list-header><img class=header-thumb src=<?=getUserThumbnail($con,$feed['userid']);?>></a>
<div class=list-body>
<p class=list-content><a href="https://www.voidrev.us/users/<?=$feed['userid'];?>/profile"><? echo NoXSSPlz($userfriends['username']); ?></a>
<p class="feedtext linkify">"<? echo NoXSSPlz($feed['status']); ?>"</p><span class="xsmall text-date-hint"><?php echo date("M d, Y | h:i A (T)", (int)$feed["timestamp"]); ?></span> <a href="https://www.voidrev.us/abusereport/Feed?id=<?=$feed['id'];?>&amp;redirectUrl=https%3A%2F%2Fwww.voidrev.us%2Fhome" class=abuse-report-modal> <span class=icon-report></span> </a>
</div>
<? } ?>
</ul>
</div>
</div>
</div>
</div>
<script>
var Roblox = Roblox || {};
Roblox.I18nData = Roblox.I18nData || {};
Roblox.I18nData.isI18nEnabledOnGames = false;
</script>
<script>
$(function() {
var name = '<?php echo NoXSSPlz($username);?>';
var hashRegex = '^0000';
var devType = 'Computer';
if (Roblox && Roblox.Hashcash) {
Roblox.Home.doProofOfWork(name, hashRegex, devType);
}
});
</script>
<div id="Skyscraper-Abp-Right" class="abp abp-container right-abp">
<iframe name="Roblox_GameDetail_Right_160x600" allowtransparency="true" frameborder="0" height="612" scrolling="no" data-src="" src="https://www.voidrev.us/user-sponsorship/?id=1" width="160" data-js-adtype="iframead" data-ad-slot="Roblox_GameDetail_Right_160x600"></iframe>
</div>
</div>
</div>
<footer class=container-footer>
<div class=footer>
<ul class="row footer-links">
<li class="col-4 col-xs-1 footer-link"><a href=http://www.voidrev.us class="text-footer-nav roblox-interstitial" target=_blank> About Us </a>
<li class="col-4 col-xs-1 footer-link"><a href="https://www.voidrev.us/careers/" class="text-footer-nav roblox-interstitial" target=_blank> Jobs </a>
<li class="col-4 col-xs-1 footer-link"><a href=https://www.voidrev.us class=text-footer-nav target=_blank> Blog </a>
<li class="col-4 col-xs-1 footer-link"><a href=http://www.voidrev.us/parents class="text-footer-nav roblox-interstitial" target=_blank> Parents </a>
<li class="col-4 col-xs-1 footer-link"><a href=https://www.voidrev.us/help class="text-footer-nav roblox-interstitial" target=_blank> Help </a>
<li class="col-4 col-xs-1 footer-link"><a href=https://www.voidrev.us/info/terms class=text-footer-nav target=_blank> Terms </a>
<li class="col-4 col-xs-1 footer-link"><a href=https://www.voidrev.us/info/privacy class="text-footer-nav privacy" target=_blank> Privacy </a>
</ul>
<p class="text-footer footer-note">&copy;2018 Roblox Corporation. Roblox, the Roblox logo, Robux, Bloxy, and Powering Imagination are among our registered and unregistered trademarks in the U.S. and other countries.
</div>
</footer>
</div>
<div ng-modules="robloxApp, notificationStream" ng-controller=notificationStreamController class="roblox-popover-content manual bottom" data-hidden-class-name=invisible id=notification-stream data-isnotificationcontentopen={{layout.isNotificationContentOpen}} ng-class="{'inApp': library.inApp,
'isPhone': library.isPhone,
'invisible': !library.inApp &amp;&amp; !layout.isNotificationContentOpen}">
<div notification-content></div>
</div>
<script>
function urchinTracker() {}
</script>
<div id=PlaceLauncherStatusPanel style=display:none;width:300px data-new-plugin-events-enabled=True data-event-stream-for-plugin-enabled=True data-event-stream-for-protocol-enabled=True data-is-game-launch-interface-enabled=True data-is-protocol-handler-launch-enabled=True data-is-user-logged-in=True data-os-name=OSX data-protocol-name-for-client=roblox-player data-protocol-name-for-studio=roblox-studio data-protocol-url-includes-launchtime=true data-protocol-detection-enabled=true data-protocol-version=1>
<div class="modalPopup blueAndWhite PlaceLauncherModal" style=min-height:160px>
<div id=Spinner class=Spinner style="padding:20px 0"><img data-delaysrc=https://www.voidrev.us/img/e998fb4c03e8c2e30792f2f3436e9416.gif height=32 width=32 alt=Progress></div>
<div id=status style="min-height:40px;text-align:center;margin:5px 20px">
<div id=Starting class="PlaceLauncherStatus MadStatusStarting" style=display:block>Starting Roblox...</div>
<div id=Waiting class="PlaceLauncherStatus MadStatusField">Connecting to Players...</div>
<div id=StatusBackBuffer class="PlaceLauncherStatus PlaceLauncherStatusBackBuffer MadStatusBackBuffer"></div>
</div>
<div style=text-align:center;margin-top:1em><input type=button class="Button CancelPlaceLauncherButton translate" value=Cancel></div>
</div>
</div>
<div id=ProtocolHandlerStartingDialog style=display:none class=protocol-handler-container>
<div class="modalPopup ph-modal-popup">
<div class=ph-modal-header></div>
<div class=play-modal>
<div class=ph-logo-row><img src=https://www.voidrev.us/img/6304dfebadecbb3b338a79a6a528936c.svg width=90 height=90 alt=R></div>
<div class=ph-areyouinstalleddialog-content>
<p class=larger-font-size>Roblox is now loading. Get ready to play!
<div class=ph-startingdialog-spinner-row><img src=https://www.voidrev.us/img/4bed93c91f909002b1f17f05c0ce13d1.gif width=82 height=24></div>
</div>
</div>
<div class="studio-modal hidden">
<div class=ph-logo-row><img src=https://www.voidrev.us/img/3da410727fa2670dcb4f31316643138a.svg width=90 height=90 alt=R class=studio-logo-image></div>
<div class=ph-areyouinstalleddialog-content>
<p class="larger-font-size studio-text">Checking for Roblox Studio...
<div class=ph-startingdialog-spinner-row><img src=https://www.voidrev.us/img/4bed93c91f909002b1f17f05c0ce13d1.gif width=82 height=24></div>
</div>
</div>
</div>
</div>
<div id=ProtocolHandlerAreYouInstalled style=display:none class=protocol-handler-container>
<div class=play-modal>
<div class="modalPopup ph-modal-popup">
<div class=ph-modal-header><span class="icon-close simplemodal-close"></span></div>
<div class=ph-logo-row><img src=https://www.voidrev.us/img/6304dfebadecbb3b338a79a6a528936c.svg width=90 height=90 alt=R></div>
<div class=ph-areyouinstalleddialog-content>
<p class=larger-font-size>You're moments away from getting into the game!
<div><button type=button class="btn btn-primary-md" id=ProtocolHandlerInstallButton> Download and Install Roblox </button></div>
<div class=small><a href=https://en.help.voidrev.us/hc/en-us/articles/204473560 class=text-name target=_blank>Click here for help</a></div>
</div>
</div>
</div>
<div class="studio-modal hidden">
<div class="modalPopup ph-modal-popup">
<div class=ph-modal-header><span class="icon-close simplemodal-close"></span></div>
<div class=ph-logo-row><img src=https://www.voidrev.us/img/3da410727fa2670dcb4f31316643138a.svg width=95 height=95 alt=R></div>
<div class=ph-areyouinstalleddialog-content>
<p class="larger-font-size text-header">Get started creating your own games!
<div><button type=button class="btn btn-primary-md btn-install" id=ProtocolHandlerStudioInstallButton> Download Studio </button></div>
</div>
</div>
</div>
</div>
<div id=ProtocolHandlerClickAlwaysAllowed class=ph-clickalwaysallowed style=display:none>
<p class=larger-font-size><span class=icon-moreinfo></span> Check <b>Always open links for Roblox</b> and click <b>Open Roblox</b> in the dialog box above to join games faster in the future!
</div>
<div id=videoPrerollPanel style=display:none>
<div id=videoPrerollTitleDiv>Gameplay sponsored by:</div>
<div id=content><video id=contentElement style=width:0;height:0></div>
<div id=videoPrerollMainDiv></div>
<div id=videoPrerollCompanionAd></div>
<div id=videoPrerollLoadingDiv>Loading <span id=videoPrerollLoadingPercent>0%</span> - <span id=videoPrerollMadStatus class=MadStatusField>Starting game...</span><span id=videoPrerollMadStatusBackBuffer class=MadStatusBackBuffer></span>
<div id=videoPrerollLoadingBar>
<div id=videoPrerollLoadingBarCompleted></div>
</div>
</div>
<div id=videoPrerollJoinBC><span>Get more with Builders Club!</span> <a href="https://www.voidrev.us/premium/membership?ctx=preroll" target=_blank class="btn-medium btn-primary" id=videoPrerollJoinBCButton>Join Builders Club</a></div>
</div>
<script>
$(function() {
var videoPreRollDFP = Roblox.VideoPreRollDFP;
if (videoPreRollDFP) {
var customTargeting = Roblox.VideoPreRollDFP.customTargeting;
videoPreRollDFP.showVideoPreRoll = false;
videoPreRollDFP.loadingBarMaxTime = 33000;
videoPreRollDFP.videoLoadingTimeout = 11000;
videoPreRollDFP.videoPlayingTimeout = 41000;
videoPreRollDFP.videoLogNote = "NotWindows";
videoPreRollDFP.logsEnabled = true;
videoPreRollDFP.adUnit = "/1015347/VideoPreroll";
videoPreRollDFP.adTime = 15;
videoPreRollDFP.includedPlaceIds = "205224386,183364845";
videoPreRollDFP.isSwfPreloaderEnabled = false;
videoPreRollDFP.isPrerollShownEveryXMinutesEnabled = true;
videoPreRollDFP.isAgeTargetingEnabled = true;
videoPreRollDFP.isAgeOrSegmentTargetingEnabled = true;
videoPreRollDFP.isCompanionAdRenderedByGoogleTag = true;
customTargeting.userAge = "63";
customTargeting.userAgeOrSegment = "63";
customTargeting.userGender = "Male";
customTargeting.gameGenres = "";
customTargeting.environment = "Production";
customTargeting.adTime = "15";
customTargeting.PLVU = false;
$(videoPreRollDFP.checkEligibility);
}
});
</script>
<div id=GuestModePrompt_BoyGirl class="Revised GuestModePromptModal" style=display:none>
<div class=simplemodal-close><a class="ImageButton closeBtnCircle_20h" style=cursor:pointer;margin-left:455px;top:7px;position:absolute></a></div>
<div class=Title>Choose Your Avatar</div>
<div style=min-height:275px;background-color:white>
<div style=clear:both;height:25px></div>
<div style=text-align:center>
<div class="VisitButtonsGuestCharacter VisitButtonBoyGuest" style=float:left;margin-left:45px></div>
<div class="VisitButtonsGuestCharacter VisitButtonGirlGuest" style=float:right;margin-right:45px></div>
</div>
<div style=clear:both;height:25px></div>
<div class=RevisedFooter>
<div style="width:200px;margin:10px auto 0 auto"><a href="https://www.voidrev.us/?returnUrl=https%3A%2F%2Fwww.voidrev.us%2Fhome%3Fnl%3Dtrue">
<div class=RevisedCharacterSelectSignup></div>
</a> <a class=HaveAccount href="https://www.voidrev.us/newlogin?returnUrl=https%3A%2F%2Fwww.voidrev.us%2Fhome%3Fnl%3Dtrue">I have an account</a></div>
</div>
</div>
</div>
<script>
function checkRobloxInstall() {
return RobloxLaunch.CheckRobloxInstall('https://www.voidrev.us/install/download.aspx');
}
</script>
<div id=InstallationInstructions style=display:none>
<div class=ph-installinstructions>
<div class=ph-modal-header><span class="icon-close simplemodal-close"></span>
<h3 class=title>Thanks for playing Roblox</h3>
</div>
<div class=modal-content-container>
<div class=ph-installinstructions-body>
<ul class=modal-col-5>
<li class=step1-of-5>
<h2>1</h2>
<p class=larger-font-size>Click <strong>Roblox.dmg</strong> to run the Roblox installer, which just downloaded via your web browser.</p><img data-delaysrc=https://www.voidrev.us/img/a70f6029e3dd81c18f837b958feb7f4c.png>
<li class=step2-of-5>
<h2>2</h2>
<p class=larger-font-size>Double-click the Roblox app icon to begin the installation process.</p><img data-delaysrc=https://www.voidrev.us/img/57f502e3d6e41987f1fa2d988366feba.png>
<li class=step3-of-5>
<h2>3</h2>
<p class=larger-font-size>Click <strong>Open</strong> when prompted by your computer.</p><img data-delaysrc=https://www.voidrev.us/img/13760ce84c2c382927405c0774886eba.png>
<li class=step4-of-5>
<h2>4</h2>
<p class=larger-font-size>Click <strong>Ok</strong> once you've successfully installed Roblox.</p><img data-delaysrc=https://www.voidrev.us/img/e7439961916d36f97ea5e7af3b5077ad.png>
<li class=step5-of-5>
<h2>5</h2>
<p class=larger-font-size>After installation, click <strong>Play</strong> below to join the action!
<div class="VisitButton VisitButtonContinueGLI"><a class="btn btn-primary-lg disabled btn-full-width">Play</a></div>
</ul>
</div>
</div>
<div class=xsmall>The Roblox installer should download shortly. If it doesn’t, start the <a href=# class=text-link onclick="Roblox.ProtocolHandlerClientInterface.manualDownload();return false">download now.</a></div>
</div>
</div>
<div class=InstallInstructionsImage data-modalwidth=970 style=display:none></div>
<div id=pluginObjDiv style=height:1px;width:1px;visibility:hidden;position:absolute;top:0></div><iframe id=downloadInstallerIFrame name=downloadInstallerIFrame style=visibility:hidden;height:0;width:1px;position:absolute></iframe>
<script src=https://www.voidrev.us/js/e2cb6070c58f829226a04307a3f3e28a.js></script>
<script>
Roblox.Client._skip = null;
Roblox.Client._CLSID = '76D50904-6780-4c8b-8986-1A7EE0B1716D';
Roblox.Client._installHost = 'www.voidrev.us';
Roblox.Client.ImplementsProxy = true;
Roblox.Client._silentModeEnabled = true;
Roblox.Client._bringAppToFrontEnabled = false;
Roblox.Client._currentPluginVersion = '';
Roblox.Client._eventStreamLoggingEnabled = true;
Roblox.Client._installSuccess = function() {
if (GoogleAnalyticsEvents) {
GoogleAnalyticsEvents.ViewVirtual('InstallSuccess');
GoogleAnalyticsEvents.FireEvent(['Plugin', 'Install Success']);
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
RobloxLaunch._GoogleAnalyticsCallback = function() {
var isInsideRobloxIDE = 'website';
if (Roblox && Roblox.Client && Roblox.Client.isIDE && Roblox.Client.isIDE()) {
isInsideRobloxIDE = 'Studio';
};
GoogleAnalyticsEvents.FireEvent(['Plugin Location', 'Launch Attempt', isInsideRobloxIDE]);
GoogleAnalyticsEvents.FireEvent(['Plugin', 'Launch Attempt', 'Play']);
EventTracker.fireEvent('GameLaunchAttempt_OSX', 'GameLaunchAttempt_OSX_Plugin');
if (typeof Roblox.GamePlayEvents != 'undefined') {
Roblox.GamePlayEvents.SendClientStartAttempt(null, play_placeId);
}
};
Roblox.Client.ResumeTimer(eval(continuation));
}
</script>
<div class="ConfirmationModal modalPopup unifiedModal smallModal" data-modal-handle=confirmation style=display:none><a class="genericmodal-close ImageButton closeBtnCircle_20h"></a>
<div class=Title></div>
<div class=GenericModalBody>
<div class=TopBody>
<div class="ImageContainer roblox-item-image" data-image-size=small data-no-overlays data-no-click><img class=GenericModalImage alt="generic image"></div>
<div class=Message></div>
</div>
<div class="ConfirmationModalButtonContainer GenericModalButtonContainer"><a href="" id=roblox-confirm-btn><span></span></a> <a href="" id=roblox-decline-btn><span></span></a></div>
<div class=ConfirmationModalFooter></div>
</div>
<script>
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
<div id=modal-confirmation class=modal-confirmation data-modal-type=confirmation>
<div id=modal-dialog class=modal-dialog>
<div class=modal-content>
<div class=modal-header><button type=button class=close data-dismiss=modal> <span aria-hidden=true><span class=icon-close></span></span><span class=sr-only>Close</span> </button>
<h5 class=modal-title></h5>
</div>
<div class=modal-body>
<div class=modal-top-body>
<div class=modal-message></div>
<div class="modal-image-container roblox-item-image" data-image-size=medium data-no-overlays data-no-click><img class=modal-thumb alt="generic image"></div>
<div class="modal-checkbox checkbox"><input id=modal-checkbox-input type=checkbox> <label for=modal-checkbox-input></label></div>
</div>
<div class=modal-btns><a href="" id=confirm-btn><span></span></a> <a href="" id=decline-btn><span></span></a></div>
<div class="loading modal-processing"><img class=loading-default src=https://www.voidrev.us/img/4bed93c91f909002b1f17f05c0ce13d1.gif alt=Processing...></div>
</div>
<div class="modal-footer text-footer"></div>
</div>
</div>
<script>
Roblox = Roblox || {};
Roblox.Resources = Roblox.Resources || {};
Roblox.Resources.Dialog = {
yes: "Yes",
No: "No",
OK: "OK",
Confirm: "Confirm",
Cancel: "Cancel",
Agree: "Agree"
};
</script>
</div>
<script>
Roblox = Roblox || {};
Roblox.ContactUpsellMeta = {
accountSettingsApiDomain: "https://www.voidrev.us",
apiProxyDomain: "https://www.voidrev.us",
codeLength: 6
};
</script>
<div ng-modules="robloxApp, contactUpsell, emailModal , phoneModal" ng-controller=contactUpsellController></div>
<script>
var Roblox = Roblox || {};
Roblox.jsConsoleEnabled = false;
</script>
<script>
$(function() {
Roblox.CookieUpgrader.domain = 'voidrev.us';
Roblox.CookieUpgrader.upgrade("GuestData", {
expires: Roblox.CookieUpgrader.thirtyYearsFromNow
});
Roblox.CookieUpgrader.upgrade("RBXSource", {
expires: function(cookie) {
return Roblox.CookieUpgrader.getExpirationFromCookieValue("rbx_acquisition_time", cookie);
}
});
Roblox.CookieUpgrader.upgrade("RBXViralAcquisition", {
expires: function(cookie) {
return Roblox.CookieUpgrader.getExpirationFromCookieValue("time", cookie);
}
});
Roblox.CookieUpgrader.upgrade("RBXMarketing", {
expires: Roblox.CookieUpgrader.thirtyYearsFromNow
});
Roblox.CookieUpgrader.upgrade("RBXSessionTracker", {
expires: Roblox.CookieUpgrader.fourHoursFromNow
});
Roblox.CookieUpgrader.upgrade("RBXEventTrackerV2", {
expires: Roblox.CookieUpgrader.thirtyYearsFromNow
});
});
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
<script>
Roblox.XsrfToken.setToken('AltJRVSnjl0T');
</script>
<script>
$(function() {
Roblox.DeveloperConsoleWarning.showWarning();
});
</script>
<script>
$(function() {
Roblox.JSErrorTracker.initialize({
'suppressConsoleError': true
});
});
</script>
<script>
$(function() {
function trackReturns() {
function dayDiff(d1, d2) {
return Math.floor((d1 - d2) / 86400000);
}
if (!localStorage) {
return false;
}
var cookieName = 'RBXReturn';
var cookieOptions = {
expires: 9001
};
var cookieStr = localStorage.getItem(cookieName) || "";
var cookie = {};
try {
cookie = JSON.parse(cookieStr);
} catch (ex) {}
try {
if (typeof cookie.ts === "undefined" || isNaN(new Date(cookie.ts))) {
localStorage.setItem(cookieName, JSON.stringify({
ts: new Date().toDateString()
}));
return false;
}
} catch (ex) {
return false;
}
var daysSinceFirstVisit = dayDiff(new Date(), new Date(cookie.ts));
if (daysSinceFirstVisit == 1 && typeof cookie.odr === "undefined") {
RobloxEventManager.triggerEvent('rbx_evt_odr', {});
cookie.odr = 1;
}
if (daysSinceFirstVisit >= 1 && daysSinceFirstVisit <= 7 && typeof cookie.sdr === "undefined") {
RobloxEventManager.triggerEvent('rbx_evt_sdr', {});
cookie.sdr = 1;
}
try {
localStorage.setItem(cookieName, JSON.stringify(cookie));
} catch (ex) {
return false;
}
}
GoogleListener.init();
RobloxEventManager.initialize(true);
RobloxEventManager.triggerEvent('rbx_evt_pageview');
trackReturns();
RobloxEventManager._idleInterval = 450000;
RobloxEventManager.registerCookieStoreEvent('rbx_evt_initial_install_start');
RobloxEventManager.registerCookieStoreEvent('rbx_evt_ftp');
RobloxEventManager.registerCookieStoreEvent('rbx_evt_initial_install_success');
RobloxEventManager.registerCookieStoreEvent('rbx_evt_fmp');
RobloxEventManager.startMonitor();
});
</script>
<script>
var Roblox = Roblox || {};
Roblox.UpsellAdModal = Roblox.UpsellAdModal || {};
Roblox.UpsellAdModal.Resources = {
title: "Remove Ads Like This",
body: "Builders Club members do not see external ads like these.",
accept: "Upgrade Now",
decline: "No, thanks"
};
</script>
<script src=https://www.voidrev.us/js/80ec894ff5392edec25e6bc79cbad240.js></script>
<script src=https://www.voidrev.us/js/5926309ff55b06c732ffe910f2100b1e.js></script>
<script src=https://www.voidrev.us/js/9ffc48c1bb642f795fdccc44f9ba50a4.js></script>
<div id=push-notification-registrar-settings data-notificationshost=https://www.voidrev.us data-reregistrationinterval=0 data-registrationpath=register-chrome data-shoulddeliveryendpointbesentduringregistration=False data-platformtype=ChromeOnDesktop></div>
<div id=push-notification-registration-ui-settings data-noncontextualpromptallowed=true data-promptonfriendrequestsentenabled=true data-promptonprivatemessagesentenabled=false data-promptintervals=[604800000,1209600000,2419200000] data-notificationsdomain=https://www.voidrev.us data-userid=<?=$uID;?>></div>
<script type=text/template id=push-notifications-initial-global-prompt-template>
<div class="push-notifications-global-prompt">
<div class="alert-info push-notifications-global-prompt-site-wide-body">
<div class="push-notifications-prompt-content">
<h5>
<span class="push-notifications-prompt-text">
Can we send you notifications on this computer?
</span>
</h5>
</div>
<div class="push-notifications-prompt-actions">
<button type="button" class="btn-fixed-width btn-control-xs push-notifications-prompt-accept">Notify Me</button>
<span class="icon-close-white push-notifications-dismiss-prompt"></span>
</div>
</div>
</div>
</script>
<script type=text/template id=push-notifications-permissions-prompt-template>
<div class="modal fade" id="push-notifications-permissions-prompt-modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<div class="modal-dialog rbx-modal-dialog">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal">
<span aria-hidden="true">
<span class="icon-close"></span>
</span>
<span class="sr-only">Close</span>
</button>
<h5>Enable Desktop Push Notifications</h5>
</div>
<div class="modal-body">
<div>
Now just click <strong>Allow</strong> in your browser, and we'll start sending you push notifications!
</div>
<div class="push-notifications-permissions-prompt-instructional-image">
<img width="380" height="250" src="https://www.voidrev.us/images/Notifications/push-permission-prompt-chrome-mac-20160701.png" />
</div>
</div>
<div class="modal-footer">
</div>
</div>
</div>
</div>
</script>
<script type=text/template id=push-notifications-permissions-disabled-instruction-template>
<div class="modal fade" id="push-notifications-permissions-disabled-instruction-modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
<div class="modal-dialog rbx-modal-dialog">
<div class="modal-content">
<div class="modal-header">
<button type="button" class="close" data-dismiss="modal">
<span aria-hidden="true">
<span class="icon-close"></span>
</span>
<span class="sr-only">Close</span>
</button>
<h5>Turn Push Notifications Back On</h5>
</div>
<div class="instructions-body">
<div class="reenable-step reenable-step1-of3">
<h1>1</h1>
<p class="larger-font-size push-notifications-modal-step-instruction">Click the green lock next to the URL bar to open up your site permissions.</p>
<img width="270" height="139" src="https://www.voidrev.us/images/Notifications/push-permission-unblock-step1-chrome-20160701.png">
</div>
<div class="reenable-step reenable-step2-of3">
<h1>2</h1>
<p class="larger-font-size push-notifications-modal-step-instruction">Click the drop-down arrow next to Notifications in the <strong>Permissions</strong> tab.</p>
<img width="270" height="229" src="https://www.voidrev.us/images/Notifications/push-permission-unblock-step2-chrome-20160701.png">
</div>
<div class="reenable-step reenable-step3-of3">
<h1>3</h1>
<p class="larger-font-size push-notifications-modal-step-instruction">Select <strong>Always allow on this site</strong> to turn notifications back on.</p>
<img width="270" height="229" src="https://www.voidrev.us/images/Notifications/push-permission-unblock-step3-chrome-20160701.png">
</div>
</div>
<div class="modal-footer">
</div>
</div>
</div>
</div>
</script>
<script type=text/template id=push-notifications-successfully-enabled-template>
<div class="push-notifications-global-prompt">
<div class="alert-system-feedback">
<div class="alert alert-success">
Push notifications have been enabled!
</div>
</div>
</div>
</script>
<script type=text/template id=push-notifications-successfully-disabled-template>
<div class="push-notifications-global-prompt">
<div class="alert-system-feedback">
<div class="alert alert-success">
Push notifications have been disabled.
</div>
</div>
</div>
</script>
<script>
var _comscore = _comscore || [];
_comscore.push({
c1: "2",
c2: "6035605",
c3: "",
c4: "",
c15: "Over13"
});
(function() {
var s = document.createElement("script"),
el = document.getElementsByTagName("script")[0];
s.async = true;
s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
el.parentNode.insertBefore(s, el);
})();
</script><noscript><img src="http://b.scorecardresearch.com/p?c1=2&amp;c2=&amp;c3=&amp;c4=&amp;c5=&amp;c6=&amp;c15=&amp;cv=2.0&amp;cj=1"></noscript>