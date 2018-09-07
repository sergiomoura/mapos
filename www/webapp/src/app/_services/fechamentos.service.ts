import { Injectable } from '@angular/core';
import { FechamentoData } from "../_models/fechamento";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { SSE } from '../_models/sse';


@Injectable({
	providedIn: 'root'
})
export class FechamentosService {
	
	private url_get:string = '/maxse/api/fechamentos';
	private url_getSses:string = '/maxse/api/sses'
	private url_move:string = '/maxse/api/fechamentos/';
	
	constructor(
		private http:HttpClient
	) { }

	get():Observable<FechamentoData[]>{
		return this.http.get<FechamentoData[]>(this.url_get);
	}

	getSses(id_fechamento:number):Observable<SSE[]>{
		// Definindo queryString
		let queryString:string = '?id_fechamento=' + id_fechamento;
		
		return this.http.get<SSE[]>(this.url_getSses + queryString);
	}

	moverParaProximoFechamento(ids_sse:number[],id_fechamentoAtual:number):Observable<any>{
		let data:any = {ids_sse:ids_sse,id_fechamento:id_fechamentoAtual};
		return this.http.patch(this.url_move + 'mvNext',data);
	}

	moverParaFechamentoAnterior(ids_sse:number[],id_fechamentoAtual:number):Observable<any>{
		let data:any = {ids_sse:ids_sse,id_fechamento:id_fechamentoAtual};
		return this.http.patch(this.url_move + 'mvPrev',data);
	}

	encerrar(id_fechamento:number):Observable<any>{
		return this.http.patch(this.url_get + '/' + id_fechamento + '/encerrar', null );
	}

	reabrir(id_fechamento:number):Observable<any>{
		return this.http.patch(this.url_get + '/' + id_fechamento + '/reabrir', null );
	}
}
