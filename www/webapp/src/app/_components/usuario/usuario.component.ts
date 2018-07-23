import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Event } from '@angular/router';
import { MatSnackBar } from "@angular/material";
import { Usuario } from "../../_models/usuario";
import { UsuariosService } from "../../_services/usuarios.service";


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
		private usuariosService:UsuariosService
	) { }
	
	// Atributos Privadas
	senha1:string;
	senha2:string;
	tmp_usuario:any;
	usuario:Usuario = <Usuario>{
		id:0,
		nome:'',
		email:'',
		username:'',
		ativo:true,
		acessoApp:0,
		acessoWeb:false,
	};
	

	ngOnInit() {
		this.getUsuario();
	}

	getUsuario(){
		
		// Capturando idu da url
		let idu = this.route.snapshot.paramMap.get('id');

		if(idu != '0'){
			
			// Chamando o serviço para carregar o usuário
			this.usuariosService.getById(idu).subscribe(
				res => {
					this.usuario = <Usuario>res;
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
