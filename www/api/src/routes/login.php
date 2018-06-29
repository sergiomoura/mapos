<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Rota de Login
$app->post('/login', function (Request $req,  Response $res, $args = []) {
	
	// Lendo dados da requisição
	$login = json_decode($req->getBody()->getContents());

	// Erro: não consiga decodificar body
	if(json_last_error() !== JSON_ERROR_NONE){
		return $res->withStatus(400);
	}

	// Tentando carregar usuário da base
	$sql = 'SELECT id,nome,email,password FROM maxse_usuarios WHERE username=:u';
	$stmt = $this->db->prepare($sql);
	$stmt->execute(array(':u' => $login->username));
	$user = $stmt->fetch();

	// Se usuário inexistente
	if($user === false) {
		return $res->withStatus(401);
	}

	// Verificando a senha do usuário
	if(password_verify($login->password,$user->password)){
		// Senha ok
		
		// Criando o novo token
		$token = uniqid('',true);

		// Setando validade do token
		$valido_ate = (new DateTime())->add(new DateInterval('PT' . $this->maxse['token_duracao'] . 'M'));

		// Atualizando o token do usuário na base
		$sql = 'UPDATE maxse_usuarios SET token=:token, validade_do_token=:valido_ate';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':token' => $token, ':valido_ate' => $valido_ate->format('Y-m-d H:i:s')));

		// Atribuindo token ao objeto usuário
		$user->token = $token;

		// Removendo senha do objeto $user
		unset($user->password);

		// Retornando o objeto $user
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($user));
	} else {
		// Login falhou
		return $res->withStatus(401);
	}

	// Log message
	$this->logger->info("Login '/' route");
});

$app->get('/refresh', function (Request $req,  Response $res, $args = []) {
	
	// Lendo o token atual
	echo('<pre>');
	print_r($req->getHeader('Authorization'));
	echo('</pre>');
	die();
	

	// Lendo dados da requisição
	$login = json_decode($req->getBody()->getContents());

	// Erro: não consiga decodificar body
	if(json_last_error() !== JSON_ERROR_NONE){
		return $res->withStatus(400);
	}

	// Tentando carregar usuário da base
	$sql = 'SELECT id,nome,email,password FROM maxse_usuarios WHERE username=:u';
	$stmt = $this->db->prepare($sql);
	$stmt->execute(array(':u' => $login->username));
	$user = $stmt->fetch();

	// Se usuário inexistente
	if($user === false) {
		return $res->withStatus(401);
	}

	// Verificando a senha do usuário
	if(password_verify($login->password,$user->password)){
		// Senha ok
		
		// Criando o novo token
		$token = uniqid('',true);

		// Setando validade do token
		$valido_ate = (new DateTime())->add(new DateInterval('PT' . $this->maxse['token_duracao'] . 'M'));

		// Atualizando o token do usuário na base
		$sql = 'UPDATE maxse_usuarios SET token=:token, validade_do_token=:valido_ate';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':token' => $token, ':valido_ate' => $valido_ate->format('Y-m-d H:i:s')));

		// Atribuindo token ao objeto usuário
		$user->token = $token;

		// Removendo senha do objeto $user
		unset($user->password);

		// Retornando o objeto $user
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($user));
	} else {
		// Login falhou
		return $res->withStatus(401);
	}

	// Log message
	$this->logger->info("Login '/' route");
});
