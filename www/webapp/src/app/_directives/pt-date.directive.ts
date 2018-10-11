import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
	selector: '[appPtDate]'
})
export class PtDateDirective {

	constructor(
		el: ElementRef
	) {
		(<HTMLInputElement>el.nativeElement).maxLength = 10;
	}
	@HostListener('keyup', ['$event']) 
	onKeyup(evt:KeyboardEvent) {
		let input:HTMLInputElement = <HTMLInputElement>evt.target;
		let txt:string = input.value;
		txt = txt.replace( /\//g,'');
		if(txt.length > 2 && txt.length < 5){
			txt = txt.slice(0,2) + '/' + txt.slice(2);
		} else if(txt.length >= 5 && txt.length <= 8) {
			txt = txt.slice(0,2) + '/' + txt.slice(2,4) + '/' + txt.slice(4);
		}
		input.value = txt;

	}

	
   
}
