import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController } from 'ionic-angular';
import { TarefasProvider } from '../../providers/tarefas/tarefas';
import { LoadingController } from 'ionic-angular';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';
import { Storage } from '@ionic/storage';

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
		private launchNavigator: LaunchNavigator,
		private storage:Storage
	) {	}

	ionViewDidLoad() {
	}

	ionViewWillEnter(){
		this.getTarefa()
	}

	getTarefa(){
		let intervalo = window.setInterval(
			() => {
				this.storage.get('tarefaAtual').then(
					(res) => {
						if(res){
							window.clearInterval(intervalo);
							this.tarefa = res;
						}
					},
					err => {
						console.log('Não leu do storage');
					}
				)
			},
			200
		)
	}

	onNavigateClick() {
		let options: LaunchNavigatorOptions ={
			transportMode : 'driving'
		}
		this.launchNavigator.navigate(this.tarefa.sse.endereco,options);
	}
}
