import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController } from 'ionic-angular';
import { TarefasProvider } from '../../providers/tarefas/tarefas';
import { LoadingController } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

@IonicPage()
@Component({
	selector: 'page-tarefa-info',
	templateUrl: 'tarefa-info.html',
})
export class TarefaInfoPage {

	tarefa:any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private tarefasProvider:TarefasProvider,
		private toastController: ToastController,
		private loadingConttroller: LoadingController,
		private launchNavigator: LaunchNavigator
	) {	}

	ionViewDidLoad() {
	}

	ionViewWillEnter(){
		this.getTarefa(<number>this.navParams.data.id_tarefa)
	}

	getTarefa(id_tarefa:number){
		// Criando e mostrando loading
		let loading = this.loadingConttroller.create();
		loading.setContent('Aguarde...').present();

		// Fazendo requisição para carregar tarefa
		this.tarefasProvider.getCompleteById(this.navParams.data.id_tarefa)
		.subscribe(
			res => {
				// Esconde o carregando
				loading.dismiss();

				// Transformando o tipo de res de Object para Any
				let tmp = <any>res;

				// Parsing dates
				tmp.final_p = (tmp.final_p == null ? null : new Date(tmp.final_p));
				tmp.final_r = (tmp.final_r == null ? null : new Date(tmp.final_r));
				tmp.inicio_p = (tmp.inicio_p == null ? null : new Date(tmp.inicio_p));
				tmp.inicio_r = (tmp.inicio_r == null ? null : new Date(tmp.inicio_r));

				// Atribuindo a propriedade pública tarefa
				this.tarefa = tmp;
			},
			err => {
				// Esconde o carregando
				loading.dismiss();
				
				// Exibindo toast de erro
				const toast = this.toastController.create({
					message: 'Falha ao carregar tarefa',
					duration: 0,
					showCloseButton: true,
					closeButtonText: 'X'
				});
				toast.present();

				// Imprimindo erro no console
				console.warn(err);
			}
		)
	}

	onNavigateClick() {
		let options: LaunchNavigatorOptions ={
			transportMode : 'driving'
		}
		this.launchNavigator.navigate(this.tarefa.sse.endereco,options);
	}
}
