import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  constructor(private http:HttpClient) { }

  // Definição de urls
  private url_getUsuarios:string = 'http://localhost:8000/usuarios';
  

  // Método que lista todos os usuários
  getUsuarios() {
    return this.http.get<any>(this.url_getUsuarios)
		.subscribe(
      response => {
			  // carregou usuários com sucesso
			  console.log(response);
      },
      error => {
        // falhou ao carregar usuários
        console.log(error);
      }
    );
  }
}
