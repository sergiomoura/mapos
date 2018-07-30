import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Tarefa } from "../_models/tarefa";

@Injectable({
	providedIn: 'root'
})
export class TarefaService {

	constructor(
		private http:HttpClient
	) { }

	private url_get:string = '/api/tarefas';
	private url_put:string = '/api/tarefas';
	private url_post:string = '/api/tarefas';
	private url_delete:string = '/api/tarefas';

	getById(id:number){
		return this.http.get(this.url_get+'/'+id);
	}

	update(tarefa:Tarefa){
		return this.http.put(this.url_put+'/'+tarefa.id,tarefa)
	}

	create(tarefa:Tarefa){
		return this.http.post(this.url_post,tarefa);
	}

	remove(id:number) {
		return this.http.delete(this.url_delete+'/'+id);
	}
}
