import { Component, OnInit , Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Movimento } from '../../_models/movimento';
import { MovimentosService } from '../../_services/movimentos.service';

export interface DialogData{
	movimento:Movimento;
}

@Component({
	selector: 'app-edit-movimento',
	templateUrl: './edit-movimento.component.html',
	styleUrls: ['./edit-movimento.component.scss']
})
export class EditMovimentoComponent implements OnInit {

	public movimento:Movimento;

	constructor(
		public dialogRef: MatDialogRef<EditMovimentoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private movService:MovimentosService,
		private snackBar:MatSnackBar
	) {
		this.movimento = Object.assign({},data.movimento);
	}

	ngOnInit() {
	}

	onCancelarClick() {
		this.dialogRef.close(0);
	}

	onRemoverClick(){
		let pergunta:string = "Tem certeza que deseja excluir a movimentação?"
		if(window.confirm(pergunta)){
			this.movService.delete(this.movimento.id).subscribe(
				res => {
					// Exibindo snackbar de sucesso
					this.snackBar.open(
						'Movimento excluído com sucesso',
						undefined,
						{
							panelClass: ['snackbar-ok'],
						});
					
					// Fechando o diálogo
					this.dialogRef.close(1);
				},
				err => {
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao tentar excluir movimento',
						'Fechar',
						{
							duration:0,
							horizontalPosition:'left',
							verticalPosition:'bottom',
							panelClass: ['snackbar-error'],
						}
					);

					// Imprime erro no console
					console.dir(err);
				}
			)
		}
	}

	onSalvarClick(){
		let pergunta:string = "Tem certeza que deseja alterar a movimentação?"
		if(window.confirm(pergunta)){
			this.movService.update(this.movimento).subscribe(
				res => {
					// Exibindo snackbar de sucesso
					this.snackBar.open(
						'Movimentação alterada com sucesso',
						undefined,
						{
							panelClass: ['snackbar-ok'],
						});
					
					// Fechando o diálogo
					this.dialogRef.close(1);
				},
				err => {
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao tentar alterar movimentação',
						'Fechar',
						{
							duration:0,
							horizontalPosition:'left',
							verticalPosition:'bottom',
							panelClass: ['snackbar-error'],
						}
					);

					// Imprime erro no console
					console.dir(err);
				}
			)
		}
	}

}
