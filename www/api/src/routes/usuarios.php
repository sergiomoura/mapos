<?php

use Slim\Http\Request;
use Slim\Http\Response;

$app->get($api_root.'/usuarios', function (Request $req,  Response $res, $args = []) {
	
	// Capturando o id do solicitante
	$token = getTokenFrom($req);
	
	// Levantando o id do usuário
	$sql = 'SELECT id FROM maxse_usuarios WHERE token=:token';
	$stmt = $this->db->prepare($sql);
	$stmt->execute(array(
		':token' => $token
	));
	$idu = ($stmt->fetch())->id;

	// Carregando usuários da base. Excluir o root caso o usuário não seja o próprio
	if($idu == 1){
		$sql = 'SELECT
					a.id,
					b.nome,
					b.email,
					a.acessoApp,
					a.acessoWeb,
					a.ativo
				FROM
					maxse_usuarios a
					INNER JOIN maxse_pessoas b on a.id_pessoa=b.id
				ORDER BY nome';
	} else {
		$sql = 'SELECT
					a.id,
					b.nome,
					b.email,
					a.acessoApp,
					a.acessoWeb,
					a.ativo
				FROM
					maxse_usuarios a
					INNER JOIN maxse_pessoas b on a.id_pessoa=b.id
				WHERE a.id != 1
				ORDER BY nome';
	}

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

$app->get($api_root.'/usuarios/{idu}', function (Request $req,  Response $res, $args = []){

	// Capturando o id do solicitante
	$token = getTokenFrom($req);
	
	// Levantando o id do usuário
	$sql = 'SELECT id FROM maxse_usuarios WHERE token=:token';
	$stmt = $this->db->prepare($sql);
	$stmt->execute(array(
		':token' => $token
	));
	$id_logado = ($stmt->fetch())->id;

	// Lendo o idu a partir dos argumentos da rota
	$idu = 1*$args['idu'];

	if($idu == 1 && $id_logado != 1){
		// Retornando erro para usuário
		return $res
		->withStatus(404)
		->write('Usuário inexistente');
	}

	// Carregando informações da base
	$sql = 'SELECT
				a.id,
				ifnull(b.nome,"ROOT") as nome,
				ifnull(b.email,"root@maxse.servicos.ws") as email,
				a.username,
				a.acessoApp,
				a.acessoWeb,
				a.ativo
			FROM
				maxse_usuarios a
				LEFT JOIN maxse_pessoas b ON a.id_pessoa = b.id
			WHERE a.id=:idu';
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

$app->put($api_root.'/usuarios/{idu}', function (Request $req, Response $res, $args =[]){
	
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

	// Levantando o id da pessoa que o usuário representa
	$sql = 'SELECT id_pessoa FROM maxse_usuarios WHERE id=:id';
	$stmt = $this->db->prepare($sql);
	$stmt->execute(array(
		':id' => $usuario->id
	));
	$id_pessoa = ($stmt->fetch())->id_pessoa;

	// Atualizando tabela de pessoas
	$sql = 'UPDATE maxse_pessoas SET
				nome=:nome,
				email=:email
			WHERE
				id=:id';
	$stmt = $this->db->prepare($sql);
	$stmt->execute(array(
		':nome'     =>$usuario->nome,
		':email'    =>$usuario->email,
		':id'       =>$id_pessoa
	));


	// Verificando se é para atualizar o password
	if($senha === ''){
		
		// Não é para atualizar a senha

		// Atualizando tabela de usuários
		$sql = 'UPDATE maxse_usuarios SET
					username=:username,
					ativo=:ativo,
					acessoApp=:acessoApp,
					acessoWeb=:acessoWeb
				WHERE
					id=:id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
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
				':username' => $usuario->username,
				':pass'     => crypt($senha),
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

$app->post($api_root.'/usuarios', function (Request $req, Response $res, $args =[]){
	
	// Lendo o conteúdo da requisição
	$data = json_decode($req->getBody()->getContents());

	// Verificando se a requisição está íntegra
	if(json_last_error() !== JSON_ERROR_NONE){
		return $res->withStatus(400)->write('JSON mal formado');
	}

	$usuario = $data->usuario;
	$senha = $data->senha;

	// Inserindo na tabela de pessoas
	$sql = 'INSERT INTO maxse_pessoas (
				nome,
				email
			) VALUES (
				:nome,
				:email
			)';
	$stmt = $this->db->prepare($sql);
	$stmt->execute(array(
		':nome'  => $usuario->nome,
		':email' => $usuario->email
	));

	// Recuperando o id da pessoa inserida
	$id_pessoa = $this->db->lastInsertId();
	
	// Inserindo novo usuário
	$sql = 'INSERT INTO maxse_usuarios (
				username,
				ativo,
				acessoApp,
				acessoWeb,
				id_pessoa
			) VALUES (
				:username,
				:ativo,
				:acessoApp,
				:acessoWeb,
				:id_pessoa
			)';
			
	$stmt = $this->db->prepare($sql);
	$stmt->execute(
		array(
			':username' =>$usuario->username,
			':ativo'    =>($usuario->ativo ? 1 : 0),
			':acessoApp'=>($usuario->acessoApp ? 1 : 0),
			':acessoWeb'=>($usuario->acessoWeb ? 1 : 0),
			':id_pessoa'=>$id_pessoa
		)
	);

	// Retornando resposta para usuário
	return $res
	->withStatus(200)
	->withHeader('Content-Type','application/json');

});