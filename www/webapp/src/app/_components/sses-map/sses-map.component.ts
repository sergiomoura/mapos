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
			const sse = res[i];
			sse.dh_registrado = new Date(sse.dh_registrado);
			sse.lat *= 1;
			sse.lng *= 1;

			// Determinando o nome do arquivo marker
			sse.markerFile = 'marker-';
			switch (+sse.status) {
				case -1:
					sse.markerFile += 'divergente'
					break;
				
				case 0:
					sse.markerFile += 'virgem'
					break;

				case 1:
					sse.markerFile += 'delegada'
					break;
				
				case 2:
					sse.markerFile += 'emExecucao'
					break;
				
				case 3:
					sse.markerFile += 'execucaoConcluida'
					break;
				
				case 100:
					sse.markerFile += 'concluida'
					break;
			}

			if(sse.urgente == "1"){
				sse.markerFile += '-u';
			}

			sse.markerFile += '.svg';
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
