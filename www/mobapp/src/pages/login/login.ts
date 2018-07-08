import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from '../../providers/auth/auth';
import { Storage } from "@ionic/storage";
import { HomePage } from '../home/home';
import { ToastController } from 'ionic-angular';
import { Device } from '@ionic-native/device';


interface deviceInterface {
	id?: string,
	model?: string,
	cordova?: string,
	platform?: string,
	version?: string,
	manufacturer?: string,
	serial?: string,
	isVirtual?: boolean,
};

@Component({
	selector: 'page-login',
	templateUrl: 'login.html',
})

export class LoginPage {

	private data:{u:string,p:string} = {"u":'',"p":''};
	public dInfo:deviceInterface = {
		cordova : '',
		id : '',
		isVirtual : undefined,
		manufacturer : '',
		model : '',
		platform : '',
		serial : '',
		version : ''
	};

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private authProvider:AuthProvider,
		private storage:Storage,
		private toastController:ToastController,
		private device:Device
	) {}

	ionViewDidLoad() {
	}

	onEntrarClick(){
		this.getDeviceInfo();
		//this.login();
		
	}

	private d:Device;

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
			},
			err => {
				// Apresentando toast de erro
				toast.present();
			}
		)
	}

	getDeviceInfo(){
		console.log("Recuperando dados do dispositivo");
		this.dInfo.cordova = this.device.cordova;
		this.dInfo.id = this.device.uuid;
		this.dInfo.isVirtual = this.device.isVirtual;
		this.dInfo.manufacturer = this.device.manufacturer;
		this.dInfo.model = this.device.model;
		this.dInfo.platform = this.device.platform;
		this.dInfo.serial = this.device.serial;
		this.dInfo.version = this.device.version;
	}
}
