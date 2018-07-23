import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarefaIniciarPage } from './tarefa-iniciar';

@NgModule({
  declarations: [
    TarefaIniciarPage,
  ],
  imports: [
    IonicPageModule.forChild(TarefaIniciarPage),
  ],
})
export class TarefaIniciarPageModule {}
