enum AcessoWeb {
    negado = 0,
    registrador  = 1,
    executor = 2
}

export class Usuario {
    id: number;
    nome: string;
    email: string;
    username: string;
    acessoApp: boolean;
    acessoWeb: AcessoWeb;
    ativo:boolean;
}