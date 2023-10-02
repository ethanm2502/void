<?php
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$placeId = (int)$_GET['placeId'];

if($_GET['startIndex'] && $_GET['maxRows']){
$startindex = (int)$_GET['startIndex'];
$maxrows = (int)$_GET['maxRows'];
$endIndex = $startIndex + $maxRows;
$Limit = "LIMIT $startIndex,$endIndex";
}

$passquery = $con->prepare("SELECT * FROM `library` WHERE `type2` = 'Gamepass' AND `IsForGameId` = :id AND `offsale` = '0' $Limit");
$passquery->execute(["id" => $placeId]);
$pass = $passquery->fetchAll();
if(!is_array($pass)){
die('<p id="store-does-not-sell" class="section-content-off">This game does not sell any virtual items or power-ups.</p>');
}
foreach($pass as $pass){
$passcreatorquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
$passcreatorquery->execute(["id" => $pass['creatorid']]);
$passcreator = $passcreatorquery->fetch();
?>
        <li class="list-item real-game-pass">
            <div class="store-card">
                <a href="/library/?id=<?=$pass['id'];?>" class="gear-passes-asset" ><img  class='' src='https://www.voidrev.us/asset/?id=<?=$pass['fileid'];?>' /></a>
                <div class="store-card-caption">
                    <div class="text-overflow store-card-name" title="2x Dig">
                        <?php echo NoXSSPlz($pass['name']); ?>
                    </div>

                    <div class="store-card-price">
                        <span class="icon-robux-16x16"></span>
                        <span class="text-robux"><?=$pass['Robux'];?></span>
                    </div>

                    <div class="store-card-footer">
                            <button class="PurchaseButton btn-buy-md btn-full-width rbx-gear-passes-purchase"
                                    data-item-id="<?=$pass['id'];?>"
                                    data-item-name="<?php echo NoXSSPlz($pass['name']); ?>"
                                    data-product-id="<?=$pass['id'];?>"
                                    data-expected-price="<?=$pass['Robux'];?>"
                                    data-asset-type="Game Pass"
                                    data-bc-requirement=""
                                    data-expected-seller-id="<?=$pass['creatorid'];?>"
                                    data-seller-name="<?php echo NoXSSPlz($passcreator['username']);?>"
                                    data-expected-currency="1">
                                <span>Buy</span>
                            </button>
                    </div>
                </div>
            </div>
        </li>
<? } ?>