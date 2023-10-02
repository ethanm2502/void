<?php
header("Content-Type: application/json");
include_once ($_SERVER['DOCUMENT_ROOT'] . '/vendor/autoload.php');

use Snipe\BanBuilder\CensorWords;

$censor = new CensorWords;

try {
    $text = $_REQUEST['text'];
    $userId = (int)$_REQUEST['userId'];

    if (isset($_REQUEST['text'])) {
        $filtered = $censor->censorString($text)['clean'];

        $response = [
            "success" => true,
            "data" => [
                "AgeUnder13" => $filtered,
                "Age13OrOver" => $filtered
            ]
        ];
    } else {
        $response = [
            "success" => false,
            "data" => [
                "AgeUnder13" => "ERROR",
                "Age13OrOver" => "ERROR"
            ]
        ];
    }

    echo json_encode($response);
} catch (Throwable $e) {
    $errorResponse = [
        "success" => false,
        "data" => [
            "AgeUnder13" => "ERROR",
            "Age13OrOver" => "ERROR"
        ]
    ];

    echo json_encode($errorResponse);
    exit();
}
?>
