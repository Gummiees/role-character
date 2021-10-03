import { Category } from './category.model';

export interface Inventory {
  name: string;
  quantity: string;
  weight: string;
  price: string;
  category: Category;
  categoryName: string;
}
