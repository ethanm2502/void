<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php'); 
          $logged = false;
          if($_COOKIE['username'] && $_COOKIE['password'] || $_COOKIE['_ROBLOSECURITY']){
                   $username = filter_var($_COOKIE['username'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
                      $password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
                      $roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
                                    $usrquery = $con->prepare("SELECT * FROM `users` WHERE `username` = :username AND `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
                                    $usrquery->execute(['username' => $username, 'password' => $password, 'ROBLOSECURITY' => $roblosec]);
                                    $usr = $usrquery->fetch();
                        if($usr != 0){
                              $logged = true;
                               }
                      }
                      $timey = time(); 
					  $uID = $usr['id'];
                      $ExperimentalTheme = $usr['ExperimentalTheme'];
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" xmlns:fb="http://www.facebook.com/2008/fbml">
<link rel="stylesheet" href="https://www.voidrev.us/css/main.css"/>
<head data-machine-id="WEB2854">
    <!-- MachineID: WEB2854 -->
    <title>My Published Projects</title>
    
    
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' href='http://www.voidrev.us/css/publish.css' />
<link onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' rel='stylesheet' href='http://www.voidrev.us/css/publishupdate.css' />

<?php if($ExperimentalTheme == "Dark"){
?>
<link rel="stylesheet" href="https://www.voidrev.us/css/main.css"/>
<?php
}elseif($ExperimentalTheme == "Light"){
?>
<link rel="stylesheet" href="https://www.voidrev.us/css/main2.css"/>
<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600" rel="stylesheet" type="text/css">
<?php
}elseif($ExperimentalTheme == "2016E"){
?>
<link rel="stylesheet" href="https://www.voidrev.us/css/2016e.css"/>
<?
}elseif($ExperimentalTheme == "AprilFools"){
?>
<link rel="stylesheet" href="https://www.voidrev.us/css/aprilfools.css"/>
<?
}elseif($ExperimentalTheme == "newtheme"){
?>
<link rel="stylesheet" href="https://www.voidrev.us/css/newtheme.css"/>
<?
}else{
?>
<link rel="stylesheet" href="https://www.voidrev.us/css/main2.css"/>
<link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600" rel="stylesheet" type="text/css">
<?
}
?>


    <script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='studio' type='text/javascript' src='https://www.voidrev.us/js/3719f3fb35135d05cf6b72d5b0f46333.js'></script>


    <script type='text/javascript'>Roblox.config.externalResources = [];Roblox.config.paths['Pages.Catalog'] = 'https://www.voidrev.us/js/109d883fe3988fca757e26e341ed0fe8.js';Roblox.config.paths['Pages.CatalogShared'] = 'https://www.voidrev.us/js/bcba3a83febab35eb41f3a0b8b96db37.js';Roblox.config.paths['Widgets.AvatarImage'] = 'https://www.voidrev.us/js/7d49ac94271bd506077acc9d0130eebb.js';Roblox.config.paths['Widgets.DropdownMenu'] = 'https://www.voidrev.us/js/da553e6b77b3d79bec37441b5fb317e7.js';Roblox.config.paths['Widgets.HierarchicalDropdown'] = 'https://www.voidrev.us/js/4a0af9989732810851e9e12809aeb8ad.js';Roblox.config.paths['Widgets.ItemImage'] = 'https://www.voidrev.us/js/61a0490ba23afa17f9ecca2a079a6a57.js';Roblox.config.paths['Widgets.PlaceImage'] = 'https://www.voidrev.us/js/a6df74a754523e097cab747621643c98.js';</script>

    <script onerror='Roblox.BundleDetector && Roblox.BundleDetector.reportBundleError(this)' data-monitor='true' data-bundlename='page' type='text/javascript' src='https://www.voidrev.us/js/ef0183c0d9c6de80b589782211a8191c.js'></script>

    <script type="text/javascript">
if (typeof(Roblox) === "undefined") { Roblox = {}; }
Roblox.Endpoints = Roblox.Endpoints || {};
Roblox.Endpoints.Urls = Roblox.Endpoints.Urls || {};
Roblox.Endpoints.Urls['/asset/'] = 'https://assetgame.voidrev.us/asset/';
Roblox.Endpoints.Urls['/client-status/set'] = 'https://www.voidrev.us/client-status/set';
Roblox.Endpoints.Urls['/client-status'] = 'https://www.voidrev.us/client-status';
Roblox.Endpoints.Urls['/game/'] = 'https://assetgame.voidrev.us/game/';
Roblox.Endpoints.Urls['/game/edit.ashx'] = 'https://assetgame.voidrev.us/game/edit.ashx';
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
Roblox.Endpoints.Urls['/friends/list'] = 'https://www.voidrev.us/friends/list';
Roblox.Endpoints.Urls['/navigation/getcount'] = 'https://www.voidrev.us/navigation/getCount';
Roblox.Endpoints.Urls['/regex/email'] = 'https://www.voidrev.us/regex/email';
Roblox.Endpoints.Urls['/catalog/browse.aspx'] = 'https://www.voidrev.us/catalog/browse.aspx';
Roblox.Endpoints.Urls['/catalog/html'] = 'https://www.voidrev.us/catalog/html';
Roblox.Endpoints.Urls['/catalog/json'] = 'https://www.voidrev.us/catalog/json';
Roblox.Endpoints.Urls['/catalog/contents'] = 'https://www.voidrev.us/catalog/contents';
Roblox.Endpoints.Urls['/catalog/lists.aspx'] = 'https://www.voidrev.us/catalog/lists.aspx';
Roblox.Endpoints.Urls['/catalog/items'] = 'https://www.voidrev.us/catalog/items';
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


</head>
<body>
    



<div id="MyCreationsTab" class="boxed-body">
    <div class="BuildPageContent content" data-gear-menu-enabled="True">
        

<input id="assetTypeId" name="assetTypeId" type="hidden" value="9" />

<table id="build-page"
       data-asset-type-id="9"
       data-edit-opens-studio="True">
    <tr>
        <td class="menu-area divider-right">


                        <a href="https://www.voidrev.us/develop?View=9" class="tab-item tab-item-selected">Places</a>
        </td>

        <td class="content-area ">
                    <div class="creator-dashboard-redirection-banner" data-redirection-link="https://www.voidrev.us/develop" data-redirection-page-name="Label.ViewPlacesPageName"></div>
                    <table class="section-header">
                        <tr>
                            <td class="content-title">
                                <div>

                                    <h2 class="header-text">Places</h2>
                                                                                                        </div>
                            </td>
                                                    </tr>
                            <tr class="creation-context-breadcrumb" style="display: none">
                                <td style="height: 21px;">
                                    <div class="breadCrumb creation-context-breadcrumb">
                                        <a href="#breadcrumbs=gamecontext" class="breadCrumbContext">Context</a>
                                        <span class="context-game-separator" style="display: none"> » </span>
                                        <a href="#breadcrumbs=game" class="breadCrumbGame" style="display: none">Experience</a>
                                    </div>
                                </td>
                            </tr>
                    </table>
                    <div class="items-container games-container">


    <span id="verifiedEmail" style="display: none"></span>
    <span id="assetLinks" style="display:none" data-asset-links-enabled="False"></span>
  <?php
    $gamequery = $con->prepare("SELECT * FROM `library` WHERE `type`='game' AND `creatorid` = :creatorid");
    $gamequery->execute(['creatorid' => $uID]);
    while($games = $gamequery->fetch()) {
    $placeId = $games['id'];
    $placename = $games['name'];
	$icon = $games['icon'];
	$visits = $games['visits'];
	$updated = $games['updated'];
echo'
    <table class="item-table"
           data-item-id="'.$placeId.'"
           data-type="game"
           data-universeid="'.$placeId.'"
        <tr>
            <td class="image-col">
                <a href="https://www.voidrev.us/games/place?id='.$placeId.'" class="game-image" >
                    <img src="https://www.voidrev.us/img/games/'.$icon.'s.png" alt="'.NoXSSPlz($placename).'" />
                </a>
            </td>
            <td class="name-col">
                    <a class="title" href="javascript:;">'.NoXSSPlz($placename).'</a>
                <table class="details-table">
                    <tr>
                        <td class="item-date"><span>Updated:</span>'.$updated.'</td>
                    </tr>
                </table>
            </td>
            <td class="stats-col-games">
                <div class="totals-label">Total Visitors:<span>'.$visits.'</span></div>
            </td>
            <td class="edit-col">
                <a class="roblox-edit-button btn-control btn-control-large" href="javascript:;">Edit</a>
            </td>
            <td class="menu-col">
                <div class="gear-button-wrapper">
                    <a href="#" class="gear-button"></a>
                </div>
            </td>
        </tr>
    </table>
	<div class="separator"></div>
	';
	} ?>
    <a href="#" class="load-more-places btn-control btn-control-small">More Places</a>
                    </div>
                    <div class="build-loading-container" style="display: none">
                        <div class="buildpage-loading-container">
                            <img alt="^_^" class="" src="https://www.voidrev.us/img/ec4e85b0c4396cf753a06fade0a8d8af.gif" />
                        </div>
                    </div>

        </td>
    </tr>
</table>

<div id="build-dropdown-menu">
        <a href="#" data-href-template="">Configure Place</a>
                <a href="#" data-href-reference="developerstats-url" data-gameonly-link="true">Developer Stats</a>
            <a class="shutdown-all-servers-button" href="#">Shut Down All Servers</a>
</div>


<div class="GenericModal modalPopup unifiedModal smallModal" style="display: none;">
    <div class="Title"></div>
    <div class="GenericModalBody">
        <div>
            <div class="ImageContainer">
                <img class="GenericModalImage" alt="generic image" />
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
    Roblox.BuildPage.AlertURL = "https://www.voidrev.us/img/43ac54175f3f3cd403536fedd9170c10.png";
</script>

    </div>
    <div class="footer-button-container divider-top">
        <a  class="btn-medium btn-negative" id="closeButton">Close</a>
    </div>
</div>

<script type="text/javascript">
    if (typeof Roblox === "undefined") {
        Roblox = {};
    }
    if (typeof Roblox.BuildPage === "undefined") {
        Roblox.BuildPage = {};
    }
    Roblox.BuildPage.Resources = {
        active: "Public"
        , inactive: "Private"
        , activatePlace: "Make Place Public"
        , editGame: "Edit Experience"
        , ok: "OK"
        , robloxStudio: "Roblox Studio"
        , openIn: "To edit this experience, open to this page in "
        , placeInactive: "Make Place Private"
        , toBuileHere: "To build here, please activate this place by clicking the "
        , inactiveButton: "Inactive button. "
        , createModel: "Create Model"
        , toCreate: "To create models, please use "
        , makeActive: "Make Public"
        , makeInactive: "Make Private"
        , purchaseComplete: "Purchase Complete!"
        , youHaveBid: "You have successfully bid "
        , confirmBid: "Confirm the Bid"
        , placeBid: "Place Bid"
        , cancel: "Cancel"
        , errorOccurred: "Error Occurred"
        , adDeleted: "Ad Deleted"
        , theAdWasDeleted: "The Ad has been deleted."
        , confirmDelete: "Confirm Deletion"
        , areYouSureDelete: "Are you sure you want to delete this Ad? <br />Doing so will stop your Ad from showing but you will still be charged your budget."
        , bidRejected: "Your bid was Rejected"
        , bidRange: "Bid value must be a number between "
        , bidRange2: "Bid value must be a number greater than "
        , and: " and "
        , yourRejected: "Your bid was Rejected"
        , estimatorExplanation: "This estimator uses data from ads run yesterday to guess how many impressions your ad will recieve."
        , estimatedImpressions: "Estimated Impressions "
        , makeAdBid: "Make Ad Bid"
        , wouldYouLikeToBid: "Would you like to bid "
        , verify: "Verify"
        , emailVerifiedTitle: "Verify Your Email"
        , emailVerifiedMessage: "You must verify your email before you can work on your place. You can verify your email on the <a href='https://www.voidrev.us/my/account?confirmemail=1'>Account</a> page."
        , continueText: "Continue"
        , profileRemoveTitle: "Remove from profile?"
        , profileRemoveMessage: "This experience is private and listed on your profile, do you wish to remove it?"
        , profileAddTitle: "Add to profile?"
        , profileAddMessage: "This experience is public, but not listed on your profile, do you wish to add it?"
        , deactivateTitle: "Make Experience Private"
        , deactivateBody: "This will shut down any active servers <br /><br />Do you still want to make this experience private?"
        , deactivateButton: "Make Private"
        , questionmarkImgUrl: "https://www.voidrev.us/images/Buttons/questionmark-12x12.png"
        , activationRequestFailed: "Request to make experience public failed. Please retry in a few minutes!"
        , deactivationRequestFailed: "Request to make experience private failed. Please retry in a few minutes!"
        , tooManyActiveMessage: "You have reached the maximum number of public places for your membership level. Make one of your existing places private before making this place public."
        , activeSlotsMessage: "{0} of {1} public slots used"
    };
</script>



    <script type="text/javascript">function urchinTracker() {}</script>


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
