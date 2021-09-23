import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    TableModule,
    DropdownModule,
    FormsModule,
  ],
  exports: [TableComponent],
  providers: [],
})
export class CustomTableModule {}
