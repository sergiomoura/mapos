import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { SSE } from '../../_models/sse';
import { Equipe } from '../../_models/equipe';
import { Tarefa } from '../../_models/tarefa';
import { TarefaService } from "../../_services/tarefa.service";
import { format } from "date-fns";

export interface DialogData {
	sse: SSE;
	equipes: Equipe[];
	id_tarefa: number;
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
	agora:string =  format(new Date(),'YYYY-MM-DDTHH:mm');
	constructor(
		public dialogRef: MatDialogRef<NovaTarefaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private tarefaService:TarefaService,
		private snackBar:MatSnackBar
	) {
		this.sse = data.sse;
		if(data.id_tarefa){
			this.tarefa = Object.assign({},(<any>this.sse).tarefas.find(
				t => {
					return t.id==data.id_tarefa;
				}
			));
			this.tarefa.inicio_p = format(this.tarefa.inicio_p,'YYYY-MM-DDTHH:mm');
			this.tarefa.final_p = format(this.tarefa.final_p,'YYYY-MM-DDTHH:mm');
		} else {
			this.tarefa = this.tarefaVazia();
		}
		this.equipes = data.equipes;
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
		if(this.tarefa.id == 0){
			this.tarefaService.create(this.tarefa).subscribe(
				res => {
					this.dialogRef.close(1);
					
					// Exibindo snackbar de sucesso
					this.snackBar.open(
						'SSE agendada com sucesso!',
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
		} else {
			this.tarefaService.update(this.tarefa).subscribe(
				res => {
					this.dialogRef.close(1);
					
					// Exibindo snackbar de sucesso
					this.snackBar.open(
						'Agendamento alterado com sucesso!',
						undefined,
						{
							panelClass: ['snackbar-ok'],
						});
				},
				err => {
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao tentar alterar agendamento.',
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

}
