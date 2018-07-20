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

        'db-local' => [
            'host' => 'localhost',
            'user' => 'root',
            'dbname' => 'maxse000',
            'pass' => 'vaiplaneta'
        ],

        'db-remote' => [
            'host' => 'maxse000.mysql.dbaas.com.br',
            'user' => 'maxse000',
            'dbname' => 'maxse000',
            'pass' => 'vaiplaneta'
        ],

        'maxse' => [
            'token_duracao' => 60, // minutos,
            'caminho_para_fotos_sse' => "../photos/sses/",
            'STATUS' => [
                'VIRGEM' => 0,
                'DELEGADA' => 1,
                'EM_EXECUCAO' => 2,
                'EXECUCAO_CONCLUIDA' => 3,
                'FINALIZADA' => 100,
                'DIVERGENTE' => -1,
            ]
        ]
    ],
];
