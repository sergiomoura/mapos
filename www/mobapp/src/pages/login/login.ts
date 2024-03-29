import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, TextInput } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from "@ionic/storage";
import { SsesPage } from '../sses/sses';
import { ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { SsesMapaPage } from '../sses-mapa/sses-mapa';

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})

export class LoginPage {

	private data:{u:string,p:string,f:string} = {"u":'',"p":'',"f":'app'};
	@ViewChild('senha') inputSenha:TextInput;

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

		this.storage.get('ultimo_login').then(
			(login:string) => {
				this.data.u = login;
			}
		)
	}

	onLoginEnterPress(keyCode:number){
		if(keyCode == 13){
			this.inputSenha.setFocus();
		}
	}

	onPassEnterPress(keyCode:number){
		if(keyCode == 13){
			this.login();
		}
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
							this.navCtrl.setRoot(SsesPage);
							this.navCtrl.push(SsesPage);
						} else if(acessoApp == "2") {
							this.navCtrl.setRoot(SsesMapaPage);
							this.navCtrl.push(SsesMapaPage);
						}
					}
				)
				
				// Guardando o login de sucesso
				this.storage.set('ultimo_login',this.data.u);
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
