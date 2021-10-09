import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { AddItemDialogComponent } from './add-item-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SharedModule } from '@shared/shared.module';
@NgModule({
  declarations: [AddItemDialogComponent],
  imports: [
    SharedModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  exports: [AddItemDialogComponent],
  providers: []
})
export class AddItemDialogModule {}
