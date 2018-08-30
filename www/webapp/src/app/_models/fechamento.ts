import { FechamentosService } from "../_services/fechamentos.service";

export interface FechamentoData {
	cmo_rateado?:string;
	cmp_rateado?:string;
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
	cmo_rateado?:number;
	cmp_rateado?:number;
	aberto:boolean;

	constructor(
		fData:FechamentoData,
		private fechamentoService:FechamentosService

	){
		
		this.id = +fData.id;
		this.inicio = new Date(fData.inicio + 'T00:00:00');
		this.final = new Date(fData.final+'T23:59:59');
		this.faturamento_real = fData.faturamento_real ? +fData.faturamento_real : null;
		this.faturamento_prev = fData.faturamento_prev ? +fData.faturamento_prev : null;
		this.cmp_rateado = fData.cmp_rateado ? +fData.cmp_rateado : null;
		this.cmo_rateado = fData.cmo_rateado ? +fData.cmo_rateado : null;
		this.aberto	= (fData.aberto === '1');
	}
	
}