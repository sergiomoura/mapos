import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { SSE } from '../../_models/sse';
import { Domasa } from "../../_models/domasa";
import { SsesService } from '../../_services/sses.service';
import { DomasasService } from "../../_service/domasas.service";
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-sse',
	templateUrl: './sse.component.html',
	styleUrls: ['./sse.component.scss']
})
export class SseComponent implements OnInit {

	constructor(
		private route:ActivatedRoute,
		private ssesService:SsesService,
		private domasaService:DomasasService,
		private snackBar:MatSnackBar
	) { }

	sse:SSE = <SSE>{
		foto:null,
		numero:'',
	};

	private domasas:Domasa[];
	private domasaSelecionada:Domasa;

	ngOnInit() {
		this.getDomasas();
		this.getSse();
	}

	getSse(){
		let id = this.route.snapshot.paramMap.get('id');
		if(id != '0'){
			this.ssesService.getById(id).subscribe(
				res => {
					this.sse = this.parseSse(res);
				},
				err => {
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao tentar carregar SSE',
						'Fechar',
						{
							duration:0,
							horizontalPosition:'left',
							verticalPosition:'bottom',
							panelClass: ['snackbar-error'],
						}
					);

					// Imprimindo erro no console
					console.log(err);
				}
			)
		}
	}

	getDomasas(){
		this.domasaService.get().subscribe(
			res => {
				this.domasas = <Domasa[]>res;
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao carregar DOMASAS',
					'Fechar',
					{
						duration:0,
						horizontalPosition:'left',
						verticalPosition:'bottom',
						panelClass: ['snackbar-error'],
					}
				);

				// Imprimindo erro no console
				console.warn(err);
			}
		)
	}

	private parseSse(res):SSE{
		return <SSE> res;
	}
}
