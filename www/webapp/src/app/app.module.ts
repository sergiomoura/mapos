import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { NgModule,LOCALE_ID } from '@angular/core';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./_modules/material/material.module";
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AppRoutingModule } from './app-routing/app-routing.module';
import { CountdownModule } from 'ngx-countdown';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { ErrorInterceptor } from "./_helpers/error.interceptor";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { HomeComponent } from './_components/home/home.component';
import { DashComponent } from './_components/dash/dash.component';
import { UsuariosComponent } from './_components/usuarios/usuarios.component';
import { LoginComponent } from './_components/login/login.component';
import { UsuarioComponent } from './_components/usuario/usuario.component';
import { EquipesComponent } from './_components/equipes/equipes.component';
import { EquipeComponent } from './_components/equipe/equipe.component';
import { SsesComponent } from './_components/sses/sses.component';
import { SsesMapComponent } from './_components/sses-map/sses-map.component';
import { SsesGridComponent } from './_components/sses-grid/sses-grid.component';
import { SseComponent } from './_components/sse/sse.component';
import { TarefaComponent } from './_components/tarefa/tarefa.component';
import { NovaTarefaComponent } from './_components/nova-tarefa/nova-tarefa.component';
import { GaleriaComponent } from './_components/galeria/galeria.component';
import { FocusDirective } from './_directives/focus.directive';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from "@angular/material";
import { EstoqueComponent } from './_components/estoque/estoque.component';
import { ProdutosComponent } from './_components/produtos/produtos.component';
import { EditProdutoComponent } from './_components/edit-produto/edit-produto.component';
import { MovimentosComponent } from './_components/movimentos/movimentos.component';
import { LancarNotaComponent } from './_components/lancar-nota/lancar-nota.component';
import { EditMovimentoComponent } from './_components/edit-movimento/edit-movimento.component';
import { FinalizarSseComponent } from './_components/finalizar-sse/finalizar-sse.component';
import { MoedaBrasilPipe } from './_pipes/moeda-brasil.pipe';
import { NumeroBrPipe } from './_pipes/numero-br.pipe';
import { BuscadorComponent } from './_components/buscador/buscador.component';
import { ListaFiltravelComponent } from './_components/lista-filtravel/lista-filtravel.component';
import { FotoModalComponent } from './_components/foto-modal/foto-modal.component';
import { MatDatepickerModule, MatNativeDateModule, DateAdapter } from '@angular/material';
import { PtBrDateAdapter } from './_helpers/pt-br.date-adapter';
import { FechamentoComponent } from './_components/fechamento/fechamento.component';

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
		SsesComponent,
		SsesGridComponent,
		SsesMapComponent,
		SseComponent,
		TarefaComponent,
		NovaTarefaComponent,
		EstoqueComponent,
		ProdutosComponent,
		EditProdutoComponent,
		MovimentosComponent,
		LancarNotaComponent,
		EditMovimentoComponent,
		FinalizarSseComponent,
		MoedaBrasilPipe,
		NumeroBrPipe,
		GaleriaComponent,
		BuscadorComponent,
		ListaFiltravelComponent,
		FotoModalComponent,
		FechamentoComponent
	],
	imports: [
		BrowserModule,
		AgmCoreModule.forRoot({
			apiKey: 'AIzaSyDXsRrkVQvgfWbs4OOYKLsNYomChNS8a5o'
		}),
		FormsModule,
		BrowserAnimationsModule,
		MaterialModule,
		HttpClientModule,
		AppRoutingModule,
		CountdownModule
	],
	entryComponents: [
		NovaTarefaComponent,
		EditProdutoComponent,
		LancarNotaComponent,
		EditMovimentoComponent,
		FinalizarSseComponent,
		GaleriaComponent,
		FotoModalComponent
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		{
			provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
			useValue: {
				duration: 4000,
				horizontalPosition: 'right',
				verticalPosition: 'bottom'
			}
		},
		{ provide: DateAdapter, useClass: PtBrDateAdapter },
		{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
