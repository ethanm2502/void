<?php
include_once($_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php');
use Snipe\BanBuilder\CensorWords;
$censor = new CensorWords;
include($_SERVER['DOCUMENT_ROOT'] . '/config/includes.php');
$usr = getUserData($con);
if ($usr['banned'] != 0) {
    echo json_encode(array('success' => false));
    die(http_response_code(403));
}

$uID = $usr['id'];

if (is_array($usr)) {
    if (isset($_POST['status'])) {
        $timeThreshold = time() - (15 * 60);
        $feedquery = $con->prepare("SELECT COUNT(*) as postCount FROM `myfeed` WHERE userid = :uID AND timestamp >= :timeThreshold");
        $feedquery->execute(['uID' => $uID, 'timeThreshold' => $timeThreshold]);
        $postCount = $feedquery->fetchColumn();

        if ($postCount >= 5) {
            $data = array('success' => false, 'message' => 'You are posting too quickly, try again later.');
            die(json_encode($data));
        }

        $profileid = $usr['id'];
        $statusinput = $_POST['status'];
        $statusdecoded = urldecode($statusinput);
        $statusdecoded = filter_var($statusdecoded, FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
        $statusdecoded = $censor->censorString($statusdecoded)['clean'];
        header("Content-Type: application/json");
        $stmt = $con->prepare("INSERT INTO `myfeed` (`userid`, `status`, `timestamp`) VALUES (:userid, :status, :timestamp)");
        $stmt->bindParam(':userid', $profileid);
        $stmt->bindParam(':status', $statusdecoded);
        $stmt->bindParam(':timestamp', time());
        $stmt->execute();
        $data = array('success' => 'true', 'message' => $statusdecoded);
        die(json_encode($data));
    } else {
        $data = array('success' => false);
        die(json_encode($data));
    }
} else {
    $data = array('success' => false);
    die(json_encode($data));
}
?>