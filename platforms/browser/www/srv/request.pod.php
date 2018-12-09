<?php
header('Content-Type: application/javascript; charset=utf-8');

$tag = $_GET['tag'];
$pod_id = $_GET['id'];

$conn = require('db_conn.php');
$pod_row = $conn->query('select price from pods where id='.$pod_id)->fetch_row();
$usr_row = $conn->query('select credit from users where tag="'.$tag.'"')->fetch_row();
if ($pod_row!=null && usr_row!=null) {
   $price = $pod_row[0];
   $credit = $usr_row[0];
   if ($credit>$price) $conn->query('update users set credit=credit-'.$price.' where tag="'.$tag.'"');
}
$conn->close();
require 'login.php';
?>

