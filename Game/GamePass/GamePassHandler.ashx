<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
error_reporting(E_ERROR | E_PARSE);
if(!empty($_GET['UserID']))
if(!empty($_GET['PassID']))
{
    $userId = (int)$_GET['UserID'];
    $assetId = (int)$_GET['PassID'];
    $sql = "SELECT count(*) FROM `gameowneditems` WHERE `userId` = :userId AND `assetId` = :assetId";
    $result = $con->prepare($sql);
    $result->execute(['userId' => $userId, 'assetId' => $assetId]);
    $number_of_rows = $result->fetchColumn();
    if($number_of_rows > 0){
    echo '<Value Type="boolean">true</Value>';
    exit();
}else{
    $userId = (int)$_GET['UserID'];
    $assetId =(int) $_GET['PassID'];
  $jsonData = json_decode(file_get_contents('https://economy.roblox.com/v2/assets/'.$assetId.'/details'));
    $assetId = $jsonData->ProductId;
    $sql = "SELECT count(*) FROM `gameowneditems` WHERE `userId` = :userId AND `assetId` = :assetId";
    $result = $con->prepare($sql);
    $result->execute(['userId' => $userId, 'assetId' => $assetId]);
    $number_of_rows = $result->fetchColumn();
    if($number_of_rows > 0){
    echo '<Value Type="boolean">true</Value>';
    }else{
    echo '<Value Type="boolean">false</Value>';
    exit();
  }}}else{
    echo '<Value Type="boolean">false</Value>';
    exit();
    }