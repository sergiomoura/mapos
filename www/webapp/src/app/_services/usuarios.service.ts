import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Usuario } from "../_models/usuario";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  constructor(private http:HttpClient) { }

  // Definição de urls
  private url_getUsuarios:string = 'http://localhost:8000/usuarios';
  

  // Método que lista todos os usuários
  getUsuarios():Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.url_getUsuarios);
  }
}
