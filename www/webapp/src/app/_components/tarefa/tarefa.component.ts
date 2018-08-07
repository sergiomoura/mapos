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
	tarefa:Tarefa = <Tarefa>{
		equipe:null,
		apoio:null
	};
	sse:SSE = <SSE>{
		id:0,
		endereco:'',
		dh_recebido:new Date(),
		dh_registrado:new Date(),
		tipoDeServicoPrev: {
			codigo:'',
			descricao:''
		}
	};
	reqTarefaResp:any;
	prazoDeEntrega:Date = new Date();
	atrasado:boolean = false;
	tempoRestante:number = 0;
	ssesPendentes:SSE[] = [];
	
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
		this.getSSEsPendentes();
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

				// Calculando prazo de entrega
				this.prazoDeEntrega = new Date(this.sse.dh_recebido.getTime());
				this.prazoDeEntrega.setDate(this.prazoDeEntrega.getDate()+this.sse.tipoDeServicoPrev.prazo);

				// Calculando o tempo restante
				this.tempoRestante = (this.prazoDeEntrega.getTime() - (new Date()).getTime())/1000;
				

				// Removendo a sse do vetor de ssesPendentes
				if(this.ssesPendentes){
					this.ssesPendentes = this.ssesPendentes.filter(
						(sse) => {
							return sse.id != this.sse.id;
						}
					)
				}
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

	private getSSEsPendentes(){
		this.ssesService.getPendentes().subscribe(
			res => {
				this.ssesPendentes = <SSE[]>res;
				if(this.sse.id) {
					this.ssesPendentes.filter(
						(s) => {
							return s.id != this.sse.id;
						}
					);
				}
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao carregar SSEs',
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
				this.reqTarefaResp.apoio = null;
			} else {

				this.reqTarefaResp.apoio = this.equipes.find(
					(e) => {
						return e.id == this.reqTarefaResp.id_apoio
					}
				)
			}
			delete this.reqTarefaResp.id_apoio;

			// Parsing Dates previstas
			this.reqTarefaResp.inicio_p = this.reqTarefaResp.inicio_p.replace(' ','T');
			this.reqTarefaResp.final_p = this.reqTarefaResp.final_p.replace(' ','T');

			// atribuindo a requisição a tarefa
			this.tarefa = <Tarefa>this.reqTarefaResp;

		}

	}

	onSalvarTarefaClick(){
		
		if(this.tarefa.id == 0) {
			
		} else {
			this.updateTarefa();
		}
	}

	private updateTarefa(){
		this.tarefaService.update(this.tarefa).subscribe(
			res => {
				console.log(res);
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao tentar salvar a tarefa',
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
