import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { Produto } from "../../_models/produto";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ProdutosService } from '../../_services/produtos.service';
import { NgForm } from '@angular/forms';

export interface DialogData {
	produto:Produto;
}

@Component({
	selector: 'app-edit-produto',
	templateUrl: './edit-produto.component.html',
	styleUrls: ['./edit-produto.component.scss']
})

export class EditProdutoComponent implements OnInit {

	constructor(
		public dialogRef: MatDialogRef<EditProdutoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private prodService:ProdutosService,
		private snackBar:MatSnackBar
	) {
		this.produto = Object.assign({},data.produto);
	}

	@ViewChild('form') form:NgForm;
	produto:Produto;

	ngOnInit() {
	}

	onCancelarClick() {
		this.dialogRef.close(0);
	}

	onSalvarClick(){
		if (this.produto.id == 0) {
			this.prodService.create(this.produto).subscribe(
				res => {
					this.dialogRef.close(1);
					
					// Exibindo snackbar de sucesso
					this.snackBar.open(
						'Produto adicionado com sucesso!',
						undefined,
						{
							panelClass: ['snackbar-ok'],
						});
				},
				err => {
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao tentar adicionar produto.',
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
		} else {
			this.prodService.update(this.produto).subscribe(
				res => {
					this.dialogRef.close(1);
					
					// Exibindo snackbar de sucesso
					this.snackBar.open(
						'Produto alterado com sucesso!',
						undefined,
						{
							panelClass: ['snackbar-ok'],
						});
				},
				err => {
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao tentar alterar produto.',
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
		
	}

	onEnterKeyup(evt){
		if(this.form.valid){
			this.onSalvarClick();
		} else {
			// Exibindo snackbar de erro
			this.snackBar
			.open(
				'Formulário inválido. Campos preenchidos incorretamente',
				'Fechar',
				{
					duration:0,
					horizontalPosition:'left',
					verticalPosition:'bottom',
					panelClass: ['snackbar-error'],
				}
			);
		}
	}
}
