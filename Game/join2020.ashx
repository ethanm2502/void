<?php
require($_SERVER['DOCUMENT_ROOT']."/config/includes.php");
header("Content-Type: application/json");
$roblosec = filter_input(INPUT_COOKIE, '_ROBLOSECURITY', FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
$stmt = $con->prepare("SELECT * FROM `users` WHERE `ROBLOSECURITY` = :roblosec");
$stmt->bindParam(':roblosec', $roblosec);
$stmt->execute();
$ticketcheck = $stmt->fetch(PDO::FETCH_ASSOC);
$key = "-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEAr5CobJKCl5sFQi3jqwl5nOgVKwe232sI+Fno8cjcyLIePIHtiP7sTo45TEHT0aEd/LoKglpraEWjADsRVj0m00zQJ9ElC/WMkvRPOXrKaqDgNAM/LpC7ZuO1fF1PzfgXSkZEikGXBbzMN68El7OByQZUSPLRla56q673DlDUIrVNLe6SNxiBdaK/2c5Hepu+YfAjah51dTU3mK70Bhk9yiEenU9yUb6FfTJXFV7qb3jB1arQrqs0ue8lU9ZjKCBC3i8C9GU9/RLin1l9OEhMlwG6yicpUr3sRHWr4NU69grjLS+ipriQgim2RhMdCXvmfq5rjC1UeGpBTDxC+/c7+QIDAQABAoIBAAT+/9v/G1pHHhIxDh6K6XwOmrObx5d6C0pN/LQMvEO11ehw5hqU7pKZt4W1BdscU6cigDQPcKkJ+kaCZ87ldJpkwDOx3vUFKtfvveVr2iDIrTitsvmXQs39wudkHGZHHhqN/1tT3IFcSw92mpHamOHonTNqPY6d5X3HP96XbEIEjLl7Z5ed5NA3s5FiMu4tUuhVD9/truOzRnnbcyDh4lWZPARcodd8GVnNosxvYvEljBmcAqNk2u6ViH0N8e26iw6BHMGUIxYiCJ65PG9EEUUJcKyuOyYj5pGEDwQ0h99eCYnZIBCWEDb0zbeICcED32Ptmleomp8TeHbHijrNvhUCgYEA1v6WdUKnFFN6NG4wmtuyCIbQgkrkz2UgDm5SDKWg52eh5I8QbQ0lR1oWi1MO6+cab8WxIMV4+3kuU2veH24wTj5BtP9R2uyqgRgfrDRLuID9t7oCofUIP19Aw8/VLtZALUUBnoDKQ7X5ErpBQ3h+TucBmYrNuj9qd4WDG02yd5cCgYEA0QzfclS8lrWl5bq2eesPcl5afOKdVBAPXxe0eyqF5Z+jp6YcIJFWjebZ02+nPkm1UB6CpN/LXfrSPiC8990DM8KhxdUbiBa0mOEnidfbAx6Q4soDVXzcsuC6ZIeo34bj+veZgckfMZ3KsgziAg1ngWIBVrSDHaErxrjb4cP12u8CgYAmGznPzuCOWb1vTZiP2iDUIhETBvNHT0U/SY6Bb1n1qgin2jOvIIVbADy+tRoP9gZZiVC73kRzTidH4fac24r0U1SSIC8B/rC58OysORiyuyo9RlrxGd08XkW8bzn58z+sxm5jCbDQD5D2IM0wiEra8Vb3QAL24Aae6Ks0S7E2QQKBgQCnK9wj2Y9WFbyskTsLE+YuVzWVWMLnTlB8gsBZHhAlKBv/HN6xTIgiwdC/PDJJpTfQ8hUXM7+1T7aA6D01GRBOe/5R7bEuirmw55xupqcFP5QtR86Stl7mzL9BVRq+ZWg6cXXYS7UeQEivSY4ShhWXaYAYjhGryA7xwzJSwBoDEQKBgGHUgXxvwU3FohmRtiNrRnCbB4IOG+cPxLWQNGXfptT6Zmav36fu61bp+k/aN/0Lox1QBFVT8/2/Pf4P0tgSm3lpptQNzaGZwzrtOQCjlWE0RwTJp5dD9JM/6tCd1dK97fLPPmDxbJJZ6nkUH0921WM+CA8LaqqFDymVi3wDZ3Z7
-----END RSA PRIVATE KEY-----";
$authid = $ticketcheck['id'];
$authname = $ticketcheck['username'];
$membership = $ticketcheck['membership'];
if(!is_array($ticketcheck)){
$authid = rand(1,9999);
$authname = "Guest ".$authid;
$membership = "BuildersClub";
$accountdays = 365;
}
function authticket($id, $name, $charapp, $jobid, $privatekey) {
global $accountdays;
global $membership;
$time = date('n\/j\/Y\ g\:i\:s\ A');
$namecount = strlen($name);
$membcount = strlen($membership);
$ticket = $time."\n".$jobid."\n".$id."\n0\n0\n".$accountdays."\nf\n".$namecount."\n".$name."\n".$membcount."\n".$membership."\n0\n\n0\n\n9\n".$name;
openssl_sign($ticket, $sig, $privatekey, OPENSSL_ALGO_SHA1);
$sig = base64_encode($sig);
$ticket2 = $id . "\n" . $name . "\n" . $charapp . "\n". $jobid . "\n" . $time;
openssl_sign($ticket2, $sig2, $privatekey, OPENSSL_ALGO_SHA1);
$sig2 = base64_encode($sig2);
$final = $time . ";" . $sig2 . ";" . $sig . ";4";
return($final);
}
ob_start();
?>
{"ClientPort":0,"MachineAddress":"127.0.0.1","ServerPort":53640,"PingUrl":"","PingInterval":120,"UserName":"<?=$authname;?>","DisplayName":"testicles","SeleniumTestMode":false,"UserId":<?=$authid;?>,"SuperSafeChat":false,"CharacterAppearance":"https://www.voidrev.us/v1.1/avatar-fetch/?placeId=1&userId=<?=$authid;?>","ClientTicket":"<?php echo authticket($authid,$authname,"https://www.voidrev.us/v1.1/avatar-fetch/?placeId=1&userId=".$authid,"Test", $key);?>","GameId":"Test","PlaceId":1,"MeasurementUrl":"","WaitingForCharacterGuid":"cad99b30-7983-434b-b24c-eac12595e5fd","BaseUrl":"http://www.voidrev.us/","ChatStyle":"ClassicAndBubble","VendorId":0,"ScreenShotInfo":"","VideoInfo":"","CreatorId":1,"CreatorTypeEnum":"User","MembershipType":"<?=$membership;?>","AccountAge":365,"CookieStoreFirstTimePlayKey":"rbx_evt_ftp","CookieStoreFiveMinutePlayKey":"rbx_evt_fmp","CookieStoreEnabled":true,"IsRobloxPlace":false,"GenerateTeleportJoin":false,"IsUnknownOrUnder13":false,"SessionId":"","DataCenterId":0,"UniverseId":1,"BrowserTrackerId":0,"UsePortraitMode":false,"FollowUserId":0,"CharacterAppearanceId":1}
<?php
$data = "\r\n" . ob_get_clean();
$key = $key;
openssl_sign($data, $sig, $key, OPENSSL_ALGO_SHA256);
echo "--rbxsig2%" . base64_encode($sig) . "%" . $data;
?>