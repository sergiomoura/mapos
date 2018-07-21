import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Produto } from '../_models/produto';

@Injectable({
	providedIn: 'root'
})
export class ProdutosService {

	constructor(
		private http:HttpClient
	) { }

	private url_get:string = 'api/estoque/produtos';
	private url_update:string = 'api/estoque/produtos';
	private url_create:string = 'api/estoque/produtos';
	private url_delete:string = 'api/estoque/produtos';
	
	get(){
		return this.http.get(this.url_get);
	}

	update(produto:Produto){
		return this.http.put(this.url_update + '/' + produto.id,produto)
	}

	create(produto:Produto){
		return this.http.post(this.url_create,produto);
	}

	delete(id:number){
		return this.http.delete(this.url_delete+'/'+id);
	}
}
