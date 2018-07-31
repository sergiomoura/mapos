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
            'host' => 'mysql01-farm61.uni5.net',
            'user' => 'acasamax',
            'dbname' => 'acasamax',
            'pass' => 'u6u8e6a2'
        ],

        'maxse' => [
            'token_duracao' => 60, // minutos,
            'percentual_pago por_finalizacao_parcial' => 0.4, // 40
            'caminho_para_fotos_sse' => '../photos/sses/',
            'caminho_para_fotos_tarefas' => '../photos/tarefas/',
            'STATUS' => [
                'VIRGEM' => 0,
                'AGENDADA' => 1,
                'EM_EXECUCAO' => 2,
                'EXECUCAO_CONCLUIDA' => 3,
                'FINALIZADA' => 100,
                'DIVERGENTE' => -1,
            ]
        ]
    ],
];
