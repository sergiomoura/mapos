import { Component, OnInit } from '@angular/core';
import { Equipe } from '../../_models/equipe';
import { TipoDeEquipe } from "../../_models/tipoDeEquipe";
import { EquipesService } from "../../_services/equipes.service";
import { MatSnackBar } from "@angular/material";
import { Router } from '@angular/router';
@Component({
	selector: 'app-equipes',
	templateUrl: './equipes.component.html',
	styleUrls: ['./equipes.component.scss']
})

export class EquipesComponent implements OnInit {

	equipes:Equipe[];
	tmp_equipes:any[];
	tiposDeEquipe:TipoDeEquipe[];

	constructor(
		private snackBar:MatSnackBar,
		private equipesService:EquipesService,
		private router:Router
	) { }

	ngOnInit() {
		this.getTiposDeEquipe();
		this.getEquipes();
	}

	getTiposDeEquipe():void{
		this.equipesService.getTiposDeEquipe().subscribe(
			res=>{
				// Copiando os tipos de equipe para sua variável
				this.tiposDeEquipe = res;

				// Verificando se as equiqpes já foram carregadas
				if(this.tmp_equipes != undefined){

					// Equipes já foram carregadas. Parsing
					this.equipes = this.parseEquipes(this.tmp_equipes);

					// Removendo tmp_equipes;
					delete this.tmp_equipes;
				}
				
			},
			err=>{
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao carregar os tipos de equipe',
					'Fechar',
					{
						duration:0,
						horizontalPosition:'left',
						verticalPosition:'bottom'
					}
				);

				// Imprimindo erro no console
				console.warn(err);
			}
		)
	}

	getEquipes():void{
		this.equipesService.getEquipes(true).subscribe(
			res=>{

				// Verificando se tipos de equipe já foi carregado
				if(this.tiposDeEquipe != undefined){

					// Tipos de Equipe já foi carregado. Parsing
					this.equipes = this.parseEquipes(res);

				} else {

					// Tipos de Equipe ainda não foi carregado

					// Salvando equipes para parsing futuro
					this.tmp_equipes = res;
				}
			},
			err=>{

				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao carregar equipes. Entre em contato com o suporte.',
					'Fechar',
					{
						duration:0,
						horizontalPosition:'left',
						verticalPosition:'bottom'
					}
				);

				// Imprimindo erro no console
				console.warn(err);
				
			}
		)
	}

	parseEquipes(equipes:any[]):Equipe[]{
		
		for (let i = 0; i < equipes.length; i++) {
			equipes[i].tipo = this.tiposDeEquipe.find(e => {return e.id==equipes[i].id_tipo});
			delete equipes[i].id_tipo;
		}

		return <Equipe[]>equipes;
	}

	onEquipeClick(id){
		this.router.navigateByUrl('/home/equipes/'+id);
	}

	onNovaEquipeClick(){
		this.router.navigateByUrl('/home/equipes/0');
	}

}
