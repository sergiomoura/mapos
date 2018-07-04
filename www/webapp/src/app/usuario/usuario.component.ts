import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event } from '@angular/router';
import { MatSnackBar } from "@angular/material";
import { Usuario } from "../_models/usuario";
import { Equipe } from "../_models/equipe";
import { UsuariosService } from "../_services/usuarios.service";
import { EquipesService } from "../_services/equipes.service";

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.scss']
})

export class UsuarioComponent implements OnInit {

	constructor(
		public snackBar: MatSnackBar,
		private router:Router,
		private route:ActivatedRoute,
		private usuariosService:UsuariosService,
		private equipesService:EquipesService
	) { }
	
	// Atributos Privadas
	equipes:Equipe[];
	senha1:string;
	senha2:string;
	tmp_usuario:any;
	usuario:Usuario = <Usuario>{
		id:0,
		nome:'',
		email:'',
		username:'',
		ativo:true,
		acessoApp:false,
		acessoWeb:false,
		equipes:[]
	};
	

	ngOnInit() {
		this.getEquipes();
		this.getUsuario();
	}

	getUsuario(){
		
		// Capturando idu da url
		let idu = this.route.snapshot.paramMap.get('id');

		if(idu != '0'){
			
			// Chamando o serviço para carregar o usuário
			this.usuariosService.getById(idu).subscribe(
				res => {
					// Verificando se já baixou equipes
					if(this.equipes != undefined) {

						// Sim! Executando o parse
						this.usuario = this.parseUsuario(res);

					} else {

						// Não baixou equipe. Guardando resposta para parse futuro
						this.tmp_usuario = res;

					}
				},
				err => {
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao tentar carregar usuário',
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

	getEquipes():void{

		// Chamando serviço para carregar a equipes
		this.equipesService.getEquipes().subscribe(
			res=>{

				this.equipes = res;

				// Verificando se carregou usuario
				if(this.tmp_usuario != undefined){
					
					// Carregou tiposDeEquipe e usuarios. Parsing
					this.usuario = this.parseUsuario(<any>this.tmp_usuario);

				}
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao tentar carregar equipes.',
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
		);		
	}

	parseUsuario(tmp_usuario:any):Usuario{

		// Definindo campo de equipes
		tmp_usuario.equipes = [];

		// Parsing ids_equipes
		for (let i = 0; i < tmp_usuario.ids_equipes.length; i++) {
			const ide = tmp_usuario.ids_equipes[i];
			tmp_usuario.equipes.push(this.equipes.find( e => {return e.id == ide}));
		}
		delete tmp_usuario.ids_equipes;

		return <Usuario>tmp_usuario;
	}

	onSalvarClick(){
		
		if(this.usuario.id == 0){
			this.usuariosService.create(this.usuario,this.senha1)
			.subscribe(
				res => {
					// Exibindo snackbar de sucesso
					this.snackBar.open(
						'Usuário criado com sucesso!',
						undefined,
						{
							panelClass: ['snackbar-ok'],
						});

					// Navegando para página de usuários
					this.router.navigateByUrl('/home/usuarios');
				},
				err => {
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao tentar criar novo usuário',
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
		} else {
			this.usuariosService.update(this.usuario,this.senha1)
			.subscribe(
				res => {
					// Exibindo snackbar de sucesso
					this.snackBar.open(
						'Usuário atualizado com sucesso',
						undefined,
						{
							panelClass: ['snackbar-ok'],
						});

					// Redirecionando para página de usuários
					this.router.navigateByUrl('/home/usuarios');
				},
				err => {
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao tentar atualizar usuário.',
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

	onCancelarClick(){
		this.router.navigateByUrl('/home/usuarios');
	}

}
