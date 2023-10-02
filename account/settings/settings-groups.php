<?php
header('Content-Type: application/json');

$data = [
    [ 'title' => 'Account Info', 'url' => 'https://www.voidrev.us/my/account#!/info', 'suffix' => 'info' ],
    [ 'title' => 'Security', 'url' => 'https://www.voidrev.us/my/account#!/security', 'suffix' => 'security' ],
    [ 'title' => 'Privacy', 'url' => 'https://www.voidrev.us/my/account#!/privacy', 'suffix' => 'privacy' ],
    [ 'title' => 'Billing', 'url' => 'https://www.voidrev.us/my/account#!/billing', 'suffix' => 'billing' ],
    [ 'title' => 'Notifications', 'url' => 'https://www.voidrev.us/my/account#!/notifications', 'suffix' => 'notifications' ]
];

echo json_encode($data);
?>
