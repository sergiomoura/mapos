<?php
	
	use \Slim\Http\Request;
	use \Slim\Http\Response;

	$app->get('/equipes',function(Request $req, Response $res, $args=[]){

		// Levantando equipes da base
		$sql = 'SELECT id,nome,sigla,id_tipo,ativa FROM maxse_equipes ORDER BY id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute();
		$equipes = $stmt->fetchAll();

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($equipes));
	});