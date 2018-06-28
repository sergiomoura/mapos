import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private loginUrl:string = 'http://localhost:8000/login';

  constructor(
    private http:HttpClient
  ) { }

  login(u:string,p:string) {
    this.http.post(this.loginUrl,{u,p}).subscribe(
      data => {}
    );
  }

  logout() {
	  localStorage.removeItem('currentUser');
  }
}
