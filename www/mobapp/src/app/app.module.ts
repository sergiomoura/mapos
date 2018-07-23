import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FormsModule } from '@angular/forms';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { Device } from '@ionic-native/device';
import { Urls } from "../helpers/urls";
import { SsesPage } from '../pages/sses/sses';
import { SsesProvider } from '../providers/sses/sses';
import { JwtInterceptor } from "../helpers/jwt.interceptor";
import { SsePage } from "../pages/sse/sse";
import { GeralProvider } from '../providers/geral/geral';
import { Camera } from '@ionic-native/camera';
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { SelectSearchableModule } from 'ionic-select-searchable'
import { TarefasPage } from '../pages/tarefas/tarefas';
import { TarefasProvider } from '../providers/tarefas/tarefas';
import { TarefaPage } from '../pages/tarefa/tarefa';
import { TarefaPageModule } from '../pages/tarefa/tarefa.module';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		LoginPage,
		SsesPage,
		SsePage,
		TarefasPage
	],
	imports: [
		BrowserModule,
		IonicModule.forRoot(MyApp),
		FormsModule,
		HttpClientModule,
		IonicStorageModule.forRoot(),
		SelectSearchableModule,
		TarefaPageModule
	],
	bootstrap: [IonicApp],
	entryComponents: [
		MyApp,
		HomePage,
		LoginPage,
		SsesPage,
		SsePage,
		TarefasPage,
		TarefaPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		Camera,
		ScreenOrientation,
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		{provide: ErrorHandler, useClass: IonicErrorHandler},
		AuthProvider,
		Device,
		Urls,
		SsesProvider,
		GeralProvider,
    	TarefasProvider
	]
})
export class AppModule {}
