<?php
include ($_SERVER['DOCUMENT_ROOT'].'/global.php');
header('Access-Control-Allow-Origin: https://rum-collector-2.pingdom.net');
if(!$_GET['tab']){
header("Location: ?tab=packages");
}
if($usr['R15'] == 1){
$r15 = true;
}else{
$r15 = false;
}
$brickcolors = [
1 => [242, 243, 243],
2 => [161, 165, 162],
3 => [249, 233, 153],
5 => [215, 197, 154],
6 => [194, 218, 184],
9 => [232, 186, 200],
11 => [128, 187, 219],
12 => [203, 132, 66],
18 => [204, 142, 105],
21 => [196, 40, 28],
22 => [196, 112, 160],
23 => [13, 105, 172],
24 => [245, 205, 48],
25 => [98, 71, 50],
26 => [27, 42, 53],
27 => [109, 110, 108],
28 => [40, 127, 71],
29 => [161, 196, 140],
36 => [243, 207, 155],
37 => [75, 151, 75],
38 => [160, 95, 53],
39 => [193, 202, 222],
40 => [236, 236, 236],
41 => [205, 84, 75],
42 => [193, 223, 240],
43 => [123, 182, 232],
44 => [247, 241, 141],
45 => [180, 210, 228],
47 => [217, 133, 108],
48 => [132, 182, 141],
49 => [248, 241, 132],
50 => [236, 232, 222],
100 => [238, 196, 182],
101 => [218, 134, 122],
102 => [110, 153, 202],
103 => [199, 193, 183],
104 => [107, 50, 124],
105 => [226, 155, 64],
106 => [218, 133, 65],
107 => [0, 143, 156],
108 => [104, 92, 67],
110 => [67, 84, 147],
111 => [191, 183, 177],
112 => [104, 116, 172],
113 => [229, 173, 200],
115 => [199, 210, 60],
116 => [85, 165, 175],
118 => [183, 215, 213],
119 => [164, 189, 71],
120 => [217, 228, 167],
121 => [231, 172, 88],
123 => [211, 111, 76],
124 => [146, 57, 120],
125 => [234, 184, 146],
126 => [165, 165, 203],
127 => [220, 188, 129],
128 => [174, 122, 89],
131 => [156, 163, 168],
133 => [213, 115, 61],
134 => [216, 221, 86],
135 => [116, 134, 157],
136 => [135, 124, 144],
137 => [224, 152, 100],
138 => [149, 138, 115],
140 => [32, 58, 86],
141 => [39, 70, 45],
143 => [207, 226, 247],
145 => [121, 136, 161],
146 => [149, 142, 163],
147 => [147, 135, 103],
148 => [87, 88, 87],
149 => [22, 29, 50],
150 => [171, 173, 172],
151 => [120, 144, 130],
153 => [149, 121, 119],
154 => [123, 46, 47],
157 => [255, 246, 123],
158 => [225, 164, 194],
168 => [117, 108, 98],
176 => [151, 105, 91],
178 => [180, 132, 85],
179 => [137, 135, 136],
180 => [215, 169, 75],
190 => [249, 214, 46],
191 => [232, 171, 45],
192 => [105, 64, 40],
193 => [207, 96, 36],
194 => [163, 162, 165],
195 => [70, 103, 164],
196 => [35, 71, 139],
198 => [142, 66, 133],
199 => [99, 95, 98],
200 => [130, 138, 93],
208 => [229, 228, 223],
209 => [176, 142, 68],
210 => [112, 149, 120],
211 => [121, 181, 181],
212 => [159, 195, 233],
213 => [108, 129, 183],
216 => [144, 76, 42],
217 => [124, 92, 70],
218 => [150, 112, 159],
219 => [107, 98, 155],
220 => [167, 169, 206],
221 => [205, 98, 152],
222 => [228, 173, 200],
223 => [220, 144, 149],
224 => [240, 213, 160],
225 => [235, 184, 127],
226 => [253, 234, 141],
232 => [125, 187, 221],
268 => [52, 43, 117],
301 => [80, 109, 84],
302 => [91, 93, 105],
303 => [0, 16, 176],
304 => [44, 101, 29],
305 => [82, 124, 174],
306 => [51, 88, 130],
307 => [16, 42, 220],
308 => [61, 21, 133],
309 => [52, 142, 64],
310 => [91, 154, 76],
311 => [159, 161, 172],
312 => [89, 34, 89],
313 => [31, 128, 29],
314 => [159, 173, 192],
315 => [9, 137, 207],
316 => [123, 0, 123],
317 => [124, 156, 107],
318 => [138, 171, 133],
319 => [185, 196, 177],
320 => [202, 203, 209],
321 => [167, 94, 155],
322 => [123, 47, 123],
323 => [148, 190, 129],
324 => [168, 189, 153],
325 => [223, 223, 222],
327 => [151, 0, 0],
328 => [177, 229, 166],
329 => [152, 194, 219],
330 => [255, 152, 220],
331 => [255, 89, 89],
332 => [117, 0, 0],
333 => [239, 184, 56],
334 => [248, 217, 109],
335 => [231, 231, 236],
336 => [199, 212, 228],
337 => [255, 148, 148],
338 => [190, 104, 98],
339 => [86, 36, 36],
340 => [241, 231, 199],
341 => [254, 243, 187],
342 => [224, 178, 208],
343 => [212, 144, 189],
344 => [150, 85, 85],
345 => [143, 76, 42],
346 => [211, 190, 150],
347 => [226, 220, 188],
348 => [237, 234, 234],
349 => [233, 218, 218],
350 => [136, 62, 62],
351 => [188, 155, 93],
352 => [199, 172, 120],
353 => [202, 191, 163],
354 => [187, 179, 178],
355 => [108, 88, 75],
356 => [160, 132, 79],
357 => [149, 137, 136],
358 => [171, 168, 158],
359 => [175, 148, 131],
360 => [150, 103, 102],
361 => [86, 66, 54],
362 => [126, 104, 63],
363 => [105, 102, 92],
364 => [90, 76, 66],
365 => [106, 57, 9],
1001 => [248, 248, 248],
1002 => [205, 205, 205],
1003 => [17, 17, 17],
1004 => [255, 0, 0],
1005 => [255, 176, 0],
1006 => [180, 128, 255],
1007 => [163, 75, 75],
1008 => [193, 190, 66],
1009 => [255, 255, 0],
1010 => [0, 0, 255],
1011 => [0, 32, 96],
1012 => [33, 84, 185],
1013 => [4, 175, 236],
1014 => [170, 85, 0],
1015 => [170, 0, 170],
1016 => [255, 102, 204],
1017 => [255, 175, 0],
1018 => [18, 238, 212],
1019 => [0, 255, 255],
1020 => [0, 255, 0],
1021 => [58, 125, 21],
1022 => [127, 142, 100],
1023 => [140, 91, 159],
1024 => [175, 221, 255],
1025 => [255, 201, 201],
1026 => [177, 167, 255],
1027 => [159, 243, 233],
1028 => [204, 255, 204],
1029 => [255, 255, 204],
1030 => [255, 204, 153],
1031 => [98, 37, 209],
1032 => [255, 0, 191]
];
$headRGB = implode(', ', $brickcolors[$usr['HeadColor']]);
$torsoRGB = implode(', ', $brickcolors[$usr['TorsoColor']]);
$leftArmRGB = implode(', ', $brickcolors[$usr['LeftArmColor']]);
$rightArmRGB = implode(', ', $brickcolors[$usr['RightArmColor']]);
$leftLegRGB = implode(', ', $brickcolors[$usr['LeftLegColor']]);
$rightLegRGB = implode(', ', $brickcolors[$usr['RightLegColor']]);
?>
<!DOCTYPE html>
<html xmlns:fb="https://www.facebook.com/2008/fbml">
<!-- MachineID: WEB888 -->
<head id="ctl00_ctl00_Head1" data-machine-id="WEB888"><title>
Avatar - Void
</title>
<link rel='stylesheet' href='https://www.voidrev.us/css/MainCSS.css' />
<link rel='stylesheet' href='https://www.voidrev.us/css/charpage.css' />
<script type='text/javascript' src='//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.1.min.js'></script>
<script type='text/javascript'>window.jQuery || document.write("<script type='text/javascript' src='/js/jquery/jquery-1.11.1.js'><\/script>")</script>
<script type='text/javascript' src='//ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.2.1.min.js'></script>
<script type='text/javascript'>window.jQuery || document.write("<script type='text/javascript' src='/js/jquery/jquery-migrate-1.2.1.js'><\/script>")</script>
<script type="text/javascript">
function wear(value) {
$.ajax({
url: "wear.php?id=" + value,
success: function() {
document.location.reload();
},
error: function() {
alert("An error occurred while updating your avatar.");
}
});
}
</script>
<script type="text/javascript">
function unwear(value) {
$.ajax({
url: "unwear.php?id=" + value,
success: function() {
document.location.reload();
},
error: function() {
alert("An error occurred while updating your avatar.");
}
});
}
</script>
<script type="text/javascript">
function rightlegcolorset(value) {
$.ajax({
url: "bodyset.php?part=rightleg&id=" + value,
success: function() {
document.location.reload();
},
error: function() {
alert("An error occurred while setting the right leg color.");
}
});
}
</script>
<script type="text/javascript">
function leftlegcolorset(value) {
$.ajax({
url: "bodyset.php?part=leftleg&id=" + value,
success: function() {
document.location.reload();
},
error: function() {
alert("An error occurred while setting the left leg color.");
}
});
}
</script>
<script type="text/javascript">
function leftarmcolorset(value) {
$.ajax({
url: "bodyset.php?part=leftarm&id=" + value,
success: function() {
document.location.reload();
},
error: function() {
alert("An error occurred while setting the left arm color.");
}
});
}
</script>
<script type="text/javascript">
function rightarmcolorset(value) {
$.ajax({
url: "bodyset.php?part=rightarm&id=" + value,
success: function() {
document.location.reload();
},
error: function() {
alert("An error occurred while setting the right arm color.");
}
});
}
</script>
<script type="text/javascript">
function torsocolorset(value) {
$.ajax({
url: "bodyset.php?part=torso&id=" + value,
success: function() {
document.location.reload();
},
error: function() {
alert("An error occurred while setting the torso color.");
}
});
}
</script>
<script type="text/javascript">
function headcolorset(value) {
$.ajax({
url: "bodyset.php?part=head&id=" + value,
success: function() {
document.location.reload();
},
error: function() {
alert("An error occurred while setting the head color.");
}
});
}
</script>
<script>
$(function() {
$('.r15:not(:checked)').on('change', function() {
$.ajax({
url: "r15.php?r15=true",
success: function() {
document.location.reload();
},
error: function() {
alert("An error occurred while toggling R15.");
}
});
return false;
});
});
</script>
<script>
$(function() {
$('.r6:not(:checked)').on('change', function() {
$.ajax({
url: "r15.php?r15=false",
success: function() {
// Reload the page after the API request completes successfully
document.location.reload();
},
error: function() {
// Handle any errors that occur during the API request
alert("An error occurred while toggling R6.");
}
});
return false;
});
});
</script>
<script type="text/javascript">
var _gaq = _gaq || [];
window.GoogleAnalyticsDisableRoblox2 = true;
_gaq.push(['b._setAccount', 'UA-486632-1']);
_gaq.push(['b._setCampSourceKey', 'rbx_source']);
_gaq.push(['b._setCampMediumKey', 'rbx_medium']);
_gaq.push(['b._setCampContentKey', 'rbx_campaign']);
_gaq.push(['b._setDomainName', 'voidrev.us']);
_gaq.push(['b._setCustomVar', 1, 'Visitor', 'Member', 2]);
_gaq.push(['b._setPageGroup', 1, 'Avatar']);
_gaq.push(['b._trackPageview']);
_gaq.push(['c._setAccount', 'UA-26810151-2']);
_gaq.push(['c._setDomainName', 'voidrev.us']);
_gaq.push(['c._setPageGroup', 1, 'Avatar']);
(function () {
var ga = document.createElement('script');
ga.type = 'text/javascript';
ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);
})();
</script>
<script type="text/javascript">
var _prum = [['id', ''],
['mark', 'firstbyte', (new Date()).getTime()]];
(function() {
var s = document.getElementsByTagName('script')[0]
, p = document.createElement('script');
p.async = 'async';
p.src = '//rum-static.pingdom.net/prum.min.js';
s.parentNode.insertBefore(p, s);
})();
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
</script><script type='text/javascript' src='https://www.voidrev.us/js/418d9bd47f25fef3d24c8f3041d198ac.js'></script>
<script type='text/javascript' src='https://www.voidrev.us/js/571bd24f97e0e4bfc0128b512ad64148.js'></script>
<script type='text/javascript' src='https://www.voidrev.us/js/6d718ad1e2d5e730e708ab154ee2adaf.js'></script>
<script type='text/javascript' src='https://www.voidrev.us/js/b73a92301c5dc9fdb539d019d473b510.js'></script>
<script type='text/javascript' src='https://www.voidrev.us/js/86c18dd4f5cfda07265a054c73db73f2.js'></script>
<link rel="canonical" href="https://www.voidrev.us/my/character.aspx" />
<script type="text/javascript">
if (typeof(Roblox) === "undefined") { Roblox = {}; }
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
Roblox.Endpoints.Urls['/game/get-hash'] = 'https://www.voidrev.us/game/get-hash';
Roblox.Endpoints.Urls['/game/placelauncher.ashx'] = 'https://www.voidrev.us/game/placelauncher.ashx';
Roblox.Endpoints.Urls['/game/preloader'] = 'https://www.voidrev.us/game/preloader';
Roblox.Endpoints.Urls['/game/report-stats'] = 'https://www.voidrev.us/game/report-stats';
Roblox.Endpoints.Urls['/game/report-event'] = 'https://www.voidrev.us/game/report-event';
Roblox.Endpoints.Urls['/game/updateprerollcount'] = 'https://www.voidrev.us/game/updateprerollcount';
Roblox.Endpoints.Urls['/login/default.aspx'] = 'https://www.voidrev.us/login/default.aspx';
Roblox.Endpoints.Urls['/my/character.aspx'] = 'https://www.voidrev.us/my/character.aspx';
Roblox.Endpoints.Urls['/my/money.aspx'] = 'https://www.voidrev.us/my/money.aspx';
Roblox.Endpoints.Urls['/navigation/userdata'] = 'https://www.voidrev.us/navigation/userdata';
Roblox.Endpoints.Urls['/chat/chat'] = 'https://www.voidrev.us/chat/chat';
Roblox.Endpoints.Urls['/chat/data'] = 'https://www.voidrev.us/chat/data';
Roblox.Endpoints.Urls['/presence/users'] = 'https://www.voidrev.us/presence/users';
Roblox.Endpoints.Urls['/presence/user'] = 'https://www.voidrev.us/presence/user';
Roblox.Endpoints.Urls['/friends/list'] = 'https://www.voidrev.us/friends/list';
Roblox.Endpoints.Urls['/navigation/getCount'] = 'https://www.voidrev.us/navigation/getCount';
Roblox.Endpoints.Urls['/catalog/browse.aspx'] = 'https://www.voidrev.us/catalog/browse.aspx';
Roblox.Endpoints.Urls['/catalog/html'] = 'https://www.voidrev.us/catalog/html';
Roblox.Endpoints.Urls['/catalog/json'] = 'https://www.voidrev.us/catalog/json';
Roblox.Endpoints.Urls['/catalog/contents'] = 'https://www.voidrev.us/catalog/contents';
Roblox.Endpoints.Urls['/catalog/lists.aspx'] = 'https://www.voidrev.us/catalog/lists.aspx';
Roblox.Endpoints.Urls['/catalog/items'] = 'https://www.voidrev.us/catalog/items';
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
if (typeof(Roblox) === "undefined") { Roblox = {}; }
Roblox.Endpoints = Roblox.Endpoints || {};
Roblox.Endpoints.Urls = Roblox.Endpoints.Urls || {};
Roblox.Endpoints.Urls['/authentication/is-logged-in'] = 'https://www.voidrev.us/authentication/is-logged-in';
</script>
</head>
<body id="rbx-body"
class=""
data-performance-relative-value="0.005"
data-internal-page-name="Avatar"
data-send-event-percentage="0.01"
data-abuse-report-computer=false
data-abuse-report-phone=false>
<div id="roblox-linkify" data-enabled="true" data-regex="(https?\:\/\/)?(?:www\.)?([a-z0-9\-]{2,}\.)*(((m|de|www|web|api|blog|wiki|help|corp|polls|bloxcon|developer|devforum|forum)\.roblox\.com|robloxlabs\.com)|(www\.shoproblox\.com))((\/[A-Za-z0-9-+&amp;@#\/%?=~_|!:,.;]*)|(\b|\s))" data-regex-flags="gm" data-as-http-regex=""></div>
<div id="image-retry-data"
data-image-retry-max-times="10"
data-image-retry-timer="1500"
data-isnewexponentialbackoffforimageretryenabled="true"
data-ga-logging-percent="10">
</div>
<div id="http-retry-data"
data-http-retry-max-timeout="0"
data-http-retry-base-timeout="0"
data-http-retry-max-times="5">
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
<script type="text/javascript">
Roblox = Roblox || {};
Roblox.Resources = Roblox.Resources || {};
//<sl:translate>
Roblox.Resources.Dialog = {
yes: "Yes",
No: "No",
Confirm: "Confirm",
Cancel: "Cancel",
Agree: "Agree"
};
//</sl:translate>
</script>
</div>
<script src="https://ajax.aspnetcdn.com/ajax/4.5.1/1/WebForms.js" type="text/javascript"></script>
<script type="text/javascript">
//<![CDATA[
window.WebForm_PostBackOptions||document.write('<script type="text/javascript" src="/WebResource.axd?d=pynGkmcFUV13He1Qd6_TZH6GgOgBQtqMPCPjRUnhj_pzNesAXKuAdu2pj-Sq-3JDJIgwEw2&amp;t=635792847671809273"><\/script>');//]]>
</script>
<script src="https://ajax.aspnetcdn.com/ajax/4.5.1/1/MicrosoftAjax.js" type="text/javascript"></script>
<script type="text/javascript">
//<![CDATA[
(window.Sys && Sys._Application && Sys.Observer)||document.write('<script type="text/javascript" src="/ScriptResource.axd?d=NJmAwtEo3Ipnlaxl6CMhvumliVar4i2j2lMD3IoEyWJLzR5nHuzAduQUc0aL2Mlk6x33pKXl4t8wV-HcuHw6oBnS1lwzKesKcNRQDsG9ufrF4--3-_YdpMr_CHZuNtX0ejV8Lq6JG6Taji5KieUXCTacPbQ1&t=72e85ccd"><\/script>');//]]>
</script>
<script type="text/javascript">Roblox.XsrfToken.setToken('e8xLOcekBKCU');</script>
<script type="text/javascript">
if (top.location != self.location) {
top.location = self.location.href;
}
</script>
<style type="text/css">
</style>
<div id="navContent" class="nav-content logged-in"><div class="nav-content-inner">
<div id="MasterContainer" >
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
<script type="text/javascript">Roblox.FixedUI.gutterAdsEnabled=false;</script>
<div id="Container">
</div>
<noscript><div class="alert-info"><h5>Please enable Javascript to use all the features on this site.</h5></div></noscript>
</div>
<div id="AdvertisingLeaderboard">
<iframe name="Roblox_MyCharacter_Top_728x90"
allowtransparency="true"
frameborder="0"
height="110"
scrolling="no"
src="https://www.voidrev.us/user-sponsorship/?id=3"
width="728"
data-js-adtype="iframead"
data-ad-slot="Roblox_MyCharacter_Top_728x90"></iframe>
</div>
<div id="BodyWrapper">
<div id="RepositionBody">
<div id="Body" class="body-width">
<script type="text/javascript">
Roblox.Thumbs.Image.prototype._doShowSpinner = Roblox.Thumbs.Image.prototype._showSpinner;
Roblox.Thumbs.Image.prototype._showSpinner = function () {
if (typeof (this._userID) !== "undefined") {
this._spinnerUrl = "/img/Spinners/ajax_loader_blue_300.gif";
}
this._doShowSpinner();
if (typeof (this._userID) !== "undefined") {
this._spinner.style.height = "300px";
this._spinner.style.width = "300px";
this._spinner.style.padding = "26px";
this._spinner.style.backgroundColor = "#fff";
}
};
function changedAvatarType() {
$(".playerAvatarType").removeClass("selected");
$(".playerAvatarType input:checked").parent().addClass('selected');
}
$(document).on('click', '.playerAvatarType', changedAvatarType);
</script>
<script type="text/javascript">
function pageLoad() {
$(".tooltip-right").tipsy({ 'gravity': 'w' });
}
</script>
<style type="text/css">
#Body /*Needs to be on the Page to override MasterPage #Body */ {
padding: 10px;
}
.SetPlayerAvatarTypeRadioButtons {
display: inline-block;
cursor: pointer;
margin: 5px 0 0 0;
}
.playerAvatarType {
font-size: 22px;
cursor: pointer;
-moz-user-select: none; /* Firefox */
-webkit-user-select: none; /* Chrome, Safari, and Opera */
-ms-user-select: none;
-o-user-select: none;
user-select: none;
display: inline-block;
}
.playerAvatarType label {
cursor: pointer;
padding: 0 6px 0 0;
}
.playerAvatarType input {
cursor: pointer;
margin-right: 2px;
margin-left: 4px;
}
.playerAvatarType:hover {
background-color: #efefef;
}
.playerAvatarType.selected {
background-color: #dedede;
-webkit-transition: background-color 2s ease-out;
-moz-transition: background-color 2s ease-out;
-o-transition: background-color 2s ease-out;
transition: background-color 2s ease-out;
}
.AvatarPickerRadioButtons {
margin-left: 70px;
margin-top: 26px;
}
</style>
<div class="MyRobloxContainer">
    <div class="pagification divider-top  divider-bottom">
        <div class="pagification-icon">
            <span class="icon-logo-r"></span>
        </div>
        <div class="pagification-body text collapsed">
            <h4>New Design - Coming Soon</h4>
            <div class="pagification-message">With the new Avatar Editor we are launching in the next few weeks, this page will no longer be supported, and will eventually be removed. The new Avatar Editor will feature many more features such as scaling, changing body colors in groups, costumes, and hopefully fix many of the bugs experienced here.</div>
        </div>
    </div>
<h1>Avatar Customizer</h1>
<div class="Column1f left-nav-menu">
<div style="margin-top: 25px;">
<div>
<div id="UserAvatar" class="thumbnail-holder" data-reset-enabled-every-page data-3d-thumbs-enabled
data-url="<?=getUserThumbnail($con,$uID);?>" style="width:352px; height:352px;margin: 0 auto; position: relative;">
<span class="thumbnail-span" data-3d-url="/avatar-thumbnail-3d/json?userId=<?=$uID;?>" data-js-files='https://www.voidrev.us/js/8f40869a77ab2bdc33f941eadeb6b9c4.js' ><img alt='<?echo NOXSSPlz($username);?>' class='' src='https://www.voidrev.us<?=getUserThumbnail($con,$uID);?>' style="width: 100%;height: 100%;" /></span>
<span class="enable-three-dee btn-control btn-control-small" style="position: absolute;right: 80px;bottom: 0;"></span>
</div>
</div>
<div id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_CustomizeCharacterUpdatePanelAvatar">
<div class="ReDrawAvatar">
<span id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_lblInvalidateThumbnails">Something wrong with your avatar?</span><br />
<a id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_cmdInvalidateThumbnails">Click here to re-draw it!</a>
<a id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_cmdRefreshAllUpdatePanels2" href="javascript:__doPostBack(&#39;ctl00$ctl00$cphRoblox$cphMyRobloxContent$cmdRefreshAllUpdatePanels2&#39;,&#39;&#39;)"></a>
<input type="hidden" name="ctl00$ctl00$cphRoblox$cphMyRobloxContent$AvatarScaleHeightInput" id="AvatarScaleHeightInput" />
<input type="hidden" name="ctl00$ctl00$cphRoblox$cphMyRobloxContent$AvatarScaleWidthInput" id="AvatarScaleWidthInput" />
<a id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_cmdSetScale" href="javascript:__doPostBack(&#39;ctl00$ctl00$cphRoblox$cphMyRobloxContent$cmdSetScale&#39;,&#39;&#39;)"></a>
<script type="text/javascript">
var setScale = function (height, width) {
$("#AvatarScaleHeightInput").val(height);
$("#AvatarScaleWidthInput").val(width);
__doPostBack("ctl00$ctl00$cphRoblox$cphMyRobloxContent$cmdSetScale", "");
}
</script>
</div>
</div>
<div id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_SetPlayerAvatarType">
<div class="AvatarPickerRadioButtons">
<h2>Avatar Type (BETA)</h2>
<div style="cursor: auto; display: inline-block; margin-left: 3px; position: relative; top: -2px; opacity: 1;" class="TipsyImg tooltip-right" title="Choose between the classic avatar movement or R15 - which has elbows and knees!">
<img height="13" width="12" style="cursor: auto;"
src="https://www.voidrev.us/img/65cb6e4009a00247ca02800047aafb87.png"
alt="Choose between the classic avatar movement or R15 - which has elbows and knees!" />
</div>
<div class="SetPlayerAvatarTypeRadioButtons">
<span class="playerAvatarType <?php if($usr['R15'] == 0){echo"selected";}?>"><input id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_PlayerAvatarTypeR6" class="r6" type="radio" name="r6" value="PlayerAvatarTypeR6" <?php if($usr['R15'] == 0){echo'checked="checked"';}?> /><label for="ctl00_ctl00_cphRoblox_cphMyRobloxContent_PlayerAvatarTypeR6">R6</label></span>
<span class="playerAvatarType <?php if($usr['R15'] == 1){echo"selected";}?>"><input id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_PlayerAvatarTypeR15" class="r15" type="radio" name="r15" value="PlayerAvatarTypeR15" <?php if($usr['R15'] == 1){echo'checked="checked"';}?>/><label for="ctl00_ctl00_cphRoblox_cphMyRobloxContent_PlayerAvatarTypeR15">R15</label></span>
</div>
</div>
<div class="R15warning" style="margin-left: 70px; margin-top: 9px; width: 225px;">Note that gear, body parts, and some hats are not yet R15 compatible.</div>
</div>
<div class="AvatarPickerScale">
<h2>Scaling</h2>
<div style="cursor: auto; display: inline-block; margin-left: 3px; position: relative; top: -2px; opacity: 1;" class="TipsyImg tooltip-right" title="Select the R15 Avatar Type to enable Scaling.">
<img height="13" width="12" style="cursor: auto;"
src="https://www.voidrev.us/img/65cb6e4009a00247ca02800047aafb87.png"
alt="Select the R15 Avatar Type to enable Scaling." />
</div>
<div id="avatar-height" class="scale-holder <?php if($r15 == false){ echo"disabled"; } ?>">
<div>Height</div>
<input <?php if($r15 == false){ echo"disabled"; } ?> class="scale-input" type="range" min="0.95" max="1.05" step="0.05" value="0.9500"><div class="scale-label">95%</div>
</div>
<div id="avatar-width" class="scale-holder <?php if($r15 == false){ echo"disabled"; } ?>">
<div>Width</div>
<input <?php if($r15 == false){ echo"disabled"; } ?> class="scale-input" type="range" min="0.75" max="1.00" step="0.05" value="0.7500"><div class="scale-label">75%</div>
</div>
</div>
</div>
<h2 style="margin-top: 20px; margin-left: 70px;">
<span>Colors</span>
</h2>
<div>
<div id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_ColorChooser" class="Mannequin">
<p>
Click a body part to change its color:
</p>
<div id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_UpdatePanelBodyColors">
<div id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_ColorChooserFrame" class="ColorChooserFrame" style="height:240px;width:194px;text-align:center;">
<div style="position: relative; margin: 11px 4px; height: 1%;">
<div style="position: absolute; left: 72px; top: 0px; cursor: pointer" onclick="HeadOpen()">
<div id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_HeadSelector" class="ColorChooserRegion" style="background-color:rgb(<?=$headRGB;?>);height:44px;width:44px;">
</div>
</div>
<div style="position: absolute; left: 0px; top: 52px; cursor: pointer" onclick="RightArmOpen()">
<div id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_RightArmSelector" class="ColorChooserRegion" style="background-color:rgb(<?=$rightArmRGB;?>);height:88px;width:40px;">
</div>
</div>
<div style="position: absolute; left: 48px; top: 52px; cursor: pointer" onclick="TorsoOpen()">
<div id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_TorsoSelector" class="ColorChooserRegion" style="background-color:rgb(<?=$torsoRGB;?>);height:88px;width:88px;">
</div>
</div>
<div style="position: absolute; left: 144px; top: 52px; cursor: pointer" onclick="LeftArmOpen()">
<div id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_LeftArmSelector" class="ColorChooserRegion" style="background-color:rgb(<?=$leftArmRGB;?>);height:88px;width:40px;">
</div>
</div>
<div style="position: absolute; left: 48px; top: 146px; cursor: pointer" onclick="RightLegOpen()">
<div id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_RightLegSelector" class="ColorChooserRegion" style="background-color:rgb(<?=$rightLegRGB;?>);height:88px;width:40px;">
</div>
</div>
<div style="position: absolute; left: 96px; top: 146px; cursor: pointer" onclick="LeftLegOpen()">
<div id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_LeftLegSelector" class="ColorChooserRegion" style="background-color:rgb(<?=$leftLegRGB;?>);height:88px;width:40px;">
</div>
</div>
</div>
</div>
<div id="PopupRightLeg" class="modalPopup unifiedModal ColorPickerModal simplemodal-data">
<div style="height: 38px; padding-top: 2px;">Choose a Right Leg Color</div>
<div class="simplemodal-close"><a class="ImageButton closeBtnCircle_20h" style="left: -36px;"></a></div>
<div class="unifiedModalContent ColorPickerContainer">
<table id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_ColorChooserRightLeg_DataListColors" cellspacing="0" border="0" style="border-width:0px;border-collapse:collapse;">
<tr>
<td>
<div class="ColorPickerItem" onclick="rightlegcolorset(45);" style="display:inline-block;background-color:#B4D2E4;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1024);" style="display:inline-block;background-color:#AFDDFF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(11);" style="display:inline-block;background-color:#80BBDC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(102);" style="display:inline-block;background-color:#6E99CA;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(23);" style="display:inline-block;background-color:#0D69AC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1010);" style="display:inline-block;background-color:#0000FF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1012);" style="display:inline-block;background-color:#2154B9;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1011);" style="display:inline-block;background-color:#002060;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1027);" style="display:inline-block;background-color:#9FF3E9;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1018);" style="display:inline-block;background-color:#12EED4;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(151);" style="display:inline-block;background-color:#789082;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1022);" style="display:inline-block;background-color:#7F8E64;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(135);" style="display:inline-block;background-color:#74869D;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1019);" style="display:inline-block;background-color:#00FFFF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1013);" style="display:inline-block;background-color:#04AFEC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(107);" style="display:inline-block;background-color:#008F9C;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1028);" style="display:inline-block;background-color:#CCFFCC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(29);" style="display:inline-block;background-color:#A1C48C;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(119);" style="display:inline-block;background-color:#A4BD47;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(37);" style="display:inline-block;background-color:#4B974B;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1021);" style="display:inline-block;background-color:#3A7D15;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1020);" style="display:inline-block;background-color:#00FF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(28);" style="display:inline-block;background-color:#287F47;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(141);" style="display:inline-block;background-color:#27462D;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1029);" style="display:inline-block;background-color:#FFFFCC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(226);" style="display:inline-block;background-color:#FDEA8D;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1008);" style="display:inline-block;background-color:#C1BE42;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(24);" style="display:inline-block;background-color:#F5CD30;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1017);" style="display:inline-block;background-color:#FFAF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1009);" style="display:inline-block;background-color:#FFFF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1005);" style="display:inline-block;background-color:#FFAF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(105);" style="display:inline-block;background-color:#E29B40;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1025);" style="display:inline-block;background-color:#FFC9C9;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(125);" style="display:inline-block;background-color:#EAB892;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(101);" style="display:inline-block;background-color:#DA867A;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1007);" style="display:inline-block;background-color:#A34B4B;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1016);" style="display:inline-block;background-color:#FF66CC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1032);" style="display:inline-block;background-color:#FF00BF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1004);" style="display:inline-block;background-color:#FF0000;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(21);" style="display:inline-block;background-color:#C4281C;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="rightlegcolorset(9);" style="display:inline-block;background-color:#E8BAC8;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1026);" style="display:inline-block;background-color:#B1A7FF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1006);" style="display:inline-block;background-color:#B480FF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(153);" style="display:inline-block;background-color:#957977;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1023);" style="display:inline-block;background-color:#8C5B9F;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1015);" style="display:inline-block;background-color:#AA00AA;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1031);" style="display:inline-block;background-color:#6225D1;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(104);" style="display:inline-block;background-color:#6B327C;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="rightlegcolorset(5);" style="display:inline-block;background-color:#D7C59A;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1030);" style="display:inline-block;background-color:#FFCC99;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(18);" style="display:inline-block;background-color:#CC8E69;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(106);" style="display:inline-block;background-color:#DA8541;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(38);" style="display:inline-block;background-color:#A05F35;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1014);" style="display:inline-block;background-color:#AA5500;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(217);" style="display:inline-block;background-color:#7C5C46;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(192);" style="display:inline-block;background-color:#694028;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1001);" style="display:inline-block;background-color:#F8F8F8;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1);" style="display:inline-block;background-color:#F2F3F3;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(208);" style="display:inline-block;background-color:#E5E4DF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1002);" style="display:inline-block;background-color:#CDCDCD;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(194);" style="display:inline-block;background-color:#A3A2A5;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(199);" style="display:inline-block;background-color:#635F62;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(26);" style="display:inline-block;background-color:#1B2A35;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightlegcolorset(1003);" style="display:inline-block;background-color:#111111;height:40px;width:40px;">
</div>
</td>
</tr>
</table>
</div>
</div>
<div id="PopupLeftLeg" class="modalPopup unifiedModal ColorPickerModal simplemodal-data">
<div style="height: 38px; padding-top: 2px;">Choose a Left Leg Color</div>
<div class="simplemodal-close"><a class="ImageButton closeBtnCircle_20h" style="left: -36px;"></a></div>
<div class="unifiedModalContent ColorPickerContainer">
<table id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_ColorChooserLeftLeg_DataListColors" cellspacing="0" border="0" style="border-width:0px;border-collapse:collapse;">
<tr>
<td>
<div class="ColorPickerItem" onclick="leftlegcolorset(45);" style="display:inline-block;background-color:#B4D2E4;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1024);" style="display:inline-block;background-color:#AFDDFF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(11);" style="display:inline-block;background-color:#80BBDC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(102);" style="display:inline-block;background-color:#6E99CA;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(23);" style="display:inline-block;background-color:#0D69AC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1010);" style="display:inline-block;background-color:#0000FF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1012);" style="display:inline-block;background-color:#2154B9;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1011);" style="display:inline-block;background-color:#002060;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1027);" style="display:inline-block;background-color:#9FF3E9;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1018);" style="display:inline-block;background-color:#12EED4;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(151);" style="display:inline-block;background-color:#789082;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1022);" style="display:inline-block;background-color:#7F8E64;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(135);" style="display:inline-block;background-color:#74869D;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1019);" style="display:inline-block;background-color:#00FFFF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1013);" style="display:inline-block;background-color:#04AFEC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(107);" style="display:inline-block;background-color:#008F9C;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1028);" style="display:inline-block;background-color:#CCFFCC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(29);" style="display:inline-block;background-color:#A1C48C;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(119);" style="display:inline-block;background-color:#A4BD47;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(37);" style="display:inline-block;background-color:#4B974B;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1021);" style="display:inline-block;background-color:#3A7D15;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1020);" style="display:inline-block;background-color:#00FF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(28);" style="display:inline-block;background-color:#287F47;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(141);" style="display:inline-block;background-color:#27462D;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1029);" style="display:inline-block;background-color:#FFFFCC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(226);" style="display:inline-block;background-color:#FDEA8D;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1008);" style="display:inline-block;background-color:#C1BE42;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(24);" style="display:inline-block;background-color:#F5CD30;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1017);" style="display:inline-block;background-color:#FFAF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1009);" style="display:inline-block;background-color:#FFFF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1005);" style="display:inline-block;background-color:#FFAF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(105);" style="display:inline-block;background-color:#E29B40;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1025);" style="display:inline-block;background-color:#FFC9C9;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(125);" style="display:inline-block;background-color:#EAB892;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(101);" style="display:inline-block;background-color:#DA867A;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1007);" style="display:inline-block;background-color:#A34B4B;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1016);" style="display:inline-block;background-color:#FF66CC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1032);" style="display:inline-block;background-color:#FF00BF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1004);" style="display:inline-block;background-color:#FF0000;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(21);" style="display:inline-block;background-color:#C4281C;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="leftlegcolorset(9);" style="display:inline-block;background-color:#E8BAC8;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1026);" style="display:inline-block;background-color:#B1A7FF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1006);" style="display:inline-block;background-color:#B480FF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(153);" style="display:inline-block;background-color:#957977;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1023);" style="display:inline-block;background-color:#8C5B9F;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1015);" style="display:inline-block;background-color:#AA00AA;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1031);" style="display:inline-block;background-color:#6225D1;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(104);" style="display:inline-block;background-color:#6B327C;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="leftlegcolorset(5);" style="display:inline-block;background-color:#D7C59A;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1030);" style="display:inline-block;background-color:#FFCC99;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(18);" style="display:inline-block;background-color:#CC8E69;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(106);" style="display:inline-block;background-color:#DA8541;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(38);" style="display:inline-block;background-color:#A05F35;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1014);" style="display:inline-block;background-color:#AA5500;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(217);" style="display:inline-block;background-color:#7C5C46;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(192);" style="display:inline-block;background-color:#694028;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1001);" style="display:inline-block;background-color:#F8F8F8;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1);" style="display:inline-block;background-color:#F2F3F3;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(208);" style="display:inline-block;background-color:#E5E4DF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1002);" style="display:inline-block;background-color:#CDCDCD;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(194);" style="display:inline-block;background-color:#A3A2A5;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(199);" style="display:inline-block;background-color:#635F62;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(26);" style="display:inline-block;background-color:#1B2A35;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftlegcolorset(1003);" style="display:inline-block;background-color:#111111;height:40px;width:40px;">
</div>
</td>
</tr>
</table>
</div>
</div>
<div id="PopupRightArm" class="modalPopup unifiedModal ColorPickerModal simplemodal-data">
<div style="height: 38px; padding-top: 2px;">Choose a Right Arm Color</div>
<div class="simplemodal-close"><a class="ImageButton closeBtnCircle_20h" style="left: -36px;"></a></div>
<div class="unifiedModalContent ColorPickerContainer">
<table id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_ColorChooserRightArm_DataListColors" cellspacing="0" border="0" style="border-width:0px;border-collapse:collapse;">
<tr>
<td>
<div class="ColorPickerItem" onclick="rightarmcolorset(45);" style="display:inline-block;background-color:#B4D2E4;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1024);" style="display:inline-block;background-color:#AFDDFF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(11);" style="display:inline-block;background-color:#80BBDC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(102);" style="display:inline-block;background-color:#6E99CA;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(23);" style="display:inline-block;background-color:#0D69AC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1010);" style="display:inline-block;background-color:#0000FF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1012);" style="display:inline-block;background-color:#2154B9;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1011);" style="display:inline-block;background-color:#002060;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1027);" style="display:inline-block;background-color:#9FF3E9;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1018);" style="display:inline-block;background-color:#12EED4;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(151);" style="display:inline-block;background-color:#789082;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1022);" style="display:inline-block;background-color:#7F8E64;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(135);" style="display:inline-block;background-color:#74869D;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1019);" style="display:inline-block;background-color:#00FFFF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1013);" style="display:inline-block;background-color:#04AFEC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(107);" style="display:inline-block;background-color:#008F9C;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1028);" style="display:inline-block;background-color:#CCFFCC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(29);" style="display:inline-block;background-color:#A1C48C;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(119);" style="display:inline-block;background-color:#A4BD47;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(37);" style="display:inline-block;background-color:#4B974B;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1021);" style="display:inline-block;background-color:#3A7D15;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1020);" style="display:inline-block;background-color:#00FF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(28);" style="display:inline-block;background-color:#287F47;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(141);" style="display:inline-block;background-color:#27462D;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1029);" style="display:inline-block;background-color:#FFFFCC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(226);" style="display:inline-block;background-color:#FDEA8D;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1008);" style="display:inline-block;background-color:#C1BE42;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(24);" style="display:inline-block;background-color:#F5CD30;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1017);" style="display:inline-block;background-color:#FFAF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1009);" style="display:inline-block;background-color:#FFFF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1005);" style="display:inline-block;background-color:#FFAF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(105);" style="display:inline-block;background-color:#E29B40;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1025);" style="display:inline-block;background-color:#FFC9C9;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(125);" style="display:inline-block;background-color:#EAB892;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(101);" style="display:inline-block;background-color:#DA867A;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1007);" style="display:inline-block;background-color:#A34B4B;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1016);" style="display:inline-block;background-color:#FF66CC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1032);" style="display:inline-block;background-color:#FF00BF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1004);" style="display:inline-block;background-color:#FF0000;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(21);" style="display:inline-block;background-color:#C4281C;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="rightarmcolorset(9);" style="display:inline-block;background-color:#E8BAC8;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1026);" style="display:inline-block;background-color:#B1A7FF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1006);" style="display:inline-block;background-color:#B480FF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(153);" style="display:inline-block;background-color:#957977;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1023);" style="display:inline-block;background-color:#8C5B9F;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1015);" style="display:inline-block;background-color:#AA00AA;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1031);" style="display:inline-block;background-color:#6225D1;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(104);" style="display:inline-block;background-color:#6B327C;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="rightarmcolorset(5);" style="display:inline-block;background-color:#D7C59A;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1030);" style="display:inline-block;background-color:#FFCC99;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(18);" style="display:inline-block;background-color:#CC8E69;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(106);" style="display:inline-block;background-color:#DA8541;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(38);" style="display:inline-block;background-color:#A05F35;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1014);" style="display:inline-block;background-color:#AA5500;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(217);" style="display:inline-block;background-color:#7C5C46;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(192);" style="display:inline-block;background-color:#694028;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1001);" style="display:inline-block;background-color:#F8F8F8;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1);" style="display:inline-block;background-color:#F2F3F3;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(208);" style="display:inline-block;background-color:#E5E4DF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1002);" style="display:inline-block;background-color:#CDCDCD;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(194);" style="display:inline-block;background-color:#A3A2A5;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(199);" style="display:inline-block;background-color:#635F62;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(26);" style="display:inline-block;background-color:#1B2A35;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="rightarmcolorset(1003);" style="display:inline-block;background-color:#111111;height:40px;width:40px;">
</div>
</td>
</tr>
</table>
</div>
</div>
<div id="PopupLeftArm" class="modalPopup unifiedModal ColorPickerModal simplemodal-data">
<div style="height: 38px; padding-top: 2px;">Choose a Left Arm Color</div>
<div class="simplemodal-close"><a class="ImageButton closeBtnCircle_20h" style="left: -36px;"></a></div>
<div class="unifiedModalContent ColorPickerContainer">
<table id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_ColorChooserLeftArm_DataListColors" cellspacing="0" border="0" style="border-width:0px;border-collapse:collapse;">
<tr>
<td>
<div class="ColorPickerItem" onclick="leftarmcolorset(45);" style="display:inline-block;background-color:#B4D2E4;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1024);" style="display:inline-block;background-color:#AFDDFF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(11);" style="display:inline-block;background-color:#80BBDC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(102);" style="display:inline-block;background-color:#6E99CA;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(23);" style="display:inline-block;background-color:#0D69AC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1010);" style="display:inline-block;background-color:#0000FF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1012);" style="display:inline-block;background-color:#2154B9;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1011);" style="display:inline-block;background-color:#002060;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1027);" style="display:inline-block;background-color:#9FF3E9;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1018);" style="display:inline-block;background-color:#12EED4;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(151);" style="display:inline-block;background-color:#789082;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1022);" style="display:inline-block;background-color:#7F8E64;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(135);" style="display:inline-block;background-color:#74869D;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1019);" style="display:inline-block;background-color:#00FFFF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1013);" style="display:inline-block;background-color:#04AFEC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(107);" style="display:inline-block;background-color:#008F9C;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1028);" style="display:inline-block;background-color:#CCFFCC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(29);" style="display:inline-block;background-color:#A1C48C;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(119);" style="display:inline-block;background-color:#A4BD47;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(37);" style="display:inline-block;background-color:#4B974B;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1021);" style="display:inline-block;background-color:#3A7D15;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1020);" style="display:inline-block;background-color:#00FF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(28);" style="display:inline-block;background-color:#287F47;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(141);" style="display:inline-block;background-color:#27462D;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1029);" style="display:inline-block;background-color:#FFFFCC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(226);" style="display:inline-block;background-color:#FDEA8D;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1008);" style="display:inline-block;background-color:#C1BE42;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(24);" style="display:inline-block;background-color:#F5CD30;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1017);" style="display:inline-block;background-color:#FFAF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1009);" style="display:inline-block;background-color:#FFFF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1005);" style="display:inline-block;background-color:#FFAF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(105);" style="display:inline-block;background-color:#E29B40;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1025);" style="display:inline-block;background-color:#FFC9C9;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(125);" style="display:inline-block;background-color:#EAB892;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(101);" style="display:inline-block;background-color:#DA867A;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1007);" style="display:inline-block;background-color:#A34B4B;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1016);" style="display:inline-block;background-color:#FF66CC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1032);" style="display:inline-block;background-color:#FF00BF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1004);" style="display:inline-block;background-color:#FF0000;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(21);" style="display:inline-block;background-color:#C4281C;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="leftarmcolorset(9);" style="display:inline-block;background-color:#E8BAC8;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1026);" style="display:inline-block;background-color:#B1A7FF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1006);" style="display:inline-block;background-color:#B480FF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(153);" style="display:inline-block;background-color:#957977;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1023);" style="display:inline-block;background-color:#8C5B9F;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1015);" style="display:inline-block;background-color:#AA00AA;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1031);" style="display:inline-block;background-color:#6225D1;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(104);" style="display:inline-block;background-color:#6B327C;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="leftarmcolorset(5);" style="display:inline-block;background-color:#D7C59A;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1030);" style="display:inline-block;background-color:#FFCC99;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(18);" style="display:inline-block;background-color:#CC8E69;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(106);" style="display:inline-block;background-color:#DA8541;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(38);" style="display:inline-block;background-color:#A05F35;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1014);" style="display:inline-block;background-color:#AA5500;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(217);" style="display:inline-block;background-color:#7C5C46;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(192);" style="display:inline-block;background-color:#694028;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1001);" style="display:inline-block;background-color:#F8F8F8;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1);" style="display:inline-block;background-color:#F2F3F3;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(208);" style="display:inline-block;background-color:#E5E4DF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1002);" style="display:inline-block;background-color:#CDCDCD;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(194);" style="display:inline-block;background-color:#A3A2A5;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(199);" style="display:inline-block;background-color:#635F62;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(26);" style="display:inline-block;background-color:#1B2A35;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="leftarmcolorset(1003);" style="display:inline-block;background-color:#111111;height:40px;width:40px;">
</div>
</td>
</tr>
</table>
</div>
</div>
<div id="PopupHead" class="modalPopup unifiedModal ColorPickerModal simplemodal-data">
<div style="height: 38px; padding-top: 2px;">Choose a Head Color</div>
<div class="simplemodal-close"><a class="ImageButton closeBtnCircle_20h" style="left: -36px;"></a></div>
<div class="unifiedModalContent ColorPickerContainer">
<table id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_ColorChooserHead_DataListColors" cellspacing="0" border="0" style="border-width:0px;border-collapse:collapse;">
<tr>
<td>
<div class="ColorPickerItem" onclick="headcolorset(45);" style="display:inline-block;background-color:#B4D2E4;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1024);" style="display:inline-block;background-color:#AFDDFF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(11);" style="display:inline-block;background-color:#80BBDC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(102);" style="display:inline-block;background-color:#6E99CA;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(23);" style="display:inline-block;background-color:#0D69AC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1010);" style="display:inline-block;background-color:#0000FF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1012);" style="display:inline-block;background-color:#2154B9;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1011);" style="display:inline-block;background-color:#002060;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="headcolorset(1027);" style="display:inline-block;background-color:#9FF3E9;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1018);" style="display:inline-block;background-color:#12EED4;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(151);" style="display:inline-block;background-color:#789082;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1022);" style="display:inline-block;background-color:#7F8E64;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(135);" style="display:inline-block;background-color:#74869D;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1019);" style="display:inline-block;background-color:#00FFFF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1013);" style="display:inline-block;background-color:#04AFEC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(107);" style="display:inline-block;background-color:#008F9C;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="headcolorset(1028);" style="display:inline-block;background-color:#CCFFCC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(29);" style="display:inline-block;background-color:#A1C48C;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(119);" style="display:inline-block;background-color:#A4BD47;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(37);" style="display:inline-block;background-color:#4B974B;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1021);" style="display:inline-block;background-color:#3A7D15;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1020);" style="display:inline-block;background-color:#00FF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(28);" style="display:inline-block;background-color:#287F47;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(141);" style="display:inline-block;background-color:#27462D;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="headcolorset(1029);" style="display:inline-block;background-color:#FFFFCC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(226);" style="display:inline-block;background-color:#FDEA8D;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1008);" style="display:inline-block;background-color:#C1BE42;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(24);" style="display:inline-block;background-color:#F5CD30;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1017);" style="display:inline-block;background-color:#FFAF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1009);" style="display:inline-block;background-color:#FFFF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1005);" style="display:inline-block;background-color:#FFAF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(105);" style="display:inline-block;background-color:#E29B40;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="headcolorset(1025);" style="display:inline-block;background-color:#FFC9C9;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(125);" style="display:inline-block;background-color:#EAB892;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(101);" style="display:inline-block;background-color:#DA867A;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1007);" style="display:inline-block;background-color:#A34B4B;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1016);" style="display:inline-block;background-color:#FF66CC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1032);" style="display:inline-block;background-color:#FF00BF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1004);" style="display:inline-block;background-color:#FF0000;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(21);" style="display:inline-block;background-color:#C4281C;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="headcolorset(9);" style="display:inline-block;background-color:#E8BAC8;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1026);" style="display:inline-block;background-color:#B1A7FF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1006);" style="display:inline-block;background-color:#B480FF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(153);" style="display:inline-block;background-color:#957977;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1023);" style="display:inline-block;background-color:#8C5B9F;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1015);" style="display:inline-block;background-color:#AA00AA;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1031);" style="display:inline-block;background-color:#6225D1;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(104);" style="display:inline-block;background-color:#6B327C;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="headcolorset(5);" style="display:inline-block;background-color:#D7C59A;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1030);" style="display:inline-block;background-color:#FFCC99;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(18);" style="display:inline-block;background-color:#CC8E69;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(106);" style="display:inline-block;background-color:#DA8541;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(38);" style="display:inline-block;background-color:#A05F35;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1014);" style="display:inline-block;background-color:#AA5500;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(217);" style="display:inline-block;background-color:#7C5C46;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(192);" style="display:inline-block;background-color:#694028;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="headcolorset(1001);" style="display:inline-block;background-color:#F8F8F8;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1);" style="display:inline-block;background-color:#F2F3F3;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(208);" style="display:inline-block;background-color:#E5E4DF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1002);" style="display:inline-block;background-color:#CDCDCD;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(194);" style="display:inline-block;background-color:#A3A2A5;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(199);" style="display:inline-block;background-color:#635F62;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(26);" style="display:inline-block;background-color:#1B2A35;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="headcolorset(1003);" style="display:inline-block;background-color:#111111;height:40px;width:40px;">
</div>
</td>
</tr>
</table>
</div>
</div>
<div id="PopupTorso" class="modalPopup unifiedModal ColorPickerModal simplemodal-data">
<div style="height: 38px; padding-top: 2px;">Choose a Torso Color</div>
<div class="simplemodal-close"><a class="ImageButton closeBtnCircle_20h" style="left: -36px;"></a></div>
<div class="unifiedModalContent ColorPickerContainer">
<table id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_ColorChooserTorso_DataListColors" cellspacing="0" border="0" style="border-width:0px;border-collapse:collapse;">
<tr>
<td>
<div class="ColorPickerItem" onclick="torsocolorset(45);" style="display:inline-block;background-color:#B4D2E4;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1024);" style="display:inline-block;background-color:#AFDDFF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(11);" style="display:inline-block;background-color:#80BBDC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(102);" style="display:inline-block;background-color:#6E99CA;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(23);" style="display:inline-block;background-color:#0D69AC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1010);" style="display:inline-block;background-color:#0000FF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1012);" style="display:inline-block;background-color:#2154B9;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1011);" style="display:inline-block;background-color:#002060;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="torsocolorset(1027);" style="display:inline-block;background-color:#9FF3E9;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1018);" style="display:inline-block;background-color:#12EED4;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(151);" style="display:inline-block;background-color:#789082;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1022);" style="display:inline-block;background-color:#7F8E64;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(135);" style="display:inline-block;background-color:#74869D;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1019);" style="display:inline-block;background-color:#00FFFF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1013);" style="display:inline-block;background-color:#04AFEC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(107);" style="display:inline-block;background-color:#008F9C;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="torsocolorset(1028);" style="display:inline-block;background-color:#CCFFCC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(29);" style="display:inline-block;background-color:#A1C48C;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(119);" style="display:inline-block;background-color:#A4BD47;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(37);" style="display:inline-block;background-color:#4B974B;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1021);" style="display:inline-block;background-color:#3A7D15;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1020);" style="display:inline-block;background-color:#00FF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(28);" style="display:inline-block;background-color:#287F47;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(141);" style="display:inline-block;background-color:#27462D;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="torsocolorset(1029);" style="display:inline-block;background-color:#FFFFCC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(226);" style="display:inline-block;background-color:#FDEA8D;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1008);" style="display:inline-block;background-color:#C1BE42;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(24);" style="display:inline-block;background-color:#F5CD30;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1017);" style="display:inline-block;background-color:#FFAF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1009);" style="display:inline-block;background-color:#FFFF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1005);" style="display:inline-block;background-color:#FFAF00;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(105);" style="display:inline-block;background-color:#E29B40;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="torsocolorset(1025);" style="display:inline-block;background-color:#FFC9C9;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(125);" style="display:inline-block;background-color:#EAB892;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(101);" style="display:inline-block;background-color:#DA867A;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1007);" style="display:inline-block;background-color:#A34B4B;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1016);" style="display:inline-block;background-color:#FF66CC;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1032);" style="display:inline-block;background-color:#FF00BF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1004);" style="display:inline-block;background-color:#FF0000;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(21);" style="display:inline-block;background-color:#C4281C;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="torsocolorset(9);" style="display:inline-block;background-color:#E8BAC8;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1026);" style="display:inline-block;background-color:#B1A7FF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1006);" style="display:inline-block;background-color:#B480FF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(153);" style="display:inline-block;background-color:#957977;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1023);" style="display:inline-block;background-color:#8C5B9F;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1015);" style="display:inline-block;background-color:#AA00AA;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1031);" style="display:inline-block;background-color:#6225D1;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(104);" style="display:inline-block;background-color:#6B327C;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="torsocolorset(5);" style="display:inline-block;background-color:#D7C59A;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1030);" style="display:inline-block;background-color:#FFCC99;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(18);" style="display:inline-block;background-color:#CC8E69;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(106);" style="display:inline-block;background-color:#DA8541;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(38);" style="display:inline-block;background-color:#A05F35;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1014);" style="display:inline-block;background-color:#AA5500;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(217);" style="display:inline-block;background-color:#7C5C46;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(192);" style="display:inline-block;background-color:#694028;height:40px;width:40px;">
</div>
</td>
</tr><tr>
<td>
<div class="ColorPickerItem" onclick="torsocolorset(1001);" style="display:inline-block;background-color:#F8F8F8;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1);" style="display:inline-block;background-color:#F2F3F3;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(208);" style="display:inline-block;background-color:#E5E4DF;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1002);" style="display:inline-block;background-color:#CDCDCD;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(194);" style="display:inline-block;background-color:#A3A2A5;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(199);" style="display:inline-block;background-color:#635F62;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(26);" style="display:inline-block;background-color:#1B2A35;height:40px;width:40px;">
</div>
</td><td>
<div class="ColorPickerItem" onclick="torsocolorset(1003);" style="display:inline-block;background-color:#111111;height:40px;width:40px;">
</div>
</td>
</tr>
</table>
</div>
</div>
<script type="text/javascript">
var colorPickerModalProperties = { overlayClose: true, escClose: true, opacity: 0, overlayCss: { backgroundColor: "#000" } };
RightLegOpen = function () {
$("#PopupRightLeg").modal(colorPickerModalProperties);
};
LeftLegOpen = function () {
$("#PopupLeftLeg").modal(colorPickerModalProperties);
};
RightArmOpen = function () {
$("#PopupRightArm").modal(colorPickerModalProperties);
};
LeftArmOpen = function () {
$("#PopupLeftArm").modal(colorPickerModalProperties);
};
HeadOpen = function () {
$("#PopupHead").modal(colorPickerModalProperties);
};
TorsoOpen = function () {
$("#PopupTorso").modal(colorPickerModalProperties);
};
</script>
</div>
</div>
</div>
</div>
<div class="Column2f">
<div>
<a href="https://www.voidrev.us/catalog" class="btn btn-more btn-primary-sm">Get More</a>
<div class="small get-more-text">Explore the catalog to find more clothes!</div>
</div>
<div class="tab-container">
<div class="tab-active" data-id="tab_wardrobe">Wardrobe</div>
</div>
<div>
<div id="tab_wardrobe" class="tab-active">
<div id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_UpdatePanelWardrobe">
<div class="CustomizeCharacterContainer">
<div class="AttireCategory" style="text-align: center">
<a class="AttireCategorySelector<?if($_GET['tab']=='heads'){echo'_selected';}?>" href="?tab=heads">Heads</a>
<a class="AttireCategorySelector<?if($_GET['tab']=='faces'){echo'_selected';}?>" href="?tab=faces">Faces</a>
<a class="AttireCategorySelector<?if($_GET['tab']=='accessories'){echo'_selected';}?>" href="?tab=accessories">Accessories</a>
<a class="AttireCategorySelector<?if($_GET['tab']=='animations'){echo'_selected';}?>" href="?tab=animations">Animations</a>
<a class="AttireCategorySelector<?if($_GET['tab']=='emotes'){echo'_selected';}?>" href="?tab=emotes">Emotes</a>
<a class="AttireCategorySelector<?if($_GET['tab']=='tshirts'){echo'_selected';}?>" href="?tab=tshirts">T-Shirts</a>
<a class="AttireCategorySelector<?if($_GET['tab']=='shirts'){echo'_selected';}?>" href="?tab=shirts">Shirts</a>
<a class="AttireCategorySelector<?if($_GET['tab']=='pants'){echo'_selected';}?>" href="?tab=pants">Pants</a>
<a class="AttireCategorySelector<?if($_GET['tab']=='gear'){echo'_selected';}?>" href="?tab=gear">Gear</a>
<br />
<a class="AttireCategorySelector<?if($_GET['tab']=='packages'){echo'_selected';}?>" href="?tab=packages">Packages</a>
<br />
</div>
<div class="AttireContent">
<?php
if($_GET['tab']=='packages'){
$ownquery = $con->prepare("SELECT * FROM `owneditems` WHERE `userid`='$uID' AND `item` = 'Package'");
$ownquery->execute();
while($owned = $ownquery->fetch()) {
$id = $owned['itemid'];
$itemquery = $con->prepare("SELECT * from `library` WHERE `id` = :id");
$itemquery->execute(['id' => $id]);
$items = $itemquery->fetch();
$existquery = $con->prepare("SELECT * FROM `avataritems` WHERE `userid` = :userid AND `itemid` = :itemid");
$existquery->execute(['userid' => $uID, 'itemid' => $items['fileid']]);
$exist = $existquery->fetch();
if(is_array($exist)){
$wear = "Wearing";
}else{
$wear = "Wear";
}
?>
<div class="Asset">
<div class="AssetThumbnail">
<a title="click to <?=$wear;?>" onclick="" style="display:inline-block;height:110px;width:110px;cursor:pointer;"><img src="https://www.voidrev.us<?=getModelThumbnail($con,$items['id']);?>" height="110" width="110" border="0" alt="click to <?=$wear;?>" /></a>
<div style="position: absolute; right: -4px; text-align: center; top: 0;">
<a onclick="wear(<?=$items['id'];?>);" title="click to <?=$wear;?>" class="btn-small btn-neutral">
<?=$wear;?>
</a>
</div>
</div>
<div class="AssetDetails">
<div class="AssetName">
<a title="click to view" class="notranslate" href="https://www.voidrev.us/library?id=<?=$items['id'];?>"><?echo NOXSSPlz($items['name']);?></a>
</div>
<div class="AssetType">
<span class="Label">Type:</span> <span class="Detail">
Body Parts | Package
</span>
</div>
</div>
</div>
<? }} ?>
<?php
if($_GET['tab']=='gear'){
$ownquery = $con->prepare("SELECT * FROM `owneditems` WHERE `userid`='$uID' AND `item` = 'Gear'");
$ownquery->execute();
while($owned = $ownquery->fetch()) {
$id = $owned['itemid'];
$itemquery = $con->prepare("SELECT * from `library` WHERE `id` = :id");
$itemquery->execute(['id' => $id]);
$items = $itemquery->fetch();
$existquery = $con->prepare("SELECT * FROM `avataritems` WHERE `userid` = :userid AND `itemid` = :itemid");
$existquery->execute(['userid' => $uID, 'itemid' => $items['fileid']]);
$exist = $existquery->fetch();
if(is_array($exist)){
$wear = "Wearing";
}else{
$wear = "Wear";
}
?>
<div class="Asset">
<div class="AssetThumbnail">
<a title="click to <?=$wear;?>" onclick="" style="display:inline-block;height:110px;width:110px;cursor:pointer;"><img src="https://www.voidrev.us<?=getModelThumbnail($con,$items['id']);?>" height="110" width="110" border="0" alt="click to <?=$wear;?>" /></a>
<div style="position: absolute; right: -4px; text-align: center; top: 0;">
<a onclick="wear(<?=$items['id'];?>);" title="click to <?=$wear;?>" class="btn-small btn-neutral">
<?=$wear;?>
</a>
</div>
</div>
<div class="AssetDetails">
<div class="AssetName">
<a title="click to view" class="notranslate" href="https://www.voidrev.us/library?id=<?=$items['id'];?>"><?echo NOXSSPlz($items['name']);?></a>
</div>
<div class="AssetType">
<span class="Label">Type:</span> <span class="Detail">
Accessory | Gear
</span>
</div>
</div>
</div>
<? }} ?>
<?php
if($_GET['tab']=='faces'){
$ownquery = $con->prepare("SELECT * FROM `owneditems` WHERE `userid`='$uID' AND `item` = 'Face'");
$ownquery->execute();
while($owned = $ownquery->fetch()) {
$id = $owned['itemid'];
$itemquery = $con->prepare("SELECT * from `library` WHERE `id` = :id");
$itemquery->execute(['id' => $id]);
$items = $itemquery->fetch();
$faceexistquery = $con->prepare("SELECT * FROM `avataritems` WHERE `userid` = :userid AND `itemid` = :itemid");
$faceexistquery->execute(['userid' => $uID, 'itemid' => $items['fileid']]);
$faceexist = $faceexistquery->fetch();
if(is_array($faceexist)){
$wear = "Wearing";
}else{
$wear = "Wear";
}
?>
<div class="Asset">
<div class="AssetThumbnail">
<a title="click to <?=$wear;?>" onclick="" style="display:inline-block;height:110px;width:110px;cursor:pointer;"><img src="https://www.voidrev.us<?=getModelThumbnail($con,$items['id']);?>" height="110" width="110" border="0" alt="click to <?=$wear;?>" /></a>
<div style="position: absolute; right: -4px; text-align: center; top: 0;">
<a onclick="wear(<?=$items['id'];?>);" title="click to <?=$wear;?>" class="btn-small btn-neutral">
<?=$wear;?>
</a>
</div>
</div>
<div class="AssetDetails">
<div class="AssetName">
<a title="click to view" class="notranslate" href="https://www.voidrev.us/library?id=<?=$items['id'];?>"><?echo NOXSSPlz($items['name']);?></a>
</div>
<div class="AssetType">
<span class="Label">Type:</span> <span class="Detail">
Body Parts | Face
</span>
</div>
</div>
</div>
<? }} ?>
<?php
if($_GET['tab']=='accessories'){
$ownquery = $con->prepare("SELECT * FROM `owneditems` WHERE `userid`='$uID' AND `item` = 'Hat'");
$ownquery->execute();
while($owned = $ownquery->fetch()) {
$id = $owned['itemid'];
$itemquery = $con->prepare("SELECT * from `library` WHERE `id` = :id");
$itemquery->execute(['id' => $id]);
$items = $itemquery->fetch();
if(!is_array($items)){
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
$accessexistquery = $con->prepare("SELECT * FROM `avataritems` WHERE `userid` = :userid AND `itemid` = :itemid");
$accessexistquery->execute(['userid' => $uID, 'itemid' => $items['fileid']]);
$accessexist = $accessexistquery->fetch();
if(is_array($accessexist)){
$wear = "Wearing";
}else{
$wear = "Wear";
}
?>
<div class="Asset">
<div class="AssetThumbnail">
<a title="click to <?=$wear;?>" onclick="" style="display:inline-block;height:110px;width:110px;cursor:pointer;"><img src="https://www.voidrev.us<?=getModelThumbnail($con,$items['id']);?>" height="110" width="110" border="0" alt="click to <?=$wear;?>" /></a>
<div style="position: absolute; right: -4px; text-align: center; top: 0;">
<a onclick="wear(<?=$items['id'];?>);" title="click to <?=$wear;?>" class="btn-small btn-neutral">
<?=$wear;?>
</a>
</div>
</div>
<div class="AssetDetails">
<div class="AssetName">
<a title="click to view" class="notranslate" href="https://www.voidrev.us/library?id=<?=$items['id'];?>"><?echo NOXSSPlz($items['name']);?></a>
</div>
<div class="AssetType">
<span class="Label">Type:</span> <span class="Detail">
Clothing | Hat
</span>
</div>
</div>
</div>
<? }} ?>
<?php
if($_GET['tab']=='animations'){
$ownquery = $con->prepare("SELECT * FROM `owneditems` WHERE `userid`='$uID' AND `item` = 'Animation'");
$ownquery->execute();
while($owned = $ownquery->fetch()) {
$id = $owned['itemid'];
$itemquery = $con->prepare("SELECT * from `library` WHERE `id` = :id");
$itemquery->execute(['id' => $id]);
$items = $itemquery->fetch();
if(!is_array($items)){
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
$accessexistquery = $con->prepare("SELECT * FROM `avataritems` WHERE `userid` = :userid AND `itemid` = :itemid");
$accessexistquery->execute(['userid' => $uID, 'itemid' => $items['fileid']]);
$accessexist = $accessexistquery->fetch();
if(is_array($accessexist)){
$wear = "Wearing";
}else{
$wear = "Wear";
}
?>
<div class="Asset">
<div class="AssetThumbnail">
<a title="click to <?=$wear;?>" onclick="" style="display:inline-block;height:110px;width:110px;cursor:pointer;"><img src="https://www.voidrev.us<?=getModelThumbnail($con,$items['id']);?>" height="110" width="110" border="0" alt="click to <?=$wear;?>" /></a>
<div style="position: absolute; right: -4px; text-align: center; top: 0;">
<a onclick="wear(<?=$items['id'];?>);" title="click to <?=$wear;?>" class="btn-small btn-neutral">
<?=$wear;?>
</a>
</div>
</div>
<div class="AssetDetails">
<div class="AssetName">
<a title="click to view" class="notranslate" href="https://www.voidrev.us/library?id=<?=$items['id'];?>"><?echo NoXSSPlz($items['name']);?></a>
</div>
<div class="AssetType">
<span class="Label">Type:</span> <span class="Detail">
Animation
</span>
</div>
</div>
</div>
<? }} ?>
<?php
if($_GET['tab']=='emotes'){
$ownquery = $con->prepare("SELECT * FROM `owneditems` WHERE `userid`='$uID' AND `item` = 'Emote'");
$ownquery->execute();
while($owned = $ownquery->fetch()) {
$id = $owned['itemid'];
$itemquery = $con->prepare("SELECT * from `library` WHERE `id` = :id");
$itemquery->execute(['id' => $id]);
$items = $itemquery->fetch();
if(!is_array($items)){
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
$accessexistquery = $con->prepare("SELECT * FROM `avataritems` WHERE `userid` = :userid AND `itemid` = :itemid");
$accessexistquery->execute(['userid' => $uID, 'itemid' => $items['fileid']]);
$accessexist = $accessexistquery->fetch();
if(is_array($accessexist)){
$wear = "Wearing";
}else{
$wear = "Wear";
}
?>
<div class="Asset">
<div class="AssetThumbnail">
<a title="click to <?=$wear;?>" onclick="" style="display:inline-block;height:110px;width:110px;cursor:pointer;"><img src="https://www.voidrev.us<?=getModelThumbnail($con,$items['id']);?>" height="110" width="110" border="0" alt="click to <?=$wear;?>" /></a>
<div style="position: absolute; right: -4px; text-align: center; top: 0;">
<a onclick="wear(<?=$items['id'];?>);" title="click to <?=$wear;?>" class="btn-small btn-neutral">
<?=$wear;?>
</a>
</div>
</div>
<div class="AssetDetails">
<div class="AssetName">
<a title="click to view" class="notranslate" href="https://www.voidrev.us/library?id=<?=$items['id'];?>"><?echo NoXSSPlz($items['name']);?></a>
</div>
<div class="AssetType">
<span class="Label">Type:</span> <span class="Detail">
Emote
</span>
</div>
</div>
</div>
<? }} ?>
<?php
if($_GET['tab']=='shirts'){
$ownquery = $con->prepare("SELECT * FROM `owneditems` WHERE `userid`='$uID' AND `item` = 'Shirt'");
$ownquery->execute();
while($owned = $ownquery->fetch()) {
$id = $owned['itemid'];
$itemquery = $con->prepare("SELECT * from `library` WHERE `id` = :id");
$itemquery->execute(['id' => $id]);
$items = $itemquery->fetch();
$existquery = $con->prepare("SELECT * FROM `avataritems` WHERE `userid` = :userid AND `itemid` = :itemid");
$existquery->execute(['userid' => $uID, 'itemid' => $items['fileid']]);
$exist = $existquery->fetch();
if(is_array($exist)){
$wear = "Wearing";
}else{
$wear = "Wear";
}
?>
<div class="Asset">
<div class="AssetThumbnail">
<a title="click to <?=$wear;?>" onclick="" style="display:inline-block;height:110px;width:110px;cursor:pointer;"><img src="https://www.voidrev.us<?=getModelThumbnail($con,$items['id']);?>" height="110" width="110" border="0" alt="click to <?=$wear;?>" /></a>
<div style="position: absolute; right: -4px; text-align: center; top: 0;">
<a onclick="wear(<?=$items['id'];?>);" title="click to <?=$wear;?>" class="btn-small btn-neutral">
<?=$wear;?>
</a>
</div>
</div>
<div class="AssetDetails">
<div class="AssetName">
<a title="click to view" class="notranslate" href="https://www.voidrev.us/library?id=<?=$items['id'];?>"><?echo NOXSSPlz($items['name']);?></a>
</div>
<div class="AssetType">
<span class="Label">Type:</span> <span class="Detail">
Clothing | Shirts
</span>
</div>
</div>
</div>
<? }} ?>
<?php
if($_GET['tab']=='tshirts'){
$ownquery = $con->prepare("SELECT * FROM `owneditems` WHERE `userid`='$uID' AND `item` = 'TShirt'");
$ownquery->execute();
while($owned = $ownquery->fetch()) {
$id = $owned['itemid'];
$itemquery = $con->prepare("SELECT * from `library` WHERE `id` = :id");
$itemquery->execute(['id' => $id]);
$items = $itemquery->fetch();
$existquery = $con->prepare("SELECT * FROM `avataritems` WHERE `userid` = :userid AND `itemid` = :itemid");
$existquery->execute(['userid' => $uID, 'itemid' => $items['fileid']]);
$exist = $existquery->fetch();
if(is_array($exist)){
$wear = "Wearing";
}else{
$wear = "Wear";
}
?>
<div class="Asset">
<div class="AssetThumbnail">
<a title="click to <?=$wear;?>" onclick="" style="display:inline-block;height:110px;width:110px;cursor:pointer;"><img src="https://www.voidrev.us<?=getModelThumbnail($con,$items['id']);?>" height="110" width="110" border="0" alt="click to <?=$wear;?>" /></a>
<div style="position: absolute; right: -4px; text-align: center; top: 0;">
<a onclick="wear(<?=$items['id'];?>);" title="click to <?=$wear;?>" class="btn-small btn-neutral">
<?=$wear;?>
</a>
</div>
</div>
<div class="AssetDetails">
<div class="AssetName">
<a title="click to view" class="notranslate" href="https://www.voidrev.us/library?id=<?=$items['id'];?>"><?echo NOXSSPlz($items['name']);?></a>
</div>
<div class="AssetType">
<span class="Label">Type:</span> <span class="Detail">
Clothing | T-Shirts
</span>
</div>
</div>
</div>
<? }} ?>
<?php
if($_GET['tab']=='pants'){
$ownquery = $con->prepare("SELECT * FROM `owneditems` WHERE `userid`='$uID' AND `item` = 'Pants'");
$ownquery->execute();
while($owned = $ownquery->fetch()) {
$id = $owned['itemid'];
$itemquery = $con->prepare("SELECT * from `library` WHERE `id` = :id");
$itemquery->execute(['id' => $id]);
$items = $itemquery->fetch();
$existquery = $con->prepare("SELECT * FROM `avataritems` WHERE `userid` = :userid AND `itemid` = :itemid");
$existquery->execute(['userid' => $uID, 'itemid' => $items['fileid']]);
$exist = $existquery->fetch();
if(is_array($exist)){
$wear = "Wearing";
}else{
$wear = "Wear";
}
?>
<div class="Asset">
<div class="AssetThumbnail">
<a title="click to <?=$wear;?>" onclick="" style="display:inline-block;height:110px;width:110px;cursor:pointer;"><img src="https://www.voidrev.us<?=getModelThumbnail($con,$items['id']);?>" height="110" width="110" border="0" alt="click to <?=$wear;?>" /></a>
<div style="position: absolute; right: -4px; text-align: center; top: 0;">
<a onclick="wear(<?=$items['id'];?>);" title="click to <?=$wear;?>" class="btn-small btn-neutral">
<?=$wear;?>
</a>
</div>
</div>
<div class="AssetDetails">
<div class="AssetName">
<a title="click to view" class="notranslate" href="https://www.voidrev.us/library?id=<?=$items['id'];?>"><?echo NOXSSPlz($items['name']);?></a>
</div>
<div class="AssetType">
<span class="Label">Type:</span> <span class="Detail">
Clothing | Pants
</span>
</div>
</div>
</div>
<? }} ?>
</div>
</div>
</div>
</div>
<div id="tab_animations">
<div id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_UpdatePanelAnimations">
<div class="CustomizeCharacterContainer">
<div class="AttireCategory" style="text-align: center">
<a id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_AvatarAnimationsCategoryRepeater_ctl00_AvatarAnimationsCategorySelector" class="AttireCategorySelector_Selected" href="javascript:__doPostBack(&#39;ctl00$ctl00$cphRoblox$cphMyRobloxContent$AvatarAnimationsCategoryRepeater$ctl00$AvatarAnimationsCategorySelector&#39;,&#39;&#39;)">Run</a>
<a id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_AvatarAnimationsCategoryRepeater_ctl01_AvatarAnimationsCategorySelector" class="AttireCategorySelector" href="javascript:__doPostBack(&#39;ctl00$ctl00$cphRoblox$cphMyRobloxContent$AvatarAnimationsCategoryRepeater$ctl01$AvatarAnimationsCategorySelector&#39;,&#39;&#39;)">Walk</a>
<a id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_AvatarAnimationsCategoryRepeater_ctl02_AvatarAnimationsCategorySelector" class="AttireCategorySelector" href="javascript:__doPostBack(&#39;ctl00$ctl00$cphRoblox$cphMyRobloxContent$AvatarAnimationsCategoryRepeater$ctl02$AvatarAnimationsCategorySelector&#39;,&#39;&#39;)">Fall</a>
<a id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_AvatarAnimationsCategoryRepeater_ctl03_AvatarAnimationsCategorySelector" class="AttireCategorySelector" href="javascript:__doPostBack(&#39;ctl00$ctl00$cphRoblox$cphMyRobloxContent$AvatarAnimationsCategoryRepeater$ctl03$AvatarAnimationsCategorySelector&#39;,&#39;&#39;)">Jump</a>
<a id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_AvatarAnimationsCategoryRepeater_ctl04_AvatarAnimationsCategorySelector" class="AttireCategorySelector" href="javascript:__doPostBack(&#39;ctl00$ctl00$cphRoblox$cphMyRobloxContent$AvatarAnimationsCategoryRepeater$ctl04$AvatarAnimationsCategorySelector&#39;,&#39;&#39;)">Idle</a>
<a id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_AvatarAnimationsCategoryRepeater_ctl05_AvatarAnimationsCategorySelector" class="AttireCategorySelector" href="javascript:__doPostBack(&#39;ctl00$ctl00$cphRoblox$cphMyRobloxContent$AvatarAnimationsCategoryRepeater$ctl05$AvatarAnimationsCategorySelector&#39;,&#39;&#39;)">Swim</a>
<a id="ctl00_ctl00_cphRoblox_cphMyRobloxContent_AvatarAnimationsCategoryRepeater_ctl06_AvatarAnimationsCategorySelector" class="AttireCategorySelector" href="javascript:__doPostBack(&#39;ctl00$ctl00$cphRoblox$cphMyRobloxContent$AvatarAnimationsCategoryRepeater$ctl06$AvatarAnimationsCategorySelector&#39;,&#39;&#39;)">Climb</a>
</div>
</div>
</div>
</div>
</div>
</div>
</div>
<script type="text/javascript">
function switchTabs(nextTabElem) {
var currentTab = $('.tab-container div.tab.active');
currentTab.removeClass('active');
$('#' + currentTab.data('id')).hide();
nextTabElem.addClass('active');
$('#' + nextTabElem.data('id')).show();
}
$('div.tab').bind('click', function () {
switchTabs($(this));
});
</script>
<div class="divider-top" style="margin-top: 10px; padding-left: 20px; position: relative;"></div>
</div>
</div>
</div>
</div>
<br clear="all" />
</div>
<div style="clear:both"></div>
</div>
</div>
</div>
</div>
<footer class="container-footer">
<div class="footer">
<ul class="row footer-links">
<li class="col-4 col-xs-1 footer-link">
<a href="http://corp.voidrev.us" class="text-footer-nav roblox-interstitial" target="_blank">
About Us
</a>
</li>
<li class="col-4 col-xs-1 footer-link">
<a href="https://corp.voidrev.us/careers/" class="text-footer-nav roblox-interstitial" target="_blank">
Jobs
</a>
</li>
<li class="col-4 col-xs-1 footer-link">
<a href="http://blog.voidrev.us" class="text-footer-nav" target="_blank">
Blog
</a>
</li>
<li class="col-4 col-xs-1 footer-link">
<a href="http://corp.voidrev.us/parents" class="text-footer-nav roblox-interstitial" target="_blank">
Parents
</a>
</li>
<li class="col-4 col-xs-1 footer-link">
<a href="http://en.help.voidrev.us/" class="text-footer-nav roblox-interstitial" target="_blank">
Help
</a>
</li>
<li class="col-4 col-xs-1 footer-link">
<a href="https://www.voidrev.us/info/terms-of-service" class="text-footer-nav" target="_blank">
Terms
</a>
</li>
<li class="col-4 col-xs-1 footer-link">
<a href="https://www.voidrev.us/info/privacy" class="text-footer-nav privacy" target="_blank">
Privacy
</a>
</li>
</ul>
<!-- NOTE: "ROBLOX Corporation" is a healthcheck; be careful when updating! -->
<p class="text-footer footer-note">
&copy;2023 Limbo Corporation
</p>
</div>
</footer>
</div></div>
</div>
</div>
<?php include ($_SERVER['DOCUMENT_ROOT'].'/chat.php'); ?>
<div id="InstallationInstructions" class="" style="display:none;">
<div class="ph-installinstructions">
<div class="ph-modal-header">
<span class="icon-close simplemodal-close"></span>
<h3 class="title">Thanks for playing ROBLOX</h3>
</div>
<div class="modal-content-container">
<div class="ph-installinstructions-body ">
<ul class="modal-col-4">
<li class="step1-of-4">
<h2>1</h2>
<p class="larger-font-size">Click <strong>RobloxPlayer.exe</strong> to run the ROBLOX installer, which just downloaded via your web browser.</p>
<img data-delaysrc="https://www.voidrev.us/img/236c40e74d06db9a43dddb9f02dd6eee.png" />
</li>
<li class="step2-of-4">
<h2>2</h2>
<p class="larger-font-size">Click <strong>Run</strong> when prompted by your computer to begin the installation process.</p>
<img data-delaysrc="https://www.voidrev.us/img/4a3f96d30df0f7879abde4ed837446c6.png" />
</li>
<li class="step3-of-4">
<h2>3</h2>
<p class="larger-font-size">Click <strong>Ok</strong> once you've successfully installed ROBLOX.</p>
<img data-delaysrc="https://www.voidrev.us/img/25bca1222274f7f21fb86f6bdda806c9.png" />
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
The ROBLOX installer should download shortly. If it doesn’t, start the <a href="#" class="text-link" onclick="Roblox.ProtocolHandlerClientInterface.startDownload(); return false;">download now.</a>
</div>
</div>
</div>
<div class="InstallInstructionsImage" data-modalwidth="970" style="display:none;"></div>
<div id="pluginObjDiv" style="height:1px;width:1px;visibility:hidden;position: absolute;top: 0;"></div>
<iframe id="downloadInstallerIFrame" name="downloadInstallerIFrame" style="visibility:hidden;height:0;width:1px;position:absolute"></iframe>
<script type='text/javascript' src='https://www.voidrev.us/js/e2cb6070c58f829226a04307a3f3e28a.js'></script>
<script type="text/javascript">
Roblox.Client._skip = null;
Roblox.Client._CLSID = '76D50904-6780-4c8b-8986-1A7EE0B1716D';
Roblox.Client._installHost = 'setup.voidrev.us';
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
<div id="PlaceLauncherStatusPanel" style="display:none;width:300px"
data-new-plugin-events-enabled="True"
data-event-stream-for-plugin-enabled="True"
data-event-stream-for-protocol-enabled="True"
data-is-game-launch-interface-enabled="True"
data-is-protocol-handler-launch-enabled="True"
data-is-user-logged-in="True"
data-os-name="Windows"
data-protocol-name-for-client="roblox-player"
data-protocol-name-for-studio="roblox-studio"
data-protocol-url-includes-launchtime="true"
data-protocol-detection-enabled="true"
data-protocol-version="1">
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
<div id="ProtocolHandlerStartingDialog" style="display:none;" class="protocol-handler-container">
<div class="modalPopup ph-modal-popup">
<div class="ph-modal-header">
</div>
<div class="ph-logo-row">
<img data-delaysrc="https://www.voidrev.us/img/logo/logo_R.svg" width="90" height="90" alt="R" class="play-logo-image"/>
<img data-delaysrc="https://www.voidrev.us/img/logo/logo_R.svg" width="90" height="90" alt="R" class="studio-logo-image hidden"/>
</div>
<div class="ph-areyouinstalleddialog-content">
<p class="larger-font-size">
ROBLOX is now loading. Get ready to play!
</p>
<div class="ph-startingdialog-spinner-row">
<img data-delaysrc="https://www.voidrev.us/img/4bed93c91f909002b1f17f05c0ce13d1.gif" width="82" height="24" />
</div>
</div>
</div>
</div>
<div id="ProtocolHandlerAreYouInstalled" style="display:none;" class="protocol-handler-container">
<div class="modalPopup ph-modal-popup">
<div class="ph-modal-header">
<span class="icon-close simplemodal-close"></span>
</div>
<div class="ph-logo-row">
<img data-delaysrc="https://www.voidrev.us/img/6304dfebadecbb3b338a79a6a528936c.svg" width="90" height="90" alt="R" class="play-logo-image"/>
<img data-delaysrc="https://www.voidrev.us/img/3da410727fa2670dcb4f31316643138a.svg" width="90" height="90" alt="R" class="studio-logo-image hidden"/>
</div>
<div class="ph-areyouinstalleddialog-content">
<p class="larger-font-size">
You're moments away from getting into the game!
</p>
<div>
<button type="button" class="btn btn-primary-md" id="ProtocolHandlerInstallButton" data-updated-modal>
Download and Install ROBLOX
</button>
</div>
<div class="small">
<a href="https://en.help.voidrev.us/hc/en-us/articles/204473560" class="text-name" target="_blank">Click here for help</a>
</div>
</div>
</div>
</div>
<div id="ProtocolHandlerClickAlwaysAllowed"
class="ph-clickalwaysallowed"
style="display:none;">
<p class="larger-font-size">
<span class="icon-moreinfo"></span>
Check <b>Always open links for URL: Roblox Protocol</b> and click
<b>Open URL: Roblox Protocol</b>
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
<script type="text/javascript" src="//imasdk.googleapis.com/js/sdkloader/ima3.js"></script>
<script type="text/javascript">
$(function () {
var videoPreRollDFP = Roblox.VideoPreRollDFP;
if (videoPreRollDFP) {
var customTargeting = Roblox.VideoPreRollDFP.customTargeting;
videoPreRollDFP.showVideoPreRoll = true;
videoPreRollDFP.loadingBarMaxTime = 48000;
videoPreRollDFP.videoLoadingTimeout = 11000;
videoPreRollDFP.videoPlayingTimeout = 41015;
videoPreRollDFP.videoLogNote = "";
videoPreRollDFP.logsEnabled = true;
videoPreRollDFP.excludedPlaceIds = "32373412";
videoPreRollDFP.adUnit = "/1015347/VideoPrerollUnder13";
videoPreRollDFP.adTime = 30;
videoPreRollDFP.isSwfPreloaderEnabled = false;
videoPreRollDFP.isPrerollShownEveryXMinutesEnabled = true;
videoPreRollDFP.isAgeTargetingEnabled = true;
videoPreRollDFP.isAgeOrSegmentTargetingEnabled = true;
videoPreRollDFP.isCompanionAdRenderedByGoogleTag = true;
customTargeting.userAge = "10";
customTargeting.userAgeOrSegment = "U13";
customTargeting.userGender = "Male";
customTargeting.gameGenres = "";
customTargeting.environment = "Production";
customTargeting.adTime = "30";
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
<a href="https://www.voidrev.us/?returnUrl=https%3A%2F%2Fwww.voidrev.us%2Fmy%2Fcharacter.aspx"><div class="RevisedCharacterSelectSignup"></div></a>
<a class="HaveAccount" href="https://www.voidrev.us/newlogin?returnUrl=https%3A%2F%2Fwww.voidrev.us%2Fmy%2Fcharacter.aspx">I have an account</a>
</div>
</div>
</div>
</div>
<script type="text/javascript">
function checkRobloxInstall() {
return RobloxLaunch.CheckRobloxInstall('https://www.voidrev.us/install/download.aspx');
}
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
<div class="ConfirmationModalButtonContainer">
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
<script>
$(function () {
Roblox.DeveloperConsoleWarning.showWarning();
});
</script>
<?php include ($_SERVER['DOCUMENT_ROOT'].'/chat2.php'); ?>
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
<script>
var _comscore = _comscore || [];
_comscore.push({ c1: "2", c2: "6035605", c3: "", c4: "", c15: "" });
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
<div ng-modules="baseTemplateApp">
<script type="text/javascript" src="https://www.voidrev.us/js/31a888e7449bc0752caca1e3b92b8b9c.js"></script>
</div>
<div ng-modules="pageTemplateApp">
<script type="text/javascript" src="https://www.voidrev.us/js/92f28987bee2a763e372ef5af6b433e5.js"></script>
</div>
<div id="TosAgreementInfo"
data-tos-version="">
</div>
</body>
</html>
