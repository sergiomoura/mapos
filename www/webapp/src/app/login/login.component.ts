import { Component, OnInit } from '@angular/core';
import { AuthService } from "../_services/auth.service";
import { Router, ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  login: {u:string, p:string} = {u:'',p:''};
  returnUrl: string; 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    // reset login status
    this.authService.logout();
 
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/home';

  }

  onEntrarClick(){
    this.authService.login(this.login.u,this.login.p)
    .add(data => {this.router.navigate([this.returnUrl]);})
    
  }

  onEsqueciClick(){
    console.log(this.login);
  }

}
