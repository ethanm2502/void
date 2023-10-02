<?php
$chatenabled = true;
include($_SERVER['DOCUMENT_ROOT'] . '/global.php');
if (!$logged) {
header('Location: https://www.voidrev.us/');
}
?>
<head data-machine-id=WEB309>
<title>Home - Void</title>
<meta name=user-data data-userid=<?=$uID;?> data-name=<?php echo NOXSSPlz($username); ?> data-displayname=<?php echo NOXSSPlz($usr['displayname']); ?> data-isunder13=false data-created="<?php echo date("n/j/Y g:i:s A", $usr['trn_date']);?>" data-ispremiumuser=<?php if($membership == "Premium"){echo"true";}else{echo"false";}?>>
<meta name=locale-data data-language-code=en_us data-language-name=English>
<meta name=device-meta data-device-type=computer data-is-in-app=false data-is-desktop=true data-is-phone=false data-is-tablet=false data-is-console=false data-is-android-app=false data-is-ios-app=false data-is-uwp-app=false data-is-xbox-app=false data-is-amazon-app=false data-is-win32-app=false data-is-studio=false data-is-game-client-browser=false data-is-ios-device=false data-is-android-device=false data-is-universal-app=false data-app-type=unknown>
<meta name=environment-meta data-is-testing-site=false>
<meta id=roblox-display-names data-enabled=false>
<meta name=page-meta data-internal-page-name=Home>
<meta name=performance data-ui-performance-relative-value=1 data-ui-performance-endpoint="https://www.voidrev.us/v1/performance/send-measurement" data-ui-performance-metrics-batch-wait-time=00:00:30 data-ui-performance-metrics-batch-size=100>
<script>
var Roblox = Roblox || {};
Roblox.BundleVerifierConstants = {
isMetricsApiEnabled: false,
eventStreamUrl: "//www.voidrev.us/pe?t=diagnostic",
deviceType: "Computer",
cdnLoggingEnabled: JSON.parse("true")
};
</script>
<script>
var Roblox = Roblox || {};
Roblox.BundleDetector = (function() {
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
setTiming: function(windowTiming) {
this.timing = windowTiming;
},
getLoadTime: function() {
if (this.timing && this.timing.domComplete) {
return this.getCurrentTime() - this.timing.domComplete;
}
},
getCurrentTime: function() {
return new Date().getTime();
},
getCdnProviderName: function(bundleUrl, callBack) {
if (Roblox.BundleVerifierConstants.cdnLoggingEnabled) {
var xhr = new XMLHttpRequest();
xhr.open('GET', bundleUrl, true);
xhr.onreadystatechange = function() {
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
}
;
xhr.onerror = function() {
callBack();
}
;
xhr.send();
} else {
callBack();
}
},
getCdnProviderAndReportMetrics: function(bundleUrl, bundleName, loadState, bundleContentType) {
this.getCdnProviderName(bundleUrl, function(cdnProviderName) {
Roblox.BundleDetector.reportMetrics(bundleUrl, bundleName, loadState, bundleContentType, cdnProviderName);
});
},
reportMetrics: function(bundleUrl, bundleName, loadState, bundleContentType, cdnProviderName) {
if (!isMetricsApiEnabled || !bundleUrl || !loadState || !loadStates.hasOwnProperty(loadState) || !bundleContentType || !bundleContentTypes.hasOwnProperty(bundleContentType)) {
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
logToEphemeralStatistics: function(sequenceName, value) {
var deviceType = Roblox.BundleVerifierConstants.deviceType;
sequenceName += "_" + deviceType;
var xhr = new XMLHttpRequest();
xhr.open('POST', '/game/report-stats?name=' + sequenceName + "&value=" + value, true);
xhr.withCredentials = true;
xhr.send();
},
logToEphemeralCounter: function(ephemeralCounterName) {
var deviceType = Roblox.BundleVerifierConstants.deviceType;
ephemeralCounterName += "_" + deviceType;
var xhr = new XMLHttpRequest();
xhr.open('POST', '/game/report-event?name=' + ephemeralCounterName, true);
xhr.withCredentials = true;
xhr.send();
},
logToEventStream: function(failedBundle, ctx, cdnProvider, status) {
var esUrl = Roblox.BundleVerifierConstants.eventStreamUrl
, currentPageUrl = encodeURIComponent(window.location.href);
var deviceType = Roblox.BundleVerifierConstants.deviceType;
ctx += "_" + deviceType;
var duration = 0;
if (window.performance) {
var perfTiming = window.performance.getEntriesByName(failedBundle);
if (perfTiming.length > 0) {
var data = perfTiming[0];
duration = data.duration || 0;
}
}
var params = "&evt=webBundleError&url=" + currentPageUrl + "&ctx=" + ctx + "&fileSourceUrl=" + encodeURIComponent(failedBundle) + "&cdnName=" + (cdnProvider || "unknown") + "&statusCode=" + (status || "unknown") + "&loadDuration=" + Math.floor(duration);
var img = new Image();
img.src = esUrl + params;
},
getCdnInfo: function(failedBundle, ctx, fileType) {
if (Roblox.BundleVerifierConstants.cdnLoggingEnabled) {
var xhr = new XMLHttpRequest();
var counter = this.counterNames;
xhr.open('GET', failedBundle, true);
var cdnProvider;
xhr.onreadystatechange = function() {
if (xhr.readyState === xhr.HEADERS_RECEIVED) {
cdnProvider = xhr.getResponseHeader("rbx-cdn-provider");
if (cdnProvider && cdnProvider.length > 0) {
Roblox.BundleDetector.logToEphemeralCounter(counter.cdnPrefix + cdnProvider + "_" + fileType);
} else {
Roblox.BundleDetector.logToEphemeralCounter(counter.unknown + "_" + fileType);
}
} else if (xhr.readyState === xhr.DONE) {
Roblox.BundleDetector.logToEventStream(failedBundle, ctx, cdnProvider, xhr.status);
}
}
;
xhr.onerror = function() {
Roblox.BundleDetector.logToEphemeralCounter(counter.unknown + "_" + fileType);
Roblox.BundleDetector.logToEventStream(failedBundle, ctx, counter.unknown);
}
;
xhr.send();
} else {
this.logToEventStream(failedBundle, ctx);
}
},
reportResourceError: function(resourceName) {
var ephemeralCounterName = this.counterNames.resourceError + "_" + resourceName;
this.logToEphemeralCounter(ephemeralCounterName);
},
reportResourceLoaded: function(resourceName) {
var loadTimeInMs = this.getLoadTime();
if (loadTimeInMs) {
var sequenceName = this.counterNames.resourceLoaded + "_" + resourceName;
this.logToEphemeralStatistics(sequenceName, loadTimeInMs);
}
},
reportBundleError: function(bundleTag) {
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
this.bundlesReported[failedBundle] = true;
this.logToEphemeralCounter(ephemeralCounterName);
this.getCdnInfo(failedBundle, ctx, ctx);
var bundleName;
if (bundleTag.dataset) {
bundleName = bundleTag.dataset.bundlename;
} else {
bundleName = bundleTag.getAttribute('data-bundlename');
}
this.getCdnProviderAndReportMetrics(failedBundle, bundleName, loadStates.loadFailure, contentType);
},
bundleDetected: function(bundleName) {
this.jsBundlesLoaded[bundleName] = true;
},
verifyBundles: function(document) {
var ephemeralCounterName = this.counterNames.jsFileError
, eventContext = ephemeralCounterName;
var scripts = (document && document.scripts) || window.document.scripts;
var errorsList = [];
var bundleName;
var monitor;
for (var i = 0; i < scripts.length; i++) {
var item = scripts[i];
if (item.dataset) {
bundleName = item.dataset.bundlename;
monitor = item.dataset.monitor;
} else {
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
this.logToEphemeralCounter(ephemeralCounterName);
this.getCdnInfo(script.src, eventContext, 'js');
if (script.dataset) {
bundleName = script.dataset.bundlename;
} else {
bundleName = script.getAttribute('data-bundlename');
}
this.getCdnProviderAndReportMetrics(script.src, bundleName, loadStates.executionFailure, bundleContentTypes.javascript);
}
}
}
}
};
}
)();
window.addEventListener("load", function(evt) {
Roblox.BundleDetector.verifyBundles();
});
Roblox.BundleDetector.setTiming(window.performance.timing);
</script>
<link rel=manifest href=https://www.voidrev.us/v2/push-notifications/chrome-manifest crossorigin=use-credentials>
<link onerror=Roblox.BundleDetector&amp;&amp;Roblox.BundleDetector.reportBundleError(this) rel=stylesheet href=https://www.voidrev.us/css/leanbase.css>
<link rel=stylesheet onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-bundlename=Chat data-bundle-source=Main href=https://www.voidrev.us/css/c0da40b3a6667e911346e3adfbb541802f9883b9c3933e6110ea1160109ac987.css>
<link rel=stylesheet onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-bundlename=StyleGuide data-bundle-source=Main href="https://www.voidrev.us/css/d74f6bdd578f1c3c3cd7078f296e78c2a188a0e6722ab248f14edfe3b2339f5f.css">
<link rel=stylesheet onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-bundlename=Thumbnails data-bundle-source=Main href="https://www.voidrev.us/css/9517d686dc47015c200496d77e2b18146ee37652d18e25ecf9e1ed230310ea13.css">
<link rel=stylesheet onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-bundlename=ConfigureWebApps data-bundle-source=Main href="https://www.voidrev.us/css/08def520152a575438e73a81aa9a310c2415c327df7b624a24aa6e794d24dba3.css">
<link rel=canonical href=https://www.voidrev.us/home>
<link onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) rel=stylesheet href="https://www.voidrev.us/css/homepage.css">
<link rel=stylesheet onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-bundlename=CookieBanner data-bundle-source=Main href=https://www.voidrev.us/css/afafff83403710724c6ac194fd9932c401d8edcd4335be2c3bf35fe27a529e05.css>
<link rel=stylesheet onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-bundlename=HomeHeader data-bundle-source=Main href=https://www.voidrev.us/css/d91c25a14fbd5b468440dacf8a87e6053e18647644f134d395c7a76a29222bbb.css>
<link rel=stylesheet onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-bundlename=PeopleList data-bundle-source=Main href=https://www.voidrev.us/css/2a5e8fb167ab524b64008fcf121e842ea7fc4d1038018510a7c4e843601ccc2f.css>
<link rel=stylesheet onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-bundlename=PlacesList data-bundle-source=Main href=https://www.voidrev.us/css/a776302ffb0e79b21a885184b1cb6531efddb2da10ac094d0a02ee455cbdae21.css>
<script>
var Roblox = Roblox || {};
Roblox.EnvironmentUrls = Roblox.EnvironmentUrls || {};
Roblox.EnvironmentUrls = {
"abtestingApiSite": "https://www.voidrev.us",
"accountInformationApi": "https://www.voidrev.us",
"accountSettingsApi": "https://www.voidrev.us",
"adConfigurationApi": "https://www.voidrev.us",
"adsApi": "https://www.voidrev.us",
"apiGatewayUrl": "https://www.voidrev.us",
"apiGatewayCdnUrl": "https://www.voidrev.us",
"apiProxyUrl": "https://www.voidrev.us",
"assetDeliveryApi": "https://www.voidrev.us",
"authApi": "https://www.voidrev.us",
"avatarApi": "https://www.voidrev.us",
"badgesApi": "https://www.voidrev.us",
"billingApi": "https://www.voidrev.us",
"captchaApi": "https://www.voidrev.us",
"catalogApi": "https://www.voidrev.us",
"chatApi": "https://www.voidrev.us",
"contactsApi": "https://www.voidrev.us",
"contentStoreApi": "https://www.voidrev.us",
"developApi": "https://www.voidrev.us",
"domain": "voidrev.us",
"economyApi": "https://www.voidrev.us",
"economycreatorstatsApi": "https://www.voidrev.us",
"engagementPayoutsApi": "https://www.voidrev.us",
"followingsApi": "https://www.voidrev.us",
"friendsApi": "https://www.voidrev.us",
"gamesApi": "https://www.voidrev.us",
"gameInternationalizationApi": "https://www.voidrev.us",
"groupsApi": "https://www.voidrev.us",
"inventoryApi": "https://www.voidrev.us",
"itemConfigurationApi": "https://www.voidrev.us",
"localeApi": "https://www.voidrev.us",
"localizationTablesApi": "https://www.voidrev.us",
"metricsApi": "https://www.voidrev.us",
"midasApi": "https://www.voidrev.us",
"notificationApi": "https://www.voidrev.us",
"premiumFeaturesApi": "https://www.voidrev.us",
"presenceApi": "https://www.voidrev.us",
"publishApi": "https://www.voidrev.us",
"screenTimeApi": "https://www.voidrev.us/screen-time-api",
"thumbnailsApi": "https://www.voidrev.us",
"tradesApi": "https://www.voidrev.us",
"translationRolesApi": "https://www.voidrev.us",
"universalAppConfigurationApi": "https://www.voidrev.us/universal-app-configuration",
"usersApi": "https://www.voidrev.us",
"voiceApi": "https://www.voidrev.us",
"websiteUrl": "https://www.voidrev.us",
"privateMessagesApi": "https://www.voidrev.us",
"shareApi": "https://www.voidrev.us",
"chatModerationApi": "https://www.voidrev.us",
"userModerationApi": "https://www.voidrev.us",
"groupsModerationApi": "https://www.voidrev.us",
"twoStepVerificationApi": "https://www.voidrev.us"
};
var additionalUrls = {
amazonStoreLink: "https://www.amazon.com/Roblox-Corporation/dp/B00NUF4YOA",
amazonWebStoreLink: "https%3a%2f%2fwww.amazon.com%2froblox%3f%26_encoding%3dUTF8%26tag%3dr05d13-20%26linkCode%3dur2%26linkId%3d5562fc29c05b45562a86358c198356eb%26camp%3d1789%26creative%3d9325",
appProtocolUrl: "robloxmobile://",
appStoreLink: "https://itunes.apple.com/us/app/roblox-mobile/id431946152",
googlePlayStoreLink: "https://play.google.com/store/apps/details?id=com.roblox.client&hl=en",
iosAppStoreLink: "https://itunes.apple.com/us/app/roblox-mobile/id431946152",
windowsStoreLink: "https://www.microsoft.com/en-us/store/games/roblox/9nblgggzm6wm",
xboxStoreLink: "https://www.microsoft.com/en-us/p/roblox/bq1tn1t79v9k"
}
for (var urlName in additionalUrls) {
Roblox.EnvironmentUrls[urlName] = additionalUrls[urlName];
}
</script>
<script>
var Roblox = Roblox || {};
Roblox.GaEventSettings = {
gaDFPPreRollEnabled: "false" === "true",
gaLaunchAttemptAndLaunchSuccessEnabled: "false" === "true",
gaPerformanceEventEnabled: "false" === "true"
};
</script>
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
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=headerinit src=https://www.voidrev.us/js/7bee61aedcbb4773d878992153fa64e0.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=Polyfill data-bundle-source=Main src=https://www.voidrev.us/js/772034db167d3f4260047db4a7f2b8a58cf448709327013541e47c8962b6e556.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=XsrfProtection data-bundle-source=Main src=https://www.voidrev.us/js/d7302c509431671af3f7288fbd11d6281aec4b08026434c4ef0e0fb718900c85.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=HeaderScripts data-bundle-source=Main src=https://www.voidrev.us/js/00eb67637f410a9816d58ab5ce76f7877defb4e59dc7b6556342b1bd11104839.js></script>
<meta name=sentry-meta data-env-name=production data-dsn=https://6750adeb1b1348e4a10b13e726d5c10b@sentry.io/1539367 data-sample-rate=0.01>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=Sentry data-bundle-source=Main src=https://www.voidrev.us/js/edc66704bd1974195d8c60f4a163441bec82f1bcb11c492e7df07c43f45a4d49.js></script>
<meta name=roblox-tracer-meta-data data-access-token= data-service-name=Web data-tracer-enabled=false data-api-sites-request-allow-list=friends.voidrev.us,chat.voidrev.us,thumbnails.voidrev.us,games.voidrev.us data-sample-rate=0 data-is-instrument-page-performance-enabled=false>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=RobloxTracer data-bundle-source=Main src=https://www.voidrev.us/js/a168257175fe69cdb0762a3b8ca5d0a5fd625f77c027d5e4cef7f90a1602d704.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=RealTime data-bundle-source=Main src=https://www.voidrev.us/js/89f30f6701e04efb9dad1b1fb75ebd7cfe55257af8c8cefbd609039c4d66d8a8.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=CrossTabCommunication data-bundle-source=Main src=https://www.voidrev.us/js/948f3bfc9bbd152f537592b51c1a7765cdc0dfc538d74b7e5fc696c476c8792b.js></script>
<meta name=viewport content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
<script>
var Roblox = Roblox || {};
Roblox.AdsHelper = Roblox.AdsHelper || {};
Roblox.AdsLibrary = Roblox.AdsLibrary || {};
Roblox.AdsHelper.toggleAdsSlot = function(slotId, GPTRandomSlotIdentifier) {
var gutterAdsEnabled = false;
if (gutterAdsEnabled) {
googletag.display(GPTRandomSlotIdentifier);
return;
}
if (typeof slotId !== 'undefined' && slotId && slotId.length > 0) {
var slotElm = $("#" + slotId);
if (slotElm.is(":visible")) {
googletag.display(GPTRandomSlotIdentifier);
} else {
var adParam = Roblox.AdsLibrary.adsParameters[slotId];
if (adParam) {
adParam.template = slotElm.html();
slotElm.empty();
}
}
}
}
</script>
<!--[if lt IE 9]><script src=//oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js></script><script src=//oss.maxcdn.com/respond/1.4.2/respond.min.js></script><![endif]-->
<script>
var Roblox = Roblox || {};
(function() {
var dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
if (typeof window.external !== "undefined" && typeof window.external.msTrackingProtectionEnabled !== "undefined") {
dnt = dnt || window.external.msTrackingProtectionEnabled();
}
Roblox.browserDoNotTrack = dnt == "1" || dnt == "yes" || dnt === true;
}
)();
</script>
<script>
var _gaq = _gaq || [];
window.GoogleAnalyticsDisableRoblox2 = true;
_gaq.push(['b._setAccount', 'UA-187946414-3']);
_gaq.push(['b._setSampleRate', '10']);
_gaq.push(['b._setCampSourceKey', 'rbx_source']);
_gaq.push(['b._setCampMediumKey', 'rbx_medium']);
_gaq.push(['b._setCampContentKey', 'rbx_campaign']);
_gaq.push(['b._setDomainName', 'voidrev.us']);
_gaq.push(['b._setCustomVar', 1, 'Visitor', 'Member', 2]);
_gaq.push(['b._setPageGroup', 1, 'Home']);
_gaq.push(['b._trackPageview']);
_gaq.push(['c._setAccount', 'UA-187946414-3']);
_gaq.push(['c._setSampleRate', '1']);
_gaq.push(['c._setDomainName', 'voidrev.us']);
_gaq.push(['c._setPageGroup', 1, 'Home']);
(function() {
if (!Roblox.browserDoNotTrack) {
var ga = document.createElement('script');
ga.type = 'text/javascript';
ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);
}
}
)();
</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-0E3DVKZFR1"></script>
<script>
var accountCode = "G-0E3DVKZFR1";
var signupConversionEventKey = "wmuJCO3CZBCF7YX8Aw";
var webPurchaseConversionEventKey = "XDQ_CJme6s0BEIXthfwD";
window.dataLayer = window.dataLayer || [];
function gtag() {
dataLayer.push(arguments);
}
gtag.conversionEvents = {
signupConversionEvent: accountCode + '/' + signupConversionEventKey,
webPurchaseConversionEvent: accountCode + '/' + webPurchaseConversionEventKey
}
gtag('js', new Date());
gtag('config', accountCode);
</script>
<script>
if (Roblox && Roblox.EventStream) {
Roblox.EventStream.Init("//www.voidrev.us/www/e.png", "//www.voidrev.us/www/e.png", "//www.voidrev.us/pe?t=studio", "//www.voidrev.us/pe?t=diagnostic");
}
</script>
<script>
if (Roblox && Roblox.PageHeartbeatEvent) {
Roblox.PageHeartbeatEvent.Init([2, 8, 20, 60]);
}
</script>
<meta name=thumbnail-meta-data data-is-webapp-cache-enabled=False data-webapp-cache-expirations-timespan=00:01:00 data-request-min-cooldown=1000 data-request-max-cooldown=30000 data-request-max-retry-attempts=5 data-request-batch-size=100 data-thumbnail-metrics-sample-size=20>
<div id=Skyscraper-Abp-Left class="abp abp-container left-abp">
<iframe name=Roblox_MyHome_Left_160x600 allowtransparency=true frameborder=0 height=612 scrolling=no data-src="" src=https://www.voidrev.us/user-sponsorship/?id=1 width=160 data-js-adtype=iframead data-ad-slot=Roblox_MyHome_Left_160x600></iframe>
</div>
<div id=HomeContainer class="row home-container">
<div id=home-header class="col-xs-12 home-header-container">
<div id=home-header-shimmer class=home-header-shimmer>
<span class="placeholder shimmer shimmer-home-avatar"></span>
<span class="shimmer-lines shimmer-home-user-info">
<div class="placeholder shimmer-line"></div>
</span>
</div>
</div>
<div id=people-list-container people-list-container></div>
<div id=place-list class=place-list-container></div>
</div>
<div id=Skyscraper-Abp-Right class="abp abp-container right-abp">
<iframe name=Roblox_MyHome_Right_160x600 allowtransparency=true frameborder=0 height=612 scrolling=no data-src="" src=https://www.voidrev.us/user-sponsorship/?id=1 width=160 data-js-adtype=iframead data-ad-slot=Roblox_MyHome_Right_160x600></iframe>
</div>
</div>
</div>
<?php include ($_SERVER['DOCUMENT_ROOT'].'/chat.php'); ?>
</div>
<script>
function urchinTracker() {}
</script>
<script>
if (typeof Roblox === "undefined") {
Roblox = {};
}
if (typeof Roblox.PlaceLauncher === "undefined") {
Roblox.PlaceLauncher = {};
}
var isRobloxIconEnabledForRetheme = "True";
var robloxIcon = isRobloxIconEnabledForRetheme === 'True' ? "<span class='icon-logo-r-95'></span>" : "<img src='https://www.voidrev.us/img/6304dfebadecbb3b338a79a6a528936c.svg.gzip' width='90' height='90' alt='R'/>";
Roblox.PlaceLauncher.Resources = {
RefactorEnabled: "True",
IsProtocolHandlerBaseUrlParamEnabled: "False",
ProtocolHandlerAreYouInstalled: {
play: {
content: robloxIcon + "<p>You&#39;re moments away from getting into the game!</p>",
buttonText: "Download and Install Roblox",
footerContent: "<a href='https://www.voidrev.us/game/help'class= 'text-name small' target='_blank' >Click here for help</a> "
},
studio: {
content: "<img src='https://www.voidrev.us/img/f25e4cadae29ae9a57a962126b2d2e2a.png' width='95' height='95' alt='R' /><p>Get started creating your own games!</p>",
buttonText: "Download Studio"
}
},
ProtocolHandlerStartingDialog: {
play: {
content: robloxIcon + "<p>Roblox is now loading. Get ready to play!</p>"
},
studio: {
content: "<img src='https://www.voidrev.us/img/f25e4cadae29ae9a57a962126b2d2e2a.png' width='95' height='95' alt='R' /><p>Checking for Roblox Studio...</p>"
},
loader: "<span class='spinner spinner-default'></span>"
}
};
</script>
<div id=PlaceLauncherStatusPanel style=display:none;width:300px data-new-plugin-events-enabled=True data-event-stream-for-plugin-enabled=True data-event-stream-for-protocol-enabled=True data-is-game-launch-interface-enabled=True data-is-protocol-handler-launch-enabled=True data-is-user-logged-in=True data-os-name=Windows data-protocol-name-for-client=limb20-player data-protocol-name-for-studio=limb20-studio data-protocol-roblox-locale=en_us data-protocol-game-locale=en_us data-protocol-url-includes-launchtime=true data-protocol-detection-enabled=true data-protocol-separate-script-parameters-enabled=true data-protocol-avatar-parameter-enabled=true data-protocol-channel-name=LIVE data-protocol-studio-channel-name=LIVE data-protocol-player-channel-name=LIVE>
<div class="modalPopup blueAndWhite PlaceLauncherModal" style=min-height:160px>
<div id=Spinner class=Spinner style="padding:20px 0">
<img data-delaysrc=https://www.voidrev.us/img/e998fb4c03e8c2e30792f2f3436e9416.gif height=32 width=32 alt=Progress>
</div>
<div id=status style="min-height:40px;text-align:center;margin:5px 20px">
<div id=Starting class="PlaceLauncherStatus MadStatusStarting" style=display:block>Starting Roblox...</div>
<div id=Waiting class="PlaceLauncherStatus MadStatusField">Connecting to Players...</div>
<div id=StatusBackBuffer class="PlaceLauncherStatus PlaceLauncherStatusBackBuffer MadStatusBackBuffer"></div>
</div>
<div style=text-align:center;margin-top:1em>
<input type=button class="Button CancelPlaceLauncherButton translate" value=Cancel>
</div>
</div>
</div>
<div id=ProtocolHandlerClickAlwaysAllowed class=ph-clickalwaysallowed style=display:none>
<p class=larger-font-size>
<span class=icon-moreinfo></span>
Check <strong>Always open links for URL: Roblox Protocol</strong>
and click <strong>Open URL: Roblox Protocol</strong>
in the dialog box above to join games faster in the future!
</div>
<script>
function checkRobloxInstall() {
return RobloxLaunch.CheckRobloxInstall('https://www.voidrev.us/Download');
}
</script>
<div id=InstallationInstructions style=display:none>
<div class=ph-installinstructions>
<div class=ph-modal-header>
<span class="icon-close simplemodal-close"></span>
<h3 class=title>Thanks for playing Roblox</h3>
</div>
<div class=modal-content-container>
<div class=ph-installinstructions-body>
<ul class=modal-col-4>
<li class=step1-of-4>
<h2>1</h2>
<p class=larger-font-size>
Click <strong>RobloxPlayer.exe</strong>
to run the Roblox installer, which just downloaded via your web browser.
</p>
<img data-delaysrc=https://www.voidrev.us/img/28eaa93b899b93461399aebf21c5346f.png>
<li class=step2-of-4>
<h2>2</h2>
<p class=larger-font-size>
Click <strong>Run</strong>
when prompted by your computer to begin the installation process.
</p>
<img data-delaysrc=https://www.voidrev.us/img/51328932dedb5d8d61107272cc1a27db.png>
<li class=step3-of-4>
<h2>3</h2>
<p class=larger-font-size>
Click <strong>Ok</strong>
once you've successfully installed Roblox.
</p>
<img data-delaysrc=https://www.voidrev.us/img/3797745629baca2d1b9496b76bc9e6dc.png>
<li class=step4-of-4>
<h2>4</h2>
<p class=larger-font-size>
After installation, click <strong>Play</strong>
below to join the action!
<div class="VisitButton VisitButtonContinueGLI">
<a class="btn btn-primary-lg disabled btn-full-width">Play</a>
</div>
</ul>
</div>
</div>
<div class=xsmall>
The Roblox installer should download shortly. If it doesn’t, start the <a id=GameLaunchManualInstallLink href=# class=text-link>download now.</a>
<script>
if (Roblox.ProtocolHandlerClientInterface && typeof Roblox.ProtocolHandlerClientInterface.attachManualDownloadToLink === 'function') {
Roblox.ProtocolHandlerClientInterface.attachManualDownloadToLink();
}
</script>
</div>
</div>
</div>
<div class=InstallInstructionsImage data-modalwidth=970 style=display:none></div>
<div id=pluginObjDiv style=height:1px;width:1px;visibility:hidden;position:absolute;top:0></div>
<iframe id=downloadInstallerIFrame name=downloadInstallerIFrame style=visibility:hidden;height:0;width:1px;position:absolute></iframe>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=clientinstaller src=https://www.voidrev.us/js/459f4d69b0709806c7ee83714896739e.js></script>
<script>
Roblox.Client._skip = null;
Roblox.Client._CLSID = '76D50904-6780-4c8b-8986-1A7EE0B1716D';
Roblox.Client._installHost = 'setup.voidrev.us';
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
}
;GoogleAnalyticsEvents.FireEvent(['Plugin Location', 'Launch Attempt', isInsideRobloxIDE]);
GoogleAnalyticsEvents.FireEvent(['Plugin', 'Launch Attempt', 'Play']);
EventTracker.fireEvent('GameLaunchAttempt_Win32', 'GameLaunchAttempt_Win32_Plugin');
if (typeof Roblox.GamePlayEvents != 'undefined') {
Roblox.GamePlayEvents.SendClientStartAttempt(null, play_placeId);
}
}
;
Roblox.Client.ResumeTimer(eval(continuation));
}
</script>
<div class="ConfirmationModal modalPopup unifiedModal smallModal" data-modal-handle=confirmation style=display:none>
<a class="genericmodal-close ImageButton closeBtnCircle_20h"></a>
<div class=Title></div>
<div class=GenericModalBody>
<div class=TopBody>
<div class="ImageContainer roblox-item-image" data-image-size=small data-no-overlays data-no-click>
<img class=GenericModalImage alt="generic image">
</div>
<div class=Message></div>
</div>
<div class="ConfirmationModalButtonContainer GenericModalButtonContainer">
<a href="" id=roblox-confirm-btn>
<span></span>
</a>
<a href="" id=roblox-decline-btn>
<span></span>
</a>
</div>
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
<div class=modal-header>
<button type=button class=close data-dismiss=modal>
<span aria-hidden=true>
<span class=icon-close></span>
</span>
<span class=sr-only>Close</span>
</button>
<h5 class=modal-title></h5>
</div>
<div class=modal-body>
<div class=modal-top-body>
<div class=modal-message></div>
<div class="modal-image-container roblox-item-image" data-image-size=medium data-no-overlays data-no-click>
<img class=modal-thumb alt="generic image">
</div>
<div class="modal-checkbox checkbox">
<input id=modal-checkbox-input type=checkbox>
<label for=modal-checkbox-input></label>
</div>
</div>
<div class=modal-btns>
<a href="" id=confirm-btn>
<span></span>
</a>
<a href="" id=decline-btn>
<span></span>
</a>
</div>
<div class="loading modal-processing">
<img class=loading-default src=https://www.voidrev.us/img/4bed93c91f909002b1f17f05c0ce13d1.gif alt=Processing...>
</div>
</div>
<div class="modal-footer text-footer"></div>
</div>
</div>
</div>
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
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=intl-polyfill src=https://www.voidrev.us/js/d44520f7da5ec476cfb1704d91bab327.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=InternationalCore data-bundle-source=Main src=https://www.voidrev.us/js/ff3308aa2e909de0f9fcd5da7b529db247f69fe9b4072cbbc267749800a4d9e6.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=TranslationResources data-bundle-source=Main src=https://www.voidrev.us/js/83d836a661ff433d5b7ce719c489e43af590ff75ab39ccc6d393546fe91b766a.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=leanbase src=https://www.voidrev.us/js/5d2129a8cdfe5615d4521574f8e5566b.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=CoreUtilities data-bundle-source=Main src=https://www.voidrev.us/js/77b287b0240b2b259f0d7757a50850f45a49208c30f83cddab22971156acc1af.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=CoreRobloxUtilities data-bundle-source=Main src=https://www.voidrev.us/js/2395a82cf4a3104752445a3d2f02f8a789a51f495228ef7a9d63e70a4c68743f.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=React data-bundle-source=Main src=https://www.voidrev.us/js/6beb1c5bcec1a4449303da9e523d45a1aa1652f9b42ae6c8a3ac347955ca3b3f.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=ReactUtilities data-bundle-source=Main src=https://www.voidrev.us/js/898cb6e9c467d15ad80a67d019f3815d35dbc6ff60c12ef7dd928e8fbaf02b0b.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=ReactStyleGuide data-bundle-source=Main src=https://www.voidrev.us/js/692dc29d28a6ea4673ab2bb8bb63a8c71904bba8a596cf3a5c46d3aa278cb33e.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=ConfigureWebApps data-bundle-source=Main src=https://www.voidrev.us/js/c756de2b0f5f2f05d62899a3b602b4a3b573ad3faa1adea789291ebe9c66a002.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=angular src=https://www.voidrev.us/js/ae3d621886e736e52c97008e085fa286.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=AngularJsUtilities data-bundle-source=Main src=https://www.voidrev.us/js/81164cee2ed2b07903bf00968368213664e0e78bdbdf9418389c2d2a8512cccf.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=InternationalAngularJs data-bundle-source=Main src=https://www.voidrev.us/js/90f18784a43a70553e967191b948f70b0193df565f1605762c3c1e245ab4b55a.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=Thumbnails data-bundle-source=Main src=https://www.voidrev.us/js/c0535341624250bd7bf1a92405b33cc4177f493e69113a4f0cc151d629b4e7db.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=PresenceStatus data-bundle-source=Main src=https://www.voidrev.us/js/8c50632c6b51d45c814a976484564e622f462db77adfcf3c1e3c21f9a9f1722f.js></script>
<div id=presence-registration-bootstrap-data data-is-enabled=True data-interval=15000></div>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=PresenceRegistration data-bundle-source=Main src=https://www.voidrev.us/js/0a83202cf5f2310227e607928f73a26cdaa7d5c27f892b99ef51ec3b863a694d.js></script>
<div ng-modules=baseTemplateApp>
<script src=https://www.voidrev.us/js/ffcc04436179c6b2a6668fdfcfbf62b1.js></script>
</div>
<div ng-modules=pageTemplateApp>
<script>
"use strict";
angular.module("pageTemplateApp", []).run(['$templateCache', function($templateCache) {}
]);
</script>
</div>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=Navigation data-bundle-source=Main src=https://www.voidrev.us/js/236b3698591c71c7ae9c569552531be26883357df865c344d1b69465df973b95.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=DynamicLocalizationResourceScript_CommonUI.Features data-bundle-source=Unknown src=https://www.voidrev.us/js/4bb2dffd64e01d8988ad686be333ba5f5f90e1418cac2376682144ce1468a761.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=DynamicLocalizationResourceScript_CommonUI.Features data-bundle-source=Unknown src=https://www.voidrev.us/js/a06c5a4339ff294e781385a08cc94258e70c7bfd957f60e1071b70b4b1a2c705.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=DynamicLocalizationResourceScript_Feature.ShopDialog data-bundle-source=Unknown src=https://www.voidrev.us/js/c0606e8d6eb4487cdc70d318e6de3d9aaeeb465ddb84acd95139011e56c5e5c6.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=DynamicLocalizationResourceScript_Feature.ShopDialog data-bundle-source=Unknown src=https://www.voidrev.us/js/95fdafe5af749e388de603b9ee7f67bb092c3c790badc572db4e2bca0c32b49a.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=DynamicLocalizationResourceScript_Common.AlertsAndOptions data-bundle-source=Unknown src=https://www.voidrev.us/js/fc85dab426a5d0b297ee2c4ffea3b9fc0da58d596ba2ab8088ef1965165e1452.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=DynamicLocalizationResourceScript_Common.AlertsAndOptions data-bundle-source=Unknown src=https://www.voidrev.us/js/d738bab70efd248abb4f5265af58db70b441d772281ee4d904daeeb9047b4f24.js></script>
<script>
Roblox.config.externalResources = [];
Roblox.config.paths['Pages.Catalog'] = 'https://www.voidrev.us/js/0d2759e7f03a464f0b8c0909a28405c5.js';
Roblox.config.paths['Pages.CatalogShared'] = 'https://www.voidrev.us/js/1b451357891fcc5351b20d20504aa8ad.js';
Roblox.config.paths['Widgets.AvatarImage'] = 'https://www.voidrev.us/js/7d49ac94271bd506077acc9d0130eebb.js';
Roblox.config.paths['Widgets.DropdownMenu'] = 'https://www.voidrev.us/js/da553e6b77b3d79bec37441b5fb317e7.js';
Roblox.config.paths['Widgets.GroupImage'] = 'https://www.voidrev.us/js/8ad41e45c4ac81f7d8c44ec542a2da0a.js';
Roblox.config.paths['Widgets.HierarchicalDropdown'] = 'https://www.voidrev.us/js/4a0af9989732810851e9e12809aeb8ad.js';
Roblox.config.paths['Widgets.ItemImage'] = 'https://www.voidrev.us/js/61a0490ba23afa17f9ecca2a079a6a57.js';
Roblox.config.paths['Widgets.PlaceImage'] = 'https://www.voidrev.us/js/a6df74a754523e097cab747621643c98.js';
</script>
<script>
$(function() {
Roblox.DeveloperConsoleWarning.showWarning();
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
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=page src=https://www.voidrev.us/js/9f39cc574de0855309f6bed3deffeab6.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=StyleGuide data-bundle-source=Main src=https://www.voidrev.us/js/1956289144ebcdc258fa628e1a176da380030873b59f46ec732b77acd62a923a.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=CookieBanner data-bundle-source=Main src=https://www.voidrev.us/js/808c05e4ae8e78ffbbd49630600fc2ae3c993662e0802b3c4206b4a807653957.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=HomeHeader data-bundle-source=Main src=https://www.voidrev.us/js/1225202c4ed5ade0d2f111eb38f9064421d3536d58e87db24453983005f8bc7a.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=PeopleList data-bundle-source=Main src=https://www.voidrev.us/js/7e0c4ef4862d9d43162934cbd3e152a15f5c3f9aa27d9dfe229f3759b068fe2d.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=DynamicLocalizationResourceScript_Feature.PeopleList data-bundle-source=Unknown src=https://www.voidrev.us/js/a4e252ce8ed74f18c36b209d2fe7441fe556e935a55a1e5f8810ee678ebe949e.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=DynamicLocalizationResourceScript_Feature.PeopleList data-bundle-source=Unknown src=https://www.voidrev.us/js/a48887a0ff5d6bc010ba0cd376db5d351762b3cf0be25210d495759d49da69c1.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=PlacesList data-bundle-source=Main src=https://www.voidrev.us/js/9862e558dd61e7243a2de26be40f61b632090d5bc693bb39f827f86d19cd3fdf.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=DynamicLocalizationResourceScript_Feature.PlacesList data-bundle-source=Unknown src=https://www.voidrev.us/js/4460cc8664584cde75338fe6a69a12e9bd31855f8e376f2f76abb656052239be.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=DynamicLocalizationResourceScript_Feature.PlacesList data-bundle-source=Unknown src=https://www.voidrev.us/js/bd0b26ba97922424f9df38b5099626f5fd40d0690ebbec32061424c9e881d621.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=Contacts data-bundle-source=Main src=https://www.voidrev.us/js/bf0096e2c114d7b0ba5dbbc43ddd867fa587d1373b6ea4fd2e99ce7afb4ef8de.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=Chat data-bundle-source=Main src=https://js.rbxcdn.com/39a1587966c7f3abd0e3b32bbda3b0f34f350fa42d3daf7d8995f32a5d856ffc.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=DynamicLocalizationResourceScript_Feature.Chat data-bundle-source=Unknown src=https://www.voidrev.us/js/f52cc1c95e2d3f51d346b604707e44753370802f987f173876f166eea637e2b5.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=DynamicLocalizationResourceScript_Feature.Chat data-bundle-source=Unknown src=https://www.voidrev.us/js/3a5b0cae308a98054f28e17a84742149e550f1a43c1f70beae276ebb3cf9ebc8.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=ItemPurchase data-bundle-source=Main src=https://www.voidrev.us/js/bf6ae6dfa7d79f9ffe1a0c1b3a22c25707722264d9afdd2fae5cc3e7f51e5d70.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=DynamicLocalizationResourceScript_Purchasing.PurchaseDialog data-bundle-source=Unknown src=https://www.voidrev.us/js/340d44394b60c8515222c5c59cc49768ee9f39fc945ae0ec5af5fcda315a7895.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=DynamicLocalizationResourceScript_Purchasing.PurchaseDialog data-bundle-source=Unknown src=https://www.voidrev.us/js/f0476b726a60ecc3fe0ff22f27c24655f0fe52aa8980de7608910ee861a1d2bd.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=GameLaunch data-bundle-source=Main src=https://www.voidrev.us/js/a3fc80c787f0822b886d63e5b8c4133db024b621c430c0c27d630c5ac34da3fd.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=DynamicLocalizationResourceScript_Feature.GameLaunchGuestMode data-bundle-source=Unknown src=https://www.voidrev.us/js/b6f7e0e090bb44e092c19eb7e714473be92bd8b26eb53b693e03179658950b69.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=DynamicLocalizationResourceScript_Feature.GameLaunchGuestMode data-bundle-source=Unknown src=https://www.voidrev.us/js/75d691f0d9840862e1341c56663ab6a620bed97a721809dce6ef85c68b3b0c5b.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=DynamicLocalizationResourceScript_Common.VisitGame data-bundle-source=Unknown src=https://www.voidrev.us/js/8970b46e46bddd4380edbc66639b5b333720b2633a9105d4cde2c31ba2878d97.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=DynamicLocalizationResourceScript_Common.VisitGame data-bundle-source=Unknown src=https://www.voidrev.us/js/0ea369a7496bf1e32d7a3834a06b42b1eeea4720c6a4b5fd719792d082eba641.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=serviceworkerregistrar src=https://www.voidrev.us/js/d5b67abc659e3430838dada0f185cb62.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=pushnotifications src=https://www.voidrev.us/js/b8bf1b02993521c61489cb2f1c4fb676.js></script>
<div id=push-notification-registrar-settings data-notificationshost=https://notifications.voidrev.us data-reregistrationinterval=0 data-registrationpath=register-chrome data-shoulddeliveryendpointbesentduringregistration=False data-platformtype=ChromeOnDesktop></div>
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
<button type="button" class="btn-min-width btn-growth-xs push-notifications-prompt-accept">Notify Me</button>
<span class="icon-close push-notifications-dismiss-prompt"></span>
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
<img width="380" height="250" src="https://www.voidrev.us/img/Notifications/push-permission-prompt-chrome-windows-20160701.png" />
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
<div id=cookieConsentModalOverlay class="cookie-modal-overlay modal-backdrop in"></div>
<div id=cookieConsentModalWrapper class="cookie-modal-wrapper modal-dialog">
<div id=cookieConsentModal class="modal-content cookie-modal desktop">
<div class="modal-header cookie-modal-title">
<button type=button class=close>
<span aria-hidden=true>
<span class=icon-close></span>
</span>
<span class=sr-only></span>
</button>
<h4>Manage Cookies</h4>
</div>
<div class="cookie-modal-content modal-body">
<div class=cookie-modal-description>
Please choose whether this site may use cookies as described below. You can learn more about how this site uses cookies and related technologies by reading our <a id=cookie-link-privacy class="cookie-link-privacy text-name" href=https://www.voidrev.us/info/privacy>privacy policy</a>
.
</div>
<div class="modal-checkbox checkbox cookie-checkbox">
<input id=cookie-checkbox-essential type=checkbox disabled checked>
<label for=cookie-checkbox-essential class=cookie-checkbox-label>Essential Cookies </label>
</div>
<div class=cookie-modal-padding>These cookies are required to provide the functionality on the site, such as for user authentication, securing the system or saving cookie preferences.</div>
<ul class="cookie-modal-padding cookie-modal-list">
<li>Roblox
<li>Zendesk
<li>Gigya
</ul>
<div class="modal-checkbox checkbox cookie-checkbox">
<input id=cookie-checkbox-tracking type=checkbox>
<label for=cookie-checkbox-tracking class=cookie-checkbox-label>Analytics Cookies </label>
</div>
<div class=cookie-modal-padding>These cookies used for improving site performance or understanding site usage.</div>
<ul class="cookie-modal-padding cookie-modal-list">
<li>Google Analytics
<li>Google Universal Analytics
</ul>
</div>
<button id=cookie-btn-allow class="btn-secondary-md cookie-btn-allow">Allow </button>
</div>
</div>
<div id=cookie-banner-wrapper class="cookie-banner-wrapper desktop">
<div class="alert-info cookie-banner">
<div class=banner-item>
Roblox uses cookies to personalize content, provide social media features and analyze the traffic on our site. To learn about how we use cookies and how you can <a id=cookie-link-manage href=# class="cookie-link-manage text-name">manage cookie preferences</a>
, please refer to our <a class=text-name href=https://www.voidrev.us/info/privacy>Privacy and Cookie Policy</a>
.
</div>
<div class="banner-item accept-btn">
<button type=button id=CookieLawAccept class="btn-secondary-sm cookie-law-accept-btn">Accept </button>
</div>
</div>
</div>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=pageEnd src=https://www.voidrev.us/js/67fe0ec7922443394bee772ff0721c13.js></script>
<script onerror=Roblox.BundleDetector&&Roblox.BundleDetector.reportBundleError(this) data-monitor=true data-bundlename=LatencyMeasurement data-bundle-source=Main src=https://www.voidrev.us/js/90bb51db086699ec26a6c9df04087678948883f8c3ddd1037c7223a20ff4fe90.js></script>
