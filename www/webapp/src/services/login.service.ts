import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private loginUrl:string = 'http://localhost:8000/login';

  constructor(
    private http:HttpClient
  ) { }

  login(u:string,p:string) {
    console.log(u,p);
    this.http.post(this.loginUrl,{u,p}).subscribe(
      data => {
        console.log(data,"from server");
      }
    )
  }
}
