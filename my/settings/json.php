<?php
header('Content-Type: application/json; charset=utf-8');
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
function mask_email( $email ) {
$char_shown = 3;
$mail_parts = explode("@", $email);
$username = $mail_parts[0];
$len = strlen( $username );
if( $len <= $char_shown ){
return implode("@", $mail_parts );
}
//Logic: show asterisk in middle, but also show the last character before @
$mail_parts[0] = substr( $username, 0 , $char_shown )
. str_repeat("*", $len - $char_shown - 1 )
. substr( $username, $len - $char_shown + 2 , 1 )
;
return implode("@", $mail_parts );
}
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
$uID = $usr['id'];
$username = $usr['username'];
$email = $usr['email'];
$verified = $usr['verified'];
if(empty($email)){
$onfile = "false";
}else{
$onfile = "true";
}
if($verified == 1){
$verified = "true";
}else{
$verified = "false";
}
$robuxremain = $usr['Robux'] - 1000;
if($robuxremain > 0){
$robuxremain = "0";
}
if($robuxremain < 0){
$robuxremain = ltrim($robuxremain, '-');
}
$oldusrquery = $con->prepare("SELECT * FROM `oldusernames` WHERE `userid` = :userid");
$oldusrquery->execute(['userid' => $uID]);
$oldusr = $usrquery->fetchAll();
$oldusernames = implode(',', $oldusr);;
$email = mask_email($email);
$userAgent = $_SERVER['HTTP_USER_AGENT'];
$InApp = (strpos(strtolower($userAgent), 'roblox') !== false) ? "true" : "false";
?>
{
"PreviousUserNames": "<?php echo $oldusernames;?>",
"UserId":<?=$uID;?>,
"Name":"<?php echo NoXSSPlz($username);?>",
"UseSuperSafePrivacyMode": false,
"IsSuperSafeModeEnabledForPrivacySetting": false,
"UseSuperSafeChat": false,
"IsAppChatSettingEnabled": true,
"IsGameChatSettingEnabled": true,
"IsAccountPrivacySettingsV2Enabled": true,
"IsSetPasswordNotificationEnabled": false,
"ChangePasswordRequiresTwoStepVerification": false,
"ChangeEmailRequiresTwoStepVerification": false,
"UserEmail": "<?echo NoXSSPlz($email);?>",
"IsEmailOnFile": <?=$onfile;?>,
"UserEmailMasked": true,
"IsEmailVerified": <?=$verified;?>,
"UserEmailVerified": <?=$verified;?>,
"CanHideInventory": false,
"CanTrade": true,
"MissingParentEmail": false,
"IsUpdateEmailSectionShown": false,
"IsUnder13UpdateEmailMessageSectionShown": false,
"IsUserConnectedToFacebook": false,
"IsTwoStepToggleEnabled": true,
"AgeBracket": 0,
"UserAbove13": true,
"ClientIpAddress": "123.123.123.123",
"AccountAgeInDays": 0,
"IsOBC": <?php if($usr['membership'] == "OutrageousBuildersClub"){echo"true";}else{echo"false";}?>,
"IsTBC": <?php if($usr['membership'] == "TurboBuildersClub"){echo"true";}else{echo"false";}?>,
"IsAnyBC": <?php if($usr['membership'] == "BuildersClub"){echo"true";}else{echo"false";}?>,
"IsPremium": <?php if($usr['membership'] == "Premium"){echo"true";}else{echo"false";}?>,
"IsBcRenewalMembership": false,
"BcExpireDate": "\/Date(-0)\/",
"BcRenewalPeriod": null,
"BcLevel": null,
"HasCurrencyOperationError": false,
"CurrencyOperationErrorMessage": null,
"BlockedUsersModel": {
"BlockedUserIds": [],
"BlockedUsers": [],
"MaxBlockedUsers": 50,
"Total": 0,
"Page": 1
},
"Tab": null,
"ChangePassword": false,
"IsAccountPinEnabled": false,
"IsAccountRestrictionsFeatureEnabled": false,
"IsAccountRestrictionsSettingEnabled": false,
"IsAccountSettingsSocialNetworksV2Enabled": false,
"IsUiBootstrapModalV2Enabled": true,
"IsI18nBirthdayPickerInAccountSettingsEnabled": true,
"InApp": <?php echo $InApp;?>,
"MyAccountSecurityModel": {
"IsEmailSet": <?=$onfile;?>,
"IsEmailVerified": <?=$verified;?>,
"IsTwoStepEnabled": false,
"ShowSignOutFromAllSessions": true,
"TwoStepVerificationViewModel": {
"UserId": <?=$uID;?>,
"IsEnabled": false,
"CodeLength": 0,
"ValidCodeCharacters": null
}
},
"ApiProxyDomain": "https://www.voidrev.us",
"AccountSettingsApiDomain": "https://www.voidrev.us",
"AuthDomain": "https://www.voidrev.us",
"IsDisconnectFbSocialSignOnEnabled": true,
"IsDisconnectXboxEnabled": true,
"NotificationSettingsDomain": "https://www.voidrev.us",
"AllowedNotificationSourceTypes": ["Test", "FriendRequestReceived", "FriendRequestAccepted", "PartyInviteReceived", "PartyMemberJoined", "ChatNewMessage", "PrivateMessageReceived", "UserAddedToPrivateServerWhiteList", "ConversationUniverseChanged", "TeamCreateInvite", "GameUpdate", "DeveloperMetricsAvailable"],
"AllowedReceiverDestinationTypes": ["DesktopPush", "NotificationStream"],
"BlacklistedNotificationSourceTypesForMobilePush": [],
"MinimumChromeVersionForPushNotifications": 50,
"PushNotificationsEnabledOnFirefox": true,
"LocaleApiDomain": "https://www.voidrev.us",
"HasValidPasswordSet": true,
"IsUpdateEmailApiEndpointEnabled": true,
"FastTrackMember": null,
"IsFastTrackAccessible": false,
"HasFreeNameChange": false,
"IsAgeDownEnabled": true,
"IsSendVerifyEmailApiEndpointEnabled": true,
"IsPromotionChannelsEndpointEnabled": true,
"ReceiveNewsletter": false,
"SocialNetworksVisibilityPrivacy": 6,
"SocialNetworksVisibilityPrivacyValue": "AllUsers",
"Facebook": null,
"Twitter": null,
"YouTube": null,
"Twitch": null
}