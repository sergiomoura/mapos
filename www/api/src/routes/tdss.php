<?php

	use Slim\Http\Request;
	use Slim\Http\Response;

	$app->get($api_root.'/tdss',function(Request $req, Response $res, $args = []){

		// Levantando tipos de equipe na base
		$sql = 'SELECT id,codigo,letra,prazo,descricao,medida FROM maxse_tipos_de_servico ORDER BY codigo';
		$stmt = $this->db->prepare($sql);
		$stmt->execute();
		$tdss = $stmt->fetchAll();

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($tdss));

	});