import { SSE } from "./sse";

export interface FechamentoData {
	cmo?:string;
	cmp?:string;
	faturamento_prev?:string;
	faturamento_real?:string;
	final:string;
	id:string;
	inicio:string;
	aberto:string;
}

export class Fechamento{
	id:number;
	inicio:Date;
	final:Date;
	faturamento_prev?:number;
	faturamento_real?:number;
	cmo?:number;
	cmp?:number;
	aberto:boolean;
	sses:SSE[] = undefined;
	
	constructor(
		fData:FechamentoData
	){
		this.id = +fData.id;
		this.inicio = new Date(fData.inicio + 'T00:00:00');
		this.final = new Date(fData.final+'T23:59:59');
		this.faturamento_real = fData.faturamento_real ? +fData.faturamento_real : null;
		this.faturamento_prev = fData.faturamento_prev ? +fData.faturamento_prev : null;
		this.cmp = fData.cmp ? +fData.cmp : null;
		this.cmo = fData.cmo ? +fData.cmo : null;
		this.aberto	= (fData.aberto === '1');
	}
	
}