import { Produto } from "./produto";
enum TipoDeMovimento {
	entrada = 1,
	saida = -1
}

export class Movimento{
	id:number;
	dh:Date;
	id_ref:number;
	tipo:TipoDeMovimento;
	produto:Produto;
	qtde:number;
	valor:number;
}