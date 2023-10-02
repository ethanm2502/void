<?php
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$username = filter_var($_GET['username'], FILTER_SANITIZE_FULL_SPECIAL_CHARS, FILTER_FLAG_NO_ENCODE_QUOTES);
                $checkquery = $con->prepare("SELECT * FROM `users` WHERE `username` = :username");
                $checkquery->execute(['username' => $username]);
                $check = $checkquery->fetch();

header("Content-Type: application/json");

$url = 'https://www.voidrev.us/moderation/v2/filtertext/';

$data = 'text='.$username;

$additional_headers = array(                                                                          
   'Content-Type: application/x-www-form-urlencoded'
);

$ch = curl_init($url);                                                                      
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");                                                                     
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);                                                                  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);                                                                      
curl_setopt($ch, CURLOPT_HTTPHEADER, $additional_headers);

$server_output = curl_exec ($ch);

$server_decoded = json_decode($server_output, false);  

$filtered = $server_decoded->data->AgeUnder13;

if (strpos($filtered, '#') !== false) {
$data = array('IsValid' => 'false', 'ErrorCode' => '2', 'ErrorMessage' => 'Username not appropriate for ROBLOX');
echo json_encode($data);
}else{
if(is_array($check)){
$data = array('IsValid' => 'false', 'ErrorCode' => '1', 'ErrorMessage' => 'This username is already in use.');
echo json_encode($data); 
}else{
$data = array('IsValid' => 'true', 'ErrorCode' => '0', 'ErrorMessage' => '');
echo json_encode($data); 
}
}