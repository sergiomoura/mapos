<?php
return [
    'settings' => [
        'displayErrorDetails' => true, // set to false in production
        'addContentLengthHeader' => false, // Allow the web server to send the content-length header

        // Monolog settings
        'logger' => [
            'name' => 'MAXSe-API',
            'path' => isset($_ENV['docker']) ? 'php://stdout' : __DIR__ . '/../logs/app.log',
            'level' => \Monolog\Logger::DEBUG,
        ],

        'db' => [
            'host' => 'localhost',
            'user' => 'root',
            'dbname' => 'maxse000',
            'pass' => 'vaiplaneta'
        ],

        'maxse' => [
            'token_duracao' => 60 // minutos
        ]
    ],
];
