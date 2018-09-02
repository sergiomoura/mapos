<?php	

	use \Slim\Http\Request;
	use \Slim\Http\Response;

	$app->get($api_root.'/fechamentos',function(Request $req, Response $res, $args=[]){

		// Levantando fechamentos da base
		$sql = 'SELECT
					id,
					inicio,
					final,
					faturamento_prev,
					faturamento_real,
					cmo_rateado,
					cmp_rateado,
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