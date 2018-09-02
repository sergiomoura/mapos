enum AcessoApp {
    negado = 0,
    registrador  = 1,
    executor = 2
}

export class Usuario {
    id: number;
    nome: string;
    email: string;
    username: string;
    acessoApp: AcessoApp;
    acessoWeb: boolean;
    ativo:boolean;
    perm_dados_financeiros:boolean;
}