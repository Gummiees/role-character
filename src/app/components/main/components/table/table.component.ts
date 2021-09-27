import { Component } from '@angular/core';
import { Category } from '@shared/models/category.model';
import { Inventory } from '@shared/models/inventory.model';
import { FileService } from '@shared/services/file.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  public loading: boolean = false;
  public inventory: Inventory[] = [];
  public categoriesDropdown: SelectItem[] = [];
  private categories: Category[] = [];
  constructor(private fileService: FileService) {
    this.getFileValues();
  }

  public getCategoryColor(categoryName: string): string | undefined {
    return this.categories.find((c) => c.name === categoryName)?.color;
  }

  private async getFileValues(): Promise<void> {
    this.loading = true;
    try {
      const inventoryPromise = this.getInventory();
      const categoriesPromise = this.getCategories();
      await Promise.all([inventoryPromise, categoriesPromise]);
    } finally {
      this.loading = false;
    }
  }

  private async getInventory(): Promise<void> {
    this.loading = true;
    try {
      this.inventory = []; // TODO await this.fileService.getInventory();
    } finally {
      this.loading = false;
    }
  }

  private async getCategories(): Promise<void> {
    this.categories = await this.fileService.getCategories();

    this.categoriesDropdown = this.categories.map((category) => ({
      label: category.name,
      value: category.name,
    }));
  }
}
