import { Component, OnInit, ViewChild } from '@angular/core';
import { SSE } from '../../_models/sse';
import { Router } from '@angular/router';
import { Bairro } from "../../_models/bairro";
import { TipoDeServico } from "../../_models/tipoDeServico";
import { Equipe } from "../../_models/equipe";
import { Subscription } from 'rxjs';
import { EventsService } from '../../_services/events.service';
import { BuscadorComponent } from '../buscador/buscador.component';

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
		private router:Router,
		private evtService:EventsService
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
	}

	ngOnDestroy(){
		// Unsubscribing from all subscriptions
		for (let i = 0; i < this.subscriptions.length; i++) {
			this.subscriptions[i].unsubscribe();
		}
	}
	
	getSses(){
		console.log('recarregando sses');
	}
	
	onSseButtonClick(id){
		this.router.navigateByUrl('/home/sse/' + id);
	}

}
