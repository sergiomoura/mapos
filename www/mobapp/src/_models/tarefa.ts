import { SafeUrl } from "@angular/platform-browser";
import { SSE } from "./sse";
import { Equipe } from "./equipe";

export class Tarefa {
	apoio?: Equipe;
	autorizadaPor? : String;
	divergente: boolean;
	equipe: Equipe;
	final_p: Date;
	final_r?: Date;
	fotos_fim: SafeUrl[];
	fotos_inicio: SafeUrl[];
	id: number;
	inicio_p: Date;
	inicio_r?: Date;
	obs_fim?:string;
	obs_ini?:string;
	primeira:boolean;
	sse:SSE;
}