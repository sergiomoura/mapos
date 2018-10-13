import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ProdutosService } from "../../_services/produtos.service";
import { MatSidenav } from "@angular/material";
import { AuthService } from "../../_services/auth.service";
import { Router, NavigationEnd } from '@angular/router';
import { EventsService } from '../../_services/events.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit, OnDestroy {

	// Referenciando elemento da view (sidenav) aqui!
	@ViewChild('sidenav') sidenav:MatSidenav;

	// Definição de timerId
	private timerId:number;
	private checkStockTimerId:number;
	private IRDT:number = 1 * 60 * 1000; // Intervalo de Renovação Do Token (1 MINUTOS)
	private IDCE:number = 1 * 60 * 1000; // Intervalo de Checagem do Estoque (1 MINUTOS)
	private subscriptions:Subscription[] = [];
	public carregando:boolean = false;
	public buscaDisponivel:boolean;

	constructor(
		private authService:AuthService,
		private prodService:ProdutosService,
		private router:Router,
		private evtService:EventsService
	) {	}

	ngOnInit() {

		// Iniciando o timer que atualiza o token a cada IRDT microsegundos
		this.timerId = window.setInterval(()=>{this.authService.refresh();},this.IRDT);

		// Iniciando o timer que checa o estoque a cada IDCE + aleatório microsegundos
		this.checkStockTimerId = window.setInterval(
			() => {
				window.setTimeout(
					() => {
						this.prodService.get().subscribe(
							estoque => {
								this.checkStock(estoque);
							},
							err => {
								// Em caso de falha, imprime no console
								console.warn(err);
							}
						)
					},
					Math.round(Math.random()*10000+5000)
				)
			},this.IDCE
		)

		// Escutando evento de mostrar carregando
		this.subscriptions.push(
			this.evtService.mostrarCarrgando$.subscribe(
				() => {
					window.setTimeout(
						() => {
							this.carregando = true
						},100
					);
				}
			)
		);

		// Escutando evento de esconder carregando
		this.subscriptions.push(
			this.evtService.esconderCarrgando$.subscribe(
				() => {
					window.setTimeout(
						() => {
							this.carregando = false
						},100
					);
				}
			)
		);

		// Escutando evento de final de navegação
		this.subscriptions.push(
			this.router.events.subscribe(
				(e) => {
					if(e instanceof NavigationEnd){
						this.checaBotoes();
					}
				}
			)
		);

		// Verificando os botões que devem ficar disponíveis
		this.checaBotoes();
	}

	ngOnDestroy(): void {
		// Interrompendo o timer que atualiza o token
		window.clearInterval(this.timerId);

		// Interrompendo o timer que checa o estoque
		window.clearInterval(this.checkStockTimerId);

		// Saindo de todas as subscrições
		for (let i = 0; i < this.subscriptions.length; i++) {
			this.subscriptions[i].unsubscribe;
		}
	}

	checaBotoes(){
		// Configurando disponibilidade de botões a partir da url
		if (
			this.router.url == '/home/sses/map' ||
			this.router.url == '/home/sses/grid'
		) {
			this.buscaDisponivel = true;
		} else {
			this.buscaDisponivel = false;
		}
	}

	toggleSideNav(){
		if(this.sidenav.opened){
			this.sidenav.close();
		} else {
			this.sidenav.open();
		}
	}

	closeSideNav(){
		this.sidenav.close();
	}

	checkStock(produtos){
		
		let alertar = false;

		for (let i = 0; i < produtos.length; i++) {
			alertar = (alertar || produtos[i].qtde < produtos[i].qtde_min);
		}
		if(alertar){
			let pergunta:string = "Existem itens no estoque que estão abaixo do limite mínimo. Deseja conferir agora?"
			if(window.confirm(pergunta)) {
				this.router.navigateByUrl('home/estoque/produtos');
			}
		}
	}

	onAtualizarClick() {
		this.evtService.reloadClicked();
	}

	onNovaSSEButtonClick(){
		this.router.navigateByUrl('home/sse/0');
		this.evtService.novaSseClicked();
	}

	onGridButtonClick(){
		this.router.navigateByUrl('home/sses/grid')
	}

	onMapButtonClick(){
		this.router.navigateByUrl('home/sses/map');
	}

	onBuscarClick(){
		
	}

}
