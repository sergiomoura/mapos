import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of, Subscription } from 'rxjs';
import { TipoDeServico } from '../_models/tipoDeServico';

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
			let obs:Observable<TipoDeServico[]> = this.http.get<TipoDeServico[]>(this.getUrl);

			// Fazendo subscription
			let s:Subscription = obs.subscribe(
				(res) => {
					// Guardar res no localStorage
					localStorage.setItem(chave,JSON.stringify(res));

					// Unsubscribing
					s.unsubscribe();
				}
			)

			// Retornando o observável
			return obs;

		}
		
	}
}
