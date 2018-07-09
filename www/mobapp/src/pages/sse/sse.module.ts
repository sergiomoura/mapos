import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SsePage } from './sse';

@NgModule({
  declarations: [
    SsePage,
  ],
  imports: [
    IonicPageModule.forChild(SsePage),
  ],
})
export class SsePageModule {}
