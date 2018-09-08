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
	carregando:boolean;
	constructor(
		public dialogRef: MatDialogRef<NovaTarefaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
		private tarefaService:TarefaService,
		private snackBar:MatSnackBar,
	) {
		this.carregando = false;
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

		// Mostra Carregando
		this.mostrarCarregando();

		if(this.tarefa.id == 0){
			this.tarefaService.create(this.tarefa).subscribe(
				res => {

					// Esconde Carregando
					this.esconderCarregando();

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
					
					// Esconde Carregando
					this.esconderCarregando();

					// Selecionando mensagem de erro
					let msg:string;
					if(err == 'Gone'){
						msg = 'Equipe já está agendada para este horário.'
					} else if(err = 'Request Entity Too Large') {
						msg = 'Equipe já tem ou teve um agendamento para esta SSE.'
					} else {
					 	msg = 'Falha ao agendar a SSE para a equipe.'
					}

					// Exibindo snackbar de erro
					this.snackBar
					.open(
						msg,
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

					// Esconde Carregando
					this.esconderCarregando();

					// Fecha o diálogo
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

					// Esconde Carregando
					this.esconderCarregando();

					// Selecionando mensagem de erro
					let msg:string;
					if(err == 'Gone'){
						msg = 'Equipe já está agendada para este horário.'
					} else if(err = 'Request Entity Too Large') {
						msg = 'Equipe já tem ou teve um agendamento para esta SSE.'
					} else {
					 	msg = 'Falha ao agendar a SSE para a equipe.'
					}

					// Exibindo snackbar de erro
					this.snackBar
					.open(
						msg,
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

	public get inicioAntesDoFinal() : boolean {
		if(this.tarefa.inicio_p && this.tarefa.final_p) {
			return this.tarefa.inicio_p < this.tarefa.final_p;
		} else {
			return true;
		}
	}

	public get inicioNoFuturo() : boolean {
		if (this.tarefa.inicio_p){
			return this.tarefa.inicio_p > this.agora
		} else {
			return true;
		}
	}

	// Mostra Carregando
	mostrarCarregando(){
		this.carregando = true;
	}

	// Esconde Carregando
	esconderCarregando(){
		this.carregando = false;
	}


}
