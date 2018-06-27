import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../services/login.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  login: {u:string, p:string} = {u:'',p:''};  

  constructor(private loginService:LoginService) { }

  ngOnInit() {
  }

  onEntrarClick(){
    this.loginService.login(this.login.u,this.login.p);
  }

  onEsqueciClick(){
    console.log(this.login);
  }

}
