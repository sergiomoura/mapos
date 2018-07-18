import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
	providedIn: 'root'
})
export class TarefaService {

	constructor(
		private http:HttpClient
	) { }

	private url_get:string = '/api/tarefas';

	getById(id:number){
		return this.http.get(this.url_get+'/'+id);
	}
}
