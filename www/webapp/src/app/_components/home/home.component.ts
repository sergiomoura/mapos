import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ProdutosService } from "../../_services/produtos.service";
import { MatSidenav } from "@angular/material";
import { AuthService } from "../../_services/auth.service";
import { Router } from '@angular/router';

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
	private IRDT:number = 1 * 60 * 1000; // Intervalo de Renovação Do Token (5 MINUTOS)
	private IDCE:number = 1 * 60 * 1000; // Intervalo de Checagem do Estoque (5 MINUTOS)

	constructor(
		private authService:AuthService,
		private prodService:ProdutosService,
		private router:Router
	) { }

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
	}

	ngOnDestroy(): void {
		// Interrompendo o timer que atualiza o token
		window.clearInterval(this.timerId);

		// Interrompendo o timer que checa o estoque
		window.clearInterval(this.checkStockTimerId);
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
		let verEstoque;

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

}
