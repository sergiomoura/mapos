import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';

@Injectable()

export class Urls {

	private LOCAL_SERVER:string = "/api"; // Vai usar o proxy para redirecionar para localhost:8000
	private REMOTE_SERVER:string = "http://maxse.servicos.ws/api";

	private _login:string;
	
	// Definindo todas as urls no constructor
	constructor(
		private device:Device
	){
		this._login = this.apiRoot() + '/login';
	}


	// Definindo os GETTERS
	public get login() : string {
		return this._login;
	}
	

	apiRoot():string{
		if(this.device.uuid == null){
			return this.LOCAL_SERVER;
		} else {
			return this.REMOTE_SERVER;
		}
	}

}