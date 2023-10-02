<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
// bxmzrwtzkawkstgy
$uID = (int)$_GET['userId'];
$request = filter_var($_GET['request'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
if($request == "verifyemail"){
if($usr['verified'] == 0){
$email = filter_var($_GET['email'], FILTER_SANITIZE_EMAIL);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `email` = :email");
$usrquery->execute(['email' => $email]);
$usr = $usrquery->fetch();
if(!is_array($usr)){
die(http_response_code(403));
}
$username = $usr['username'];
$Ticket = bin2hex(openssl_random_pseudo_bytes(20));
$stmt = $con->prepare("UPDATE `users` SET `verification` = :ticket WHERE `id` = :id");
$stmt->bindParam(':ticket', $Ticket);
$stmt->bindParam(':id', $uID);
$stmt->execute();
$emailUpdate = $con->prepare("UPDATE `users` SET `email` = :email WHERE `id` = :userID");
$emailUpdate->bindParam(":email", $email);
$emailUpdate->bindParam(":userID", $uID);
$emailUpdate->execute();
$link = "https://www.voidrev.us/RobloxVerify.aspx?Mode=emailOnly&Ticket=$Ticket";
$dest = $email;
$subjetc = "Verify Your Email";
$body = "Dear Limbo user,
We are pleased that you have chosen to secure your $username account by providing an email address.
By verifying the email address associated with your Limbo account, you enable a higher level of account security.
Please click the link below to complete the verification process.
$link
voidrev.us";
$headers = "From: limborevival@gmail.com";
if (mail($dest, $subjetc, $body, $headers)) {
echo "Email successfully sent!";
exit();
} else {
echo "Failed to send email.";
exit();
}
}
}
if($request == "passwordreset"){
$email = filter_var($_GET['email'], FILTER_SANITIZE_EMAIL);
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `email` = :email");
$usrquery->execute(['email' => $email]);
$usr = $usrquery->fetch();
$uID = $usr['id'];
$username = $usr['username'];
$Ticket = bin2hex(openssl_random_pseudo_bytes(20));
$stmt = $con->prepare("UPDATE `users` SET `verification` = :ticket WHERE `id` = :id");
$stmt->bindParam(':ticket', $Ticket);
$stmt->bindParam(':id', $uID);
$stmt->execute();
$dest = $email;
$subjetc = "Limbo Account Password Reset";
$body = 'We have received a request to reset the password for your Roblox account: '.$username.'.
If you have submitted this request, please click the button below to proceed.
This link will be active for 1 hour. If you do not wish to reset your password, please disrgard this notice.
https://www.voidrev.us/login/reset-password?Ticket='.$Ticket.'
voidrev.us';
$headers = "From: limborevival@gmail.com";
if (mail($dest, $subjetc, $body, $headers)) {
echo "Email successfully sent!";
exit();
} else {
echo "Failed to send email.";
exit();
}
}
?>