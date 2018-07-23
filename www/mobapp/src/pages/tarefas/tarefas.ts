import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { TarefasProvider } from "../../providers/tarefas/tarefas";
import { Tarefa } from "../../_models/tarefa";
import { TarefaTabsPage } from "../tarefa-tabs/tarefa-tabs";

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
		private loadingConttroller: LoadingController
	) {	}

	public tarefas: Tarefa[];
	private tmpTarefas: any[];

	ionViewDidLoad() {
		this.getTarefas();
	}

	getTarefas(){
		
		// Criando e mostrando loading
		let loading = this.loadingConttroller.create();
		loading.setContent('Aguarde...').present();

		this.tarefasProvider.get().subscribe(
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
		this.navCtrl.push(TarefaTabsPage);
	}

}
