<?php

	use Slim\Http\Request;
	use Slim\Http\Response;

	$app->get($api_root.'/sses',function(Request $req, Response $res, $args = []){

		// Levantando tipos de equipe na base
		$sql = 'SELECT
					id,
					numero,
					dh_registrado
				FROM
					maxse_sses
				ORDER BY
					dh_registrado DESC';
		$stmt = $this->db->prepare($sql);
		$stmt->execute();
		$sses = $stmt->fetchAll();

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($sses));

	});

	$app->get($api_root.'/sses/{id}',function(Request $req, Response $res, $args = []){
		
		// Lendo os argumentos
		$idSse = $args['id'];

		// Levantando tipos de equipe na base
		$sql = 'SELECT
					id,
					endereco,
					numero,
					id_bairro,
					id_tipo_de_servico,
					dh_registrado,
					dh_recebido,
					dh_ini_exec,
					dh_fim_exec,
					urgente,
					obs
				FROM
					maxse_sses
				WHERE 
					id=:id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id'=>$idSse));
		$sse = $stmt->fetch();

		if($sse === false){
			return $res
			->withStatus(404)
			->write('SSE não encontrada.');
		}

		// Levantando o tipo de medidas com base no tipo do servico
		$sql = 'SELECT medida FROM maxse_tipos_de_servico WHERE id=:id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id'=> $sse->id_tipo_de_servico));
		$rs = $stmt->fetch();

		// Levantando medidas da SSE
		switch ($rs->medida) {
			case 'a':
				$sql = 'SELECT id, l, c, tipo FROM maxse_medidas_area WHERE id_sse=:id_sse';
				$stmt = $this->db->prepare($sql);
				$stmt->execute(array(':id_sse' => $sse->id));
				$sse->medidas_area = $stmt->fetchAll();
				$sse->medidas_linear = array();
				$sse->medidas_unidades = array();
				break;
			
			case 'l':
				$sql = 'SELECT id, v, tipo FROM maxse_medidas_linear WHERE id_sse=:id_sse';
				$stmt = $this->db->prepare($sql);
				$stmt->execute(array(':id_sse' => $sse->id));
				$sse->medidas_area = array();
				$sse->medidas_linear = $stmt->fetchAll();
				$sse->medidas_unidades = array();
				break;

			case 'u':
				$sql = 'SELECT id, n, tipo FROM maxse_medidas_unidades WHERE id_sse=:id_sse';
				$stmt = $this->db->prepare($sql);
				$stmt->execute(array(':id_sse' => $sse->id));
				$sse->medidas_area = array();
				$sse->medidas_linear = array();
				$sse->medidas_unidades = $stmt->fetchAll();
				break;

			default:
				// Retornando erro para usuário
				return $res
				->withStatus(500)
				->write("Tipo de medida desconhecido.");
				break;
		}

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($sse));

	});

	$app->put($api_root.'/sses/{id}', function(Request $req, Response $res, $args = []){
		
		// Lendo corpo da requisição
		$sse = json_decode($req->getBody()->getContents());

		if(json_last_error() !== JSON_ERROR_NONE){
			// Retornando erro para usuário
			return $res
			->withStatus(400)
			->write('Requisição mal formada');
		}

		// Atualizando dados báscos
		try {
			$sql = 'UPDATE
						maxse_sses
					SET
						endereco = :endereco,
						id_bairro = :id_bairro,
						numero = :numero,
						id_tipo_de_servico = :id_tipo_de_servico,
						dh_registrado = now(),
						dh_recebido = :dh_recebido,
						urgente = :urgente,
						obs= :obs
						WHERE id=:id
					';
			$stmt = $this->db->prepare($sql);
			$stmt->execute(array(
				':endereco'				=> $sse->endereco,
				':id_bairro'			=> $sse->bairro->id,
				':numero'				=> $sse->numero	,
				':id_tipo_de_servico'	=> $sse->tipoDeServico->id,
				':dh_recebido'			=> str_replace('Z','',str_replace('.000Z','',$sse->dh_recebido)),
				':urgente'				=> ($sse->urgente?1:0),
				':obs'					=> $sse->obs,
				':id'					=> $sse->id
			));
		} catch (Exception $e) {
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar atualizar SSE: '.$e->getMessage());
		}
		
		// Removendo medidas de area da sse
		$sql = 'DELETE FROM maxse_medidas_area WHERE id_sse=:id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id' => $sse->id));
		
		// Removendo medidas de comprimento da sse
		$sql = 'DELETE FROM maxse_medidas_linear WHERE id_sse=:id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id' => $sse->id));
		
		// Removendo medidas de area da sse
		$sql = 'DELETE FROM maxse_medidas_unidades WHERE id_sse=:id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id' => $sse->id));
		
		// Determinando tabela na qual as medidas serão inseridas
		switch ($sse->tipoDeServico->medida) {
			case 'a':
				$sql = 'INSERT INTO maxse_medidas_area (l,c,id_sse,tipo)
						VALUES (:l,:c,:id,\'p\')';
				$stmt = $this->db->prepare($sql);
				for ($i=0; $i < sizeOf($sse->medidas_area); $i++) { 
					$stmt->execute(array(
						':l' => $sse->medidas_area[$i]->l,
						':c' => $sse->medidas_area[$i]->c,
						':id' => $sse->id
					));
				}
				break;
			
			case 'l':
				$sql = 'INSERT INTO maxse_medidas_linear (v,id_sse,tipo)
						VALUES (:v,:id,\'p\')';
				$stmt = $this->db->prepare($sql);
				for ($i=0; $i < sizeOf($sse->medidas_linear); $i++) { 
					$stmt->execute(array(
						':v' => $sse->medidas_linear[$i]->v,
						':id' => $sse->id
					));
				}
				break;
			
			case 'u':
				$sql = 'INSERT INTO maxse_medidas_unidades (n,id_sse,tipo)
						VALUES (:n,:id,\'p\')';
				$stmt = $this->db->prepare($sql);
				for ($i=0; $i < sizeOf($sse->medidas_unidades); $i++) { 
					$stmt->execute(array(
						':n' => $sse->medidas_unidades[$i]->n,
						':id' => $sse->id
					));
				}
				break;
		}

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json');
	});

	$app->post($api_root.'/sses', function(Request $req, Response $res, $args = []){
		
		// Lendo corpo da requisição
		$sse = json_decode($req->getBody()->getContents());

		// Verificando se o corpo da requisição possui um json válido
		if(json_last_error() !== JSON_ERROR_NONE){
			// Retornando erro para usuário
			return $res
			->withStatus(400)
			->write('Requisição mal formada');
		}

		// Definindo string de consulta
		$sql = 'INSERT INTO maxse_sses
				(
					endereco,
					id_bairro,
					numero,
					id_tipo_de_servico,
					dh_registrado,
					dh_recebido,
					urgente,
					obs
				) VALUES (
					:endereco,
					:id_bairro,
					:numero,
					:id_tipo_de_servico,
					NOW(),
					:dh_recebido,
					:urgente,
					:obs
				)';
		
		// Inserindo dados báscos
		try {
			$stmt = $this->db->prepare($sql);
			$stmt->execute(array(
				':endereco'				=> $sse->endereco,
				':id_bairro'			=> $sse->bairro->id,
				':numero'				=> $sse->numero	,
				':id_tipo_de_servico'	=> $sse->tipoDeServico->id,
				':dh_recebido'			=> str_replace('Z','',str_replace('.000Z','',$sse->dh_recebido)),
				':urgente'				=> ($sse->urgente?1:0),
				':obs'					=> $sse->obs,
			));
		} catch (Exception $e) {
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar atualizar SSE: '.$e->getMessage());
		}
		
		// Recuperando id da SSE recém inserida
		$idNovo = $this->db->lastInsertId();
		
		// Determinando tabela na qual as medidas serão inseridas
		switch ($sse->tipoDeServico->medida) {
			case 'a':
				$sql = 'INSERT INTO maxse_medidas_area (l,c,id_sse,tipo)
						VALUES (:l,:c,:id,\'p\')';
				$stmt = $this->db->prepare($sql);
				for ($i=0; $i < sizeOf($sse->medidas_area); $i++) { 
					$stmt->execute(array(
						':l' => $sse->medidas_area[$i]->l,
						':c' => $sse->medidas_area[$i]->c,
						':id' => $idNovo
					));
				}
				break;
			
			case 'l':
				$sql = 'INSERT INTO maxse_medidas_linear (v,id_sse,tipo)
						VALUES (:v,:id,\'p\')';
				$stmt = $this->db->prepare($sql);
				for ($i=0; $i < sizeOf($sse->medidas_linear); $i++) { 
					$stmt->execute(array(
						':v' => $sse->medidas_linear[$i]->v,
						':id' => $idNovo
					));
				}
				break;
			
			case 'u':
				$sql = 'INSERT INTO maxse_medidas_unidades (n,id_sse,tipo)
						VALUES (:n,:id,\'p\')';
				$stmt = $this->db->prepare($sql);
				for ($i=0; $i < sizeOf($sse->medidas_unidades); $i++) { 
					$stmt->execute(array(
						':n' => $sse->medidas_unidades[$i]->n,
						':id' => $idNovo
					));
				}
				break;
		}

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json');
	});
