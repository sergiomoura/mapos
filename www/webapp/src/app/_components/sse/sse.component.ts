import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SSE } from '../../_models/sse';
import { Domasa } from "../../_models/domasa";
import { SsesService } from '../../_services/sses.service';
import { DomasasService } from "../../_services/domasas.service";
import { TiposDeServicoService } from "../../_services/tipos-de-servico.service";
import { MatSnackBar, MatDialog } from '@angular/material';
import { TipoDeServico } from '../../_models/tipoDeServico';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Bairro } from '../../_models/bairro';
import { NgForm } from '@angular/forms';
import { format } from "date-fns";
import { GaleriaComponent } from '../galeria/galeria.component';
import { FotoModalComponent } from "../foto-modal/foto-modal.component";

@Component({
	selector: 'app-sse',
	templateUrl: './sse.component.html',
	styleUrls: ['./sse.component.scss']
})

export class SseComponent implements OnInit {

	constructor(
		private route: ActivatedRoute,
		private ssesService: SsesService,
		private domasaService: DomasasService,
		private tdsService: TiposDeServicoService,
		private snackBar: MatSnackBar,
		private sanitizer: DomSanitizer,
		private router: Router,
		public dialog: MatDialog
	) {	}

	sse: SSE = <SSE>{
		foto: null,
		numero: '',
	};
	@ViewChild('sseForm')form:NgForm;
	@ViewChild('inputFile')inputImage:ElementRef;
	public domasas: Domasa[];
	public tdss: TipoDeServico[];
	public domasaSelecionada: Domasa;
	private sseResponse: any;
	public medidaPrevTotal: number;
	public medidaRealTotal: number;
	public timestring: string;
	public bairros:Bairro[] = [];
	public bairrosExibidos:Bairro[] = [];
	public camposDeCadstroTravados:boolean = true;
	public camposDeMedidasReaisTravados: boolean = true;
	public id_bairro_selecionado = undefined;
	public selectedImage:File = null;
	public inputImageFile:string;

	ngOnInit() {
		this.getDomasas();
		this.getTiposDeServico();
		this.getSse();
	}

	getSse() {
		let id = this.route.snapshot.paramMap.get('id');
		if (id != '0') {
			this.ssesService.getById(id).subscribe(
				res => {
					this.sseResponse = res;
					this.parseSse();
				},
				err => {
					// Exibindo snackbar de erro
					this.snackBar
						.open(
							'Falha ao tentar carregar SSE',
							'Fechar',
							{
								duration: 0,
								horizontalPosition: 'left',
								verticalPosition: 'bottom',
								panelClass: ['snackbar-error'],
							}
						);

					// Imprimindo erro no console
					console.log(err);
				}
			)
		} else {
			this.sseVazia();
		}
	}

	getDomasas() {
		this.domasaService.get().subscribe(
			res => {
				this.domasas = <Domasa[]>res;
				this.parseSse();

				// Criando bairros
				for (let i = 0; i < this.domasas.length; i++) {
					const domasa = this.domasas[i];
					this.bairros = this.bairros.concat(domasa.bairros);					
				}

				// Criando bairrosExibidos
				this.bairrosExibidos = this.bairros;
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
					.open(
						'Falha ao carregar DOMASAS',
						'Fechar',
						{
							duration: 0,
							horizontalPosition: 'left',
							verticalPosition: 'bottom',
							panelClass: ['snackbar-error'],
						}
					);

				// Imprimindo erro no console
				console.warn(err);
			}
		)
	}

	getTiposDeServico() {
		this.tdsService.get().subscribe(
			res => {
				this.tdss = <TipoDeServico[]>res;
				this.parseSse();
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
					.open(
						'Falha ao carregar tipos de serviço',
						'Fechar',
						{
							duration: 0,
							horizontalPosition: 'left',
							verticalPosition: 'bottom',
							panelClass: ['snackbar-error'],
						}
					);

				// Imprimindo erro no console
				console.warn(err);
			}
		)
	}

	onCriarTarefaClick() {
		this.router.navigateByUrl('home/tarefas/0?idsse=' + this.sse.id);
	}

	onSalvarClick() {
		this.sse.dh_recebido.setHours(+this.timestring.substr(0, 2));
		this.sse.dh_recebido.setMinutes(+this.timestring.substr(3, 2));
		if (this.sse.id * 1 != 0) {
			this.updateSse();
		} else {
			this.createSse();
		}
	}

	private updateSse() {
		return this.ssesService.update(this.sse).subscribe(
			res => {
				// Voltando para o mapa
				this.router.navigateByUrl("/home/sses/map");

				// Exibindo snackbar de sucesso
				this.snackBar.open(
					'SSE alterada com sucesso!',
					undefined,
					{
						panelClass: ['snackbar-ok'],
					});
			},
			err => {

				// Declarando mensagem a exibir no snackbar
				let msg:string;
				if(err == 'Service Unavailable'){
					msg = 'Falha ao recuperar coordenadas do endereço. Verifique o endereço ou tente mais tarde.'
				} else {
					msg = 'Falha ao tentar atualizar SSE: ' + err;
				}
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					msg,
					'Fechar',
					{
						duration:0,
						horizontalPosition:'left',
						verticalPosition:'bottom',
						panelClass: ['snackbar-error'],
					}
				);
			}
		)
	}

	private createSse() {
		return this.ssesService.create(this.sse).subscribe(
			res => {
				// Zerando campos
				this.sseVazia();
				this.domasaSelecionada = undefined;
				this.form.reset();
				window.scrollTo(0,0);
				

				// Exibindo snackbar de sucesso
				this.snackBar.open(
					'SSE cadastrada com sucesso',
					undefined,
					{
						panelClass: ['snackbar-ok'],
					});

			},
			err => {
				// Declarando mensagem a exibir no snackbar
				let msg:string;
				if(err == 'Service Unavailable'){
					msg = 'Falha ao recuperar coordenadas do endereço. Verifique o endereço ou tente mais tarde.'
				} else {
					msg = 'Falha ao tentar atualizar SSE: ' + err;
				}

				// Exibindo snackbar de erro
				this.snackBar
				.open(
					msg,
					'Fechar',
					{
						duration:0,
						horizontalPosition:'left',
						verticalPosition:'bottom',
						panelClass: ['snackbar-error'],
					}
				);
			}
		)
	}

	sseVazia() {
		let sse: SSE = new SSE();
		sse.id = 0;
		sse.dh_recebido = new Date();
		sse.dh_recebido.setHours(10);
		sse.dh_recebido.setMinutes(0);
		this.timestring = format(sse.dh_recebido,'HH:mm');
		sse.endereco = '';
		sse.tipoDeServicoPrev = undefined;
		sse.tipoDeServicoReal = undefined;
		sse.numero = '';
		sse.bairro = undefined;
		sse.foto = null;
		sse.medidas_area = {'real':[],'prev':[]};
		sse.medidas_linear = {'real':[],'prev':[]};
		sse.medidas_unidades = {'real':[],'prev':[]};
		sse.urgencia=0;
		sse.status=0;
		this.sseResponse = sse;
		this.parseSse();
	}

	setHora(s:number){
		this.timestring = s + ':00';
	}

	parseSse() {

		if (this.sseResponse && this.domasas && this.tdss) {

			// Determinando se os campos devem ou não estar travados (somente para o status CADASTRADO)
			this.camposDeCadstroTravados = (this.sseResponse.status != "0"); 

			// Determinando se os campos de medida reais devem estar travados ou não
			this.camposDeMedidasReaisTravados = true;

			// Parsing escalares
			this.sseResponse.dh_recebido = new Date(this.sseResponse.dh_recebido);
			this.sseResponse.dh_registrado = new Date(this.sseResponse.dh_registrado);
			this.sseResponse.id *= 1;
			this.sseResponse.foto = (this.sseResponse.foto ? this.sanitizer.bypassSecurityTrustResourceUrl(this.sseResponse.foto) : null);
			this.sseResponse.urgencia *= 1;
			this.timestring = this.sseResponse.dh_recebido.toTimeString().substr(0, 2)
				+ ':' +
				this.sseResponse.dh_recebido.toTimeString().substr(3, 2);
			
			// Parsing tipo de servico previsto
			this.sseResponse.tipoDeServicoPrev = this.tdss.find(
				(t) => {
					return 1 * t.id == 1 * this.sseResponse.id_tipo_de_servico_p
				}
			);
			delete this.sseResponse.id_tipo_de_servico_p;
			
			// Parsing tipo de serviço real
			if(this.sseResponse.id_tipo_de_servico_r) {
				this.sseResponse.tipoDeServicoReal = this.tdss.find(
					(t) => {
						return 1 * t.id == 1 * this.sseResponse.id_tipo_de_servico_r
					}
				);
			} else {
				this.sseResponse.tipoDeServicoReal = null;
			}
			delete this.sseResponse.id_tipo_de_servico_r


			// Procurando a domasa do bairro
			let i: number = 0;
			let achou: boolean = false;
			while (i < this.domasas.length && !achou) {
				this.sseResponse.bairro = this.domasas[i].bairros.find(
					(bairro) => {
						return bairro.id == this.sseResponse.id_bairro;
					}
				)
				if (this.sseResponse.bairro) {
					achou = true;
					this.domasaSelecionada = this.domasas[i];
				}
				i++
			}

			// Atualizando o id_bairro_selecionado para o select funcionar
			this.id_bairro_selecionado = this.sseResponse.id_bairro;
			delete this.sseResponse.id_bairro;

			this.sse = <SSE>this.sseResponse;

			this.calculaMedidaPrevTotal();
			this.calculaMedidaRealTotal();

			// Colocando campo a mais caso um vetor de medidas esteja vazio
			if (this.sse.medidas_area.prev.length == 0) {
				this.sse.medidas_area.prev.push({ l: '', c: '' });
			}
			if (this.sse.medidas_linear.prev.length == 0) {
				this.sse.medidas_linear.prev.push({ v: '' });
			}
			if (this.sse.medidas_unidades.prev.length == 0) {
				this.sse.medidas_unidades.prev.push({ n: '' });
			}

			// parsing tarefas
			if(this.sse.tarefas){
				for (let i = 0; i < this.sse.tarefas.length; i++) {
					const tarefa = this.sse.tarefas[i];
					tarefa.inicio_p = new Date(tarefa.inicio_p);
					tarefa.final_p = new Date(tarefa.final_p);
					tarefa.inicio_r = (tarefa.inicio_r ? new Date(tarefa.inicio_r) : null);
					tarefa.final_r = (tarefa.final_r ? new Date(tarefa.final_r) : null);
	
					// Calculando duração prevista
					let s:number = Math.floor((tarefa.final_p.getTime() - tarefa.inicio_p.getTime())/1000);
					let h:number = Math.floor(s/3600);
					s -= h*3600;
					let m:number = Math.floor(s/60);
					tarefa.duracao_p = h+'h '+m+'min';
	
					// Calculando duração real
					if(tarefa.final_r){
						s = Math.floor((tarefa.final_r.getTime() - tarefa.inicio_r.getTime())/1000);
						h = Math.floor(s/3600);
						s -= h*3600;
						m = Math.floor(s/60);
						tarefa.duracao_r = h+'h '+m+'min';
					} else {
						tarefa.duracao_r = null;
					}

					// Parsing fotos do inicio
					for (let i = 0; i < tarefa.fotos.ini.length; i++) {
						tarefa.fotos.ini[i] = this.sanitizer.bypassSecurityTrustResourceUrl(tarefa.fotos.ini[i]);
					}

					// Parsing fotos do final
					for (let i = 0; i < tarefa.fotos.fim.length; i++) {
						tarefa.fotos.fim[i] = this.sanitizer.bypassSecurityTrustResourceUrl(tarefa.fotos.fim[i]);
					}

				}
			}
		}
	}

	onImageClick(){
		const dialogRef = this.dialog.open(FotoModalComponent, {
			width: '750px',
			data: {
				'foto':this.sse.foto
			}
		});
	}

	onInputMedidaPrevChange() {
		this.calculaMedidaPrevTotal();
	}

	onTipoDeServicoPrevChange() {
		this.calculaMedidaPrevTotal();
	}

	onRemoveMedidaPrevClick(i) {
		switch (this.sse.tipoDeServicoPrev.medida) {
			case 'a':
				this.sse.medidas_area.prev.splice(i, 1);
				break;

			case 'l':
				this.sse.medidas_linear.prev.splice(i, 1);
				break;

			case 'u':
				this.sse.medidas_unidades.prev.splice(i, 1);
				break;
		}
		this.calculaMedidaPrevTotal();
	}

	onAddMedidaPrevClick() {
		switch (this.sse.tipoDeServicoPrev.medida) {
			case 'a':
				this.sse.medidas_area.prev.push({ l: '', c: '' });
				break;

			case 'l':
				this.sse.medidas_linear.prev.push({ v: '' });
				break;

			case 'u':
				this.sse.medidas_unidades.prev.push({ n: '' });
				break;
		}
	}

	onDomasaChange(){
		this.bairrosExibidos = Object.assign([],this.domasaSelecionada.bairros);
		this.bairrosExibidos.unshift(
			{
				id:0,
				nome:'Selecione um bairro',
				codigo:'',
				domasa:this.domasaSelecionada.id
			}
		)
		this.id_bairro_selecionado = this.bairrosExibidos[0].id;
		this.sse.bairro = this.bairros.find(
			(b) => {
				return b.id == this.id_bairro_selecionado;
			}
		)
	}

	onBairrosChange(){
		
		// Encontrando o bairro selecionado
		this.sse.bairro = this.bairros.find(
			(b) => {
				return b.id == this.id_bairro_selecionado;
			}
		)

		if(this.id_bairro_selecionado != 0) {
			// Buscando domasa do bairro
			let i = 0;
			let achou = false;
			let bairro:Bairro;
			while (i<this.domasas.length && !achou) {
				
				bairro = this.domasas[i].bairros.find(
					(b) => {
						return b.id == this.sse.bairro.id;
					}
				)
				achou = (bairro != undefined);
	
				if (achou) {
					this.domasaSelecionada = this.domasas[i];
				}
	
				i++;
			}
		}
	}

	onImageSelected(evt){
		// Lendo o arquivo
		let file:File = <File>evt.target.files[0];

		// Criando o file
		let reader:FileReader = new FileReader();

		// Criando o handler para quando o file reader acabar de ler o arquivo
		reader.onloadend = () => {
			this.sse.foto = this.sanitizer.bypassSecurityTrustUrl(<string>reader.result);
		}
		
		// Lendo o arquivo
		if(file){
			reader.readAsDataURL(file);
		} else {
			this.sse.foto = null;
		}
	}

	onFotoClick(index_tarefa:number,tipo:string,i:number){
		let fotos:SafeUrl[];
		if(tipo=='ini'){
			fotos = this.sse.tarefas[index_tarefa].fotos.ini;
		} else if(tipo == 'fim') {
			fotos = this.sse.tarefas[index_tarefa].fotos.fim;
		}
		const dialogRef = this.dialog.open(GaleriaComponent, {
			width: '800px',
			data: {
				'start_index':i,
				'fotos':fotos
			}
		});
	}

	calculaMedidaPrevTotal() {

		let total: number = 0;

		if(this.sse.tipoDeServicoPrev){
			if (this.sse.tipoDeServicoPrev.medida == 'a') {
				for (let i = 0; i < this.sse.medidas_area.prev.length; i++) {
					total += (1 * this.sse.medidas_area.prev[i].l) * (1 * this.sse.medidas_area.prev[i].c);
				}
			}
	
			if (this.sse.tipoDeServicoPrev.medida == 'l') {
				for (let i = 0; i < this.sse.medidas_linear.prev.length; i++) {
					total += (1 * this.sse.medidas_linear.prev[i].v);
				}
			}
	
			if (this.sse.tipoDeServicoPrev.medida == 'u') {
				for (let i = 0; i < this.sse.medidas_unidades.prev.length; i++) {
					total += (1 * this.sse.medidas_unidades.prev[i].n);
				}
			}
			this.medidaPrevTotal = total;
		} else {
			this.medidaPrevTotal = 0;
		}
	}

	calculaMedidaRealTotal() {

		let total: number = 0;

		if(this.sse.tipoDeServicoReal){
			if (this.sse.tipoDeServicoReal.medida == 'a') {
				for (let i = 0; i < this.sse.medidas_area.real.length; i++) {
					total += (1 * this.sse.medidas_area.real[i].l) * (1 * this.sse.medidas_area.real[i].c);
				}
			}
	
			if (this.sse.tipoDeServicoReal.medida == 'l') {
				for (let i = 0; i < this.sse.medidas_linear.real.length; i++) {
					total += (1 * this.sse.medidas_linear.real[i].v);
				}
			}
	
			if (this.sse.tipoDeServicoReal.medida == 'u') {
				for (let i = 0; i < this.sse.medidas_unidades.real.length; i++) {
					total += (1 * this.sse.medidas_unidades.real[i].n);
				}
			}
			this.medidaRealTotal = total;
		} else {
			this.medidaRealTotal = 0;
		}
	}
}
