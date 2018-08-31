import { Bairro } from "./bairro";
import { TipoDeServico } from "./tipoDeServico";
import { SafeUrl } from "@angular/platform-browser";
import { Medida } from "./medida";
import { FaixaDeTDS } from "./faixaDeTds";
import { format, addYears, isBefore, differenceInDays} from 'date-fns';

enum NiveisDeUrgencia {
	normal=0,
	prioridade=1,
	urgente=2
}

enum CodigosDeStatus {
	cadastrado=0,
	agendado=1,
	executando=2,
	pendente=3,
	finalizado=100,
	divergente=-1,
	retrabalho=-2,
	cancelada=-100
}

export interface faixa{
	li:number;
	ls:number;
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
	data_garantia?:Date;
	private _cmo:number;
	private _cmp:number;
	private _valor_real:number;
	private _valor_prev:number;
	private _total_prev:Medida;
	private _total_real:Medida;
	private _faixa_prev:FaixaDeTDS;
	private _faixa_real:FaixaDeTDS;
	

	constructor(sseData:any, private tdss:TipoDeServico[]){
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
			this.data_garantia = undefined;
			this._cmo = undefined;
			this._cmp = undefined;
			this._faixa_prev = undefined;
			this._faixa_real = undefined;
			this._total_prev = undefined;
			this._total_real = undefined;
			this._valor_real = undefined;
			this._valor_prev = undefined;
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
			this.data_garantia = (sseData.data_devolucao ? addYears(this.data_devolucao,1) : undefined);
			this._cmo = (sseData.cmo ? +sseData.cmo : undefined);
			this._cmp = (sseData.cmp ? +sseData.cmp : undefined);
			this.setTipoDeServicoPrev(this.tdss);
			this.setTipoDeServicoReal(this.tdss);
			this._total_prev = this.calcTotalPrev();
			this._total_real = this.calcTotalReal();
			this._faixa_prev = this.calcFaixaDeTDS_prev();
			this._faixa_real = this.calcFaixaDeTDS_real();
			this._valor_real = +sseData.valor_real;
			this._valor_prev = +sseData.valor_prev;
		}
	}

	private calcTotalPrev():Medida{
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
		medida.valor = Math.round(medida.valor * 100)/100;
		return medida;
	}

	private calcTotalReal():Medida{
		if(this.tipoDeServicoReal){
			let medida:Medida = new Medida(0,'');
			switch (this.tipoDeServicoReal.medida) {
				case 'a':
					for (let i = 0; i < this.medidas_area.real.length; i++) {
						const m = this.medidas_area.real[i];
						medida.valor += m.l * m.c;
					}
					medida.unidade = 'm²';
					break;
				
				case 'l':
					for (let i = 0; i < this.medidas_linear.real.length; i++) {
						const m = this.medidas_linear.real[i];
						medida.valor += (1*m.v);
					}
					medida.unidade = 'm';
					break;
				
				case 'u':
					for (let i = 0; i < this.medidas_unidades.real.length; i++) {
						const m = this.medidas_unidades.real[i];
						medida.valor += (1*m.n);
					}
					medida.unidade = 'unid';
					break;
	
				default:
					break;
			}
			medida.valor = Math.round(medida.valor * 100)/100;
			return medida;
		} else {
			return undefined;
		}
	}
	
	public get totalPrev() : Medida {
		return this._total_prev;
	}

	public get totalReal() : Medida{
		return this._total_real;
	}

	public get faixaPrev(): FaixaDeTDS{
		return this._faixa_prev;
	}

	public get faixaReal(): FaixaDeTDS{
		return this._faixa_real;
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

	private setTipoDeServicoReal(tdss:TipoDeServico[]){
		if(this._id_tds_r){
			this.tipoDeServicoReal = tdss.find(
				(tds) => {
					return tds.id == this._id_tds_r;
				}
			)
		} else {
			this.tipoDeServicoReal = undefined;
		}
	}

	// TODO: remover isso
	public get id_tds_r(){
		return this._id_tds_r;
	}

	private setTipoDeServicoPrev(tdss:TipoDeServico[]){
		this.tipoDeServicoPrev = tdss.find(
			(tds) => {
				return tds.id == this._id_tds_p;
			}
		)
	}

	// TODO: remover isso
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

	private calcFaixaDeTDS_prev():FaixaDeTDS{
		let faixa:FaixaDeTDS = new FaixaDeTDS();
		let total:Medida = this.totalPrev;
		if(this.tipoDeServicoPrev){
			// Calculando faixa de tipo de trabalho que esta sse se encontra (prev)
			faixa = <FaixaDeTDS>this.tipoDeServicoPrev.faixas.find(
				(f) => {
					return total.valor <= f.ls && total.valor > f.li;
				}
			);
		} else {
			throw "Tipo de Serviço Previsto não definido. Chame a setTipoDeServicoPrev antes de executar essa função";			
		}
		
		return faixa;
	}

	private calcFaixaDeTDS_real():FaixaDeTDS{

		if(this.tipoDeServicoReal){
			let faixa:FaixaDeTDS = new FaixaDeTDS();
			let total:Medida = this.totalReal;
			
			// Calculando faixa de tipo de trabalho que esta sse se encontra (prev)
			faixa = <FaixaDeTDS>this.tipoDeServicoPrev.faixas.find(
				(f) => {
					return total.valor <= f.ls && total.valor > f.li;
				}
			);
			
			return faixa;
		} else {
			return undefined;
		}
	}

	public get label_urgencia():string{
		if(this.urgencia == NiveisDeUrgencia.normal) {
			return "Normal";
		}

		if(this.urgencia == NiveisDeUrgencia.prioridade) {
			return "Prioridade";
		}

		if(this.urgencia == NiveisDeUrgencia.urgente) {
			return "Urgente";
		}

		throw "Nível de urgência desconhecido"
	}

	public get label_status():string{
		if(this.status == CodigosDeStatus.agendado){
			return "Agendado";
		}

		if(this.status == CodigosDeStatus.cadastrado){
			return "Cadastrado";
		}

		if(this.status == CodigosDeStatus.cancelada){
			return "Cancelado";
		}

		if(this.status == CodigosDeStatus.divergente){
			return "Divergente";
		}

		if(this.status == CodigosDeStatus.executando){
			return "Executando";
		}

		if(this.status == CodigosDeStatus.finalizado){
			return "Finalizado";
		}

		if(this.status == CodigosDeStatus.pendente){
			return "Pendente";
		}

		if(this.status == CodigosDeStatus.retrabalho){
			return "Retrabalho";
		}

		throw "Código de status " + this.status + " desconhecido.";
	}

	public get emGarantia():boolean|undefined{
		
		if(this.data_garantia){
			let hoje:Date = new Date();
			hoje.setHours(0);
			hoje.setMinutes(0);
			hoje.setMinutes(0);
			hoje.setDate(0);
			
			return isBefore(hoje, this.data_garantia);
		} else {
			return undefined;
		}
	}

	public get calculoExecucao():number|undefined{
		// Calculando cálculo de execução dataDevolucao - prazoFinal
		if(this.data_devolucao){
			return differenceInDays(this.data_devolucao,this.prazoFinal);
		} else {
			return undefined;
		}
	}

	public get valor_real() : number {
		return this._valor_real;
	}

	public get valor_prev() : number {
		return this._valor_prev;
	}
	
	public get cmo() : number {
		return this._cmo;
	}

	public get cmp() : number {
		return this._cmp;
	}

	public get lucro_real() : number{
		if( this._valor_real == undefined || this._cmp == undefined || this._cmo == undefined){
			return undefined
		} else {
			return this._valor_real - this._cmp - this._cmo;
		}
	}

	public get lucro_prev() : number{
		if( this._valor_prev == undefined || this._cmp == undefined || this._cmo == undefined){
			return undefined
		} else {
			return this._valor_prev - this._cmp - this._cmo;
		}
	}
	
}