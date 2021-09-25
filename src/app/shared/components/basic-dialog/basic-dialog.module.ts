import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { BasicDialog } from './basic-dialog.component';
@NgModule({
  declarations: [BasicDialog],
  imports: [CommonModule, MatDialogModule],
  exports: [BasicDialog],
  providers: [],
})
export class BasicDialogModule {}
