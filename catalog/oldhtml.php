<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$count = 0;
?>
<style type="text/css">
#Body {
padding: 5px;
}
</style>
<div id="catalog" data-empty-search-enabled="true" style="font-size: 12px;">
<div class="header" style="height:60px;">
<div style="float:left;">
<h1><a href="https://www.voidrev.us/catalog" id="CatalogLink">Catalog</a></h1>
</div>
<div class="CatalogSearchBar">
<input id="keywordTextbox" name="name" type="text" class="translate text-box text-box-small"/>
<a id="submitSearchButton" href="#" class="btn-control btn-control-large top-level">Search</a>
</div>
</div>
<div class="left-nav-menu divider-right">
<div class="browseDropdownHeader"></div>
<div id="dropdown" class="browsedropdownbrowsedropdown roblox-hierarchicaldropdown">
<ul id="dropdownUl" class="clearfix">
<li class="subcategories" data-delay="never">
<a href="#category=featured" class="assetTypeFilter" data-category="0">Featured</a>
<ul class="slideOut" style="top:-1px;">
<li class="slideHeader"><span>Featured Types</span></li>
<li><a href="#category=featured" class="assetTypeFilter" data-types="0" data-category="0">All Featured Items</a></li>
<li><a href="#category=featured" class="assetTypeFilter" data-types="9" data-category="0">Featured Hats</a></li>
<li><a href="#category=featured" class="assetTypeFilter" data-types="5" data-category="0">Featured Gear</a></li>
<li><a href="#category=featured" class="assetTypeFilter" data-types="10" data-category="0">Featured Faces</a></li>
<li><a href="#category=featured" class="assetTypeFilter" data-types="11" data-category="0">Featured Packages</a></li>
</ul>
</li>
<li class="subcategories"><a href="#category=collectibles" class="assetTypeFilter collectiblesLink" data-category="2">Collectibles</a>
<ul class="slideOut" style="top:-32px;">
<li class="slideHeader"><span>Collectible Types</span></li>
<li><a href="#category=collectibles" class="assetTypeFilter" data-types="2" data-category="2">All Collectibles</a></li>
<li><a href="#category=collectibles" class="assetTypeFilter" data-types="10" data-category="2">Collectible Faces</a></li>
<li><a href="#category=collectibles" class="assetTypeFilter" data-types="9" data-category="2">Collectible Hats</a></li>
<li><a href="#category=collectibles" class="assetTypeFilter" data-types="5" data-category="2">Collectible Gear</a></li>
</ul>
</li>
<li class="slideHeader DropdownDivider divider-bottom" data-delay="ignore"></li>
<li data-delay="always">
<a href="#category=all" class="assetTypeFilter" data-category="1">All Categories</a>
</li>
<li class="subcategories">
<a href="#category=clothing" class="assetTypeFilter" data-category="3">Clothing</a>
<ul class="slideOut" style="top:-97px;">
<li class="slideHeader"><span>Clothing Types</span></li>
<li><a href="#" class="assetTypeFilter" data-types="3" data-category="3">All Clothing</a></li>
<li><a href="#" class="assetTypeFilter" data-types="9" data-category="3">Hats</a></li>
<li><a href="#" class="assetTypeFilter" data-types="12" data-category="3">Shirts</a></li>
<li><a href="#" class="assetTypeFilter" data-types="13" data-category="3">T-Shirts</a></li>
<li><a href="#" class="assetTypeFilter" data-types="14" data-category="3">Pants</a></li>
<li><a href="#" class="assetTypeFilter" data-types="11" data-category="3">Packages</a></li>
</ul>
</li>
<li class="subcategories"><a href="#category=bodyparts" class="assetTypeFilter" data-category="4">Body Parts</a>
<ul class="slideOut" style="top:-128px;">
<li class="slideHeader"><span>Body Part Types</span></li>
<li><a href="#category=bodyparts" class="assetTypeFilter" data-types="4" data-category="4">All Body Parts</a></li>
<li><a href="#category=bodyparts" class="assetTypeFilter" data-types="15" data-category="4">Heads</a></li>
<li><a href="#category=bodyparts" class="assetTypeFilter" data-types="10" data-category="4">Faces</a></li>
<li><a href="#category=bodyparts" class="assetTypeFilter" data-types="11" data-category="4">Packages</a></li>
</ul>
</li>
<li class="subcategories"><a href="#category=gear" class="assetTypeFilter" data-category="5">Gear</a>
<ul class="slideOut" style="top:-159px; width:auto;" style="border-right:0px;">
<div>
<li class="slideHeader"><span>Gear Categories</span></li>
<li><a href="#geartype=All Gear" class="gearFilter" data-category="5" data-types="All">All Gear</a></li>
<li><a href="#geartype=Melee Weapon" class="gearFilter" data-category="5" data-types="1">Melee Weapon</a></li>
<li><a href="#geartype=Ranged Weapon" class="gearFilter" data-category="5" data-types="2">Ranged Weapon</a></li>
<li><a href="#geartype=Explosive" class="gearFilter" data-category="5" data-types="3">Explosive</a></li>
<li><a href="#geartype=Power Up" class="gearFilter" data-category="5" data-types="4">Power Up</a></li>
<li><a href="#geartype=Navigation Enhancer" class="gearFilter" data-category="5" data-types="5">Navigation Enhancer</a></li>
<li><a href="#geartype=Musical Instrument" class="gearFilter" data-category="5" data-types="6">Musical Instrument</a></li>
<li><a href="#geartype=Social Item" class="gearFilter" data-category="5" data-types="7">Social Item</a></li>
<li><a href="#geartype=Building Tool" class="gearFilter" data-category="5" data-types="8">Building Tool</a></li>
<li><a href="#geartype=Personal Transport" class="gearFilter" data-category="5" data-types="9">Personal Transport</a></li>
</div>
</ul>
</li>
</ul>
</div>
<div style="padding-top:20px;">
<h2>Filters</h2>
</div>
<div style="margin-left:5px">
<?php if($_GET['Category'] == 1){ ?>
<div class="filter-title">Category</div>
<ul>
<li><a href="#category=All Categories" class="assetTypeFilter selected" data-keepfilters="true" data-category="1">All Categories</a></li>
<li><a href="#category=Body Parts" class="assetTypeFilter" data-keepfilters="true" data-category="4">Body Parts</a></li>
<li><a href="#category=Clothing" class="assetTypeFilter" data-keepfilters="true" data-category="3">Clothing</a></li>
<li><a href="#category=Collectibles" class="assetTypeFilter" data-keepfilters="true" data-category="2">Collectibles</a></li>
<li><a href="#category=Featured" class="assetTypeFilter" data-keepfilters="true" data-category="0">Featured</a></li>
<li><a href="#category=Gear" class="assetTypeFilter" data-keepfilters="true" data-category="5">Gear</a></li>
<li><a href="#category=Accessories" class="assetTypeFilter" data-keepfilters="true" data-category="11">Accessories</a></li>
<li><a href="#category=Avatar Animations" class="assetTypeFilter" data-keepfilters="true" data-category="12">Avatar Animations</a></li>
</ul>
<? } ?>
<?php if($_GET['Category'] == 3){ ?>
<div class="filter-title">Clothing Type</div>
<ul>
<li><a href="#subcategory=All Clothing" class="assetTypeFilter <?if($_GET['Subcategory'] == 3){echo' selected';}?>" data-types="3">All Clothing</a></li>
<li><a href="#subcategory=Hats" class="assetTypeFilter <?if($_GET['Subcategory'] == 9){echo' selected';}?>" data-types="9">Hats</a></li>
<li><a href="#subcategory=Shirts" class="assetTypeFilter <?if($_GET['Subcategory'] == 12){echo' selected';}?>" data-types="12">Shirts</a></li>
<li><a href="#subcategory=T-Shirts" class="assetTypeFilter <?if($_GET['Subcategory'] == 13){echo' selected';}?>" data-types="13">T-Shirts</a></li>
<li><a href="#subcategory=Pants" class="assetTypeFilter <?if($_GET['Subcategory'] == 14){echo' selected';}?>" data-types="14">Pants</a></li>
<li><a href="#subcategory=Packages" class="assetTypeFilter <?if($_GET['Subcategory'] == 11){echo' selected';}?>" data-types="11">Packages</a></li>
</ul>
<? } ?>
<?php if($_GET['Category'] == 4){ ?>
<div class="filter-title">Body Parts Type</div>
<ul>
<li><a href="#subcategory=All Body Parts" class="assetTypeFilter <?if($_GET['Subcategory'] == 4){echo' selected';}?>" data-types="4">All Body Parts</a></li>
<li><a href="#subcategory=Heads" class="assetTypeFilter <?if($_GET['Subcategory'] == 15){echo' selected';}?>" data-types="15">Heads</a></li>
<li><a href="#subcategory=Faces" class="assetTypeFilter <?if($_GET['Subcategory'] == 10){echo' selected';}?>" data-types="10">Faces</a></li>
<li><a href="#subcategory=Packages" class="assetTypeFilter <?if($_GET['Subcategory'] == 11){echo' selected';}?>" data-types="11">Packages</a></li>
</ul>
<? } ?>
<?php if($_GET['Category'] == 5){ ?>
<div class="filter-title">Body Parts Type</div>
<ul>
  <li>
    <a href="#geartype=All Gear" class="gearFilter <?if($_GET['Gears'] == 0){echo' selected';}?>" data-types="All">All Gear</a>
  </li>
  <li>
    <a href="#geartype=Building" class="gearFilter <?if($_GET['Gears'] == 8){echo' selected';}?>" data-types="8">Building</a>
  </li>
  <li>
    <a href="#geartype=Explosive" class="gearFilter <?if($_GET['Gears'] == 3){echo' selected';}?>" data-types="3">Explosive</a>
  </li>
  <li>
    <a href="#geartype=Melee" class="gearFilter <?if($_GET['Gears'] == 1){echo' selected';}?>" data-types="1">Melee</a>
  </li>
  <li>
    <a href="#geartype=Musical" class="gearFilter <?if($_GET['Gears'] == 6){echo' selected';}?>" data-types="6">Musical</a>
  </li>
  <li>
    <a href="#geartype=Navigation" class="gearFilter <?if($_GET['Gears'] == 5){echo' selected';}?>" data-types="5">Navigation</a>
  </li>
  <li>
    <a href="#geartype=Power Up" class="gearFilter <?if($_GET['Gears'] == 4){echo' selected';}?>" data-types="4">Power Up</a>
  </li>
  <li>
    <a href="#geartype=Ranged" class="gearFilter <?if($_GET['Gears'] == 2){echo' selected';}?>" data-types="2">Ranged</a>
  </li>
  <li>
    <a href="#geartype=Social" class="gearFilter <?if($_GET['Gears'] == 7){echo' selected';}?>" data-types="7">Social</a>
  </li>
  <li>
    <a href="#geartype=Transport" class="gearFilter <?if($_GET['Gears'] == 9){echo' selected';}?>" data-types="9">Transport</a>
  </li>
</ul>
<? } ?>
<div class="filter-title">Currency / Price</div>
<ul class="separatorForLegend" style="border:0">
<li><a href="#price=0" class="priceFilter selected" data-currencytype="0">All Currency</a></li>
<li><a href="#price=1" class="priceFilter" data-currencytype="1">Robux</a></li>
<li><a href="#price=5" class="priceFilter" data-currencytype="5">Free</a></li>
<li class="NotForSale">
<input type="checkbox" id="includeNotForSaleCheckbox" value="true"/>
<label for="includeNotForSaleCheckbox">Show unavailable items</label>
</li>
</ul>
</div>
<div id="legend" class="divider-top">
<div class="header expanded" id="legendheader">
<h3>Legend</h3>
</div>
<div id="legendcontent" style="overflow: hidden; ">
<img src="https://www.voidrev.us/img/4fc3a98692c7ea4d17207f1630885f68.png" style="margin-left: -13px"/>
<div class="legendText"><b>Builders Club Only</b><br/>
Only purchasable by Builders Club members.</div>
<img src="https://www.voidrev.us/img/793dc1fd7562307165231ca2b960b19a.png" style="margin-left: -13px"/>
<div class="legendText"><b>Limited Items</b><br/>
Owners of these discontinued items can re-sell them to other users at any price.</div>
<img src="https://www.voidrev.us/img/d649b9c54a08dcfa76131d123e7d8acc.png" style="margin-left: -13px"/>
<div class="legendText"><b>Limited Unique Items</b><br/>
A limited supply originally sold by ROBLOX. Each unit is labeled with a serial number. Once sold out, owners can re-sell them to other users.
</div>
</div>
</div> </div>
<div class="right-content divider-left">
<a href="#breadcrumbs=category" class="breadCrumbFilter bolded" data-filter="category"><?if($_GET['Category'] == 3){echo "Clothing";}if($_GET['Category'] == 4){echo "Body Parts";}if($_GET['Category'] == 5){echo "Gear";}?></a>
&#187; <a href="#breadcrumbs=subcategory" class="breadCrumbFilter selected" data-filter="subcategory"><?if($_GET['Category'] == 3 && $_GET['Subcategory'] == 9){echo "Hats";}if($_GET['Category'] == 3 && $_GET['Subcategory'] == 11){echo "Packages";}if($_GET['Category'] == 4 && $_GET['Subcategory'] == 11){echo "Packages";}if($_GET['Category'] == 4 && $_GET['Subcategory'] == 10){echo "Faces";}if($_GET['Category'] == 4 && $_GET['Subcategory'] == 15){echo "Heads";}if($_GET['Category'] == 4 && $_GET['Subcategory'] == 4){echo "All Body Parts";}if($_GET['Category'] == 1){echo "All Categories";}if($_GET['Category'] == 3 && $_GET['Subcategory'] == 12){echo "Shirts";}if($_GET['Category'] == 3 && $_GET['Subcategory'] == 14){echo "Pants";}if($_GET['Category'] == 3 && $_GET['Subcategory'] == 13){echo "T-Shirts";} if($_GET['Category'] == 5 && $_GET['Gears'] == 8){echo"Building";} if($_GET['Category'] == 5 && $_GET['Gears'] == 3){echo"Explosive";} if($_GET['Category'] == 5 && $_GET['Gears'] == 1){echo"Melee";} if($_GET['Category'] == 5 && $_GET['Gears'] == 6){echo"Musical";} if($_GET['Category'] == 5 && $_GET['Gears'] == 5){echo"Navigation";} if($_GET['Category'] == 5 && $_GET['Gears'] == 4){echo"Power Up";} if($_GET['Category'] == 5 && $_GET['Gears'] == 2){echo"Ranged";} if($_GET['Category'] == 5 && $_GET['Gears'] == 7){echo"Social";} if($_GET['Category'] == 5 && $_GET['Gears'] == 9){echo"Transport";} ?></a>
<div id="secondRow">
<div style="clear:both"></div>
</div>
<?php
if($_GET['Keyword']){
$Keyword = filter_var($_GET['Keyword'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND `name` LIKE :Keyword");
$catquery->execute(['Keyword' => '%'.$Keyword.'%']);
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }} ?>
<?php
if($_GET['Category'] == 1){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }} ?>
<?php
if($_GET['Category'] == 3 && !isset($_GET['Subcategory'])){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND (`type2`='Shirt' OR `type2`='Pants' OR `type2`='Packages' OR `type2`='TShirt') ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }} ?>
<?php
if($_GET['Category'] == 3){
if($_GET['Subcategory'] == 3){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND (`type2`='Shirt' OR `type2`='Pants' OR `type2`='Packages' OR `type2`='TShirt') ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>
<?php
if($_GET['Category'] == 3){
if($_GET['Subcategory'] == 9){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND `type2`='Hat' ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>
<?php
if($_GET['Category'] == 3){
if($_GET['Subcategory'] == 11){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND `type2`='Package' ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>
<?php
if($_GET['Category'] == 3){
if($_GET['Subcategory'] == 12){
$catquery = $con->prepare("SELECT * FROM `library` WHERE `type`='item' AND `type2`='Shirt' ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>
<?php
if($_GET['Category'] == 3){
if($_GET['Subcategory'] == 14){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND `type2`='Pants' ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>
<?php
if($_GET['Category'] == 4 && !isset($_GET['Subcategory'])){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND (`type2`='Face' OR `type2`='Package' OR `type2`='Head') ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }} ?>
<?php
if($_GET['Category'] == 4){
if($_GET['Subcategory'] == 11){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND `type2`='Package' ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>
<?php
if($_GET['Category'] == 4){
if($_GET['Subcategory'] == 10){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND `type2`='Face' ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>
<?php
if($_GET['Category'] == 4){
if($_GET['Subcategory'] == 15){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND `type2`='Head' ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>
<?php
if($_GET['Category'] == 4){
if($_GET['Subcategory'] == 4){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND (`type2`='Face' OR `type2`='Package' OR `type2`='Head') ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>
<?php
if($_GET['Category'] == 3){
if($_GET['Subcategory'] == 13){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND `type2`='TShirt' ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>

<?php
if($_GET['Category'] == 5){
if($_GET['Gears'] == 0){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND `type2`='Gear' ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>

<?php
if($_GET['Category'] == 5){
if($_GET['Gears'] == 1){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND `type2`='Gear' AND `GearType` = 'Melee' ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>

<?php
if($_GET['Category'] == 5){
if($_GET['Gears'] == 2){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND `type2`='Gear' AND `GearType` = 'Ranged' ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>

<?php
if($_GET['Category'] == 5){
if($_GET['Gears'] == 3){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND `type2`='Gear' AND `GearType` = 'Explosives' ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>

<?php
if($_GET['Category'] == 5){
if($_GET['Gears'] == 4){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND `type2`='Gear' AND `GearType` = 'Power ups' ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>

<?php
if($_GET['Category'] == 5){
if($_GET['Gears'] == 5){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND `type2`='Gear' AND `GearType` = 'Navigation' ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>

<?php
if($_GET['Category'] == 5){
if($_GET['Gears'] == 6){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND `type2`='Gear' AND `GearType` = 'Musical' ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>

<?php
if($_GET['Category'] == 5){
if($_GET['Gears'] == 7){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND `type2`='Gear' AND `GearType` = 'Social' ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>

<?php
if($_GET['Category'] == 5){
if($_GET['Gears'] == 8){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND `type2`='Gear' AND `GearType` = 'Building' ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>

<?php
if($_GET['Category'] == 5){
if($_GET['Gears'] == 9){
$catquery = $con->prepare("SELECT * FROM `library` WHERE type='item' AND `offsale` = '0' AND `banned` = '0' AND `type2`='Gear' AND `GearType` = 'Transport' ORDER BY sold DESC");
$catquery->execute();
while($cats = $catquery->fetch()) {
$count = $count + 1;
$id = $cats['id'];
$icon = $cats['icon'];
$cname = $cats['creatorname'];
$cid = $cats['creatorid'];
$iname = $cats['name'];
$pricerob = $cats['Robux'];
$pricetix = $cats['Tickets'];
$sales = $cats['sold'];
$updated = $cats['updated'];
$favorite = $cats['favorite'];
if($cats['fileid'] == 0){
$sql = "DELETE FROM `library` WHERE `id` = '$id'";
$con->exec($sql);
$sql = "DELETE FROM `owneditems` WHERE `itemid` = '$id'";
$con->exec($sql);
}
?>
<div class="CatalogItemOuter BigOuter">
<div class="SmallCatalogItemView BigView">
<div class="CatalogItemInner BigInner">
<div class="roblox-item-image image-large" data-item-id="<?=$id;?>" data-image-size="large">
<div class="item-image-wrapper">
<a href="https://www.voidrev.us/library/?id=<?=$id;?>">
<img title="<?echo NoXSSPlz($iname);?>" alt="<?echo NoXSSPlz($iname);?>" class="original-image " src="https://www.voidrev.us/model-thumbnails?assetId=<?=$id;?>" loading="lazy"/>
</a>
</div>
</div>
<div id="textDisplay">
<div class="CatalogItemName notranslate"><a class="name notranslate" href="https://www.voidrev.us/library/?id=<?=$id;?>" title="<?echo NoXSSPlz($iname);?>"><?echo NoXSSPlz($iname);?></a></div>
<div class="robux-price"><span class="robux notranslate"><?echo $pricerob;?></span></div>
</div>
<div class="CatalogHoverContent">
<div><span class="CatalogItemInfoLabel">Creator:</span> <span class="HoverInfo notranslate"><a href="https://www.voidrev.us/users/<?=$cid;?>/profile"><?echo NoXSSPlz($cname);?></a></span></div>
<div><span class="CatalogItemInfoLabel">Updated:</span><span class="HoverInfo"><?echo NoXSSPlz($updated);?></span></div>
<div><span class="CatalogItemInfoLabel">Sales:</span> <span class="HoverInfo notranslate"><?echo NoXSSPlz($sales);?></span></div>
<div><span class="CatalogItemInfoLabel">Favorited:</span> <span class="HoverInfo"><?echo NoXSSPlz($favorite);?> times</span></div>
</div>
</div>
</div>
</div>
<? }}} ?>

</div>
<div style="clear:both;padding-top:20px"></div>
</div>
<div id="AddToGearInstructionsPanel" class="PurchaseModal">
<div id="simplemodal-close" class="simplemodal-close">
<a></a>
</div>
<div class="titleBar" style="text-align: center">
Add Gear to Your Game
</div>
<div class="PurchaseModalBody">
<div class="PurchaseModalMessage">
<div class="PromoteModalErrorMessage errorStatusBar"></div>
<div class="PurchaseModalMessageText">
<span>
<img src="https://www.voidrev.us/img/a2da4a35291d2c85df85240e4cf03772.jpg"/>
</span>
<br/>
To add gear to your game, find an item in the catalog and click the "Add to Game" button. The item will automatically be allowed in game, and you'll receive a commission on every copy sold from your game page. (You can only add gear that's for sale.)
</div>
</div>
<div class="PurchaseModalButtonContainer">
<div class="ImageButton btn-blue-ok-sharp simplemodal-close"></div>
</div>
<div class="PurchaseModalFooter footnote"></div>
</div>
</div>
<script type="text/javascript">
$(function () {
Roblox.require(['Pages.Catalog', 'Pages.CatalogShared', 'Widgets.HierarchicalDropdown'], function (catalog) {
catalog.init({"Subcategory":9,"Category":3,"CurrencyType":0,"SortType":3,"SortAggregation":5,"SortCurrency":0,"Gears":null,"Genres":null,"CatalogContext":1,"Keyword":null,"PageNumber":1,"CreatorID":0,"PxMin":0,"PxMax":0,"IncludeNotForSale":false,"LegendExpanded":true,"ResultsPerPage":42}, 87, true);
Roblox.Widgets.HierarchicalDropdown.init();
if(voidrev.usalogValues.ContainerID)
{
var $container = $('#' + voidrev.usalogValues.ContainerID);
$container.off(voidrev.usalogShared.CatalogLoadedViaAjaxEventName);
$container.on(voidrev.usalogShared.CatalogLoadedViaAjaxEventName, null, null, voidrev.usalogShared.handleCatalogLoadedViaAjaxEvent);
}
});
$('.Paging_Input').val('1'); /* what?! party.js overwrites paging_input on any pageback */
$(function () {
if (window.location.search.indexOf('&showInstructions=true') > -1) {
var modalProperties = { escClose: true, opacity: 80, overlayCss: { backgroundColor: "#000"} };
$('#AddToGearInstructionsPanel').modal(modalProperties);
}
});
voidrev.usalogValues = voidrev.usalogValues || {};
voidrev.usalogValues.CatalogContext = 1;
});
</script>