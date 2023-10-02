<?php
$filePath = $_SERVER['DOCUMENT_ROOT'] . "/install/link.txt";
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename="' . basename($filePath) . '"');
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filePath));
    
    ob_clean();
    flush();
    
    readfile($filePath);
    exit();
?>