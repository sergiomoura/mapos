import { HttpClient } from '@angular/common/http';
import { Urls } from "../../helpers/urls";
import { Injectable } from '@angular/core';

@Injectable()
export class TarefasProvider {

	constructor(
		private http: HttpClient,
		private urls: Urls
	) {}

	get(){
		return this.http.get(this.urls.tarefas);
	}

	getCompleteById(id_tarefa:number, comFotos?:boolean){
		if(comFotos){
			return this.http.get(this.urls.tarefas+'/'+id_tarefa+'/all?comFotos=1');
		} else {
			return this.http.get(this.urls.tarefas+'/'+id_tarefa+'/all?comFotos=0');
		}
	}

	setIniciada(tarefa){
		return this.http.patch(this.urls.tarefas + '/' + tarefa.id + '/iniciada',tarefa);
	}

	setDivergente(tarefa){
		return this.http.patch(this.urls.tarefas + '/' + tarefa.id + '/divergente',tarefa);
	}

}
