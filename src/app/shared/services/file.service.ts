import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  async getInventory(): Promise<Inventory[]> {
    return this.http
      .get('assets/data.json')
      .toPromise()
      .then((res: any) => res.inventory)
      .then((data: Inventory[]) => data);
  }
}
