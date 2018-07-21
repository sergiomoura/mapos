import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class ProdutosService {

	constructor(
		private http:HttpClient
	) { }

	private url_get:string = 'api/produtos'

	get(){
		return this.http.get(this.url_get);
	}
}
