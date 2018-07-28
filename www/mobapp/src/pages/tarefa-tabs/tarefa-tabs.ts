import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
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

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private tarefaProvider: TarefasProvider,
		private storage:Storage,
		private toastController: ToastController
	) {
		this.id_tarefa = +this.navParams.data.id_tarefa;
	}

	ionViewDidLoad(){
		this.getTarefa();
	}

	getTarefa() {
		this.tarefaProvider.getCompleteById(this.id_tarefa,true).subscribe(
			res => {
				this.storage.set('tarefaAtual',res).then(
					(tarefa)=>{
						// TODO: Anunciar para os tab inicial que a tarefa foi carregada
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
