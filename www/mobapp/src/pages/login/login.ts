import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from "@ionic/storage";
import { SsesPage } from '../sses/sses';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';

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
					() => { this.navCtrl.push(SsesPage);}
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
