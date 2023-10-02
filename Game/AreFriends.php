<?php
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');

error_reporting(E_ERROR);

function areFriends($userId, $otherUserId, $con) {
    $isFriendQuery = $con->prepare("SELECT * FROM `friends` WHERE `status`='2' AND ((`toid` = :toid AND `fromid` = :fromid) OR (`fromid` = :toid2 AND `toid` = :fromid2))");
    $isFriendQuery->execute(['toid' => $userId, 'fromid' => $otherUserId, 'toid2' => $userId, 'fromid2' => $otherUserId]);
    $friends = $isFriendQuery->fetch(PDO::FETCH_ASSOC);
    return !empty($friends);
}

$userId = (int)$_GET['userId'];
$queryString = parse_url($_SERVER['REQUEST_URI'], PHP_URL_QUERY);
$otherUserIds = array();
$parameters = explode('&', $queryString);
foreach ($parameters as $parameter) {
list($key, $value) = explode('=', $parameter);
if ($key === 'otherUserIds') {
$otherUserIds[] = (int)$value;
}
}

$friendUserIds = [];
foreach ($otherUserIds as $id) {
    if (areFriends($userId, $id, $con)) {
        $friendUserIds[] = $id;
    }
}

echo "X" . implode(",", $friendUserIds);
?>
