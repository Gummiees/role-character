import { Category } from './category.model';

export class Inventory {
  name: string;
  quantity: string;
  weight: string;
  price: string;
  category: Category;
  categoryName: string;

  constructor(
    name: string,
    quantity: string,
    weight: string,
    price: string,
    category: Category,
    categoryName: string
  ) {
    this.name = name;
    this.quantity = quantity;
    this.weight = weight;
    this.price = price;
    this.category = category;
    this.categoryName = categoryName;
  }
}
