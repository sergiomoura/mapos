import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TipoDeEquipe } from "../_models/tipoDeEquipe";
import { Equipe } from "../_models/equipe";
import { Usuario } from "../_models/usuario";
import { EquipesService } from "../_services/equipes.service";
import { UsuariosService } from "../_services/usuarios.service";
import { MatSnackBar } from "@angular/material";

@Component({
	selector: 'app-equipe',
	templateUrl: './equipe.component.html',
	styleUrls: ['./equipe.component.scss']
})

export class EquipeComponent implements OnInit {

	constructor(
		public snackBar: MatSnackBar,
		private router:Router,
		private route:ActivatedRoute,
		private equipesService:EquipesService,
		private usuariosService:UsuariosService
	) { }

	// Atributos privados
	usuarios:Usuario[];
	tiposDeEquipe:TipoDeEquipe[];
	equipe:Equipe = <Equipe>{
		id:0,
		nome:'',
		sigla:'',
		tipo:undefined,
		ativa:true,
		membros:[]
	}
	tmp_equipe:any;

	ngOnInit() {
		this.getUsuarios();
		this.getTiposDeEquipe();
		this.getEquipe();
	}

	getEquipe():void{
		
		// Capturando o id da equipe na url
		let id = this.route.snapshot.paramMap.get('id');

		// Verificando se id é zero
		if(id != '0'){

			// Chamando serviço para carregar a equipe
			this.equipesService.getEquipeById(id).subscribe(
				res=>{
					// Verificando se carregou tipos de equipe e usuarios
					if(this.tiposDeEquipe != undefined && this.usuarios != undefined){
						
						// Carregou tiposDeEquipe e usuarios. Parsing
						this.equipe = this.parseEquipe(<any>res);

					} else {
						
						// Não carregou. Guardando response para processar depois
						this.tmp_equipe = res;						

					}
				},
				err => {
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao tentar carregar equipe.',
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
			);
		}
		
	}

	getUsuarios():void{
		this.usuariosService.getUsuarios()
		.subscribe(
			res => {
				this.usuarios = res;

				// Verificando se já carregou tiposDeEquipe e equipe
				if(this.tiposDeEquipe != undefined && this.tmp_equipe != undefined){

					// Tudo carregado. Parsin
					this.equipe = this.parseEquipe(this.tmp_equipe);

				}

			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao carregar usuários',
					'Fechar',
					{
						duration:0,
						horizontalPosition:'left',
						verticalPosition:'bottom'
					}
				);
			}
		);
	}

	getTiposDeEquipe():void{
		this.equipesService.getTiposDeEquipe().subscribe(
			res=>{
				// Copiando os tipos de equipe para sua variável
				this.tiposDeEquipe = res;

				// Verificando se equipe e usuarios já foram carregados
				if(this.tmp_equipe != undefined && this.usuarios != undefined){

					// Tudo carregado. Parsing
					this.equipe = this.parseEquipe(this.tmp_equipe);

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

	parseEquipe(tmp_equipe:any):Equipe{

		// Atribuindo tipo de equipe à equipe
		tmp_equipe.tipo = this.tiposDeEquipe.find( e => {return e.id == tmp_equipe.id_tipo} );
		delete tmp_equipe.id_tipo;

		// Atribuindo usuário ao id líder
		let lider =  this.usuarios.find( u => {return u.id == tmp_equipe.id_lider;});
		if(lider){
			tmp_equipe.lider = lider;
		} else {
			tmp_equipe.lider = null;
		}
		delete tmp_equipe.id_lider;

		// Atribuindo usuários a cada elemento do vetor de membros
		tmp_equipe.membros = [];
		for (let i = 0; i < tmp_equipe.ids_membros.length; i++) {
			const id_membro = tmp_equipe.ids_membros[i];
			tmp_equipe.membros.push(this.usuarios.find( u => {return u.id == id_membro} ));
		}
		delete tmp_equipe.ids_membros;

		// Retornando a equipe
		return <Equipe>tmp_equipe;
	}

	onCancelarClick(){
		this.router.navigateByUrl('/home/equipes');
	}

	onSalvarClick(){
		if(this.equipe.id == 0){

		} else {
			this.equipesService.update(this.equipe).subscribe(
				res => {
					
					// Exibindo snackbar de sucesso
					this.snackBar.open('Equipe alterada com sucesso!');

					// Navegando para tela de equipes
					this.router.navigateByUrl('/home/equipes');

				},
				err => {
					
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao tentar alterar equipe',
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
	}

}
