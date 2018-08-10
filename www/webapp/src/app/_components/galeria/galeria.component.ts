import { Component, OnInit, Inject } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
	start_index: number;
	fotos: SafeUrl[];
}

@Component({
	selector: 'app-galeria',
	templateUrl: './galeria.component.html',
	styleUrls: ['./galeria.component.scss']
})
export class GaleriaComponent implements OnInit {

	index_exibido:number;

	constructor(
		public dialogRef: MatDialogRef<GaleriaComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData,
	) {
		this.index_exibido = data.start_index;
	}

	ngOnInit() {
		
	}

	onThumbClick(i:number){
		this.index_exibido = i;
	}
}
