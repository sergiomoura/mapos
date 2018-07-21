<?php

	use Slim\Http\Request;
	use Slim\Http\Response;

	$app->get($api_root.'/produtos',function(Request $req, Response $res, $args = []){

		// Levantando tipos de equipe na base
		$sql = 'SELECT id,nome,unidade,qtde_min,qtde_max,qtde,ultimo_movimento FROM estoque_produtos ORDER BY nome';
		$stmt = $this->db->prepare($sql);
		$stmt->execute();
		$produtos = $stmt->fetchAll();

		// Parsing response
		foreach($produtos as $p){
			$p->id *= 1;
			$p->qtde_min *= 1;
			$p->qtde_max *= 1;
			$p->qtde *= 1;
		}


		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($produtos));

	});