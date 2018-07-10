import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Domasa } from "../../_models/domasa";
import { TipoDeServico } from "../../_models/tipoDeServico";
import { GeralProvider } from "../../providers/geral/geral";
import { Storage } from "@ionic/storage";
import { SsesProvider } from '../../providers/sses/sses';

@IonicPage()
@Component({
	selector: 'page-sse',
	templateUrl: 'sse.html',
})
export class SsePage {

	// Privates
	public domasas:Domasa[] = <Domasa[]>[];
	public tiposDeServico:TipoDeServico[] = <TipoDeServico[]>[];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private provedorGeral: GeralProvider,
		private storage: Storage,
		private sseProvider: SsesProvider
	) {}

	ionViewDidLoad() {
		// Carregando DOMASAS
		this.storage.get('domasas').then(
			domasas => {
				this.domasas = <Domasa[]>domasas;
			}
		)

		// Carregando tipos de serviços
		this.storage.get('tiposDeServico').then(
			tdss => {
				this.tiposDeServico = <TipoDeServico[]>tdss;
			}
		)

		// Carregando a Sse da base
		this.getSse(this.navParams.get('idSse'));
	}

	getSse(id) {
		//this.sseProvider.getById(id)
	}

}
