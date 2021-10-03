import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SharedModule } from '@shared/shared.module';
import { TableModule } from 'primeng/table';
import { CategoriesComponent } from './categories.component';
import { CategoriesRoutingModule } from './categories.routes';

@NgModule({
  declarations: [CategoriesComponent],
  imports: [SharedModule, CategoriesRoutingModule, TableModule, MatIconModule, MatButtonModule]
})
export class CategoriesModule {}
