import { Component, Input, EventEmitter, Output } from '@angular/core';
import { SSE } from '../../_models/sse';

@Component({
	selector: 'app-lista-filtravel',
	templateUrl: './lista-filtravel.component.html',
	styleUrls: ['./lista-filtravel.component.scss']
})
export class ListaFiltravelComponent{

	// Inputs
	@Input() sses:SSE[];
	
	// Outputs
	@Output() itemClick:EventEmitter<number>;

	// Publics
	filtro:string = '';
	sses_exibidas:SSE[];

	// Constructor
	constructor() {
		this.itemClick = new EventEmitter();
	}
	
	// ON Functions
	onFilterKey(){
		if(this.filtro == ''){
			this.sses_exibidas = this.sses;
		} else {
			this.sses_exibidas = this.sses.filter(
				(a) => {
					return a.numero.indexOf(this.filtro) > -1
				}
			);
		}
	}

	onFilterClick(){
		this.filtro = '';
		this.onFilterKey();
	}

	onItemClick(id_sse:number){
		this.itemClick.emit(id_sse);
	}
	
}
