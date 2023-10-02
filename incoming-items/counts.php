<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
if (isset($_COOKIE['password']) || isset($_COOKIE['_ROBLOSECURITY'])) {
    $password = filter_input(INPUT_COOKIE, 'password', FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
    $roblosec = filter_input(INPUT_COOKIE, '_ROBLOSECURITY', FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
  
    $stmt = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :roblosec");
    $stmt->bindParam(':password', $password);
    $stmt->bindParam(':roblosec', $roblosec);
    $stmt->execute();
  
    $usr = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($usr) {
      $logged = true;
    }
  }
if ($usr['banned'] > 0) {
    header('Location: /banned/');
}

header('Content-Type: application/json; charset=UTF-8; X-Robots-Tag: noindex');
$friendamquery = $con->prepare("SELECT count(*) FROM `friends` WHERE `status`='1' AND toid= :toid");
$friendamquery->execute(['toid' => $uID]);
$friendreqcount = $friendamquery->fetchColumn();
?>
{
    "unreadMessageCount": 0,
    "friendRequestsCount": <?=$friendreqcount;?>
}