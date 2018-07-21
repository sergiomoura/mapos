import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

	get(){
		return this.http.get(this.url_get)
	}
}
