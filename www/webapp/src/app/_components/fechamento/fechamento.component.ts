import { Component, OnInit, OnDestroy } from '@angular/core';
import { FechamentosService } from '../../_services/fechamentos.service';
import { Fechamento, FechamentoData } from '../../_models/fechamento';
import { Subscription } from 'rxjs';
import { EventsService } from '../../_services/events.service';
import { MatSnackBar } from '@angular/material';
import { TiposDeServicoService } from '../../_services/tipos-de-servico.service';
import { TipoDeServico } from '../../_models/tipoDeServico';
import { SSE } from '../../_models/sse';
import { ReturnStatement } from '@angular/compiler';
import { Router } from '@angular/router';
import { SsesService } from '../../_services/sses.service';


class xSSE extends SSE{
	marcada:boolean;
}

@Component({
	selector: 'app-fechamento',
	templateUrl: './fechamento.component.html',
	styleUrls: ['./fechamento.component.scss']
})
export class FechamentoComponent implements OnInit, OnDestroy {

	fechamentos:Fechamento[];
	fechamentoSelecionado:Fechamento;
	subscriptions:Subscription[] = [];
	tdss:TipoDeServico[];
	tmpSses:any[];

	private tudoMarcado:boolean = false;

	constructor(
		private fechamentosService:FechamentosService,
		private evtService:EventsService,
		private snackBar:MatSnackBar,
		private tdsService:TiposDeServicoService,
		private router:Router,
		private sseService:SsesService
	) { }

	ngOnInit() {
		this.getTiposDeServicos();
		this.getFechamentos();

		// Subscrevendo ao observavel de evento reload clicked
		this.subscriptions.push(
			this.evtService.reloadClicked$.subscribe(
				() => {
					this.onReloadClick();
				}
			)
		)
	}

	getTiposDeServicos() {
		this.tdsService.get().subscribe(
			(res) => {
				this.tdss = <TipoDeServico[]>res;
				this.parseSses();
			}
		)
	}

	getFechamentos() {
		this.fechamentosService.get().subscribe(
			(res) => {
				this.parseFechamentos(<FechamentoData[]>res);
			},
			(err) => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao carregar períodos de fechamento',
					'Fechar',
					{
						duration:0,
						horizontalPosition:'left',
						verticalPosition:'bottom',
						panelClass: ['snackbar-error'],
					}
				);

				// Imprimindo erro no console
				console.error(err);
			}
		)
	}

	private parseFechamentos(response:any[]){
		let temp:Fechamento[] = [];
		
		for (let i = 0; i < response.length; i++) {
			temp[i] = new Fechamento(response[i]);
		}

		this.fechamentos = temp;

		this.fechamentoSelecionado = this.fechamentos.find(
			(f) => {
				return f.aberto;
			}
		);
		this.getSSes(this.fechamentoSelecionado.id);
	}

	// Carrega sses
	private getSSes(id_fechamento:number):void{
		
		// Mostra Carregando
		this.evtService.mostrarCarregando();
		
		this.fechamentosService.getSses(id_fechamento).subscribe(
			(res) => {

				// Esconde Carregando
				this.evtService.esconderCarregando();

				// Copiando resposta para temp
				this.tmpSses = res;

				// Parsin
				this.parseSses();


			},
			(err) => {

				// Esconde Carregando
				this.evtService.esconderCarregando();

				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao carregar SSEs do fechamento selecionado.',
					'Fechar',
					{
						duration:0,
						horizontalPosition:'left',
						verticalPosition:'bottom',
						panelClass: ['snackbar-error'],
					}
				);

				// Imprimindo erro no console
				console.error(err);
			}
		)
	}

	// Parse SSes
	parseSses(){
		
		if(this.tmpSses && this.tdss){
			let sses:xSSE[] = [];
			for (let i = 0; i < this.tmpSses.length; i++) {
				sses.push(new xSSE(this.tmpSses[i],this.tdss));
			}
			this.fechamentoSelecionado.sses = sses;
		}
	}

	// ON Functions
	onReloadClick(){
		this.getSSes(this.fechamentoSelecionado.id);
	}

	ngOnDestroy(): void {
		// Unsubscribing from all subscriptions
		for (let i = 0; i < this.subscriptions.length; i++) {
			this.subscriptions[i].unsubscribe();
		}
	}

	onFechamentoChange(){
		this.getSSes(this.fechamentoSelecionado.id);
	}

	onMarcarTodasClick(){
		for (let i = 0; i < this.fechamentoSelecionado.sses.length; i++) {
			(<xSSE>this.fechamentoSelecionado.sses[i]).marcada = !this.tudoMarcado;
		}
		this.tudoMarcado = !this.tudoMarcado
	}

	onRowClick(id_sse:number):void{
		this.router.navigateByUrl('home/sse/' + id_sse);
	}

	onCheckboxClick(evt:MouseEvent){
		evt.stopPropagation();
	}

	onTransferirParaProxClick(){
		let id_fechamentoAtual:number = this.fechamentoSelecionado.id;
		let ids_sses:number[] = (<xSSE[]>this.fechamentoSelecionado.sses).filter(
			(sse) => {
				return sse.marcada
			}
		).map(
			sse => {
				return sse.id;
			}
		);

		this.fechamentosService.moverParaProximoFechamento(ids_sses,id_fechamentoAtual)
		.subscribe(
			()=>{
				// Recarregando as sses do fechamento selecionado
				this.getSSes(this.fechamentoSelecionado.id);

				// Exibindo snackbar de sucesso
				this.snackBar.open(
					'SSEs transferidas para próximo período de fechamento',
					undefined,
					{
						panelClass: ['snackbar-ok'],
					});
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao transferir SSEs para próximo fechamento.',
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

	onTransferirParaAntClick(){
		let id_fechamentoAtual:number = this.fechamentoSelecionado.id;
		let ids_sses:number[] = (<xSSE[]>this.fechamentoSelecionado.sses).filter(
			(sse) => {
				return sse.marcada
			}
		).map(
			sse => {
				return sse.id;
			}
		);

		this.fechamentosService.moverParaFechamentoAnterior(ids_sses,id_fechamentoAtual)
		.subscribe(
			()=>{
				// Recarregando as sses do fechamento selecionado
				this.getSSes(this.fechamentoSelecionado.id);

				// Exibindo snackbar de sucesso
				this.snackBar.open(
					'SSEs transferidas para período de fechamento anterior',
					undefined,
					{
						panelClass: ['snackbar-ok'],
					});
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao transferir SSEs para fechamento anterior.',
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

	onFecharClick(){
		this.fechamentosService.encerrar(this.fechamentoSelecionado.id)
		.subscribe(
			res => {
				// Recarregando fechamentos
				this.getFechamentos();

				// Exibindo snackbar de sucesso
				this.snackBar.open(
					'Encerrou o período de fechamento com sucesso.',
					undefined,
					{
						panelClass: ['snackbar-ok'],
					});
			},
			err => {

				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao tentar encerrar período de fechamento.',
					'Fechar',
					{
						duration:0,
						horizontalPosition:'left',
						verticalPosition:'bottom',
						panelClass: ['snackbar-error'],
					}
				);

				// Imprimindo mensagem de erro no console
				console.log(err)
			}
		)
	}

	onAbrirClick() {
		this.fechamentosService.reabrir(this.fechamentoSelecionado.id)
		.subscribe(
			res => {
				// Recarregando fechamentos
				this.getFechamentos();

				// Exibindo snackbar de sucesso
				this.snackBar.open(
					'Reabriu o período de fechamento com sucesso.',
					undefined,
					{
						panelClass: ['snackbar-ok'],
					});
			},
			err => {

				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao tentar reabrir período de fechamento.',
					'Fechar',
					{
						duration:0,
						horizontalPosition:'left',
						verticalPosition:'bottom',
						panelClass: ['snackbar-error'],
					}
				);

				// Imprimindo mensagem de erro no console
				console.log(err)
			}
		)
	}

	onChangeMedidaLibaradaClick(evt:MouseEvent,id_sse:number,novaMedida:number):void{

		// Parando a propagação do click
		evt.stopPropagation();
		
		// 
		let input:string = window.prompt("Qual o nova medida liberada?", novaMedida.toString());
		if(input){
			input = input.replace(',','.');
		}
		
		let medidaLiberada:number = Number(input);
		if(isNaN(medidaLiberada)){
			// Exibindo snackbar de erro
			this.snackBar
			.open(
				'Valor inválido para nova medida.',
				'Fechar',
				{
					duration:0,
					horizontalPosition:'left',
					verticalPosition:'bottom',
					panelClass: ['snackbar-error'],
				}
			);
		} else {
			this.sseService.alteraMedidaLiberada(id_sse, medidaLiberada).subscribe(
				() => {
					// Exibindo snackbar de sucesso
					this.snackBar.open(
						'Medida liberada alterada com sucesso!',
						undefined,
						{
							panelClass: ['snackbar-ok'],
						});
					
					// Recarregando sses do fechamento
					this.getSSes(this.fechamentoSelecionado.id);
				},
				(err) => {
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao alterar medida liberada. Confira o valor da medida inserida.',
						'Fechar',
						{
							duration:0,
							horizontalPosition:'left',
							verticalPosition:'bottom',
							panelClass: ['snackbar-error'],
						}
					);

					// Imprimindo erro no console
					console.error(err);
				}
			)
		}
	}
}
