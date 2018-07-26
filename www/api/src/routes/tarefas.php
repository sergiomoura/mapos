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
					id_tipo_de_servico_r,
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

		// Levantando tipo de servico previsto da sse;
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
		$tarefa->sse->tipoDeServicoPrev = $stmt->fetch();
		unset($tarefa->sse->id_tipo_de_servico);

		// Levantando tipo de servico real da sse;
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
				':id_tds' => $tarefa->sse->id_tipo_de_servico_r
			)
		);
		$tds_r = $stmt->fetch();
		$tarefa->sse->tipoDeServicoReal = ($tds_r === false ? null : $tds_r);
		unset($tarefa->sse->id_tipo_de_servico_r);

		// Criando objetos para guardar medidas
		$sse->medidas_linear = new stdClass();
		$sse->medidas_linear->real = array();
		$sse->medidas_linear->prev = array();
		
		$sse->medidas_unidades = new stdClass();
		$sse->medidas_unidades->real = array();
		$sse->medidas_unidades->prev = array();

		$sse->medidas_area = new stdClass();
		$sse->medidas_area->real = array();
		$sse->medidas_area->prev = array();

		// Levantando medidas previstas da SSE
		switch ($tarefa->sse->tipoDeServicoPrev->medida) {
			case 'a':
				// Carregando medidas da sse
				$sql = 'SELECT id, l, c, tipo FROM maxse_medidas_area WHERE id_sse=:id_sse AND tipo="p"';
				$stmt = $this->db->prepare($sql);
				$stmt->execute(array(':id_sse' => $sse->id));
				$sse->medidas_area->prev = $stmt->fetchAll();
				break;
			
			case 'l':
				$sql = 'SELECT id, v, tipo FROM maxse_medidas_linear WHERE id_sse=:id_sse AND tipo="p"';
				$stmt = $this->db->prepare($sql);
				$stmt->execute(array(':id_sse' => $sse->id));
				$sse->medidas_linear->prev = $stmt->fetchAll();
				break;

			case 'u':
				$sql = 'SELECT id, n, tipo FROM maxse_medidas_unidades WHERE id_sse=:id_sse AND tipo="p"';
				$stmt = $this->db->prepare($sql);
				$stmt->execute(array(':id_sse' => $sse->id));
				$sse->medidas_unidades->prev = $stmt->fetchAll();
				break;

			default:
				// Retornando erro para usuário
				return $res
				->withStatus(500)
				->write("Tipo de medida desconhecido.".__LINE__);
				break;
		}

		// Levantando medidas reais da SSE
		if(!is_null($tarefa->sse->tipoDeServicoReal)) {
			switch ( $tarefa->sse->tipoDeServicoReal->medida) {
				case 'a':
					// Carregando medidas da sse
					$sql = 'SELECT id, l, c, tipo FROM maxse_medidas_area WHERE id_sse=:id_sse AND tipo="r"';
					$stmt = $this->db->prepare($sql);
					$stmt->execute(array(':id_sse' => $sse->id));
					$sse->medidas_area->real = $stmt->fetchAll();
					break;
				
				case 'l':
					$sql = 'SELECT id, v, tipo FROM maxse_medidas_linear WHERE id_sse=:id_sse AND tipo="r"';
					$stmt = $this->db->prepare($sql);
					$stmt->execute(array(':id_sse' => $sse->id));
					$sse->medidas_linear->real = $stmt->fetchAll();
					break;
	
				case 'u':
					$sql = 'SELECT id, n, tipo FROM maxse_medidas_unidades WHERE id_sse=:id_sse AND tipo="r"';
					$stmt = $this->db->prepare($sql);
					$stmt->execute(array(':id_sse' => $sse->id));
					$sse->medidas_unidades->real = $stmt->fetchAll();
					break;
	
				default:
					// Retornando erro para usuário
					return $res
					->withStatus(500)
					->write("Tipo de medida desconhecido." .__LINE__);
					break;
			}
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

	$app->patch($api_root.'/tarefas/{id}/iniciada', function(Request $req, Response $res, $args = []){
		
		// Lendo a tarefa na requisição
		$tarefa = json_decode($req->getBody()->getContents());
		
		// :::::::: OPERAÇÕES DE FS ::::::::
		
		// RENOMEANDO FOTOS ANTIGAS
		$pasta = $this->maxse['caminho_para_fotos_tarefas'].$tarefa->id;
		if(file_exists($pasta)){

			// Listando os arquivos que existem na pasta
			$arquivos = scandir($pasta);

			// Removenod o . e o ..
			array_shift($arquivos);
			array_shift($arquivos);

			// Criando um vetor que guarda os caminhos para remoção futura
			$paraRemover = array();

			// Salvando fotos nos arrays
			foreach ($arquivos as $arquivo) {

				// Determinando o caminho completo para a foto
				$caminho = $pasta.'/'.$arquivo;

				// Lendo conteúdo de arquivo, caso ele seja do tipo ini
				if (substr($arquivo,0,3) == 'ini') {
					rename($caminho,$caminho.'.old');
					array_push($paraRemover, $caminho.'.old');
				}
			}
		} else {
			mkdir($pasta);
		}
		
		// Salvando fotos novas
		foreach ($tarefa->fotos_inicio as $i => $foto) {
			$data = str_replace('data:image/jpeg;base64,','',$foto);
			$data = base64_decode($data);

			// O nome do arquivo será
			$caminho = $pasta.'/ini-'.($i+1).'.jpg';

			// Abrindo arquivo para escrita
			$ifp = fopen( $caminho, 'wb' ); 

			// Escrevendo dados no arquivo
			fwrite( $ifp, $data);

			// clean up the file resource
			fclose( $ifp ); 
		}

		// Removendo fotos antigas
		foreach ($paraRemover as $arquivo) {
			unlink($arquivo);
		}

		// :::::::::::::::::::::::::::::::::

		// :::::::::OPERAÇÕES DE DB ::::::::
		$this->db->beginTransaction();

		// Atualizando SSE (tipo_de_servico_r, status)
		$sql = 'UPDATE maxse_sses SET id_tipo_de_servico_r=:tds_r, status=sseStatus("EM_EXECUCAO") where id=:id_sse';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(
				array(
					':tds_r' => $tarefa->sse->tipoDeServicoReal->id,
					':id_sse' => $tarefa->sse->id
				)
			);
		} catch (Exception $e) {
			
			// Falhou! Rollback
			$this->db->rollback();

			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar atualizar SSE: '.$e->getMessage());
		}
		

		// Removendo medidas antigas (do tipo r)
		switch ($tarefa->sse->tipoDeServicoReal->medida) {
			case 'a':
				$sql = 'DELETE FROM maxse_medidas_area WHERE id_sse = :id_sse AND tipo="r"';
				break;
			
			case 'l':
				$sql = 'DELETE FROM maxse_medidas_linear WHERE id_sse = :id_sse AND tipo="r"';
				break;
			
			case 'u':
				$sql = 'DELETE FROM maxse_medidas_unidades WHERE id_sse = :id_sse AND tipo="r"';
				break;

			default:
				// Retornando erro para usuário
				return $res
				->withStatus(400)
				->write('Tipo de medida desconhecido');
		}
		
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(
				array(
					':id_sse' => $tarefa->sse->id
				)
			);
		} catch (Exception $e) {
			// Falhou! Rollback
			$this->db->rollback();

			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar remover medidas: '.$e->getMessage());
		}

		// Inserindo medidas novas (como tipo r)
		switch ($tarefa->sse->tipoDeServicoReal->medida) {
			case 'a':
				$sql = 'INSERT INTO maxse_medidas_area (l,c,tipo) VALUES (:l,:c,"r")';
				$stmt = $this->db->prepare($sql);
				foreach ($tarefa->sse->medidas_area->real as $m) {
					try {
						$stmt->execute(array(':l'=>$m->l, ':c'=>$m->c));
					} catch (Exception $e) {
						// Falhou. Rollback!
						$this->db->rollback();

						// Retornando erro para usuário
						return $res
						->withStatus(500)
						->write('Falha ao tentar inserir medidas: '.$e->getMessage());
					}
				}
				break;
			
			case 'l':
				$sql = 'INSERT INTO maxse_medidas_linear (v,tipo) VALUES (:v,"r")';
				$stmt = $this->db->prepare($sql);
				foreach ($tarefa->sse->medidas_linear->real as $m) {
					try {
						$stmt->execute(array(':v'=>$m->v));
					} catch (Exception $e) {
						// Falhou. Rollback!
						$this->db->rollback();

						// Retornando erro para usuário
						return $res
						->withStatus(500)
						->write('Falha ao tentar inserir medidas: '.$e->getMessage());
					}
				}
				break;
			
			case 'u':
				$sql = 'INSERT INTO maxse_medidas_unidades (n,tipo) VALUES (:n,"r")';
				$stmt = $this->db->prepare($sql);
				foreach ($tarefa->sse->medidas_unidades->real as $m) {
					try {
						$stmt->execute(array(':n'=>$m->n));
					} catch (Exception $e) {
						// Falhou. Rollback!
						$this->db->rollback();

						// Retornando erro para usuário
						return $res
						->withStatus(500)
						->write('Falha ao tentar inserir medidas: '.$e->getMessage());
					}
				}
				break;
		}
		$sql = '';
		
		// Atualizando tarefa (inicio_r, divergente)
		$sql = 'UPDATE maxse_tarefas SET inicio_r=:inicio_r, divergente=:divergente WHERE id=:id_tarefa';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(
				array(
					':inicio_r' => str_replace('Z','',str_replace('T',' ',$tarefa->inicio_r)),
					':divergente' => $tarefa->divergente ? 1 : 0,
					':id_tarefa' => $tarefa->id
				)
			);	
		} catch (Exception $e) {
			// Falhou. Rollback!
			$this->db->rollback();

			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar atualizar tarefa: '.$e->getMessage());
		}
		
		// Chegou aqui é por que está tudo certo! Commit!
		$this->db->commit();

		// :::::::::::::::::::::::::::::::::


		// Retornando erro para usuário
		return $res
		->withStatus(200);
	});