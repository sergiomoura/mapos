import { Equipe } from "./equipe";

export interface Busca {
	equipes?: Equipe[],
	status?: string[],
	prioridades?: number[],
	agendadas_de?: Date,
	agendadas_ate?: Date,
	realizadas_de?: Date,
	realizadas_ate? : Date,
	id_fechamento?:number
}

export class BuscaPadrao implements Busca{
	agendadas_ate: null;
	agendadas_de: null;
	realizadas_ate: null;
	realizadas_de: null;
	prioridades: [0,1,2];
	status: ['CANCELADA','RETRABALHO','DIVERGENTE','CADASTRADA','AGENDADA','EXECUTANDO','PENDENTE','FINALIZADA'];
	id_fechamento: null;
}