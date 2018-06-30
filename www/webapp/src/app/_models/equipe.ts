import { TipoDeEquipe } from "./tipoDeEquipe";
import { Usuario } from "./usuario";
export class Equipe {
    id:number;
    nome:string;
    sigla:string;
    tipo:TipoDeEquipe;
    ativa:boolean;
    membros:Usuario[]
}