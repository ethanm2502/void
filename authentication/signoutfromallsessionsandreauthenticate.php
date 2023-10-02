<?php
include ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
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
      $uID = $usr['id'];
    }else{
      $logged = false;
      die(http_response_code(403));
    }
  }
  $options = [
    'cost' => 11,
    ];
  $bytes = password_hash(bin2hex(random_bytes(32)), PASSWORD_BCRYPT, $options);
  $sql = $con->prepare("UPDATE `users` SET `ROBLOSECURITY`=:hash WHERE `password`=:oldhash");
  $sql->execute(['hash' => $bytes, 'oldhash' => $roblosec]);
    if (isset($_SERVER['HTTP_COOKIE'])) {
    $cookies = explode(';', $_SERVER['HTTP_COOKIE']);
    foreach($cookies as $cookie) {
    $parts = explode('=', $cookie);
    $name = trim($parts[0]);
    setcookie($name, '', - 24 * 60 * 60);
    setcookie($name, '', - 24 * 60 * 60, '/');
    setcookie($name, '', - 24 * 60 * 60, '/', '.voidrev.us');
    }
    }
    setcookie("access", "yes", time() + 24 * 60 * 60, "/", '.voidrev.us');
  ?>