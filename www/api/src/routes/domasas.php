<?php

	use Slim\Http\Request;
	use Slim\Http\Response;

	$app->get($api_root.'/domasas',function(Request $req, Response $res, $args = []){
		// Levantando tipos de equipe na base
		$sql = 'SELECT id FROM maxse_domasas ORDER BY id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute();
		$domasas = array_map(
						function($a){
							$a->bairros = array();
							return $a;
						}, $stmt->fetchAll());

		// Levantando tipos de equipe na base
		$sql = 'SELECT id,codigo,nome,domasa FROM maxse_bairros ORDER BY nome';
		$stmt = $this->db->prepare($sql);
		$stmt->execute();
		$bairros = $stmt->fetchAll();
		
		// Parsing
		foreach ($bairros as $bairro) {
			$achou = false;
			$i = 0;
			while(!$achou && $i < sizeof($domasas)){
				if($domasas[$i]->id == $bairro->domasa){
					array_push($domasas[$i]->bairros,$bairro);
					$achou = true;
				}
				$i++;
			}
		}

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($domasas));

	});

	$app->get($api_root.'/domasas/flat',function(Request $req, Response $res, $args = []){

		// Levantando tipos de equipe na base
		$sql = 'SELECT id,codigo,nome,domasa FROM maxse_bairros ORDER BY nome';
		$stmt = $this->db->prepare($sql);
		$stmt->execute();
		$bairros = $stmt->fetchAll();

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($bairros));

	});