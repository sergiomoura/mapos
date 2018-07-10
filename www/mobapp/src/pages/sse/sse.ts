import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Domasa } from "../../_models/domasa";
import { TipoDeServico } from "../../_models/tipoDeServico";
import { GeralProvider } from "../../providers/geral/geral";
import { Storage } from "@ionic/storage";
import { SsesProvider } from '../../providers/sses/sses';
import { SSE } from '../../_models/sse';
import { LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-sse',
	templateUrl: 'sse.html',
})
export class SsePage {

	// Privates
	public domasas:Domasa[] = <Domasa[]>[];
	public tiposDeServico:TipoDeServico[] = <TipoDeServico[]>[];
	public sse:SSE = this.sseVazia();

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private provedorGeral: GeralProvider,
		private storage: Storage,
		private sseProvider: SsesProvider,
		private loadingConttroller: LoadingController,
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

		// Mostra carregando
		const loader = this.loadingConttroller.create({
			content: "Aguarde..."
		});
		loader.present();

		this.sseProvider.getById(id).subscribe(
			res => {
				loader.dismiss();
				this.sse = this.parseSseResponse(res);
			},
			err => {
				loader.dismiss();
				console.log(err);
			}
		)
	}

	parseSseResponse(res:any):SSE{

		// Parsing escalares
		res.dh_recebido = new Date(res.dh_recebido);
		res.dh_registrado = new Date(res.dh_registrado);
		res.id *= 1;
		res.urgente = (res.urgente == "1");
		
		res.tipoDeServico = this.tiposDeServico.find(
			(a) => {
				return res.id_tipo_de_servico == a.id;
			}
		)

		// Procurando a domasa do bairro
		let i:number = 0;
		let achou:boolean = false;
		while(i < this.domasas.length && !achou){
			res.bairro = this.domasas[i].bairros.find(
				(bairro) => {
					return bairro.id == res.id_bairro;
				}
			)
			if(res.bairro){achou = true}
			i++
		}

		return <SSE>res;

	}

	sseVazia():SSE{
		return <SSE>{
			id:0,
			endereco:'',
			numero:'',
			bairro:null,
			tipoDeServico:null,
			dh_registrado:null,
			dh_recebido:new Date(),
			dh_ini_exec:null,
			dh_fim_exec:null,
			urgente:false,
		}
	}

}
