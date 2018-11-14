<?php

class SSE {
	
	private $numero;
	private $dh_recebido;
	private $id_bairro;
	private $endereco;
	private $obs;
	private $tds;
	private $medidas;
	private $prioridade;

	function __construct($data) {
		$this->numero		= $data->numero;
		$this->dh_recebido	= $data->dh_recebido;
		$this->bairro		= $data->bairro;
		$this->endereco		= $data->endereco;
		$this->obs			= $data->obs;
		$this->tds			= $data->tds;
		$this->medidas		= $data->medidas;
		$this->prioridade	= $data->prioridade;
	}
	
	function salvar($db){

		// Verificando se existe uma sse com esse número
		$sql = 'SELECT COUNT(*) AS n FROM maxse_sses WHERE numero=:numero';
		$stmt = $db->prepare($sql);
		$stmt->execute(array(':numero' => $this->numero));
		$n = $stmt->fetch()->n;

		if($n == 0) {
			
			// SSE inédita. Inserindo
			$this->inserir($db);

		} else {

			// SSE já existe. Atualizando
			$this->atualizar($db);

		}

	}

	function inserir($db){

		// Começando transação
		$db->beginTransaction();

		// Escrevendo consulta de inserção
		$sql = 'INSERT INTO maxse_sses
				(
					endereco,
					id_bairro,
					numero,
					id_tipo_de_servico,
					dh_registrado,
					dh_recebido,
					urgente,
					obs,
					status,
					lat,
					lng,
					prazo_final
				) VALUES (
					:endereco,
					:id_bairro,
					:numero,
					:id_tipo_de_servico,
					NOW(),
					:dh_recebido,
					:urgente,
					:obs,
					sseStatus("CADASTRADA"),
					NULL,
					NULL,
					:prazo_final
				)';
		
		$stmt = $db->prepare($sql);

		// Tentando executar o sql
		try {
			$stmt->execute(
				array(
					':endereco'				=> $this->endereco,
					':id_bairro'			=> $this->bairro->id,
					':numero'				=> $this->numero,
					':id_tipo_de_servico'	=> $this->tds->id,
					':dh_recebido'			=> $this->dh_recebido,
					':urgente'				=> $this->prioridade,
					':obs'					=> $this->obs,
					':prazo_final'			=> '2000-01-01 00:00:00'
				)
			);
		} catch (Exception $e) {

			// Falha ao inserir. Voltando tudo..
			$db->rollback();

			// Emitindo erro para ser capturado adiante.
			throw $e;

		}

		// Se chegou aqui, tá tudo certo! Commit!
		$db->commit();

	}

	function atualizar($db){
		echo("WHO WANTS TO LIVE FOREVER!");
	}
}
