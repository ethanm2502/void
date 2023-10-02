<?php
include($_SERVER['DOCUMENT_ROOT'] . '/global.php');
$uID = $usr['id'];
$id = (int)$_GET['id'];
$itemquery = $con->prepare("SELECT * from `library` WHERE `id` = :id AND (`type` = 'item' OR `type` = 'item2')");
$itemquery->execute(['id' => $id]);
$items = $itemquery->fetch();
$itemgrantedquery = $con->prepare("SELECT * from `gifteditems` WHERE `itemid` = :itemid AND `userid` = :uID");
$itemgrantedquery->execute(['itemid' => $id, 'uID' => $uID]);
$itemgranted = $itemgrantedquery->fetch();
if ($items['fileid'] === 0) {
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
$ownquery = $con->prepare("SELECT count(*) FROM `owneditems` WHERE `userid` = :userid AND `itemid` = :itemid");
$ownquery->execute(['userid' => $uID, 'itemid' => $id]);
$number_of_rows = $ownquery->fetchColumn();
if ($number_of_rows > 0) {
$owned = 'disabled';
} else {
$owned = '';
}
if (!isset($_GET['id'])) {
http_response_code(404);
header('HTTP/1.0 404 Not Found', true, 404);
echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/errorpages/404.php');
exit();
}
if (!is_array($items)) {
http_response_code(404);
header('HTTP/1.0 404 Not Found', true, 404);
echo file_get_contents($_SERVER['DOCUMENT_ROOT'] . '/errorpages/404.php');
exit();
}
?>
<head data-machine-id="WEB2300">
<title><? echo NoXSSPlz($items['name']); ?> - Void</title>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="<? echo NoXSSPlz($items['description']); ?>" />
<meta property="og:title" content="<? echo NoXSSPlz($items['name']); ?> - Void" />
<meta property="og:type" content="game" />
<meta property="og:url" content="https://www.voidrev.us/library/?id=<?= $id; ?>" />
<meta property="og:description" content="<? echo NoXSSPlz($items['description']); ?>" />
<meta property="og:image" content="https://www.voidrev.us<?=getModelThumbnail($con,$id);?>" />
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="<? echo NoXSSPlz($items['name']); ?> - Void">
<meta name="twitter:description" content="<? echo NoXSSPlz($items['description']); ?>">
<meta name="twitter:creator" content="">
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' href='https://www.voidrev.us/css/leanbase.css' />
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' href='https://www.voidrev.us/css/librarypage.css' />
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' data-bundlename='Captcha' href='https://www.voidrev.us/css/d802dfd15776e71aa0fe8a47d133f7820dbb27eb394fe79a21e5be07aee85ce7.css' />
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' type='text/javascript' src='https://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.1.min.js'></script>
<script type='text/javascript'>window.jQuery || document.write("<script type='text/javascript' src='/js/jquery/jquery-1.11.1.js'><\/script>")</script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' type='text/javascript' src='https://ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.2.1.min.js'></script>
<script type='text/javascript'>window.jQuery || document.write("<script type='text/javascript' src='/js/jquery/jquery-migrate-1.2.1.js'><\/script>")</script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='headerinit' type='text/javascript' src='https://www.voidrev.us/js/14b0465ae5e9af6da2a5360328273186.js'></script>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
<div id="Leaderboard-Abp" class="abp leaderboard-abp">
<iframe name="Roblox_Item_Top_728x90"
allowtransparency="true"
frameborder="0"
height="110"
scrolling="no"
data-src=""
src="https://www.voidrev.us/user-sponsorship/?id=3"
width="728"
data-js-adtype="iframead"
data-ad-slot="Roblox_Item_Top_728x90"></iframe>
</div>
<div id="item-container"
class="page-content
menu-shown
library-item
"
data-item-id="<?=$id;?>"
data-item-type="Asset"
data-item-name="<?php echo NoXSSPlz($items['name']); ?>"
data-asset-type="<?php echo NoXSSPlz($items['type2']); ?>"
data-asset-type-display-name="<?php echo NoXSSPlz($items['type2']); ?>"
data-userasset-id=""
data-is-purchase-enabled="<?php if($items['offsale'] == 0){echo"true";}else{echo"false";}?>"
data-product-id="<?php echo ($items['id']); ?>"
data-bc-requirement=""
data-expected-currency="1"
data-expected-price="<?php echo ($items['robux']); ?>"
data-seller-name="<?php echo NoXSSPlz($items['creatorname']); ?>"
data-expected-seller-id="<?php echo ($items['creatorid']); ?>"
data-lowest-private-sale-userasset-id=""
data-is-limited-unique="<?php if($items['limited'] == 2){echo"true";}else{echo"false";}?>"
data-user-id="<?php echo ($uID); ?>"
data-asset-granted="<?php if(is_array($itemgranted)){echo"true";}else{echo"false";}?>"
data-forward-url=""
data-avatar-wear-url="https://www.voidrev.us/my/wear?id=<?php echo ($items['id']); ?>"
data-avatar-remove-url="https://www.voidrev.us/my/wear?id=<?php echo ($items['id']); ?>"
data-current-time="<?=date("m/d/Y g:i:s A");?>">
<div class="system-feedback">
<div class="alert-system-feedback">
<div class="alert alert-success">Purchase Completed</div>
</div>
<div class="alert-system-feedback">
<div class="alert alert-warning">Error occurred</div>
</div>
</div>
<div class="section-content top-section">
<div class="border-bottom item-name-container">
<h2><?php echo NOXSSPlz($items['name']); ?></h2>
<div>
<span class="text-label">By <a href='https://www.voidrev.us/users/<?php echo ($items['creatorid']); ?>/profile/' class='text-name'><?php echo NoXSSPlz($items['creatorname']); ?></a></span>
<?php if($owned == 'disabled'){ ?>
<div class="label-checkmark">
<span class="icon-checkmark-white-bold"></span>
</div>
<span>Item Owned</span>
<? } ?>
</div>
</div>
<div class="item-thumbnail-container ">
<div id="use-dynamic-thumbnail-lighting" class="hidden" data-use-dynamic-thumbnail-lighting="True"></div>
<div id="AssetThumbnail" class="asset-thumb-container thumbnail-holder
thumbnail-Large
three-dee-static"
data-reset-enabled-every-page
three-dee-static
data-3dtype="static"
<?php
if($items['type2'] == "Model" || $items['type2'] == "Mesh" || $items['type2'] == "Shirt" || $items['type2'] == "TShirt" || $items['type2'] == "Pants" || $items['type2'] == "Hat" || $items['type2'] == "Gear" || $items['type2'] == "Package"){
echo'data-3d-thumbs-enabled';
}
?>
data-url="/thumbnail/asset?assetId=<?=$id;?>&amp;thumbnailFormatId=254&amp;width=420&amp;height=420">
<div id="current-animation-name"></div>
<span class="thumbnail-span" ><img class='' src='https://www.voidrev.us<?=getModelThumbnail($con,$id);?>'/></span><span class="thumbnail-span-original hidden" data-3d-url="/asset-thumbnail-3d/json?assetId=<?=$id;?>"><img class='' src='https://www.voidrev.us<?=getModelThumbnail($con,$id);?>'/></span> <div class="equipped-marker"></div>
<div class="thumbnail-buttons">
<?php
if($items['type2'] == "Model" || $items['type2'] == "Mesh" || $items['type2'] == "Shirt" || $items['type2'] == "TShirt" || $items['type2'] == "Pants" || $items['type2'] == "Hat" || $items['type2'] == "Gear" || $items['type2'] == "Package"){
// again the classic tale of wumbo
// this could probs be done better
echo'
<button class="border enable-three-dee three-dee-static-icon thumb-interactive-btn btn-control-md" style="visibility: visible;">3D</button>
';}?>
</div>
<?php if($items['type2'] == "Sound"){?>
<div class="MediaPlayerControls">
<div class="MediaPlayerIcon icon-play" data-mediathumb-url="https://www.voidrev.us/asset/?id=<?=$items['realfileid'];?>" data-jplayer-version="2.9.2">
</div>
</div>
<? } ?>
</div>
<script type="text/javascript">
(function () {
if (Roblox && Roblox.Performance) {
Roblox.Performance.setPerformanceMark("itemReskin_thumbnail_loaded");
}
})();
</script>
</div>
<div id="item-details" class="content-overflow-toggle content-height content-overflow-page-loading item-details">
<div class="clearfix price-container">
<div class="price-container-text">
<?php if($items['offsale'] == 1){echo'<div class="item-first-line">This item is not currently for sale.</div>';}?>
<?php
if ($items['offsale'] == 0) {
if ($items['Robux'] > 0) { ?>
<div class="text-label field-label price-label">Price</div>
<div class="icon-text-wrapper clearfix icon-robux-price-container">
<span class="icon-robux wait-for-i18n-format-render"></span>
<span class="text-robux-lg"><?php echo robloxNumberFormat($items['Robux']); ?></span>
</div>
<? } else { ?>
<div class="text-label field-label price-label">Price</div>
<div class="icon-text-wrapper clearfix icon-robux-price-container">
<span class="text-robux-lg">Free</span>
</div>
<? } ?>
<? } ?>
</div>
<div class="action-button">
<?php if($number_of_rows > 0){echo'
<button type="button" class="btn-fixed-width-lg btn-primary-lg" disabled="">Buy</button>
';}else{
?>
<button type="button" class="btn-fixed-width-lg btn-primary-lg PurchaseButton" data-button-type="main" <?php if($items['offsale'] == 1){echo'disabled';}?> data-button-action="get" data-expected-price="<?=$items['Robux'];?>" data-bc-requirement="0" data-product-id="<?=$items['id'];?>" data-item-id="<?=$items['id'];?>" data-item-name="<?php echo NOXSSPlz($items['name']);?>" data-asset-type="<?php echo NOXSSPlz($items['type2']);?>" data-asset-type-display-name="<?php echo NOXSSPlz($items['type2']);?>" data-item-type="Asset" data-expected-currency="1" data-expected-seller-id="<?php echo ($items['creatorid']);?>" data-seller-name="<?php echo NOXSSPlz($items['creatorname']);?>" data-userasset-id="">
<?php if($ItemRobux > 0){echo"Buy";}else{echo"Get";} ?>
</button>
<?php
}
?>
</div>
</div>
<div class="clearfix item-mobile-description item-field-container">
<pre class="description-content"><? echo NoXSSPlz($items['description']); ?></pre>
</div>
<div class="clearfix item-type-field-container">
<div class="text-label text-overflow field-label">Type</div>
<span class="field-content"><?php echo NOXSSPlz($items['type2']); ?></span>
</div>
<div class="clearfix item-field-container">
<div class="text-label text-overflow field-label">Genres</div>
<div class="field-content">
<a class="text-name item-genre" href="https://www.voidrev.us/develop/library">
<?php echo NOXSSPlz($items['genre']); ?>
</a> </div>
</div>
<?php if($items['type2'] == "Sound"){
?>
<div class="clearfix item-field-container">
<div class="text-label field-label">Sound ID</div>
<span class="field-content"><?php echo ($items['realfileid']); ?></span>
</div>
<?
}
?>
<?php if($items['type2'] == "Decal"){
?>
<div class="clearfix item-field-container">
<div class="text-label field-label">Image ID</div>
<span class="field-content"><?php echo ($items['realfileid']); ?></span>
</div>
<?
}
?>
<?php if($items['type2'] == "Mesh"){
?>
<div class="clearfix item-field-container">
<div class="text-label field-label">Mesh ID</div>
<span class="field-content"><?php echo ($items['fileid']); ?></span>
</div>
<?
}
?>
<?php if($items['type2'] == "Video"){
?>
<div class="clearfix item-field-container">
<div class="text-label field-label">Video ID</div>
<span class="field-content"><?php echo ($items['realfileid']); ?></span>
</div>
<?
}
?>
<div class="clearfix item-field-container">
<div class="text-label text-overflow field-label">Updated</div>
<div class="field-content">
<?php echo date("m/d/Y", $items['updated']); ?> </div>
</div>
<div class="clearfix toggle-target item-field-container">
<div class="text-label text-overflow field-label">Description</div>
<pre id="item-details-description" class="content-overflow-toggle content-height content-overflow-page-loading field-content description-content"><?php echo NoXSSPlz($items['description']); ?><span class="hidden toggle-content" data-container-id="item-details-description" data-show-label="Read More" data-hide-label="Show Less">Read More</span></pre>
</div>
<div class="hide show-more-end" data-container-id="item-details"></div>
<button type="button" class="hidden btn-full-width btn-control-md toggle-content" data-container-id="item-details" data-show-label="Read More" data-hide-label="Show Less">Read More</button>
</div>
<ul class="item-social-container clearfix include-favorite ">
<li class="favorite-button-container">
<div class="tooltip-container" data-toggle="tooltip" title="" data-original-title="Add to Favorites">
<a id="toggle-favorite" data-toggle-url="/v2/favorite/toggle" data-targetId="<?=$id;?>" data-isguest="False" data-favoriteType="Asset"
data-signin-url="https://www.voidrev.us/newlogin?returnUrl=%2Flibrary%2F<?=$id;?>%2F<?php echo NOXSSPlz($items['name']); ?>">
<span title="<? echo ($items['favorite']); ?>" class="text-favorite favoriteCount <? echo ($items['favorite']); ?>" id="result"><? echo ($items['favorite']); ?></span>
<div id="favorite-icon" class="icon-favorite "></div>
</a>
</div>
</li>
</ul>
<div id="item-context-menu">
<a class="rbx-menu-item item-context-menu" data-toggle="popover" data-bind="popover-content">
<span class="icon-more"></span>
</a>
<div class="rbx-popover-content" data-toggle="popover-content">
<ul class="dropdown-menu" role="menu">
<?php
if($items['creatorid'] == $uID){
?>
<li>
<a id="configure-item" class="configure-item-modal" href="https://www.voidrev.us/library/configure?id=<?=$id;?>">
Configure
</a>
</li>
<li>
<a id="archive-item" class="archive-item-modal" href="https://www.voidrev.us/library/archive?assetId=<?=$id;?>">
Archive
</a>
</li>
<? } ?>
<li>
<a id="report-item" class="abuse-report-modal" href="https://www.voidrev.us/abusereport/asset?id=<?=$id;?>&amp;RedirectUrl=https%3a%2f%2fwww.voidrev.us%2flibrary%2f<?=$id;?>%2f<?php echo NOXSSPlz($items['name']); ?>">
Report Item
</a>
</li>
</ul>
</div>
</div>
</div>
<div ng-modules="robloxApp, recommendations">
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.InventoryData = {"inventoryDomain":"https://www.voidrev.us","useInventorySite":true};
</script>
<div class="current-items" ng-controller="recommendationsController" ng-init="initializeWithModelValues(<?=$id;?>, 3, 7)" ng-show="recommendationsData.items.length > 0" ng-cloak>
<div class="container-list recommendations-container">
<div class="container-header recommendations-header">
<h3 ng-if="!appMeta.isI18nEnabled">Recommended {{ recommendationsData.assetTypeName | capitalize }}</h3>
<h3 ng-if="appMeta.isI18nEnabled">
<span ng-if="defaultAssetTypeName == recommendationsData.assetTypeName" ng-bind="'Heading.RecommendedItems' | translate | capitalize"></span>
<span ng-if="defaultAssetTypeName != recommendationsData.assetTypeName" ng-bind="'Heading.RecommendationsTitle' | translate"></span>
</h3>
</div>
<div class="recommended-items-slider">
<ul class="hlist item-cards recommended-items" ng-class="{'item-cards-embed' : recommendationsLayout.numberOfItemsToDisplay < 7}">
<li ng-repeat="item in recommendationsData.items" class="list-item item-card recommended-item">
<div class="item-card-container recommended-item-link">
<a ng-href="{{item.Item.AbsoluteUrl}}" class="item-card-link">
<div class="item-card-thumb-container recommended-thumb">
<img ng-src="{{item.Thumbnail.Url}}"
thumbnail='item.Thumbnail' image-retry class="item-card-thumb"/>
<span ng-show="item.AssetRestrictionIcon"
ng-class="'icon-' + item.AssetRestrictionIcon.CssTag + '-label'">
</span>
</div>
<div class="item-card-name recommended-name" title="{{ item.Item.Name }}">{{ item.Item.Name }}</div>
</a>
<div ng-if="item.Item.AudioUrl" class="MediaPlayerControls">
<div class="MediaPlayerIcon icon-play" data-mediathumb-url="{{item.Item.AudioUrl}}" data-jplayer-version="2.9.2">
</div>
</div>
<div ng-if="!appMeta.isI18nEnabled" class="text-overflow item-card-creator recommended-creator">
<span class="xsmall text-label recommended-creator-by">By</span>
<a class="xsmall text-overflow text-link" ng-href="{{item.Creator.CreatorProfileLink}}">{{ item.Creator.Name }}</a>
</div>
<div ng-if="appMeta.isI18nEnabled" class="text-overflow item-card-creator recommended-creator">
<span ng-bind-html="'Label.ByCreator'| translate:{styleBegin: getByHtml(), styleEnd: '</span>', creator: getCreatorHtml(item.Creator.CreatorProfileLink, item.Creator.Name)}"></span>
</div>
<div class="text-overflow item-card-price">
<span class="icon-robux-16x16" ng-show="item.HasPrice"></span>
<span class="text-robux" ng-show="item.HasPrice">{{ item.Item.Price | abbreviate : 1 }}</span>
<span class="text-label" ng-hide="item.HasPrice">
<span class="text-overflow font-caption-body"
ng-if="item.Product.NoPriceText.length > 0"
ng-class="{'text-robux': item.Product.IsFree}">
{{item.Product.NoPriceText}}
</span>
</span>
</div>
</div>
</li>
</ul>
</div>
</div>
</div>
<script type="text/javascript">
var Roblox = Roblox || {};
Roblox.I18nData = Roblox.I18nData || {};
Roblox.I18nData.isI18nForRecommendationsEnabled = true;
</script>
</div>
<script src="https://roblox-api.arkoselabs.com/fc/api/" async></script>
<script type="text/javascript">
var Roblox = Roblox || {};
$(function () {
var funCaptcha = Roblox.FunCaptcha;
if (funCaptcha) {
var captchaTypes = [{"Type":"PostComment","PublicKey":"63E4117F-E727-42B4-6DAA-C8448E9B137F","ApiUrl":"https://captcha.voidrev.us/v1/funcaptcha/user"}];
funCaptcha.addCaptchaTypes(captchaTypes, true);
funCaptcha.setMaxRetriesOnTokenValidationFailure(3);
funCaptcha.setPerAppTypeLoggingEnabled(true);
funCaptcha.setRetryIntervalRange(500, 1500);
}
});
// Necessary because of how FunCaptcha js executes callback
// i.e. window["{function name}"]
function reportFunCaptchaLoaded()
{
if (Roblox.BundleDetector)
{
Roblox.BundleDetector.reportResourceLoaded("funcaptcha");
}
}
</script>
<div>
<div id="AjaxCommentsContainer" class="comments-container"
data-asset-id="<?=$id;?>"
data-total-collection-size=""
data-is-user-authenticated="True"
data-signin-url="https://www.voidrev.us/newlogin?returnUrl=%2Flibrary%2F<?=$id;?>%2F<?php echo NOXSSPlz($items['name']); ?>"
data-account-url="https://www.voidrev.us/my/account?confirmemail=1"
data-newline-limit="10"
data-character-limit="200"
data-filter-enabled="true"
data-fun-captcha-enabled="true">
<div class="container-header">
<h3>Comments</h3>
</div>
<div class="section-content AddAComment">
<captcha>
<div class="modal" id="comments-fun-captcha-container">
<div class="modal-dialog">
<div class="modal-content">
<div class="modal-body">
<div id="comments-fun-captcha" class="captchav2-funcaptcha-modal-body"></div>
</div>
</div>
</div>
</div>
</captcha>
<div class="comment-form">
<form class="form-horizontal ng-pristine ng-valid" role="form">
<div class="form-group">
<textarea class="form-control input-field rbx-comment-input blur" placeholder="Write a comment!" rows="1"></textarea>
<div class="rbx-comment-msgs">
<span class="rbx-comment-error text-error text-overflow"></span>
<span class="rbx-comment-count small text"></span>
</div>
</div>
<button type="button" class="btn-secondary-md rbx-post-comment">Post Comment</button>
</form>
</div>
<div class="comments vlist">
</div>
<div class="comments-item-template">
<div class="comment-item list-item">
<div class="comment-user list-header">
<div class="Avatar avatar avatar-headshot-md" data-user-id="comment-author-id" data-image-size="small"></div>
</div>
<div class="comment-body list-body">
<a class="text-name">username</a>
<p class="comment-content list-content">text</p>
<span class="xsmall text-date-hint">4 hours ago</span>
</div>
<div class="comment-controls">
<a class="rbx-comment-report-link abuse-report-modal" href="https://www.voidrev.us/abusereport/comment?id=%CommentID&amp;RedirectUrl=%PageURL" title="Report Abuse"><span class="icon-flag"></span></a>
</div>
</div>
</div>
<div class="loader-template">
<div class="loading-animated">
<div>
<div></div>
<div></div>
<div></div>
</div>
</div>
</div>
<div id="AjaxCommentsMoreButtonContainer" class="ajax-comments-more-button-container">
<button type="button" class="btn-control-sm rbx-comments-see-more hidden">See More</button>
</div>
</div>
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
<div id="ItemPurchaseAjaxData"
data-has-currency-service-error="False"
data-currency-service-error-message=""
data-authenticateduser-isnull="False"
data-user-balance-robux="<?=$Robux;?>"
data-user-bc="0"
data-continueshopping-url="https://www.voidrev.us/library/<?=$id;?>/<?php echo NOXSSPlz($items['name']); ?>"
data-imageurl ="https://www.voidrev.us<?=getModelThumbnail($con,$id);?>"
data-alerturl ="https://www.voidrev.us/img/75af9e2cb6a75450bee5245f5ee11c86.svg"
data-inSufficentFundsurl ="https://www.voidrev.us/img/b80339ddf867ccfe6ab23a2c263d8000.png"
>
</div>
<div id="Skyscraper-Abp-Right" class="abp abp-container right-abp">
<iframe name="Roblox_Item_Right_160x600"
allowtransparency="true"
frameborder="0"
height="612"
scrolling="no"
data-src=""
src="https://www.voidrev.us/user-sponsorship/?id=1"
width="160"
data-js-adtype="iframead"
data-ad-slot="Roblox_Item_Right_160x600"></iframe>
</div>
</div>
</div>
<footer class="container-footer">
<div class="footer">
<ul class="row footer-links">
<li class="footer-link">
<a href="http://corp.voidrev.us" class="text-footer-nav roblox-interstitial" target="_blank">
About Us
</a>
</li>
<li class="footer-link">
<a href="https://corp.voidrev.us/careers/" class="text-footer-nav roblox-interstitial" target="_blank">
Jobs
</a>
</li>
<li class=" footer-link">
<a href="https://blog.voidrev.us" class="text-footer-nav" target="_blank">
Blog
</a>
</li>
<li class=" footer-link">
<a href="http://corp.voidrev.us/parents" class="text-footer-nav roblox-interstitial" target="_blank">
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
&#169;2018 Roblox Corporation. Roblox, the Roblox logo and Powering Imagination are among our registered and unregistered trademarks in the U.S. and other countries.
</p>
</div>
</footer>
</div>
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
loader: "<img src='https://www.voidrev.us/img/4bed93c91f909002b1f17f05c0ce13d1.gif' width='82' height='24' class='loader'/>"
}
};
</script>
<div id="PlaceLauncherStatusPanel" style="display:none;width:300px"
data-new-plugin-events-enabled="True"
data-event-stream-for-plugin-enabled="True"
data-event-stream-for-protocol-enabled="True"
data-is-game-launch-interface-enabled="True"
data-is-protocol-handler-launch-enabled="True"
data-is-user-logged-in="False"
data-os-name="Windows"
data-protocol-name-for-client="roblox-player"
data-protocol-name-for-studio="roblox-studio"
data-protocol-roblox-locale="en_us"
data-protocol-game-locale="en_us"
data-protocol-url-includes-launchtime="true"
data-protocol-detection-enabled="true"
data-protocol-separate-script-parameters-enabled="true"
data-protocol-avatar-parameter-enabled="false"
data-protocol-sending-locales-enabled="true"
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
videoPreRollDFP.adUnit = "/1015347/VideoPrerollUnder13";
videoPreRollDFP.adTime = 15;
videoPreRollDFP.includedPlaceIds = "707652019,447452406,461482416,2563455047,2056459358";
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
<script type="text/javascript">
function checkRobloxInstall() {
return RobloxLaunch.CheckRobloxInstall('https://www.voidrev.us/install/download.aspx');
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
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='leanbase' type='text/javascript' src='https://www.voidrev.us/js/0a209f62d3cc2dd6843ae82901bb146b.js'></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='angular' type='text/javascript' src='https://www.voidrev.us/js/4ad460973d56d109a2980bea72969f5c.js'></script>
<div ng-modules="baseTemplateApp">
<script type="text/javascript" src="https://www.voidrev.us/js/f6f21acbca51f8beeba773a02c6ec91a.js"></script>
</div>
<div ng-modules="pageTemplateApp">
<script type="text/javascript" src="https://www.voidrev.us/js/eb35ad3f38cf3bd885031e4123983876.js"></script>
</div>
<script type='text/javascript'>Roblox.config.externalResources = [];Roblox.config.paths['Pages.Catalog'] = 'https://www.voidrev.us/js/baa0c90950583c77f295ecd0748e32ce.js';Roblox.config.paths['Pages.CatalogShared'] = 'https://www.voidrev.us/js/fac702cb852bab6006d426d83c56f8ab.js';Roblox.config.paths['Widgets.AvatarImage'] = 'https://www.voidrev.us/js/76e30b0ae6a1be83cbf018579681b891.js';Roblox.config.paths['Widgets.DropdownMenu'] = 'https://www.voidrev.us/js/c948a7edd36e01db699c8cf19303376d.js';Roblox.config.paths['Widgets.GroupImage'] = 'https://www.voidrev.us/js/3afc03adcc2aaca01500baaf69b52d9c.js';Roblox.config.paths['Widgets.HierarchicalDropdown'] = 'https://www.voidrev.us/js/c90aea1e430a241776db6775e98c3e03.js';Roblox.config.paths['Widgets.ItemImage'] = 'https://www.voidrev.us/js/de56e6c24a3e70ee7d1ec900c24042e8.js';Roblox.config.paths['Widgets.PlaceImage'] = 'https://www.voidrev.us/js/6003f8790df31d5445169faea5c04fd7.js';</script>
<script>
Roblox.XsrfToken.setToken('ti3lgfq000kh');
</script>
<script>
$(function () {
Roblox.DeveloperConsoleWarning.showWarning();
});
</script>
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
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='page' type='text/javascript' src='https://www.voidrev.us/js/b79203e5a57b2b957ee8d1382ee43154.js'></script>
<script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='Captcha' type='text/javascript' src='https://www.voidrev.us/js/e4757f8a515c91e5570b049fa12ffbea59ea4f36393b5940878e02685199f2f5.js'></script>
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
</body>
</html>