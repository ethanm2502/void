<?php require ($_SERVER['DOCUMENT_ROOT'].'/config/database.php');
$userid = (int)$_GET["userId"];

$usrquery = $con->prepare("SELECT * FROM `users` WHERE `id` = :id");
$usrquery->execute(['id' => $userid]);
$user = $usrquery->fetch();

$head = $user['HeadColor'];
$leftarm = $user['LeftArmColor'];
$leftleg = $user['LeftLegColor'];
$rightarm = $user['RightArmColor'];
$rightleg = $user['RightLegColor'];
$torso = $user['TorsoColor'];
header("Content-type: text/xml");
?>
<?echo"<?"?>xml version="1.0" encoding="utf-8" ?>
<roblox xmlns:xmime="http://www.w3.org/2005/05/xmlmime" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="http://www.voidrev.us/roblox.xsd" version="4">
  <External>null</External>
  <External>nil</External>
  <Item class="BodyColors">
    <Properties>
      <int name="HeadColor"><?php echo $head;?></int>
      <int name="LeftArmColor"><?php echo $leftarm;?></int>
      <int name="LeftLegColor"><?php echo $leftleg;?></int>
      <string name="Name">Body Colors</string>
      <int name="RightArmColor"><?php echo $rightarm;?></int>
      <int name="RightLegColor"><?php echo $rightleg;?></int>
      <int name="TorsoColor"><?php echo $torso;?></int>
      <bool name="archivable">true</bool>
    </Properties>
  </Item>
</roblox>

