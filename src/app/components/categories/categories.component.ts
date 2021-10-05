import { Component } from '@angular/core';
import { Category } from '@shared/models/category.model';
import { BasicDialogModel } from '@shared/models/dialog.model';
import { CommonService } from '@shared/services/common.service';
import { DialogService } from '@shared/services/dialog.service';
import { LoadersService } from '@shared/services/loaders.service';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent {
  public isEditingRow: boolean = false;
  public categoryList: Category[] = [
    {
      color: '#ff0000',
      name: 'Red',
      id: 1
    },
    {
      color: '#00ff00',
      name: 'Green',
      id: 2
    },
    {
      color: '#0000ff',
      name: 'Blue',
      id: 3
    }
  ];
  private clonedCategories: { [s: string]: Category } = {};
  constructor(
    public loadersService: LoadersService,
    private dialogService: DialogService,
    private commonService: CommonService
  ) {}

  addCategory() {
    this.dialogService.openGenericDialog(AddDialogComponent).subscribe((category: Category) => {
      if (!this.commonService.isNullOrUndefined(category)) {
        this.categoryList.push(category);
      }
    });
  }

  public async onEditInit(category: Category) {
    if (category.id) {
      this.clonedCategories[category.id] = { ...category };
      this.isEditingRow = true;
    }
  }

  public async onEditCancel(category: Category, index: number) {
    if (category.id) {
      this.categoryList[index] = this.clonedCategories[category.id];
      delete this.clonedCategories[category.id];
      this.isEditingRow = false;
    }
  }

  public async onEditSave(category: Category) {
    if (category.id) {
      delete this.clonedCategories[category.id];
      this.isEditingRow = false;
    }
  }

  public async onDelete(category: Category) {
    const dialogModel: BasicDialogModel = {
      body: 'Are you sure you want to delete the category?'
    };
    this.dialogService.openDialog(dialogModel).subscribe(() => this.delete(category));
  }

  private async delete(category: Category) {
    console.log('delete', category);
    this.categoryList = this.categoryList.filter((c) => c.id !== category.id);
  }
}
