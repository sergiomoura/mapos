import { TipoDeTarefa } from "./tipo-de-tarefa";
import { Equipe } from "./equipe";
import { SSE } from "./sse";

export class Tarefa{

	// Publicas
	public tipo:TipoDeTarefa;
	public sse:SSE;
	public equipe:Equipe;
	public apoio:Equipe;
	public inicio_p:Date;
	public inicio_r:Date;
	public final_p:Date;
	public final_r:Date;
	public divergente:boolean;

	// Privadas
	private _status:number;

	// Getters e setters
	public get status() : number {
		return this._status
	}
	
}