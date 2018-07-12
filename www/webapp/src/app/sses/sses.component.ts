import { Component, OnInit } from '@angular/core';
import { SsesService } from '../_services/sses.service';
import { SSE } from '../_models/sse';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
	selector: 'app-sses',
	templateUrl: './sses.component.html',
	styleUrls: ['./sses.component.scss']
})
export class SsesComponent implements OnInit {

	constructor(
		private ssesService:SsesService,
		private snackBar:MatSnackBar,
		private router:Router
	){}

	sses:SSE[];

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
	
	onSseClick(id){
		this.router.navigateByUrl('/home/sses/' + id);
	}	

	private parseSsesResponse(res):SSE[]{
		for (let i = 0; i < res.length; i++) {
			res[i].dh_registrado = new Date(res[i].dh_registrado);
		}
		return <SSE[]>res;
	}

}
