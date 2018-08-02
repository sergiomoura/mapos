import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import { TarefasProvider } from "../../providers/tarefas/tarefas";

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
	tarefa:any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private storage:Storage,
		public events:Events
	) {
		this.id_tarefa = +this.navParams.data.id_tarefa;
		
		// Subscribe para quando a tarefa for iniciada
		this.events.subscribe('tarefa:iniciada',
			() => {
				this.storage.get('tarefaAtual').then(
					(tarefa) => {
						this.tarefa = tarefa;
					}
				)
			}
		)

		// Subscribe para quando a tarefa for registrada como divergente
		this.events.subscribe('tarefa:divergente',
			() => {
				this.storage.get('tarefaAtual').then(
					(tarefa) => {
						this.tarefa = tarefa;
					}
				)
			}
		)

		// Subscribe para quando a tarefa for concluida
		this.events.subscribe('tarefa:concluida',
			() => {
				this.storage.get('tarefaAtual').then(
					(tarefa) => {
						this.tarefa = tarefa;
					}
				)
			}
		)
	}

	ionViewDidLoad(){
		this.getTarefa();
	}

	
	getTarefa() {
		this.storage.get('tarefaAtual').then(
			(tarefa)=>{
				// Guardando tarefa em variável local
				this.tarefa = tarefa;
			}
		)
	}
}
