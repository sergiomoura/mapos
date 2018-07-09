import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { SsesProvider } from "../../providers/sses/sses";
import { ToastController } from 'ionic-angular';
import { SsePage } from "../sse/sse";
import { SSE } from "../../_models/sse";

@Component({
	selector: 'page-sses',
	templateUrl: 'sses.html',
})
export class SsesPage {

	// Privadas
	sses:SSE[] = <SSE[]>[];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private loadingConttroller: LoadingController,
		private toastController:ToastController,
		private ssesProvider: SsesProvider
	) {}

	ionViewDidLoad() {
		this.getSSEs();
	}

	onSSEClick(id){
		this.navCtrl.push(SsePage);	
	}

	getSSEs(){

		// Mostra carregando
		const loader = this.loadingConttroller.create({
			content: "Aguarde..."
		});
		loader.present();

		this.ssesProvider.getVisibles().subscribe(
			res => {
				this.sses = <SSE[]>res;
				loader.dismiss();
			},
			err => {
				// Exibindo toast de erro
				const toast = this.toastController.create({
					message: 'Falha ao tentar carregar SSEs',
					duration: 0,
					showCloseButton: true,
					closeButtonText: 'X'
				});
				toast.present();

				// Imprimindo erro no console
				console.warn(err);

				// Esconde carregando
				loader.dismiss();
			}
		)
	}
}