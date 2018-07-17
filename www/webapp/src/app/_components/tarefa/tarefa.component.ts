import { Component, OnInit } from '@angular/core';
import { Equipe } from '../../_models/equipe';

@Component({
	selector: 'app-tarefa',
	templateUrl: './tarefa.component.html',
	styleUrls: ['./tarefa.component.scss']
})
export class TarefaComponent implements OnInit {
	
	tiposDeTarefa:any[] = [];
	equipes:Equipe[] = [];

	constructor() { }

	ngOnInit() {
	}

}
