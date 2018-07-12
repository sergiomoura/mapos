import { Bairro } from "./bairro";
import { TipoDeServico } from "./tipoDeServico";
import { SafeUrl } from "@angular/platform-browser";

export class SSE{
	id:number;
	endereco:string;
	numero:string;
	bairro:Bairro;
	tipoDeServico:TipoDeServico;
	dh_registrado:string;
	dh_recebido:string;
	dh_ini_exec:string;
	dh_fim_exec:string;
	obs:string;
	urgente:boolean;
	medidas_area:any[];	
	medidas_linear:any[];
	medidas_unidades:any[];
	foto:SafeUrl;
}