<?php


	use PhpOffice\PhpSpreadsheet\Spreadsheet;
	use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

	function gerarXls($sses){

		// Dicionário de pioridades
		$prioridades = array('Normal', 'Prioridade', 'Urgente');
		
		// Criando spread
		$spreadsheet = new Spreadsheet();

		// Criando planilha de disciplinas
		$sheet_dados = new \PhpOffice\PhpSpreadsheet\Worksheet\Worksheet($spreadsheet, 'Dados');

		// Anexando planilha de disciplinas a spread
		$spreadsheet->addSheet($sheet_dados);

		// Fazendo cabeçalho
		$sheet_dados->setCellValue('A1','ID');
		$sheet_dados->setCellValue('B1','Status');
		$sheet_dados->setCellValue('C1','Nº SSE');
		$sheet_dados->setCellValue('D1','Data Recebimento SSE');
		$sheet_dados->setCellValue('E1','Nº Domasa');
		$sheet_dados->setCellValue('F1','Endereço');
		$sheet_dados->setCellValue('G1','ID Bairro');
		$sheet_dados->setCellValue('H1','Nome Bairro');
		$sheet_dados->setCellValue('I1','Obs');
		$sheet_dados->setCellValue('J1','Tot Medidas Prev');
		$sheet_dados->setCellValue('K1','Tot Medidas Real');
		$sheet_dados->setCellValue('L1','Dif. Medidas');
		$sheet_dados->setCellValue('M1','Divergência?');
		$sheet_dados->setCellValue('N1','TDS Prev');
		$sheet_dados->setCellValue('O1','TDS Real');
		$sheet_dados->setCellValue('P1','Dif. TDS');
		$sheet_dados->setCellValue('Q1','Classificação');
		$sheet_dados->setCellValue('R1','Classificação (Alteração)');
		$sheet_dados->setCellValue('S1','Prioridade');
		$sheet_dados->setCellValue('T1','DL Execução');
		$sheet_dados->setCellValue('U1','Data Devolução');
		$sheet_dados->setCellValue('V1','DL Garantia');
		$sheet_dados->setCellValue('W1','Em Garantia?');
		$sheet_dados->setCellValue('X1','Cálculo Execução');
		$sheet_dados->setCellValue('Y1','Valor da SSE');
		$sheet_dados->setCellValue('Z1','Custo MO');
		$sheet_dados->setCellValue('AA1','Custo MP');
		$sheet_dados->setCellValue('AB1','Lucro');
		$sheet_dados->setCellValue('AC1','Equipe');
		$sheet_dados->setCellValue('AD1','Apoio');
		$sheet_dados->setCellValue('AE1','Data Agendamento');
		$sheet_dados->setCellValue('AF1','Hora Agendamento');
		$sheet_dados->setCellValue('AG1','Data Início da Execução');
		$sheet_dados->setCellValue('AH1','Hora Início da Execução');
		$sheet_dados->setCellValue('AI1','Data Final da Execução');
		$sheet_dados->setCellValue('AJ1','Hora Final da Execução');
		$sheet_dados->setCellValue('AK1','Material'); // <-- Consumo
		$sheet_dados->setCellValue('AL1','Qtde '); // <-- Consumo
		$sheet_dados->setCellValue('AM1','Unid'); // <-- Consumo
		$sheet_dados->setCellValue('AN1','Equipe');
		$sheet_dados->setCellValue('AO1','Apoio');
		$sheet_dados->setCellValue('AP1','Data Agendamento');
		$sheet_dados->setCellValue('AQ1','Hora Agendamento');
		$sheet_dados->setCellValue('AR1','Data Início da Execução');
		$sheet_dados->setCellValue('AS1','Hora Início da Execução');
		$sheet_dados->setCellValue('AT1','Data Final da Execução');
		$sheet_dados->setCellValue('AU1','Hora Final da Execução');
		$sheet_dados->setCellValue('AV1','Material'); // <-- Consumo
		$sheet_dados->setCellValue('AW1','Qtde '); // <-- Consumo
		$sheet_dados->setCellValue('AX1','Unid'); // <-- Consumo
		
		// Inserindo dados
		foreach ($sses as $i => $sse) {
			$sheet_dados->setCellValue('A'.($i + 2),$sse->id);
			$sheet_dados->setCellValue('B'.($i + 2),$sse->nome_status);
			$sheet_dados->setCellValue('C'.($i + 2),$sse->numero);
			$sheet_dados->setCellValue('D'.($i + 2),(new DateTime($sse->dh_recebido))->format('d/m/Y'));
			$sheet_dados->setCellValue('E'.($i + 2),$sse->domasa);
			$sheet_dados->setCellValue('F'.($i + 2),$sse->endereco);
			$sheet_dados->setCellValue('G'.($i + 2),$sse->id_bairro);
			$sheet_dados->setCellValue('H'.($i + 2),$sse->nome_bairro);
			$sheet_dados->setCellValue('I'.($i + 2),$sse->obs);

			$str_dif_medidas = is_null($sse->medida_r) ? '' : ($sse->medida_r - $sse->medida_p);
			
			if(is_null($sse->medida_r)) {
				$str_divergencia = '';
			} else {
				if($sse->medida_r != $sse->medida_p) {
					$str_divergencia = 'Sim';
				} else {
					$str_divergencia = 'Não';
				}
			}

			$sheet_dados->setCellValue('J'.($i + 2),$sse->medida_p);
			$sheet_dados->setCellValue('K'.($i + 2),$sse->medida_r);
			$sheet_dados->setCellValue('L'.($i + 2),$str_dif_medidas);
			$sheet_dados->setCellValue('M'.($i + 2),$str_divergencia);
			$sheet_dados->setCellValue('N'.($i + 2),$sse->codigo_tds_p);
			$sheet_dados->setCellValue('O'.($i + 2),$sse->codigo_tds_r);

			// Definindo se possui divergência no tipo de serviço
			if(is_null($sse->codigo_tds_r)){
				$str_dif_tds = '';
			} else {
				if($sse->codigo_tds_r == $sse->codigo_tds_p){
					$str_dif_tds = 'Não';
				} else {
					$str_dif_tds = 'Sim';
				}
			}

			// determinando str_dif_faixa
			if($sse->faixa_r){
				if($sse->faixa_r->label == $sse->faixa_p->label){
					$str_dif_faixa = 'Não';
				} else {
					$str_dif_faixa = 'Sim';
				}
			} else {
				$str_dif_faixa = '';
			}

			$sheet_dados->setCellValue('P'.($i + 2), $str_dif_tds);
			$sheet_dados->setCellValue('Q'.($i + 2), $sse->faixa_p->label. ' (' . $sse->faixa_p->li . ' < x ≤ ' . $sse->faixa_p->ls .')' );
			$sheet_dados->setCellValue('R'.($i + 2), $str_dif_faixa);
			$sheet_dados->setCellValue('S'.($i + 2), $prioridades[$sse->urgencia]);
			$sheet_dados->setCellValue('T'.($i + 2), (new DateTime($sse->prazo_final))->format('d/m/Y'));
			$sheet_dados->setCellValue('U'.($i + 2), (new DateTime($sse->data_devolucao))->format('d/m/Y'));

			// Calculando garantia e tempo de execução = = = =
			// determinando o objeto data de devolução
			if(!is_null($sse->data_devolucao)){
				$hoje = new Datetime();
				$data_devolucao = new DateTime($sse->data_devolucao);
				$vencimento_garantia = $data_devolucao->add(new DateInterval('P1Y'));
				$prazo_final = new DateTime($sse->prazo_final);
				$di_calculo_execucao = $data_devolucao->diff($prazo_final);
				$em_garantia = ($hoje->format('U') < $vencimento_garantia->format('U') ? 'Sim' : 'Não');
				$str_vencimento_garantia = $vencimento_garantia->format('d/m/Y');
				$str_calculo_execucao = $di_calculo_execucao->d;
				
			} else {
				$str_vencimento_garantia = '';
				$em_garantia = '';
				$str_calculo_execucao = '';
			}
			
			$sheet_dados->setCellValue('V'.($i + 2),$str_vencimento_garantia);
			$sheet_dados->setCellValue('W'.($i + 2),$em_garantia);
			$sheet_dados->setCellValue('X'.($i + 2),$str_calculo_execucao);
			$sheet_dados->setCellValue('Y'.($i + 2),$sse->valor_real);
			$sheet_dados->setCellValue('Z'.($i + 2),$sse->cmo);
			$sheet_dados->setCellValue('AA'.($i + 2),$sse->cmp);
			$sheet_dados->setCellValue('AB'.($i + 2),$sse->valor_real - $sse->cmo - $sse->cmp);

			// Dados da tarefa 1 = = =
			if(sizeof($sse->tarefas)>0){

				// Determinando o dia do agendamento e o dia da execução no formato de data pt/Br
				$inicio_p	= new DateTime($sse->tarefas[0]->inicio_p);
				$final_p	= new DateTime($sse->tarefas[0]->final_p);

				if($sse->tarefas[0]->inicio_r){
					$inicio_r = new DateTime($sse->tarefas[0]->inicio_r);
					$str_inicio_r_data = $inicio_r->format('d/m/Y');
					$str_inicio_r_hora = $inicio_r->format('G:i');
				}

				if($sse->tarefas[0]->final_r){
					$final_r = new DateTime($sse->tarefas[0]->final_r);
					$str_final_r_data = $final_r->format('d/m/Y');
					$str_final_r_hora = $final_r->format('G:i');
				}

				$sheet_dados->setCellValue('AC'.($i + 2),$sse->tarefas[0]->nome_equipe);
				$sheet_dados->setCellValue('AD'.($i + 2),$sse->tarefas[0]->nome_apoio);
				$sheet_dados->setCellValue('AE'.($i + 2),$inicio_p->format('d/m/Y'));
				$sheet_dados->setCellValue('AF'.($i + 2),$inicio_p->format('G:i'));
				$sheet_dados->setCellValue('AG'.($i + 2),isset($str_inicio_r_data) ? $str_inicio_r_data : '');
				$sheet_dados->setCellValue('AH'.($i + 2),isset($str_inicio_r_hora) ? $str_inicio_r_hora : '');
				$sheet_dados->setCellValue('AI'.($i + 2),isset($str_final_r_data) ? $str_inicio_r_data : '');
				$sheet_dados->setCellValue('AJ'.($i + 2),isset($str_final_r_hora) ? $str_inicio_r_hora : '');
				if(sizeof($sse->tarefas[0]->consumos) > 0){
					$sheet_dados->setCellValue('AK'.($i + 2),$sse->tarefas[0]->consumos[0]->nome);
					$sheet_dados->setCellValue('AL'.($i + 2),$sse->tarefas[0]->consumos[0]->qtde);
					$sheet_dados->setCellValue('AM'.($i + 2),$sse->tarefas[0]->consumos[0]->unidade);
				}
			}			
			
			// Dados da tarefa 2 = = =
			if(sizeof($sse->tarefas)>1){

				// Determinando o dia do agendamento e o dia da execução no formato de data pt/Br
				$inicio_p	= new DateTime($sse->tarefas[1]->inicio_p);
				$final_p	= new DateTime($sse->tarefas[1]->final_p);

				if($sse->tarefas[1]->inicio_r){
					$inicio_r = new DateTime($sse->tarefas[1]->inicio_r);
					$str_inicio_r_data = $inicio_r->format('d/m/Y');
					$str_inicio_r_hora = $inicio_r->format('G:i');
				}

				if($sse->tarefas[1]->final_r){
					$final_r = new DateTime($sse->tarefas[1]->final_r);
					$str_final_r_data = $final_r->format('d/m/Y');
					$str_final_r_hora = $final_r->format('G:i');
				}

				$sheet_dados->setCellValue('AC'.($i + 2),$sse->tarefas[1]->nome_equipe);
				$sheet_dados->setCellValue('AD'.($i + 2),$sse->tarefas[1]->nome_apoio);
				$sheet_dados->setCellValue('AE'.($i + 2),$inicio_p->format('d/m/Y'));
				$sheet_dados->setCellValue('AF'.($i + 2),$inicio_p->format('G:i'));
				$sheet_dados->setCellValue('AG'.($i + 2),$str_inicio_r_data);
				$sheet_dados->setCellValue('AH'.($i + 2),$str_inicio_r_hora);
				$sheet_dados->setCellValue('AI'.($i + 2),$str_final_r_data);
				$sheet_dados->setCellValue('AJ'.($i + 2),$str_final_r_hora);
				if(sizeof($sse->tarefas[1]->consumos) > 0){
					$sheet_dados->setCellValue('AK'.($i + 2),$sse->tarefas[1]->consumos[1]->nome);
					$sheet_dados->setCellValue('AL'.($i + 2),$sse->tarefas[1]->consumos[1]->qtde);
					$sheet_dados->setCellValue('AM'.($i + 2),$sse->tarefas[1]->consumos[1]->unidade);
				}
			}
		}

		// Removendo a planilha inicialmente existente
		$spreadsheet->removeSheetByIndex(0);
			
		// Tornando a planilha de documentos ativa
		$spreadsheet->setActiveSheetIndexByName('Dados');

		// Salvando spreadsheet como propriedade do objeto
		return $spreadsheet;
	}

	function enviarXls($xls){

		// Mandando os headers
		header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
		header('Content-Disposition: attachment;filename="planilha_'.date('Y-m-dTH:i:s').'.xlsx"');
		header('Cache-Control: max-age=0');
		
		// Criando o Writer
		$writer = new Xlsx($xls);

		// Escrevendo o arquivo na saída php
		$writer->save('php://output');
	}