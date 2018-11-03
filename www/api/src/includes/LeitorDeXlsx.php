<?php

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class LeitorDeXls {

	private $linha_inicial = 7;
	private $col_numero = 'D';
	private $col_data_receb = 'E';
	private $col_domasa = 'F';
	private $col_endereco = 'G';
	private $col_id_bairro = 'H';
	private $col_obs = 'J';
	private $col_medidas = 'K';
	private $col_tds = 'L';
	private $col_prioridade = 'N';
	private $hora_recebimento = 10;
	private $sheet;
	private $tdss = array('37','4B','52','54','56','58','88','FR','NV');

	public function __construct($arquivo){

		// Load $inputFileName to a Spreadsheet object
		$spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($arquivo);
		
		// Carregando planilha do workbook
		$this->sheet = $spreadsheet->getActiveSheet();

	}

	private function cell(string $cellAddress){
		return $this->sheet->getCell($cellAddress);
	}

	private function lerNumero(int $linha){

		// Lendo o conteúdo do campo número
		$numero = $this->cell($this->col_numero.$linha)->getValue();

		// verificando se a célula está preenchida
		if($numero == '' || is_null($numero)){
			return false;
		} elseif(!preg_match('/^\d{7}$/',$numero)){
			throw new Exception("Número de SSE inválido na linha $linha", 1);
		} else {
			return 1*$numero;
		}
	}

	private function lerDataRecebida(int $linha){

		// Lendo data da celula
		$xlsDate = $this->cell($this->col_data_receb.$linha)->getValue();

		// Verificando se o valor da celula é um inteiro positivo
		if(!is_numeric($xlsDate)) {
			throw new Exception("Falha ao ler campo data de recebimento na linha $linha", 1);
		}

		// Transformando data da célula em objeto DateTime
		$datetime = \PhpOffice\PhpSpreadsheet\Shared\Date::excelToDateTimeObject($xlsDate);

		// Retornando string de data
		return $datetime->format('Y-m-d\T'.$this->hora_recebimento.':i:s');

	}

	private function lerEndereco(int $linha) {

		// Levantando conteúdo da célula
		$endereco = $this->cell($this->col_endereco.$linha)->getValue();

		// Validando conteúdo da célula
		if($endereco == '' || is_null($endereco)) {
			throw new Exception("Falha ao ler campo 'Endereço' na linha $linha", 1);
		}

		// Retornando endereço
		return $endereco;

	}

	private function lerIdBairro(int $linha){
		
		// Levantando conteúdo da célula
		$id_bairro = $this->cell($this->col_id_bairro.$linha)->getValue();

		// Validando conteúdo da célula
		if(!is_numeric($id_bairro)) {
			throw new Exception("Falha ao ler campo ID Bairro na linha $linha", 1);
		}

		// Retornando o id do bairro
		return 1*$id_bairro;
	}

	private function lerObs(int $linha){
		
		// Levantando conteúdo da célula
		$obs = $this->cell($this->col_obs.$linha)->getValue();

		// Retornando o obs
		return $obs;

	}

	private function lerTDS(int $linha){

		// Levantando conteúdo da célula
		$tds = $this->cell($this->col_tds.$linha)->getValue();

		// Validando o tds lifo da planilha
		if($tds == '' || is_null($tds)) {
			throw new Exception("Falha ao tratar campo de Tipo de Serviço da linha $linha", 1);
		}

		if (!in_array($tds, $this->tdss)) {
			throw new Exception("Tipo de Serviço inválido da linha $linha", 1);
		}

		// Retornando o tds
		return $tds;

	}

	private function lerMedidas(int $linha){

		// Levantando conteúdo da célula
		$str_medidas = $this->cell($this->col_medidas.$linha)->getValue();

		// Validando o tds lifo da planilha
		if($str_medidas == '' || is_null($str_medidas)) {
			throw new Exception("Falha ao tratar campo de Medidas da linha $linha", 1);
		}
		
		// Removendo o =, ROUND, PARENTESIS E ESPAÇOS
		$str_medidas = str_replace('=','',$str_medidas);
		$str_medidas = str_replace(' ','',$str_medidas);
		$str_medidas = str_replace('ROUND','',$str_medidas);
		$str_medidas = str_replace('(','',$str_medidas);
		$str_medidas = str_replace(',2)','',$str_medidas);

		// Qubrando a string em somas
		$medidas = explode('+',$str_medidas);
		
		// Tratando cada medida como possível produto de dimensões
		$n = sizeof($medidas);
		for ($i=0; $i < $n; $i++) { 
			$medidas[$i] = explode('*',$medidas[$i]);
			$medidas[$i] = array_map(function($a){return 1*$a;},$medidas[$i]);
			if(sizeof($medidas[$i]) == 1){
				$medidas[$i] = $medidas[$i][0];
			}
		}

		// Retornando o medidas
		return $medidas;

	}

	private function lerPrioridade(int $linha){
		// Levantando conteúdo da célula
		$str_prioridade = $this->cell($this->col_prioridade.$linha)->getValue();

		// Validando o prioridade lifo da planilha
		if(strtoupper($str_prioridade) == 'NÃO' || strtoupper($str_prioridade) == 'NãO') {
			$prioridade = 0;
		} elseif(strtoupper($str_prioridade) == 'SIM') {
			$prioridade = 1;
		} elseif(strtoupper($str_prioridade) == 'URGÊNCIA' || strtoupper($str_prioridade) == 'URGêNCIA') {
			$prioridade = 2;
		} else {
			$msg  = "Falha ao tratar campo de Prioridade da linha $linha.\n";
			$msg .= "Valores permitidos são 'Sim', 'Não' ou 'Urgência'.\n";
			throw new Exception($msg ,1);
		}

		// Retornando o prioridade
		return $prioridade;
	}
	
	private function lerLinha(int $linha){

		// Criando o bjeto resultado do tratamento de linha
		$resultado = new stdClass();
		$resultado->msgs = array();
		$resultado->sse = null;
		$resultado->linha = $linha;

		// Lendo o campo número da linha
		$numero = 0;
		try {
			$numero = $this->lerNumero($linha);
		} catch(Exception $e) {
			array_push($resultado->msgs,$e->getMessage());
		}
		
		
		// Verificando se o número está definido
		if($numero === false){
			return false;
		} else {

			// Criando classe genérica sse
			$sse = new stdClass();
			
			// Gravando o número - - - - - - - - - - - - -
			$sse->numero = $numero;

			// Gravando o parâmetors na sse - - - - - - -
			try {
				$sse->dh_recebido = $this->lerDataRecebida($linha);
			} catch(Exception $e) {
				array_push($resultado->msgs,$e->getMessage());
			}

			// Gravando id do Bairro  - - - - - - - - - - 
			try {
				$sse->id_bairro = $this->lerIdBairro($linha);
			} catch(Exception $e) {
				array_push($resultado->msgs,$e->getMessage());
			}

			// Gravando endereço - - - - - - - - - - - - -
			try {
				$sse->endereco = $this->lerEndereco($linha);
			} catch(Exception $e) {
				array_push($resultado->msgs,$e->getMessage());
			}

			// Gravando observação - - - - - - - - - - - - -
			$sse->obs = $this->lerObs($linha);

			// Gravando tipo de serviço  - - - - - - - - - -
			try {
				$sse->tds = $this->lerTDS($linha);
			} catch(Exception $e) {
				array_push($resultado->msgs,$e->getMessage());
			}

			// Gravando medidas
			try {
				$sse->medidas = $this->lerMedidas($linha);
			} catch(Exception $e) {
				array_push($resultado->msgs,$e->getMessage());
			}
			
			// Gravando prioridade
			try {
				$sse->prioridade = $this->lerPrioridade($linha);	
			} catch(Exception $e) {
				array_push($resultado->msgs,$e->getMessage());
			}
			
			// Se não teve algum erro acima, definir sse
			if(sizeof($resultado->msgs) == 0){
				$resultado->sse = $sse;
			}

			// Retornando o objeto resultado
			return $resultado;

		}

	}

	public function lerArquivoDeSses(string $arquivo){

		// Load $inputFileName to a Spreadsheet object
		$spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($arquivo);
		
		// Definindo linha a ser lida
		$linha = $this->linha_inicial;

		// Criando vetor de SSEs
		$sses = array();

		// Iniciando leitura do arquivo
		while($sse = $this->lerLinha($linha,$spreadsheet)){
			
			// Guardando sse lida no vetor
			$sses[] = $sse;

			// Indo para a próxima linha
			$linha++;

		}

		// Retornando o vetor de sses
		return $sses;

	}

}