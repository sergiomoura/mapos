import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class EventsService {
	
	// Observable string sources
	private reloadClickedSource = new Subject();
	private filterClickedSource = new Subject();
	private mostrarCarregandoSource = new Subject();
	private esconderCarregandoSource = new Subject();

	// Observable string streams
	public reloadClicked$ = this.reloadClickedSource.asObservable();
	public filterClicked$ = this.filterClickedSource.asObservable();
	public mostrarCarrgando$ = this.mostrarCarregandoSource.asObservable();
	public esconderCarrgando$ = this.esconderCarregandoSource.asObservable();

	// Service message commands
	public reloadClicked(){
		this.reloadClickedSource.next()
	}

	public filterClicked(){
		this.filterClickedSource.next();
	}

	public mostrarCarregando(){
		this.mostrarCarregandoSource.next();
	}

	public esconderCarregando(){
		this.esconderCarregandoSource.next();
	}

	constructor() { }
}
