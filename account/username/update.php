<?php
header("Content-Type: application/json");
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');

$logged = false;
$response = array();

try {
    if (isset($_COOKIE['password']) || isset($_COOKIE['_ROBLOSECURITY'])) {
        $password = $_COOKIE['password'];
        $roblosec = $_COOKIE['_ROBLOSECURITY'];

        $usrquery = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :roblosec");
        $usrquery->execute(['password' => $password, 'roblosec' => $roblosec]);
        $usr = $usrquery->fetch();

        if ($usr) {
            $logged = true;
        }
    }

    $timey = time();
    $oldname = $usr['username'];
    $uID = $usr['id'];
    $Robux = $usr['Robux'];
    $updateduser = urldecode($_REQUEST['username']);
    $updateduser = preg_replace('/[^a-zA-Z0-9-_\.]/', '', $updateduser);

    if ($updateduser === "LocalPlayer") {
        $response = array('success' => false, 'message' => 'invalid username');
    } elseif (strlen($updateduser) < 3) {
        $response = array('success' => false, 'message' => 'too short');
    } elseif (strlen($updateduser) > 20) {
        $response = array('success' => false, 'message' => 'too long');
    } else {
        $chkquery = $con->prepare("SELECT * FROM `users` WHERE `username` = :username");
        $chkquery->execute(['username' => $updateduser]);
        $check = $chkquery->fetch();

        if (!$check) {
            if (isset($_REQUEST['username'])) {
                if ($usr['Robux'] > 1000) {
                    $stmt = $con->prepare("UPDATE `users` SET `username` = :updateduser WHERE `id` = :uID");
                    $stmt->execute(['updateduser' => $updateduser, 'uID' => $uID]);
                    setcookie("username", $updateduser, time() + (460800 * 30), "/");
                    $stmt = $con->prepare("INSERT INTO `oldusernames` (`userid`, `name`) VALUES (:uID, :oldname)");
                    $stmt->execute(['uID' => $uID, 'oldname' => $oldname]);
                    $stmt = $con->prepare("UPDATE `users` SET `Robux` = :newRobux WHERE `id` = :userID");
                    $stmt->execute(['newRobux' => $Robux - 1000, 'userID' => $uID]);
                    $gamequery = $con->prepare("SELECT * FROM `library` WHERE `creatorid` = :creatorid");
                    $gamequery->execute(['creatorid' => $uID]);
                    while ($games = $gamequery->fetch()) {
                        $id = $games['id'];
                        $cnameupdate = "UPDATE `library` SET `creatorname` = :updateduser WHERE `id` = :id";
                        $stmt = $con->prepare($cnameupdate);
                        $stmt->execute(['updateduser' => $updateduser, 'id' => $id]);
                    }
                    $response = array('success' => true);
                } else {
                    $response = array('success' => false, 'message' => 'https://www.youtube.com/watch?v=RQwjTOqkhH8');
                }
            } else {
                $response = array('success' => false, 'message' => 'not set');
            }
        } else {
            $response = array('success' => false, 'message' => 'User exists.');
        }
    }
} catch (Exception $e) {
    $response = array('success' => false, 'message' => 'An error occurred.');
}

echo json_encode($response);
exit();
?>
