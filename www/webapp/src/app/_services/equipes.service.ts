import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TipoDeEquipe } from "../_models/tipoDeEquipe";
import { Equipe } from "../_models/equipe";
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class EquipesService {

	constructor(private http:HttpClient) { }

	// Definição de urls
	private url_getTipos:string = 'http://localhost:8000/tdes';
	private url_getEquipes:string = 'http://localhost:8000/equipes';
	private url_getEquipeById:string = 'http://localhost:8000/equipes/';
	private url_create:string = 'http://localhost:8000/equipes';
	private url_update:string = 'http://localhost:8000/equipes/';

	// Métoto que carrega todos os tipos de equipe
	getTiposDeEquipe():Observable<TipoDeEquipe[]> {
		return this.http.get<TipoDeEquipe[]>(this.url_getTipos);
	}

	// Método que carrega todas as equipes
	getEquipes():Observable<Equipe[]> {
		return this.http.get<Equipe[]>(this.url_getEquipes);
	}

	// Método que carrega uma equipe pelo id
	getEquipeById(id:number):Observable<Equipe>{
		return this.http.get<Equipe>(this.url_getEquipeById);
	}

	// Método que cria uma nova equipe
	create(equipe:Equipe){
		return this.http.post<any>(this.url_create,equipe);
	}

	// Método que atualiza uma equipe existente
	update(equipe:Equipe){
		return this.http.put<any>(this.url_update,equipe);
	}
}