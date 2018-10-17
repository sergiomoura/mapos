import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { DomasasService } from 'src/app/_services/domasas.service';
import { Bairro } from 'src/app/_models/bairro';
import { TipoDeServico } from 'src/app/_models/tipoDeServico';
import { Equipe } from 'src/app/_models/equipe';
import { TiposDeServicoService } from 'src/app/_services/tipos-de-servico.service';
import { EquipesService } from 'src/app/_services/equipes.service';
import { Busca } from 'src/app/_models/busca';
import { EventsService } from 'src/app/_services/events.service';
import { SsesService } from 'src/app/_services/sses.service';
import { SSE } from 'src/app/_models/sse';

enum Prioridade {
	NORMAL = '0',
	PRIORIDADE = '1',
	URGENTE = '2'
}

enum Status {
	CANCELADA	= 'CANCELADA',
	RETRABALHO	= 'RETRABALHO',
	DIVERGENTE	= 'DIVERGENTE',
	CADASTRADA	= 'CADASTRADA',
	AGENDADA	= 'AGENDADA',
	EXECUTANDO	= 'EXECUTANDO',
	PENDENTE	= 'PENDENTE',
	FINALIZADA	= 'FINALIZADA'
}

class ElementoSelecionavel {
	elemento:Equipe | Prioridade | string;
	selecionado:boolean;
}

class ParametrosDeBusca implements Busca {
	
	public equipesSelecionaveis:ElementoSelecionavel[] = [];
	public prioridadesSelecionaveis:ElementoSelecionavel[] = [];
	public statusSelecionaveis:ElementoSelecionavel[] = [];
	public agendadas_de?: Date = null;
	public agendadas_ate?: Date = null;
	public realizadas_de?: Date = null;
	public realizadas_ate?: Date = null;
	id_fechamento?: number = null;

	constructor(){

		// Criando vetor de prioridades selecionaveis
		for (let i in Prioridade) {
			this.prioridadesSelecionaveis.push(
				{
					'elemento': Prioridade[i],
					'selecionado': true
				}
			);
		}

		// Criando vetor de status selecionaveis
		for (let i in Status) {
			this.statusSelecionaveis.push(
				{
					'elemento': Status[i],
					'selecionado': true
				}
			);
		}
	}

	setEquipes(equipes:Equipe[]):void{
		// Criando vetor de equipes selecionaveis
		for (let i = 0; i < equipes.length; i++) {
			this.equipesSelecionaveis.push(
				{
					'elemento': equipes[i],
					'selecionado': true
				}
			);
		}
	}
	
	public get equipes() : Equipe[] {
		return this.equipesSelecionaveis.filter(
			e => {
				return e.selecionado;
			}
		).map(
			e => {
				return <Equipe>e.elemento;
			}
		)
	}

	public get status() : Status[] {
		return this.statusSelecionaveis.filter(
			e => {
				return e.selecionado;
			}
		).map(
			e => {
				return <Status>e.elemento;
			}
		)
	}

	public get prioridades() : number[] {
		return this.prioridadesSelecionaveis.filter(
			e => {
				return e.selecionado;
			}
		).map(
			e => {
				return +<Prioridade>e.elemento;
			}
		)
	}

}

@Component({
	selector: 'app-buscador-modal',
	templateUrl: './buscador-modal.component.html',
	styleUrls: ['./buscador-modal.component.scss']
})
export class BuscadorModalComponent implements OnInit {

	public bairros:Bairro[];
	public tdss:TipoDeServico[];
	public equipes:Equipe[];
	public busca:ParametrosDeBusca;
	public buscando:boolean;

	constructor(
		public dialogRef: MatDialogRef<BuscadorModalComponent>,
		private domasasService:DomasasService,
		private tdsService:TiposDeServicoService,
		private equipesService:EquipesService,
		private evtService:EventsService,
		private ssesService:SsesService,
		private snackBar:MatSnackBar
	) { 
		this.busca = new ParametrosDeBusca();
	}

	ngOnInit() {
		this.getBairros();
		this.getTdss();
		this.getEquipes();
	}

	private getBairros():void{
		this.domasasService.getFlat().subscribe(
			(bairros) => {
				this.bairros = bairros;
			}
		)
	}

	private getTdss():void{
		this.tdsService.get().subscribe(
			(tdss) => {
				this.tdss = tdss;
			}
		)
	}

	private getEquipes():void{
		this.equipesService.getEquipes().subscribe(
			(equipes) => {
				this.equipes = equipes;
				this.busca.setEquipes(this.equipes);
			}
		)
	}

	onMTEquipesClick():void {
		for (let index = 0; index < this.busca.equipesSelecionaveis.length; index++) {
			this.busca.equipesSelecionaveis[index].selecionado = true;
		}
	}

	onDMTEquipesClick():void {
		for (let index = 0; index < this.busca.equipesSelecionaveis.length; index++) {
			this.busca.equipesSelecionaveis[index].selecionado = false;
		}
	}

	onMTStatusClick():void {
		for (let index = 0; index < this.busca.statusSelecionaveis.length; index++) {
			this.busca.statusSelecionaveis[index].selecionado = true;
		}
	}

	onDMTStatusClick():void {
		for (let index = 0; index < this.busca.statusSelecionaveis.length; index++) {
			this.busca.statusSelecionaveis[index].selecionado = false;
		}
	}

	onMTPrioridadesClick():void {
		for (let index = 0; index < this.busca.prioridadesSelecionaveis.length; index++) {
			this.busca.prioridadesSelecionaveis[index].selecionado = true;
		}
	}

	onDMTPrioridadesClick():void {
		for (let index = 0; index < this.busca.prioridadesSelecionaveis.length; index++) {
			this.busca.prioridadesSelecionaveis[index].selecionado = false;
		}
	}

	onBuscarClick():void {
		this.buscar();
	}

	private buscar():void{

		// Mostrar carregando
		this.buscando = true;

		// Fazendo requisição
		this.ssesService.getAll(this.busca).subscribe(
			res => {
				// esconde carregando
				this.buscando = false;

				// Parsing sses
				let sses:SSE[] = this.parseSses(res);

				// emitindo evento de sses carregadas
				this.evtService.ssesCarregadas(sses);
			},
			err => {
				// esconde carregando
				this.buscando = false;

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

	private parseSses(tmpSses):SSE[]{

		if(this.tdss && this.equipes){

			// Resetando o vetor de sses;
			let sses:SSE[] = [];
			
			for (let i = 0; i < tmpSses.length; i++) {

				// Lendo sse da vez
				let sse:SSE = new SSE(tmpSses[i], this.tdss);
				
				// Parsing bairros se bairros estiver setado
				if(this.bairros){
					sse.setBairro(this.bairros)
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

				// Pondo no vetor de sses;
				sses.push(sse);
			}

			return sses;
		} else {
			return null;
		}
	}
}