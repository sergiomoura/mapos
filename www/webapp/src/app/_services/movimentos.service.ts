import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NF } from '../_models/nf';
import { Movimento } from "../_models/movimento";

@Injectable({
	providedIn: 'root'
})
export class MovimentosService {

	constructor(
		private http:HttpClient
	) { }

	private url_get:string = 'api/estoque/movimentos';
	private url_update:string = 'api/estoque/movimentos';
	private url_create:string = 'api/estoque/movimentos';
	private url_delete:string = 'api/estoque/movimentos';
	private url_createNf:string = 'api/estoque/nfs';

	get(){
		return this.http.get(this.url_get)
	}

	delete(id_movimento:number){
		return this.http.delete(this.url_delete+'/'+id_movimento)
	}

	update(movimento:Movimento){
		return this.http.put(this.url_delete+'/'+movimento.id, movimento);
	}

	createNf(nf:NF){
		return this.http.post(this.url_createNf,nf);
	}
}
