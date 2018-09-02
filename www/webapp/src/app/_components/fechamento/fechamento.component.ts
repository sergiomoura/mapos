import { Component, OnInit } from '@angular/core';
import { FechamentosService } from '../../_services/fechamentos.service';
import { Fechamento } from '../../_models/fechamento';

@Component({
	selector: 'app-fechamento',
	templateUrl: './fechamento.component.html',
	styleUrls: ['./fechamento.component.scss']
})
export class FechamentoComponent implements OnInit {

	fechamentos:Fechamento[];
	fechamentoAberto:Fechamento;

	constructor(
		private fechamentosService:FechamentosService
	) { }

	ngOnInit() {
		this.getFechamentos();
	}

	getFechamentos() {
		this.fechamentosService.get().subscribe(
			(res) => {
				this.parseFechamentos(<any[]>res);
				console.log(this.fechamentos);
			},
			(err) => {
				console.log(err);
			}
		)
	}

	private parseFechamentos(response:any[]){
		let temp:Fechamento[] = [];
		
		for (let i = 0; i < response.length; i++) {
			temp[i] = new Fechamento(response[i]);
		}

		this.fechamentos = temp;
		this.fechamentoAberto = this.fechamentos.find(
			(f) => {
				return f.aberto;
			}
		)
	}

}
