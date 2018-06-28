import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	
	// Construtor
	constructor(private router:Router){}

	// Método canActivate
	canActivate(route:ActivatedRouteSnapshot,state: RouterStateSnapshot):boolean {
		// Verificando se o usuário está setado no localStorage	
		if (localStorage.getItem('currentUser')) {

				// Usuário logado; Retorna true!
				return true;
				
			} else {
					
					// Não está logado.

					// Navegando para página de login
					this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});

					// Retornando false
					return false;
			}
	}
}
