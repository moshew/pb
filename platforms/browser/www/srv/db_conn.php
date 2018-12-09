<?php
   $conn = new mysqli('localhost', 'acpd', '1q2w3e', 'acpd');
   $conn->query("SET NAMES 'utf8'");
   $conn->query("SET CHARACTER SET utf8");

   return $conn;
?>