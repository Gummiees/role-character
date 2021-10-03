import { Component } from '@angular/core';
import { Category } from '@shared/models/category.model';
import { LoadersService } from '@shared/services/loaders.service';

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
  constructor(public loadersService: LoadersService) {}
}
