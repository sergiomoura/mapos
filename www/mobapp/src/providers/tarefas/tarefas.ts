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

}
