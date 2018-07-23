import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

//@IonicPage()
@Component({
  selector: 'page-tarefa',
  templateUrl: 'tarefa.html',
})
export class TarefaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TarefaPage');
  }

}
