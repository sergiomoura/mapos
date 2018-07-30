import { Component, OnInit } from '@angular/core';
import { SsesService } from '../../_services/sses.service';
import { SSE } from '../../_models/sse';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { TiposDeServicoService } from "../../_services/tipos-de-servico.service";
import { TipoDeServico } from "../../_models/tipoDeServico";
import { EquipesService } from '../../_services/equipes.service';
import { Equipe } from '../../_models/equipe';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NovaTarefaComponent } from '../nova-tarefa/nova-tarefa.component';

@Component({
	selector: 'app-sses-map',
	templateUrl: './sses-map.component.html',
	styleUrls: ['./sses-map.component.scss']
})
export class SsesMapComponent implements OnInit {

	constructor(
		private equipesService:EquipesService,
		private ssesService:SsesService,
		private snackBar:MatSnackBar,
		private router:Router,
		private tdsService:TiposDeServicoService,
		public dialog: MatDialog
	) {}

	sses:SSE[];
	tmpSses:any[];
	initial_lat:number = -22.916405805627686;
	initial_lng:number = -47.067499388564215;
	initial_zoom:number = 12;
	markerAtual:any;
	tdss:TipoDeServico[];
	equipes:Equipe[];


	ngOnInit() {
		this.getTiposDeServico();
		this.getEquipes();
		this.getSses();
	}

	getSses(){
		this.ssesService.getAll().subscribe(
			res => {
				this.tmpSses = res;
				this.parseSses();
				this.markerAtual = undefined;
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

				// Parsing tipo de serviço
				sse.tipoDeServico = this.tdss.find(
					(tds) => {
						return +tds.id == +this.tmpSses[i].id_tipo_de_servico;
					}
				)
				delete this.tmpSses[i].id_tipo_de_servico;
				// Determinando o prazo final
				sse.prazoFinal = new Date(sse.dh_recebido.getTime());
				sse.prazoFinal.setDate(+sse.prazoFinal.getDate() + (+sse.tipoDeServico.prazo));
				
				// Determinando o tempo restante
				sse.tempoRestante = (sse.prazoFinal.getTime() - (new Date()).getTime())/1000;
	
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

	onAgendarClick(id_sse){
		this.openDialog(id_sse);
	}

	onSetConcluidaClick(id_sse){
		let pergunta = 'Tem certeza que deseja marcar esta SSE como concluída?';
		let ok = window.confirm(pergunta);
		if(ok){
			this.ssesService.setFinalizada(id_sse).subscribe(
				res => {
					this.getSses();
				}
			)
		}
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
