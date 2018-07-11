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

		switch ($rs->medida) {
			case 'a':
				$sql = 'SELECT id, l, c, tipo FROM maxse_medidas_area WHERE id_sse=:id_sse';
				break;
			
			case 'l':
				$sql = 'SELECT id, v, tipo FROM maxse_medidas_linear WHERE id_sse=:id_sse';
				break;

			case 'u':
				$sql = 'SELECT id, n, tipo FROM maxse_medidas_unidades WHERE id_sse=:id_sse';
				break;

			default:
				// Retornando erro para usuário
				return $res
				->withStatus(500)
				->write("Tipo de medida desconhecido.");
				break;
		}

		// Levantando medidas da SSE
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_sse' => $sse->id));
		$sse->medidas = $stmt->fetchAll();

		

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($sse));

	});