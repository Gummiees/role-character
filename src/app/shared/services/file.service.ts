import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from '@shared/models/category.model';
import { Inventory } from '@shared/models/inventory.model';
import { Skill } from '@shared/models/skill.model';

@Injectable({ providedIn: 'root' })
export class FileService {
  constructor(private http: HttpClient) {}

  async getSkills(): Promise<Skill[]> {
    return this.http
      .get('assets/data.json')
      .toPromise()
      .then((res: any) => res.skills)
      .then((data: Skill[]) => data);
  }

  async getName(): Promise<string> {
    return this.http
      .get('assets/data.json')
      .toPromise()
      .then((res: any) => res.name);
  }

  async getCategories(): Promise<Category[]> {
    return this.http
      .get('assets/data.json')
      .toPromise()
      .then((res: any) => res.categories)
      .then((data: Category[]) => data);
  }

  async getInventory(): Promise<Inventory[]> {
    return this.http
      .get('assets/data.json')
      .toPromise()
      .then(async (res: any) => {
        res.inventory.forEach((item: any) => {
          item.category = res.categories.find(
            (cat: Category) => cat.name === item.category
          );
          item.categoryName = item.category?.name;
        });
        return res.inventory;
      })
      .then((data: Inventory[]) => data);
  }
}
