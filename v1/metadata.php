<?php 
require($_SERVER['DOCUMENT_ROOT']."/config/includes.php");
header("Content-Type: application/json"); 
$usr = getUserData($con);
?>
{
   "isDescriptionEnabled":true,
   "isBirthdateEnabled":true,
   "isGenderEnabled":true,
   "isPromotionChannelsEnabled":true,
   "isFriendFinderEnabled":true,
   "isNearbyUpsellEnabled":true,
   "isFriendsUserDataStoreCacheEnabled":true,
   "userName":"<?php echo $usr['username'];?>",
   "displayName":"<?php if($usr['displayname'] != NULL){echo$usr['displayname'];}else{echo$usr['username'];} ?>"
}