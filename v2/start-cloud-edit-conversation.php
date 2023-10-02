<?php
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();

$json = json_decode(file_get_contents("php://input"),true);
$placeId = $json['placeId'];
$teamquery = $con->prepare("SELECT * FROM `teamcreate` WHERE `placeId` = :id");
$teamquery->execute(['id' => $placeId]);
$teams = $teamquery->fetch();
if(!is_array($teams)){
echo "[]";
exit();
}
if($teams['initiatorid'] == $uID){
    $teamuserquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
    $teamuserquery->execute(['id' => $teams['teamerid']]);
    $teamuser = $teamuserquery->fetch();
    $teamusername = $teamuser['username'];
}else{
    $teamuserquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
    $teamuserquery->execute(['id' => $teams['initiatorid']]);
    $teamuser = $teamuserquery->fetch();
    $teamusername = $teamuser['username'];   
}
?>
{
  "conversation": {
    "id": <?=$placeId;?>,
    "title": "<?php echo NoXSSPlz($teamusername);?>",
    "initiator": {
      "type": "User",
      "targetId": <?=$teams['teamerid'];?>,
      "name": "<?php echo NoXSSPlz($teamusername);?>",
      "displayName": "<?php echo NoXSSPlz($teamusername);?>",
      "hasVerifiedBadge": false
    },
    "hasUnreadMessages": null,
    "participants": [],
    "conversationType": "CloudEditConversation",
    "conversationTitle": {
      "titleForViewer": "<?php echo NoXSSPlz($teamusername);?>",
      "isDefaultTitle": true
    },
    "lastUpdated": "2022-08-31T22:21:41.103Z",
    "conversationUniverse": null
  },
  "rejectedParticipants": null,
  "resultType": "Success",
  "statusMessage": "Success"
}