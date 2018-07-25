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
	
	$app->get($api_root.'/tarefas/{id}/all',function(Request $req, Response $res, $args = []){

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
					divergente
				FROM maxse_tarefas
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

		// Levantando informações da SSE
		$sql = 'SELECT
					id,
					numero,
					endereco,
					id_tipo_de_servico,
					obs
				FROM 
					maxse_sses 
				WHERE 
					id = :id_sse';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':id_sse' => $tarefa->id_sse
			)
		);
		$sse = $stmt->fetch();

		// Associando sse à tarefa
		$tarefa->sse = $sse;
		unset($tarefa->id_sse);

		// Levantando tipo de servico da sse;
		$sql = 'SELECT
					id,
					prazo,
					codigo,
					descricao,
					medida
				FROM
					maxse_tipos_de_servico
				WHERE
					id=:id_tds';
		
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':id_tds' => $tarefa->sse->id_tipo_de_servico
			)
		);
		$tarefa->sse->tipoDeServico = $stmt->fetch();
		unset($tarefa->sse->id_tipo_de_servico);

		// Levantando medidas da SSE
		switch ($tarefa->sse->tipoDeServico->medida) {
			case 'a':
				// Carregando medidas da sse
				$sql = 'SELECT id, l, c, tipo FROM maxse_medidas_area WHERE id_sse=:id_sse';
				$stmt = $this->db->prepare($sql);
				$stmt->execute(array(':id_sse' => $sse->id));
				$medidas = $stmt->fetchAll();

				// Criando classe objeto para guardar as medidas
				$sse->medidas_area = new stdClass();
				$sse->medidas_area->real = array();
				$sse->medidas_area->prev = array();

				// Classificando entre medidas prev e medidas real
				foreach ($medidas as $m) {
					if($m->tipo === 'p') {
						array_push($sse->medidas_area->prev,$m);
					} else {
						array_push($sse->medidas_area->real,$m);
					}
				}
				
				// Criando vetores vazios para medidas lineares e para medidas de unidade
				$sse->medidas_linear = new stdClass();
				$sse->medidas_linear->real = array();
				$sse->medidas_linear->prev = array();
				
				$sse->medidas_unidades = new stdClass();
				$sse->medidas_unidades->real = array();
				$sse->medidas_unidades->prev = array();
				
				break;
			
			case 'l':
				// Carregando medidas da sse
				$sql = 'SELECT id, v, tipo FROM maxse_medidas_linear WHERE id_sse=:id_sse';
				$stmt = $this->db->prepare($sql);
				$stmt->execute(array(':id_sse' => $sse->id));
				$medidas = $stmt->fetchAll();

				// Criando classe objeto para guardar as medidas
				$sse->medidas_linear = new stdClass();
				$sse->medidas_linear->real = array();
				$sse->medidas_linear->prev = array();

				// Classificando entre medidas prev e medidas real
				foreach ($medidas as $m) {
					if($m->tipo === 'p') {
						array_push($sse->medidas_linear->prev,$m);
					} else {
						array_push($sse->medidas_linear->real,$m);
					}
				}
				
				// Criando vetores vazios para medidas lineares e para medidas de unidade
				$sse->medidas_area = new stdClass();
				$sse->medidas_area->real = array();
				$sse->medidas_area->prev = array();
				
				$sse->medidas_unidades = new stdClass();
				$sse->medidas_unidades->real = array();
				$sse->medidas_unidades->prev = array();

			case 'u':
				// Carregando medidas da sse
				$sql = 'SELECT id, n, tipo FROM maxse_medidas_unidades WHERE id_sse=:id_sse';
				$stmt = $this->db->prepare($sql);
				$stmt->execute(array(':id_sse' => $sse->id));
				$medidas = $stmt->fetchAll();

				// Criando classe objeto para guardar as medidas
				$sse->medidas_unidades = new stdClass();
				$sse->medidas_unidades->real = array();
				$sse->medidas_unidades->prev = array();

				// Classificando entre medidas prev e medidas real
				foreach ($medidas as $m) {
					if($m->tipo === 'p') {
						array_push($sse->medidas_unidades->prev,$m);
					} else {
						array_push($sse->medidas_unidades->real,$m);
					}
				}
				
				// Criando vetores vazios para medidas lineares e para medidas de unidade
				$sse->medidas_area = new stdClass();
				$sse->medidas_area->real = array();
				$sse->medidas_area->prev = array();
				
				$sse->medidas_linear = new stdClass();
				$sse->medidas_linear->real = array();
				$sse->medidas_linear->prev = array();

			default:
				// Retornando erro para usuário
				return $res
				->withStatus(500)
				->write("Tipo de medida desconhecido.");
				break;
		}

		// Levantando equipe que irá realizar a tarefa
		$sql = 'SELECT id,nome,sigla FROM maxse_equipes WHERE id=:id_equipe';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':id_equipe' => $tarefa->id_equipe
			)
		);
		$tarefa->equipe = $stmt->fetch();
		unset($tarefa->id_equipe);

		
		// Levantando apoio que irá realizar a tarefa
		$sql = 'SELECT id,nome,sigla FROM maxse_equipes WHERE id=:id_apoio';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':id_apoio' => $tarefa->id_apoio
			)
		);
		$apoio = $stmt->fetch();
		$tarefa->apoio = (false === $apoio ? null : $apoio);
		unset($tarefa->id_apoio);

		// Levantando fotos, se for o caso
		if(array_key_exists('comFotos',$_GET) && $_GET['comFotos'] === '1'){
			
			// Criando vetores de fotos
			$tarefa->fotos_inicio = array();
			$tarefa->fotos_fim = array();
			
			// Determinando a pasta que contem as fotos
			$pasta = $this->maxse['caminho_para_fotos_tarefas'].$tarefa->id;
			if(file_exists($pasta)){

				// Listando os arquivos que existem na pasta
				$arquivos = scandir($pasta);

				// Removenod o . e o ..
				array_shift($arquivos);
				array_shift($arquivos);

				// Salvando fotos nos arrays
				foreach ($arquivos as $arquivo) {

					// Determinando o caminho completo para a foto
					$caminho = $pasta.'/'.$arquivo;

					// Lendo conteúdo de arquivo
					$data = file_get_contents($caminho);
						
					// encodando para base64
					$data = base64_encode($data);

					// adicionando cabeçalho base64
					$data = 'data:image/jpeg;base64,'.$data;

					// Guardando imagem no vetor correto (inicio ou fim)
					if(substr($arquivo,0,3) === 'ini'){
						array_push($tarefa->fotos_inicio, $data);
					} elseif(substr($arquivo,0,3) === 'fim') {
						array_push($tarefa->fotos_fim, $data);
					}
				}
			}
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

	$app->post($api_root.'/tarefas',function(Request $req, Response $res, $args = []){

		$tarefa = json_decode($req->getBody()->getContents());
		
		// Begin transaction
		$this->db->beginTransaction();
		
		// Criando tarefa
		$sql = 'INSERT INTO maxse_tarefas (
					divergente,
					final_p,
					final_r,
					id_apoio,
					id_equipe,
					id_sse,
					inicio_p,
					inicio_r
				) VALUES (
					:divergente,
					:final_p,
					:final_r,
					:id_apoio,
					:id_equipe,
					:id_sse,
					:inicio_p,
					:inicio_r
				)';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(array(
				':divergente' 	=> ($tarefa->divergente ? 1 : 0),
				':final_p' 		=> $tarefa->final_p,
				':final_r' 		=> $tarefa->final_r,
				':id_apoio' 	=> (isset($tarefa->apoio) ? $tarefa->apoio->id : null),
				':id_equipe'	=> $tarefa->equipe->id,
				':id_sse' 		=> $tarefa->sse->id,
				':inicio_p' 	=> $tarefa->inicio_p,
				':inicio_r' 	=> $tarefa->inicio_r				
			));	
		} catch (Exception $e) {
			// Interrompendo transação
			$this->db->rollback();

			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar criar tarefa: '.$e->getMessage());
		}
		
		// Comitando transação
		$this->db->commit();

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json');
	});

	$app->get($api_root.'/tarefas', function(Request $req, Response $res, $args = []){

		// Capturando o token do header HTTP_AUTHORIZATION;
		$token = str_replace('Bearer ','',$req->getHeaders()['HTTP_AUTHORIZATION'][0]);

		// Verificano se usuário é  líder de equipe
		$sql = 'SELECT
					a.id_equipe
				FROM
					maxse_membros a
					inner join maxse_usuarios b on a.id_pessoa=b.id_pessoa
				WHERE token=:token';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':token' => $token
			)
		);
		$rs = $stmt->fetch();
		if($rs === false){
			$eh_lider = false;
			$id_equipe = null;
		} else {
			$eh_lider = true;
			$id_equipe = $rs->id_equipe;
		}

		// Determinando restições a partir do GET
		// TODO:
		$restricoes = 'TRUE';

		// Preparando consulta
		if($eh_lider){

			// É lider! Levantando tarefas da equipe dele

			$sql = "SELECT
						a.id,
						a.id_sse,
						a.id_equipe,
						a.id_apoio,
						a.inicio_p,
						a.inicio_r,
						a.final_p,
						a.final_r,
						a.divergente,
						b.numero as numero_sse
					FROM
						maxse_tarefas a
						INNER JOIN maxse_sses b ON a.id_sse = b.id
					WHERE
						a.id_equipe = :id_equipe
						AND $restricoes
					ORDER BY inicio_p ASC";

			$stmt = $this->db->prepare($sql);
			$stmt->execute(
				array(
					':id_equipe' => $id_equipe
				)
			);
			$tarefas = $stmt->fetchAll();
		} else {

			// Não é líder. Levantando todas as tarefas que respeitem as restrições

			$sql = "SELECT
						a.id,
						a.id_sse,
						a.id_equipe,
						a.id_apoio,
						a.inicio_p,
						a.inicio_r,
						a.final_p,
						a.final_r,
						a.divergente,
						b.numero as numero_sse

					FROM
						maxse_tarefas a
						INNER JOIN maxse_sses b ON a.id_sse = b.id
					WHERE
						$restricoes
					ORDER BY inicio_p ASC";

			$stmt = $this->db->prepare($sql);
			$stmt->execute();
			$tarefas = $stmt->fetchAll();
		}

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($tarefas));
	});

	