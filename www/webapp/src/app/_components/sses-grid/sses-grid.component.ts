import { Component, OnInit } from '@angular/core';
import { SsesService } from '../../_services/sses.service';
import { SSE } from '../../_models/sse';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Busca } from "../../_models/busca";
import { Bairro } from "../../_models/bairro";
import { TipoDeServico } from "../../_models/tipoDeServico";
import { Equipe } from "../../_models/equipe";
import { TiposDeServicoService } from "../../_services/tipos-de-servico.service";
import { EquipesService } from "../../_services/equipes.service";
import { DomasasService } from '../../_services/domasas.service';

@Component({
	selector: 'app-sses',
	templateUrl: './sses-grid.component.html',
	styleUrls: ['./sses-grid.component.scss']
})
export class SsesGridComponent implements OnInit {
	sses:SSE[];
	tmpSses:any[];
	tdss:TipoDeServico[];
	equipes:Equipe[];
	bairros:Bairro[];
	busca:Busca = {
		equipes : [],
		status : ['RETRABALHO','DIVERGENTE','CADASTRADA','AGENDADA','EXECUTANDO','PENDENTE'],
		prioridades: [0,1,2],
		agendadas_de: undefined,
		agendadas_ate: undefined,
		realizadas_de: undefined,
		realizadas_ate: undefined
	};
	buscaPadrao:Busca = {
		equipes : [],
		status : ['RETRABALHO','DIVERGENTE','CADASTRADA','AGENDADA','EXECUTANDO','PENDENTE'],
		prioridades: [0,1,2],
		agendadas_de: undefined,
		agendadas_ate: undefined,
		realizadas_de: undefined,
		realizadas_ate: undefined
	}

	constructor(
		private ssesService:SsesService,
		private snackBar:MatSnackBar,
		private router:Router,
		private tdsService:TiposDeServicoService,
		private equipesService:EquipesService,
		private domasaSerive:DomasasService
	){}

	ngOnInit() {
		this.getSses();
		this.getTiposDeServico();
		this.getEquipes();
		this.getBairros();
	}

	onBuscarClick(){
		this.getSses();
	}

	onResetCamposClick(){
		this.busca = this.buscaPadrao;
	}

	getSses(){
		this.ssesService.getAll(this.busca).subscribe(
			res => {
				this.tmpSses = res;
				this.parseSses();
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao tentar carregar SSEs',
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

	getTiposDeServico(){
		this.tdsService.get().subscribe(
			res => {
				this.tdss = <TipoDeServico[]>res;
				this.parseSses();
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao carregar tipos de serviço',
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

	getEquipes(){
		this.equipesService.getEquipes().subscribe(
			res => {
				this.equipes = <Equipe[]>res;
				this.parseSses();
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

	getBairros(){
		this.domasaSerive.getFlat().subscribe(
			res => {
				this.bairros = <Bairro[]>res;
				this.parseSses();
			}
		)
	}

	private parseSses(){

		if(this.tmpSses && this.tdss && this.equipes && this.bairros){
			
			for (let i = 0; i < this.tmpSses.length; i++) {

				// Lendo sse da vez
				const sse = this.tmpSses[i];

				// Parsing escalares
				sse.dh_registrado = new Date(sse.dh_registrado);
				sse.dh_recebido = new Date(sse.dh_recebido);
				
				// Paring Equipe
				sse.equipe = this.equipes.find(
					(e) => {
						return +(e.id) == +(sse.id_equipe);
					}
				)
				delete sse.id_equipe;

				// Parsing tipo de serviço previsto
				sse.tipoDeServicoPrev = this.tdss.find(
					(tds) => {
						return +tds.id == +sse.id_tds_p;
					}
				)
				delete sse.id_tds_p;

				// Parsing tipo de serviço real
				sse.tipoDeServicoReal = this.tdss.find(
					(tds) => {
						return +tds.id == +sse.id_tds_r;
					}
				)
				delete sse.id_tds_r;
				// Pargsing bairro
				sse.bairro = this.bairros.find(
					(bairro) => {
						return +bairro.id == +sse.id_bairro;
					}
				)
				delete sse.id_bairro;

				// Determinando o prazo final
				// sse.prazoFinal = new Date(sse.dh_recebido.getTime());
				// sse.prazoFinal.setDate(+sse.prazoFinal.getDate() + (+sse.tipoDeServico.prazo));
				
				// Determinando o tempo restante
				// sse.tempoRestante = (sse.prazoFinal.getTime() - (new Date()).getTime())/1000;
	
				// Determinando o nome do arquivo marker
				
				switch (+sse.status) {
					case -100:
						sse.statusMessage = 'Cancelada';
						break;

					case -2:
						sse.statusMessage = 'Retrabalho';
						break;

					case -1:
						sse.statusMessage = 'Divergente';
						break;
					
					case 0:
						sse.statusMessage = 'Cadastrada';
						break;
	
					case 1:
						sse.statusMessage = 'Agendada';
						break;
					
					case 2:
						sse.statusMessage = 'Executando';
						break;
					
					case 3:
						sse.statusMessage = 'Pendente';
						break;
					
					case 100:
						sse.statusMessage = 'Finalizada';
						break;
				}
				
				// parsing equipes e apoios das tarefas 
				for (let i = 0; i < sse.tarefas.length; i++) {
					
					// Separando tarefa a tratar
					const tarefa = sse.tarefas[i];
					
					// Parsing equipe encarregada pela tarefa
					tarefa.equipe = this.equipes.find(
						(e) => {
							return e.id == tarefa.id_equipe;
						}
					)
					delete tarefa.id_equipe;

					// Parsing apoio encarregado pela tarefa
					tarefa.apoio = this.equipes.find(
						(e) => {
							return e.id == tarefa.id_apoio;
						}
					)
					delete tarefa.id_apoio;

					// Parsing dates
					tarefa.inicio_p = new Date(tarefa.inicio_p);
					tarefa.final_p = new Date(tarefa.final_p);
					tarefa.inicio_r = (tarefa.inicio_r == null ? null : new Date(tarefa.inicio_r));
					tarefa.final_r = (tarefa.final_r == null ? null : new Date(tarefa.final_r));
				}
			}
		}
		this.sses = this.tmpSses;
	}
	
	onSseButtonClick(id){
		this.router.navigateByUrl('/home/sse/' + id);
	}	

	private parseSsesResponse(res):SSE[]{
		for (let i = 0; i < res.length; i++) {
			res[i].dh_registrado = new Date(res[i].dh_registrado);
		}
		return <SSE[]>res;
	}

}
