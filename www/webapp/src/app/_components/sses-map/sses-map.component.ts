import { Component, OnInit } from '@angular/core';
import { SsesService } from '../../_services/sses.service';
import { SSE } from '../../_models/sse';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { TiposDeServicoService } from "../../_services/tipos-de-servico.service";
import { TipoDeServico } from "../../_models/tipoDeServico";
import { EquipesService } from '../../_services/equipes.service';
import { Equipe } from '../../_models/equipe';
import { Busca } from "../../_models/busca";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NovaTarefaComponent } from '../nova-tarefa/nova-tarefa.component';
import { TarefaService } from '../../_services/tarefa.service';
import { FinalizarSseComponent } from "../../_components/finalizar-sse/finalizar-sse.component";
import { EventsService } from '../../_services/events.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-sses-map',
	templateUrl: './sses-map.component.html',
	styleUrls: ['./sses-map.component.scss']
})
export class SsesMapComponent implements OnInit {

	sses:SSE[];
	tmpSses:any[];
	initial_lat:number = -22.916405805627686;
	initial_lng:number = -47.067499388564215;
	initial_zoom:number = 11;
	markerAtual:any;
	tdss:TipoDeServico[];
	equipes:Equipe[];
	mostrandoFiltro:boolean = false;
	IRSSE:number = 300000; // Intervalo para recarregar sses: 5min
	reload_sses_interval:number;
	subscriptions:Subscription[] = [];

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

	constructor(
		private equipesService:EquipesService,
		private ssesService:SsesService,
		private snackBar:MatSnackBar,
		private router:Router,
		private tdsService:TiposDeServicoService,
		public dialog: MatDialog,
		private tarefaService:TarefaService,
		private evtService:EventsService
	) {}

	ngOnInit() {
		this.getTiposDeServico();
		this.getEquipes();
		this.getSses();

		this.reload_sses_interval = window.setInterval(
			() => {
				window.setTimeout(
					() => {
						this.getSses();
					}
				), Math.round(Math.random()*2000)
			}
			,this.IRSSE
		)

		// Subscrevendo ao observavel de evento reload clicked
		this.subscriptions.push(
			this.evtService.reloadClicked$.subscribe(
				() => {
					this.getSses();
				}
			)
		)

		// Subscrevendo ao observavel de evento filter clicked
		this.subscriptions.push(
			this.evtService.filterClicked$.subscribe(
				() => {
					this.mostrandoFiltro = !this.mostrandoFiltro;
				}
			)
		)
	}

	ngOnDestroy() {
		window.clearInterval(this.reload_sses_interval);
		
		// Unsubscribing from all subscriptions
		for (let i = 0; i < this.subscriptions.length; i++) {
			this.subscriptions[i].unsubscribe();
		}
	}

	getSses(){
		this.ssesService.getAll(this.busca).subscribe(
			res => {
				this.tmpSses = res;
				this.parseSses();
				this.markerAtual = undefined;
				this.mostrandoFiltro = false;
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao tentar carregar SSEs',
					'Fechar',
					{
						duration:0,
						horizontalPosition:'left',
						verticalPosition:'bottom',
						panelClass: ['snackbar-error'],
					}
				);
			
			}
		)
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
	
	onMarkerClick(infowindow){
		if (this.markerAtual) {
			this.markerAtual.close();
		}
		this.markerAtual = infowindow;
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
	}

	onMapClick(evt){
		if (this.markerAtual) {
			this.markerAtual.close();
		}
		this.markerAtual = undefined;
	}

	goToSse(id) {
		this.router.navigateByUrl('home/sse/'+id);
	}

	onBuscarClick(){
		this.getSses();
	}

	onResetCamposClick(){
		this.busca = this.buscaPadrao;
	}

	onCancelarBuscaClick(){
		this.mostrandoFiltro = false;
	}

	onAgendarClick(id_sse){
		this.openDialog(id_sse);
	}

	onCancelarSseClick(id_sse){
		let pergunta = 'Tem certeza que deseja marcar esta SSE como CANCELADA?';
		let ok = window.confirm(pergunta);
		if(ok){
			this.ssesService.setCancelada(id_sse).subscribe(
				() => {
					this.getSses();
				},
				err => {
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao tentar cancelar SSE',
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
	}

	onCancelarAgendamentoClick(id_tarefa){
		let pergunta = 'Tem certeza que deseja cancelar agendamento?';
		let ok = window.confirm(pergunta);
		if(ok){
			this.tarefaService.remove(id_tarefa).subscribe(
				() => {
					this.getSses();
				},
				err => {
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao tentar cancelar agendamento',
						'Fechar',
						{
							duration:0,
							horizontalPosition:'left',
							verticalPosition:'bottom',
							panelClass: ['snackbar-error'],
						}
					);
				}

			)
		}
	}

	onAlterarAgendamentoClick(sse,id_tarefa){
		const dialogRef = this.dialog.open(NovaTarefaComponent, {
			width: '800px',
			data: {
				'sse':sse,
				'id_tarefa': id_tarefa,
				'equipes':this.equipes,
			}
		});
	
		dialogRef.afterClosed().subscribe(
			result => {
				if(result == 1){
					this.getSses();
				}
			}
		);
	}

	onAutorizarClick(id_sse){
		let autorizadaPor:string = window.prompt("Quem está autorizando a tarefa?").trim();
		if(autorizadaPor){
			this.ssesService.setAutorizada(id_sse,autorizadaPor).subscribe(
				res => {
					// Recarregando sses
					this.getSses();
					
					// Exibindo snackbar de sucesso
					this.snackBar.open(
						'SSE Autorizada com sucesso ',
						undefined,
						{
							panelClass: ['snackbar-ok'],
						});
				},
				err => {
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao autorizar a SSE',
						'Fechar',
						{
							duration:0,
							horizontalPosition:'left',
							verticalPosition:'bottom',
							panelClass: ['snackbar-error'],
						}
					);
				}
			)
		}
	}

	onFinalizarClick(sse){
		const dialogRef = this.dialog.open(FinalizarSseComponent, {
			width: '400px',
			data: {
				'id_sse':sse.id,
				'data_conclusao':<Date>sse.final_r
			}
		});
	
		dialogRef.afterClosed().subscribe(
			result => {
				if(result == 1){
					this.getSses();

					// Exibindo snackbar de sucesso
					this.snackBar.open(
						'SSE finalizada com sucesso!',
						undefined,
						{
							panelClass: ['snackbar-ok'],
						});
				}
			}
		);
	}

	onReabrirClick(id_sse){
		let pergunta = 'Tem certeza que deseja reabrir esta SSE?';
		let ok = window.confirm(pergunta);
		if(ok){
			this.ssesService.reabrir(id_sse).subscribe(
				res => {
					this.getSses();
				}
			)
		}
	}

	onRetrabalhoClick(id_sse:number){
		let pergunta:string = "Tem certeza que deseja marcar esta SSE como retrabalho?";
		if(confirm(pergunta)){
			this.ssesService.setRetrabalho(id_sse).subscribe(
				() => {
					this.getSses();
				},
				err => {
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao marcar SSE como retrabalho',
						'Fechar',
						{
							duration:0,
							horizontalPosition:'left',
							verticalPosition:'bottom',
							panelClass: ['snackbar-error'],
						}
					);
				}
			)
		}
	}

	onFinalizarRetrabalhoClick(id_sse:number){
		let pergunta:string = "Tem certeza que deseja finalizar o retrabalho desta SSE?";
		if(confirm(pergunta)){
			this.ssesService.finalizarRetrabalho(id_sse).subscribe(
				() => {
					this.getSses();
				},
				err => {
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao finalizar retrabalho da sse',
						'Fechar',
						{
							duration:0,
							horizontalPosition:'left',
							verticalPosition:'bottom',
							panelClass: ['snackbar-error'],
						}
					);
				}
			)
		}
	}

	openDialog(sse): void {
		const dialogRef = this.dialog.open(NovaTarefaComponent, {
			width: '800px',
			data: {
				'sse': sse,
				'equipes':this.equipes,
			}
		});
	
		dialogRef.afterClosed().subscribe(
			result => {
				if(result == 1){
					this.getSses();
				}
			}
		);
	}

}
