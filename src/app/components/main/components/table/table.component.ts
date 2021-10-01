import { Component } from '@angular/core';
import { Category } from '@shared/models/category.model';
import { Inventory } from '@shared/models/inventory.model';
import { FileService } from '@shared/services/file.service';
import { LoadersService } from '@shared/services/loaders.service';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  public inventory: Inventory[] = [];
  public categoriesDropdown: SelectItem[] = [];
  private categories: Category[] = [];
  constructor(public loadersService: LoadersService, private fileService: FileService) {
    this.getFileValues();
  }

  public getCategoryColor(categoryName: string): string | undefined {
    return this.categories.find((c) => c.name === categoryName)?.color;
  }

  private async getFileValues(): Promise<void> {
    this.loadersService.tableLoading = true;
    try {
      const inventoryPromise = this.getInventory();
      const categoriesPromise = this.getCategories();
      await Promise.all([inventoryPromise, categoriesPromise]);
    } finally {
      this.loadersService.tableLoading = false;
    }
  }

  private async getInventory(): Promise<void> {
    this.loadersService.tableLoading = true;
    try {
      this.inventory = []; // TODO await this.fileService.getInventory();
    } finally {
      this.loadersService.tableLoading = false;
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
