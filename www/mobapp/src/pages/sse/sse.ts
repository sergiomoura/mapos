import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Domasa } from "../../_models/domasa";
import { TipoDeServico } from "../../_models/tipoDeServico";
import { Storage } from "@ionic/storage";
import { SsesProvider } from '../../providers/sses/sses';
import { SSE } from '../../_models/sse';
import { LoadingController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';

@IonicPage()
@Component({
	selector: 'page-sse',
	templateUrl: 'sse.html',
})
export class SsePage {

	// Privates
	public domasas:Domasa[] = <Domasa[]>[];
	public tiposDeServico:TipoDeServico[] = <TipoDeServico[]>[];
	public sse:SSE = this.sseVazia();
	public domasaSelecionada:Domasa = null;
	public medidaTotal: number = 0;
	public unidade: string = 'm²';

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private storage: Storage,
		private sseProvider: SsesProvider,
		private loadingConttroller: LoadingController,
		private toastController: ToastController,
		private camera:Camera,
		private sanitizer:DomSanitizer
	) {}

	ionViewDidLoad() {

		// Carregando DOMASAS
		this.storage.get('domasas').then(
			domasas => {
				this.domasas = <Domasa[]>domasas;
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
		res.urgente = (res.urgente == "1");
		
		let tds = this.tiposDeServico.find(
			(a) => {
				return res.id_tipo_de_servico == a.id;
			}
		);
		res.tipoDeServico = tds;

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

	onTipoDeSevicoChange(){
		this.unidade = this.getUnidade(this.sse);
		this.medidaTotal = this.calculaTotal(this.sse);
	}

	onMedidaChange(){
		this.medidaTotal = this.calculaTotal(this.sse);
	}

	onSalvarClick(){
		this.salvar();
	}

	onCameraClick(){
		const options: CameraOptions = {
			quality: 100,
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
			tipoDeServico:null,
			dh_registrado:'',
			dh_recebido:'',
			dh_ini_exec:'',
			dh_fim_exec:'',
			urgente:false,
			medidas_area:<any[]>[],
			medidas_linear:<any[]>[],
			medidas_unidades:<any[]>[]
		}
	}

	calculaTotal(sse:SSE):number{
		
		let total = 0;
		
		if(sse.tipoDeServico.medida == 'a'){
			// Medidas de área: somando
			for (let i = 0; i < sse.medidas_area.length; i++) {
				total += ((1*sse.medidas_area[i].l) * (1*sse.medidas_area[i].c));
			}
		} else if(sse.tipoDeServico.medida == 'l'){
			// Medidas de comprimento: somando
			for (let i = 0; i < sse.medidas_linear.length; i++) {
				total += 1*sse.medidas_linear[i].v;
			}
		} else {
			// Medidas de unidade: somando
			for (let i = 0; i < sse.medidas_unidades.length; i++) {
				total += 1*sse.medidas_unidades[i].n;
			}
		}

		// Retornando valor arredondado com 2 casas decimais
		return Math.round(total*100)/100;
	}

	getUnidade(sse):string{
		if(sse.tipoDeServico.medida == 'a'){
			return 'm²';
		} else if(sse.tipoDeServico.medida == 'l'){
			return 'm';
		} else {
			return 'unid';
		}
	}

	addMedida(){
		switch (this.sse.tipoDeServico.medida) {
			case 'a':
				this.sse.medidas_area.push({'l':0,'c':0});
				break;
			
			case 'l':
				this.sse.medidas_linear.push({'v':0});
				break;
			
			case 'u':
				this.sse.medidas_unidades.push({'n':0});
				break;

			default:
				break;
		}
	}

	rmMedida(i:number){
		switch (this.sse.tipoDeServico.medida) {
			case 'a':
				this.sse.medidas_area.splice(i,1);
				break;
			
			case 'l':
				this.sse.medidas_linear.splice(i,1);
				break;
			
			case 'u':
				this.sse.medidas_unidades.splice(i,1);
				break;
		}
	}

	rmFoto(){
		this.sse.foto = undefined;
	}
}
