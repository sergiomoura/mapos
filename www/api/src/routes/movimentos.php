<?php

	use Slim\Http\Request;
	use Slim\Http\Response;

	$app->get($api_root.'/estoque/movimentos',function(Request $req, Response $res, $args = []){

		// Levantando movimentos na base
		$sql = 'SELECT *
				FROM
				(SELECT X.id,
						X.dh,
						X.id_produto,
						X.id_referencia,
						X.tipo,
						X.qtde,
						X.valor_unit,
						X.id_sse,
						X.numero_sse,
						X.codigo_tds,
						X.medida,
						Ya.medida_total AS medida_a,
						Yl.medida_total AS medida_l,
						Yu.medida_total AS medida_u
				FROM
					(SELECT a.id,
							a.dh,
							a.id_produto,
							a.id_referencia,
							a.tipo,
							a.qtde,
							a.valor_unit,
							c.id AS id_sse,
							c.numero AS numero_sse,
							d.codigo AS codigo_tds,
							d.medida AS medida
					FROM estoque_movimentos a
					INNER JOIN maxse_tarefas b ON (a.id_referencia=b.id
													AND a.tipo="-1")
					INNER JOIN maxse_sses c ON b.id_sse=c.id
					INNER JOIN maxse_tipos_de_servico d ON d.id=c.id_tipo_de_servico_r) X
				LEFT JOIN (SELECT id_sse, sum(l*c) AS medida_total FROM maxse_medidas_area     WHERE tipo="r" GROUP BY id_sse) Ya ON X.id_sse=Ya.id_sse
				LEFT JOIN (SELECT id_sse, sum(v)   AS medida_total FROM maxse_medidas_linear   WHERE tipo="r" GROUP BY id_sse) Yl ON X.id_sse=Yl.id_sse
				LEFT JOIN (SELECT id_sse, sum(n)   AS medida_total FROM maxse_medidas_unidades WHERE tipo="r" GROUP BY id_sse) Yu ON X.id_sse=Yu.id_sse
				UNION SELECT id,
								dh,
								id_produto,
								id_referencia,
								tipo,
								qtde,
								valor_unit,
								NULL AS id_sse,
								NULL AS numero_sse,
								NULL AS codigo_tds,
								NULL AS medida,
								NULL AS medida_a,
								NULL AS medida_l,
								NULL AS medida_u
				FROM estoque_movimentos
				WHERE tipo="1") T
				ORDER BY dh';
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
			$m->valor_unit *= 1;
		}


		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($movimentos));

	});

	$app->put($api_root.'/estoque/movimentos/{id}',function(Request $req, Response $res, $args = []){
		
		// Lendo argumentos
		$id_movimento = 1*$args['id'];

		// Lendo o produto no body
		$movimento = json_decode($req->getBody()->getContents());

		// Verificando consistência da requisição
		if($id_movimento != $movimento->id){
			// Retornando erro para usuário
			return $res
			->withStatus(400)
			->write('Requisição inconsistente');
		}
		
		// Iniciando Transaction
		$this->db->beginTransaction();

		// Preparando consulta
		$sql = 'UPDATE estoque_movimentos SET
					qtde=:qtde,
					valor_unit=:valor_unit
				WHERE id=:id';
		$stmt = $this->db->prepare($sql);

		try {
			$stmt->execute(array(
				':qtde'		  => $movimento->qtde,
				':valor_unit' => $movimento->valor_unit,
				':id'		  => $movimento->id
			));
		} catch (Exception $e) {
			
			// Erro. Roollback
			$this->db->rollback();

			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar alterar movimento: '.$e->getMessage());
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
		$id_movimento = 1*$args['id'];
		
		// Iniciando Transaction
		$this->db->beginTransaction();

		// Preparando consulta
		$sql = 'DELETE FROM estoque_movimentos WHERE id=:id';
		$stmt = $this->db->prepare($sql);

		try {
			$stmt->execute(array(
				':id'		=> $id_movimento
			));
		} catch (Exception $e) {
			
			// Erro. Roollback
			$this->db->rollback();

			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar remover movimento: '.$e->getMessage());
		}

		// Deu certo! Commit
		$this->db->commit();
		
		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json');
		
	});