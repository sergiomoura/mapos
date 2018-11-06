import { Component, OnInit } from '@angular/core';
import { ImportarResponse, SsesService } from 'src/app/_services/sses.service';

@Component({
	selector: 'app-importacao',
	templateUrl: './importacao.component.html',
	styleUrls: ['./importacao.component.scss']
})
export class ImportacaoComponent implements OnInit {
	
	// Publicas
	file:File;
	resultados:ImportarResponse[];
	constructor(
		private ssesService:SsesService
	) { }

	ngOnInit() {
	}

	fileChange(evt:any) {
		let fileList: FileList = evt.target.files;
		if(fileList.length > 0) {
			this.file = fileList[0];
		}
	}

	onEnviarClick(){
		this.sendFile();
	}

	private sendFile(){
		if(this.file){
			this.ssesService.importar(this.file).subscribe(
				(data) => {
					this.resultados = data;
				},
				(error) => {
					console.log(error)
				}
			)
		}
	}
}
