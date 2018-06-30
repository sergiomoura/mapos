import { Component, OnInit } from '@angular/core';
import { Usuario } from "../_models/usuario";
import { UsuariosService } from "../_services/usuarios.service";
import { Router } from '@angular/router';
@Component({
	selector: 'app-usuarios',
	templateUrl: './usuarios.component.html',
	styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

	usuarios:Usuario[];

	constructor(
		private usuariosService:UsuariosService,
		private router:Router
	) { }

	ngOnInit() {
		this.getUsuarios();
	}

	getUsuarios():void{
		this.usuariosService.getUsuarios()
		.subscribe(usuarios => this.usuarios = usuarios);
	}

	onUsuarioClick(idu:number){
		this.router.navigateByUrl('/home/usuarios/' + idu);
	}

	onNovoUsuarioClick(){
		this.router.navigateByUrl('/home/usuarios/0');
	}

}
