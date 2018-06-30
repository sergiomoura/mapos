<?php

use Slim\Http\Request;
use Slim\Http\Response;

$app->get('/usuarios', function (Request $req,  Response $res, $args = []) {
	
	// Carregando usuários da base
	$sql = 'SELECT
				id,
				nome,
				email,
				acessoApp,
				acessoWeb,
				ativo FROM maxse_usuarios';
	$stmt = $this->db->prepare($sql);
	$stmt->execute();
	$usuarios = $stmt->fetchAll();
	
	// Parsing usuários antes de enviar
	foreach ($usuarios as $u) {
		$u->acessoApp = ($u->acessoApp == "1");
		$u->acessoWeb = ($u->acessoWeb == "1");
		$u->ativo = ($u->ativo == "1");
	}

	// Retornando o objeto $user
	return $res
	->withStatus(200)
	->withHeader('Content-Type','application/json')
	->write(json_encode($usuarios));
	
});

$app->get('/usuarios/{idu}', function (Request $req,  Response $res, $args = []){

	// Lendo o idu a partir dos argumentos da rota
	$idu = 1*$args['idu'];

	// Carregando informações da base
	$sql = 'SELECT id,nome,email,username,acessoApp,acessoWeb,ativo FROM maxse_usuarios WHERE id=:idu';
	$stmt = $this->db->prepare($sql);
	$stmt->execute(array(':idu'=>$idu));
	$user = $stmt->fetch();

	// Parse data
	$user->ativo = ($user->ativo == 1);
	$user->acessoWeb = ($user->acessoWeb == 1);
	$user->acessoApp = ($user->acessoApp == 1);
	$user->id *= 1;

	// Enviando resposta para cliente
	return $res
	->withStatus(200)
	->withHeader('Content-Type','application/json')
	->write(json_encode($user));
});

$app->put('/usuarios/{idu}', function (Request $req, Response $res, $args =[]){
	
	// Lendo o conteúdo da requisição
	$data = json_decode($req->getBody()->getContents());

	// Verificando se a requisição está íntegra
	if(json_last_error() !== JSON_ERROR_NONE){
		return $res->withStatus(400)->write('JSON mal formado');
	}

	$usuario = $data->usuario;
	$senha = $data->senha;

	// Parsing usuario
	$usuario->id *= 1;

	// Verificando se o id  passado na url é igual ao do body
	if($usuario->id != $args['idu']){
		return $res->withStatus(400)->write('Dados inconsistentes');
	}
	
	// Verificando se é para atualizar o password
	if($senha === ''){
		
		// Não é para atualizar a senha
		$sql = 'UPDATE maxse_usuarios SET
					nome=:nome,
					email=:email,
					username=:username,
					ativo=:ativo,
					acessoApp=:acessoApp,
					acessoWeb=:acessoWeb
				WHERE
					id=:id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':nome'     =>$usuario->nome,
				':email'    =>$usuario->email,
				':username' =>$usuario->username,
				':ativo'    =>($usuario->ativo ? 1 : 0),
				':acessoApp'=>($usuario->acessoApp ? 1 : 0),
				':acessoWeb'=>($usuario->acessoWeb ? 1 : 0),
				':id'       =>$usuario->id
			)
		);

	} else {
		
		// É para atualizar senha
		$sql = 'UPDATE maxse_usuarios SET
					nome=:nome,
					email=:email,
					username=:username,
					password=:pass,
					ativo=:ativo,
					acessoApp=:acessoApp,
					acessoWeb=:acessoWeb
				WHERE
					id=:id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':nome'     => $usuario->nome,
				':email'    => $usuario->email,
				':username' => $usuario->username,
				':pass'     => password_hash($senha,PASSWORD_DEFAULT),
				':ativo'    => ($usuario->ativo ? 1 : 0),
				':acessoApp'=> ($usuario->acessoApp ? 1 : 0),
				':acessoWeb'=> ($usuario->acessoWeb ? 1 : 0),
				':id'       => $usuario->id
			)
		);

	}
	
	// Registrando no Log
	$this->logger->info('Alterado usuário '.$usuario->id);

	// Retornando resposta para usuário
	return $res->withStatus(200);
});

$app->post('/usuarios', function (Request $req, Response $res, $args =[]){
	
	// Lendo o conteúdo da requisição
	$data = json_decode($req->getBody()->getContents());

	// Verificando se a requisição está íntegra
	if(json_last_error() !== JSON_ERROR_NONE){
		return $res->withStatus(400)->write('JSON mal formado');
	}

	$usuario = $data->usuario;
	$senha = $data->senha;
	
	// Não é para atualizar a senha
	$sql = 'INSERT INTO maxse_usuarios (
				nome,
				email,
				username,
				ativo,
				acessoApp,
				acessoWeb
			) VALUES (
				:nome,
				:email,
				:username,
				:ativo,
				:acessoApp,
				:acessoWeb
			)';
			
	$stmt = $this->db->prepare($sql);
	$stmt->execute(
		array(
			':nome'     =>$usuario->nome,
			':email'    =>$usuario->email,
			':username' =>$usuario->username,
			':ativo'    =>($usuario->ativo ? 1 : 0),
			':acessoApp'=>($usuario->acessoApp ? 1 : 0),
			':acessoWeb'=>($usuario->acessoWeb ? 1 : 0)
		)
	);

	// Salvando o id do usuário inserido
	$novoId = $this->db->lastInsertId();
	
	// Registrando no Log
	$this->logger->info('Criado usuário '.$novoId);

	// Retornando resposta para usuário
	return $res
	->withStatus(200)
	->withHeader('Content-Type','application/json')
	->write('{"novoId":'.$novoId.'}');

});