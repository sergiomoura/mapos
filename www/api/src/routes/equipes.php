<?php
	
	use \Slim\Http\Request;
	use \Slim\Http\Response;

	$app->get($api_root.'/equipes',function(Request $req, Response $res, $args=[]){

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

	$app->get($api_root.'/equipes/{id}',function(Request $req, Response $res, $args=[]){
		
		// Lendo id de args
		$idEquipe = 1*$args['id'];

		// Carregando informações particulares da equipe
		$sql = 'SELECT
					id,
					nome,
					sigla,
					id_tipo,
					ativa,
					id_membro_lider
				FROM
					maxse_equipes
				WHERE
					id=:id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id'=>$idEquipe));
		$equipe = $stmt->fetch();

		// Verificando se retornou algum resultado
		if($equipe === false){
			// Retornando erro para usuário
			return $res
			->withStatus(404)
			->write('Equipe inexistente');
		}

		// Carregando os membros desta equipe
		$sql = 'SELECT
					a.id,
					a.salario,
					a.id_pessoa,
					b.nome,
					b.email
				FROM
					maxse_membros a
					LEFT JOIN maxse_pessoas b on a.id_pessoa=b.id
				WHERE a.id_equipe=:id';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(':id'=>$idEquipe));
		$equipe->membros = $stmt->fetchAll();

		// Carregando informações do líder desta equipe
		$id_pessoa_lider = 0;
		for ($i=0; $i < sizeof($equipe->membros); $i++) { 
			if($equipe->membros[$i]->id == $equipe->id_membro_lider){
				
				// Achando o usuário que é lider
				$sql = 'SELECT username,acessoApp,acessoWeb FROM maxse_usuarios WHERE id_pessoa=:id_pessoa';
				$stmt = $this->db->prepare($sql);
				$stmt->execute(array(
					':id_pessoa' => $equipe->membros[$i]->id_pessoa
				));
				$equipe->usuario_lider = $stmt->fetch();
			}
			unset($equipe->membros[$i]->id_pessoa);
		}

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write(json_encode($equipe));
		
	});

	$app->put($api_root.'/equipes/{id}',function(Request $req, Response $res, $args=[]){
		
		// Lendo requisição
		$data = json_decode($req->getBody()->getContents());

		// verificando se o JSON veio ok
		if(JSON_ERROR_NONE != json_last_error()){
			// Retornando erro para usuário
			return $res
			->withStatus(400)
			->write('Reuisição mal formada');
		}

		// Lendo equipe e se o lider mudou
		$equipe = $data->equipe;
		$liderMudou = $data->liderMudou;

		// Descobrindo a se senha do lider está vazia ou não
		$achou = false;
		$i = 0;
		$lider = null;
		while (!$achou && $i<sizeof($equipe->membros)) {
			$achou = $equipe->membros[$i]->lider;
			if($achou){
				$lider = $equipe->membros[$i];
			}
			$i++;
		}
		
		// Se lider não mudou e a senha está vazia, salvar senha anterior
		if(!$liderMudou && $lider->senha == ''){
			// Salvando senha
			$sql = 'SELECT password FROM maxse_membros a INNER JOIN maxse_usuarios b ON a.id_pessoa=b.id_pessoa AND a.id=:id_membro';
			$stmt = $this->db->prepare($sql);
			$stmt->execute(array(
				':id_membro' => $lider->id
			));
			$lider->hash = ($stmt->fetch())->password;
		} else {
			$lider->hash = crypt($lider->senha);
		}

		// Removendo antigos membros da equipe
		$sql = 'DELETE b.* FROM maxse_membros a INNER JOIN maxse_pessoas b ON a.id_pessoa=b.id WHERE a.id_equipe=:id';

		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(
			':id' => $equipe->id
		));

		// Inserindo novos membros da equipe
		$sql_pessoa = 'INSERT INTO maxse_pessoas (nome,email) VALUES (:nome,:email)';
		$stmt_pessoa = $this->db->prepare($sql_pessoa);

		$sql_membro = 'INSERT INTO maxse_membros (salario,id_equipe,id_pessoa) VALUES (:salario,:id_equipe,:id_pessoa)';
		$stmt_membro = $this->db->prepare($sql_membro);

		foreach ($equipe->membros as $membro) {
			$stmt_pessoa->execute(array(
				':nome'=> $membro->nome,
				':email'=> $membro->email
			));
			$id_pessoa = $this->db->lastInsertId();
			$stmt_membro->execute(array(
				':salario' => $membro->salario,
				':id_equipe' => $equipe->id,
				':id_pessoa' => $id_pessoa
			));
			if($membro->lider){
				$lider->id_pessoa = $id_pessoa;
				$lider->id_novo = $this->db->lastInsertId();
			}
		}

		// Inserindo o usuário
		$sql = 'INSERT INTO maxse_usuarios (username,password,acessoWeb,acessoApp,id_pessoa) VALUES (:username,:password,:acessoWeb,:acessoApp,:id_pessoa)';
		$stmt = $this->db->prepare($sql);
		$stmt->execute(array(
			':username' => $lider->username,
			':password' => $lider->hash,
			':acessoWeb' => ($lider->acessoWeb ? 1 : 0),
			':acessoApp' => ($lider->acessoApp ? 1 : 0),
			'id_pessoa' => $lider->id_pessoa
		));

		// Atualizando dados da equipe
		$sql = 'UPDATE maxse_equipes
				SET nome=:nome,
					sigla=:sigla,
					id_membro_lider=:id_lider,
					id_tipo=:id_tipo,
					ativa=:ativa
				WHERE
					id=:id';
		$stmt = $this->db->prepare($sql);
		try {
			$stmt->execute(
				array(
					':nome' => $equipe->nome,
					':sigla' => $equipe->sigla,
					':id_lider' => $lider->id_novo,
					':id_tipo' => $equipe->tipo->id,
					':ativa' => ($equipe->ativa ? 1 : 0),
					':id' => $equipe->id
				)
			);
		} catch (Exception $e) {
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao salvar dados da equipe: '.$e->getMessage());
		}

		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json');
		
	});

	$app->post($api_root.'/equipes',function(Request $req, Response $res, $args=[]){
		
		// Lendo corpo da requisição
		$equipe = json_decode($req->getBody()->getContents());

		// Verificando integridade do body
		if(json_last_error() != JSON_ERROR_NONE){
			
			// Retornando erro para usuário
			return $res
			->withStatus(400)
			->write();

		}
		
		// Inserindo dados da equipe
		$sql = 'INSERT INTO maxse_equipes
				(
					nome,
					sigla,
					id_lider,
					id_tipo,
					ativa
				) VALUES (
					:nome,
					:sigla,
					:id_lider,
					:id_tipo,
					:ativa
				)';
		$stmt = $this->db->prepare($sql);
		try {
			
			$stmt->execute(
				array(
					':nome'=>$equipe->nome,
					':sigla'=>$equipe->sigla,
					':id_lider'=>($equipe->lider ? $equipe->lider->id : NULL),
					':id_tipo'=>$equipe->tipo->id,
					':ativa'=> ($equipe->ativa ? 1 : 0)
				)
			);
			
		} catch (Exception $e) {
			
			// Retornando erro para usuário
			return $res
			->withStatus(500)
			->write('Falha ao tentar inserir nova equipe no banco de dados: '.$e->getMessage());

		}

		// Levantando o id da equipe inserida
		$equipe->id = $this->db->lastInsertId();

		// Inserindo membros da equipe
		$sql = 'INSERT INTO
					maxse_equipes_x_usuarios
					(id_equipe,id_usuario)
					VALUES
					(:id_equipe,:id_usuario);
				';
		$stmt = $this->db->prepare($sql);
		for ($i=0; $i < sizeof($equipe->membros); $i++) { 
			$stmt->execute(
				array(
					':id_equipe' => $equipe->id,
					':id_usuario' => $equipe->membros[$i]->id
				)
			);
		}
		
		// Retornando resposta para usuário
		return $res
		->withStatus(200)
		->withHeader('Content-Type','application/json')
		->write('{"novoId":'.$equipe->id.'}');
	});