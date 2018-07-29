import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
	selector: 'app-sses',
	templateUrl: './sses.component.html',
	styleUrls: ['./sses.component.scss']
})
export class SsesComponent implements OnInit {

	constructor(
		private router:Router
	) {}

	ngOnInit() {
	}

	onGridButtonClick(){
		this.router.navigateByUrl('home/sses/grid')
	}

	onMapButtonClick(){
		this.router.navigateByUrl('home/sses/map')
	}

	onNovaSSEButtonClick(){
		this.router.navigateByUrl('home/sse/0')
	}
}
