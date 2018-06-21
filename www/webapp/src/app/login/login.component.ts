import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  login: {u:string, p:string} = {u:'',p:''};  

  constructor() { }

  ngOnInit() {
  }

  onEntrarClick(){
    console.log(this.login);
  }

}
