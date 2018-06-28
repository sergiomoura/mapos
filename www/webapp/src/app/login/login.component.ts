import { Component, OnInit } from '@angular/core';
import { AuthService } from "../_services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  login: {u:string, p:string} = {u:'',p:''};  

  constructor(private authService:AuthService) { }

  ngOnInit() {
  }

  onEntrarClick(){
    this.authService.login(this.login.u,this.login.p);
  }

  onEsqueciClick(){
    console.log(this.login);
  }

}
