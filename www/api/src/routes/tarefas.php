<?php

	use Slim\Http\Request;
	use Slim\Http\Response;

	$app->get($api_root.'/tarefas/{id}',function(Request $req, Response $res, $args = []){

		// Lendo id da url
		$id_tarefa = 1*$args['id'];

		// Recuperando tarefa da base de dados
		$sql = 'SELECT
					id,
					id_sse,
					id_equipe,
					id_apoio,
					inicio_p,
					inicio_r,
					final_p,
					final_r,
					divergente,
					status
				FROM maxse_tarefas_v
				WHERE id=:id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(':id' => $id_tarefa)
		);
		$tarefa = $stmt->fetch();

		if($tarefa === false){
			// Retornando erro para usuário
			return $res
			->withStatus(404)
			->write('Tarefa inexistente');
		}

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($tarefa));

	});
	
	$app->put($api_root.'/tarefas/{id}',function(Request $req, Response $res, $args = []){

		$tarefa = json_decode($req->getBody()->getContents());

		// Atualizando tarefa
		$sql = 'UPDATE maxse_tarefas SET
					divergente	= :divergente,
					final_p		= :final_p,
					final_r		= :final_r,
					id_apoio	= :id_apoio,
					id_equipe	= :id_equipe,
					id_sse		= :id_sse,
					inicio_p	= :inicio_p,
					inicio_r	= :inicio_r
				WHERE id = :id
				';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(array(
				':divergente' 	=> $tarefa->divergente,
				':final_p' 		=> $tarefa->final_p,
				':final_r' 		=> $tarefa->final_r,
				':id_apoio' 	=> (isset($tarefa->apoio) ? $tarefa->apoio->id : null),
				':id_equipe'	=> $tarefa->equipe->id,
				':id_sse' 		=> $tarefa->id_sse,
				':inicio_p' 	=> $tarefa->inicio_p,
				':inicio_r' 	=> $tarefa->inicio_r,
				':id' 			=> $tarefa->id
			));	
		} catch (Exception $e) {
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar atualizar tarefa: '.$e->getMessage());
		}
		
		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json');
	});

	