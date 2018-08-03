import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
	providedIn: 'root'
})
export class DomasasService {

	private getUrl:string = '/maxse/api/domasas';

	constructor(
		private http:HttpClient
	) { }

	get(){
		return this.http.get(this.getUrl);
	}

	getFlat(){
		return this.http.get(this.getUrl+'/flat');
	}
}
