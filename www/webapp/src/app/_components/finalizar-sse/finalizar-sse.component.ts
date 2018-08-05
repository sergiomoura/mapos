import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { SSE } from '../../_models/sse';
import { SsesService } from "../../_services/sses.service";

export interface DialogData {
	id_sse: number;
	data_conclusao: Date;
}

@Component({
	selector: 'app-finalizar-sse',
	templateUrl: './finalizar-sse.component.html',
	styleUrls: ['./finalizar-sse.component.scss']
})
export class FinalizarSseComponent implements OnInit {

	tipoDeFinalizacao:string = 'total';
	data_devolucao:Date = undefined;
	min_data_devolucao:Date = undefined;
	constructor(
		public dialogRef: MatDialogRef<FinalizarSseComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private sseService:SsesService,
		private snackBar:MatSnackBar
	) {
		this.min_data_devolucao = new Date(data.data_conclusao);
	}

	onSalvarClick(){
		this.sseService.setFinalizada(this.data.id_sse, this.tipoDeFinalizacao, this.data_devolucao)
		.subscribe(
			() => {
				this.dialogRef.close(1);
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao tentar finalizar SSE',
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

	onCancelarClick(){
		this.dialogRef.close(0);
	}

	ngOnInit() {
	}

}
