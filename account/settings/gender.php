<?php include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
$logged = false;
if($_COOKIE['password']){
$password = filter_var($_COOKIE['password'], );
$roblosec = filter_var($_COOKIE['_ROBLOSECURITY'], );
$usrquery = $con->prepare("SELECT * FROM `users` WHERE `password` = :password OR `ROBLOSECURITY` = :ROBLOSECURITY");
$usrquery->execute(['password' => $password, 'ROBLOSECURITY' => $roblosec]);
$usr = $usrquery->fetch();
if($usr != 0){
$logged = true;
}
}
header("Content-Type: application/json");
if(isset($_POST['Gender'])){
$genderinput = (int)$_POST['Gender'];
$profileid = $usr['id'];
if($genderinput == "2"){
$gender = "Male";
}
if($genderinput == "3"){
$gender = "Female";
}
$updatedesc = "UPDATE `users` SET `gender` = :gender WHERE `id` = :profileid";
$stmt = $con->prepare($updatedesc);
$stmt->bindValue(':gender', $gender, PDO::PARAM_STR);
$stmt->bindValue(':profileid', $profileid, PDO::PARAM_INT);
$stmt->execute();
$data = array('gender' => $genderinput);
echo json_encode($data);
}else{
$data = array('gender' => $genderinput);
echo json_encode($data);
}
