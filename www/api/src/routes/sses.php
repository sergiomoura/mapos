<?php

	use Slim\Http\Request;
	use Slim\Http\Response;

	$app->get($api_root.'/sses',function(Request $req, Response $res, $args = []){
		
		// Verificando os status requeridos
		if(array_key_exists('status',$_GET)){
			$status_requerido = explode(',',$_GET['status']);
		} else {
			$status_requerido = array();
		}

		// Determinando condição sobre status requeridos
		if(sizeof($status_requerido) == 0) {
			$cndStatus = 'TRUE';
		} else {
			$cndStatus = 'status=sseStatus("' . implode($status_requerido, '") OR status=sseStatus("') .'")';
		}
		
		// Levantando tipos de equipe na base
		$sql = "SELECT
					id,
					endereco,
					id_bairro,
					numero,
					id_tipo_de_servico,
					dh_registrado,
					dh_recebido,
					urgente as urgencia,
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
				WHERE $cndStatus
				ORDER BY
					dh_registrado DESC";
		$stmt = $this->db->prepare($sql);
		$stmt->execute();
		$sses = $stmt->fetchAll();

		// Parsing data para tipos apropriados
		foreach($sses as $sse){
			$sse->id *= 1;
			$sse->id_bairro *= 1;
			$sse->id_equipe = is_null($sse->id_equipe) ? null : 1*$sse->id_equipe;
			$sse->id_apoio = is_null($sse->id_apoio) ? null : 1*$sse->id_apoio;
			$sse->id_tipo_de_servico *= 1;
			$sse->lat *= 1;
			$sse->lng *= 1;
			$sse->status *= 1;
			$sse->urgencia *= 1;
		}

		// Para cada SSE, recuperando as tarefas dela
		$sql = 'SELECT
					id,
					id_equipe,
					id_apoio,
					inicio_p,
					final_p,
					inicio_r,
					final_r,
					divergente,
					autorizadaPor
				FROM
					maxse_tarefas
				WHERE
					id_sse=:id_sse';
		$stmt = $this->db->prepare($sql);
		foreach ($sses as $sse) {
			$stmt->execute(array(':id_sse' => $sse->id));
			$tarefas = $stmt->fetchAll();

			if($tarefas === false){
				// Não há tarefas para esta SSE
				$sse->tarefas = array();
			} else {
				$sse->tarefas = $tarefas;
			}
		}

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
					urgente as urgencia,
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
			->withStatus(503)
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
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(array(
				':endereco'				=> $sse->endereco,
				':id_bairro'			=> $sse->bairro->id,
				':numero'				=> ($sse->numero == '' ? null : $sse->numero),
				':id_tipo_de_servico'	=> $sse->tipoDeServico->id,
				':dh_recebido'			=> str_replace('Z','',str_replace('.000Z','',$sse->dh_recebido)),
				':urgente'				=> $sse->urgencia,
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
				':numero'				=> (trim($sse->numero) == '' ? null : $sse->numero),
				':id_tipo_de_servico'	=> $sse->tipoDeServico->id,
				':dh_recebido'			=> str_replace('Z','',str_replace('.000Z','',$sse->dh_recebido)),
				':urgente'				=> $sse->urgencia,
				':obs'					=> $sse->obs,
				':lat'					=> $sse->lat,
				':lng'					=> $sse->lng
			));
		} catch (Exception $e) {
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar criar SSE: '.$e->getMessage());
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

	$app->patch($api_root.'/sses/{id_sse}/setFinalizada', function(Request $req, Response $res, $args = []){
		
		// Lendo argumentos
		$id_sse = 1*$args['id_sse'];

		// Interpretando o body
		$finalizacaoTotal = ($req->getBody()->getContents() == 'parcial'? false : true);

		// Recuperando dados da SSE
		$sql = 'SELECT 
					a.status,
					b.id as id_tipo_de_servico,
					b.medida 
				FROM
					maxse_sses a
					inner join maxse_tipos_de_servico b on a.id_tipo_de_servico=b.id
				WHERE a.id=:id_sse';

		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_sse' => $id_sse));
		$sse = $stmt->fetch();

		if ($sse === false) {
			// Retornando erro para usuário
			return $res
			->withStatus(404)
			->write('SSE não encontrada');
		}

		// Determinando a quantidade de trabalho realizado na SSE com base em medida
		switch ($sse->medida) {
			case 'a':
				$sql = 'SELECT sum(l*c) AS trabalho FROM maxse_medidas_area WHERE id_sse=:id_sse AND tipo="r"';
				break;
			
			case 'l':
				$sql = 'SELECT sum(v) AS trabalho FROM maxse_medidas_linear WHERE id_sse=:id_sse AND tipo="r"';
				break;
			
			case 'u':
				$sql = 'SELECT sum(n) AS trabalho FROM maxse_medidas_unidades WHERE id_sse=:id_sse AND tipo="r"';
				break;
			
		}

		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_sse' => $id_sse));
		$trabalho = 1*$stmt->fetch()->trabalho;

		// Debitando 40% do valor caso finalização não seja parcial
		if(!$finalizacaoTotal) {
			$trabalho = $this->maxse['percentual_pago por_finalizacao_parcial'] * $trabalho;
		}

		// Determinando o valor do serviço de acordo com a faixa de cobrança do servico
		$sql = 'SELECT
					:trabalho*valor as valor_total
				FROM
					maxse000.maxse_faixas_de_tipos_de_servicos
				WHERE
					:trabalho>li
					AND :trabalho<=ls
					AND id_tipo_de_servico=:id_tipo;';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':trabalho' => $trabalho,
				':id_tipo' => $sse->id_tipo_de_servico
			)
		);
		$valor_total = $stmt->fetch()->valor_total;

		// Iniciando transação
		$this->db->beginTransaction();

		// Preparando consulta
		$sql = 'UPDATE maxse_sses SET status=sseStatus("FINALIZADA"),valor_real=:vr WHERE id=:id_sse';
		$stmt = $this->db->prepare($sql);
		
		try {
			$stmt->execute(array(
				':id_sse' => $id_sse,
				':vr' => $valor_total
			));	
		} catch (Exception $e) {
			// Algo deu errado. Rollback
			$this->db->rollback();

			// Enviando erro
			return $res
			->withStatus(500)
			->write('Falha ao tentar marcar SSE como finalizada');
		}

		// Tudo certo. Comittando
		$this->db->commit();

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json');
	});

	$app->patch($api_root.'/sses/{id_sse}/setRetrabalho', function(Request $req, Response $res, $args = []){
		
		// Lendo argumentos
		$id_sse = 1*$args['id_sse'];

		// Verificando se SSE está finalizada
		$sql = 'SELECT count(*) as n FROM maxse_sses WHERE id=:id_sse AND status=sseStatus("FINALIZADA")';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_sse'=>$id_sse));
		$n = $stmt->fetch()->n;
		if($n != '1'){
			// Retornando erro para usuário
			return $res
			->withStatus(403)
			->write("Esta SSE não está como finalizada.");
		}

		// iniciando transação
		$this->db->beginTransaction();

		$sql = 'UPDATE maxse_sses SET status=sseStatus("RETRABALHO"),ini_retrabalho=now() where id=:id_sse';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(array(':id_sse'=>$id_sse));
		} catch (Exception $e) {
			// Falhou! Rolling back!
			$this->db->rollback();
			
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write("Falha ao tentar atualizar status da SSE para RETRABALHO: ".$e->getMessage());
		}

		// Tudo certo! Commit
		$this->db->commit();

		// Retornando resposta para usuário
		return $res->withStatus(200);		
	});

	$app->patch($api_root.'/sses/{id_sse}/setCancelada', function(Request $req, Response $res, $args = []){
		
		// Lendo argumentos
		$id_sse = 1*$args['id_sse'];

		// Iniciando transação
		$this->db->beginTransaction();

		// Preparando consulta
		$sql = 'UPDATE maxse_sses SET status=sseStatus("CANCELADA") WHERE id=:id_sse';
		$stmt = $this->db->prepare($sql);
		
		try {
			$stmt->execute(array(
				':id_sse' => $id_sse
			));	
		} catch (Exception $e) {
			// Algo deu errado. Rollback
			$this->db->rollback();

			// Enviando erro
			return $res
			->withStatus(500)
			->write('Falha ao tentar marcar SSE como cancelada');
		}

		// Finalizando todas as tarefas da SSE que estão sendo realizadas
		$sql = 'UPDATE maxse_tarefas SET final_r=now() WHERE inicio_r IS NOT NULL and final_r IS NULL AND id_sse=:id_sse';
		$stmt = $this->db->prepare($sql);
		
		try {
			$stmt->execute(array(
				':id_sse' => $id_sse
			));	
		} catch (Exception $e) {
			// Algo deu errado. Rollback
			$this->db->rollback();

			// Enviando erro
			return $res
			->withStatus(500)
			->write('Falha ao finalizar tarefas da sse');
		}

		// Removendo todas as tarefas que foram agendadas para esta sse
		$sql = 'DELETE FROM maxse_tarefas WHERE inicio_r IS NULL AND inicio_p IS NOT NULL AND id_sse=:id_sse';
		$stmt = $this->db->prepare($sql);
		
		try {
			$stmt->execute(array(
				':id_sse' => $id_sse
			));	
		} catch (Exception $e) {
			// Algo deu errado. Rollback
			$this->db->rollback();

			// Enviando erro
			return $res
			->withStatus(500)
			->write('Falha ao tentar remover tarefas agendadas da SSE');
		}

		// Tudo certo. Comittando
		$this->db->commit();

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json');
	});

	$app->patch($api_root.'/sses/{id_sse}/reabrir', function(Request $req, Response $res, $args = []){

		/**
		 * REABRE UMA SSE: DESCOBRE O STATUS DELA COM BASE NAS TAREFAS A ELA ATRIBUIDAS
		 * FLUXO DE CHECAGEM:
		 * Sse tem tarefas?
		 * 	não: [CADASTRADA]
		 * 	sim: [PENDENTE]
		 */

		// Lendo parâmetro
		$id_sse = 1*$args['id_sse'];
		
		// Função que atualiza o status
		function updateTo($status,$id_sse,$db) {
			$sql = 'UPDATE maxse_sses SET status=sseStatus(:status) WHERE id=:id_sse';
			$stmt = $db->prepare($sql);
			$stmt->execute(
				array(
					':id_sse' => $id_sse,
					':status' => $status
				)
			);
		}

		// Verificando se sse tem alguma tarefa associada - - - - - - - - - - - - - -
		$sql = 'SELECT COUNT(*) as n FROM maxse_tarefas WHERE id_sse=:id_sse';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':id_sse' => $id_sse
			)
		);
		$n = $stmt->fetch()->n;
		if($n == 0){
			$status = 'CADASTRADA';
		} else {
			$status = 'PENDENTE';
		}
		updateTo($status,$id_sse,$this->db);

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write('{"novoStatus":"'.$status.'"}');
	
	});