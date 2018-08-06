import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from "@ionic/storage";
import { SsesPage } from '../sses/sses';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { TarefasPage } from '../tarefas/tarefas';
import { SsesMapaPage } from '../sses-mapa/sses-mapa';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})

export class LoginPage {

	private data:{u:string,p:string,f:string} = {"u":'',"p":'',"f":'app'};

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private authProvider:AuthProvider,
		private storage:Storage,
		private toastController:ToastController,
		private loadingConttroller:LoadingController
	) {}

	ionViewDidLoad() {
		this.storage.remove('currentUser');
		this.storage.remove('tarefaAtual');
	}

	onEntrarClick(){
		this.login();
	}

	private login(){
		
		// Criando e mostrando loading
		let loading = this.loadingConttroller.create();
		loading.setContent('').present();

		this.authProvider.login(this.data.u,this.data.p,this.data.f)
		.subscribe(
			res => {
				// Esconde o loading
				loading.dismiss();

				// Guardando o current user no localStorage
				this.storage.set('currentUser',res).then(
					() => {
						let acessoApp:string = (<any>res).acessoApp;
						if( acessoApp == "1") {
							this.navCtrl.push(SsesPage);
							this.navCtrl.setRoot(SsesPage);
						} else if(acessoApp == "2") {
							this.navCtrl.push(SsesMapaPage);
							this.navCtrl.setRoot(SsesMapaPage);
						}
					}
				)
			},
			err => {

				// Esconde o loading
				loading.dismiss();

				// Criando o toast
				const toast = this.toastController.create({
					message: 'Login/Senha inválidos',
					duration: 0,
					showCloseButton: true,
					closeButtonText: 'X',
					dismissOnPageChange: true
				});

				// Apresentando toast de erro
				toast.present();

				// Imprimindo mensagem de erro
				console.warn(err.message);
			}
		)
	}
}
