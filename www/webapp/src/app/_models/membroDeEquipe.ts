import { TipoDeMembroDeEquipe } from "./tipoDeMembroDeEquipe";
export class MembroDeEquipe {
	id:number;
	nome:string;
	email:string;
	salario:number;
	lider:boolean;
	username:string;
	senha:string;
	conf_senha?:string;
	tipo?:TipoDeMembroDeEquipe;
}