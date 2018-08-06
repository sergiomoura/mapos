import { Component } from '@angular/core';
import { NavController, NavParams, AlertOptions } from 'ionic-angular';
import { Domasa } from "../../_models/domasa";
import { TipoDeServico } from "../../_models/tipoDeServico";
import { Storage } from "@ionic/storage";
import { SsesProvider } from '../../providers/sses/sses';
import { SSE } from '../../_models/sse';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController } from 'ionic-angular';
import { Bairro } from '../../_models/bairro';
import { format } from "date-fns";

@Component({
	selector: 'page-sse',
	templateUrl: 'sse.html'
})
export class SsePage {

	// Privates
	public domasas:Domasa[] = <Domasa[]>[];
	public tiposDeServico:TipoDeServico[] = <TipoDeServico[]>[];
	public sse:SSE = this.sseVazia();
	public domasaSelecionada:Domasa;
	public medidaTotal: number = 0;
	public unidade: string = 'm²';
	public bairrosExibidos:Bairro[] = [];
	public todosBairros:Bairro[] = [];
	
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private storage: Storage,
		private sseProvider: SsesProvider,
		private loadingConttroller: LoadingController,
		private toastController: ToastController,
		private camera:Camera,
		private sanitizer:DomSanitizer,
		private alertController:AlertController
	) {}

	ionViewDidLoad() {

		// Carregando DOMASAS
		this.storage.get('domasas').then(
			domasas => {
				this.domasas = <Domasa[]>domasas;
				for (let i = 0; i < this.domasas.length; i++) {
					const domasa = this.domasas[i];
					for (let j = 0; j < domasa.bairros.length; j++) {
						this.todosBairros.push(domasa.bairros[j]);
					}
				}
				this.bairrosExibidos = this.todosBairros;
			}
		)

		// Carregando tipos de serviços
		this.storage.get('tiposDeServico').then(
			tdss => {
				this.tiposDeServico = <TipoDeServico[]>tdss;
			}
		)

		// Carregando a Sse da base
		this.getSse(this.navParams.get('idSse'));
		
	}

	getSse(id) {
		if (id == 0) {
			this.sse = this.sseVazia();
		} else {
			// Criando e mostrando loading
			let loading = this.loadingConttroller.create();
			loading.setContent('Aguarde').present();

			this.sseProvider.getById(id).subscribe(
				res => {
					// Esconde carregando
					loading.dismiss();

					// Parsing response
					this.sse = this.parseSseResponse(res);
				},
				err => {
					// Esconde carregandop
					loading.dismiss();

					// Exibindo toast de erro
					const toast = this.toastController.create({
						message: 'Falha ao tentar carregar SSE',
						duration: 0,
						showCloseButton: true,
						closeButtonText: 'X'
					});
					toast.present();
				}
			)
		}
	}

	parseSseResponse(res:any):SSE{

		// Parsing escalares
		res.dh_recebido = (new Date(res.dh_recebido)).toISOString();
		res.dh_registrado = (new Date(res.dh_registrado)).toISOString();
		res.id *= 1;
		res.urgencia *= 1;
		
		res.tipoDeServicoPrev = this.tiposDeServico.find(
			(a) => {
				return res.id_tipo_de_servico_p	== a.id;
			}
		);

		// Procurando a domasa do bairro
		let i:number = 0;
		let achou:boolean = false;
		while(i < this.domasas.length && !achou){
			res.bairro = this.domasas[i].bairros.find(
				(bairro) => {
					return bairro.id == res.id_bairro;
				}
			)
			if(res.bairro){
				achou = true;
				this.domasaSelecionada = this.domasas[i];
			}
			i++
		}

		// Determinando medida total para exibição na tela
		this.medidaTotal = this.calculaTotal(<SSE>res);
		this.unidade = this.getUnidade(<SSE>res);

		return <SSE>res;

	}

	onDomasaChange(){
		this.bairrosExibidos = this.domasaSelecionada.bairros;
		this.sse.bairro = undefined;
	}

	onTipoDeSevicoChange(){
		this.unidade = this.getUnidade(this.sse);
		this.medidaTotal = this.calculaTotal(this.sse);

		// adicionando campo de medidas
		let vetor:any[];
		switch (this.sse.tipoDeServicoPrev.medida) {
			case 'a':
				vetor = this.sse.medidas_area.prev;
				break;
			
			case 'l':
				vetor = this.sse.medidas_linear.prev;
				break;
			case 'u':
				vetor = this.sse.medidas_unidades.prev;
				break;
		}
		if(vetor.length == 0){
			this.addMedida();
		}
	}

	onToggleHoraClick(s:string){
		this.sse.dh_recebido = format(new Date(),'YYYY-MM-DDT'+s+':00:00');
	}

	onMedidaChange(){
		this.medidaTotal = this.calculaTotal(this.sse);
	}

	onSalvarClick(){
		let confirm = this.alertController.create(<AlertOptions>{
			title:'Tem certeza que deseja salvar a SSE?',
			message: 'Sendo salva, poderá ser agendada a alguma equipe de execução. Quando isso acontecer, você não mais poderá alterá-la.',
			buttons: [
				{
					text: 'Não',
					handler: () => {}
				},
				{
					text: 'Sim, tenho certeza.',
					handler: () => {
						this.salvar();
					}
				}
			]
		})

		confirm.present();
		
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
			this.sse.foto = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + imageData);
		},
		(err) => {
			// Exibindo toast de erro
			const toast = this.toastController.create({
				message: 'Falha ao tirar foto.',
				duration: 0,
				showCloseButton: true,
				closeButtonText: 'X'
			});
			toast.present();

			// Imprimindo erro no console
			console.log(err);
		});
	}

	salvar(){
		
		if(this.sse.id == 0){
			this.inserir();
		} else {
			this.atualizar();	
		}
	}

	atualizar(){
		
		// Criando e mostrando loading
		let loading = this.loadingConttroller.create();
		loading.setContent('Aguarde...').present();

		// Fazendo requisição para atualizar sse
		this.sseProvider.update(this.sse)
		.subscribe(
			res => {
				loading.dismiss();
				this.navCtrl.pop();

				// Exibindo toast de sucesso
				const toast = this.toastController.create(
					{
						message: 'Alteração realizada com sucesso',
						duration: 3000
					});
				toast.present();
			},
			err => {
				// Escondendo carregando
				loading.dismiss();

				// Exibindo toast de erro
				const toast = this.toastController.create({
					message: 'Falha ao alterar SSE',
					duration: 0,
					showCloseButton: true,
					closeButtonText: 'X'
				});
				toast.present();

				// Imprimindo erro no console
				console.dir(err);
				
			}
		)
	}

	inserir(){
		// Criando e mostrando loading
		let loading = this.loadingConttroller.create();
		loading.setContent('Aguarde...').present();

		// Fazendo requisição para atualizar sse
		this.sseProvider.insert(this.sse)
		.subscribe(
			res => {
				// Escondendo o carregando
				loading.dismiss();

				// Navegando para página anterior
				this.navCtrl.pop();

				// Exibindo toast de sucesso
				const toast = this.toastController.create(
					{
						message: 'SSE criada com sucesso',
						duration: 3000
					});
				toast.present();
			},
			err => {

				// Escondendo carregando
				loading.dismiss();

				// Exibindo toast de erro
				const toast = this.toastController.create({
					message: 'Falha ao salvar SSE',
					duration: 0,
					showCloseButton: true,
					closeButtonText: 'X'
				});
				toast.present();

				// Imprimindo erro no console
				console.dir(err);
			}
		)
	}

	sseVazia():SSE{
		return <SSE>{
			id:0,
			endereco:'',
			numero:'',
			bairro:null,
			tipoDeServicoPrev:null,
			tipoDeServicoReal:null,
			dh_registrado:null,
			dh_recebido: format(new Date(),'YYYY-MM-DDT10:00:00'),
			urgencia:0,
			medidas_area:{real:[],prev:[]},
			medidas_linear:{real:[],prev:[]},
			medidas_unidades:{real:[],prev:[]}
		}
	}

	calculaTotal(sse:SSE):number{
		
		let total = 0;
		
		if(sse.tipoDeServicoPrev.medida == 'a'){
			// Medidas de área: somando
			for (let i = 0; i < sse.medidas_area.prev.length; i++) {
				total += ((1*sse.medidas_area.prev[i].l) * (1*sse.medidas_area.prev[i].c));
			}
		} else if(sse.tipoDeServicoPrev.medida == 'l'){
			// Medidas de comprimento: somando
			for (let i = 0; i < sse.medidas_linear.prev.length; i++) {
				total += 1*sse.medidas_linear.prev[i].v;
			}
		} else {
			// Medidas de unidade: somando
			for (let i = 0; i < sse.medidas_unidades.prev.length; i++) {
				total += 1*sse.medidas_unidades.prev[i].n;
			}
		}

		// Retornando valor arredondado com 2 casas decimais
		return Math.round(total*100)/100;
	}

	getUnidade(sse:SSE):string{
		if(sse.tipoDeServicoPrev.medida == 'a'){
			return 'm²';
		} else if(sse.tipoDeServicoPrev.medida == 'l'){
			return 'm';
		} else {
			return 'unid';
		}
	}

	addMedida(){
		switch (this.sse.tipoDeServicoPrev.medida) {
			case 'a':
				this.sse.medidas_area.prev.push({'l':null,'c':null});
				break;
			
			case 'l':
				this.sse.medidas_linear.prev.push({'v':null});
				break;
			
			case 'u':
				this.sse.medidas_unidades.prev.push({'n':null});
				break;

			default:
				break;
		}
	}

	rmMedida(i:number){
		switch (this.sse.tipoDeServicoPrev.medida) {
			case 'a':
				this.sse.medidas_area.prev.splice(i,1);
				break;
			
			case 'l':
				this.sse.medidas_linear.prev.splice(i,1);
				break;
			
			case 'u':
				this.sse.medidas_unidades.prev.splice(i,1);
				break;
		}
	}

	rmFoto(){
		this.sse.foto = undefined;
	}

	onBairroChange(){
		// Buscando domasa do bairro
		let i = 0;
		let achou = false;
		let bairro:Bairro;
		while (i<this.domasas.length && !achou) {
			
			bairro = this.domasas[i].bairros.find(
				(b) => {
					return b.id == this.sse.bairro.id;
				}
			)
			achou = (bairro != undefined);

			if (achou) {
				this.domasaSelecionada = this.domasas[i];
			}

			i++;
		}
	}
}
