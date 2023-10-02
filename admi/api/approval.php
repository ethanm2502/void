<?php
require $_SERVER["DOCUMENT_ROOT"] . "/config/includes.php";
$logged = false;
if ($_COOKIE["password"] || $_COOKIE["_ROBLOSECURITY"]) {
$password = filter_var(
$_COOKIE["password"],
);
$roblosec = filter_var(
$_COOKIE["_ROBLOSECURITY"],
);
$usrquery = $con->prepare(
"SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY"
);
$usrquery->execute(["password" => $password, "ROBLOSECURITY" => $roblosec]);
$usr = $usrquery->fetch();
if (is_array($usr)) {
$logged = true;
} else {
die("no.");
}
} else {
die("bro where are your cookies");
}
$username = $usr["username"];
$uID = $usr["id"];
if ($usr["banned"] > 0) {
header("Location: /banned");
exit();
}
if ($usr["Admin"] != 1) {
header("HTTP/1.0 403 Forbidden", true, 403);
http_response_code(403);
die("Bad Request");
}
if ($_POST["Approve"] && $_POST["isgame"]) {
$itemid = (int) $_POST["itemid"];
$sql = "UPDATE `games` SET `approved`='1' WHERE `id`=:itemid";
$stmt = $con->prepare($sql);
$stmt->bindValue(':itemid', $itemid, PDO::PARAM_INT);
$stmt->execute();
$sql2 = "UPDATE `games` SET `icon`=:itemid WHERE `id`=:itemid2";
$stmt2 = $con->prepare($sql2);
$stmt2->bindValue(':itemid', $itemid, PDO::PARAM_INT);
$stmt2->bindValue(':itemid2', $itemid, PDO::PARAM_INT);
$stmt2->execute();
header("Location: https://www.voidrev.us/admi/?tab=Moderation&item=Approval");
exit();
}
if ($_POST["Unapprove"] && $_POST["isgame"]) {
$itemid = (int) $_POST["itemid"];
$sql = "UPDATE `games` SET `icon`='-2' WHERE `id`=:itemid";
$stmt = $con->prepare($sql);
$stmt->bindValue(':itemid', $itemid, PDO::PARAM_INT);
$stmt->execute();
header("Location: https://www.voidrev.us/admi/?tab=Moderation&item=Approval");
exit();
}
if ($_POST["Unapprove"] && $_POST["isadvert"]) {
$itemid = (int) $_POST["itemid"];
$sql = "DELETE FROM `ads` WHERE `id`=:itemid";
$stmt = $con->prepare($sql);
$stmt->bindValue(':itemid', $itemid, PDO::PARAM_INT);
$stmt->execute();
header("Location: https://www.voidrev.us/admi/?tab=Moderation&item=Approval");
exit();
}
if ($_POST["Approve"] && $_POST["isadvert"]) {
$itemid = (int) $_POST["itemid"];
$sql = "UPDATE `ads` SET `approved`='1' WHERE `id`=:itemid";
$stmt = $con->prepare($sql);
$stmt->bindValue(':itemid', $itemid, PDO::PARAM_INT);
$stmt->execute();
header("Location: https://www.voidrev.us/admi/?tab=Moderation&item=Approval");
exit();
}
if ($_POST["Approve"] && $_POST["isvidadvert"]) {
$itemid = (int) $_POST["itemid"];
$sql = "UPDATE `videoads` SET `approved`='1' WHERE `id`=:itemid";
$stmt = $con->prepare($sql);
$stmt->bindValue(':itemid', $itemid, PDO::PARAM_INT);
$stmt->execute();
header("Location: https://www.voidrev.us/admi/?tab=Moderation&item=Approval");
exit();
}
if ($_POST["Unapprove"] && $_POST["isvidadvert"]) {
$itemid = (int) $_POST["itemid"];
$sql = "DELETE FROM `videoads` WHERE `id`=:itemid";
$stmt = $con->prepare($sql);
$stmt->bindValue(':itemid', $itemid, PDO::PARAM_INT);
$stmt->execute();
unlink($_SERVER["DOCUMENT_ROOT"] . "/videos/" . $itemid . ".mp4");
header("Location: https://www.voidrev.us/admi/?tab=Moderation&item=Approval");
exit();
}
if ($_POST["Approve"] && $_POST["isthumb1"]) {
$itemid = (int) $_POST["itemid"];
$sql = "UPDATE `games` SET `thumb1approved`='1' WHERE `id`=:itemid";
$stmt = $con->prepare($sql);
$stmt->bindValue(':itemid', $itemid, PDO::PARAM_INT);
$stmt->execute();
header("Location: https://www.voidrev.us/admi/?tab=Moderation&item=Approval");
exit();
}
if ($_POST["Approve"] && $_POST["isthumb2"]) {
$itemid = (int) $_POST["itemid"];
$sql = "UPDATE `games` SET `thumb2approved`='1' WHERE `id`=:itemid";
$stmt = $con->prepare($sql);
$stmt->bindValue(':itemid', $itemid, PDO::PARAM_INT);
$stmt->execute();
header("Location: https://www.voidrev.us/admi/?tab=Moderation&item=Approval");
exit();
}
if ($_POST["Approve"] && $_POST["isthumb3"]) {
$itemid = (int) $_POST["itemid"];
$sql = "UPDATE `games` SET `thumb3approved`='1' WHERE `id`=:itemid";
$stmt = $con->prepare($sql);
$stmt->bindValue(':itemid', $itemid, PDO::PARAM_INT);
$stmt->execute();
header("Location: https://www.voidrev.us/admi/?tab=Moderation&item=Approval");
exit();
}
if ($_POST["Approve"]) {
$itemid = (int) $_POST["itemid"];
$sql = "UPDATE `library` SET `approved`='1' WHERE `id`=:itemid";
$stmt = $con->prepare($sql);
$stmt->bindValue(':itemid', $itemid, PDO::PARAM_INT);
$stmt->execute();
header("Location: https://www.voidrev.us/admi/?tab=Moderation&item=Approval");
exit();
}
if ($_POST["Unapprove"]) {
$itemid = (int) $_POST["itemid"];
$libquery = $con->prepare("SELECT * FROM `library` WHERE `id`=:id");
$libquery->bindValue(':id', $itemid, PDO::PARAM_INT);
$libquery->execute();
$libdb = $libquery->fetch();
$fileid = $libdb["fileid"];
$realfileid = $libdb["realfileid"];
unlink($_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $fileid . "");
unlink($_SERVER["DOCUMENT_ROOT"] . "/asset/assets/" . $realfileid . "");
$sql = "DELETE FROM `library` WHERE `id`=:itemid";
$stmt = $con->prepare($sql);
$stmt->bindValue(':itemid', $itemid, PDO::PARAM_INT);
$stmt->execute();
$sql = "DELETE FROM `owneditems` WHERE `itemid`=:itemid";
$stmt = $con->prepare($sql);
$stmt->bindValue(':itemid', $itemid, PDO::PARAM_INT);
$stmt->execute();
header("Location: https://www.voidrev.us/admi/?tab=Moderation&item=Approval");
exit();
}
?>