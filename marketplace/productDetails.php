<?php
$productId = (int)$_GET['productId'];
header('Location: https://economy.roblox.com/v2/developer-products/'.$productId.'/details');
?>