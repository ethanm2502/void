<?php
require($_SERVER['DOCUMENT_ROOT']."/global.php");
?>
<head data-machine-id="WEB5157">
<!-- MachineID: WEB5157 -->
<title>Avatar - Void</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,requiresActiveX=true" />
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="author" content="Roblox Corporation" />
<meta name="description" content="Roblox is a global platform that brings people together through play." />
<meta name="keywords" content="free games, online games, building games, virtual worlds, free mmo, gaming cloud, physics engine" />
<meta name="locale-data"
data-language-code="en_us"
data-language-name="English" /><meta name="device-meta"
data-device-type="computer"
data-is-in-app="false"
data-is-desktop="true"
data-is-phone="false"
data-is-tablet="false"
data-is-console="false"
data-is-android-app="false"
data-is-ios-app="false"
data-is-uwp-app="false"
data-is-xbox-app="false"
data-is-amazon-app="false"
data-is-win32-app="false"
data-is-studio="false"
data-is-game-client-browser="false"
data-is-ios-device="false"
data-is-android-device="false"
data-is-universal-app="false"
data-app-type="unknown"
/>
<meta name="environment-meta"
data-is-testing-site="false" />
<meta id="roblox-display-names" data-enabled="false"></meta><meta name="page-meta" data-internal-page-name="Avatar" />
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.BundleVerifierConstants = {
isMetricsApiEnabled: true,
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
<link rel="stylesheet" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-bundlename="StyleGuide" data-bundle-source="Main" href="https://www.voidrev.us/css/5f133632560d0af8658795aa2c41f175e4b1977665f6d2a1cd04f0b06f573312.css" />
<link rel="stylesheet" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-bundlename="Thumbnails" data-bundle-source="Main" href="https://www.voidrev.us/css/9517d686dc47015c200496d77e2b18146ee37652d18e25ecf9e1ed230310ea13.css" />
<link rel="stylesheet" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-bundlename="VerificationUpsell" data-bundle-source="Main" href="https://www.voidrev.us/css/d41f2dd08e2e54efa22d6e04120af18e4ca32b65227e62cf6f33933a7899241d.css" />
<link rel="stylesheet" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-bundlename="CookieBannerV3" data-bundle-source="Main" href="https://www.voidrev.us/css/2c2a709240897ce382b7ff55be4347cd0994ab1e2d6ed3b56649e54b0e97e13a.css" />
<link rel="stylesheet" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-bundlename="ConfigureWebApps" data-bundle-source="Main" href="https://www.voidrev.us/css/08def520152a575438e73a81aa9a310c2415c327df7b624a24aa6e794d24dba3.css" />
<link rel="canonical" href="/my/avatar" />
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' href='https://www.voidrev.us/css/leanbase.css' />
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' href='https://www.voidrev.us/css/avatarpage.css' />
<link rel="stylesheet" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-bundlename="AccountSecurityPrompt" data-bundle-source="Main" href="https://www.voidrev.us/css/3f7284cbce996cc411b5bdadad270358a4b76d48bd2f0347702a9952cad06e71.css" />
<link rel="stylesheet" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-bundlename="Avatar" data-bundle-source="Main" href="https://www.voidrev.us/css/9ae4f95f93912bd0f0d4851a139f371d095cb7146b487781c9d58d136c33cf47.css" />
<link rel="stylesheet" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-bundlename="Recommendations" data-bundle-source="Main" href="https://www.voidrev.us/css/7826de519bb78d6a696945b3d3a2968fbe0f4485a514f82eeb1be1d88d6e86cd.css" />
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.RealTimeSettings = Roblox.RealTimeSettings ||
{
NotificationsEndpoint: "https://www.voidrev.us",
MaxConnectionTime: "21600000",
IsEventPublishingEnabled: false,
IsDisconnectOnSlowConnectionDisabled: true,
IsSignalRClientTransportRestrictionEnabled: true,
IsLocalStorageInRealTimeEnabled: true,
IsDebuggerEnabled: "False"
}
</script>
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.GaEventSettings = {
gaDFPPreRollEnabled: "false" === "true",
gaLaunchAttemptAndLaunchSuccessEnabled: "false" === "true",
gaPerformanceEventEnabled: "false" === "true"
};
</script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='headerinit' type='text/javascript' src='https://www.voidrev.us/js/a67ddd9413db88f4124e2c4f25d8cb1f.js'></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="Polyfill" data-bundle-source="Main" src="https://www.voidrev.us/js/772034db167d3f4260047db4a7f2b8a58cf448709327013541e47c8962b6e556.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="XsrfProtection" data-bundle-source="Main" src="https://www.voidrev.us/js/4db2f741b7a3ec36d11fec999ce33f708ae85641cabfd27e11e0935928f7d9c4.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="HeaderScripts" data-bundle-source="Main" src="https://www.voidrev.us/js/97cb9ac7262155c329a259fce9f940f9bcfa852a6a1ccb44bd8a41c31e84e54b.js"></script>
<meta name="sentry-meta"
data-env-name="production"
data-dsn="https://6750adeb1b1348e4a10b13e726d5c10b@sentry.io/1539367"
data-sample-rate="0" /><script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="Sentry" data-bundle-source="Main" src="https://www.voidrev.us/js/edc66704bd1974195d8c60f4a163441bec82f1bcb11c492e7df07c43f45a4d49.js"></script>
<meta name="roblox-tracer-meta-data"
data-access-token="S3EXjCZQQr6OixnmKu+hoa3OSfpvPP5qgU0esiWgwreFUUMBnPhEaoS5yIIrf9bdYlSgW0XKCb1So9Rhtj1eMzt/MJWcyKZ4TwIckHVj"
data-service-name="Web"
data-tracer-enabled="false"
data-api-sites-request-allow-list="friends.voidrev.us,chat.voidrev.us,thumbnails.voidrev.us,games.voidrev.us"
data-sample-rate="5"
data-is-instrument-page-performance-enabled="true"/><script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="RobloxTracer" data-bundle-source="Main" src="https://www.voidrev.us/js/adeccc658a8d5ddc63fb224cc0bcd3e29b73d70db3847c0379426bfa128d9381.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="RealTime" data-bundle-source="Main" src="https://www.voidrev.us/js/89f30f6701e04efb9dad1b1fb75ebd7cfe55257af8c8cefbd609039c4d66d8a8.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="CrossTabCommunication" data-bundle-source="Main" src="https://www.voidrev.us/js/948f3bfc9bbd152f537592b51c1a7765cdc0dfc538d74b7e5fc696c476c8792b.js"></script>
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
if (Roblox && Roblox.EventStream) {
Roblox.EventStream.Init("//ecsv2.voidrev.us/www/e.png",
"//ecsv2.voidrev.us/www/e.png",
"//ecsv2.voidrev.us/pe?t=studio",
"//ecsv2.voidrev.us/pe?t=diagnostic");
}
</script>
<script type="text/javascript">
if (Roblox && Roblox.PageHeartbeatEvent) {
Roblox.PageHeartbeatEvent.Init([2,8,20,60]);
}
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
<meta name="thumbnail-meta-data"
data-is-webapp-cache-enabled="False"
data-webapp-cache-expirations-timespan="00:01:00"
data-request-min-cooldown="1000"
data-request-max-cooldown="30000"
data-request-max-retry-attempts="3"
data-request-batch-size="100"
data-thumbnail-metrics-sample-size="20"
data-concurrent-thumbnail-request-count="4"/>
</head>
<div id="Leaderboard-Abp" class="abp leaderboard-abp">
<iframe name="Roblox_MyCharacter_Top_728x90"
allowtransparency="true"
frameborder="0"
height="110"
scrolling="no"
data-src=""
src="/user-sponsorship/?id=3"
width="728"
data-js-adtype="iframead"
data-ad-slot="Roblox_MyCharacter_Top_728x90"></iframe>
</div>
<div id="use-dynamic-thumbnail-lighting" class="hidden" data-use-dynamic-thumbnail-lighting="False"></div>
<div id="avatar-container" class="row page-content">
<div avatar-base></div>
</div>
</div>
</div>
</div>
<?php include($_SERVER['DOCUMENT_ROOT']."/chat.php"); ?>
<div id="cookie-banner-wrapper" class="cookie-banner-wrapper"></div>
<script type="text/javascript">function urchinTracker() {}</script>
<script type="text/javascript">
if (typeof Roblox === "undefined") {
Roblox = {};
}
if (typeof Roblox.PlaceLauncher === "undefined") {
Roblox.PlaceLauncher = {};
}
var isRobloxIconEnabledForRetheme = "True";
var robloxIcon = isRobloxIconEnabledForRetheme === 'True' ? "<span class='icon-logo-r-95'></span>" : "<img src='https://www.voidrev.us/img/8e7879f99cfa7cc3b1fce74f8191be03.svg' width='90' height='90' alt='R'/>";
Roblox.PlaceLauncher.Resources = {
RefactorEnabled: "True",
IsProtocolHandlerBaseUrlParamEnabled: "False",
ProtocolHandlerAreYouInstalled: {
play: {
content: robloxIcon + "<p>You&#39;re moments away from getting into the experience!</p>",
buttonText: "Download and Install Roblox",
footerContent: "<a href='https://assetgame.voidrev.us/game/help'class= 'text-name small' target='_blank' >Click here for help</a> "
},
studio: {
content: "<img src='https://www.voidrev.us/img/f25e4cadae29ae9a57a962126b2d2e2a.png' width='95' height='95' alt='R' /><p>Get started creating your own experiences!</p>",
buttonText: "Download Studio"
}
},
ProtocolHandlerStartingDialog: {
play: {
content: robloxIcon + "<p>Roblox is now loading. Get ready!</p>"
},
studio: {
content: "<img src='https://www.voidrev.us/img/f25e4cadae29ae9a57a962126b2d2e2a.png' width='95' height='95' alt='R' /><p>Checking for Roblox Studio...</p>"
},
loader: "<span class='spinner spinner-default'></span>"
}
};
</script>
<div id="PlaceLauncherStatusPanel" style="display:none;width:300px"
data-new-plugin-events-enabled="True"
data-event-stream-for-plugin-enabled="True"
data-event-stream-for-protocol-enabled="True"
data-is-game-launch-interface-enabled="True"
data-is-protocol-handler-launch-enabled="True"
data-is-duar-auto-opt-in-enabled="false"
data-is-duar-opt-out-disabled="false"
data-is-user-logged-in="True"
data-os-name="Windows"
data-protocol-name-for-client="roblox-player"
data-protocol-name-for-studio="roblox-studio"
data-protocol-roblox-locale="en_us"
data-protocol-game-locale="en_us"
data-protocol-url-includes-launchtime="true"
data-protocol-detection-enabled="true"
data-protocol-separate-script-parameters-enabled="true"
data-protocol-avatar-parameter-enabled="true"
data-protocol-channel-name="LIVE"
data-protocol-studio-channel-name="LIVE"
data-protocol-player-channel-name="LIVE">
<div class="modalPopup blueAndWhite PlaceLauncherModal" style="min-height: 160px">
<div id="Spinner" class="Spinner" style="padding:20px 0;">
<img data-delaysrc="https://www.voidrev.us/img/e998fb4c03e8c2e30792f2f3436e9416.gif" height="32" width="32" alt="Progress" />
</div>
<div id="status" style="min-height:40px;text-align:center;margin:5px 20px">
<div id="Starting" class="PlaceLauncherStatus MadStatusStarting" style="display:block">
Starting Roblox...
</div>
<div id="Waiting" class="PlaceLauncherStatus MadStatusField">Connecting to People...</div>
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
Check <strong>Always open links for URL: Roblox Protocol</strong> and click <strong>Open URL: Roblox Protocol</strong> in the dialog box above to join experiences faster in the future!
</p>
</div>
<script type="text/javascript">
function checkRobloxInstall() {
return RobloxLaunch.CheckRobloxInstall('/Download');
}
</script>
<div id="InstallationInstructions" class="" style="display:none;">
<div class="ph-installinstructions">
<div class="ph-modal-header">
<span class="icon-close simplemodal-close"></span>
<h3 class="title">Thanks for visiting Roblox</h3>
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
<p class="larger-font-size">After installation, click <strong>Join</strong> below to join the action!</p>
<div class="VisitButton VisitButtonContinueGLI">
<a class="btn btn-primary-lg disabled btn-full-width">Join</a>
</div>
</li>
</ul>
</div>
</div>
<div class="xsmall">
The Roblox installer should download shortly. If it doesn’t, start the <a id="GameLaunchManualInstallLink" href="#" class="text-link">download now.</a>
<script id="GameLaunchInstructionsLinkScript">
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
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='clientinstaller' type='text/javascript' src='https://www.voidrev.us/js/f424a786e3d883cff747a034605fa09d.js'></script>
<script type="text/javascript">
Roblox.Client._skip = null;
Roblox.Client._CLSID = '76D50904-6780-4c8b-8986-1A7EE0B1716D';
Roblox.Client._installHost = 'www.voidrev.us';
Roblox.Client.ImplementsProxy = true;
Roblox.Client._silentModeEnabled = true;
Roblox.Client._bringAppToFrontEnabled = false;
Roblox.Client._currentPluginVersion = '';
Roblox.Client._eventStreamLoggingEnabled = true;
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
RobloxLaunch._GoogleAnalyticsCallback = function() { var isInsideRobloxIDE = 'website'; if (Roblox && Roblox.Client && Roblox.Client.isIDE && Roblox.Client.isIDE()) { isInsideRobloxIDE = 'Studio'; };GoogleAnalyticsEvents.FireEvent(['Plugin Location', 'Launch Attempt', isInsideRobloxIDE]);GoogleAnalyticsEvents.FireEvent(['Plugin', 'Launch Attempt', 'Play']);EventTracker.fireEvent('GameLaunchAttempt_Win32', 'GameLaunchAttempt_Win32_Plugin'); if (typeof Roblox.GamePlayEvents != 'undefined') { Roblox.GamePlayEvents.SendClientStartAttempt(null, play_placeId); } };
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
Roblox.CookieUpgrader.upgrade("RBXSessionTracker", { expires: Roblox.CookieUpgrader.fourHoursFromNow });
Roblox.CookieUpgrader.upgrade("RBXEventTrackerV2", {expires: Roblox.CookieUpgrader.thirtyYearsFromNow});
});
</script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='intl-polyfill' type='text/javascript' src='https://www.voidrev.us/js/d44520f7da5ec476cfb1704d91bab327.js'></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="InternationalCore" data-bundle-source="Main" src="https://www.voidrev.us/js/95044be3ff42e3dc429313faca1316cea62f328a39e29689ffeda9002f3a8bc6.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="TranslationResources" data-bundle-source="Main" src="https://www.voidrev.us/js/83d836a661ff433d5b7ce719c489e43af590ff75ab39ccc6d393546fe91b766a.js"></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='leanbase' type='text/javascript' src='https://www.voidrev.us/js/19c8160ae932a35d164b48dd597c55c2.js'></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="CoreUtilities" data-bundle-source="Main" src="https://www.voidrev.us/js/277bc1c2c3f6867fac70a6561b87bbcc6a874a7274319303cdd87ada099bb07e.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="CoreRobloxUtilities" data-bundle-source="Main" src="https://www.voidrev.us/js/76a4480b37d00df868cd2f72f045e279ab6525b49284e5486c28fd2c3fb8f562.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="React" data-bundle-source="Main" src="https://www.voidrev.us/js/4c9a00164d9242bd60de5451a22f502c0c221a896d3a555470c03712d5ee4aa1.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="ReactUtilities" data-bundle-source="Main" src="https://www.voidrev.us/js/cf340fb618d9a73913b30dfc624ae60d68b9e59723746e6c08d06d14ebdd6dca.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="ReactStyleGuide" data-bundle-source="Main" src="https://www.voidrev.us/js/1c1581f969b677da65aacab6ec406807c68d67c7351d67838fbcf9d1bd48fa43.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="ConfigureWebApps" data-bundle-source="Main" src="https://www.voidrev.us/js/5259cfe8a3e36118bd61120693dbba3ba87f2c3641f84bb07e29f1d69fe87523.js"></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='angular' type='text/javascript' src='https://www.voidrev.us/js/ae3d621886e736e52c97008e085fa286.js'></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="AngularJsUtilities" data-bundle-source="Main" src="https://www.voidrev.us/js/11d5c915c418571e1a6e666cfa2213c40e31f2a866daee1e0a75307c7d50e751.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="InternationalAngularJs" data-bundle-source="Main" src="https://www.voidrev.us/js/90f18784a43a70553e967191b948f70b0193df565f1605762c3c1e245ab4b55a.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="Thumbnails" data-bundle-source="Main" src="https://www.voidrev.us/js/b8ca5fe1ee9471c974d39c4d847c3c8f35f972ffd4a99005fab1fd80f23f997d.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="Thumbnails3d" data-bundle-source="Main" src="https://www.voidrev.us/js/40528476e0bf301b991096e250caea8a3d9d1a1d13a6d78ffc2ad52a2d11fc75.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="PresenceStatus" data-bundle-source="Main" src="https://www.voidrev.us/js/bc21a1cb026cbbe9d57b77c1811f0925ca574a53a55a656c4ca4e216dda96eb3.js"></script>
<div id="presence-registration-bootstrap-data"
data-is-enabled="True"
data-interval="15000"></div><script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="PresenceRegistration" data-bundle-source="Main" src="https://www.voidrev.us/js/0a83202cf5f2310227e607928f73a26cdaa7d5c27f892b99ef51ec3b863a694d.js"></script>
<div ng-modules="baseTemplateApp">
<script type="text/javascript" src="https://www.voidrev.us/js/ffcc04436179c6b2a6668fdfcfbf62b1.js"></script>
</div>
<div ng-modules="pageTemplateApp">
<!-- Template bundle: page -->
<script type="text/javascript">
"use strict"; angular.module("pageTemplateApp", []).run(['$templateCache', function($templateCache) {
}]);
</script>
</div>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="VerificationUpsell" data-bundle-source="Main" src="https://www.voidrev.us/js/5bfe49c914e658259a99af2844b9358cdf733083425d3b513cbdd155e3460414.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.VerificationUpsell" data-bundle-source="Unknown" src="https://www.voidrev.us/js/4e31c7c976f24e75beac3766b6572ffaab7c17aacc1689bb15f528cced849092.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.VerificationUpsell" data-bundle-source="Unknown" src="https://www.voidrev.us/js/da4ab091842664a429d48488bcc96285a130a687bfbf1ef14d730cf47a7309f6.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="Navigation" data-bundle-source="Main" src="https://www.voidrev.us/js/1bc111d4996af11595011afe697d768e50056290be102a01b3ccd52c1207feb9.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Common.AlertsAndOptions" data-bundle-source="Unknown" src="https://www.voidrev.us/js/03a64d3850925b52ee73bd27b41658f4a35a2b33b4a499fcb2ce72dcbd98020f.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Common.AlertsAndOptions" data-bundle-source="Unknown" src="https://www.voidrev.us/js/8f06fef33a61a6c67e1e6d93829b9bb03476bc976102d7bcebe4bfe85a3d4328.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.ShopDialog" data-bundle-source="Unknown" src="https://www.voidrev.us/js/95fdafe5af749e388de603b9ee7f67bb092c3c790badc572db4e2bca0c32b49a.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.ShopDialog" data-bundle-source="Unknown" src="https://www.voidrev.us/js/c0606e8d6eb4487cdc70d318e6de3d9aaeeb465ddb84acd95139011e56c5e5c6.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_CommonUI.Features" data-bundle-source="Unknown" src="https://www.voidrev.us/js/c629f6739d6903fec0d935d26a9cea02ff757856d4ed73a83fd1535affea0300.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_CommonUI.Features" data-bundle-source="Unknown" src="https://www.voidrev.us/js/5370e5e55fc9993ec53b0a4195e82290b8c1c5f95a1fb5cd11a2ec82d5d07809.js"></script>
<script type='text/javascript'>Roblox.config.externalResources = [];Roblox.config.paths['Pages.Catalog'] = 'https://www.voidrev.us/js/109d883fe3988fca757e26e341ed0fe8.js';Roblox.config.paths['Pages.CatalogShared'] = 'https://www.voidrev.us/js/33126cd3e259a404a2563594f55a3f06.js';Roblox.config.paths['Widgets.AvatarImage'] = 'https://www.voidrev.us/js/7d49ac94271bd506077acc9d0130eebb.js';Roblox.config.paths['Widgets.DropdownMenu'] = 'https://www.voidrev.us/js/da553e6b77b3d79bec37441b5fb317e7.js';Roblox.config.paths['Widgets.HierarchicalDropdown'] = 'https://www.voidrev.us/js/4a0af9989732810851e9e12809aeb8ad.js';Roblox.config.paths['Widgets.ItemImage'] = 'https://www.voidrev.us/js/61a0490ba23afa17f9ecca2a079a6a57.js';Roblox.config.paths['Widgets.PlaceImage'] = 'https://www.voidrev.us/js/a6df74a754523e097cab747621643c98.js';</script>
<script>
$(function () {
Roblox.DeveloperConsoleWarning.showWarning();
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
});
</script>
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
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='page' type='text/javascript' src='https://www.voidrev.us/js/1a8f964a26653232cb28425ce64af1c5.js'></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="StyleGuide" data-bundle-source="Main" src="https://www.voidrev.us/js/7dce9cc810f07250a8a86c0b66f70226bcb93a2da1ad6d619427b3037a402cd2.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="CookieBannerV3" data-bundle-source="Main" src="https://www.voidrev.us/js/325e056e25bc4a167d0bd16463fc2c6683fb17cef494bee497990b8aec2f0995.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_CommonUI.Messages" data-bundle-source="Unknown" src="https://www.voidrev.us/js/18dede93de3aac02225e1e6e9957d98d6983c39fc9e76eb0cdb05090e5551f95.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_CommonUI.Messages" data-bundle-source="Unknown" src="https://www.voidrev.us/js/5b148ca445e1fd4ef905bc3665b2e29d065ab357cc88fd68be95b519f6e2da0d.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.Tracking" data-bundle-source="Unknown" src="https://www.voidrev.us/js/ce6a4105a4d28cac59aa57a3d6615d56ba63526569ebfd88d49ac363d61caddb.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.Tracking" data-bundle-source="Unknown" src="https://www.voidrev.us/js/fb47e86d6d7deaf62c7c5c8a62d915361b3f9b47503976e24e4fdd44710a492e.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="AccountSecurityPrompt" data-bundle-source="Main" src="https://www.voidrev.us/js/8988d77d7a4bc03301cf57b647f4f1d688bf744e05d8e76b53b66ccc4629d519.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.AccountSecurityPrompt" data-bundle-source="Unknown" src="https://www.voidrev.us/js/700cc74a614909fb898aae9478ebcf0dc1f66efa706539ddda47014cf18edde0.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.AccountSecurityPrompt" data-bundle-source="Unknown" src="https://www.voidrev.us/js/2e2d1d7ba3772c4df7c5efbcba6b3c3891b03cf8f66a4e5ca198a15f33b3daa6.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="CursorPagination" data-bundle-source="Main" src="https://www.voidrev.us/js/267b13d96f317adcd84f99e1b9758d63d612f6e44f7c06b49c6c44c1fa99323f.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_CommonUI.Controls" data-bundle-source="Unknown" src="https://www.voidrev.us/js/556d0c65739acf5c4b72d17c9433092f429d513d447d9ac2a918a21132fea0de.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_CommonUI.Controls" data-bundle-source="Unknown" src="https://www.voidrev.us/js/e4c74a5e7d87ef7c6ddb0ff25cd193f6f7495ad1566381290f0bbde36124a4d1.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="AvatarAccoutrementRules" data-bundle-source="Main" src="https://www.voidrev.us/js/96ae8ad99ff9806424550eec3639efaf2f7ffe8f9dd594e80ad65d19a37bb762.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="Avatar" data-bundle-source="Main" src="https://www.voidrev.us/js/8b5d3b0bb5f6d86b6bc1f1b093424481800250931a51aaf406c25232eada2c22.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.Avatar" data-bundle-source="Unknown" src="https://www.voidrev.us/js/50b6553c8d0a6dfe928be4d0cac94c60596c4e802a4b899d94aa042565561d02.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.Avatar" data-bundle-source="Unknown" src="https://www.voidrev.us/js/c1a60c61b1c72fd4065439e21bb432e8ce99968545d748b27a9fb1fbe4b26cd5.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="Recommendations" data-bundle-source="Main" src="https://www.voidrev.us/js/37a92ee6593f660672a978c60522b004d4c73e3e5d176720c86435764a574c5d.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.Recommendations" data-bundle-source="Unknown" src="https://www.voidrev.us/js/e2f05beadd198ef90d466589ce5ef1f35686172806aa67f65ba579cbe0361826.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.Recommendations" data-bundle-source="Unknown" src="https://www.voidrev.us/js/005a844468bae021db544561dae001dece9547a29883d9b5bb76d86305f4624c.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="Contacts" data-bundle-source="Main" src="https://www.voidrev.us/js/6291b18e0d22b742564031e30914caa8a4326d2db7916b04ab8524c6b306f25a.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="Chat" data-bundle-source="Main" src="https://www.voidrev.us/js/28dea894f23f4a1c7f13629621df2873dd778b9e44685e7c85464c4a3944940b.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.Chat" data-bundle-source="Unknown" src="https://www.voidrev.us/js/c2e07c35f6b6f198f4cdd7617700e3fdc08a4950057b5d951e177cb3a799925f.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Feature.Chat" data-bundle-source="Unknown" src="https://www.voidrev.us/js/fa72396066e6281487ac88403442eedb3f1fd2bfa5d7ce9d3f24555d47b07927.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="ItemPurchase" data-bundle-source="Main" src="https://www.voidrev.us/js/bf6ae6dfa7d79f9ffe1a0c1b3a22c25707722264d9afdd2fae5cc3e7f51e5d70.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Purchasing.PurchaseDialog" data-bundle-source="Unknown" src="https://www.voidrev.us/js/7918ac8b721b946f2800652b084166ae795408706e447c98a9af8ca3e8a0cbc0.js"></script>
<script type="text/javascript" onerror="Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)" data-monitor="true" data-bundlename="DynamicLocalizationResourceScript_Purchasing.PurchaseDialog" data-bundle-source="Unknown" src="https://www.voidrev.us/js/4e1037868737fa797b0e3248bc05479c925d8029ec146d6633aeebd9e0bb6c71.js"></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='serviceworkerregistrar' type='text/javascript' src='https://www.voidrev.us/js/d5b67abc659e3430838dada0f185cb62.js'></script>
<div id="push-notification-registrar-settings"
data-notificationshost="https://www.voidrev.us"
data-reregistrationinterval="0"
data-registrationpath="register-chrome"
data-shoulddeliveryendpointbesentduringregistration="False"
data-platformtype="ChromeOnDesktop">
</div>
<div id="push-notification-registration-ui-settings"
data-noncontextualpromptallowed="true"
data-promptonfriendrequestsentenabled="true"
data-promptonprivatemessagesentenabled="false"
data-promptintervals="[604800000,1209600000,2419200000]"
data-notificationsdomain="https://www.voidrev.us"
data-userid="<?=$uID;?>">
</div>
<script type="text/template" id="push-notifications-initial-global-prompt-template">
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
<button type="button" class="btn-min-width btn-growth-xs push-notifications-prompt-accept">Notify Me</button>
<span class="icon-close push-notifications-dismiss-prompt"></span>
</div>
</div>
</div>
</script>
<script type="text/template" id="push-notifications-permissions-prompt-template">
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
<img width="380" height="250" src="https://www.voidrev.us/images/Notifications/push-permission-prompt-chrome-windows-20160701.png" />
</div>
</div>
<div class="modal-footer">
</div>
</div>
</div>
</div>
</script>
<script type="text/template" id="push-notifications-permissions-disabled-instruction-template">
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
<script type="text/template" id="push-notifications-successfully-enabled-template">
<div class="push-notifications-global-prompt">
<div class="alert-system-feedback">
<div class="alert alert-success">
Push notifications have been enabled!
</div>
</div>
</div>
</script>
<script type="text/template" id="push-notifications-successfully-disabled-template">
<div class="push-notifications-global-prompt">
<div class="alert-system-feedback">
<div class="alert alert-success">
Push notifications have been disabled.
</div>
</div>
</div>
</script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='pageEnd' type='text/javascript' src='https://www.voidrev.us/js/c9d1cd5255cd807b1e89c5a992ddc5cd.js'></script>
</body>
</html>
