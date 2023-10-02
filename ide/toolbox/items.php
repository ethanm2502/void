<?php
include ($_SERVER['DOCUMENT_ROOT'] . '/config/includes.php');
header("Content-Type: application/json");
$usr = getUserData($con);
if ($usr['banned'] > 0) {
echo "Not authenticated";
http_response_code(403);
exit();
}
$page = (int)$_GET['page'];
$num = (int)$_GET['num'];
$keywordtext = filter_var($_GET['keyword'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$keyword = "";
if (!empty($_GET['keyword'])) {
$keyword = "AND `name` LIKE '%$keywordtext%'";
}
$categoryFilter = "";
if ($_GET['category'] == 'FreeModels') {
$categoryFilter = "AND (`type2` = 'Model' OR `type2` = 'Sound')";
} elseif ($_GET['category'] == 'FreeDecals') {
$categoryFilter = "AND `type2` = 'Decal'";
} else {
$categoryFilter = "AND (`type2` = 'Model' OR `type2` = 'Sound')";
}
$creatorFilter = "";
if ($_GET['creatorId']) {
$cid = (int)$_GET['creatorId'];
$creatorFilter = "AND `creatorid` = $cid";
}
$totalitemcountquery = $con->prepare("SELECT COUNT(*) as total FROM `library` WHERE `type` = 'item2' $keyword $categoryFilter $creatorFilter");
$totalitemcountquery->execute();
$totalitemcount = $totalitemcountquery->fetchColumn();
$page = max($page, 1);
$itemsPerPage = 30;
$startrow = ($page - 1) * $itemsPerPage;
$itemquery = $con->prepare("SELECT * FROM `library` WHERE `type` = 'item2' $keyword $categoryFilter $creatorFilter ORDER BY sold DESC, type2 ASC LIMIT $startrow, $itemsPerPage");
$itemquery->execute();
$results = [];
while ($items = $itemquery->fetch()) {
$assetId = $items['id'];
$likecountquery = $con->prepare("SELECT COUNT(*) as upvotes FROM `liked` WHERE `assetId` = :assetId AND `type` = 'like'");
$likecountquery->execute(['assetId' => $assetId]);
$upvotes = $likecountquery->fetchColumn();
$dislikecountquery = $con->prepare("SELECT COUNT(*) as downvotes FROM `liked` WHERE `assetId` = :assetId AND `type` = 'dislike'");
$dislikecountquery->execute(['assetId' => $assetId]);
$downvotes = $dislikecountquery->fetchColumn();
$cid = $items['creatorid'];
$result = [
"Asset" => [
"Id" => $items['fileid'],
"Name" => $items['name'],
"TypeId" => ($items['type2'] == "Sound") ? 3 : (($items['type2'] == "Model") ? 10 : (($items['type2'] == "Decal") ? 13 : 1)),
"IsEndorsed" => ($items['Admin'] == 1) ? true : false
],
"Creator" => [
"Id" => $items['creatorid'],
"Name" => $items['creatorname'],
"Type" => 1
],
"Thumbnail" => [
"Final" => true,
"Url" => "https://www.voidrev.us/model-thumbnails?assetId=" . $items['id'],
"RetryUrl" => "https://www.voidrev.us/model-thumbnails?assetId=" . $items['id'],
"UserId" => $cid,
"EndpointType" => "Avatar"
],
"Voting" => [
"ShowVotes" => true,
"UpVotes" => $upvotes,
"DownVotes" => $downvotes,
"CanVote" => true,
"UserVote" => true,
"HasVoted" => false,
"ReasonForNotVoteable" => null
]
];
$results[] = $result;
}
$response = [
"TotalResults" => $totalitemcount,
"Results" => $results
];
echo json_encode($response);
?>
