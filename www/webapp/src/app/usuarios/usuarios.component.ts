import { Component, OnInit } from '@angular/core';
import { Usuario } from "../_models/usuario";
import { UsuariosService } from "../_services/usuarios.service";
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[];

  constructor(private usuariosService:UsuariosService) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios():void{
    this.usuariosService.getUsuarios()
    .subscribe(usuarios => this.usuarios = usuarios);
  }

}
