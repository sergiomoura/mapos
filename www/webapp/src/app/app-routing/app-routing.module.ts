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
        path: 'usuarios/:id',
        component: UsuarioComponent,
      },
      {
        path: 'equipes',
        component: EquipesComponent,
      },
      {
        path: 'sses',
        component: SsesComponent,
      },
      {
        path: 'sses/:id',
        component: SseComponent,
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
