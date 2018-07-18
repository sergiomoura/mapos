import { Component, OnInit } from '@angular/core';
import { Equipe } from '../../_models/equipe';
import { MatSnackBar } from '@angular/material';
import { ActivatedRoute, Router} from '@angular/router';
import { EquipesService } from "../../_services/equipes.service";
import { TarefaService } from '../../_services/tarefa.service';
import { Tarefa } from '../../_models/tarefa';
import { SSE } from '../../_models/sse';
import { SsesService } from '../../_services/sses.service';

@Component({
	selector: 'app-tarefa',
	templateUrl: './tarefa.component.html',
	styleUrls: ['./tarefa.component.scss']
})
export class TarefaComponent implements OnInit {
	
	equipes:Equipe[] = [];
	tarefa:Tarefa;
	sse:SSE = <SSE>{
		id:0,
		endereco:'',
		dh_recebido:new Date(),
		dh_registrado:new Date(),
		tipoDeServico: {
			codigo:'',
			descricao:''
		}
	};
	reqTarefaResp:any;
	recebido_timestring:string;
	registrado_timestring:string;
	prazoentrega_timestring:string;
	
	constructor(
		private equipesService:EquipesService,
		private tarefaService:TarefaService,
		private ssesService:SsesService,
		private snackBar:MatSnackBar,
		private router:Router,
		private route:ActivatedRoute
	) { }

	ngOnInit() {
		this.getEquipes();
		this.getTarefa();
	}

	private getEquipes(){
		this.equipesService.getEquipes().subscribe(
			res => {
				this.equipes = <Equipe[]>res;
				this.parseTarefa();
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao carregar Equipes',
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

	private getTarefa(){
		// Capturando id da tarega
		let id = this.route.snapshot.paramMap.get('id');

		// Requisitando a tarefa do servidor
		if(id != '0'){
			this.tarefaService.getById(+id).subscribe(
				res => {
					this.reqTarefaResp = res;
					this.parseTarefa();
					this.getSSE(this.reqTarefaResp.id_sse);
				},
				err =>{
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao carregar tarefa',
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

	private getSSE(id:number){
		this.ssesService.getById(id,false).subscribe(
			res => {
				// Parsing SSE dates
				res.dh_recebido = new Date(res.dh_recebido);
				res.dh_registrado = new Date(res.dh_registrado);
				
				this.sse = <SSE>res;
				this.recebido_timestring = this.sse.dh_recebido.toISOString();
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao carregar SSE da tarefa',
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

	private parseTarefa(){

		if(this.reqTarefaResp && this.equipes) {

			// Parsing equipe
			this.reqTarefaResp.equipe = this.equipes.find(
				(e) => {
					return e.id == this.reqTarefaResp.id_equipe
				}
			)
			delete this.reqTarefaResp.id_equipe;

			// Parsing apoio
			if(this.reqTarefaResp.id_apoio == null) {

			} else {

				this.reqTarefaResp.apoio = this.equipes.find(
					(e) => {
						return e.id == this.reqTarefaResp.id_apoio
					}
				)
			}
			delete this.reqTarefaResp.id_apoio;

			// Parsing Dates previstas
			this.reqTarefaResp.inicio_p = new Date(this.reqTarefaResp.inicio_p);
			this.reqTarefaResp.final_p = new Date(this.reqTarefaResp.final_p);

			// Parsing dates realizadas
			this.reqTarefaResp.inicio_r = (this.reqTarefaResp.inicio_r == null ? null : new Date(this.reqTarefaResp.inicio_r));
			this.reqTarefaResp.final_r = (this.reqTarefaResp.final_r == null ? null : new Date(this.reqTarefaResp.final_r));

			// atribuindo a requisição a tarefa
			this.tarefa = <Tarefa>this.reqTarefaResp;

		}

	}


}
