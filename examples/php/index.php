<?php

require 'vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$PRIVATE_KEY = 'LS0tLS1CRUdJTiBQUklWQVRFIEtFWS0tLS0tCk1JSUJWZ0lCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQVVBd2dnRThBZ0VBQWtFQXpHVkFRVWhNTmtUbHpxUGkKVVRLaUdIUzQ0R1Zzc2dmbHRzcWgxQUcxTjJzVVRUbTlWQW5oRFh2c1BKdFhrOGJJd2RQRFVWU2IxZlMrd1VISwoxdVgyN3dJREFRQUJBa0JtOVFtczJMSXJGQUYrV1djQzU3Sm5CMFNwSSszZ3I4R3lsZGQyWjNYVTk1K2ZHd2Z1CnlMb3U1cmdUT2wyR0R2T3N4b2lKUExsLzJpb04vOHk3MzVjaEFpRUEvUUUrSTY2V2IzUFpHdkFhNzBZUklvY3cKbkZiRWgyRzJWbzZiblNaOUdkVUNJUURPMExGUksvbXZ3K0I5eDlCMk1tRE1nalpMM0xaMTBYMVViLzJKc2EzTApzd0loQUpJeFhxT2xwVjJmVmtzZmhLRFFIdVNSczRBVER4cWZWb29yZXpYU1lLVkZBaUVBbksxcmQ3UVo3M2MwCkxmWGZUbnZ4NjF6R0o0aW96ZThMeEprbStWYWE5Sk1DSVFDU2U2T2ZLODZKWVFESXgvSVljdzQwZnBWNUprVFcKOUZpUjdQZUhiZE1KUEE9PQotLS0tLUVORCBQUklWQVRFIEtFWS0tLS0tCg==';
    
$token = JWT::encode(
  [ 
    'sub' => '',
    'iat' => '',
  ],
  base64_decode($PRIVATE_KEY),
  'RS256'
);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>onboarden Demo</title>
  <script src=""></script>
</head>
<body>
  <button id="import">インポート</button>

  <script>
    const token = '<?php echo $token; ?>';
    console.log("token ", token);
    launch({ templateId: "YOUR TEMPLATE ID", token });


    document.querySelector('#import').addEventListener('click', async () => {
      await launch({ templateId: "YOUR TEMPLATE ID", token });
    })
  </script>
</body>
</html>