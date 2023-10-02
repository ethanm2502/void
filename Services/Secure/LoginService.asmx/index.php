<?php header('Content-Type: application/json; charset=utf-8');
$data = array('message' => 'success');
header('Content-type: application/json');
echo json_encode($data);
?>

