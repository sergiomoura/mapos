import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from "@ionic/storage";
import { HomePage } from '../home/home';

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
		private storage:Storage
	) {}

	ionViewDidLoad() {
		
	}

	onEntrarClick(){
		this.login();
	}

	private login(){
		this.authProvider.login(this.data.u,this.data.p)
		.subscribe(
			res => {
				this.storage.set('currentUser',res);
				this.navCtrl.push(HomePage);
			},
			err => {
				console.warn(err);
			}
		)
	}
}
