<?php
	
	use \Slim\Http\Request;
	use \Slim\Http\Response;

	$app->get('/equipes',function(Request $req, Response $res, $args=[]){

		// Levantando equipes da base
		$sql = 'SELECT id,nome,sigla,id_tipo,ativa FROM maxse_equipes ORDER BY id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute();
		$equipes = $stmt->fetchAll();

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($equipes));
	});

	$app->get('/equipes/{id}',function(Request $req, Response $res, $args=[]){
		
		// Verificando se o id passado é numérico
		if(!is_numeric($args['id'])){
			
			// Retornando erro para usuário
			return $res
			->withStatus(400)
			->write('ID de equipe inválido');

		}

		// Lendo id de args
		$idEquipe = 1*$args['id'];

		// Carregando informações particulares da equipe
		$sql = 'SELECT
					id,
					nome,
					sigla,
					id_tipo,
					id_lider,
					ativa
				FROM maxse_equipes
				WHERE
					id=:id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id'=>$idEquipe));
		$equipe = $stmt->fetch();

		// Verificando se retornou algum resultado
		if($equipe === false){
			// Retornando erro para usuário
			return $res
			->withStatus(404)
			->write('Equipe inexistente');
		}

		// Carregando os ids dos membros desta equipe
		$sql = 'SELECT id_usuario FROM maxse_equipes_x_usuarios WHERE id_equipe=:id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id'=>$idEquipe));
		$equipe->ids_membros = array_map(function($a){return 1*$a->id_usuario;} , $stmt->fetchAll());

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($equipe));
		
	});

	$app->put('/equipes/{id}',function(Request $req, Response $res, $args=[]){
		
		// Lendo requisição
		$equipe = json_decode($req->getBody()->getContents());

		// Atualizando dados da equipe
		$sql = 'UPDATE
					maxse_equipes
				SET nome=:nome,
					sigla=:sigla,
					id_lider=:id_lider,
					id_tipo=:id_tipo,
					ativa=:ativa
				WHERE
					id=:id';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(
				array(
					':nome' => $equipe->nome,
					':sigla' => $equipe->sigla,
					':id_lider' => $equipe->lider->id,
					':id_tipo' => $equipe->tipo->id,
					':ativa' => $equipe->ativa,
					':id' => $equipe->id
				)
			);
		} catch (Exception $e) {
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao salvar dados da equipe');
		}

		// Removendo antigos membros da equipe
		$sql = 'DELETE FROM maxse_equipes_x_usuarios WHERE id_equipe=:id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(
			':id' => $equipe->id
		));
		
		// Inserindo novos membros
		$sql = 'INSERT INTO
					maxse_equipes_x_usuarios
					(
						id_equipe,
						id_usuario
					)
					VALUES
					(
						:id_equipe,
						:id_usuario
					)
					';
		$stmt = $this->db->prepare($sql);
		for ($i=0; $i < sizeof($equipe->membros); $i++) { 
			$stmt->execute(
				array(
					':id_equipe' => $equipe->id,
					':id_usuario' => $equipe->membros[$i]->id
				)
			);
		}

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json');
		
	});