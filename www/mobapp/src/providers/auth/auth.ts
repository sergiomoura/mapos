import { HttpClient } from '@angular/common/http';
import { Urls } from "../../helpers/urls";
import { Injectable } from '@angular/core';

@Injectable()

export class AuthProvider {

	constructor(
		public http: HttpClient,
		private urls: Urls
	) {}

	login(username:string,password:string,from:string) {
		let data:{username:string,password:string,from:string} = {username:username,password:password,from:from}
		return this.http.post(this.urls.login,data);
	}

}
