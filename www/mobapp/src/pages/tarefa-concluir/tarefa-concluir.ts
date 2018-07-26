import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertOptions } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { TarefasProvider } from '../../providers/tarefas/tarefas';
import { GeralProvider } from "../../providers/geral/geral";
import { LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Produto } from "../../_models/produto";

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
		public navCtrl: NavController,
		public navParams: NavParams,
		private camera: Camera,
		private sanitizer:DomSanitizer,
		private tarefasProvider:TarefasProvider,
		private toastController: ToastController,
		private loadingConttroller: LoadingController,
		private alertController:AlertController,
		private provider:GeralProvider,
	) {	}

	ionViewDidLoad() {
		this.getProdutos();
	}

	ionViewWillEnter(){
		this.getTarefa(<number>this.navParams.data.id_tarefa);
	}

	getProdutos(){
		this.provider.getProdutos().subscribe(
			res => {
				this.produtos = <Produto[]>res;
				this.parseTarefa();
			},
			err => {
				// Exibindo toast de erro
				const toast = this.toastController.create({
					message: 'Falha ao tentar carregar produtos',
					duration: 0,
					showCloseButton: true,
					closeButtonText: 'X'
				});
				toast.present();
			}
		)
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

				// Atribuindo resposta ao tmpTarefa
				this.tmpTarefa = res;

				// Chamando o parse tarefa
				this.parseTarefa();
				
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

	parseTarefa(){
		if(this.produtos && this.tmpTarefa){
			// Parsing dates
			this.tmpTarefa.final_p = (this.tmpTarefa.final_p == null ? null : new Date(this.tmpTarefa.final_p));
			this.tmpTarefa.final_r = (this.tmpTarefa.final_r == null ? null : this.tmpTarefa.final_r.replace(' ','T'));
			this.tmpTarefa.inicio_p = (this.tmpTarefa.inicio_p == null ? null : new Date(this.tmpTarefa.inicio_p));
			this.tmpTarefa.inicio_r = (this.tmpTarefa.inicio_r == null ? null : new Date(this.tmpTarefa.inicio_r));
	
			// Parsing divergencia
			this.tmpTarefa.divergente = this.tmpTarefa.divergente=='1';
	
			// Atribuindo a propriedade pública tarefa
			this.tarefa = this.tmpTarefa;
		}
	}

	

}
