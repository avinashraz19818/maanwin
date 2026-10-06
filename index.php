<?php
require_once __DIR__ . '/api/_core/config.php';
require_once __DIR__ . '/api/_core/bootstrap.php';

$file = __DIR__ . '/index.html';
header('Content-Type: text/html; charset=utf-8');
readfile($file);
?>