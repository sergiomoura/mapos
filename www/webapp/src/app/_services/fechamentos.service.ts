import { Injectable } from '@angular/core';
import { Fechamento } from "../_models/fechamento";
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class FechamentosService {
	
	private url_get:string = '/maxse/api/fechamentos';

	constructor(
		private http:HttpClient
	) { }

	get(){
		return this.http.get(this.url_get);
	}
}
