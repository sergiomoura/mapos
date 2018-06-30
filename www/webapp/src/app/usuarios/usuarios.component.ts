import { Component, OnInit } from '@angular/core';
import { Usuario } from "../_models/usuario";
import { UsuariosService } from "../_services/usuarios.service";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

	usuarios:Usuario[];

	constructor(
		private usuariosService:UsuariosService,
		private router:Router,
		private snackBar:MatSnackBar
	) { }

	ngOnInit() {
		this.getUsuarios();
	}

	getUsuarios():void{
		this.usuariosService.getUsuarios()
		.subscribe(
			usuarios => {
				this.usuarios = usuarios;
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

	onUsuarioClick(idu:number){
		this.router.navigateByUrl('/home/usuarios/' + idu);
	}

	onNovoUsuarioClick(){
		this.router.navigateByUrl('/home/usuarios/0');
	}

}
