import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Domasa } from "../_models/domasa";
import { Observable } from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class DomasasService {

	private getUrl:string = '/api/domasas';

	constructor(
		private http:HttpClient
	) { }

	get(){
		return this.http.get(this.getUrl);
	}
}
