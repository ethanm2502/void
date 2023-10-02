<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
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
if($Category === 0 && !isset($_GET['Subcategory']) || $_GET['Subcategory'] == "0"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 0 && $_GET['Subcategory'] === "19"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Hat' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 0 && $_GET['Subcategory'] === "38"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Animation' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 0 && $_GET['Subcategory'] === "10"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Face' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 0 && $_GET['Subcategory'] === "5"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Gear' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 0 && $_GET['Subcategory'] === "37"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 1 && !isset($_GET['Subcategory'])){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif ($Category === 2 && (isset($_GET['Direction']) || (!isset($_GET['Direction']) && $_GET['Subcategory'] === "2"))) {
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 2 && $_GET['Subcategory'] === "19"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `limited` = '1' AND `type2` = 'Hat' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 2 && $_GET['Subcategory'] === "10"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `limited` = '1' AND `type2` = 'Face' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 2 && $_GET['Subcategory'] === "5"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `limited` = '1' AND `type2` = 'Gear' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 3 && $_GET['Subcategory'] === "3"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND (`type2` = 'Shirt' OR `type2` = 'TShirt' OR `type2` = 'Pants' OR `type2` = 'Package') $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 3 && $_GET['Subcategory'] === "12"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Shirt' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 3 && $_GET['Subcategory'] === "13"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'TShirt' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 3 && $_GET['Subcategory'] === "14"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Pants' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 3 && $_GET['Subcategory'] === "37"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Package' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 4 && $_GET['Subcategory'] === "4"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND (`type2` = 'Package' OR `type2` = 'Head' OR `type2` = 'Face') $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 4 && $_GET['Subcategory'] === "15"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Head' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 4 && $_GET['Subcategory'] === "10"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Face' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 4 && $_GET['Subcategory'] === "37"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Package' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 5 && !isset($_GET['Subcategory'])){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Gear' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 5 && $_GET['Gears'] === "8"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Gear' AND `GearType` = 'Building' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 5 && $_GET['Gears'] === "3"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Gear' AND `GearType` = 'Explosives' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 5 && $_GET['Gears'] === "1"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Gear' AND `GearType` = 'Melee' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 5 && $_GET['Gears'] === "6"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Gear' AND `GearType` = 'Musical' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 5 && $_GET['Gears'] === "5"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Gear' AND `GearType` = 'Navigation' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 5 && $_GET['Gears'] === "4"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Gear' AND `GearType` = 'Power ups' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 5 && $_GET['Gears'] === "2"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Gear' AND `GearType` = 'Ranged' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 5 && $_GET['Gears'] === "7"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Gear' AND `GearType` = 'Social' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 5 && $_GET['Gears'] === "7"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Gear' AND `GearType` = 'Transport' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 11 && $_GET['Subcategory'] === "19"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Hat' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 11 && $_GET['Subcategory'] === "9"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Hat' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}elseif($Category === 12 && $_GET['Subcategory'] === "38"){
$stmt = $con->prepare("SELECT * FROM library WHERE `type` = 'item' AND `type2` = 'Animation' $KeywordSearch ORDER BY sold DESC LIMIT :offset,:perpage");
}
// okay we setup category shit so now execute!
if(!isset($_GET['Keyword'])){
$stmt->execute(['offset' => 0, 'perpage' => 99999999999999]);
$itemcount = $stmt->rowCount();
$stmt->execute(['offset' => $offset, 'perpage' => $itemsPerPage]);
}else{
$stmt->execute(['Keyword' => '%'.$Keyword.'%', 'offset' => 0, 'perpage' => 99999999999999]);
$itemcount = $stmt->rowCount();
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
if($row['limited'] == 1){
$CssTag = "limited";
$RestrictionIconCss = true;
}elseif($row['limited'] == 2){
$CssTag = "limited-unique";
$RestrictionIconCss = true;
}else{
$CssTag = "";
$RestrictionIconCss = false;
}
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
"CssTag" => $CssTag,
"LoadAssetRestrictionIconCss" => $RestrictionIconCss,
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
