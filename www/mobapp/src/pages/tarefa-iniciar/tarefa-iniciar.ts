import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertOptions, Events } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { TarefasProvider } from '../../providers/tarefas/tarefas';
import { LoadingController } from 'ionic-angular';
import { GeralProvider } from "../../providers/geral/geral";
import { TipoDeServico } from '../../_models/tipoDeServico';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { format } from "date-fns";

@IonicPage()
@Component({
	selector: 'page-tarefa-iniciar',
	templateUrl: 'tarefa-iniciar.html',
})
export class TarefaIniciarPage {

	tarefa: any = {
		sse: {
			tipoDeServicoReal: undefined,
			tipoDeServicoPrev: undefined
		},
		fotos_inicio: []
	};
	tiposDeServico: TipoDeServico[];
	executarComAutorizacao: boolean = false;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private camera: Camera,
		private sanitizer: DomSanitizer,
		private tarefasProvider: TarefasProvider,
		private toastController: ToastController,
		private provider: GeralProvider,
		private alertController: AlertController,
		private storage: Storage,
		public events:Events
	) { }

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

	ionViewWillEnter() {
		this.getTarefa()
	}

	getTarefa() {
		let intervalo = window.setInterval(
			() => {
				this.storage.get('tarefaAtual').then(
					(res) => {
						if (res) {
							window.clearInterval(intervalo);

							// Transformando o tipo de res de Object para Any
							let tmp = <any>res;

							// Parsing dates
							tmp.final_p = (tmp.final_p == null ? null : new Date(tmp.final_p));
							tmp.final_r = (tmp.final_r == null ? null : new Date(tmp.final_r));
							tmp.inicio_p = (tmp.inicio_p == null ? null : new Date(tmp.inicio_p));
							tmp.inicio_r = (tmp.inicio_r == null ? format(new Date(), 'YYYY-MM-DDTHH:mm:ss') : tmp.inicio_r.replace(' ', 'T'));

							// Parsing divergencia
							tmp.divergente = tmp.divergente == '1';

							// Atribuindo a propriedade pública tarefa
							this.tarefa = tmp;

							// Copiando o tipo de serviço do previsto para o real.
							if (this.tarefa.sse.tipoDeServicoReal == null) {
								this.tarefa.sse.tipoDeServicoReal = this.tiposDeServico.find(
									(tds) => {
										return tds.id == this.tarefa.sse.tipoDeServicoPrev.id;
									}
								)
							}

							// Adicionando campo de medidas realizadas caso ele esteja vazio
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

							if (vetor.length == 0) {
								this.addMedida();
							}

							// Linkando o tipo de serviço a real a um elemento do vetor tipos de serviços
							// para o select funcionar.
							if (this.tarefa.sse.tipoDeServicoReal != undefined) {
								this.tarefa.sse.tipoDeServicoReal = this.tiposDeServico.find(
									(tds) => {
										return tds.id == this.tarefa.sse.tipoDeServicoReal.id;
									}
								)
							}
						}
					},
					err => {
						console.log('Não leu do storage');
					}
				)
			},
			200
		)
	}

	private getVetorDeMedidasReal(): any[] {
		switch (this.tarefa.sse.tipoDeServicoReal.medida) {
			case 'a':
				return this.tarefa.sse.medidas_area.real;

			case 'l':
				return this.tarefa.sse.medidas_linear.real;

			case 'u':
				return this.tarefa.sse.medidas_unidades.real;
		}
	}

	private getVetorDeMedidasPrev(): any[] {

		switch (this.tarefa.sse.tipoDeServicoPrev.medida) {
			case 'a':
				return this.tarefa.sse.medidas_area.prev;

			case 'l':
				return this.tarefa.sse.medidas_linear.prev;

			case 'u':
				return this.tarefa.sse.medidas_unidades.prev;
		}
	}

	addMedida() {
		switch (this.tarefa.sse.tipoDeServicoReal.medida) {
			case 'a':
				this.tarefa.sse.medidas_area.real.push({ 'l': null, 'c': null, 'tipo': 'r' });
				break;

			case 'l':
				this.tarefa.sse.medidas_linear.real.push({ 'v': null, 'tipo': 'r' });
				break;

			case 'u':
				this.tarefa.sse.medidas_unidades.real.push({ 'n': null, 'tipo': 'r' });
				break;
		}
	}

	rmMedida(i) {
		let medidas = this.getVetorDeMedidasReal();
		medidas.splice(i, 1);
	}

	salvarInicio() {
		this.tarefasProvider.setIniciada(this.tarefa).subscribe(
			res => {
				this.storage.set('tarefaAtual',this.tarefa);
				this.navCtrl.parent.select(0);
				this.events.publish('tarefa:iniciada');
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

	salvarDivergencia() {
		this.tarefasProvider.setDivergente(this.tarefa).subscribe(
			res => {
				this.storage.set('tarefaAtual',this.tarefa);
				this.navCtrl.parent.select(0);
				this.events.publish('tarefa:divergente');
			},
			err => {
				// Exibindo toast de erro
				const toast = this.toastController.create({
					message: 'Falha ao tentar registrar divergência de tarefa!',
					duration: 0,
					showCloseButton: true,
					closeButtonText: 'X'
				});
				toast.present();
			}
		)
	}

	temDivergencia() {

		// Verificando se real e previsto são do mesmo tipo de servico
		if (this.tarefa.sse.tipoDeServicoReal.id != this.tarefa.sse.tipoDeServicoPrev.id) {
			return true;
		}

		// Carregando vetores de medidas
		let medidasReais = Object.assign([], this.getVetorDeMedidasReal());
		let medidasPrevistas = Object.assign([], this.getVetorDeMedidasPrev());

		// Verificando se o número de medidas são os mesmos
		if (medidasReais.length != medidasPrevistas.length) {
			return true;
		}

		// Verificando se há divergências nos valores
		let index: number;
		for (let i = 0; i < medidasReais.length; i++) {
			const mr = medidasReais[i];
			index = medidasPrevistas.findIndex(
				(mp) => {
					switch (this.tarefa.sse.tipoDeServicoReal.medida) {
						case 'a':
							return (+mp.l == +mr.l && +mp.c == +mr.c) || (+mp.l == +mr.c && +mp.c == +mr.l);

						case 'l':
							return (+mp.v == +mr.v);

						case 'u':
							return (+mp.n == +mr.n);

						default:
							return false;
					}
				}
			)
			if (index == -1) {
				return true;
			} else {
				medidasPrevistas.splice(index, 1);
			}
		}

		// Se chegou até aqui, não possui divergencia
		return false;

	}

	rmFoto(i) {
		let confirm = this.alertController.create(<AlertOptions>{
			title: 'Deseja mesmo remover a foto?',
			message: '',
			buttons: [
				{
					text: 'Não',
					handler: () => { }
				},
				{
					text: 'Sim, tenho certeza',
					handler: () => {
						this.tarefa.fotos_inicio.splice(i, 1);
					}
				}
			]
		});

		confirm.present();
	}

	onCameraClick() {
		const options: CameraOptions = {
			quality: 60,
			destinationType: this.camera.DestinationType.DATA_URL,
			encodingType: this.camera.EncodingType.JPEG,
			mediaType: this.camera.MediaType.PICTURE
		}

		this.camera.getPicture(options).then(
			(imageData) => {
				this.tarefa.fotos_inicio.push(this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + imageData));
			},
			(err) => { }
		);
	}

	onTipoDeServicoChange() {
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
		if (medidas.length == 0) {
			this.addMedida();
		}

		this.tarefa.divergente = this.temDivergencia();
	}

	onMedidaBlur(){
		this.tarefa.divergente = this.temDivergencia();
	}

	onSalvarClick() {
		
		let confirm = this.alertController.create(<AlertOptions>{
			title: 'Deseja registrar que o serviço foi iniciado?',
			message: 'Esta ação não poderá ser desfeita.',
			buttons: [
				{
					text: 'Não',
					handler: () => { }
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

	onSalvarDivergenciaClick() {
		let confirm = this.alertController.create(<AlertOptions>{
			title: 'Deseja registrar este serviço como divergente?',
			message: 'Ele não será iniciado e você poderá se encaminhar para o início de um outro serviço. Ele somente pode ser iniciado com autorização.',
			buttons: [
				{
					text: 'Não',
					handler: () => { }
				},
				{
					text: 'Sim',
					handler: () => {
						this.tarefa.inicio_r = null;
						this.salvarDivergencia();
					}
				}
			]
		});

		confirm.present();
	}
}
