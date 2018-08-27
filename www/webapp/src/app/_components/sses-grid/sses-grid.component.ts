import { Component, OnInit, ViewChild } from '@angular/core';
import { SsesService } from '../../_services/sses.service';
import { SSE } from '../../_models/sse';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Busca } from "../../_models/busca";
import { Bairro } from "../../_models/bairro";
import { TipoDeServico } from "../../_models/tipoDeServico";
import { Equipe } from "../../_models/equipe";
import { TiposDeServicoService } from "../../_services/tipos-de-servico.service";
import { EquipesService } from "../../_services/equipes.service";
import { DomasasService } from '../../_services/domasas.service';
import { format, addYears, isBefore, differenceInDays} from 'date-fns';
import { Subscription } from 'rxjs';
import { EventsService } from '../../_services/events.service';
import { BuscadorComponent } from '../buscador/buscador.component';
import { Medida } from '../../_models/medida';

@Component({
	selector: 'app-sses',
	templateUrl: './sses-grid.component.html',
	styleUrls: ['./sses-grid.component.scss']
})
export class SsesGridComponent implements OnInit {
	sses:SSE[];
	tmpSses:any[];
	tdss:TipoDeServico[];
	equipes:Equipe[];
	bairros:Bairro[];
	infinito:number = 2000000000;
	subscriptions:Subscription[] = [];
	@ViewChild('buscador') buscador:BuscadorComponent;

	constructor(
		private ssesService:SsesService,
		private snackBar:MatSnackBar,
		private router:Router,
		private tdsService:TiposDeServicoService,
		private equipesService:EquipesService,
		private domasaSerive:DomasasService,
		private evtService:EventsService
	){}

	ngOnInit() {
		// this.getSses();
		// this.getTiposDeServico();
		this.getEquipes();
		this.getBairros();

		// Subscrevendo ao observavel de evento reload clicked
		this.subscriptions.push(
			this.evtService.reloadClicked$.subscribe(
				() => {
					this.getSses();
				}
			)
		)
	}

	onBuscarClick(){
		this.getSses();
	}

	onResetCamposClick(){
		this.busca = this.buscaPadrao;
	}

	getSses(){
		this.buscador.onBuscarClick();
	}

	getTiposDeServico(){
		this.tdsService.get().subscribe(
			res => {
				this.tdss = <TipoDeServico[]>res;
				this.parseSses();
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao carregar tipos de serviço',
					'Fechar',
					{
						duration:0,
						horizontalPosition:'left',
						verticalPosition:'bottom',
						panelClass: ['snackbar-error'],
					}
				);

				// Imprimindo erro no console
				console.warn(err);
			}
		)
	}

	getEquipes(){
		this.equipesService.getEquipes().subscribe(
			res => {
				this.equipes = <Equipe[]>res;
				this.parseSses();
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao carregar Equipes',
					'Fechar',
					{
						duration:0,
						horizontalPosition:'left',
						verticalPosition:'bottom',
						panelClass: ['snackbar-error'],
					}
				);

				// Imprimindo erro no console
				console.warn(err);
			}
		)
	}

	getBairros(){
		this.domasaSerive.getFlat().subscribe(
			res => {
				this.bairros = <Bairro[]>res;
				this.parseSses();
			}
		)
	}

	onSsesCarregadas(evt){
		console.log(evt);
		this.tmpSses = evt;
		this.parseSses();
	}

	private parseSses(){
		
		/*
		if(this.tmpSses && this.tdss && this.equipes && this.bairros){
			
			for (let i = 0; i < this.tmpSses.length; i++) {

				// Lendo sse da vez
				const sse = this.tmpSses[i];

				// Parsing escalares
				sse.dh_registrado = new Date(sse.dh_registrado);
				sse.dh_recebido = new Date(sse.dh_recebido);
				sse.inicio_p = sse.inicio_p ? new Date(sse.inicio_p) : null;
				sse.final_p = sse.final_p ? new Date(sse.final_p) : null;
				sse.inicio_r = sse.inicio_r ? new Date(sse.inicio_r) : null;
				sse.final_r = sse.final_r ? new Date(sse.final_r) : null;
				
				// Parsing tipo de serviço previsto
				sse.tipoDeServicoPrev = this.tdss.find(
					(tds) => {
						return +tds.id == +sse.id_tds_p;
					}
				)
				delete sse.id_tds_p;

				// Parsing tipo de serviço real
				sse.tipoDeServicoReal = this.tdss.find(
					(tds) => {
						return +tds.id == +sse.id_tds_r;
					}
				)
				delete sse.id_tds_r;
				// Pargsing bairro
				sse.bairro = this.bairros.find(
					(bairro) => {
						return +bairro.id == +sse.id_bairro;
					}
				)
				delete sse.id_bairro;

				// Determinando o prazo final
				sse.prazoFinal = new Date(sse.prazo_final+'T00:00:00');
				
				// Calculando o total das medidas previstas
				sse.total_prev = 0;
				sse.unid_prev = '';
				switch (sse.tipoDeServicoPrev.medida) {
					case 'a':
						for (let i = 0; i < sse.medidas_area.prev.length; i++) {
							const m = sse.medidas_area.prev[i];
							sse.total_prev += m.l * m.c;
						}
						sse.unid_prev = 'm²';
						break;
					
					case 'l':
						for (let i = 0; i < sse.medidas_linear.prev.length; i++) {
							const m = sse.medidas_linear.prev[i];
							sse.total_prev += (1*m.v);
						}
						sse.unid_prev = 'm';
						break;
					
					case 'u':
						for (let i = 0; i < sse.medidas_unidades.prev.length; i++) {
							const m = sse.medidas_unidades.prev[i];
							sse.total_prev += (1*m.n);
						}
						sse.unid_prev = 'unid';
						break;

					default:
						break;
				}

				// Calculando o total das medidas reais
				if(sse.tipoDeServicoReal) {
					sse.total_real = 0;
					sse.unid_real = '';
					switch (sse.tipoDeServicoReal.medida) {
						case 'a':
							for (let i = 0; i < sse.medidas_area.real.length; i++) {
								const m = sse.medidas_area.real[i];
								sse.total_real += m.l * m.c;
							}
							sse.unid_real = 'm²';
							break;
						
						case 'l':
							for (let i = 0; i < sse.medidas_linear.real.length; i++) {
								const m = sse.medidas_linear.real[i];
								sse.total_real += (1*m.v);
							}
							sse.unid_real = 'm';
							break;
						
						case 'u':
							for (let i = 0; i < sse.medidas_unidades.real.length; i++) {
								const m = sse.medidas_unidades.real[i];
								sse.total_real += (1*m.n);
							}
							sse.unid_real = 'unid';
							break;
	
						default:
							break;
					}
				} else {
					sse.total_real = '';
					sse.unid_real = '';
				}

				// Calculando dif_medidas
				sse.dif_medidas = sse.total_real == '' ? '' : (Math.round( (sse.total_prev - sse.total_real) *10000)/10000);

				// Calculando se label divergencia
				if(sse.dif_medidas === ''){
					sse.label_divergencia = '';
				} else if (+sse.dif_medidas === 0){
					sse.label_divergencia = 'Não';
				} else {
					sse.label_divergencia = 'Sim';
				}

				// Calculando label dif tipo de servico
				if (!sse.tipoDeServicoReal) {
					sse.label_dif_tds = ''
				} else if(sse.tipoDeServicoReal.id != sse.tipoDeServicoPrev.id) {
					sse.label_dif_tds = 'Sim'
				} else {
					sse.label_dif_tds = 'Não'
				}

				// Calculando label urgencia
				sse.label_urgencia = (sse.urgencia == 0 ? 'Normal' : (sse.urgencia == 1 ? 'Prioridade' : 'Urgência'));

				// Calculando a data da devolução e label_data_devolução				
				if(sse.data_devolucao){
					sse.dataDevolucao = new Date(sse.data_devolucao+'T00:00:00');
					sse.label_data_devolucao = format(sse.dataDevolucao,'DD/MM/YYYY');
				} else {
					sse.dataDevolucao = null;
					sse.label_data_devolucao = '' 
				}

				// Calculando data limite de garantia
				if(sse.dataDevolucao){
					sse.dlGarantia = addYears(sse.dataDevolucao,1);
					sse.label_dl_garantia = format(sse.dlGarantia,'DD/MM/YYYY');
					sse.label_em_garantia = isBefore(new Date(),sse.dlGarantia) ? 'Sim' : 'Não';
				} else {
					sse.dlGarantia = null;
					sse.label_dl_garantia = '';
					sse.label_em_garantia = '';
				}

				// Calculando cálculo de execução dataDevolucao - prazoFinal
				if(sse.dataDevolucao){
					sse.calc_exec = differenceInDays(sse.dataDevolucao,sse.prazoFinal);
				} else {
					sse.calc_exec = '';
				}

				// Calculando faixa de tipo de trabalho que esta sse se encontra (prev)
				sse.faixaPrev = sse.tipoDeServicoPrev.faixas.find(
					(f) => {
						return sse.total_prev <= f.ls && sse.total_prev > f.li;
					}
				)

				// Calculando faixa de tipo de trabalho que esta sse se encontra (real)
				if(sse.tipoDeServicoReal) {
					sse.faixaReal = sse.tipoDeServicoReal.faixas.find(
						(f) => {
							return sse.total_real <= f.ls && sse.total_real > f.li;
						}
					)
					sse.faixa_real_label =
						sse.faixaReal.label + ' (' +
						(sse.faixaReal.ls == this.infinito ? sse.faixaReal.li + ' < X' : sse.faixaReal.li + ' < X ≤ ' + sse.faixaReal.ls) +
						')'
				} else {
					sse.faixaReal = null;
					sse.faixa_real_label = '';
				}
				
					
				// parsing equipes e apoios das tarefas 
				for (let i = 0; i < sse.tarefas.length; i++) {
					
					// Separando tarefa a tratar
					const tarefa = sse.tarefas[i];
					
					// Parsing equipe encarregada pela tarefa
					tarefa.equipe = this.equipes.find(
						(e) => {
							return e.id == tarefa.id_equipe;
						}
					)
					delete tarefa.id_equipe;

					// Parsing apoio encarregado pela tarefa
					tarefa.apoio = this.equipes.find(
						(e) => {
							return e.id == tarefa.id_apoio;
						}
					)
					delete tarefa.id_apoio;

					// Parsing dates
					tarefa.inicio_p = new Date(tarefa.inicio_p);
					tarefa.final_p = new Date(tarefa.final_p);
					tarefa.inicio_r = (tarefa.inicio_r == null ? null : new Date(tarefa.inicio_r));
					tarefa.final_r = (tarefa.final_r == null ? null : new Date(tarefa.final_r));
				}
			}
		}
		*/
		this.sses = <SSE[]>this.tmpSses;
	}
	
	onSseButtonClick(id){
		this.router.navigateByUrl('/home/sse/' + id);
	}

	getTotalPrev(sse:SSE):Medida{
		
		let medida:Medida = new Medida(0,'');
		
		switch (sse.tipoDeServicoPrev.medida) {
			case 'a':
				for (let i = 0; i < sse.medidas_area.prev.length; i++) {
					const m = sse.medidas_area.prev[i];
					medida.valor += m.l * m.c;
				}
				medida.unidade = 'm²';
				break;
			
			case 'l':
				for (let i = 0; i < sse.medidas_linear.prev.length; i++) {
					const m = sse.medidas_linear.prev[i];
					medida.valor += (1*m.v);
				}
				medida.unidade = 'm';
				break;
			
			case 'u':
				for (let i = 0; i < sse.medidas_unidades.prev.length; i++) {
					const m = sse.medidas_unidades.prev[i];
					medida.valor += (1*m.n);
				}
				medida.unidade = 'unid';
				break;

			default:
				break;
		}

		return medida;

	}

	getTotalReal(sse:SSE):Medida{
		
		let medida:Medida = new Medida(0,'');
		
		if(sse.tipoDeServicoReal){
			switch (sse.tipoDeServicoReal.medida) {
				case 'a':
					for (let i = 0; i < sse.medidas_area.real.length; i++) {
						const m = sse.medidas_area.real[i];
						medida.valor += m.l * m.c;
					}
					medida.unidade = 'm²';
					break;
				
				case 'l':
					for (let i = 0; i < sse.medidas_linear.real.length; i++) {
						const m = sse.medidas_linear.real[i];
						medida.valor += (1*m.v);
					}
					medida.unidade = 'm';
					break;
				
				case 'u':
					for (let i = 0; i < sse.medidas_unidades.real.length; i++) {
						const m = sse.medidas_unidades.real[i];
						medida.valor += (1*m.n);
					}
					medida.unidade = 'unid';
					break;
	
				default:
					break;
			}
		}

		return medida;

	}

}
