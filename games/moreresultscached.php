<html><head>
<?php
header('Cache-Control: public, must-revalidate, max-age=60');
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$MaxRows = (int)$_GET['MaxRows'];
$StartRows = (int)$_GET['StartRows'];
$GETGenreFilter = (int)$_GET['GenreID'];
$usr = getUserData($con);
$GenreFilter = "WHERE `banned` = 0";
$orderby = "";
$keyword = isset($_REQUEST['Keyword']) ? $_REQUEST['Keyword'] : '';
if (!empty($keyword)) {
$keyword = '%' . $keyword . '%';
$GenreFilter .= " AND `name` LIKE :keyword";
}
if ($_GET['SortFilter'] == 1) {
$orderby = "visits";
$commonQueryPart = "SELECT g.id, g.name, g.version, g.creatorid, g.icon, g.banned, COALESCE(SUM(j.playercount), 0) as total_players, g.visits
FROM games g
LEFT JOIN jobs j ON g.id = j.placeId
$PlayerGenreFilter
$GenreFilter
GROUP BY g.id
ORDER BY total_players DESC, g.visits DESC
LIMIT :startRows, :maxRows";
} elseif ($_GET['SortFilter'] == 8 || $_GET['SortFilter'] == 11 || $_GET['SortFilter'] == 12 || $_GET['SortFilter'] == 16) {
if ($_GET['SortFilter'] == 8) {
$orderby = "currencyearned";
} elseif ($_GET['SortFilter'] == 11 || $_GET['SortFilter'] == 12) {
$orderby = "likes";
} elseif ($_GET['SortFilter'] == 16) {
$orderby = "visits";
}
$commonQueryPart = "SELECT id, name, version, creatorid, icon FROM `games` $GenreFilter ORDER BY $orderby DESC LIMIT :startRows, :maxRows";
} elseif ($_GET['SortFilter'] == 14) {
$orderby = "likes";
$commonQueryPart = "SELECT id, name, version, creatorid, icon FROM `games` $GenreFilter AND `buildersclub`='1' LIMIT :startRows, :maxRows";
} else {
$commonQueryPart = "SELECT id, name, version, creatorid, icon FROM `games` $GenreFilter LIMIT :startRows, :maxRows";
}
// Execute the query
$gamequery = $con->prepare($commonQueryPart);
$gamequery->bindParam(':startRows', $StartRows, PDO::PARAM_INT);
$gamequery->bindParam(':maxRows', $MaxRows, PDO::PARAM_INT);
// Bind keyword parameter if it's used
if (!empty($keyword)) {
$gamequery->bindParam(':keyword', $keyword, PDO::PARAM_STR);
}
$gamequery->execute();
while ($games = $gamequery->fetch()) {
$gameid = $games['id'];
$version = $games['version'];
$creatorid = $games['creatorid'];
$creatorquery = $con->prepare("SELECT id,username FROM `users` WHERE `id`= :id");
$creatorquery->execute(['id' => $creatorid]);
$creator = $creatorquery->fetch();
$likequerycount = $con->prepare("SELECT * FROM `liked` WHERE `assetId` = :assetId AND `type` = 'like'");
$likequerycount->execute(['assetId' => $gameid]);
$likes = $likequerycount->rowCount();
$dislikequerycount = $con->prepare("SELECT * FROM `liked` WHERE `assetId` = :assetId AND `type` = 'dislike'");
$dislikequerycount->execute(['assetId' => $gameid]);
$dislikes = $dislikequerycount->rowCount();
$creatorname = $creator['username'];
$formatlikes = number_format($likes);
$formatdislikes = number_format($dislikes);
$icon = $games['icon'];
$icon = getPlaceIcon($con,$gameid,true);
$playercount = getPlayerCount($gameid);
?>
<div class="hidden-item hidden" id=keyword></div>
<!--
data-next-page-start=28
-->
<div class="hidden-item hidden" id=gamesListResponseModel></div>
<li class="list-item game-card game-tile">
<div class=game-card-container>
<a href="https://www.voidrev.us/games/<?php echo $games['id']?>/<?php echo NoXSSPlz(str_replace(" ","-",$games['name']));?>" class=game-card-link>
<div class=game-card-thumb-container>
<p class="versionnumber"><?php echo $version;?></p>
<img class="game-card-thumb lazy" data-original=https://www.voidrev.us/img/games/<?php echo $icon;?>s.png thumbnail="{&#34;Final&#34;:true,&#34;Url&#34;:&#34;https://www.voidrev.us/img/games/<?php echo $icon;?>s.png&#34;,&#34;RetryUrl&#34;:null,&#34;UserId&#34;:0,&#34;EndpointType&#34;:&#34;Avatar&#34;}">
</div>
<div class="game-card-name game-name-title" title="<?php echo NoXSSPlz($games['name']);?>" ng-non-bindable><?php echo NoXSSPlz($games['name']);?></div>
<div class=game-card-info>
<span class="info-label icon-votes-gray"></span>
<span class="info-label vote-percentage-label"><?php if($likes == 0 && $dislikes == 0){echo 0;} else {echo round($likes / ($likes + $dislikes) * 100);}?>%</span>
<span class="info-label no-vote hidden"></span>
<span class="info-label icon-playing-counts-gray"></span>
<span class="info-label playing-counts-label" title=<?php echo ($playercount);?>><?php echo number_format($playercount);?>
</span>
</div>
</a>
</div>
</li>
<? } ?>
</body></html>
