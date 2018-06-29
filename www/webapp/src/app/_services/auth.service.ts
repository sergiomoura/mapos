import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

	private loginUrl:string = 'http://localhost:8000/login';
	private refreshUrl:string = 'http://localhost:8000/refresh';

	constructor(private http:HttpClient) { }
	
	// Método que realiza o login
	login(username: string, password: string) {
		return this.http.post<any>(this.loginUrl, { username: username, password: password })
		.subscribe(response => {
			// login successful if there's a jwt token in the response
			if (response && response.token) {
				// store username and jwt token in local storage to keep user logged in between page refreshes
				localStorage.setItem('currentUser', JSON.stringify(response));
			}
		});
	}

	// Método que realiza o logout
	logout() {
		localStorage.removeItem('currentUser');
	}

	// Método que verifica se está logado
	isLogged():boolean{
		if(localStorage.getItem('currentUser')){
			return true;
		} else {
			return false;
		}
	}

	// Método que atualiza o token e a sua validade
	refresh() {
		this.http.get<any>(this.refreshUrl)
		.subscribe(response => {
			// login successful if there's a jwt token in the response
			if (response && response.novoToken) {
				// Recupera currentUser da localstorage
				let currentUser = JSON.parse(localStorage.getItem('currentUser'));

				// Altera o valor do token do currentUser
				currentUser.token = response.novoToken;

				// Guarda currentUser com novo token na localStorage
				localStorage.setItem('currentUser', JSON.stringify(currentUser));
			}
		});
	}
}
