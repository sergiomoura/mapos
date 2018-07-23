import { HttpClient } from '@angular/common/http';
import { Urls } from "../../helpers/urls";
import { Injectable } from '@angular/core';
import { Storage } from "@ionic/storage";

@Injectable()

export class AuthProvider {

	constructor(
		public http: HttpClient,
		private urls: Urls,
		private storage:Storage
	) {}

	login(username:string,password:string,from:string) {
		let data:{username:string,password:string,from:string} = {username:username,password:password,from:from}
		return this.http.post(this.urls.login,data);
	}

	// Método que atualiza o token e a sua validade
	refresh() {
		this.http.get<any>(this.urls.refresh)
		.subscribe(response => {
			if (response && response.novoToken) {
				this.storage.get('currentUser').then(
					(currentUser) => {
						currentUser.token = response.novoToken;
						this.storage.set('currentUser',currentUser);
					}
				)
			}
		});
	}

}
