<?php

	use Slim\Http\Request;
	use Slim\Http\Response;

	$app->get($api_root.'/sses',function(Request $req, Response $res, $args = []){

		// Levantando tipos de equipe na base
		$sql = 'SELECT
					id,
					endereco,
					id_bairro,
					numero,
					id_tipo_de_servico,
					dh_registrado,
					dh_recebido,
					urgente,
					obs,
					lat,
					lng,
					Y.id_equipe,
					Y.inicio_p,
					Y.final_p,
					Y.inicio_r,
					Y.final_r,
					Y.id_apoio,
					status
				FROM
					maxse_sses X
				LEFT JOIN
					(SELECT B.id_sse,B.id_equipe,B.inicio_p,B.final_p,B.inicio_r,B.final_r,B.id_apoio FROM
				(SELECT max(id) as id,id_sse FROM maxse_tarefas group by id_sse) A
				INNER JOIN maxse_tarefas B on A.id=B.id) Y on X.id=Y.id_sse
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

	$app->get($api_root.'/sses/pendentes',function(Request $req, Response $res, $args = []){
		
		// Levantando tipos de equipe na base
		$sql = 'SELECT
					id,
					endereco,
					id_bairro,
					numero,
					id_tipo_de_servico,
					dh_registrado,
					dh_recebido,
					urgente,
					obs,
					lat,
					lng,
					status
				FROM
					maxse_sses
				WHERE status <> :status_acabada
				ORDER BY
					dh_registrado DESC';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(
			'status_acabada' => $this->maxse['STATUS']['FINALIZADA']
		));
		$sses = array_map(function($sse){
			$sse->lat *= 1;
			$sse->lng *= 1;
			return $sse;
		},$stmt->fetchAll());

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($sses));

	});

	$app->get($api_root.'/sses/{id}',function(Request $req, Response $res, $args = []){
		
		// Determina a condição comFoto: por padrão manda com foto.
		$comFoto = !(array_key_exists('comFoto',$_GET) && $_GET['comFoto'] == '0');

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
					urgente,
					obs,
					lat,
					lng
				FROM
					maxse_sses
				WHERE 
					id=:id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id'=>$idSse));
		$sse = $stmt->fetch();
		$sse->lat *= 1;
		$sse->lng *= 1;

		if($sse === false){
			return $res
			->withStatus(404)
			->write('SSE não encontrada.');
		}

		// Verificando se está pedindo a SSE com a foto
		if($comFoto) {

			// Verificando se possui foto
			$caminho = $this->maxse['caminho_para_fotos_sse'].$sse->id.'.jpg';
			if(file_exists($caminho)){

				// lendo conteúdo de arquivo
				$data = file_get_contents($caminho);
				
				// encodando para base64
				$data = base64_encode($data);

				// adicionando cabeçalho base64
				$data = 'data:image/jpeg;base64,'.$data;

				// Pondo dentro do parâmetro seguro para angular
				$sse->foto = $data;
			} else {
				$sse->foto = null;
			}
		} else {
			$sse->foto = null;
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

		// Levantando tipo de serviço
		$sql = 'SELECT
					id,
					codigo,
					prazo,
					descricao,
					medida
				FROM 
					maxse_tipos_de_servico
				WHERE id=:id';

		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(
			':id' => $sse->id_tipo_de_servico
		));
		$sse->tipoDeServico = $stmt->fetch();
		$sse->tipoDeServico->prazo *= 1;

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

		// Determinando longitude e latitude do endereço
        $prepAddr = str_replace(' ','+',($sse->endereco.',Campinas,SP'));
        $geocode = file_get_contents('https://maps.google.com/maps/api/geocode/json?address='.$prepAddr.'&sensor=false');
		$output = json_decode($geocode);

		// Verificando se as coordenadas voltaram ok
		if($output->status != 'OK'){
			// Retornando erro para usuário
			return $res
			->withStatus(400)
			->write('Falha ao recuperar coordenadas do endereço: '.$output->status);
		}

        $sse->lat = $output->results[0]->geometry->location->lat;
        $sse->lng = $output->results[0]->geometry->location->lng;

		// Verificando se veio foto
		if (!isset($sse->foto)) {
			$caminho = null;
		} else {
			// Definindo o caminho do arquivo que guardará a imagem
			$caminho = $this->maxse['caminho_para_fotos_sse'].$sse->id.'.jpg';

			// Separando os dados relevantes
			$data = $sse->foto->changingThisBreaksApplicationSecurity;
			$data = str_replace('data:image/jpeg;base64,','',$data);
			$data = base64_decode($data);

			// Abrindo arquivo para escrita
			$ifp = fopen( $caminho, 'wb' ); 

			// Escrevendo dados no arquivo
			fwrite( $ifp, $data);

			// clean up the file resource
			fclose( $ifp ); 
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
						obs = :obs,
						lat = :lat,
						lng = :lng
						WHERE id=:id
					';
			$stmt = $thidescricao
			->db->prepare($sql);
			$stmt->execute(array(
				':endereco'				=> $sse->endereco,
				':id_bairro'			=> $sse->bairro->id,
				':numero'				=> $sse->numero	,
				':id_tipo_de_servico'	=> $sse->tipoDeServico->id,
				':dh_recebido'			=> str_replace('Z','',str_replace('.000Z','',$sse->dh_recebido)),
				':urgente'				=> ($sse->urgente?1:0),
				':obs'					=> $sse->obs,
				':lat'					=> $sse->lat,
				':lng'					=> $sse->lng,
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

		// Determinando longitude e latitude do endereço
        $prepAddr = str_replace(' ','+',($sse->endereco.',Campinas,SP'));
        $geocode = file_get_contents('https://maps.google.com/maps/api/geocode/json?address='.$prepAddr.'&sensor=false');
		$output = json_decode($geocode);
		
		// Verificando se as coordenadas voltaram ok
		if($output->status != 'OK'){
			// Retornando erro para usuário
			return $res
			->withStatus(400)
			->write('Falha ao recuperar coordenadas do endereço: '.$output->status);
		}

        $sse->lat = $output->results[0]->geometry->location->lat;
        $sse->lng = $output->results[0]->geometry->location->lng;

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
					obs,
					lat,
					lng
				) VALUES (
					:endereco,
					:id_bairro,
					:numero,
					:id_tipo_de_servico,
					NOW(),
					:dh_recebido,
					:urgente,
					:obs,
					:lat,
					:lng
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
				':lat'					=> $sse->lat,
				':lng'					=> $sse->lng
			));
		} catch (Exception $e) {
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar atualizar SSE: '.$e->getMessage());
		}
		
		// Recuperando id da SSE recém inserida
		$idNovo = $this->db->lastInsertId();

		// Salvando foto caso ela tenha vindo
		if (isset($sse->foto)) {

			// Determinando o caminho do arquivo
			$caminho = $this->maxse['caminho_para_fotos_sse'].$idNovo.'.jpg';
		
			// Separando os dados relevantes
			$data = $sse->foto->changingThisBreaksApplicationSecurity;
			$data = str_replace('data:image/jpeg;base64,','',$data);
			$data = base64_decode($data);

			// Abrindo arquivo para escrita
			$ifp = fopen( $caminho, 'wb' ); 

			// Escrevendo dados no arquivo
			fwrite( $ifp, $data);

			// clean up the file resource
			fclose( $ifp ); 
		}
		
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
