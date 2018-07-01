import { Equipe } from "./equipe";

export class Usuario {
    id: number;
    nome: string;
    email: string;
    username: string;
    acessoApp: boolean;
    acessoWeb: boolean;
    ativo:boolean;
    equipes:Equipe[];
}