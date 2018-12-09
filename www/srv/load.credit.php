<?php
header('Content-Type: application/javascript; charset=utf-8');

$tag = $_GET['tag'];
$credit_tag = $_GET['credit'];

$conn = require('db_conn.php');
$row = $conn->query('select value from tags where active=1 and tag="'.$credit_tag.'"')->fetch_row();
if ($row!=null) {
   $conn->query('update users set credit=credit+'.$row[0].' where tag="'.$tag.'"');
   $conn->query('update tags set active=0, user="'.$tag.'" where active=1 and tag="'.$credit_tag.'"');
}
$conn->close();
require 'login.php';
?>

