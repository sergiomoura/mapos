import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TarefasProvider } from '../../providers/tarefas/tarefas';

@IonicPage()
@Component({
	selector: 'page-tarefa-info',
	templateUrl: 'tarefa-info.html',
})
export class TarefaInfoPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private tarefasProvider:TarefasProvider
	) {	}

	ionViewDidLoad() {
		this.getTarefa(5);
	}

	getTarefa(id_tarefa:number){
		console.log(id_tarefa)
	}
}
