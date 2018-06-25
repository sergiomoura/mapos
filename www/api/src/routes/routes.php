<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Routes

$app->get('/echo/{name}', function (Request $request, Response $response, array $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Returning response
    return $response->write($args['name']);
});

$app->get('/', function (Request $req,  Response $res, $args = []) {
    $o = new stdClass();
    $stmt = $this->db->query('select id,nome from cmax_usuarios');
    $row = $stmt->fetch();
    
    $json_string = json_encode($row);
    if($json_string === false){
        echo(json_last_error_msg());
    }
    return $res
            ->withStatus(200)
            ->withHeader('Content-Type','application/json')
            ->write($json_string);
});
