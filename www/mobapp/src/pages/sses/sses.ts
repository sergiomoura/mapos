import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { SsesProvider } from "../../providers/sses/sses";

@Component({
	selector: 'page-sses',
	templateUrl: 'sses.html',
})
export class SsesPage {

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private loadingConttroller: LoadingController,
		private ssesProvider: SsesProvider
	) {}

	ionViewDidLoad() {
		this.getSSEs();
	}

	onItemClick(){
		console.log("aasdasd");
	}

	getSSEs(){

		// Mostra carregando
		const loader = this.loadingConttroller.create({
			content: "Aguarde..."
		});
		loader.present();

		this.ssesProvider.getVisibles().subscribe(
			res => {
				console.log(res);
				loader.dismiss();
			},
			err => {
				console.log(err);
				loader.dismiss();
			}
		)
	}
}