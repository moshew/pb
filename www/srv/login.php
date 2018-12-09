<?php
header('Content-Type: application/javascript; charset=utf-8');

$tag = $_GET['tag'];
$credit = 0;

$conn = require('db_conn.php');
$row = $conn->query('select credit from users where tag="'.$tag.'"')->fetch_row();
if ($row==null)  $conn->query('insert into users (tag) value ("'.$tag.'")');
else $credit = $row[0];
$conn->close();

echo $_GET['callback'].'('.json_encode(['credit'=>number_format($credit, 2, '.', '')]).');';
?>

