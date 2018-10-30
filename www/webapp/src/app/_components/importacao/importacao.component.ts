import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SsesService } from 'src/app/_services/sses.service';

@Component({
	selector: 'app-importacao',
	templateUrl: './importacao.component.html',
	styleUrls: ['./importacao.component.scss']
})
export class ImportacaoComponent implements OnInit {
	
	// Publicas
	filename:string = undefined;
	filesize:number = undefined;
	apiEndpoint:string = 'teste';
	constructor(
		private ssesService:SsesService
	) { }

	ngOnInit() {
	}

	fileChange(evt:any) {
		let fileList: FileList = evt.target.files;
		if(fileList.length > 0) {
			let file: File = fileList[0];
			this.ssesService.importar(file).subscribe(
				data => console.log(data),
				error => console.log(error)
			)
		}
	}
}
