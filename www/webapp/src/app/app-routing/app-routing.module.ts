import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../login/login.component";
import { HomeComponent } from "../home/home.component";
import { AuthGuard } from "../_guards/auth.guard";
import { DashComponent } from '../dash/dash.component';
import { UsuariosComponent } from '../usuarios/usuarios.component';
import { UsuarioComponent } from '../usuario/usuario.component';

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
        path: 'usuarios/:idu',
        component: UsuarioComponent,
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
