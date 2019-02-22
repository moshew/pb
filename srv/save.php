<?php
//header('Content-Type: application/javascript; charset=utf-8');
error_reporting(E_ALL);
ini_set('display_errors', 1);

$id = isset($_GET["id"]) ? $_GET["id"] : "0";
copy ( "http://192.168.31.116:8080/photo.jpg" , "$id.jpg" )
?>