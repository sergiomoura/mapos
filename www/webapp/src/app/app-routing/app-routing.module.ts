import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { HomeComponent } from "../home/home.component";
import { AuthGuard } from "../_guards/auth.guard";
import { DashComponent } from '../dash/dash.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { UsuarioComponent } from '../usuario/usuario.component';
import { EquipesComponent } from "../equipes/equipes.component";
import { EquipeComponent } from "../equipe/equipe.component";

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
        path: 'equipes/:id',
        component: EquipeComponent,
      },
      {
        path: '**',
        redirectTo: 'dash'
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
