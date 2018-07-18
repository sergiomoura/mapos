import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SSE } from '../_models/sse';

@Injectable({
	providedIn: 'root'
})
export class SsesService {

	constructor(
		private http:HttpClient
	) {}
	
	// Definições de urls
	private url_getSses:string = 'api/sses';
	private url_updateSses:string = 'api/sses'

	// Método que carrega todas as SSEs
	getAll():Observable<SSE[]>{
		return this.http.get<SSE[]>(this.url_getSses);
	}

	// Método que carrega sse
	getById(id,comFoto:boolean=true):Observable<SSE>{
		if(comFoto){
			return this.http.get<SSE>(this.url_getSses+'/'+id);
		} else {
			return this.http.get<SSE>(this.url_getSses+'/'+id+'?comFoto=0')
		}
	}

	// Método que atualiza uma sse
	update(sse:SSE){
		return this.http.put(this.url_updateSses + '/' + sse.id,sse);
	}
}
