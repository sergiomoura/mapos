import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';

@Injectable()

export class Urls {

	private LOCAL_SERVER:string = "/api"; // Vai usar o proxy para redirecionar para localhost:8000
	private REMOTE_SERVER:string = "http://maxse.servicos.ws/api";

	// Definindo todas as urls no constructor
	constructor(
		private device:Device
	){}


	// Definindo os GETTERS
	public get login() : string {return this.apiRoot() + '/login';}
	public get sses() : string {return this.apiRoot() + '/sses';}
	public get domasas() : string {return this.apiRoot() + '/domasas';}
	public get tiposDeServico() : string {return this.apiRoot() + '/tdss';}
	

	apiRoot():string{
		if(this.device.uuid == null){
			return this.LOCAL_SERVER;
		} else {
			return this.REMOTE_SERVER;
		}
	}

}