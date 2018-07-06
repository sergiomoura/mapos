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
					id,
					nome,
					email,
					acessoApp,
					acessoWeb,
					ativo FROM maxse_usuarios
				ORDER BY nome';
	} else {
		$sql = 'SELECT
					id,
					nome,
					email,
					acessoApp,
					acessoWeb,
					ativo FROM maxse_usuarios
				WHERE id != 1
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

	// Carregando ids das equipes das quais este usuário participa
	$sql = 'SELECT id_equipe FROM maxse_equipes_x_usuarios WHERE id_usuario=:id_usuario';
	$stmt = $this->db->prepare($sql);
	$stmt->execute(array(
		':id_usuario' => $user->id
	));
	$user->ids_equipes = array_map(function($a){return 1*$a->id_equipe;},$stmt->fetchAll());

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

	// Removendo registro das equipes que usuário participa
	$sql = 'DELETE FROM maxse_equipes_x_usuarios WHERE id_usuario=:id_usuario';
	$stmt = $this->db->prepare($sql);
	$stmt->execute(array(':id_usuario'=>$usuario->id));
	
	// Registrando as equipes das quais usuário faz parte
	$sql = 'INSERT INTO maxse_equipes_x_usuarios
			(
				id_usuario,
				id_equipe
			) VALUES (
				:id_usuario,
				:id_equipe
			)';
	$stmt = $this->db->prepare($sql);
	for ($i=0; $i < sizeof($usuario->equipes); $i++) { 
		$stmt->execute(
			array(
				':id_usuario' => $usuario->id,
				':id_equipe' => $usuario->equipes[$i]->id
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

	// Registrando as equipes das quais usuário faz parte
	$sql = 'INSERT INTO maxse_equipes_x_usuarios
			(
				id_usuario,
				id_equipe
			) VALUES (
				:id_usuario,
				:id_equipe
			)';
	$stmt = $this->db->prepare($sql);
	for ($i=0; $i < sizeof($usuario->equipes); $i++) { 
		$stmt->execute(
			array(
				':id_usuario' => $novoId,
				':id_equipe' => $usuario->equipes[$i]->id
			)
		);
	}
	
	// Registrando no Log
	$this->logger->info('Criado usuário '.$novoId);

	// Retornando resposta para usuário
	return $res
	->withStatus(200)
	->withHeader('Content-Type','application/json')
	->write('{"novoId":'.$novoId.'}');

});