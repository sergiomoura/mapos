import { TipoDeEquipe } from "./tipoDeEquipe";
import { MembroDeEquipe } from "./membroDeEquipe";
import { LiderDeEquipe } from "./liderDeEquipe";

export class Equipe {
    id:number;
    nome:string;
    sigla:string;
    tipo:TipoDeEquipe;
    ativa:boolean;
    membros:MembroDeEquipe[];
    lider:LiderDeEquipe;    
}