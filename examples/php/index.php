<?php

require 'vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$API_KEY = 'YOUR API KEY'; // change this
    
$token = JWT::encode(
  [ 
    'sub' => 'user-id-of-your-app',
    'exp' => time() + 60 * 60,
  ],
  base64_decode($API_KEY),
  'RS256'
);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin', 'http://localhost:3000');
echo json_encode(['token' => $token]);

