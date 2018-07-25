import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TarefasProvider } from '../../providers/tarefas/tarefas';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-tarefa-iniciar',
	templateUrl: 'tarefa-iniciar.html',
})
export class TarefaIniciarPage {

	tarefa:any = {};

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private camera: Camera,
		private sanitizer:DomSanitizer,
		private tarefasProvider:TarefasProvider,
		private toastController: ToastController,
		private loadingConttroller: LoadingController
	) {	}

	ionViewDidLoad() {
		this.getTarefa(<number>this.navParams.data.id_tarefa);
	}

	getTarefa(id_tarefa:number){
		// Criando e mostrando loading
		let loading = this.loadingConttroller.create();
		loading.setContent('Aguarde...').present();

		// Fazendo requisição para carregar tarefa
		this.tarefasProvider.getCompleteById(this.navParams.data.id_tarefa, true)
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

	onCameraClick(){
		const options: CameraOptions = {
			quality: 60,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}
		  
		this.camera.getPicture(options).then(
			(imageData) => {
				this.tarefa.fotos.push(this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + imageData));
			},
			(err) => {}
		);
	}
}
