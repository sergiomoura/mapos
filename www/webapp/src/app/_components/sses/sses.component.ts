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
	
}
