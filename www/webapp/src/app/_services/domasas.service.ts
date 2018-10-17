import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Bairro } from '../_models/bairro';
import { Domasa } from '../_models/domasa';
import { map } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class DomasasService {

	private getUrl:string = '/maxse/api/domasas';

	constructor(
		private http:HttpClient
	) { }

	get():Observable<Domasa[]>{
		
		// definindo chave onde serão armazenados no localStorage
		let chave:string = 'domasas';

		// tentando recuperar bairros da local storage
		let str:string = localStorage.getItem(chave);

		// verificando se conseguiu recuperar da localStorage
		if(str){
			return of<Domasa[]>(JSON.parse(str));
		} else {
			return this.http.get<Domasa[]>(this.getUrl).pipe(
				map(
					(v) => {
						localStorage.setItem(chave,JSON.stringify(v));
						return v;
					}
				)
			)
		}
	}

	getFlat():Observable<Bairro[]>{

		// definindo chave onde serão armazenados no localStorage
		let chave:string = 'bairrosFlat';

		// tentando recuperar bairros da local storage
		let str:string = localStorage.getItem(chave);

		// verificando se conseguiu recuperar da localStorage
		if(str){
			return of<Bairro[]>(JSON.parse(str));
		} else {
			return this.http.get<Bairro[]>(this.getUrl+'/flat').pipe(
				map(
					(v) => {
						localStorage.setItem(chave,JSON.stringify(v));
						return v;
					}
				)
			)
		}
	}
}
