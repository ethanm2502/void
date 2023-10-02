<?php
require($_SERVER['DOCUMENT_ROOT']."/config/includes.php");
$usr = getUserData($con);
if($usr['activated'] == 1 && $usr['discordid'] != NULL){
die(header("Location: https://www.voidrev.us/home/"));
}
if($_GET['error'] == 1){
$errorMsg = "Sorry, your Discord account is too new to do this, come back later.";
}elseif($_GET['error'] == 2){
$errorMsg = "This Discord account has already been used to activate a Limbo account.";
}elseif($_GET['error'] == 3){
$errorMsg = "Sorry, something went wrong.";
}elseif($_GET['error'] == 4){
$errorMsg = "You've already linked your account.";
}elseif($_GET['error'] == 5){
$errorMsg = "You are not in the server.";
}else{
$errorMsg = "You must link your Discord account.";
}
?>
<!doctype html>
<html lang="en" data-bs-theme="dark">
<head>
<style>
  body{
    margin: 0px;
    padding: 0px;
}

.area{
    background: #4e54c8;  
    background: -webkit-linear-gradient(to left, #8f94fb, #4e54c8);  
    width: 100%;
    height:100vh;
    position: absolute;
   
}

.circles{
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.circles li{
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.2);
    animation: animate 25s linear infinite;
    bottom: -150px;
    
}

.circles li:nth-child(1){
    left: 25%;
    width: 80px;
    height: 80px;
    animation-delay: 0s;
}


.circles li:nth-child(2){
    left: 10%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
    animation-duration: 12s;
}

.circles li:nth-child(3){
    left: 70%;
    width: 20px;
    height: 20px;
    animation-delay: 4s;
}

.circles li:nth-child(4){
    left: 40%;
    width: 60px;
    height: 60px;
    animation-delay: 0s;
    animation-duration: 18s;
}

.circles li:nth-child(5){
    left: 65%;
    width: 20px;
    height: 20px;
    animation-delay: 0s;
}

.circles li:nth-child(6){
    left: 75%;
    width: 110px;
    height: 110px;
    animation-delay: 3s;
}

.circles li:nth-child(7){
    left: 35%;
    width: 150px;
    height: 150px;
    animation-delay: 7s;
}

.circles li:nth-child(8){
    left: 50%;
    width: 25px;
    height: 25px;
    animation-delay: 15s;
    animation-duration: 45s;
}

.circles li:nth-child(9){
    left: 20%;
    width: 15px;
    height: 15px;
    animation-delay: 2s;
    animation-duration: 35s;
}

.circles li:nth-child(10){
    left: 85%;
    width: 150px;
    height: 150px;
    animation-delay: 0s;
    animation-duration: 11s;
}



@keyframes animate {

    0%{
        transform: translateY(0) rotate(0deg);
        opacity: 1;
        border-radius: 0;
    }

    100%{
        transform: translateY(-1000px) rotate(720deg);
        opacity: 0;
        border-radius: 50%;
    }

}
</style>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Activation</title>
<style>
html,
body,
.container {
height: 100%;
}
body {
background: none;
}
.btn-primary {
background: #121212;
}
</style>
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" crossorigin="anonymous">
</script>
</head>
<body>
<div class="area" >
            <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
            </ul>
    </div>
<div class="container d-flex align-items-center">
<div class="card card-secondary mx-auto text-center">
<div class="card-body">
<form action="/users/extrasettings/linking" method="post">
<img src="/img/logo/roblox_logo.png" class="mx-auto" style="max-width: 250px;">
<h4 class="<?php if($errorMsg != "You must link your Discord account."){echo'text-danger';}?>"><?php echo $errorMsg;?></h4>
<input type="submit" class="btn btn-primary d-block w-100 mt-1" name="submit" value="Link">
</form>
</div>
</div>
</div>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz" crossorigin="anonymous"></script>
<script>
document.addEventListener("click", function() {
var video = document.getElementById("bg");
video.play();
});
</script>
</body>
</html>