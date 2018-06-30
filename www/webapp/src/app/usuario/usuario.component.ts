import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from "../_models/usuario";
import { UsuariosService } from "../_services/usuarios.service";
import { MatSnackBar } from "@angular/material";

@Component({
	selector: 'app-usuario',
	templateUrl: './usuario.component.html',
	styleUrls: ['./usuario.component.scss']
})
export class UsuarioComponent implements OnInit {

	constructor(public snackBar: MatSnackBar, private router:Router, private route:ActivatedRoute, private usuariosService:UsuariosService) { }
	
	usuario:Usuario = <Usuario>{
		id:0,
		nome:'',
		email:'',
		username:'',
		ativo:true,
		acessoApp:false,
		acessoWeb:false
	};

	senha1:string;
	senha2:string;

	ngOnInit() {
		this.getUsuario();
	}

	getUsuario(){
		
		// Capturando idu da url
		let idu = this.route.snapshot.paramMap.get('idu');

		if(idu != "0"){
			
			// Chamando o serviço para carregar o usuário
			this.usuariosService.getById(idu).subscribe(
				usuario => {this.usuario = usuario}
			)
		}

	}

	onSalvarClick(){
		if(this.usuario.id == 0){
			this.usuariosService.create(this.usuario,this.senha1)
			.subscribe(
				res => {
					// Exibindo snackbar de sucesso
					this.snackBar.open('Usuário criado com sucesso!');

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
							verticalPosition:'bottom'
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
					// Exibindo snack de sucesso
					this.snackBar.open('Usuário atualizado com sucesso!');

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
							verticalPosition:'bottom'
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
