import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class AuthProvider {

  private login_url:string = 'http://localhost:8000/api/login';

  constructor(
    public http: HttpClient
  ) {}

  login(username:string,password:string) {
    let data:{username:string,password:string} = {username:username,password:password}
    return this.http.post(this.login_url,data);
  }

}
