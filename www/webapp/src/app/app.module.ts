import { AppComponent } from './app.component';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./_modules/material/material.module";
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing/app-routing.module';

import { ErrorInterceptor } from "./_helpers/error.interceptor";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";

import { HomeComponent } from './_components/home/home.component';
import { DashComponent } from './_components/dash/dash.component';
import { UsuariosComponent } from './_components/usuarios/usuarios.component';
import { LoginComponent } from './_components/login/login.component';
import { UsuarioComponent } from './_components/usuario/usuario.component';
import { EquipesComponent } from './_components/equipes/equipes.component';
import { EquipeComponent } from './_components/equipe/equipe.component';
import { SsesGridComponent } from './_components/sses-grid/sses-grid.component';
import { SseComponent } from './_components/sse/sse.component';

import { FocusDirective } from './_directives/focus.directive';

import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from "@angular/material";
import { SsesMapComponent } from './_components/sses-map/sses-map.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DashComponent,
    UsuariosComponent,
    UsuarioComponent,
    EquipesComponent,
    EquipeComponent,
    FocusDirective,
    SsesGridComponent,
    SseComponent,
    SsesMapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: 4000,
        horizontalPosition:'right',
        verticalPosition:'bottom'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
