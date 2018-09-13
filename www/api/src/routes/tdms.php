<?php

	use Slim\Http\Request;
	use Slim\Http\Response;

	$app->get($api_root.'/tdms',function(Request $req, Response $res, $args = []){
		
		// Levantando tipos de equipe na base
		$sql = 'SELECT id,nome FROM maxse_tipos_de_membro ORDER BY nome';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute();
		} catch (Exception $e) {
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao o tentar carregar tipos de membros: '.$e->getMessage());
		}

		// Lendo resultados da consulta
		$tdms = $stmt->fetchAll();

		// Parsing
		foreach ($tdms as $tdm) {
			$tdm->id *= 1;
		}

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($tdms));

	});