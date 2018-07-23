import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarefaInfoPage } from './tarefa-info';

@NgModule({
  declarations: [
    TarefaInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(TarefaInfoPage),
  ],
})
export class TarefaInfoPageModule {}
