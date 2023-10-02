<?php require ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');

$post = file_get_contents('php://input');

if(empty($post)){
http_response_code(500);
echo "Unknown Error";
exit();    
}

$xmlarray = simplexml_load_string($post, 'SimpleXMLElement', LIBXML_NOCDATA);
$encoded = json_encode($xmlarray);
$decoded = json_decode($encoded,TRUE);

if(is_array($decoded)){

$report = $decoded['@attributes'];

$userID = (int)$report['userID'];
$placeID = (int)$report['placeID'];
$gameJobID = filter_var($report['gameJobID'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);

$comments = $decoded['comment'];

$comments = explode (";", $comments); 


$AbuserID = str_replace("AbuserID:","",$comments[0]);

print_r($comments);

$Type = $comments[1];

$decodedshit = strstr($decoded['comment'],"User Report");

$comments = explode ("\n", $decodedshit); 

$comments = str_replace(":","",$comments);

$UserReport = $comments[1];

$messages = json_encode($decoded['messages']);

try{

$stmt = $con->prepare("INSERT INTO `reports` (`userID`, `placeID`, `gameJobID`, `AbuserID`, `Type`, `UserReport`, `messages`) VALUES (:userID, :placeID, :gameJobID, :AbuserID, :Type, :UserReport, :messages)");

$stmt->execute(['userID' => $userID, 'placeID' => $placeID, 'gameJobID' => $gameJobID, 'AbuserID' => $AbuserID, 'Type' => $Type, 'UserReport' => $UserReport, 'messages' => $messages]);
}catch(PDOException $e){
error_log($e);
echo "error";
}
echo "Success";
exit();
}else{
http_response_code(500);
echo "Unknown Error";
exit();
}
?>