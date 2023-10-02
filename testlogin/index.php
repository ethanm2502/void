<!doctype html>
<html lang="en" data-bs-theme="dark">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Login</title>
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
</head>
<body>
<video id="bg" playsinline autoplay muted loop style="position: fixed; left: 0; right: 0; bottom: 0; min-width: 100%; min-height: 100%; filter: blur(0.4em); object-fit: fit;">
<source src="https://cdn.discordapp.com/attachments/1113511026634276894/1122862712565796884/ezgif.com-resize.mp4" type="video/mp4">
</video>
<div class="container d-flex align-items-center">
<div class="card card-secondary mx-auto text-center">
<div class="card-body">
<img src="https://cdn.discordapp.com/icons/955246646537637909/aeec972e906a30d30ed17a5013a33bc6.png">
<form action="/login/v1" method="post">
<input type="text" class="form-control mb-2" name="username" placeholder="Username">
<input type="password" class="form-control mb-2" name="password" placeholder="Password">
<input type="submit" class="btn btn-primary d-block w-100" name="submit" value="Login">
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