import { Injectable } from '@angular/core';
import { Device } from '@ionic-native/device';

@Injectable()

export class Urls {

	private LOCAL_SERVER:string = "/dev/api"; // Vai usar o proxy para redirecionar para localhost:8000
	//private REMOTE_SERVER:string = "http:/www.acasamax.com.br/maxse/api";
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
	public get tarefas() : string {return this.apiRoot() + '/tarefas';}
	public get produtos() : string {return this.apiRoot() + '/estoque/produtos/paraExecucao';}
	

	apiRoot():string{
		if(this.device.uuid == null){
			return this.LOCAL_SERVER;
		} else {
			return this.REMOTE_SERVER;
		}
	}

}