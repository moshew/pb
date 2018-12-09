<?php
header('Content-type: application/json; charset=utf-8');

$pods = [];
$conn = require('db_conn.php');
$items = $conn->query('SELECT * FROM pods order by id');
$conn->close();
while($item=$items->fetch_assoc()) array_push($pods, ['id'=>$item['id'], 'title'=>$item['title'], 'rank'=>intval($item['rank']), 'price'=>number_format($item['price'], 2, '.', '')]);

echo $_GET['callback'].'('.json_encode(['pods'=>$pods, 'admin'=>['0000940990']], JSON_UNESCAPED_UNICODE).');';
?>