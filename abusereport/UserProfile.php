<?php
include ($_SERVER['DOCUMENT_ROOT'].'/global.php');
$getid = (int)$_GET['id'];
$checkquery = $con->prepare("SELECT * FROM `users` WHERE `id`= :id");
$checkquery->execute(['id' => $getid]);
$check = $checkquery->fetch();
$chatenabled = true;
?>
<title>Report Abuse - Void</title>
<meta http-equiv="X-UA-Compatible" content="IE=edge,requiresActiveX=true" />
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta id="RobotsMETA" name='ROBOTS' content='NOINDEX, NOFOLLOW' />
<meta name="page-meta" data-internal-page-name="" />
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.BundleVerifierConstants = {
isMetricsApiEnabled: false,
eventStreamUrl: "//ecsv2.voidrev.us/pe?t=diagnostic",
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
var metricsApiUrl = (Roblox.EnvironmentUrls && Roblox.EnvironmentUrls.metricsApi) || "https://www.voidrev.us";
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
<link rel="manifest" href="https://notifications.voidrev.us/v2/push-notifications/chrome-manifest" crossorigin="use-credentials">
<link rel="canonical" href="https://www.voidrev.us/abusereport/userprofile?id=1098793164&amp;redirecturl=https%3a%2f%2fwww.voidrev.us%2fusers%2f1098793164%2fprofile" />
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' href='https://www.voidrev.us/css/leanbase.css' />
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' href='https://www.voidrev.us/css/abuseuser.css' />
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
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='headerinit' type='text/javascript' src='https://www.voidrev.us/js/175a4c92837369e0600f5343486a24f9.js'></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='RealTime' type='text/javascript' src='https://www.voidrev.us/js/2a27a86cbeb8a17802e9cca5ac801621a17b7c9f88f9c9bbb82e3d06203313b0.js'></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='CrossTabCommunication' type='text/javascript' src='https://www.voidrev.us/js/a3d58af86c198c153ba6efea6e93cf05a1343c124f70e763f9194684644a9c52.js'></script>
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
_gaq.push(['b._trackPageview']);
_gaq.push(['c._setAccount', 'UA-26810151-2']);
_gaq.push(['c._setSampleRate', '1']);
_gaq.push(['c._setDomainName', 'voidrev.us']);
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
<script type="text/javascript">
if (Roblox && Roblox.PageHeartbeatEvent) {
Roblox.PageHeartbeatEvent.Init([2,8,20,60]);
}
</script> <script type="text/javascript">
if (typeof(Roblox) === "undefined") { Roblox = {}; }
Roblox.Endpoints = Roblox.Endpoints || {};
Roblox.Endpoints.Urls = Roblox.Endpoints.Urls || {};
Roblox.Endpoints.Urls['/api/item.ashx'] = 'https://www.voidrev.us/api/item.ashx';
Roblox.Endpoints.Urls['/asset/'] = 'https://assetgame.voidrev.us/asset/';
Roblox.Endpoints.Urls['/client-status/set'] = 'https://www.voidrev.us/client-status/set';
Roblox.Endpoints.Urls['/client-status'] = 'https://www.voidrev.us/client-status';
Roblox.Endpoints.Urls['/game/'] = 'https://assetgame.voidrev.us/game/';
Roblox.Endpoints.Urls['/game-auth/getauthticket'] = 'https://www.voidrev.us/game-auth/getauthticket';
Roblox.Endpoints.Urls['/game/edit.ashx'] = 'https://assetgame.voidrev.us/game/edit.ashx';
Roblox.Endpoints.Urls['/game/getauthticket'] = 'https://assetgame.voidrev.us/game/getauthticket';
Roblox.Endpoints.Urls['/game/get-hash'] = 'https://assetgame.voidrev.us/game/get-hash';
Roblox.Endpoints.Urls['/game/placelauncher.ashx'] = 'https://assetgame.voidrev.us/game/placelauncher.ashx';
Roblox.Endpoints.Urls['/game/preloader'] = 'https://assetgame.voidrev.us/game/preloader';
Roblox.Endpoints.Urls['/game/report-stats'] = 'https://assetgame.voidrev.us/game/report-stats';
Roblox.Endpoints.Urls['/game/report-event'] = 'https://assetgame.voidrev.us/game/report-event';
Roblox.Endpoints.Urls['/game/updateprerollcount'] = 'https://assetgame.voidrev.us/game/updateprerollcount';
Roblox.Endpoints.Urls['/login/default.aspx'] = 'https://www.voidrev.us/login/default.aspx';
Roblox.Endpoints.Urls['/my/avatar'] = 'https://www.voidrev.us/my/avatar';
Roblox.Endpoints.Urls['/my/money.aspx'] = 'https://www.voidrev.us/my/money.aspx';
Roblox.Endpoints.Urls['/navigation/userdata'] = 'https://www.voidrev.us/navigation/userdata';
Roblox.Endpoints.Urls['/chat/chat'] = 'https://www.voidrev.us/chat/chat';
Roblox.Endpoints.Urls['/chat/data'] = 'https://www.voidrev.us/chat/data';
Roblox.Endpoints.Urls['/presence/users'] = 'https://www.voidrev.us/presence/users';
Roblox.Endpoints.Urls['/presence/user'] = 'https://www.voidrev.us/presence/user';
Roblox.Endpoints.Urls['/friends/list'] = 'https://www.voidrev.us/friends/list';
Roblox.Endpoints.Urls['/navigation/getcount'] = 'https://www.voidrev.us/navigation/getCount';
Roblox.Endpoints.Urls['/regex/email'] = 'https://www.voidrev.us/regex/email';
Roblox.Endpoints.Urls['/catalog/browse.aspx'] = 'https://www.voidrev.us/catalog/browse.aspx';
Roblox.Endpoints.Urls['/catalog/html'] = 'https://search.voidrev.us/catalog/html';
Roblox.Endpoints.Urls['/catalog/json'] = 'https://search.voidrev.us/catalog/json';
Roblox.Endpoints.Urls['/catalog/contents'] = 'https://search.voidrev.us/catalog/contents';
Roblox.Endpoints.Urls['/catalog/lists.aspx'] = 'https://search.voidrev.us/catalog/lists.aspx';
Roblox.Endpoints.Urls['/catalog/items'] = 'https://search.voidrev.us/catalog/items';
Roblox.Endpoints.Urls['/asset-hash-thumbnail/image'] = 'https://assetgame.voidrev.us/asset-hash-thumbnail/image';
Roblox.Endpoints.Urls['/asset-hash-thumbnail/json'] = 'https://assetgame.voidrev.us/asset-hash-thumbnail/json';
Roblox.Endpoints.Urls['/asset-thumbnail-3d/json'] = 'https://assetgame.voidrev.us/asset-thumbnail-3d/json';
Roblox.Endpoints.Urls['/asset-thumbnail/image'] = 'https://assetgame.voidrev.us/asset-thumbnail/image';
Roblox.Endpoints.Urls['/asset-thumbnail/json'] = 'https://assetgame.voidrev.us/asset-thumbnail/json';
Roblox.Endpoints.Urls['/asset-thumbnail/url'] = 'https://assetgame.voidrev.us/asset-thumbnail/url';
Roblox.Endpoints.Urls['/asset/request-thumbnail-fix'] = 'https://assetgame.voidrev.us/asset/request-thumbnail-fix';
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
Roblox.Endpoints.Urls['/authentication/is-logged-in'] = 'https://www.voidrev.us/authentication/is-logged-in';
Roblox.Endpoints.addCrossDomainOptionsToAllRequests = true;
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
<div class="alert-container">
<noscript><div><div class="alert-info" role="alert">Please enable Javascript to use all the features on this site.</div></div></noscript>
</div>
<div class="content">
<div id="report-container">
<div class="container-header">
<h1>Report Abuse</h1>
</div>
<div id="report-body" class="section-content">
<div id="report-header" class="section-header">
<h4>Tell us how you think <?php echo $check['username'];?> is breaking the rules of Roblox.</h4>
</div>
<div id="report-form">
<form id="form" method="post" action="">
<input name="__RequestVerificationToken" type="hidden" value="B9u2NAfyeG7pT-Qk-UT86DGFcMTdtBAhpzxMn2HhgokOIQ0roaNIYpYBIL57YsU1MAApERRDbPJ65be_bHvKsSYqsj6Qf5ChlHkh-p5rG3GyTGhC0" />
<div id="form-row-subject" class="form-group">
<label class="text-label">Subject:</label>
<div class="rbx-select-group">
<select id="ReportCategory" name="ReportCategory" class="form-control input-field rbx-select">
<option value="" selected="selected">Please select a category</option>
<option value="1">Inappropriate Language - Profanity &amp; Adult Content</option>
<option value="2">Asking for or Giving Private Information</option>
<option value="3">Bullying, Harassment, Discrimination</option>
<option value="4">Dating</option>
<option value="5">Exploiting, Cheating, Scamming</option>
<option value="6">Account Theft - Phishing, Hacking, Trading</option>
<option value="7">Inappropriate Content - Place, Image, Model</option>
<option value="8">Real Life Threats &amp; Suicide Threats</option>
<option value="9">Other rule violation</option>
</select>
</div>
<span id="categoryError" class="text-error">Please select a category</span>
</div>
<div id="form-row-comment" class="form-group">
<label class="text-label">Comment:</label>
<textarea class="form-control input-field" id="Comment" name="Comment" rows="5"></textarea>
</div>
<div class="form-group submit-group">
<a id="report-abuse" class="btn-secondary-sm">
Report Abuse
</a>
</div>
<input type="hidden" id="Id" name="Id" value="1098793164" />
<input type="hidden" id="RedirectUrl" name="RedirectUrl" value="https://www.voidrev.us/users/1098793164/profile" />
<input type="hidden" id="PartyGuid" name="PartyGuid" />
<input type="hidden" id="ConversationId" name="ConversationId" />
</form>
</div>
<div class="section-header">
<h4>Not sure if the thing you are trying to report is really against the rules?</h4>
</div>
<div class="basic-rules-preface">Some of the basic rules of Roblox include the following:</div>
<div id="basic-rules-list-container" class="basic-rules-list-container">
<ul id="basic-rules-list" class="basic-rules-list">
<li>No swear words</li>
<li>No account sharing or trading</li>
<li>No dating - no asking for boyfriends or girlfriends</li>
<li>No asking real life info about each other - no asking for phone numbers or email addresses</li>
</ul>
</div>
<div id="basic-rules-link" class="basic-rules-link">
<a href="https://en.help.voidrev.us/hc/en-us/sections/200866010-Roblox-Rules-and-Guidelines" class="text-link" target="_blank">See all rules.</a>
</div>
<div id="basic-rules-footer">Users who don&#39;t follow the rules will get a warning at first but if they keep it up we may ask them to not come to Roblox anymore. That way we can keep Roblox fun and safe!</div>
</div>
</div>
</div>
</div>
<footer class="container-footer">
<div class="footer">
<ul class="row footer-links">
<li class="footer-link">
<a href="https://www.voidrev.us/info/about-us?locale=en_us" class="text-footer-nav roblox-interstitial" target="_blank">
About Us
</a>
</li>
<li class="footer-link">
<a href="https://www.voidrev.us/info/jobs?locale=en_us" class="text-footer-nav roblox-interstitial" target="_blank">
Jobs
</a>
</li>
<li class=" footer-link">
<a href="https://www.voidrev.us/info/blog?locale=en_us" class="text-footer-nav" target="_blank">
Blog
</a>
</li>
<li class=" footer-link">
<a href="https://www.voidrev.us/info/parents?locale=en_us" class="text-footer-nav roblox-interstitial" target="_blank">
Parents
</a>
</li>
<li class=" footer-link">
<a href="https://www.voidrev.us/info/help?locale=en_us" class="text-footer-nav roblox-interstitial" target="_blank">
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
<div class="row copyright-wrapper">
<div class="col-sm-6 col-md-3">
<!-- Native Select to Support Mobile -->
<div class="rbx-select-group icon-dropdown">
<select class="rbx-select language-select" id="language-switcher">
<option value="de_de"
data-is-supported="true"
>
Deutsch
</option>
<option value="en_us"
data-is-supported="true"
selected>
English
</option>
<option value="es_es"
data-is-supported="true"
>
Espa&#241;ol
</option>
<option value="fr_fr"
data-is-supported="true"
>
Fran&#231;ais
</option>
<option value="pt_br"
data-is-supported="true"
>
Portugu&#234;s (Brasil)
</option>
<option value="ko_kr"
data-is-supported="true"
>
한국어
</option>
<option value="zh_cn"
data-is-supported="true"
>
中文(简体)
</option>
<option value="zh_tw"
data-is-supported="true"
>
中文(繁體)
</option>
<option value="id_id"
data-is-supported="false"
>
Bahasa Indonesia*
</option>
<option value="ms_my"
data-is-supported="false"
>
bahasa Melayu*
</option>
<option value="nb_no"
data-is-supported="false"
>
bokm&#229;l*
</option>
<option value="cs_cz"
data-is-supported="false"
>
čeština*
</option>
<option value="da_dk"
data-is-supported="false"
>
dansk*
</option>
<option value="et_ee"
data-is-supported="false"
>
eesti*
</option>
<option value="fil_ph"
data-is-supported="false"
>
Filipino*
</option>
<option value="hr_hr"
data-is-supported="false"
>
hrvatski*
</option>
<option value="it_it"
data-is-supported="false"
>
Italiano*
</option>
<option value="lv_lv"
data-is-supported="false"
>
latviešu*
</option>
<option value="lt_lt"
data-is-supported="false"
>
lietuvių*
</option>
<option value="hu_hu"
data-is-supported="false"
>
magyar*
</option>
<option value="nl_nl"
data-is-supported="false"
>
Nederlands*
</option>
<option value="pl_pl"
data-is-supported="false"
>
polski*
</option>
<option value="ro_ro"
data-is-supported="false"
>
rom&#226;nă*
</option>
<option value="sq_al"
data-is-supported="false"
>
shqipe*
</option>
<option value="sk_sk"
data-is-supported="false"
>
slovenčina*
</option>
<option value="sl_sl"
data-is-supported="false"
>
slovenski*
</option>
<option value="fi_fi"
data-is-supported="false"
>
suomi*
</option>
<option value="sv_se"
data-is-supported="false"
>
svenska*
</option>
<option value="vi_vn"
data-is-supported="false"
>
Tiếng Việt Nam*
</option>
<option value="tr_tr"
data-is-supported="false"
>
T&#252;rk&#231;e*
</option>
<option value="el_gr"
data-is-supported="false"
>
ελληνικά*
</option>
<option value="bs_ba"
data-is-supported="false"
>
босански*
</option>
<option value="bg_bg"
data-is-supported="false"
>
български*
</option>
<option value="kk_kz"
data-is-supported="false"
>
қазақ тілі*
</option>
<option value="ru_ru"
data-is-supported="false"
>
Русский*
</option>
<option value="sr_rs"
data-is-supported="false"
>
српски*
</option>
<option value="uk_ua"
data-is-supported="false"
>
україньска*
</option>
<option value="ka_ge"
data-is-supported="false"
>
ქართული*
</option>
<option value="hi_in"
data-is-supported="false"
>
हिन्दी*
</option>
<option value="bn_bd"
data-is-supported="false"
>
বাংলা*
</option>
<option value="si_lk"
data-is-supported="false"
>
සිංහල*
</option>
<option value="th_th"
data-is-supported="false"
>
ภาษาไทย*
</option>
<option value="my_mm"
data-is-supported="false"
>
ဗမာစာ*
</option>
<option value="km_kh"
data-is-supported="false"
>
ភាសាខ្មែរ*
</option>
<option value="ja_jp"
data-is-supported="false"
>
日本語*
</option>
</select>
<span class="icon-arrow icon-down-16x16"></span>
</div>
<!-- Regular UI for Desktop -->
<div class="input-group-btn">
<button type="button" class="input-dropdown-btn" data-toggle="dropdown">
<span class="icon-globe"></span>
<span class="rbx-selection-label" data-bind="label">
English </span>
<span class="icon-down-16x16"></span>
</button>
<ul data-toggle="dropdown-menu" class="dropdown-menu" role="menu">
<li>
<a href="#"
class="locale-option"
data-locale="de_de"
data-is-supported="true">
Deutsch
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="en_us"
data-is-supported="true">
English
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="es_es"
data-is-supported="true">
Espa&#241;ol
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="fr_fr"
data-is-supported="true">
Fran&#231;ais
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="pt_br"
data-is-supported="true">
Portugu&#234;s (Brasil)
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="ko_kr"
data-is-supported="true">
한국어
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="zh_cn"
data-is-supported="true">
中文(简体)
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="zh_tw"
data-is-supported="true">
中文(繁體)
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="id_id"
data-is-supported="false">
Bahasa Indonesia*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="ms_my"
data-is-supported="false">
bahasa Melayu*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="nb_no"
data-is-supported="false">
bokm&#229;l*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="cs_cz"
data-is-supported="false">
čeština*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="da_dk"
data-is-supported="false">
dansk*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="et_ee"
data-is-supported="false">
eesti*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="fil_ph"
data-is-supported="false">
Filipino*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="hr_hr"
data-is-supported="false">
hrvatski*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="it_it"
data-is-supported="false">
Italiano*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="lv_lv"
data-is-supported="false">
latviešu*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="lt_lt"
data-is-supported="false">
lietuvių*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="hu_hu"
data-is-supported="false">
magyar*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="nl_nl"
data-is-supported="false">
Nederlands*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="pl_pl"
data-is-supported="false">
polski*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="ro_ro"
data-is-supported="false">
rom&#226;nă*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="sq_al"
data-is-supported="false">
shqipe*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="sk_sk"
data-is-supported="false">
slovenčina*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="sl_sl"
data-is-supported="false">
slovenski*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="fi_fi"
data-is-supported="false">
suomi*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="sv_se"
data-is-supported="false">
svenska*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="vi_vn"
data-is-supported="false">
Tiếng Việt Nam*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="tr_tr"
data-is-supported="false">
T&#252;rk&#231;e*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="el_gr"
data-is-supported="false">
ελληνικά*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="bs_ba"
data-is-supported="false">
босански*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="bg_bg"
data-is-supported="false">
български*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="kk_kz"
data-is-supported="false">
қазақ тілі*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="ru_ru"
data-is-supported="false">
Русский*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="sr_rs"
data-is-supported="false">
српски*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="uk_ua"
data-is-supported="false">
україньска*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="ka_ge"
data-is-supported="false">
ქართული*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="hi_in"
data-is-supported="false">
हिन्दी*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="bn_bd"
data-is-supported="false">
বাংলা*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="si_lk"
data-is-supported="false">
සිංහල*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="th_th"
data-is-supported="false">
ภาษาไทย*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="my_mm"
data-is-supported="false">
ဗမာစာ*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="km_kh"
data-is-supported="false">
ភាសាខ្មែរ*
</a>
</li>
<li>
<a href="#"
class="locale-option"
data-locale="ja_jp"
data-is-supported="false">
日本語*
</a>
</li>
</ul>
</div>
</div>
<div class="col-sm-6 col-md-9">
<!-- NOTE: "Roblox Corporation" is a healthcheck; be careful when updating! -->
<p class="text-footer footer-note">
</p>
</div>
</div>
</div>
</footer>
</div>
<?php include($_SERVER['DOCUMENT_ROOT'].'/chat.php'); ?>
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
<!-- Template bundle: page -->
<script type="text/javascript">
"use strict"; angular.module("pageTemplateApp", []).run(['$templateCache', function($templateCache) {
}]);
</script>
</div>
<script type='text/javascript'>Roblox.config.externalResources = [];Roblox.config.paths['Pages.Catalog'] = 'https://www.voidrev.us/js/baa0c90950583c77f295ecd0748e32ce.js';Roblox.config.paths['Pages.CatalogShared'] = 'https://www.voidrev.us/js/fac702cb852bab6006d426d83c56f8ab.js';Roblox.config.paths['Widgets.AvatarImage'] = 'https://www.voidrev.us/js/76e30b0ae6a1be83cbf018579681b891.js';Roblox.config.paths['Widgets.DropdownMenu'] = 'https://www.voidrev.us/js/c948a7edd36e01db699c8cf19303376d.js';Roblox.config.paths['Widgets.GroupImage'] = 'https://www.voidrev.us/js/3afc03adcc2aaca01500baaf69b52d9c.js';Roblox.config.paths['Widgets.HierarchicalDropdown'] = 'https://www.voidrev.us/js/c90aea1e430a241776db6775e98c3e03.js';Roblox.config.paths['Widgets.ItemImage'] = 'https://www.voidrev.us/js/de56e6c24a3e70ee7d1ec900c24042e8.js';Roblox.config.paths['Widgets.PlaceImage'] = 'https://www.voidrev.us/js/6003f8790df31d5445169faea5c04fd7.js';</script>
<script>
Roblox.XsrfToken.setToken('ku4tQ0b+AEUp');
</script>
<script>
$(function () {
Roblox.DeveloperConsoleWarning.showWarning();
});
</script>
<?php include($_SERVER['DOCUMENT_ROOT'].'/chat2.php'); ?>
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
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='page' type='text/javascript' src='https://www.voidrev.us/js/1ce2026a33aab232288ce6fdaf05a49a.js'></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='StyleGuide' type='text/javascript' src='https://www.voidrev.us/js/935ce03d7733b2b55182ed4e77db83394692ba7e345a74c2240128f802d1af0d.js'></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='serviceworkerregistrar' type='text/javascript' src='https://www.voidrev.us/js/7dddf6fdb21fde44544221254d039501.js'></script>
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
<button type="button" class="btn-min-width btn-control-xs push-notifications-prompt-accept">Notify Me</button>
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
<script>
var _comscore = _comscore || [];
_comscore.push({ c1: "2", c2: "6035605", c3: "", c4: "", c15: "Over13" });
(function() {
var s = document.createElement("script"), el = document.getElementsByTagName("script")[0];
s.async = true;
s.src = (document.location.protocol == "https:" ? "https://sb" : "http://b") + ".scorecardresearch.com/beacon.js";
el.parentNode.insertBefore(s, el);
})();
</script>
<noscript>
<img src="http://b.scorecardresearch.com/p?c1=2&c2=&c3=&c4=&c5=&c6=&c15=&cv=2.0&cj=1"/>
</noscript>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='pageEnd' type='text/javascript' src='https://www.voidrev.us/js/7e42bd8acc22cb6b98926ccd04832d9c.js'></script>
</body>
</html>