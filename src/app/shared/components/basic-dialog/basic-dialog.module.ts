import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { BasicDialogComponent } from './basic-dialog.component';
@NgModule({
  declarations: [BasicDialogComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [BasicDialogComponent],
  providers: [],
})
export class BasicDialogModule {}
