<?php
header("Content-Type: application/json; charset=utf-8");

// Include necessary files
include($_SERVER['DOCUMENT_ROOT'] . '/config/includes.php');

// Check if password or ROBLOSECURITY cookie is set
if ($_COOKIE['password'] || $_COOKIE['_ROBLOSECURITY']) {
    $password = filter_var($_COOKIE['password'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
    $roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
    
    // Prepare and execute user query
    $usrquery = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
    $usrquery->execute(['password' => $password, 'ROBLOSECURITY' => $roblosec]);
    $usr = $usrquery->fetch();
    
    // Check if user exists
    $logged = ($usr != 0);
}

// Get user ID and URL information
$userId = isset($usr['id']) ? $usr['id'] : null;
$url = $_SERVER['REQUEST_URI'];
$testurl = str_replace(["/places/", "/settings"], "", $url);
$gameid = (int)$testurl;

// Prepare and execute game query
$libquery = $con->prepare("SELECT id, name, description, creatorid, active, MaxPlayers FROM `games` WHERE `id` = :assetId AND `creatorid` = :userId");
$libquery->execute(['assetId' => $gameid, 'userId' => $userId]);
$libfinal = $libquery->fetch();

// Check if game exists
if (is_array($libfinal)) {
    $gamename = $libfinal['name'];
    $description = $libfinal['description'];
    $creatorid = $libfinal['creatorid'];
    $MaxPlayers = $libfinal['MaxPlayers'];
    
    // Prepare and execute creator query
    $crequery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
    $crequery->execute(['id' => $creatorid]);
    $cre = $crequery->fetch();
    $creatorname = $cre['username'];
} else {
    // Game not found, return an empty JSON object and terminate
    die("{}");
}

// Construct JSON data
$json = [
    "ID" => $gameid,
    "DefaultUserName" => $creatorname,
    "DefaultPlaceNumber" => $gameid,
    "Name" => $gamename,
    "Description" => $description,
    "DescriptionMaxCharacterCount" => 1000,
    "Genre" => "All",
    "Access" => "Everyone",
    "IsPublic" => false,
    "DeviceSectionHeader" => null,
    "SellGameAccessSectionHeader" => null,
    "ShouldShowStartPlaceNameOrDescriptionUpdateAlsoUpdatesGames" => false,
    "NumberOfMaxPlayersList" => [
        1, 2, 3
    ],
    "NumberOfPlayersList" => [
        1, 2, 3
    ],
    "IsAllGenresAllowed" => false,
    "AllowedGearTypes" => [
        ["GearTypeDisplayName" => "Melee", "IsSelected" => false, "EncodedBitMask" => "1"],
        ["GearTypeDisplayName" => "Power ups", "IsSelected" => false, "EncodedBitMask" => "8"],
        ["GearTypeDisplayName" => "Ranged", "IsSelected" => false, "EncodedBitMask" => "2"],
        ["GearTypeDisplayName" => "Navigation", "IsSelected" => false, "EncodedBitMask" => "16"],
        ["GearTypeDisplayName" => "Explosives", "IsSelected" => false, "EncodedBitMask" => "4"],
        ["GearTypeDisplayName" => "Musical", "IsSelected" => false, "EncodedBitMask" => "32"],
        ["GearTypeDisplayName" => "Social", "IsSelected" => false, "EncodedBitMask" => "64"],
        ["GearTypeDisplayName" => "Transport", "IsSelected" => false, "EncodedBitMask" => "256"],
        ["GearTypeDisplayName" => "Building", "IsSelected" => false, "EncodedBitMask" => "128"]
    ],
    "ChatType" => "ClassicAndBubble",
    "IsCopyingAllowed" => false,
    "IsCommentsAllowed" => true,
    "NumberOfPlayersMax" => $MaxPlayers,
    "NumberOfPlayersPreferred" => $MaxPlayers,
    "NumberOfCustomSocialSlots" => 10,
    "IsSocialSlotTypesEnabled" => true,
    "SocialSlotType" => 1,
    "SellGameAccess" => false,
    "ShowAllowPrivateServers" => true,
    "ArePrivateServersAllowed" => true,
    "PrivateServersPrice" => 0,
    "PrivateServerMinPrice" => 0,
    "MarketplaceTaxRate" => 0.9,
    "ActivePrivateServersCount" => 0,
    "ActivePrivateServersSubscriptionsCount" => 0,
    "PrivateServerConfigurationLink" => "https://develop.voidrev.us/v1/universes//configuration/vip-servers",
    "Price" => 0,
    "PrivateServersHelpLink" => null,
    "OverridesDefaultAvatar" => false,
    "UsePortraitMode" => false,
    "BCSellRequirement" => null,
    "BCSellReqirementMet" => true,
    "SellingVisible" => true,
    "BCSellReqirementText" => "Pay to Play places are a premium feature only available to users with None.",
    "Creator" => [
        "Name" => $creatorname,
        "CreatorTargetId" => $creatorid,
        "CreatorType" => 0
    ],
    "PublishStep" => 0,
    "MaxPublishStepReached" => 0,
    "PlayableDevices" => [
        ["DeviceType" => 1, "Selected" => true],
        ["DeviceType" => 2, "Selected" => true],
        ["DeviceType" => 3, "Selected" => true],
        ["DeviceType" => 4, "Selected" => false]
    ],
    "FinalPublishStep" => 4,
    "VersionHistoryOnConfigurePageEnabled" => true,
    "DefaultDevelopTabName" => "Game",
    "PortraitModeEnabled" => false,
    "RedirectTermsToHelpFullUrl" => "https://en.help.roblox.com/hc/articles/115004647846-Roblox-Terms-of-Use",
    "UserIsAnyBuildersClubMember" => false,
    "IsPremium" => false,
    "UserIsSellerBanned" => false,
    "DeviceConfigurationEnabled" => true,
    "ConsoleContentAgreementEnabled" => true,
    "ShowDeveloperProducts" => true,
    "CurrentUniverse" => null,
    "AllowPlaceToBeCopiedInGame" => false,
    "AllowPlaceToBeUpdatedInGame" => false,
    "DeveloperProductUniverseId" => 0,
    "TemplateID" => null,
    "AccessTypesUsingPermissions" => null,
    "AccessTypeSelectList" => [
        ["Disabled" => false, "Group" => null, "Selected" => false, "Text" => "Everyone", "Value" => null],
        ["Disabled" => false, "Group" => null, "Selected" => false, "Text" => "Friends", "Value" => null]
    ],
    "UserAgreementModel" => null,
    "MachineID" => "WEB946",
    "BaseScripts" => [
        "~/js/roblox.js",
        "~/js/jquery.tipsy.js",
        "~/js/GoogleAnalytics/GoogleAnalyticsEvents.js",
        "~/js/JSErrorTracker.js",
        "~/js/jquery.cookie.js",
        "~/js/common/forms.js",
        "~/js/jquery.simplemodal-1.3.5.js",
        "~/js/GenericConfirmation.js",
        "~/js/JavaScriptEndpoints.js",
        "~/js/XsrfToken.js"
    ],
    "Title" => "Limbo Studio",
    "Groups" => null,
    "PrimaryGroupId" => null,
    "MetaTagListViewModel" => [
        "FacebookMetaTags" => null,
        "TwitterMetaTags" => null,
        "StructuredDataTags" => [
            "StructuredDataContext" => "http://schema.org",
            "StructuredDataType" => "Organization",
            "StructuredDataName" => "Limbo",
            "RobloxUrl" => "https://www.voidrev.us/",
            "RobloxLogoUrl" => "https://images.rbxcdn.com/c69b74f49e785df33b732273fad9dbe0.png",
            "RobloxFacebookUrl" => "https://www.facebook.com/ROBLOX/",
            "RobloxTwitterUrl" => "https://twitter.com/roblox",
            "RobloxLinkedInUrl" => "https://www.linkedin.com/company/147977",
            "RobloxInstagramUrl" => "https://www.instagram.com/roblox/",
            "RobloxYouTubeUrl" => "https://www.youtube.com/user/roblox",
            "RobloxGooglePlusUrl" => "https://plus.google.com/+roblox",
            "RobloxTwitchTvUrl" => "https://www.twitch.tv/roblox",
            "Title" => "Roblox",
            "Description" => null,
            "Images" => null,
            "ImageWidth" => null,
            "ImageHeight" => null
        ],
        "Description" => "Roblox is a global platform that brings people together through play.",
        "Keywords" => "free games, online games, building games, virtual worlds, free mmo, gaming cloud, physics engine",
        "NoIndexNoFollow" => false,
        "IncludeReferrerOriginTag" => false
    ],
    "XsrfToken" => "hahano",
    "XsrfTokensEnabled" => false,
    "IsSiftScienceEnabled" => false,
    "JavascriptErrorTrackerViewModel" => [
        "InitializeParameter" => "{ \\u0027suppressConsoleError\\u0027: true}"
    ]
];

// Output JSON
echo json_encode($json);
?>
