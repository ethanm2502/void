<?php
include ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
$placeId = (int)$_GET['universeId'];
header("Content-Type: application/json");

$receiptquery = $con->prepare("SELECT * FROM `devproduct` WHERE `placeId` = :placeId");
$receiptquery->execute(['placeId' => $placeId]);
$rows = $receiptquery->fetchAll();

// Build the DeveloperProducts array
$developer_products = array();
foreach ($rows as $row) {
    $rowid = $row['productId'];
    $rowquery = $con->prepare("SELECT * FROM `library` WHERE `id` = :id");
    $rowquery->execute(['id' => $rowid]);
    $row = $rowquery->fetch();
    $product = array(
        "ProductId" => $row["id"],
        "DeveloperProductId" => $row["id"],
        "Name" => $row["name"],
        "Description" => $row["description"],
        "IconImageAssetId" => $row["icon"],
        "displayName" => $row["name"],
        "displayDescription" => $row["description"],
        "displayIcon" => $row["icon"],
        "PriceInRobux" => $row["robux"]
    );
    $developer_products[] = $product;
}

// Build the final data array
$data = array(
    "DeveloperProducts" => $developer_products,
    "FinalPage" => true,
    "PageSize" => 50
);

echo json_encode($data);
