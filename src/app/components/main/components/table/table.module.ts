import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { SharedModule } from '@shared/shared.module';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TableComponent } from './table.component';

@NgModule({
  declarations: [TableComponent],
  imports: [SharedModule, MatTableModule, TableModule, DropdownModule, FormsModule],
  exports: [TableComponent],
  providers: [],
})
export class CustomTableModule {}
