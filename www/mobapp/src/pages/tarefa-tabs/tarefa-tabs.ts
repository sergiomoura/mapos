import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TarefasProvider } from '../../providers/tarefas/tarefas';
import { LoadingController } from 'ionic-angular';



@IonicPage()
@Component({
	selector: 'page-tarefa-tabs',
	templateUrl: 'tarefa-tabs.html'
})
export class TarefaTabsPage {

	tarefaInfoRoot = 'TarefaInfoPage'
	tarefaIniciarRoot = 'TarefaIniciarPage'
	tarefaConcluirRoot = 'TarefaConcluirPage'

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private tarefasProvider: TarefasProvider,
		private toastController: ToastController,
		private loadingConttroller: LoadingController
	) {

		// Criando e mostrando loading
		let loading = this.loadingConttroller.create();
		loading.setContent('Aguarde...').present();

		this.tarefasProvider.getCompleteById(this.navParams.data.id_tarefa)
		.subscribe(
			res => {
				loading.dismiss();
				console.log('ok!');
				console.log(res);
			},
			err => {
				loading.dismiss();
				console.log('erro!');
				console.log(err);
			}
		)
	}

}
