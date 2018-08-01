import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'numeroBr'
})
export class NumeroBrPipe implements PipeTransform {

	transform(value: string): string {
		
		// Retornando nulo se null
		if(value == null){
			return null;
		}

		// Trocando '.' por "##";
		value = value.replace('.',"##");

		// Trocando ',' por '.'
		value = value.replace(',','.');

		// Trocando o "##" por ','
		value = value.replace('##',',');

		// Retornando
		return value;

	}

}
