import { Bairro } from "./bairro";
import { TipoDeServico } from "./tipoDeServico";

export class SSE{
	id:number;
	endereco:string;
	numero:string;
	bairro:Bairro;
	tipoDeServico:TipoDeServico;
	dh_registrado:Date;
	dh_recebido:Date;
	dh_ini_exec:Date;
	dh_fim_exec:Date;
	urgente:boolean;
}