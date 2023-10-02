<?php
$chatenabled = true;
include ($_SERVER['DOCUMENT_ROOT'].'/global.php');
?>
<title>Messages - Void</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,requiresActiveX=true" />
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="page-meta" data-internal-page-name="Messages" />
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.BundleVerifierConstants = {
isMetricsApiEnabled: false,
eventStreamUrl: "//ecsv2.roblox.com/pe?t=diagnostic",
deviceType: "Computer",
cdnLoggingEnabled: JSON.parse("true")
};
</script> <script type="text/javascript">
var Roblox = Roblox || {};
Roblox.BundleDetector = (function () {
var isMetricsApiEnabled = Roblox.BundleVerifierConstants && Roblox.BundleVerifierConstants.isMetricsApiEnabled;
var loadStates = {
loadSuccess: "loadSuccess",
loadFailure: "loadFailure",
executionFailure: "executionFailure"
};
var bundleContentTypes = {
javascript: "javascript",
css: "css"
};
var ephemeralCounterNames = {
cdnPrefix: "CDNBundleError_",
unknown: "CDNBundleError_unknown",
cssError: "CssBundleError",
jsError: "JavascriptBundleError",
jsFileError: "JsFileExecutionError",
resourceError: "ResourcePerformance_Error",
resourceLoaded: "ResourcePerformance_Loaded"
};
return {
jsBundlesLoaded: {},
bundlesReported: {},
counterNames: ephemeralCounterNames,
loadStates: loadStates,
bundleContentTypes: bundleContentTypes,
timing: undefined,
setTiming: function (windowTiming) {
this.timing = windowTiming;
},
getLoadTime: function () {
if (this.timing && this.timing.domComplete) {
return this.getCurrentTime() - this.timing.domComplete;
}
},
getCurrentTime: function () {
return new Date().getTime();
},
getCdnProviderName: function (bundleUrl, callBack) {
if (Roblox.BundleVerifierConstants.cdnLoggingEnabled) {
var xhr = new XMLHttpRequest();
xhr.open('GET', bundleUrl, true);
xhr.onreadystatechange = function () {
if (xhr.readyState === xhr.HEADERS_RECEIVED) {
try {
var headerValue = xhr.getResponseHeader("rbx-cdn-provider");
if (headerValue) {
callBack(headerValue);
} else {
callBack();
}
} catch (e) {
callBack();
}
}
};
xhr.onerror = function () {
callBack();
};
xhr.send();
} else {
callBack();
}
},
getCdnProviderAndReportMetrics: function (bundleUrl, bundleName, loadState, bundleContentType) {
this.getCdnProviderName(bundleUrl, function (cdnProviderName) {
Roblox.BundleDetector.reportMetrics(bundleUrl, bundleName, loadState, bundleContentType, cdnProviderName);
});
},
reportMetrics: function (bundleUrl, bundleName, loadState, bundleContentType, cdnProviderName) {
if (!isMetricsApiEnabled
|| !bundleUrl
|| !loadState
|| !loadStates.hasOwnProperty(loadState)
|| !bundleContentType
|| !bundleContentTypes.hasOwnProperty(bundleContentType)) {
return;
}
var xhr = new XMLHttpRequest();
var metricsApiUrl = (Roblox.EnvironmentUrls && Roblox.EnvironmentUrls.metricsApi) || "https://metrics.voidrev.us";
xhr.open("POST", metricsApiUrl + "/v1/bundle-metrics/report", true);
xhr.setRequestHeader("Content-Type", "application/json");
xhr.withCredentials = true;
xhr.send(JSON.stringify({
bundleUrl: bundleUrl,
bundleName: bundleName || "",
bundleContentType: bundleContentType,
loadState: loadState,
cdnProviderName: cdnProviderName,
loadTimeInMilliseconds: this.getLoadTime() || 0
}));
},
logToEphemeralStatistics: function (sequenceName, value) {
var deviceType = Roblox.BundleVerifierConstants.deviceType;
sequenceName += "_" + deviceType;
var xhr = new XMLHttpRequest();
xhr.open('POST', '/game/report-stats?name=' + sequenceName + "&value=" + value, true);
xhr.withCredentials = true;
xhr.send();
},
logToEphemeralCounter: function (ephemeralCounterName) {
var deviceType = Roblox.BundleVerifierConstants.deviceType;
ephemeralCounterName += "_" + deviceType;
//log to ephemeral counters - taken from eventTracker.js
var xhr = new XMLHttpRequest();
xhr.open('POST', '/game/report-event?name=' + ephemeralCounterName, true);
xhr.withCredentials = true;
xhr.send();
},
logToEventStream: function (failedBundle, ctx, cdnProvider, status) {
var esUrl = Roblox.BundleVerifierConstants.eventStreamUrl,
currentPageUrl = encodeURIComponent(window.location.href);
var deviceType = Roblox.BundleVerifierConstants.deviceType;
ctx += "_" + deviceType;
//try and grab performance data.
//Note that this is the performance of the xmlhttprequest rather than the original resource load.
var duration = 0;
if (window.performance) {
var perfTiming = window.performance.getEntriesByName(failedBundle);
if (perfTiming.length > 0) {
var data = perfTiming[0];
duration = data.duration || 0;
}
}
//log to event stream (diagnostic)
var params = "&evt=webBundleError&url=" + currentPageUrl +
"&ctx=" + ctx + "&fileSourceUrl=" + encodeURIComponent(failedBundle) +
"&cdnName=" + (cdnProvider || "unknown") +
"&statusCode=" + (status || "unknown") +
"&loadDuration=" + Math.floor(duration);
var img = new Image();
img.src = esUrl + params;
},
getCdnInfo: function (failedBundle, ctx, fileType) {
if (Roblox.BundleVerifierConstants.cdnLoggingEnabled) {
var xhr = new XMLHttpRequest();
var counter = this.counterNames;
xhr.open('GET', failedBundle, true);
var cdnProvider;
//succesful request
xhr.onreadystatechange = function () {
if (xhr.readyState === xhr.HEADERS_RECEIVED) {
cdnProvider = xhr.getResponseHeader("rbx-cdn-provider");
if (cdnProvider && cdnProvider.length > 0) {
Roblox.BundleDetector.logToEphemeralCounter(counter.cdnPrefix + cdnProvider + "_" + fileType);
}
else {
Roblox.BundleDetector.logToEphemeralCounter(counter.unknown + "_" + fileType);
}
}
else if (xhr.readyState === xhr.DONE) {
// append status to cdn provider so we know its not related to network error.
Roblox.BundleDetector.logToEventStream(failedBundle, ctx, cdnProvider, xhr.status);
}
};
//attach to possible things that can go wrong with the request.
//additionally a network error will trigger this callback
xhr.onerror = function () {
Roblox.BundleDetector.logToEphemeralCounter(counter.unknown + "_" + fileType);
Roblox.BundleDetector.logToEventStream(failedBundle, ctx, counter.unknown);
};
xhr.send();
}
else {
this.logToEventStream(failedBundle, ctx);
}
},
reportResourceError: function (resourceName) {
var ephemeralCounterName = this.counterNames.resourceError + "_" + resourceName;
this.logToEphemeralCounter(ephemeralCounterName);
},
reportResourceLoaded: function (resourceName) {
var loadTimeInMs = this.getLoadTime();
if (loadTimeInMs) {
var sequenceName = this.counterNames.resourceLoaded + "_" + resourceName;
this.logToEphemeralStatistics(sequenceName, loadTimeInMs);
}
},
reportBundleError: function (bundleTag) {
var ephemeralCounterName, failedBundle, ctx, contentType;
if (bundleTag.rel && bundleTag.rel === "stylesheet") {
ephemeralCounterName = this.counterNames.cssError;
failedBundle = bundleTag.href;
ctx = "css";
contentType = bundleContentTypes.css;
} else {
ephemeralCounterName = this.counterNames.jsError;
failedBundle = bundleTag.src;
ctx = "js";
contentType = bundleContentTypes.javascript;
}
//mark that we logged this bundle
this.bundlesReported[failedBundle] = true;
//e.g. javascriptBundleError_Computer
this.logToEphemeralCounter(ephemeralCounterName);
//this will also log to event stream
this.getCdnInfo(failedBundle, ctx, ctx);
var bundleName;
if (bundleTag.dataset) {
bundleName = bundleTag.dataset.bundlename;
}
else {
bundleName = bundleTag.getAttribute('data-bundlename');
}
this.getCdnProviderAndReportMetrics(failedBundle, bundleName, loadStates.loadFailure, contentType);
},
bundleDetected: function (bundleName) {
this.jsBundlesLoaded[bundleName] = true;
},
verifyBundles: function (document) {
var ephemeralCounterName = this.counterNames.jsFileError,
eventContext = ephemeralCounterName;
//grab all roblox script tags in the page.
var scripts = (document && document.scripts) || window.document.scripts;
var errorsList = [];
var bundleName;
var monitor;
for (var i = 0; i < scripts.length; i++) {
var item = scripts[i];
if (item.dataset) {
bundleName = item.dataset.bundlename;
monitor = item.dataset.monitor;
}
else {
bundleName = item.getAttribute('data-bundlename');
monitor = item.getAttribute('data-monitor');
}
if (item.src && monitor && bundleName) {
if (!Roblox.BundleDetector.jsBundlesLoaded.hasOwnProperty(bundleName)) {
errorsList.push(item);
}
}
}
if (errorsList.length > 0) {
for (var j = 0; j < errorsList.length; j++) {
var script = errorsList[j];
if (!this.bundlesReported[script.src]) {
//log the counter only if the file is actually corrupted, not just due to failure to load
//e.g. JsFileExecutionError_Computer
this.logToEphemeralCounter(ephemeralCounterName);
this.getCdnInfo(script.src, eventContext, 'js');
if (script.dataset) {
bundleName = script.dataset.bundlename;
}
else {
bundleName = script.getAttribute('data-bundlename');
}
this.getCdnProviderAndReportMetrics(script.src, bundleName, loadStates.executionFailure, bundleContentTypes.javascript);
}
}
}
}
};
})();
window.addEventListener("load", function (evt) {
Roblox.BundleDetector.verifyBundles();
});
Roblox.BundleDetector.setTiming(window.performance.timing);
//# sourceURL=somename.js
</script>
<link rel="manifest" href="https://www.voidrev.us/v2/push-notifications/chrome-manifest" crossorigin="use-credentials">
<link rel="canonical" href="https://www.voidrev.us/my/messages/" />
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' data-bundlename='StyleGuide' href='https://www.voidrev.us/css/4db56b05c02c8ab6a24e3aec5aca644b3a2ac54ae5c1157bc697e7d8918f9918.css' />
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' href='https://www.voidrev.us/css/leanbase.css' />
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' href='https://www.voidrev.us/css/mymessages.css' />
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.GaEventSettings = {
gaDFPPreRollEnabled: "false" === "true",
gaLaunchAttemptAndLaunchSuccessEnabled: "false" === "true",
gaPerformanceEventEnabled: "false" === "true"
};
</script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='headerinit' type='text/javascript' src='https://www.voidrev.us/js/175a4c92837369e0600f5343486a24f9.js'></script>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.AdsHelper = Roblox.AdsHelper || {};
Roblox.AdsLibrary = Roblox.AdsLibrary || {};
Roblox.AdsHelper.toggleAdsSlot = function (slotId, GPTRandomSlotIdentifier) {
var gutterAdsEnabled = false;
if (gutterAdsEnabled) {
googletag.display(GPTRandomSlotIdentifier);
return;
}
if (typeof slotId !== 'undefined' && slotId && slotId.length > 0) {
var slotElm = $("#"+slotId);
if (slotElm.is(":visible")) {
googletag.display(GPTRandomSlotIdentifier);
}else {
var adParam = Roblox.AdsLibrary.adsParameters[slotId];
if (adParam) {
adParam.template = slotElm.html();
slotElm.empty();
}
}
}
}
</script> <script type="text/javascript">
$(function () {
Roblox.JSErrorTracker.initialize({ 'suppressConsoleError': true});
});
</script>
<!--[if lt IE 9]>
<script src="//oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="//oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
<script>
//Set if it browser's do not track flag is enabled
var Roblox = Roblox || {};
(function() {
var dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
if (typeof window.external !== "undefined" &&
typeof window.external.msTrackingProtectionEnabled !== "undefined") {
dnt = dnt || window.external.msTrackingProtectionEnabled();
}
Roblox.browserDoNotTrack = dnt == "1" || dnt == "yes" || dnt === true;
})();
</script>
<script type="text/javascript">
var _gaq = _gaq || [];
window.GoogleAnalyticsDisableRoblox2 = true;
_gaq.push(['b._setAccount', 'UA-486632-1']);
_gaq.push(['b._setSampleRate', '10']);
_gaq.push(['b._setCampSourceKey', 'rbx_source']);
_gaq.push(['b._setCampMediumKey', 'rbx_medium']);
_gaq.push(['b._setCampContentKey', 'rbx_campaign']);
_gaq.push(['b._setDomainName', 'voidrev.us']);
_gaq.push(['b._setCustomVar', 1, 'Visitor', 'Member', 2]);
_gaq.push(['b._setPageGroup', 1, 'Messages']);
_gaq.push(['b._trackPageview']);
_gaq.push(['c._setAccount', 'UA-26810151-2']);
_gaq.push(['c._setSampleRate', '1']);
_gaq.push(['c._setDomainName', 'voidrev.us']);
_gaq.push(['c._setPageGroup', 1, 'Messages']);
(function () {
if (!Roblox.browserDoNotTrack) {
var ga = document.createElement('script');
ga.type = 'text/javascript';
ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);
}
})();
</script>
<script type="text/javascript">
if (Roblox && Roblox.EventStream) {
Roblox.EventStream.Init("//ecsv2.voidrev.us/www/e.png",
"//ecsv2.voidrev.us/www/e.png",
"//ecsv2.voidrev.us/pe?t=studio",
"//ecsv2.voidrev.us/pe?t=diagnostic");
}
</script>
</head>
<body>
<div id="Leaderboard-Abp" class="abp leaderboard-abp">
<iframe name="Roblox_Default_Top_728x90"
allowtransparency="true"
frameborder="0"
height="110"
scrolling="no"
data-src=""
src="https://www.voidrev.us/user-sponsorship/?id=3"
width="728"
data-js-adtype="iframead"
data-ad-slot="Roblox_Default_Top_728x90"></iframe>
</div>
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.messagesModel = {};
Roblox.messagesModel = {
totalAnnouncements : 0,
maxPrivateMessageLength : 9000,
minimumAdRefreshInterval: 1000,
lastAdRefresh: new Date(),
adminIconUrl: "https://www.voidrev.us/images/Logo/admin_icon_11222016.svg"
}
Roblox.websiteTemplates = {
avatarTemplate : "common-thumbnail",
tabsTemplate : "common-tabs",
messagesNavTemplate: "messages-nav",
messagesListTemplate: "messages-list",
messagesBodyTemplate: "messages-detail",
messageTemplate: "messages-tab",
notificationTemplate: "notification-tab"
};
Roblox.websiteLinks = {
GetFormattedMessagesJsonLink: "/messages/api/get-messages",
GetFormattedNotificationsJsonLink: "/notifications/api/get-notifications",
ArchiveMessagesLink: "/messages/api/archive-messages",
UnarchiveMessagesLink: "/messages/api/unarchive-messages",
MarkMessagesReadLink: "/messages/api/mark-messages-read",
MarkMessagesUnreadLink: "/messages/api/mark-messages-unread",
SendMessageJsonResultLink: "/messages/send",
GetMyUnreadMessagesCountLink: "/messages/api/unread-messages-summary",
GetMessageDetailByIdLink: "https://www.voidrev.us/messages/api/get-message/"
};
Roblox.messageDefaults = {
robloxUserId: 1,
robloxUserName: "ripguests",
robloxUserThumbnail: "https://www.voidrev.us<?=getUserHeadshotThumbnail($con,1);?>",
robloxUserAbsoluteUrl: "https://www.voidrev.us/users/1/profile/"
};
</script>
<div ng-modules="robloxApp, messages" class="messages-container">
<h1 ng-bind="'Heading.Message'|translate"></h1>
<div class="rbx-tabs-horizontal rbx-scrollable-tabs-horizontal roblox-messages-container" ng-controller="messagesController">
<div rbx-tabs></div>
<ui-view class="ab-content rbx-tab-content tab-active"></ui-view><!-- ng-controller="messagesContentController"-->
</div>
</div>
<div id="Skyscraper-Abp-Right" class="abp abp-container right-abp">
<iframe name="Roblox_Default_Right_160x600"
allowtransparency="true"
frameborder="0"
height="612"
scrolling="no"
data-src=""
src="https://www.voidrev.us/user-sponsorship/?id=1"
width="160"
data-js-adtype="iframead"
data-ad-slot="Roblox_Default_Right_160x600"></iframe>
</div>
<!--[if IE 7]><input type="hidden" id="ie7"><![endif]-->
</div>
</div>
</div>
<?php include ($_SERVER['DOCUMENT_ROOT'].'/chat.php'); ?>
<div class="notification-stream-base" notification-stream-base></div>
<script type="text/javascript">function urchinTracker() {}</script>
<script type="text/javascript">
if (typeof Roblox === "undefined") {
Roblox = {};
}
if (typeof Roblox.PlaceLauncher === "undefined") {
Roblox.PlaceLauncher = {};
}
Roblox.PlaceLauncher.Resources = {
RefactorEnabled: "True",
IsProtocolHandlerBaseUrlParamEnabled: "False",
ProtocolHandlerAreYouInstalled: {
play: {
content: "<img src='https://www.voidrev.us/img/6304dfebadecbb3b338a79a6a528936c.svg' width='90' height='90' alt='R'/><p>You&#39;re moments away from getting into the game!</p>",
buttonText: "Download and Install Roblox",
footerContent: "<a href='https://assetgame.voidrev.us/game/help'class= 'text-name small' target='_blank' >Click here for help</a> "
},
studio: {
content: "<img src='https://www.voidrev.us/img/3da410727fa2670dcb4f31316643138a.svg' width='95' height='95' alt='R' /><p>Get started creating your own games!</p>",
buttonText: "Download Studio"
}
},
ProtocolHandlerStartingDialog: {
play: {
content: "<img src='https://www.voidrev.us/img/6304dfebadecbb3b338a79a6a528936c.svg' width='90' height='90' alt='R'/><p>Roblox is now loading. Get ready to play!</p>"
},
studio: {
content: "<img src='https://www.voidrev.us/img/3da410727fa2670dcb4f31316643138a.svg' width='95' height='95' alt='R' /><p>Checking for Roblox Studio...</p>"
},
loader: "<span class='spinner spinner-default'></span>"
}
};
</script>
<div id="PlaceLauncherStatusPanel" style="display:none;width:300px"
data-new-plugin-events-enabled="True"
data-event-stream-for-plugin-enabled="True"
data-event-stream-for-protocol-enabled="True"
data-is-game-launch-interface-enabled="False"
data-is-protocol-handler-launch-enabled="True"
data-is-user-logged-in="True"
data-os-name="Unknown"
data-protocol-name-for-client="roblox-player"
data-protocol-name-for-studio="roblox-studio"
data-protocol-roblox-locale="en_us"
data-protocol-game-locale="en_us"
data-protocol-url-includes-launchtime="true"
data-protocol-detection-enabled="true"
data-protocol-separate-script-parameters-enabled="true"
data-protocol-avatar-parameter-enabled="true"
data-protocol-sending-locales-enabled="true"
data-protocol-enable-api-site-authentication-tickets="true"
data-protocol-enable-authentication-tickets="true"
>
<div class="modalPopup blueAndWhite PlaceLauncherModal" style="min-height: 160px">
<div id="Spinner" class="Spinner" style="padding:20px 0;">
<img data-delaysrc="https://www.voidrev.us/img/e998fb4c03e8c2e30792f2f3436e9416.gif" height="32" width="32" alt="Progress" />
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
<div id="ProtocolHandlerClickAlwaysAllowed"
class="ph-clickalwaysallowed"
style="display:none;">
<p class="larger-font-size">
<span class="icon-moreinfo"></span>
Check <strong>Always open links for URL: Roblox Protocol</strong> and click <strong>Open URL: Roblox Protocol</strong> in the dialog box above to join games faster in the future!
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
videoPreRollDFP.videoLogNote = "";
videoPreRollDFP.logsEnabled = true;
videoPreRollDFP.adUnit = "/1015347/VideoPreroll";
videoPreRollDFP.adTime = 15;
videoPreRollDFP.includedPlaceIds = "707652019,447452406,461482416,2563455047,2056459358";
videoPreRollDFP.isSwfPreloaderEnabled = false;
videoPreRollDFP.isPrerollShownEveryXMinutesEnabled = true;
videoPreRollDFP.isAgeTargetingEnabled = true;
videoPreRollDFP.isAgeOrSegmentTargetingEnabled = true;
videoPreRollDFP.isCompanionAdRenderedByGoogleTag = true;
customTargeting.userAge = "13";
customTargeting.userAgeOrSegment = "13";
customTargeting.userGender = "Male";
customTargeting.gameGenres = "";
customTargeting.environment = "Production";
customTargeting.adTime = "15";
customTargeting.PLVU = false;
$(videoPreRollDFP.checkEligibility);
}
});
</script>
<script type="text/javascript">
function checkRobloxInstall() {
window.location = 'https://www.voidrev.us/install/unsupported.aspx?osx=10.5'; return false;
}
</script>
<div id="InstallationInstructions" class="" style="display:none;">
<div class="ph-installinstructions">
<div class="ph-modal-header">
<span class="icon-close simplemodal-close"></span>
<h3 class="title">Thanks for playing Roblox</h3>
</div>
<div class="modal-content-container">
<div class="ph-installinstructions-body ">
<ul class="modal-col-4">
<li class="step1-of-4">
<h2>1</h2>
<p class="larger-font-size">Click <strong>RobloxPlayer.exe</strong> to run the Roblox installer, which just downloaded via your web browser.</p>
<img data-delaysrc="https://www.voidrev.us/img/28eaa93b899b93461399aebf21c5346f.png" />
</li>
<li class="step2-of-4">
<h2>2</h2>
<p class="larger-font-size">Click <strong>Run</strong> when prompted by your computer to begin the installation process.</p>
<img data-delaysrc="https://www.voidrev.us/img/51328932dedb5d8d61107272cc1a27db.png" />
</li>
<li class="step3-of-4">
<h2>3</h2>
<p class="larger-font-size">Click <strong>Ok</strong> once you've successfully installed Roblox.</p>
<img data-delaysrc="https://www.voidrev.us/img/3797745629baca2d1b9496b76bc9e6dc.png" />
</li>
<li class="step4-of-4">
<h2>4</h2>
<p class="larger-font-size">After installation, click <strong>Play</strong> below to join the action!</p>
<div class="VisitButton VisitButtonContinueGLI">
<a class="btn btn-primary-lg disabled btn-full-width">Play</a>
</div>
</li>
</ul>
</div>
</div>
<div class="xsmall">
The Roblox installer should download shortly. If it doesn’t, start the <a id="GameLaunchManualInstallLink" href="#" class="text-link">download now.</a>
<script>
if (Roblox.ProtocolHandlerClientInterface && typeof Roblox.ProtocolHandlerClientInterface.attachManualDownloadToLink === 'function') {
Roblox.ProtocolHandlerClientInterface.attachManualDownloadToLink();
}
</script>
</div>
</div>
</div>
<div class="InstallInstructionsImage" data-modalwidth="970" style="display:none;"></div>
<div id="pluginObjDiv" style="height:1px;width:1px;visibility:hidden;position: absolute;top: 0;"></div>
<iframe id="downloadInstallerIFrame" name="downloadInstallerIFrame" style="visibility:hidden;height:0;width:1px;position:absolute"></iframe>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='clientinstaller' type='text/javascript' src='https://www.voidrev.us/js/3f2a863e0026fe90136944e1837e13df.js'></script>
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
<img class="loading-default" src='https://www.voidrev.us/img/4bed93c91f909002b1f17f05c0ce13d1.gif' alt="Processing..." />
</div>
</div>
<div class="modal-footer text-footer">
</div>
</div>
</div>
</div>
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.jsConsoleEnabled = false;
</script>
<script type="text/javascript">
$(function () {
Roblox.CookieUpgrader.domain = 'voidrev.us';
Roblox.CookieUpgrader.upgrade("GuestData", { expires: Roblox.CookieUpgrader.thirtyYearsFromNow });
Roblox.CookieUpgrader.upgrade("RBXSource", { expires: function (cookie) { return Roblox.CookieUpgrader.getExpirationFromCookieValue("rbx_acquisition_time", cookie); } });
Roblox.CookieUpgrader.upgrade("RBXViralAcquisition", { expires: function (cookie) { return Roblox.CookieUpgrader.getExpirationFromCookieValue("time", cookie); } });
Roblox.CookieUpgrader.upgrade("RBXMarketing", { expires: Roblox.CookieUpgrader.thirtyYearsFromNow });
Roblox.CookieUpgrader.upgrade("RBXSessionTracker", { expires: Roblox.CookieUpgrader.fourHoursFromNow });
Roblox.CookieUpgrader.upgrade("RBXEventTrackerV2", {expires: Roblox.CookieUpgrader.thirtyYearsFromNow});
});
</script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='intl-polyfill' type='text/javascript' src='https://www.voidrev.us/js/ee40f2a1a1a92c3ddcfbd6941428ebc0.js'></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='InternationalCore' type='text/javascript' src='https://www.voidrev.us/js/b7765265afdb7c76d94552b635c3d3b9003e39e810227f3d25432466a817b0f1.js'></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='TranslationResources' type='text/javascript' src='https://www.voidrev.us/js/73a89de8a6dbe8005fb3d6be12e361fddac57c13295171d3a8d5f397e761615d.js'></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='leanbase' type='text/javascript' src='https://www.voidrev.us/js/f45665e7e5db98201fe7b2507178cf22.js'></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='CoreUtilities' type='text/javascript' src='https://www.voidrev.us/js/e39d717145fdd1164dc2880ed356b8e529fa8124c5dfbed43c20a5614fc3821f.js'></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='CoreRobloxUtilities' type='text/javascript' src='https://www.voidrev.us/js/ccc5b6b92eb7dba88eef70b0f6da0f5df2ed8da5168b590d67f69856068983af.js'></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='React' type='text/javascript' src='https://www.voidrev.us/js/3485182d26ebdd16cc205fc1dc5d7de152529918cf897b07865339de5d5abfce.js'></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='ReactStyleGuide' type='text/javascript' src='https://www.voidrev.us/js/f686b3f78964914c1e500373348a30f7bab55ef4dd196044f191e2862be822c0.js'></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='ReactUtilities' type='text/javascript' src='https://www.voidrev.us/js/3bfcca1f8bb2298e510c1baa286b2033ae6209a08bdf8967dacd2de45229730e.js'></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='angular' type='text/javascript' src='https://www.voidrev.us/js/ae5b5a047c32177e8d21426c506865aa.js'></script>
<div ng-modules="baseTemplateApp">
<script type="text/javascript" src="https://www.voidrev.us/js/cbd9a121217c4887264ffe32686ecd52.js"></script>
</div>
<div ng-modules="pageTemplateApp">
<script type="text/javascript" src="https://www.voidrev.us/js/13aa9ebeaba4e1d608ad536624741aa2.js"></script>
</div>
<script type='text/javascript'>Roblox.config.externalResources = [];Roblox.config.paths['Pages.Catalog'] = 'https://www.voidrev.us/js/baa0c90950583c77f295ecd0748e32ce.js';Roblox.config.paths['Pages.CatalogShared'] = 'https://www.voidrev.us/js/fac702cb852bab6006d426d83c56f8ab.js';Roblox.config.paths['Widgets.AvatarImage'] = 'https://www.voidrev.us/js/76e30b0ae6a1be83cbf018579681b891.js';Roblox.config.paths['Widgets.DropdownMenu'] = 'https://www.voidrev.us/js/c948a7edd36e01db699c8cf19303376d.js';Roblox.config.paths['Widgets.GroupImage'] = 'https://www.voidrev.us/js/3afc03adcc2aaca01500baaf69b52d9c.js';Roblox.config.paths['Widgets.HierarchicalDropdown'] = 'https://www.voidrev.us/js/c90aea1e430a241776db6775e98c3e03.js';Roblox.config.paths['Widgets.ItemImage'] = 'https://www.voidrev.us/js/de56e6c24a3e70ee7d1ec900c24042e8.js';Roblox.config.paths['Widgets.PlaceImage'] = 'https://www.voidrev.us/js/6003f8790df31d5445169faea5c04fd7.js';</script>
<script>
$(function () {
Roblox.DeveloperConsoleWarning.showWarning();
});
</script>
<?php include ($_SERVER['DOCUMENT_ROOT'].'/chat2.php'); ?>
<script type="text/javascript">
$(function () {
Roblox.JSErrorTracker.initialize({ 'suppressConsoleError': true});
});
</script>
<script type="text/javascript">
$(function(){
function trackReturns() {
function dayDiff(d1, d2) {
return Math.floor((d1-d2)/86400000);
}
if (!localStorage) {
return false;
}
var cookieName = 'RBXReturn';
var cookieOptions = {expires:9001};
var cookieStr = localStorage.getItem(cookieName) || "";
var cookie = {};
try {
cookie = JSON.parse(cookieStr);
} catch (ex) {
// busted cookie string from old previous version of the code
}
try {
if (typeof cookie.ts === "undefined" || isNaN(new Date(cookie.ts))) {
localStorage.setItem(cookieName, JSON.stringify({ ts: new Date().toDateString() }));
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
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='page' type='text/javascript' src='https://www.voidrev.us/js/1b7cb0f770a5636f91d309f8488a5e0f.js'></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='StyleGuide' type='text/javascript' src='https://www.voidrev.us/js/935ce03d7733b2b55182ed4e77db83394692ba7e345a74c2240128f802d1af0d.js'></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='pageEnd' type='text/javascript' src='https://www.voidrev.us/js/7e42bd8acc22cb6b98926ccd04832d9c.js'></script>
</body>
</html>
