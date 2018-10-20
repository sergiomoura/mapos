import { Component, OnInit } from '@angular/core';
import { SSE } from '../../_models/sse';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EventsService } from '../../_services/events.service';
import { SsesService } from 'src/app/_services/sses.service';
import { Busca } from 'src/app/_models/busca';
import { ChavesDeBusca } from 'src/app/_models/chavesDeBusca';
import { EquipesService } from 'src/app/_services/equipes.service';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-sses',
	templateUrl: './sses-grid.component.html',
	styleUrls: ['./sses-grid.component.scss']
})
export class SsesGridComponent implements OnInit {
	sses:SSE[];
	infinito:number = 2000000000;
	private subscriptions:Subscription[] = [];

	constructor(
		private router:Router,
		private evtService:EventsService,
		private ssesService:SsesService,
		private equipesService: EquipesService,
		private snackBar: MatSnackBar
	){}

	ngOnInit() {

		// Subscrevendo ao observavel de evento reload clicked
		this.subscriptions.push(
			this.evtService.reloadClicked$.subscribe(
				() => {
					this.getSses();
				}
			)
		)

		// Subscrevendo ao observavel de evento sses carregadas
		this.subscriptions.push(
			this.evtService.ssesCarregadas$.subscribe(
				(sses) => {
					this.sses = <SSE[]>sses;
				}
			)
		)

		// Carregando sses
		this.getSses();

	}

	ngOnDestroy(){
		// Unsubscribing from all subscriptions
		for (let i = 0; i < this.subscriptions.length; i++) {
			this.subscriptions[i].unsubscribe();
		}
	}
	
	getSses(){
		// Carregando busca do localStorage
		let strBusca:string = localStorage.getItem(ChavesDeBusca.GRID);

		// Definindo busca
		let busca:Busca;
		if(strBusca){
			busca = JSON.parse(strBusca);
		} else {
			busca = {
				agendadas_ate: null,
				agendadas_de: null,
				realizadas_ate: null,
				realizadas_de: null,
				prioridades: [0,1,2],
				status: ['CANCELADA','RETRABALHO','DIVERGENTE','CADASTRADA','AGENDADA','EXECUTANDO','PENDENTE','FINALIZADA'],
				id_fechamento: null
			}

			this.equipesService.getEquipes().subscribe(
				(equipes) => {
					busca.equipes = equipes;
				}
			)
		}
		this.ssesService.getAll(busca).subscribe(
			(sses) => {
				this.sses = sses;
			},
			(err) => {
				
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao tentar carregar sses',
					'Fechar',
					{
						duration:0,
						horizontalPosition:'left',
						verticalPosition:'bottom',
						panelClass: ['snackbar-error'],
					}
				);

				// Imprimindo erro no console
				console.warn(err)
			}
		)
	}
	
	onSseButtonClick(id){
		this.router.navigateByUrl('/home/sse/' + id);
	}

}
