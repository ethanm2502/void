<?php
session_start();

// Check if the user has exceeded the rate limit
if (isset($_SESSION['last_message_time'])) {
    $lastMessageTime = $_SESSION['last_message_time'];
    $timeSinceLastMessage = time() - $lastMessageTime;
    
    // Set your rate limit here (e.g., 60 seconds)
    $rateLimit = 60; // 1 message per minute
    
    if ($timeSinceLastMessage < $rateLimit) {
        // User has exceeded the rate limit
        header("Location: https://www.voidrev.us/my/messages/?tab=inbox&success=ratelimit");
        exit();
    }
}

include_once ($_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php');
use Snipe\BanBuilder\CensorWords;
$censor = new CensorWords;
include ($_SERVER['DOCUMENT_ROOT'].'/global.php');
$recipientId = (int)$_GET['recipientId'];
if ($recipientId === $uID) {
    echo "<script>history.back();</script>";
    exit();
}

// Update the last message time
$_SESSION['last_message_time'] = time();

$recquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :recipientId");
$recquery->execute(['recipientId' => $recipientId]);
$recipient = $recquery->fetch();

if (!is_array($recipient)) {
    header("Location: https://www.voidrev.us/my/messages/?tab=inbox&success=false");
    exit();
}

$recipientusername = $recipient['username'];

if (isset($_POST['messagecont'], $_POST['messagecont'], $_GET['recipientId'])) {
    try {
        // Your message sending code here
        
        // ...

        header("Location: https://www.voidrev.us/my/messages/?tab=inbox&success=true");
        exit();
    } catch (Throwable $e) {
        header("Location: https://www.voidrev.us/my/messages/?tab=inbox&success=false");
        exit();
    }
}
?> <head>
<title>New Message - Void</title>
<link rel='stylesheet' href='https://www.voidrev.us/css/leanbase.css' />
<script type='text/javascript' src='//ajax.aspnetcdn.com/ajax/jQuery/jquery-1.11.1.min.js'></script>
<script type='text/javascript'>
window.jQuery || document.write(" < script type = 'text/javascript'
src = '/js/jquery/jquery-1.11.1.js' > < \/script>")
</script>
<script type='text/javascript' src='//ajax.aspnetcdn.com/ajax/jquery.migrate/jquery-migrate-1.2.1.min.js'></script>
<script type='text/javascript'>
window.jQuery || document.write(" < script type = 'text/javascript'
src = '/js/jquery/jquery-migrate-1.2.1.js' > < \/script>")
</script>
<script type='text/javascript' src='https://www.voidrev.us/js/74b3a61e84d476a876d7c93e0880bf85.js'></script>
<script type="text/javascript" src="https://www.voidrev.us/js/86411e39f51e0ef39c7fa2f1f92fe7b3.js"></script>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
<script type="text/javascript">
$(function() {
Roblox.JSErrorTracker.initialize({
'suppressConsoleError': true
});
});
</script>
<!--[if lt IE 9]>
<script src="//oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
<script src="//oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
<![endif]-->
<script type="text/javascript">
var _gaq = _gaq || [];
window.GoogleAnalyticsDisableRoblox2 = true;
_gaq.push(['b._setAccount', 'UA-486632-1']);
_gaq.push(['b._setCampSourceKey', 'rbx_source']);
_gaq.push(['b._setCampMediumKey', 'rbx_medium']);
_gaq.push(['b._setCampContentKey', 'rbx_campaign']);
_gaq.push(['b._setDomainName', 'voidrev.us']);
_gaq.push(['b._setCustomVar', 1, 'Visitor', 'Member', 2]);
_gaq.push(['b._setPageGroup', 1, 'Games']);
_gaq.push(['b._trackPageview']);
_gaq.push(['c._setAccount', 'UA-26810151-2']);
_gaq.push(['c._setDomainName', 'voidrev.us']);
_gaq.push(['c._setPageGroup', 1, 'Games']);
(function() {
var ga = document.createElement('script');
ga.type = 'text/javascript';
ga.async = true;
ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'https://www') + '.google-analytics.com/ga.js';
var s = document.getElementsByTagName('script')[0];
s.parentNode.insertBefore(ga, s);
})();
</script>
<script type="text/javascript">
if (Roblox && Roblox.PageHeartbeatEvent) {
Roblox.PageHeartbeatEvent.Init([2, 8, 20, 60]);
}
</script>
<script type="text/javascript">
$(function () {
RobloxEventManager.triggerEvent('rbx_evt_newuser', {});
});
</script>
<?php
if(isset($_GET['success'])){
if($_GET['success'] == "true"){
echo "<script>setTimeout(function() {
var successDiv = document.querySelector('.alert.alert-success');
successDiv.classList.add('on');
setTimeout(function() {
successDiv.classList.remove('on');
window.location.href = 'https://www.voidrev.us/my/messages/?tab=inbox';
}, 1500);
}, 1000);
</script>";
}else{
echo "<script>setTimeout(function() {
var successDiv = document.querySelector('.alert.alert-warning');
successDiv.classList.add('on');
setTimeout(function() {
successDiv.classList.remove('on');
window.location.href = 'https://www.voidrev.us/my/messages/?tab=inbox';
}, 1500);
}, 1000);
</script>";
}
}
?>
<style>
.page-content .rbx-tabs-horizontal {
margin: 8px auto;
}
.page-content .rbx-tabs-horizontal .rbx-tab {
width: 25%;
}
@media (max-width: 543px) {
.page-content .rbx-tabs-horizontal .tab-about {
width: 19%;
}
.page-content .rbx-tabs-horizontal .tab-store {
width: 18%;
}
.page-content .rbx-tabs-horizontal .tab-leaderboards {
width: 38%;
}
.page-content .rbx-tabs-horizontal .tab-game-instances {
width: 25%;
}
}
.page-content .rbx-tabs-horizontal .rbx-tab-content {
margin-bottom: 8px;
}
.section-content {
display: flex;
margin: 0 0 0px!important;
border: 1px solid #e3e3e3;
-webkit-transition: all,.2s,ease-in-out;
-o-transition: all,.2s,ease-in-out;
transition: all,.2s,ease-in-out;
box-shadow: 0 0 0 0 #00a2ff inset;
}
.section-content:hover{
box-shadow: 4px 0 0 0 #00a2ff inset;
}
.btn-primary-sm{
border: 1px solid transparent;
background-color: #fff;
border-color: #b8b8b8;
color: #191919;
}
.btn-primary-sm:hover{
background-color: #fff;
color: #191919;
border-color:#9d9d9d;
}
.btn-primary-sm:focus{
background-color: #fff;
color: #191919;
border-color:#00a2ff;
}
.messagename{
margin-left:15px;
}
.messagesubtitle{
margin-left:15px;
font-weight: bold;
}
.messagetext{
margin-left:15px;
color:grey;
}
.messagedate{
margin-left:15px;
color:grey;
}
.detail-subject{
font-size:21.5px;
}
</style>
</head>
<body>
<div id="container-main">
<div class="content">
<div class="system-feedback">
<div class="alert-system-feedback">
<div class="alert alert-success">Message Sent!</div>
</div>
<div class="alert-system-feedback">
<div class="alert alert-warning"><?php if($_GET['success'] == "toomanychar"){echo"Your message was too long, the limit is 500 characters.";}else{echo"An error occurred";}?></div>
</div>
</div>
<h1>New Message</h1>
<div class="page-content">
<div class="col-xs-12 rbx-tabs-horizontal">
</div>
<?php
if(isset($_GET['recipientId'])){
?>
<div class="buttonrow">
<div class="innerbuttons" style="padding-left:5px;padding-bottom:5px;">
<button type="button" onclick="location.replace('https://www.voidrev.us/my/messages/?tab=inbox')" control-id="ControlID-5"><span class="icon-back"></span></button>
</div>
</div>
<div class="section-content" style="padding: 15px;display:block;">
<div style="display: block;height: fit-content;" class="message-subject">
<div class="sender">
</div>
<form method="POST">
<div class="form-group">
<div name="messagesubt" style="height:50;color:#b8b8b8;display:flex;align-items:center;" class="form-control input-field rbx-comment-input blur">To: <?php echo NoXSSPlz($recipientusername);?></div>
<br>
<input name="messagesubt" style="height:50;" class="form-control input-field rbx-comment-input blur" placeholder="Write your subject.." maxlength="255"></textarea>
<br>
<input name="messagecont" style="height:75;" class="form-control input-field rbx-comment-input blur" placeholder="Write your message.." maxlength="500"></textarea>
<div style="
padding: 5px;
">
<p class="text-warning form-warning-text">Remember, Limbo staff will never ask you for your password. People who ask for your password are trying to steal your account.
<button type="submit" class="btn-primary-md" style="float:right;" control-id="ControlID-5">Send</button></p>
</div>
</div>
</form>
</div>
</div>
</div>
<? } ?>
</div>
</div>
<script type='text/javascript' src='https://www.voidrev.us/js/e20b65b5f3876e969af34b10d11a9b8d.js'></script>
<script type='text/javascript' src='https://www.voidrev.us/js/a3d0fc23f71b8d010b8bf64ed7d52da5.js'></script>
<script type='text/javascript'>Roblox.config.externalResources = [];Roblox.config.paths['Pages.Catalog'] = 'https://www.voidrev.us/js/165e89fea66b7c146c7a723c33ca7108.js';Roblox.config.paths['Pages.CatalogShared'] = 'https://www.voidrev.us/js/2c184f0c9c042d5309458c45dddf6d4e.js';Roblox.config.paths['Widgets.AvatarImage'] = 'https://www.voidrev.us/js/823c7d686e6b3d8321275740fe498f9d.js';Roblox.config.paths['Widgets.DropdownMenu'] = 'https://www.voidrev.us/js/5cf0eb71249768c86649bbf0c98591b0.js';Roblox.config.paths['Widgets.GroupImage'] = 'https://www.voidrev.us/js/556af22c86bce192fb12defcd4d2121c.js';Roblox.config.paths['Widgets.HierarchicalDropdown'] = 'https://www.voidrev.us/js/7689b2fd3f7467640cda2d19e5968409.js';Roblox.config.paths['Widgets.ItemImage'] = 'https://www.voidrev.us/js/8e3d1677fd9198849f05583bc0740555.js';Roblox.config.paths['Widgets.PlaceImage'] = 'https://www.voidrev.us/js/45d46dd8e2bd7f10c17b42f76795150d.js';Roblox.config.paths['Widgets.SurveyModal'] = 'https://www.voidrev.us/js/56ad7af86ee4f8bc82af94269ed50148.js';</script>
</body>
