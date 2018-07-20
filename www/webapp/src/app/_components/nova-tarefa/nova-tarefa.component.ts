import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { SSE } from '../../_models/sse';
import { Equipe } from '../../_models/equipe';
import { Tarefa } from '../../_models/tarefa';
import { TarefaService } from "../../_services/tarefa.service";

export interface DialogData {
	sse: SSE;
	equipes: Equipe[];
}

@Component({
	selector: 'app-nova-tarefa',
	templateUrl: './nova-tarefa.component.html',
	styleUrls: ['./nova-tarefa.component.scss']
})
export class NovaTarefaComponent implements OnInit {

	sse:SSE;
	equipes:Equipe[];
	tarefa:Tarefa;

	constructor(
		public dialogRef: MatDialogRef<NovaTarefaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private tarefaService:TarefaService,
		private snackBar:MatSnackBar
	) {
		this.sse = data.sse;
		this.equipes = data.equipes;
		this.tarefa = this.tarefaVazia();
	}

	ngOnInit() {

	}

	private tarefaVazia():Tarefa{
		let t = new Tarefa;
		t.sse = this.sse;
		t.id = 0;
		t.divergente = false;
		t.inicio_p = '';
		t.final_p = '';
		return t;
	}

	onCancelarClick(){
		this.dialogRef.close(0);
	}

	onSalvarClick(){
		this.tarefaService.create(this.tarefa).subscribe(
			res => {
				this.dialogRef.close(1);
				
				// Exibindo snackbar de sucesso
				this.snackBar.open(
					'SSE delegada com sucesso!',
					undefined,
					{
						panelClass: ['snackbar-ok'],
					});
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao delegar a SSE para a equipe.',
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
