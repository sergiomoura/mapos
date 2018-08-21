import { Component, Inject } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

export interface DialogData {
	foto:SafeUrl
}

@Component({
	selector: 'app-foto-modal',
	templateUrl: './foto-modal.component.html',
	styleUrls: ['./foto-modal.component.scss']
})
export class FotoModalComponent {

	constructor(
		public dialogRef: MatDialogRef<FotoModalComponent>,
		@Inject(MAT_DIALOG_DATA) public data: DialogData
	) {}

}
