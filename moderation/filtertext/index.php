<?php
include_once ($_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php');

use Snipe\BanBuilder\CensorWords;

$censor = new CensorWords;

try {
    header("Content-Type: text/plain; charset=utf-8; X-Robots-Tag: noindex");

    function parseFilter($white, $black, $f1 = "white", $f2 = "black") {
        return json_encode([
            "data" => [
                $f1 => $white,
                $f2 => $black
            ]
        ]);
    }

    if (isset($_REQUEST["text"])) {
        $msg_white = urldecode($_REQUEST["text"]);
        $msg_black = urldecode($_REQUEST["text"]);
        $userId = urldecode($_REQUEST["text"]);
    }

    if ($msg_black == "") {
        die(parseFilter("", ""));
    }

    $filtered = $censor->censorString($msg_white)['clean'];
    die(parseFilter($filtered, $filtered));

} catch (Throwable $e) {
    echo '{"data":{"white":"","black":""}}';
}
?>
