<?php

	use Slim\Http\Request;
	use Slim\Http\Response;

	$app->get($api_root.'/tdes',function(Request $req, Response $res, $args = []){

		// Levantando tipos de equipe na base
		$sql = 'SELECT id,nome FROM maxse_tipos_de_equipe ORDER BY nome';
		$stmt = $this->db->prepare($sql);
		$stmt->execute();
		$tdes = $stmt->fetchAll();

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($tdes));

	});