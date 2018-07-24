import { Component, OnInit } from '@angular/core';
import { Produto } from "../../_models/produto";
import { MovimentosService } from '../../_services/movimentos.service';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Movimento } from '../../_models/movimento';
import { ProdutosService } from '../../_services/produtos.service';
import { LancarNotaComponent } from '../lancar-nota/lancar-nota.component';
import { EditMovimentoComponent } from '../edit-movimento/edit-movimento.component';

@Component({
	selector: 'app-movimentos',
	templateUrl: './movimentos.component.html',
	styleUrls: ['./movimentos.component.scss']
})

export class MovimentosComponent implements OnInit {

	constructor(
		private movService:MovimentosService,
		private prodService:ProdutosService,
		private snackBar:MatSnackBar,
		public dialog: MatDialog
	) { }

	movimentos:Movimento[];
	tmpMovimentos:any[];
	produtos:Produto[];

	ngOnInit() {
		this.getProdutos();
		this.getMovimentos();
	}

	getMovimentos(){
		this.movService.get().subscribe(
			res => {
				this.tmpMovimentos = <any[]>res;
				this.parseMovimentos();
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao tentar carregar movimentos',
					'Fechar',
					{
						duration:0,
						horizontalPosition:'left',
						verticalPosition:'bottom',
						panelClass: ['snackbar-error'],
					}
				);

				// Imprimindo erro no console
				console.warn(err);
			}
		)
	}

	getProdutos(){
		this.prodService.get().subscribe(
			res => {
				this.produtos = <Produto[]>res;
				this.parseMovimentos();
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao tentar carregar produtos',
					'Fechar',
					{
						duration:0,
						horizontalPosition:'left',
						verticalPosition:'bottom',
						panelClass: ['snackbar-error'],
					}
				);

				// Imprimindo erro no console
				console.warn(err);
			}
		)
	}

	parseMovimentos(){
		if(this.tmpMovimentos && this.produtos){
			for (let i = 0; i < this.tmpMovimentos.length; i++) {
				const mov = this.tmpMovimentos[i];

				// Parsing produto
				mov.produto = this.produtos.find(
					(prod)=>{
						return prod.id == mov.id_produto;
					}
				)
				delete mov.id_produto;
				
				// Parsing dates
				mov.dh = new Date(mov.dh);
			}

			this.movimentos = this.tmpMovimentos;
		}
	}

	onLancarClick(){
		const dialogRef = this.dialog.open(LancarNotaComponent, {
			width: '700px',
			data: {
				'produtos': this.produtos
			},
			disableClose:true
		});
	
		dialogRef.afterClosed().subscribe(
			result => {
				if(result == 1){
					this.getMovimentos();
				}
			}
		);
	}

	onEditClick(movimento:Movimento){
		const dialogRef = this.dialog.open(EditMovimentoComponent,{
			width: '500px',
			data: {
				'movimento': movimento
			},
			disableClose:false
		})

		dialogRef.afterClosed().subscribe(
			result => {
				if(result == 1){
					this.getMovimentos();
				}
			}
		)
	}

}
