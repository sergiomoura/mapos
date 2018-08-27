import { Bairro } from "./bairro";
import { TipoDeServico } from "./tipoDeServico";
import { SafeUrl } from "@angular/platform-browser";
import { Medida } from "./medida";
import { Equipe } from "./equipe";

enum NiveisDeUrgencia {
	normal=0,
	prioridade=1,
	urgente=2
}

export class SSE{

	// Publicas = = = = = = = = = = = = = = = = = = = = =
	id:number;
	endereco:string;
	numero:string;
	
	private _id_bairro:number;
	bairro?:Bairro;

	private _id_tds_r:number;
	tipoDeServicoReal?:TipoDeServico;

	private _id_tds_p:number;
	tipoDeServicoPrev?:TipoDeServico;

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

	constructor(sseData:any){
		if(sseData == undefined){
			this.id = 0;
			this.endereco = '';
			this.numero = '';
			this._id_bairro = undefined;
			this._id_tds_r = undefined;
			this._id_tds_p = undefined;
			this.dh_registrado = undefined;
			this.dh_recebido = new Date(); this.dh_recebido.setHours(10); this.dh_recebido.setMinutes(0);
			this.obs = '';
			this.urgencia = NiveisDeUrgencia.normal,
			this.medidas_area = {prev:[],real:[]};
			this.medidas_linear = {prev:[],real:[]};
			this.medidas_unidades = {prev:[],real:[]};
			this.foto = '';
			this.lat = undefined;
			this.lng = undefined;
			this.status = 0;
			this.prazoFinal = undefined;
			this.tarefas = [];
			this.finalizacao_parcial = false;
			this.motivo_finalizacao_parcial = '';
			this.data_devolucao =  undefined;
		} else {
			this.id = sseData.id;
			this.endereco = sseData.endereco;
			this.numero = sseData.numero;
			this._id_bairro = sseData.id_bairro;
			this._id_tds_r = sseData.id_tds_r;
			this._id_tds_p = sseData.id_tds_p;		
			this.dh_registrado = new Date(sseData.dh_registrado);
			this.dh_recebido = new Date(sseData.dh_recebido);
			this.obs = sseData.obs;
			this.urgencia = sseData.urgencia,
			this.medidas_area = sseData.medidas_area;
			this.medidas_linear = sseData.medidas_linear;
			this.medidas_unidades = sseData.medidas_unidades;
			this.foto = sseData.foto;
			this.lat = sseData.lat;
			this.lng = sseData.lng;
			this.status = sseData.status;
			this.prazoFinal = new Date(sseData.prazo_final+'T00:00:00');
			this.tarefas = ( !(sseData.tarefas) ? undefined : sseData.tarefas );
			this.finalizacao_parcial = sseData.finalizacao_parcial;
			this.motivo_finalizacao_parcial = sseData.motivo_finalizavao_parcial;
			this.data_devolucao =  (sseData.data_devolucao ? new Date(sseData.data_devolucao) : undefined);
		}
	}
	
	public get totalPrev() : Medida {
		let medida:Medida = new Medida(0,'');
		
		switch (this.tipoDeServicoPrev.medida) {
			case 'a':
				for (let i = 0; i < this.medidas_area.prev.length; i++) {
					const m = this.medidas_area.prev[i];
					medida.valor += m.l * m.c;
				}
				medida.unidade = 'm²';
				break;
			
			case 'l':
				for (let i = 0; i < this.medidas_linear.prev.length; i++) {
					const m = this.medidas_linear.prev[i];
					medida.valor += (1*m.v);
				}
				medida.unidade = 'm';
				break;
			
			case 'u':
				for (let i = 0; i < this.medidas_unidades.prev.length; i++) {
					const m = this.medidas_unidades.prev[i];
					medida.valor += (1*m.n);
				}
				medida.unidade = 'unid';
				break;

			default:
				break;
		}

		return medida;
	}

	public setBairro(bairros:Bairro[]){
		this.bairro = bairros.find(
			(b) => {
				return b.id == this._id_bairro;
			}
		)
	}

	public get id_bairro() : number {
		return this._id_bairro;
	}

	public setTipoDeServicoReal(tdss:TipoDeServico[]){
		if(!this._id_tds_r){
			this.tipoDeServicoReal = tdss.find(
				(tds) => {
					return tds.id == this._id_tds_r;
				}
			)
		} else {
			this.tipoDeServicoReal = undefined;
		}
	}

	public get id_tds_r(){
		return this._id_tds_r;
	}

	public setTipoDeServicoPrev(tdss:TipoDeServico[]){
		this.tipoDeServicoPrev = tdss.find(
			(tds) => {
				return tds.id == this._id_tds_p;
			}
		)
	}

	public get id_tds_p(){
		return this._id_tds_p;
	}
	
	public get tempo_restante() : number {
		return (this.prazoFinal.getTime() + (17*60*60*1000) - (new Date()).getTime())/1000;
	}

	public get markerFile():string {
		let file = 'marker-';
		switch (+this.status) {
			case -100:
				file += 'cancelada';
				break;

			case -2:
				file += 'retrabalho';
				break;

			case -1:
				file += 'divergente';
				break;
			
			case 0:
				file += 'cadastrada';
				break;

			case 1:
				file += 'agendada'
				break;
			
			case 2:
				file += 'executando';
				break;
			
			case 3:
				file += 'pendente'
				break;
			
			case 100:
				file += 'finalizada'
				break;
		}
			
		file += '-' + this.urgencia;
		file += '.svg';

		return file;
	}

	public get statusMessage():string {
		let statusMsg = '';
		switch (+this.status) {
			case -100:
				statusMsg = 'Cancelada';
				break;

			case -2:
				statusMsg = 'Retrabalho';
				break;

			case -1:
				statusMsg = 'Divergente';
				break;
			
			case 0:
				statusMsg = 'Cadastrada - aguardando ação do programador.';
				break;

			case 1:
				statusMsg = 'Agendada';
				break;
			
			case 2:
				statusMsg = 'Executando';
				break;
			
			case 3:
				statusMsg = 'Pendente - aguardando ação do programador.';
				break;
			
			case 100:
				statusMsg = 'Finalizada';
				break;
		}

		return statusMsg;
	}
	

}