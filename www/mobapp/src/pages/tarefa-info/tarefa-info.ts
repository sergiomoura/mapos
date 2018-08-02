import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , ToastController, Events } from 'ionic-angular';
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

	ionViewDidLoad() {
	}

	ionViewWillEnter(){
		this.getTarefa()
	}

	getTarefa(){
		this.storage.get('tarefaAtual').then(
			(res) => {
				if(res){
					this.tarefa = res;
				}
			},
			err => {
				console.log('Não leu do storage');
			}
		)
	}

	onNavigateClick() {
		let options: LaunchNavigatorOptions ={
			transportMode : 'driving'
		}
		this.launchNavigator.navigate(this.tarefa.sse.endereco+', CAMPINAS, SÃO PAULO',options);
	}
}
