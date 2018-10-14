import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { TipoDeServico } from '../_models/tipoDeServico';
import { map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class TiposDeServicoService {

	private getUrl:string = '/maxse/api/tdss';

	constructor(
		private http:HttpClient
	) { }

	get():Observable<TipoDeServico[]>{

		// Definindo chave para acesso a tiposDeSevico na localStorage
		let chave:string = 'tiposDeSevico';

		// Tentando recuperar os tipos de serviço da storage
		let str:string = localStorage.getItem(chave);

		// Verificando se capturou o serviços do localStorage
		if(str){
			return of<TipoDeServico[]>(JSON.parse(str));
		} else {
			
			// Definindo observável
			let obs:Observable<TipoDeServico[]> = this.http.get<TipoDeServico[]>(this.getUrl).pipe(
				map(
					v => {
						// Guardar res no localStorage
				 		localStorage.setItem(chave,JSON.stringify(v));
						return v;
					}
				)
			);

			// Retornando o observável
			return obs;

		}
		
	}
}
