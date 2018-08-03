import { Equipe } from "./equipe";

export interface Busca {
	equipes?: Equipe[],
	status?: string[],
	prioridades?: number[],
	agendadas_de?: Date,
	agendadas_ate?: Date,
	realizadas_de?: Date,
	realizadas_ate? : Date
}