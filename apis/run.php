<?php
include ('../vendor/autoload.php');
use Discord\Discord;
use Discord\Parts\Channel\Message;
use Discord\WebSockets\Intents;
use Discord\WebSockets\Event;
// MTA5NjE5MzM5NzQzMTIxNDE3MQ.GtSjKD.28P8mBTmNy29lI3Co6Lvu74b5VTEHfOMWNBV4I
$discord = new \Discord\Discord([
'token' => 'MTA5NjE5MzM5NzQzMTIxNDE3MQ.GtSjKD.28P8mBTmNy29lI3Co6Lvu74b5VTEHfOMWNBV4I',
'intents' => Intents::GUILD_MESSAGES | Intents::GUILD_MEMBERS,
]);
$discord->on('ready', function ($discord) {
echo "Bot is ready.", PHP_EOL;
// Listen for events here
$discord->on('message', function ($message) {
if(str_contains($message->content, '-l ')) {
$code = urlencode(substr($message->content,3));
$json = json_decode(file_get_contents("https://www.voidrev.us/apis/ServerExecution?apiKey=R)Z/:9KC3Sk((m]U%3E4jA=%27QQxP%27S2~%a-[T!&code=".$code.""),true);
if($json['Success'] == true){
$response = $json['Response'];
$serviceport = $json['ServicePort'];
$message->reply($response);
}else{
$response = $json['Response'];
$message->reply('```' . $response . '```');
}
}
});
});
$discord->run();
?>