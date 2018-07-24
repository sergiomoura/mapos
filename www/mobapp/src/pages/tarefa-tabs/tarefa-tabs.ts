import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-tarefa-tabs',
	templateUrl: 'tarefa-tabs.html'
})

export class TarefaTabsPage {

	tarefaInfoRoot = 'TarefaInfoPage'
	tarefaIniciarRoot = 'TarefaIniciarPage'
	tarefaConcluirRoot = 'TarefaConcluirPage'

	id_tarefa:number;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {
		this.id_tarefa = +this.navParams.data.id_tarefa;
	}
}
