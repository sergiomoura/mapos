import { Component, OnInit } from '@angular/core';
import { SsesService } from '../../_services/sses.service';
import { SSE } from '../../_models/sse';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sses-map',
	templateUrl: './sses-map.component.html',
	styleUrls: ['./sses-map.component.scss']
})
export class SsesMapComponent implements OnInit {

	constructor(
		private ssesService:SsesService,
		private snackBar:MatSnackBar,
		private router:Router
	) {}

	sses:SSE[];
	initial_lat:number = -22.916405805627686;
	initial_lng:number = -47.067499388564215;
	initial_zoom:number = 12;

	ngOnInit() {
		this.getSses();
	}

	getSses(){
		this.ssesService.getAll().subscribe(
			res => {
				this.sses = this.parseSsesResponse(res);
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao tentar carregar SSEs',
					'Fechar',
					{
						duration:0,
						horizontalPosition:'left',
						verticalPosition:'bottom',
						panelClass: ['snackbar-error'],
					}
				);
			
			}
		)
	}

	onMarkerClick(evt,sse){
		
	}


	private parseSsesResponse(res):SSE[]{
		for (let i = 0; i < res.length; i++) {
			res[i].dh_registrado = new Date(res[i].dh_registrado);
			res[i].lat *= 1;
			res[i].lng *= 1;
		}
		return <SSE[]>res;
	}

	onMapClick(evt){
		console.log(evt);
	}
	goToSse(id) {
		this.router.navigateByUrl('home/sse/'+id);
	}

}
