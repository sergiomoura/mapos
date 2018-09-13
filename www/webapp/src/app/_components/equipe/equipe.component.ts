import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TipoDeEquipe } from "../../_models/tipoDeEquipe";
import { Equipe } from "../../_models/equipe";
import { EquipesService } from "../../_services/equipes.service";
import { MatSnackBar } from "@angular/material";
import { MembroDeEquipe } from '../../_models/membroDeEquipe';
import { EventsService } from '../../_services/events.service';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-equipe',
	templateUrl: './equipe.component.html',
	styleUrls: ['./equipe.component.scss']
})

export class EquipeComponent implements OnInit, OnDestroy {

	constructor(
		public snackBar: MatSnackBar,
		private router:Router,
		private route:ActivatedRoute,
		private equipesService:EquipesService,
		private evtService:EventsService
	) { }

	// Atributos privados
	tiposDeEquipe:TipoDeEquipe[];
	equipe:Equipe = <Equipe>{
		id:0,
		nome:'',
		sigla:'',
		tipo:undefined,
		ativa:true,
		membros:[]
	}
	tmp_equipe:any;
	private id_lider_atual;
	subscriptions:Subscription[] = [];

	ngOnInit() {
		this.getTiposDeEquipe();
		this.getEquipe();

		// Subscrevendo ao observavel de evento reload clicked
		this.subscriptions.push(
			this.evtService.reloadClicked$.subscribe(
				() => {
					this.getEquipe();
				}
			)
		)
	}

	ngOnDestroy() {
		// Unsubscribing from all subscriptions
		for (let i = 0; i < this.subscriptions.length; i++) {
			this.subscriptions[i].unsubscribe();
		}
	}

	getEquipe():void{
		
		// Capturando o id da equipe na url
		let id = this.route.snapshot.paramMap.get('id');

		// Verificando se id é zero
		if(id != '0'){

			// Mostra Carregando
			this.evtService.mostrarCarregando();

			// Chamando serviço para carregar a equipe
			this.equipesService.getEquipeById(id).subscribe(
				res=>{

					// Esconde Carregando
					this.evtService.esconderCarregando();

					// Salvando o id do membro lider atual
					this.id_lider_atual = res.id_membro_lider;

					// Verificando se carregou tipos de equipe e usuarios
					if(this.tiposDeEquipe != undefined){
						
						// Carregou tiposDeEquipe e usuarios. Parsing
						this.equipe = this.parseEquipe(<any>res);

					} else {
						
						// Não carregou. Guardando response para processar depois
						this.tmp_equipe = res;						

					}
				},
				err => {

					// Esconde Carregando
					this.evtService.esconderCarregando();

					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao tentar carregar equipe.',
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
			);
		} else {
			
			// Inserindo membro vazio na equipe
			this.equipe.membros.push(
				<MembroDeEquipe>{
					nome:'',
					email:'',
					salario:0,
					lider:true,
					username:'',
					senha:''
				}
			)
		}
		
	}

	getTiposDeEquipe():void{
		this.equipesService.getTiposDeEquipe().subscribe(
			res=>{
				// Copiando os tipos de equipe para sua variável
				this.tiposDeEquipe = res;

				// Verificando se equipe e usuarios já foram carregados
				if(this.tmp_equipe != undefined){

					// Tudo carregado. Parsing
					this.equipe = this.parseEquipe(this.tmp_equipe);

				}
				
			},
			err=>{
				// Exibindo snackbar de erro
				this.snackBar
				.open(
					'Falha ao carregar os tipos de equipe',
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

	parseEquipe(tmp_equipe:any):Equipe{
		
		// Atribuindo tipo de equipe à equipe
		tmp_equipe.tipo = this.tiposDeEquipe.find( e => {return e.id == tmp_equipe.id_tipo} );
		delete tmp_equipe.id_tipo;

		// Parsing membros das equipes
		for (let i = 0; i < tmp_equipe.membros.length; i++) {
			let membro = tmp_equipe.membros[i];
			if(membro.id == tmp_equipe.id_membro_lider){
				membro.lider = true;
				membro.username = tmp_equipe.usuario_lider.username;
				membro.acessoWeb = tmp_equipe.usuario_lider.acessoWeb == '1';
				membro.acessoApp = tmp_equipe.usuario_lider.acessoApp == '0' ? 0 : 2;
			} else {
				membro.lider = false;
				membro.username = null;
				membro.acessoWeb = false;
				membro.acessoApp = false;
			}
		}
		delete tmp_equipe.username_lider;
		delete tmp_equipe.id_membro_lider;

		tmp_equipe.ativa = tmp_equipe.ativa == '1';
		return <Equipe>tmp_equipe;
	}

	onLiderClick(id){
		for (let i = 0; i < this.equipe.membros.length; i++) {
			const m = this.equipe.membros[i];
			m.lider = false;
			m.username = '';
			m.senha = ''
		}
	}

	onAddMemberClick(){
		this.equipe.membros.push(
			<MembroDeEquipe>{
				nome:'',
				email:'',
				salario:0.00,
				lider:false,
				username:'',
				senha:'',
			}
		)
	}

	onRemoveButtonClick(i){
		this.equipe.membros.splice(i,1);
	}

	onCancelarClick(){
		this.router.navigateByUrl('/home/equipes');
	}

	onSalvarClick(){
		if(this.equipe.id == 0){
			this.equipesService.create(this.equipe).subscribe(
				res => {
					// Exibindo snackbar de sucesso
					this.snackBar.open(
						'Equipe adicionada com sucesso!',
						undefined,
						{
							panelClass: ['snackbar-ok'],
						});

					// navegando para a tela de equipes
					this.router.navigateByUrl('/home/equipes');
				},
				err => {
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao adicionar equipe',
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
		} else {

			// recuperando o id do líder marcado
			let id_lider_marcado = this.equipe.membros.find(
				(m) => {return m.lider}
			).id;
			
			let data:{equipe:Equipe,liderMudou:boolean} = {'equipe':this.equipe,'liderMudou':(this.id_lider_atual != id_lider_marcado)}

			this.equipesService.update(data).subscribe(
				res => {
					
					// Exibindo snackbar de sucesso
					this.snackBar.open(
						'Equipe alterada com sucesso!',
						undefined,
						{
							panelClass: ['snackbar-ok'],
						});

					// Navegando para tela de equipes
					this.router.navigateByUrl('/home/equipes');

				},
				err => {
					
					// Exibindo snackbar de erro
					this.snackBar
					.open(
						'Falha ao tentar alterar equipe',
						'Fechar',
						{
							duration:0,
							horizontalPosition:'left',
							verticalPosition:'bottom',
							panelClass: ['snackbar-error']							
						}
					);

					// Imprimindo erro no console
					console.warn(err);
					
				}
			)
		}
	}
	
	public get liderAtual() : MembroDeEquipe {
		return this.equipe.membros.find(
			m => {
				return m.lider;
			}
		)
	}

	public get membrosOk() : boolean {
		let ok:boolean = true;
		let i:number = 0;
		let m:MembroDeEquipe;

		while(ok && i<this.equipe.membros.length){
			m = this.equipe.membros[i];
			ok = (m.nome && m.salario>0);
			i++;
		}
		return ok;
	}

}
