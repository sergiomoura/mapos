import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../_models/usuario";
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})

export class UsuariosService {

	constructor(private http:HttpClient) { }

	// Definição de urls
	private url_getUsuarios:string = '/api/usuarios';
	private url_getById:string = '/api/usuarios/'
	private url_create:string = '/api/usuarios'
	private url_update:string = '/api/usuarios/'

	// Método que lista todos os usuários
	getUsuarios():Observable<Usuario[]> {
		return this.http.get<Usuario[]>(this.url_getUsuarios);
	}

	// Método que carrega um usuário a partir de sua id
	getById(idu):Observable<Usuario>{
		return this.http.get<Usuario>(this.url_getById + idu);
	}

	// Cria um novo usuário
	create(usuario:Usuario,senha:string):Observable<any>{
		let data:{usuario:Usuario,senha:string} = {usuario,senha};
		return this.http.post<any>(this.url_create,data);
	}

	// Atualiza um usuário existente
	update(usuario:Usuario,senha:string):Observable<any>{
		let data:{usuario:Usuario,senha:string} = {usuario:usuario,senha:senha};
		return this.http.put<any>(this.url_update+usuario.id,data);
	}
}