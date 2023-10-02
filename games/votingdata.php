<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');

if (isset($_COOKIE['password']) || isset($_COOKIE['_ROBLOSECURITY'])) {
    $password = filter_input(INPUT_COOKIE, 'password', FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
    $roblosec = filter_input(INPUT_COOKIE, '_ROBLOSECURITY', FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
  
    $stmt = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :roblosec");
    $stmt->bindParam(':password', $password);
    $stmt->bindParam(':roblosec', $roblosec);
    $stmt->execute();
  
    $usr = $stmt->fetch(PDO::FETCH_ASSOC);
    if ($usr) {
      $logged = true;
    }else{
      $logged = false;
      http_response_code(403);
      exit();
    }
  }else{
  http_response_code(403);
  exit();
  }
  if ($usr['banned'] > 0) {
  if($_SERVER['PHP_SELF'] != "/banned/index.php"){
  header('Location: /banned/');
  exit();
  }
  }
  $uID = $usr['id'];

$URL = $_SERVER['REQUEST_URI'];
$placeId = str_replace("/games/votingservice/","",$URL);
$placeId = (int)$placeId;
$likequerycount = $con->prepare("SELECT * FROM `liked` WHERE `assetId` = :assetId AND `type` = 'like'");
$likequerycount->execute(['assetId' => $placeId]);
$likes = $likequerycount->rowCount();
$dislikequerycount = $con->prepare("SELECT * FROM `liked` WHERE `assetId` = :assetId AND `type` = 'dislike'");
$dislikequerycount->execute(['assetId' => $placeId]);
$dislikes = $dislikequerycount->rowCount();


$likeselectquery = $con->prepare("SELECT * FROM `liked` WHERE `assetId` = :assetId AND `type` = 'like' AND `userID` = '$uID'");
$likeselectquery->execute(['assetId' => $placeId]);
$likeselect = $likeselectquery->fetch();
$dislikeselectquery = $con->prepare("SELECT * FROM `liked` WHERE `assetId` = :assetId AND `type` = 'dislike' AND `userID` = '$uID'");
$dislikeselectquery->execute(['assetId' => $placeId]);
$dislikeselect = $dislikeselectquery->fetch();

?>
<li id="voting-section"
        class="voting-panel body"
        data-target-id="<?=$placeId;?>"
        data-total-up-votes="<?=$likes;?>"
        data-total-down-votes="<?=$dislikes;?>"
        data-vote-modal=""
        data-user-authenticated="true"
        data-vote-url=""
        data-register-url="https://www.voidrev.us/newlogin?returnUrl=%2Fgames%2Fvotingservice%2F110132408"
        data-account-page-url="https://www.voidrev.us/my/account?confirmemail=1">
        <div class="loading"></div>
            <div class="vote-summary">
                <div class="voting-details">
                    <div class="users-vote <?php if($likeselect){echo "has-voted";}?>">

                        <div class="upvote">
                            <span class="icon-like <?php if($likeselect){echo "selected";}?>"></span>
                        </div>

                        <div class="vote-details">
                            <div class="vote-container">
                                <div class="vote-background"></div>
                                <div class="vote-percentage"></div>
                                <div class="vote-mask">
                                    <div class="segment seg-1"></div>
                                    <div class="segment seg-2"></div>
                                    <div class="segment seg-3"></div>
                                    <div class="segment seg-4"></div>
                                </div>
                            </div>

                            <div class="vote-numbers">
                                <div class="count-left">
                                    <span id="vote-up-text" title="<?=$likes;?>" class="vote-text"><?=$likes;?></span>
                                </div>
                                <div class="count-right">
                                    <span id="vote-down-text" title="<?=$dislikes;?>" class="vote-text"><?=$dislikes;?></span>                                    
                                </div>
                                    
                            </div>
                        </div>

                        <div class="downvote">
                            <span class="icon-dislike <?php if($dislikeselect){echo "selected";}?>"></span>
                        </div>

                    </div>
                </div>

            </div>
    </li>

<script>
    $(function () {
        Roblox.Voting.Initialize();
    });
</script>
