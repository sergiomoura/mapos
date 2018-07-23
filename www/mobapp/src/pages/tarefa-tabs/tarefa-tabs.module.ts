import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TarefaTabsPage } from './tarefa-tabs';

@NgModule({
  declarations: [
    TarefaTabsPage,
  ],
  imports: [
    IonicPageModule.forChild(TarefaTabsPage),
  ]
})
export class TarefaTabsPageModule {}
