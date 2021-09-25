import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '@shared/shared.module';
import { TopbarComponent } from './topbar.component';

@NgModule({
  declarations: [TopbarComponent],
  imports: [SharedModule, MatToolbarModule],
  exports: [TopbarComponent],
  providers: [],
})
export class TopbarModule {}
