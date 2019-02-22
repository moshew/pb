<?php
//header('Content-Type: application/javascript; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$png = imagecreatefrompng('./pb1.png');

//list($width, $height) = getimagesize('./photo.jpg');
list($newwidth, $newheight) = getimagesize('./pb1.png');
$out = imagecreatetruecolor($newwidth, $newheight);
imagecopyresampled($out, imagecreatefromjpeg('./0.jpg'), 90, 90, 590, 0, 460, 660, 752, 1080);
imagecopyresampled($out, imagecreatefromjpeg('./1.jpg'), 650, 90, 590, 0, 460, 660, 752, 1080);
imagecopyresampled($out, imagecreatefromjpeg('./2.jpg'), 90, 830, 590, 0, 460, 660, 752, 1080);
imagecopyresampled($out, imagecreatefromjpeg('./3.jpg'), 650, 830, 590, 0, 460, 660, 752, 1080);
imagecopyresampled($out, $png, 0, 0, 0, 0, $newwidth, $newheight, $newwidth, $newheight);

header("Content-Type: image/jpeg");

//imagejpeg($out, 'out.jpg', 100);
imagejpeg($out);
imagedestroy($out);
exit;
?>