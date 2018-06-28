import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
	private loginUrl:string = 'http://localhost:8000/login';

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
}
