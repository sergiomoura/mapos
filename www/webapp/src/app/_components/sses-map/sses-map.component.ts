import { Component, OnInit } from '@angular/core';
import { SsesService } from '../../_services/sses.service';
import { SSE } from '../../_models/sse';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { TiposDeServicoService } from "../../_services/tipos-de-servico.service";
import { TipoDeServico } from "../../_models/tipoDeServico";
import { EquipesService } from '../../_services/equipes.service';
import { Equipe } from '../../_models/equipe';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
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
	initial_lat:number = -22.916405805627686;
	initial_lng:number = -47.067499388564215;
	initial_zoom:number = 12;
	markerAtual:any;
	tdss:TipoDeServico[];
	equipes:Equipe[];
	tmpSses:any[];


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
				sse.lat *= 1;
				sse.lng *= 1;
				
				// Paring Equipe
				sse.equipe = this.equipes.find(
					(e) => {
						return +(e.id) == +(sse.id_equipe);
					}
				)

				// Parsing tipo de serviço
				sse.tipoDeServico = this.tdss.find(
					(tds) => {
						return +tds.id == +sse.id_tipo_de_servico;
					}
				)

				// Determinando o prazo final
				sse.prazoFinal = new Date(sse.dh_recebido.getTime());
				sse.prazoFinal.setDate(+sse.prazoFinal.getDate() + (+sse.tipoDeServico.prazo));
				
				// Determinando o tempo restante
				sse.tempoRestante = (sse.prazoFinal.getTime() - (new Date()).getTime())/1000;
	
				// Determinando o nome do arquivo marker
				sse.markerFile = 'marker-';
				sse.statusMsg = '';
				switch (+sse.status) {
					case -1:
						sse.markerFile += 'divergente';
						sse.statusMessage = 'Divergente';
						break;
					
					case 0:
						sse.markerFile += 'virgem';
						sse.statusMessage = 'Virgem - aguardando ação do programador.';
						break;
	
					case 1:
						sse.markerFile += 'delegada'
						sse.statusMessage = 'Delegada';
						break;
					
					case 2:
						sse.markerFile += 'emExecucao';
						sse.statusMessage = 'Em execução';
						break;
					
					case 3:
						sse.markerFile += 'execucaoConcluida'
						sse.statusMessage = 'Execução concluída - aguardando ação do programador.';
						break;
					
					case 100:
						sse.markerFile += 'concluida'
						sse.statusMessage = 'Finalizada';
						break;
				}
	
				if(sse.urgente == "1"){
					sse.markerFile += '-u';
				}
	
				sse.markerFile += '.svg';
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

	onDelegarClick(id_sse){
		this.openDialog(id_sse);
	}

	openDialog(sse): void {
		const dialogRef = this.dialog.open(NovaTarefaComponent, {
			width: '800px',
			data: {
				'sse': sse,
				'equipes':this.equipes,

			}
		});
	
		dialogRef.afterClosed().subscribe(result => {
			console.log('Diálogo fechado. Resultado');
			console.dir(result)
		});
	}

}
