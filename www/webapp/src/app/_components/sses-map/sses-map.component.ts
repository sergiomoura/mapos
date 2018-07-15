import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-sses-map',
	templateUrl: './sses-map.component.html',
	styleUrls: ['./sses-map.component.scss']
})
export class SsesMapComponent implements OnInit {

	constructor() { }

	initial_lat:number = -22.916405805627686;
	initial_lng:number = -47.067499388564215;
	initial_zoom:number = 12;

	ngOnInit() {
	}

	onMapClick(evt){
		console.log(evt);
	}

}
