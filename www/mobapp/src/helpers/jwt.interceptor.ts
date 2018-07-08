import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Storage } from "@ionic/storage";
import { fromPromise } from 'rxjs/observable/fromPromise';
import { mergeMap } from 'rxjs/operators/mergeMap';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
	constructor(
		private storage:Storage
	){}

	getToken():Promise<any>{
		return this.storage.get('currentUser');
	}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		return fromPromise(this.getToken())
		.pipe(
			mergeMap(
				currentUser => {
					if(currentUser && currentUser.token){
						// Use the token in the request
						request = request.clone(
							{
								setHeaders: {Authorization: 'Bearer ' + currentUser.token}
							}
						);
					}
	
					// Handle the request
					return next.handle(request);
				}
			)
		);
    }
}