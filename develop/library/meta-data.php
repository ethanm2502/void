<?php
header("Content-Type: application/json");
echo json_encode(["BuyRobuxUrl" => "/upgrades/robux?ctx=catalogNew", "CatalogUrl" => "/develop/library", "NumberOfSplashResultsToDisplay" => 25]);
?>