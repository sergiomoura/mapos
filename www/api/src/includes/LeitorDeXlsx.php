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

	public function __construct($arquivo){

		// Load $inputFileName to a Spreadsheet object
		$spreadsheet = \PhpOffice\PhpSpreadsheet\IOFactory::load($arquivo);
		
		// Carregando planilha do workbook
		$this->sheet = $spreadsheet->getActiveSheet();

	}

	private function cell(string $cellAddress){
		return $this->sheet->getCell($cellAddress);
	}

	private function lerNumero(int $linha,$spreadsheet){
		return $this->cell($this->col_numero.$linha)->getValue();
	}

	private function lerDataRecebida(int $linha,$spreadsheet){

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

	private function lerIdBairro(int $linha, $spreadsheet){
		
		// Levantando conteúdo da célula
		$id_bairro = $this->cell($this->col_id_bairro.$linha)->getValue();

		// Validando conteúdo da célula
		if(!is_numeric($id_bairro)) {
			throw new Exception("Falha ao ler campo ID Bairro na linha $linha", 1);
		}

		// Retornando o id do bairro
		return $id_bairro;
	}
	
	private function lerLinha(int $linha,$spreadsheet){

		// Lendo o campo número da linha
		$numero = $this->lerNumero($linha,$spreadsheet);
		
		// Verificando se o número está definido
		if($numero == '' || is_null($numero)){
			return false;
		} else {

			// Criando classe genérica sse
			$sse = new stdClass();
			
			// Gravando o parâmetors na sse
			$sse->numero = $numero;
			$sse->dh_recebido = $this->lerDataRecebida($linha,$spreadsheet);
			$sse->id_bairro = $this->lerIdBairro($linha,$spreadsheet);
		
			// Retornando o objeto sse
			return $sse;

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