import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SSE } from '../_models/sse';
import { Busca } from "../_models/busca";
import { format } from "date-fns";

@Injectable({
	providedIn: 'root'
})
export class SsesService {

	constructor(
		private http:HttpClient
	) {}
	
	// Definições de urls
	private url_getSses:string = '/maxse/api/sses';
	private url_getSsesPendentes:string = '/maxse/api/sses/pendentes';
	private url_updateSses:string = '/maxse/api/sses';
	private url_createSses:string = '/maxse/api/sses';
	private url_updateSseImage:string = '/maxse/api/sses/imagem';

	// Método que carrega todas as SSEs
	getAll(busca?:Busca):Observable<SSE[]>{
		
		// Definindo queryString
		let queryString:string = '';

		if(busca){
			
			// Pegando só os ids das equipes
			let ideqs:number[] = busca.equipes.map(
				(equipe) => {
					return equipe.id;
				}
			)
	
			// Definindo partes da queryString
			let parts:string[] = [];
			for (const key in busca) {
				if (busca.hasOwnProperty(key)) {
					if(busca[key] instanceof Date){
						parts.push(key + "=" + format(busca[key], 'YYYY-MM-DD'));
					} else if(key == "equipes"){
						parts.push("equipes=" + ideqs.toString());
					} else if(busca[key]!= undefined){
						parts.push(key + "=" + busca[key].toString());
					}
				}
			}

			// Juntando partes da queryString
			queryString = '?' + parts.join('&');
		}

		return this.http.get<SSE[]>(this.url_getSses + queryString);
	}

	// Retorna SSEs pendentes
	getPendentes():Observable<SSE[]>{
		return this.http.get<SSE[]>(this.url_getSsesPendentes);
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

	// Método que atualiza as coordendadas de uma sse
	updateCoordenadas(lat:number,lng:number,id_sse:number){
		let data:{lat:number,lng:number} = {'lat':lat,'lng':lng};
		return this.http.put(this.url_updateSses + '/' + id_sse + '/coordenadas',data);
	}

	// Método que cria uma sse
	create(sse:SSE){
		return this.http.post(this.url_createSses,sse);
	}

	// Marca uma SSE como finalizada
	setFinalizada(id_sse:number,tipoDeFinalizacao:string,data_devolucao:Date, motivo_parcial:string):Observable<any>{
		let dados:{
			'tipo':string,
			'data_devolucao':string,
			'motivo_parcial':string
		} = {
			'tipo':tipoDeFinalizacao,
			'data_devolucao':format(data_devolucao,'YYYY-MM-DD'),
			'motivo_parcial':motivo_parcial
		}
		return this.http.patch(this.url_getSses + '/' + id_sse + '/setFinalizada',dados);
	}

	// Cancela início de sse
	cancelarInicio(id_sse){
		return this.http.patch(this.url_getSses + '/' + id_sse + '/cancelarInicio','');
	}

	// Marca uma SSE como retrabalho
	setRetrabalho(id_sse:number):Observable<any>{
		return this.http.patch(this.url_getSses + '/' + id_sse + '/setRetrabalho','');
	}

	// Finaliza o retrabalho de uma SSE
	finalizarRetrabalho(id_sse):Observable<any>{
		return this.http.patch(this.url_getSses + '/' + id_sse + '/finalizaRetrabalho','');
	}

	// Marca uma SSE como Cancelada
	setCancelada(id_sse:number):Observable<any>{
		return this.http.patch(this.url_getSses + '/' + id_sse + '/setCancelada','');
	}

	// Reabrir uma SSE finalizada
	reabrir(id_sse:number):Observable<any>{
		return this.http.patch(this.url_getSses + '/' + id_sse + '/reabrir','');
	}

	setAutorizada(id_sse:number, autorizadaPor:string){
		let dados:{id_sse:number,autorizadaPor:string} = {id_sse:id_sse,autorizadaPor:autorizadaPor};
		return this.http.patch(this.url_getSses + '/' + id_sse + '/setAutorizada',dados);
	}

	// Atualiza imagem
	updateImage(id_sse:number, fd:FormData){
		return this.http.post(this.url_updateSses + '/' + id_sse + '/imagem',fd);
	}
}
