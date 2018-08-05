import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { SSE } from '../../_models/sse';
import { Domasa } from "../../_models/domasa";
import { SsesService } from '../../_services/sses.service';
import { DomasasService } from "../../_services/domasas.service";
import { TiposDeServicoService } from "../../_services/tipos-de-servico.service";
import { MatSnackBar } from '@angular/material';
import { TipoDeServico } from '../../_models/tipoDeServico';
import { DomSanitizer } from '@angular/platform-browser';
import { Bairro } from '../../_models/bairro';
import { FormControl } from '@angular/forms';
import { format } from "date-fns";
import { Location } from '@angular/common';

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
		private location: Location
	) { }

	sse: SSE = <SSE>{
		foto: null,
		numero: '',
	};

	public domasas: Domasa[];
	public tdss: TipoDeServico[];
	public domasaSelecionada: Domasa;
	private sseResponse: any;
	public medidaTotal: number;
	public timestring: string;
	public bairros:Bairro[] = [];
	public bairrosExibidos:Bairro[] = [];

	ngOnInit() {
		this.getDomasas();
		this.getTiposDeServico();
		this.getSse();
	}

	  /** control for the selected bank */
	  public bankCtrl: FormControl = new FormControl();

	  /** control for the MatSelect filter keyword */
	  public bankFilterCtrl: FormControl = new FormControl();

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
				this.location.back();
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao tentar atualizar SSE',
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
				this.location.back();
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao tentar criar SSE',
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
		sse.endereco = '';
		sse.tipoDeServico = undefined;
		sse.numero = '';
		sse.foto = null;
		sse.medidas_area = [];
		sse.medidas_linear = [];
		sse.medidas_unidades = [];
		sse.urgencia=0;


		this.sseResponse = sse;
		this.parseSse();
	}

	setHora(s:number){
		this.timestring = s + ':00';
	}


	parseSse() {

		if (this.sseResponse && this.domasas && this.tdss) {

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
			delete this.sseResponse.id_bairro;

			this.sse = <SSE>this.sseResponse;

			this.calculaMedidaTotal();

			// Colocando campo a mais caso um vetor de medidas esteja vazio
			if (this.sse.medidas_area.length == 0) {
				this.sse.medidas_area.push({ l: '', c: '' });
			}
			if (this.sse.medidas_linear.length == 0) {
				this.sse.medidas_linear.push({ v: '' });
			}
			if (this.sse.medidas_unidades.length == 0) {
				this.sse.medidas_unidades.push({ n: '' });
			}
		}
	}

	onInputMedidaChange() {
		this.calculaMedidaTotal();
	}

	onTipoDeServicoChange() {
		this.calculaMedidaTotal();
	}

	onRemoveMedidaClick(i) {
		switch (this.sse.tipoDeServico.medida) {
			case 'a':
				this.sse.medidas_area.splice(i, 1);
				break;

			case 'l':
				this.sse.medidas_linear.splice(i, 1);
				break;

			case 'u':
				this.sse.medidas_unidades.splice(i, 1);
				break;
		}
		this.calculaMedidaTotal();
	}

	onAddMedidaClick() {
		switch (this.sse.tipoDeServico.medida) {
			case 'a':
				this.sse.medidas_area.push({ l: '', c: '' });
				break;

			case 'l':
				this.sse.medidas_linear.push({ v: '' });
				break;

			case 'u':
				this.sse.medidas_unidades.push({ n: '' });
				break;
		}
	}

	onDomasaChange(){
		this.bairrosExibidos = this.domasaSelecionada.bairros;
	}

	onBairrosChange(){
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

	calculaMedidaTotal() {

		let total: number = 0;

		if(this.sse.tipoDeServico){
			if (this.sse.tipoDeServico.medida == 'a') {
				for (let i = 0; i < this.sse.medidas_area.length; i++) {
					total += (1 * this.sse.medidas_area[i].l) * (1 * this.sse.medidas_area[i].c);
				}
			}
	
			if (this.sse.tipoDeServico.medida == 'l') {
				for (let i = 0; i < this.sse.medidas_linear.length; i++) {
					total += (1 * this.sse.medidas_linear[i].v);
				}
			}
	
			if (this.sse.tipoDeServico.medida == 'u') {
				for (let i = 0; i < this.sse.medidas_unidades.length; i++) {
					total += (1 * this.sse.medidas_unidades[i].n);
				}
			}
			this.medidaTotal = total;
		} else {
			this.medidaTotal = 0;
		}
	}
}
