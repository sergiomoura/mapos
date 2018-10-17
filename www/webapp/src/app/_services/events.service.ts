import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SSE } from '../_models/sse';

@Injectable({
	providedIn: 'root'
})
export class EventsService {
	
	// Observable string sources
	private reloadClickedSource = new Subject();
	private novaSseClickedSource = new Subject();
	private mostrarCarregandoSource = new Subject();
	private esconderCarregandoSource = new Subject();
	private ssesCarregadasSource = new Subject();

	// Observable string streams
	public reloadClicked$ = this.reloadClickedSource.asObservable();
	public novaSseClicked$ = this.novaSseClickedSource.asObservable();
	public mostrarCarrgando$ = this.mostrarCarregandoSource.asObservable();
	public esconderCarrgando$ = this.esconderCarregandoSource.asObservable();
	public ssesCarregadas$ = this.ssesCarregadasSource.asObservable();

	// Service message commands
	public reloadClicked(){
		this.reloadClickedSource.next()
	}

	public novaSseClicked(){
		this.novaSseClickedSource.next()
	}

	public mostrarCarregando(){
		this.mostrarCarregandoSource.next();
	}

	public esconderCarregando(){
		this.esconderCarregandoSource.next();
	}

	public ssesCarregadas(sses:SSE[]){
		this.ssesCarregadasSource.next(sses);
	}

	constructor() { }
}
