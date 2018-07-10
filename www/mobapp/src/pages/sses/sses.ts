import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { SsesProvider } from "../../providers/sses/sses";
import { ToastController } from 'ionic-angular';
import { SsePage } from "../sse/sse";
import { SSE } from "../../_models/sse";
import { GeralProvider } from "../../providers/geral/geral";
import { Storage } from "@ionic/storage";

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
		private ssesProvider: SsesProvider,
		private geralProvider: GeralProvider,
		private storage: Storage
	) {}

	ionViewDidLoad() {
		this.getSSEs();
		this.getDomasas();
		this.getTiposDeServico();
	}

	onSSEClick(id){
		this.navCtrl.push(SsePage,{idSse:id});	
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

	// função que carrega domasas e bairros e armazena no storage
	getDomasas(){
		this.storage.get('domasas').then(
			domasas => {
				if(domasas == null){
					this.geralProvider.getDomasas().subscribe(
						domasas => {
							this.storage.set('domasas',domasas);
						},
						err => {
							// Criando o toast
							const toast = this.toastController.create({
								message: 'Não carregou DOMASAS',
								duration: 0,
								showCloseButton: true,
								closeButtonText: 'X',
								dismissOnPageChange: true
							});

							// Apresentando toast de erro
							toast.present();
						}
					)
				}
			},
			err => {
				// Criando o toast
				const toast = this.toastController.create({
					message: 'Não carregou DOMASAS',
					duration: 0,
					showCloseButton: true,
					closeButtonText: 'X',
					dismissOnPageChange: true
				});

				// Apresentando toast de erro
				toast.present();
			}
		)
	}

	// função para carregar tipos de serviçoes e armazenar no storage
	getTiposDeServico(){
		this.storage.get('tiposDeServico').then(
			tiposDeServico => {
				if(tiposDeServico == null){
					this.geralProvider.getTiposDeServico().subscribe(
						tiposDeServico => {
							this.storage.set('tiposDeServico',tiposDeServico);
						},
						err => {
							// Criando o toast
							const toast = this.toastController.create({
								message: 'Não carregou tipos de serviço',
								duration: 0,
								showCloseButton: true,
								closeButtonText: 'X',
								dismissOnPageChange: true
							});

							// Apresentando toast de erro
							toast.present();
						}
					)
				}
			},
			err => {
				// Criando o toast
				const toast = this.toastController.create({
					message: 'Não carregou tipos de serviço',
					duration: 0,
					showCloseButton: true,
					closeButtonText: 'X',
					dismissOnPageChange: true
				});

				// Apresentando toast de erro
				toast.present();
			}
		)
	}
}