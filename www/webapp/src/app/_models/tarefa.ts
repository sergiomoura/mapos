import { Equipe } from "./equipe";
import { SSE } from "./sse";

export class Tarefa{

	// Publicas
	public id:number;
	public sse:SSE;
	public equipe:Equipe;
	public apoio:Equipe;
	public inicio_p:string;
	public inicio_r:string;
	public final_p:string;
	public final_r:string;
	public divergente:boolean;

	// Privadas
	private _status:number;

	// Getters e setters
	public get status() : number {
		return this._status
	}
	
}