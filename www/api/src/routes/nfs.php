<?php

	use Slim\Http\Request;
	use Slim\Http\Response;

	$app->post($api_root.'/estoque/nfs',function(Request $req, Response $res, $args = []){

		// Lendo corpo de requisição
		$nf = json_decode($req->getBody()->getContents());

		// Iniciando transação
		$this->db->beginTransaction();

		// Inserindo NF
		$sql = 'INSERT INTO estoque_nfs_entrada (numero,data) VALUES (:n,:d)';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(
				array(
					':n' => $nf->numero,
					':d' => substr($nf->data,0,10)
				)
			);
		} catch (Exception $e1) {
			// Deu erro! Rollback
			$this->db->rollback();

			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar criar NF: '.$e1->getMessage());
		}

		// Até aqui, tudo bem. Recuperando o id da NF
		$nf->id = $this->db->lastInsertId();
		
		// Preparando consulta de inserção de movimento
		$sql = 'INSERT INTO estoque_movimentos (
					id_produto,
					dh,
					tipo,
					qtde,
					id_referencia,
					valor_unit
				) VALUES (
					:id_produto,
					:dh,
					:tipo,
					:qtde,
					:id_referencia,
					:valor_unit
				)';
		$stmt = $this->db->prepare($sql);
		foreach ($nf->movimentos as $movimento) {
			
			// Tentando executar para cada vetor
			try {
				$stmt->execute(
					array(
						':id_produto'	 => $movimento->produto->id,
						':dh'			 => date('Y-m-d H:i:s'),
						':qtde'			 => $movimento->qtde,
						':tipo'			 => 1,
						':id_referencia' => $nf->id,
						':valor_unit' 	 => $movimento->valor_unit
					)
				);
			} catch (Exception $e2) {
				// Deu erro! Rollback!
				$this->db->rollback();

				// Retornando erro para usuário
				return $res
				->withStatus(500)
				->write('Falhou ao tentar inserir movimento: ' . $e2->getMessage().' - '.$stmt->queryString);
			}
		}

		// Se chegamos até aqui, é por que deu tudo certo. Commit!
		$this->db->commit();

		// Retornando resposta para usuário
		return $res
		->withStatus(200);

	});