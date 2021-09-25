import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';
import { TopbarComponent } from './topbar.component';

@NgModule({
  declarations: [TopbarComponent],
  imports: [SharedModule, MatToolbarModule, MatIconModule],
  exports: [TopbarComponent],
  providers: [],
})
export class TopbarModule {}
