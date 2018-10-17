import { Component, OnInit, ViewChild } from '@angular/core';
import { SsesService } from '../../_services/sses.service';
import { SSE } from '../../_models/sse';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Bairro } from "../../_models/bairro";
import { TipoDeServico } from "../../_models/tipoDeServico";
import { Equipe } from "../../_models/equipe";
import { TiposDeServicoService } from "../../_services/tipos-de-servico.service";
import { EquipesService } from "../../_services/equipes.service";
import { DomasasService } from '../../_services/domasas.service';
import { format, addYears, isBefore, differenceInDays} from 'date-fns';
import { Subscription } from 'rxjs';
import { EventsService } from '../../_services/events.service';
import { BuscadorComponent } from '../buscador/buscador.component';
import { Medida } from '../../_models/medida';
import { FaixaDeTDS } from '../../_models/faixaDeTds';

@Component({
	selector: 'app-sses',
	templateUrl: './sses-grid.component.html',
	styleUrls: ['./sses-grid.component.scss']
})
export class SsesGridComponent implements OnInit {
	sses:SSE[];
	tmpSses:any[];
	tdss:TipoDeServico[];
	equipes:Equipe[];
	bairros:Bairro[];
	infinito:number = 2000000000;
	subscriptions:Subscription[] = [];
	@ViewChild('buscador') buscador:BuscadorComponent;

	constructor(
		private ssesService:SsesService,
		private snackBar:MatSnackBar,
		private router:Router,
		private tdsService:TiposDeServicoService,
		private equipesService:EquipesService,
		private domasaSerive:DomasasService,
		private evtService:EventsService
	){}

	ngOnInit() {

		// Carregando Equipes e Bairros
		this.getEquipes();
		this.getBairros();

		// Subscrevendo ao observavel de evento reload clicked
		this.subscriptions.push(
			this.evtService.reloadClicked$.subscribe(
				() => {
					this.getSses();
				}
			)
		)

		// Subscrevendo ao observavel de evento sses carregadas
		this.subscriptions.push(
			this.evtService.ssesCarregadas$.subscribe(
				(sses) => {
					console.log("PEGUEI!");
					console.dir(sses);
					this.sses = <SSE[]>sses;
				}
			)
		)
	}

	ngOnDestroy(){
		// Unsubscribing from all subscriptions
		for (let i = 0; i < this.subscriptions.length; i++) {
			this.subscriptions[i].unsubscribe();
		}
	}

	onBuscarClick(){
		this.getSses();
	}
	
	getSses(){
		this.buscador.onBuscarClick();
	}

	getTiposDeServico(){
		this.tdsService.get().subscribe(
			res => {
				this.tdss = <TipoDeServico[]>res;
				this.parseSses();
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao carregar tipos de serviço',
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

	getEquipes(){
		this.equipesService.getEquipes().subscribe(
			res => {
				this.equipes = <Equipe[]>res;
				this.parseSses();
			},
			err => {
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao carregar Equipes',
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

	getBairros(){
		this.domasaSerive.getFlat().subscribe(
			res => {
				this.bairros = <Bairro[]>res;
				this.parseSses();
			}
		)
	}

	onSsesCarregadas(evt){
		this.tmpSses = evt;
		this.parseSses();
	}

	private parseSses(){
		this.sses = <SSE[]>this.tmpSses;
	}
	
	onSseButtonClick(id){
		this.router.navigateByUrl('/home/sse/' + id);
	}

	getDifMedida(sse:SSE):string{
		let mPrev:Medida = sse.totalPrev;
		let mReal:Medida = sse.totalReal;

		if(mReal){
			if(mPrev.unidade == mReal.unidade){
				return (mPrev.valor - mReal.valor) + ' ' + mPrev.unidade;
			} else {
				return 'Unidades Diferem';
			}
		} else {
			return '';
		}
	}

	getDivergencia(sse:SSE):string{
		let mPrev:Medida = sse.totalPrev;
		let mReal:Medida = sse.totalReal;

		if(mReal){
			if(Math.round((mPrev.valor - mReal.valor)*100)/100 == 0){
				return 'Não';
			} else {
				return 'Sim';
			}
		} else {
			return '';
		}
	}

	getDifTds(sse:SSE):string{
		if(sse.tipoDeServicoReal) {
			if(sse.tipoDeServicoPrev.codigo == sse.tipoDeServicoReal.codigo){
				return 'Não'
			} else {
				return 'Sim'
			}
		} else {
			return ''
		}
	}

}
