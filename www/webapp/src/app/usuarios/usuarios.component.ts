import { Component, OnInit } from '@angular/core';
import { Usuario } from "../_models/usuario";
import { UsuariosService } from "../_services/usuarios.service";
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss']
})
export class UsuariosComponent implements OnInit {

  usuarios:Usuario[] = [
    {
        id: 1,
        nome: 'Ataúlfo Bezerra',
        email: 'ataulfo@acasamax.com.br',
        acessoApp: true,
        acessoWeb: false,
        ativo: true,
    },
    {
      id: 2,
      nome: 'Luiz Brasão',
      email: 'luiz@acasamax.com.br',
      acessoApp: true,
      acessoWeb: true,
      ativo: false,
    },{
      id: 4,
      nome: 'Último Augusto de Holanda',
      email: 'ataulfo@acasamax.com.br',
      acessoApp: true,
      acessoWeb: false,
      ativo: true,
    }
  ];

  constructor(private usuariosService:UsuariosService) { }

  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios():void{
    this.usuariosService.getUsuarios()
    .subscribe(usuarios => this.usuarios = usuarios);
  }

}
