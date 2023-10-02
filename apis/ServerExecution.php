<?php
include ($_SERVER['DOCUMENT_ROOT'].'/SOAP.php');
$apiKey = urldecode($_GET['apiKey']);
$code = urldecode($_GET['code']);
$realapiKey = "R)Z/:9KC3Sk((m]U>4jA='QQxP'S2~%a-[T!";
if($apiKey == $realapiKey){
$JobId = vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex(random_bytes(16)), 4));
$json = json_decode(ScriptExecForFun($code,$JobId),true);
$ServicePort = $json['ServicePort'];
$Response = $json['Response'];
$Success = $json['Success'];
if(is_array($Response)){
$Response = $Response[0];
}
$newjson = ["Success" => $Success, "Response" => $Response, "ServicePort" => $ServicePort];
echo json_encode($newjson);
rccStop($ServicePort);
exit();
}else{
http_response_code(403);
die('Forbidden');
}
?>