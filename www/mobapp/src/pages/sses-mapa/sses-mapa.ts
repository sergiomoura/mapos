import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController, Events, AlertOptions } from 'ionic-angular';
import { TarefasProvider } from '../../providers/tarefas/tarefas';
import { Storage } from '@ionic/storage';
import { Tarefa } from '../../_models/tarefa';
import { TarefaTabsPage } from '../tarefa-tabs/tarefa-tabs';
import { TarefasPage } from '../tarefas/tarefas';
@Component({
	selector: 'page-sses-mapa',
	templateUrl: 'sses-mapa.html',
})

export class SsesMapaPage {

	lat_inicial:number = -22.916405805627686;
	lng_inicial:number = -47.067499388564215;
	initial_zoom:number = 11;
	markerAtual:any;
	public tarefas: Tarefa[];
	private tmpTarefas: any[];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private tarefasProvider: TarefasProvider,
		private toastController: ToastController,
		private loadingConttroller: LoadingController,
		private alertController:AlertController,
		private storage:Storage,
		public events:Events
	) {
	}


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

		this.tarefasProvider.getDaEquipe().subscribe(
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
			tarefa.lat *= 1;
			tarefa.lng *= 1;
			tarefa.divergente = (tarefa.divergente == 1);
			tarefa.markerFile = 'marker-'
			switch (tarefa.status) {
				
				case '-1':
					tarefa.markerFile += 'divergente-'
					break;
				
				case '-10':
					tarefa.markerFile += 'indisponivel-'
					break;

				case '1':
					tarefa.markerFile += 'agendada-'
					break;

				case '2':
					tarefa.markerFile += 'executando-'
					break;

				case '3':
					tarefa.markerFile += 'finalizada-'
					break;
			
				default:
					console.warn('status de tarefa não previsto: '+tarefa.status);
					tarefa.markerFile += 'agendada-'
					break;
			}
			tarefa.markerFile += tarefa.urgencia + '.svg'
		}
		this.tarefas = this.tmpTarefas;
	}

	onMarkerClick(infowindow){
		// if (this.markerAtual) {
		// 	this.markerAtual.close();
		// }
		// this.markerAtual = infowindow;
	}

	onMapClick(evt){
		if (this.markerAtual) {
			this.markerAtual.close();
		}
		this.markerAtual = undefined;
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
					()=>{
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

	onListClick(){
		this.navCtrl.push(TarefasPage)
	}

}
