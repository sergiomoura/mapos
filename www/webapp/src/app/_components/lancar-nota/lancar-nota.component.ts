import { Component, OnInit , Inject } from '@angular/core';
import { Produto } from '../../_models/produto';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { MovimentosService } from '../../_services/movimentos.service';
import { NF } from '../../_models/nf';
import { Movimento } from '../../_models/movimento';

export interface DialogData {
	produtos:Produto[];
}

@Component({
	selector: 'app-lancar-nota',
	templateUrl: './lancar-nota.component.html',
	styleUrls: ['./lancar-nota.component.scss']
})
export class LancarNotaComponent implements OnInit {
	
	public nf:NF;

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private snackBar:MatSnackBar,
		public dialogRef: MatDialogRef<LancarNotaComponent>,
		private movService:MovimentosService
	) { 
		this.nf = new NF();
		this.nf.numero = null;
		this.nf.data = null;
		this.nf.movimentos = [];		
		this.addMovimento();
	}

	ngOnInit() {
		
	}

	addMovimento(){
		let m:Movimento = new Movimento();
		this.nf.movimentos.push(m);
	}

	onAddClick() {
		this.addMovimento();
	}

	onDeleteClick(i){
		this.nf.movimentos.splice(i,1);
	}

	onCancelarClick() {
		this.dialogRef.close(0);
	}

	onSalvarClick(){
		this.movService.createNf(this.nf).subscribe(
			res => {
				// Exibindo snackbar de sucesso
				this.snackBar.open(
					'Lançou nota com sucesso',
					undefined,
					{
						panelClass: ['snackbar-ok'],
					});

				// Fechando dialog
				this.dialogRef.close(1);
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao tentar lançar nota.',
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



}
