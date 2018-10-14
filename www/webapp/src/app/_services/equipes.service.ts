import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TipoDeEquipe } from "../_models/tipoDeEquipe";
import { Equipe } from "../_models/equipe";
import { Observable, of, Subscription } from 'rxjs';
import { TipoDeMembroDeEquipe } from '../_models/tipoDeMembroDeEquipe';

@Injectable({
	providedIn: 'root'
})

export class EquipesService {

	constructor(private http:HttpClient) { }

	// Definição de urls
	private url_getTipos:string = '/maxse/api/tdes';
	private url_getEquipes:string = '/maxse/api/equipes';
	private url_getEquipeById:string = '/maxse/api/equipes/';
	private url_create:string = '/maxse/api/equipes';
	private url_update:string = '/maxse/api/equipes/';
	private url_getTiposDeMembro:string = '/maxse/api/tdms'
	
	// Métoto que carrega todos os tipos de equipe
	getTiposDeEquipe():Observable<TipoDeEquipe[]> {

		// Definindo chave de tipos de equipe na localStorage
		let chave:string = 'tiposDeEquipe';

		// Tentando carregar tipo de equipe do localStorage
		let str:string = localStorage.getItem(chave);

		// Verificando se consegui pegar do localStorage
		if(str){

			// conseguiu pegar do localStorage retornando observável
			return of<TipoDeEquipe[]>(JSON.parse(str));

		} else {

			// Criando observável
			let obs:Observable<TipoDeEquipe[]> = this.http.get<TipoDeEquipe[]>(this.url_getTipos);

			// Subscrevendo
			let s:Subscription = obs.subscribe(
				(res) => {
					
					// Guardando a resposta no localStorage
					localStorage.setItem(chave,JSON.stringify(res));

					// Unsubscribing
					s.unsubscribe();

				}
			)

			// Retornando observável
			return obs;
		}
		
	}

	// Métoto que carrega todos os tipos de membros
	getTiposDeMembro():Observable<TipoDeMembroDeEquipe[]>{
		return this.http.get<TipoDeMembroDeEquipe[]>(this.url_getTiposDeMembro);
	}

	// Recupera equipes do servidor
	private getEquipesFromServer():Observable<Equipe[]>{
		
		// Criando observável
		let obs:Observable<Equipe[]> = this.http.get<Equipe[]>(this.url_getEquipes);

		// Criando subscription
		let s:Subscription = obs.subscribe(
			(res) => {

				// Setando equipes na localStorage
				localStorage.setItem('equipes',JSON.stringify(res));

				// Unsubscribing
				s.unsubscribe();

			}
		)

		// Retornando o observável
		return obs;
	}

	// Método que carrega todas as equipes
	getEquipes(force?:boolean):Observable<Equipe[]> {

		// Verificando se force é true
		if(force) {

			return this.getEquipesFromServer();

		} else {

			// Tentando levantar as equipes no localStorage
			let str:string = localStorage.getItem('equipes');

			if(str){

				// Retornando observável de objeto
				return of<Equipe[]>(JSON.parse(str));

			} else {
				
				// Retornando o observável de requisição do servidor
				return this.getEquipesFromServer();

			}

		}
		
	}

	// Método que carrega uma equipe pelo id
	getEquipeById(id):Observable<any>{
		return this.http.get<any>(this.url_getEquipeById+id);
	}

	// Método que cria uma nova equipe
	create(equipe:Equipe){
		return this.http.post<any>(this.url_create,equipe);
	}

	// Método que atualiza uma equipe existente
	update(data:any){
		return this.http.put<any>(this.url_update+data.equipe.id,data);
	}
}