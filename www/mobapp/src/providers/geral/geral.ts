import { HttpClient } from '@angular/common/http';
import { Urls } from "../../helpers/urls";
import { Injectable } from '@angular/core';

@Injectable()
export class GeralProvider {

	constructor(
		public http: HttpClient,
		private urls:Urls
	) {}

	getDomasas() {
		return this.http.get(this.urls.domasas);
	}
	
	getTiposDeServico() {
		return this.http.get(this.urls.tiposDeServico);
	}

	getProdutos() {
		return this.http.get(this.urls.produtos);
	}
}