import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from "@ionic/storage";
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	private data:{u:string,p:string} = {"u":'',"p":''};

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private authProvider:AuthProvider,
		private storage:Storage,
		private toastController:ToastController
	) {}

	ionViewDidLoad() {
		
	}

	onEntrarClick(){
		this.login();
	}

	private login(){
		
		const toast = this.toastController.create({
			message: 'Login/Senha inválidos',
			duration: 0,
			showCloseButton: true,
			closeButtonText: 'X',
			dismissOnPageChange: true
		});

		this.authProvider.login(this.data.u,this.data.p)
		.subscribe(
			res => {
				this.storage.set('currentUser',res);
				this.navCtrl.push(HomePage);
				toast.
			},
			err => {
				// Apresentando toast de erro
				toast.present();
			}
		)
	}
}
