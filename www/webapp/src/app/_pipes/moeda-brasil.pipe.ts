import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'moedaBrasil'
})
export class MoedaBrasilPipe implements PipeTransform {

	transform(value: string): string {
		if(value != null){

			// Pondo o símbolo de reais com espaço
			value = value.replace('R$', 'R$ ');
	
			// Trocando '.' por "##";
			value = value.replace('.',"##");
	
			// Trocando ',' por '.'
			value = value.replace(',','.');
	
			// Trocando o "##" por ','
			value = value.replace('##',',');
	
			// Retornando
			return value;
		} else {
			return null;
		}
	}

}
