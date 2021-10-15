import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from '@shared/shared.module';
import { AddStatDialogComponent } from './add-stat-dialog.component';
@NgModule({
  declarations: [AddStatDialogComponent],
  imports: [SharedModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  exports: [AddStatDialogComponent],
  providers: []
})
export class AddStatDialogModule {}
