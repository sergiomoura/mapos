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
		private tarefaProvider: TarefasProvider,
		private storage:Storage,
		private toastController: ToastController,
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
		this.tarefaProvider.getCompleteById(this.id_tarefa,true).subscribe(
			res => {
				this.storage.set('tarefaAtual',res).then(
					(tarefa)=>{
						// Guardando tarefa em variável local
						this.tarefa = tarefa;

						// Disparando evento que a tarefa foi carregada e salva no cel
						this.events.publish('tarefa:carregada');
					},
					(y)=>{
						// Exibindo toast de erro
						const toast = this.toastController.create({
						message: 'Falha ao tentar gravar a tarefa na memória do celular.',
						duration: 0,
						showCloseButton: true,
						closeButtonText: 'X'
						});
						toast.present();
					}
				)
			},
			err => {
				// Exibindo toast de erro
				const toast = this.toastController.create({
				message: 'Falha ao carregar tarefa.',
				duration: 0,
				showCloseButton: true,
				closeButtonText: 'X'
				});
				toast.present();
			}
		)
	}
}
