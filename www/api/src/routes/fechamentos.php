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
		$cmo = round($total_salarios/$n_sses,2);

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

	function calculaValoresDeFechamento(int $id_fechamento,$db){
		
		// Levantando soma de valores reais e soma de valores previstos das sses do fechamento
		$sql = 'SELECT
					ifnull(sum(valor_prev),0) as tot_prev,
					ifnull(sum(valor_real),0) as tot_real
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
		
		// Iniciando transação
		$db->beginTransaction();

		// Montando restições da query de atualização
		$ids_sse = array_map(function($a){return 1*$a;},$ids_sse);
		$cnd = 'id=' . implode(' OR id=',$ids_sse);

		// Atualizando sses
		$sql = 'UPDATE maxse_sses SET id_fechamento=:id_fechamento WHERE '.$cnd;
		$stmt = $db->prepare($sql);
		$stmt->execute(
			array(
				':id_fechamento' => $id_fechamento_destino
			)
		);		
		
		// Recalculando o cmo para o fechamento de origem
		try {
			calculaCmoParaFechamento($id_fechamento_origem,$db);
		} catch (Exception $e) {
			throw new Exception("Falha ao recalcular CMO para o fechamento ".$id_fechamento_origem, 1);
		}

		// Recalculando o cmo para o fechamento de destino
		try {
			calculaCmoParaFechamento($id_fechamento_destino,$db);
		} catch (Exception $e) {
			throw new Exception("Falha ao recalcular CMO para o fechamento ".$id_fechamento_destino, 1);
		}

		// Recalculando o valor do fechamento origem
		try {
			calculaValoresDeFechamento($id_fechamento_origem,$db);
		} catch (Exception $e) {
			throw new Exception("Falha ao recalcular faturamento real/previsto para o fechamento origem: ".$id_fechamento_origem.' - '.$e->getMessage(), 1);
		}

		// Recalculando o valor do fechamento destino
		try {
			calculaValoresDeFechamento($id_fechamento_destino,$db);
		} catch (Exception $e) {
			throw new Exception("Falha ao recalcular faturamento real/previsto para o fechamento destino: ".$id_fechamento_destino, 1);
		}

		// Chegou aqui... commit!
		$db->commit();
	}

	$app->get($api_root.'/fechamentos',function(Request $req, Response $res, $args=[]){

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

	$app->patch($api_root.'/fechamentos/mvNext',function(Request $req, Response $res, $args=[]){
		
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
			->write('Falha ao mover SSEs para próximo período de fechamento: '.$e->getMessage());
		}

		// Retornando resposta para usuário
		return $res->withStatus(200);
	});