import { Component } from '@angular/core';
import {
			NavController,
			NavParams,
			AlertOptions,
			Events,
			ToastController,
			LoadingController,
			AlertController
		} from 'ionic-angular';

import { Tarefa } from "../../_models/tarefa";
import { TarefasProvider } from "../../providers/tarefas/tarefas";
import { TarefaTabsPage } from "../../pages/tarefa-tabs/tarefa-tabs";

import { Storage } from "@ionic/storage";

@Component({
	selector: 'page-tarefas',
	templateUrl: 'tarefas.html',
})
export class TarefasPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private tarefasProvider: TarefasProvider,
		private toastController: ToastController,
		private loadingConttroller: LoadingController,
		private alertController:AlertController,
		private storage:Storage,
		public events:Events
	) {	}

	public tarefas: Tarefa[];
	private tmpTarefas: any[];

	ionViewDidLoad() {
		
	}

	ionViewWillEnter(){
		this.getTarefas();
		this.storage.remove('tarefaAtual');
	}

	getTarefas(){
		
		// Criando e mostrando loading
		let loading = this.loadingConttroller.create();
		loading.setContent('Aguarde...').present();

		this.tarefasProvider.getDoDia().subscribe(
			res => {

				// Escondendo loading
				loading.dismiss();

				this.tmpTarefas = <any[]>res;
				this.parseTarefas()
			},
			err => {
				// Escondendo loading
				loading.dismiss();
				
				// Exibindo toast de erro
				const toast = this.toastController.create({
				message: 'Falha ao carregar tarefas',
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

	private parseTarefas(){
		for (let i = 0; i < this.tmpTarefas.length; i++) {
			const tarefa = this.tmpTarefas[i];
			tarefa.id = +tarefa.id;
			tarefa.inicio_p = (tarefa.inicio_p == null ? null : new Date(tarefa.inicio_p));
			tarefa.inicio_r = (tarefa.inicio_r == null ? null : new Date(tarefa.inicio_r));
			tarefa.final_p = (tarefa.final_p == null ? null : new Date(tarefa.final_p))	;
			tarefa.final_r = (tarefa.final_r == null ? null : new Date(tarefa.final_r))	;
			tarefa.divergente = (tarefa.divergente == 1);
		}
		this.tarefas = this.tmpTarefas;
	}

	onTarefaClick(id_tarefa:number){

		// Mostra carregando
		let loading = this.loadingConttroller.create();
		loading.setContent('Aguarde...').present();

		this.tarefasProvider.getCompleteById(id_tarefa,true).subscribe(
			res => {
				this.storage.set('tarefaAtual',res).then(
					()=>{

						// Esconde carregando
						loading.dismiss();

						// Disparando evento que a tarefa foi carregada e salva no cel
						this.events.publish('tarefa:carregada');

						// Indo para página de tabs
						this.navCtrl.push(TarefaTabsPage);
					},
					(y)=>{
						// Esconde carregando
						loading.dismiss();

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
				if(err.status == 410) {

					// A tarefa não autorizada!

					// Criando alerta
					let confirm = this.alertController.create(<AlertOptions>{
						title: 'Este serviço não está autorizado para sua equipe.',
						message: 'Provavelmente ele foi delegado a outra equipe ou cancelado.',
						buttons: [
							{
								text: 'Ok',
								handler: () => { }
							}
						]
					});
					
					// Exibindo alerta
					confirm.present();

					// Removendo tarefa da lista
					this.tarefas.splice(
						this.tarefas.findIndex(
							(tf)=>{
								return tf.id == id_tarefa;
							}
						),
						1
					)
				} else {
					// Exibindo toast de erro
					const toast = this.toastController.create({
						message: 'Falha ao tentar carregar o serviço. Tente novamente',
						duration: 0,
						showCloseButton: true,
						closeButtonText: 'X',
						dismissOnPageChange:true
					});
					toast.present();
				}
			}
		)
	}

	onRefreshClick(){
		this.getTarefas();
	}

}
