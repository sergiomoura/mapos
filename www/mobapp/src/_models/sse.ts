import { Bairro } from "./bairro";
import { TipoDeServico } from "./tipoDeServico";
import { SafeUrl } from "@angular/platform-browser";

export class SSE{
	id:number;
	endereco:string;
	numero:string;
	bairro:Bairro;
	tipoDeServicoPrev:TipoDeServico;
	tipoDeServicoReal:TipoDeServico;
	dh_registrado:string;
	dh_recebido:string;
	obs:string;
	urgencia:number;
	medidas_area:{prev:any[];real:any[]};	
	medidas_linear:{prev:any[];real:any[]};
	medidas_unidades:{prev:any[];real:any[]};
	foto:SafeUrl;
}