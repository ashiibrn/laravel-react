<?php

return [
    /*
    |----------------------------------------------------------------------
    | Laravel CORS Options
    |----------------------------------------------------------------------
    |
    | All CORS settings are defined here.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Allow CORS for API routes and CSRF cookie endpoint

    'allowed_methods' => ['*'], // Allow all HTTP methods (GET, POST, PUT, DELETE, etc.)

    'allowed_origins' => ['*'],

    'allowed_headers' => ['*'], // Allow all headers

    'exposed_headers' => ['Authorization'], // Expose Authorization header to allow token usage

    'max_age' => 0, // No caching of CORS preflight requests

    'supports_credentials' => true, // Allow cookies or authorization headers with credentials
];
