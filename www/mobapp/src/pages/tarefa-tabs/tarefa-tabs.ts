import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';

/**
 * Generated class for the TarefaTabsPage tabs.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tarefa-tabs',
  templateUrl: 'tarefa-tabs.html'
})
export class TarefaTabsPage {

  tarefaInfoRoot = 'TarefaInfoPage'
  tarefaIniciarRoot = 'TarefaIniciarPage'
  tarefaConcluirRoot = 'TarefaConcluirPage'


  constructor(public navCtrl: NavController) {}

}
