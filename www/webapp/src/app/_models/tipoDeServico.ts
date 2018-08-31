import { FaixaDeTDS } from "./faixaDeTds";

export class TipoDeServico {
	id:number;
	codigo:string;
	letra:string;
	prazo:number;
	descricao:string;
	medida:string;
	faixas:FaixaDeTDS[];
}