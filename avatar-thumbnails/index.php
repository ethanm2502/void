<?php
include ($_SERVER['DOCUMENT_ROOT'].'/config/includes.php');
header("Content-Type: text/plain");
$jsoncallback = $_GET['jsoncallback'];
$params = json_decode(urldecode($_GET['params']),true);
$count = count($params);
?>
<?=$jsoncallback;?>([<?php foreach($params as $value){ $arraycounted = $arraycounted + 1;?>{"id":<?=$value['userId'];?>,"name":"<?php echo NoXSSPlz($value['name']);?>","url":"https://www.voidrev.us/users/<?=$value['userId'];?>/profile","thumbnailFinal":true,"thumbnailUrl":"https://www.voidrev.us<?php echo getUserHeadshotThumbnail($con,$value['userId']);?>","bcOverlayUrl":null,"substitutionType":0}<?php if($count != $arraycounted){echo",";} } ?>])