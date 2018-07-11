import { HttpClient } from '@angular/common/http';
import { Urls } from "../../helpers/urls";
import { Injectable } from '@angular/core';
import { SSE } from '../../_models/sse';

@Injectable()
export class SsesProvider {

	constructor(
		private http: HttpClient,
		private urls: Urls
	) {}

	getVisibles(){
		return this.http.get(this.urls.sses);
	}

	getById(id:number){
		return this.http.get(this.urls.sses+'/'+id);
	}

	update(sse:SSE){
		return this.http.put(this.urls.sses+'/'+sse.id,sse);
	}

	insert(sse:SSE){
		return this.http.post(this.urls.sses,sse);
	}
}