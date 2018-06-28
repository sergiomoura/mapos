<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Rota de Login
$app->get('/usuarios', function (Request $req,  Response $res, $args = []) {
	
	// Carregando usuários da base
	$sql = 'SELECT id,nome,email FROM maxse_usuarios';
	$stmt = $this->db->prepare($sql);
	$stmt->execute();
	$usuarios = $stmt->fetchAll();

    // Retornando o objeto $user
    return $res
    ->withStatus(200)
    ->withHeader('Content-Type','application/json')
    ->write(json_encode($usuarios));
	
});
