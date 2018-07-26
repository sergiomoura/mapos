import { Component } from '@angular/core';
import {  NavController, NavParams } from 'ionic-angular';

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
