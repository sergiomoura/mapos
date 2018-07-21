<?php

	use Slim\Http\Request;
	use Slim\Http\Response;

	$app->get($api_root.'/estoque/movimentos',function(Request $req, Response $res, $args = []){

		// Levantando tipos de equipe na base
		$sql = 'SELECT id,id_produto,dh,qtde,tipo,id_referencia FROM estoque_movimentos ORDER BY dh DESC';
		$stmt = $this->db->prepare($sql);
		$stmt->execute();
		$movimentos = $stmt->fetchAll();

		// Parsing response
		foreach($movimentos as $m){
			$m->id *= 1;
			$m->id_produto *= 1;
			$m->qtde *= 1;
			$m->tipo *= 1;
			$m->id_referencia *= 1;
		}


		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($movimentos));

	});

	$app->put($api_root.'/estoque/movimentos/{id}',function(Request $req, Response $res, $args = []){
		
		// Lendo argumentos
		$id_produto = 1*$args['id'];

		// Lendo o produto no body
		$produto = json_decode($req->getBody()->getContents());

		// Verificando consistência da requisição
		if($id_produto != $produto->id){
			// Retornando erro para usuário
			return $res
			->withStatus(400)
			->write('Requisição inconsistente');
		}
		
		// Iniciando Transaction
		$this->db->beginTransaction();

		// Preparando consulta
		$sql = 'UPDATE estoque_produtos SET
					nome 		= :nome,
					qtde_min 	= :qtde_min,
					qtde_max	= :qtde_max,
					unidade		= :unidade
				WHERE id=:id';
		$stmt = $this->db->prepare($sql);

		try {
			$stmt->execute(array(
				':nome'		=> $produto->nome,
				':qtde_min'	=> $produto->qtde_min,
				':qtde_max'	=> ($produto->qtde_max == '' ? null : $produto->qtde_max),
				':unidade'	=> $produto->unidade,
				':id'		=> $produto->id
			));
		} catch (Exception $e) {
			
			// Erro. Roollback
			$this->db->rollback();

			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar alterar produto: '.$e->getMessage());
		}

		// Deu certo! Commit
		$this->db->commit();
		
		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json');
		
	});

	$app->post($api_root.'/estoque/movimentos',function(Request $req, Response $res, $args = []){

		// Lendo o produto no body
		$produto = json_decode($req->getBody()->getContents());
		
		// Iniciando Transaction
		$this->db->beginTransaction();

		// Preparando consulta
		$sql = 'INSERT INTO estoque_produtos (
					nome,
					qtde_min,
					qtde_max,
					unidade
				) VALUES (
					:nome,
					:qtde_min,
					:qtde_max,
					:unidade
				)';
		$stmt = $this->db->prepare($sql);

		try {
			$stmt->execute(array(
				':nome'		=> $produto->nome,
				':qtde_min'	=> $produto->qtde_min,
				':qtde_max'	=> ($produto->qtde_max == '' ? null : $produto->qtde_max),
				':unidade'	=> $produto->unidade,
			));
		} catch (Exception $e) {
			
			// Erro. Roollback
			$this->db->rollback();

			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar adicionar produto: '.$e->getMessage());
		}

		// Deu certo! Commit
		$this->db->commit();
		
		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json');
		
	});

	$app->delete($api_root.'/estoque/movimentos/{id}',function(Request $req, Response $res, $args = []){
		
		// Lendo argumentos
		$id_produto = 1*$args['id'];
		
		// Iniciando Transaction
		$this->db->beginTransaction();

		// Preparando consulta
		$sql = 'DELETE FROM estoque_produtos WHERE id=:id';
		$stmt = $this->db->prepare($sql);

		try {
			$stmt->execute(array(
				':id'		=> $id_produto
			));
		} catch (Exception $e) {
			
			// Erro. Roollback
			$this->db->rollback();

			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar remover produto: '.$e->getMessage());
		}

		// Deu certo! Commit
		$this->db->commit();
		
		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json');
		
	});