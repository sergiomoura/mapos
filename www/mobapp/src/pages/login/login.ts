import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})
export class LoginPage {

	private data:{u:string,p:string} = {"u":'',"p":''};

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams
	) {}

	ionViewDidLoad() {
		
	}

	onEntrarClick(){
		this.login();
	}

	private login(){
		console.log("tentando fazer login!");
	}
}
