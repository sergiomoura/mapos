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

		// Levantando as faixas de cada um dos tipos de serviço
		$sql = 'SELECT
					label,
					li,
					ls
				FROM
					maxse_faixas_de_tipos_de_servicos
				WHERE
					id_tipo_de_servico = :id_tds';
		$stmt = $this->db->prepare($sql);
		foreach ($tdss as $tds) {
			$stmt->execute(array(':id_tds' => $tds->id));
			$tds->faixas = array_map(
				function($f) {
					$f->li *= 1;
					$f->ls *= 1;
					return $f;
				},
				$stmt->fetchAll()
			);
		}

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($tdss));

	});