<?php

	use Slim\Http\Request;
	use Slim\Http\Response;


	$app->get($api_root.'/tarefas/daEquipe', function(Request $req, Response $res, $args = []){

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
			// Retornando erro para usuário
			return $res
			->withStatus(403)
			->write('Somente para líderes de equipe');
		}
		$id_equipe = $rs->id_equipe;
		
		$sql = 'SELECT
					a.id,
					a.id_sse,
					a.id_equipe,
					a.id_apoio,
					a.inicio_p,
					a.inicio_r,
					a.final_p,
					a.final_r,
					a.divergente,
					a.autorizadaPor,
					b.numero as numero_sse,
					b.endereco,
					b.lat,
					b.lng,
					c.id as id_bairro,
					c.nome as nome_bairro,
					b.urgente as urgencia
				FROM
					maxse_tarefas a
					INNER JOIN maxse_sses b ON a.id_sse = b.id
					INNER JOIN maxse_bairros c ON b.id_bairro=c.id
				WHERE
					(
						b.status = sseStatus("AGENDADA") OR
						b.status = sseStatus("EXECUTANDO") OR
						b.status = sseStatus("DIVERGENTE") OR
						(b.status = sseStatus("PENDENTE") AND DATE((a.final_r))=DATE(NOW()))
					) AND
					a.id_equipe = :id_equipe
				ORDER BY inicio_p ASC';

		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':id_equipe' => $id_equipe
			)
		);
		$tarefas = $stmt->fetchAll();
		
		// Para cada tarefa, verifica se há tarefas da
		// mesma sse ainda não executadas agendadas para antes dela
		$sql = 'SELECT
					COUNT(*) as n
				FROM
					maxse_tarefas
				WHERE
					id_sse=:id_sse AND
					id<>:id_tarefa AND
					inicio_p<:inicio_p AND
					final_r IS NULL';
		$stmt = $this->db->prepare($sql);
		foreach ($tarefas as $tarefa) {			
			$stmt->execute(
				array(
					':id_sse' => $tarefa->id_sse,
					':inicio_p' => $tarefa->inicio_p,
					':id_tarefa' => $tarefa->id
				)
			);
			$n = $stmt->fetch()->n;

			// Determinando status_trf
			if (is_null($tarefa->inicio_r)) {
				if($tarefa->divergente && is_null($tarefa->autorizadaPor)){
					$tarefa->status = "-1";
				} elseif($n > 0) {
					$tarefa->status = "-10";
				} else {
					$tarefa->status = "1";
				}
			} elseif ($tarefa->inicio_r && is_null($tarefa->final_r)) {
				$tarefa->status = "2";
			} elseif ($tarefa->inicio_r && $tarefa->final_r) {
				$tarefa->status = "3";
			}
		}
		
		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($tarefas));
	});

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

		// Lendo id da tarefa da url
		$id_tarefa = 1*$args['id'];

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

		// Se for líder de equipe, verificando se a tarefa ainda é dele e se o status da sse dela não foi cancelada
		if($eh_lider) {
			$sql = 'SELECT
						count(*)=1 as ok
					FROM
						maxse_tarefas a
						INNER JOIN maxse_sses b ON a.id_sse=b.id
					WHERE b.status<>sseStatus("CANCELADA") AND a.id_equipe=:id_equipe AND a.id=:id_tarefa';
			$stmt = $this->db->prepare($sql);
			$stmt->execute(
				array(
					':id_equipe' => $id_equipe,
					':id_tarefa' => $id_tarefa
				)
			);
			$ok = ($stmt->fetch())->ok;
			if($ok !== '1') {
				// Retornando erro para usuário
				return $res
				->withStatus(410)
				->write('Tarefa não autorizada para esta equipe');
			}
		}

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
					autorizadaPor,
					obs_ini,
					obs_fim
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

		// Levantando se é a primeira tarefa realizada da sse
		$sql = 'SELECT COUNT(*) as n FROM maxse_tarefas WHERE id_sse=:id_sse AND final_r IS NOT NULL';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_sse' => $tarefa->sse->id));
		$n = $stmt->fetch()->n;
		$tarefa->primeira = ($n == 0);

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

	$app->get($api_root.'/tarefas/{id}/fotos/{momento}/{id_foto}',function(Request $req, Response $res, $args = []){
		
		// Lendo id da tarefa
		$id_tarefa = 1*$args['id'];

		// Lendo o id da foto
		$id_foto = 1*$args['id_foto'];
		
		// Lendo momento
		if($args['momento'] == 'ini'){
			$momento = 'ini';
		} elseif($args['momento'] == 'fim') {
			$momento = 'fim';
		} else {
			// Retornando erro para usuário
			return $res
			->withStatus(400)
			->write('Url mal formada');
		}

		// Definindo o caminho da imagem requerida
		$caminho = $this->maxse['caminho_para_fotos_tarefas'].$id_tarefa.'/'.$momento.'-'.$id_foto.'.jpg';

		// Verificando existência do arquivo
		if(file_exists($caminho)){

			// Lendo arquivo
			$data = file_get_contents($caminho);
	
			// Retornando imagem para o cliente
			return $res
			->withStatus(200)
			->withHeader('Content-Type','image/jpg')
			->write($data);

		} else {

			// Retornando erro para usuário
			return $res
			->withStatus(404)
			->write('Imagem '.$caminho.' não encontrada');

		}

	});

	$app->put($api_root.'/tarefas/{id}',function(Request $req, Response $res, $args = []){

		$tarefa = json_decode($req->getBody()->getContents());

		// CHECK 1: VERIFICANDO SE A EQUIPE ESTÁ DISPONÍVEL NESSE HORÁRIO
		$sql = 'SELECT
					COUNT(*) AS n
				FROM
					maxse_tarefas
				WHERE
					inicio_p <= :inicio_p AND
					final_p > :inicio_p AND
					final_r IS NULL AND
					id_equipe=:id_equipe';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':inicio_p' => $tarefa->inicio_p,
				':id_equipe' => $tarefa->equipe->id
			)
		);
		$n = $stmt->fetch()->n;
		if($n > 0){
			// Retornando erro para usuário
			return $res
			->withStatus(410)
			->write('Equipe está indisponível para este horário.');
		}


		// CHECK 2: VERIFICANDO SE EXISTE ALGUMA EQUIPE TRABALHANDO NESTA SSE ESTE HORÁRIO

		// CHECK 3: VERIFICANDO SE A EQUIPE JÁ EXECUTOU TAREFA NESTA SSE E NÃO É UM RETRABALHO.
		$sql = 'SELECT
					count(*) as n
				FROM
					maxse_tarefas a
					INNER JOIN maxse_sses b ON a.id_sse=b.id
				WHERE
					a.id_equipe=:id_equipe AND
					a.id_sse=:id_sse AND
					b.status!=sseStatus("RETRABALHO")';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':id_sse' => $tarefa->sse->id,
				':id_equipe' => $tarefa->equipe->id
			)
		);
		$n = $stmt->fetch()->n;
		if($n>0){
			// Retornando erro para usuário
			return $res
			->withStatus(413)
			->write('A equipe já executou uma taarefa para esta SSE e não é um retrabalho');
		}

		// Atualizando tarefa
		$sql = 'UPDATE maxse_tarefas SET
					divergente	= :divergente,
					final_p		= :final_p,
					final_r		= :final_r,
					id_apoio	= :id_apoio,
					id_equipe	= :id_equipe,
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

		// CHECK 1: VERIFICANDO SE A EQUIPE ESTÁ DISPONÍVEL NESSE HORÁRIO
		$sql = 'SELECT
					COUNT(*) AS n
				FROM
					maxse_tarefas
				WHERE
					inicio_p <= :inicio_p AND
					final_p > :inicio_p AND
					final_r IS NULL AND
					id_equipe=:id_equipe';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':inicio_p' => $tarefa->inicio_p,
				':id_equipe' => $tarefa->equipe->id
			)
		);
		$n = $stmt->fetch()->n;
		if($n > 0){
			// Retornando erro para usuário
			return $res
			->withStatus(410)
			->write('Equipe está indisponível para este horário.');
		}
		
		// CHECK 2: VERIFICANDO SE EXISTE ALGUMA EQUIPE TRABALHANDO NESTA SSE ESTE HORÁRIO

		// CHECK 3: VERIFICANDO SE A EQUIPE JÁ EXECUTOU TAREFA NESTA SSE E NÃO É UM RETRABALHO.
		$sql = 'SELECT
					count(*) as n
				FROM
					maxse_tarefas a
					INNER JOIN maxse_sses b ON a.id_sse=b.id
				WHERE
					a.id_equipe=:id_equipe AND
					a.id_sse=:id_sse AND
					b.status!=sseStatus("RETRABALHO")';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':id_sse' => $tarefa->sse->id,
				':id_equipe' => $tarefa->equipe->id
			)
		);
		$n = $stmt->fetch()->n;
		if($n>0){
			// Retornando erro para usuário
			return $res
			->withStatus(413)
			->write('A equipe já executou uma taarefa para esta SSE e não é um retrabalho');
		}

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
 				':final_r' 		=> null,
				':id_apoio' 	=> (isset($tarefa->apoio) ? $tarefa->apoio->id : null),
				':id_equipe'	=> $tarefa->equipe->id,
				':id_sse' 		=> $tarefa->sse->id,
				':inicio_p' 	=> $tarefa->inicio_p,
				':inicio_r' 	=> null
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
		if(array_key_exists('doDia',$_GET)){
			$restricoes = "( (date(inicio_p)=date(now()) AND final_r IS NULL) OR date(final_r)=date(now()) )";
		} else {
			$restricoes = 'TRUE';
		}

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
						b.numero as numero_sse,
						b.endereco,
						b.lat,
						b.lng,
						c.id as id_bairro,
						c.nome as nome_bairro,
						b.status,
						b.urgente as urgencia
					FROM
						maxse_tarefas a
						INNER JOIN maxse_sses b ON a.id_sse = b.id
						INNER JOIN maxse_bairros c ON b.id_bairro=c.id
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
			$tarefas = array_map(
				function($t){
					$t->lat *= 1;
					$t->lng *= 1;
					return $t;
				},
				$stmt->fetchAll()
			);
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
		
		// Verificando o status atual da SSE. Só pode ser dada como iniciada se estiver AGENDADA e com agendamento para essa equipe
		$sql = 'SELECT
					count(*) as n
				FROM
					maxse_tarefas a INNER JOIN
					maxse_sses b on a.id_sse=b.id
				WHERE
					a.id=:id_tarefa AND
					a.id_equipe=:id_equipe AND
					b.status=sseStatus("AGENDADA")';

		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':id_tarefa' => $tarefa->id,
				':id_equipe' => $tarefa->equipe->id
			)
		);
		$n = $stmt->fetch()->n;

		if($n == 0){
			// Retornando erro para usuário
			return $res
			->withStatus(410)
			->write('Tarefa está cancelada ou não está autorizada para esta equipe');
		}

		// :::::::: OPERAÇÕES DE FS ::::::::
		
		// RENOMEANDO FOTOS ANTIGAS
		$pasta = $this->maxse['caminho_para_fotos_tarefas'].$tarefa->id;
		
		// Criando um vetor que guarda os caminhos para remoção futura
		$paraRemover = array();
		
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
			if($foto->changingThisBreaksApplicationSecurity){
				$data = str_replace('data:image/jpeg;base64,','',$foto->changingThisBreaksApplicationSecurity);
			} else {
				$data = str_replace('data:image/jpeg;base64,','',$foto);
			}
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
		$sql = 'UPDATE maxse_sses SET id_tipo_de_servico_r=:tds_r, status=sseStatus("EXECUTANDO") where id=:id_sse';
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
				$sql = 'INSERT INTO maxse_medidas_area (l,c,id_sse,tipo) VALUES (:l,:c,:id_sse,"r")';
				$stmt = $this->db->prepare($sql);
				foreach ($tarefa->sse->medidas_area->real as $m) {
					try {
						$stmt->execute(array(':l'=>$m->l, ':c'=>$m->c, ':id_sse' => $tarefa->sse->id));
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
				$sql = 'INSERT INTO maxse_medidas_linear (v,id_sse,tipo) VALUES (:v,:id_sse,"r")';
				$stmt = $this->db->prepare($sql);
				foreach ($tarefa->sse->medidas_linear->real as $m) {
					try {
						$stmt->execute(array(':v'=>$m->v,':id_sse'=>$tarefa->sse->id));
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
				$sql = 'INSERT INTO maxse_medidas_unidades (n,id_sse,tipo) VALUES (:n,:id_sse,"r")';
				$stmt = $this->db->prepare($sql);
				foreach ($tarefa->sse->medidas_unidades->real as $m) {
					try {
						$stmt->execute(array(':n'=>$m->n,':id_sse'=>$tarefa->sse->id));
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
			default:
				// Retornando erro para usuário
				return $res
				->withStatus(400)
				->write('Tipo de medida desconhecido');
		}
		
		// Tratando a datahora de inicio
		$dh_inicio_r = (new DateTime(substr($tarefa->inicio_r,0,19)))->sub(new DateInterval('PT3H'));

		// Atualizando tarefa (inicio_r, divergente, obs)
		$sql = 'UPDATE maxse_tarefas SET inicio_r=:inicio_r, divergente=:divergente, autorizadaPor=:autorizadaPor, obs_ini=:obs_ini WHERE id=:id_tarefa';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(
				array(
					':inicio_r' => $dh_inicio_r->format('Y-m-d H:i:s'),
					':divergente' => $tarefa->divergente ? 1 : 0,
					':autorizadaPor' => $tarefa->autorizadaPor,
					':obs_ini' => $tarefa->obs_ini,
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

	$app->patch($api_root.'/tarefas/{id}/divergente', function(Request $req, Response $res, $args = []){
		
		// Lendo a tarefa na requisição
		$tarefa = json_decode($req->getBody()->getContents());
		
		// :::::::: OPERAÇÕES DE FS ::::::::
		
		// RENOMEANDO FOTOS ANTIGAS
		$pasta = $this->maxse['caminho_para_fotos_tarefas'].$tarefa->id;
		
		// Criando um vetor que guarda os caminhos para remoção futura
		$paraRemover = array();
		
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
			if($foto->changingThisBreaksApplicationSecurity){
				$data = str_replace('data:image/jpeg;base64,','',$foto->changingThisBreaksApplicationSecurity);
			} else {
				$data = str_replace('data:image/jpeg;base64,','',$foto);
			}
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

		// Determinando se o status vai ser DIVERGENTE em caso de não autorizada ou EXECUTANDO no caso de autorizada
		$status = '';
		$temAutorizacao = is_string($tarefa->autorizadaPor) && strlen($tarefa->autorizadaPor);

		if ($tarefa->divergente === true && $temAutorizacao){
			$status = 'EXECUTANDO';
		} elseif ($tarefa->divergente === true) {
			$status = 'DIVERGENTE';
		} else {
			// Retornando erro para usuário
			return $res
			->withStatus(400)
			->write('Tentando marcar como divergente sem dados suficientes.');
		}

		// Atualizando SSE (tipo_de_servico_r, status)
		$sql = 'UPDATE maxse_sses SET id_tipo_de_servico_r=:tds_r, status=sseStatus(:status) where id=:id_sse';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(
				array(
					':tds_r' => $tarefa->sse->tipoDeServicoReal->id,
					':id_sse' => $tarefa->sse->id,
					':status' => $status
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
				$sql = 'INSERT INTO maxse_medidas_area (l,c,id_sse,tipo) VALUES (:l,:c,:id_sse,"r")';
				$stmt = $this->db->prepare($sql);
				foreach ($tarefa->sse->medidas_area->real as $m) {
					try {
						$stmt->execute(array(':l'=>$m->l, ':c'=>$m->c, ':id_sse' => $tarefa->sse->id));
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
				$sql = 'INSERT INTO maxse_medidas_linear (v,id_sse,tipo) VALUES (:v,:id_sse,"r")';
				$stmt = $this->db->prepare($sql);
				foreach ($tarefa->sse->medidas_linear->real as $m) {
					try {
						$stmt->execute(array(':v'=>$m->v,':id_sse'=>$tarefa->sse->id));
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
				$sql = 'INSERT INTO maxse_medidas_unidades (n,id_sse,tipo) VALUES (:n,:id_sse,"r")';
				$stmt = $this->db->prepare($sql);
				foreach ($tarefa->sse->medidas_unidades->real as $m) {
					try {
						$stmt->execute(array(':n'=>$m->n,':id_sse'=>$tarefa->sse->id));
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
			default:
				// Retornando erro para usuário
				return $res
				->withStatus(400)
				->write('Tipo de medida desconhecido');
		}
		
		// Atualizando tarefa (inicio_r, divergente)
		$sql = 'UPDATE maxse_tarefas SET inicio_r=NULL, divergente=1, inicio_r=:inicio_r, autorizadaPor=:autorizadaPor, obs_ini=:obs_ini WHERE id=:id_tarefa';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(
				array(
					':id_tarefa' => $tarefa->id,
					':autorizadaPor' => $tarefa->autorizadaPor,
					':inicio_r' => ($temAutorizacao ? date('Y-m-d H:i:s') : null),
					':obs_ini' => $tarefa->obs_ini
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

	$app->patch($api_root.'/tarefas/{id}/concluida', function(Request $req, Response $res, $args = []){
		
		// Lendo a tarefa na requisição
		$tarefa = json_decode($req->getBody()->getContents());
		
		// :::::::: OPERAÇÕES DE FS ::::::::
		
		// RENOMEANDO FOTOS ANTIGAS
		$pasta = $this->maxse['caminho_para_fotos_tarefas'].$tarefa->id;
		
		// Criando um vetor que guarda os caminhos para remoção futura
		$paraRemover = array();
		
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

				// Lendo conteúdo de arquivo, caso ele seja do tipo fim
				if (substr($arquivo,0,3) == 'fim') {
					rename($caminho,$caminho.'.old');
					array_push($paraRemover, $caminho.'.old');
				}
			}
		} else {
			mkdir($pasta);
		}
		
		// Salvando fotos novas
		foreach ($tarefa->fotos_fim as $i => $foto) {
			if($foto->changingThisBreaksApplicationSecurity){
				$data = str_replace('data:image/jpeg;base64,','',$foto->changingThisBreaksApplicationSecurity);
			} else {
				$data = str_replace('data:image/jpeg;base64,','',$foto);
			}
			$data = base64_decode($data);

			// O nome do arquivo será
			$caminho = $pasta.'/fim-'.($i+1).'.jpg';

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

		// Verificando se a SSE tem alguma outra tarefa agendada além desta
		$sql = 'SELECT count(*) as n FROM maxse_tarefas WHERE final_r IS NULL AND id_sse=:id_sse';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_sse' => $tarefa->sse->id));
		$n = $stmt->fetch()->n;
		$temOutroAgendamento = ($n>1);

		// Verificando se a SSE está com retrabalho em aberto
		$sql = 'SELECT
					(!isnull(ini_retrabalho) AND isnull(fim_retrabalho)) as eRetrabalho
				FROM
					maxse_sses
				WHERE 
					id=:id_sse';

		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_sse' => $tarefa->sse->id));
		$eRetrabalho = ($stmt->fetch()->eRetrabalho == 1);

		// Atualizando SSE (tipo_de_servico_r, status)
		if($temOutroAgendamento) {
			$sql = 'UPDATE maxse_sses SET status=sseStatus("AGENDADA") WHERE id=:id_sse';
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
				->write('Falha ao tentar atualizar SSE (NOVO AGENDAMENTO): '.$e->getMessage());
			}
		} elseif ($eRetrabalho) {
			$sql = 'UPDATE maxse_sses SET status=sseStatus("FINALIZADA"), fim_retrabalho=:fim_retrabalho WHERE id=:id_sse';
			$stmt = $this->db->prepare($sql);
			try {
				$stmt->execute(
					array(
						':id_sse' => $tarefa->sse->id,
						':fim_retrabalho' => str_replace('Z','',str_replace('T',' ',$tarefa->final_r))
					)
				);
			} catch (Exception $e) {
				
				// Falhou! Rollback
				$this->db->rollback();

				// Retornando erro para usuário
				return $res
				->withStatus(500)
				->write('Falha ao tentar atualizar SSE (RETRABALHO): '.$e->getMessage());
			}
		} else {
			$sql = 'UPDATE maxse_sses SET status=sseStatus("PENDENTE") WHERE id=:id_sse';
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
				->write('Falha ao tentar atualizar SSE: '.$e->getMessage());
			}
		}
		
		// Levantando o gasto com matéria prima
		$sql = 'SELECT
					id_produto,
					qtde_por_unidade_de_trab as coef,
					b.valor_unit
				FROM
					maxse_tipos_de_servico_x_produtos a
					INNER JOIN estoque_produtos b ON a.id_produto=b.id
				WHERE id_tipo=:id_tipo';

		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_tipo' => $tarefa->sse->tipoDeServicoReal->id));
		$gastos_mp = $stmt->fetchAll();

		// Determinando o trabalho com base no tipo de servico e nas medidas
		$trabalho = 0;
		switch ($tarefa->sse->tipoDeServicoReal->medida) {
			case 'a':
				foreach ($tarefa->sse->medidas_area->real as $m) {
					$trabalho += $m->l * $m->c;
				}
				break;
			
			case 'l':
				foreach ($tarefa->sse->medidas_linear->real as $m) {
					$trabalho += $m->v;
				}
				break;
			
			case 'u':
				foreach ($tarefa->sse->medidas_unidades->real as $m) {
					$trabalho += $m->n;
				}
				break;
		}
		
		// Determinando o tipo de uma equipe
		$sql = 'SELECT id_tipo FROM maxse_equipes WHERE id=:id_equipe';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_equipe' => $tarefa->equipe->id));
		$id_tde = $stmt->fetch()->id_tipo;
		
		// Levantando quais são os produtos utilizados por uma equipe
		$sql = 'SELECT id_produto FROM maxse_produtos_utilizados_por_tdes WHERE id_tde=:id_tde';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_tde' => $id_tde));
		$ids_produtos_utilizados = array_map(function($a){return $a->id_produto;},$stmt->fetchAll());

		// Criando vetor de gastos autorizados só com os produtos que são utilizados pela equipe executante da tarefa
		$gastos_mp_autorizados = array();
		for ($i=0; $i < sizeof($gastos_mp); $i++) { 
			if(array_search($gastos_mp[$i]->id_produto,$ids_produtos_utilizados) !== false ){
				array_push($gastos_mp_autorizados,$gastos_mp[$i]);
			}
		}

		// Criando sql para inserir movimentos de saída no estoque
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
					"-1",
					:qtde,
					:id_referencia,
					:valor_unit
				)';
		$stmt = $this->db->prepare($sql);
		
		// Inserindo movimentos de saída na tebela de mobimentos
		foreach ($gastos_mp_autorizados as $gasto_mp) {
			try {
				$stmt->execute(
					array(
						':id_produto' => $gasto_mp->id_produto,
						':dh' => str_replace('Z','',str_replace('T',' ',$tarefa->final_r)),
						':qtde' => $gasto_mp->coef * $trabalho,
						':id_referencia' => $tarefa->id,
						':valor_unit' => $gasto_mp->valor_unit
					)
				);
			} catch (Exception $e) {
				// Erro! Rollback
				$this->db->rollback();

				// Retornando erro para usuário
				return $res
				->withStatus(500)
				->write('Falha ao tentar registrar saída no estoque: ' .$e->getMessage());
			}
		}

		// Atualizando tarefa (inicio_r, divergente)
		$sql = 'UPDATE maxse_tarefas SET final_r=:final_r, obs_fim=:obs_fim WHERE id=:id_tarefa';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(
				array(
					':final_r' => str_replace('Z','',str_replace('T',' ',$tarefa->final_r)),
					':obs_fim' => $tarefa->obs_fim,
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

	$app->delete($api_root.'/tarefas/{id}',function(Request $req, Response $res, $args = []){

		// Lendo id da url
		$id_tarefa = 1*$args['id'];

		// Iniciando transação
		$this->db->beginTransaction();

		// Levantando o id da sse
		$sql = 'SELECT id_sse FROM maxse_tarefas WHERE id=:id_tarefa';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_tarefa' => $id_tarefa));
		$id_sse = $stmt->fetch()->id_sse;

		// Recuperando tarefa da base de dados
		$sql = 'DELETE FROM maxse_tarefas WHERE id=:id_tarefa';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(array(':id_tarefa' => $id_tarefa));
		} catch (Exception $e) {
			// Algo deu errado. Roll back e mandando o erro
			$this->db->rollback();
			
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar remover tarefa: '.$e->getMessage());
		}

		// ATUALIZANDO STATUS DA SSE COM BASE NAS SUAS TAREFAS
		
		// Levantando SE A sse POSSUI ALGUMA TAREFA
		$sql = 'SELECT count(*) as n FROM maxse_tarefas WHERE id_sse=:id_sse';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_sse'=>$id_sse));
		$n = $stmt->fetch()->n;
		$status = '';

		if($n == 0){
			// Se a SSE não tem tarefa, o status é
			$status = 'CADASTRADA';
		} else {
			// Levantando SE A sse POSSUI ALGUMA TAREFA sendo executada
			$sql = 'SELECT count(*) as n FROM maxse_tarefas WHERE inicio_r is not null and final_r is null and id_sse=:id_sse';
			$stmt = $this->db->prepare($sql);
			$stmt->execute(array(':id_sse'=>$id_sse));
			$n = $stmt->fetch()->n;
			if($n > 0) {
				$status = 'EXECUTANDO';
			} else {
				// Levantando SE A sse POSSUI ALGUMA TAREFA sendo agendada
				$sql = 'SELECT count(*) as n FROM maxse_tarefas WHERE inicio_p is not null and inicio_r is null and id_sse=:id_sse';
				$stmt = $this->db->prepare($sql);
				$stmt->execute(array(':id_sse'=>$id_sse));
				$n = $stmt->fetch()->n;
				if($n > 0) {
					$status = 'AGENDADA';
				} else {
					$status = 'PENDENTE';
				}
			}
		}

		// Atualizando status de uma SSE
		$sql = 'UPDATE maxse_sses SET status=sseStatus(:status) WHERE id=:id_sse';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(
				array(
					':status' => $status,
					':id_sse' => $id_sse
				)
			);
			
		} catch (Exception $e) {
			// Errou! Rollback
			$this->db->rollback();
			
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar atualizar status da SSE: ');
		}

		// Chegou até aqui é COMMIT
		$this->db->commit();

		// Retornando resposta para usuário
		return $res
		->withStatus(200);

	});
	