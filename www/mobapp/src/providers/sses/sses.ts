import { HttpClient } from '@angular/common/http';
import { Urls } from "../../helpers/urls";
import { Injectable } from '@angular/core';

@Injectable()
export class SsesProvider {

	constructor(
		public http: HttpClient,
		private urls: Urls
	) {}

	getVisibles(){
		return this.http.get(this.urls.sses);
	}

	getById(id:number){
		return this.http.get(this.urls.sses+'/'+id);
	}
}