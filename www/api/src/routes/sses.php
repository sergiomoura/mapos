<?php

	use Slim\Http\Request;
	use Slim\Http\Response;

	$app->get($api_root.'/sses',function(Request $req, Response $res, $args = []){
		
		// DETERMINANDO CONDIÇÕES DE STATUS = = = = = = = = = = = = = = = = = = = =
		// Verificando os status requeridos
		if(array_key_exists('status',$_GET) && $_GET['status']!=''){
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

		// DETERMINANDO CONDIÇÕES DE EQUIPES = = = = = = = = = = = = = = = = = = = =
		// Verificando as equipes requeridas
		if(array_key_exists('equipes',$_GET) && $_GET['equipes']!= ''){
			$equipes_requeridas = explode(',',$_GET['equipes']);
		} else {
			$equipes_requeridas = array();
		}
		// Determinando condição sobre equipes requeridas
		if(sizeof($equipes_requeridas) == 0) {
			$cndEquipes = 'TRUE';
		} else {
			$cndEquipes = 'id_equipe=' . implode($equipes_requeridas, ' OR id_equipe=');
		}

		// DETERMINANDO CONDIÇÕES DE PRIORIDADES = = = = = = = = = = = = = = = = = =
		// Verificando os prioridades requeridas
		if(array_key_exists('prioridades',$_GET) && $_GET['prioridades']!= ''){
			$prioridades_requeridas = explode(',',$_GET['prioridades']);
		} else {
			$prioridades_requeridas = array();
		}
		// Determinando condição sobre equipes requeridas
		if(sizeof($prioridades_requeridas) == 0) {
			$cndPrioridade = 'TRUE';
		} else {
			$cndPrioridade = 'urgente=' . implode($prioridades_requeridas, ' OR urgente=');
		}

		// DETERMINANDO CONDIÇÃO DE DATA
		if(array_key_exists('agendadas_de',$_GET) && $_GET['agendadas_de']!= ''){
			$cndAgendadasDe = 'inicio_p >= "'.$_GET['agendadas_de'] .'"';
		} else {
			$cndAgendadasDe = TRUE;
		}

		if(array_key_exists('agendadas_ate',$_GET) && $_GET['agendadas_ate']!= ''){
			$cndAgendadasAte = 'inicio_p <= "'.$_GET['agendadas_ate'].' 23:59:59"';
		} else {
			$cndAgendadasAte = TRUE;
		}

		if(array_key_exists('realizadas_de',$_GET) && $_GET['realizadas_de']!= ''){
			$cndRealizadasDe = 'final_r >= "'.$_GET['realizadas_de'] .'"';
		} else {
			$cndRealizadasDe = TRUE;
		}

		if(array_key_exists('realizadas_ate',$_GET) && $_GET['realizadas_ate']!= ''){
			$cndRealizadasAte = 'final_r <= "'.$_GET['realizadas_ate'].' 23:59:59"';
		} else {
			$cndRealizadasAte = TRUE;
		}
		
		// Levantando SSES na base
		$sql = "SELECT
					id,
					endereco,
					id_bairro,
					numero,
					dh_registrado,
					dh_recebido,
					urgente as urgencia,
					obs,
					lat,
					lng,
					data_devolucao,
					valor_prev,
					valor_real,
					id_tipo_de_servico as id_tds_p,
					id_tipo_de_servico_r as id_tds_r,
					prazo_final,
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
				WHERE
					($cndStatus) AND
					($cndEquipes) AND
					($cndPrioridade) AND
					($cndAgendadasDe) AND
					($cndAgendadasAte) AND
					($cndRealizadasDe) AND
					($cndRealizadasAte)
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
			$sse->id_tds_p *= 1;
			$sse->id_tds_r *= 1;
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
				// Há tarefas para esta SSE
				$sse->tarefas = $tarefas;
			}
		}

		// Para cada sse, levanta o consumo de cada uma de suas tarefas
		foreach ($sses as $sse) {
			foreach ($sse->tarefas as $tarefa) {
				$sql = 'SELECT
							round(a.qtde,2) as qtde,
							b.nome,
							b.unidade
						FROM
							estoque_movimentos a
						INNER JOIN
							estoque_produtos b ON a.id_produto=b.id
						WHERE
							a.id_referencia=:id_tarefa';
				$stmt = $this->db->prepare($sql);
				$stmt->execute(array(':id_tarefa' => $tarefa->id));
				$tarefa->consumos = $stmt->fetchAll();
			}
		}

		// Para cada SSE, recuperando as medidas de área previstas
		$sql = 'SELECT
					l,c
				FROM
					maxse_medidas_area
				WHERE
					id_sse=:id_sse AND tipo="p"';
		$stmt = $this->db->prepare($sql);

		foreach ($sses as $sse) {
			$sse->medidas_area = new stdClass();
			$stmt->execute(array(':id_sse' => $sse->id));
			$sse->medidas_area->prev = $stmt->fetchAll();
		}

		// Para cada SSE, recuperando as medidas de área realizadas
		$sql = 'SELECT
					l,c
				FROM
					maxse_medidas_area
				WHERE
					id_sse=:id_sse AND tipo="r"';
		$stmt = $this->db->prepare($sql);

		foreach ($sses as $sse) {
			$stmt->execute(array(':id_sse' => $sse->id));
			$sse->medidas_area->real = $stmt->fetchAll();
		}

		// Para cada SSE, recuperando as medidas lineares previstas
		$sql = 'SELECT
					v
				FROM
					maxse_medidas_linear
				WHERE
					id_sse=:id_sse AND tipo="p"';
		$stmt = $this->db->prepare($sql);

		foreach ($sses as $sse) {
			$sse->medidas_linear = new stdClass();
			$stmt->execute(array(':id_sse' => $sse->id));
			$sse->medidas_linear->prev = $stmt->fetchAll();
		}

		// Para cada SSE, recuperando as medidas lineares realizadas
		$sql = 'SELECT
					v
				FROM
					maxse_medidas_linear
				WHERE
					id_sse=:id_sse AND tipo="r"';
		$stmt = $this->db->prepare($sql);

		foreach ($sses as $sse) {
			$stmt->execute(array(':id_sse' => $sse->id));
			$sse->medidas_linear->real = $stmt->fetchAll();
		}

		// Para cada SSE, recuperando as medidas unitarias previstas
		$sql = 'SELECT
					n
				FROM
					maxse_medidas_unidades
				WHERE
					id_sse=:id_sse AND tipo="p"';
		$stmt = $this->db->prepare($sql);

		foreach ($sses as $sse) {
			$sse->medidas_unidades = new stdClass();
			$stmt->execute(array(':id_sse' => $sse->id));
			$sse->medidas_unidades->prev = $stmt->fetchAll();
		}

		// Para cada SSE, recuperando as medidas unitarias realizadas
		$sql = 'SELECT
					n
				FROM
					maxse_medidas_unidades
				WHERE
					id_sse=:id_sse AND tipo="r"';
		$stmt = $this->db->prepare($sql);

		foreach ($sses as $sse) {
			$stmt->execute(array(':id_sse' => $sse->id));
			$sse->medidas_unidades->real = $stmt->fetchAll();
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
					id_tipo_de_servico as id_tipo_de_servico_p,
					id_tipo_de_servico_r,
					dh_registrado,
					dh_recebido,
					urgente as urgencia,
					status,
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
		
		// Levantando o do tipo de servico previsto
		$stmt->execute(array(':id'=> $sse->id_tipo_de_servico_p));
		$tds_p = $stmt->fetch();

		// Levantando o do tipo de servico realizado
		$stmt->execute(array(':id'=> $sse->id_tipo_de_servico_r));
		$tds_r = $stmt->fetch();

		// Defininfo Objetos que guardarão as medidas
		$sse->medidas_area = new stdClass();
		$sse->medidas_linear = new stdClass();
		$sse->medidas_unidades = new stdClass();

		// Levantando medidas da SSE previstas
		switch ($tds_p->medida) {
			case 'a':
				$sql = 'SELECT id, l, c, tipo FROM maxse_medidas_area WHERE id_sse=:id_sse AND tipo="p"';
				$stmt = $this->db->prepare($sql);
				$stmt->execute(array(':id_sse' => $sse->id));
				$sse->medidas_area->prev = $stmt->fetchAll();
				$sse->medidas_linear->prev = array();
				$sse->medidas_unidades->prev = array();
				break;
			
			case 'l':
				$sql = 'SELECT id, v, tipo FROM maxse_medidas_linear WHERE id_sse=:id_sse AND tipo="p"';
				$stmt = $this->db->prepare($sql);
				$stmt->execute(array(':id_sse' => $sse->id));
				$sse->medidas_area->prev =  array();
				$sse->medidas_linear->prev = $stmt->fetchAll();
				$sse->medidas_unidades->prev = array();
				break;

			case 'u':
				$sql = 'SELECT id, n, tipo FROM maxse_medidas_unidades WHERE id_sse=:id_sse AND tipo="p"';
				$stmt = $this->db->prepare($sql);
				$stmt->execute(array(':id_sse' => $sse->id));
				$sse->medidas_area->prev =  array();
				$sse->medidas_linear->prev = array();
				$sse->medidas_unidades->prev = $stmt->fetchAll();
				break;

			default:
				// Retornando erro para usuário
				return $res
				->withStatus(500)
				->write("(P) Tipo de medida desconhecido  [" . $tds_p->medida .']');
				break;
		}

		// Levantando medidas da SSE realizadas
		switch ($tds_r->medida) {
			case 'a':
				$sql = 'SELECT id, l, c, tipo FROM maxse_medidas_area WHERE id_sse=:id_sse AND tipo="r"';
				$stmt = $this->db->prepare($sql);
				$stmt->execute(array(':id_sse' => $sse->id));
				$sse->medidas_area->real = $stmt->fetchAll();
				$sse->medidas_linear->real = array();
				$sse->medidas_unidades->real = array();
				break;
			
			case 'l':
				$sql = 'SELECT id, v, tipo FROM maxse_medidas_linear WHERE id_sse=:id_sse AND tipo="r"';
				$stmt = $this->db->prepare($sql);
				$stmt->execute(array(':id_sse' => $sse->id));
				$sse->medidas_area->real =  array();
				$sse->medidas_linear->real = $stmt->fetchAll();
				$sse->medidas_unidades->real = array();
				break;

			case 'u':
				$sql = 'SELECT id, n, tipo FROM maxse_medidas_unidades WHERE id_sse=:id_sse AND tipo="r"';
				$stmt = $this->db->prepare($sql);
				$stmt->execute(array(':id_sse' => $sse->id));
				$sse->medidas_area->real =  array();
				$sse->medidas_linear->real = array();
				$sse->medidas_unidades->real = $stmt->fetchAll();
				break;

			default:
				// Retornando erro para usuário
				$sse->medidas_area->real =  array();
				$sse->medidas_linear->real = array();
				$sse->medidas_unidades->real = array();
				break;
		}

		// Levantando tarefas associadas a esta sse
		$sql = 'SELECT
					a.id,
					a.inicio_p,
					a.final_p,
					a.inicio_r,
					a.final_r,
					a.divergente,
					a.autorizadaPor,
					a.obs_ini,
					a.obs_fim,
					b.nome as equipe_nome,
					b.sigla as equipe_sigla,
					c.nome as equipe_tipo_nome
				FROM
					maxse_tarefas a
					INNER JOIN maxse_equipes b ON a.id_equipe=b.id
					INNER JOIN maxse_tipos_de_equipe c ON b.id_tipo=c.id
				WHERE
					a.id_sse = :id_sse
				ORDER BY 
					a.inicio_r
				';

		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_sse' => $sse->id));
		$sse->tarefas = $stmt->fetchAll();

		if($comFoto) {

			// String da raíz da api
			$root = '/maxse/api';
	
			// Gerando url das fotos das tarefas
			foreach ($sse->tarefas as $tarefa) {
				// URL no formato: $api_root/tarefas/{id}/fotos/{momento}/{pos}
				
				
				// Determinando caminho da pasta das fotos da tarefa
				$pasta = $this->maxse['caminho_para_fotos_tarefas'].$tarefa->id;
				
				// Criando arrays de fotos
				$tarefa->fotos = new stdClass();
				$tarefa->fotos->ini = array();
				$tarefa->fotos->fim = array();
				
				// Verificando existência da pasta
				if(file_exists($pasta)) {
					
					// Listando conteúdo das pastas
					$fotos = scandir($pasta);

					// Removenod o . e o ..
					array_shift($fotos);
					array_shift($fotos);
					
					// Classificando arquivos e salvando as urls no array
					for ($i=0; $i < sizeof($fotos); $i++) { 

						// Determinando se é do tipo final ou inicial
						$tipo = substr($fotos[$i],0,3);
						
						// lendo conteúdo de arquivo
						$data = file_get_contents($pasta.'/'.$fotos[$i]);

						// encodando para base64
						$data = base64_encode($data);

						// adicionando cabeçalho base64
						$data = 'data:image/jpeg;base64,'.$data;

						
						if($tipo == 'ini'){
							array_push($tarefa->fotos->ini,$data);
						} elseif ($tipo == 'fim') {
							array_push($tarefa->fotos->fim,$data);
						}
					}
				}
			}
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
		
		// Parsing dh_recebido
		$sse->dh_recebido = DateTime::createFromFormat('Y-m-d\TH:iO',substr($sse->dh_recebido,0,16).'+00:00');
		$sse->dh_recebido = $sse->dh_recebido->sub(new DateInterval('P0DT3H'));
		
		// Calculando o prazo de entrega
		if($sse->urgencia == 2 ){
			// É URGÊNCIA! O prazo de entrega é o dia do recebimento
			$prazo_final = $sse->dh_recebido;
		} else {
			// Não é urgência
			$n_dias = floor($sse->tipoDeServicoPrev->prazo);
			$dia_da_semana = $sse->dh_recebido->format('N');
			if($dia_da_semana + $n_dias >=7){
				$n_dias ++;
			}
			$prazo_final = DateTime::createFromFormat('Y-m-d H:i',$sse->dh_recebido->format('Y-m-d H:i'));
			$prazo_final->add(new DateInterval('P'.$n_dias.'D'));
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

		// Começando transação
		$this->db->beginTransaction();

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
					lng = :lng,
					prazo_final = :prazo_final
					WHERE id=:id
				';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(array(
				':endereco'				=> $sse->endereco,
				':id_bairro'			=> $sse->bairro->id,
				':numero'				=> ($sse->numero == '' ? null : $sse->numero),
				':id_tipo_de_servico'	=> $sse->tipoDeServicoPrev->id,
				':dh_recebido'			=> $sse->dh_recebido->format('Y-m-d H:i:s'),
				':urgente'				=> $sse->urgencia,
				':obs'					=> $sse->obs,
				':lat'					=> $sse->lat,
				':lng'					=> $sse->lng,
				':id'					=> $sse->id,
				':prazo_final'			=> $prazo_final->format('Y-m-d')
			));
		} catch (Exception $e) {
			// Voltando 
			$this->db->rollback();

			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar atualizar SSE: '.$e->getMessage());
		}
		
		// Removendo medidas de area da sse
		$sql = 'DELETE FROM maxse_medidas_area WHERE id_sse=:id AND tipo="p"';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id' => $sse->id));
		
		// Removendo medidas de comprimento da sse
		$sql = 'DELETE FROM maxse_medidas_linear WHERE id_sse=:id AND tipo="p"';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id' => $sse->id));
		
		// Removendo medidas de area da sse
		$sql = 'DELETE FROM maxse_medidas_unidades WHERE id_sse=:id AND tipo="p"';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id' => $sse->id));
		
		// Determinando tabela na qual as medidas serão inseridas e calculando o trabalho
		$trabalho = 0;
		switch ($sse->tipoDeServicoPrev->medida) {
			case 'a':
				$sql = 'INSERT INTO maxse_medidas_area (l,c,id_sse,tipo)
						VALUES (:l,:c,:id,\'p\')';
				$stmt = $this->db->prepare($sql);
				for ($i=0; $i < sizeOf($sse->medidas_area->prev); $i++) { 
					$trabalho += $sse->medidas_area->prev[$i]->l*$sse->medidas_area->prev[$i]->c;
					$stmt->execute(array(
						':l' => $sse->medidas_area->prev[$i]->l,
						':c' => $sse->medidas_area->prev[$i]->c,
						':id' => $sse->id
					));
				}
				break;
			
			case 'l':
				$sql = 'INSERT INTO maxse_medidas_linear (v,id_sse,tipo)
						VALUES (:v,:id,\'p\')';
				$stmt = $this->db->prepare($sql);
				for ($i=0; $i < sizeOf($sse->medidas_linear->prev); $i++) { 
					$trabalho += $sse->medidas_linear->prev[$i]->v; 
					$stmt->execute(array(
						':v' => $sse->medidas_linear->prev[$i]->v,
						':id' => $sse->id
					));
				}
				break;
			
			case 'u':
				$sql = 'INSERT INTO maxse_medidas_unidades (n,id_sse,tipo)
						VALUES (:n,:id,\'p\')';
				$stmt = $this->db->prepare($sql);
				for ($i=0; $i < sizeOf($sse->medidas_unidades->prev); $i++) { 
					$trabalho += $sse->medidas_unidades->prev[$i]->n; 
					$stmt->execute(array(
						':n' => $sse->medidas_unidades->prev[$i]->n,
						':id' => $sse->id
					));
				}
				break;
		}

		// Chegou aqui! Bate o commit!
		$this->db->commit();

		// Determinando o valor do serviço de acordo com a faixa de cobrança do servico
		$sql = 'SELECT
					:trabalho*valor as valor_total
				FROM
					maxse_faixas_de_tipos_de_servicos
				WHERE
					:trabalho>li
					AND :trabalho<=ls
					AND id_tipo_de_servico=:id_tipo;';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':trabalho' => $trabalho,
				':id_tipo' => $sse->tipoDeServicoPrev->id
			)
		);
		$valor_total = $stmt->fetch()->valor_total;

		// Atualizando o valor previsto e real da sse
		$sql = 'UPDATE maxse_sses SET valor_prev=:valor, valor_real=:valor WHERE id=:id_sse ';
		$stmt = $this->db->prepare($sql);
		
		try {
			$stmt->execute(array(
				':id_sse' => $sse->id,
				':valor' => $valor_total
			));
		} catch (Exception $e) {
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar gravar valores da sse: '.$e->getMessage());
		}
		

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json');
	});

	$app->put($api_root.'/sses/{id}/coordenadas', function(Request $req, Response $res, $args = []){
		
		// Lendo corpo da requisição
		$coordenadas = json_decode($req->getBody()->getContents());

		// lendo id_sse
		$id_sse = 1*$args['id'];
		$sql = 'UPDATE maxse_sses SET lat=:lat, lng=:lng WHERE id=:id_sse';
		$stmt = $this->db->prepare($sql);

		try {
			$stmt->execute(
				array(
					':lat' => $coordenadas->lat,
					':lng' => $coordenadas->lng,
					':id_sse' => $id_sse
				)
			);
		} catch (Exception $e) {
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar alterar SSE:' . $e->getMessage());
		}

		// Retornando resposta para usuário
		return $res
		->withStatus(200);
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
		
		// Parsing dh_recebido
		$sse->dh_recebido = DateTime::createFromFormat('Y-m-d\TH:iO',substr($sse->dh_recebido,0,16).'+00:00');
		$sse->dh_recebido = $sse->dh_recebido->sub(new DateInterval('P0DT3H')); // <- Resolvendo o fuso horário

		// Calculando o prazo de entrega
		if($sse->urgencia == 2 ){
			// É URGÊNCIA! O prazo de entrega é o dia do recebimento
			$prazo_final = $sse->dh_recebido;
		} else {
			// Não é urgência
			$n_dias = floor($sse->tipoDeServicoPrev->prazo);
			$dia_da_semana = $sse->dh_recebido->format('N');
			if($dia_da_semana + $n_dias >=7){
				$n_dias ++;
			}
			$prazo_final = DateTime::createFromFormat('Y-m-d H:i',$sse->dh_recebido->format('Y-m-d H:i'));
			$prazo_final->add(new DateInterval('P'.$n_dias.'D'));
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

		// Iniciando transação
		$this->db->beginTransaction();

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
					lng,
					prazo_final
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
					:lng,
					:prazo_final
				)';
		
		// Inserindo dados báscos
		try {
			$stmt = $this->db->prepare($sql);
			$stmt->execute(array(
				':endereco'				=> $sse->endereco,
				':id_bairro'			=> $sse->bairro->id,
				':numero'				=> (trim($sse->numero) == '' ? null : $sse->numero),
				':id_tipo_de_servico'	=> $sse->tipoDeServicoPrev->id,
				':dh_recebido'			=> $sse->dh_recebido->format('Y-m-d H:i:s'),
				':urgente'				=> $sse->urgencia,
				':obs'					=> $sse->obs,
				':lat'					=> $sse->lat,
				':lng'					=> $sse->lng,
				':prazo_final'			=> $prazo_final->format('Y-m-d')
			));
		} catch (Exception $e) {
			// Erro... voltando
			$this->db->rollback();

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
		
		// Determinando tabela na qual as medidas serão inseridas e calculando o volume de trabalho
		$trabalho = 0;
		switch ($sse->tipoDeServicoPrev->medida) {
			case 'a':
				$sql = 'INSERT INTO maxse_medidas_area (l,c,id_sse,tipo)
						VALUES (:l,:c,:id,\'p\')';
				$stmt = $this->db->prepare($sql);
				for ($i=0; $i < sizeOf($sse->medidas_area->prev); $i++) {
					$trabalho += $sse->medidas_area->prev[$i]->l * $sse->medidas_area->prev[$i]->c;

					try {
						$stmt->execute(array(
							':l' => $sse->medidas_area->prev[$i]->l,
							':c' => $sse->medidas_area->prev[$i]->c,
							':id' => $idNovo
						));
					} catch (Exception $e) {
						// Erro. Rollback
						$this->db->rollback();
						
						// Retornando erro para usuário
						return $res
						->withStatus(500)
						->write('Falha ao tentar gravar medidas de área da sse');
					}
				}
				break;
			
			case 'l':
				$sql = 'INSERT INTO maxse_medidas_linear (v,id_sse,tipo)
						VALUES (:v,:id,\'p\')';
				$stmt = $this->db->prepare($sql);
				for ($i=0; $i < sizeOf($sse->medidas_linear->prev); $i++) { 
					$trabalho += $sse->medidas_linear->prev[$i]->v;

					try {
						$stmt->execute(array(
							':v' => $sse->medidas_linear->prev[$i]->v,
							':id' => $idNovo
						));
					} catch (Exception $e) {
						// Erro. Rollback
						$this->db->rollback();
						
						// Retornando erro para usuário
						return $res
						->withStatus(500)
						->write('Falha ao tentar gravar medidas de cumprimento sse');
					}
				}
				break;
			
			case 'u':
				$sql = 'INSERT INTO maxse_medidas_unidades (n,id_sse,tipo)
						VALUES (:n,:id,\'p\')';
				$stmt = $this->db->prepare($sql);
				for ($i=0; $i < sizeOf($sse->medidas_unidades->prev); $i++) { 
					$trabalho += $sse->medidas_unidades->prev[$i]->n;

					try {
						$stmt->execute(array(
							':n' => $sse->medidas_unidades->prev[$i]->n,
							':id' => $idNovo
						));
					} catch (Exception $e) {
						// Erro. Rollback
						$this->db->rollback();
						
						// Retornando erro para usuário
						return $res
						->withStatus(500)
						->write('Falha ao tentar gravar medidas unitárias sse');
					}
					
				}
				break;
		}

		// Commit seguro pra não endoidar o mysql
		$this->db->commit();

		// Determinando o valor do serviço de acordo com a faixa de cobrança do servico
		$sql = 'SELECT
					:trabalho*valor as valor_total
				FROM
					maxse_faixas_de_tipos_de_servicos
				WHERE
					:trabalho>li
					AND :trabalho<=ls
					AND id_tipo_de_servico=:id_tipo;';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':trabalho' => $trabalho,
				':id_tipo' => $sse->tipoDeServicoPrev->id
			)
		);
		$valor_total = $stmt->fetch()->valor_total;

		// Atualizando o valor previsto e real da sse
		$sql = 'UPDATE maxse_sses SET valor_prev=:valor, valor_real=:valor WHERE id=:id_sse ';
		$stmt = $this->db->prepare($sql);

		try {
			$stmt->execute(array(
				':id_sse' => $idNovo,
				':valor' => $valor_total
			));
		} catch (Exception $e) {
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar gravar valores da sse: '.$e->getMessage());
		}
		

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json');
	});

	$app->patch($api_root.'/sses/{id_sse}/setFinalizada', function(Request $req, Response $res, $args = []){
		
		// Lendo argumentos
		$id_sse = 1*$args['id_sse'];

		$dados = json_decode($req->getBody()->getContents());
		

		// Interpretando os dados enviados
		$finalizacaoTotal = ($dados->tipo == 'parcial'? false : true);
		$data_devolucao = $dados->data_devolucao;

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
					maxse_faixas_de_tipos_de_servicos
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
		$sql = 'UPDATE maxse_sses SET status=sseStatus("FINALIZADA"),valor_real=:vr,data_devolucao=:data_devolucao WHERE id=:id_sse';
		$stmt = $this->db->prepare($sql);
		
		try {
			$stmt->execute(array(
				':id_sse' => $id_sse,
				':vr' => $valor_total,
				':data_devolucao' => $data_devolucao
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

	$app->patch($api_root.'/sses/{id_sse}/finalizaRetrabalho', function(Request $req, Response $res, $args = []){
		
		// Lendo argumentos
		$id_sse = 1*$args['id_sse'];

		// Verificando se SSE está em RETRABALHO
		$sql = 'SELECT count(*) as n FROM maxse_sses WHERE id=:id_sse AND status=sseStatus("RETRABALHO")';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_sse'=>$id_sse));
		$n = $stmt->fetch()->n;
		if($n != '1'){
			// Retornando erro para usuário
			return $res
			->withStatus(403)
			->write("Esta SSE não está como retrabalho.");
		}

		// iniciando transação
		$this->db->beginTransaction();

		$sql = 'UPDATE maxse_sses SET status=sseStatus("FINALIZADA"),fim_retrabalho=now() where id=:id_sse';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(array(':id_sse'=>$id_sse));
		} catch (Exception $e) {
			// Falhou! Rolling back!
			$this->db->rollback();
			
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write("Falha ao tentar finalizar retrabalho da SSE: ".$e->getMessage());
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

		// Iniciando e Finalizando todas as tarefas que não foram iniciadas
		$sql = 'UPDATE maxse_tarefas SET inicio_r=now(), final_r=now() WHERE inicio_r IS NULL AND id_sse=:id_sse';
		$stmt = $this->db->prepare($sql);
		
		try {
			$stmt->execute(array(':id_sse' => $id_sse));
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

	$app->patch($api_root.'/sses/{id_sse}/setAutorizada', function(Request $req, Response $res, $args = []){
		
		// Lendo o conteúdo do body
		$dados = json_decode($req->getBody()->getContents());

		// Verificando se a sse tem mais de uma tarefa divergente. NÃO É PRA TER NUNCA, mais só pra garantir.
		$sql = 'SELECT count(*) as n FROM maxse_tarefas WHERE id_sse=:id_sse AND divergente=1';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_sse' => $dados->id_sse));
		if($stmt->fetch()->n > 1){
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('SSE está com mais de uma tarefa divergente!');
		}

		// Começando transação
		$this->db->beginTransaction();

		// Autorizando na tarefa
		$sql = 'UPDATE maxse_tarefas SET autorizadaPor=:autorizadaPor WHERE id_sse=:id_sse AND divergente=1';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':autorizadaPor' => $dados->autorizadaPor,
				':id_sse' => $dados->id_sse,

			)
		);

		// Alterando a sse para o status adequado
		$sql = 'UPDATE maxse_sses SET status=sseStatus("AGENDADA") WHERE id=:id_sse';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_sse' => $dados->id_sse));
		
		// Se chegou até aqui, commita
		$this->db->commit();

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