<?php

	use Slim\Http\Request;
	use Slim\Http\Response;

	$app->get($api_root.'/tdss',function(Request $req, Response $res, $args = []){
		
		// Levantando tipos de equipe na base
		$sql = 'SELECT id,codigo,letra,prazo,descricao,medida FROM maxse_tipos_de_servico ORDER BY codigo';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute();
		} catch (Exception $e) {
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao o tentar carregar tipos de serviços: '.$e->getMessage());
		}

		// Lendo resultados da consulta
		$tdss = $stmt->fetchAll();

		// Parsing
		foreach ($tdss as $tds) {
			$tds->id *= 1;
			$tds->prazo *= 1;
		}

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($tdss));

	});