import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NF } from '../_models/nf';

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

	createNf(nf:NF){
		return this.http.post(this.url_createNf,nf);
	}
}
