import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SSE } from '../_models/sse';
import { SsesService } from '../_services/sses.service';

@Component({
	selector: 'app-sse',
	templateUrl: './sse.component.html',
	styleUrls: ['./sse.component.scss']
})
export class SseComponent implements OnInit {

	constructor(
		private route:ActivatedRoute,
		private ssesService:SsesService
	) { }

	sse:SSE;

	ngOnInit() {
		this.getSse();
	}

	getSse(){
		let id = this.route.snapshot.paramMap.get('id');
		if(id != '0'){
			this.ssesService.getById(id).subscribe(
				res => {
					console.log(res);
					this.sse = <SSE>res;
				},
				err => {
					console.log(err);
				}
			)
		}
	}
}
