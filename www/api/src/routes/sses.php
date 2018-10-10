<?php

	use Slim\Http\Request;
	use Slim\Http\Response;

	$app->get($api_root.'/sses',function(Request $req, Response $res, $args = []){
		
		// DETERMINANDO CONDIÇÕES DE STATUS = = = = = = = = = = = = = = = = = = = =
		
		// Levantando token na requisição
		$token = str_replace('Bearer ','',$req->getHeaders()['HTTP_AUTHORIZATION'][0]);
		
		// Levantando permissão do usuário na base
		$sql = 'SELECT perm_dados_financeiros FROM maxse_usuarios WHERE token=:token';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':token' => $token));
		$perm_dados_financeiros = ($stmt->fetch()->perm_dados_financeiros === '1');

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

		// Determinando condições de fechamento
		if(array_key_exists('id_fechamento',$_GET) && $_GET['id_fechamento']) {
			$cndFechamento = 'id_fechamento='.(1*$_GET['id_fechamento']);
		} else {
			$cndFechamento = 'TRUE';
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
			$cndAgendadasDe = 'inicio_p >= "'.substr($_GET['agendadas_de'],0,10).'"';
		} else {
			$cndAgendadasDe = TRUE;
		}

		if(array_key_exists('agendadas_ate',$_GET) && $_GET['agendadas_ate']!= ''){
			$cndAgendadasAte = 'inicio_p <= "'.substr($_GET['agendadas_ate'],0,10).' 23:59:59"';
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

		// Definindo as colunas que serão levantadas
		$colunas = '
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
			id_tipo_de_servico as id_tds_p,
			id_tipo_de_servico_r as id_tds_r,
			prazo_final,
			finalizacao_parcial,
			motivo_finalizacao_parcial,
			Y.id_equipe,
			Y.inicio_p,
			Y.final_p,
			Y.inicio_r,
			Y.final_r,
			Y.id_apoio,
			status';
		
			if($perm_dados_financeiros){
				$colunas = $colunas .
							',
							valor_prev,
							valor_real,
							valor_libe,
							cmo,
							cmp';
			} else {
				$colunas = $colunas .
							',
							null as valor_prev,
							null as valor_real,
							null as valor_libe,
							null as cmo,
							null as cmp';
			}
					
		
		// Levantando SSES na base
		$sql = "SELECT
					$colunas
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
					($cndRealizadasAte) AND
					($cndFechamento)
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
			$sse->finalizacao_parcial = ($sse->finalizacao_parcial === '1');

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
		$sql = 'SELECT l,c FROM	maxse_medidas_area WHERE id_sse=:id_sse AND tipo=:tipo';
		$stmt = $this->db->prepare($sql);

		foreach ($sses as $sse) {

			$sse->medidas_area = new stdClass();

			$stmt->execute(array(':id_sse' => $sse->id,':tipo'=>'p'));
			$sse->medidas_area->prev = $stmt->fetchAll();

			$stmt->execute(array(':id_sse' => $sse->id,':tipo'=>'r'));
			$sse->medidas_area->real = $stmt->fetchAll();

			$stmt->execute(array(':id_sse' => $sse->id,':tipo'=>'l'));
			$sse->medidas_area->libe = $stmt->fetchAll();

		}

		// Para cada SSE, recuperando as medidas lineares previstas
		$sql = 'SELECT v FROM maxse_medidas_linear WHERE id_sse=:id_sse AND tipo=:tipo';
		$stmt = $this->db->prepare($sql);

		foreach ($sses as $sse) {

			$sse->medidas_linear = new stdClass();

			$stmt->execute(array(':id_sse' => $sse->id,':tipo'=>'p'));
			$sse->medidas_linear->prev = $stmt->fetchAll();

			$stmt->execute(array(':id_sse' => $sse->id,':tipo'=>'r'));
			$sse->medidas_linear->real = $stmt->fetchAll();

			$stmt->execute(array(':id_sse' => $sse->id,':tipo'=>'l'));
			$sse->medidas_linear->libe = $stmt->fetchAll();

		}

		// Para cada SSE, recuperando as medidas unitarias previstas
		$sql = 'SELECT n FROM maxse_medidas_unidades WHERE id_sse=:id_sse AND tipo=:tipo';
		$stmt = $this->db->prepare($sql);

		foreach ($sses as $sse) {

			$sse->medidas_unidades = new stdClass();
			
			$stmt->execute(array(':id_sse' => $sse->id, ':tipo' => 'p'));
			$sse->medidas_unidades->prev = $stmt->fetchAll();

			$stmt->execute(array(':id_sse' => $sse->id, ':tipo' => 'r'));
			$sse->medidas_unidades->real = $stmt->fetchAll();

			$stmt->execute(array(':id_sse' => $sse->id, ':tipo' => 'l'));
			$sse->medidas_unidades->libe = $stmt->fetchAll();

		}

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($sses));

	});

	$app->get($api_root.'/sses/xls',function(Request $req, Response $res, $args = []){
		
		// Levantando permissão do usuário na base
		$sql = 'SELECT perm_dados_financeiros FROM maxse_usuarios WHERE token=:token';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':token' => $_GET['token']));
		$perm_dados_financeiros = ($stmt->fetch()->perm_dados_financeiros === '1');
		
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

		// Determinando condições de fechamento
		if(array_key_exists('id_fechamento',$_GET) && $_GET['id_fechamento']) {
			$cndFechamento = 'id_fechamento='.(1*$_GET['id_fechamento']);
		} else {
			$cndFechamento = 'TRUE';
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
			$cndAgendadasDe = 'inicio_p >= "'.substr($_GET['agendadas_de'],0,10).'"';
		} else {
			$cndAgendadasDe = TRUE;
		}

		if(array_key_exists('agendadas_ate',$_GET) && $_GET['agendadas_ate']!= ''){
			$cndAgendadasAte = 'inicio_p <= "'.substr($_GET['agendadas_ate'],0,10).' 23:59:59"';
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

		// Definindo as colunas que serão levantadas
		$colunas = '
			X.id,
			endereco,
			id_bairro,
			S.nome as nome_bairro,
			S.domasa,
			numero,
			dh_registrado,
			dh_recebido,
			urgente as urgencia,
			obs,
			lat,
			lng,
			data_devolucao,
			id_tipo_de_servico as id_tds_p,
			T.codigo as codigo_tds_p,
			T.medida as medida_tds_p,
			id_tipo_de_servico_r as id_tds_r,
			U.codigo as codigo_tds_r,
			U.medida as medida_tds_r,
			prazo_final,
			finalizacao_parcial,
			motivo_finalizacao_parcial,
			Y.id_equipe,
			Y.inicio_p,
			Y.final_p,
			Y.inicio_r,
			Y.final_r,
			Y.id_apoio,
			R.nome as nome_status,
			status';
		
			if($perm_dados_financeiros){
				$colunas = $colunas .
							',
							valor_prev,
							valor_real,
							valor_libe,
							cmo,
							cmp';
			} else {
				$colunas = $colunas .
							',
							null as valor_prev,
							null as valor_real,
							null as valor_libe,
							null as cmo,
							null as cmp';
			}
					
		
		// Levantando SSES na base
		$sql = "SELECT
					$colunas
				FROM
					maxse_sses X
					INNER JOIN maxse_sse_status R ON R.id=X.status
					INNER JOIN maxse_bairros S ON S.id=X.id_bairro
					INNER JOIN maxse_tipos_de_servico T ON T.id=X.id_tipo_de_servico
					LEFT JOIN maxse_tipos_de_servico U ON U.id=X.id_tipo_de_servico_r
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
					($cndRealizadasAte) AND
					($cndFechamento)
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
			$sse->finalizacao_parcial = ($sse->finalizacao_parcial === '1');

		}

		// Para cada SSE, recuperando as tarefas dela
		$sql = 'SELECT
					A.id,
					id_equipe,
					id_apoio,
					inicio_p,
					final_p,
					inicio_r,
					final_r,
					divergente,
					autorizadaPor,
					B.nome as nome_equipe,
					C.nome as nome_apoio
				FROM
					maxse_tarefas A
					INNER JOIN maxse_equipes B ON A.id_equipe=B.id
					LEFT JOIN maxse_equipes C ON A.id_apoio=C.id
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
					SUM(l*c) AS area
				FROM
					maxse_medidas_area
				WHERE			
					id_sse=:id_sse AND tipo="p"';
		$stmt = $this->db->prepare($sql);

		foreach ($sses as $sse) {
			$sse->medidas_area = new stdClass();
			$stmt->execute(array(':id_sse' => $sse->id));
			$sse->medidas_area->prev = $stmt->fetch()->area;
		}

		// Para cada SSE, recuperando as medidas de área realizadas
		$sql = 'SELECT
					SUM(l*c) AS area
				FROM
					maxse_medidas_area
				WHERE
					id_sse=:id_sse AND tipo="r"';
		$stmt = $this->db->prepare($sql);

		foreach ($sses as $sse) {
			$stmt->execute(array(':id_sse' => $sse->id));
			$sse->medidas_area->real = $stmt->fetch()->area;
		}

		// Para cada SSE, recuperando as medidas lineares previstas
		$sql = 'SELECT
					SUM(v) AS cumprimento
				FROM
					maxse_medidas_linear
				WHERE
					id_sse=:id_sse AND tipo="p"';
		$stmt = $this->db->prepare($sql);

		foreach ($sses as $sse) {
			$sse->medidas_linear = new stdClass();
			$stmt->execute(array(':id_sse' => $sse->id));
			$sse->medidas_linear->prev = $stmt->fetch()->cumprimento;
		}

		// Para cada SSE, recuperando as medidas lineares realizadas
		$sql = 'SELECT
					SUM(v) AS cumprimento
				FROM
					maxse_medidas_linear
				WHERE
					id_sse=:id_sse AND tipo="r"';
		$stmt = $this->db->prepare($sql);

		foreach ($sses as $sse) {
			$stmt->execute(array(':id_sse' => $sse->id));
			$sse->medidas_linear->real = $stmt->fetch()->cumprimento;
		}

		// Para cada SSE, recuperando as medidas unitarias previstas
		$sql = 'SELECT
					SUM(n) as unidades
				FROM
					maxse_medidas_unidades
				WHERE
					id_sse=:id_sse AND tipo="p"';
		$stmt = $this->db->prepare($sql);

		foreach ($sses as $sse) {
			$sse->medidas_unidades = new stdClass();
			$stmt->execute(array(':id_sse' => $sse->id));
			$sse->medidas_unidades->prev = $stmt->fetch()->unidades;
		}

		// Para cada SSE, recuperando as medidas unitarias realizadas
		$sql = 'SELECT
					SUM(n) as unidades
				FROM
					maxse_medidas_unidades
				WHERE
					id_sse=:id_sse AND tipo="r"';
		$stmt = $this->db->prepare($sql);

		foreach ($sses as $sse) {
			$stmt->execute(array(':id_sse' => $sse->id));
			$sse->medidas_unidades->real = $stmt->fetch()->unidades;
		}

		// Tratando medidas das sses para ter uma só em medida_p e medida_r
		foreach ($sses as $sse) {
			
			switch ($sse->medida_tds_p) {
				case 'a':
					$sse->medida_p = $sse->medidas_area->prev;
					break;
				
				case 'l':
					$sse->medida_p = $sse->medidas_linear->prev;
					break;
				
				case 'u':
					$sse->medida_p = $sse->medidas_unidades->prev;
					break;
			}
	
			switch ($sse->medida_tds_r) {
				case 'a':
					$sse->medida_r = $sse->medidas_area->real;
					break;
				
				case 'l':
					$sse->medida_r = $sse->medidas_linear->real;
					break;
				
				case 'u':
					$sse->medida_r = $sse->medidas_unidades->real;
					break;
				
				default:
					$sse->medida_r = null;
					break;
			}
		}

		
		// Calculando o consumo previsto de uma sse
		foreach ($sses as $sse) {
			
			// Calculando o total das medidas previstas
			$mTotal = 0;
			switch ($sse->medida_tds_p) {
				
				case 'a':
					$mTotal = $sse->medidas_area->prev;
					break;
				
				case 'l':
					$mTotal = $sse->medidas_linear->prev;
					break;
				
				case 'u':
					$mTotal = $sse->medidas_unidades->prev;
					break;
			}
			
			// Levantando o gasto com matéria prima
			$sql = 'SELECT
						b.id as id_produto,
						b.nome,
						b.unidade,
						round(qtde_por_unidade_de_trab * :mTotal,2) as qtde
					FROM
						maxse_tipos_de_servico_x_produtos a
						INNER JOIN estoque_produtos b ON a.id_produto=b.id
					WHERE id_tipo=:id_tipo';
	
			$stmt = $this->db->prepare($sql);
			$stmt->execute(
				array(
					':id_tipo' => $sse->id_tds_p,
					':mTotal' => $mTotal
				)
			);
			$sse->consumos_prev = $stmt->fetchAll();

		}
		
		// Para cada sse, determinando a faixa de cobrança na qual ela se encontra
		foreach ($sses as $sse) {
			$sql = 'SELECT label, li, ls from maxse_faixas_de_tipos_de_servicos where :v<=ls and :v>li and id_tipo_de_servico=:id_tds';
			$stmt = $this->db->prepare($sql);
			
			$stmt->execute(
				array(
					':v' => $sse->medida_p,
					':id_tds' => $sse->id_tds_p
				)
			);
			$sse->faixa_p = $stmt->fetch();

			$stmt->execute(
				array(
					':v' => $sse->medida_r,
					':id_tds' => $sse->id_tds_r
				)
			);
			$sse->faixa_r = $stmt->fetch();
		}
		
		// Incluindo o gerador de xls
		include(__DIR__ . '/../includes/GeradorDeXls.php');

		// Gerando o xls
		$xls = gerarXls($sses);
		
		// Enviando o xls
		enviarXls($xls);
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
					lng,
					finalizacao_parcial,
					motivo_finalizacao_parcial,
					data_devolucao
				FROM
					maxse_sses
				WHERE 
					id=:id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id'=>$idSse));
		$sse = $stmt->fetch();
		$sse->lat *= 1;
		$sse->lng *= 1;
		$sse->finalizacao_parcial = ($sse->finalizacao_parcial === '1');

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

		$sse->medidas_area->real = array();
		$sse->medidas_linear->real = array();
		$sse->medidas_unidades->real = array();
		// Levantando medidas da SSE realizadas
		if($tds_r){
			switch ($tds_r->medida) {
				case 'a':
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
					
			}
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
		$apiKey = 'AIzaSyCdnWseKB1RXfY3x-Yr0JiXkucYxRyvoiY';
		$url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' . $prepAddr . '&key=' . $apiKey;
		$geocode = file_get_contents($url);
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
			if(isset($sse->foto->changingThisBreaksApplicationSecurity)) {
				$data = $sse->foto->changingThisBreaksApplicationSecurity;
			} else {
				$data = $sse->foto;
			}
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
		$sql = 'UPDATE maxse_sses SET valor_prev=:valor, valor_real=:valor, valor_libe=:valor WHERE id=:id_sse ';
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
		$apiKey = 'AIzaSyCdnWseKB1RXfY3x-Yr0JiXkucYxRyvoiY';
		$url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' . $prepAddr . '&key=' . $apiKey;
		$geocode = file_get_contents($url);
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
						VALUES (:l,:c,:id,:tipo)';
				$stmt = $this->db->prepare($sql);
				for ($i=0; $i < sizeOf($sse->medidas_area->prev); $i++) {
					$trabalho += $sse->medidas_area->prev[$i]->l * $sse->medidas_area->prev[$i]->c;

					try {
						$stmt->execute(array(
							':l' => $sse->medidas_area->prev[$i]->l,
							':c' => $sse->medidas_area->prev[$i]->c,
							':id' => $idNovo,
							':tipo' => "p"
						));
						$stmt->execute(array(
							':l' => $sse->medidas_area->prev[$i]->l,
							':c' => $sse->medidas_area->prev[$i]->c,
							':id' => $idNovo,
							':tipo' => "r"
						));
						$stmt->execute(array(
							':l' => $sse->medidas_area->prev[$i]->l,
							':c' => $sse->medidas_area->prev[$i]->c,
							':id' => $idNovo,
							':tipo' => "l"
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
						VALUES (:v,:id,:tipo)';
				$stmt = $this->db->prepare($sql);
				for ($i=0; $i < sizeOf($sse->medidas_linear->prev); $i++) { 
					$trabalho += $sse->medidas_linear->prev[$i]->v;

					try {
						$stmt->execute(array(
							':v' => $sse->medidas_linear->prev[$i]->v,
							':id' => $idNovo,
							':tipo' => "p"
						));
						$stmt->execute(array(
							':v' => $sse->medidas_linear->prev[$i]->v,
							':id' => $idNovo,
							':tipo' => "r"
						));
						$stmt->execute(array(
							':v' => $sse->medidas_linear->prev[$i]->v,
							':id' => $idNovo,
							':tipo' => "l"
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
						VALUES (:n,:id,:tipo)';
				$stmt = $this->db->prepare($sql);
				for ($i=0; $i < sizeOf($sse->medidas_unidades->prev); $i++) { 
					$trabalho += $sse->medidas_unidades->prev[$i]->n;

					try {
						$stmt->execute(array(
							':n' => $sse->medidas_unidades->prev[$i]->n,
							':id' => $idNovo,
							':tipo' => "p"
						));
						$stmt->execute(array(
							':n' => $sse->medidas_unidades->prev[$i]->n,
							':id' => $idNovo,
							':tipo' => "r"
						));
						$stmt->execute(array(
							':n' => $sse->medidas_unidades->prev[$i]->n,
							':id' => $idNovo,
							':tipo' => "l"
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
		$sql = 'UPDATE maxse_sses SET valor_prev=:valor, valor_real=:valor, valor_libe=:valor WHERE id=:id_sse ';
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
		$motivo_parcial = isset($dados->motivo_parcial) ? $dados->motivo_parcial : null;

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
			$trabalho = $this->maxse['percentual_pago_por_finalizacao_parcial'] * $trabalho;
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

		// Determinando o valor do cmp
		$sql = 'SELECT
					ROUND(SUM(b.qtde*b.valor_unit),2) as cmp
				FROM
					maxse_tarefas a
					INNER JOIN estoque_movimentos b ON a.id=b.id_referencia
				WHERE
					a.id_sse=:id_sse';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_sse' => $id_sse));
		$cmp = $stmt->fetch()->cmp;

		// Levantando qual o id do preíodo de fechamento em aberto
		$sql = 'SELECT id FROM maxse_fechamentos WHERE aberto=1';
		$stmt = $this->db->prepare($sql);
		$stmt->execute();
		$rs = $stmt->fetch();
		if($rs === false) {
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Não existem período de fechamento em aberto');
		} else {
			$id_fechamento = $rs->id;
		}
		

		// Determinando a soma dos salarios das equipes que trabalharam nas sses deste fechamento
		$sql = 'SELECT 
					ifnull(SUM(salario),0) AS total_salarios FROM
				(SELECT
					distinct d.id,d.salario
				FROM
					maxse_sses a
					INNER JOIN maxse_tarefas b ON a.id=b.id_sse
					INNER JOIN maxse_equipes c ON c.id=b.id_equipe
					INNER JOIN maxse_membros d ON d.id_equipe=c.id
				WHERE
					a.id_fechamento=:id_fechamento OR
					a.id=:id_sse) A;';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':id_fechamento' => $id_fechamento,
				':id_sse' => $id_sse
			)
		);
		$total_salarios = $stmt->fetch()->total_salarios;

		// Determinando o número de sses neste fechamento
		$sql = 'SELECT COUNT(*) AS n_sses FROM maxse_sses WHERE id_fechamento=:id_fechamento';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_fechamento'=>$id_fechamento));
		$n_sses = ($stmt->fetch()->n_sses + 1);
		
		// Calculando o valor de cmo
		$cmo = round($total_salarios/$n_sses,2);

		// Iniciando transação
		$this->db->beginTransaction();
		$motivo_parcial = $finalizacaoTotal ? null : $motivo_parcial;

		// Preparando consulta
		$sql = 'UPDATE
					maxse_sses
				SET
					status=sseStatus("FINALIZADA"),
					valor_real=:vr,
					valor_libe=:vr,
					data_devolucao=:data_devolucao,
					finalizacao_parcial=:finalizacao_parcial,
					motivo_finalizacao_parcial=:motivo_parcial,
					id_fechamento=:id_fechamento,
					cmp=:cmp
				WHERE id=:id_sse';
		$stmt = $this->db->prepare($sql);
		
		// Atualizando sse
		try {
			$stmt->execute(array(
				':id_sse' => $id_sse,
				':vr' => $valor_total,
				':data_devolucao' => $data_devolucao,
				':finalizacao_parcial' => $finalizacaoTotal ? 0 : 1,
				':motivo_parcial' => $motivo_parcial,
				':id_fechamento' => $id_fechamento,
				':cmp' => $cmp
			));	
		} catch (Exception $e) {
			// Algo deu errado. Rollback
			$this->db->rollback();

			// Enviando erro
			return $res
			->withStatus(500)
			->write('Falha ao tentar marcar SSE como finalizada: '.$e->getMessage());
		}

		// Atualizando o cmo de todas as outras sses deste período de fechamento
		$sql = 'UPDATE maxse_sses SET cmo=:cmo WHERE id_fechamento=:id_fechamento';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(
				array(
					':id_fechamento' => $id_fechamento,
					':cmo' => $cmo
				)
			);
		} catch (Exception $e) {
			// Algo deu errado. Rollback
			$this->db->rollback();

			// Enviando erro
			return $res
			->withStatus(500)
			->write('Falha ao tentar atualizar cmos das sses do fechamento: '.$e->getMessage());
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

	$app->patch($api_root.'/sses/{id_sse}/cancelarInicio', function(Request $req, Response $res, $args = []){

		/**
		 * CANCELA O INÍCIO DE UMA SSE: o novo status passa a ser "agendada"
		 */

		// Lendo parâmetro
		$id_sse = 1*$args['id_sse'];

		// Iniciando transação
		$this->db->beginTransaction();
		
		// Levantando id e inicio_r de tarefas da sse em execução - - - - - -
		$sql = 'SELECT id, inicio_r FROM maxse_tarefas WHERE id_sse=:id_sse AND inicio_r IS NOT NULL AND final_r IS NULL';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':id_sse' => $id_sse
			)
		);
		$tarefas = $stmt->fetchAll();
		$ids_tarefas = array_map(function($a){return $a->id;}, $tarefas);
		$inicios_tarefas = array_map(function($a){return $a->inicio_r;}, $tarefas);

		// Verificando se há alguma tarefa executada anteriormente
		$sql = 'SELECT count(*) as n FROM maxse_tarefas WHERE inicio_r < :min_inicio AND id_sse=:id_sse';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':id_sse' => $id_sse,
				':min_inicio' => min($inicios_tarefas)
			)
		);
		$primeira_tarefa = ($stmt->fetch()->n == 0);

		// Levantando o tipo de medida da sse
		$sql = 'SELECT b.medida FROM maxse_sses a inner join maxse_tipos_de_servico b on a.id_tipo_de_servico=b.id WHERE a.id=:id_sse';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_sse' => $id_sse));
		$medida = $stmt->fetch()->medida;

		// Recuperando medidas previstas para esta sse
		switch ($medida) {
			case 'a':
				$sql = 'SELECT l,c FROM maxse_medidas_area WHERE id_sse=:id_sse AND tipo="p"';
				break;
			
			case 'l':
				$sql = 'SELECT v  FROM maxse_medidas_linear WHERE id_sse=:id_sse AND tipo="p"';
				break;
			
			case 'u':
				$sql = 'SELECT n  FROM maxse_medidas_unidades WHERE id_sse=:id_sse AND tipo="p"';
				break;
		}
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(':id_sse' => $id_sse)
		);
		$medidas = $stmt->fetchAll();

		// Se essa tarefa/tarefa multipla for a primeira tarefa, apagar medidas da sse
		$sql = 'DELETE from maxse_medidas_area WHERE (tipo="r" OR tipo="l") AND id_sse=:id_sse;
				DELETE from maxse_medidas_linear WHERE (tipo="r" OR tipo="l") AND id_sse=:id_sse;
				DELETE from maxse_medidas_unidades WHERE (tipo="r" OR tipo="l") AND id_sse=:id_sse';
		$stmt = $this->db->prepare($sql);

		try {
			$stmt->execute(array(':id_sse'=>$id_sse));
		} catch (Exception $e) {
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar remover medidas da SSE: '.$e->getMessage());
		}

		// Inserindo os valores das medidas previstas como realizadas e liberadas
		switch ($medida) {
			case 'a':
				$sql = 'INSERT INTO maxse_medidas_area (l,c,tipo,id_sse) VALUES (:l,:c,:tipo,:id_sse)';
				$stmt = $this->db->prepare($sql);
				foreach ($medidas as $m) {
					$stmt->execute(
						array(
							':l' => $m->l,
							':c' => $m->c,
							':tipo' => 'r',
							':id_sse' => $id_sse
						)
					);
					$stmt->execute(
						array(
							':l' => $m->l,
							':c' => $m->c,
							':tipo' => 'l',
							':id_sse' => $id_sse
						)
					);
				}
				break;
			
			case 'l':
				$sql = 'INSERT INTO maxse_medidas_linear (v,tipo,id_sse) VALUES (:v,:tipo,:id_sse)';
				$stmt = $this->db->prepare($sql);
				foreach ($medidas as $m) {
					$stmt->execute(
						array(
							':v' => $m->v,
							':tipo' => 'r',
							':id_sse' => $id_sse
						)
					);
					$stmt->execute(
						array(
							':v' => $m->v,
							':tipo' => 'l',
							':id_sse' => $id_sse
						)
					);
				}
				break;
			
			case 'u':
				$sql = 'INSERT INTO maxse_medidas_unidades (n,tipo,id_sse) VALUES (:n,:tipo,:id_sse)';
				$stmt = $this->db->prepare($sql);
				foreach ($medidas as $m) {
					$stmt->execute(
						array(
							':n' => $m->n,
							':tipo' => 'r',
							':id_sse' => $id_sse
						)
					);
					$stmt->execute(
						array(
							':n' => $m->n,
							':tipo' => 'l',
							':id_sse' => $id_sse
						)
					);
				}
				break;
		}

		$condicao = 'id='.implode(' OR id=',$ids_tarefas);
		foreach ($ids_tarefas as $id_tarefa) {

			// Alterando as tarefas em execução da SSE
			$sql = 'UPDATE maxse_tarefas SET divergente=0, autorizadaPor=null, inicio_r=null WHERE '.$condicao;
			$stmt = $this->db->prepare($sql);
			try {
				$stmt->execute();
			} catch (Exception $e) {
				
				// rolling back
				$this->db->rollback();

				// Retornando erro para usuário
				return $res
				->withStatus(500)
				->write('Falha ao tentar alterar as tarefas da sse: '.$e->getMessage());

			}

			// Alterando o status da sse para "AGENDADA"
			$sql = 'UPDATE maxse_sses SET status=sseStatus("AGENDADA"), id_tipo_de_servico_r=null WHERE id=:id_sse';
			$stmt = $this->db->prepare($sql);
			try {
				$stmt->execute(array(':id_sse' => $id_sse));
			} catch (Exception $e) {
				// rolling back
				$this->db->rollback();

				// Retornando erro para usuário
				return $res
				->withStatus(500)
				->write('Falha ao tentar alterar status da sse: '.$e->getMessage());
			}

			// Commitando
			$this->db->commit();

			// Retornando resposta para usuário
			return $res
			->withStatus(200);
			
		}
		
		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write('{"novoStatus":"'.$status.'"}');
	
	});

	$app->patch($api_root.'/sses/{id_sse}/alterarMedidaLiberada', function(Request $req, Response $res, $args = []){
		
		// Lendo o id da sse
		$id_sse = 1*$args['id_sse'];

		// Lendo a nova medida
		$novaMedida = 1*$req->getBody()->getContents();

		// Determinando o tipo de medida da sse
		$sql = 'SELECT finalizacao_parcial,medida FROM maxse_sses a INNER JOIN maxse_tipos_de_servico b ON a.id_tipo_de_servico=b.id WHERE a.id=:id_sse';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_sse' => $id_sse));
		$rs = $stmt->fetch();
		$medida = $rs->medida;
		$finalizacaoParcial = ($rs->finalizacao_parcial == 1);
		
		// Iniciando transação
		$this->db->beginTransaction();

		// Preparando consulta para remover medidas liberadas antigas
		switch ($medida) {

			case 'a':
				$sql = 'DELETE FROM maxse_medidas_area WHERE id_sse=:id_sse and tipo="l"';
				$insert_sql = 'INSERT INTO maxse_medidas_area (l, c, id_sse,tipo) VALUES (:valor,1,:id_sse,"l")';
				break;

			case 'l':
				$sql = 'DELETE FROM maxse_medidas_linear WHERE id_sse=:id_sse and tipo="l"';
				$insert_sql = 'INSERT INTO maxse_medidas_linear (v, id_sse,tipo) VALUES (:valor,:id_sse,"l")';
				break;

			case 'u':
				$sql = 'DELETE FROM maxse_medidas_unidades WHERE id_sse=:id_sse and tipo="l"';
				$insert_sql = 'INSERT INTO maxse_medidas_unidades (n, id_sse,tipo) VALUES (:valor,:id_sse,"l")';
				break;
			
		}
		// Executando consulta para remover medidas
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id_sse' => $id_sse));

		// Executando consulta para inserir nova medida liberada
		$stmt = $this->db->prepare($insert_sql);
		$stmt->execute(
			array(
				':id_sse' => $id_sse,
				':valor' => $novaMedida
			)
		);

		// Determinando o trabalho executado levando em conta se foi finalização parcial ou não
		$trabalho = $finalizacaoParcial ? $this->maxse['percentual_pago_por_finalizacao_parcial'] * $novaMedida : $novaMedida;
		
		// Determinando o valor do trabalho para a faixa na qual esta medida liberada se encontra
		$sql = 'SELECT
					c.valor
				FROM
					maxse_sses a
					INNER JOIN maxse_tipos_de_servico b ON a.id_tipo_de_servico=b.id
					INNER JOIN maxse_faixas_de_tipos_de_servicos c ON b.id=c.id_tipo_de_servico
				WHERE
					a.id=:id_sse AND
					c.li < :novaMedida AND
					c.ls >= :novaMedida';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(
				':id_sse' => $id_sse,
				':novaMedida' => $trabalho
			)
		);
		$valorUnitario = $stmt->fetch()->valor;
		$novoValorLiberado = $valorUnitario * $trabalho;

		// Atualizando o valor liberado
		$sql = 'UPDATE maxse_sses SET valor_libe=:valor_liberado';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':valor_liberado' => $novoValorLiberado));

		// Comitando
		$this->db->commit();
		
	});