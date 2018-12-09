<?php
header('Content-Type: application/javascript; charset=utf-8');

$tag = $_GET['tag'];
$value = (isset($_GET['value']))?$_GET['value']:22;

$conn = require('db_conn.php');
if ($conn->query('select id from tags where active=1 and tag="'.$tag.'"')->num_rows == 0) {
   $conn->query('insert into tags (tag, value) values ("'.$tag.'", '.$value.')');
}
$conn->close();

echo $_GET['callback'].'('.json_encode(['status'=>'ok']).');';
?>

