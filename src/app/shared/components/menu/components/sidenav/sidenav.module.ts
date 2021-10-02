import { NgModule } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SharedModule } from '@shared/shared.module';
import { SidenavComponent } from './sidenav.component';

@NgModule({
  declarations: [SidenavComponent],
  imports: [SharedModule, MatSidenavModule, MatListModule],
  exports: [SidenavComponent],
  providers: []
})
export class SidenavModule {}
