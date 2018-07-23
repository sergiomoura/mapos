import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';

@Injectable()

export class Urls {

	private LOCAL_SERVER:string = "/dev/api"; // Vai usar o proxy para redirecionar para localhost:8000
	// private REMOTE_SERVER:string = "https://maxse.websiteseguro.com/api";
	// private REMOTE_SERVER:string = "/prod/api"; // Vai usar o proxy para redirecionar para https://maxse.websiteseguro.com/api
	private REMOTE_SERVER:string = "/dev/api"; // enganando o celular para ele acessar a base local.

	constructor(
		private device:Device
	){}


	// Definindo os GETTERS
	public get login() : string {return this.apiRoot() + '/login';}
	public get refresh() : string {return this.apiRoot() + '/refresh';}
	public get sses() : string {return this.apiRoot() + '/sses';}
	public get domasas() : string {return this.apiRoot() + '/domasas';}
	public get tiposDeServico() : string {return this.apiRoot() + '/tdss';}
	

	apiRoot():string{
		console.log('Device UUID:' + this.device.uuid);
		if(this.device.uuid == null){
			console.log('Em servidor local ' + this.LOCAL_SERVER);
			return this.LOCAL_SERVER;
		} else {
			console.log('Em servidor remoto ' + this.REMOTE_SERVER);
			return this.REMOTE_SERVER;
		}
	}

}