<?php	
	
	use \Slim\Http\Request;
	use \Slim\Http\Response;

	function calculaCmoParaFechamento($id_fechamento,$db){

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
					a.id_fechamento=:id_fechamento) A;';
		$stmt = $db->prepare($sql);
		$stmt->execute(
			array(
				':id_fechamento' => $id_fechamento
			)
		);
		$total_salarios = $stmt->fetch()->total_salarios;

		// Determinando o número de sses neste fechamento
		$sql = 'SELECT COUNT(*) AS n_sses FROM maxse_sses WHERE id_fechamento=:id_fechamento';
		$stmt = $db->prepare($sql);
		$stmt->execute(array(':id_fechamento'=>$id_fechamento));
		$n_sses = ($stmt->fetch()->n_sses);
		
		// Calculando o valor de cmo
		if($n_sses > 0){
			$cmo = round($total_salarios/$n_sses,2);
		} else {
			$cmo = INF;
		}

		// Atualizando o cmo de todas as outras sses deste período de fechamento
		$sql = 'UPDATE maxse_sses SET cmo=:cmo WHERE id_fechamento=:id_fechamento';
		$stmt = $db->prepare($sql);
		$stmt->execute(
			array(
				':id_fechamento' => $id_fechamento,
				':cmo' => $cmo
			)
		);
		
		// Atribuindo o cmo do fechamento (salário de todas as equipes que trabalharam em pelo menos uma sse)
		$sql = 'UPDATE maxse_fechamentos SET cmo=:cmo WHERE id=:id_fechamento';
		$stmt = $db->prepare($sql);
		$stmt->execute(
			array(
				':cmo' => $total_salarios,
				':id_fechamento' => $id_fechamento
			)
		);
		
	}

	function calculaCmpParaFechamento($id_fechamento,$db){
		
		// Determinando o custo da matéria prima
		$sql = 'SELECT SUM(cmp) as cmp FROM maxse_sses WHERE id_fechamento=:id_fechamento';
		$stmt = $db->prepare($sql);
		$stmt->execute(array(':id_fechamento' => $id_fechamento));
		$cmp = $stmt->fetch()->cmp;

		// Atribuindo a cmp ao fechamento
		$sql = 'UPDATE maxse_fechamentos SET cmp=:cmp WHERE id=:id_fechamento';
		$stmt = $db->prepare($sql);

		$stmt->execute(
			array(
				':id_fechamento' => $id_fechamento,
				':cmp' => $cmp
			)
		);
		
	}

	function calculaValoresDeFechamento(int $id_fechamento,$db){
		
		// Levantando soma de valores reais e soma de valores previstos das sses do fechamento
		$sql = 'SELECT
					ifnull(sum(valor_prev),0) as total_prev,
					ifnull(sum(valor_real),0) as total_real
				FROM maxse_sses
				WHERE id_fechamento=:id_fechamento;';

		$stmt = $db->prepare($sql);
		$stmt->execute(
			array(':id_fechamento' => $id_fechamento)
		);
		$rs = $stmt->fetch();

		// Atualizando os valores do fechamento
		$sql = 'UPDATE
					maxse_fechamentos
				SET
					faturamento_prev=:total_prev,
					faturamento_real=:total_real
				WHERE
					id=:id_fechamento';
		$stmt = $db->prepare($sql);
		$stmt->execute(
			array(
				':total_prev' => $rs->total_prev,
				':total_real' => $rs->total_real,
				':id_fechamento' => $id_fechamento
			)
		);
	}

	function moverSsesParaFechamento($ids_sse, $id_fechamento_origem, $id_fechamento_destino, $db){
		
		// Montando restições da query de atualização
		$ids_sse = array_map(function($a){return 1*$a;},$ids_sse);
		$cnd = 'id=' . implode(' OR id=',$ids_sse);

		// Atualizando sses
		$sql = 'UPDATE maxse_sses SET id_fechamento=:id_fechamento WHERE '.$cnd;
		$stmt = $db->prepare($sql);
		try {
			$stmt->execute(
				array(
					':id_fechamento' => $id_fechamento_destino
				)
			);		
		} catch (Exception $e) {
			throw new Exception("Falha ao tentar mover SSEs:" . $e->getMessage(), 1);
		}
	
		try {

			// Recalculando os valores, cmo e cmp para o fechamento de origem
			calculaCmoParaFechamento($id_fechamento_origem,$db);
			calculaCmpParaFechamento($id_fechamento_origem,$db);
			calculaValoresDeFechamento($id_fechamento_origem,$db);
			
			// Recalculando os valores, cmo e cmp para o fechamento de destino
			calculaCmoParaFechamento($id_fechamento_destino,$db);
			calculaCmpParaFechamento($id_fechamento_destino,$db);
			calculaValoresDeFechamento($id_fechamento_destino,$db);
			
		} catch (Exception $e) {

			// Emitindo exception
			throw new Exception("Falha: " .$e->getMessage(), 1);

		}

	}

	function temPermissaoParaFechamento($token, $db){
		// Levantando permissão do usuário na base
		$sql = 'SELECT perm_tela_fechamentos FROM maxse_usuarios WHERE token=:token';
		$stmt = $db->prepare($sql);
		$stmt->execute(array(':token' => $token));
		return ($stmt->fetch()->perm_tela_fechamentos === '1');
	}

	function encerrarFechamento($id_fechamento,$db){
		calculaCmoParaFechamento($id_fechamento,$db);
		calculaCmpParaFechamento($id_fechamento,$db);
		calculaValoresDeFechamento($id_fechamento,$db);
		
		// Encerrar fechamento
		$sql = 'UPDATE maxse_fechamentos set aberto=0 WHERE id=:id_fechamento';
		$stmt = $db->prepare($sql);
		try {
			$stmt->execute(array(':id_fechamento' => $id_fechamento));
		} catch (Exception $e) {
			throw new Exception("Falha ao tentar encerrar fechamento: " . $e->getMessage(), 1);
		}
	}

	$app->get($api_root.'/fechamentos',function(Request $req, Response $res, $args=[]){

		// Levantando token na requisição
		$token = str_replace('Bearer ','',$req->getHeaders()['HTTP_AUTHORIZATION'][0]);

		// Levantando a permissão para ver tela de fechamento
		$perm_tela_fechamentos = temPermissaoParaFechamento($token, $this->db);

		if(!$perm_tela_fechamentos){
			// Retornando erro para usuário
			return $res
			->withStatus(403)
			->write('Usuário não tem permissão para acessar dados de fechamento');
		}

		// Levantando fechamentos da base
		$sql = 'SELECT
					id,
					inicio,
					final,
					faturamento_prev,
					faturamento_real,
					cmo,
					cmp,
					aberto
				FROM
					maxse_fechamentos
				ORDER BY inicio DESC';
				
		$stmt = $this->db->prepare($sql);
		$stmt->execute();
		$fechamentos = $stmt->fetchAll();

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($fechamentos));

	});

	$app->patch($api_root.'/fechamentos/{id}/encerrar',function(Request $req, Response $res, $args=[]){

		// Levantando token na requisição
		$token = str_replace('Bearer ','',$req->getHeaders()['HTTP_AUTHORIZATION'][0]);

		// Levantando a permissão para ver tela de fechamento
		$perm_tela_fechamentos = temPermissaoParaFechamento($token, $this->db);

		if(!$perm_tela_fechamentos){
			// Retornando erro para usuário
			return $res
			->withStatus(403)
			->write('Usuário não tem permissão para acessar dados de fechamento');
		}

		// Lendo o id do fechamento
		$id_fechamento = 1*$args['id'];

		// Encerrar fechamento
		$sql = 'UPDATE maxse_fechamentos set aberto=0 WHERE id=:id_fechamento';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(array(':id_fechamento' => $id_fechamento));
		} catch (Exception $e) {
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar alterar fechamento '.$id_fechamento);
		}
		
		// Calcular valores do fechamento
		calculaValoresDeFechamento($id_fechamento,$this->db);

		// Calcular CMO do fechamento
		calculaCmoParaFechamento($id_fechamento,$this->db);

		// Calcular CMP do fechamento
		calculaCmpParaFechamento($id_fechamento,$this->db);
		
		// Recuperando o id do último fechamento
		$sql = 'SELECT max(id) as id FROM maxse_fechamentos';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array());
		$id_ultimo_fechamento = $stmt->fetch()->id;

		// Verificando se o fechamento atual é o último
		if($id_fechamento == $id_ultimo_fechamento){

			// Sim: está encerrando o último fechamento

			// Recuperando o mês inicial do último fechamento
			$sql = 'SELECT month(final) as ultimo_mes FROM maxse_fechamentos WHERE id=:id_fechamento';
			$stmt = $this->db->prepare($sql);
			$stmt->execute(array(':id_fechamento' => $id_fechamento));
			$ultimo_mes = 1 * ($stmt->fetch()->ultimo_mes);
			$str_ini = date('Y-').($ultimo_mes).'-16';
			if($ultimo_mes == 12){
				$str_fim = (date('Y') + 1) .'-1-15';
			} else {
				$str_fim = date('Y-').($ultimo_mes + 1).'-15';
			}

			// Criando um novo período de fechamento aberto
			$sql = 'INSERT INTO maxse_fechamentos
					(
						inicio,
						final,
						aberto
					) VALUES (
						:inicio,
						:final,
						1
					)';
			$stmt = $this->db->prepare($sql);
			try {
				$stmt->execute(
					array(
						':inicio' => $str_ini,
						':final' => $str_fim
					)
				);
			} catch (Exception $e) {
				// Retornando erro para usuário
				return $res
				->withStatus(500)
				->write('Falha ao tentar criar um novo período de fechamento');
			}

		} else {

			// Não: NÃO está encerrando o último fechamento

			// Abrindo o último fechamento
			$sql = 'UPDATE maxse_fechamentos SET aberto=1 WHERE id=:id_ultimo_fechamento';
			$stmt = $this->db->prepare($sql);
			try {
				$stmt->execute(
					array(
						':id_ultimo_fechamento' => $id_ultimo_fechamento
					)
				);
			} catch (Exception $e) {
				// Retornando erro para usuário
				return $res
				->withStatus(500)
				->write('Falha ao tentar reabrir o último período fechamento:' . $e->getMessage());
			}	
		}

		// Retornando resposta para usuário
		return $res->withStatus(200);
		
	});

	$app->patch($api_root.'/fechamentos/{id}/reabrir',function(Request $req, Response $res, $args=[]){

		// Levantando token na requisição
		$token = str_replace('Bearer ','',$req->getHeaders()['HTTP_AUTHORIZATION'][0]);

		// Levantando a permissão para ver tela de fechamento
		$perm_tela_fechamentos = temPermissaoParaFechamento($token, $this->db);

		if(!$perm_tela_fechamentos){
			// Retornando erro para usuário
			return $res
			->withStatus(403)
			->write('Usuário não tem permissão para acessar dados de fechamento');
		}

		// Lendo o id do fechamento
		$id_fechamento = 1*$args['id'];

		// Pegando os ids dos fechamentos que estão abertos
		$sql = 'SELECT id FROM maxse_fechamentos WHERE aberto=1';
		$stmt = $this->db->prepare($sql);
		$stmt->execute();
		$ids_fechamentos_abertos = array_map(function($a){return $a->id;}, $stmt->fetchAll());

		// Começãndo transação
		$this->db->beginTransaction();

		// Fechando todos eles
		foreach ($ids_fechamentos_abertos as $idf) {
			encerrarFechamento($idf, $this->db);
		}
		
		// Abrindo o período de fechamento
		$sql = 'UPDATE
					maxse_fechamentos
				SET
					aberto=1,
					cmo=null,
					cmp=null,
					faturamento_prev=null,
					faturamento_real=null
				WHERE
					id=:id_fechamento';
		$stmt = $this->db->prepare($sql);

		try {
			$stmt->execute(array(':id_fechamento' => $id_fechamento));
		} catch (Exception $e) {
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar alterar fechamento '.$id_fechamento);
		}
		
		// Commitando alterações
		$this->db->commit();

		// Retornando resposta para usuário
		return $res->withStatus(200);
		
	});

	$app->patch($api_root.'/fechamentos/mvNext',function(Request $req, Response $res, $args=[]){

		// Levantando token na requisição
		$token = str_replace('Bearer ','',$req->getHeaders()['HTTP_AUTHORIZATION'][0]);

		// Levantando a permissão para ver tela de fechamento
		$perm_tela_fechamentos = temPermissaoParaFechamento($token, $this->db);

		if(!$perm_tela_fechamentos){
			// Retornando erro para usuário
			return $res
			->withStatus(403)
			->write('Usuário não tem permissão para acessar dados de fechamento');
		}
		
		// Lendo dados da requisição
		$data = json_decode($req->getBody()->getContents());

		// Separando ids_sse e id_fechamento
		$ids_sse = $data->ids_sse;
		$id_fechamento = $data->id_fechamento;
		
		// Verificando se existe um próximo período de fechamento.
		$id_proximo_fechamento = $id_fechamento+1;
		$sql = 'SELECT id FROM maxse_fechamentos WHERE id=:id_fechamento';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(':id_fechamento' => $id_proximo_fechamento)
		);
		
		if($stmt->fetch() === false){
			// Não existe um próximo fechamento.
			// Retornando erro para usuário
			return $res
			->withStatus(400)
			->write('Não existe um próximo fechamento');
		}

		// Tentando mover ids_sses para o próximo fechamento
		try {
			moverSsesParaFechamento($ids_sse,$id_fechamento,$id_proximo_fechamento,$this->db);
		} catch (Exception $e) {
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao mover SSEs para próximo período de fechamento: '.$e->getMessage());
		}

		// Retornando resposta para usuário
		return $res->withStatus(200);
	});

	$app->patch($api_root.'/fechamentos/mvPrev',function(Request $req, Response $res, $args=[]){

		// Levantando token na requisição
		$token = str_replace('Bearer ','',$req->getHeaders()['HTTP_AUTHORIZATION'][0]);

		// Levantando a permissão para ver tela de fechamento
		$perm_tela_fechamentos = temPermissaoParaFechamento($token, $this->db);

		if(!$perm_tela_fechamentos){
			// Retornando erro para usuário
			return $res
			->withStatus(403)
			->write('Usuário não tem permissão para acessar dados de fechamento');
		}
		
		// Lendo dados da requisição
		$data = json_decode($req->getBody()->getContents());

		// Separando ids_sse e id_fechamento
		$ids_sse = $data->ids_sse;
		$id_fechamento = $data->id_fechamento;
		
		// Verificando se existe um próximo período de fechamento.
		$id_fechamento_anterior = $id_fechamento-1;
		$sql = 'SELECT id FROM maxse_fechamentos WHERE id=:id_fechamento';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(
			array(':id_fechamento' => $id_fechamento_anterior)
		);
		
		if($stmt->fetch() === false){
			// Não existe um próximo fechamento.
			// Retornando erro para usuário
			return $res
			->withStatus(400)
			->write('Não existe um próximo fechamento');
		}

		// Tentando mover ids_sses para o próximo fechamento
		try {
			moverSsesParaFechamento($ids_sse,$id_fechamento,$id_fechamento_anterior,$this->db);
		} catch (Exception $e) {
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao mover SSEs para período de fechamento anterior: '.$e->getMessage());
		}

		// Retornando resposta para usuário
		return $res->withStatus(200);
	});