import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { DomasasService } from 'src/app/_services/domasas.service';
import { Bairro } from 'src/app/_models/bairro';
import { TipoDeServico } from 'src/app/_models/tipoDeServico';
import { Equipe } from 'src/app/_models/equipe';
import { TiposDeServicoService } from 'src/app/_services/tipos-de-servico.service';
import { EquipesService } from 'src/app/_services/equipes.service';
import { Busca } from 'src/app/_models/busca';

@Component({
	selector: 'app-buscador-modal',
	templateUrl: './buscador-modal.component.html',
	styleUrls: ['./buscador-modal.component.scss']
})
export class BuscadorModalComponent implements OnInit {

	public bairros:Bairro[];
	public tdss:TipoDeServico[];
	public equipes:Equipe[];
	public busca:Busca = {
		equipes : [],
		status : ['RETRABALHO','DIVERGENTE','CADASTRADA','AGENDADA','EXECUTANDO','PENDENTE'],
		prioridades: [0,1,2],
		agendadas_de: undefined,
		agendadas_ate: undefined,
		realizadas_de: undefined,
		realizadas_ate: undefined
	}

	constructor(
		public dialogRef: MatDialogRef<BuscadorModalComponent>,
		private domasasService:DomasasService,
		private tdsService:TiposDeServicoService,
		private equipesService:EquipesService
	) { }

	ngOnInit() {
		this.getBairros();
		this.getTdss();
		this.getEquipes();
	}

	private getBairros():void{
		this.domasasService.getFlat().subscribe(
			(bairros) => {
				this.bairros = bairros;
			}
		)
	}

	private getTdss():void{
		this.tdsService.get().subscribe(
			(tdss) => {
				this.tdss = tdss;
			}
		)
	}

	private getEquipes():void{
		this.equipesService.getEquipes().subscribe(
			(equipes) => {
				this.equipes = equipes;
			}
		)
	}
}
