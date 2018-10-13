import { Component, OnInit, OnDestroy, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { SsesService } from '../../_services/sses.service';
import { SSE } from '../../_models/sse';
import { MatSnackBar, MatSidenav } from '@angular/material';
import { Router } from '@angular/router';
import { Equipe } from '../../_models/equipe';
import { MatDialog } from '@angular/material';
import { NovaTarefaComponent } from '../nova-tarefa/nova-tarefa.component';
import { TarefaService } from '../../_services/tarefa.service';
import { FinalizarSseComponent } from "../../_components/finalizar-sse/finalizar-sse.component";
import { EventsService } from '../../_services/events.service';
import { Subscription } from 'rxjs';
import { BuscadorComponent } from '../buscador/buscador.component';
import { ListaFiltravelComponent } from '../lista-filtravel/lista-filtravel.component';
import { AgmMarker, AgmMap, AgmInfoWindow } from '@agm/core';
import { EquipesService } from '../../_services/equipes.service';

@Component({
	selector: 'app-sses-map',
	templateUrl: './sses-map.component.html',
	styleUrls: ['./sses-map.component.scss']
})
export class SsesMapComponent implements OnInit,OnDestroy {

	// ELEMENTOS DO TEMPLATE = = = = = = = = = = = = =
	@ViewChild('buscador') buscador:BuscadorComponent;
	@ViewChild('lista') lista:ListaFiltravelComponent;
	@ViewChild('sidenav') sidenav:MatSidenav;
	@ViewChild('mapa') mapa:AgmMap;
	@ViewChildren(AgmMarker) markers:QueryList<AgmMarker>;

	// PROPRIEDADES LOCAIS = = = = = = = = = = = = = =
	sses:SSE[];
	equipes:Equipe[];
	initial_lat:number = -22.966;
	initial_lng:number = -47.067;
	initial_zoom:number = 12;
	infoWindowAtual:AgmInfoWindow;
	IRSSE:number = 300000; // Intervalo para recarregar sses: 5min
	reload_sses_interval:number;
	subscriptions:Subscription[] = [];

	// CONSTRUCTOR = = = = = = = = = = = = = = = = =
	constructor(
		private ssesService:SsesService,
		private snackBar:MatSnackBar,
		private router:Router,
		public dialog: MatDialog,
		private tarefaService:TarefaService,
		private evtService:EventsService,
		private equipesService:EquipesService
	) {}

	ngOnInit() {
		
		// Carregando equipes
		this.getEquipes();
		
		// Iniciando o interval que recarrega sses
		this.reload_sses_interval = window.setInterval(
			() => {
				window.setTimeout(
					() => {
						this.reloadSses();
					},
					Math.round(Math.random()*10000+5000)
				);
			}
			,this.IRSSE
		)

		// Subscrevendo ao observavel de evento reload clicked
		this.subscriptions.push(
			this.evtService.reloadClicked$.subscribe(
				() => {
					this.reloadSses();
				}
			)
		)

	}

	ngOnDestroy() {
		// Limpando o interval que recarrega sses
		window.clearInterval(this.reload_sses_interval);
		
		// Unsubscribing from all subscriptions
		for (let i = 0; i < this.subscriptions.length; i++) {
			this.subscriptions[i].unsubscribe();
		}
	}

	reloadSses(){
		this.buscador.onBuscarClick();
	}

	private getEquipes(){
		this.equipesService.getEquipes().subscribe(
			res => {
				this.equipes = <Equipe[]>res;
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

	onSsesCarregadas(evt:SSE[]){

		// A infoWindow atual some e não fica undefined.
		// Indefinindo na marra
		this.infoWindowAtual = undefined;

		// Passando as sses para atributo interno
		this.sses = evt;

		// Passando as sses para a lista de sses
		this.lista.sses = this.sses;

		// Provocando a lista para que ela liste as sses carregadas
		this.lista.onFilterKey();
	}

	onMarkerDragEnd(evt,sse:SSE){
		let pergunta:string = "Tem certeza que deseja alterar as coordenadas desta SSE?\nEssa operação NÃO ALTERA O ENDEREÇO da mesma."
		if(confirm(pergunta)){
			
			// TODO: Fazendo requisição para atualizar sse
			this.ssesService.updateCoordenadas(evt.coords.lat,evt.coords.lng,sse.id).subscribe(
				()=>{
					// Salvando coordenadas da sse localmente
					sse.lat = evt.coords.lat;
					sse.lng = evt.coords.lng;

					// Exibindo snackbar de sucesso
					this.snackBar.open(
						'Coordenadas de SSE alteradas com sucesso!',
						undefined,
						{
							panelClass: ['snackbar-ok'],
						});
				},
				(err)=>{
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao tentar alterar SSE',
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

					// Resetando sses
					this.reloadSses();
				}
			)

		} else {
			this.reloadSses();
		}
	}

	onItemClick(evt){
		
		// Encontrando o índice da SSE clicada
		let idx = this.sses.findIndex(
			(sse) => {
				return +sse.id == +evt;
			}
		)

		// Criando o vetor de markers
		let m = this.markers.toArray();

		// Capturando o a janela do marker da sse clicada
		let iw = m[idx].infoWindow.first;
		
		// Simlando o evento click no marker
		this.onMarkerClick(iw);

		// Abrindo infoWindow
		iw.open();
	}
	
	onMarkerClick(iw:AgmInfoWindow){
		if (this.infoWindowAtual) {
			this.infoWindowAtual.close();
		}
		this.infoWindowAtual = iw;
	}

	onMapClick(){
		if (this.infoWindowAtual) {
			this.infoWindowAtual.close();
		}
		this.infoWindowAtual = undefined;
	}

	goToSse(id) {
		this.router.navigateByUrl('home/sse/'+id);
	}

	onCancelarInicioClick(id_sse){
		this.ssesService.cancelarInicio(id_sse).subscribe(
			(res) => {
				this.buscador.onBuscarClick();
			},
			(err) => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao tentar cancelar início de SSE.',
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

	onAgendarClick(id_sse){
		this.openDialog(id_sse);
	}

	onCancelarSseClick(id_sse){
		let pergunta = 'Tem certeza que deseja marcar esta SSE como CANCELADA?';
		let ok = window.confirm(pergunta);
		if(ok){
			this.ssesService.setCancelada(id_sse).subscribe(
				() => {
					this.reloadSses();
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
					this.reloadSses();
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
					this.reloadSses();
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
					this.reloadSses();
					
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
					this.reloadSses();

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
					this.reloadSses();
				}
			)
		}
	}

	onRetrabalhoClick(id_sse:number){
		let pergunta:string = "Tem certeza que deseja marcar esta SSE como retrabalho?";
		if(confirm(pergunta)){
			this.ssesService.setRetrabalho(id_sse).subscribe(
				() => {
					this.reloadSses();
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
					this.reloadSses();
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
					this.reloadSses();
				}
			}
		);
	}

}
