import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../_components/login/login.component";
import { HomeComponent } from "../_components/home/home.component";
import { AuthGuard } from "../_guards/auth.guard";
import { DashComponent } from '../_components/dash/dash.component';
import { UsuariosComponent } from '../_components/usuarios/usuarios.component';
import { UsuarioComponent } from '../_components/usuario/usuario.component';
import { EquipesComponent } from "../_components/equipes/equipes.component";
import { EquipeComponent } from "../_components/equipe/equipe.component";
import { SsesComponent } from '../_components/sses/sses.component';
import { SseComponent } from "../_components/sse/sse.component";
import { SsesGridComponent } from '../_components/sses-grid/sses-grid.component';
import { SsesMapComponent } from '../_components/sses-map/sses-map.component';
import { TarefaComponent } from '../_components/tarefa/tarefa.component';
import { EstoqueComponent } from "../_components/estoque/estoque.component";
import { ProdutosComponent } from "../_components/produtos/produtos.component";
import { MovimentosComponent } from '../_components/movimentos/movimentos.component';
import { FechamentoComponent } from '../_components/fechamento/fechamento.component';
import { ImportacaoComponent } from "../_components/importacao/importacao.component";

const routes:Routes = [
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: 'home',
		component: HomeComponent,
		canActivate: [AuthGuard],
		children:[
			{
				path: 'dash',
				component: DashComponent,
			},
			{
				path: 'usuarios',
				component: UsuariosComponent,
			},
			{
				path: 'fechamento',
				component: FechamentoComponent,
			},
			{
				path: 'importacao',
				component: ImportacaoComponent
			},
			{
				path: 'usuarios/:id',
				component: UsuarioComponent,
			},
			{
				path: 'equipes',
				component: EquipesComponent,
			},
			{
				path: 'estoque',
				component: EstoqueComponent,
				children: [
					{
						path:'produtos',
						component:ProdutosComponent
					},
					{
						path:'movimentos',
						component:MovimentosComponent
					},
					{
						path: '**',
						redirectTo: 'movimentos'
					}	
				]
			},
			{
				path:'tarefas/:id',
				component: TarefaComponent
			},
			{
				path: 'sse/:id',
				component: SseComponent,
			},
			{
				path: 'sses',
				component: SsesComponent,
				children:[
					
					{
						path:'grid',
						component:SsesGridComponent
					},
					{
						path:'map',
						component:SsesMapComponent
					},
					{
						path: '**',
						redirectTo: 'map'
					}					
				]
			},
			{
				path: 'equipes/:id',
				component: EquipeComponent,
			},
			{
				path: '**',
				redirectTo: 'sses'
			}
		]
	},
	{
		path: '**',
		redirectTo: 'home'
	}
]
@NgModule({
	imports:[RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
