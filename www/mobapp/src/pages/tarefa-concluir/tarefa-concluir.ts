import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertOptions, Events, LoadingController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { TarefasProvider } from '../../providers/tarefas/tarefas';
import { AlertController } from 'ionic-angular';
import { Produto } from "../../_models/produto";
import { Storage } from '@ionic/storage';
import { format } from "date-fns";


@IonicPage()
@Component({
	selector: 'page-tarefa-concluir',
	templateUrl: 'tarefa-concluir.html',
})
export class TarefaConcluirPage {

	tarefa:any = {
		sse : {
			tipoDeServicoReal:undefined,
			tipoDeServicoPrev:undefined
		}
	};
	private tmpTarefa:any;
	produtos:Produto[];

	constructor(
		private storage:Storage,
		public navCtrl: NavController,
		public navParams: NavParams,
		private camera: Camera,
		private sanitizer:DomSanitizer,
		private tarefasProvider:TarefasProvider,
		private toastController: ToastController,
		private alertController:AlertController,
		public events:Events,
		private loadingConttroller:LoadingController
	) {
		this.events.subscribe('tarefa:carregada',
			() => {
				this.getTarefa();
			}
		)
	}

	ionViewDidLoad() { }

	ionViewWillEnter(){
		this.getTarefa();
	}

	getTarefa() {
		this.storage.get('tarefaAtual').then(
			(res) => {
				if (res) {
					// Transformando o tipo de res de Object para Any
					let tmp = <any>res;

					// Parsing dates
					tmp.final_p = (tmp.final_p == null ? null : new Date(tmp.final_p));
					tmp.final_r = (tmp.final_r == null ? format(new Date(), 'YYYY-MM-DDTHH:mm:ss') : new Date(tmp.final_r));
					tmp.inicio_p = (tmp.inicio_p == null ? null : new Date(tmp.inicio_p));
					tmp.inicio_r = (tmp.inicio_r == null ? null : tmp.inicio_r.replace(' ', 'T'));

					// Atribuindo a propriedade pública tarefa
					this.tarefa = tmp;
				}
			},
			err => {
				console.log('Não leu do storage');
			}
		)
	}

	onCameraClick() {
		const options: CameraOptions = {
			quality: 60,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then(
			(imageData) => {
				this.tarefa.fotos_fim.push(this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + imageData));
			},
			(err) => { }
		);
	}

	onSalvarClick(){
		let confirm = this.alertController.create(<AlertOptions>{
			title: 'Deseja registrar este serviço como concluído?',
			message: 'Essa ação não poderá ser desfeita.',
			buttons: [
				{
					text: 'Não',
					handler: () => { }
				},
				{
					text: 'Sim',
					handler: () => {
						this.salvarConclusao();
					}
				}
			]
		});

		confirm.present();
	}

	salvarConclusao(){
		
		// Mostra carregando
		let loading = this.loadingConttroller.create();
		loading.setContent('Aguarde...').present();

		this.tarefasProvider.setConcluida(this.tarefa).subscribe(
			res => {

				// Esconde carregando
				loading.dismiss();

				// Salvando tarefa no storage
				this.storage.set('tarefaAtual',this.tarefa).then(
					() => {

						// Disparando evento de tarefa concluida
						this.events.publish('tarefa:concluida');
						
						// Movendo para tab inicial
						this.navCtrl.parent.select(0);
					}
				)

				
			},
			err => {
				
				// Esconde carregando
				loading.dismiss();

				// Exibindo toast de erro
				const toast = this.toastController.create({
				message: 'Falha ao tentar concluir tarefa!',
				duration: 0,
				showCloseButton: true,
				closeButtonText: 'X'
				});
				toast.present();
			}
		)
	}
}