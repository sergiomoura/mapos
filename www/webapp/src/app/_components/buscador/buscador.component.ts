import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Equipe } from '../../_models/equipe';
import { TipoDeServico } from "../../_models/tipoDeServico";
import { Busca } from "../../_models/busca";
import { EventsService } from '../../_services/events.service';
import { SsesService } from '../../_services/sses.service';
import { SSE } from '../../_models/sse';
import { MatSnackBar } from '@angular/material';
import { TiposDeServicoService } from '../../_services/tipos-de-servico.service';
import { EquipesService } from '../../_services/equipes.service';
@Component({
	selector: 'app-buscador',
	templateUrl: './buscador.component.html',
	styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

	// Inputs
	@Input() auto:boolean = false;

	// Outputs
	@Output() ssesCarregadas:EventEmitter<SSE[]>;

	// Públicos
	busca:Busca = {
		equipes : [],
		status : ['RETRABALHO','DIVERGENTE','CADASTRADA','AGENDADA','EXECUTANDO','PENDENTE'],
		prioridades: [0,1,2],
		agendadas_de: undefined,
		agendadas_ate: undefined,
		realizadas_de: undefined,
		realizadas_ate: undefined
	};
	buscaPadrao:Busca = {
		equipes : [],
		status : ['RETRABALHO','DIVERGENTE','CADASTRADA','AGENDADA','EXECUTANDO','PENDENTE'],
		prioridades: [0,1,2],
		agendadas_de: undefined,
		agendadas_ate: undefined,
		realizadas_de: undefined,
		realizadas_ate: undefined
	}
	tdss:TipoDeServico[];
	equipes:Equipe[];
	tmpSses:any[];
	sses:SSE[];

	// Constructor
	constructor(
		private evtService:EventsService,
		private ssesService:SsesService,
		private equipesService:EquipesService,
		private tdsService:TiposDeServicoService,
		private snackBar:MatSnackBar
	) {
		this.ssesCarregadas = new EventEmitter();
	}

	private getSses(){
		// Mostrar carregando
		this.evtService.mostrarCarregando();

		// Fazendo requisição
		this.ssesService.getAll(this.busca).subscribe(
			res => {
				// esconde carregando
				this.evtService.esconderCarregando();

				// Escrevendo o response no tmpSses
				this.tmpSses = res;

				// Chamando o parse
				this.parseSses();
			},
			err => {
				// esconde carregando
				this.evtService.esconderCarregando();

				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao carregar SSEs',
					'Fechar',
					{
						duration:0,
						horizontalPosition:'left',
						verticalPosition:'bottom',
						panelClass: ['snackbar-error'],
					}
				);

				// Imprimindo erro no console
				console.error(err);
			}
		)
	}

	private getEquipes(){
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

	private getTiposDeServico(){
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

	private parseSses(){

		if(this.tmpSses && this.tdss && this.equipes){
			for (let i = 0; i < this.tmpSses.length; i++) {

				// Lendo sse da vez
				const sse = this.tmpSses[i];

				// Parsing escalares
				sse.dh_registrado = new Date(sse.dh_registrado);
				sse.dh_recebido = new Date(sse.dh_recebido);
				
				// Paring Equipe
				sse.equipe = this.equipes.find(
					(e) => {
						return +(e.id) == +(this.tmpSses[i].id_equipe);
					}
				)
				delete this.tmpSses[i].id_equipe;

				// Parsing tipo de serviço previsto
				sse.tipoDeServicoPrev = this.tdss.find(
					(tds) => {
						return +tds.id == +this.tmpSses[i].id_tds_p;
					}
				)
				delete this.tmpSses[i].id_tds_p;

				// Parsing tipo de serviço real
				sse.tipoDeServicoReal = this.tdss.find(
					(tds) => {
						return +tds.id == +this.tmpSses[i].id_tds_r;
					}
				)
				delete this.tmpSses[i].id_tds_r;
				
				// Determinando o prazo final
				sse.prazoFinal = new Date(sse.prazo_final+'T00:00:00');
				
				
				// Determinando o tempo restante (17 horas do dia fo prazo final)
				sse.tempoRestante = (sse.prazoFinal.getTime() + (17*60*60*1000) - (new Date()).getTime())/1000;
	
				// Determinando o nome do arquivo marker
				sse.markerFile = 'marker-';
				sse.statusMsg = '';
				switch (+sse.status) {
					case -100:
						sse.markerFile += 'cancelada';
						sse.statusMessage = 'Cancelada';
						break;

					case -2:
						sse.markerFile += 'retrabalho';
						sse.statusMessage = 'Retrabalho';
						break;

					case -1:
						sse.markerFile += 'divergente';
						sse.statusMessage = 'Divergente';
						break;
					
					case 0:
						sse.markerFile += 'cadastrada';
						sse.statusMessage = 'Cadastrada - aguardando ação do programador.';
						break;
	
					case 1:
						sse.markerFile += 'agendada'
						sse.statusMessage = 'Agendada';
						break;
					
					case 2:
						sse.markerFile += 'executando';
						sse.statusMessage = 'Executando';
						break;
					
					case 3:
						sse.markerFile += 'pendente'
						sse.statusMessage = 'Pendente - aguardando ação do programador.';
						break;
					
					case 100:
						sse.markerFile += 'finalizada'
						sse.statusMessage = 'Finalizada';
						break;
				}
				
				
				sse.markerFile += '-' + sse.urgencia;
				sse.markerFile += '.svg';

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
		this.sses = this.tmpSses;

		// Emite evento com às sses
		this.ssesCarregadas.emit(this.sses);
	}


	// On Functions
	ngOnInit() {
		this.getEquipes();
		this.getTiposDeServico();

		// busca automaticamente
		if(this.auto){
			this.getSses();
		}
	}

	onCancelarBuscaClick(){
		console.log('clicou no cancelar...');
	}

	onResetCamposClick(){
		this.busca = this.buscaPadrao;
	}

	onBuscarClick(){
		this.getSses();
	}

}
