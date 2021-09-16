import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './topbar/topbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [TopbarComponent],
  imports: [CommonModule, MatToolbarModule],
  exports: [TopbarComponent],
  providers: [],
})
export class TopbarModule {}
