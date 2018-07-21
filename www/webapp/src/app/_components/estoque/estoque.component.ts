import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-estoque',
	templateUrl: './estoque.component.html',
	styleUrls: ['./estoque.component.scss']
})
export class EstoqueComponent implements OnInit {

	constructor(
		private router:Router
	) { }

	ngOnInit() {
	}

	onProdutosClick(){
		this.router.navigateByUrl('home/estoque/produtos');
	}

}
