import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Equipe } from '../../_models/equipe';
import { TipoDeServico } from "../../_models/tipoDeServico";
import { Busca } from "../../_models/busca";
import { EventsService } from '../../_services/events.service';
import { SsesService } from '../../_services/sses.service';
import { SSE } from '../../_models/sse';
import { MatSnackBar } from '@angular/material';
import { TiposDeServicoService } from '../../_services/tipos-de-servico.service';
import { Bairro } from '../../_models/bairro';

@Component({
	selector: 'app-buscador',
	templateUrl: './buscador.component.html',
	styleUrls: ['./buscador.component.scss']
})
export class BuscadorComponent implements OnInit {

	// Inputs
	@Input() auto:boolean = false;
	@Input() equipes:Equipe[];
	@Input() bairros:Bairro[];
	@Input() chaveDeBusca:string;

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
		realizadas_ate: undefined,
		cmo: this.cmo,
		cmp: this.cmp
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
	tmpSses:any[];
	sses:SSE[];

	// Constructor
	constructor(
		private evtService:EventsService,
		private ssesService:SsesService,
		private tdsService:TiposDeServicoService,
		private snackBar:MatSnackBar
	) {
		// Instanciando emissor de eventos de sses carregadas
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

			// Resetando o vetor de sses;
			this.sses = [];
			
			for (let i = 0; i < this.tmpSses.length; i++) {

				// Lendo sse da vez
				let sse:SSE = new SSE(this.tmpSses[i]);
				
				// Parsing bairros se bairros estiver setado
				if(this.bairros){
					sse.setBairro(this.bairros)
				}

				// Parsing tipo de serviço previsto
				sse.setTipoDeServicoPrev(this.tdss);
				sse.setTipoDeServicoReal(this.tdss);

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

				// Pondo no vetor de sses;
				this.sses.push(sse);
			}
		}

		// Emite evento com às sses
		this.ssesCarregadas.emit(this.sses);
	}

	// On Functions
	ngOnInit() {

		// Levantando tipos de servicos
		this.getTiposDeServico();

		// busca automaticamente
		if(this.auto){
			this.getSses();
		}

		// Carregando busca do localstorage, caso haja
		let strBusca = localStorage.getItem(this.chaveDeBusca);
		if(strBusca){
			this.busca = <Busca>JSON.parse(strBusca);
		} else {
			this.busca = this.buscaPadrao;
		}
		
	}

	onResetCamposClick(){
		this.busca = this.buscaPadrao;
	}

	onBuscarClick(){

		// Buscando SSEs
		this.getSses();

		// Salvando busca no local storage
		localStorage.setItem(this.chaveDeBusca,JSON.stringify(this.busca));

	}

}
