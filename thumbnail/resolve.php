<?php

$hash = str_replace("/thumbnail/resolve-hash/","",$_SERVER['REQUEST_URI']);
echo '{"Url":"https://www.voidrev.us/'.$hash.'"}';