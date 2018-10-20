import { Component, OnInit, Injectable } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { DomasasService } from 'src/app/_services/domasas.service';
import { Bairro } from 'src/app/_models/bairro';
import { TipoDeServico } from 'src/app/_models/tipoDeServico';
import { Equipe } from 'src/app/_models/equipe';
import { TiposDeServicoService } from 'src/app/_services/tipos-de-servico.service';
import { EquipesService } from 'src/app/_services/equipes.service';
import { Busca } from 'src/app/_models/busca';
import { EventsService } from 'src/app/_services/events.service';
import { SsesService } from 'src/app/_services/sses.service';
import { SSE } from 'src/app/_models/sse';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

enum ChavesDeBusca {
	MAPA = 'busca_mapa',
	GRID = 'busca_grid'
}

enum enum_prioridade {
	NORMAL = '0',
	PRIORIDADE = '1',
	URGENTE = '2'
}

enum enum_status {
	CANCELADA	= 'CANCELADA',
	RETRABALHO	= 'RETRABALHO',
	DIVERGENTE	= 'DIVERGENTE',
	CADASTRADA	= 'CADASTRADA',
	AGENDADA	= 'AGENDADA',
	EXECUTANDO	= 'EXECUTANDO',
	PENDENTE	= 'PENDENTE',
	FINALIZADA	= 'FINALIZADA'
};

class ElementoSelecionavel {
	elemento:Equipe | enum_prioridade | enum_status;
	selecionado:boolean;
}

@Injectable({
	providedIn: 'root'
})
class ParametrosDeBusca {
	
	public equipesSelecionaveis:ElementoSelecionavel[] = [];
	public prioridadesSelecionaveis:ElementoSelecionavel[] = [];
	public statusSelecionaveis:ElementoSelecionavel[] = [];
	public agendadas_de?: Date = null;
	public agendadas_ate?: Date = null;
	public realizadas_de?: Date = null;
	public realizadas_ate?: Date = null;
	public id_fechamento?: number = null;

	constructor(
		private equipesService:EquipesService,
		private router:Router
	){
		
		// Definindo local da busca no localStorage
		let chave:string;
		if(this.router.url == '/home/sses/grid') {
			chave = ChavesDeBusca.GRID;
		} else {
			chave = ChavesDeBusca.MAPA;
		}

		// Carregando busca a do local storage
		let strBusca = localStorage.getItem(chave);
		let busca: Busca;
		if(strBusca) {
			busca = <Busca>JSON.parse(strBusca);
		}

		

		// Criando vetor de prioridades selecionaveis
		for (let i in enum_prioridade) {
			
			let selecionado:boolean;
			if(busca){
				selecionado = busca.prioridades.findIndex(
					(p) => {
						return p == +<enum_prioridade>enum_prioridade[i];
					}
				) != -1;
			} else {
				selecionado = true;
			}

			this.prioridadesSelecionaveis.push(
				{
					'elemento': <enum_prioridade>enum_prioridade[i],
					'selecionado': selecionado
				}
			);

		}

		// Criando vetor de status selecionaveis
		for (let i in enum_status) {

			let selecionado:boolean;
			if(busca) {
				selecionado = busca.status.findIndex(
					(p) => {
						return p == <enum_status>enum_status[i];
					}
				) != -1;
			} else {
				selecionado = true;
			}

			this.statusSelecionaveis.push(
				{
					'elemento': <enum_status>enum_status[i],
					'selecionado': selecionado
				}
			);

		}

		// Criando vetor de equipes selecionáveis
		equipesService.getEquipes().subscribe(
			(equipes) => {
				
				for (let i = 0; i < equipes.length; i++) {

					let selecionado:boolean;
					if(busca) {
						selecionado = busca.equipes.findIndex(
							(equipe) => {
								return equipes[i].id == equipe.id;
							}
						) != -1;
					} else {
						selecionado = true;
					}

					this.equipesSelecionaveis.push(
						{
							elemento: equipes[i],
							selecionado: selecionado
						}
					);
				}
			}
		)
	}

	public get busca() : Busca {
		return {
			agendadas_ate: this.agendadas_ate,
			agendadas_de: this.agendadas_de,
			realizadas_ate: this.realizadas_ate,
			realizadas_de: this.realizadas_de,
			equipes: this.equipesSelecionaveis.filter(
				(es) => {
					return es.selecionado
				}
			).map(
				(es) => {
					return (<Equipe>es.elemento);
				}
			),
			prioridades: this.prioridadesSelecionaveis.filter(
				(es) => {
					return es.selecionado
				}
			).map(
				(es) => {
					return +<enum_prioridade>es.elemento;
				}
			),
			status: this.statusSelecionaveis.filter(
				(es) => {
					return es.selecionado
				}
			).map(
				(es) => {
					return <enum_status>es.elemento;
				}
			)
		}
	}
}

@Component({
	selector: 'app-buscador-modal',
	templateUrl: './buscador-modal.component.html',
	styleUrls: ['./buscador-modal.component.scss']
})
export class BuscadorModalComponent implements OnInit {

	public buscando:boolean;

	constructor(
		public dialogRef: MatDialogRef<BuscadorModalComponent>,
		private ssesService:SsesService,
		private snackBar:MatSnackBar,
		private parametrosDeBusca:ParametrosDeBusca,
		private router:Router
	) { }

	ngOnInit() {
	}
	
	onMTEquipesClick():void {
		for (let index = 0; index < this.parametrosDeBusca.equipesSelecionaveis.length; index++) {
			this.parametrosDeBusca.equipesSelecionaveis[index].selecionado = true;
		}
	}

	onDMTEquipesClick():void {
		for (let index = 0; index < this.parametrosDeBusca.equipesSelecionaveis.length; index++) {
			this.parametrosDeBusca.equipesSelecionaveis[index].selecionado = false;
		}
	}

	onMTStatusClick():void {
		for (let index = 0; index < this.parametrosDeBusca.statusSelecionaveis.length; index++) {
			this.parametrosDeBusca.statusSelecionaveis[index].selecionado = true;
		}
	}

	onDMTStatusClick():void {
		for (let index = 0; index < this.parametrosDeBusca.statusSelecionaveis.length; index++) {
			this.parametrosDeBusca.statusSelecionaveis[index].selecionado = false;
		}
	}

	onMTPrioridadesClick():void {
		for (let index = 0; index < this.parametrosDeBusca.prioridadesSelecionaveis.length; index++) {
			this.parametrosDeBusca.prioridadesSelecionaveis[index].selecionado = true;
		}
	}

	onDMTPrioridadesClick():void {
		for (let index = 0; index < this.parametrosDeBusca.prioridadesSelecionaveis.length; index++) {
			this.parametrosDeBusca.prioridadesSelecionaveis[index].selecionado = false;
		}
	}

	onBuscarClick():void {
		this.buscar();
	}

	onCancelarClick(){
		this.dialogRef.close(1);
	}

	private buscar():void{

		// Mostrar carregando
		this.buscando = true;

		// Fazendo requisição
		let busca:Busca = this.parametrosDeBusca.busca;
		this.ssesService.getAll(busca).subscribe(
			sses => {
				// esconde carregando
				this.buscando = false;

				// Definindo local de salvamento da busca no localStorage
				let chave:string;
				if(this.router.url == '/home/sses/grid') {
					chave = ChavesDeBusca.GRID;
				} else {
					chave = ChavesDeBusca.MAPA;
				}

				// Salvando busca no localStorage
				localStorage.setItem(chave,JSON.stringify(busca));

				// Fechando o diálogo
				this.dialogRef.close(0);

			},
			err => {
				// esconde carregando
				this.buscando = false;

				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao carregar SSEs.',
					'Fechar',
					{
						duration:0,
						horizontalPosition:'left',
						verticalPosition:'bottom',
						panelClass: ['snackbar-error'],
					}
				);

				// Imprimindo erro no console
				console.error(err);
			}
		)
	}

}