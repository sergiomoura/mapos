import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class EventsService {
	
	// Observable string sources
	private reloadClickedSource = new Subject();
	private filterClickedSource = new Subject();

	// Observable string streams
	public reloadClicked$ = this.reloadClickedSource.asObservable();
	public filterClicked$ = this.filterClickedSource.asObservable();

	// Service message commands
	public reloadClicked(){
		this.reloadClickedSource.next()
	}

	public filterClicked(){
		this.filterClickedSource.next();
	}

	constructor() { }
}
