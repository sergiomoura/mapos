import { Bairro } from "./bairro";
import { TipoDeServico } from "./tipoDeServico";
import { SafeUrl } from "@angular/platform-browser";

enum NiveisDeUrgencia {
	normal=0,
	prioridade=1,
	urgente=2
}

export class SSE{
	id:number;
	endereco:string;
	numero:string;
	bairro:Bairro;
	tipoDeServicoReal:TipoDeServico;
	tipoDeServicoPrev:TipoDeServico;
	dh_registrado:Date;
	dh_recebido:Date;
	obs:string;
	urgencia:NiveisDeUrgencia;
	medidas_area:{
		'prev':any[];
		'real':any[];
	};	
	medidas_linear:{
		'prev':any[];
		'real':any[];
	};
	medidas_unidades:{
		'prev':any[];
		'real':any[];
	};
	foto:SafeUrl;
	lat:number;
	lng:number;
	status:number;
	prazoFinal:Date;
	tarefas?:any[];
	finalizacao_parcial?:boolean;
	motivo_finalizacao_parcial?: string;
	data_devolucao?:Date;
}