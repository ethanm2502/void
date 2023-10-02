<?php
header('Content-Type: image/png');
die(file_get_contents($_SERVER["DOCUMENT_ROOT"] . '/Thumbs/unknown.png'));
?>