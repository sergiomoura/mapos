import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from "@ionic/storage";
import { ScreenOrientation } from "@ionic-native/screen-orientation";
import { AndroidFullScreen } from '@ionic-native/android-full-screen';

import { LoginPage } from '../pages/login/login';
import { AuthProvider } from "../providers/auth/auth";

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	
	rootPage:any = LoginPage;
	private IRDT:number =  10 * 60 * 1000; // Intervalo de Renovação Do Token (10 MINUTO)

	constructor(
		platform: Platform,
		statusBar: StatusBar,
		splashScreen: SplashScreen,
		private authProvider: AuthProvider,
		private storage:Storage,
		private scrOrientation:ScreenOrientation,
		private fullScreen:AndroidFullScreen
	) {
		platform.ready().then(
			() => {
				// Travando orientação da tela
				this.scrOrientation.lock(this.scrOrientation.ORIENTATIONS.PORTRAIT);

				// Entrando em fullscreen
				if(this.fullScreen.isImmersiveModeSupported()){
					this.fullScreen.immersiveMode();
				}

				// Escondendo statusBar
				statusBar.hide();

				// Escondendo spash screen
				splashScreen.hide();

				// Ligando intervalo para atualizar o token
				setInterval(
					() => {
						this.refresh();
					},
					this.IRDT
				)


			}
		);
	}

	refresh(){
		this.storage.get('currentUser').then(
			(currentUser) => {
				if(currentUser != null){
					this.authProvider.refresh()
				}
			}
		)
	}
}

