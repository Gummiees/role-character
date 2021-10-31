import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DicePipe } from './dice.pipe';

@NgModule({
  declarations: [DicePipe],
  imports: [CommonModule],
  exports: [DicePipe],
  providers: []
})
export class DicePipeModule {}
