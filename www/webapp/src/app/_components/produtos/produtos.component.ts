import { Component, OnInit } from '@angular/core';
import { ProdutosService } from '../../_services/produtos.service';
import { MatSnackBar, MatDialog } from "@angular/material";
import { Produto } from "../../_models/produto";
import { EditProdutoComponent } from "../edit-produto/edit-produto.component";

@Component({
	selector: 'app-produtos',
	templateUrl: './produtos.component.html',
	styleUrls: ['./produtos.component.scss']
})
export class ProdutosComponent implements OnInit {

	produtos:Produto[];

	constructor(
		private prodService:ProdutosService,
		private snackBar:MatSnackBar,
		public dialog: MatDialog
	) { }

	ngOnInit() {
		this.getProdutos();
	}

	getProdutos(){
		this.prodService.get().subscribe(
			res => {
				this.produtos = <Produto[]>res;
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
			}
		)
	}

	openEditProdutoDialog(produto?:Produto): void {
		const dialogRef = this.dialog.open(EditProdutoComponent, {
			width: '600px',
			data: {
				'produto': produto
			}
		});
	
		dialogRef.afterClosed().subscribe(
			result => {
				if(result == 1){
					this.getProdutos();
				}
			}
		);
	}

}
