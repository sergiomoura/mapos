<?php

use Slim\Http\Request;
use Slim\Http\Response;

// Rota de Login
$app->post($api_root.'/login', function (Request $req,  Response $res, $args = []) {
	
	// Lendo dados da requisição
	$login = json_decode($req->getBody()->getContents());

	// Erro: não consiga decodificar body
	if(json_last_error() !== JSON_ERROR_NONE){
		return $res->withStatus(400);
	}
	
	/**
	 * INÍCIO DE BLOCO MALÍGNO ================================================
	 * ATUALIZANDO COM O ENVIADO PARA ENTRAR ASSIM MESMO.
	 *
	
		$hash = crypt($login->password);
		$sql = 'UPDATE maxse_usuarios SET password=:pass WHERE username=:username';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(
			':pass' => $hash,
			':username' => $login->username
		));
	
	/**
	 * FIM DO BLOCO MALÍGNO ===================================================
	 */
	
	
	// Tentando carregar usuário da base
	$sql = 'SELECT id,nome,email,password FROM maxse_usuarios WHERE username=:u';
	$stmt = $this->db->prepare($sql);
	$stmt->execute(array(':u' => $login->username));
	$user = $stmt->fetch();
	

	// Se usuário inexistente
	if($user === false) {
		
		// Retornando erro para usuário
		return $res
		->withStatus(403);
	}
	
	// Verificando a senha do usuário
	if(crypt($login->password,$user->password) == $user->password){
		// Senha ok
		
		// Criando o novo token
		$token = uniqid('',true);

		// Setando validade do token
		$valido_ate = (new DateTime())->add(new DateInterval('PT' . $this->maxse['token_duracao'] . 'M'));

		// Atualizando o token do usuário na base
		$sql = 'UPDATE maxse_usuarios SET token=:token, validade_do_token=:valido_ate WHERE id=:id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':token' => $token, ':valido_ate' => $valido_ate->format('Y-m-d H:i:s'), ':id'=>$user->id));

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
		
		// Retornando erro para usuário
		return $res
		->withStatus(403);

	}

	// Log message
	$this->logger->info("Login '/' route");
});

$app->get($api_root.'/refresh', function (Request $req,  Response $res, $args = []) {

	// lendo o token do request
	$token = str_replace('Bearer ','',$req->getHeader('Authorization')[0]);

	// verificando se o token é valido
	$sql = 'SELECT id FROM maxse_usuarios WHERE token=:token AND validade_do_token > NOW()';
	$stmt = $this->db->prepare($sql);
	$stmt->execute(array(':token'=>$token));
	$rs = $stmt->fetch();
	if($rs === false){

		// Token não é válido. Retornando 401
		return $res->withStatus(401);

	} else {

		// Token é válido

		// Criando novo token
		$novoToken = uniqid('',true);

		// Setando nova validade do token
		$valido_ate = (new DateTime())->add(new DateInterval('PT' . $this->maxse['token_duracao'] . 'M'));

		// Atualizando a base com o novo token
		$sql = 'UPDATE maxse_usuarios SET token=:token, validade_do_token=:valido_ate WHERE id=:id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':token'=>$novoToken, ':valido_ate'=>$valido_ate->format('Y-m-d H-:i:s'), ':id'=>$rs->id));
		
		// Retornando para cliente
		return $res->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write('{"novoToken":"'.$novoToken.'"}');

	}

	return $res;
});