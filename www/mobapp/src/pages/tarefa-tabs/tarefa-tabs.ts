import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Events } from 'ionic-angular';
import { Storage } from "@ionic/storage";

@IonicPage()
@Component({
	selector: 'page-tarefa-tabs',
	templateUrl: 'tarefa-tabs.html'
})

export class TarefaTabsPage {

	tarefaInfoRoot = 'TarefaInfoPage'
	tarefaIniciarRoot = 'TarefaIniciarPage'
	tarefaConcluirRoot = 'TarefaConcluirPage'
	iniciarServicoLiberado:boolean = false;
	concluirServicoLiberado:boolean = false;
	tarefa:any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private storage:Storage,
		public events:Events
	) {
		
		// Subscribe para quando a tarefa for iniciada
		this.events.subscribe('tarefa:iniciada',
			() => {
				this.getTarefa();
			}
		)

		// Subscribe para quando a tarefa for registrada como divergente
		this.events.subscribe('tarefa:divergente',
			() => {
				this.getTarefa();
			}
		)

		// Subscribe para quando a tarefa for concluida
		this.events.subscribe('tarefa:concluida',
			() => {
				this.getTarefa();
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
				this.iniciarServicoLiberado = (this.tarefa.inicio_r == null);
				this.concluirServicoLiberado = (this.tarefa.inicio_r != null && this.tarefa.final_r==null);
			}
		)
	}
}
