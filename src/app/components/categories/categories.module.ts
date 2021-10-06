import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from 'primeng/table';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories.routes';
import { CategoryService } from './categories.service';
import { AddDialogModule } from './add-dialog/add-dialog.module';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    SharedModule,
    CategoriesRoutingModule,
    TableModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatInputModule,
    MatFormFieldModule,
    AddDialogModule
  ],
  providers: [CategoryService]
})
export class CategoriesModule {}
