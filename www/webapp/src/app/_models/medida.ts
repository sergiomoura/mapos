export class Medida{
	valor:number;
	unidade:string;

	constructor(v:number,u:string){
		this.valor = v;
		this.unidade = u;
	}

	toString() {
		return this.valor + " " + this.unidade;
	}
}