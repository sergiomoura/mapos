import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertOptions } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { TarefasProvider } from '../../providers/tarefas/tarefas';
import { LoadingController } from 'ionic-angular';
import { GeralProvider } from "../../providers/geral/geral";
import { TipoDeServico } from '../../_models/tipoDeServico';
import { AlertController } from 'ionic-angular';

@IonicPage()
@Component({
	selector: 'page-tarefa-iniciar',
	templateUrl: 'tarefa-iniciar.html',
})
export class TarefaIniciarPage {

	tarefa:any = {
		sse : {
			tipoDeServicoReal:undefined,
			tipoDeServicoPrev:undefined
		}
	};
	tiposDeServico:TipoDeServico[];

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private camera: Camera,
		private sanitizer:DomSanitizer,
		private tarefasProvider:TarefasProvider,
		private toastController: ToastController,
		private loadingConttroller: LoadingController,
		private provider:GeralProvider,
		private alertController:AlertController
	) {	}

	ionViewDidLoad() {
		this.provider.getTiposDeServico().subscribe(
			res => {
				this.tiposDeServico = <TipoDeServico[]>res;
			},
			err => {
				// Exibindo toast de erro
				const toast = this.toastController.create({
				message: 'Falha ao carregar tipos de serviço',
				duration: 0,
				showCloseButton: true,
				closeButtonText: 'X'
				});
				toast.present();
			}
		)
	}

	ionViewWillEnter(){
		this.getTarefa(<number>this.navParams.data.id_tarefa);
	}

	getTarefa(id_tarefa:number){
		// Criando e mostrando loading
		let loading = this.loadingConttroller.create();
		loading.setContent('Aguarde...').present();

		// Fazendo requisição para carregar tarefa
		this.tarefasProvider.getCompleteById(this.navParams.data.id_tarefa, true)
		.subscribe(
			res => {
				// Esconde o carregando
				loading.dismiss();

				// Transformando o tipo de res de Object para Any
				let tmp = <any>res;

				// Parsing dates
				tmp.final_p = (tmp.final_p == null ? null : new Date(tmp.final_p));
				tmp.final_r = (tmp.final_r == null ? null : new Date(tmp.final_r));
				tmp.inicio_p = (tmp.inicio_p == null ? null : new Date(tmp.inicio_p));
				tmp.inicio_r = (tmp.inicio_r == null ? null : new Date(tmp.inicio_r));

				// Parsing divergencia
				tmp.divergente = tmp.divergente=='1';

				// Atribuindo a propriedade pública tarefa
				this.tarefa = tmp;

				// Adicionando campo de medidas realizadas caso ele esteja vazio
				if(this.tarefa.sse.tipoDeServicoReal){
					let vetor = [];
					switch (this.tarefa.sse.tipoDeServicoReal.medida) {
						case 'a':
							vetor = this.tarefa.sse.medidas_area.real;
							break;
						
						case 'l':
							vetor = this.tarefa.sse.medidas_linear.real;
							break;
						
						case 'u':
							vetor = this.tarefa.sse.medidas_unidades.real;
							break;
					}
	
					if(vetor.length == 0){
						this.addMedida();
					}
				}

				// Linkando o tipo de serviço a real a um elemento do vetor tipos de serviços
				// para o select funcionar.
				if( this.tarefa.sse.tipoDeServicoReal != undefined){
					this.tarefa.sse.tipoDeServicoReal = this.tiposDeServico.find(
						(tds) => {
							return tds.id == this.tarefa.sse.tipoDeServicoReal.id;
						}
					)
				}
			},
			err => {
				// Esconde o carregando
				loading.dismiss();
				
				// Exibindo toast de erro
				const toast = this.toastController.create({
					message: 'Falha ao carregar tarefa',
					duration: 0,
					showCloseButton: true,
					closeButtonText: 'X'
				});
				toast.present();

				// Imprimindo erro no console
				console.warn(err);
			}
		)
	}

	private getVetorDeMedidasReal():any[]{
		switch (this.tarefa.sse.tipoDeServicoReal.medida) {
			case 'a':
				return this.tarefa.sse.medidas_area.real;
			
			case 'l':
				return this.tarefa.sse.medidas_linear.real;
			
			case 'u':
				return this.tarefa.sse.medidas_unidades.real;
		}
	}

	private getVetorDeMedidasPrev():any[]{
		
		switch (this.tarefa.sse.tipoDeServicoPrev.medida) {
			case 'a':
				return this.tarefa.sse.medidas_area.prev;
			
			case 'l':
				return this.tarefa.sse.medidas_linear.prev;
			
			case 'u':
				return this.tarefa.sse.medidas_unidades.prev;
		}
	}

	addMedida(){
		switch (this.tarefa.sse.tipoDeServicoReal.medida) {
			case 'a':
				this.tarefa.sse.medidas_area.real.push({'l':null,'c':null, 'tipo':'r'});
				break;
			
			case 'l':
				this.tarefa.sse.medidas_linear.real.push({'v':null, 'tipo':'r'});
				break;
			
			case 'u':
				this.tarefa.sse.medidas_unidades.real.push({'n':null, 'tipo':'r'});
				break;
		}
	}

	rmMedida(i){
		let medidas = this.getVetorDeMedidasReal();
		medidas.splice(i,1);
	}

	salvarInicio(){
		this.tarefasProvider.setIniciada(this.tarefa).subscribe(
			res => {
				console.log('Mudar para o tab de info!');
			},
			err => {
				// Exibindo toast de erro
				const toast = this.toastController.create({
				message: 'Falha ao tentar registrar início de tarefa!',
				duration: 0,
				showCloseButton: true,
				closeButtonText: 'X'
				});
				toast.present();
			}
		)
	}

	temDivergencia(){

		// Verificando se real e previsto são do mesmo tipo de servico
		if(this.tarefa.sse.tipoDeServicoReal.id != this.tarefa.sse.tipoDeServicoPrev.id){
			return true;
		}

		// Carregando vetores de medidas
		let medidasReais = Object.assign([],this.getVetorDeMedidasReal());
		let medidasPrevistas = Object.assign([],this.getVetorDeMedidasPrev());

		// Verificando se o número de medidas são os mesmos
		if(medidasReais.length != medidasPrevistas.length){
			return true;
		}

		console.dir(medidasReais);
		console.dir(medidasPrevistas);

		// Verificando se há divergências nos valores
		let index:number;
		for (let i = 0; i < medidasReais.length; i++) {
			const mr = medidasReais[i];
			index = medidasPrevistas.findIndex(
				(mp) => {
					switch (this.tarefa.sse.tipoDeServicoReal.medida) {
						case 'a':
							return (+mp.l == +mr.l && +mp.c == +mr.c) || (+mp.l == +mr.c && +mp.c == +mr.l);
							break;
						
						case 'l':
							return (+mp.v == +mr.v);
							break;
						
						case 'l':
							return (+mp.n == +mr.n);
							break;
					
						default:
							return false;
							break;
					}
				}
			)
			console.log(index);
			if(index == -1){
				return true;
			} else {
				medidasPrevistas.splice(index,1);
			}
		}

		// Se chegou até aqui, não possui divergencia
		return false;
		
	}

	onCameraClick(){
		const options: CameraOptions = {
			quality: 60,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}
		  
		this.camera.getPicture(options).then(
			(imageData) => {
				this.tarefa.fotos.push(this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + imageData));
			},
			(err) => {}
		);
	}

	onTipoDeServicoChange(){
		let medidas;
		switch (this.tarefa.sse.tipoDeServicoReal.medida) {
			case 'a':
				medidas = this.tarefa.sse.medidas_area.real;
				break;
			
			case 'l':
				medidas = this.tarefa.sse.medidas_linear.real;
				break;
			
			case 'u':
				medidas = this.tarefa.sse.medidas_unidades.real;
				break;
		}
		if(medidas.length == 0){
			this.addMedida();
		}
	}

	onSalvarClick(){
		this.tarefa.divergente = this.temDivergencia();
		if(this.tarefa.divergente){

			let confirm = this.alertController.create(<AlertOptions>{
				title:'Existem divergências entre as medidas ou serviço a ser realizado.',
				message: 'Deseja notificar essa divergência para a central?',
				buttons: [
					{
						text: 'Não',
						handler: () => {}
					},
					{
						text: 'Sim',
						handler: () => {
							this.salvarInicio();
						}
					}
				]
			});
			
			confirm.present();

		} else {
			let confirm = this.alertController.create(<AlertOptions>{
				title:'Deseja registrar que o serviço foi iniciado?',
				message: 'Esta ação não poderá ser desfeita.',
				buttons: [
					{
						text: 'Não',
						handler: () => {}
					},
					{
						text: 'Sim, tenho certeza.',
						handler: () => {
							this.salvarInicio();
						}
					}
				]
			});

			confirm.present();
		}

	}
}
