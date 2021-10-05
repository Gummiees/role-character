import { Component } from '@angular/core';
import { Category } from '@shared/models/category.model';
import { BasicDialogModel } from '@shared/models/dialog.model';
import { CommonService } from '@shared/services/common.service';
import { DialogService } from '@shared/services/dialog.service';
import { LoadersService } from '@shared/services/loaders.service';
import { filter, first, tap } from 'rxjs/operators';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html'
})
export class CategoriesComponent {
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
  constructor(
    public loadersService: LoadersService,
    private dialogService: DialogService,
    private commonService: CommonService
  ) {}

  addCategory() {
    // this.categoryList.push({
    //   color: '#000000',
    //   name: 'Black',
    //   id: 4
    // });

    this.dialogService.openGenericDialog(AddDialogComponent).subscribe((category: Category) => {
      if (!this.commonService.isNullOrUndefined(category)) {
        this.categoryList.push(category);
      }
    });
  }

  public async onEdit(category: Category) {
    console.log('onEdit', category);
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
