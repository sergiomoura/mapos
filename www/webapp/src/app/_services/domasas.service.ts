import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { Bairro } from '../_models/bairro';
import { map } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class DomasasService {

	private getUrl:string = '/maxse/api/domasas';

	constructor(
		private http:HttpClient
	) { }

	get():Observable<Bairro[]>{
		
		// definindo chave onde serão armazenados no localStorage
		let chave:string = 'bairros';

		// tentando recuperar bairros da local storage
		let str:string = localStorage.getItem(chave);

		// verificando se conseguiu recuperar da localStorage
		if(str){
			return of<Bairro[]>(JSON.parse(str));
		} else {
			return this.http.get<Bairro[]>(this.getUrl).pipe(
				map(
					(v) => {
						localStorage.setItem(chave,JSON.stringify(v));
						return v;
					}
				)
			)
		}
	}

	getFlat(){

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
