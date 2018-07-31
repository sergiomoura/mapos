import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TiposDeServicoService {

  private getUrl:string = '/maxse/api/tdss';

	constructor(
		private http:HttpClient
	) { }

	get(){
		return this.http.get(this.getUrl);
	}
}
