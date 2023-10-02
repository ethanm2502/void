<?php
header("Content-Type: text/plain");
$privatekey = "-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQDOirFwxWKEiVdFMlqqAaIofFcG31hIdEtnoC0tx0Ykx9BpoA3fbStwQfUUv7usn49qCgGh25OWrS88jkr6Y2tce663lLVVEV9pymS9APcoy4quVYn9/FbaDQh/bQGyPUR8AdUKaiA74dPI9w1yVp+uzOHAxHko7ou/9YK/+l3EtQIDAQABAoGAVX9yLmV2/7g+qQVMJJ3ie3HlMJIZ4HxLjozuxsl7ztPsAR1hQMDXP3P+OOWZkb7HRjT4MgFMGg58xEt+3CF1mid0UEmRxIezvrd2X5+muYckj/qOG1LHcYhWcHsp6vO5kejbHdjfY/DEpOGeLmuH6hF3HM+aD5boAgru9SDfgs0CQQDyGyVe1jc5iPZVOaw2n01uvQD59azdnUy2WAb/nB2M+87+vUMrQ7z8Iat+jwSz/EAoL06b4FmEjt30ynWsuRkvAkEA2mUPw0aCnpDMCQHkzp/ASAOiIwHiTzrnPcI2af71eylXTBofD43uFbZKEIq7o6eFng1YGRNDt8kHwiWqvET/WwJAaCo/0ObvycRg39g5fSLbKOsO0XzfTFZSXB3RnQZpPHBW5gk+Lg4t8Hj4FTKpflroq6F2+9/yA/OIEbtOF+tnpwJAOgpLsyDlC9D9eJNZRJRuHHVivJz+kQHdfKtFnMvWX4HwIlh60r5sfLayXk0QawDVYNi5Bgj5oTk655ztEBXiKwJBAILWgqOVjICo4dfmM5cjmrmFydTL9QPuytmCzGNDKY2VO+8xRUgVTpDWfaQ/tGj+AxdAlae1w71DARe6fWItR34=
-----END RSA PRIVATE KEY-----";
function authticket($id, $name, $charapp, $jobid, $privatekey) {
$ticket = $id . "\n" . $jobid . "\n" . date('n\/j\/Y\ g\:i\:s\ A');
openssl_sign($ticket, $sig, $privatekey, OPENSSL_ALGO_SHA1);
$sig = base64_encode($sig);
$ticket2 = $id . "\n" . $name . "\n" . $charapp . "\n". $jobid . "\n" . date('n\/j\/Y\ g\:i\:s\ A');
openssl_sign($ticket2, $sig2, $privatekey, OPENSSL_ALGO_SHA1);
$sig2 = base64_encode($sig2);
$final = date('n\/j\/Y\ g\:i\:s\ A') . ";" . $sig2 . ";" . $sig;
return($final);
}
ob_start();
?>
{"ClientPort":0,"MachineAddress":"localhost","ServerPort":53640,"PingUrl":"","PingInterval":120,"UserName":"Player","SeleniumTestMode":false,"UserId":1,"SuperSafeChat":true,"CharacterAppearance":"http://www.voidrev.us/Asset/CharacterFetch.ashx?userId=1&placeId=1","ClientTicket":"<?=authticket(1, "Player","http://www.voidrev.us/Asset/CharacterFetch.ashx?userId=1&placeId=1" , "Test", $privatekey);?>","PlaceId":1,"MeasurementUrl":"","WaitingForCharacterGuid":"e01c22e4-a428-45f8-ae40-5058b4a1dafc","BaseUrl":"http://www.voidrev.us/","ChatStyle":"ClassicAndBubble","VendorId":0,"ScreenShotInfo":"","VideoInfo":"","CreatorId":1,"CreatorTypeEnum":"User","MembershipType":"None","AccountAge":0,"CookieStoreFirstTimePlayKey":"rbx_evt_ftp","CookieStoreFiveMinutePlayKey":"rbx_evt_fmp","CookieStoreEnabled":true,"IsRobloxPlace":false,"GenerateTeleportJoin":false,"IsUnknownOrUnder13":false,"SessionId":"","DataCenterId":0,"FollowUserId":0,"UniverseId":1}
<?php
$data = "\r\n" . ob_get_clean();
openssl_sign($data, $sig, $privatekey, OPENSSL_ALGO_SHA1);
echo "--rbxsig%" . base64_encode($sig) . "%" . $data;
?>