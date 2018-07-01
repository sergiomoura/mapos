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
	loginFalhou: boolean = false;

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
		.subscribe(
			res => {
				// login successful if there's a jwt token in the response
				if (res && res.token) {

					// Guara dados do usuário logado no localStorage do browser
					localStorage.setItem('currentUser', JSON.stringify(res));
					
					// Ir para a página home
					this.router.navigateByUrl('/home');
					
				}
			},
			err => {
				// Falha no login
				this.loginFalhou = true;
			}
		);
		
	}

	onEsqueciClick(){
		console.log(this.login);
	}

}
