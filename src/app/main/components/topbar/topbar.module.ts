import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SharedModule } from '@shared/shared.module';
import { TopbarComponent } from './topbar.component';

@NgModule({
  declarations: [TopbarComponent],
  imports: [SharedModule, MatToolbarModule, MatIconModule, MatMenuModule],
  exports: [TopbarComponent],
  providers: [],
})
export class TopbarModule {}
