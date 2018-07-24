import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarefaConcluirPage } from './tarefa-concluir';

@NgModule({
  declarations: [
    TarefaConcluirPage,
  ],
  imports: [
    IonicPageModule.forChild(TarefaConcluirPage),
  ],
})
export class TarefaConcluirPageModule {}
