<?php
header("Content-Type: application/json");
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
if(isset($_GET['Category'])){
$Category = (int)$_GET['Category'];
}else{
$Category = (int)$_GET['Direction'];
}
if(isset($_GET['Keyword'])){
$Keyword = filter_var($_GET['Keyword'],FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$KeywordSearch = "AND lower(`name`) LIKE CONCAT(LOWER(:Keyword))";
}else{
$KeywordSearch = "";
}
if($_GET['IncludeNotForSale'] != "true"){
$KeywordSearch = $KeywordSearch." AND offsale='0'";
}
$itemsPerPage = 30;
$pageNumber = isset($_GET['PageNumber']) ? intval($_GET['PageNumber']) : 0;
$offset = $pageNumber * $itemsPerPage;
if($Category === 2 && !isset($_GET['Category'])){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item2' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 0 && $_GET['Direction'] == 2){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item2' AND `type2` = 'Model' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 1 && $_GET['Direction'] == 2){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item2' AND `type2` = 'Decal' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 2 && $_GET['Direction'] == 2){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item2' AND `type2` = 'Sound' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 3 && $_GET['Direction'] == 2){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item2' AND `type2` = 'Mesh' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 4 && $_GET['Direction'] == 2){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item2' AND `type2` = 'Video' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 5 && $_GET['Direction'] == 2){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item2' AND `type2` = 'Plugin' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}else{
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item2' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}
// okay we setup category shit so now execute!
$stmt->execute(['offset' => 0, 'perpage' => 99999999999999]);
$itemcount = $stmt->rowCount();
if(!isset($_GET['Keyword'])){
$stmt->execute(['offset' => $offset, 'perpage' => $itemsPerPage]);
}else{
$stmt->execute(['Keyword' => '%'.$Keyword.'%', 'offset' => $offset, 'perpage' => $itemsPerPage]);
}
if($pageNumber == 0){
$pageNumber2 = 1;
}else{
$pageNumber2 = $pageNumber;
}
// create an empty array to hold the items
$items = array();
$catalogdata = array(
"Items" => array(),
"TotalResults" => $itemcount,
"ResultsPerPage" => 30,
"Keyword" => $_GET['Keyword'],
"CreatorName" => null,
"IsCreatorAGroup" => false,
"IsAlternateResult" => false,
"IsValidCreatorName" => true,
"PageHash" => "1",
"PageNumber" => $pageNumber2
);
$stmt->execute();
$rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
foreach ($rows as $row) {
if($row['Robux'] == 0){$IsFree = true; $Text = "Free";}else{$IsFree = false;}
$item = array(
"ItemTargetId" => $row['id'],
"ItemType" => 1,
"AssetId" => $row['id'],
"Name" => $row['name'],
"AbsoluteUrl" => "https://www.voidrev.us/library/?id=".$row['id']."",
"Price" => $row['Robux'],
"BestPrice" => null,
"Remaining" => null,
"HasSecondaryInfo" => false,
"NoPriceText" => $Text,
"IsFree" => $IsFree,
"Creator" => $row['creatorname'],
"AssetRestrictionIcon" => array(
"TooltipText" => null,
"CssTag" => null,
"LoadAssetRestrictionIconCss" => true,
"HasTooltip" => false
),
"AssetStatusIcon" => array(),
"Thumbnail" => array(
"Final" => true,
"Url" => "https://www.voidrev.us".getModelThumbnail($con,$row['id']),
"RetryUrl" => "",
"IsApproved" => true
)
);
array_push($catalogdata['Items'], $item);
}
$json_data = json_encode($catalogdata);
echo $json_data;
